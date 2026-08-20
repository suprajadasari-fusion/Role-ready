import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEntities, fetchAuditLogs, addEntity, updateEntity, deleteEntity } from '../lib/api';
import { RoleType, EcosystemEntity, StatusType } from '../lib/types';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { GrantAccessModal } from '../components/GrantAccessModal';
import { EditModal } from '../components/EditModal';
import { RoleWorkspaceViews } from '../components/RoleWorkspaceViews';
import { SuperAdminDashboard } from '../components/Pages/SuperAdminDashboard';
import { FaCircleCheck, FaPlus } from 'react-icons/fa6';

export default function RoleDashboardRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  // Singular and Plural Alias Mapping so URLs like /mentors, /schools, /colleges work 100%
  const roleAliasMap: Record<string, RoleType> = {
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
    'counselors': 'mentor',
    
    'training': 'training',
    'trainings': 'training',
    'academy': 'training',
    'academies': 'training',
    
    'recruiter': 'recruiter',
    'recruiters': 'recruiter',
    'hr': 'recruiter',
    
    'company': 'company',
    'companies': 'company',
    'enterprise': 'company'
  };

  // Parse path segments reactively using useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const rawPathRole = pathSegments[0]?.toLowerCase() || '';
  const rawParamRole = (params.role || '').toLowerCase();

  const resolvedRole = roleAliasMap[rawParamRole] || roleAliasMap[rawPathRole] || 'super-admin';
  const currentWorkspace: RoleType = resolvedRole;

  // Synchronous, flicker-free activeSubView derived directly from URL location
  const activeSubView = (params["*"] || pathSegments[1] || 'overview').toLowerCase().replace(/^\//, '') || 'overview';

  const [activeRoleFilter, setActiveRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  // Sync theme changes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('role_ready_theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => {
      const nextTheme = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('role_ready_theme', nextTheme ? 'dark' : 'light');
      }
      return nextTheme;
    });
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

  // TanStack Query Mutations
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
    navigate(`/${role}`);
    showToast(`Switched to ${role.toUpperCase()} Workspace Portal!`);
  };

  const handleViewChange = (view: string) => {
    if (view === 'overview') {
      navigate(`/${currentWorkspace}`);
    } else {
      navigate(`/${currentWorkspace}/${view}`);
    }
  };

  const handleSimulateWorkspace = (role: RoleType) => {
    handleWorkspaceChange(role);
  };

  // Clean Header Title Mapping
  const getSubViewTitle = (): string => {
    if (activeSubView === 'overview') {
      const portalNames: Record<RoleType, string> = {
        'super-admin': 'Super Admin Governance Hub',
        'school': 'School Admin Portal Overview',
        'college': 'College Admin Portal Overview',
        'mentor': 'Mentor & Counselor Desk Overview',
        'training': 'Training Institute Portal Overview',
        'recruiter': 'Recruiter Talent Desk Overview',
        'company': 'Enterprise Company Portal Overview'
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
        'company': 'Enterprise Company Profile & Verification'
      };
      return profileTitles[currentWorkspace] || 'User Profile & Settings';
    }

    const titles: Record<string, string> = {
      'access': 'Access Provisioning & Quota Management Hub',
      'rbac': 'Role-Based Access Control (RBAC) Matrix',
      'ai': 'AI Recommendation Engine Control',
      'audit': 'System Security Audit & Compliance Logs',
      'students': 'Students (Grades 8 - 12 Roster)',
      'teachers': 'Teacher & Faculty Management',
      'assessments': 'Assessments & Career Readiness',
      'reports': 'Career & AI Intelligence Reports',
      'events': 'Events & Guidance Workshops',
      'analytics': 'Student Analytics & Growth',
      'performance': 'Performance Monitoring Dashboard',
      'placement': 'Placement & Internship Readiness Reports',
      'notifications': 'School Admin Notifications',
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
      'internships': 'Corporate Internship Programs',
      'partnerships': 'Campus University MoUs',
      'pipeline': 'Talent Funnel Pipeline'
    };

    return titles[activeSubView] || `${activeSubView.toUpperCase()} View`;
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-200 ${
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
      />

      {/* Main Content Body */}
      <div className="pl-72 flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Topbar
          currentWorkspace={currentWorkspace}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onShowToast={showToast}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
        />

        {/* Page Content View Area with Flicker-Free Keyed Smooth Transition */}
        <main key={`${currentWorkspace}-${activeSubView}`} className="p-8 flex-1 animate-fade-in">
          {/* Toast Notification Banner */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-blue-500/30 flex items-center gap-3 animate-bounce">
              <FaCircleCheck className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-semibold">{toastMessage}</span>
            </div>
          )}

          {/* Clean Single Title Page Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className={`text-2xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {getSubViewTitle()}
              </h1>
            </div>

            {/* Subview Action Button */}
            {currentWorkspace === 'super-admin' && (activeSubView === 'access' || activeSubView === 'overview') && (
              <button
                onClick={() => setIsGrantModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <FaPlus className="w-3.5 h-3.5" />
                <span>Provision Partner Access</span>
              </button>
            )}
          </div>

          {/* Dedicated Dashboard Component Rendering (1 Component per Dashboard) */}
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
