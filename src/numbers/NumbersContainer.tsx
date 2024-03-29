// import { useState } from "react";

import { useState } from "react";
import Numbers from "./Numbers";
import { useFetchResults } from "./requests";
import Select from "react-select";
import * as S from "./styles";
import Loader from "../loader/Loader";
import {
  OptionsState,
  SavedState,
  PreviousDraws,
  SortedResults,
  Results,
  SaveNumbersArgs,
} from "../types";
import {
  gameOptions,
  getStorage,
  limitOptions,
  randomizeOptions,
  setStorage,
} from "../utils";
import SavedNumbersContainer from "../savedNumbers/SavedNumbersContainer";
import BasicButton from "../common/BasicButton/BasicButton";

export interface Steps {
  current: SavedState[] | null;
  prev: {};
}

const NumbersContainer = () => {
  const [options, setOptions] = useState<OptionsState>({
    game: "powerball",
    limit: 50,
    randomize: 5,
  });

  const [savedNumbers, setSavedNumbers] = useState<Steps>(() => getStorage('nf-lotto-saved-numbers'));

  const { limit, game } = options;

  const { data, isLoading, isFetching, refetch, isFetched } = useFetchResults({
    limit,
    game,
  });

  const getNumbers = () => {
    refetch();
  };

  const formatResults = (data: PreviousDraws[] = []): SortedResults => {
    const results = data.reduce<Results>(
      (totals, result) => {
        Object.values(result?.WinningNumbers || {}).forEach(
          ({ IsSpecial, Number }) => {
            const key = IsSpecial ? "special" : "regular";
            totals[key][Number] = (totals[key][Number] || 0) + 1;
          }
        );

        return totals;
      },
      { regular: {}, special: {} }
    );

    const sortedResults = {
      regular: Object.entries(results.regular).sort((a, b) => b[1] - a[1]),
      special: Object.entries(results.special).sort((a, b) => b[1] - a[1]),
    };

    return sortedResults;
  };

  const handleDropdownChange = <T,>(
    property: string,
    option: { label: string; value: T } | null
  ) => {
    if (option) {
      setOptions((prevState) => ({
        ...prevState,
        [property]: option.value,
      }));
    }
  };

  const handleSaveClick = ({
    regular,
    special,
    tier,
    game,
    limit,
  }: SaveNumbersArgs) => {
    const array = regular
      .slice(0, 5)
      .sort(([aRes], [bRes]) => +aRes - +bRes)
      .map(([number]) => {
        return number;
      });
    const date = new Date();
    const dateAdded = date.toISOString();

    setSavedNumbers(prevState => {
      const newState = {
        prev: {...prevState},
        current: [
          ...prevState.current || [],
          { regular: array, special: special[0][0], tier, limit, game, dateAdded },
        ]
      };

      setStorage('nf-lotto-saved-numbers', newState);

      return newState;
    });
  };

  const handleRemoveClick = (date: string) => {
    setSavedNumbers(prevState => {
      const newState = {
        prev: {...prevState},
        current: (prevState.current || []).filter(({ dateAdded }) => dateAdded !== date),
      };

      setStorage('nf-lotto-saved-numbers', newState);

      return newState;
    });
  };

  const handleUndoClick = () => {
    setSavedNumbers(({ prev }) => {
      setStorage('nf-lotto-saved-numbers', prev);
      return prev as Steps;
    });
  }

  return (
    <div>
      <S.SelectionContainer>
        <div>
          <label>Chose game</label>
          <Select
            defaultValue={gameOptions[0]}
            onChange={(value) => handleDropdownChange<string>("game", value)}
            options={gameOptions}
          />
        </div>
        <div>
          <label>Chose draw count</label>
          <Select
            defaultValue={{
              label: options.limit.toString(),
              value: options.limit,
            }}
            onChange={(value) => handleDropdownChange<number>("limit", value)}
            options={limitOptions}
          />
        </div>
        <div>
          <label>Randomize Results</label>
          <Select
            defaultValue={randomizeOptions[0]}
            onChange={(value) =>
              handleDropdownChange<number>("randomize", value)
            }
            options={randomizeOptions}
          />
        </div>
        <BasicButton onClick={getNumbers}>Get Numbers</BasicButton>
      </S.SelectionContainer>
      <div>
        {isLoading || isFetching ? (
          <Loader />
        ) : (
          <Numbers
            results={formatResults(data)}
            isFetched={isFetched}
            randomize={options.randomize}
            options={options}  
            onSaveClick={handleSaveClick}
          />
        )}
      </div>
      <SavedNumbersContainer savedNumbers={savedNumbers} onRemoveClick={handleRemoveClick} onUndoCLick={handleUndoClick} />
    </div>
  );
};

export default NumbersContainer;
