"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import FormInputShared from "@/(FSD)/shareds/ui/FormInputShared";
import PasswordInputShared from "@/(FSD)/shareds/ui/PasswordInputShared";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { z } from "zod";
import styles from "@/(FSD)/shareds/styles/AuthStyle.module.scss";
import { UserType } from "@/(FSD)/shareds/types/User.type";
import { useAuthSignin } from "../api/useAuthSignin";
import TextMediumShared from "@/(FSD)/shareds/ui/TextMediumShared";
import Link from "next/link";
import TextSmallShared from "@/(FSD)/shareds/ui/TextSmallShared";
import { useDisclosure } from "@nextui-org/modal";
import TextXSmallShared from "@/(FSD)/shareds/ui/TextXSmallShared";
import AppLoadingModal from "@/(FSD)/widgets/app/ui/AppLoadingModal";
import AppErrorModal from "@/(FSD)/widgets/app/ui/AppErrorModal";

const AuthSigninForm = () => {

    const [userData, setUserData] = useState<UserType | null>(null);

    const schema = z.object({
        email: z.string( {
            message: "알맞은 이메일 주소를 입력해주세요."
        }),
        password: z.string( {
            message: "알맞은 비밀번호를 입력해주세요."
        })
    });

    const { control, handleSubmit, formState: { errors, isValid, submitCount } } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    const router = useRouter();

    const onSuccess = (data: any) => {
        if (!userData) return;

        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);

        router.push("/");
    }

    const { mutate, isError, isPending } = useAuthSignin({ onSuccess });

    const onSubmit = (data: any) => {
        if ((!data.email) || (!data.password)) return;

        const user: any = {
            email: data.email,
            password: data.password
        };

        setUserData(user);

        mutate(user);
    };

    const { isOpen: errorModalIsOpen, onOpen: errorModalOnOpen, onOpenChange: errorModalOnOpenChange } = useDisclosure();
    const { isOpen: loadingModalIsOpen, onOpenChange: loadingModalOnOpenChange } = useDisclosure();

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.input_box}>
                    <TextMediumShared isLabel htmlFor={"email"}>이메일</TextMediumShared>
                    <FormInputShared isClearable autoFocus={true} size={"lg"} variant={"underlined"} isInvalid={!!errors.email} radius={"none"} errorMessage={errors.email && <TextXSmallShared>{String(errors.email.message)}</TextXSmallShared>} name={"email"} control={control} placeholder={"이메일을 입력해주세요."} />
                </div>
                <div className={styles.input_box}>
                    <TextMediumShared isLabel htmlFor={"password"}>비밀번호</TextMediumShared>
                    <PasswordInputShared size={"lg"} variant={"underlined"} isInvalid={!!errors.password} radius={"none"} errorMessage={errors.password && <TextXSmallShared>{String(errors.password.message)}</TextXSmallShared>} name={"password"} control={control} placeholder={"비밀번호를 입력해주세요."} />
                </div>
                <Button isDisabled={(!isValid) || (submitCount >= 5)} type={"submit"} variant={"solid"} color={(!isValid) || (submitCount >= 5) ? "default" : "primary"} size={"lg"} radius={"sm"} fullWidth>로그인</Button>
            </form>
            <AppErrorModal errorMessage={"로그인 정보를 확인해주세요."} isDetect={isError} isOpen={errorModalIsOpen} onOpen={errorModalOnOpen} onOpenChange={errorModalOnOpenChange} />
            <AppLoadingModal isDetect={isPending} isOpen={loadingModalIsOpen} onOpenChange={loadingModalOnOpenChange} />
        </>
    );
};

export default AuthSigninForm;