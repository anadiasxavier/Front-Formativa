import axios from 'axios'; //axios é o que permite que chamemos uma API (pagina HTTP)
import React, {useState, useEffect} from 'react'; //state guarda o estado atual da  variavel
// effect mostra isso em tela
import estilos from './Visualizar.module.css';

export function DisciplinasProfessor (){
    //crio uma variavel disciplina que recebe os dados da api, e é controlada pelo state
    const [ disciplinas, setDisciplina] = useState([]);

    //()parametros, {}script, [] dependencias, aqui eu mostro o que vou chamar
    useEffect(()=> {
        const token = localStorage.getItem('access_token');
        //chama o endereço da api que eu quero consumir
        axios.get('http://127.0.0.1:8000/api/professor/disciplinas/', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response =>{
                setDisciplina(response.data);
        })
        .catch(error =>{
                console.error("Erro", error);
        });  
    }, []);

    return(
        <div className={estilos.conteinerCard}>
            <h2 className={estilos.tituloCard}>Minhas Disciplinas</h2>
            <div className={estilos.listaCard}>
                {disciplinas.map(disciplina=>(
                    <div className={estilos.card} key={disciplina.id}>
                        <h3 className={estilos.nome}>{disciplina.nome}</h3>
                        <p><strong>Curso:</strong>{disciplina.curso}</p>
                        <p><strong>Descrição:</strong>{disciplina.descricao}</p>
                        <p><strong>Carga horária:</strong>{disciplina.carga_hora}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}