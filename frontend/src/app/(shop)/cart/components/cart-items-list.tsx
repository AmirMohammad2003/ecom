"use client";
import { CartItemType } from "../lib/types";
import CartItem from "./cart-item";
import useSWR from "swr";
import { fetcher } from "@/app/(shop)/lib/util";
import Loading from "../../components/loading";

export default function CartItems() {
  const { data, error, isLoading } = useSWR("/v1/cart/", fetcher);
  return (
    <>
      {(!isLoading &&
        data?.map((item: CartItemType, index: number) => {
          return <CartItem key={index} cartItem={item} />;
        })) || <Loading />}
    </>
  );
}
