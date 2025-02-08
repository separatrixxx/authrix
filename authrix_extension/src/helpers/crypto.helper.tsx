import * as bip39 from 'bip39';
import { ec as EC } from 'elliptic';
import { sha256 } from 'js-sha256';
import { KeysInterface } from '../interfaces/keys.interface';
import { createUser } from './user.helper';
import crypto from 'crypto-js';


export function createHMACSignature(data: string, key: string): string {
    return crypto.HmacSHA256(data, key).toString();
};

export async function generateKeys(username: string, isChange: boolean): Promise<KeysInterface | null> {
    const ec = new EC('secp256k1');

    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic);

    const keyPair = ec.keyFromPrivate(seed.slice(0, 32));

    const privateKey = keyPair.getPrivate('hex');
    const publicKey = keyPair.getPublic('hex');

    const publicKeyHash = sha256(publicKey);
    const mnemonicHash = sha256(mnemonic);

    try {
        const response = await createUser(username, publicKeyHash, mnemonicHash, isChange);

        if (response.message === 'OK') {
            return {
                privateKey,
                publicKey,
                mnemonic,
            };
        }

        return null;
    } catch (error) {
        throw error;
    }
}
