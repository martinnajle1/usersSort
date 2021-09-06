import React, { useReducer } from 'react';
import useProducts from './useCart';
import { ItemType } from './cartTypes';
import cartReducer from './cartReducer';
import CartLogo from './CartLogo';
import './App.css';

function App() {
  const { loading, products }: { loading: boolean; products: ItemType[] } =
    useProducts();
  const initialState: ItemType[] = [];
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  if (loading) {
    return <div>Loading...</div>;
  }
  const addProduct = (item: ItemType) => {
    if (!containsItem(item)) {
      dispatch({ type: 'ADD', payload: { item } });
    }
  };

  interface ItemProps {
    item: ItemType;
    onClick: Function;
  }
  const Item: React.FC<ItemProps> = React.memo(({ item }) => {
    const { name } = item;
    return (
      <div key={name} onClick={() => addProduct(item)}>
        {item.name} <span>Price: {item.price}</span>
      </div>
    );
  });
  const removeProduct = (item: ItemType) => {
    dispatch({ type: 'REMOVE', payload: { item } });
  };
  const containsItem = (item: ItemType) =>
    cart && cart.find((it: ItemType) => it.name === item.name);
  const curry = (f: Function) => {
    return (a: any) => {
      return (b: any) => {
        return f(a, b);
      };
    };
  };
  // const value = 'ee';
  const filter = (prod: ItemType[], value: string) => {
    return prod.filter((item: ItemType) => {
      return item.name.includes(value);
    });
  };
  // const filteredElements = curry(filter);

  return (
    <div className="App">
      <CartLogo />
      <div className="products">
        <h3>Products</h3>
        {products.map((item: ItemType) => {
          return <Item item={item} onClick={() => addProduct(item)} />;
        })}
      </div>

      <h2>Cart</h2>
      {cart &&
        cart.map((item: ItemType, index: number) => {
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
        <strong>
          {cart.reduce((acc: number, item: ItemType) => acc + item.price, 0)}
        </strong>
      </div>
    </div>
  );
}

export default App;
