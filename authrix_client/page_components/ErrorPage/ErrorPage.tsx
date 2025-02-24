import { ErrorPageProps } from "./ErrorPage.props";
import styles from './ErrorPage.module.css';
import Link from "next/link";
import { Htag } from "../../components/Common/Htag/Htag";
import { useTranslations } from "next-intl";
import { ReactNode } from 'react';


export const ErrorPage = ({ error }: ErrorPageProps): ReactNode => {
    const t = useTranslations('');
    
    let errorText = '';

    if (error === 404) {
        errorText = t('error404');
    } else {
        errorText = t('error500');
    }

    return (
        <div className={styles.errorPage}>
            <Link href='/'>
                <Htag tag="l" className={styles.errorText}>
                    {errorText}
                </Htag>
            </Link>
        </div>
    );
};