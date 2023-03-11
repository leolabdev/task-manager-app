import { useGetCategoriesQuery } from "@/entities/Category";
import { CategorySection } from "@/widgets/CategorySection";
import {Loader} from "@/shared/ui/Loader";
import {ExoticComponent, memo, SuspenseProps} from "react";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import {DeleteCategoryButton} from "@/features/DeleteCategoryById"
import cls from "./MainPage.module.scss";
import {UpdateCategoryButton} from "@/features/UpdateCategoryById";


const MainPage = memo(() => {

    const authData = useSelector(getUserAuthData);
    const { data: categoriesData, isLoading, error, isError} = useGetCategoriesQuery();

    if (isLoading) {
        return <Loader/>;
    }

    // @ts-ignore
    if (isError && error.data) {
        // @ts-ignore
        return <div>{error.data.message}</div>;
    }

    if(authData){
        return (
            <>
                {categoriesData.map((category) => (
                    <div key={category._id}>
                        <CategorySection key={category._id} category={category}/>
                    </div>
                ))
                }
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
