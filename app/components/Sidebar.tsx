import React from 'react';
import { RoleType } from '../lib/types';
import { 
<<<<<<< HEAD
  FaCompass, 
  FaShieldHalved, 
  FaSchool, 
  FaGraduationCap, 
  FaUserCheck, 
  FaChalkboardUser, 
  FaBriefcase, 
  FaBuilding, 
  FaSliders, 
  FaBrain, 
  FaListCheck, 
  FaChartPie, 
  FaCalendarDays, 
  FaUsers, 
  FaAward, 
  FaFileLines, 
  FaVideo, 
  FaBullhorn, 
  FaHandshake, 
  FaArrowTrendUp,
  FaBookOpen,
  FaRightFromBracket,
  FaStar,
  FaWallet,
  FaMagnifyingGlass,
  FaFileCode,
  FaUser,
  FaXmark
} from 'react-icons/fa6';
import { useAppSelector } from '~/store/store';
=======
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
  FiPieChart, 
  FiCalendar, 
  FiFileText, 
  FiVideo, 
  FiBell, 
  FiDollarSign,
  FiTrendingUp,
  FiLogOut,
  FiStar,
  FiCreditCard,
  FiSearch,
  FiActivity,
  FiUser
} from 'react-icons/fi';
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c

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
  onCloseMobile = () => {}
}) => {
  const unreadCount = useAppSelector(state => state.notifications.unreadCount);

  const roleNavItems: Record<string, Array<{ id: string; label: string; icon: any }>> = {
    'student': [
      { id: 'overview', label: 'Dashboard', icon: FaChartPie },
      { id: 'discover', label: 'Career Discovery', icon: FaCompass },
      { id: 'schools', label: 'Schools Hub', icon: FaSchool },
      { id: 'colleges', label: 'College Explorer', icon: FaGraduationCap },
      { id: 'scholarships', label: 'Scholarships', icon: FaAward },
      { id: 'learning-center', label: 'Learning Center', icon: FaBookOpen },
      { id: 'resume-builder', label: 'Resume Builder', icon: FaFileCode },
      { id: 'interview-ai', label: 'Interview AI', icon: FaBrain },
      { id: 'jobs', label: 'Jobs & Internships', icon: FaBriefcase },
      { id: 'notifications', label: 'Notifications', icon: FaBullhorn },
      { id: 'profile', label: 'User Profile', icon: FaUser }
    ],
    'super-admin': [
      { id: 'overview', label: 'Dashboard Overview', icon: FiGrid },
      { id: 'access', label: 'Access Provisioning', icon: FiShield },
      { id: 'rbac', label: 'Permission Matrix', icon: FiSliders },
      { id: 'ai', label: 'AI Engine Control', icon: FiCpu },
      { id: 'audit', label: 'Audit & Compliance', icon: FiCheckSquare }
    ],
    'school': [
<<<<<<< HEAD
      { id: 'overview', label: 'Dashboard', icon: FaChartPie },
      { id: 'students', label: 'Students Roster', icon: FaUsers },
      { id: 'teachers', label: 'Teachers', icon: FaChalkboardUser },
      { id: 'assessments', label: 'Assessments', icon: FaListCheck },
      { id: 'reports', label: 'Career Reports', icon: FaFileLines },
      { id: 'events', label: 'Events', icon: FaCalendarDays },
      { id: 'analytics', label: 'Analytics', icon: FaArrowTrendUp },
      { id: 'notifications', label: 'Notifications', icon: FaBullhorn },
      { id: 'settings', label: 'Settings', icon: FaSliders }
    ],
    'college': [
      { id: 'overview', label: 'Dashboard', icon: FaGraduationCap },
      { id: 'programs', label: 'Degree Programs', icon: FaBookOpen },
      { id: 'admissions', label: 'Admissions Desk', icon: FaUserCheck },
      { id: 'scholarships', label: 'Scholarships Cell', icon: FaAward },
      { id: 'placement-cell', label: 'Placement Cell', icon: FaBriefcase },
      { id: 'industry-connect', label: 'Industry MoUs', icon: FaHandshake },
      { id: 'notifications', label: 'Notifications', icon: FaBullhorn },
      { id: 'settings', label: 'Settings', icon: FaSliders }
    ],
    'mentor': [
      { id: 'overview', label: 'Dashboard', icon: FaUserCheck },
      { id: 'profile', label: 'Profile Verification', icon: FaUserCheck },
      { id: 'skills', label: 'Expertise Matrix', icon: FaBrain },
      { id: 'availability', label: 'Availability Calendar', icon: FaCalendarDays },
      { id: 'student-requests', label: 'Counseling Requests', icon: FaUsers },
      { id: 'video-sessions', label: 'Live Video Sessions', icon: FaVideo },
      { id: 'wallet', label: 'Earnings Wallet', icon: FaWallet },
      { id: 'notifications', label: 'Notifications', icon: FaBullhorn }
    ],
    'training': [
      { id: 'overview', label: 'Institute Overview', icon: FaChalkboardUser },
      { id: 'courses', label: 'Skill Courses', icon: FaBookOpen },
      { id: 'certs', label: 'Certifications', icon: FaAward },
      { id: 'hiring', label: 'Hiring Partners', icon: FaHandshake }
    ],
    'recruiter': [
      { id: 'overview', label: 'Talent Desk', icon: FaBriefcase },
      { id: 'verification', label: 'Company Verification', icon: FaBuilding },
      { id: 'jobs', label: 'Job Postings', icon: FaFileLines },
      { id: 'campus-hiring', label: 'Campus Drives', icon: FaGraduationCap },
      { id: 'student-search', label: 'Student Search', icon: FaMagnifyingGlass },
      { id: 'ai-match', label: 'AI Matcher', icon: FaBrain },
      { id: 'interviews', label: 'Interviews', icon: FaCalendarDays },
      { id: 'offers', label: 'Offer Letters', icon: FaAward },
      { id: 'notifications', label: 'Notifications', icon: FaBullhorn }
    ],
    'company': [
      { id: 'overview', label: 'Company Overview', icon: FaBuilding },
      { id: 'internships', label: 'Internship Programs', icon: FaBriefcase },
      { id: 'partnerships', label: 'Campus MoUs', icon: FaGraduationCap },
      { id: 'pipeline', label: 'Talent Pipeline', icon: FaChartPie }
=======
      { id: 'overview', label: 'Dashboard', icon: FiGrid },
      { id: 'students', label: 'Students', icon: FiUsers },
      { id: 'teachers', label: 'Teachers', icon: FiUsers },
      { id: 'assessments', label: 'Assessments & Readiness', icon: FiCheckSquare },
      { id: 'reports', label: 'Career Reports', icon: FiFileText },
      { id: 'events', label: 'Events & Video Sessions', icon: FiVideo },
      { id: 'analytics', label: 'Student Analytics', icon: FiTrendingUp },
      { id: 'performance', label: 'Performance Dashboard', icon: FiCpu },
      { id: 'placement', label: 'Placement Reports', icon: FiBriefcase },
      { id: 'notifications', label: 'Notifications', icon: FiBell },
      { id: 'settings', label: 'Settings', icon: FiSliders }
    ],
    'college': [
      { id: 'overview', label: 'Dashboard', icon: FiGrid },
      { id: 'programs', label: 'Programs', icon: FiBookOpen },
      { id: 'admissions', label: 'Admissions', icon: FiUserCheck },
      { id: 'applications', label: 'Applications', icon: FiFileText },
      { id: 'scholarships', label: 'Scholarships', icon: FiAward },
      { id: 'placement-cell', label: 'Placement Cell', icon: FiBriefcase },
      { id: 'industry-connect', label: 'Industry Connect', icon: FiUsers },
      { id: 'analytics', label: 'Analytics', icon: FiTrendingUp },
      { id: 'notifications', label: 'Notifications', icon: FiBell },
      { id: 'settings', label: 'Settings', icon: FiSliders }
    ],
    'mentor': [
      { id: 'overview', label: 'Dashboard', icon: FiGrid },
      { id: 'skills', label: 'Skills & Expertise', icon: FiCpu },
      { id: 'availability', label: 'Availability & Calendar', icon: FiCalendar },
      { id: 'student-requests', label: 'Student Requests', icon: FiUsers },
      { id: 'video-sessions', label: 'Video Sessions', icon: FiVideo },
      { id: 'guidance', label: 'Assessments & Guidance', icon: FiCompass },
      { id: 'ratings', label: 'Ratings & Reviews', icon: FiStar },
      { id: 'wallet', label: 'Wallet & Payouts', icon: FiCreditCard },
      { id: 'notifications', label: 'Notifications', icon: FiBell },
      { id: 'settings', label: 'Settings', icon: FiSliders }
    ],
    'training': [
      { id: 'overview', label: 'Institute Overview', icon: FiGrid },
      { id: 'courses', label: 'Skill Courses Track', icon: FiBookOpen },
      { id: 'certs', label: 'Certifications Registry', icon: FiAward },
      { id: 'hiring', label: 'Hiring Partners', icon: FiBriefcase }
    ],
    'recruiter': [
      { id: 'overview', label: 'Dashboard', icon: FiGrid },
      { id: 'verification', label: 'Company & Verification', icon: FiGrid },
      { id: 'jobs', label: 'Job Postings', icon: FiFileText },
      { id: 'campus-hiring', label: 'Campus Hiring', icon: FiAward },
      { id: 'student-search', label: 'Student Search', icon: FiSearch },
      { id: 'ai-match', label: 'AI Matcher', icon: FiCpu },
      { id: 'interviews', label: 'Interviews', icon: FiCalendar },
      { id: 'offers', label: 'Offer Letters', icon: FiAward },
      { id: 'hiring-analytics', label: 'Hiring Analytics', icon: FiTrendingUp },
      { id: 'notifications', label: 'Notifications', icon: FiBell },
      { id: 'settings', label: 'Settings', icon: FiSliders }
    ],
    'company': [
      { id: 'overview', label: 'Company Overview', icon: FiGrid },
      { id: 'internships', label: 'Internship Programs', icon: FiBriefcase },
      { id: 'partnerships', label: 'Campus Partnerships', icon: FiAward },
      { id: 'pipeline', label: 'Talent Pipeline', icon: FiPieChart }
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
    ]
  };

  const navItems = roleNavItems[currentWorkspace] || roleNavItems['super-admin'];

  const sidebarContent = (
    <>
      {/* Brand Header */}
      <div className={`p-4 sm:p-5 flex items-center justify-between border-b shrink-0 ${
        isDarkMode ? 'border-slate-800 bg-slate-950/60' : 'border-blue-100 bg-blue-50/40'
      }`}>
<<<<<<< HEAD
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
            <FaCompass className="w-5 h-5 animate-pulse-glow" />
          </div>
          <div>
            <h2 className={`font-bold text-lg tracking-tight font-sans ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Role Ready
            </h2>
            <span className="inline-block text-[11px] font-medium bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-md border border-blue-400/20">
              {currentWorkspace === 'super-admin' ? 'Super Admin' : `${currentWorkspace.charAt(0).toUpperCase() + currentWorkspace.slice(1)} Portal`}
            </span>
          </div>
=======
        <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <FiCompass className="w-6 h-6 animate-pulse-glow" />
        </div>
        <div>
          <h2 className={`font-bold text-xl tracking-tight font-sans ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Role Ready
          </h2>
          <span className="inline-block text-[11px] font-semibold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-md border border-blue-400/20">
            {currentWorkspace === 'super-admin' ? 'Super Admin Portal' : `${currentWorkspace.charAt(0).toUpperCase() + currentWorkspace.slice(1)} Workspace`}
          </span>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
        </div>

        {/* Close Button for Mobile Drawer */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden text-slate-400 hover:text-white p-1 cursor-pointer"
          aria-label="Close Mobile Sidebar"
        >
          <FaXmark className="w-5 h-5" />
        </button>
      </div>

      {/* Dynamic Nav Items */}
      <nav className="flex-1 overflow-y-auto p-4 flex flex-col justify-between">
        <div>
<<<<<<< HEAD
          <div className={`text-[11px] font-semibold tracking-wider uppercase px-2 mb-2 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {currentWorkspace.charAt(0).toUpperCase() + currentWorkspace.slice(1)} Navigation
          </div>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    onCloseMobile();
                  }}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.01]' 
                      : isDarkMode
                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.id === 'notifications' && unreadCount > 0 && (
                    <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      {unreadCount}
                    </span>
                  )}
                  {item.id === 'access' && (
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full font-medium">
                      {totalEntities}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* System Status & Log Out Footer */}
      <div className={`p-4 border-t space-y-3 shrink-0 ${
        isDarkMode ? 'border-slate-800 bg-slate-950/60' : 'border-blue-100 bg-blue-50/40'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <div>
            <div className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>AI Engine v2.4</div>
            <div className={`text-xs font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              All Microservices Operational
            </div>
          </div>
        </div>

        {/* Log Out Button */}
=======
          <div className="space-y-2">
            {navItems
              .filter((item) => item.id !== 'profile')
              .map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`w-full flex items-center justify-between min-h-[42px] px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors duration-150 cursor-pointer border ${
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
                      <span className="leading-none truncate whitespace-nowrap text-left">{item.label}</span>
                    </div>
                    {item.id === 'access' && (
                      <span className="bg-[#3665EE]/20 text-[#3665EE] text-[10px] px-2 py-0.5 rounded-full font-bold ml-2 shrink-0">
                        {totalEntities}
                      </span>
                    )}
                    {item.id === 'ai' && (
                      <span className="bg-[#E4F4EC] text-[#12163A] text-[10px] px-2 py-0.5 rounded-full font-bold ml-2 shrink-0">Live</span>
                    )}
                  </button>
                );
              })}
          </div>
        </div>

        {/* Profile Navigation Item (Always at the bottom of navigation) */}
        <div className="mt-auto pt-3">
          <button
            onClick={() => onViewChange('profile')}
            className={`w-full flex items-center justify-between min-h-[42px] px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors duration-150 cursor-pointer border ${
              activeView === 'profile'
                ? 'bg-[#12163A] text-white shadow-md border-[#3665EE]/40' 
                : isDarkMode
                  ? 'border-transparent text-slate-300 hover:bg-[#12163A]/60 hover:text-white'
                  : 'border-transparent text-[#4B5563] hover:bg-[#DEE9FF]/60 hover:text-[#12163A]'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1 text-left">
              <FiUser className={`w-4 h-4 shrink-0 transition-colors duration-150 ${
                activeView === 'profile' ? 'text-[#3665EE]' : 'text-[#94A3B8]'
              }`} />
              <span className="leading-none truncate whitespace-nowrap text-left">Profile</span>
            </div>
          </button>
        </div>
      </nav>

      {/* Log Out Footer */}
      <div className={`p-4 border-t ${
        isDarkMode ? 'border-slate-800 bg-slate-950/60' : 'border-blue-100 bg-blue-50/40'
      }`}>
        {/* Prominent Log Out Button */}
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
          }}
<<<<<<< HEAD
          aria-label="Log Out of System"
          className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border ${
=======
          className={`w-full flex items-center justify-center min-h-[42px] gap-2 py-2.5 px-3.5 rounded-xl text-xs font-bold transition-colors duration-150 cursor-pointer border ${
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            isDarkMode
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/50 shadow-xs'
              : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 hover:border-rose-300 shadow-xs'
          }`}
        >
          <FiLogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Slide-Over Drawer Modal */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs"
            aria-hidden="true"
          />
          <aside 
            role="navigation" 
            aria-label="Mobile Navigation Sidebar"
            className={`w-72 h-full flex flex-col fixed top-0 bottom-0 left-0 z-50 shadow-2xl border-r font-sans ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800 text-white' 
                : 'bg-white border-blue-100 text-slate-900'
            }`}
          >
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop Sticky Flex-Sibling Sidebar (Zero Overlap Guaranteed) */}
      <aside 
        role="navigation" 
        aria-label="Main Navigation Sidebar"
        className={`hidden lg:flex w-72 shrink-0 h-screen sticky top-0 left-0 z-30 flex-col border-r font-sans transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-800 text-white' 
            : 'bg-white border-blue-100 text-slate-900'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
