import { useEffect, useState } from 'react';
import { getProducts } from '../../API/products';

export const ProductsPage = () => {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.products);
    });
  }, []);

  return (
    <div>
      {products.map((product: any) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.brand}</p>
          <p>{product.price} сом</p>
        </div>
      ))}
    </div>
  );
};