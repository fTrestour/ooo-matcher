import { isAfter, startOfWeek } from 'date-fns';
import { useEffect } from 'react';
import { ListActions } from 'react-use/lib/useList';
import { Constraint, PreferConstraintInterface } from './Constraint';
import { Person } from './Person';

const GOOGLE_SHEET_PAIRINGS_URL =
  'https://sheets.googleapis.com/v4/spreadsheets/1iGW8nN3NmiflsudnGlpBqHHnmfDyzoKrPOZBnlKDvz8/values/A2:D?key=AIzaSyChnlEPeOyHFd8qlvI187Uzo_GtV56U09M';

interface GoogleSheetData {
  values: Array<[Person, Person, Person, string]>;
}

export const useFetchAndSetPairings = (
  editPersons: ListActions<Person>,
  editConstraints: ListActions<Constraint>,
) => {
  useEffect(() => {
    fetch(GOOGLE_SHEET_PAIRINGS_URL).then((response) => {
      response.json().then((data) => {
        setPairings(data, editPersons, editConstraints);
      });
    });
  }, [editPersons, editConstraints]);
};

const setPairings = (
  data: GoogleSheetData,
  editPersons: ListActions<Person>,
  editConstraints: ListActions<Constraint>,
) => {
  const weekPairings = data.values.filter(
    ([, , , creationDate]) =>
      creationDate && isAfter(new Date(creationDate), startOfWeek(new Date())),
  );

  const newPersons = new Set<Person>();
  const newConstraints = new Array<PreferConstraintInterface>();
  for (const choice of weekPairings) {
    const [personFullName, firstWish, secondWish] = choice;

    const person = getFirstName(personFullName);

    newPersons.add(person);
    newPersons.add(firstWish);
    newPersons.add(secondWish);

    newConstraints.push({
      subject: person,
      type: 'wants to be matched with',
      target: firstWish,
      round: 1,
    });

    newConstraints.push({
      subject: person,
      type: 'wants to be matched with',
      target: secondWish,
      round: 2,
    });
  }

  editPersons.set(Array.from(newPersons));
  editConstraints.set(newConstraints);
};

const getFirstName = (name: string) => name.split(' ')[0]!;
