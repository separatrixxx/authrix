import { ToastError } from "components/Common/Toast/Toast";
import { generateKeys } from "./crypto.helper";
import { ru } from "locales/ru.locale";
import { GenerateArguments } from "interfaces/refactor.interface";


export async function handleGenerate(args: GenerateArguments) {
    const { username, setErrorUsername, setKeys, setIsLoading } = args;

    setErrorUsername(false);

    if (username.length <= 3) {
        setErrorUsername(true);
        ToastError(ru.username_must_be_longer);

        return;
    }
    
    setIsLoading(true);
    
    try {
        const keys = await generateKeys(username, false);
        
        if (keys) {
            setKeys(keys);
        } else {
            ToastError(ru.user_with_this_name_already_exists);
        }
    } catch (error) {
        console.error(ru.errors.generate_keys_error + ': ' + error);
        ToastError(ru.errors.generate_keys_error);
    } finally {
        setIsLoading(false);
    }
};

export function downloadPrivateKey(privateKey: string) {
    try {
        const blob = new Blob([privateKey], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'authrix_private_key.txt';
        
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error(ru.errors.download_private_key_error + ': ' + error);
        ToastError(ru.errors.download_private_key_error);
    }
};
