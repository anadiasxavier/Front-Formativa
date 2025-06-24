import axios from 'axios';
import React, { useState, useEffect } from 'react';
import estilos from './Visualizar.module.css';

// Componente funcional que exibe as reservas do professor logado
export function ReservaProf() {
  const [reservas, setReservas] = useState([]);
  const [salas, setSalas] = useState({});
  const [disciplinas, setDisciplinas] = useState({});

  // Recupera o nome do usuário armazenado no localStorage para exibir na lista
  const username = localStorage.getItem('username');

  // Hook que executa a busca dos dados ao montar o componente
  useEffect(() => {
  
    const token = localStorage.getItem('access_token');

    // Requisição para obter as salas do backend
    axios.get('http://127.0.0.1:8000/api/salas/', {
      headers: { Authorization: `Bearer ${token}` } 
    })
    .then(res => {
      // Monta um objeto para mapear id da sala para o nome
      const salasNome = {};
      res.data.forEach(sala => {
        salasNome[sala.id] = sala.nome;
      });
      // Atualiza o estado com o objeto mapeado
      setSalas(salasNome);
    })
    .catch(err => console.error('Erro ao buscar salas', err));

    // Requisição para obter as disciplinas do backend
    axios.get('http://127.0.0.1:8000/api/disciplinas/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      // Monta um objeto para mapear id da disciplina para o nome
      const disciplinasMap = {};
      res.data.forEach(disc => {
        disciplinasMap[disc.id] = disc.nome;
      });
      // Atualiza o estado com o objeto mapeado
      setDisciplinas(disciplinasMap);
    })
    .catch(err => console.error('Erro ao buscar disciplinas', err));

    // Requisição para obter as reservas do professor logado
    axios.get('http://127.0.0.1:8000/api/professor/reservas/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      // Atualiza o estado com a lista de reservas
      setReservas(res.data);
    })
    .catch(err => console.error('Erro ao buscar reservas', err));
  }, []); // Executa apenas uma vez ao montar o componente

  // Função para exibir o período de forma legível (Manhã, Tarde, Noite)
  function periodoDisplay(periodo) {
    const periodos = {
      M: 'Manhã',
      T: 'Tarde',
      N: 'Noite'
    };
    // Retorna o texto legível ou o valor original caso não seja encontrado
    return periodos[periodo] || periodo;
  }

  return (
    <div className={estilos.conteinerCard}>
      {/* Título da página */}
      <h2 className={estilos.tituloCard}>Minhas Reservas</h2>

      <div className={estilos.listaCard}>
        {/* Mapeia cada reserva para um card */}
        {reservas.map(reserva => {
          
          const nomeSala =
            reserva.sala_reservada_detail?.nome || 
            salas[reserva.sala_reservada] ||       
            reserva.sala_reservada;                 

          return (
            <div key={reserva.id} className={estilos.card}>
              {/* Exibe o nome da sala */}
              <h3 className={estilos.nome}>Sala: {nomeSala}</h3>
              {/* Exibe o nome do professor (username do localStorage) */}
              <p><strong>Professor: </strong>{username}</p>
              {/* Exibe o nome da disciplina com fallback para o id se não encontrar */}
              <p><strong>Disciplina: </strong>{disciplinas[reserva.disciplina] || reserva.disciplina}</p>
              {/* Exibe o período legível */}
              <p><strong>Período: </strong>{periodoDisplay(reserva.periodo)}</p>
              {/* Exibe as datas de início e término */}
              <p><strong>Data Início: </strong>{reserva.data_inicio}</p>
              <p><strong>Data Término: </strong>{reserva.data_termino}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
