import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Input.module.scss'
import {FC, InputHTMLAttributes, ChangeEventHandler, memo} from "react";

export enum InputTheme {
    PRIMARY = "",
    CLEAR = "clear",
    CLEAR_INVERTED = "clearInverted",
    BACKGROUND_INVERTED = "backgroundInverted",
}

export enum InputSize {
    M = "sizeM",
    L = "sizeL",
    XL = "sizeXL",
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    className?: string;
    theme?: InputTheme;
    inputSize?: InputSize;
    disabled?: boolean;
}

export const Input: FC<InputProps> = memo((props) => {
    const {
        className = "",
        children,
        theme = InputTheme.PRIMARY,
        disabled = false,
        inputSize = InputSize.M,
        ...otherProps
    } = props;

    const mods: Record<string, boolean> = {
        [cls.disabled]: disabled,
    } as Record<string, boolean>;

    return (
        <input
            type="input"
            className={classNames(cls.Input, mods, [className, cls[theme], cls[inputSize]])}
            disabled={disabled}
            {...otherProps}
        />
    );
});

