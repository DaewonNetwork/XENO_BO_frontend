"use client";

import React from "react";
import { AppModalType } from "../types/AppModal.type";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import DaumPostcode from "react-daum-postcode";
import { Button } from "@nextui-org/button";
import IconShared from "@/(FSD)/shareds/ui/IconShared";
import styles from "@/(FSD)/shareds/styles/AppStyle.module.scss";


interface AppPostcodeModalProps extends AppModalType {
    completeHandler: (data: any) => void;
};

const AppPostcodeModal = ({ isOpen, onOpenChange, completeHandler }: AppPostcodeModalProps) => {
    return (
        <Modal className={styles.postcode_modal} size={"md"} isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className={styles.modal_header}>
                            <TextMediumShared>우편번호 찾기</TextMediumShared>
                            <Button isIconOnly variant={"light"} size={"sm"} endContent={<IconShared iconType={"close"} />} onClick={onClose} />
                        </ModalHeader>
                        <ModalBody>
                            <DaumPostcode onClose={onClose} onComplete={completeHandler} />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AppPostcodeModal;