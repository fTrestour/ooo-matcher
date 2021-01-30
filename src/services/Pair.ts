import { chain } from "lodash";
import { isPerson, Person } from "./Person";
import { isRound, Round } from "./Round";

export interface PairInterface {
  person1: Person;
  person2: Person;
  round: Round;
}
export default class Pair implements PairInterface {
  constructor(
    public person1: Person,
    public person2: Person,
    public round: Round
  ) {
    if (person1 <= person2) {
      this.person1 = person1;
      this.person2 = person2;
    } else {
      this.person1 = person2;
      this.person2 = person1;
    }
  }

  public static getAll(persons: readonly Person[], round: Round) {
    return chain(persons)
      .map((person1) =>
        persons.map((person2) => new Pair(person1, person2, round))
      )
      .flatten()
      .uniqBy((pair) => pair.toString())
      .filter((pair) => pair.person1 !== pair.person2)
      .map((pair) => pair.toString())
      .shuffle()
      .value();
  }

  public static getAllFor(
    person: Person,
    persons: readonly Person[],
    round: Round
  ) {
    return chain(persons)
      .map((person2) => new Pair(person, person2, round))
      .filter((pair) => pair.person1 !== pair.person2)
      .map((pair) => pair.toString())
      .shuffle()
      .value();
  }

  public static buildPairString(
    person1: Person,
    person2: Person,
    round: Round
  ) {
    return new Pair(person1, person2, round).toString();
  }

  public static from(pairString: string) {
    const parsedPairString = JSON.parse(pairString);

    if (!Array.isArray(parsedPairString)) {
      throw new Error(
        `Pair string should be an array of length 3, got ${pairString} instead`
      );
    }

    if (parsedPairString.length !== 3) {
      throw new Error(
        `Pair array should be of length 3, got ${pairString} instead`
      );
    }

    const [round, p1, p2] = parsedPairString;

    if (!isRound(round) || !isPerson(p1) || !isPerson(p2)) {
      throw new Error(
        `Pair array should be of type [Round, Person, Person], got ${pairString} instead`
      );
    }

    return new Pair(p1, p2, round);
  }

  public toString() {
    return JSON.stringify([this.round, this.person1, this.person2]);
  }

  public setRound(round: Round) {
    this.round = round;
  }
}
