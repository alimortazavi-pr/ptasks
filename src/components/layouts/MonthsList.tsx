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
              className={`w-12 h-12 ${month.color} rounded-xl flex items-center justify-center relative`}
            >
              {convertToPersian(month.num)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
