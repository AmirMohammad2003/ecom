"use client";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/app/(shop)/lib/util";
import { CartItemType } from "./lib/types";
import CartItem from "./components/cart-item";

const ColumnNames = () => (
  <tr>
    <th>Image</th>
    <th>Product</th>
    <th>Quantity</th>
    <th>Remove</th>
    <th>Unit price</th>
    <th>Price</th>
  </tr>
);

export default function Cart() {
  const { data, isLoading } = useSWR("/v1/cart/", fetcher);
  const router = useRouter();
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <ColumnNames />
        </thead>
        <tbody>
          {!isLoading &&
            data?.items?.map((item: CartItemType, index: number) => {
              return <CartItem key={index} cartItem={item} />;
            })}
        </tbody>
        <tfoot>
          <ColumnNames />
        </tfoot>
      </table>
      <button
        className="btn btn-primary btn-block"
        onClick={() => {
          router.push("/checkout");
        }}
      >
        Checkout {data?.total_price}
      </button>
    </div>
  );
}
