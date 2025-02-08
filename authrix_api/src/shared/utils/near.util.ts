import { connect, KeyPair, keyStores, Near } from 'near-api-js';
import { homedir } from 'os';
import { join } from 'path';


// Connecting to the NEAR network
// Подключение к сети NEAR
export async function createNearConnection(networkId: string): Promise<Near> {
  const homeDir = homedir();
  const credentialsPath = join(homeDir, '.near-credentials');
  const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

  const near = await connect({
    networkId,
    keyStore,
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
  });

  return near;
}
