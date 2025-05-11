import { MarkdownTextProps } from './MarkdownText.props';
import styles from './MarkdownText.module.css';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../CodeBlock/CodeBlock';
import remarkGfm from 'remark-gfm';
import { preprocessMarkdown } from './markdown.helper';
import LinkText from '../LinkText/LinkText';


export default function MarkdownText({ markdown }: MarkdownTextProps) {
    const parsedMarkdown = preprocessMarkdown(markdown);

    return (
        <div className={styles.markdownText}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code: CodeBlock,
                    table: ({ ...props }) => (
                        <div className={styles.markdownTable}>
                            <table {...props} />
                        </div>
                    ),
                    a: ({ href, children }) => (
                        <LinkText link={href || ''} text={children} />
                    ),
                }}
            >
                {parsedMarkdown}
            </ReactMarkdown>
        </div>
    );
}
