import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface AvatarProps extends DetailedHTMLProps<HTMLAttributes<HTMLBaseElement>, HTMLBaseElement> {
    username: string;
    size: number;
}
