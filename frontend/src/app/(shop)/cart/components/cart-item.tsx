"use client";
import Image from "next/image";
import QuantitySelect from "../../product/[slug]/components/quantitySelect";
import { CartItemType } from "../lib/types";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useSWRConfig } from "swr";
import { fetcher } from "@/app/(shop)/lib/util";
import { useState } from "react";

export default function CartItem({ cartItem }: { cartItem: CartItemType }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [totalPrice, setTotalPrice] = useState(cartItem.total_price);
  const { mutate } = useSWRConfig();
  const { data, error, isLoading } = useSWR(
    `/v1/product/${cartItem.slug}/`,
    fetcher
  );
  return (
    <tr className={isLoading ? "animate-pulse" : ""}>
      <th>
        <div className="flex items-center space-x-3">
          <div
            className={
              "avatar " + (isLoading ? "bg-slate-600 rounded-full" : "")
            }
          >
            <div className="mask mask-squircle w-24 h-24">
              {!isLoading && data?.image && (
                <Image
                  src={data.image
                  }
                  alt={data.name}
                  width={256}
                  height={256}
                />
              ) || (
                <div className="w-full h-full flex text-center items-center bg-slate-600">
                  NO IMAGE AVAILABLE
                </div>
              )}
            </div>
          </div>
        </div>
      </th>
      <td>
        <div>
          <div className={isLoading ? "bg-slate-600 h-4 w-full" : "font-bold"}>
            {!isLoading && data.name}
          </div>
        </div>
      </td>
      <td>
        {isLoading ? (
          <div className="bg-slate-600 h-4 w-full"></div>
        ) : (
          <QuantitySelect setQuantity={() => {}} defaultValue={quantity} />
        )}
      </td>
      <td>
        {isLoading ? (
          <div className="bg-slate-600 h-4 w-full"></div>
        ) : (
          <button
            className="btn btn-ghost btn-xs"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Remove
          </button>
        )}
      </td>
      <td>
        {isLoading ? (
          <div className="bg-slate-600 h-4 w-full"></div>
        ) : (
          cartItem.price
        )}
      </td>
      <th>
        {isLoading ? (
          <div className="bg-slate-600 h-4 w-full"></div>
        ) : (
          totalPrice
        )}
      </th>
    </tr>
  );
}
