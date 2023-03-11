import {useGetCategoriesQuery} from "@/entities/Category";
import {CategorySection} from "@/widgets/CategorySection";
import {Loader} from "@/shared/ui/Loader";
import {memo} from "react";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import cls from "./MainPage.module.scss";

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

    const willBeImplemented = () => {
        alert('Will be implemented in the near future');
    }

    if(authData){
        return (
            <>

                <div className={cls.addsButtons}>
                <Button onClick={willBeImplemented} theme={ButtonTheme.OUTLINE}>Add new task</Button>
                <Button onClick={willBeImplemented} theme={ButtonTheme.OUTLINE}>Add new Category</Button>
                </div>
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
