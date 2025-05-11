import styles from './WidgetPage.module.css';
import { ReactNode } from 'react';
import MarkdownText from '../../components/DocsComponents/MarkdownText/MarkdownText';
import { markdownEn, markdownRu } from './widgetMarkdown';
import { useLocale } from 'next-intl';


export const WidgetPage = (): ReactNode => {
    const locale = useLocale();

    const markdown = locale === 'en' ? markdownEn : markdownRu;

    return (
        <div className={styles.wrapper}>
            <MarkdownText markdown={markdown} />
        </div>
    );
};
