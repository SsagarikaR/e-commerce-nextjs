declare global {
  interface user {
    _id: string;
    name?: string;
    email?: string;
    contactNo?: string;
    password?: string;
    token?: string;
    role?: string;
    message?: string;
    error?: string;
  }

  interface address {
    addressID: number;
    state: string;
    city: string;
    pincode: string;
    locality: string;
    address: string;
  }

  interface AddressFields {
    state: string;
    city: string;
    pincode: string;
    locality: string;
    address: string;
  }

  interface InputFieldConfig {
    id: keyof AddressFields;
    type: string;
    placeholder: string;
    rows?: number;
  }

  interface categories {
    _id?: string;
    categoryName: string;
    categoryThumbnail: string;
  }

  interface brands {
    _id?: number;
    brandName: string;
    brandThumbnail: string;
  }

  interface product {
    _id: string;
    productName: string;
    productDescription: string;
    productThumbnail: string;
    productPrice: number;
    stock: number;
    rating: number;
    productImage1: string;
    productImage2: string;
    productImage3: string;
    productImage4: string;
    brandId: brands;
    categoryId: categories;
  }

  interface products {
    products: product[];
    totalCount: number;
  }

  interface cartItem {
    _id: string;
    productId: string;
    userId: string;
    brandDetails: brands;
    productDetails: product;
    categoryDetails: categories;
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
    addressID: number;
    totalPrice: number;
    status: string;
    orderID: number;
    handlingPrice: number;
    platformFee: number;
    deliveryCharge: number;
    address: address;
  }

  interface CartStore {
    cartItems: cartItem[];
    addItemToCart: (productId: string, quantity: number) => void;
    removeItemFromCart: (cartItemId: string) => void;
    updateCartItemQuantity: (cartItemId: string, quantity: number) => void;
    fetchCartItems: () => void; // Function to fetch cart items from the backend
  }

  interface prefernce {
    brandName: string;
    brandThumbnail: string;
    _id: string;
    productDescription: string;
    productThumbnail: string;
    productId: string;
    productName: string;
    productPrice: number;
    userId: string;
  }

  interface wishlist {
    _id: string;
    productId: product;
    userId: user;
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
    error?: string;
  }

  interface order extends address {
    orderID: number;
    userId: number;
    totalAmount: number;
    status: string;
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
    description: string;
    productId: string;
    rating: number;
    _id: string;
    userId: user;
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

  interface SessionProviderWrapperProps {
    children: React.ReactNode;
  }
}
export {};
