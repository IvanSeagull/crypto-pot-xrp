'use client';
import React from 'react';
import UserPage from '../../../src/screens/UserScreen';
import { useRouter } from 'next/router';

export default function Page({ params }: { params: { username: string } }) {
  const router = useRouter();
  const { username } = router.query;
  if (!username || typeof username !== 'string') return null;
  return <UserPage username={username} />;
}
