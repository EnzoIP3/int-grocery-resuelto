import { beforeEach, describe, expect, test } from "vitest";
import Categories, { Product, type Category } from "../product";

describe("Product class", () => {
  let aProduct: Product;

  beforeEach(() => {
    aProduct = new Product("Manzana", 140, Categories.Fruits);
  });

  test("stores product data", () => {
    expect(aProduct.getName()).toBe("Manzana");
    expect(aProduct.getPrice()).toBe(140);
    expect(aProduct.getCategory()).toBe(Categories.Fruits);
  });

  test("rejects invalid name", () => {
    expect(() => new Product("", 140, Categories.Fruits)).toThrow();
  });

  test("rejects invalid price", () => {
    expect(() => new Product("Manzana", 0, Categories.Fruits)).toThrow();
  });

  test("rejects an invalid category", () => {
    expect(() => aProduct.setCategory("Otra" as Category)).toThrow();
  });
});

describe("Product discount", () => {
  let aProduct: Product;

  beforeEach(() => {
    aProduct = new Product("Manzana", 140, Categories.Fruits);
  });

  test("has no discount by default", () => {
    expect(aProduct.getDiscount()).toBe(0);
  });

  test("stores a discount from the constructor", () => {
    const discounted = new Product("Pera", 100, Categories.Fruits, 20);
    expect(discounted.getDiscount()).toBe(20);
  });

  test("sets a valid discount", () => {
    aProduct.setDiscount(50);
    expect(aProduct.getDiscount()).toBe(50);
  });

  test("accepts the discount limits", () => {
    aProduct.setDiscount(0);
    expect(aProduct.getDiscount()).toBe(0);
    aProduct.setDiscount(100);
    expect(aProduct.getDiscount()).toBe(100);
  });

  test("rejects a negative discount", () => {
    expect(() => aProduct.setDiscount(-1)).toThrow(
      "El descuento debe ser un número entero entre 0 y 100",
    );
  });

  test("rejects a discount greater than 100", () => {
    expect(() => aProduct.setDiscount(101)).toThrow(
      "El descuento debe ser un número entero entre 0 y 100",
    );
  });

  test("rejects a non integer discount", () => {
    expect(() => aProduct.setDiscount(10.5)).toThrow(
      "El descuento debe ser un número entero entre 0 y 100",
    );
  });

  test("rejects an invalid discount in the constructor", () => {
    expect(() => new Product("Pera", 100, Categories.Fruits, 200)).toThrow();
  });

  test("toString shows only the name without discount", () => {
    expect(aProduct.toString()).toBe("Manzana");
  });

  test("toString shows the discount when greater than zero", () => {
    aProduct.setDiscount(15);
    expect(aProduct.toString()).toBe("Manzana (15% de descuento)");
  });
});
