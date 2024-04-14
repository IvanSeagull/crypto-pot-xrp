'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import Dashboard from '../src/screens/dashboard';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>RainbowKit App</title>
        <meta content="Generated by @rainbow-me/create-rainbowkit" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Dashboard />
    </div>
  );
};

export default Home;
