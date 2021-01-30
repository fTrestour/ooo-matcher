import { useMemo } from "react";
import { useList } from "react-use";

export type Person = string;

export const isPerson = (person: any): person is Person =>
  typeof person === "string";

export const usePersons = () => {
  const [persons, editPersons] = useList<Person>([]);

  const filteredPersons = useMemo(() => persons.filter((p) => Boolean(p)), [
    persons,
  ]);

  return [persons, filteredPersons, editPersons] as const;
};

export const useDefaultPersons = (persons: Person[]) =>
  useMemo(() => {
    if (!persons[0] || !persons[1]) {
      return null;
    }
    return [persons[0], persons[1]] as const;
  }, [persons]);
