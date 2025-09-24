import { useReducer } from "react";
import products from "../js/products";

function cartReducer(addedProducts, action) {
  switch (action.type) {
    case "ADD_ITEM":
      // Logica per aggiungere un prodotto
      const alreadyAddedProduct = addedProducts.find(
        (p) => p.name === action.payload.name
      );
      if (alreadyAddedProduct) {
        action.payload.quantity = alreadyAddedProduct.quantity + 1;
      } else {
        const productToAdd = {
          ...action.payload,
          quantity: 1,
        };
        return [...addedProducts, productToAdd];
      }

    case "UPDATE_QUANTITY":
      // Logica per aggiornare la quantità
      if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
        return addedProducts;
      }
      return addedProducts.map((p) =>
        p.name === action.payload.name
          ? { ...p, quantity: action.payload.quantity }
          : p
      );

    case "REMOVE_ITEM":
      // Logica per rimuovere un prodotto
      return addedProducts.filter((p) => p.name !== action.payload);
    default:
      return state;
  }
}

export default function ProductList() {
  const [addedProducts, distpatchCart] = useReducer(cartReducer, []);
  console.log(addedProducts);

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
                <button
                  onClick={() =>
                    distpatchCart({ type: "ADD_ITEM", payload: product })
                  }
                >
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
                    <input
                      type="number"
                      value={addp.quantity}
                      onChange={(e) =>
                        distpatchCart({
                          type: "UPDATE_QUANTITY",
                          payload: {
                            name: addp.name,
                            quantity: parseInt(e.target.value),
                          },
                        })
                      }
                    />
                  </p>

                  <button
                    onClick={() =>
                      distpatchCart({ type: "REMOVE_ITEM", payload: addp.name })
                    }
                  >
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
