import styles from './GenerateBlock.module.css';
import { ru } from 'locales/ru.locale';
import { Input } from 'components/Common/Input/Input';
import { useState } from 'react';
import { Button } from 'components/Common/Button/Button';
import { KeysInterface } from 'interfaces/keys.interface';
import { handleGenerate } from 'helpers/generate.helper';
import { KeysBlock } from '../KeysBlock/KeysBlock';


export const GenerateBlock = (): JSX.Element => {
    const [keys, setKeys] = useState<KeysInterface | null>(null);

    const [username, setUsername] = useState<string>('');
    const [errorUsername, setErrorUsername] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <>
            <div className={styles.generateBlock}>
                <Input text={ru.username} value={username} isError={errorUsername}
                    onChange={e => setUsername(e.target.value)} />
                <Button text={ru.generate} isLoading={isLoading} onClick={() => handleGenerate({
                    username: username.trim(),
                    setErrorUsername,
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
