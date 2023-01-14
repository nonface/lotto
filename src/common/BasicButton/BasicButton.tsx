import * as S from './styles';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'link'; 
  title?: string;
}
const BasicButton = ({ children,variant = 'primary', ...props }: ButtonProps) => {
  return <S.BasicButton className={`basic-button ${variant}`}{...props}>{children}</S.BasicButton>;
};

export default BasicButton