import { HeaderMobLinkProps } from './HeaderLink.props';
import styles from './HeaderLink.module.css';
import { ReactNode } from 'react';
import { Htag } from '../../Common/Htag/Htag';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import cn from 'classnames';


export const HeaderLink = ({ text, link, isActive, onClick }: HeaderMobLinkProps): ReactNode => {
    const t = useTranslations('Sidebar');

    return (
        <Link href={link} aria-label={`${text} link`} onClick={onClick}>
            <Htag tag='m' className={cn(styles.headerLink, {
                [styles.activeLink]: isActive,
            })}>
                {t(text)}
            </Htag>
        </Link>
    );
};
