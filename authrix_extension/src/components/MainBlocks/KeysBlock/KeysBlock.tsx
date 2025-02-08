import { KeysBlockProps } from './KeysBlock.props';
import styles from './KeysBlock.module.css';
import { ru } from 'locales/ru.locale';
import { Button } from 'components/Common/Button/Button';
import { Htag } from 'components/Common/Htag/Htag';
import { copyToClipboard } from 'helpers/clipboard.helper';
import { downloadPrivateKey } from 'helpers/generate.helper';


export const KeysBlock = ({ username, keys }: KeysBlockProps): JSX.Element => {
    return (
        <div className={styles.keysBlock}>
            <Htag tag='s' className={styles.text}>
                {ru.keys_text.replace('$$$', username)}
            </Htag>
            <Htag tag='m' className={styles.mnemonic} onClick={() => copyToClipboard(keys.mnemonic,
                ru.mnemonic_copied, ru.failed_to_copy_mnemonic)}>
                {keys.mnemonic}
            </Htag>
            <Button text={ru.download_private_key} onClick={() => downloadPrivateKey(keys.privateKey)} />
        </div>
    );
};
