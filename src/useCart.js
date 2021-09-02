import { useEffect, useState } from 'react';
const productsJson = [
  { name: 'coke', price: 123 },
  { name: 'chocolate', price: 18 },
  { name: 'beer', price: 140 },
  { name: 'meat', price: 200 },
];
const useCart = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setProducts(productsJson);
    }, 3000);
  }, []);
  return {
    loading,
    products,
  };
};
export default useCart;
