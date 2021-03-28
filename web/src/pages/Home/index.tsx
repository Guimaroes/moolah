import { ExitToApp } from '@material-ui/icons';
import { FormEvent, useContext, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { Link, useHistory } from 'react-router-dom';
import FinanceList from '../../components/FinanceList';
import TypeSelect from '../../components/TypeSelect';
import { FinancesContext } from '../../contexts/FinancesContext';
import { TypesContext } from '../../contexts/TypesContext';
import { UsersContext } from '../../contexts/UsersContext';

import './styles.css';

export default function Home() {
    
    const { selectedType } = useContext(TypesContext);
    const { 
        addNewFinance, 
        updateFinance,
        selectedFinance, 
        setSelectedFinanceId,
        title, 
        value, 
        setTitle, 
        setValue } = useContext(FinancesContext);
    const { user } = useContext(UsersContext);

    const history = useHistory();

    useEffect(() => {
        if (user === undefined) {
            history.push('/');
        }
    }, []);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!title) return alert("Informe o título");
        if (!selectedType) return alert("Selecione o tipo");
        if (!value) return alert("Informe o valor");
        if (!user) return alert("Usuário inválido");

        if (selectedFinance) {
            updateFinance(
                selectedFinance.id,
                title,
                value,
                user.id,
                selectedType.id
            );
        } else {
            addNewFinance(
                title,
                value,
                user.id,
                selectedType.id
            );
        }

        setSelectedFinanceId(0);
    }

    return (
        <div className="page-home">
            <div className="page-home-content" >
                <header>
                    <h1>Moolah</h1>
                    <Link to="/">
                        <ExitToApp className="button" />
                    </Link>
                </header>

                <main>
                    <div className="main-container">
                        <h2>Adicione receitas ou despesas</h2>

                        <form onSubmit={handleSubmit}>
                            <input 
                                placeholder="Título" 
                                name="title" 
                                autoComplete="off"
                                value={title}
                                onChange={(e) => {setTitle(e.target.value)}} 
                            />

                            <TypeSelect />
                            
                            <CurrencyInput
                                className="currency-input"
                                name="value"
                                placeholder="Valor"
                                prefix="R$ "
                                autoComplete="off"
                                decimalsLimit={2}
                                value={value !== 0 ? value : ''}
                                onChange={(e) => {
                                    setValue( 
                                        e.target.value
                                            .replace("R$ ", "")
                                            .replace(".","")
                                            .replaceAll(",",".") 
                                            );
                                }}
                            />

                            <button 
                                type="submit" 
                                className="add-button"
                            >
                                {selectedFinance ? "Atualizar" : "Adicionar"} 
                            </button>
                        </form>

                        <FinanceList />
                    </div>
                </main>

                <footer>
                    <p>Usuário: {user?.name}</p>
                </footer>
            </div>
        </div>
    )
}
