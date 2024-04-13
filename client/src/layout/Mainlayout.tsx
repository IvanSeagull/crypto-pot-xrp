'use client';
import React from 'react';
import Navbar from '../components/global/Navbar';
import PageWrapper from '../components/global/PageWrapper';

const MainLayout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      <PageWrapper>{children}</PageWrapper>
    </div>
  );
};

export default MainLayout;
