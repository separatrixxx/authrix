import styles from './Footer.module.css';
import { useRouter } from 'next/router';
import { Htag } from '../Common/Htag/Htag';


export const Footer = (): JSX.Element => {
    const router = useRouter();

    const version = 'authrix | Alpha 0.1.0 | by separatrix';

    return (
        <footer className={styles.footer}>
            <Htag tag='s' className={styles.versionTitle}>
                {version}
            </Htag>
        </footer>
    );
};
