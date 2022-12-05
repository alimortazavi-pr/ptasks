import Link from "next/link";
import { useRouter } from "next/router";

//Redux
import { useAppSelector } from "@/store/hooks";
import { userSelector } from "@/store/profile/selectors";

//Tools
import convertToPersian from "num-to-persian";

export default function YearsList() {
  //Redux
  const user = useAppSelector(userSelector);

  //Next
  const router = useRouter()

  return (
    <ul className="flex items-center gap-3 px-3 py-2 overflow-x-auto my-4">
      {user.years.length !== 0 ? (
        user.years.map((year) => (
          <li key={year}>
            <Link href={year} className={`border border-slate-400 ${router.query?.year == year ? 'bg-slate-200': ''} text-slate-700  font-semibold px-6 py-1 rounded-lg leading-none cursor-pointer`}>
              {convertToPersian(year)}
            </Link>
          </li>
        ))
      ) : (
        <li>
          شما هنوز تسکی ایجاد نکردید :)
        </li>
      )}
    </ul>
  );
}
