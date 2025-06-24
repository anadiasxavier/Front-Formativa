import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import  axios  from 'axios';
import { useState, useEffect } from 'react';
import estilos from './Cadastrar.module.css';

// esquema de validacao
const schemaDisciplinas = z.object({
    nome: z.string()
        .min(1,'Informe seu nome!')
        .max(100, 'Informe no maximo 100 caracteres'),
    curso: z.string()
        .min(1, 'informe o curso!')
        .max(100, 'Informe no maximo 100 caracteres'),
    carga_hora: z.number({ invalid_type_error: 'Informe uma carga horária' })
        .int('Digite um valor inteiro')
        .min(1, 'Informe um valor')
        .max(260, 'Carga horária máxima de 260h'),
    descricao: z.string()
        .min(1, 'informe a descrição')
        .max(255, ' informe no maximo  255 caracteres'),
    professor: z.number({ invalid_type_error: 'selecione um professor!' })
    .int()
    .min(1)
});


export function DisciplinarCadastrar(){
    const [professores, setprofessores] = useState([]);


    const{
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm ({
        resolver: zodResolver(schemaDisciplinas)
    });

    //busca o professor no backend
    useEffect(()=>{
        async function buscarProfessores() {
            try{
                const token = localStorage.getItem('access_token')
                const response = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                // filtra apenas os usuários com tipo P
                const professoresFiltrados = response.data.filter(user => user.tipo === 'P');
                setprofessores(professoresFiltrados);
            }catch(error){
                console.error("erro", error);
            } 
        }
        buscarProfessores()
    },[])

    // envia os dados preenchidos no formulario
    async function obterDadosFormulario(data) {
        console.log("dados do formulario", data);

        try{
            const token = localStorage.getItem('access_token');
            const response = await axios.post(
                'http://127.0.0.1:8000/api/disciplinas/',
                data,{
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    }
                }
            );
            console.log('Disciplina cadastrado com sucesso!', response.data);
            alert('Disciplina cadastrado com sucesso!');
            reset();
 
        } catch (error) {
            console.error('Erro ao cadastrar disciplina', error);
            alert("Erro ao cadastrar disciplina");
        }
    }
 
    return (
        <div className={estilos.conteiner}>
           
            <form className={estilos.loginForm} onSubmit={handleSubmit(obterDadosFormulario)}>
                    <h2 className={estilos.titulo}>Cadastro de Disciplina</h2>
                    <label className ={estilos.nomeCampo} >Nome da Disciplina</label>
                    <input                        
                        className={estilos.inputField}
                        {...register('nome')}
                        placeholder="Materia"
                    />
                    {errors.nome && <p className={estilos.error}>{errors.nome.message}</p>}
               
 
                    <label className ={estilos.nomeCampo}>Nome do curso</label>
                    <input
                        className={estilos.inputField}
                        {...register('curso')}
                        placeholder="Desenvolvimento de Sistema"
                    />
                    {errors.curso && <p className={estilos.error}>{errors.curso.message}</p>}
               
 
                    <label className ={estilos.nomeCampo}>Carga horária</label>
                    <input
                     type="number"
   
                        className={estilos.inputField}
                        {...register('carga_hora', { valueAsNumber: true })}
                        placeholder="75"
                    />
                    {errors.carga_hora &&
                    <p className={estilos.error}>
                        {errors.carga_hora.message}
                    </p>}
               
 
                <label className ={estilos.nomeCampo}>Descrição</label>
                <textarea
                    className={estilos.inputField}
                    {...register('descricao')}
                    placeholder="Descreva o curso com até 2000 caracteres"
                    rows={5}
                    />
                    {errors.descricao && <p className={estilos.error}>{errors.descricao.message}</p>}
               
                    <label className ={estilos.nomeCampo}>Professor</label>
                    <select className={estilos.inputField}
                    {...register('professor', { valueAsNumber: true })}>
                        <option  value="">Selecione um professor</option>
                        {professores.map((prof) => (
                            <option className={estilos.inputField} key={prof.id} value={prof.id}>
                                {prof.username}
                            </option>
                        ))}
                    </select>
                    {errors.professor && <p className={estilos.error}>{errors.professor.message}</p>}
               
 
                <div className={estilos.icones}>
                    <button className={estilos.submitButton} type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
}