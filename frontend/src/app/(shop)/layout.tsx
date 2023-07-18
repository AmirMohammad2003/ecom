import "../globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import CartIndicator from "./components/cart-indicator";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  "title": "Online Shop"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="m-6">
          <div className="navbar bg-base-100">
            <div className="flex-1">
              <Link href={"/"} className="text-primary btn btn-ghost normal-case text-xl">
                Shop
              </Link>
            </div>
            <div className="flex-none">
              <CartIndicator />
            </div>
          </div>
          <div className="divider"></div>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
