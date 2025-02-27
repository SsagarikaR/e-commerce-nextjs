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

    interface categories{
      cateoryID:number,
      categoryName:string,
      categoryThumbnail:string
    }

    interface signinFormState<T>{
      errors?:stringMap;
      successMsg?:string;
      data?:T;
      blurs?:stringToBooleanMap
    }

    interface stringMap{
      [key:string]:string;
    }

    interface stringToBooleanMap{
      [key:string]:boolean;
    }



interface InputProps {
  field: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}






    interface order {
      orderID: number;
      userId: number;
      totalAmount: number;
      status: string;
      address: string;
    }
    
    interface orderItem {
      orderId: number;
      productId: number;
      quantity: number;
      price: number;
      productName: string;
      productThumbnail: string;
      productPrice: number;
      brandName: string;
    }
    
    interface OrderDetail extends order {
      items: orderItem[];
    }


  }
  export {};