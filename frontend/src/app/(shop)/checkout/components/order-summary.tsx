// cookies makes the component render dynamically
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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
    <div className="cursor-default">
      <h2 className="text-xl text-primary text-center">Your Order</h2>
      <div className="divider"></div>
      <div className="box-border p-4">
        {cart?.items.map((item: any, index: number) => {
          const product = products.get(item.slug);
          return (
            <div key={index} className="flex text-md items-center ">
              <p className="flex-wrap">
                <span className="font-bold">{product.quantity}</span>
                &nbsp;<span className="text-accent">&times;</span>&nbsp;
                {product.name}
              </p>
              <div className="divider w-full self-center flex-shrink-1 px-3"></div>
              <p className="">{item.price}&nbsp;$</p>
            </div>
          );
        })}
      </div>
      <div className="divider"></div>
      <div className="text-center text-lg">
        <span className="">Total Price: </span>
        <span className="font-bold">{cart?.total_price}&nbsp;$</span>
      </div>
    </div>
  );
}
