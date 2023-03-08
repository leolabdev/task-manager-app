import {classNames} from "@/shared/lib/classNames/classNames";
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import {memo, useCallback, useState} from "react";
import {AuthModal} from "@/features/AuthByUsername";
import {useDispatch, useSelector} from "react-redux";
import {getUserAuthData, getUserUserData, userActions} from "@/entities/User";
import cls from "./Navbar.module.scss";
import {ThemeSwitcher} from "@/features/ThemeSwitcher";
import {Text, TextTheme} from "@/shared/ui/Text/Text";
import {logout} from "@/features/Logout";
import {loginActions} from "@/features/AuthByUsername/modelLogin/slice/loginSlice";
import {registerActions} from "@/features/AuthByUsername/modelRegister/slice/registerSlice";


interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className = "" }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const user = useSelector(getUserUserData);

    const dispatch = useDispatch();
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
        dispatch(loginActions.clearForm());
        dispatch(registerActions.clearForm());
    }, []);

    const onShowModal = useCallback(() => {
      setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(async () => {
        await logout(dispatch);
    }, [dispatch]);


    if(authData) {
      return(
        <nav className={classNames(cls.Navbar, {}, [className])}>
            <ThemeSwitcher/>

            <div className={cls.linksLogged}>
                {user && <Text text={user.username}  className={cls.username}/>}
                <Button
                    theme={ButtonTheme.CLEAR}
                    onClick={onLogout}
                >
                    {"Log out"}
                </Button>
            </div>

      </nav>
      )}

    return (
        <nav className={classNames(cls.Navbar, {}, [className])}>
            <ThemeSwitcher className={cls.themeBlock}/>
            <Button
                theme={ButtonTheme.CLEAR}
                className={cls.links}
                onClick={onShowModal}
            >
                {"Login/Register"}
            </Button>
           <AuthModal isOpen={isAuthModal} onClose={onCloseModal} />
        </nav>
    );
});
