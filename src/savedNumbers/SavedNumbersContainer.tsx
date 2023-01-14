import * as S from "./styles";
import BasicButton from "../common/BasicButton/BasicButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { Steps } from "../numbers/NumbersContainer";

interface SavedNumbersContainerProps {
  savedNumbers: Steps;
  onRemoveClick: (date: string) => void;
  onUndoCLick: () => void;
}

const SavedNumbersContainer = ({ savedNumbers, onRemoveClick, onUndoCLick }: SavedNumbersContainerProps) => {
  const { current, prev } = savedNumbers;
  return (
      <S.SavedNumbersContainer>
        <header>
          <h2>Saved Numbers</h2>
          {prev && <BasicButton title="Undo last change" onClick={onUndoCLick} variant="link"><FontAwesomeIcon icon={faRotateLeft} /></BasicButton>}
        </header>
        <ul>
          {current?.map((result) => {
            return (
              <li key={result.dateAdded}>
                <div>
                  {result.regular.map((number) => `${number} `)} - {result.special}
                  <span>({result.game}, last {result.limit} draws, {result.tier})</span>
                </div>
                <BasicButton variant="link" onClick={() => onRemoveClick(result.dateAdded)}>Remove</BasicButton>
              </li>
            );
          })}
        </ul>
      </S.SavedNumbersContainer>
  );
};

export default SavedNumbersContainer;
