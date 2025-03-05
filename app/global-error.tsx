"use client";
import React from "react";

function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <html>
        <body>
          <h2>Something went wrong!</h2>
          <button onClick={() => reset()}>Try again</button>
        </body>
      </html>
    </div>
  );
}

export default GlobalError;
