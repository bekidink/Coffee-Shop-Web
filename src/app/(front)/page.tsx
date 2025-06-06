import Categories from "@/components/shared/category/Categories";
import BannerCategories from "@/components/shared/home/BannerCategories";
import ProductList from "@/components/shared/product/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <BannerCategories />
      <Categories />
      <ProductList />
    </main>
  );
}
