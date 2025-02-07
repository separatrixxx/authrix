import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bip39 from 'bip39';
import { ec as EC } from 'elliptic';


@Injectable()
export class KeysService {
  // Generate a key pair and mnemonic phrase
  // Генерация пары ключей и мнемонической фразы
  generateKeys(username: string, email: string): { privateKey: string; publicKey: string; publicKeyHash: string; mnemonic: string } {
    const data = `${username}:${email}`;
  
    const hash = crypto.createHash('sha256').update(data).digest();
  
    const ec = new EC('secp256k1');
    const keyPair = ec.keyFromPrivate(hash);
  
    const privateKey = keyPair.getPrivate('hex');
    const publicKey = keyPair.getPublic(true, 'hex');
  
    const mnemonic = bip39.generateMnemonic();
    const publicKeyHash = crypto.createHash('sha256').update(publicKey).digest('hex');
  
    return { privateKey, publicKey, publicKeyHash, mnemonic };
  }
}
