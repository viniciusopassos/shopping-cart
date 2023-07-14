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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement("section");
  section.className = "item";

  section.appendChild(createCustomElement("span", "item__sku", sku));
  section.appendChild(createCustomElement("span", "item__title", name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement("button", "item__add", "Adicionar ao carrinho!")
  );

  return section;
}

const productList = async (itemId) => {
  const dataProduct = await fetchProducts(itemId);
  await dataProduct.results.forEach(({ id, title, thumbnail }) => {
    const sku = id;
    const name = title;
    const image = thumbnail;
    document
      .querySelector(".items")
      .appendChild(createProductItemElement({ sku, name, image }));
  });
};

window.onload = () => {
  productList();
};
