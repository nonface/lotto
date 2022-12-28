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
  limitOptions,
  randomizeOptions,
} from "../utils/SelectionOptions";
import SavedNumbersContainer from "../savedNumbers/SavedNumbersContainer";

const NumbersContainer = () => {
  const [options, setOptions] = useState<OptionsState>({
    game: "powerball",
    limit: 50,
    randomize: 5,
  });

  const [savedNumbers, setSavedNumbers] = useState<SavedState[]>();

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

    setSavedNumbers((prevState = []) => [
      ...prevState,
      { regular: array, special: special[0][0], tier, limit, game, dateAdded },
    ]);
  };

  const handleRemoveClick = (date: string) => {
    setSavedNumbers((prevState = []) => (
      prevState.filter(({ dateAdded }) => dateAdded !== date)
    ));
  };

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
        <button onClick={getNumbers}>Get Numbers</button>
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
      <SavedNumbersContainer savedNumbers={savedNumbers} onRemoveClick={handleRemoveClick} />
    </div>
  );
};

export default NumbersContainer;
