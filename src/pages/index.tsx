import { useEffect, useState } from "react";
import Link from "next/link";

//Components
import TheNavigation from "@/components/layouts/TheNavigation";
import YearsList from "@/components/layouts/YearsList";

//Tools
import convertToPersian from "num-to-persian";
import { ArrowLeft } from "iconsax-react";
import convertAPToEnglish from "ap-to-english";
import { Button } from "@chakra-ui/react";

export default function Index() {
  //States
  const [today, setToday] = useState<string>("");
  const [tomorrow, setTomorrow] = useState<string>("");

  //Effects
  useEffect(() => {
    //Today
    const dateSplit = new Date().toLocaleDateString("fa-IR").split("/");
    const year =
      dateSplit[0].toString().length < 2 ? `0${dateSplit[0]}` : dateSplit[0];
    const month =
      dateSplit[1].toString().length < 2 ? `0${dateSplit[1]}` : dateSplit[1];
    const day =
      dateSplit[2].toString().length < 2 ? `0${dateSplit[2]}` : dateSplit[2];
    setToday(convertToPersian(`${year}/${month}/${day}`));

    //Tomorrow
    const tomorrowDateSplit = new Date(
      new Date().getTime() + 24 * 60 * 60 * 1000
    )
      .toLocaleDateString("fa-IR")
      .split("/");
    const tomorrowYear =
      tomorrowDateSplit[0].toString().length < 2
        ? `0${tomorrowDateSplit[0]}`
        : tomorrowDateSplit[0];
    const tomorrowMonth =
      tomorrowDateSplit[1].toString().length < 2
        ? `0${tomorrowDateSplit[1]}`
        : tomorrowDateSplit[1];
    const tomorrowDay =
      tomorrowDateSplit[2].toString().length < 2
        ? `0${tomorrowDateSplit[2]}`
        : tomorrowDateSplit[2];
    setTomorrow(
      convertToPersian(`${tomorrowYear}/${tomorrowMonth}/${tomorrowDay}`)
    );
  }, []);

  return (
    <div>
      <TheNavigation title="سال ها" isEnabledPreviousPage={false} />
      <YearsList />
      <div className="w-full h-full flex flex-col items-center justify-center mt-14">
        <div>
          <span className="font-semibold text-3xl text-gray-600 mb-5">
            امروز
          </span>
        </div>
        <div className="mb-5">
          <span className="font-extrabold text-5xl text-gray-800">{today}</span>
        </div>
        <div className="mb-2 text-center">
          <Link
            href={convertAPToEnglish(
              `/${today.split("/")[0]}/${today.split("/")[1]}/${
                today.split("/")[2]
              }`
            )}
          >
            <Button colorScheme={"purple"} size="lg" variant={'outline'}>
              رفتن به امروز <ArrowLeft size={24} className="mr-1" />
            </Button>
          </Link>
        </div>
        <div className="text-center">
          <Link
            href={convertAPToEnglish(
              `/${tomorrow.split("/")[0]}/${tomorrow.split("/")[1]}/${
                tomorrow.split("/")[2]
              }`
            )}
          >
            <Button colorScheme={"purple"} size="lg">
              رفتن به فردا <ArrowLeft size={24} className="mr-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
