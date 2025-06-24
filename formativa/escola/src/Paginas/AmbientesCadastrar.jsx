// imports da página
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import estilos from './Cadastrar.module.css';

// definindo o esquema de validação usando o Zod
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

export function AmbientesCadastrar() {
  const navigate = useNavigate(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schemaAmbientes)
  });

  //Funcao para enviar os dados validados
  async function envioData(data) {
    console.log("Dados para enviar:", data);
    //pega o token
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert("Usuário não autenticado!");
      return;
    }

    try {
      //para criar um criar ambiente
      const response = await axios.post('http://127.0.0.1:8000/api/sala/', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("Ambiente cadastrado!", response.data);
      alert('Sala cadastrada com sucesso!');
      reset();
      navigate('/Inicial/ambientes');
    } catch (error) {
      console.error('Erro ao cadastrar ambiente', error);
      if (error.response) {
        alert(`Erro ao cadastrar sala: ${error.response.data.detail || JSON.stringify(error.response.data)}`);
      } else {
        alert('Erro ao cadastrar sala, tente novamente.');
      }
    }
  }

  return (
    <div className={estilos.conteiner}>
      <form className={estilos.loginForm} onSubmit={handleSubmit(envioData)}>
        <h2 className={estilos.tituo}>Cadastro Ambiente</h2>

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
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
