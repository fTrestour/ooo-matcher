import React from "react";
import { Round } from "../../services/Round";
import { Select } from "../common/Select";
import { ConstraintSelectorProps } from "./types";

export const RoundSelector: React.FC<
  Omit<ConstraintSelectorProps, "persons">
> = ({ constraint, update }) => {
  return (
    <Select
      name="round"
      options={
        constraint.type !== "will be missing during"
          ? ([
              { label: "any round", value: undefined },
              { label: "round 1", value: 1 as Round }, // TODO: type guard here
              { label: "round 2", value: 2 as Round },
            ] as const)
          : ([
              { label: "round 1", value: 1 as Round },
              { label: "round 2", value: 2 as Round },
            ] as const)
      }
      value={constraint.round}
      onChange={(event) => {
        update({
          ...constraint,
          round: parseInt(event.target.value) as Round,
        });
      }}
    />
  );
};
