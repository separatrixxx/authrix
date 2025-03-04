import styles from './HeaderDocsWeb.module.css';
import { ReactNode } from 'react';
import { Htag } from '../../Common/Htag/Htag';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import cn from 'classnames';


export const HeaderDocsWeb = (): ReactNode => {
    const t = useTranslations('');
    const locale = useLocale();
    const otherLocale = locale === 'en' ? 'ru' : 'en';

    return (
        <header className={styles.header}>
            <Htag tag='m' className={styles.headerText}>
                {t('authrix')}
                <span>
                    {' | ' + t('docs').toLowerCase()}
                </span>
            </Htag>
            <Link href={'/' + otherLocale + '/docs/introduction'} prefetch={false} aria-label='switch locale'>
                <Htag tag='s' className={cn(styles.headerText, styles.headerLink)}>
                    {t('switchLocale', { locale: otherLocale })}
                </Htag>
            </Link>
        </header>
    );
};
