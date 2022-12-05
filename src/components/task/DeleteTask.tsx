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
import { useAppDispatch } from "@/store/hooks";
import { deleteTask } from "@/store/task/actions";

//Tools
import { toast } from "react-toastify";
import { Trash } from "iconsax-react";

export default function DeleteTask({ task, tasks, setTasks }: deleteTaskProps) {
  //Redux
  const dispatch = useAppDispatch();

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
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>حذف تسک</PopoverHeader>
        <PopoverBody>
          <span className="mt-3">آیا مطمئن هستید؟</span>
          <div className="flex items-center justify-center gap-2 my-2">
            <Button
              colorScheme={"green"}
              isLoading={isLoading}
              onClick={destroy}
            >
              بله
            </Button>
            <Button colorScheme={"red"} isLoading={isLoading} onClick={onClose}>
              خیر
            </Button>
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
