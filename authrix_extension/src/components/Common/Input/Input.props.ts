import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface InputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	text: string,
	value: string,
	isError?: boolean,
	onChange: (e: any) => void,
}