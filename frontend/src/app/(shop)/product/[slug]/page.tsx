import Image from "next/image";
import type { Product } from "@/app/(shop)/lib/types";

const API_URL = process.env.API_URL;
const getProduct = async (slug: string) => {
  const product = await fetch(API_URL + `/v1/product/${slug}/`);
  return product.json();
};

export default async function ProductPage(props: {
  params: { slug: string };
  searchParams: any;
}) {
  const product: Product = await getProduct(props.params.slug);
  let quantity: number[] = [];
  for (let index = 2; index <= 10; index++) {
    quantity.push(index);
  }
  return (
    <div className="hero py-9 bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        {product.image && (
          <Image
            src={product.image}
            className="max-w-sm rounded-lg shadow-2xl aspect-video"
            width="1280"
            height="720"
            alt=""
          />
        )}
        <div>
          <h1 className="text-5xl font-bold pb-3">{product.name}</h1>
          {product.description && <p className="py-3">{product.description}</p>}
          <p className="pt-3">Price: {product.price}$</p>
          <div className="py-3">
            Quantity
            <select className="select select-primary select-sm w-full max-w-xs">
              <option value="1" selected>
                1
              </option>
              {quantity.map((value: number, index: number) => {
                return <option key={index} value={value}>{value}</option>
              })}
            </select>
          </div>
          <button className="btn btn-primary mt-3">Add to cart</button>
        </div>
      </div>
    </div>
  );
}
