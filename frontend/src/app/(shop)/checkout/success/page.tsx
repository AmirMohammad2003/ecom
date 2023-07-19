"use client";
import useSWR, { useSWRConfig } from "swr";
import RedirectButton from "./components/redirect-button";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_HOST_URL;
const confirm = async () => {
  return fetch(API_URL + "/v1/payment/post-process/", {
    credentials: "same-origin",
  });
};

export default function Success() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { mutate } = useSWRConfig();
  const { data, isLoading } = useSWR("confirm-payment", confirm);
  useEffect(() => {
    console.log(data);
    if (data && data.ok) {
      setLoading(false);
    } else {
      if (data && data.status === 401) router.push("/")
      const id = setTimeout(() => {
        mutate("confirm-payment");
        clearTimeout(id);
      }, 1000);
    }
  }, [data]);
  return (
    <div className="flex flex-col items-center text-5xl cart p-8 text-accent cursor-default w-full text-center h-34 rounded-box bg-base-300">
      {(loading && (
        <>
          <p className="mb-8">Processing Payment...</p>
          <Loading />
        </>
      )) || (
        <>
          <p>Payment Successful.</p>
          <RedirectButton />
        </>
      )}
    </div>
  );
}
