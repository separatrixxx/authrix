'use client'
import styles from './MainPage.module.css';
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';
import { Header } from '../../components/HeaderComponents/Header/Header';
import Image from 'next/image';
import { Htag } from '../../components/Common/Htag/Htag';
import { useTranslations } from 'next-intl';


export const MainPage = (): ReactNode => {
    const t = useTranslations('');

    return (
        <div className={styles.wrapper}>
            <Header />
            <Image className={styles.mainImage} draggable='false'
                loader={() => '/MainImage.webp'}
                src='/MainImage.webp'
                alt='main image '
                width={1}
                height={1}
                priority={true}
            />
            <Htag tag='xxl' className={styles.slogan}>
                {t('slogan')}
            </Htag>
        </div>
    );
};
