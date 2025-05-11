import { DetailedHTMLProps, HTMLAttributes, ChangeEvent } from 'react';


export interface InputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	text: string,
	value: string,
	isError?: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}