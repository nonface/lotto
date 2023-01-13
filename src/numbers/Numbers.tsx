import { useMemo } from "react";
import { GameLabels, OptionsState, SaveNumbersArgs, SortedResults } from "../types";
import { gameOptions, randomizeOptions } from "../utils";
import * as S from "./styles";

const Numbers = ({
  results,
  isFetched,
  randomize,
  options,
  onSaveClick,
}: {
  isFetched: boolean;
  results: SortedResults;
  randomize: number;
    onSaveClick: (results: SaveNumbersArgs) => void;
    options: OptionsState;
}) => {
  const shuffleResults = (results: [string, number][], count?: number) => {
    const array = [...results].slice(0, count || randomize);

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  };

  let specialTier = 1;
  randomize === 10 && (specialTier = 5);
  randomize === 20 && (specialTier = 10);

  const shuffledRegular = useMemo(
    () => shuffleResults(results.regular),
    [randomize]
  );

  const shuffledSpecial = useMemo(
    () => shuffleResults(results.special, specialTier),
    [specialTier]
  );

  const renderResults = () => {
    return shuffledRegular
      .slice(0, 5)
      .sort(([aRes], [bRes]) => +aRes - +bRes)
      .map(([number]) => {
        return <span key={number}>{number}</span>;
      });
  };

  const picks = renderResults();
  const special = shuffledSpecial[0]?.[0];

  return isFetched ? (
    <S.NumbersContainer>
      <>
        {picks}
        <span className="special">{special}</span>
        <button
          onClick={() =>
            onSaveClick({
              regular: shuffledRegular,
              special: shuffledSpecial,
              tier: randomizeOptions.find(
                ({ value }) => value === randomize
              )?.label as string,
              game: gameOptions.find(
                ({ value }) => value === options.game
              )?.label as GameLabels,
              limit: options.limit,
            })
          }
        >
          Save
        </button>
      </>
    </S.NumbersContainer>
  ) : (
    <div>Click the button to get results</div>
  );
};

export default Numbers;
