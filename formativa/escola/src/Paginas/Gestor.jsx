import axios from "axios";
import React, { useState, useEffect } from "react";
import add from '../assets/add.png';
import excluir from '../assets/deletar.png';
import editar from '../assets/edit.png';
import estilos from './Visualizar.module.css';
import { Link } from 'react-router-dom';

export function Gestor() {
  const [gestores, setGestores] = useState([]); 

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    // Buscar usuários do tipo 'G'
    axios.get('http://127.0.0.1:8000/api/usuario/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      const gestoresFiltrados = response.data.filter((user) => user.tipo === 'G');
      setGestores(gestoresFiltrados);
    })
    .catch(error => {
      console.log("error:", error);
    });
  }, []);

  // Função de exclusão do gestor
  const handleDelete = (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este gestor?');
    if (!confirmar) return;

    const token = localStorage.getItem('access_token');

    axios.delete(`http://127.0.0.1:8000/api/usuario/${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(() => {
      alert('Gestor excluído com sucesso!');
      setGestores(prev => prev.filter(gestor => gestor.id !== id)); // atualiza o estado
    })
    .catch(error => {
      console.error('Erro ao excluir Gestor:', error);
      alert('Erro ao excluir o Gestor.');
    });
  };

  return (
    <main className={estilos.conteinerDisciplina}>
      <h3 className={estilos.tituloDisciplina}>Gestores</h3>
      <div className={estilos.topoAcoes}>
        {/* link para adicionar um novo gestor */}
        <Link to="GestorCadastrar" className={estilos.iconeAdd}>
          <img src={add} alt="Adicionar" className={estilos.iconeAdd} />        
        </Link>
      </div>
      <div className={estilos.tabelaWrapper}>
        <table className={estilos.tabelaDados}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Username</th>
              <th>ni</th>
              <th>Data de contratação</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {gestores.map((gestor) => (
              <tr key={gestor.id}>
                <td>{gestor.first_name}</td>
                <td>{gestor.last_name}</td>
                <td>{gestor.username}</td>
                <td>{gestor.ni}</td>
                <td>{gestor.data_contratacao}</td>
                <td className={estilos.acoes}>
                  <Link to={`/inicial/gestores/editar/${gestor.id}`}>
                    <img src={editar} className={estilos.icone} alt="Editar" />
                  </Link>
                  <img
                    src={excluir}
                    alt="Excluir"
                    className={estilos.icone}
                    onClick={() => handleDelete(gestor.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>          
    </main>
  );
}
