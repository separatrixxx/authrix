'use client'
import { LinkTextProps } from './LinkText.props';
import styles from './LinkText.module.css';
import Link from 'next/link';


export default function LinkText({ link, text }: LinkTextProps) {    
    return (
        <Link href={link} className={styles.linkText}>
            {text}
        </Link>
    );
}
