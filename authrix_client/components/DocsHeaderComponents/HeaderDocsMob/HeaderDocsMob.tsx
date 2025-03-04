'use client'
import { HeaderDocsMobProps } from './HeaderDocsMob.props';
import styles from './HeaderDocsMob.module.css';
import { ReactNode, useState } from 'react';
import { Htag } from '../../Common/Htag/Htag';
import Link from 'next/link';
import { Icon } from '../../Common/Icon/Icon';
import { motion, AnimatePresence } from 'framer-motion';
import { HeaderLink } from '../HeaderLink/HeaderLink';
import { usePathname } from 'next/navigation';
import cn from 'classnames';


export const HeaderDocsMob = ({ translations, otherLocale }: HeaderDocsMobProps): ReactNode => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const pathname = usePathname();
    const path = pathname.split('/')[3];

    return (
        <header className={cn(styles.header, {
            [styles.headerOpen]: isMenuOpen,
        })}>
            <div className={styles.headerContent}>
                <Htag tag='s' className={styles.headerText}>
                    {translations.authrix}
                    <span>
                        {' | ' + translations.docs.toLowerCase()}
                    </span>
                </Htag>
                <Icon type={!isMenuOpen ? 'burger' : 'close'} className={styles.headerIcon}
                    onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </div>
            <AnimatePresence>
                {
                    isMenuOpen && (
                        <motion.div className={styles.headerDiv}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'fit-content', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}>
                            <HeaderLink text='introduction' link='/docs/introduction'
                                isActive={path === 'introduction'}
                                onClick={() => setIsMenuOpen(false)} />
                            <HeaderLink text='service_registration' link='/docs/service-registration'
                                isActive={path === 'service-registration'}
                                onClick={() => setIsMenuOpen(false)} />
                            <HeaderLink text='widget' link='/docs/widget'
                                isActive={path === 'widget'}
                                onClick={() => setIsMenuOpen(false)} />
                            <Link href={'/' + otherLocale + '/docs/introduction'} prefetch={false} aria-label='switch locale'
                                onClick={() => setIsMenuOpen(false)}>
                                <Htag tag='m' className={cn(styles.headerText, styles.headerLink)}>
                                    {translations.switchLocale}
                                </Htag>
                            </Link>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </header>
    );
};
