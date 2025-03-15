import * as mongoQuery from "../mongoQuery/categories";
import * as mysqlQuery from "../mysqlQuery/categories";

export class Category {
  private static instance: Category;
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

  static getInstance(database: string): Category {
    if (!Category.instance) {
      Category.instance = new Category(database);
    }
    return Category.instance;
  }

  async selectCategoryByName(categoryName: string) {
    return this.repo.selectCategoryByName(categoryName);
  }

  async selectAllCategories() {
    return this.repo.selectAllCategories();
  }

  async updateCategory(
    categoryName: string,
    categoryThumbnail: string,
    categoryID: string | number
  ) {
    return this.repo.updateCategory(
      categoryName,
      categoryThumbnail,
      categoryID
    );
  }

  async createNewCategory(categoryName: string, categoryThumbnail: string) {
    return this.repo.createNewCategory(categoryName, categoryThumbnail);
  }

  async selectCategoryByID(categoryID: string | number) {
    return this.repo.selectCategoryByID(categoryID);
  }

  async deleteCategory(categoryID: string | number) {
    return this.repo.deleteCategory(categoryID);
  }
}
