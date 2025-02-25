declare global {
    interface user {
      userID: number;
      name: string;
      email: string;
      contactNo: string;
      password?: string;
      token?: string;
      role?:string;
    }

  }
  export {};