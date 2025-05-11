import styles from './HeaderWeb.module.css';
import { ReactNode } from 'react';
import { Htag } from '../../Common/Htag/Htag';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { HeaderWebLink } from '../HeaderWebLink/HeaderWebLink';
import cn from 'classnames';


export const HeaderWeb = (): ReactNode => {
    const t = useTranslations('');
    const locale = useLocale();
    const otherLocale = locale === 'en' ? 'ru' : 'en';

    return (
        <header className={styles.header}>
            <Htag tag='xl' className={styles.headerText}>
                {t('authrix')}
            </Htag>
            <HeaderWebLink text='extension' link='/authrix_extension.zip' isTargetBlank={true} />
            <HeaderWebLink text='docs' link='/docs' />
            <HeaderWebLink text='github' link='https://github.com/separatrixxx/authrix'
                isTargetBlank={true} />
            <Link href={'/' + otherLocale} prefetch={false} aria-label='switch locale'>
                <Htag tag='s' className={cn(styles.headerText, styles.headerLink)}>
                    {t('switchLocale', { locale: otherLocale })}
                </Htag>
            </Link>
        </header>
    );
};
