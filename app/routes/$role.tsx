import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEntities, fetchAuditLogs, addEntity, updateEntity, deleteEntity } from '~/lib/api';
import { RoleType, EcosystemEntity, StatusType } from '~/lib/types';
import { Sidebar } from '~/components/Sidebar';
import { Topbar } from '~/components/Topbar';
import { GrantAccessModal } from '~/components/GrantAccessModal';
import { EditModal } from '~/components/EditModal';
import { RoleWorkspaceViews } from '~/components/RoleWorkspaceViews';
import { SuperAdminDashboard } from '~/components/dashboards/SuperAdminDashboard';
import { FaCircleCheck, FaPlus } from 'react-icons/fa6';

export default function RoleDashboardRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  // Singular and Plural Alias Mapping so URLs like /student, /discover, /schools work 100%
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
    'companies': 'company'
  };

  // Dedicated standalone module direct paths (e.g. /discover, /scholarships, /jobs)
  const standaloneModules = [
    'discover', 'scholarships', 'learning-center', 'learning',
    'resume-builder', 'resume', 'interview-ai', 'jobs', 'notifications', 'profile'
  ];

  // Parse path segments reactively using useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const rawPathRole = pathSegments[0]?.toLowerCase() || '';
  const rawParamRole = (params.role || '').toLowerCase();

  // Check if top segment is a standalone module directly (e.g. /jobs -> workspace=student, subview=jobs)
  const isDirectModule = standaloneModules.includes(rawPathRole);
  
  const resolvedRole: RoleType = isDirectModule 
    ? 'student' 
    : (roleAliasMap[rawParamRole] || roleAliasMap[rawPathRole] || 'student');
  const currentWorkspace: RoleType = resolvedRole;

  const activeSubView = isDirectModule 
    ? rawPathRole 
    : ((params["*"] || pathSegments[1] || 'overview').toLowerCase().replace(/^\//, '') || 'overview');

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
        'company': 'Enterprise Company Portal Overview'
      };
      return portalNames[currentWorkspace] || 'Workspace Overview';
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
      'analytics': 'Student Analytics & Growth'
    };

    return titles[activeSubView] || `${activeSubView.toUpperCase()} Workspace`;
  };

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
            <div role="status" aria-live="polite" className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl shadow-xl border border-blue-500/30 flex items-center gap-3 animate-bounce max-w-xs sm:max-w-md">
              <FaCircleCheck className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="text-xs font-medium truncate">{toastMessage}</span>
            </div>
          )}

          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="min-w-0">
              <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {getSubViewTitle()}
              </h1>
            </div>

            {currentWorkspace === 'super-admin' && (activeSubView === 'access' || activeSubView === 'overview') && (
              <button
                onClick={() => setIsGrantModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 shrink-0 self-start sm:self-auto"
              >
                <FaPlus className="w-3.5 h-3.5" />
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
