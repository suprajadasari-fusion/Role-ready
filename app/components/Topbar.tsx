import React from 'react';
import { RoleType } from '~/lib/types';
import { 
<<<<<<< HEAD
  FaMagnifyingGlass, 
  FaBell, 
  FaSun, 
  FaMoon,
  FaBars
} from 'react-icons/fa6';
import { useAppSelector } from '~/store/store';
=======
  FiSearch, 
  FiBell, 
  FiUserCheck, 
  FiSun, 
  FiMoon 
} from 'react-icons/fi';
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c

interface TopbarProps {
  currentWorkspace: RoleType;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onShowToast: (msg: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNavigateNotifications?: () => void;
  onToggleMobileSidebar?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentWorkspace,
  searchQuery,
  onSearchChange,
  onShowToast,
  isDarkMode,
  onToggleTheme,
  onNavigateNotifications,
  onToggleMobileSidebar
}) => {
  const unreadCount = useAppSelector(state => state.notifications.unreadCount);
  const profile = useAppSelector(state => state.profile);

  const roleNameMap: Record<string, string> = {
    'student': 'Student Workspace Portal',
    'super-admin': 'Super Admin (Governance)',
    'school': 'School Admin Portal',
    'college': 'College Admin Portal',
    'mentor': 'Mentor Desk',
    'training': 'Training Institute Portal',
    'recruiter': 'Recruiter Talent Desk',
    'company': 'Enterprise Company Portal'
  };

  return (
<<<<<<< HEAD
    <header 
      role="banner"
      aria-label="Top Navigation Header"
      className={`h-16 border-b px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 font-sans transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white backdrop-blur-md' 
          : 'bg-white/90 border-slate-200 text-slate-900 backdrop-blur-md shadow-2xs'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={onToggleMobileSidebar}
          aria-label="Toggle Navigation Menu"
          className={`lg:hidden p-2 rounded-xl border transition cursor-pointer ${
            isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'
          }`}
        >
          <FaBars className="w-4 h-4" />
        </button>

        {/* Search Input */}
        <div className="relative w-48 sm:w-72 md:w-96">
          <FaMagnifyingGlass className={`w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 ${
            isDarkMode ? 'text-slate-400' : 'text-blue-500'
=======
    <header className={`h-16 border-b px-6 flex items-center justify-between sticky top-0 z-30 font-sans transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-[#12163A] border-slate-800 text-white backdrop-blur-md' 
        : 'bg-white/90 border-slate-200 text-[#12163A] backdrop-blur-md shadow-2xs'
    }`}>
      {/* Search Input */}
      <div className="flex items-center gap-3 w-96">
        <div className="relative w-full">
          <FiSearch className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
            isDarkMode ? 'text-slate-400' : 'text-[#3665EE]'
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
          }`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Search in ${roleNameMap[currentWorkspace] || 'Workspace'}...`}
            aria-label="Search Workspace"
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm font-normal transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode 
                ? 'bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400' 
                : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Switcher */}
        <button
          onClick={onToggleTheme}
<<<<<<< HEAD
          aria-label={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer ${
=======
          aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            isDarkMode 
              ? 'bg-slate-800 border-amber-500/40 text-amber-400 hover:bg-slate-700' 
              : 'bg-blue-50 border-blue-200 text-slate-900 hover:bg-blue-100'
          }`}
        >
          {isDarkMode ? (
            <>
<<<<<<< HEAD
              <FaSun className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Light</span>
            </>
          ) : (
            <>
              <FaMoon className="w-3.5 h-3.5 text-blue-500" />
              <span className="hidden sm:inline">Dark</span>
=======
              <FiSun className="w-4 h-4 text-amber-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <FiMoon className="w-4 h-4 text-[#3665EE]" />
              <span>Dark Mode</span>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </>
          )}
        </button>

        {/* Notifications Icon with Redux Count Badge */}
        <button 
<<<<<<< HEAD
          onClick={() => {
            if (onNavigateNotifications) {
              onNavigateNotifications();
            } else {
              onShowToast(`Notifications: ${unreadCount} unread system alerts.`);
            }
          }}
          aria-label={`View Notifications (${unreadCount} unread)`}
          className={`relative p-2 rounded-xl border transition-all duration-200 cursor-pointer ${
=======
          onClick={() => onShowToast("Notifications: 2 pending seat approval requests.")}
          aria-label="View notifications"
          className={`relative p-2 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            isDarkMode 
              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' 
              : 'bg-blue-50 border-blue-200 text-slate-900 hover:bg-blue-100'
          }`}
        >
<<<<<<< HEAD
          <FaBell className="w-4 h-4 text-blue-500" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
              {unreadCount}
            </span>
          )}
=======
          <FiBell className="w-4 h-4 text-[#3665EE]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#3665EE] rounded-full animate-ping" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#3665EE] rounded-full" />
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
        </button>

        <div className={`h-6 w-px ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />

<<<<<<< HEAD
        {/* User Profile Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-md">
            {profile.name.charAt(0)}
          </div>
          <div className="hidden md:block text-left">
            <div className={`text-xs font-semibold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {profile.name}
            </div>
            <div className="text-[11px] font-medium text-blue-400">
              {currentWorkspace.charAt(0).toUpperCase() + currentWorkspace.slice(1)} Portal
=======
        {/* Profile Avatar Badge */}
        <div className="flex items-center gap-2.5 hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="w-8 h-8 rounded-xl bg-[#12163A] text-white font-bold flex items-center justify-center text-xs shadow-md border border-[#3665EE]/40">
            <FiUserCheck className="w-4 h-4 text-[#3665EE]" />
          </div>
          <div className="hidden sm:block text-left">
            <div className={`text-xs font-semibold leading-tight ${isDarkMode ? 'text-white' : 'text-[#12163A]'}`}>
              System Administrator
            </div>
            <div className="text-[10px] font-medium text-[#3665EE]">
              {currentWorkspace === 'super-admin' ? 'Super Admin' : currentWorkspace.charAt(0).toUpperCase() + currentWorkspace.slice(1)}
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
