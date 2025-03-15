import { Transaction } from "sequelize";
import * as mongoQuery from "../mongoQuery/review";
import * as mysqlQuery from "../mysqlQuery/review";

export class Review {
  private static instance: Review;
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

  static getInstance(database: string): Review {
    if (!Review.instance) {
      Review.instance = new Review(database);
    }
    return Review.instance;
  }

  async selectReviewByProductAndUser(
    userID: string | number,
    productID: string | number
  ) {
    return this.repo.selectReviewByProductAndUser(userID, productID);
  }

  async addNewReview(
    userID: string | number,
    productID: string | number,
    rating: number,
    description: string,
    transaction?: Transaction
  ) {
    return this.repo.addNewReview(
      userID,
      productID,
      rating,
      description,
      transaction!
    );
  }

  async calculateAverageRating(
    productID: string | number,
    transaction?: Transaction
  ) {
    return this.repo.calculateAverageRating(productID, transaction);
  }

  async updateProductRating(
    productID: string | number,
    avgRating: number,
    transaction?: Transaction
  ) {
    return this.repo.updateProductRating(productID, avgRating, transaction!);
  }

  async selectByReviewID(reviewID: string | number) {
    return this.repo.selectByReviewID(reviewID);
  }

  async selectReviewOfProduct(productID: string | number) {
    return this.repo.selectReviewOfProduct(productID);
  }

  async deleteReview(userID: string | number, reviewID: string | number) {
    return this.repo.deleteReview(userID, reviewID);
  }

  async updateReview(
    userID: string | number,
    reviewID: string | number,
    rating: number,
    description: string
  ) {
    return this.repo.updateReview(userID, reviewID, rating, description);
  }
}
