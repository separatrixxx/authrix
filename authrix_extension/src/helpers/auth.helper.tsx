import { ToastError, ToastSuccess } from "components/Common/Toast/Toast";
import { ru } from "locales/ru.locale";
import { AuthArguments } from "interfaces/refactor.interface";
import { checkMnemonic, checkUsername } from "./user.helper";
import { AuthPublicKeyInterface, AuthUsernameInterface } from "interfaces/auth.interface";
import { sha256 } from 'js-sha256';
import { useAuthStore } from "stores/auth.store";


export async function handleAuth(args: AuthArguments) {
    const { username, mnemonic, setErrorUsername, setErrorMnemonic, setIsLoading } = args;

    const setAuth = useAuthStore.getState().setAuth;

    setErrorUsername(false);
    setErrorMnemonic(false);

    let hasErrors = false;

    if (username.length <= 3) {
        setErrorUsername(true);
        ToastError(ru.username_must_be_longer);
        hasErrors = true;
    }
    
    if (mnemonic.length === 0) {
        setErrorMnemonic(true);
        ToastError(ru.enter_mnemonic);
        hasErrors = true;
    }
    
    if (hasErrors) {
        return;
    }
    
    setIsLoading(true);
    
    try {
        const responseKey: AuthPublicKeyInterface = await checkUsername(username);
        const responseUsername: AuthUsernameInterface = await checkMnemonic(sha256(mnemonic));
        
        if (responseKey.message === 'USER_NOT_FOUND' || responseUsername.message === 'USER_NOT_FOUND') {
            ToastError(ru.user_not_found);
        } else if (responseUsername.username && username !== responseUsername.username) {
            ToastError(ru.wrond_mnemonic);
        } else {
            await setAuth(username, (responseKey.publicKey || ''));
            ToastSuccess(ru.you_have_logged_in_successfully + '!');
        }
    } catch (error) {
        console.error(ru.errors.log_in_error + ': ' + error);
        ToastError(ru.errors.log_in_error);
    } finally {
        setIsLoading(false);
    }
};
