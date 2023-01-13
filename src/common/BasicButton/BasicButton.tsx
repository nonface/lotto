import * as S from './styles';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}
const BasicButton = ({ children, ...props }: ButtonProps) => {
  return <S.BasicButton {...props}>{children}</S.BasicButton>;
};

export default BasicButton