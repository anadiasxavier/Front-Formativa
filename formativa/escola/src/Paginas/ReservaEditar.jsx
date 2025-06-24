import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import estilos from './Cadastrar.module.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// esquema de validacao
const schemaReserva = z.object({
    professor: z.number({ 
        invalid_type_error: 'Selecione o professor.' 
    }),
    disciplina: z.number({ 
        invalid_type_error: 'Selecione a disciplina.'
    }),
    sala_reserva: z.number({ 
        invalid_type_error: 'Selecione a sala.' 
    }),
    periodo: z.enum(['M', 'T', 'N'], { 
        errorMap: () => ({ message: 'Selecione o período.' 
            
        }) }),
    data_inicio: z.string().min(1, 'Informe a data de início'),
    data_termino: z.string().min(1, 'Informe a data de término'),
    });


export function ReservaEditar() {
    // configuração do formulario
    const navigate = useNavigate();
    const { id } = useParams();
    const [professores, setProfessores] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [ambientes, setAmbientes] = useState([]);
 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaReserva)
    });
    
  //busca os dados
  useEffect(() => {
    const token = localStorage.getItem('access_token');

    async function buscarDados() {
      try {
        const [resProf, resDis, resSalas, resReserva] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/usuario/', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://127.0.0.1:8000/api/disciplinas/', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://127.0.0.1:8000/api/sala/', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://127.0.0.1:8000/api/reservas/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setProfessores(resProf.data);
        setDisciplinas(resDis.data);
        setAmbientes(resSalas.data);

        reset(resReserva.data); 
      } catch (error) {
        console.error("Erro ao carregar dados da reserva", error);
      }
    }

    buscarDados();
  }, [id, reset])

    // Envia os dados editados
    async function envioData(data) {
      console.log("Dados do formulário:", data);
        try {
            const token = localStorage.getItem('access_token');
 
            const response = await axios.patch(
                `http://127.0.0.1:8000/api/reservas/${id}/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
 
            console.log('Reserva editada com sucesso!', response.data);
            alert('Reserva editada com sucesso!');
            reset();
            navigate('/inicial/reserva');
 
        } catch (error) {
            console.error('Erro ao editar reserva', error);
            alert("Erro ao editar reserva");
        }
    }
  
    // Formulário de edição
   return (
         <div className={estilos.conteiner}>
             <form className={estilos.loginForm} onSubmit={handleSubmit(envioData)}>
               <h2 className={estilos.titulo}>Edição de reserva</h2>

                {/* Professor */}
               <label className={estilos.nomeCampo}>Professor Responsável</label>
               <select className={estilos.inputField} {...register('professor', { valueAsNumber: true })}>
                 <option value="">Selecione o professor</option>
                 {professores.map(prof => (
                   <option key={prof.id} value={prof.id}>{prof.username}</option>
                 ))}
               </select>
               {errors.professor && <p className={estilos.error}>{errors.professor.message}</p>}
                 
                 {/* Disciplina */}
               <label className={estilos.nomeCampo}>Disciplina</label>
               <select className={estilos.inputField} {...register('disciplina', { valueAsNumber: true })}>
                 <option value="">Selecione a disciplina</option>
                 {disciplinas.map(d => (
                   <option key={d.id} value={d.id}>{d.nome}</option>
                 ))}
               </select>
               {errors.disciplina && <p className={estilos.error}>{errors.disciplina.message}</p>}
                 
                 {/*  Sala */}
               <label className={estilos.nomeCampo}>Sala</label>
               <select className={estilos.inputField} {...register('sala_reserva', { valueAsNumber: true })}>
                 <option value="">Selecione a sala</option>
                 {ambientes.map(a => (
                   <option key={a.id} value={a.id}>{a.nome}</option>
                 ))}
               </select>
               {errors.sala_reserva && <p className={estilos.error}>{errors.sala_reserva.message}</p>}
                
                {/*  Período */}
               <label className={estilos.nomeCampo}>Período</label>
               <select className={estilos.inputField} {...register('periodo')}>
                 <option value="">Selecione o período</option>
                 <option value="M">Manhã</option>
                 <option value="T">Tarde</option>
                 <option value="N">Noite</option>
               </select>
               {errors.periodo && <p className={estilos.error}>{errors.periodo.message}</p>}
                
                {/* Data de Início */}
               <label className={estilos.nomeCampo}>Data Início</label>
               <input
                 type="date"
                 className={estilos.inputField}
                 {...register('data_inicio')}
               />
               {errors.data_inicio && <p className={estilos.error}>{errors.data_inicio.message}</p>}
                 
                 {/* Data de Término */}
               <label className={estilos.nomeCampo}>Data Término</label>
               <input
                 type="date"
                 className={estilos.inputField}
                 {...register('data_termino')}
               />
               {errors.data_termino && <p className={estilos.error}>{errors.data_termino.message}</p>}
                 
                 {/* Botão de envio */}
               <div className={estilos.icones}>
                 <button className={estilos.submitButton} type="submit">
                   Salvar alterações
                 </button>
               </div>
        </form>
    </div>
 );
}
   