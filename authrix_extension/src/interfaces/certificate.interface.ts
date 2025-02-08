export interface CertificateInterface {
    certNumber: string,
    domain: string,
    serviceKey?: string,
    status: string,
    issuedAt: number,
    expiresAt: number,
}

export interface CertificateResponse {
    message: string,
    certificate?: CertificateInterface,
}
