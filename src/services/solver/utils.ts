import Logic from "logic-solver";
import Pair from "../Pair";
import { Person } from "../Person";
import { Round } from "../Round";

export const noOooWithMyself = (persons: readonly Person[]) =>
  Logic.and(
    ...persons.map((person) =>
      Logic.not(Pair.buildPairString(person, person, 1))
    ),
    ...persons.map((person) =>
      Logic.not(Pair.buildPairString(person, person, 2))
    )
  );

export const maxOneOooEachPerRound = (persons: readonly Person[]) =>
  Logic.and(
    ...persons.map((person) =>
      Logic.atMostOne(...Pair.getAllFor(person, persons, 1))
    ),
    ...persons.map((person) =>
      Logic.atMostOne(...Pair.getAllFor(person, persons, 2))
    )
  );

export const notSameOooTwice = (persons: readonly Person[]) =>
  Logic.and(
    ...Pair.getAll(persons, 1).map((pair1) => {
      const pair2 = Pair.from(pair1);
      pair2.setRound(2);
      return Logic.not(Logic.and(pair1, pair2.toString()));
    })
  );

export const maximizeOooNumber = (persons: readonly Person[], round: Round) =>
  Logic.or(
    Logic.and(
      ...persons.map((person) =>
        Logic.exactlyOne(...Pair.getAllFor(person, persons, round))
      )
    ),
    Logic.exactlyOne(
      ...persons.map((person) =>
        Logic.and(
          ...Pair.getAllFor(person, persons, round).map((pair) =>
            Logic.not(pair)
          )
        )
      )
    )
  );

export const preference = (person1: Person, person2: Person, round?: Round) =>
  round
    ? Pair.buildPairString(person1, person2, round)
    : Logic.or(
        Pair.buildPairString(person1, person2, 1),
        Pair.buildPairString(person1, person2, 2)
      );

export const removeFromRound = (
  person: Person,
  persons: readonly Person[],
  round?: Round
) =>
  round
    ? Logic.not(Logic.or(...Pair.getAllFor(person, persons, round)))
    : Logic.not(
        Logic.and(
          Logic.or(...Pair.getAllFor(person, persons, 1)),
          Logic.or(...Pair.getAllFor(person, persons, 2))
        )
      );
