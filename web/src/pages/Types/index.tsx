import { ExitToApp, Home } from "@material-ui/icons";
import { FormEvent, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import TypeList from "../../components/TypeList";
import { TypesContext } from "../../contexts/TypesContext";
import { UsersContext } from "../../contexts/UsersContext";

import './styles.css';

export default function Types() {
    const { 
        selectedType, 
        title, 
        setTitle, 
        isIncome, 
        setIsIncome,
        updateType,
        addNewType,
        setSelectedTypeId } = useContext(TypesContext);
    const { user } = useContext(UsersContext);

    const history = useHistory();

    useEffect(() => {
        if (user === undefined) {
            history.push('/');
        }
    }, []);

    function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setIsIncome( e.target.value === 'true' );
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!title) return alert("Informe o título");
        if (isIncome === undefined ) return alert("Selecione a categoria");
        if (!user) return alert("Usuário inválido");

        if (selectedType) {
            updateType(
                selectedType.id,
                title,
                isIncome,
                user.id
            );
        } else {
            addNewType(
                title,
                isIncome,
                user.id
            );
        }

        setSelectedTypeId(0);
    }

    return (
        <div className="page-types">
            <div className="page-types-content" >
                <header>
                    <h1>Moolah</h1>
                    <Link to="/home">
                        <Home className="button" />
                    </Link>
                    <Link to="/">
                        <ExitToApp className="button" />
                    </Link>
                </header>

                <main>
                    <div className="main-container">
                        <h2>Adicione tipos</h2>

                        <form onSubmit={handleSubmit}>
                            <input 
                                placeholder="Título" 
                                name="title" 
                                autoComplete="off"
                                value={title}
                                onChange={(e) => {setTitle(e.target.value)}} 
                            />

                            <select name="category" 
                                onChange={handleSelect}
                                value={isIncome !== undefined ? isIncome + '' : 'default'}
                            >
                                <option value="default" disabled hidden>Categoria</option>
                                <option value='true'>Receita</option>
                                <option value='false'>Despesa</option>
                            </select>
                            
                            <button 
                                type="submit" 
                                className="add-button"
                            >
                                {selectedType ? "Atualizar" : "Adicionar"} 
                            </button>
                        </form>

                        <TypeList />
                    </div>
                </main>

                <footer>
                    <p>Usuário: {user?.name}</p>
                </footer>
            </div>
        </div>
    )
}