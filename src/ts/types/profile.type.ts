//Interfaces
import { IProfile } from "../interfaces/profile.interface";

export type theProfileProps = {};

export type changeMobileModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  mobile: string;
};
