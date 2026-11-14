import { beforeEach, describe, expect, test } from "vitest";
import { Grocery } from "../grocery";
import Categories from "../product";

describe("Grocery class", () => {
  let aGrocery: Grocery;

  beforeEach(() => {
    aGrocery = new Grocery("Verdulería");
  });

  test("stores a valid name", () => {
    expect(aGrocery.getName()).toBe("Verdulería");
  });

  test("rejects an empty name", () => {
    expect(() => new Grocery(" ")).toThrow();
  });

  test("adds products", () => {
    aGrocery.addProduct("Manzana", 140, Categories.Fruits);
    aGrocery.addProduct("Zanahoria", 80, Categories.Vegetables);

    expect(aGrocery.totalProducts()).toBe(2);
  });

  test("returns the added products", () => {
    aGrocery.addProduct("Manzana", 140, Categories.Fruits, 10);

    const products = aGrocery.getProducts();
    expect(products).toHaveLength(1);
    expect(products[0].getName()).toBe("Manzana");
    expect(products[0].getDiscount()).toBe(10);
  });

  test("returns zero discounted products when empty", () => {
    expect(aGrocery.totalDiscountedProducts()).toBe(0);
  });

  test("counts only discounted products", () => {
    aGrocery.addProduct("Manzana", 140, Categories.Fruits, 10);
    aGrocery.addProduct("Zanahoria", 80, Categories.Vegetables);
    aGrocery.addProduct("Lechuga", 60, Categories.Vegetables, 25);

    expect(aGrocery.totalDiscountedProducts()).toBe(2);
  });

  test("rejects a product with an invalid discount", () => {
    expect(() =>
      aGrocery.addProduct("Manzana", 140, Categories.Fruits, 150),
    ).toThrow();
    expect(aGrocery.totalProducts()).toBe(0);
  });
});
