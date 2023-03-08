import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './AccordionSection.module.scss'
import {FC, memo, ReactNode, useState} from "react";
import {Button, ButtonSize} from "@/shared/ui/Button/Button";
import {Text, TextTheme} from "@/shared/ui/Text/Text";

export interface AccordionSectionProps {
    className?: string;
    isCollapsed?: boolean;
    onCollapse?: () => void;
    title?: string;
    children?: ReactNode;
}

export const AccordionSection: FC<AccordionSectionProps> = memo(({className='', isCollapsed=false, onCollapse, title='Here is title', children}: AccordionSectionProps) => {

    const [collapsed, setCollapsed] = useState(isCollapsed);

    const handleCollapse = () => {
        setCollapsed(!collapsed);
        onCollapse && onCollapse();
    };

    const mods = {
        [cls.collapsed]: collapsed,
    }

    const wrapperOnClick = collapsed ? handleCollapse : undefined;

    return (
        <div onClick={wrapperOnClick} className={classNames(cls.AccordionSection, mods, [className])}>
            <div className={cls.accordionHeader} onClick={handleCollapse}>
                <Text theme={TextTheme.PRIMARY} title={title}/>
                <Button square onClick={handleCollapse} size={ButtonSize.L}>{collapsed ? "⇣" : "⇡"}</Button>
            </div>
            <div onClick={handleCollapse} className={classNames(cls.marginDiv, { [cls.unCollapsed]: !collapsed})}></div>
            <div className={classNames(cls.accordionContent, mods)}>
                {children}
            </div>
        </div>
    );
});
