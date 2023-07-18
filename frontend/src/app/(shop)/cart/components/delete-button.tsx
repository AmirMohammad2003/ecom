"use client";
import useSWRMutation from "swr/mutation";
import { fetcherPost } from "@/app/(shop)/lib/util";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSWRConfig } from "swr";

export default function DeleteButton({ slug }: { slug: string }) {
  const { mutate } = useSWRConfig();
  const { data, trigger, isMutating } = useSWRMutation(
    `/v1/cart/${slug}/remove/`,
    fetcherPost
  );
  useEffect(() => {
    if (data?.status === "success") {
      toast.success(data?.message);
      mutate("/v1/cart/size/");
      mutate("/v1/cart/");
    }
  }, [data, mutate]);

  return (
    <button
      className="btn btn-ghost btn-xs"
      onClick={() => {
        if (!isMutating) trigger();
      }}
    >
      Remove
    </button>
  );
}
