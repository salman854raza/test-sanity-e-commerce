import products from './products.json';

export const getProducts = () => {
  return products;
};

export const getProductById = (id: string) => {
  return products.find((product) => product._id === id);
};
