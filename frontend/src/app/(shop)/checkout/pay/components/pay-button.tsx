"use client";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import router from "next/router";
import { fetcherPostJson } from "@/app/(shop)/lib/util";

export default function PayButton() {
  const {
    data: res,
    trigger,
    isMutating,
    error,
  } = useSWRMutation(
    "/v1/payment/process/",
    (key) => fetcherPostJson({ input: key, body: {} }),
    {
      onSuccess: (data, key, config) => {
        const url = data["url"];
        window.location.replace(url)
      },
    }
  );
  return (
    <button
      className="btn btn-primary w-full"
      onClick={() => {
        if (!isMutating) trigger();
      }}
    >
      <span className="text-white">Pay</span>
    </button>
  );
}
