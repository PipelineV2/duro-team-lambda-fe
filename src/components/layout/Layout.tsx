import * as React from 'react';

import Header from '@/components/layout/Header';
import ProtectedPage from '@/components/protected-page';

import Sidebar from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <ProtectedPage>
      <div className='min-h-screen w-full bg-[#FBFBFB]'>
        <Sidebar />
        {/* <section className='sticky-[0px]  start-0  mx-auto w-full pl-72'> */}
        <Header />
        {/* </section> */}
        <section className='mx-auto  w-full max-w-screen-2xl pt-[227px] md:pt-[175px]  lg:pl-72'>
          <section className='  p-4'>
            <>{children}</>
          </section>
        </section>
      </div>
    </ProtectedPage>
  );
}
