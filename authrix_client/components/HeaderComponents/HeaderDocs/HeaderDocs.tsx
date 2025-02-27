import styles from './HeaderDocs.module.css';
import { ReactNode } from 'react';
import { Htag } from '../../Common/Htag/Htag';
import { useTranslations } from 'next-intl';


export const HeaderDocs = (): ReactNode => {
    const t = useTranslations('');

    return (
        <header className={styles.header}>
            <Htag tag='m' className={styles.headerText}>
                {t('authrix')}
                <span>
                    {' | ' + t('docs').toLowerCase()}
                </span>
            </Htag>
        </header>
    );
};
