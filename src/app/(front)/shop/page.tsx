"use client";
import React, { useEffect, useState } from "react";
import { config } from "@/utils/config";
import { ProductDetailProps } from "@/types";
import { getData } from "@/lib";
import Loading from "@/components/shared/layout/Loading";
import Container from "@/components/shared/layout/Container";
import { MdOutlineStar, MdOutlineStarOutline } from "react-icons/md";
import FormattedPrice from "@/components/shared/common/FormattedPrice";
import Link from "next/link";
import ProductCard from "@/components/shared/product/ProductCard";

interface Shop {
  id: string;
  name: string;
  vendorId: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  status: string;
  addresses: any[];
  products: ProductDetailProps[];
}

const Shops = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);

  const endpoint = `${config?.baseUrl}/shops`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData(endpoint);
        setShops(data);
      } catch (error) {
        console.error("Error fetching shops", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-zinc-50 dark:bg-slate-800">
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <p className="text-4xl font-semibold mb-5 text-center">Our Shops</p>
          {shops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.map((shop) => (
                <div
                  key={shop.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-black duration-200 cursor-pointer flex flex-col"
                >
                  <Link href={`/shop/${shop.id}`}>
                    <div className="flex items-center gap-4">
                      <img
                        src={shop.imageUrl || "/placeholder.jpg"}
                        alt={shop.name}
                        className="w-20 h-20 rounded-md object-cover"
                      />
                      <div>
                        <h2 className="text-xl font-bold">{shop.name}</h2>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < Math.floor(shop.averageRating) ? (
                                <MdOutlineStar className="text-yellow-400" />
                              ) : (
                                <MdOutlineStarOutline />
                              )}
                            </span>
                          ))}
                          <span className="text-sm">
                            ({shop.averageRating.toFixed(1)})
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {shop.description || "No description available."}
                  </p>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Featured Products</h3>
                    <div className="mt-2 grid grid-cols-1 gap-4">
                      {shop.products.slice(0, 3).map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          className="flex items-center gap-2 border-t pt-2"
                        >
                          <img
                            src={
                              product.thumbnailUrl ||
                              product.imageUrls[0] ||
                              "/placeholder.jpg"
                            }
                            alt={product.name}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              <FormattedPrice
                                amount={product.variants[0]?.price || 0}
                              />
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/shop/${shop.id}`}
                    className="mt-4 text-center bg-black text-white py-2 rounded-md hover:bg-gray-800 duration-200"
                  >
                    Visit Shop
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white h-96 flex flex-col gap-2 items-center justify-center py-5 rounded-lg border border-gray-200 drop-shadow-2xl">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                No Shops Available
              </h1>
              <p className="text-lg max-w-[600px] text-center text-gray-600 tracking-wide leading-6">
                It looks like there are no shops available at the moment. Check
                back later for new shops and products!
              </p>
              <Link
                href="/"
                className="bg-gray-800 text-gray-200 px-8 py-4 rounded-md hover:bg-black hover:text-white duration-200 uppercase text-sm font-semibold tracking-wide"
              >
                Go to Home
              </Link>
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default Shops;
