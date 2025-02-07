import styles from './MainPage.module.css';
import { Toaster } from 'react-hot-toast';
import { GeneratorBlock } from '../../components/GeneratorBlock/GeneratorBlock';
import { Footer } from '../../components/Footer/Footer';


export const MainPage = (): JSX.Element => {
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
                <GeneratorBlock />
                {/* <Footer /> */}
            </div>
        </>
    );
};
