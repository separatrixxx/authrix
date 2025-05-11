export const markdownEn = `# Widget

authrix protocol authorization widget for React applications.

## Installation

{{{(bash)npm install authrix-widget}}}

## Interfaces and Types

{{{
interface SignData {
    username: string,
    publicKey: string,
    publicKeyHash: string,
    timestamp: number,
}

interface AuthResponseData {
    signData: SignData,
    userSignature: string,
    serviceSignature: string,
}

interface AuthRejectedData {
    message: 'AUTH_REJECTED',
}

type AuthWidgetData = AuthResponseData | AuthRejectedData;

interface AuthrixWidgetProps {
    locale?: 'ru' | 'en',
    text?: {
        buttonText?: string,
        confirmationText?: string,
    },
    isAuthenticating?: boolean,
    onAuthData?: (data: AuthWidgetData) => void,
}

interface AuthRequestEvent {
    detail: {
        message: string,
        domain: string,
    },
}

interface AuthResponseMessage {
    source: 'authrix-content-script';
    type: 'AUTH_RESPONSE';
    data: AuthWidgetData;
}
}}}

## Usage Examples

### Basic Example

{{{
import { AuthrixWidget } from 'authrix-widget';

const App: React.FC = () => {
    const handleAuthData = (data: AuthWidgetData): void => {
        console.log('Authorization data:', data);
    };

    return (
        <AuthrixWidget 
            locale="en"
            onAuthData={handleAuthData}
            text={{
                buttonText: 'Login with authrix',
                confirmationText: 'Confirm login'
            }}
        />
    );
}
}}}

### Advanced Example with Signature Verification

{{{
import { AuthrixWidget } from 'authrix-widget';
import { verifyUserSignature } from './validateUserSignature';
import { useState } from 'react';
import { createHMACSignature } from '../helpers/crypto.helper';
import { AuthResponseData, AuthWidgetData } from '../interfaces/auth.interface';

function isAuthResponseData(data: AuthWidgetData): data is AuthResponseData {
    return 'signData' in data;
}

const AuthPage: React.FC = () => {
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
    const serviceKey = 'your_service_key';

    const handleAuthData = async (data: AuthWidgetData): Promise<void> => {
        // Handle authorization rejection
        if ('message' in data && data.message === 'AUTH_REJECTED') {
            setIsAuthenticating(false);
            return;
        }

        if (!isAuthResponseData(data)) {
            return;
        }

        const { signData, userSignature, serviceSignature } = data;
        const dataString = JSON.stringify(signData);
    
        // Verify user's signature
        const isUserSignatureValid = verifyUserSignature(dataString, userSignature, signData.publicKey, signData.publicKeyHash);
    
        // Verify service's signature
        const verificationServiceSignature = await createHMACSignature(dataString, serviceKey);
        const isServiceSignatureValid = serviceSignature === verificationServiceSignature;
    
        if (isServiceSignatureValid && isUserSignatureValid) {
            console.log('Authorization successful');
            setIsAuthenticating(true);
        } else {
            const errorMessage = !isServiceSignatureValid ? 'Service signature error' : 'User signature error';
            console.error(errorMessage);
        }
    };

    return (
        <div>
            <AuthrixWidget
                locale="en"
                isAuthenticating={isAuthenticating}
                onAuthData={handleAuthData}
                text={{
                    buttonText: 'Login with authrix',
                    confirmationText: 'Confirm login on the website'
                }}
            />
        </div>
    );
}
}}}

## Event Handling

{{{
window.addEventListener('authrix-request', (event: CustomEvent<AuthRequestEvent['detail']>) => {
    const { message, domain } = event.detail;
    console.log(\`Authorization request from domain \${domain}: \${message}\`);
});

const sendAuthResponse = (data: AuthWidgetData): void => {
    window.postMessage({
        source: 'authrix-content-script',
        type: 'AUTH_RESPONSE',
        data
    } as AuthResponseMessage, '*');
};
}}}

## Props

| Prop             | Type                                             | Default      | Description                                                            |
|------------------|-------------------------------------------------|--------------|------------------------------------------------------------------------|
| locale           | 'ru' &#124; 'en'                                | 'en'         | Widget language                                                        |
| text             | { buttonText?: string, confirmationText?: string } | {}           | Custom texts                                                           |
| isAuthenticating | boolean                                         | false        | Authorization state (disables the button and changes text)              |
| onAuthData       | (data: AuthWidgetData) => void                  | undefined    | Callback for receiving authorization data                               |


## Events

The widget sends an *authrix-request* event when the button is clicked. The event contains the following data in *detail*:

- *domain*: the current website domain
- *message*: message for confirming authorization
`;

export const markdownRu = `# Виджет

Виджет авторизации через протокол authrix для React-приложений.

## Установка

{{{(bash)npm install authrix-widget}}}

## Интерфейсы и типы

{{{
interface SignData {
    username: string,
    publicKey: string,
    publicKeyHash: string,
    timestamp: number,
}

interface AuthResponseData {
    signData: SignData,
    userSignature: string,
    serviceSignature: string,
}

interface AuthRejectedData {
    message: 'AUTH_REJECTED',
}

type AuthWidgetData = AuthResponseData | AuthRejectedData;

interface AuthrixWidgetProps {
    locale?: 'ru' | 'en',
    text?: {
        buttonText?: string,
        confirmationText?: string,
    },
    isAuthenticating?: boolean,
    onAuthData?: (data: AuthWidgetData) => void,
}

interface AuthRequestEvent {
    detail: {
        message: string,
        domain: string,
    },
}

interface AuthResponseMessage {
    source: 'authrix-content-script';
    type: 'AUTH_RESPONSE';
    data: AuthWidgetData;
}
}}}

## Примеры использования

### Базовый пример

{{{
import { AuthrixWidget } from 'authrix-widget';


const App: React.FC = () => {
    const handleAuthData = (data: AuthWidgetData): void => {
        console.log('Данные авторизации:', data);
    };

    return (
        <AuthrixWidget 
            locale="ru"
            onAuthData={handleAuthData}
            text={{
                buttonText: 'Войти через authrix',
                confirmationText: 'Подтвердите вход'
            }}
        />
    );
}
}}}

### Расширенный пример с верификацией подписи

{{{
import { AuthrixWidget } from 'authrix-widget';
import { verifyUserSignature } from './validateUserSignature';
import { useState } from 'react';
import { createHMACSignature } from '../helpers/crypto.helper';
import { AuthResponseData, AuthWidgetData } from '../interfaces/auth.interface';

function isAuthResponseData(data: AuthWidgetData): data is AuthResponseData {
    return 'signData' in data;
}

const AuthPage: React.FC = () => {
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
    const serviceKey = 'your_service_key';

    const handleAuthData = async (data: AuthWidgetData): Promise<void> => {
        // Обработка отказа в авторизации
        if ('message' in data && data.message === 'AUTH_REJECTED') {
            setIsAuthenticating(false);
            return;
        }

        if (!isAuthResponseData(data)) {
            return;
        }

        const { signData, userSignature, serviceSignature } = data;
        const dataString = JSON.stringify(signData);
    
        // Проверка подписи пользователя
        const isUserSignatureValid = verifyUserSignature(dataString, userSignature, signData.publicKey, signData.publicKeyHash);
    
        // Проверка подписи сервиса
        const verificationServiceSignature = await createHMACSignature(dataString, serviceKey);
        const isServiceSignatureValid = serviceSignature === verificationServiceSignature;
    
        if (isServiceSignatureValid && isUserSignatureValid) {
            console.log('Авторизация успешна');
            setIsAuthenticating(true);
        } else {
            const errorMessage = !isServiceSignatureValid ? 'Ошибка подписи сервиса' : 'Ошибка подписи пользователя';
            console.error(errorMessage);
        }
    };

    return (
        <div>
            <AuthrixWidget
                locale="ru"
                isAuthenticating={isAuthenticating}
                onAuthData={handleAuthData}
                text={{
                    buttonText: 'Войти через authrix',
                    confirmationText: 'Подтвердите вход на сайт'
                }}
            />
        </div>
    );
}
}}}

## Обработка событий

{{{
window.addEventListener('authrix-request', (event: CustomEvent<AuthRequestEvent['detail']>) => {
    const { message, domain } = event.detail;
    console.log(\`Запрос авторизации от домена \${domain}: \${message}\`);
});

const sendAuthResponse = (data: AuthWidgetData): void => {
    window.postMessage({
        source: 'authrix-content-script',
        type: 'AUTH_RESPONSE',
        data
    } as AuthResponseMessage, '*');
};
}}}

## Пропсы

| Проп             | Тип                                             | По умолчанию | Описание                                                        |
|------------------|-------------------------------------------------|--------------|------------------------------------------------------------------|
| locale           | 'ru' &#124; 'en'                                | 'en'         | Язык виджета                                                     |
| text             | { buttonText?: string, confirmationText?: string } | {}           | Кастомные тексты                                                 |
| isAuthenticating | boolean                                         | false        | Состояние авторизации (блокирует кнопку и меняет текст)          |
| onAuthData       | (data: AuthWidgetData) => void                  | undefined    | Callback для получения данных авторизации                        |


## События

Виджет отправляет событие *authrix-request* при клике на кнопку. Событие содержит следующие данные в *detail*:

- *domain*: домен текущего сайта
- *message*: сообщение для подтверждения авторизации`;
