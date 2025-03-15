import * as mongoQuery from "../mongoQuery/product";
import * as mysqlQuery from "../mysqlQuery/product";

export class Product {
  private static instance: Product;
  private repo: typeof mongoQuery | typeof mysqlQuery;

  private constructor(database: string) {
    if (database === "mongodb") {
      this.repo = mongoQuery;
    } else if (database === "mysql") {
      this.repo = mysqlQuery;
    } else {
      throw new Error("Please enter a valid database.");
    }
  }

  static getInstance(database: string): Product {
    if (!Product.instance) {
      Product.instance = new Product(database);
    }
    return Product.instance;
  }

  async selectProductWithAllMatch(
    productName: string,
    productDescription: string,
    productPrice: number,
    categoryID: string | number,
    brandID: string | number
  ) {
    return this.repo.selectProductWithAllMatch(
      productName,
      productDescription,
      productPrice,
      categoryID,
      brandID
    );
  }

  async updateProduct(
    productName: string,
    productDescription: string,
    productThumbnail: string,
    productPrice: number,
    categoryID: string | number,
    productID: string | number
  ) {
    return this.repo.updateProduct(
      productName,
      productDescription,
      productThumbnail,
      productPrice,
      categoryID,
      productID
    );
  }

  async deleteByProductID(productID: string | number) {
    return this.repo.deleteByProductID(productID);
  }

  async selectByProductID(productID: string | number) {
    return this.repo.selectByProductID(productID);
  }

  async createNewProduct(
    productName: string,
    productDescription: string,
    productThumbnail: string,
    productPrice: number,
    categoryID: string | number,
    brandID: string | number,
    stock: number,
    productImages: string[]
  ) {
    return this.repo.createNewProduct(
      productName,
      productDescription,
      productThumbnail,
      productPrice,
      categoryID,
      brandID,
      stock,
      productImages
    );
  }

  async getProductWithCondition(
    filter: {
      categoryID?: string | number;
      name?: string;
      id?: string | number;
      price?: "low-to-high" | "high-to-low";
    },
    page: number,
    limit: number
  ) {
    return this.repo.getProductWithCondition(filter, page, limit);
  }
}
