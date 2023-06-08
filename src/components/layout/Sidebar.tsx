import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/text/Text';

import { NavMenu } from './constants';

import CloseMenuIcon from '~/svg/CloseMenuIcon.svg';
import Duro from '~/svg/Duro.svg';
import MenuIcon from '~/svg/MenuIcon.svg';

const NavLinkItem = (props: (typeof NavMenu)[0]) => {
  const { link, icon: Icon, text } = props;
  const {
    pathname, // the value: "/question/[slug]"
  } = useRouter();
  const isActive = pathname.includes(link);

  return (
    <Link
      href={link}
      className={clsx(
        'hover:bg-light-green hover:text-green mb-2 flex items-center gap-4 px-4 py-3',
        isActive ? 'text-green bg-light-green' : 'text-gray1'
      )}
      key={text}
    >
      <Icon className='text-2xl' />
      <Typography variant='button'>{text}</Typography>
    </Link>
  );
};

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const TopNavMenu = useMemo(() => NavMenu.filter((item) => item.isTop), []);
  const BottomNavMenu = useMemo(
    () => NavMenu.filter((item) => !item.isTop),
    []
  );

  const handleClickButton = () => {
    setIsSidebarOpen((isOpen) => !isOpen);
  };

  return (
    <aside
      className={clsxm(
        'border-r-grey5 fixed z-40 flex h-screen max-h-screen w-72 flex-col justify-start border-x bg-white p-6 pr-2.5',
        [
          isSidebarOpen && 'translate-x-0',
          !isSidebarOpen && '-translate-x-full md:translate-x-0',
          'transition-all duration-300 ease-in-out',
        ]
      )}
    >
      <Link href='/' className='mb-3 inline-block md:mb-20'>
        <Duro className='text-green h-[33px] w-[88px]' />
      </Link>
      <button
        className={clsxm('fixed top-[45px] md:hidden', [
          !isSidebarOpen && 'right-[-30px] ',
          isSidebarOpen && 'right-[10px] ',
          'transition-all duration-300 ease-in-out',
        ])}
        onClick={handleClickButton}
      >
        {isSidebarOpen ? (
          <CloseMenuIcon className='text-2xl' />
        ) : (
          <MenuIcon className='text-2xl' />
        )}
      </button>
      <nav className='border-gray5 mb-2 border-b pb-6'>
        {TopNavMenu.map((item) => {
          return <NavLinkItem {...item} key={item.text} />;
        })}
      </nav>
      <nav>
        {BottomNavMenu.map((item) => {
          return <NavLinkItem {...item} key={item.text} />;
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
