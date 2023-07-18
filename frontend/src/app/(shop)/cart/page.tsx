import CartItems from "./components/cart-items-list";

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
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <ColumnNames />
        </thead>
        <tbody>
          <CartItems />
        </tbody>
        <tfoot>
          <ColumnNames />
        </tfoot>
      </table>
    </div>
  );
}
