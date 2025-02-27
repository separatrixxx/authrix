import styles from './MainPage.module.css';
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';
import { Header } from '../../components/HeaderComponents/Header/Header';


export const MainPage = (): ReactNode => {
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={true}
                toastOptions={{
                    duration: 2000,
                }}
            />
            <div className={styles.wrapper}>
                <Header />
            </div>
        </>
    );
};
