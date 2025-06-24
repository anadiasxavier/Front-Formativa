// axios faz as requisições Http(s),
// ou seja posso consultar em backend
//a junção dessas 3 bibliotecas faz a validação
// do formuario, eles saõ tipo uma venda casada,
// um funcina baseado no outro

// ana1
// Ac020107@
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import estilos from './Login.module.css';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

// Esquema de validação com Zod
const schemaLogin = z.object({
    username: z.string()
        .min(1, 'Informe um nome')
        .max(25, 'Informe no máximo 25 caracteres'),
    password: z.string()
        .min(1, 'Informe uma senha')
        .max(15, 'Informe no máximo 15 caracteres')
});
 
export function Login() {
    const navigate = useNavigate(); // Navegação após login
 
     // Hook do formulário com validação por Zod
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schemaLogin)
    });
    
    // Função chamada ao enviar o formulário
    async function obterDadosFormulario(data) {
        console.log(`Dados: ${data}`)
        try {
            // Envia os dados para a API de login
            const response = await axios.post('http://127.0.0.1:8000/api/login/', {
                username: data.username,
                password: data.password
            });
            
            // Armazena os tokens e dados do usuário
            const { access, refresh, user } = response.data;
 
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('tipo', user.tipo);
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('username', user.username);
 
            console.log('Login bem-sucedido!');          
            navigate('/inicial'); // Redireciona após login
         
 
        } catch (error) {
            console.error('Erro de autenticação', error);
            alert("Dados Inválidos, por favor verifique suas credenciais");
        }
    }
 
    return (
        <div className={estilos.conteinerLogin}>
        <div className={estilos.boxLogin}>
            <form onSubmit={handleSubmit(obterDadosFormulario)} className={estilos.loginForm}>
                <h2 className={estilos.titulo}>Login</h2>

                {/* Campo usuário */}
                <input
                    {...register('username')}
                    placeholder='username'
                    className={estilos.inputField}
                />
                {errors.username && <p className={estilos.error}>{errors.username.message}</p>}

                {/* Campo senha */}
                <input
                    {...register('password')}
                    placeholder='Senha'
                    type="password"
                    className={estilos.inputField}
                />
                {errors.password && <p className={estilos.error}>{errors.password.message}</p>}

                 {/* Botão de envio */}
                <button type="submit" className={estilos.submitButton}>Entrar</button>
            </form>
        </div>
        </div>
    );
}
 
 

