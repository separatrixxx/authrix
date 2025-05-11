'use client'
import { CodeBlockProps } from './CodeBlock.props';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useResizeW } from '../../../hooks/useResize';


export default function CodeBlock({ children, className }: CodeBlockProps) {
    const match = /language-(\w+)/.exec(className || '');

    const width = useResizeW();

    return (
        <SyntaxHighlighter
            style={vscDarkPlus}
            language={match ? match[1] : 'typescript'}
            customStyle={{
                borderRadius: 10,
                fontSize: 14,
                width: `${width <= 800 ? '87vw' : '60vw'}`,
                boxSizing: 'border-box',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
            }}
            PreTag='div'
        >
            {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
    );
}
