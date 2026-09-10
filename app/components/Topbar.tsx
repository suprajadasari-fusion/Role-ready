import React from 'react';
import { RoleType } from '~/lib/types';
import { 
  FiSearch, 
  FiBell, 
  FiSun, 
  FiMoon,
  FiMenu
} from 'react-icons/fi';

interface TopbarProps {
  currentWorkspace: RoleType;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onShowToast: (msg: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onToggleMobileMenu?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentWorkspace,
  searchQuery,
  onSearchChange,
  onShowToast,
  isDarkMode,
  onToggleTheme,
  onToggleMobileMenu
}) => {
  const roleNameMap: Record<RoleType, string> = {
    'super-admin': 'Super Admin (Governance)',
    'school': 'School Admin Portal',
    'college': 'College Admin Portal',
    'mentor': 'Mentor Desk',
    'training': 'Training Institute Portal',
    'recruiter': 'Recruiter Talent Desk',
    'company': 'Enterprise Company Portal',
    'parent': 'Parent & Family Intelligence Portal'
  };

  return (
    <header className={`h-16 border-b px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 font-sans transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-[#12163A] border-slate-800 text-white backdrop-blur-md' 
        : 'bg-white/90 border-slate-200 text-[#12163A] backdrop-blur-md shadow-2xs'
    }`}>
      {/* Left: Mobile Toggle & Search Input */}
      <div className="flex items-center gap-3 min-w-0">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className={`md:hidden p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                : 'bg-[#DEE9FF] border-[#C6D9FF] text-[#12163A] hover:bg-[#CBDDFF]'
            }`}
            aria-label="Toggle navigation drawer"
          >
            <FiMenu className="w-5 h-5 text-[#3665EE]" />
          </button>
        )}

        <div className="relative w-52 sm:w-72 md:w-96">
          <FiSearch className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
            isDarkMode ? 'text-slate-400' : 'text-[#3665EE]'
          }`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Search in ${roleNameMap[currentWorkspace]}...`}
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-[14px] font-normal leading-normal transition focus:outline-none focus:ring-2 focus:ring-[#3665EE] ${
              isDarkMode 
                ? 'bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400' 
                : 'bg-[#DEE9FF]/40 border border-[#C6D9FF] text-[#12163A] placeholder-[#6B7280]'
            }`}
          />
        </div>
      </div>

      {/* Right Controls: Theme Switcher & Notifications */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {/* Dark / Light Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[13px] font-semibold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
            isDarkMode 
              ? 'bg-slate-800 border-amber-500/40 text-amber-400 hover:bg-slate-700' 
              : 'bg-[#DEE9FF] border-[#C6D9FF] text-[#12163A] hover:bg-[#CBDDFF]'
          }`}
        >
          {isDarkMode ? (
            <>
              <FiSun className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Light Mode</span>
            </>
          ) : (
            <>
              <FiMoon className="w-4 h-4 text-[#3665EE]" />
              <span className="hidden sm:inline">Dark Mode</span>
            </>
          )}
        </button>

        {/* Notifications Icon */}
        <button 
          onClick={() => onShowToast("Notifications: 2 pending activity updates.")}
          aria-label="View notifications"
          className={`relative p-2 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' 
              : 'bg-[#DEE9FF] border-[#C6D9FF] text-[#12163A] hover:bg-[#CBDDFF]'
          }`}
        >
          <FiBell className="w-4 h-4 text-[#3665EE]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#3665EE] rounded-full animate-ping" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#3665EE] rounded-full" />
        </button>
      </div>
    </header>
  );
};
