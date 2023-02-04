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
            className="rounded-2xl bg-gray-200 flex items-center justify-between px-2 py-2"
          >
            <span className="leading-none font-semibold">{month.title}</span>
            <span
              className={`w-12 h-12 ${
                month.num === "1" || month.num === "2" || month.num === "3"
                  ? "bg-teal-300"
                  : month.num === "4" || month.num === "5" || month.num === "6"
                  ? "bg-orange-400"
                  : month.num === "7" || month.num === "8" || month.num === "9"
                  ? "bg-amber-300"
                  : "bg-cyan-300"
              } rounded-xl flex items-center justify-center relative`}
            >
              {convertToPersian(month.num)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
