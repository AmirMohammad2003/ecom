// cookies makes the component render dynamically
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import OrderSummaryList from "./order-summary-list";
import { makeCookies } from "../../lib/util";

const API_URL = process.env.API_URL;
const getCart = async () => {
  const _cookies = makeCookies(cookies());
  const cart = await fetch(API_URL + "/v1/cart/", {
    headers: {
      cookie: _cookies,
    },
  });
  return cart.json();
};

const getProduct = async (slug: string) => {
  return await fetch(API_URL + `/v1/product/${slug}/`).then((_res) =>
    _res.json()
  );
};

export default async function OrderSummary() {
  const cart = await getCart();
  if (cart.items.length === 0 || !cart || !cart.items) {
    redirect("/");
  }
  let products = [];
  for (let i = 0; i < cart.items.length; i++) {
    const item = cart.items[i];
    const product = await getProduct(item.slug);
    products.push({ ...item, ...product });
  }

  return (
    <OrderSummaryList items={products} totalPrice={cart?.total_price}/>
  );
}
