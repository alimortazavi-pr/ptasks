import Link from "next/link";
import { useRouter } from "next/router";

//Tools
import convertToPersian from "num-to-persian";

//ts
import months from "@/assets/ts/months";

export default function MonthsList() {
  //Next
  const router = useRouter();
  return (
    <ul className="grid grid-cols-12 gap-3 px-3">
      {months.map((month) => (
        <li key={month.num} className="col-span-6">
          <Link
            href={`/${router.query.year}/${month.num}`}
            className="rounded-2xl bg-gray-200 dark:bg-gray-800 flex items-center justify-between px-2 py-2"
          >
            <span className="leading-none font-semibold text-gray-800 dark:text-gray-200">
              {month.title}
            </span>
            <span
              className={`w-12 h-12 ${
                month.num === "1" || month.num === "2" || month.num === "3"
                  ? "bg-teal-300 dark:bg-teal-600"
                  : month.num === "4" || month.num === "5" || month.num === "6"
                  ? "bg-orange-400 dark:bg-orange-800"
                  : month.num === "7" || month.num === "8" || month.num === "9"
                  ? "bg-amber-300 dark:bg-amber-600"
                  : "bg-cyan-300 dark:bg-cyan-600"
              } rounded-xl flex items-center justify-center relative font-semibold text-gray-800 dark:text-gray-200`}
            >
              {convertToPersian(month.num)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
