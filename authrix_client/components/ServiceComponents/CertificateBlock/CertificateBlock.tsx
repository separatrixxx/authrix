'use client'
import { CertificateBlockProps } from './CertificateBlock.props';
import styles from './CertificateBlock.module.css';
import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { copyToClipboard } from './clipboard.helper';
import { Button } from '../../Common/Button/Button';


export const CertificateBlock = ({ certificate }: CertificateBlockProps): ReactNode => {
    const t = useTranslations('');

    const { certNumber, domain, serviceKey, status, issuedAt, expiresAt } = certificate;

    const handleDownload = () => {

        const certData = {
            certNumber, domain, status, issuedAt, expiresAt
        };

        const content = JSON.stringify(certData, null, 4);
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'authrix-cert.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const handleCopy = () => {
        copyToClipboard(
            serviceKey,
            t('service_key_has_been_copied'),
            t('failed_to_copy_service_key')
        );
    };

    return (
        <div className={styles.certificateBlock}>
            <div className={styles.serviceKey} onClick={handleCopy}>
                {serviceKey}
            </div>
            <Button text={t('download_certificate')}
                onClick={handleDownload} />
        </div>
    );
};
