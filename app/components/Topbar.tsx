import React from 'react';
import { RoleType } from '~/lib/types';
import { 
  FaMagnifyingGlass, 
  FaBell, 
  FaUserCheck, 
  FaSun, 
  FaMoon 
} from 'react-icons/fa6';

interface TopbarProps {
  currentWorkspace: RoleType;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onShowToast: (msg: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentWorkspace,
  searchQuery,
  onSearchChange,
  onShowToast,
  isDarkMode,
  onToggleTheme
}) => {
  const roleNameMap: Record<RoleType, string> = {
    'super-admin': 'Super Admin (Governance)',
    'school': 'School Admin Portal',
    'college': 'College Admin Portal',
    'mentor': 'Mentor Desk',
    'training': 'Training Institute Portal',
    'recruiter': 'Recruiter Talent Desk',
    'company': 'Enterprise Company Portal'
  };

  return (
    <header className={`h-16 border-b px-6 flex items-center justify-between sticky top-0 z-30 font-sans transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-[#12163A] border-slate-800 text-white backdrop-blur-md' 
        : 'bg-white/90 border-slate-200 text-[#12163A] backdrop-blur-md shadow-2xs'
    }`}>
      {/* Search Input */}
      <div className="flex items-center gap-3 w-96">
        <div className="relative w-full">
          <FaMagnifyingGlass className={`w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 ${
            isDarkMode ? 'text-slate-400' : 'text-[#3665EE]'
          }`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Search in ${roleNameMap[currentWorkspace]}...`}
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs transition focus:outline-none focus:ring-2 focus:ring-[#3665EE] ${
              isDarkMode 
                ? 'bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400' 
                : 'bg-[#DEE9FF]/40 border border-[#C6D9FF] text-[#12163A] placeholder-[#6B7280]'
            }`}
          />
        </div>
      </div>

      {/* Right Controls: Theme Switcher, Notifications, User Profile */}
      <div className="flex items-center gap-3">
        {/* Dark / Light Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
            isDarkMode 
              ? 'bg-slate-800 border-amber-500/40 text-amber-400 hover:bg-slate-700' 
              : 'bg-[#DEE9FF] border-[#C6D9FF] text-[#12163A] hover:bg-[#CBDDFF]'
          }`}
        >
          {isDarkMode ? (
            <>
              <FaSun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <FaMoon className="w-3.5 h-3.5 text-[#3665EE]" />
              <span>Dark Mode</span>
            </>
          )}
        </button>

        {/* Notifications Icon */}
        <button 
          onClick={() => onShowToast("Notifications: 2 pending seat approval requests.")}
          className={`relative p-2 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' 
              : 'bg-[#DEE9FF] border-[#C6D9FF] text-[#12163A] hover:bg-[#CBDDFF]'
          }`}
        >
          <FaBell className="w-4 h-4 text-[#3665EE]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#3665EE] rounded-full animate-ping" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#3665EE] rounded-full" />
        </button>

        <div className={`h-6 w-px ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />

        {/* Profile Avatar Badge */}
        <div className="flex items-center gap-2.5 hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="w-8 h-8 rounded-xl bg-[#12163A] text-white font-extrabold flex items-center justify-center text-xs shadow-md border border-[#3665EE]/40">
            <FaUserCheck className="w-4 h-4 text-[#3665EE]" />
          </div>
          <div className="hidden sm:block text-left">
            <div className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-[#12163A]'}`}>
              System Administrator
            </div>
            <div className="text-[10px] font-bold text-[#3665EE]">
              {currentWorkspace.toUpperCase()}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
