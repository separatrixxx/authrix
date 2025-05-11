import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import { ReactNode } from 'react';
import { Htag } from '../Htag/Htag';
import cn from 'classnames';


export const Button = ({ text, isLoading, className, onClick }: ButtonProps): ReactNode => {
  return (
    <button className={cn(styles.button, className)} onClick={onClick} disabled={isLoading}>
      {
        !isLoading ?
          <Htag tag='m'>{text}</Htag>
          :
          <span className={styles.spinner} />
      }
    </button>
  );
};
