import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import Typography from '@/components/text/Text';

import CalenderIcon from '~/svg/CalenderIcon.svg';
import DashboardIcon from '~/svg/DashboardIcon.svg';
import Duro from '~/svg/Duro.svg';
import QuestionIcon from '~/svg/QuestionIcon.svg';
import QueueIcon from '~/svg/QueueIcon.svg';
import SettingsIcon from '~/svg/SettingsIcon.svg';

const NavMenu = [
  {
    link: '/dashboard',
    text: 'Dashboard',
    icon: DashboardIcon,
    isTop: true,
  },
  {
    link: '/queues',
    text: 'Queues',
    icon: QueueIcon,
    isTop: true,
  },
  {
    link: '/availability',
    text: 'Availability',
    icon: CalenderIcon,
    isTop: true,
  },
  {
    link: '/settings',
    text: 'Settings',
    icon: SettingsIcon,
  },
  {
    link: '/help',
    text: 'Help',
    icon: QuestionIcon,
  },
];

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
      <Icon width={24} height={24} />
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
          <Duro width={88} height={33} />
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
