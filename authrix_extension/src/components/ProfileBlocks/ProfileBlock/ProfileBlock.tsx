import styles from './ProfileBlock.module.css';
import { Button } from 'components/Common/Button/Button';
import { ru } from 'locales/ru.locale';
import { useAuthStore } from 'stores/auth.store';
import { WelcomeBlock } from '../WelcomeBlock/WelcomeBlock';


export const ProfileBlock = (): JSX.Element => {
    const { logout } = useAuthStore();
    
    return (
        <div className={styles.profileBlock}>
            <WelcomeBlock />
            <Button text={ru.log_out} onClick={logout} />
        </div>
    );
};
