import { PreferConstraintInterface } from "../../services/Constraint";
import { Person } from "../../services/Person";
import { Select } from "../common/Select";
import { ConstraintSelectorProps } from "./types";

export const TargetSelector: React.FC<
  ConstraintSelectorProps<PreferConstraintInterface>
> = ({ persons, constraint, update }) => (
  <Select
    name="target"
    options={persons}
    value={constraint.target}
    onChange={(event) =>
      update({
        ...constraint,
        target: event.target.value as Person,
      })
    }
  />
);
