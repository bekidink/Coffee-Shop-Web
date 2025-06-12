"use client";
import React, { useEffect, useState } from "react";
import { config } from "@/utils/config";
import { ProductDetailProps } from "@/types";
import { getData } from "@/lib";
import Loading from "@/components/shared/layout/Loading";
import Container from "@/components/shared/layout/Container";
import { MdOutlineStar, MdOutlineStarOutline } from "react-icons/md";
import Link from "next/link";
import { useParams } from "next/navigation";
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

const ShopDetail = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const endpoint = id ? `${config?.baseUrl}/shops/${id}` : null;

  useEffect(() => {
    const fetchData = async () => {
      if (!endpoint) return;
      try {
        setLoading(true);
        const data = await getData(endpoint);
        setShop(data);
      } catch (error) {
        console.error("Error fetching shop details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  return (
    <div className="bg-zinc-50 dark:bg-slate-800">
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {shop ? (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <img
                  src={shop.imageUrl || "/placeholder.jpg"}
                  alt={shop.name}
                  className="w-full md:w-64 h-64 object-cover rounded-md"
                />
                <div className="flex flex-col gap-4">
                  <h1 className="text-3xl font-bold">{shop.name}</h1>
                  <div className="flex items-center gap-2">
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
                  <p className="text-gray-600">
                    {shop.description || "No description available."}
                  </p>
                  <p className="text-sm">
                    Status: <span className="font-medium">{shop.status}</span>
                  </p>
                  <p className="text-sm">
                    Created:{" "}
                    <span className="font-medium">
                      {new Date(shop.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                  <Link
                    href="/shops"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Back to Shops
                  </Link>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Products</h2>
                {shop.products.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {shop.products.map((product) => (
                      <ProductCard item={product} key={product.id} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    No products available in this shop.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white h-96 flex flex-col gap-2 items-center justify-center py-5 rounded-lg border border-gray-200 drop-shadow-2xl">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Shop Not Found
              </h1>
              <p className="text-lg max-w-[600px] text-center text-gray-600 tracking-wide leading-6">
                The shop you are looking for does not exist or is unavailable.
                Check out other shops or try again later!
              </p>
              <Link
                href="/shops"
                className="bg-gray-800 text-gray-200 px-8 py-4 rounded-md hover:bg-black hover:text-white duration-200 uppercase text-sm font-semibold tracking-wide"
              >
                Browse Shops
              </Link>
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default ShopDetail;
