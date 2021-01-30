import React from "react";
import { Person } from "../../services/Person";
import { Select } from "../common/Select";
import { ConstraintSelectorProps } from "./types";

export const SubjectSelector: React.FC<ConstraintSelectorProps> = ({
  persons,
  constraint,
  update,
}) => (
  <Select
    name="subject"
    options={persons}
    value={constraint.subject}
    onChange={(event) =>
      update({
        ...constraint,
        subject: event.target.value as Person,
      })
    }
  />
);
