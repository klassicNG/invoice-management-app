import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const Layout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#F8F8FB] dark:bg-[#141625] transition-colors duration-300">

      {/* Sidebar / Top Nav - NAILED TO THE SCREEN */}
      <nav className="fixed top-0 left-0 z-50 flex xl:flex-col justify-between items-center bg-[#373B53] xl:w-[103px] xl:h-screen xl:rounded-r-3xl w-full h-[72px] md:h-[80px]">

        {/* Logo Area */}
        <div className="relative flex items-center justify-center w-[72px] h-[72px] md:w-[80px] md:h-[80px] xl:w-[103px] xl:h-[103px]">
          <svg
            className="w-full h-full"
            viewBox="0 0 103 103"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H83C94.0457 0 103 8.9543 103 20V83C103 94.0457 94.0457 103 83 103H0V0Z" fill="#7C5DFA" />
            <mask id="mask0_1_122" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="103" height="103">
              <path d="M0 0H83C94.0457 0 103 8.9543 103 20V83C103 94.0457 94.0457 103 83 103H0V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_1_122)">
              <path d="M103 52H20C8.95431 52 0 60.9543 0 72V135C0 146.046 8.95431 155 20 155H103V52Z" fill="#9277FF" />
            </g>
            <path fillRule="evenodd" clipRule="evenodd" d="M42.6942 33.2922L52 52L61.3058 33.2922C67.6645 36.6408 72 43.3141 72 51C72 62.0457 63.0457 71 52 71C40.9543 71 32 62.0457 32 51C32 43.3141 36.3355 36.6408 42.6942 33.2922Z" fill="white" />
          </svg>
        </div>

        {/* Bottom / Right Section */}
        <div className="flex xl:flex-col items-center justify-between w-[150px] xl:w-full xl:h-[150px] pr-6 xl:pr-0 xl:pb-6">
          <button
            onClick={toggleTheme}
            className="text-[#858BB2] hover:text-[#DFE3FA] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C5DFA] rounded-full p-2"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="w-[1px] h-[72px] md:h-[80px] xl:w-full xl:h-[1px] bg-[#494E6E] xl:my-6 mx-6 xl:mx-0"></div>

          {/* User Avatar */}
          <div
            tabIndex={0}
            role="button"
            aria-label="User Profile"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-[#7C5DFA] focus:border-[#7C5DFA] focus:outline-none transition-colors cursor-pointer"
          >
            <img src="https://i.pravatar.cc/150?img=11" alt="User Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </nav>

      {/* Main Content Area - SHIFTED TO ACCOUNT FOR FIXED NAV */}
      <main className="pt-[72px] md:pt-[80px] xl:pt-0 xl:pl-[103px]">
        <div className="max-w-[730px] mx-auto pt-[32px] md:pt-[56px] xl:pt-[72px] px-6 pb-16">
          <Outlet />
        </div>
      </main>

    </div>
  );
};