/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import clsxm from '@/lib/clsxm';
import useRedirectToDashboard from '@/hooks/useRedirectToDashboard';

import Button from '@/components/buttons';
import Typography from '@/components/text';

import UserImage from '~/images/userImage.png';
import Airplane from '~/svg/Airplane.svg';
import CloseMenuIcon from '~/svg/CloseMenuIcon.svg';
import DuroLogo from '~/svg/Duro.svg';
import MenuIcon from '~/svg/MenuIcon.svg';
import TrendArrow from '~/svg/TrendArrow.svg';

const navLink = [
  {
    label: 'Features',
    href: '/features',
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'Industries',
    href: '/industries',
  },
  {
    label: 'Resources',
    href: '/resources',
  },
];

export default function HomePage() {
  useRedirectToDashboard();

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const handleClickButton = () => {
    setIsSidebarOpen((isOpen) => !isOpen);
  };
  return (
    <div className='h-full min-h-screen w-full overflow-auto bg-[#010000] xl:overflow-hidden '>
      <section className='relative  mx-auto min-h-screen w-full max-w-screen-2xl p-4 md:h-screen lg:px-[72px] '>
        <div className='z-[10]'>
          <div
            className={clsxm(
              'mb-10 flex flex-col items-center justify-between gap-10 md:mb-0 md:h-[96px] lg:flex-row',
              [
                !isSidebarOpen ? 'gap-0' : 'gap-10 ',
                'transition-all duration-300 ease-in-out',
              ]
            )}
          >
            <div className='flex w-full items-center justify-between lg:w-auto'>
              <Link href='/'>
                <DuroLogo className=' mr-4 h-[28px]  w-[80px] text-white lg:h-[47px] lg:w-[120px]' />
              </Link>
              <button onClick={handleClickButton}>
                {isSidebarOpen ? (
                  <CloseMenuIcon className='text-2xl text-white md:hidden' />
                ) : (
                  <MenuIcon className='text-2xl text-white md:hidden' />
                )}
              </button>
            </div>
            <div
              className={clsxm('max-md:grid', [
                isSidebarOpen ? 'grid-rows-[1fr]' : 'max-md:grid-rows-[0] ',
                'transition-all duration-300 ease-in-out',
              ])}
            >
              <div
                className={clsxm(
                  'flex flex-col gap-[40px] md:flex-row lg:gap-[136px]',
                  'overflow-auto ',
                  'transition-all duration-300 ease-in-out'
                  // [isSidebarOpen ? 'overflow-auto' : 'overflow-hidden']
                )}
              >
                <div className='flex flex-col items-center justify-center gap-5 md:flex-row md:gap-[56px]'>
                  {navLink.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className='text-sm  leading-5 text-white'
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <div className='flex gap-4'>
                  <Link href='/login'>
                    <Button
                      text='Login'
                      onClick={() => undefined}
                      variant='text'
                      className='px-4 py-2.5 text-white hover:bg-none hover:text-black'
                    />
                  </Link>
                  <Button
                    text='Start Free Trial'
                    onClick={() => undefined}
                    variant='primary'
                    className='bg-[#46FACC] px-4 py-2.5 text-black'
                  />
                </div>
              </div>
            </div>
          </div>
          <section className='flex h-auto min-h-[calc(100vh-96px)] flex-col items-center gap-[100px] md:flex-row md:justify-between md:gap-[45px]'>
            <div className='z-[10] w-full max-w-[556px]'>
              <Typography
                variant='h1'
                className='mb-4 leading-[150%] text-white max-lg:text-[40px]'
              >
                Boost Customer Happiness, Improve Service Operations
              </Typography>
              <Typography
                variant='body2'
                className='mb-[48px] text-[16px] leading-[150%] text-white md:text-[20px]'
              >
                Transform your queue experience for customers with a system that
                provides virtual queues and analytics for effective queue
                management.
              </Typography>

              <div className='flex gap-4'>
                <Button
                  text='Start Free Trial'
                  onClick={() => undefined}
                  variant='primary'
                  className='bg-[#46FACC] p-4 text-black md:px-[51px] md:py-[18px]'
                />
                <Button
                  text='View Plans'
                  onClick={() => undefined}
                  variant='secondary'
                  className=' border-white p-4 text-white hover:text-black md:px-[51px] md:py-[18px]'
                />
              </div>
            </div>
            <div className='relative  '>
              <Image
                alt='girl thumbsup'
                src={UserImage}
                className=' h-full w-full object-cover md:w-[556px]'
                placeholder='blur'
              />
              <Airplane className='absolute left-[-51px] top-[-43px] h-[107px] w-[85px] md:left-[-130px] md:top-[-70px] md:h-[238px] md:w-[197px]' />
              <TrendArrow
                className='absolute  bottom-[-25px] left-[-47px] h-[50px]
              w-[100px] md:left-[-80px] md:h-[90px] md:w-[244px]
              '
              />
            </div>
          </section>
        </div>

        <div className='absolute bottom-[-112px] left-[102px] z-[0] h-[522px] w-[522px] rounded-full bg-[#43B296] blur-[375px] max-md:hidden'></div>
        <div className='absolute bottom-[-80px] left-[207px] z-[0] h-[522px] w-[522px] rounded-full bg-[#FFBB10] opacity-[0.65] blur-[375px] max-md:hidden'></div>
      </section>
    </div>
  );
}
