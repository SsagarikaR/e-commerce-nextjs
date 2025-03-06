"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();

  const pathSegments = useMemo(() => {
    return pathname?.split("/").filter(Boolean) || [];
  }, [pathname]);

  // If the path is `/home`, don't show breadcrumbs
  if (pathname === "/home") {
    return null;
  }

  console.log(pathSegments, "path segments");

  return (
    <nav className="p-4 rounded-md pt-24 z-10 fixed w-screen flex dark:bg-gray-700 font-semibold">
      <ol className="list-reset flex text-blue-600">
        <li>
          <Link href="/" className="hover:text-blue-800 capitalize">
            Home
          </Link>
          <span className="mx-2">/</span>
        </li>

        {/* Generate breadcrumbs dynamically */}
        {pathSegments.length > 0 &&
          pathSegments.map((segment, index) => {
            // Build the path from the root
            const path = "/" + pathSegments.slice(0, index + 1).join("/");

            return (
              <li key={index}>
                <Link href={path} className="hover:text-blue-800 capitalize">
                  {segment}
                </Link>
                {index !== pathSegments.length - 1 && (
                  <span className="mx-2">/</span>
                )}
              </li>
            );
          })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
