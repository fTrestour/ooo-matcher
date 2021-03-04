import { useList } from "react-use";
import { Person } from "./Person";
import { Round } from "./Round";

export type ConstraintType =
  | "wants to be matched with"
  | "will be missing during";
export const constraintTypes: readonly ConstraintType[] = [
  "wants to be matched with",
  "will be missing during",
] as const;

export type PreferConstraintInterface = {
  subject: Person;
  type: "wants to be matched with";
  target: Person;
  round: Round | undefined;
};

export type MissingConstraintInterface = {
  subject: Person;
  type: "will be missing during";
  round: Round | undefined;
};

export type Constraint = PreferConstraintInterface | MissingConstraintInterface;

export const useConstraints = () => useList<Constraint>([]);
