"use client";
import { MdClose } from "react-icons/md";
import { ProductDetailProps } from "@/types";
import { store } from "@/lib/store";
import toast from "react-hot-toast";
import AddToCartBtn from "@/components/shared/common/AddToCartBtn";
import FormattedPrice from "@/components/shared/common/FormattedPrice";
import { useRouter } from "next/navigation";

interface FavoriteProductType extends ProductDetailProps {
  quantity: number;
  variantId: string;
  price: number;
}

const FavoriteProduct = ({ product }: { product: FavoriteProductType }) => {
  const { removeFromFavorite } = store();
  const navigate = useRouter();

  const selectedVariant = product.variants.find(
    (variant) => variant.id === product.variantId
  );

  return (
    <div className="flex py-6">
      <div className="min-w-0 flex-1 lg:flex lg:flex-col">
        <div className="lg:flex-1">
          <div className="sm:flex">
            <div>
              <h4 className="font-medium text-gray-900">{product.name}</h4>
              <p className="mt-2 hidden text-sm text-gray-500 sm:block">
                {product.description.substring(0, 100)}...
              </p>
              <p className="text-sm mt-1">
                Category:{" "}
                <span className="font-medium">{product.categoryId}</span>
              </p>
              {selectedVariant && (
                <p className="text-sm mt-1">
                  Size:{" "}
                  <span className="font-medium">{selectedVariant.size}</span>
                </p>
              )}
            </div>
            <span
              onClick={() => {
                removeFromFavorite(product.id, product.variantId);
                toast.success("Removed from favorite successfully!");
              }}
              className="text-lg text-gray-600 hover:text-red-600 duration-200 cursor-pointer inline-block mt-4 sm:mt-0"
            >
              <MdClose />
            </span>
          </div>
          <div className="flex text-sm items-center gap-6 font-medium py-4">
            <AddToCartBtn
              product={{ ...product, selectedVariant: selectedVariant??null }}
              className="w-32 bg-black"
            />
            {selectedVariant && (
              <p className="text-base font-semibold">
                <FormattedPrice amount={selectedVariant.price} />
              </p>
            )}
          </div>
        </div>
        <p>
          Stock:{" "}
          <span className="font-medium">{product.stockQuantity} available</span>
        </p>
      </div>
      <div
        onClick={() => navigate.push(`/product/${product.id}`)}
        className="ml-4 flex-shrink-0 h-20 w-20 sm:w-40 sm:h-40 sm:order-first sm:m-0 sm:mr-6 border border-gray-200 rounded-md hover:border-skyText duration-200 cursor-pointer group overflow-hidden"
      >
        <img
          src={
            product.thumbnailUrl || product.imageUrls[0] || "/placeholder.jpg"
          }
          alt="productImage"
          className="h-full w-full rounded-lg object-cover object-center group-hover:scale-110 duration-200"
        />
      </div>
    </div>
  );
};

export default FavoriteProduct;
