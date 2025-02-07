import styles from './MainPage.module.css';
import { Toaster } from 'react-hot-toast';
import { AuthrixWidget } from '../../components/Widget';
import { createHMACSignature } from '../../helpers/crypto.helper';
import { ToastError, ToastSuccess } from '../../components/Common/Toast/Toast';
import { ec } from 'elliptic';


export const MainPage = (): JSX.Element => {
    const serviceKey = '12345678';
    
    const handleAuthData = async (data: any) => {
        const { signData, userSignature, serviceSignature } = data;
        const dataString = JSON.stringify(signData);
    
        const verificationSignature = await createHMACSignature(dataString, serviceKey);
        const isServiceSignatureValid = serviceSignature === verificationSignature;
    
        const secp256k1 = new ec('secp256k1');
        const key = secp256k1.keyFromPublic(signData.publicKey, 'hex');
        
        const isUserSignatureValid = key.verify(dataString, userSignature);
    
        if (isServiceSignatureValid && isUserSignatureValid) {
            ToastSuccess('ok');
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
                <AuthrixWidget onAuthData={handleAuthData} />
            </div>
        </>
    );
};
