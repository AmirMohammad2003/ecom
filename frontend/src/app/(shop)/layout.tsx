import "../globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import CartIndicator from "./components/cart-indicator";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {};

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
              <Link href={"/"} className="btn btn-ghost normal-case text-xl">
                Shop
              </Link>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <CartIndicator />
                </li>
              </ul>
            </div>
          </div>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
