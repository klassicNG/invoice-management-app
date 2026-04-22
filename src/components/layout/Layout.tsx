import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const Layout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#F8F8FB] dark:bg-[#141625] transition-colors duration-300 flex flex-col xl:flex-row">
      {/* Sidebar / Top Nav */}
      <nav className="z-50 flex xl:flex-col justify-between items-center bg-[#373B53] xl:w-[103px] xl:h-screen xl:rounded-r-3xl w-full h-[72px] md:h-[80px]">
        
        {/* Logo Area */}
        <div className="relative flex items-center justify-center bg-[#7C5DFA] w-[72px] h-[72px] md:w-[80px] md:h-[80px] xl:w-full xl:h-[103px] rounded-r-2xl xl:rounded-tr-3xl xl:rounded-br-3xl overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#9277FF] rounded-tl-2xl xl:rounded-tl-3xl z-0"></div>
          {/* Logo Icon */}
          <div className="relative z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-[#7C5DFA] rounded-full filter drop-shadow-md"></div>
          </div>
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

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="max-w-[730px] mx-auto pt-[32px] md:pt-[56px] xl:pt-[72px] px-6 pb-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
