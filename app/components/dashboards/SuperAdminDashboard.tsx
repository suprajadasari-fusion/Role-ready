import React from 'react';
import { EcosystemEntity, AuditLog, RoleType } from '../../lib/types';
import { MetricsGrid } from '../MetricsGrid';
import { EntitiesTable } from '../EntitiesTable';
import { RBACMatrix } from '../RBACMatrix';
import { AIEngineConfig } from '../AIEngineConfig';
import { AuditFeed } from '../AuditFeed';
import { 
  FiShield, 
  FiBookOpen, 
  FiUserCheck, 
  FiBriefcase, 
  FiGrid, 
  FiCompass 
} from 'react-icons/fi';

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

  // 5. SUPER ADMIN OVERVIEW DASHBOARD PAGE
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
        <h3 className={`font-bold text-sm mb-4 ${textHeading}`}>Registered Ecosystem Partner Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {[
            { name: "School Admins", count: "2 Registered", icon: FiBookOpen, role: 'school' },
            { name: "College Admins", count: "1 Registered", icon: FiBookOpen, role: 'college' },
            { name: "Mentors & Counselors", count: "1 Registered", icon: FiUserCheck, role: 'mentor' },
            { name: "Training Academies", count: "2 Registered", icon: FiGrid, role: 'training' },
            { name: "Recruiters & HR", count: "1 Registered", icon: FiBriefcase, role: 'recruiter' },
            { name: "Companies", count: "1 Registered", icon: FiGrid, role: 'company' }
          ].map((v, i) => {
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
                    <div className={`font-bold ${textHeading}`}>{v.name}</div>
                    <div className={`text-[11px] ${textMuted}`}>{v.count}</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/30">
                  Active
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
          <h3 className="font-bold text-sm mb-3">TanStack Query Cache Telemetry</h3>
          <div className="space-y-2 text-xs">
            <div className={`flex justify-between p-2.5 rounded-xl ${
              isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-blue-50/50 text-slate-600'
            }`}>
              <span>Entities Cached Records</span>
              <strong className="text-blue-400">{entities.length} items</strong>
            </div>
            <div className={`flex justify-between p-2.5 rounded-xl ${
              isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-blue-50/50 text-slate-600'
            }`}>
              <span>Audit Stream Cached Records</span>
              <strong className="text-blue-400">{auditLogs.length} logs</strong>
            </div>
            <div className={`flex justify-between p-2.5 rounded-xl ${
              isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-blue-50/50 text-slate-600'
            }`}>
              <span>Active Workspace</span>
              <span className="text-blue-400 font-mono font-bold">SUPER-ADMIN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
