import { DetailedHTMLProps, HTMLAttributes  } from 'react';
import { ServiceCertificate } from '../RegisterForm/registerService.interface';


export interface CertificateInfoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    certificate: ServiceCertificate,
}
