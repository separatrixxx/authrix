import { LinkTextProps } from './LinkText.props';
import styles from './LinkText.module.css';
import Link from 'next/link';
import { useLocale } from 'next-intl';


export default function LinkText({ link, text }: LinkTextProps) {
    const locale = useLocale();
    
    return (
        <Link href={link} className={styles.linkText} locale={locale}>
            {text}
        </Link>
    );
}
