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
    <div className="lg:px-20  py-10 px-4">
      {preferences && preferences.length > 0 && (
        <>
          <div className="text-3xl pl-8 md:text-left text-center font-serif font-semibold mb-2 text-gray-700 dark:text-white">
            Recommend for you..
          </div>

          <div className="grid  2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 self-center grid-cols-2  sm:gap-10 gap-4">
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
