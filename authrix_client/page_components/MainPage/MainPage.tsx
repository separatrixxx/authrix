import styles from './MainPage.module.css';
import { ReactNode } from 'react';
import { Header } from '../../components/HeaderComponents/Header/Header';
import { useTranslations } from 'next-intl';
import { MainImage } from '../../components/MainComponents/MainImage/MainImage';


export const MainPage = (): ReactNode => {
    const t = useTranslations('');

    return (
        <div className={styles.wrapper}>
            <Header />
            <MainImage />
        </div>
    );
};
