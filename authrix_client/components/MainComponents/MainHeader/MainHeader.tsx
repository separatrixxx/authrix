import styles from './MainHeader.module.css';
import { ReactNode } from 'react';
import { Htag } from '../../Common/Htag/Htag';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import cn from 'classnames';


export const MainHeader = (): ReactNode => {
    const t = useTranslations('');
    const locale = useLocale();
    const otherLocale = locale === 'en' ? 'ru' : 'en';

    return (
        <header className={styles.mainHeader}>
            <Htag tag='xl' className={styles.headerText}>
                {t('authrix')}
            </Htag>
            <Link href='/' aria-label='download extension link'>
                <Htag tag='s' className={cn(styles.headerText, styles.headerLink)}>
                    {t('extension')}
                </Htag>
            </Link>
            <Link href='/docs' aria-label='docs link'>
                <Htag tag='s' className={cn(styles.headerText, styles.headerLink)}>
                    {t('docs')}
                </Htag>
            </Link>
            <Link href='https://github.com/separatrixxx/authrix' target='_blank'
                aria-label='github link'>
                <Htag tag='s' className={cn(styles.headerText, styles.headerLink)}>
                    {t('github')}
                </Htag>
            </Link>
            <Link href={'/' + otherLocale} prefetch={false} aria-label='switch locale'>
                <Htag tag='s' className={cn(styles.headerText, styles.headerLink)}>
                    {t('switchLocale', { locale: otherLocale })}
                </Htag>
            </Link>
        </header>
    );
};
