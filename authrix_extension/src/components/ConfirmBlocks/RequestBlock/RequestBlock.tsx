import { RequestBlockProps } from './RequestBlock.props';
import styles from './RequestBlock.module.css';
import { Htag } from 'components/Common/Htag/Htag';
import { ru } from 'locales/ru.locale';
import { Button } from 'components/Common/Button/Button';
import { useEffect, useState } from 'react';
import { CertificateInterface } from 'interfaces/certificate.interface';
import { getCertificateFromServer, getCertificateFromSite, verifyCertificate } from 'helpers/certificate.helper';
import cn from 'classnames';


export const RequestBlock = ({ serviceMessage, setIsConfirmed, setServiceKey }: RequestBlockProps): JSX.Element => {
    const [serverCertificate, setServerCertificate] = useState<CertificateInterface | undefined>();
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                setIsLoading(true);

                const serverResponse = await getCertificateFromServer(serviceMessage.domain);
                setServerCertificate(serverResponse.certificate);
                
                if (serverResponse.certificate?.serviceKey && setServiceKey) {
                    setServiceKey(serverResponse.certificate.serviceKey);
                }

                const siteCert = await getCertificateFromSite(serviceMessage.domain);

                setIsVerified(verifyCertificate(serverResponse.certificate, siteCert));
            } catch (error) {
                console.error('Error fetching certificates:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCertificates();
    }, [serviceMessage.domain]);

    const handleReject = async () => {
        try {
            const response = await chrome.runtime.sendMessage({
                type: 'AUTH_REJECTED'
            });
    
            if (response && response.success) {
                setTimeout(() => {
                    window.close();
                }, 100);
            } else {
                console.error('Failed to send rejection message:', response);
            }
        } catch (error) {
            console.error('Error sending rejection message:', error);
        }
    };

    if (isLoading) {
        return <Htag tag='m'>{ru.obtaining_certificate}</Htag>;
    }

    return (
        <>
            <div className={styles.requestBlock}>
                <Htag tag='m' className={styles.requestText}>
                    {serviceMessage.message}
                </Htag>
                <Htag tag='m' className={styles.requestText}>
                    {ru.domain + ': '}
                    <span>{serviceMessage.domain}</span>
                </Htag>
                <Htag tag='m' className={styles.requestText}>
                    {ru.certificate + ': '}
                    <span>{serverCertificate?.certNumber || ru.certificate_not_found}</span>
                </Htag>
                <Htag tag='m' className={styles.requestText}>
                    {ru.status + ': '}
                    <span>{serverCertificate?.status || ru.status_unknown}</span>
                </Htag>
                <Htag tag='m' className={cn(styles.requestText, styles.verified, {
                    [styles.notVerified]: !isVerified,
                })}>
                    {isVerified ? ru.certificate_verified : ru.certificate_not_verified}
                </Htag>
            </div>
            <div className={styles.buttonsDiv}>
                <Button className={styles.confirmButton} text={ru.confirm}
                    onClick={() => setIsConfirmed(true)} />
                <Button className={styles.rejectButton} text={ru.reject}
                    onClick={handleReject} />
            </div>
        </>
    );
};
