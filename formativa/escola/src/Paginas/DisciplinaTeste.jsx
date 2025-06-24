import axios from "axios";
import estilos from './Visualizar.module.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import add from '../assets/add.png';
import edit from '../assets/edit.png';
import del from'../assets/deletar.png';

export function DisciplinaTeste() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState({});
 
  useEffect(() => {
    const token = localStorage.getItem('access_token');
 
    // Buscar disciplinas
    axios.get('http://127.0.0.1:8000/api/disciplinas/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    //Se a resposta da API for positiva
    .then(response => {
      setDisciplinas(response.data);
    })
    //se retornar um erro
    .catch(error => {
      console.error("Erro ao buscar disciplinas:", error);
    });
 
    // Buscar professores
    axios.get('http://127.0.0.1:8000/api/usuario/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      const professoresPorId = {};
      response.data.forEach(prof => {
        professoresPorId[prof.id] = `${prof.username} `;
      });
      setProfessores(professoresPorId);
    })
    .catch(error => {
      console.error("Erro ao buscar professores:", error);
    });
 
  }, []);
 
  //Função de exclusão da Disciplina
 const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
        if (!confirmar) return;
 
        const token = localStorage.getItem('access_token');
 
        axios.delete(`http://127.0.0.1:8000/api/disciplinas/${id}/`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            alert('Disciplina excluída com sucesso!');
            setDisciplinas(prev => prev.filter(dis => dis.id !== id));
        })
        .catch(error => {
            console.error('Erro ao excluir disciplina:', error);
            alert('Erro ao excluir a disciplina.');
        });
        };
 
  return (
    <main className={estilos.conteinerDisciplina}>
        <h3 className={estilos.tituloDisciplina}>Disciplinas</h3>
       <div className={estilos.topoAcoes}>
          {/* link para adicionar uma nova disciplina */}
          <Link to="cadastroDisciplina" className={estilos.botaoAdicionar}>
            <img src={add} alt="Adicionar" className={estilos.iconeAdd} />        
          </Link>
        </div>
         <div className={estilos.tabelaWrapper}>
          <table className={estilos.tabelaDados}>
            <thead>
              <tr>
                {/* Campos do banco que quero exibir */}
                <th>Nome</th>
                <th>Curso</th>
                <th>Descrição</th>
                <th>Carga Horária</th>
                <th>Professor</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {/* Uso o map(função callback) para fazer o retorno das disciplinas */}
              {disciplinas.map(disciplina => (
                <tr key={disciplina.id}>
                  <td>{disciplina.nome}</td>
                  <td>{disciplina.curso}</td>
                  <td>{disciplina.descricao}</td>
                  <td>{disciplina.carga_hora}</td>
                  <td>{professores[disciplina.professor] || '---'}</td>
                  <td className={estilos.acoes}>
                    {/* Passo para o "param" o id do item que posso editar e excluir */}
                   <Link to={`/inicial/disciplina/editar/${disciplina.id}`}>
                      <img src={edit} className={estilos.icone}/>
                    </Link>
                    <img src={del} alt="Excluir" className={estilos.icone}
                      onClick={() => handleDelete(disciplina.id)}/>                                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>          
        </main>
   
  );
}