"use client";

import useSWRMutation from "swr/mutation";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

const fetcher = ({
  input,
  init = undefined,
}: {
  input: string;
  init: Object | undefined;
}) => {
  return fetch(input, init).then((_res) => {
    return _res.json();
  });
};

export default function AddToCartButton({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}) {
  const { mutate } = useSWRConfig();
  const { data, trigger, isMutating } = useSWRMutation(
    {
      input: `/v1/cart/${id}/add/`,
      init: {
        method: "post",
        credentials: "include",
        body: JSON.stringify({
          quantity: quantity,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    },
    fetcher,
    {
      onSuccess(data, key, config) {
        if (data.status === "success") {
          mutate("/v1/cart/size/");
          toast.success(data.message)
        } else {
          toast.error(data.message);
        }
      },
      onError(err, key, config) {
        console.error(err);
        toast.error("An error occurred");
      },
    }
  );

  return (
    <button
      className="btn btn-primary mt-3"
      onClick={(e) => {
        e.preventDefault();
        if (!isMutating) trigger();
      }}
    >
      {isMutating && <span className="loading loading-spinner"></span>}
      Add to cart
    </button>
  );
}
