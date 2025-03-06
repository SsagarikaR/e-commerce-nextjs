"use client";
import { product } from "@/constants";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

function AddToCartBtn({ productID }: { productID: number }) {
  const router = useRouter();
  const { addItemToCart } = useCartStore();
  return (
    <button
      className="bg-blue-300  hover:bg-blue-400 w-full p-2 rounded-lg cursor-pointer text-center"
      onClick={() => {
        addItemToCart(productID, 1);
        router.push("/cart");
      }}
    >
      {product.ADD_TO_CART}
    </button>
  );
}

export default AddToCartBtn;
