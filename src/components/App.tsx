import React from "react";
import styled from "styled-components";
import { useConstraints } from "../services/Constraint";
import { usePersons } from "../services/Person";
import { useSolver } from "../services/solver";
import { useFetchAndSetPairings } from "../services/useFetchAndSetPairings";
import { ConstraintsSelector } from "./constraints";
import { Pairs } from "./Pairs";
import { PersonsCreator } from "./PersonsCreator";

export const App: React.FC = () => {
  const [persons, filteredPersons, editPersons] = usePersons();
  const [constraints, editConstraints] = useConstraints();
  useFetchAndSetPairings(editPersons, editConstraints);

  const { pairs, error } = useSolver(filteredPersons, constraints);

  return (
    <Wrapper>
      <WishesLink
        href="https://docs.google.com/spreadsheets/d/1iGW8nN3NmiflsudnGlpBqHHnmfDyzoKrPOZBnlKDvz8/edit#gid=0&fvid=1986072419"
        target="_blank"
        >
        Click here to see people's wishes comments
      </WishesLink>
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
    'link link'
    'persons output'
    'constraints output';
  grid-template-columns: 50% 50%;
  grid-template-rows: 60px 1fr 1fr;
`;

const WishesLink = styled.a`
  grid-area: link;
  padding: 20px;
  font-size: 20px;
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
