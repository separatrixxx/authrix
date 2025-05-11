'use client'
import styles from './CheckCertificateBlock.module.css';
import { ReactNode, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '../../Common/Input/Input';
import { Button } from '../../Common/Button/Button';
import { ServiceCertificate } from '../RegisterForm/registerService.interface';
import { CertificateInfo } from '../CertificateInfo/CertificateInfo';
import { chechService } from './checkCertificate.helper';


export const CheckCertificateBlock = (): ReactNode => {
    const t = useTranslations('');

    const [domainOrCert, setDomainOrCert] = useState<string>('');
    const [errorDomainOrCert, setErrorDomainOrCert] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [certificate, setCertificate] = useState<ServiceCertificate | null>(null);

    return (
        <>
            <div className={styles.checkCertificateBlock}>
                <Input text={t('domain_or_certificate_number')} value={domainOrCert}
                    isError={errorDomainOrCert} onChange={(e) => setDomainOrCert(e.target.value)} />
                <Button text={t('check_cerfice')} isLoading={isLoading}
                    onClick={() => chechService({
                        domainOrCert: domainOrCert.trim(),
                        translations: {
                            service_not_found: t('service_not_found'),
                            service_successfully_found: t('service_successfully_found'),
                            enter_domain_or_certificate_number: t('enter_domain_or_certificate_number'),
                        },
                        setErrorDomainOrCert,
                        setIsLoading,
                        setCertificate,
                    })} />
            </div>
            {
                certificate && <CertificateInfo certificate={certificate} />
            }
        </>
    );
};
