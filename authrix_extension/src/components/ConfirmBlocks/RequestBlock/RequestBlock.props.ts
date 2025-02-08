import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ServiceMessage } from 'interfaces/service.interface';


export interface RequestBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    serviceMessage: ServiceMessage,
    setIsConfirmed: (e: boolean) => void,
    setServiceKey: (key: string) => void;
}
