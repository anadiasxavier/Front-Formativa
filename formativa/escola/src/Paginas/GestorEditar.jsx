import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import estilos from './Cadastrar.module.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


// esquema de validacao
const schemaGestor = z.object({
  username: z.string().min(3, 'Informe o username com no mínimo 3 caracteres').max(100, 'Máximo 100 caracteres'),
  first_name: z.string().min(3, 'Informe o nome com no mínimo 3 caracteres').max(100, 'Máximo 100 caracteres'),
  last_name: z.string().min(3, 'Informe o sobrenome com no mínimo 3 caracteres').max(100, 'Máximo 100 caracteres'),
  password: z.string().min(3, 'A senha deve ter pelo menos 4 caracteres').max(10, 'A senha deve ter no máximo 10 caracteres'),
  ni: z.number({ invalid_type_error: 'NI deve ser um número' }).int('O NI deve ser um número inteiro').positive('O NI deve ser positivo'),
  telefone: z.string().min(5, 'Telefone inválido').max(19, 'Telefone muito longo'),
  data_nascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data de nascimento inválida'),
  data_contratacao: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data de contratação inválida'),
});

export function GestorEditar() {
  const [gestor, setGestor] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schemaGestor)
  });

  // carrega os dados
  useEffect(() => {
    async function buscarGestor() {
      try {
        const token = localStorage.getItem('access_token');

        // Preenche o formulário com dados do usuário específico
        const resGestor = await axios.get(`http://127.0.0.1:8000/api/usuario/${id}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Preenche o formulário
        reset(resGestor.data);
        setGestor(resGestor.data);

      } catch (error) {
        console.error("Erro ao carregar Gestor", error);
      }
    }
    buscarGestor();
  }, [id, reset]);

  //enviar os dados editados
  async function obterDadosFormulario(data) {
    try {
      const token = localStorage.getItem('access_token');

      const response = await axios.patch(
        `http://127.0.0.1:8000/api/usuario/${id}/`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      alert('Gestor editado com sucesso!');
      reset();
      navigate('/inicial/gestores');

    } catch (error) {
      console.error('Erro ao editar gestor', error.response?.data || error.message);
      alert("Erro ao editar gestor");
    }
  }

  return (
    <div className={estilos.conteiner}>
      <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
        <h2 className={estilos.titulo}>Edição de Gestor</h2>

        <label className={estilos.nomeCampo}>Nome</label>
        <input className={estilos.inputField} {...register('first_name')} placeholder="Ana" />
        {errors.first_name && <p className={estilos.error}>{errors.first_name.message}</p>}

        <label className={estilos.nomeCampo}>Sobrenome</label>
        <input className={estilos.inputField} {...register('last_name')} placeholder="Silva" />
        {errors.last_name && <p className={estilos.error}>{errors.last_name.message}</p>}

        <label className={estilos.nomeCampo}>Username</label>
        <input className={estilos.inputField} {...register('username')} placeholder="usuario123" />
        {errors.username && <p className={estilos.error}>{errors.username.message}</p>}

        <label className={estilos.nomeCampo}>NI</label>
        <input type="number" className={estilos.inputField} {...register('ni', { valueAsNumber: true })} placeholder="123" />
        {errors.ni && <p className={estilos.error}>{errors.ni.message}</p>}

        <label className={estilos.nomeCampo}>Data de nascimento</label>
        <input className={estilos.inputField} {...register('data_nascimento')} placeholder="1990-01-01" />
        {errors.data_nascimento && <p className={estilos.error}>{errors.data_nascimento.message}</p>}

        <label className={estilos.nomeCampo}>Data de contratação</label>
        <input className={estilos.inputField} {...register('data_contratacao')} placeholder="2020-01-01" />
        {errors.data_contratacao && <p className={estilos.error}>{errors.data_contratacao.message}</p>}

        <label className={estilos.nomeCampo}>Telefone</label>
        <input className={estilos.inputField} {...register('telefone')} placeholder="(11) 91234-5678" />
        {errors.telefone && <p className={estilos.error}>{errors.telefone.message}</p>}

        <label className={estilos.nomeCampo}>Senha</label>
        <input type="password" className={estilos.inputField} {...register('password')} placeholder="Digite a senha" />
        {errors.password && <p className={estilos.error}>{errors.password.message}</p>}

        <div className={estilos.icones}>
          <button className={estilos.submitButton} type="submit">Salvar alterações</button>
        </div>
      </form>
    </div>
  );
}
