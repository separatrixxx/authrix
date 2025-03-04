import { HeaderWebLinkProps } from './HeaderWebLink.props';
import styles from './HeaderWebLink.module.css';
import { ReactNode } from 'react';
import { Htag } from '../../Common/Htag/Htag';
import { useTranslations } from 'next-intl';
import Link from 'next/link';


export const HeaderWebLink = ({ text, link, onClick }: HeaderWebLinkProps): ReactNode => {
    const t = useTranslations('');

    return (
        <Link href={link} aria-label={`${text} link`} onClick={onClick}>
            <Htag tag='s' className={styles.headerLink}>
                {t(text)}
            </Htag>
        </Link>
    );
};
