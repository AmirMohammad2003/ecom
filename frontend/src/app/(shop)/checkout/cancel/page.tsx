import RedirectButton from "../success/components/redirect-button";

export default async function Cancel() {
  return (
    <div className="flex flex-col text-5xl cart p-8 text-red-600 cursor-default w-full text-center h-34 rounded-box bg-base-300">
      Payment Cancelled.
      <RedirectButton />
    </div>
  );
}
