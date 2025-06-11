"use client";
import React, { useEffect, useState } from "react";
import { config } from "@/utils/config";
import { ProductDetailProps, Variant } from "@/types";
import { getData } from "@/lib";
import Loading from "@/components/shared/layout/Loading";
import Container from "@/components/shared/layout/Container";
import _ from "lodash";
import { MdOutlineStar } from "react-icons/md";
import AddToCartBtn from "@/components/shared/common/AddToCartBtn";
import ProductCard from "@/components/shared/product/ProductCard";
import CategoryFilters from "@/components/shared/category/CategoryFilters";
import FormattedPrice from "@/components/shared/common/FormattedPrice";

const Product = ({ params: { id } }: { params: { id: string } }) => {
  const [productData, setProductData] = useState<ProductDetailProps | null>(
    null
  );
  const [allProducts, setAllProducts] = useState<ProductDetailProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

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
      setMainImage(productData.thumbnailUrl);
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
                  {productData?.imageUrls?.map((item, index) => (
                    <img
                      src={item}
                      alt="img"
                      key={index}
                      className={`w-24 cursor-pointer opacity-80 hover:opacity-100 duration-300 ${
                        mainImage === item &&
                        "border border-gray-500 rounded-sm opacity-100"
                      }`}
                      onClick={() => setMainImage(item)}
                    />
                  ))}
                </div>
                <div className="ml-4">
                  <img src={mainImage} alt="mainImage" className="w-full" />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold">{productData?.name}</h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <MdOutlineStar
                        key={i}
                        className={
                          i < Math.floor(productData.averageRating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-base font-semibold">
                    {/* ({productData?.averageRating.toFixed(1)}) */}
                  </p>
                </div>
                <p className="text-gray-600">{productData?.description}</p>
                <div>
                  <p className="font-semibold mb-2">Select Size:</p>
                  <div className="flex items-center gap-x-3">
                    {productData?.variants.map((variant) => (
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
                    {productData?.stockQuantity} available
                  </span>
                </p>
                {/* <AddToCartBtn
                  product={{
                    ...productData,
                    selectedVariant,
                  }}
                  title="Add to Cart"
                  className="bg-black/80 py-3 text-base text-gray-200 hover:scale-100 hover:text-white duration-200"
                /> */}
                <div className="bg-[#f7f7f7] p-5 rounded-md flex flex-col items-center justify-center gap-2">
                  <img
                    src={"/payment.webp"}
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
            <div className="flex items-start gap-10">
              <CategoryFilters id={id} />
              <div>
                <p className="text-4xl font-semibold mb-5 text-center">
                  Products Collection
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {allProducts?.map((item: ProductDetailProps) => (
                    <ProductCard item={item} key={item?.id} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default Product;
