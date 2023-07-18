"use client";
import { useEffect, useState } from "react";
import { CartItemType } from "../lib/types";
import { useSWRConfig } from "swr";
import QuantitySelect from "../../product/[slug]/components/quantitySelect";
import { fetcherPostJson } from "../../lib/util";
import useSWRMutation from "swr/mutation";

export default function ChangeQuantity({
  cartItem,
  setTotalPrice,
}: {
  cartItem: CartItemType;
  setTotalPrice: (totalPrice: number) => void;
}) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const { mutate } = useSWRConfig();
  const { data, trigger, isMutating } = useSWRMutation(
    {
      input: `/v1/cart/${cartItem.slug}/add/`,
      body: { quantity: quantity, override: true },
    },
    fetcherPostJson
  );
  useEffect(() => {
    if (data?.status === "success") {
      setTotalPrice(quantity * cartItem.price);
      mutate("/v1/cart/size/");
      mutate("/v1/cart/");
    }
  }, [cartItem.price, data]);
  return (
    <div className="flex flex-row items-center">
      <QuantitySelect
        setQuantity={setQuantity}
        defaultValue={quantity}
      />
      <button
        className="btn btn-ghost btn-xs"
        onClick={() => {
          if (!isMutating) trigger();
        }}
      >
        Update
      </button>
    </div>
  );
}
