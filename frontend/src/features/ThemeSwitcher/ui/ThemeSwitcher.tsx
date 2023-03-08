// import { classNames } from "@/shared/lib/classNames/classNames";
// import { Theme, useTheme } from "@/app/providers/ThemeProvider";
// import DarkIcon from "@/shared/assets/icons/moon.svg";
// import LightIcon from "@/shared/assets/icons/sun.svg";
// import MatrixIcon from "@/shared/assets/icons/matrix.svg";
// import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
// import {memo} from "react";
//
//
// const themes = [
//     { name: "light", icon: <LightIcon />, value: Theme.LIGHT },
//     { name: "dark", icon: <DarkIcon />, value: Theme.DARK },
//     { name: "matrix", icon: <MatrixIcon />, value: Theme.MATRIX },
// ];
//
// interface ThemeSwitcherProps {
//     className?: string;
// }
//
// export const ThemeSwitcher = memo(({ className= '' }: ThemeSwitcherProps) => {
//     const { theme, changeTheme } = useTheme();
//
//     return (
//         <Button
//             theme={ButtonTheme.BACKGROUND_INVERTED}
//             className={classNames("", {}, [className])}
//             // @ts-ignore
//             onClick={() => changeTheme(Theme.LIGHT)}
//         >
//             {theme === Theme.DARK ?<DarkIcon /> :  <LightIcon />}
//         </Button>
//     );
// });

import { classNames } from "@/shared/lib/classNames/classNames";
import { Theme, useTheme } from "@/app/providers/ThemeProvider";
import DarkIcon from "@/shared/assets/icons/moon.svg";
import LightIcon from "@/shared/assets/icons/sun.svg";
import MatrixIcon from "@/shared/assets/icons/matrix.svg";
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button/Button";
import { memo } from "react";
import csl from "./ThemeSwitcher.module.scss";


const themes = [
    { name: "light", icon: <LightIcon />, value: Theme.LIGHT },
    { name: "dark", icon: <DarkIcon />, value: Theme.DARK },
    { name: "matrix", icon: <MatrixIcon />, value: Theme.MATRIX },
];

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className = "" }: ThemeSwitcherProps) => {
    const { theme, changeTheme } = useTheme();

    const handleClick = (newTheme: Theme) => {
        if (newTheme !== theme) {
            // @ts-ignore
            changeTheme(newTheme);
        }
    };

    return (
        <div className={classNames('', {}, [className])}>
            {themes.map(({ name, icon, value }) => (
                <Button
                    square
                    size={ButtonSize.XL}
                    key={name}
                    theme={ButtonTheme.BACKGROUND_INVERTED}
                    className={classNames(csl.themeButton) }
                    onClick={() => handleClick(value)}
                >
                    {icon}
                </Button>
            ))}
        </div>
    );
});
