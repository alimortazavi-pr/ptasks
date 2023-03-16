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
  const router = useRouter();

  return (
    <ul className="flex items-center justify-center gap-3 px-3 py-3 overflow-x-auto my-3 border border-gray-800 dark:border-gray-500 rounded-2xl mx-2">
      {user.years.length !== 0 ? (
        user.years.map((year) => (
          <li key={year}>
            <Link
              href={year}
              className={`border border-gray-400 dark:border-gray-300 ${
                router.query?.year == year ? "bg-gray-200 dark:bg-gray-800" : ""
              } text-gray-800 dark:text-gray-200  font-semibold px-6 py-1 rounded-lg leading-none cursor-pointer`}
            >
              {convertToPersian(year)}
            </Link>
          </li>
        ))
      ) : (
        <li className="text-gray-800 dark:text-gray-200">
          شما هنوز تسکی ایجاد نکردید :)
        </li>
      )}
    </ul>
  );
}
