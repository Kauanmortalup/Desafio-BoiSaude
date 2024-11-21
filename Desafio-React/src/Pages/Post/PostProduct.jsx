// CSS
import styles from "./PostProduct.module.css";

import { useState } from "react";
import axios from "axios";

function PostProduct() {
  const [name, setName] = useState("");
  const [costPrice, setCostPrice] = useState();
  const [salePrice, setSalePrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [mensagem, setMensagem] = useState(null); // Armazena possíveis mensagens
  const URL = "http://localhost:5163/api/Products";

  const createPost = () => {
    if (!name || !costPrice || !salePrice || !quantity) {
      setMensagem("Preencha todos os campos");
    } else {
      try {
        axios.post(URL, {
          name: name,
          costPrice: costPrice,
          salePrice: salePrice,
          quantity: quantity,
        });
        setMensagem("Produto cadastrado com sucesso!");
      } catch (err) {
        console.log("Não foi fazer o POST", err);
        setMensagem(
          "Não foi possível cadastra o produto, tente novamente mais tarde..."
        );
      }
    }
    // Zera os campos para não ter risco de duplicar produto
    setName("");
    setCostPrice("");
    setSalePrice("");
    setQuantity("");
  };

  return (
    <div className={styles.container}>
      <h1>Inserir Produtos</h1>
      <div className={styles.line}>
        <h3>Nome: </h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Nome Produto"
        />
      </div>
      <div className={styles.line}>
        <h3>Preço de Fabricação: </h3>
        <input
          value={costPrice}
          onChange={(e) => setCostPrice(e.target.value)}
          type="text"
          placeholder="Preço de Fabricação"
        />
      </div>
      <div className={styles.line}>
        <h3>Preço de Venda: </h3>
        <input
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
          type="text"
          placeholder="Preço de Venda"
        />
      </div>
      <div className={styles.line}>
        <h3>Quantidade: </h3>
        <input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          type="text"
          placeholder="Quantidade em Estoque"
        />
      </div>

      <button onClick={() => createPost()} className={styles.btnInserir}>
        Inserir
      </button>

      {/* Mostra mensagem de erro, se existir */}
      {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
    </div>
  );
}

export default PostProduct;
