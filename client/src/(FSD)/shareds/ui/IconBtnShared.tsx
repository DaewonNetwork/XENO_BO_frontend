import { Button, ButtonProps } from "@nextui-org/button";
import React from "react";
import IconShared from "./IconShared";
import { IconType } from "../types/Icon.type";

interface IconBtnSharedProps extends ButtonProps {
    iconProps: IconType;
};

const IconBtnShared = ({ size = "sm", iconProps, ...props }: IconBtnSharedProps) => {
    return (
        <Button size={size} isIconOnly variant={"light"} {...props}>
            <IconShared iconType={iconProps.iconType} className={iconProps.className} iconSize={iconProps.iconSize} />
        </Button>
    );
};

export default IconBtnShared;