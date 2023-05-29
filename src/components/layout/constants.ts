import CalenderIcon from '~/svg/CalenderIcon.svg';
import DashboardIcon from '~/svg/DashboardIcon.svg';
import QuestionIcon from '~/svg/QuestionIcon.svg';
import QueueIcon from '~/svg/QueueIcon.svg';
import SettingsIcon from '~/svg/SettingsIcon.svg';

export const NavMenu = [
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
