enum Categories {
  Fruits = "Frutas",
  Vegetables = "Verduras",
}

export default Categories;
export type Category = Categories;

export class Product {
  #name!: string;
  #price!: number;
  #category!: Category;
  #discount!: number;
  constructor(
    name: string,
    price: number,
    category: Category,
    discount: number = 0,
  ) {
    this.setName(name);
    this.setPrice(price);
    this.setCategory(category);
    this.setDiscount(discount);
  }

  getName(): string {
    return this.#name;
  }

  getPrice(): number {
    return this.#price;
  }

  getCategory(): Category {
    return this.#category;
  }

  getDiscount(): number {
    return this.#discount;
  }

  toString(): string {
    if (this.#discount > 0) {
      return `${this.#name} (${this.#discount}% de descuento)`;
    }
    return `${this.#name}`;
  }

  setName(name: string): void {
    if (typeof name !== "string" || name.trim().length === 0) {
      throw new Error("El producto debe tener nombre");
    }
    this.#name = name.trim();
  }

  setPrice(price: number): void {
    if (!Number.isFinite(price) || price < 1) {
      throw new Error("El precio del producto debe ser mayor a cero");
    }
    this.#price = Math.trunc(price);
  }

  setCategory(category: Category): void {
    if (!Object.values(Categories).includes(category)) {
      throw new Error("La categoría del producto no es válida");
    }
    this.#category = category;
  }

  setDiscount(discount: number): void {
    if (!Number.isInteger(discount) || discount < 0 || discount > 100) {
      throw new Error("El descuento debe ser un número entero entre 0 y 100");
    }
    this.#discount = discount;
  }
}
