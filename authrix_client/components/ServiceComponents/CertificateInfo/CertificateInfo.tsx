'use client'
import { CertificateInfoProps } from './CertificateInfo.props';
import styles from './CertificateInfo.module.css';
import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Htag } from '../../Common/Htag/Htag';
import cn from 'classnames';


export const CertificateInfo = ({ certificate }: CertificateInfoProps): ReactNode => {
    const t = useTranslations('');

    const { domain, certNumber, status } = certificate;

    return (
        <div className={styles.certificateInfo}>
            <Htag tag='s'>
                {t('domain') + ': '}
                <span className={styles.spanInfo}>
                    {domain}
                </span>
            </Htag>
            <Htag tag='s'>
                {t('certificate_number') + ': '}
                <span className={styles.spanInfo}>
                    {certNumber}
                </span>
            </Htag>
            <Htag tag='s'>
                {t('status') + ': '}
                <span className={cn(styles.spanInfo, styles.statusActive, {
                    [styles.statusNotActive]: status !== 'active',
                })}>
                    {status}
                </span>
            </Htag>
        </div>
    );
};
