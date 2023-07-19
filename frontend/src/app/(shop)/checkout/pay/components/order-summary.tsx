import { redirect } from "next/navigation";
import OrderSummaryList from "../../components/order-summary-list";
import { cookies } from "next/headers";
import { makeCookies } from "@/app/(shop)/lib/util";

const API_URL = process.env.API_URL;
const getOrderDetails = async () => {
  const response = await fetch(API_URL + "/v1/order/", {
    headers: {
      cookie: makeCookies(cookies()),
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export default async function OrderSummary() {
  let data;
  try {
    data = await getOrderDetails();
    if (data.items.length === 0) {
      redirect("/");
    }
  } catch (err) {
    redirect("/");
  }

  return (
    <OrderSummaryList items={data?.items} totalPrice={data?.total_price} />
  );
}
