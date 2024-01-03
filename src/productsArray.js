//price_1OUA05SD9cF8fKGZWCVCEimt coffee
//price_1OUA3WSD9cF8fKGZuxuOZiqX tea
//price_1OUA3pSD9cF8fKGZIGNLcizP boost
const productsArray = [
  {
    id: "price_1OUA05SD9cF8fKGZWCVCEimt",
    title: "Coffee",
    price: 4.99,
  },
  {
    id: "price_1OUA3WSD9cF8fKGZuxuOZiqX",
    title: "Tea",
    price: 7.99,
  },
  {
    id: "price_1OUA3pSD9cF8fKGZIGNLcizP",
    title: "Boost",
    price: 9.99,
  },
];

const getProductData = (id) => {
  let productData = productsArray.find((product) => product.id === id);
  if (productData === undefined) {
    console.log(`Product data does not exist for ID: ${id}`);
  }
  return productData;
};
export { productsArray, getProductData };
