import { ConfirmBlockProps } from './ConfirmBlock.props';
import { useState } from 'react';
import { Htag } from 'components/Common/Htag/Htag';
import { ru } from 'locales/ru.locale';
import { RequestBlock } from '../RequestBlock/RequestBlock';
import { PrivateKeyBlock } from '../PrivateKeyBlock/PrivateKeyBlock';


export const ConfirmBlock = ({ isAuthorized, serviceMessage }: ConfirmBlockProps): JSX.Element => {
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
    const [serviceKey, setServiceKey] = useState<string>('');

    if (!isAuthorized) {
        return (
            <Htag tag='xl'>
                {ru.you_need_to_auth_to_confirm_requests}
            </Htag>
        );
    }

    return (
        <>
            <Htag tag='xl'>
                {ru[!isConfirmed ? 'auth_request' : 'enter_private_key']}
            </Htag>
            {
                !isConfirmed ?
                    <RequestBlock serviceMessage={serviceMessage}
                        setIsConfirmed={setIsConfirmed} setServiceKey={setServiceKey} />
                : 
                    <PrivateKeyBlock serviceKey={serviceKey} />
            }
        </>
    );
};
