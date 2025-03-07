"use client";

import React from "react";

function error({ error }: { error: Error & { digest?: string } }) {
  console.log(error);
  return (
    <div>
      <h1>Something went wrong, please try again after sometimes!</h1>
      <p></p>
    </div>
  );
}

export default error;
