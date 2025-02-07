import styles from './GeneratorBlock.module.css';
import { Input } from '../../components/Common/Input/Input';
import { setLocale } from '../../helpers/locale.helper';
import { Button } from '../../components/Common/Button/Button';
import { downloadKey, authCheck, loginUser, recoverCheck } from '../../helpers/auth.helper';
import { Htag } from '../Common/Htag/Htag';
import { useSetup } from '../../hooks/useSetup';
import { useHelpStates } from '../../hooks/useHelpStates';
import { useState } from 'react';


export const GeneratorBlock = (): JSX.Element => {
    const { router } = useSetup();

    const { username, errorUsername, isLoading, keys,
        setUsername, setErrorUsername, setErrorEmail, setIsLoading, setKeys } = useHelpStates();

    const [keyUsername, setKeyUsername] = useState<string>('');
    const [publicKey, setPublicKey] = useState<string>('');
    const [privateKey, setPrivateKey] = useState<string>('');

    const [errorKeyUsername, setErrorKeyUsername] = useState<boolean>(false);
    const [errorPublicKey, setErrorPublicKey] = useState<boolean>(false);

    const [isKeyLoading, setIsKeyLoading] = useState<boolean>(false);

    const [changeUsername, setChangeUsername] = useState<string>('');
    const [mnemonic, setMnemonic] = useState<string>('');

    const [errorChangeUsername, setErrorChangeUsername] = useState<boolean>(false);
    const [errorMnemonic, setErrorMnemonic] = useState<boolean>(false);

    const [isMnemonicLoading, setIsMnemonicLoading] = useState<boolean>(false);

    return (
        <div className={styles.generatorBlock}>
            <Input text={setLocale(router.locale).username} value={username}
                error={errorUsername} onChange={(e) => setUsername(e.target.value)} />
            <Button text={setLocale(router.locale).register} isLoading={isLoading}
                onClick={() => authCheck({
                    router: router,
                    username: username,
                    setErrorUsername: setErrorUsername,
                    setIsLoading: setIsLoading,
                    setKeys: setKeys,
                })} />
            <br />
            <Input text={setLocale(router.locale).username} value={keyUsername}
                error={errorKeyUsername} onChange={(e) => setKeyUsername(e.target.value)} />
            <Input text={setLocale(router.locale).public_key} value={publicKey}
                error={errorPublicKey} onChange={(e) => setPublicKey(e.target.value)} />
            <Input text={setLocale(router.locale).private_key} value={privateKey}
                error={errorPublicKey} onChange={(e) => setPrivateKey(e.target.value)} />
            <Button text={setLocale(router.locale).login} isLoading={isKeyLoading}
                onClick={() => loginUser({
                    router: router,
                    username: keyUsername,
                    publicKey: publicKey,
                    privateKey: privateKey,
                    setErrorUsername: setErrorKeyUsername,
                    setErrorPublicKey: setErrorPublicKey,
                    setIsLoading: setIsKeyLoading,
                })} />
            <br />
            <Input text={setLocale(router.locale).username} value={changeUsername}
                error={errorChangeUsername} onChange={(e) => setChangeUsername(e.target.value)} />
            <Input text={setLocale(router.locale).mnemonic} value={mnemonic}
                error={errorMnemonic} onChange={(e) => setMnemonic(e.target.value)} />
            <Button text={setLocale(router.locale).recover_keys} isLoading={isMnemonicLoading}
                onClick={() => recoverCheck({
                    router: router,
                    username: changeUsername,
                    mnemonic: mnemonic,
                    setErrorUsername: setErrorChangeUsername,
                    setErrorMnemonic: setErrorMnemonic,
                    setIsLoading: setIsMnemonicLoading,
                    setKeys: setKeys,
                })} />
            {
                keys ?
                    <div className={styles.readyDiv}>
                        <Button text={setLocale(router.locale).download_public_key}
                            onClick={() => downloadKey('public', keys.publicKey)} />
                        <Button text={setLocale(router.locale).download_private_key}
                            onClick={() => downloadKey('private', keys.privateKey)} />
                        <Htag tag='m' className={styles.mnemonicTitle}>
                            {setLocale(router.locale).remember_seed_phrase + ':'}
                        </Htag>
                        <Htag tag='m'>
                            {keys.mnemonic}
                        </Htag>
                    </div>
                : <></>
            }
        </div>
    );
};
