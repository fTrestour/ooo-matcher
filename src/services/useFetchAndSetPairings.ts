import { isAfter, startOfWeek } from 'date-fns';
import { useEffect } from 'react';
import { ListActions } from 'react-use/lib/useList';
import { Constraint } from './Constraint';
import { Person } from './Person';

const GOOGLE_SHEET_PAIRINGS_URL =
  'https://sheets.googleapis.com/v4/spreadsheets/1iGW8nN3NmiflsudnGlpBqHHnmfDyzoKrPOZBnlKDvz8/values/A2:D?key=AIzaSyChnlEPeOyHFd8qlvI187Uzo_GtV56U09M';

interface GoogleSheetData {
  values: Array<[Person, Person, Person, string]>;
}

const ANYBODY_CHOICE = 'Anybody';

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

  const newPersons = new Array<Person>();
  for (const choice of weekPairings) {
    const [personFullName] = choice;

    const person = getFirstName(personFullName);
    newPersons.push(person);
  }

  const newConstraints = new Array<Constraint>();
  for (const choice of weekPairings) {
    const [personFullName, firstWish, secondWish] = choice;
    const person = getFirstName(personFullName);

    addConstraint(newConstraints, newPersons, person, firstWish, 1);
    addConstraint(newConstraints, newPersons, person, secondWish, 2);
  }

  editPersons.set(newPersons);
  editConstraints.set(newConstraints);
};

const getFirstName = (name: string) => name.split(' ')[0]!;

const addConstraint = (
  constraints: Array<Constraint>,
  availablePersons: Array<Person>,
  person1: Person,
  person2: Person | undefined,
  round: 1 | 2,
) => {
  if (!person2) {
    return constraints.push({
      subject: person1,
      type: 'will be missing during',
      round,
    });
  }

  if (person2.includes(ANYBODY_CHOICE)) {
    return;
  }

  if (!availablePersons.includes(person2)) {
    return;
  }

  return constraints.push({
    subject: person1,
    type: 'wants to be matched with',
    target: person2,
    round,
  });
};
