import { useState } from "react";
import { KeysInterface } from "../interfaces/keys.interface";


export const useHelpStates = () => {
    const [username, setUsername] = useState<string>('');
    const [errorUsername, setErrorUsername] = useState<boolean>(false);
    const [errorEmail, setErrorEmail] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [keys, setKeys] = useState<KeysInterface | null>(null);
    
    return {
        username,
        errorUsername,
        errorEmail,
        isLoading,
        keys,
        setUsername,
        setErrorUsername,
        setErrorEmail,
        setIsLoading,
        setKeys,
    };
};
