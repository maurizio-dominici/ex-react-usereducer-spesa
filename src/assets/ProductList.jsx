import { useState } from "react";
import products from "../js/products";

export default function ProductList() {
  const [addedProducts, setAddedProducts] = useState([]);
  console.log(addedProducts);

  const updateProductQuantity = (name, quantity) => {
    setAddedProducts((curr) =>
      curr.map((p) => (p.name === name ? { ...p, quantity } : p))
    );
  };

  const addToCart = (product) => {
    const alreadyAddedProduct = addedProducts.find(
      (p) => p.name === product.name
    );
    if (alreadyAddedProduct) {
      updateProductQuantity(
        alreadyAddedProduct.name,
        alreadyAddedProduct.quantity + 1
      );
      return;
    }
    const productToAdd = {
      ...product,
      quantity: 1,
    };
    setAddedProducts((curr) => [...curr, productToAdd]);
  };

  const removeFromCart = (product) => {
    setAddedProducts((curr) => curr.filter((p) => p.name !== product.name));
  };

  const totalToPay = addedProducts.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );

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
              {addedProducts.map((addp, index) => (
                <li key={index}>
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

                  <button onClick={() => removeFromCart(addp)}>
                    Rimuovi dal carrello
                  </button>
                </li>
              ))}
            </ul>

            <p>
              <strong>Totale da pagare</strong>
              {totalToPay.toFixed(2)} €
            </p>
          </>
        )}
      </div>
    </>
  );
}
