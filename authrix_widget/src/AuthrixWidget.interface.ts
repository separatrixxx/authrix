export interface SignData {
    username: string,
    publicKey: string,
    publicKeyHash: string,
    timestamp: number,
}

export interface AuthResponseData {
    signData: SignData,
    userSignature: string,
    serviceSignature: string,
}

export interface AuthRejectedData {
    message: 'AUTH_REJECTED',
}

export type AuthWidgetData = AuthResponseData | AuthRejectedData;

export interface AuthrixWidgetProps {
    locale?: 'ru' | 'en',
    text?: {
        buttonText?: string,
        confirmationText?: string,
    },
    isAuthenticating?: boolean,
    onAuthData?: (data: AuthWidgetData) => void,
}
