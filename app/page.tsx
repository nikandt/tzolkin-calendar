'use client';

import React, { useState } from "react";
import TzolkinCalendar from "./components/tzolkinCalendar";

export default function Home() {

  const [calendarIndex, setCalendarIndex] = useState(0);

  const dateRanges = [
    { start: "08.07.2024", end: "24.03.2025" },
    { start: "25.03.2025", end: "09.12.2025" }
  ];

  const handlePagination = (direction: "prev" | "next") => {
    if (direction === "prev" && calendarIndex > 0) {
      setCalendarIndex(calendarIndex - 1);
    } else if (direction === "next" && calendarIndex < dateRanges.length - 1) {
      setCalendarIndex(calendarIndex + 1);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">

        <div className="flex justify-between w-full items-center mb-4">
          <div className="text-gray-700 font-semibold text-sm sm:text-base">
            13:20 day sequence
          </div>
          <div className="text-xl font-bold text-center tracking-wide">
            TZOLK&apos;IN
          </div>
          <div className="text-gray-700 font-semibold text-sm sm:text-base">
            {dateRanges[calendarIndex].start} - {dateRanges[calendarIndex].end}
          </div>
        </div>

        <TzolkinCalendar dateRange={dateRanges[calendarIndex]} />

        <div className="flex justify-between w-full mt-4">
          <button
            onClick={() => handlePagination("prev")}
            disabled={calendarIndex === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePagination("next")}
            disabled={calendarIndex === dateRanges.length - 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
