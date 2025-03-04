'use client';

import { usePathname } from 'next/navigation'; // Correct import for Next.js 13
import Link from 'next/link';
import { useMemo } from 'react';

const Breadcrumb: React.FC = () => {
  const pathname = usePathname(); // Get the current pathname

  // Split pathname into segments, ignoring empty segments
  const pathSegments = useMemo(() => {
    return pathname?.split('/').filter(Boolean) || [];
  }, [pathname]);

  // Logging path segments for debugging
  console.log(pathSegments, "path segments");

  return (
    <nav className="bg-gray-100 p-4 rounded-md pt-24 z-10 fixed w-screen flex dark:bg-gray-700 shadow-lg font-semibold">
      <ol className="list-reset flex text-purple-600">
        {/* Hardcoded Home breadcrumb */}
        <li>
          <Link href="/" className="hover:text-purple-800 capitalize">
          </Link>
          <span className="mx-2">/</span>
        </li>

        {/* Generate breadcrumbs dynamically */}
        {pathSegments.length > 0 && pathSegments.map((segment, index) => {
          // Build the path from the root
          const path = '/' + pathSegments.slice(0, index + 1).join('/');

          return (
            <li key={index}>
              <Link href={path} className="hover:text-purple-800 capitalize">
                {segment}
              </Link>
              {index !== pathSegments.length - 1 && <span className="mx-2">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
