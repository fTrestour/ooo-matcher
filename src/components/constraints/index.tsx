import React from "react";
import styled from "styled-components";
import { useDefaultPersons } from "../../services/Person";
import { Button } from "../common/Button";
import { RoundSelector } from "./RoundSelector";
import { SubjectSelector } from "./SubjectSelector";
import { TargetSelector } from "./TargetSelector";
import { ConstraintsSelectorProps } from "./types";
import { TypeSelector } from "./TypeSelector";

export const ConstraintsSelector: React.FC<ConstraintsSelectorProps> = ({
  persons,
  constraints,
  updateAt,
  removeAt,
  push,
}) => {
  const defaultPersons = useDefaultPersons(persons);

  return defaultPersons ? (
    <Wrapper>
      {constraints.map((constraint, index) => {
        return (
          <ConstraintLine key={index}>
            <SubjectSelector
              persons={persons}
              constraint={constraint}
              update={(c) => updateAt(index, c)}
            />
            <TypeSelector
              persons={persons}
              constraint={constraint}
              update={(c) => updateAt(index, c)}
            />
            {constraint.type === "wants to be matched with" ? (
              <>
                <TargetSelector
                  persons={persons}
                  constraint={constraint}
                  update={(c) => updateAt(index, c)}
                />
                for
              </>
            ) : null}
            <RoundSelector
              constraint={constraint}
              update={(c) => updateAt(index, c)}
            />
            <Button
              onClick={() => {
                removeAt(index);
              }}
            >
              Remove constraint
            </Button>
          </ConstraintLine>
        );
      })}
      <Button
        onClick={() => {
          push({
            subject: defaultPersons[0],
            type: "wants to be matched with",
            target: defaultPersons[1],
            round: undefined,
          });
        }}
      >
        Add constraint
      </Button>
    </Wrapper>
  ) : null;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConstraintLine = styled.div`
  display: flex;
  flex-direction: row;
`;
