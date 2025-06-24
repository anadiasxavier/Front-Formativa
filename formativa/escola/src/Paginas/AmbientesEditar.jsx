import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import estilos from './Cadastrar.module.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// esquema de validacao
const schemaAmbientes = z.object({
  nome: z.string()
    .min(1, 'Informe o nome!')
    .max(100, 'Informe no máximo 100 caracteres'),
  capacidade_alunos: z.number({
    invalid_type_error: 'Informe a capacidade dos alunos corretamente.'
  })
    .int('O número tem que ser inteiro')
    .min(1, 'A capacidade mínima é 1')
    .max(100, 'A capacidade máxima é 100.')
});
 
export function AmbientesEditar() {
 
    const [ambientes, setAmbientes] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaAmbientes)
    });
 
    // carrega os dados
    useEffect(() => {
        async function buscarAmbientes() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/sala/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAmbientes(response.data);
                //Preenche o formulários com os dados do registro do ID
                 const resSalas = await axios.get(`http://127.0.0.1:8000/api/sala/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
 
                // Preenche o formulário
                reset(resSalas.data);
 
            } catch (error) {
                console.error("Erro ao carregar ambientes", error);
            }
        }
        buscarAmbientes();
    }, []);
 
    //enviar os dados editados 
    async function obterDadosFormulario(data) {
      console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');
 
            const response = await axios.patch(
                `http://127.0.0.1:8000/api/sala/${id}/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
 
            console.log('Ambiente editado com sucesso!', response.data);
            alert('Ambiente editado com sucesso!');
            reset();
            navigate('/inicial/ambientes');
 
        } catch (error) {
            console.error('Erro ao editar ambiente', error);
            alert("Erro ao editar ambiente");
        }
    }
 
   return (
       <div className={estilos.conteiner}>
         <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
           <h2 className={estilos.tituo}>Edição de ambiente</h2>
   
           <label className={estilos.nomeCampo}>Nome do ambiente</label>
           <input
             className={estilos.inputField}
             {...register('nome')}
             placeholder="Sala 103"
           />
           {errors.nome && <p className={estilos.error}>{errors.nome.message}</p>}
   
           <label className={estilos.nomeCampo}>Capacidade</label>
           <input
             type="number"
             className={estilos.inputField}
             {...register('capacidade_alunos', { valueAsNumber: true })}
             placeholder="50"
           />
           {errors.capacidade_alunos && <p className={estilos.error}>{errors.capacidade_alunos.message}</p>}
   
           <div className={estilos.icones}>
             <button className={estilos.submitButton} type="submit">
              Salvar alterações
             </button>
           </div>
        </form>
    </div>
 );
}
   