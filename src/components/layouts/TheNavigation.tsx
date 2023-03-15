import { useRouter } from "next/router";

//Icons
import { ArrowRight } from "iconsax-react";

//Types
import { theNavigationProps } from "@/ts/types/layouts.type";

export default function TheNavigation({
  title,
  previousPage,
  isEnabledPreviousPage = true,
  isEnabledPreviousPageIcon = true,
}: theNavigationProps) {
  //Next
  const router = useRouter();

  //Functions
  function goPreviousPage() {
    if (previousPage && isEnabledPreviousPage) {
      router.push(previousPage);
    } else if (isEnabledPreviousPage) {
      router.back();
    }
  }

  return (
    <nav className="right-0 top-0 px-4 w-screen h-14 fixed bg-white dark:bg-gray-700 dark:text-white bg-opacity-50 dark:bg-opacity-25 backdrop-blur flex items-center z-10">
      <div
        className="text-lg flex items-end cursor-pointer"
        onClick={goPreviousPage}
      >
        {isEnabledPreviousPageIcon ? (
          <ArrowRight size={"20"} className="ml-1" />
        ) : null}
        <span className="font-semibold leading-none">{title}</span>
      </div>
    </nav>
  );
}
