import { ReactNode } from 'react';
import { HeaderWeb } from '../HeaderWeb/HeaderWeb';
import { HeaderMob } from '../HeaderMob/HeaderMob';
import { useLocale, useTranslations } from 'next-intl';


export const Header = (): ReactNode => {
    const t = useTranslations('');
    const locale = useLocale();
    const otherLocale = locale === 'en' ? 'ru' : 'en';

    const translations = {
        authrix: t('authrix'),
        switchLocale: t('switchLocale', { locale: otherLocale })
    };

    return (
        <>
            <HeaderWeb />
            <HeaderMob translations={translations} otherLocale={otherLocale} />
        </>
    );
};
