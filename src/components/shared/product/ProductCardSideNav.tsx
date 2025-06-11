import { FaRegEye, FaRegStar, FaStar } from "react-icons/fa";
import { LuArrowLeftRight } from "react-icons/lu";
import { ProductDetailProps } from "@/types";
import { store } from "@/lib/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductCardSideNav = ({ product }: { product?: ProductDetailProps }) => {
  const { addToFavorite, favoriteProduct } = store();
  const [existingProduct, setExistingProduct] = useState<{
    product: ProductDetailProps;
    variantId: string;
    quantity: number;
    price: number;
  } | null>(null);

  useEffect(() => {
    const availableItem = favoriteProduct.find(
      (item) =>
        item?.id === product?.id && item?.variantId === product?.variants[0]?.id
    );
    // setExistingProduct(availableItem || null);
  }, [product, favoriteProduct]);

  const handleFavorite = () => {
    if (product && product.variants[0]) {
      addToFavorite({
        ...product,
        variantId: product.variants[0].id,
        price: product.variants[0].price,
      }).then(() => {
        toast.success(
          existingProduct
            ? `${product?.name.substring(0, 10)} removed successfully!`
            : `${product?.name.substring(0, 10)} added successfully!`
        );
      });
    } else {
      toast.error("No variant available for this product!");
    }
  };

  return (
    <div className="absolute right-1 top-1 flex flex-col gap-1 transition translate-x-12 group-hover:translate-x-0 duration-300">
      <span
        onClick={handleFavorite}
        className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200"
      >
        {existingProduct ? <FaStar /> : <FaRegStar />}
      </span>
      <span className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
        <LuArrowLeftRight />
      </span>
      <span className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
        <FaRegEye />
      </span>
    </div>
  );
};

export default ProductCardSideNav;
