'use client';

import React, { useState } from "react";
import TzolkinCalendar from "./components/tzolkinCalendar";

// ---------------------------------------------------------------------------
// Tzolkin cycle helpers
// ---------------------------------------------------------------------------

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Feb 28 of a leap year: this kin spans two calendar days (28–29) in the
// existing tzolkinCalendar.tsx rendering logic.
function isLeapDay(date: Date): boolean {
  return date.getMonth() === 1 && date.getDate() === 28 && isLeapYear(date.getFullYear());
}

// Returns the last calendar day covered by the 260-kin cycle starting on
// startDate. Mirrors the advance logic in tzolkinCalendar.tsx exactly.
function getCycleEndDate(startDate: Date): Date {
  const current = new Date(startDate);
  for (let kin = 0; kin < 259; kin++) {
    if (isLeapDay(current)) {
      current.setDate(current.getDate() + 2);
    } else {
      current.setDate(current.getDate() + 1);
    }
  }
  if (isLeapDay(current)) {
    return addDays(current, 1);
  }
  return new Date(current);
}

function formatDate(date: Date): string {
  const day   = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year  = String(date.getFullYear());
  return `${day}.${month}.${year}`;
}

function parseDate(str: string): Date {
  const [day, month, year] = str.split('.').map(Number);
  return new Date(year, month - 1, day);
}

// ---------------------------------------------------------------------------
// Cycle list — generated automatically from a known anchor date.
// ---------------------------------------------------------------------------

const CYCLE_ANCHOR = new Date(2024, 6, 8); // 08.07.2024 — start of cycle 1

function generateCycles(): { start: string; end: string }[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cycles: { start: string; end: string }[] = [];
  let start = new Date(CYCLE_ANCHOR);

  while (true) {
    const end = getCycleEndDate(start);
    cycles.push({ start: formatDate(start), end: formatDate(end) });

    if (today <= end) {
      const nextStart = addDays(end, 1);
      const nextEnd   = getCycleEndDate(nextStart);
      cycles.push({ start: formatDate(nextStart), end: formatDate(nextEnd) });
      break;
    }

    start = addDays(end, 1);
  }

  return cycles;
}

const dateRanges = generateCycles();

const _today = new Date();
_today.setHours(0, 0, 0, 0);
const currentCycleIndex = dateRanges.findIndex(r => {
  const start = parseDate(r.start);
  const end   = parseDate(r.end);
  return _today >= start && _today <= end;
});
const initialIndex = currentCycleIndex >= 0 ? currentCycleIndex : dateRanges.length - 2;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Home() {
  const [calendarIndex, setCalendarIndex] = useState(initialIndex);

  const handlePagination = (direction: "prev" | "next") => {
    if (direction === "prev" && calendarIndex > 0) {
      setCalendarIndex(calendarIndex - 1);
    } else if (direction === "next" && calendarIndex < dateRanges.length - 1) {
      setCalendarIndex(calendarIndex + 1);
    }
  };

  return (
    <div
      className="font-[family-name:var(--font-geist-sans)]"
      style={{
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, marginBottom: '6px' }}>
        <div className="text-gray-700 font-semibold text-sm">
          13:20 day sequence
        </div>
        <div className="text-xl font-bold tracking-wide">
          TZOLK&apos;IN
        </div>
        <div className="text-gray-700 font-semibold text-sm">
          {dateRanges[calendarIndex].start} - {dateRanges[calendarIndex].end}
        </div>
      </div>

      {/* Calendar — fills all remaining vertical space */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <TzolkinCalendar dateRange={dateRanges[calendarIndex]} />
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', flexShrink: 0, marginTop: '6px' }}>
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
    </div>
  );
}
