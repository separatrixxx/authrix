import { PrivateKeyBlockProps } from './PrivateKeyBlock.props';
import styles from './PrivateKeyBlock.module.css';
import { useState } from 'react';
import { ru } from 'locales/ru.locale';
import { Button } from 'components/Common/Button/Button';
import { Input } from 'components/Common/Input/Input';
import { useAuthStore } from 'stores/auth.store';
import { handleConfirm } from 'helpers/confirm.helper';


export const PrivateKeyBlock = ({ serviceKey }: PrivateKeyBlockProps): JSX.Element => {
    const { username } = useAuthStore();

    const [privateKey, setPrivateKey] = useState<string>('');
    const [errorPrivateKey, setErrorPrivateKey] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <div className={styles.privateKeyBlock}>
            <Input text={ru.private_key} value={privateKey} isError={errorPrivateKey}
                onChange={e => setPrivateKey(e.target.value)} />
            <Button text={ru.confirm} isLoading={isLoading}
                onClick={() => handleConfirm({
                    username: username || '',
                    privateKey,
                    serviceKey,
                    setErrorPrivateKey,
                    setIsLoading,
                })} />
        </div>
    );
};
