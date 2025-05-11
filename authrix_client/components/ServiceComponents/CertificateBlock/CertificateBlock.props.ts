import { DetailedHTMLProps, HTMLAttributes  } from 'react';
import { ServiceCertificate } from '../RegisterForm/registerService.interface';


export interface CertificateBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    certificate: ServiceCertificate,
}
