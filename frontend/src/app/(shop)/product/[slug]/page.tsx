import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/app/(shop)/lib/types";
import AddToCartForm from "./components/addToCartForm";

const API_URL = process.env.API_URL;
const getProduct = async (slug: string) => {
  const product = await fetch(API_URL + `/v1/product/${slug}/`);
  return product.json();
};

const getCategory = async (slug: string) => {
  const category = await fetch(API_URL + `/v1/category/${slug}/`);
  return category.json();
};

export default async function ProductPage(props: {
  params: { slug: string };
  searchParams: any;
}) {

  const product: Product = await getProduct(props.params.slug);
  const { name } = await getCategory(product.category);
  return (
    <div className="hero py-9 bg-base-200 place-items-start px-7">
      <div className="hero-content flex-col lg:flex-row gap-8">
        {product.image && (
          <Image
            src={product.image}
            className="max-w-sm rounded-lg shadow-2xl aspect-square"
            width="1280"
            height="1280"
            alt={product.name}
          />
        )}
        <div>
          <h1 className="text-5xl font-bold pb-3">{product.name}</h1>
          <Link
            href={`/?category=${product.category}`}
            className="text-1xl pt-3 text-primary"
          >
            {name}
          </Link>
          {product.description && <p className="py-3">{product.description}</p>}
          <p className="pt-3">Price: {product.price}$</p>
          <AddToCartForm id={product.id}/>
        </div>
      </div>
    </div>
  );
}
