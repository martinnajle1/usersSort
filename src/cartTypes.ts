export type ItemType = {
  name: string;
  price: number;
};

export type PayloadType = {
  item?: ItemType;
  index?: number;
};
