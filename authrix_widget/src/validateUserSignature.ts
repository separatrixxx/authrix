import { ec as EC } from 'elliptic';
import { sha256 } from 'js-sha256';


export function verifyUserSignature(data: string, signature: string, publicKeyHex: string, publicKeyHash: string): boolean {
    const secp256k1 = new EC('secp256k1');

    if (publicKeyHash !== sha256(publicKeyHex)) {
        return false;
    }

    try {
        const key = secp256k1.keyFromPublic(publicKeyHex, 'hex');
        const hash = sha256(data);

        return key.verify(hash, signature);
    } catch (error) {
        console.error(error);

        return false;
    }
}