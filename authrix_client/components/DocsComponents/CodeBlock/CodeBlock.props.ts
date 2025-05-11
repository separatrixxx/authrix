import { DetailedHTMLProps, HTMLAttributes, ReactNode  } from 'react';


export interface CodeBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    children?: ReactNode,
}
