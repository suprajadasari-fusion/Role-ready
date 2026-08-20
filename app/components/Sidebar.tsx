import React from 'react';
import { RoleType } from '~/lib/types';
import { 
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
      { id: 'overview', label: 'Dashboard Overview', icon: FaChartPie },
      { id: 'access', label: 'Access Provisioning', icon: FaShieldHalved },
      { id: 'rbac', label: 'Permission Matrix', icon: FaSliders },
      { id: 'ai', label: 'AI Engine Control', icon: FaBrain },
      { id: 'audit', label: 'Audit & Compliance', icon: FaListCheck }
    ],
    'school': [
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
    ]
  };

  const navItems = roleNavItems[currentWorkspace] || roleNavItems['super-admin'];

  const sidebarContent = (
    <>
      {/* Brand Header */}
      <div className={`p-4 sm:p-5 flex items-center justify-between border-b shrink-0 ${
        isDarkMode ? 'border-slate-800 bg-slate-950/60' : 'border-blue-100 bg-blue-50/40'
      }`}>
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
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
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
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
          }}
          aria-label="Log Out of System"
          className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border ${
            isDarkMode
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/50 shadow-xs'
              : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 hover:border-rose-300 shadow-xs'
          }`}
        >
          <FaRightFromBracket className="w-3.5 h-3.5" />
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
