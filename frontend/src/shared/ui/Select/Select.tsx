import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Select.module.scss'
import {FC, memo, SelectHTMLAttributes} from "react";

export enum SelectTheme {
    PRIMARY = "",
    CLEAR = "clear",
    CLEAR_INVERTED = "clearInverted",
    BACKGROUND_INVERTED = "backgroundInverted",
}

export enum SelectSize {
    M = "sizeM",
    L = "sizeL",
    XL = "sizeXL"
}

export interface ISelectOption {
    label: string;
    value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    className?: string;
    theme?: SelectTheme;
    selectSize?: SelectSize;
    disabled?: boolean;
    options: Array<ISelectOption>;
}

export const Select: FC<SelectProps> = memo((props) => {
    const {
        className = "",
        children,
        theme = SelectTheme.PRIMARY,
        disabled = false,
        selectSize = SelectSize.M,
        options,
        ...otherProps
    } = props;

    const mods: Record<string, boolean> = {
        [cls.disabled]: disabled,
    } as Record<string, boolean>;

    return (
        <select
            className={classNames(cls.Select, mods, [className, cls[theme], cls[selectSize]])}
            disabled={disabled}
            {...otherProps}
        >
            {options.map((option) => (
                <option value={option.value} key={option.value}>{option.label}</option>
            ))}
        </select>
    );
});
