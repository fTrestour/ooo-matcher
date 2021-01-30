import React from "react";
import { ListActions } from "react-use/lib/useList";
import { Person } from "../services/Person";
import { Button } from "./common/Button";
import { Input } from "./common/Input";

export const PersonsCreator: React.FC<
  { persons: Person[] } & ListActions<Person>
> = ({ persons, updateAt, removeAt, push }) => {
  return (
    <>
      {persons.map((person, index) => (
        <div key={index}>
          <Input
            value={person}
            onChange={(event) => updateAt(index, event.target.value)}
          />
          <Button onClick={() => removeAt(index)}>Remove person</Button>
        </div>
      ))}
      <Button onClick={() => push("")}>Add person</Button>
    </>
  );
};
