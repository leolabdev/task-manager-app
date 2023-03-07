import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { useCallback, useState } from "react";
import {LoginModal} from "@/features/AuthByUsername";
import {useDispatch, useSelector} from "react-redux";
import {getUserAuthData, userActions} from "@/entities/User";
import cls from "./Navbar.module.scss";
import {ThemeSwitcher} from "@/features/ThemeSwitcher";

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className = "" }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
      setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
    dispatch(userActions.logout());
    }, [dispatch]);


    if(authData) {
      return(
        <div className={classNames(cls.Navbar, {}, [className])}>
            <ThemeSwitcher/>
            <Button
            theme={ButtonTheme.CLEAR_INVERTED}
            className={cls.links}
            onClick={onLogout}
        >
            {"Log out"}
        </Button>
      </div>
      )}

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <ThemeSwitcher/>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onShowModal}
            >
                {"login"}
            </Button>
           <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </div>
    );
};
