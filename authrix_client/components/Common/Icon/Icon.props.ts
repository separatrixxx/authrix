import { DetailedHTMLProps, HTMLAttributes, MouseEvent  } from 'react';


export interface IconProps extends DetailedHTMLProps<HTMLAttributes<HTMLOrSVGElement>, HTMLOrSVGElement> {
	type: 'burger' | 'close',
	onClick?: (e: MouseEvent<HTMLHeadingElement>) => void,
}
