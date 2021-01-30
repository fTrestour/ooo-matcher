import { ListActions } from "react-use/lib/useList";
import { Constraint } from "../../services/Constraint";
import { Person } from "../../services/Person";

export type ConstraintsSelectorProps = {
  persons: Person[];
  constraints: Constraint[];
} & ListActions<Constraint>;

export type ConstraintSelectorProps<C extends Constraint = Constraint> = {
  persons: Person[];
  constraint: C;
  update: (constraint: C) => void;
};
