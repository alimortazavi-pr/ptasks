import Link from "next/link";
import { IconButton } from "@chakra-ui/react";

//Components
import { Add, Home } from "iconsax-react";
import ProfileTabIcon from "./ProfileTabIcon";

export default function TabBar() {
  return (
    <div className="px-4 w-screen h-14 fixed bottom-6 flex items-center justify-center">
      <ul className="flex items-center gap-x-7 h-full bg-gray-500 bg-opacity-50 backdrop-blur-xl px-7 rounded-2xl">
        <li>
          <Link href={"/"}>
            <Home size="20" className="text-white" />
          </Link>
        </li>
        <li>
          <Link
            href={"/create-task"}
            className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-violet-500 to-pink-500 flex items-center justify-center"
          >
            <IconButton
              borderRadius="1rem"
              backgroundImage={
                "linear-gradient(to top right, #a855f7 , #ec4899)"
              }
              colorScheme="pink"
              aria-label="Create task"
              icon={<Add size="20" className="text-white" />}
            />
          </Link>
        </li>
        <ProfileTabIcon />
      </ul>
    </div>
  );
}
