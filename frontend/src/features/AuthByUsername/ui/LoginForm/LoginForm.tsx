import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import {ChangeEvent, memo, useCallback} from "react";
import { Text, TextTheme } from "@/shared/ui/Text/Text";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import { getLoginUsernameState } from "../../model/selectors/getLoginUsernameState/getLoginUsernameState";
import { getLoginPasswordState } from "../../model/selectors/getLoginPasswordState/getLoginPasswordState";
import { loginActions } from "../../model/slice/loginSlice";
import cls from "./LoginForm.module.scss";
import { getLoginState } from "../../model/selectors/getLoginState/getLoginState";


interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({className= ''}: LoginFormProps) => {

    const dispatch = useDispatch();
    const username = useSelector(getLoginUsernameState);
    const password = useSelector(getLoginPasswordState);

    const {isLoading,error} = useSelector(getLoginState);


    const onChangeUsername = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setUsername(event.target.value));
    }, [dispatch]);

    const onChangePassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(loginActions.setPassword(event.target.value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        // @ts-ignore
        return dispatch(loginByUsername({username, password}));
    },[dispatch, password, username]);

    return (
        <div className={classNames(cls.LoginForm,{},[className])}>
          <Text title={"Authorization Form"}/>
          {error && <Text text={error} theme={TextTheme.ERROR}/>}
             <Input
              autoFocus
              type="text"
              className={cls.input}
              placeholder={'username'}
              onChange={onChangeUsername}
              value={username}
             />
             <Input
              type="text"
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
                {'login'}
            </Button>
        </div>
    );
});


