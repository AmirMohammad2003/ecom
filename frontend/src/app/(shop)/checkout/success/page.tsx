import { redirect } from "next/navigation";
import RedirectButton from "./components/redirect-button";

const API_URL = process.env.API_URL;
const confirm = async () => {
  return fetch(API_URL + "/payment/success/");
};

export default async function Success() {
  const res = await confirm();
  if (!res.ok) redirect("/");
  return (
    <div className="flex flex-col text-5xl cart p-8 text-accent cursor-default w-full text-center h-34 rounded-box bg-base-300">
      Payment Successful.
      <RedirectButton />
    </div>
  );
}
