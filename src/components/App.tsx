import React from "react";
import styled from "styled-components";
import { useConstraints } from "../services/Constraint";
import { usePersons } from "../services/Person";
import { useSolver } from "../services/solver";
import { ConstraintsSelector } from "./constraints";
import { Pairs } from "./Pairs";
import { PersonsCreator } from "./PersonsCreator";

export const App: React.FC = () => {
  const [persons, filteredPersons, editPersons] = usePersons();
  const [constraints, editConstraints] = useConstraints();
  const { pairs, error } = useSolver(filteredPersons, constraints);

  return (
    <Wrapper>
      <Persons>
        <PersonsCreator persons={persons} {...editPersons} />
      </Persons>

      <Constraints>
        <ConstraintsSelector
          persons={filteredPersons}
          constraints={constraints}
          {...editConstraints}
        />
      </Constraints>

      <Output>
        {error ? (
          <Error>Could not update OoO matching : {error}</Error>
        ) : (
          <Pairs pairs={pairs} />
        )}
      </Output>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-areas:
    "persons output"
    "constraints output";
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
`;

const Persons = styled.div`
  grid-area: persons;
  padding: 20px;
`;

const Constraints = styled.div`
  grid-area: constraints;
  padding: 20px;
`;

const Output = styled.div`
  grid-area: output;
  padding: 20px;
`;

const Error = styled.div`
  color: red;
`;
