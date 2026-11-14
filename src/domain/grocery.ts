import { Product, type Category } from "./product";

export class Grocery {
  #name!: string;
  #products: Product[] = [];

  constructor(name: string) {
    this.setName(name);
  }

  getName(): string {
    return this.#name;
  }

  setName(name: string): void {
    if (typeof name !== "string" || name.trim().length === 0) {
      throw new Error("El almacén debe tener nombre");
    }
    this.#name = name.trim();
  }

  addProduct(
    name: string,
    price: number,
    category: Category,
    discount: number = 0,
  ): void {
    this.#products.push(new Product(name, price, category, discount));
  }

  getProducts(): Product[] {
    return this.#products;
  }

  totalProducts(): number {
    return this.#products.length;
  }

  totalDiscountedProducts(): number {
    return this.#products.filter((product) => product.getDiscount() > 0).length;
  }
}
