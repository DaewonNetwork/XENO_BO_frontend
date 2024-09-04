"use client";

import { Modal, ModalBody, ModalContent } from "@nextui-org/modal";
import React from "react";
import styles from "@/(FSD)/shareds/styles/AppStyle.module.scss";
import { AppModalType } from "../types/AppModal.type";
import { Spinner } from "@nextui-org/spinner";

interface AppLoadingModalProps extends AppModalType {};

const AppLoadingModal = ({ isDetect, onOpenChange, size = "full" }: AppLoadingModalProps) => {
    return (
        <Modal className={styles.loading_modal} size={size} isOpen={isDetect} onOpenChange={onOpenChange} hideCloseButton={true}>
            <ModalContent>
                <ModalBody className={styles.modal_body}>
                    <Spinner size={"lg"} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AppLoadingModal;