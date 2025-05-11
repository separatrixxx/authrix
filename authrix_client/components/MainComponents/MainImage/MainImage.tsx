'use client'
import styles from './MainImage.module.css';
import { ReactNode } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Htag } from '../../Common/Htag/Htag';


export const MainImage = (): ReactNode => {
    const t = useTranslations('');

    return (
        <>
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
        </>
    );
};
