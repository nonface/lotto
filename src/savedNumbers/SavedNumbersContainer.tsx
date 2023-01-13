import * as S from "./styles";
import {
  SavedState,
} from "../types";
import BasicButton from "../common/BasicButton/BasicButton";

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
                <div>
                  {result.regular.map((number) => `${number} `)} - {result.special}
                  <span>({result.game}, last {result.limit} draws, {result.tier})</span>
                </div>
                <BasicButton onClick={() => onRemoveClick(result.dateAdded)}>Remove</BasicButton>
              </li>
            );
          })}
        </ul>
      </S.SavedNumbersContainer>
  );
};

export default SavedNumbersContainer;
