import {ItemType, PayloadType } from './cartTypes';

const cartReducer = (
    state: ItemType[],
    action: { type: string; payload: PayloadType }
  ): ItemType[] => {
    const { type, payload } = action;
    switch (type) {
      case 'ADD':
        if (payload.item) {
          return [...state, payload.item];
        }
        return state;
      case 'REMOVE':
        return state.filter((elem) => elem.name !== payload?.item?.name);
      case 'UP':
        const { index } = payload;
        if (index && (index > 0)) {
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
  export default cartReducer;