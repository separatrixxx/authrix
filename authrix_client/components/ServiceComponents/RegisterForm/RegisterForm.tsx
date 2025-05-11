'use client'
import styles from './RegisterForm.module.css';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '../../Common/Input/Input';
import { Button } from '../../Common/Button/Button';
import { registerService } from './registerService.helper';
import { ServiceCertificate } from './registerService.interface';
import { CertificateBlock } from '../CertificateBlock/CertificateBlock';


export const RegisterForm = (): ReactNode => {
    const t = useTranslations('');

    const [domain, setDomain] = useState<string>('');
    const [serviceName, setServicename] = useState<string>('');

    const [errorDomain, setErrorDomain] = useState<boolean>(false);
    const [errorServiceName, setErrorServiceName] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [certificate, setCertificate] = useState<ServiceCertificate | null>(null);

    useEffect(() => {
        const localCertificate = localStorage.getItem('certificate');

        if (localCertificate) {
            setCertificate(JSON.parse(localCertificate));
        }
    }, []);

    return (
        <>
            <div className={styles.registerForm}>
                <Input text={t('domain') + ' (example.com)'} value={domain}
                    isError={errorDomain} onChange={(e) => setDomain(e.target.value)} />
                <Input text={t('service_name') + ' (My Service)'} value={serviceName}
                    isError={errorServiceName} onChange={(e) => setServicename(e.target.value)} />
                <Button text={t('register_service')} isLoading={isLoading}
                    onClick={() => registerService({
                        domain: domain.trim(),
                        serviceName: serviceName.trim(),
                        translations: {
                            enter_valid_domain: t('enter_valid_domain'),
                            enter_service_name: t('enter_service_name'),
                            service_successfully_egistered: t('service_successfully_egistered'),
                            register_service_error: t('register_service_error'),
                            service_has_already_been_registered: t('service_has_already_been_registered'),
                        },
                        setErrorDomain,
                        setErrorServiceName,
                        setIsLoading,
                        setCertificate,
                    })} />
            </div>
            {
                certificate && <CertificateBlock certificate={certificate} />
            }
        </>
    );
};
