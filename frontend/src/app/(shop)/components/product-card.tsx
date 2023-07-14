import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import type { Product } from "../lib/types";

const makeProductUrl = (slug: string): string => {
  return `/product/${slug}`;
};

const ProductCard = ({
  product,
  isNew = false,
}: {
  product: Product;
  isNew: boolean;
}) => {
  const { slug, image, name, price } = product;
  const url = useMemo(() => makeProductUrl(slug), [slug]);
  return (
    <Link
      href={url}
      className="card bg-base-100 shadow-xl aspect-[6/5] hover:scale-105 transition-all duration-300"
    >
      <figure>
        {image && (
          <Image
            src={image}
            alt={name}
            width={128}
            height={72}
            className="aspect-video w-full"
          />
        )}
        {!image && (
          <div className="w-full aspect-video flex justify-center items-center bg-base-200">
            NO IMAGE AVAILABLE
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {name}
          {isNew && <div className="badge badge-secondary">NEW</div>}
        </h2>
        <p className="text-lg">Price: {price}$</p>
      </div>
    </Link>
  );
};

export default ProductCard;
