import React, { useState, useEffect, useRef } from 'react';
import { RoleType } from '../lib/types';
import { logoutUser, getCachedUser } from '../lib/api';
import { useCurrentUser } from '../hooks/useUser';
import { 
  FiCompass, 
  FiShield, 
  FiBookOpen, 
  FiAward, 
  FiUserCheck, 
  FiUsers, 
  FiBriefcase, 
  FiGrid, 
  FiSliders, 
  FiCpu, 
  FiCheckSquare, 
  FiCalendar, 
  FiFileText, 
  FiVideo, 
  FiBell, 
  FiDollarSign,
  FiTrendingUp,
  FiLogOut,
  FiStar,
  FiSearch,
  FiActivity,
  FiUser,
  FiPlus,
  FiChevronUp,
  FiEdit2,
  FiX
} from 'react-icons/fi';

interface SidebarProps {
  currentWorkspace: RoleType;
  onWorkspaceChange: (role: RoleType) => void;
  activeView: string;
  onViewChange: (view: string) => void;
  onRoleFilter: (role: string) => void;
  totalEntities: number;
  isDarkMode: boolean;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentWorkspace,
  onWorkspaceChange,
  activeView,
  onViewChange,
  onRoleFilter,
  totalEntities,
  isDarkMode,
  isMobileOpen = false,
  onCloseMobile
}) => {
  // Navigation items per role (Profile is placed exclusively at the bottom of the sidebar)
  const roleNavItems: Record<RoleType, Array<{ id: string; label: string; icon: any; section?: string }>> = {
    'parent': [
      { id: 'dashboard', label: 'Dashboard', icon: FiGrid },
      { id: 'child', label: 'My Child', icon: FiUsers },
      { id: 'academic', label: 'Academic Progress', icon: FiBookOpen },
      { id: 'assessments', label: 'Assessments', icon: FiCheckSquare },
      { id: 'career-discovery', label: 'Career Discovery', icon: FiCompass },
      { id: 'career-roadmap', label: 'Career Roadmap', icon: FiTrendingUp },
      { id: 'colleges', label: 'Colleges', icon: FiAward },
      { id: 'scholarships', label: 'Scholarships', icon: FiDollarSign },
      { id: 'learning', label: 'Learning', icon: FiActivity },
      { id: 'notifications', label: 'Notifications', icon: FiBell },
      { id: 'settings', label: 'Settings', icon: FiSliders }
    ],
    'mentor': [
      { id: 'dashboard', label: 'Dashboard', icon: FiGrid },
      { id: 'students', label: 'Students', icon: FiUsers },
      { id: 'progress', label: 'Student Progress', icon: FiTrendingUp },
      { id: 'sessions', label: 'Mentorship Sessions', icon: FiVideo },
      { id: 'guidance', label: 'Career Guidance', icon: FiCompass },
      { id: 'assessments', label: 'Assessments', icon: FiCheckSquare },
      { id: 'recommendations', label: 'Recommendations', icon: FiAward },
      { id: 'messages', label: 'Messages', icon: FiFileText },
      { id: 'notifications', label: 'Notifications', icon: FiBell },
      { id: 'settings', label: 'Settings', icon: FiSliders }
    ],
    'recruiter': [
      { id: 'dashboard', label: 'Dashboard', icon: FiGrid },
      { id: 'jobs', label: 'Jobs', icon: FiBriefcase },
      { id: 'create-job', label: 'Create Job', icon: FiPlus },
      { id: 'applications', label: 'Applications', icon: FiFileText },
      { id: 'candidates', label: 'Candidates', icon: FiSearch },
      { id: 'shortlisted', label: 'Shortlisted', icon: FiStar },
      { id: 'interviews', label: 'Interviews', icon: FiCalendar },
      { id: 'selected', label: 'Selected Candidates', icon: FiCheckSquare },
      { id: 'messages', label: 'Messages', icon: FiFileText },
      { id: 'notifications', label: 'Notifications', icon: FiBell },
      { id: 'settings', label: 'Settings', icon: FiSliders }
    ],
    'super-admin': [
      { id: 'dashboard', label: 'Dashboard', icon: FiGrid },
      { id: 'users', label: 'User Management', icon: FiUsers },
      { id: 'parents', label: 'Parent Management', icon: FiUsers },
      { id: 'mentors', label: 'Mentor Management', icon: FiUserCheck },
      { id: 'recruiters', label: 'Recruiter Management', icon: FiBriefcase },
      { id: 'schools', label: 'School Management', icon: FiBookOpen },
      { id: 'colleges', label: 'College Management', icon: FiAward },
      { id: 'training-institutes', label: 'Training Institute Management', icon: FiCpu },
      { id: 'companies', label: 'Company Management', icon: FiGrid },
      { id: 'approvals', label: 'Approvals', icon: FiCheckSquare },
      { id: 'reports', label: 'Reports', icon: FiFileText },
      { id: 'analytics', label: 'Analytics', icon: FiTrendingUp },
      { id: 'notifications', label: 'Notifications', icon: FiBell },
      { id: 'settings', label: 'System Settings', icon: FiSliders }
    ],
    'college': [
      { id: 'dashboard', label: 'Dashboard', icon: FiGrid },
      { id: 'students', label: 'Students', icon: FiUsers },
      { id: 'courses', label: 'Courses', icon: FiBookOpen },
      { id: 'departments', label: 'Departments', icon: FiGrid },
      { id: 'placements', label: 'Placements', icon: FiAward },
      { id: 'jobs', label: 'Jobs', icon: FiBriefcase },
      { id: 'applications', label: 'Applications', icon: FiFileText },
      { id: 'events', label: 'Events', icon: FiCalendar },
      { id: 'reports', label: 'Reports', icon: FiFileText },
      { id: 'notifications', label: 'Notifications', icon: FiBell },
      { id: 'settings', label: 'Settings', icon: FiSliders }
    ],
    'training': [
      { id: 'dashboard', label: 'Dashboard', icon: FiGrid },
      { id: 'courses', label: 'Courses', icon: FiBookOpen },
      { id: 'batches', label: 'Batches', icon: FiCalendar },
      { id: 'learners', label: 'Students/Learners', icon: FiUsers },
      { id: 'trainers', label: 'Trainers', icon: FiUserCheck },
      { id: 'enrollments', label: 'Enrollments', icon: FiFileText },
      { id: 'attendance', label: 'Attendance', icon: FiCheckSquare },
      { id: 'progress', label: 'Progress', icon: FiTrendingUp },
      { id: 'certificates', label: 'Certificates', icon: FiAward },
      { id: 'reports', label: 'Reports', icon: FiFileText },
      { id: 'notifications', label: 'Notifications', icon: FiBell },
      { id: 'settings', label: 'Settings', icon: FiSliders }
    ],
    'school': [
      { id: 'dashboard', label: 'Dashboard', icon: FiGrid },
      { id: 'students', label: 'Students', icon: FiUsers },
      { id: 'parents', label: 'Parents', icon: FiUsers },
      { id: 'teachers', label: 'Teachers/Mentors', icon: FiUserCheck },
      { id: 'classes', label: 'Classes', icon: FiBookOpen },
      { id: 'assessments', label: 'Assessments', icon: FiCheckSquare },
      { id: 'progress', label: 'Student Progress', icon: FiTrendingUp },
      { id: 'guidance', label: 'Career Guidance', icon: FiCompass },
      { id: 'reports', label: 'Reports', icon: FiFileText },
      { id: 'notifications', label: 'Notifications', icon: FiBell },
      { id: 'settings', label: 'Settings', icon: FiSliders }
    ],
    'company': [
      { id: 'dashboard', label: 'Dashboard', icon: FiGrid },
      { id: 'jobs', label: 'Jobs', icon: FiBriefcase },
      { id: 'candidates', label: 'Candidates', icon: FiSearch },
      { id: 'applications', label: 'Applications', icon: FiFileText },
      { id: 'interviews', label: 'Interviews', icon: FiCalendar },
      { id: 'employees', label: 'Employees', icon: FiUsers },
      { id: 'recruitment', label: 'Recruitment', icon: FiTrendingUp },
      { id: 'reports', label: 'Reports', icon: FiFileText },
      { id: 'messages', label: 'Messages', icon: FiFileText },
      { id: 'notifications', label: 'Notifications', icon: FiBell },
      { id: 'settings', label: 'Settings', icon: FiSliders }
    ]
  };

  const roleDisplayTitles: Record<RoleType, string> = {
    'parent': 'Parent Workspace',
    'mentor': 'Mentor Workspace',
    'recruiter': 'Recruiter Workspace',
    'super-admin': 'Super Admin Portal',
    'college': 'College Workspace',
    'training': 'Training Institute',
    'school': 'School Workspace',
    'company': 'Company Workspace'
  };

  const roleBadgeTitles: Record<RoleType, string> = {
    'parent': 'Parent Account',
    'mentor': 'Career Mentor',
    'recruiter': 'Recruiter / Talent',
    'super-admin': 'Super Administrator',
    'college': 'College Admin',
    'training': 'Training Institute',
    'school': 'School Admin',
    'company': 'Company Admin'
  };

  const navItems = roleNavItems[currentWorkspace] || roleNavItems['super-admin'];

  // Dynamic user data resolution from live API / cached session
  const { data: currentUser } = useCurrentUser();
  const cachedUser = typeof window !== 'undefined' ? getCachedUser() : null;
  const user = currentUser || cachedUser;

  const firstName = user?.profile?.firstName || user?.firstName;
  const lastName = user?.profile?.lastName || user?.lastName;
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : (firstName || lastName);

  const orgName = 
    user?.profile?.roleData?.institutionName ||
    user?.profile?.roleData?.companyName ||
    user?.profile?.roleData?.schoolName ||
    user?.profile?.roleData?.collegeName ||
    user?.profile?.roleData?.organizationName ||
    user?.institutionName ||
    user?.companyName ||
    user?.schoolName ||
    user?.collegeName;

  const displayName = orgName || fullName || user?.name || (user?.email ? user.email.split('@')[0] : 'User Account');
  const userRoleDisplay = roleBadgeTitles[currentWorkspace] || (user?.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()) : 'Member');
  const userAvatar = user?.avatarUrl || user?.profile?.avatarUrl;

  const initials = (displayName || 'RR')
    .split(' ')
    .filter(Boolean)
    .map((w: string) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'RR';

  // Popover state for bottom profile section
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileSectionRef = useRef<HTMLDivElement>(null);

  // Close popover on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileSectionRef.current && !profileSectionRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  // Logout Confirmation Modal State
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = () => {
    setIsProfileMenuOpen(false);
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
    } catch {
      // Clean up local tokens
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('rr_access_token');
        localStorage.removeItem('rr_refresh_token');
        localStorage.removeItem('rr_user');
        localStorage.removeItem('rr_active_role');
        sessionStorage.removeItem('rr_access_token');
        sessionStorage.removeItem('rr_refresh_token');
        sessionStorage.removeItem('rr_user');
        sessionStorage.removeItem('rr_active_role');
        window.location.href = '/login';
      }
    }
  };

  return (
    <>
      {/* Mobile Drawer Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden animate-fade-in"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Main Left Sidebar */}
      <aside className={`w-72 h-screen flex flex-col fixed top-0 bottom-0 left-0 z-50 shadow-xl border-r font-sans transition-transform duration-300 md:translate-x-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800 text-white' 
          : 'bg-white border-blue-100 text-slate-900'
      }`}>
        {/* Brand Header */}
        <div className={`p-5 flex items-center justify-between border-b shrink-0 ${
          isDarkMode ? 'border-slate-800 bg-slate-950/60' : 'border-blue-100 bg-blue-50/40'
        }`}>
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
              <FiCompass className="w-6 h-6 animate-pulse-glow" />
            </div>
            <div className="min-w-0">
              <h2 className={`font-bold text-xl tracking-tight font-sans truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Role Ready
              </h2>
              <span className="inline-block text-[12px] font-medium bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-md border border-blue-400/20 truncate max-w-[160px]">
                {roleDisplayTitles[currentWorkspace] || 'Workspace Portal'}
              </span>
            </div>
          </div>

          {/* Mobile Drawer Close Button */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              aria-label="Close sidebar"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Independently Scrollable Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = (item.id === 'dashboard' || item.id === 'overview')
              ? (activeView === 'dashboard' || activeView === 'overview' || !activeView)
              : (activeView === item.id || (item.id === 'child' && activeView === 'children'));

            return (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between min-h-[40px] px-3.5 py-2 rounded-xl text-[14px] font-medium transition-colors duration-150 cursor-pointer border ${
                  isActive 
                    ? 'bg-[#12163A] text-white shadow-md border-[#3665EE]/40' 
                    : isDarkMode
                      ? 'border-transparent text-slate-300 hover:bg-[#12163A]/60 hover:text-white'
                      : 'border-transparent text-[#4B5563] hover:bg-[#DEE9FF]/60 hover:text-[#12163A]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1 text-left">
                  <Icon className={`w-4 h-4 shrink-0 transition-colors duration-150 ${
                    isActive ? 'text-[#3665EE]' : 'text-[#94A3B8]'
                  }`} />
                  <span className="truncate whitespace-nowrap text-left">{item.label}</span>
                </div>
                {item.id === 'users' && currentWorkspace === 'super-admin' && (
                  <span className="bg-[#3665EE]/20 text-[#3665EE] text-[11px] px-2 py-0.5 rounded-full font-semibold ml-2 shrink-0">
                    {totalEntities}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Fixed / Sticky Profile Section at Bottom of Left Sidebar */}
        <div 
          ref={profileSectionRef}
          className={`p-3 border-t shrink-0 relative ${
            isDarkMode ? 'border-slate-800 bg-slate-950/70' : 'border-blue-100 bg-blue-50/50'
          }`}
        >
          {/* Upward Popover Menu */}
          {isProfileMenuOpen && (
            <div 
              className={`absolute bottom-full left-3 right-3 mb-2 p-2 rounded-2xl shadow-2xl border transition-all duration-200 z-50 animate-fade-in ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-700 text-white' 
                  : 'bg-white border-blue-200 text-slate-800'
              }`}
            >
              {/* Signed In User Summary Header */}
              <div className={`px-3 py-2.5 border-b mb-1.5 text-left ${isDarkMode ? 'border-slate-800' : 'border-blue-50'}`}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500">Authenticated Account</p>
                <p className={`text-[13.5px] font-bold truncate mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{displayName}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email || 'Active Session'}</p>
              </div>

              {/* View Profile */}
              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  onViewChange('profile');
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors cursor-pointer ${
                  isDarkMode ? 'hover:bg-slate-800 text-slate-200 hover:text-white' : 'hover:bg-blue-50 text-slate-700 hover:text-blue-700'
                }`}
              >
                <FiUser className="w-4 h-4 text-blue-500 shrink-0" />
                <span>View Profile</span>
              </button>

              {/* Edit Profile */}
              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  onViewChange('profile');
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors cursor-pointer ${
                  isDarkMode ? 'hover:bg-slate-800 text-slate-200 hover:text-white' : 'hover:bg-blue-50 text-slate-700 hover:text-blue-700'
                }`}
              >
                <FiEdit2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Edit Profile</span>
              </button>

              {/* Account Settings */}
              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  onViewChange('settings');
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors cursor-pointer ${
                  isDarkMode ? 'hover:bg-slate-800 text-slate-200 hover:text-white' : 'hover:bg-blue-50 text-slate-700 hover:text-blue-700'
                }`}
              >
                <FiSliders className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Account Settings</span>
              </button>

              {/* Divider */}
              <div className={`h-px my-1.5 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`} />

              {/* Popover Logout Option */}
              <button
                type="button"
                onClick={handleLogoutClick}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors cursor-pointer ${
                  isDarkMode ? 'hover:bg-rose-500/20 text-rose-400' : 'hover:bg-rose-50 text-rose-600'
                }`}
              >
                <FiLogOut className="w-4 h-4 shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          )}

          {/* Profile Clickable Box */}
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen(prev => !prev)}
            className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all duration-150 cursor-pointer text-left ${
              isProfileMenuOpen
                ? (isDarkMode ? 'bg-slate-800 border-blue-500/50 shadow-md' : 'bg-blue-50 border-blue-300 shadow-sm')
                : (isDarkMode ? 'bg-slate-900/90 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700' : 'bg-white border-blue-100 hover:bg-blue-50/60 hover:border-blue-200')
            }`}
            aria-expanded={isProfileMenuOpen}
            aria-haspopup="true"
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              {/* User Avatar / Initials */}
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={displayName}
                  className="w-9 h-9 rounded-xl object-cover ring-1 ring-blue-500/30 shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold flex items-center justify-center text-xs shadow-md ring-1 ring-blue-500/30 shrink-0">
                  {initials}
                </div>
              )}

              {/* User Name & Role */}
              <div className="min-w-0 flex-1">
                <div className={`text-[13px] font-semibold leading-tight truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`} title={displayName}>
                  {displayName}
                </div>
                <div className="text-[11.5px] font-medium text-blue-500 dark:text-blue-400 truncate mt-0.5" title={userRoleDisplay}>
                  {userRoleDisplay}
                </div>
              </div>
            </div>

            {/* Dropdown Chevron Indicator */}
            <FiChevronUp 
              className={`w-4 h-4 text-slate-400 shrink-0 ml-1.5 transition-transform duration-200 ${
                isProfileMenuOpen ? 'rotate-180 text-blue-500' : ''
              }`} 
            />
          </button>

          {/* Dedicated Log Out Button Below Profile Box */}
          <button
            type="button"
            onClick={handleLogoutClick}
            className={`w-full mt-2 flex items-center justify-center min-h-[38px] gap-2 py-2 px-3.5 rounded-xl text-[13.5px] font-semibold transition-colors duration-150 cursor-pointer border ${
              isDarkMode
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/50 shadow-xs'
                : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 hover:border-rose-300 shadow-xs'
            }`}
          >
            <FiLogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Dialog Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div 
            className={`w-full max-w-sm rounded-2xl p-6 border shadow-2xl transition-all text-center ${
              isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
              <FiLogOut className="w-6 h-6" />
            </div>

            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Confirm Log Out
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              Are you sure you want to end your active session? You will be redirected to the sign in page.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                disabled={isLoggingOut}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  isDarkMode 
                    ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200' 
                    : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                disabled={isLoggingOut}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer shadow-md shadow-rose-600/20 flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isLoggingOut ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Logging out...</span>
                  </span>
                ) : (
                  <span>Yes, Log Out</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
