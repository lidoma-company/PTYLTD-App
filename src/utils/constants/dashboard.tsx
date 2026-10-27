import Notes from '%/notes.svg';
import Dashboard from '%/dashboard.svg';
import Tickets from '%/tickets.svg';
import UserInfo from '%/user-info.svg';
import Payments from '%/payments.svg';
import Bookmark from '%/bookmark.svg';
import Notifications from '%/notifications-sidebar.svg';
import Report from '%/report.svg';
import Package from '%/package.svg';
import React from 'react';

const sidebarIconClassname =
    'group-hover:[&>path]:fill-white transition-colors duration-300';
export const userDashboardSidebar = [
    {
        title: 'Overview',
        icon: <Dashboard className={sidebarIconClassname} />,
        href: '/',
    },
    {
        title: 'Reports',
        icon: <Report className={sidebarIconClassname} />,
        href: '/reports',
    },
    {
        title: 'Notes',
        icon: <Notes className={sidebarIconClassname} />,
        href: '/notes',
    },
    {
        title: 'Package management',
        icon: (
            <Package
                className={`${sidebarIconClassname} [&_path]:fill-gray-900`}
            />
        ),
        href: '/package-management',
    },
    {
        title: 'Payments',
        icon: <Payments className={sidebarIconClassname} />,
        href: '/payments',
    },
    {
        title: 'Bookmarks',
        icon: <Bookmark className={sidebarIconClassname} />,
        href: '/bookmarks',
    },
    {
        title: 'Account information',
        icon: <UserInfo className={sidebarIconClassname} />,
        href: '/account-information',
    },
    {
        title: 'Ask Analysts',
        icon: <Tickets className={sidebarIconClassname} />,
        href: '/ask-analysts',
    },
    {
        title: 'Notifications',
        icon: <Notifications className={sidebarIconClassname} />,
        href: '/notifications',
    },
];

export type sidebarItemType = {
    title: string;
    icon: React.ReactNode;
    href: string;
};
