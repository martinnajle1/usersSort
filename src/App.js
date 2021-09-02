import React, { useReducer } from 'react';
import './App.css';
import useProducts from './useCart';

const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD':
      return [...state, payload.item];
    case 'REMOVE':
      return state.filter((elem) => elem.name !== payload.item.name);
    case 'UP':
      const { index } = payload;
      if (index > 0) {
        const cloned = [...state];
        const tmp = cloned[index - 1];
        cloned[index - 1] = cloned[index];
        cloned[index] = tmp;
        return cloned;
      }
      return state;
    default:
      return state;
  }
};

function App() {
  const { loading, products } = useProducts();
  const [cart, dispatch] = useReducer(cartReducer, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  const addProduct = (item) => {
    if (!containsItem(item)) {
      dispatch({ type: 'ADD', payload: { item } });
    }
  };

  const Item = React.memo(({ item }) => {
    const { name } = item;
    return (
      <div key={name} onClick={() => addProduct(item)}>
        {item.name} <span>Price: {item.price}</span>
      </div>
    );
  });
  const removeProduct = (item) => {
    dispatch({ type: 'REMOVE', payload: { item } });
  };
  const containsItem = (item) =>
    cart && cart.find((it) => it.name === item.name);
  const curry = (f) => {
    return (a) => {
      return (b) => {
        return f(a, b);
      };
    };
  };
  const value = 'ee';
  const filter = (prod, value) => {
    return prod.filter((item) => {
      return item.name.includes(value);
    });
  };
  const filteredElements = curry(filter);
  console.log(filteredElements(products)(value));

  return (
    <div className="App">
      <h3>Products</h3>
      {products.map((item) => {
        return <Item item={item} onClick={() => addProduct(item)} />;
      })}
      <h2>Cart</h2>
      {cart &&
        cart.map((item, index) => {
          const { name } = item;
          return (
            <>
              <div
                key={name}
                onClick={() => dispatch({ type: 'UP', payload: { index } })}
              >
                {item.name}
              </div>
              <span onClick={() => removeProduct(item)}>X</span>
            </>
          );
        })}
      <div>
        Total Cart!:
        <strong>{cart.reduce((acc, item) => acc + item.price, 0)}</strong>
      </div>
    </div>
  );
}

export default App;
