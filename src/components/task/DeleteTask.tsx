import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

//Types
import { deleteTaskProps } from "@/ts/types/task.type";

//Redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteTask } from "@/store/task/actions";
import { darkModeSelector } from "@/store/layout/selectors";

//Tools
import { toast } from "react-toastify";
import { Trash } from "iconsax-react";

export default function DeleteTask({ task, tasks, setTasks }: deleteTaskProps) {
  //Redux
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(darkModeSelector);

  //Next
  const router = useRouter();

  //States
  const [isLoading, setIsLoading] = useState(false);

  //ChakraUI hooks
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Functions
  async function destroy() {
    setIsLoading(true);
    try {
      await dispatch(deleteTask(task._id));
      toast.success("تسک باموفقیت حذف شد", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTasks([...tasks.filter((t) => t._id !== task._id)]);
      setIsLoading(false);
    } catch (err: any) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
    }
  }
  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="auto">
      <PopoverTrigger>
        <Trash size="28" className="ml-4 text-red-500 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent
        bg={isDarkMode ? "#1f2937" : ""}
        borderColor={isDarkMode ? "#e5e7eb" : ""}
      >
        <PopoverArrow bg={isDarkMode ? "#1f2937" : ""} />
        <PopoverHeader>
          <span className="text-gray-800 dark:text-gray-200">حذف تسک</span>
        </PopoverHeader>
        <PopoverBody>
          <span className="mt-3 text-gray-800 dark:text-gray-200">
            آیا مطمئن هستید؟
          </span>
          <div className="flex items-center justify-center gap-2 my-2">
            <Button
              colorScheme={"green"}
              isLoading={isLoading}
              onClick={destroy}
              variant={isDarkMode ? "outline" : "solid"}
            >
              بله
            </Button>
            <Button
              variant={isDarkMode ? "outline" : "solid"}
              colorScheme={"red"}
              isLoading={isLoading}
              onClick={onClose}
            >
              خیر
            </Button>
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
