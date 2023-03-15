import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';
import {memo} from "react";

export enum TextTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    PRIMARY_INVERTED = 'primaryInverted',
    ERROR = 'error',
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
}

export const Text = memo((props: TextProps) => {
    const {
        className='',
        text,
        title,
        theme = TextTheme.PRIMARY,
    } = props;

    return (
        <div data-testid="text" className={classNames(cls.Text, {}, [className , cls[theme]])}>
            {title && <h3 data-testid="text-title" className={cls.title}>{title}</h3>}
            {text && <p data-testid="text-content" className={cls.text}>{text}</p>}
        </div>
    );
});
