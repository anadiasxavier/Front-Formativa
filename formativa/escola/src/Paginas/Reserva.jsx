// imports
import axios from "axios";
import estilos from './Visualizar.module.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import add from '../assets/add.png';
import deletar from '../assets/deletar.png';
import edit from '../assets/edit.png';


// Componente principal para visualizar reservas
export function Reserva() {
    // Estados para armazenar os dados da API
    const [disciplinas, setDisciplinas] = useState([]);
    const [reservas, setReservas] =  useState([]);
    const [ambientes, setAmbientes] = useState([]);
    const [professores, setProfessores] = useState({});

    
 // Busca os dados da API ao montar o componente
 useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem('access_token'); // Recupera token salvo
        
        try {
            // Busca disciplinas
            const disciplinasRes = await axios.get('http://127.0.0.1:8000/api/disciplinas/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setDisciplinas(disciplinasRes.data);

            // Busca usuários e filtra professores
            const professoresRes = await axios.get('http://127.0.0.1:8000/api/usuario/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const professorPorId = {};
            professoresRes.data.forEach(prof => {
                professorPorId[prof.id] = prof.username;
            });
            setProfessores(professorPorId);
            
            // Busca reservas existentes
            const reservasRes = await axios.get('http://127.0.0.1:8000/api/reservas/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setReservas(reservasRes.data);

            // Busca ambientes disponíveis
            const ambientesRes = await axios.get('http://127.0.0.1:8000/api/sala/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setAmbientes(ambientesRes.data);

        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    fetchData();
}, []);

    // Exibir o nome do período de forma legível
    function periodoDisplay(periodo) {
        const periodos = {
            'M': 'Manhã',
            'T': 'Tarde',
            'N': 'Noite'
        };
        return periodos[periodo] || periodo;
    }

    // Função de exclusão de reserva
    const handleDelete = (id) => {
        const confirmar = window.confirm('Tem certeza que deseja excluir esta reserva?');
        if (!confirmar) return;

        const token = localStorage.getItem('access_token');

        axios.delete(`http://127.0.0.1:8000/api/reservas/${id}/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(() => {
            alert('Reserva excluída com sucesso!');
            // Remove a reserva da lista local após exclusão
            setReservas(prev => prev.filter(res => res.id !== id));
        })
        .catch(error => {
            console.error('Erro ao excluir reserva:', error);
            alert('Erro ao excluir a reserva.');
        });
    };

    return (
        <main className={estilos.conteinerDisciplina}>
            <h3 className={estilos.tituloDisciplina}>Reservas de Ambientes</h3>
            <div className={estilos.topoAcoes}>
                <Link to="ReservaCadastrar" className={estilos.iconeAdd}>
                    <img className={estilos.iconeAdd} src={add} alt="adicionar reserva" />
                </Link>
            </div>
            {/* Tabela de reservas */}
            <div className={estilos.tabelaWrapper}>
                <table className={estilos.tabelaDados}>
                    <thead>
                        <tr>
                            <th>Professor Respónsavel</th>
                            <th>Disciplina</th>
                            <th>Sala</th>
                            <th>Período</th>
                            <th>Início</th>
                            <th>Término</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map(reserva => (
                            <tr key={reserva.id}>
                                {/* Busca o nome da disciplina pelo ID */}

                                <td>{professores[reserva.professor] || reserva.professor}</td>
                                <td>
                                    {
                                        disciplinas.find(d => d.id === reserva.disciplina)?.nome || reserva.disciplina
                                    }
                                </td>
                                <td>
                                    {
                                        reserva.sala_reserva && typeof reserva.sala_reserva === 'object'
                                        ? reserva.sala_reserva.nome
                                        : ambientes.find(a => String(a.id) === String(reserva.sala_reserva))?.nome || reserva.sala_reserva
                                    }
                                    </td>
                                <td>{periodoDisplay(reserva.periodo)}</td>
                                <td>{reserva.data_inicio}</td>
                                <td>{reserva.data_termino}</td>
                                {/* Ações de editar e excluir */}
                                <td>
                                    <Link to={`/inicial/reserva/editar/${reserva.id}`}>
                                        <img className={estilos.icone} src={edit} alt="editar" />
                                    </Link>
                                    <img
                                        className={estilos.icone}
                                        src={deletar}
                                        onClick={() => handleDelete(reserva.id)}
                                        alt="excluir"
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
