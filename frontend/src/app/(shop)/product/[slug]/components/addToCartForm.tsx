"use client";
import { useState } from "react";
import AddToCartButton from "./addToCartButton";
import QuantitySelect from "./quantitySelect";

export default function AddToCartForm({ slug }: { slug: string }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <div className="py-3">
        <div className="flex flex-row gap-2">
          <p>Quantity</p>
          <QuantitySelect setQuantity={setQuantity} defaultValue={1}/>
        </div>
      </div>
      <AddToCartButton slug={slug} quantity={quantity} />
    </>
  );
}
