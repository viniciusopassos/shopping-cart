function createProductImageElement(imageSource) {
  const img = document.createElement("img");
  img.className = "item__image";
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  const listenerItemWithClick = event.target;
  document
    .getElementsByClassName("cart__items")[0]
    .removeChild(listenerItemWithClick);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement("li");
  li.className = "cart__item";
  li.innerText = `ID: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener("click", cartItemClickListener);
  return li;
}

const addProductsToCart = async (buttonAddToCart) => {
  const text = buttonAddToCart.target.parentNode.firstElementChild.innerText;
  const { id, title, price } = await fetchItem(text);
  const sku = id;
  const name = title;
  const salePrice = price;
  const listProductsToCart = document.querySelector(".cart__items");
  listProductsToCart.appendChild(
    createCartItemElement({ sku, name, salePrice })
  );
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement("section");
  section.className = "item";

  section.appendChild(createCustomElement("span", "item__sku", sku));
  section.appendChild(createCustomElement("span", "item__title", name));
  section.appendChild(createProductImageElement(image));
  section
    .appendChild(
      createCustomElement("button", "item__add", "Adicionar ao carrinho!")
    )
    .addEventListener("click", addProductsToCart);

  return section;
}

const productList = async (itemId) => {
  const dataProduct = await fetchProducts(itemId);
  const improveImageQuality = (thumbnail) =>
    thumbnail.replace("I.jpg", "W.jpg");
  await dataProduct.results.forEach(({ id, title, thumbnail }) => {
    const sku = id;
    const name = title;
    const image = improveImageQuality(thumbnail);
    document
      .querySelector(".items")
      .appendChild(createProductItemElement({ sku, name, image }));
  });
};

function emptyCart() {
  const getProductsOnCart = document.querySelector(".cart__items");
  const getButtonEmptyCart = document.querySelector(".empty-cart");

  getButtonEmptyCart.addEventListener("click", () => {
    getProductsOnCart.innerHTML = `<div/>`;
  });
}

function messageToUser() {
  const loadingElement = document.createElement("section");
  loadingElement.className = "loading";
  const getElement = document.querySelector(".items");
  getElement.appendChild(loadingElement);
  loadingElement.innerText = "Carregando...";
}

function messageEnd() {
  document.querySelector(".loading").remove();
}

window.onload = async () => {
  messageToUser();
  await productList();
  emptyCart();
  messageEnd();
};
