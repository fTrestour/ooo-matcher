import { chain } from "lodash";
import Logic from "logic-solver";
import { useMemo, useState } from "react";
import {
  Constraint,
  MissingConstraintInterface,
  PreferConstraintInterface,
} from "../Constraint";
import Pair from "../Pair";
import { Person } from "../Person";
import { Round } from "../Round";
import {
  maximizeOooNumber,
  maxOneOooEachPerRound,
  noOooWithMyself,
  notSameOooTwice,
  preference,
  removeFromRound,
} from "./utils";

export const useSolver = (persons: Person[], constraints: Constraint[]) => {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [error, setError] = useState<string | null>(null);

  useMemo(() => {
    const solver = new Logic.Solver();

    // OoO rules
    solver.require(noOooWithMyself(persons));
    solver.require(maxOneOooEachPerRound(persons));
    solver.require(notSameOooTwice(persons));

    // People being missing for a round
    // TODO: clean up here
    const personsToMaximize = chain(constraints)
      .filter(({ type }) => type === "will be missing during")
      .forEach((constraint) => {
        const { subject, round } = constraint as MissingConstraintInterface;
        solver.require(removeFromRound(subject, persons, round));
      })
      .groupBy("round")
      .mapValues((constraints) =>
        chain(persons)
          .difference(constraints.map(({ subject }) => subject))
          .value()
      )
      .value();
    if (personsToMaximize["1"]) {
      solver.require(
        maximizeOooNumber(
          (personsToMaximize["1"] as unknown) as Person[],
          1 as Round
        )
      );
    } else {
      solver.require(maximizeOooNumber(persons, 1 as Round));
    }
    if ("2" in personsToMaximize) {
      solver.require(
        maximizeOooNumber(
          (personsToMaximize["2"] as unknown) as Person[],
          2 as Round
        )
      );
    } else {
      solver.require(maximizeOooNumber(persons, 2 as Round));
    }

    // Weekly preferences
    chain(constraints)
      .filter(({ type }) => type === "wants to be matched with")
      .forEach((constraint) => {
        const {
          subject,
          target,
          round,
        } = constraint as PreferConstraintInterface;
        solver.require(preference(subject, target, round));
      })
      .value();

    const solution = solver.solve();
    if (solution) {
      setPairs(solution.getTrueVars().sort().map(Pair.from));
      setError(null);
    } else {
      setError("No solution");
    }
  }, [constraints, persons]);

  return { pairs, error };
};
