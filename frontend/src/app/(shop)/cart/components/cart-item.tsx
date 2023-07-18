"use client";
import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { CartItemType } from "../lib/types";
import { fetcher } from "@/app/(shop)/lib/util";
import DeleteButton from "./delete-button";
import ChangeQuantity from "./change-quantity";

const Square = () => <div className="bg-slate-600 h-4 w-full"></div>;

export default function CartItem({ cartItem }: { cartItem: CartItemType }) {
  const [totalPrice, setTotalPrice] = useState(cartItem.total_price);
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
              {(!isLoading && data?.image && (
                <Image
                  src={data.image}
                  alt={data.name}
                  width={256}
                  height={256}
                />
              )) || (
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
          <Square />
        ) : (
          <ChangeQuantity setTotalPrice={setTotalPrice} cartItem={cartItem} />
        )}
      </td>
      <td>{isLoading ? <Square /> : <DeleteButton slug={cartItem.slug} />}</td>
      <td>{isLoading ? <Square /> : cartItem.price}</td>
      <th>{isLoading ? <Square /> : totalPrice}</th>
    </tr>
  );
}
