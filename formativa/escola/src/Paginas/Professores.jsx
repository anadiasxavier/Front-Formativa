import axios from "axios";
import estilos from './Visualizar.module.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import add from '../assets/add.png';
import edit from '../assets/edit.png';
import del from'../assets/deletar.png';

export function Professores() {
  const [professores, setProfessores] = useState([]);
 
  useEffect(() => {
    const token = localStorage.getItem('access_token');
 
    // Buscar professores
    axios.get('http://127.0.0.1:8000/api/usuario/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      const professores =  response.data.filter((user) => user.tipo ==='P');

      setProfessores(professores);
    })
    .catch(error => {
      console.error("Erro ao buscar professores:", error);
    });
 
  }, []);
 
  //Função de exclusão do professor
 const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir esse professor?');
        if (!confirmar) return;
 
        const token = localStorage.getItem('access_token');
 
        axios.delete(`http://127.0.0.1:8000/api/usuario/${id}/`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            alert('Professor excluído com sucesso!');
            setProfessores(prev => prev.filter(pro => pro.id !== id));
        })
        .catch(error => {
            console.error('Erro ao excluir professor', error);
            alert('Erro ao excluir a professor.');
        });
        };
        console.log(professores)
 
  return (
    <main className={estilos.conteinerDisciplina}>
        <h3 className={estilos.tituloDisciplina}>Professores</h3>
       <div className={estilos.topoAcoes}>
          {/* link para adicionar uma novo professor */}
          <Link to="cadastroProfessores" className={estilos.botaoAdicionar}>
            <img src={add} alt="Adicionar" className={estilos.iconeAdd} />        
          </Link>
        </div>
         <div className={estilos.tabelaWrapper}>
          <table className={estilos.tabelaDados}>
            <thead>
              <tr>
                {/* Campos do banco que quero exibir */}
                <th>Username</th>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>E-mail</th>
                <th>Tipo</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {/* Uso o map(função callback) para fazer o retorno das disciplinas */}
              {professores.map(professor => (
                <tr key={professor.id}>
                  <td>{professor.username}</td>
                  <td>{professor.first_name}</td>
                  <td>{professor.last_name}</td>
                  <td>{professor.email}</td>
                  <td>{professor.tipo}</td>
                  <td className={estilos.acoes}>
                    {/* Passo para o "param" o id do item que posso editar e excluir */}
                   <Link to={`/inicial/professor/editar/${professor.id}`}>
                      <img src={edit} className={estilos.icone}/>
                    </Link>
                    <img src={del} alt="Excluir" className={estilos.icone}
                      onClick={() => handleDelete(professor.id)}/>                                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>          
        </main>
   
  );
}