"use client";
import React from "react";
import useSWR from "swr";
import PreferenceCard from "./PreferenceCard";
import { fetcher } from "@/lib/helpers/authorizedGetFetcher";

function Preferences() {
  const { data: preferences } = useSWR<prefernce[], Error>(
    "preferences",
    fetcher
  );
  console.log(preferences, "preference");

  return (
    <div className="px-20 py-10">
      {preferences && preferences.length > 0 && (
        <>
          <div className="text-3xl pl-8 md:text-left text-center font-serif font-semibold mb-2 text-gray-700 dark:text-white">
            Recommend for you..
          </div>

          <div className="grid  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 self-center sm:grid-cols-1 grid-cols-1 gap-10">
            {preferences.map((item: prefernce) => (
              <PreferenceCard key={item.preferenceID} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Preferences;
