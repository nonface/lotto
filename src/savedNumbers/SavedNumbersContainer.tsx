import * as S from "./styles";
import {
  SavedState,
} from "../types";

interface SavedNumbersContainerProps {
  savedNumbers: SavedState[] | undefined;
  onRemoveClick: (date: string) => void;
}

const SavedNumbersContainer = ({ savedNumbers, onRemoveClick }: SavedNumbersContainerProps) => {
  if (!savedNumbers?.length) return null;

  return (
      <S.SavedNumbersContainer>
        <h2>Saved Numbers</h2>
        <ul>
          {savedNumbers?.map((result) => {
            return (
              <li key={result.dateAdded}>
                {result.regular.map((number) => `${number} `)} -{" "}
                {result.special} ({result.game}, last {result.limit} draws, {result.tier})
                <button onClick={() => onRemoveClick(result.dateAdded)}>Remove</button>
              </li>
            );
          })}
        </ul>
      </S.SavedNumbersContainer>
  );
};

export default SavedNumbersContainer;
