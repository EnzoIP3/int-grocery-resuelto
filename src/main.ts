import { Grocery } from "./domain/grocery";
import Categories, { type Category, type Product } from "./domain/product";

const grocery = new Grocery("Almacén de Frutas y Verduras");
const byId = <T extends HTMLElement>(id: string): T => {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`No se encontró el elemento #${id}`);
  }
  return element as T;
};

const nameInput = byId<HTMLInputElement>("inp-name");
const priceInput = byId<HTMLInputElement>("inp-price");
const discountInput = byId<HTMLInputElement>("inp-discount");
const categoryInput = byId<HTMLSelectElement>("sel-category");
const errorContainer = byId<HTMLDivElement>("add-error-container");
const errorMessage = byId<HTMLParagraphElement>("add-error-msg");

byId<HTMLHeadingElement>("grocery-name").textContent = grocery.getName();

function updateTotals(): void {
  byId<HTMLInputElement>("inp-total-products").value = grocery
    .totalProducts()
    .toString();
  byId<HTMLInputElement>("inp-total-discounted-products").value = grocery
    .totalDiscountedProducts()
    .toString();
}

function createProductCard(product: Product): HTMLDivElement {
  const column = document.createElement("div");
  column.className = "col";

  const card = document.createElement("div");
  card.className = "card h-100 shadow border border-secondary";

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = product.getName();

  const price = document.createElement("p");
  price.className = "card-text mb-1";
  price.textContent = `Precio: $${product.getPrice()}`;

  const discount = document.createElement("p");
  discount.className = "card-text";
  discount.textContent = `Descuento: ${product.getDiscount()}%`;

  body.append(title, price, discount);
  card.appendChild(body);
  column.appendChild(card);
  return column;
}

function updateCatalog(): void {
  const fruitsList = byId<HTMLDivElement>("fruits-list");
  const vegetablesList = byId<HTMLDivElement>("vegetables-list");
  fruitsList.replaceChildren();
  vegetablesList.replaceChildren();

  grocery.getProducts().forEach((product) => {
    const target =
      product.getCategory() === Categories.Fruits ? fruitsList : vegetablesList;
    target.appendChild(createProductCard(product));
  });

  byId("empty-fruits-list").classList.toggle(
    "d-none",
    grocery
      .getProducts()
      .some((product) => product.getCategory() === Categories.Fruits),
  );
  byId("empty-vegetables-list").classList.toggle(
    "d-none",
    grocery
      .getProducts()
      .some((product) => product.getCategory() === Categories.Vegetables),
  );
}

function clearInputs(): void {
  nameInput.value = "";
  priceInput.value = "";
  discountInput.value = "0";
}

byId<HTMLButtonElement>("btn-add").addEventListener("click", () => {
  try {
    grocery.addProduct(
      nameInput.value,
      Number(priceInput.value),
      categoryInput.value as Category,
      Number(discountInput.value),
    );
    errorContainer.classList.add("d-none");
    clearInputs();
    updateCatalog();
    updateTotals();
  } catch (error) {
    errorContainer.classList.remove("d-none");
    errorMessage.textContent =
      error instanceof Error ? error.message : "No se pudo agregar el producto";
  }
});

updateCatalog();
updateTotals();
