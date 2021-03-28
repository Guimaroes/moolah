import { createContext, useState, ReactNode } from 'react';

interface User {
    id: number,
    name: string,
    login: string,
    password: string
}

interface UsersContextData {
    user: User | undefined;
    setActiveUser: (user: User) => void;
}

export const UsersContext = createContext({} as UsersContextData);

interface UsersProviderProps {
    children: ReactNode;
}

export function UsersProvider({children}: UsersProviderProps) {
    const [user, setUser] = useState<User>();

    function setActiveUser( user: User ) {
        setUser(user);
    }

    return (
        <UsersContext.Provider 
            value={{ 
                user, 
                setActiveUser
            }}
        >
            {children}
        </UsersContext.Provider>
    )
}