"use client";

import React, { useState } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { AppModalType } from "@/(FSD)/widgets/app/types/AppModal.type";
import { UserCustomerInfo } from "@/(FSD)/shareds/types/manager/UserCustomerInfo.type";
import { usePointUpdateUser } from "../api/usePointUpdateUser";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import IconBtnShared from "@/(FSD)/shareds/ui/IconBtnShared";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";

interface PointModalProps extends AppModalType {
    user: UserCustomerInfo;
};

const PointModal = ({ isOpen, onOpenChange, user }: PointModalProps) => {
    const { updatePoint } = usePointUpdateUser();

    const schema = z.object({
        point: z.string()
    });

    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const onSubmit = async (data: any) => {
        try {
            const result = await updatePoint({ userId: user.userId, newPoint: +data.point });
            alert('적립금이 성공적으로 업데이트되었습니다.');
        } catch (error) {
            console.error('적립금 업데이트 중 오류 발생:', error);
            if (error instanceof Error) {
                alert(`적립금 업데이트 중 오류 발생: ${error.message}`);
            } else {
                alert('적립금 업데이트 중 알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    return (
        <Modal size={"md"} isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <TextMediumShared>적립금 수정</TextMediumShared>
                            <IconBtnShared onClick={onClose} iconProps={{ iconType: "close" }} />
                        </ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormInputShared name={"point"} control={control} type={"number"} min="0" />
                                <Button type={"submit"}>수정</Button>
                            </form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default PointModal;