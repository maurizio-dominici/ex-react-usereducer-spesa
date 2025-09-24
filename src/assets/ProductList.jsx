import products from "../js/products";

export default function ProductList() {
  console.log(products);

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
                {product.price}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
