import { Menu } from './Menu';

// mostra o menu na página inicial
export function Conteudo(){
    return(
        <main className={estilos.conteinerConteudo}>
            <Menu/>
        </main>
    )
}