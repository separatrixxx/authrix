import styles from './MainBlock.module.css';
import { useState } from 'react';
import { Htag } from 'components/Common/Htag/Htag';
import { GenerateBlock } from '../GenerateBlock/GenerateBlock';
import { RecoverBlock } from '../RecoverBlock/RecoverBlock';
import { AuthBlock } from '../AuthBlock/AuthBlock';
import { ru } from 'locales/ru.locale';
import cn from 'classnames';


export const MainBlock = (): JSX.Element => {
    const [type, setType] = useState<'generate' | 'auth' | 'recover'>('generate');

    return (
        <>
            <Htag tag='xl'>
                {ru[type === 'generate' ? 'first_generate_keys' : type === 'auth' ? 'now_login' : 'or_recover']}
            </Htag>
            {
                type === 'generate' ?
                    <GenerateBlock />
                : type === 'auth' ?
                    <AuthBlock />
                : <RecoverBlock />
            }
            <Htag tag='m' className={cn(styles.goToText, styles.marginText)}
                onClick={() => setType(type === 'generate' ? 'auth' : type === 'auth' ? 'generate' : 'auth')}>
                {ru[`go_to_${type === 'generate' ? 'auth' : type === 'auth' ? 'generate' : 'auth'}`]}
            </Htag>
            <Htag tag='m' className={styles.goToText}
                onClick={() => setType(type === 'generate' ? 'recover' : type === 'auth' ? 'recover' : 'generate')}>
                {ru[`go_to_${type === 'generate' ? 'recover' : type === 'auth' ? 'recover' : 'generate'}`]}
            </Htag>
        </>
    );
};
