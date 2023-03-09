import React from "react";
import {useInitial} from "./useInitial"

// @ts-ignore
const ComponentPreviews = React.lazy(() => import("./previews"));

export {
    ComponentPreviews,
    useInitial
}
