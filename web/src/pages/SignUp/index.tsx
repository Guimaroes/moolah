import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function SignUp() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    function handleCrateUser(e: FormEvent) {
        e.preventDefault();

        api.post( 'users', {
            name, 
            login, 
            password
        }).then(() => {
            alert('Conta criada com sucesso!');

            history.push('/');
        }).catch(() => {
            alert('Erro ao criar conta!');
        });
    }

    return (
        <div id="page-signup">
            <div id="logo-container">
                <h1>Moolah</h1>
                <h3>Controle suas receitas e despesas.</h3>
            </div>

            <div id="signup-container">
                <header>

                </header>

                <main>
                    <h1>Criar conta</h1>
                    <form autoComplete="off" onSubmit={handleCrateUser} >
                        <input 
                            placeholder="Nome" 
                            name="name" 
                            value={name} 
                            onChange={(e) => {setName(e.target.value)}} 
                        />
                        <input 
                            placeholder="Login" 
                            name="login" 
                            value={login} 
                            onChange={(e) => {setLogin(e.target.value)}} 
                        />
                        <input 
                            placeholder="Senha" 
                            name="password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => {setPassword(e.target.value)}} 
                        />
                        <button type="submit" >
                            Criar conta
                        </button>
                    </form>
                </main>

                <footer>
                    <div>
                        Já tem conta?
                        <Link to="/">
                            Fazer login
                        </Link>
                    </div>
                </footer>
            </div>
        </div>
    )
}