export interface RegisterService {
    domain: string,
    serviceName: string,
    translations: {
        enter_valid_domain: string,
        enter_service_name: string,
        service_successfully_egistered: string,
        register_service_error: string,
        service_has_already_been_registered: string,
    },
    setErrorDomain: (e: boolean) => void,
    setErrorServiceName: (e: boolean) => void,
    setIsLoading: (e: boolean) => void,
    setCertificate: (e: ServiceCertificate) => void,
}

export interface ServiceCertificate {
    certNumber: string,
    domain: string,
    expiresAt: number,
    issuedAt: number,
    serviceKey: string,
    status: string,
}
