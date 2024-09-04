import type { ModalProps } from "@nextui-org/modal";

export interface AppModalType {
    isOpen: ModalProps["isOpen"];
    onOpenChange: ModalProps["onOpenChange"];
    isDetect?: boolean;
    size?: ModalProps["size"];
}