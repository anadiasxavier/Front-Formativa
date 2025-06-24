// Imports do componente
import estilos from './Cabecalho.module.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

export function Cabecalho(){
    const tipo = localStorage.getItem('tipo'); // Tipo do usuário

    //Define os links que irão aparecer com base no tipo de usuário
    const linkDisciplina = tipo === 'P' ? 'discProfessor' : 'disciplina';
    
    const linkReserva = tipo === 'P' ? 'reservaProfessor' : 'reserva';


    return(
        <header className={estilos.conteinerHeader}>
            <img className={estilos.logo} src={logo} alt="Logo"/>

            {/* div que contém os links de navegação */}
            <div className={estilos.links}>
                <ul>
                    <li>
                       <Link to="/inicial">Inicial</Link> 
                    </li>
                    <li>
                        <Link to={linkDisciplina}>Disciplinas</Link>
                    </li>
                    <li>
                        <Link to={`/inicial/${linkReserva}`}>Reserva</Link>
                    </li>

                {tipo === 'G' &&(
                  <> 
                
                    <li>
                        <Link to="/inicial/professor">Professores</Link>
                    </li>
                    
                </> 
                )}
                </ul>
            </div>
        </header>
    );
}