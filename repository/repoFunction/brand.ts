import * as mongoQuery from "../mongoQuery/brand";
import * as mysqlQuery from "../mysqlQuery/brand";

export class Brand {
  private static instance: Brand;
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

  static getInstance(database: string): Brand {
    if (!Brand.instance) {
      Brand.instance = new Brand(database);
    }
    return Brand.instance;
  }

  async findBrandByName(brandName: string) {
    return this.repo.findBrandByName(brandName);
  }

  async selectBrandByID(brandID: string | number) {
    return this.repo.selectBrandByID(brandID);
  }

  async findAllBrands() {
    return this.repo.findAllBrand();
  }

  async createNewBrand(brandName: string, brandThumbnail: string) {
    return this.repo.createNewBrand(brandName, brandThumbnail);
  }

  async updateTheBrand(
    brandID: string | number,
    brandName: string,
    brandThumbnail: string
  ) {
    return this.repo.updateTheBrand(brandID, brandName, brandThumbnail);
  }

  async deleteBrandByID(brandID: string | number) {
    return this.repo.deleteBrandByID(brandID);
  }
}
