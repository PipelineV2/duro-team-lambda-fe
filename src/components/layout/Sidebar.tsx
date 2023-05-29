import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import Typography from '@/components/text/Text';

import { NavMenu } from './constants';

import Duro from '~/svg/Duro.svg';

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
        'hover:bg-light-green hover:text-green mb-6 flex items-center gap-4 px-4 py-3',
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
  const TopNavMenu = useMemo(() => NavMenu.filter((item) => item.isTop), []);
  const BottomNavMenu = useMemo(
    () => NavMenu.filter((item) => !item.isTop),
    []
  );
  return (
    <nav className='border-r-grey5 flex h-screen max-h-screen basis-72 flex-col justify-between border-x bg-white p-6 pr-2.5'>
      <nav>
        <Link href='/' className='mb-20 flex'>
          <Duro className='text-[88px]' />
        </Link>
        {TopNavMenu.map((item) => {
          return <NavLinkItem {...item} key={item.text} />;
        })}
      </nav>
      <nav>
        {BottomNavMenu.map((item) => {
          return <NavLinkItem {...item} key={item.text} />;
        })}
      </nav>
    </nav>
  );
};

export default Sidebar;
