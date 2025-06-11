import { ProductDetailProps } from "@/types";
import FormattedPrice from "@/components/shared/common/FormattedPrice";
import AddToCartBtn from "@/components/shared/common/AddToCartBtn";
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
  const { removeFromCart } = store();

  const handleRemoveProduct = () => {
    if (product) {
      removeFromCart(product.id, product.variantId);
      toast.success(`${product.name.substring(0, 20)} deleted successfully!`);
    }
  };

  const selectedVariant = product.variants.find(
    (variant) => variant.id === product.variantId
  );

  return (
    <>
      {product && (
        <div className="flex py-6 sm:py-10">
          <Link href={`/product/${product.id}`}>
            <img
              src={product.thumbnailUrl}
              alt="productImage"
              className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48 border border-skyText/30 hover:border-skyText duration-300"
            />
          </Link>
          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="relative pr-9 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:pr-0">
              <div className="flex flex-col gap-1 col-span-3">
                <h3 className="text-base font-semibold w-full">
                  {product.name.substring(0, 80)}
                </h3>
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
                <div className="flex items-center gap-6 mt-2">
                  <p className="text-base font-semibold">
                    <FormattedPrice amount={product.price * product.quantity} />
                  </p>
                  <AddToCartBtn
                    product={{ ...product, selectedVariant: product.variants[0] }}
                    
                    showPrice={false}
                  />
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:pr-9">
                <div className="absolute right-0 top-0">
                  <button
                    onClick={handleRemoveProduct}
                    className="-m-2 inline-flex p-2 text-gray-600 hover:text-red-600"
                  >
                    <IoClose className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              {product.stockQuantity > 0 && (
                <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                  <span className="text-lg text-green-500">✓</span>
                  <span>In Stock ({product.stockQuantity} available)</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartProduct;
