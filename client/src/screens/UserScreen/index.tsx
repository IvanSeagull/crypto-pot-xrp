import { useAccount } from 'wagmi';
import styles from './styles.module.scss';
import UserCard from '../../components/User/UserCard';

interface UserPageProps {
  username: string;
}

const UserPage: React.FC<UserPageProps> = ({ username }) => {
  const { address } = useAccount();
  return (
    <div className={styles.wrapper}>
      <div className={styles.userCardCon}>
        <div className="mainWrapper">
          <div className={styles.userCard}>
            <UserCard username={username} wallet={(address as string) || ''} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
