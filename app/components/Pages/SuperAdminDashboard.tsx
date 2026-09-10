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
  const borderDivider = isDarkMode ? 'border-slate-800' : 'border-slate-100';

  // 0. DEDICATED PROFILE & ACCOUNT MANAGEMENT PAGE
  if (activeSubView === 'profile') {
    return <UserProfileView onShowToast={onShowToast} isDarkMode={isDarkMode} />;
  }

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

  // 2. USER MANAGEMENT & INDIVIDUAL ROLE MANAGEMENT PAGES
  const roleSubviews: Record<string, string> = {
    'users': 'all',
    'parents': 'parent',
    'mentors': 'mentor',
    'recruiters': 'recruiter',
    'schools': 'school',
    'colleges': 'college',
    'training-institutes': 'training',
    'companies': 'company'
  };

  if (roleSubviews[activeSubView] !== undefined) {
    return (
      <EntitiesTable
        entities={entities}
        activeFilter={roleSubviews[activeSubView]}
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

  // 3. PENDING INSTITUTIONAL APPROVALS PAGE
  if (activeSubView === 'approvals') {
    const pendingEntities = entities.filter(e => e.status === 'pending');
    return (
      <div className={`rounded-2xl border p-6 space-y-6 ${cardClass}`}>
        <div className={`pb-4 border-b ${borderDivider} flex items-center justify-between`}>
          <div>
            <h2 className={`text-xl font-bold flex items-center gap-2 ${textHeading}`}>
              <FiShield className="w-5 h-5 text-amber-400" />
              Pending Institutional & Partner Approvals
            </h2>
            <p className={`text-xs mt-1 ${textMuted}`}>
              Review and approve pending school, college, corporate, and mentor verification requests.
            </p>
          </div>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-semibold">
            {pendingEntities.length} Pending Approvals
          </span>
        </div>

        {pendingEntities.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400 border border-dashed border-slate-700/60 rounded-2xl">
            <FiCheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-80" />
            <h4 className="text-sm font-semibold text-slate-200">All Registrations Approved</h4>
            <p className="mt-1">No institutional partners are currently awaiting manual verification.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingEntities.map((ent) => (
              <div key={ent.id} className={`p-4 rounded-xl border flex items-center justify-between ${subCardClass}`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${textHeading}`}>{ent.name}</span>
                    <span className="text-[11px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-semibold uppercase">
                      {ent.role}
                    </span>
                  </div>
                  <p className={`text-xs mt-0.5 ${textMuted}`}>{ent.contactEmail || 'Verified Entity'} • {ent.seats} Allocated Seats</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onToggleStatus(ent.id);
                      onShowToast(`Approved and activated access for ${ent.name}!`);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Reject registration for ${ent.name}?`)) {
                        onDeleteEntity(ent.id);
                      }
                    }}
                    className="bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 text-xs font-semibold px-3 py-2 rounded-xl transition cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 4. REPORTS & ANALYTICS PAGE
  if (activeSubView === 'reports' || activeSubView === 'analytics') {
    return (
      <div className="space-y-6">
        <MetricsGrid
          currentWorkspace="super-admin"
          totalEntities={entities.length}
          totalSeats={totalSeats}
          pendingCount={pendingCount}
          isDarkMode={isDarkMode}
        />
        <div className={`rounded-2xl border p-6 ${cardClass}`}>
          <div className={`pb-4 border-b ${borderDivider}`}>
            <h3 className={`font-bold text-sm ${textHeading}`}>Ecosystem Growth & Platform Telemetry</h3>
            <p className={`text-xs mt-1 ${textMuted}`}>Cross-vertical performance and engagement statistics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className={`p-4 rounded-xl border ${subCardClass} text-center`}>
              <span className="text-2xl font-bold text-blue-400 block">{totalSeats}</span>
              <span className="text-xs font-semibold text-slate-300 mt-1 block">Total Student Licenses</span>
              <span className={`text-[11px] ${textMuted}`}>Across schools & academies</span>
            </div>
            <div className={`p-4 rounded-xl border ${subCardClass} text-center`}>
              <span className="text-2xl font-bold text-emerald-400 block">{entities.filter(e => e.status === 'active').length}</span>
              <span className="text-xs font-semibold text-slate-300 mt-1 block">Active Verified Partners</span>
              <span className={`text-[11px] ${textMuted}`}>Full platform compliance</span>
            </div>
            <div className={`p-4 rounded-xl border ${subCardClass} text-center`}>
              <span className="text-2xl font-bold text-purple-400 block">{auditLogs.length}</span>
              <span className="text-xs font-semibold text-slate-300 mt-1 block">Logged System Audits</span>
              <span className={`text-[11px] ${textMuted}`}>Security telemetry trail</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. DEDICATED RBAC MATRIX PAGE
  if (activeSubView === 'rbac') {
    return <RBACMatrix onSave={() => onShowToast("Saved global RBAC Matrix policies!")} isDarkMode={isDarkMode} />;
  }

  // 6. DEDICATED AI ENGINE CONFIGURATION PAGE
  if (activeSubView === 'ai') {
    return <AIEngineConfig onSaveWeights={() => onShowToast("Applied new AI recommendation weights!")} isDarkMode={isDarkMode} />;
  }

  // 7. DEDICATED AUDIT & COMPLIANCE LOGS PAGE
  if (activeSubView === 'audit') {
    return <AuditFeed logs={auditLogs} showFullTable={true} isDarkMode={isDarkMode} />;
  }

  // 8. DEDICATED SUPER ADMIN PROFILE PAGE
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
        <h3 className={`font-bold text-sm mb-4 ${textHeading}`}>Registered Ecosystem Partner Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
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
            </div>
            <div className={`flex justify-between p-2.5 rounded-xl ${
              isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-blue-50/50 text-slate-600'
            }`}>
              <span>System Status</span>
              <strong className="text-emerald-400 font-bold">{adminHealth?.status || "Online"}</strong>
            </div>
            <div className={`flex justify-between p-2.5 rounded-xl ${
              isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-blue-50/50 text-slate-600'
            }`}>
              <span>Platform Environment</span>
              <span className="text-emerald-400 font-semibold text-[11px]">Production (Active)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
