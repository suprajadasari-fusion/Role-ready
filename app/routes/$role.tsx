import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEntities, fetchAuditLogs, addEntity, updateEntity, deleteEntity } from '../lib/api';
import { getAccessToken, getRefreshToken, tryRefreshToken } from '../services/apiClient';
import { RoleType, EcosystemEntity, StatusType } from '../lib/types';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { GrantAccessModal } from '../components/GrantAccessModal';
import { EditModal } from '../components/EditModal';
import { RoleWorkspaceViews } from '../components/RoleWorkspaceViews';
import { SuperAdminDashboard } from '../components/Pages/SuperAdminDashboard';
import { FiCheckCircle, FiPlus } from 'react-icons/fi';

export default function RoleDashboardRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

<<<<<<< HEAD
  // Singular and Plural Alias Mapping so URLs like /student, /discover, /schools work 100%
=======
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Authentication Guard: Check access token or try transparent refresh before rendering
  useEffect(() => {
    let isMounted = true;
    const verifySession = async () => {
      const token = getAccessToken();
      if (token) {
        if (isMounted) setIsCheckingAuth(false);
        return;
      }

      // If no access token in memory/storage, attempt refresh token rotation
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const newToken = await tryRefreshToken();
          if (newToken && isMounted) {
            setIsCheckingAuth(false);
            return;
          }
        } catch {
          // Token refresh failed
        }
      }

      // If neither access token nor valid refresh token exists, redirect to /login
      if (isMounted) {
        navigate('/login', { replace: true });
      }
    };

    verifySession();
    return () => { isMounted = false; };
  }, [navigate]);

  // Singular and Plural Alias Mapping so URLs like /mentors, /schools, /colleges work 100%
>>>>>>> origin/omsai
  const roleAliasMap: Record<string, RoleType> = {
    'student': 'student',
    'students': 'student',
    'learner': 'student',

    'super-admin': 'super-admin',
    'superadmin': 'super-admin',
    'admin': 'super-admin',
    
    'school': 'school',
    'schools': 'school',
    
    'college': 'college',
    'colleges': 'college',
    
    'mentor': 'mentor',
    'mentors': 'mentor',
    'counselor': 'mentor',
    
    'training': 'training',
    'trainings': 'training',
    
    'recruiter': 'recruiter',
    'recruiters': 'recruiter',
    'hr': 'recruiter',
    
    'company': 'company',
<<<<<<< HEAD
    'companies': 'company'
=======
    'companies': 'company',
    'enterprise': 'company',

    'parent': 'parent',
    'parents': 'parent',
    'family': 'parent',

    'student': 'parent',
    'students': 'parent',
    'learner': 'parent'
>>>>>>> origin/omsai
  };

  // Dedicated standalone module direct paths (e.g. /discover, /scholarships, /jobs)
  const standaloneModules = [
    'discover', 'scholarships', 'learning-center', 'learning',
    'resume-builder', 'resume', 'interview-ai', 'jobs', 'notifications', 'profile'
  ];

  // Parse path segments reactively using useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const isPortalPrefix = pathSegments[0]?.toLowerCase() === 'portal';
  const rawPathRole = isPortalPrefix ? (pathSegments[1]?.toLowerCase() || '') : (pathSegments[0]?.toLowerCase() || '');
  const rawParamRole = (params.role || '').toLowerCase();

  // Check if top segment is a standalone module directly (e.g. /jobs -> workspace=student, subview=jobs)
  const isDirectModule = standaloneModules.includes(rawPathRole);
  
  const resolvedRole: RoleType = isDirectModule 
    ? 'student' 
    : (roleAliasMap[rawParamRole] || roleAliasMap[rawPathRole] || 'student');
  const currentWorkspace: RoleType = resolvedRole;

<<<<<<< HEAD
  const activeSubView = isDirectModule 
    ? rawPathRole 
    : ((params["*"] || pathSegments[1] || 'overview').toLowerCase().replace(/^\//, '') || 'overview');
=======
  // Synchronous, flicker-free activeSubView derived directly from URL location
  const rawSubView = isPortalPrefix ? (pathSegments[2] || 'overview') : (params["*"] || pathSegments[1] || 'overview');
  const activeSubView = rawSubView.toLowerCase().replace(/^\//, '') || 'overview';
>>>>>>> origin/omsai

  const [activeRoleFilter, setActiveRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState<EcosystemEntity | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('role_ready_theme');
      if (savedTheme !== null) {
        return savedTheme === 'dark';
      }
    }
    return true; // Default to dark mode
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('role_ready_theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // TanStack Query Hooks
  const { data: entities = [] } = useQuery({
    queryKey: ['entities'],
    queryFn: fetchEntities
  });

  const { data: auditLogs = [] } = useQuery({
    queryKey: ['auditLogs'],
    queryFn: fetchAuditLogs
  });

  // Mutations
  const addEntityMutation = useMutation({
    mutationFn: addEntity,
    onSuccess: (newEnt) => {
      queryClient.invalidateQueries({ queryKey: ['entities'] });
      queryClient.invalidateQueries({ queryKey: ['auditLogs'] });
      showToast(`Provisioned access for ${newEnt.name}!`);
    }
  });

  const updateEntityMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<EcosystemEntity> }) => updateEntity(id, updates),
    onSuccess: (updatedEnt) => {
      queryClient.invalidateQueries({ queryKey: ['entities'] });
      queryClient.invalidateQueries({ queryKey: ['auditLogs'] });
      showToast(`Updated access configuration for ${updatedEnt.name}`);
    }
  });

  const deleteEntityMutation = useMutation({
    mutationFn: deleteEntity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entities'] });
      queryClient.invalidateQueries({ queryKey: ['auditLogs'] });
      showToast(`Revoked partner entity access successfully`);
    }
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleWorkspaceChange = (role: RoleType) => {
    const prefix = isPortalPrefix ? '/portal' : '';
    navigate(`${prefix}/${role}`);
    showToast(`Switched to ${role.toUpperCase()} Workspace Portal!`);
  };

  const handleViewChange = (view: string) => {
    const prefix = isPortalPrefix ? '/portal' : '';
    if (view === 'overview') {
      navigate(`${prefix}/${currentWorkspace}`);
    } else {
      navigate(`${prefix}/${currentWorkspace}/${view}`);
    }
  };

  const handleSimulateWorkspace = (role: RoleType) => {
    handleWorkspaceChange(role);
  };

  // Header Title Mapping
  const getSubViewTitle = (): string => {
    if (activeSubView === 'overview') {
      const portalNames: Record<RoleType, string> = {
        'student': 'Student Career Readiness Workspace',
        'super-admin': 'Super Admin Governance Hub',
        'school': 'School Admin Portal Overview',
        'college': 'College Admin Portal Overview',
        'mentor': 'Mentor & Counselor Desk Overview',
        'training': 'Training Institute Portal Overview',
        'recruiter': 'Recruiter Talent Desk Overview',
        'company': 'Enterprise Company Portal Overview',
        'parent': 'Parent & Family Intelligence Portal Overview'
      };
      return portalNames[currentWorkspace] || 'Workspace Overview';
    }

    if (activeSubView === 'profile') {
      const profileTitles: Record<RoleType, string> = {
        'super-admin': 'Super Admin Governance Profile & Security',
        'school': 'School Admin Profile & Account Settings',
        'college': 'College Admin Profile & Account Settings',
        'mentor': 'Mentor Profile & Credentials Verification',
        'training': 'Training Academy Profile & Credentials',
        'recruiter': 'Recruiter Profile & Corporate Settings',
        'company': 'Enterprise Company Profile & Verification',
        'parent': 'Parent Profile & Family Governance Settings'
      };
      return profileTitles[currentWorkspace] || 'User Profile & Settings';
    }

    if (currentWorkspace === 'parent') {
      const parentTitles: Record<string, string> = {
        'children': 'My Children & Student Credentials Desk',
        'accounts': 'Family Accounts & Member Governance',
        'attendance': 'Child Attendance & Classroom Presence',
        'academic': 'Academic Performance & Subject Mastery Analysis',
        'learning': 'Student Learning Progress & Course Tracks',
        'career': 'Career Progress, DNA & Milestones Roadmap',
        'career-reports': 'AI Career Guidance & Diagnostic Reports',
        'family-reports': 'Family AI Guidance & Milestone Reports',
        'scholarships': 'Scholarship Directory & Financial Aid Opportunities',
        'mentors': '1-on-1 Mentor & Counselor Booking Desk',
        'notifications': 'Family & Student Activity Notifications',
        'subscription': 'Family Subscription & Seat Allocation Plans',
        'settings': 'Parent Account Settings & Security',
        'fees': 'Fee Management & Subscription Invoicing'
      };
      if (parentTitles[activeSubView]) {
        return parentTitles[activeSubView];
      }
    }

    const titles: Record<string, string> = {
      'discover': 'Career Discovery & Neural Alignment Engine',
      'scholarships': 'Scholarships & Institutional Merit Aid Cell',
      'learning-center': 'Learning Center & Skill Bootcamps',
      'learning': 'Learning Center & Skill Bootcamps',
      'resume-builder': 'AI Resume Builder & ATS Scanner',
      'resume': 'AI Resume Builder & ATS Scanner',
      'interview-ai': 'Interview AI Simulator & Real-time Practice',
      'interviews': 'Scheduled Candidate Interviews & AI Simulator',
      'jobs': 'Jobs & Corporate Internships Marketplace',
      'notifications': 'Central Notifications & System Alerts',
      'profile': 'User Profile & Skill Matrix Manager',

      'access': 'Access Provisioning & Quota Management Hub',
      'rbac': 'Role-Based Access Control (RBAC) Matrix',
      'ai': 'AI Recommendation Engine Control',
      'audit': 'System Security Audit & Compliance Logs',
      'students': 'Students Roster Management',
      'teachers': 'Teacher & Faculty Management',
      'assessments': 'Assessments & Career Readiness',
      'reports': 'Career & AI Intelligence Reports',
      'events': 'Events & Guidance Workshops',
<<<<<<< HEAD
      'analytics': 'Student Analytics & Growth'
=======
      'analytics': 'Student Analytics & Growth',
      'performance': 'Performance Monitoring Dashboard',
      'placement': 'Placement & Internship Readiness Reports',
      'notifications': 'Portal Notifications Desk',
      'settings': 'School Governance & Settings',
      'programs': 'Academic Programs & Degree Tracks',
      'admissions': 'College Admissions & Cutoff Management',
      'applications': 'Student Applications & Enrollment Pipeline',
      'scholarships': 'Institutional Scholarship & Aid Cell',
      'placement-cell': 'Campus Placement Cell & Drive Hub',
      'industry-connect': 'Corporate Recruiter & Industry MoUs',
      'availability': 'Slot Booking & Availability Calendar',
      'student-requests': 'Student Counseling Booking Requests',
      'video-sessions': 'Live 1-on-1 Video Counseling Room',
      'guidance': 'Student Assessment Review & Career Guidance',
      'ratings': 'Student Ratings & Session Reviews',
      'wallet': 'Mentor Wallet Earnings & Payout Desk',
      'verification': 'Company Profile & Enterprise Verification',
      'campus-hiring': 'University Campus Hiring & Placement Drives',
      'student-search': 'Student Talent Search & Candidate Database',
      'ai-match': 'AI Neural Candidate Matcher Engine',
      'hiring-analytics': 'Hiring Analytics & Placement Funnel',
      'drives': 'Campus Placement Drives',
      'skills': 'Student Skill Matrix & ATS Fit',
      'recruiters': 'Corporate Recruiting Partners',
      'offers': 'Offer Letters & Compensation (CTC)',
      'calendar': 'Counseling Booking Calendar',
      'mentees': 'Assigned Mentees Roster',
      'counseling': 'Counseling Notes & Video Room',
      'courses': 'Skill Courses & Curriculum Track',
      'certs': 'Certifications Registry',
      'hiring': 'Hiring Partner Enterprises',
      'jobs': 'Job & Internship Requisitions',
      'matcher': 'AI Candidate Matcher Engine',
      'interviews': 'Scheduled Candidate Interviews',
      'pipeline': 'Talent Funnel Pipeline',
      'discovery': 'AI Career Discovery Engine',
      'dna': 'Student Career DNA Profile',
      'roadmap': 'Personalized Career Milestones Roadmap',
      'resume': 'AI Student Resume & Portfolio Suite',
      'learning': 'Student Learning Journey & Courses',
      'colleges': 'College & University Explorer',
      'mentors': '1-on-1 Mentor & Counselor Booking Desk',
      'fees': 'Fee Management & Subscription Invoicing'
>>>>>>> origin/omsai
    };

    return titles[activeSubView] || `${activeSubView.toUpperCase()} Workspace`;
  };

  if (isCheckingAuth) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center font-sans ${
        isDarkMode ? 'bg-[#0f1228] text-white' : 'bg-slate-50 text-slate-900'
      }`}>
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-semibold text-slate-400">Verifying authentication session...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex w-full transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Sidebar Navigation */}
      <Sidebar
        currentWorkspace={currentWorkspace}
        onWorkspaceChange={handleWorkspaceChange}
        activeView={activeSubView}
        onViewChange={handleViewChange}
        onRoleFilter={setActiveRoleFilter}
        totalEntities={entities.length}
        isDarkMode={isDarkMode}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Body (Flex Sibling to Sidebar - Zero Overlap) */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-x-hidden">
        {/* Top Header */}
        <Topbar
          currentWorkspace={currentWorkspace}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onShowToast={showToast}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
          onNavigateNotifications={() => handleViewChange('notifications')}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
        />

        {/* Page Content View Area */}
        <main key={`${currentWorkspace}-${activeSubView}`} className="p-4 sm:p-6 lg:p-8 flex-1 animate-fade-in min-w-0 w-full" role="main">
          {/* Toast Notification Banner */}
          {toastMessage && (
<<<<<<< HEAD
            <div role="status" aria-live="polite" className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl shadow-xl border border-blue-500/30 flex items-center gap-3 animate-bounce max-w-xs sm:max-w-md">
              <FaCircleCheck className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="text-xs font-medium truncate">{toastMessage}</span>
            </div>
          )}

          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="min-w-0">
              <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
=======
            <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-blue-500/30 flex items-center gap-3 animate-bounce">
              <FiCheckCircle className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-semibold">{toastMessage}</span>
            </div>
          )}

          {/* Clean Single Title Page Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className={`text-[30px] md:text-[32px] font-bold leading-[1.2] tracking-[-0.02em] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
>>>>>>> origin/omsai
                {getSubViewTitle()}
              </h1>
            </div>

            {currentWorkspace === 'super-admin' && (activeSubView === 'access' || activeSubView === 'overview') && (
              <button
                onClick={() => setIsGrantModalOpen(true)}
<<<<<<< HEAD
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 shrink-0 self-start sm:self-auto"
=======
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[14px] px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
>>>>>>> origin/omsai
              >
                <FiPlus className="w-4 h-4" />
                <span>Provision Partner Access</span>
              </button>
            )}
          </div>

          {/* Component View Router */}
          {currentWorkspace === 'super-admin' ? (
            <SuperAdminDashboard
              activeSubView={activeSubView}
              entities={entities}
              auditLogs={auditLogs}
              activeRoleFilter={activeRoleFilter}
              searchQuery={searchQuery}
              onFilterChange={setActiveRoleFilter}
              onSimulateWorkspace={handleSimulateWorkspace}
              onEditEntity={(ent) => setEditingEntity(ent)}
              onToggleStatus={(id) => {
                const ent = entities.find(e => e.id === id);
                if (ent) {
                  const newStatus: StatusType = ent.status === 'active' ? 'suspended' : 'active';
                  updateEntityMutation.mutate({ id, updates: { status: newStatus } });
                }
              }}
              onDeleteEntity={(id) => {
                if (confirm("Are you sure you want to revoke access for this partner entity?")) {
                  deleteEntityMutation.mutate(id);
                }
              }}
              onWorkspaceChange={handleWorkspaceChange}
              onShowToast={showToast}
              isDarkMode={isDarkMode}
            />
          ) : (
            <RoleWorkspaceViews
              currentWorkspace={currentWorkspace}
              activeSubView={activeSubView}
              onShowToast={showToast}
              onNavigateView={handleViewChange}
              isDarkMode={isDarkMode}
            />
          )}
        </main>
      </div>

      {/* Grant Access Modal */}
      <GrantAccessModal
        isOpen={isGrantModalOpen}
        onClose={() => setIsGrantModalOpen(false)}
        onSubmit={(data) => addEntityMutation.mutate(data)}
        isDarkMode={isDarkMode}
      />

      {/* Edit Access Modal */}
      <EditModal
        entity={editingEntity}
        isOpen={!!editingEntity}
        onClose={() => setEditingEntity(null)}
        onSave={(id, updates) => updateEntityMutation.mutate({ id, updates })}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
