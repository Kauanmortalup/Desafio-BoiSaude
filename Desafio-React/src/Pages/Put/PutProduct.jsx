// CSS
import styles from "./PutProduct.module.css";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function PutProduct() {
  const [product, setProduct] = useState(null);
  const [mensagem, setMensagem] = useState(null);
  const URL = "http://localhost:5163/api/Products";

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {}; // Recupere o ID do estado

  useEffect(() => {
    // Fazer a requisição para a API
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`); // Requisição à API
        setProduct(response.data); // Armazena os dados no estado
      } catch (err) {
        console.log("Erro ao buscar o produto:", err.message); // Log do erro no console
        setMensagem(
          "Não foi possível carregar o produto. Verifique a conexão com o servidor."
        );
      }
    };

    if (id) {
      fetchProduct(); // Chama a função de busca apenas se houver um ID
    } else {
      setMensagem("Nenhum produto foi selecionado para edição.");
    }
  }, [id]);

  // Função para alterações nos campos de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Função para salvar as alterações
  const handleSave = async () => {
    try {
      await axios.put(`${URL}/${id}`, product);
      setMensagem("Produto atualizado com sucesso!");
      setTimeout(() => navigate("/"), 3000); // Redireciona para a página inicial após 3 segundos
    } catch (err) {
      console.log("Erro ao atualizar o produto:", err.message);
      setMensagem("Erro ao atualizar o produto. Tente novamente mais tarde.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Editar Produto</h1>

      {product ? (
        <div className={styles.form}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={product.name || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Preço de Fábrica:
            <input
              type="number"
              name="costPrice"
              value={product.costPrice || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Preço de Venda:
            <input
              type="number"
              name="salePrice"
              value={product.salePrice || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Quantidade:
            <input
              type="number"
              name="quantity"
              value={product.quantity || ""}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSave} className={styles.saveBtn}>
            Salvar Alterações
          </button>
        </div>
      ) : (
        <p>Carregando produto...</p>
      )}
      {/* Exibe mensagem de erro ou sucesso */}
      {mensagem && <p className={styles.message}>{mensagem}</p>}
    </div>
  );
}

export default PutProduct;
