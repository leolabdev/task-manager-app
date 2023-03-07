import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './CategorySection.module.scss'
import {AccordionSection} from "@/shared/ui/AccordionSection";
import {TaskCard, TaskPriority} from "@/entities/Task";
import {ICategory} from "@/entities/Category";
import {memo} from "react";


interface CategorySectionProps {
    className?: string;
    // tasks: ITask[];
    category: ICategory;
}



// export const CategorySection = ({className}: CategorySectionProps) => {
export const CategorySection = memo((props: CategorySectionProps) => {

    const {category,className} = props;

    return (
        <div className={classNames(cls.CategorySection, {}, [className])}>
            <AccordionSection className={cls.Category} title={category.taskCategoryName}>
                {category.tasks.map((task) => ( <TaskCard task={task} key={task._id} /> ))}
            </AccordionSection>
        </div>
    );
});
