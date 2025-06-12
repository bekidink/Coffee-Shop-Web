"use client";
import React, { useEffect, useState } from "react";
import { config } from "@/utils/config";
import { ProductDetailProps } from "@/types";
import { getData } from "@/lib";
import Loading from "@/components/shared/layout/Loading";
import Container from "@/components/shared/layout/Container";
import _, { divide } from "lodash";
import { MdOutlineStar, MdOutlineStarOutline } from "react-icons/md";
import FormattedPrice from "@/components/shared/common/FormattedPrice";
import AddToCartBtn from "@/components/shared/common/AddToCartBtn";
import ProductCard from "@/components/shared/product/ProductCard";
import { useParams } from "next/navigation";
import Link from "next/link";

const Product = () => {
  const [productData, setProductData] = useState<ProductDetailProps | null>(
    null
  );
  const [allProducts, setAllProducts] = useState<ProductDetailProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<
    ProductDetailProps["variants"][0] | null
  >(null);
  const { id } = useParams();

  const endpoint = id
    ? `${config?.baseUrl}/products/${id}`
    : `${config?.baseUrl}/products/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData(endpoint);
        if (id) {
          setProductData(data);
          setAllProducts([]);
        } else {
          setAllProducts(data);
          setProductData(null);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, endpoint]);

  useEffect(() => {
    if (productData) {
      setImgUrl(
        productData.thumbnailUrl ||
          productData.imageUrls[0] ||
          "/placeholder.jpg"
      );
      setSelectedVariant(productData.variants[0] || null);
    }
  }, [productData]);

  return (
    <div className="bg-zinc-50 dark:bg-slate-800">
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {!!id && productData && _.isEmpty(allProducts) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-start">
                <div className="flex flex-col gap-2">
                  {productData.imageUrls?.map((item, index) => (
                    <img
                      src={item || "/placeholder.jpg"}
                      alt="img"
                      key={index}
                      className={`w-24 cursor-pointer opacity-80 hover:opacity-100 duration-300 ${
                        imgUrl === item &&
                        "border border-gray-500 rounded-sm opacity-100"
                      }`}
                      onClick={() => setImgUrl(item)}
                    />
                  ))}
                </div>
                <div className="ml-4">
                  <img
                    src={imgUrl}
                    alt="mainImage"
                    className="w-full rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold">{productData.name}</h2>
                <p className="text-gray-600">{productData.description}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(productData.averageRating) ? (
                          <MdOutlineStar className="text-yellow-400" />
                        ) : (
                          <MdOutlineStarOutline />
                        )}
                      </span>
                    ))}
                  </div>
                  <p className="text-base font-semibold">
                    ({productData.averageRating.toFixed(1)})
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Select Size:</p>
                  <div className="flex items-center gap-x-3">
                    {productData.variants.map((variant) => (
                      <button
                        key={variant.id}
                        className={`px-4 py-2 border rounded-md ${
                          selectedVariant?.id === variant.id
                            ? "border-black bg-gray-100"
                            : "border-gray-300"
                        }`}
                        onClick={() => setSelectedVariant(variant)}
                      >
                        {variant.size}
                      </button>
                    ))}
                  </div>
                </div>
                {selectedVariant && (
                  <p className="text-xl font-semibold">
                    Price: <FormattedPrice amount={selectedVariant.price} />
                  </p>
                )}
                <p>
                  Stock:{" "}
                  <span className="font-medium">
                    {productData.stockQuantity} available
                  </span>
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-semibold">Shop Details</h3>
                  <div className="mt-2 flex flex-col gap-2">
                    <p>
                      Shop:{" "}
                      <Link
                        href={`/shop/${productData.shop?.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {productData.shop?.name || "Unknown Shop"}
                      </Link>
                    </p>
                    <p className="text-sm text-gray-600">
                      {productData.shop?.description ||
                        "No description available."}
                    </p>
                    {productData.shop?.imageUrl && (
                      <img
                        src={productData.shop.imageUrl}
                        alt="shopImage"
                        className="w-32 h-32 object-cover rounded-md mt-2"
                      />
                    )}
                  </div>
                </div>
                <AddToCartBtn
                  product={{ ...productData, selectedVariant }}
                  title="Add to Cart"
                  className="bg-black/80 py-3 text-base text-gray-200 hover:scale-100 hover:text-white duration-200"
                />
                <div className="bg-[#f7f7f7] p-5 rounded-md flex flex-col items-center justify-center gap-2">
                  <img
                    src="/productPayment.webp"
                    alt="payment"
                    className="w-auto object-cover"
                  />
                  <p className="font-semibold">
                    Guaranteed safe & secure checkout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-4xl font-semibold mb-5 text-center">
                Products Collection
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {allProducts?.map((item: ProductDetailProps) => (
                  <ProductCard item={item} key={item.id} />
                ))}
              </div>
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default Product;
