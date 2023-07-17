"use client";

import { useState } from "react";
import AddToCartButton from "./addToCartButton";

export default function AddToCartForm({id}: {id:number}) {
  const [quantity, setQuantity] = useState(1);
  let quantityOptions: number[] = [];
  for (let index = 2; index <= 10; index++) {
    quantityOptions.push(index);
  }

  const quantityHandler = (event: any) => {
    let value = event.target.value;
    value = parseInt(value);
    setQuantity(value);
  }

  return (
    <>
      <div className="py-3">
        <div className="flex flex-row gap-2">
          <p>Quantity</p>
          <select
            className="select select-primary select-sm w-full max-w-xs"
            onChange={quantityHandler}
            defaultValue={1}
          >
            <option value="1">
              1
            </option>
            {quantityOptions.map((value: number, index: number) => {
              return (
                <option key={index} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <AddToCartButton id={id} quantity={quantity} />
    </>
  );
}
