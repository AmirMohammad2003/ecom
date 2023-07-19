import OrderSummary from "./components/order-summary";

export default function PayPage() {
  return (
    <div className="w-full">
      <div className="card bg-base-300 rounded-box p-8 max-w-xl mx-auto">
        <OrderSummary />
        <div className="divider"></div>
        <button className="btn btn-primary w-full">
          <span className="text-white">Pay</span>
        </button>
      </div>
    </div>
  );
}
