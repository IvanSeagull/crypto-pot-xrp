import { useAccount } from 'wagmi';
import styles from './styles.module.scss';
import UserCard from '../../components/User/UserCard';
import { getUser } from '../../utils/api/ApiController';
import { useEffect, useState } from 'react';
import DonateCon from '../../components/User/DonateCon';

interface UserPageProps {
  username: string;
}

const UserPage: React.FC<UserPageProps> = ({ username }) => {
  const { address } = useAccount();
  const [user, setUser] = useState<any>({});
  const fetchUser = () => {
    getUser(username).then((res) => {
      console.log(res.data);
      setUser(res.data);
    });
  };

  useEffect(() => {
    fetchUser();
  }, [username]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.userCardCon}>
        <div className="mainWrapper">
          <div className={styles.userCard}>
            {user && <UserCard username={user.username} wallet={(user.wallet as string) || ''} />}
            {address !== user.wallet && <DonateCon wallet={user?.wallet} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
