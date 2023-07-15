"use client";

import Link from "next/link";
import Loading from "./loading";
import useSWR from "swr";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const fetcher = ({input , init=undefined}: {input: string, init: Object | undefined}) => {
  return fetch(input, init).then((_res) => {
   return  _res.json()
  });
}

export default function CartIndicator() {
  const { data, error, isLoading } = useSWR(
    { input: API_URL + "/v1/cart/size/", init: { credentials: "same-origin" } },
    fetcher
  );
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
