import styles from './CheckPage.module.css';
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';
import MarkdownText from '../../components/DocsComponents/MarkdownText/MarkdownText';
import { markdownEn, markdownRu } from './checkMarkdown';
import { useLocale } from 'next-intl';
import { CheckCertificateBlock } from '../../components/ServiceComponents/CheckCertificateBlock/CheckCertificateBlock';


export const CheckPage = (): ReactNode => {
    const locale = useLocale();

    const markdown = locale === 'en' ? markdownEn : markdownRu;

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
                <MarkdownText markdown={markdown} />
                <CheckCertificateBlock />
            </div>
        </>
    );
};
