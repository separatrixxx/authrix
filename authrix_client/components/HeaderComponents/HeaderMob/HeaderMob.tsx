'use client'
import { HeaderMobProps } from './HeaderMob.props';
import styles from './HeaderMob.module.css';
import { ReactNode, useState } from 'react';
import { Htag } from '../../Common/Htag/Htag';
import Link from 'next/link';
import { Icon } from '../../Common/Icon/Icon';
import { motion, AnimatePresence } from 'framer-motion';
import { HeaderWebLink } from '../HeaderWebLink/HeaderWebLink';
import cn from 'classnames';


export const HeaderMob = ({ translations, otherLocale }: HeaderMobProps): ReactNode => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <header className={cn(styles.header, {
            [styles.headerOpen]: isMenuOpen,
        })}>
            <div className={styles.headerContent}>
                <Htag tag='xl' className={styles.headerText}>
                    {translations.authrix}
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
                            <HeaderWebLink text='extension' link='/' onClick={() => setIsMenuOpen(false)} />
                            <HeaderWebLink text='docs' link='/docs' onClick={() => setIsMenuOpen(false)} />
                            <HeaderWebLink text='github' link='https://github.com/separatrixxx/authrix'
                                onClick={() => setIsMenuOpen(false)} />
                            <Link href={'/' + otherLocale} prefetch={false} aria-label='switch locale'
                                onClick={() => setIsMenuOpen(false)}>
                                <Htag tag='s' className={cn(styles.headerText, styles.headerLink)}>
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
