import styles from './RecoverBlock.module.css';
import { ru } from 'locales/ru.locale';
import { Input } from 'components/Common/Input/Input';
import { useState } from 'react';
import { Button } from 'components/Common/Button/Button';
import { handleRecover } from 'helpers/recover.helper';
import { KeysInterface } from 'interfaces/keys.interface';
import { KeysBlock } from '../KeysBlock/KeysBlock';


export const RecoverBlock = (): JSX.Element => {
    const [keys, setKeys] = useState<KeysInterface | null>(null);

    const [username, setUsername] = useState<string>('');
    const [mnemonic, setMnemonic] = useState<string>('');

    const [errorUsername, setErrorUsername] = useState<boolean>(false);
    const [errorMnemonic, setErrorMnemonic] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <>
            <div className={styles.recoverBlock}>
                <Input text={ru.username} value={username} isError={errorUsername}
                    onChange={e => setUsername(e.target.value)} />
                <Input text={ru.mnemonic} value={mnemonic} isError={errorMnemonic}
                    onChange={e => setMnemonic(e.target.value)} />
                <Button text={ru.recover_keys} isLoading={isLoading} onClick={() => handleRecover({
                    username: username.trim(),
                    mnemonic: mnemonic.trim(),
                    setErrorUsername,
                    setErrorMnemonic,
                    setKeys,
                    setIsLoading,
                })} />
            </div>
            {
                keys && <KeysBlock username={username} keys={keys} />
            }
        </>
    );
};
