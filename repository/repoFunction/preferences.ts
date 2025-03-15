import * as mongoQuery from "../mongoQuery/preferences";
import * as mysqlQuery from "../mysqlQuery/preferences";

export class Preference {
  private static instance: Preference;
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

  static getInstance(database: string): Preference {
    if (!Preference.instance) {
      Preference.instance = new Preference(database);
    }
    return Preference.instance;
  }

  async selectPreferenceByProductANDUser(
    productID: string | number,
    userID: string | number
  ) {
    return this.repo.selectPreferenceByProductANDUser(productID, userID);
  }

  async insertPreference(productID: string | number, userID: string | number) {
    return this.repo.insertPreference(productID, userID);
  }

  async deletePreference(preferenceID: string | number) {
    return this.repo.deletePreference(preferenceID);
  }

  async updatePreference(
    productID: string | number,
    userID: string | number,
    preferenceID: string | number
  ) {
    return this.repo.updatePreference(productID, userID, preferenceID);
  }

  async fetchPreference(userID: string | number) {
    return this.repo.fetchPreference(userID);
  }
}
