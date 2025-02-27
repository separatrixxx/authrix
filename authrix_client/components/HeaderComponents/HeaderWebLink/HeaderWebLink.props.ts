import { DetailedHTMLProps, HTMLAttributes  } from 'react';


export interface HeaderWebLinkProps extends DetailedHTMLProps<HTMLAttributes<HTMLLinkElement>, HTMLLinkElement> {
    text: string,
	link: string,
}
