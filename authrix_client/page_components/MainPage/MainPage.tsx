import { MainHeader } from '../../components/MainComponents/MainHeader/MainHeader';
import styles from './MainPage.module.css';
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';


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
                <MainHeader />
            </div>
        </>
    );
};
