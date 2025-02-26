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


    interface InputProps {
      field: string;
      id: string;
      type: string;
      // value: string;
      // setValue: (value: string) => void;
      // error: string;
      // setError: (value: string) => void;
    }
  }
  export {};