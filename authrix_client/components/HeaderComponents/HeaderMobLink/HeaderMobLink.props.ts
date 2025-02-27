import { DetailedHTMLProps, HTMLAttributes  } from 'react';


export interface HeaderMobLinkProps extends DetailedHTMLProps<HTMLAttributes<HTMLLinkElement>, HTMLLinkElement> {
    text: string,
	link: string,
}
