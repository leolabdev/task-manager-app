import {lazy} from "react";
import {useInitial} from "./useInitial"
// import {ComponentPreviews} from "./previews";

// const ComponentPreviews = React.lazy(() => import("./previews"));
// @ts-ignore
const ComponentPreviews = lazy(() => import("./previews"));

export {
    ComponentPreviews,
    useInitial
}
