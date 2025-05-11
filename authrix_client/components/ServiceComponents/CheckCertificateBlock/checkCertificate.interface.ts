export interface CheckCertificate {
    domainOrCert: string,
    translations: {
        service_not_found: string,
        service_successfully_found: string,
        enter_domain_or_certificate_number: string,
    },
    setErrorDomainOrCert: (e: boolean) => void,
    setIsLoading: (e: boolean) => void,
    setCertificate: (e: ServiceCertificate | null) => void,
}

export interface ServiceCertificate {
    certNumber: string,
    domain: string,
    expiresAt: number,
    issuedAt: number,
    serviceKey: string,
    status: string,
}
