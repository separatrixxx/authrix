import axios, { AxiosError } from 'axios';
import { ToastError, ToastSuccess } from "../../Common/Toast/Toast";
import { RegisterService, ServiceCertificate } from "./registerService.interface";


const DOMAIN_REGEX = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

export async function registerService(args: RegisterService) {
    const { domain, serviceName, translations, setErrorDomain, setErrorServiceName, setIsLoading, setCertificate } = args;

    setErrorDomain(false);
    setErrorServiceName(false);

    if (!DOMAIN_REGEX.test(domain)) {
        ToastError(translations.enter_valid_domain);
        setErrorDomain(true);

        return;
    }

    if (!serviceName) {
        ToastError(translations.enter_service_name);
        setErrorServiceName(true);

        return;
    }

    setIsLoading(true);

    try {
        const response = await axios.post('/api/registerService', {
            domain: domain,
            name: serviceName,
        });

        const certificate: ServiceCertificate = response.data.certificate;

        setCertificate(certificate);
        localStorage.setItem('certificate', JSON.stringify(certificate))

        ToastSuccess(translations.service_successfully_egistered);
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            const status = axiosError.response.status;

            if (status >= 400 && status < 500) {
                ToastError(translations.service_has_already_been_registered);
            } else {
                ToastError(translations.register_service_error);
            }
        } else {
            ToastError(translations.register_service_error);
        }
    } finally {
        setIsLoading(false);
    }
};
