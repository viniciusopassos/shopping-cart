const fetchProducts = (product) => {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  return fetch(endpoint)
    .then((data) => data.json())
    .then((response) => response)
    .catch((error) => error);
};

if (typeof module !== "undefined") {
  module.exports = {
    fetchProducts,
  };
}
