import axios from 'axios';
import { ToastError, ToastSuccess } from "../../Common/Toast/Toast";
import { CheckCertificate, ServiceCertificate } from './checkCertificate.interface';


const DOMAIN_REGEX = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

export async function chechService(args: CheckCertificate) {
    const { domainOrCert, translations, setErrorDomainOrCert, setIsLoading, setCertificate } = args;

    setCertificate(null);
    setErrorDomainOrCert(false);

    if (!domainOrCert) {
        ToastError(translations.enter_domain_or_certificate_number);
        setErrorDomainOrCert(true);

        return;
    }

    let isDomain = true;

    if (!DOMAIN_REGEX.test(domainOrCert)) {
        isDomain = false;
    }

    setIsLoading(true);

    try {
        const url = isDomain ? `/service/certificate?domain=${domainOrCert}` : `/service/certificate/number?certNumber=${domainOrCert}`;
        const response = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + url);

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
    } finally {
        setIsLoading(false);
    }
};
