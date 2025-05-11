import styles from './ServicePage.module.css';
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';
import MarkdownText from '../../components/DocsComponents/MarkdownText/MarkdownText';
import { markdownEn, markdownRu } from './serviceMarkdown';
import { useLocale } from 'next-intl';
import { RegisterForm } from '../../components/ServiceComponents/RegisterForm/RegisterForm';


export const ServicePage = (): ReactNode => {
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
                <MarkdownText markdown={markdown.part1} />
                <RegisterForm />
                <MarkdownText markdown={markdown.part2} />
            </div>
        </>
    );
};
