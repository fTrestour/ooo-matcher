import React, { useCallback } from "react";
import { constraintTypes, ConstraintType } from "../../services/Constraint";
import { useDefaultPersons } from "../../services/Person";
import { Select } from "../common/Select";
import { ConstraintSelectorProps } from "./types";

export const TypeSelector: React.FC<ConstraintSelectorProps> = ({
  persons,
  constraint,
  update,
}) => {
  const defaultPersons = useDefaultPersons(persons);

  const onChange = useCallback(
    (event) => {
      if (defaultPersons) {
        const type = event.target.value as ConstraintType; // TODO: typeguard

        switch (type) {
          case "wants to be matched with":
            update({
              subject: constraint.subject,
              type,
              target:
                defaultPersons[0] !== constraint.subject
                  ? defaultPersons[0]
                  : defaultPersons[1],
              round: undefined,
            });
            break;
          case "will be missing during":
            update({
              subject: constraint.subject,
              type,
              round: 1,
            });
            break;
          default:
            const exhaustiveCheck: never = type;
            throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
        }
      }
    },
    [constraint.subject, defaultPersons, update]
  );

  if (!defaultPersons) {
    return null;
  }

  return (
    <Select
      name="type"
      options={constraintTypes}
      value={constraint.type}
      onChange={onChange}
    />
  );
};
