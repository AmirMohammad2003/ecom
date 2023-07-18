"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { fetcherPostJson } from "../../lib/util";

const formInputs = [
  "first_name",
  "last_name",
  "email",
  "address",
  "postal_code",
  "city",
];
const formInputPlaceholders = [
  "First name",
  "Last name",
  "Email",
  "Address",
  "Postal code",
  "City",
];

export default function PlaceOrderForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    let ok = true;
    formInputs.forEach((input) => {
      if (!values[input]) {
        ok = false;
        toast.error(`Please enter your ${input}`);
      }
    });
    if (!ok) return;
    setFormData(values);
    setSend(true);
  };
  const [send, setSend] = useState(false);
  const [formData, setFormData] = useState({} as any);
  const {
    data: res,
    trigger,
    isMutating,
    error,
  } = useSWRMutation("/v1/order/create/", (key) =>
    fetcherPostJson({ input: key, body: formData })
  );
  useEffect(() => {
    if (!res) return;
    if (res.status === 200) {
      toast.success("Order placed successfully");
    }
  }, [res])
  useEffect(() => {
    if (!error) return;
    console.log(error)
    if (error.status === 400) {
      console.log(error.info)
      Object.entries(error.info).forEach(([key, value]) => {
        toast.error(value as string);
      });
      error
    } else {

    toast.error("Something went wrong");
    }
  }, [error]);
  useEffect(() => {
    if (isMutating) return;
    if (!formData) return;
    if (!send) return;
    trigger();
    setSend(false);
  }, [formData]);
  return (
    <form
      className="flex flex-col gap-5 w-full items-center"
      onSubmit={handleSubmit}
    >
      {formInputs.map((input, index) => {
        return (
          <input
            key={index}
            type="text"
            placeholder={formInputPlaceholders[index]}
            className="input input-bordered input-secondary w-full max-w-sm"
            name={input}
          />
        );
      })}
      <button className="btn btn-primary w-full max-w-sm">
        <span className="text-white">Place Order</span>
      </button>
    </form>
  );
}
