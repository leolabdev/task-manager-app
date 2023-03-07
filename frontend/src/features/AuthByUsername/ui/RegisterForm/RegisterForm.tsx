import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import {ChangeEvent, memo, useCallback, useState} from "react";
import { Text, TextTheme } from "@/shared/ui/Text/Text";
import { registerByUsername } from "../../modelRegister/services/registerByUsername/registerByUsername";
import { registerActions } from "../../modelRegister/slice/registerSlice";
import cls from "./RegisterForm.module.scss";
import { getRegisterState } from "../../modelRegister/selectors/getRegisterState/getRegisterState";
import {getRegisterUsernameState} from "../../modelRegister/selectors/getRegisterUsernameState/getRegisterUsernameState";
import {getRegisterPasswordState} from "../../modelRegister/selectors/getRegisterPasswordState/getRegisterPasswordState";


interface RegisterFormProps {
    className?: string;
}

export const RegisterForm = memo(({className= ''}: RegisterFormProps) => {

    const dispatch = useDispatch();
    const username = useSelector(getRegisterUsernameState);
    const password = useSelector(getRegisterPasswordState);

    const {isLoading, error} = useSelector(getRegisterState);
    const [lastError, setLastError] = useState('');

    const onChangeUsername = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(registerActions.setUsername(event.target.value));
    }, [dispatch]);

    const onChangePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(registerActions.setPassword(event.target.value));
    }, [dispatch]);

    const onRegisterClick = useCallback((e) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(registerByUsername({username, password}))
            .unwrap()
            .then(() => {
                setLastError('');
            })
            .catch((error) => {
                console.log(error);
                let newError;
                if (error && error.message) {
                    newError = error.message;
                } else {
                    newError = "Server error, try again later";
                }
                if (newError !== lastError) {
                    setLastError(newError);
                }
            });
    }, [dispatch, password, username, lastError]);

    if (error && lastError !== error) {
        setLastError(error);
    }

    return (
        <div className={classNames(cls.RegisterForm,{},[className])}>
            <Text title={"Register Form"}/>
            {lastError && <Text text={lastError} theme={TextTheme.ERROR}/>}
            <Input
                autoFocus
                type="text"
                className={cls.input}
                placeholder={'username'}
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                type="password"
                className={cls.input}
                placeholder={'password'}
                onChange={onChangePassword}
                value={password}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                className={cls.registerBtn}
                onClick={onRegisterClick}
                disabled={isLoading}
            >
                {'register'}
            </Button>
        </div>
    );
});
