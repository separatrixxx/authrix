import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface MarkdownTextProps extends DetailedHTMLProps<HTMLAttributes<HTMLBaseElement>, HTMLBaseElement> {
    markdown: string,
}
