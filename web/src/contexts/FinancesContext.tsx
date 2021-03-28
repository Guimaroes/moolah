import { createContext,  useState, ReactNode, useContext } from 'react';
import api from '../services/api';
import { TypesContext } from './TypesContext';
import { UsersContext } from './UsersContext';

interface Finance {
    id: number,
    title: string,
    value: number,
    id_user: number,
    id_type: number
}

interface FinancesContextData {
    finances: Finance[];
    selectedFinance: Finance | undefined;
    setSelectedFinanceId: (id: Finance["id"]) => void;
    getFormattedValue: (value: Finance["value"]) => string;
    addNewFinance: (
        title: Finance["title"], 
        value: Finance["value"], 
        id_user: Finance["id_user"], 
        id_type: Finance["id_type"] ) => void;
    deleteFinance: (id: Finance["id"]) => void;
    updateFinance: (
        id: Finance["id"],
        title: Finance["title"], 
        value: Finance["value"], 
        id_user: Finance["id_user"], 
        id_type: Finance["id_type"] ) => void;
    refreshFinances: () => void;
    title: string;
    value: number;
    setTitle: any;
    setValue: any;
}

export const FinancesContext = createContext({} as FinancesContextData);

interface FinancesProviderProps {
    children: ReactNode;
}

export function FinancesProvider({children}: FinancesProviderProps) {
    const [finances, setFinances] = useState<Finance[]>([]);
    const [selectedFinance, setSelectedFinance] = useState<Finance | undefined>();
    
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);

    const { user } = useContext(UsersContext);
    const { setSelectedTypeId } = useContext(TypesContext);
    
    function refreshFinances() {
        api.get('finances', {
            params: { id_user: user ? user.id : 0 }
        }).then(response => 
            setFinances(response.data));
    }

    function setSelectedFinanceId(id: Finance["id"]) {
        
        var finance = finances.find(finance => finance.id === id);
        
        setSelectedFinance(finance);

        if (finance) {
            setTitle(finance.title);
            setValue(finance.value);
            setSelectedTypeId(finance.id_type);
        } else {
            setTitle('');
            setValue(0);
            setSelectedTypeId(0);
        }
    }

    function getFormattedValue(value: Finance["value"]) {
        var formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        });
          
        return formatter.format(value);
    }

    function addNewFinance(
        title: Finance["title"], 
        value: Finance["value"], 
        id_user: Finance["id_user"], 
        id_type: Finance["id_type"]
    ) {
        api.post( 'finances', {
            title, 
            value, 
            id_user,
            id_type
        }).then(() => {
            refreshFinances();
        }).catch(() => {
            alert('Erro ao criar registro!');
        });
    }

    function deleteFinance(id: Finance["id"]) {
        api.delete('finances', {
            params: { id }
        }).then(() => {
            refreshFinances();
        });
    }

    function updateFinance(
        id: Finance["id"],
        title: Finance["title"], 
        value: Finance["value"], 
        id_user: Finance["id_user"], 
        id_type: Finance["id_type"]
    ) {
        api.put( 'finances', {
            id,
            title, 
            value, 
            id_user,
            id_type
        }).then(() => {
            refreshFinances();
        }).catch(() => {
            alert('Erro ao atualizar registro!');
        });
    }

    return (
        <FinancesContext.Provider 
            value={{ 
                finances,
                selectedFinance,
                setSelectedFinanceId,
                getFormattedValue,
                addNewFinance,
                deleteFinance,
                updateFinance,
                refreshFinances,
                title,
                value,
                setTitle,
                setValue
            }}
        >
            {children}
        </FinancesContext.Provider>
    )
}