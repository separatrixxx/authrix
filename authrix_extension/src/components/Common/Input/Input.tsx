import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';


export const Input = ({ text, value, isError, onChange }: InputProps): JSX.Element => {
	return <input className={cn(styles.input, {
		[styles.error]: isError,
	})}
		placeholder={text}
		value={value}
		onChange={onChange}
		type='text'
		name={text + ' input'}
		aria-label={text + ' input'} />
};