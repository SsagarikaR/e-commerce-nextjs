declare global {
  interface user {
    userID?: number;
    name?: string;
    email?: string;
    contactNo?: string;
    password?: string;
    token?: string;
    role?: string;
    message?: string;
    error?: string;
  }

  interface categories {
    categoryID?: number;
    categoryName: string;
    categoryThumbnail: string;
  }

  interface brands {
    brandID?: number;
    brandName: string;
    brandThumbnail: string;
  }

  interface products extends brands, categories {
    productID: number;
    productName: string;
    productDescription: string;
    productThumbnail: string;
    productPrice: number;
    stock: number;
    rating: number;
    totalCount: number;
  }

  interface cartItem extends products {
    cartItemID: number;
    productID: number;
    userID: number;
    handlingPrice: number;
    platformFee: number;
    deliveryCharge: number;
    quantity: number;
    totalPrice: number;
    totalAmount: number;
  }

  interface OrderItem {
    orderItemID: number;
    orderId: number;
    productId: number;
    productName: string;
    productThumbnail: string;
    price: number;
    productPrice: number;
    quantity: number;
    brandName: string;
  }

  interface sessionUser {
    email: string;
    image: string;
    name: string;
  }
  interface OrderData extends user {
    totalAmount: number;
    items: OrderItem[];
    address: string;
    totalPrice: number;
    status: string;
    orderID: number;
    handlingPrice: number;
    platformFee: number;
    deliveryCharge: number;
  }

  interface CartStore {
    cartItems: cartItem[];
    addItemToCart: (productID: number, quantity: number) => void;
    removeItemFromCart: (cartItemID: number) => void;
    updateCartItemQuantity: (cartItemID: number, quantity: number) => void;
    fetchCartItems: () => void; // Function to fetch cart items from the backend
  }

  interface prefernce {
    brandName: string;
    brandThumbnail: string;
    preferenceID: number;
    productDescription: string;
    productThumbnail: string;
    productID: number;
    productName: string;
    productPrice: number;
    userID: string;
  }

  interface wishlist extends products, brands, user {
    wishListID: number;
    productID: number;
    userID: number;
  }

  interface signinFormState<T> {
    errors?: stringMap;
    successMsg?: string;
    data?: T;
    blurs?: stringToBooleanMap;
  }

  interface stringMap {
    [key: string]: string;
  }

  interface stringToBooleanMap {
    [key: string]: boolean;
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

  interface paginationProps {
    category?: string;
    currentPage: number;
    totalPages: number;
  }

  interface review {
    contactNo: string;
    description: string;
    email: string;
    name: string;
    productID: number;
    rating: number;
    reviewID: number;
    userID: number;
  }

  interface cloudinaryInfo {
    secure_url: string;
  }

  interface cloudinaryImageUploadProps {
    seturl: (url: string) => void;
  }

  interface FormSubmitResult {
    success?: string;
    errors?: Record<string, string[] | string | undefined>;
  }
}
export {};
