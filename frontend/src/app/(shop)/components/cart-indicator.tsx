"use client";

import Link from "next/link";
import Loading from "./loading";
import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_HOST_URL;
const fetcher = (input: string) => {
  return fetch(API_URL + input, { credentials: "include" }).then((_res) => {
   return  _res.json()
  });
}

export default function CartIndicator() {
  const { data, error, isLoading } = useSWR("/v1/cart/size/", fetcher);
  return (
    <div className="indicator box-border">
      {isLoading ? <Loading /> :
       error ? <p>Error</p> :
       <>
        <span className="indicator-item badge badge-primary">{data.size}</span>
        <Link href={"/cart"}>Cart</Link>
       </>
       }
    </div>
  );
}
