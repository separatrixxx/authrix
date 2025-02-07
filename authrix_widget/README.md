# authrix widget

Виджет авторизации через протокол authrix для React-приложений.

## Установка

```bash
npm install authrix-widget
```

## Интерфейсы и типы

```tsx
interface AuthData {
  signData: {
    username: string,
    timestamp: number,
    domainHash: string,
  },
  signature: string,
}

interface AuthrixWidgetProps {
  locale?: 'ru' | 'en',
  text?: {
    buttonText?: string,
    confirmationText?: string,
  },
  onAuthData?: (data: AuthData) => void,
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
  data: AuthData;
}
```

## Примеры использования

### Базовый пример

```tsx
import {AuthrixWidget } from 'authrix-widget';


const App: React.FC = () => {
  const handleAuthData = (data: AuthData): void => {
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
```

### Расширенный пример с состоянием

```tsx
import { AuthrixWidget } from 'authrix-widget';
import { useState } from 'react';
import { verifySignature } from '../helpers//verify';

interface UserState {
  username: string;
  timestamp: number;
}

const AuthPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserState | null>(null);


  const handleAuthData = async (data: AuthData): Promise<void> => {
    try {
      const isValid = await verifySignature(data);
      
      if (isValid) {
        setIsAuthenticated(true);
        setUserData({
          username: data.signData.username,
          timestamp: data.signData.timestamp
        });
      }
    } catch (error) {
      console.error('Ошибка верификации:', error);
    }
  };

  return (
    <div>
      {!isAuthenticated ?
        <AuthrixWidget
          locale="ru"
          onAuthData={handleAuthData}
          text={{
            buttonText: 'Войти через authrix',
            confirmationText: 'Подтвердите вход на сайт'
          }}
        />
      :
        <div>
          <p>Добро пожаловать, {userData?.username}!</p>
          <p>Время входа: {new Date(userData?.timestamp || 0).toLocaleString()}</p>
        </div>
      }
    </div>
  );
}
```

## Обработка событий

```tsx
window.addEventListener('authrix-request', (event: CustomEvent<AuthRequestEvent['detail']>) => {
  const { message, domain } = event.detail;
  
  console.log(`Запрос авторизации от домена ${domain}: ${message}`);
});

const sendAuthResponse = (data: AuthData): void => {
  window.postMessage({
    source: 'authrix-content-script',
    type: 'AUTH_RESPONSE',
    data
  } as AuthResponseMessage, '*');
};
```

## Пропсы

| Проп     | Тип                  | По умолчанию | Описание                    |
|----------|---------------------|--------------|----------------------------|
| locale   | 'ru' \| 'en'        | 'en'         | Язык виджета              |
| text     | { buttonText?: string, confirmationText?: string } | {} | Кастомные тексты |

## События

Виджет отправляет событие `authrix-request` при клике на кнопку. Событие содержит следующие данные в `detail`:

- `domain`: домен текущего сайта
- `message`: сообщение для подтверждения авторизации
