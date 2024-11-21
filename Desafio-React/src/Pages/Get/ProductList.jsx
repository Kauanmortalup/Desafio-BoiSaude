// CSS
import styles from "./ProductList.module.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Armazena os produtos
  const [error, setError] = useState(null); // Armazena possíveis erros
  const URL = "http://localhost:5163/api/Products";
  const navigate = useNavigate();

  useEffect(() => {
    // Fazer a requisição para a API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(URL); // Requisição à API
        setProducts(response.data); // Armazena os dados no estado
      } catch (err) {
        console.log("Erro ao buscar os produtos:", err.message); // Log do erro no console
        setError(
          "Não foi possível carregar os produtos. Verifique a conexão com o servidor."
        );
      }
    };

    fetchProducts(); // Chama a função de busca
  }, []);

  // Função Para Deletar Produto
  const handleDelete = async (productsId) => {
    try {
      // Requisição de DELETE para a API
      await axios.delete(`${URL}/${productsId}`);

      // Atualiza a lista apos a exclusão
      setProducts(products.filter((product) => product.id !== productsId));
    } catch (err) {
      console.log("Erro ao excluir produto", err);
      setError(
        "Não foi possível excluir o produto. Tente novamente mais tarde"
      );
    }
  };

  return (
    <div className={styles.productList}>
      <h1>Lista de Produtos</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço de Fábrica</th>
            <th>Preço de Venda</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>R$ {product.costPrice.toFixed(2)}</td>
              <td>R$ {product.salePrice.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>
                <div className={styles.actionButtons}>
                  <button
                    onClick={() =>
                      navigate("/put", { state: { id: product.id } })
                    }
                    className={styles.editButton}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className={styles.deleteButton}
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mostra mensagem de erro, se existir */}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default ProductList;
