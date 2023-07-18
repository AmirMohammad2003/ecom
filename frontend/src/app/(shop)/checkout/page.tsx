import OrderSummary from "./components/order-summary";
import PlaceOrderForm from "./components/place-order-form";

export default async function Checkout() {
  return (
    <div className="">
      <div>
        <h1 className="text-3xl text-accent mb-2 text-center cursor-default select-none">
          Checkout
        </h1>
      </div>
      <div className="flex flex-col w-full lg:flex-row my-4">
        <div className="grid flex-1 h-min card bg-base-300 rounded-box p-8 place-items-center box-border">
          <PlaceOrderForm />
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="grid flex-1 h-min card bg-base-300 rounded-box p-8 box-border">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
