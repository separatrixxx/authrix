import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { KeysInterface } from 'interfaces/keys.interface';


export interface KeysBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    username: string,
    keys: KeysInterface,
}
