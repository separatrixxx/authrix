import { DetailedHTMLProps, HTMLAttributes, MouseEvent } from 'react';


export interface HeaderWebLinkProps extends DetailedHTMLProps<HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    text: string,
	link: string,
    isTargetBlank?: boolean,
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void,
}
