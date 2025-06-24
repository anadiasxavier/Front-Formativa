// imports da página
import axios from "axios";
import estilos from './Visualizar.module.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import add from '../assets/add.png';
import deletar from '../assets/deletar.png';
import edit from '../assets/edit.png';

export function Ambientes() {
  const [ambientes, setAmbientes] = useState([]);
  const [professores, setProfessores] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('access_token');
 
    // Buscar sala
    axios.get('http://127.0.0.1:8000/api/sala/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    //Se a resposta da API for positiva
    .then(response => {
      setAmbientes(response.data);
    })
    //se retornar um erro
    .catch(error => {
      console.error("Erro ao buscar ambiente:", error);
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
        professoresPorId[prof.id] = `${prof.first_name} ${prof.last_name}`;
      });
      setProfessores(professoresPorId);
    })
    .catch(error => {
      console.error("Erro ao buscar professores:", error);
    });
 
  }, []);
 
  //Função de exclusão da ambiente
    const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir este ambiente?');
        if (!confirmar) return;

        const token = localStorage.getItem('access_token');

        axios.delete(`http://127.0.0.1:8000/api/sala/${id}/`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            alert('Ambiente excluído com sucesso!');
            setAmbientes(prev => prev.filter(dis => dis.id !== id));
        })
        .catch(error => {
            console.error('Erro ao excluir Ambiente:', error);
            alert('Erro ao excluir o Ambiente.');
    });
    };
 
  return (
    <main className={estilos.conteinerDisciplina}>
        <h3 className={estilos.tituloDisciplina}>Ambientes</h3>
       <div className={estilos.topoAcoes}>
          {/* link para adicionar um novo ambiente */}
          <Link to="AmbientesCadastrar" className={estilos.iconeAdd}>
            <img src={add} alt="Adicionar" className={estilos.iconeAdd} />        
          </Link>
        </div>
         <div className={estilos.tabelaWrapper}>
          <table className={estilos.tabelaDados}>
            <thead>
              <tr>
                {/* Campos do banco que quero exibir */}
                <th>Nome</th>
                <th>Capacidade max.</th>   
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {/* Uso o map(função callback) para fazer o retorno dos ambientes */}
              {ambientes.map(sala => (
                <tr key={sala.id}>
                  <td>{sala.nome}</td>
                  <td>{sala.capacidade_alunos}</td>
                  <td className={estilos.acoes}>
                    {/* Passo para o "param" o id do item que posso editar e excluir */}
                   <Link to={`/inicial/ambientes/editar/${sala.id}`}>
                      <img src={edit} className={estilos.icone}/>
                    </Link>
                    <img src={deletar} alt="Excluir" className={estilos.icone}
                      onClick={() => handleDelete(sala.id)}/>                                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>          
        </main>
   
  );
}