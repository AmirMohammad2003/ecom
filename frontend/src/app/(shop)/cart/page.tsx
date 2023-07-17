import { cookies } from "next/headers";
import CartItem from "./components/cart-item";
import type { CartItemType } from "./lib/types";

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

const getCartItems = async () => {
  return await fetch(process.env.NEXT_PUBLIC_HOST_URL + "/v1/cart/", {
    cache: "no-store",
    headers: {
      Cookie: cookies()
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; "),
    },
  })
    .then((_res) => {
      return _res.json();
    })
    .catch((_err) => {
      console.error(_err);
      throw new Error("Something went wrong fetching cart items");
    });
};

export default async function Cart() {
  const cartItems = await getCartItems();
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <ColumnNames />
        </thead>
        <tbody>
          {cartItems.map((item: CartItemType, index: number) => {
            return (
              <CartItem
                key={index}
                cartItem={item}
              />
            );
          })}
        </tbody>
        <tfoot>
          <ColumnNames />
        </tfoot>
      </table>
    </div>
  );
}
