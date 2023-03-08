import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './CategorySection.module.scss'
import {AccordionSection} from "@/shared/ui/AccordionSection";
import {TaskCard, TaskPriority} from "@/entities/Task";
import {ICategory} from "@/entities/Category";
import {memo, useCallback, useState} from "react";


interface CategorySectionProps {
    className?: string;
    // tasks: ITask[];
    category: ICategory;
}



// export const CategorySection = ({className}: CategorySectionProps) => {
export const CategorySection = memo((props: CategorySectionProps) => {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const onCollapse = useCallback(() => {
        setIsCollapsed(!isCollapsed);
    }, [isCollapsed]);


    const {category,className} = props;

    return (
        <div className={classNames(cls.CategorySection, {}, [className])}>
            <AccordionSection className={cls.Category} title={category.taskCategoryName} isCollapsed={isCollapsed} onCollapse={onCollapse}>
                <div className={cls.CategoryContent}>
                {category.tasks.map((task) => ( <TaskCard task={task} key={task._id} /> ))}
                </div>
            </AccordionSection>
        </div>
    );
});
