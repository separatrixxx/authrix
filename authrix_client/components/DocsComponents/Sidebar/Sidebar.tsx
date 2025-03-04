'use client'
import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';
import Link from 'next/link';
import { Htag } from '../../Common/Htag/Htag';
import { usePathname } from 'next/navigation';
import cn from 'classnames';


export default function Sidebar({ translations }: SidebarProps) {
    const pathname = usePathname();
    const path = pathname.split('/')[3];

    return (
        <div className={styles.sidebar}>
            <Link href='/docs/introduction' className={cn(styles.sidebarLink, {
                [styles.activeLink]: path === 'introduction',
            })} aria-label='introduction link'>
                <Htag tag='s'>
                    {translations.introduction}
                </Htag>
            </Link>
            <Link href='/docs/service-registration' className={cn(styles.sidebarLink, {
                [styles.activeLink]: path === 'service-registration',
            })}
                aria-label='service registration link'>
                <Htag tag='s'>
                    {translations.service_registration}
                </Htag>
            </Link>
            <Link href='/docs/widget' className={cn(styles.sidebarLink, {
                [styles.activeLink]: path === 'widget',
            })}
                aria-label='widget link'>
                <Htag tag='s'>
                    {translations.widget}
                </Htag>
            </Link>
        </div>
    );
}
