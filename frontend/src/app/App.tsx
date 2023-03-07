import { classNames } from "@/shared/lib/classNames/classNames";
import { AppRouter } from "./providers/router";
import {memo, Suspense, useEffect} from "react";
import {userActions} from "@/entities/User";
import {useDispatch} from "react-redux";
import {Navbar} from "@/widgets/Navbar";

const App = memo(() => {

    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(userActions.initAuthData())
        },
        [dispatch]);

    return(
        <div className={classNames("app", {}, [])}>
            {/*<Suspense fallback="">*/}
                <Navbar />
                <div className="content-page">
                    <AppRouter />
                </div>
            {/*</Suspense>*/}
        </div>
    )});
export default App;
