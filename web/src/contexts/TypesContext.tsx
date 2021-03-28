import { createContext, useState, ReactNode, useContext } from 'react';
import api from '../services/api';
import { UsersContext } from './UsersContext';

interface Type {
    id: number;
    title: string;
    is_income: boolean;
    id_user: number;
}

interface TypesContextData {
    types: Type[];
    selectedType: Type | undefined;
    setSelectedTypeId: (id: Type["id"]) => void;
    getTypeTitle: (id: Type["id"]) => string;
    refreshTypes: () => void;
}

export const TypesContext = createContext({} as TypesContextData);

interface TypesProviderProps {
    children: ReactNode;
}

export function TypesProvider({children}: TypesProviderProps) 
    {
    const [types, setTypes] = useState<Type[]>([]);
    const [selectedType, setSelectedType] = useState<Type | undefined>();
    
    const { user } = useContext(UsersContext);
    
    function refreshTypes() {
        api.get('types', {
            params: { id_user: user ? user.id : 0 }
        }).then(response => 
            setTypes(response.data));
    }

    function setSelectedTypeId(id: Type["id"]) {
        setSelectedType(types.find(type => type.id === id));
    }

    function getTypeTitle(id: Type["id"]) {
        const type = types.find(type => type.id === id);

        return type ? type.title : "n/d";
    }

    return (
        <TypesContext.Provider 
            value={{ 
                types,
                selectedType,
                setSelectedTypeId,
                getTypeTitle,
                refreshTypes
            }}
        >
            {children}
        </TypesContext.Provider>
    )
}