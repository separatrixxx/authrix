import { HeaderMobLinkProps } from './HeaderMobLink.props';
import styles from './HeaderMobLink.module.css';
import { ReactNode } from 'react';
import { Htag } from '../../Common/Htag/Htag';
import { useTranslations } from 'next-intl';
import Link from 'next/link';


export const HeaderMobLink = ({ text, link }: HeaderMobLinkProps): ReactNode => {
    const t = useTranslations('');

    return (
        <Link href={link} aria-label={`${text} link`}>
            <Htag tag='l' className={styles.headerLink}>
                {t(text)}
            </Htag>
        </Link>
    );
};
