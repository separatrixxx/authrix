import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface LinkTextProps extends DetailedHTMLProps<HTMLAttributes<HTMLLinkElement>, HTMLLinkElement> {
    link: string,
    text: ReactNode,
}
