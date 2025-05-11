import axios from 'axios';
import { CertificateInterface, CertificateResponse } from '../interfaces/certificate.interface';


export async function getCertificateFromServer(domain: string): Promise<CertificateResponse> {
    try {
        const response = await axios.get(`http://localhost:3001/service/certificate?domain=${domain}`);
        
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error getting certificate from server:', error.response?.data);
        }
        throw error;
    }
}

export async function getCertificateFromSite(domain: string): Promise<CertificateInterface | null> {
    try {
        const response = await axios.get(`http://${domain}/.well-known/authrix-cert.txt`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error getting certificate from site:', error.response?.data);
        }

        throw error;
    }
}

export function verifyCertificate(serverCert?: CertificateInterface, siteCert?: CertificateInterface | null): boolean {
    if (!serverCert || !siteCert) return false;

    return serverCert.certNumber === siteCert.certNumber &&
        serverCert.domain === siteCert.domain &&
        serverCert.status === siteCert.status &&
        serverCert.issuedAt === siteCert.issuedAt &&
        serverCert.expiresAt === siteCert.expiresAt;
}
