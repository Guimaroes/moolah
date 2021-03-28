import { FormEvent, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UsersContext } from '../../contexts/UsersContext';
import api from '../../services/api';

import './styles.css';

export default function SignIn() {
    
    const history = useHistory();

    const { setActiveUser } = useContext(UsersContext);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    
    function authenticate(e: FormEvent) {
        e.preventDefault();

        api.post( 'auth', { 
            login, 
            password
        }).then(response => {
            if (response.data.user) {
                setActiveUser(response.data.user);
                history.push('/home');
            }
        }).catch(error => {
            alert(error.response.data.error);
        });
    }

    return (
        <div id="page-signin">
            <div id="logo-container">
                <h1>Moolah</h1>
                <h3>Controle suas receitas e despesas.</h3>
            </div>

            <div id="login-container">
                <header>

                </header>

                <main>
                    <h1>Fazer login</h1>
                    <form autoComplete="off" onSubmit={authenticate} >
                        <input 
                            placeholder="Login" 
                            name="login" 
                            value={login} 
                            onChange={(e) => setLogin(e.target.value)} 
                        />
                        <input 
                            placeholder="Senha" 
                            name="password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />

                        <button type="submit" >
                            Entrar
                        </button>
                    </form>
                </main>

                <footer>
                    <div>
                        Não tem conta?
                        <Link to="/signup">
                            Cadastre-se
                        </Link>
                    </div>
                </footer>
            </div>
        </div>
    )
}
