export const markdownEn = {
    part1: `# Service Registration

To allow users to log in to your service, you need to register it. Registration in **authrix** is very simple. Enter your service's domain name and its name in the form below.`,
    part2: `If you have done everything correctly, the service key and the service certificate have appeared above.

## Installing the Certificate

Place the certificate in a directory of your project that is publicly accessible (for example, *public/.well-known*). It does not contain any private data. The most important thing is to securely store your service key. You will need it to validate user data. Read more about this in the ["Widget"](/docs/widget) section.

## Renewing the Certificate

The certificate is issued for one year for security reasons. You will need to come back here in a year and repeat the registration process. You will be issued a new certificate. Otherwise, a user trying to log in to your service via **authrix** will see a message that the certificate has expired.

## What's Next?

Service registration is now complete. Proceed to the [next section](/docs/chech-service) if you want to check your service certificate. If you are a developer, go to the ["Widget"](/docs/widget) section to install the authorization widget.`,
};

export const markdownRu = {
    part1: `# Регистрация сервиса

Для того, чтобы пользователи смогли авторзоваться на вашем сервисе, вам необходимо его зарегистрировать. Регистрация в **authrix** очень простая. Введите доменное имя вашего сервиса, а также его название в форму ниже.`,
    part2: `Если вы всё сделали правильно, то выше появился ключ от вашего сервиса, а также сертификат сервиса.
    
## Установка сертификата

Поместите сертификат в директорию вашего проекта, которая доступна всем (например, *public/.well-known*). Он не содержит никаких приватных данных. Самое главное, что вам нужно сделать, - снадёжно сохранить ключ от вашего сервиса. Он будет нужен, чтобы валидировать данные пользователей. Подробнее об это читайте в разделе ["Виджет"](/docs/widget).

## Продление сертификата

Сертификат выдаётся на год. Это нужно в целях безопасности. Вам придётся вернуться сюда через год и проделать эту операцию с начала. Вам будет выдан новый сертификат. В противном случае пользователь, решивший авторизоваться с помощью **authrix** на вашем сервисе, увидит сообщение о том, что срок действия сертификата истёк.

## Что дальше?

На этом регистрация сервиса завершена. Перейдите к [следующему разделу](/docs/chech-service), если вы хотите проверить сертификат сервиса. Если вы разработчик, перейдите к разделу ["Виджет"](/docs/widget) для установки виджета авторизации.`,
};
