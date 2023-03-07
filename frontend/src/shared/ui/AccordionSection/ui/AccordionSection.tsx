import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './AccordionSection.module.scss'
import {FC, memo, ReactNode} from "react";
import {Button, ButtonSize} from "@/shared/ui/Button/Button";
import {Text, TextTheme} from "@/shared/ui/Text/Text";

interface AccordionSectionProps {
    className?: string;
    isCollapsed?: boolean;
    onClose?: () => void;
    title?: string;
    children?: ReactNode;
}

export const AccordionSection: FC<AccordionSectionProps> = memo(({className='', isCollapsed , onClose, title='Here is title', children}: AccordionSectionProps) => {

    return (
        <div className={classNames(cls.AccordionSection, {}, [className])}>
            <div className={cls.accordionHeader}>
                {/*<h3>{   title}</h3>*/}
                <Text  theme={TextTheme.PRIMARY} title={title}/>

                <Button square size={ButtonSize.L}>{isCollapsed ? "x" : "->"}</Button>
            </div>
            {children}
        </div>
    );
});
