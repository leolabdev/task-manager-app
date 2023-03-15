import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Loader.module.scss";
import {memo} from "react";

interface LoaderProps {
    className?: string;
}

export const Loader = memo(({ className = ''  }: LoaderProps) => (
    <div className={classNames(cls.Loader, {}, [className])}>
        {/* <div className={cls.ldsRing}> */}
        <div />
        <div />
        <div />
        <div />
        {/* </div> */}
    </div>
));
