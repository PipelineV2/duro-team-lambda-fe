import * as React from 'react';

import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div className='min-h-screen w-screen bg-[#FBFBFB]'>
      <section className='mx-auto flex w-full max-w-screen-2xl'>
        <Sidebar />
        <section className='border-r-grey5 flex-1 border-r'>
          <Header />
          <>{children}</>
        </section>
      </section>
    </div>
  );
}
