"use client";
import { twMerge } from "tailwind-merge";
import { ProductDetailProps, Variant } from "@/types";
import { store } from "@/lib/store";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import FormattedPrice from "./FormattedPrice";

interface AddToCartBtnProps {
  className?: string;
  title?: string;
  product?: ProductDetailProps & { selectedVariant: Variant | null };
  showPrice?: boolean;
}

const AddToCartBtn = ({
  className,
  title,
  product,
  showPrice = true,
}: AddToCartBtnProps) => {
  const [existingProduct, setExistingProduct] = useState<{
    product: ProductDetailProps;
    variantId: string;
    quantity: number;
  } | null>(null);
  const { addToCart, cartProduct, decreaseQuantity } = store();

  useEffect(() => {
    const availableItem = cartProduct.find(
      (item) =>
        item?.id === product?.id &&
        item?.variantId === product?.selectedVariant?.id
    );
    // setExistingProduct(availableItem || null);
  }, [product, cartProduct]);

  const handleAddToCart = () => {
    if (product && product.selectedVariant) {
      addToCart({
        ...product,
        variantId: product.selectedVariant.id,
        price: product.selectedVariant.price,
        shopId:product.shop.id
      });
      toast.success(`${product?.name.substring(0, 10)} added successfully!`);
    } else {
      toast.error("Please select a variant!");
    }
  };

  const handleDeleteProduct = () => {
    if (existingProduct) {
      if (existingProduct?.quantity > 1) {
        decreaseQuantity(
          existingProduct?.product.id,
          existingProduct?.variantId
        );
        toast.success(
          `${product?.name.substring(0, 10)} decreased successfully`
        );
      } else {
        toast.error("You cannot decrease less than 1");
      }
    }
  };

  const newClassName = twMerge(
    "bg-[#f7f7f7] dark:bg-slate-800 uppercase text-xs py-3 text-center rounded-full font-semibold hover:bg-black hover:text-white hover:scale-105 duration-200 cursor-pointer",
    className
  );

  const getPrice = () => {
    if (existingProduct && product?.selectedVariant) {
      return product.selectedVariant.price * existingProduct.quantity;
    }
    return product?.selectedVariant?.price || 0;
  };

  return (
    <>
      {showPrice && product?.selectedVariant && (
        <div>
          <FormattedPrice amount={getPrice()} />
        </div>
      )}
      {existingProduct ? (
        <div className="flex self-center items-center justify-center gap-2">
          <button
            onClick={handleDeleteProduct}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaMinus />
          </button>
          <p className="text-base font-semibold w-10 text-center">
            {existingProduct?.quantity}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button onClick={handleAddToCart} className={newClassName}>
          {title ? title : "Add to cart"}
        </button>
      )}
    </>
  );
};

export default AddToCartBtn;
