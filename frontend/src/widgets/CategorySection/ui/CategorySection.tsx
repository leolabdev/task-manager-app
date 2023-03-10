import { useMemo, useCallback, useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./CategorySection.module.scss";
import { AccordionSection } from "@/shared/ui/AccordionSection";
import { TaskCard } from "@/entities/Task";
import { ICategory } from "@/entities/Category";
import {DeleteTaskButton} from "@/features/DeleteTaskById";
import {UpdateTaskButton} from "@/features/UpdateTaskById";

interface CategorySectionProps {
    className?: string;
    category: ICategory;
}

export const CategorySection = ({ className, category }: CategorySectionProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const onCollapse = useCallback(() => {
        setIsCollapsed(!isCollapsed);
    }, [isCollapsed]);

    //  the tasks array's memoization is necessary to prevent the TaskCard component from re-rendering
    const tasks = useMemo(() => category.tasks ?? [], [category.tasks]);



    return (
        <div className={classNames(cls.CategorySection, {}, [className])}>
            <AccordionSection
                className={cls.Category}
                title={`Category: ${category.taskCategoryName}`}
                isCollapsed={isCollapsed}
                onCollapse={onCollapse}
            >
                <div className={cls.categoryContent}>
                    {tasks.map((task) => (
                        <div key={task._id} className={cls.tasks}>
                            <TaskCard task={task} key={task._id} className={cls.taskCard} />
                            <DeleteTaskButton taskId={task._id} className={cls.deleteCard} />
                            {/*<UpdateTaskButton taskId={task._id}  />*/}
                        </div>
                    ))}
                </div>
            </AccordionSection>
        </div>
    );
};

