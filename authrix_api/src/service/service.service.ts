import { Injectable, BadRequestException } from '@nestjs/common';
import { createNearConnection } from 'src/shared/utils/near.util';
import { CertificateInterface } from './interfaces/certificate.interface';


@Injectable()
export class ServiceService {
    private readonly contractId = 'authrix.testnet';
    private readonly networkId = 'testnet';

    // Get certificate information from NEAR
    // Получение информации о сертификате из NEAR
    async getCertificate(domain: string): Promise<CertificateInterface | null> {
        try {
            const near = await createNearConnection(this.networkId);

            const response = await near.connection.provider.query({
                request_type: 'call_function',
                account_id: this.contractId,
                method_name: 'getCertificateByDomain',
                args_base64: Buffer.from(JSON.stringify({ domain })).toString('base64'),
                finality: 'optimistic',
            });

            let certificate = null;

            if ('result' in response) {
                const resultArray = response.result as number[];
                certificate = Buffer.from(resultArray).toString('utf-8');
            }

            if (certificate.startsWith('"') && certificate.endsWith('"')) {
                certificate = certificate.slice(1, -1);
            }

            return certificate !== 'null' ? JSON.parse(certificate) : null;
        } catch (error) {
            console.error('Error fetching certificate from NEAR:', error);
            throw new Error('Error fetching certificate from NEAR');
        }
    }

    // Get certificate information by number from NEAR
    // Получение информации о сертификате по номеру из NEAR
    async getCertificateByNumber(certNumber: string): Promise<CertificateInterface | null> {
        try {
            const near = await createNearConnection(this.networkId);

            const response = await near.connection.provider.query({
                request_type: 'call_function',
                account_id: this.contractId,
                method_name: 'getCertificateByNumber',
                args_base64: Buffer.from(JSON.stringify({ certNumber })).toString('base64'),
                finality: 'optimistic',
            });

            let certificate = null;

            if ('result' in response) {
                const resultArray = response.result as number[];
                certificate = Buffer.from(resultArray).toString('utf-8');
            }

            if (certificate.startsWith('"') && certificate.endsWith('"')) {
                certificate = certificate.slice(1, -1);
            }

            if (certificate === 'null') {
                return null;
            }

            const fullCertificate = JSON.parse(certificate);

            // Возвращаем только нужные поля
            return {
                certNumber: fullCertificate.certNumber,
                domain: fullCertificate.domain,
                status: fullCertificate.status,
            } as CertificateInterface;

        } catch (error) {
            console.error('Error fetching certificate from NEAR:', error);
            throw new Error('Error fetching certificate from NEAR');
        }
    }

    // Register service and generate certificate in NEAR
    // Регистрация сервиса и генерация сертификата в NEAR
    async registerService(domain: string, name: string): Promise<{ message: string; certificate?: CertificateInterface }> {
        try {
            const existingCert = await this.getCertificate(domain);
            console.log(existingCert)

            if (existingCert) {
                const currentTime = Date.now();
                console.log('Current time:', currentTime);
                console.log('Certificate expire time:', existingCert.expiresAt);
                console.log('Certificate status:', existingCert.status);
                const isExpired = currentTime >= existingCert.expiresAt;
                const isActive = existingCert.status === 'active';

                if (isActive && !isExpired) {
                    throw new BadRequestException('Service already has active certificate');
                }
            }

            const certNumber = this.generateCertNumber();
            const serviceKey = this.generateServiceKey();

            const near = await createNearConnection(this.networkId);
            const account = await near.account(this.contractId);
            const gas = BigInt(30000000000000);

            await account.functionCall({
                contractId: this.contractId,
                methodName: 'storeCertificate',
                args: {
                    certNumber,
                    domain,
                    serviceKey,
                    name
                },
                gas: gas,
                attachedDeposit: BigInt(0),
            });

            const newCert = await this.getCertificate(domain);

            return {
                message: 'Service registered successfully',
                certificate: newCert
            };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }

            console.error('Error registering service in NEAR:', error);
            throw new Error('Error registering service in NEAR');
        }
    }

    // Generate certificate number in format AUTHRIX-XXXX-XXXX-XXXX
    // Генерация номера сертификата в формате AUTHRIX-XXXX-XXXX-XXXX
    private generateCertNumber(): string {
        const generateBlock = () =>
            Math.random().toString(36).substring(2, 6).toUpperCase();

        return `AUTHRIX-${generateBlock()}-${generateBlock()}-${generateBlock()}`;
    }

    // Generate service key
    // Генерация ключа сервиса
    private generateServiceKey(): string {
        return Array(32)
            .fill(0)
            .map(() => Math.random().toString(36).charAt(2))
            .join('');
    }
}
