import { NearBindgen, near, call, view } from 'near-sdk-js';


// Prefix for storage keys
// Префикс для ключей в хранилище
const KEY_HASHES_PREFIX = "keyHashes:";
const MNEMONIC_HASHES_PREFIX = "mnemonicHashes:";
const CERTIFICATES_PREFIX = "certificates:";
const DOMAIN_TO_CERT_PREFIX = "domainToCert:";

interface CertificateInterface {
  certNumber: string,
  domain: string,
  serviceKey: string,
  status: 'active' | 'revoked' | 'expired',
  issuedAt: number,
  expiresAt: number,
}

@NearBindgen({})
export class KeyValueContract {
  // Store public key hash
  // Сохранение хэша публичного ключа
  @call({})
  storeKeyHash({ accountId, keyHash }: { accountId: string, keyHash: string }): void {
    const storageKey = `${KEY_HASHES_PREFIX}${accountId}`;

    near.storageWrite(storageKey, keyHash);
    near.log(`Key hash stored for account: ${accountId}`);
  }

  // Get public key hash
  // Получение хэша публичного ключа
  @view({})
  getKeyHash({ accountId }: { accountId: string }): string | null {
    const storageKey = `${KEY_HASHES_PREFIX}${accountId}`;
    const value = near.storageRead(storageKey);

    return value;
  }

  // Store username using mnemonic phrase hash
  // Сохранение юзернейма с использованием хэша мнемонической фразы
  @call({})
  storeUsernameWithMnemonicHash({ mnemonicHash, username }: { mnemonicHash: string, username: string }): void {
    const storageKey = `${MNEMONIC_HASHES_PREFIX}${mnemonicHash}`;

    near.storageWrite(storageKey, username);
    near.log(`Username stored for mnemonic hash: ${mnemonicHash}`);
  }

  // Get username by mnemonic phrase hash
  // Получение юзернейма по хэшу мнемонической фразы
  @view({})
  getUsernameByMnemonicHash({ mnemonicHash }: { mnemonicHash: string }): string | null {
    const storageKey = `${MNEMONIC_HASHES_PREFIX}${mnemonicHash}`;
    const value = near.storageRead(storageKey);

    return value;
  }

  // Store certificate
  // Сохранение сертификата
  @call({})
  storeCertificate({ certNumber, domain, serviceKey }: { certNumber: string, domain: string, serviceKey: string }): void {
    const currentTimestamp = near.blockTimestamp();
    const currentTimeMs = Number(currentTimestamp / BigInt(1_000_000));

    const cert: CertificateInterface = {
      certNumber,
      domain,
      serviceKey,
      status: 'active',
      issuedAt: currentTimeMs,
      expiresAt: currentTimeMs + (365 * 24 * 60 * 60 * 1000),
    };

    const certKey = `${CERTIFICATES_PREFIX}${certNumber}`;
    near.storageWrite(certKey, JSON.stringify(cert));

    const domainKey = `${DOMAIN_TO_CERT_PREFIX}${domain}`;
    near.storageWrite(domainKey, certNumber);

    near.log(`Certificate stored: ${certNumber} for domain: ${domain}`);
  }

  // Get certificate by number
  // Получение сертификата по номеру
  @view({})
  getCertificateByNumber({ certNumber }: { certNumber: string }): CertificateInterface | null {
    const storageKey = `${CERTIFICATES_PREFIX}${certNumber}`;
    const value = near.storageRead(storageKey);

    return value ? JSON.parse(value) : null;
  }

  // Get certificate by domain
  // Получение сертификата по домену
  @view({})
  getCertificateByDomain({ domain }: { domain: string }): CertificateInterface | null {
    const domainKey = `${DOMAIN_TO_CERT_PREFIX}${domain}`;
    const certNumber = near.storageRead(domainKey);

    if (!certNumber) {
      return null;
    }

    const certKey = `${CERTIFICATES_PREFIX}${certNumber}`;
    const cert = near.storageRead(certKey);

    return cert ? JSON.parse(cert) : null;
  }

  // Update certificate status
  // Обновление статуса сертификата
  @call({})
  updateCertificateStatus({ certNumber, status }: { certNumber: string, status: 'active' | 'revoked' | 'expired' }): void {
    const certKey = `${CERTIFICATES_PREFIX}${certNumber}`;
    const certStr = near.storageRead(certKey);

    if (!certStr) {
      throw new Error('Certificate not found');
    }

    const cert: CertificateInterface = JSON.parse(certStr);
    cert.status = status;

    near.storageWrite(certKey, JSON.stringify(cert));
    near.log(`Certificate ${certNumber} status updated to: ${status}`);
  }
}