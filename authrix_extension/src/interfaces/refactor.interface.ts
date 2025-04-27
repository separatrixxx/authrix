import { KeysInterface } from "./keys.interface";


export interface GenerateArguments {
    username: string,
    setErrorUsername: (e: boolean) => void,
    setKeys: (e: KeysInterface | null) => void,
    setIsLoading: (e: boolean) => void,
}

export interface AuthArguments extends Omit<GenerateArguments, 'setKeys'> {
    mnemonic: string,
    setErrorMnemonic: (e: boolean) => void,
}

export interface RecoverArguments extends GenerateArguments {
    mnemonic: string,
    setErrorMnemonic: (e: boolean) => void,
}

export interface ConfirmArguments extends Pick<GenerateArguments, 'username' | 'setIsLoading'> {
    privateKey: string,
    serviceKey: string,
    rememberKey: boolean,
    setErrorPrivateKey: (e: boolean) => void,
}
