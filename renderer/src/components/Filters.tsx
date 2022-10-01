import { BackspaceIcon, FilterIcon, XIcon } from "@heroicons/react/outline";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { DateFilter, GenericFilter } from "../routes/Home";
import { InferProcedures } from "../utils/trpc";
import { DateRangePicker } from "./DateRangePicker";

type Data = InferProcedures["rit"]["getAll"]["output"];
type SortKeys = keyof Omit<Data[0], "id">;

const Filters: React.FC<{
  headers: {
    key: SortKeys;
    label: string;
  }[];
  filters: (DateFilter | GenericFilter)[];
  setFilters: Dispatch<SetStateAction<(DateFilter | GenericFilter)[]>>;
}> = ({ filters, setFilters, headers }) => {
  const pingref = useRef<HTMLSpanElement>(null);
  // forgive me for this, I just wanted to make the thing work. does tailwind have a way to remove classes after an animation completes once?
  useEffect(() => {
    if (pingref.current) {
      pingref.current.classList.add("animate-ping-once");
      pingref.current.classList.remove("hidden");
      setTimeout(() => {
        if (pingref.current) {
          pingref.current.classList.remove("animate-ping-once");
          pingref.current.classList.add("hidden");
        }
      }, 300);
    }
  }, [filters.length]);
  return (
    <>
      <div className="flex justify-between align-baseline">
        <h2 className="text-2xl text-slate-100">
          Filters{" "}
          <FilterIcon className="inline-block h-6 w-6 text-slate-100/40" />
        </h2>
        <button
          className={`flex content-center items-baseline justify-center gap-1 rounded-full border-2 border-transparent bg-sky-800 py-2 px-3 text-base leading-normal text-sky-100 outline-none hover:bg-opacity-80 focus:ring-1 focus:ring-offset-2 active:ring-0 active:ring-offset-0 disabled:cursor-not-allowed disabled:bg-opacity-50`}
          onClick={() => {
            setFilters([]);
          }}
          disabled={filters.length <= 0}
        >
          <span>Alle</span>
          {filters.length > 0 && (
            <span className="relative inline-flex">
              <span className="flex rounded-full bg-sky-500 px-2 py-1 text-xs font-bold uppercase">
                {filters.length}
              </span>
              <span
                ref={pingref}
                className={`animate-ping-once absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75`}
              ></span>
            </span>
          )}
          <span className="font-semibold">filters verwijderen</span>
          <BackspaceIcon className="inline-block h-6 w-6 self-end text-sky-100" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {headers.map(({ key, label }) => {
          if (key === "date") {
            return (
              <DateRangePicker
                key={key}
                label={label}
                value={filters.find(({ kind }) => kind == "date")?.val || null}
                onChange={(newRange: any) => {
                  setFilters((old) => {
                    const withoutDate = old.filter(
                      ({ kind }) => kind !== "date"
                    );
                    return [...withoutDate, { kind: "date", val: newRange }];
                  });
                }}
                clear={() => {
                  setFilters((old) =>
                    old.filter(({ kind }) => kind !== "date")
                  );
                }}
              />
            );
          }
          return (
            <div key={key} className="flex flex-col gap-0.5">
              <span className="text-sm text-slate-100">{label}</span>
              <form
                className="group flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.target as HTMLFormElement);
                  // ewwww, type casting
                  const operator = data.get(`${key}-op`) as "lt" | "gt";
                  const num = parseFloat(data.get(`${key}-num`) as string);
                  if (operator && num) {
                    setFilters((old) => {
                      return [...old, { kind: key, val: { operator, num } }];
                    });
                  }
                }}
              >
                <select
                  name={`${key}-op`}
                  className="relative flex rounded-l-md border border-gray-300 bg-white p-1 pr-10 text-sm transition-colors group-focus-within:border-sky-600 group-hover:border-gray-400 group-focus-within:group-hover:border-sky-600"
                  style={{
                    // I wish I didn't have to override like this, because adding a class of "shadow-none" didn't work
                    boxShadow: "none",
                  }}
                >
                  <option value={"gt"}>Groter dan</option>
                  <option value={"lt"}>Kleiner dan</option>
                </select>
                <input
                  name={`${key}-num`}
                  type="number"
                  className="relative -ml-px flex w-16 border border-gray-300 bg-white p-1 shadow-none transition-colors focus:shadow-none group-focus-within:border-sky-600 group-hover:border-gray-400 group-focus-within:group-hover:border-sky-600"
                  style={{
                    // I wish I didn't have to override like this, because adding a class of "shadow-none" didn't work
                    boxShadow: "none",
                  }}
                />
                <button
                  type="submit"
                  className="-ml-px rounded-r-md border border-gray-300 bg-gray-50 px-2 text-sm outline-none transition-colors active:border-gray-400 active:bg-gray-200 group-focus-within:border-sky-600 group-hover:border-gray-400 group-focus-within:group-hover:border-sky-600"
                >
                  Instellen
                </button>
              </form>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-4">
        {filters.map(({ kind, val }, i) => {
          if (kind === "date") {
            return (
              <button
                key={i}
                className={`flex content-center items-center justify-center gap-1 rounded-full border-2 border-transparent bg-sky-500 py-0.5 px-1 text-base leading-normal text-sky-100 outline-none hover:bg-opacity-80 focus:ring-1 focus:ring-offset-2 active:ring-0 active:ring-offset-0 disabled:cursor-not-allowed disabled:bg-opacity-50`}
                onClick={() =>
                  setFilters((old) => old.filter(({ kind }) => kind !== "date"))
                }
              >
                <span className="text-sm text-sky-200">Datum:</span>
                <span className="text-sm font-semibold text-sky-100">
                  {val.start.day}-{val.start.month}-{val.start.year}{" "}
                  <span className="font-normal">tot</span> {val.end.day}-
                  {val.end.month}-{val.end.year}{" "}
                </span>
                <XIcon className="inline-block h-3 w-auto text-sky-100" />
              </button>
            );
          }
          return (
            <button
              key={i}
              className={`flex content-center items-center justify-center gap-1 rounded-full border-2 border-transparent bg-sky-500 py-0.5 px-1 text-base leading-normal text-sky-100 outline-none hover:bg-opacity-80 focus:ring-1 focus:ring-offset-2 active:ring-0 active:ring-offset-0 disabled:cursor-not-allowed disabled:bg-opacity-50`}
              onClick={() => {
                setFilters((old) => {
                  return old.filter((filter) => {
                    if (filter.kind == "date") return true;
                    const sameKind = filter.kind === kind;
                    const sameOp = filter.val.operator === val.operator;
                    const sameNum = filter.val.num === val.num;
                    return !(sameKind && sameOp && sameNum);
                  });
                });
              }}
            >
              <span className="text-sm text-sky-200">
                {headers.find((item) => item.key === kind)?.label}:
              </span>
              <span className="text-sm font-semibold text-sky-100">
                {val.operator === "lt" ? "Kleiner dan" : "Groter dan"} {val.num}
              </span>
              <XIcon className="inline-block h-3 w-auto text-sky-100" />
            </button>
          );
        })}
      </div>
    </>
  );
};

export { Filters };
