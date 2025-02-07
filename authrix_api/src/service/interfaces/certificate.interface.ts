export interface CertificateInterface {
    certNumber: string,
    domain: string,
    status: 'active' | 'revoked' | 'expired',
    serviceKey?: string,
    issuedAt?: number,
    expiresAt?: number,
}
