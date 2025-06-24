// imports
import { Cabecalho } from "../Componentes/Cabecalho";
import { Outlet, useLocation } from "react-router-dom";
import { Rodape } from "../Componentes/Rodape";
import banner from "../assets/banner.png";
import estilos from "./Inicial.module.css";
import criancas from '../assets/criancas.png'; 
import diretora from '../assets/diretora.png'; 
import vice from '../assets/vice.png';  

export function Inicial() {
  const location = useLocation(); //detecta a rota atual

  return (
    <>
      <Cabecalho /> {/*Cabecalho da pagina */}
      
      {/* esse location.pathname faz aparecer somente na página inicial */}
      {location.pathname === "/inicial" && (
        <div className={estilos.banner}>
          <img src={banner} alt="Banner de volta às aulas" />
        </div>
      )}

      <Outlet /> {/* Renderiza sub-rotas */}


      {/* Conteúdo "Sobre Nós" e "Equipe" só na página inicial */}
      {location.pathname === "/inicial" &&(
        <div className={estilos.pagina}>
        <section className={estilos.sobreNos}>
            <div className={estilos.texto}>
            <h2>Sobre Nós – Escola Mundo Mágico</h2>
            <p>
                A Escola Mundo Mágico nasceu do sonho de criar um espaço onde a infância fosse valorizada em sua essência: leve, alegre, livre e cheia de descobertas. Acreditamos que cada criança carrega dentro de si um universo de possibilidades e que, com carinho e estímulo certos, pode desenvolver todo o seu potencial de forma natural e feliz.
                <br /><br />
                Nossa escola é um lugar pensado para acolher, cuidar e educar com amor. Cada ambiente foi planejado para favorecer o desenvolvimento físico, emocional, social e cognitivo das crianças, respeitando suas individualidades, seus ritmos e suas formas de aprender.
            </p>
            </div>
            <div className={estilos.imagemCriancas}>
            <img src={criancas} alt="Crianças brincando na água com galochas" />
            </div>
        </section>

        <section className={estilos.equipe}>
            <h2>Equipe pedagógica</h2>
            <div className={estilos.cards}>
            <div className={estilos.card}>
                <img src={diretora} alt="Diretora" />
                <h4>Diretora</h4>
                <p>Maria Fernanda Dias</p>
            </div>
            <div className={estilos.card}>
                <img src={vice} alt="Vice-diretora" />
                <h4>Vice -Diretora</h4>
                <p>Xavier Dias</p>
            </div>
            <div className={estilos.textoEquipe}>
                <p>
                Com uma equipe pedagógica qualificada, afetuosa e experiente, adotamos práticas que colocam o brincar no centro do aprendizado. Por meio de jogos, contação de histórias, música, arte e vivências com a natureza, estimulamos a curiosidade, a autonomia, o pensamento criativo e os valores humanos desde cedo.
                <br /><br />
                Acreditamos na parceria com as famílias, no diálogo constante e na construção conjunta de uma trajetória rica e significativa para cada criança. Nossa missão é cultivar valores, acolher com empatia, educar com responsabilidade e inspirar sonhos.
                </p>
            </div>
            </div>
        </section>
    </div>

       
      )}
       <Rodape /> {/* Rodapé fixo da página */}
    </>
  );
}
