
export default async function OrderSummaryList({
  cart,
  products,
}: {
  cart: any;
  products: any;
}) {
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
