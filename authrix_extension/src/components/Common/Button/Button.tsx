import { ButtonProps } from './Button.props';
import styled from 'styled-components';
import { Htag } from 'components/Common/Htag/Htag';


const MyButton = styled.button`
  width: 100%;
  padding: 14px 0;
  background: var(--primary);
  border-radius: 8px;
  display: grid;
  align-items: center;
  justify-items: center;
  cursor: pointer;
  transition-duration: 300ms;
  border: none;
  outline: none;

  & > h1 {
    color: var(--white);
    font-weight: 800;
  }

  &:hover {
    background: var(--black);
  }
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 3px solid transparent;
  border-radius: 50%;
  border-top-color: var(--white);
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button = ({ text, isLoading, className, onClick }: ButtonProps): JSX.Element => {
  return (
    <MyButton onClick={onClick} className={className}>
      {
        !isLoading ?
          <Htag tag='m'>
            {text}
          </Htag>
          : <Spinner />
      }
    </MyButton>
  );
};
