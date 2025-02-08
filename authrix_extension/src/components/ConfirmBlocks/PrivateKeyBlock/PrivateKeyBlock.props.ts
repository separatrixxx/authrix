import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface PrivateKeyBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    serviceKey: string,
}
