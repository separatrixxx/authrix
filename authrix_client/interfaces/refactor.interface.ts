import { KeysInterface } from "./keys.interface";


export interface GeneratorArguments {
    router: any,
    username: string,
    setErrorUsername: (e: boolean) => void,
    setIsLoading: (e: boolean) => void,
    setKeys: (e: KeysInterface | null) => void,
}

export interface RecoverArguments extends GeneratorArguments {
    mnemonic: string,
    setErrorMnemonic: (e: boolean) => void,
}

export interface LoginUserArguments extends Pick<GeneratorArguments, 'username' | 'setErrorUsername' | 'setIsLoading'> {
    router: any,
    publicKey: string,
    privateKey: string,
    setErrorPublicKey: (e: boolean) => void,
}
