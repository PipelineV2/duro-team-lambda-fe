import * as React from 'react';

import Header from '@/components/layout/Header';

import Sidebar from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div className='min-h-screen w-screen bg-[#FBFBFB]'>
      <Sidebar />
      {/* <section className='sticky-[0px]  start-0  mx-auto w-full pl-72'> */}
      <Header />
      {/* </section> */}
      <section className='mx-auto  w-full max-w-screen-2xl pt-[227px] md:pl-72  md:pt-[175px]'>
        <section className=' flex-1 p-4'>
          <>{children}</>
        </section>
      </section>
    </div>
  );
}
