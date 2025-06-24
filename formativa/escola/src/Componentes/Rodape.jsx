import estilos from './Rodape.module.css';

// componente que renderiza o rodapé da página
export function Rodape() {
    return (
        <footer className={estilos.footer}>
            <p>©2025 MUNDO MÁGICO. Todos os direitos reservados.</p>
        </footer>
    );
}
