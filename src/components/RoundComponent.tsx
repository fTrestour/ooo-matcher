import Pair from "../services/Pair";
import { Round } from "../services/Round";

export const RoundComponent: React.FC<{ round: Round; pairs: Pair[] }> = ({
  round,
  pairs,
}) => {
  return (
    <div>
      Round {round}:
      <div>
        {pairs.map((pair) => (
          <div key={pair.toString()}>
            {pair.person1} and {pair.person2}
          </div>
        ))}
      </div>
    </div>
  );
};
