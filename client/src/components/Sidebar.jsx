import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaMicrophone, FaBrain, FaFileAlt, FaUserTie, FaComments, FaInfoCircle } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: FaHome, label: 'Dashboard' },
    { path: '/interview', icon: FaMicrophone, label: 'Interview' },
    { path: '/hr-interview', icon: FaUserTie, label: 'HR' },
    { path: '/behavioural-interview', icon: FaComments, label: 'Behaviour' },
    { path: '/aptitude', icon: FaBrain, label: 'Aptitude' },
    { path: '/about', icon: FaInfoCircle, label: 'About', desktopOnly: true },
    { path: '/history', icon: FaFileAlt, label: 'Reports' },
  ];

  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 bg-white shadow-soft glassmorphism md:inset-x-auto md:left-0 md:top-0 md:bottom-auto md:h-full md:w-64">
      <div className="hidden p-6 md:block">
        <h1 className="text-2xl font-bold text-primary-500">
          PrepWise AI
        </h1>
      </div>
      <nav className="grid grid-cols-6 gap-0.5 px-1 py-1.5 md:block md:px-4 md:py-0">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`min-w-0 flex-col items-center justify-center gap-0.5 rounded-md px-0.5 py-1.5 text-[10px] leading-none transition-all duration-200 md:mb-2 md:flex md:flex-row md:justify-start md:gap-1 md:rounded-lg md:px-4 md:py-3 md:text-base ${
                item.desktopOnly ? 'hidden' : 'flex'
              } ${
                isActive
                  ? 'bg-gradient-primary text-white shadow-soft'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-primary-500'
              }`}
            >
              <Icon className="text-[14px] md:mr-3 md:text-base" />
              <span className="max-w-full truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
