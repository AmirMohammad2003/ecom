"use client";

export default function QuantitySelect({
  setQuantity,
}: {
  setQuantity: (...args: any[]) => any;
}) {
  let quantityOptions: number[] = [];
  for (let index = 1; index <= 10; index++) {
    quantityOptions.push(index);
  }

  return (
    <select
      className="select select-primary select-sm w-full max-w-xs"
      onChange={(event) => {
        setQuantity(parseInt(event.target.value));
      }}
      defaultValue={1}
    >
      {quantityOptions.map((value: number, index: number) => {
        return (
          <option key={index} value={value}>
            {value}
          </option>
        );
      })}
    </select>
  );
}
