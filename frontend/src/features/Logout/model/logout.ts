import {userActions} from "@/entities/User";
export const  logout = async (dispatch) => {
   await dispatch(userActions.logout());
};

