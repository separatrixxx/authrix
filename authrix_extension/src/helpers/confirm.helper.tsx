import { ConfirmArguments } from "interfaces/refactor.interface";
import { ToastError } from "components/Common/Toast/Toast";
import { ru } from "locales/ru.locale";
import { ec } from "elliptic";
import { ConfirmInterface } from "interfaces/confirm.interface";
import { createHMACSignature } from "./crypto.helper";
import { sha256 } from "js-sha256";
import { AuthPublicKeyInterface } from "interfaces/auth.interface";
import { checkUsername } from "./user.helper";


export async function handleConfirm(args: ConfirmArguments) {
    const { username, privateKey, serviceKey, setErrorPrivateKey, setIsLoading } = args;

    try {
        if (!privateKey.trim()) {
            setErrorPrivateKey(true);
            ToastError(ru.enter_private_key);

            return;
        }

        setIsLoading(true);
        setErrorPrivateKey(false);

        const secp256k1 = new ec('secp256k1');
        const keyPair = secp256k1.keyFromPrivate(privateKey);
        const generatedPublicKey = keyPair.getPublic('hex');

        const responseKey: AuthPublicKeyInterface = await checkUsername(username);

        if (responseKey.publicKey !== sha256(generatedPublicKey)) {
            setErrorPrivateKey(true);
            ToastError(ru.wrong_private_key);

            return;
        }

        const signData: ConfirmInterface = {
            username: username || '',
            publicKey: generatedPublicKey,
            publicKeyHash: responseKey.publicKey || '',
            timestamp: Date.now()
        };

        const dataString = JSON.stringify(signData);  

        const hash = sha256(dataString);
        const signature = keyPair.sign(hash);
        const userSignature = signature.toDER('hex');

        const serviceSignature = await createHMACSignature(dataString, serviceKey);

        chrome.runtime.sendMessage({
            type: 'AUTH_RESPONSE',
            data: {
                signData,
                userSignature,
                serviceSignature,
            },
        });

        window.close();
    } catch (error) {
        console.error(ru.wrong_private_key + ': ' + error);
        
        setErrorPrivateKey(true);
        ToastError(ru.wrong_private_key);
    } finally {
        setIsLoading(false);
    }
};
