import React from 'react';
import { observer } from 'mobx-react-lite';
import Input from '@components/Input';
import Button from '@components/Button';
import Text from '@components/Text';
import { useUserStore } from '@store/hooks/globalStores';
import { useStores } from '@store/globals/root/RootProvider';
import s from './SingInTo.module.scss';


const SingInTo: React.FC = observer(() => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const user = useUserStore();

   const { store } = useStores();

   console.log(store)

  return (
    <>
      {!user.hasToken && (
        <div className={s.singInTo}>
          <Input
            className={s.singInTo__input}
            placeholder={'Enter login'}
            onChange={(value) => setLogin(value)}
          />
          <Input
            className={s.singInTo__input}
            placeholder={'Enter password'}
            onChange={(value) => setPassword(value)}
            type="password"
          />
          {user.isError && <Text className={s.errorText}>Check the entered data</Text>}
          <Button
            className={s.singInTo__button}
            onClick={() => {
              user.entrance(login, password);
            }}
          >
            Log In
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
