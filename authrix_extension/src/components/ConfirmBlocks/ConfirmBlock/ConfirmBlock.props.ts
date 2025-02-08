import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ServiceMessage } from 'interfaces/service.interface';


export interface ConfirmBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isAuthorized: boolean,
    serviceMessage: ServiceMessage,
}
