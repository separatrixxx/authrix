import axios from 'axios';
import { ToastError, ToastSuccess } from "../../Common/Toast/Toast";
import { CheckCertificate, ServiceCertificate } from './checkCertificate.interface';


export async function chechService(args: CheckCertificate) {
    const { domainOrCert, translations, setErrorDomainOrCert, setIsLoading, setCertificate } = args;

    setCertificate(null);
    setErrorDomainOrCert(false);

    if (!domainOrCert) {
        ToastError(translations.enter_domain_or_certificate_number);
        setErrorDomainOrCert(true);

        return;
    }

    setIsLoading(true);

    try {
        const response = await axios.get('/api/checkService', { params: { query: domainOrCert } });

        if (response && response.data && response.data.message === 'Certificate found') {
            const certificate: ServiceCertificate = response.data.certificate;

            setCertificate(certificate);

            ToastSuccess(translations.service_successfully_found);
        } else {
            ToastError(translations.service_not_found);
        }
    } catch (error) {
        console.error(error);
        ToastError(translations.service_not_found);
    } {
        setIsLoading(false);
    }
};
