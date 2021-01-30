import { groupBy } from "lodash";
import React from "react";
import Pair from "../services/Pair";
import { Round } from "../services/Round";
import { RoundComponent } from "./RoundComponent";

export const Pairs: React.FC<{ pairs: Pair[] }> = ({ pairs }) => {
  const groupedPairs = groupBy(pairs, "round");

  return (
    <div>
      {Object.entries(groupedPairs).map(([round, roundPairs]) => (
        <RoundComponent
          round={(round as unknown) as Round}
          pairs={roundPairs}
          key={round}
        />
      ))}
    </div>
  );
};
