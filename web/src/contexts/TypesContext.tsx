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
    addNewType: (
        title: Type["title"],
        is_income: Type["is_income"],
        id_user: Type["id_user"]
    ) => void;
    deleteType: (id: Type["id"]) => void;
    updateType: (
        id: Type["id"],
        title: Type["title"],
        is_income: Type["is_income"],
        id_user: Type["id_user"]
    ) => void;
    refreshTypes: () => void;
    title: string;
    setTitle: any;
    isIncome: boolean | undefined;
    setIsIncome: any;
    getIsIncomeLabel: (income: Type["is_income"]) => string;
}

export const TypesContext = createContext({} as TypesContextData);

interface TypesProviderProps {
    children: ReactNode;
}

export function TypesProvider({children}: TypesProviderProps) 
    {
    const [types, setTypes] = useState<Type[]>([]);
    const [selectedType, setSelectedType] = useState<Type | undefined>();

    const [title, setTitle] = useState('');
    const [isIncome, setIsIncome] = useState<boolean | undefined>();
    
    const { user } = useContext(UsersContext);
    
    function refreshTypes() {
        api.get('types', {
            params: { id_user: user ? user.id : 0 }
        }).then(response => 
            setTypes(response.data));
    }

    function setSelectedTypeId(id: Type["id"]) {
        
        var type = types.find(type => type.id === id);

        setSelectedType(type);

        if (type) {
            setTitle(type.title);
            setIsIncome(type.is_income);
        } else {
            setTitle('');
            setIsIncome(undefined);
        }
    }

    function getTypeTitle(id: Type["id"]) {
        const type = types.find(type => type.id === id);

        return type ? type.title : "n/d";
    }

    function addNewType(
        title: Type["title"], 
        is_income: Type["is_income"], 
        id_user: Type["id_user"]
    ) {
        api.post( 'types', {
            title, 
            is_income, 
            id_user
        }).then(() => {
            refreshTypes();
        }).catch(() => {
            alert('Erro ao criar tipo!');
        });
    }

    function updateType(
        id: Type["id"],
        title: Type["title"], 
        is_income: Type["is_income"], 
        id_user: Type["id_user"]
    ) {
        api.put( 'types', {
            id,
            title, 
            is_income, 
            id_user
        }).then(() => {
            refreshTypes();
        }).catch(() => {
            alert('Erro ao atualizar tipo!');
        });
    }

    function deleteType(id: Type["id"]) {
        api.delete('types', {
            params: { id }
        }).then(() => {
            refreshTypes();
        });
    }

    function getIsIncomeLabel(income: Type["is_income"]) {
        return income ? "Receita" : "Despesa";
    }

    return (
        <TypesContext.Provider 
            value={{ 
                types,
                selectedType,
                setSelectedTypeId,
                getTypeTitle,
                addNewType,
                updateType,
                refreshTypes,
                title,
                setTitle,
                isIncome,
                setIsIncome,
                getIsIncomeLabel,
                deleteType
            }}
        >
            {children}
        </TypesContext.Provider>
    )
}