"use client";
import { ProductDetailProps } from "@/types";
import FormattedPrice from "@/components/shared/common/FormattedPrice";
import { IoClose } from "react-icons/io5";
import { store } from "@/lib/store";
import toast from "react-hot-toast";
import Link from "next/link";

interface CartProductType extends ProductDetailProps {
  quantity: number;
  variantId: string;
  price: number;
}

const CartProduct = ({ product }: { product: CartProductType }) => {
  const { addToCart, decreaseQuantity, removeFromCart } = store();

  const handleRemoveProduct = () => {
    if (product) {
      removeFromCart(product.id, product.variantId);
      toast.success(`${product.name.substring(0, 20)} deleted successfully!`);
    }
  };

  const handleIncrementQty = () => {
    if (product) {
      addToCart({
        ...product,
        variantId: product.variantId,
        price: product.price,
      });
      toast.success(`${product.name.substring(0, 20)} quantity increased!`);
    }
  };

  const handleDecrementQty = () => {
    if (product) {
      decreaseQuantity(product.id, product.variantId);
      toast.success(`${product.name.substring(0, 20)} quantity decreased!`);
    }
  };

  const selectedVariant = product.variants.find(
    (variant) => variant.id === product.variantId
  );

  return (
    <>
      {product && (
        <div className="flex items-center justify-between border-b border-slate-400 text-slate-400 font-semibold text-sm pb-3">
          <div className="flex justify-between items-center gap-2">
            <Link href={`/product/${product.id}`}>
              <img
                src={product.thumbnailUrl}
                alt="productImage"
                className="rounded-xl w-20 h-20 object-cover object-center border border-skyText/30 hover:border-skyText duration-300"
              />
            </Link>
            <div className="flex flex-col">
              <h2 className="text-base">{product.name.substring(0, 80)}</h2>
              <p className="text-xs">
                Category:{" "}
                <span className="font-medium">{product.categoryId}</span>
              </p>
              {selectedVariant && (
                <p className="text-xs">
                  Size:{" "}
                  <span className="font-medium">{selectedVariant.size}</span>
                </p>
              )}
              {product.stockQuantity > 0 && (
                <p className="text-xs">
                  <span className="text-green-500">✓</span> In Stock (
                  {product.stockQuantity} available)
                </p>
              )}
            </div>
          </div>
          <div className="relative flex items-center max-w-[8rem]">
            <button
              onClick={handleDecrementQty}
              type="button"
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={product.quantity}
              readOnly
            />
            <button
              onClick={handleIncrementQty}
              type="button"
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <h4>
              <FormattedPrice amount={product.price * product.quantity} />
            </h4>
            <button onClick={handleRemoveProduct}>
              <IoClose className="text-red-600 w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartProduct;
