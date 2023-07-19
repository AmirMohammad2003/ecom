// cookies makes the component render dynamically
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import OrderSummaryList from "./order-summary-list";

const API_URL = process.env.API_URL;
const getCart = async () => {
  const _cookies = cookies()
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
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
  let products = new Map<string, any>();
  for (let i = 0; i < cart.items.length; i++) {
    const item = cart.items[i];
    const product = await getProduct(item.slug);
    products.set(item.slug, { ...item, ...product });
  }

  return (
    <OrderSummaryList cart={cart} products={products}/>
  );
}
