import { Routes, Route } from "react-router-dom";
import { Login } from "../Paginas/Login";
import { Inicial } from "../Paginas/Inicial";
import { Menu } from '../Componentes/Menu';
import { DisciplinasProfessor } from "../Paginas/DisciplinasProfessor";
import { DisciplinaTeste } from "../Paginas/DisciplinaTeste";
import { DisciplinarCadastrar } from "../Paginas/DisciplinarCadastrar";
import { DisciplinaEditar } from "../Paginas/DisciplinaEditar";
import { Professores } from "../Paginas/Professores";
import { ProfessoresCadastrar } from "../Paginas/ProfessoresCadastrar";
import { ProfessoresEditar } from "../Paginas/ProfessoresEditar";
import { Ambientes } from "../Paginas/Ambientes";
import { AmbientesCadastrar } from "../Paginas/AmbientesCadastrar";
import { AmbientesEditar } from "../Paginas/AmbientesEditar";
import { Gestor } from "../Paginas/Gestor";
import { GestorCadastrar } from "../Paginas/GestorCadastrar";
import { GestorEditar } from "../Paginas/GestorEditar";
import { Reserva } from "../Paginas/reserva";
import { ReservaCadastrar } from "../Paginas/ReservaCadastrar";
import { ReservaEditar } from "../Paginas/ReservaEditar";
import { ReservaProf } from "../Paginas/ReservaProf";

export function Rotas() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />
      
      {/* Inicio */}
      <Route path="/Inicial" element={<Inicial />} >
        <Route index element={<Menu />} />
        <Route path="discProfessor" element={<DisciplinasProfessor />} />
        <Route path="reservaProfessor" element={<ReservaProf />} />

        {/* disciplina */}
        <Route path="disciplina">
          <Route index element={<DisciplinaTeste />} />
          <Route path="cadastroDisciplina" element={<DisciplinarCadastrar />} />
          <Route path="Editar/:id" element={<DisciplinaEditar />} />
        </Route>

        {/* Professor */}
        <Route path="professor">  
          <Route index element={<Professores />} />
          <Route path="cadastroProfessores" element={<ProfessoresCadastrar />} />
          <Route path="Editar/:id" element={<ProfessoresEditar />} />
        </Route>

        {/* Ambientes */}
        <Route path="ambientes">
          <Route index element={<Ambientes />} />
          <Route path="AmbientesCadastrar" element={<AmbientesCadastrar/>} />
          <Route path="Editar/:id" element={<AmbientesEditar/>} />
        </Route>

        {/* Gestores */}
        <Route path="gestores">
          <Route index element={<Gestor />} />
          <Route path="GestorCadastrar" element={<GestorCadastrar/>} />
          <Route path="Editar/:id" element={<GestorEditar/>} />
        </Route>

        {/* Reservas */}
        <Route path="reserva">
          <Route index element={<Reserva />} />
          <Route path="ReservaCadastrar" element={<ReservaCadastrar/>} />
          <Route path="Editar/:id" element={<ReservaEditar/>} />
        </Route>

      </Route>
    </Routes>
  );
}
