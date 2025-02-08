import styles from './AuthBlock.module.css';
import { ru } from 'locales/ru.locale';
import { Input } from 'components/Common/Input/Input';
import { useState } from 'react';
import { Button } from 'components/Common/Button/Button';
import { handleAuth } from 'helpers/auth.helper';


export const AuthBlock = (): JSX.Element => {
    const [username, setUsername] = useState<string>('');
    const [mnemonic, setMnemonic] = useState<string>('');

    const [errorUsername, setErrorUsername] = useState<boolean>(false);
    const [errorMnemonic, setErrorMnemonic] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <div className={styles.authBlock}>
            <Input text={ru.username} value={username} isError={errorUsername}
                onChange={e => setUsername(e.target.value)} />
            <Input text={ru.mnemonic} value={mnemonic} isError={errorMnemonic}
                onChange={e => setMnemonic(e.target.value)} />
            <Button text={ru.log_in} isLoading={isLoading} onClick={() => handleAuth({
                username: username.trim(),
                mnemonic: mnemonic.trim(),
                setErrorUsername,
                setErrorMnemonic,
                setIsLoading,
            })} />
        </div>
    );
};
