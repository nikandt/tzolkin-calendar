import TzolkinCalendar from "./components/tzolkinCalendar.tsx";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">

        <TzolkinCalendar/>
      </main>
    </div>
  );
}
