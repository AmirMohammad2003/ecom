"use client"

import { useRouter } from "next/navigation";

export default function RedirectButton() {
  const router = useRouter()
  return (
    <>
      <button className="btn btn-ghost max-w-xs mx-auto text-secondary" onClick={() => {
        router.push("/");
      }}>Go back to Home page</button>
    </>
  )
}
