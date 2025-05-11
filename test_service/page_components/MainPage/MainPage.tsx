import styles from './MainPage.module.css';
import { Toaster } from 'react-hot-toast';
import { createHMACSignature } from '../../helpers/crypto.helper';
import { ToastError, ToastSuccess } from '../../components/Common/Toast/Toast';
import { useState } from 'react';
import { AuthResponseData, AuthWidgetData } from '../../interfaces/auth.interface';
import { AuthrixWidget, verifyUserSignature } from 'authrix-widget';


export function isAuthResponseData(data: AuthWidgetData): data is AuthResponseData {
    return 'signData' in data;
}

export const MainPage = (): JSX.Element => {
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
    
    const serviceKey = 'un1i27qo0tl5zk02ursjxpomz7siuca6';
    
    const handleAuthData = async (data: AuthWidgetData) => {
        if ('message' in data && data.message === 'AUTH_REJECTED') {
            setIsAuthenticating(false);

            return;
        }

        if (!isAuthResponseData(data)) {
            return;
        }

        const { signData, userSignature, serviceSignature } = data;
        const dataString = JSON.stringify(signData);
    
        const isUserSignatureValid = verifyUserSignature(dataString, userSignature, signData.publicKey, signData.publicKeyHash);
    
        const verificationServiceSignature = await createHMACSignature(dataString, serviceKey);
        const isServiceSignatureValid = serviceSignature === verificationServiceSignature;
    
        if (isServiceSignatureValid && isUserSignatureValid) {
            ToastSuccess('ok');
            setIsAuthenticating(true);
        } else {
            const errorMessage = !isServiceSignatureValid ? 'service signature error' : 'user signature error';
            ToastError(errorMessage);
        }
    };

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={true}
                toastOptions={{
                    duration: 2000,
                }}
            />
            <div className={styles.wrapper}>
                <AuthrixWidget isAuthenticating={isAuthenticating} onAuthData={handleAuthData} />
            </div>
        </>
    );
};
