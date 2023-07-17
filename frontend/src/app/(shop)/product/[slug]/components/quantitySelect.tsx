"use client";

export default function QuantitySelect({
  setQuantity,
  defaultValue=1,
}: {
  setQuantity: (...args: any[]) => any;
  defaultValue: number;
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
      defaultValue={defaultValue}
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
