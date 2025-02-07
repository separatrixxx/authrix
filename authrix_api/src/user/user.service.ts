import { Injectable } from '@nestjs/common';
import { createNearConnection } from 'src/shared/utils/near.util';


@Injectable()
export class UserService {
  private readonly contractId = 'authrix.testnet';
  private readonly networkId = 'testnet';

  // Get public key hash from NEAR
  // Получение хеша публичного ключа из NEAR
  async getUserPublicKey(username: string): Promise<string | null> {
    try {
      const near = await createNearConnection(this.networkId);

      const response = await near.connection.provider.query({
        request_type: 'call_function',
        account_id: this.contractId,
        method_name: 'getKeyHash',
        args_base64: Buffer.from(JSON.stringify({ accountId: username })).toString('base64'),
        finality: 'optimistic',
      });

      let publicKey = null;

      if ('result' in response) {
        const resultArray = response.result as number[];
        publicKey = Buffer.from(resultArray).toString('utf-8');
      }

      if (publicKey.startsWith('"') && publicKey.endsWith('"')) {
        publicKey = publicKey.slice(1, -1);
      }

      return publicKey !== 'null' ? publicKey : null;
    } catch (error) {
      console.error('Error fetching key hash from NEAR:', error);
      throw new Error('Error fetching key hash from NEAR');
    }
  }

  // Getting username by mnemonic phrase
  // Получение имени пользователя по мнемонической фразе
  async getUsernameByMnemonic(mnemonicHash: string): Promise<string | null> {
    try {
      const near = await createNearConnection(this.networkId);

      const response = await near.connection.provider.query({
        request_type: 'call_function',
        account_id: this.contractId,
        method_name: 'getUsernameByMnemonicHash',
        args_base64: Buffer.from(JSON.stringify({ mnemonicHash: mnemonicHash })).toString('base64'),
        finality: 'optimistic',
      });

      let username = null;

      if ('result' in response) {
        const resultArray = response.result as number[];
        username = Buffer.from(resultArray).toString('utf-8');
      }

      if (username.startsWith('"') && username.endsWith('"')) {
        username = username.slice(1, -1);
      }

      return username !== 'null' ? username : null;
    } catch (error) {
      console.error('Error fetching key hash from NEAR:', error);
      throw new Error('Error fetching key hash from NEAR');
    }
  }

  // Creating a user in the NEAR network
  // Создание пользователя в сети NEAR 
  async createUser(username: string, publicKeyHash: string, mnemonicHash: string, isChange?: boolean): Promise<{ message: string }> {
    try {
      const near = await createNearConnection(this.networkId);

      const publicKey = await this.getUserPublicKey(username);

      if (publicKey && !isChange) {
        console.warn('User already exists');
        return { message: 'USER_ALREADY_EXISTS' };
      }

      const account = await near.account(this.contractId);
      const gas = BigInt(30000000000000);

      await account.functionCall({
        contractId: this.contractId,
        methodName: 'storeKeyHash',
        args: {
          accountId: username,
          keyHash: publicKeyHash,
        },
        gas: gas,
        attachedDeposit: BigInt(0),
      });

      await account.functionCall({
        contractId: this.contractId,
        methodName: 'storeUsernameWithMnemonicHash',
        args: {
          mnemonicHash: mnemonicHash,
          username: username,
        },
        gas: gas,
        attachedDeposit: BigInt(0),
      });

      return { message: 'OK' };
    } catch (error) {
      console.error('Error storing key hash in NEAR:', error);
      throw new Error('Error storing key hash in NEAR');
    }
  }

  // User verification
  // Проверка пользователя 
  async verifyUser(username: string, publicKeyHash: string): Promise<'USER_NOT_FOUND' | 'INVALID_KEY' | 'OK'> {
    try {
      const publicKey = await this.getUserPublicKey(username);

      if (!publicKey) {
        return 'USER_NOT_FOUND';
      }

      if (publicKeyHash === publicKey) {
        return 'OK';
      } else {
        return 'INVALID_KEY';
      }
    } catch (error) {
      console.error('Error fetching key hash from NEAR:', error);
      throw new Error('Error fetching key hash from NEAR');
    }
  }
}
