import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import {Input, InputTheme} from "@/shared/ui/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import {ChangeEvent, memo, useCallback, useState} from "react";
import { Text, TextTheme } from "@/shared/ui/Text/Text";
import { loginByUsername } from "../../modelLogin/services/loginByUsername/loginByUsername";
import { getLoginUsernameState } from "../../modelLogin/selectors/getLoginUsernameState/getLoginUsernameState";
import { getLoginPasswordState } from "../../modelLogin/selectors/getLoginPasswordState/getLoginPasswordState";
import { loginActions } from "../../modelLogin/slice/loginSlice";
import cls from "./LoginForm.module.scss";
import { getLoginState } from "../../modelLogin/selectors/getLoginState/getLoginState";


interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({className= ''}: LoginFormProps) => {

    const dispatch = useDispatch();
    const username = useSelector(getLoginUsernameState);
    const password = useSelector(getLoginPasswordState);

    const {isLoading, error} = useSelector(getLoginState);

    const onChangeUsername = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setUsername(event.target.value));
    }, [dispatch]);

    const onChangePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setPassword(event.target.value));
    }, [dispatch]);

    const [lastError, setLastError] = useState('');

    const onLoginClick = useCallback(async (e) => {
        e.preventDefault();

        try {
            // @ts-ignore
            const result = await dispatch(loginByUsername({ username, password }));
            // Reset last error if login succeeds
            setLastError('');
            return result;
        } catch (error) {
            let newError;
            if (error && error.message) {
                newError = error.message;
            } else {
                newError = 'Server error, try again later';
            }
            if (newError !== lastError) {
                setLastError(newError);
            }
        }
    }, [dispatch, password, username, lastError]);


    if (error && lastError !== error) {
        setLastError(error);
    }


    return (

        <div className={classNames(cls.LoginForm,{},[className])}>
            <Text title={"Login Form"}/>
            {lastError && <Text text={lastError} theme={TextTheme.ERROR}/>}
            <Input
                // theme={InputTheme.BACKGROUND_INVERTED}
                autoFocus
                type="text"
                className={cls.input}
                placeholder={'username'}
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                // theme={InputTheme.BACKGROUND_INVERTED}
                type="password"
                className={cls.input}
                placeholder={'password'}
                onChange={onChangePassword}
                value={password}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                login
            </Button>
        </div>
    );
});

