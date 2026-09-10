import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { EcosystemEntity, AuditLog, RoleType } from '../../lib/types';
import { fetchAdminHealth } from '../../lib/api';
import { MetricsGrid } from '../MetricsGrid';
import { EntitiesTable } from '../EntitiesTable';
import { RBACMatrix } from '../RBACMatrix';
import { AIEngineConfig } from '../AIEngineConfig';
import { AuditFeed } from '../AuditFeed';
import { UserProfileView } from '../profile/UserProfileView';
import { 
<<<<<<< HEAD
  FaSchool, 
  FaGraduationCap, 
  FaUserCheck, 
  FaChalkboardUser, 
  FaBriefcase, 
  FaBuilding
} from 'react-icons/fa6';
=======
  FiShield, 
  FiBookOpen, 
  FiUserCheck, 
  FiBriefcase, 
  FiGrid, 
  FiCompass,
  FiCheckCircle,
  FiActivity,
  FiServer,
  FiUsers
} from 'react-icons/fi';
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c

interface SuperAdminDashboardProps {
  activeSubView: string;
  entities: EcosystemEntity[];
  auditLogs: AuditLog[];
  activeRoleFilter: string;
  searchQuery: string;
  onFilterChange: (filter: string) => void;
  onSimulateWorkspace: (role: RoleType) => void;
  onEditEntity: (entity: EcosystemEntity) => void;
  onToggleStatus: (id: string) => void;
  onDeleteEntity: (id: string) => void;
  onWorkspaceChange: (role: RoleType) => void;
  onShowToast: (msg: string) => void;
  isDarkMode: boolean;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  activeSubView,
  entities,
  auditLogs,
  activeRoleFilter,
  searchQuery,
  onFilterChange,
  onSimulateWorkspace,
  onEditEntity,
  onToggleStatus,
  onDeleteEntity,
  onWorkspaceChange,
  onShowToast,
  isDarkMode
}) => {
  // Live Admin Health Query strictly from /api/v1/users/admin/health
  const { data: adminHealth } = useQuery({
    queryKey: ['adminHealth'],
    queryFn: fetchAdminHealth,
    retry: 1
  });

  const totalSeats = entities.reduce((acc, curr) => acc + curr.seats, 0);
  const pendingCount = entities.filter(e => e.status === 'pending').length;

  const cardClass = isDarkMode
    ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
    : 'bg-white border-blue-100 text-slate-900 shadow-sm';

  const subCardClass = isDarkMode
    ? 'bg-slate-800/80 border-slate-700/80 text-white'
    : 'bg-blue-50/40 border-blue-100 text-slate-900';

  const textMuted = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const textHeading = isDarkMode ? 'text-white' : 'text-slate-900';

  // 1. DEDICATED ACCESS PROVISIONING HUB PAGE
  if (activeSubView === 'access') {
    return (
      <EntitiesTable
        entities={entities}
        activeFilter={activeRoleFilter}
        onFilterChange={onFilterChange}
        searchQuery={searchQuery}
        onSimulateWorkspace={onSimulateWorkspace}
        onEditEntity={onEditEntity}
        onToggleStatus={onToggleStatus}
        onDeleteEntity={onDeleteEntity}
        isDarkMode={isDarkMode}
      />
    );
  }

  // 2. DEDICATED RBAC MATRIX PAGE
  if (activeSubView === 'rbac') {
    return <RBACMatrix onSave={() => onShowToast("Saved global RBAC Matrix policies!")} isDarkMode={isDarkMode} />;
  }

  // 3. DEDICATED AI ENGINE CONFIGURATION PAGE
  if (activeSubView === 'ai') {
    return <AIEngineConfig onSaveWeights={() => onShowToast("Applied new AI recommendation weights!")} isDarkMode={isDarkMode} />;
  }

  // 4. DEDICATED AUDIT & COMPLIANCE LOGS PAGE
  if (activeSubView === 'audit') {
    return <AuditFeed logs={auditLogs} showFullTable={true} isDarkMode={isDarkMode} />;
  }

  // 5. DEDICATED SUPER ADMIN PROFILE PAGE
  if (activeSubView === 'profile') {
    return <UserProfileView onShowToast={onShowToast} isDarkMode={isDarkMode} />;
  }

  // 6. SUPER ADMIN OVERVIEW DASHBOARD PAGE
  return (
    <div className="space-y-8 font-sans">
      <MetricsGrid
        currentWorkspace="super-admin"
        totalEntities={entities.length}
        totalSeats={totalSeats}
        pendingCount={pendingCount}
        isDarkMode={isDarkMode}
      />

      {/* Ecosystem Partner Verticals Overview Cards */}
      <div className={`rounded-2xl border p-6 transition-colors duration-200 ${cardClass}`}>
        <h3 className={`font-semibold text-base mb-4 ${textHeading}`}>Registered Ecosystem Partner Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          {[
            { name: "School Admins", role: 'school', icon: FiBookOpen },
            { name: "College Admins", role: 'college', icon: FiBookOpen },
            { name: "Mentors & Counselors", role: 'mentor', icon: FiUserCheck },
            { name: "Training Academies", role: 'training', icon: FiGrid },
            { name: "Recruiters & HR", role: 'recruiter', icon: FiBriefcase },
            { name: "Companies", role: 'company', icon: FiGrid },
            { name: "Parents & Families", role: 'parent', icon: FiUsers }
          ].map((v, i) => {
            const count = entities.filter(e => e.role === v.role).length;
            const Icon = v.icon;
            return (
              <div 
                key={i} 
                onClick={() => onWorkspaceChange(v.role as RoleType)}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 ${subCardClass} hover:-translate-y-1 hover:shadow-lg hover:border-blue-500`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-blue-500" />
                  <div>
<<<<<<< HEAD:app/components/dashboards/SuperAdminDashboard.tsx
                    <div className={`font-semibold text-sm ${textHeading}`}>{v.name}</div>
                    <div className={`text-xs font-normal ${textMuted}`}>{v.count}</div>
                  </div>
                </div>
                <span className="text-xs font-medium bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/30">
                  Active
=======
                    <div className={`font-bold ${textHeading}`}>{v.name}</div>
                    <div className={`text-[11px] ${textMuted}`}>{count} Registered</div>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                  count > 0 
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                    : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                }`}>
                  {count > 0 ? 'Active' : 'Standby'}
>>>>>>> origin/omsai:app/components/Pages/SuperAdminDashboard.tsx
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audit Stream & Telemetry Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AuditFeed logs={auditLogs} isDarkMode={isDarkMode} />
        <div className={`rounded-2xl border p-6 ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-blue-100 text-slate-900 shadow-xs'
        }`}>
<<<<<<< HEAD:app/components/dashboards/SuperAdminDashboard.tsx
          <h3 className="font-semibold text-base mb-3">TanStack Query Cache Telemetry</h3>
          <div className="space-y-2 text-sm">
            <div className={`flex justify-between p-2.5 rounded-xl ${
              isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-blue-50/50 text-slate-600'
            }`}>
              <span>Entities Cached Records</span>
              <strong className="text-blue-500 font-semibold">{entities.length} items</strong>
=======
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <FiServer className="w-4 h-4 text-emerald-400" />
            <span>Platform System Health</span>
          </h3>
          <div className="space-y-2 text-xs">
            <div className={`flex justify-between p-2.5 rounded-xl ${
              isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-blue-50/50 text-slate-600'
            }`}>
              <span>Database Status</span>
              <strong className={adminHealth?.dbConnected ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                {adminHealth?.dbConnected ? "Connected (Healthy)" : "Checking..."}
              </strong>
>>>>>>> origin/omsai:app/components/Pages/SuperAdminDashboard.tsx
            </div>
            <div className={`flex justify-between p-2.5 rounded-xl ${
              isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-blue-50/50 text-slate-600'
            }`}>
<<<<<<< HEAD:app/components/dashboards/SuperAdminDashboard.tsx
              <span>Audit Stream Cached Records</span>
              <strong className="text-blue-500 font-semibold">{auditLogs.length} logs</strong>
=======
              <span>System Status</span>
              <strong className="text-emerald-400 font-bold">{adminHealth?.status || "Online"}</strong>
>>>>>>> origin/omsai:app/components/Pages/SuperAdminDashboard.tsx
            </div>
            <div className={`flex justify-between p-2.5 rounded-xl ${
              isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-blue-50/50 text-slate-600'
            }`}>
<<<<<<< HEAD:app/components/dashboards/SuperAdminDashboard.tsx
              <span>Active Workspace</span>
              <span className="text-blue-500 font-mono font-semibold">Super Admin</span>
=======
              <span>Platform Environment</span>
              <span className="text-emerald-400 font-semibold text-[11px]">Production (Active)</span>
>>>>>>> origin/omsai:app/components/Pages/SuperAdminDashboard.tsx
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
