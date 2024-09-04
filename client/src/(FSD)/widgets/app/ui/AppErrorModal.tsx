"use client";

import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import React, { useEffect } from "react";
import styles from "@/(FSD)/shareds/styles/AppStyle.module.scss";
import TextLargeShared from "@/(FSD)/shareds/ui/TextLargeShared";
import { AppModalType } from "../types/AppModal.type";

interface AppErrorModalProps extends AppModalType {
    errorMessage: string;
    onOpen: () => void;
};

const AppErrorModal = ({ isDetect, isOpen, onOpen, onOpenChange, errorMessage, size = "sm" }: AppErrorModalProps) => {
    
    useEffect(() => {
        if (isDetect) {
            onOpen();
        }
    }, [isDetect]);

    return (
        <Modal className={styles.error_modal} size={size} isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className={styles.modal_header}>
                            <TextLargeShared fontWeight={"semibold"}>다시 한번 확인해주세요.</TextLargeShared>
                            <TextMediumShared>{errorMessage}</TextMediumShared>
                        </ModalHeader>
                        <ModalFooter>
                            <Button onClick={onClose}>닫기</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AppErrorModal;