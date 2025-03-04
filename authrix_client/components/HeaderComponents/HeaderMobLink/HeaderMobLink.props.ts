import { DetailedHTMLProps, HTMLAttributes, MouseEvent } from 'react';


export interface HeaderMobLinkProps extends DetailedHTMLProps<HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    text: string,
	link: string,
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void,
}
