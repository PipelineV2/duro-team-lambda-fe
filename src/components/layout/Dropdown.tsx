import { Menu } from '@headlessui/react';
import Link from 'next/link';

import { useAuth } from '@/context/auth';

interface DropdownProps {
  children: React.ReactNode;
}
export function Dropdown(props: DropdownProps) {
  const { children } = props;

  const { logout } = useAuth();
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button className='inline-flex w-full justify-center rounded-md  text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
        {children}
      </Menu.Button>

      <Menu.Items className='shadow-s1 absolute right-0 mt-2 flex w-56 origin-top-right flex-col divide-y divide-gray-100 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
        <Menu.Item>
          {({ active }) => (
            <Link
              className={`${active && 'bg-gray-100'} px-3 py-3`}
              href='/settings'
            >
              Profile
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              type='button'
              className={`${
                active && 'bg-gray-100'
              } text-red px-3 py-3 text-left`}
              onClick={logout}
            >
              Logout
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
