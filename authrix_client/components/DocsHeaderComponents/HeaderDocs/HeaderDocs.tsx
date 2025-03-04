import { ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { HeaderDocsWeb } from '../HeaderDocsWeb/HeaderDocsWeb';
import { HeaderDocsMob } from '../HeaderDocsMob/HeaderDocsMob';


export const HeaderDocs = (): ReactNode => {
    const t = useTranslations('');
    const locale = useLocale();
    const otherLocale = locale === 'en' ? 'ru' : 'en';

    const translations = {
        authrix: t('authrix'),
        docs: t('docs'),
        switchLocale: t('switchLocale', { locale: otherLocale }),
    };

    return (
        <>
            <HeaderDocsWeb />
            <HeaderDocsMob translations={translations} otherLocale={otherLocale} />
        </>
    );
};
