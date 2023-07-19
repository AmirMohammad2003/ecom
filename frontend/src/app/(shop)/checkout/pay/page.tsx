import OrderSummary from "./components/order-summary";
import PayButton from "./components/pay-button";

export default function PayPage() {
  return (
    <div className="w-full">
      <div className="card bg-base-300 rounded-box p-8 max-w-xl mx-auto">
        <OrderSummary />
        <div className="divider"></div>
        <PayButton />
      </div>
    </div>
  );
}
