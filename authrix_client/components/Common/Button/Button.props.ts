import { DetailedHTMLProps, HTMLAttributes, MouseEvent } from 'react';


export interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    text: string,
    isLoading?: boolean,
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void,
}
