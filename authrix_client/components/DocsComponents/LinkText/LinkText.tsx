import { LinkTextProps } from './LinkText.props';
import styles from './LinkText.module.css';
import Link from 'next/link';


export default function LinkText({ link, text }: LinkTextProps) {    
    const isTargetBlank = link.includes('.zip');

    return (
        <Link href={link} className={styles.linkText} target={isTargetBlank ? '_blank' : ''}>
            {text}
        </Link>
    );
}
