import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const isActive = (href) => {
    return router.pathname === href ? "border-blue-500" : "";
  };

  return (
    <nav className="bg-indigo-50 shadow dark:bg-gray-800">
      <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <Link href="/"
            className={`text-gray-800 dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6 ${isActive(
              "/"
            )}`}
          >
            Dashboard
        </Link>

        <Link href="/NFT"
            className={`text-gray-800 dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6 ${isActive(
              "/NFT"
            )}`}
          >
            Non-Fungible Token Data
        </Link>

        <Link href="/Tokens" 
            className={`text-gray-800 dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6 ${isActive(
              "/Tokens"
            )}`}
          >
            Fungible Token Data
        </Link>

        <Link href="/Collection"
            className={`text-gray-800 dark:text-gray-200 border-b-2 mx-1.5 sm:mx-6 ${isActive(
              "/Collection"
            )}`}
          >
            NFT Collection Data

        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
