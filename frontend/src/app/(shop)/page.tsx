import SideNav from "./components/side-nav";
import ProductCard from "./components/product-card";
import type { Product } from "./lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const getProducts = async (props: { params: any; searchParams: any }) => {
  let products;
  const category = props.searchParams.category;
  const requestInit = {
    next: {
      revalidate: 60,
    },
  };
  if (category !== undefined) {
    products = await fetch(API_URL + `/v1/category/${category}/products/`, requestInit);
  } else {
    products = await fetch(API_URL + "/v1/product/", requestInit);
  }
  return products.json();
};
const getCategories = async () => {
  const categories = await fetch(API_URL + "/v1/category/");
  return categories.json();
};

export default async function Home(props: { params: any; searchParams: any }) {
  const products = await getProducts(props);
  const categories = await getCategories();
  return (
    <div className="flex flex-row w-full h-full gap-3">
      <SideNav categories={categories} active={props.searchParams.category} />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {products.map((product: Product, index: number) => {
          return <ProductCard product={product} isNew={false} key={index} />;
        })}
      </div>
    </div>
  );
}
