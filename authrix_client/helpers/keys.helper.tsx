import * as crypto from 'crypto';
import * as bip39 from 'bip39';
import { ec as EC } from 'elliptic';
import { KeysInterface } from '../interfaces/keys.interface';


export function generateKeys(): KeysInterface {
    const randomBytes = crypto.randomBytes(32);
    const ec = new EC('secp256k1');
    const keyPair = ec.keyFromPrivate(randomBytes);

    const privateKey = keyPair.getPrivate('hex');
    const publicKey = keyPair.getPublic(true, 'hex');

    const mnemonic = bip39.generateMnemonic();

    const publicKeyBuffer = Buffer.from(publicKey, 'hex');
    const signature = keyPair.sign(publicKeyBuffer);

    const publicKeyHash = Buffer.from(signature.toDER()).toString('base64');

    return { privateKey, publicKey, publicKeyHash, mnemonic };
}

export function generatePublicKeyHash(publicKey: string, privateKey: string): string {
    const ec = new EC('secp256k1');

    const keyPair = ec.keyFromPrivate(privateKey, 'hex');
    const publicKeyBuffer = Buffer.from(publicKey, 'hex');
    const signature = keyPair.sign(publicKeyBuffer);
    const publicKeyHash = Buffer.from(signature.toDER()).toString('base64');

    return publicKeyHash;
}
