import { useState } from "react";
import products from "../js/products";

export default function ProductList() {
  const [addedProducts, setAddedProducts] = useState([]);
  console.log(addedProducts);

  const addToCart = (product) => {
    const isProductAlreadyAdded = addedProducts.some(
      (p) => p.name === product.name
    );
    if (isProductAlreadyAdded) {
      return;
    }
    const productToAdd = {
      ...product,
      quantity: 1,
    };
    setAddedProducts((curr) => [...curr, productToAdd]);
  };

  return (
    <>
      <h1>lista dei prodotti</h1>

      <div>
        <ul>
          {products.map((product, index) => {
            return (
              <li key={index}>
                <strong>Nome :</strong>
                {product.name} / <strong>Prezzo :</strong>
                {product.price.toFixed(2)}
                <button onClick={() => addToCart(product)}>
                  Aggiungi al carrello
                </button>
              </li>
            );
          })}
        </ul>
        {addedProducts.length > 0 && (
          <>
            <h2>Carrello</h2>

            <ul>
              {addedProducts.map((addp) => (
                <li>
                  <p>
                    <strong>Nome :</strong>
                    {addp.name}
                  </p>
                  <p>
                    <strong>Prezzo :</strong>
                    {addp.price.toFixed(2)}
                  </p>
                  <p>
                    <strong>Quantità :</strong>
                    {addp.quantity}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
