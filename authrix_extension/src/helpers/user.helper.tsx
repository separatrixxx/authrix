import axios from 'axios';


export async function createUser(username: string, publicKeyHash: string, mnemonicHash: string, isChange: boolean) {
   try {
       const response = await axios.post('http://localhost:3001/user/create', {
           username,
           publicKeyHash,
           mnemonicHash,
           isChange
       });

       return response.data;
   } catch (error) {
       if (axios.isAxiosError(error)) {
           console.error('Error creating user:', error.response?.data);
       }
       
       throw error;
   }
}

export async function checkUsername(username: string) {
   try {
       const response = await axios.get('http://localhost:3001/user/publicKey?username=' + username);

       return response.data;
   } catch (error) {
       if (axios.isAxiosError(error)) {
           console.error('Error checking username:', error.response?.data);
       }

       throw error;
   }
}

export async function checkMnemonic(mnemonicHash: string) {
   try {
       const response = await axios.get('http://localhost:3001/user/username?mnemonicHash=' + mnemonicHash);

       return response.data;
   } catch (error) {
       if (axios.isAxiosError(error)) {
           console.error('Error checking mnemonic:', error.response?.data);
       }

       throw error;
   }
}
