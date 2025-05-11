import styles from './IntroductionPage.module.css';
import { ReactNode } from 'react';
import MarkdownText from '../../components/DocsComponents/MarkdownText/MarkdownText';
import { markdownEn, markdownRu } from './introductionMarkdown';
import { useLocale } from 'next-intl';


export const IntroductionPage = (): ReactNode => {
    const locale = useLocale();

    const markdown = locale === 'en' ? markdownEn : markdownRu;

    return (
        <div className={styles.wrapper}>
            <MarkdownText markdown={markdown} />
        </div>
    );
};
