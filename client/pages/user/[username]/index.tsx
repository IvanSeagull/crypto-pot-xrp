'use client';
import React from 'react';
import UserPage from '../../../src/screens/UserScreen';

export default function Page({ params }: { params: { username: string } }) {
  return <UserPage username={'seagull'} />;
}
