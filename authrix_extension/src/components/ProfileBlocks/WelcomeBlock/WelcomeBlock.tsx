import { Htag } from 'components/Common/Htag/Htag';
import styles from './WelcomeBlock.module.css';
import { ru } from 'locales/ru.locale';
import { useAuthStore } from 'stores/auth.store';
import { getGreeting } from 'helpers/time.helper';
import { Avatar } from '../Avatar/Avatar';


export const WelcomeBlock = (): JSX.Element => {
    const { username } = useAuthStore();

    return (
        <div className={styles.welcomeBlock}>
            <Avatar username={username || ''} size={48} />
            <Htag tag='m' className={styles.welcomeText}>
                {ru[getGreeting()] + ', '}
                <br />
                <span>{username}</span>
            </Htag>
        </div>
    );
};
