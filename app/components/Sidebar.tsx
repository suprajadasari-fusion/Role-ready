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
  FaLandmark, 
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
  FaDollarSign,
  FaArrowTrendUp,
  FaBookOpen,
  FaRightFromBracket,
  FaStar,
  FaWallet,
  FaMagnifyingGlass
} from 'react-icons/fa6';

interface SidebarProps {
  currentWorkspace: RoleType;
  onWorkspaceChange: (role: RoleType) => void;
  activeView: string;
  onViewChange: (view: string) => void;
  onRoleFilter: (role: string) => void;
  totalEntities: number;
  isDarkMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentWorkspace,
  onWorkspaceChange,
  activeView,
  onViewChange,
  onRoleFilter,
  totalEntities,
  isDarkMode
}) => {


  const roleNavItems: Record<RoleType, Array<{ id: string; label: string; icon: any }>> = {
    'super-admin': [
      { id: 'overview', label: 'Dashboard Overview', icon: FaChartPie },
      { id: 'access', label: 'Access Provisioning', icon: FaShieldHalved },
      { id: 'rbac', label: 'Permission Matrix', icon: FaSliders },
      { id: 'ai', label: 'AI Engine Control', icon: FaBrain },
      { id: 'audit', label: 'Audit & Compliance', icon: FaListCheck }
    ],
    'school': [
      { id: 'overview', label: 'Dashboard', icon: FaChartPie },
      { id: 'students', label: 'Students', icon: FaUsers },
      { id: 'teachers', label: 'Teachers', icon: FaChalkboardUser },
      { id: 'assessments', label: 'Assessments & Career Readiness', icon: FaListCheck },
      { id: 'reports', label: 'Career Reports', icon: FaFileLines },
      { id: 'events', label: 'Events', icon: FaCalendarDays },
      { id: 'analytics', label: 'Student Analytics', icon: FaArrowTrendUp },
      { id: 'performance', label: 'Performance Dashboard', icon: FaBrain },
      { id: 'placement', label: 'Placement Reports', icon: FaBriefcase },
      { id: 'notifications', label: 'Notifications', icon: FaBullhorn },
      { id: 'settings', label: 'Settings', icon: FaSliders }
    ],
    'college': [
      { id: 'overview', label: 'Dashboard', icon: FaGraduationCap },
      { id: 'programs', label: 'Programs', icon: FaBookOpen },
      { id: 'admissions', label: 'Admissions', icon: FaUserCheck },
      { id: 'applications', label: 'Applications', icon: FaFileLines },
      { id: 'scholarships', label: 'Scholarships', icon: FaAward },
      { id: 'placement-cell', label: 'Placement Cell', icon: FaBriefcase },
      { id: 'industry-connect', label: 'Industry Connect', icon: FaHandshake },
      { id: 'analytics', label: 'Analytics', icon: FaArrowTrendUp },
      { id: 'notifications', label: 'Notifications', icon: FaBullhorn },
      { id: 'settings', label: 'Settings', icon: FaSliders }
    ],
    'mentor': [
      { id: 'overview', label: 'Dashboard', icon: FaUserCheck },
      { id: 'profile', label: 'Profile & Verification', icon: FaUserCheck },
      { id: 'skills', label: 'Skills & Expertise', icon: FaBrain },
      { id: 'availability', label: 'Availability & Calendar', icon: FaCalendarDays },
      { id: 'student-requests', label: 'Student Requests', icon: FaUsers },
      { id: 'video-sessions', label: 'Video Sessions', icon: FaVideo },
      { id: 'guidance', label: 'Assessments & Guidance', icon: FaCompass },
      { id: 'ratings', label: 'Ratings & Reviews', icon: FaStar },
      { id: 'wallet', label: 'Wallet & Payouts', icon: FaWallet },
      { id: 'notifications', label: 'Notifications', icon: FaBullhorn },
      { id: 'settings', label: 'Settings', icon: FaSliders }
    ],
    'training': [
      { id: 'overview', label: 'Institute Overview', icon: FaChalkboardUser },
      { id: 'courses', label: 'Skill Courses Track', icon: FaChalkboardUser },
      { id: 'certs', label: 'Certifications Registry', icon: FaAward },
      { id: 'hiring', label: 'Hiring Partners', icon: FaHandshake }
    ],
    'recruiter': [
      { id: 'overview', label: 'Dashboard', icon: FaBriefcase },
      { id: 'verification', label: 'Company & Verification', icon: FaBuilding },
      { id: 'jobs', label: 'Job Postings', icon: FaFileLines },
      { id: 'campus-hiring', label: 'Campus Hiring', icon: FaGraduationCap },
      { id: 'student-search', label: 'Student Search', icon: FaMagnifyingGlass },
      { id: 'ai-match', label: 'AI Matcher', icon: FaBrain },
      { id: 'interviews', label: 'Interviews', icon: FaCalendarDays },
      { id: 'offers', label: 'Offer Letters', icon: FaAward },
      { id: 'hiring-analytics', label: 'Hiring Analytics', icon: FaArrowTrendUp },
      { id: 'notifications', label: 'Notifications', icon: FaBullhorn },
      { id: 'settings', label: 'Settings', icon: FaSliders }
    ],
    'company': [
      { id: 'overview', label: 'Company Overview', icon: FaBuilding },
      { id: 'internships', label: 'Internship Programs', icon: FaBriefcase },
      { id: 'partnerships', label: 'Campus Partnerships', icon: FaGraduationCap },
      { id: 'pipeline', label: 'Talent Pipeline', icon: FaChartPie }
    ]
  };

  const navItems = roleNavItems[currentWorkspace] || roleNavItems['super-admin'];

  return (
    <aside className={`w-72 min-h-screen flex flex-col fixed top-0 bottom-0 left-0 z-40 shadow-xl border-r font-sans transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-slate-900 border-slate-800 text-white' 
        : 'bg-white border-blue-100 text-slate-900'
    }`}>
      {/* Brand Header */}
      <div className={`p-5 flex items-center gap-3.5 border-b ${
        isDarkMode ? 'border-slate-800 bg-slate-950/60' : 'border-blue-100 bg-blue-50/40'
      }`}>
        <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <FaCompass className="w-6 h-6 animate-pulse-glow" />
        </div>
        <div>
          <h2 className={`font-extrabold text-xl tracking-tight font-sans ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Role Ready
          </h2>
          <span className="inline-block text-[11px] font-semibold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-md border border-blue-400/20">
            {currentWorkspace === 'super-admin' ? 'Super Admin Portal' : `${currentWorkspace.toUpperCase()} Workspace`}
          </span>
        </div>
      </div>



      {/* Dynamic Nav Items */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <div className={`text-[10px] font-bold tracking-wider uppercase px-2 mb-2 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {currentWorkspace.toUpperCase()} NAVIGATION
          </div>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-[#12163A] text-white shadow-md border border-[#3665EE]/40 scale-[1.01]' 
                      : isDarkMode
                        ? 'text-slate-300 hover:bg-[#12163A]/60 hover:text-white hover:translate-x-1'
                        : 'text-[#4B5563] hover:bg-[#DEE9FF]/60 hover:text-[#12163A] hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#3665EE]' : 'text-[#94A3B8]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.id === 'access' && (
                    <span className="bg-[#3665EE]/20 text-[#3665EE] text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {totalEntities}
                    </span>
                  )}
                  {item.id === 'ai' && (
                    <span className="bg-[#E4F4EC] text-[#12163A] text-[10px] px-2 py-0.5 rounded-full font-bold">Live</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>


      </nav>

      {/* System Status & Log Out Footer */}
      <div className={`p-4 border-t space-y-3 ${
        isDarkMode ? 'border-slate-800 bg-slate-950/60' : 'border-blue-100 bg-blue-50/40'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <div className="text-xs">
            <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>AI Engine v2.4</div>
            <div className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              All Microservices Operational
            </div>
          </div>
        </div>

        {/* Prominent Log Out Button */}
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
          }}
          className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer border ${
            isDarkMode
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/50 shadow-xs'
              : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 hover:border-rose-300 shadow-xs'
          }`}
        >
          <FaRightFromBracket className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};
