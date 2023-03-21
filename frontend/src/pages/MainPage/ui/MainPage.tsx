import {useGetCategoriesQuery, useLazyGetCategoriesQuery} from "@/entities/Category";
import {CategorySection} from "@/widgets/CategorySection";
import {Loader} from "@/shared/ui/Loader";
import {memo, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import cls from "./MainPage.module.scss";
import {PostCategoryButton} from "@/features/PostNewCategory";
import {PostTaskButton} from "@/features/PostNewTask";


const MainPage = memo(() => {


    const authData = useSelector(getUserAuthData);
    const { data: categoriesData, isLoading, error, isError,refetch} = useGetCategoriesQuery();

    // const [triggerGetCategories, { isLoading, isError, data: categoriesData, error } ] = useLazyGetCategoriesQuery();

    useEffect(() => {

        //todo fix!!!
        if (authData && error) {
            window.location.reload();
        }
    }, [authData]);

    if (isLoading) {
        return <Loader/>;
    }

    // @ts-ignore
    if (isError) {
        // @ts-ignore
        return <div>{error.data.message}</div>;
    }

    if(authData){
        if(categoriesData)
        return (
            <>
                <div className={cls.addsButtons}>
                    <PostCategoryButton>Add new Category</PostCategoryButton>
                    <PostTaskButton>Add new Task</PostTaskButton>
                </div>
                <div className={cls.categorySections}>
                {categoriesData.map((category) => (
                    <div key={category._id}>
                        <CategorySection key={category._id} category={category}/>
                    </div>
                ))
                }
                </div>
            </>
        );
    }

    return (
        <>
            Please, log in to see your tasks.
        </>
    )


});

export default MainPage;
