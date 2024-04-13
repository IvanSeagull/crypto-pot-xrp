import React from 'react';
import UserPage from '../../../src/screens/UserScreen';

const UserScreen = ({ params }: { params: { username: string } }) => {
  return <UserPage username={'seagull'} />;
};

export default UserScreen;
