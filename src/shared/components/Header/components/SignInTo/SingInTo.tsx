import React from "react";
import { observer } from "mobx-react-lite";
import Input from "@components/Input";
import Button from "@components/Button";
import Text from "@components/Text";
import { useFavoritesStore, useLogInStore, useUserStore } from "@store/hooks/globalStores";
import s from "./SingInTo.module.scss";

const SingInTo: React.FC = observer(() => {
  const [login, setLogin] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [register, setRegister] = React.useState<boolean>(false);
  const [loginRegister, setLoginRegister] = React.useState<string>("");
  const [passwordRegister, setPasswordRegister] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [registerResult, setRegisterResult] = React.useState<boolean | undefined>(undefined);
  const user = useUserStore();
  const logIn = useLogInStore();
  const favorites = useFavoritesStore();

  return (
    <>
      {!user.hasToken && !register && (
        <div className={s.singInTo}>
          <Input
            className={s.singInTo__input}
            placeholder={"Enter login"}
            onChange={(value) => setLogin(value)}
          />
          <Input
            className={s.singInTo__input}
            placeholder={"Enter password"}
            onChange={(value) => setPassword(value)}
            type="password"
          />
          {user.isError && <Text className={s.errorText}>Check the entered data</Text>}
          <Button
            className={s.singInTo__button}
            onClick={() => {
              user.entrance(login, password);
              favorites.fetchRecipes();
            }}
          >
            Log In
          </Button>
          <Button
            className={s.singInTo__button}
            onClick={() => {
              setRegister(true);
            }}
          >
            Register
          </Button>
        </div>
      )}
      {!user.hasToken && register && (
        <div className={s.singInTo}>
          <Input
            className={s.singInTo__input}
            placeholder={"Enter login"}
            onChange={(value) => setLoginRegister(value)}
            disabled={registerResult === true}
          />
          <Input
            className={s.singInTo__input}
            placeholder={"Enter email"}
            onChange={(value) => setEmail(value)}
            disabled={registerResult === true}
          />
          <Input
            className={s.singInTo__input}
            placeholder={"Enter password"}
            onChange={(value) => setPasswordRegister(value)}
            type="password"
            disabled={registerResult === true}
          />
          {registerResult === false && <Text className={s.errorText}>Check the entered data</Text>}
          <Button
            className={s.singInTo__button}
            onClick={async () => {
              await logIn.fetchRecipes({
                username: loginRegister,
                email: email,
                password: passwordRegister,
              });
              setRegisterResult(logIn.isResult);
            }}
          >
            Register
          </Button>
          {registerResult === true && (
            <Text className={s.errorText}>Registration was successful, log in</Text>
          )}
          <Button
            className={s.singInTo__button}
            onClick={() => {
              setRegister(false);
              setRegisterResult(undefined);
            }}
          >
            Log in
          </Button>
        </div>
      )}
      {user.hasToken && (
        <div className={s.singInTo}>
          <Text className={s.text}>{`${user.userName}, you are logged in`}</Text>
          <Button className={s.singInTo__button} onClick={user.exit}>
            Exit
          </Button>
        </div>
      )}
    </>
  );
});

export default SingInTo;
