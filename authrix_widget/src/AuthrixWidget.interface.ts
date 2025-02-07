export interface AuthrixWidgetProps {
    locale?: 'ru' | 'en',
    text?: {
        buttonText?: string;
        confirmationText?: string;
    },
    onAuthData?: (data: any) => void,
}
