// CSS
import styles from "./Home.module.css";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className={styles.title}>Desafio BoiSaúde</h1>
      <div className={styles.container}>
        <button onClick={() => navigate("/get")}>
          Visualizar os Produtos Cadastrados
        </button>
        <button onClick={() => navigate("/post")}>
          Cadastrar Novos Produtos
        </button>
      </div>
    </div>
  );
}

export default Home;
