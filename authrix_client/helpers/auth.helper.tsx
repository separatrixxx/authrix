import axios from 'axios';
import { saveAs } from 'file-saver';
import { GeneratorArguments, LoginUserArguments, RecoverArguments } from "../interfaces/refactor.interface";
import { ToastError, ToastSuccess } from '../components/Common/Toast/Toast';
import { setLocale } from './locale.helper';
import { generateKeys, generatePublicKeyHash } from './keys.helper';
import * as crypto from 'crypto';


export async function authCheck(args: GeneratorArguments) {
    const { router, username, setErrorUsername, setIsLoading, setKeys } = args;

    setErrorUsername(false);

    if (+username !== 0 && username.length >= 3) {
        setIsLoading(true);

        const response = await registerUser(username, router);

        if (response) {
            setKeys(response);
        }

        setIsLoading(false);
    } else {
        if (+username === 0 || username.length < 3) {
            setErrorUsername(true);
        }
    }
}

export async function recoverCheck(args: RecoverArguments) {
    const { router, username, mnemonic, setErrorUsername, setErrorMnemonic, setIsLoading, setKeys } = args;

    setErrorUsername(false);
    setErrorMnemonic(false);

    if (+username !== 0 && username.length >= 3 && +mnemonic !== 0) {
        setIsLoading(true);

        const checkRecover = await recoverKeys(username, mnemonic);
        console.log(checkRecover)

        if (checkRecover) {
            const response = await registerUser(username, router, true);

            if (response) {
                setKeys(response);
            }
        } else {
            setErrorMnemonic(true);
        }

        setIsLoading(false);
    } else {
        if (+username === 0 || username.length < 3) {
            setErrorUsername(true);
        }

        if (+mnemonic === 0) {
            setErrorMnemonic(true);
        }
    }
}

export async function recoverKeys(username: string, mnemonic: string): Promise<boolean> {
    const mnemonicHash = crypto.createHash('sha256').update(mnemonic).digest('hex');

    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + 'user/username?mnemonicHash=' + mnemonicHash);

        if (response.data && response.data.message === 'USER_NOT_FOUND') {
            return false;
        } else {
            return response.data.username === username;
        }
    } catch (error: any) {
        console.error('Error during API request:', error);

        return false;
    }
}

export async function registerUser(username: string, router: any, isChange?: boolean) {
    const keys = generateKeys();

    const mnemonicHash = crypto.createHash('sha256').update(keys.mnemonic).digest('hex');

    try {
        await axios.post(process.env.NEXT_PUBLIC_DOMAIN + 'user/create', {
            username: username,
            publicKeyHash: keys.publicKeyHash,
            mnemonicHash: mnemonicHash,
            isChange: isChange,
        }).then(r => {
            console.log(r.data.message)
            if (r && r.data && r.data.message) {
                if (r.data.message === 'USER_ALREADY_EXISTS') {
                    ToastError(setLocale(router.locale).user_already_exists);

                    return null;
                } else {
                    return keys;
                }
            }
        });
    } catch (error: any) {
        console.error('Error during API request:', error);

        return null;
    }
}

export function downloadKey(type: 'public' | 'private', key: string) {
    const blob = new Blob([key], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${type}_key.pem`);
}

export async function loginUser(args: LoginUserArguments) {
    const { router, username, publicKey, privateKey, setErrorUsername, setErrorPublicKey, setIsLoading } = args;

    try {
        setIsLoading(true);

        const publicKeyHash = generatePublicKeyHash(publicKey, privateKey);

        await axios.post(process.env.NEXT_PUBLIC_DOMAIN + 'user/verify', {
            username: username,
            publicKeyHash: publicKeyHash,
        }).then((r) => {
            setIsLoading(false);

            if (r && r.data && r.data.isVerify) {
                setErrorUsername(r.data.isVerify === 'USER_NOT_FOUND');
                setErrorPublicKey(r.data.isVerify === 'INVALID_KEY');

                if (r.data.isVerify === 'USER_NOT_FOUND') {
                    ToastError(setLocale(router.locale).user_not_found);
                } else if (r.data.isVerify === 'INVALID_KEY') {
                    ToastError(setLocale(router.locale).invalid_key_entered);
                } else {
                    ToastSuccess(setLocale(router.locale).user_verified);
                }
            }
        });
    } catch (error) {
        setIsLoading(false);
        setErrorUsername(true);
        setErrorPublicKey(true);

        console.error('Error during API request:', error);
    }
}
