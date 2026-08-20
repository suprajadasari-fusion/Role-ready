import React from 'react';
import { EcosystemEntity, RoleType } from '../lib/types';
import { 
  FiGrid, 
  FiExternalLink, 
  FiPower, 
  FiTrash2, 
  FiGlobe, 
  FiCheckCircle, 
  FiClock,
  FiBookOpen,
  FiBriefcase,
  FiAward,
  FiUserCheck,
  FiChevronRight
} from 'react-icons/fi';

interface EntitiesTableProps {
  entities: EcosystemEntity[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSimulateWorkspace: (role: RoleType) => void;
  onEditEntity: (entity: EcosystemEntity) => void;
  onToggleStatus: (id: string) => void;
  onDeleteEntity: (id: string) => void;
  isDarkMode?: boolean;
}

export const EntitiesTable: React.FC<EntitiesTableProps> = ({
  entities,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSimulateWorkspace,
  onEditEntity,
  onToggleStatus,
  onDeleteEntity,
  isDarkMode = false
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [deleteConfirmEntity, setDeleteConfirmEntity] = React.useState<EcosystemEntity | null>(null);
  const itemsPerPage = 5;

  const roleCounts: Record<string, number> = {
    all: entities.length,
    school: 0, college: 0, mentor: 0, training: 0, recruiter: 0, company: 0
  };

  entities.forEach(e => {
    if (roleCounts[e.role] !== undefined) roleCounts[e.role]++;
  });

  const filteredEntities = entities.filter(e => {
    const matchesFilter = activeFilter === 'all' || e.role === activeFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      e.name.toLowerCase().includes(q) ||
      e.contactEmail.toLowerCase().includes(q) ||
      e.domain.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  // Reset to page 1 when filter or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredEntities.length / itemsPerPage));
  const paginatedEntities = filteredEntities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const roleLabels: Record<string, string> = {
    school: "School Admin",
    college: "College Admin",
    mentor: "Mentor Desk",
    training: "Training Inst.",
    recruiter: "Recruiter HR",
    company: "Enterprise Co."
  };

  const cardClass = isDarkMode
    ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
    : 'bg-white border-blue-100 text-slate-900 shadow-sm';

  const textMuted = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const textHeading = isDarkMode ? 'text-white' : 'text-slate-900';
  const tableHeaderBg = isDarkMode ? 'bg-slate-800/80 text-slate-300 border-slate-700' : 'bg-slate-50/50 text-slate-400 border-slate-200';
  const borderDivider = isDarkMode ? 'border-slate-800' : 'border-slate-100';

  return (
    <div className={`rounded-2xl border p-6 mb-8 font-sans transition-colors duration-200 relative ${cardClass}`}>
      {/* Delete Confirmation Modal */}
      {deleteConfirmEntity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className={`max-w-md w-full p-6 rounded-2xl border shadow-2xl space-y-4 ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className="font-extrabold text-base text-rose-500 flex items-center gap-2">
              <FiTrash2 className="w-5 h-5" /> Revoke Partner Access?
            </h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Are you sure you want to revoke partner access for <strong className="text-white">{deleteConfirmEntity.name}</strong>? This will remove active portal privileges and delete credentials.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmEntity(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteEntity(deleteConfirmEntity.id);
                  setDeleteConfirmEntity(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition cursor-pointer shadow-md"
              >
                Confirm Revoke
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b ${borderDivider}`}>
        <div>
          <h2 className={`text-lg font-bold ${textHeading}`}>Partner Access & Governance Matrix</h2>
          <p className={`text-xs ${textMuted}`}>
            Super Admin authorization hub for Schools, Colleges, Mentors, Training Academies, Recruiters & Companies
          </p>
        </div>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {[
          { id: 'all', label: 'All Verticals', icon: FiGrid },
          { id: 'school', label: 'Schools', icon: FiBookOpen },
          { id: 'college', label: 'Colleges', icon: FiAward },
          { id: 'mentor', label: 'Mentors', icon: FiUserCheck },
          { id: 'training', label: 'Training', icon: FiBookOpen },
          { id: 'recruiter', label: 'Recruiters', icon: FiBriefcase },
          { id: 'company', label: 'Companies', icon: FiGrid }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                  : isDarkMode
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    : 'bg-blue-50 text-slate-700 hover:bg-blue-100 hover:text-blue-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                isActive 
                  ? 'bg-blue-700 text-white' 
                  : isDarkMode
                    ? 'bg-slate-700 text-blue-300'
                    : 'bg-blue-100 text-blue-700'
              }`}>
                {roleCounts[tab.id] || 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Entities Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${tableHeaderBg}`}>
              <th className="py-3.5 px-4 rounded-l-xl">Entity Name</th>
              <th className="py-3.5 px-4">Role Category</th>
              <th className="py-3.5 px-4">Admin Email & Domain</th>
              <th className="py-3.5 px-4">Approval Pipeline</th>
              <th className="py-3.5 px-4">Verification Status</th>
              <th className="py-3.5 px-4">Subscription Tier</th>
              <th className="py-3.5 px-4 rounded-r-xl text-right">Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y text-xs ${borderDivider}`}>
            {paginatedEntities.length === 0 ? (
              <tr>
                <td colSpan={7} className={`py-12 text-center ${textMuted}`}>
                  <FiGrid className="w-10 h-10 mx-auto text-blue-400 mb-2 opacity-60" />
                  No partner entities match the selected filter or search term.
                </td>
              </tr>
            ) : (
              paginatedEntities.map((e) => {
                const stage = e.approvalStage || (e.status === 'active' ? 'Live Portal' : 'Document Verification');
                const stageNum = 
                  stage === 'Live Portal' ? 7 :
                  stage === 'Subscription' ? 6 :
                  stage === 'Admin Approval' ? 5 :
                  stage === 'Background Check' ? 4 :
                  stage === 'Document Verification' ? 3 :
                  stage === 'Pending Review' ? 2 : 1;

                return (
                  <tr key={e.id} className={`transition-all duration-200 ${isDarkMode ? 'hover:bg-slate-800/80' : 'hover:bg-blue-50/70'}`}>
                    <td className={`py-4 px-4 font-bold ${textHeading}`}>
                      <div>{e.name}</div>
                      <span className={`text-[10px] font-mono ${textMuted}`}>ID: {e.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-transform duration-200 hover:scale-105 ${
                        isDarkMode ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {roleLabels[e.role] || e.role}
                      </span>
                    </td>
                    <td className={`py-4 px-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      <button 
                        onClick={() => onSimulateWorkspace(e.role)}
                        title={`Click email to open ${e.role} Workspace Dashboard`}
                        className="font-bold text-[#3665EE] hover:underline cursor-pointer text-left block"
                      >
                        {e.contactEmail}
                      </button>
                      <span className="text-[10px] text-blue-400 flex items-center gap-1">
                        <FiGlobe className="w-3 h-3" /> {e.domain}
                      </span>
                    </td>
                    <td className="py-4 px-4 min-w-[220px]">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span className="text-blue-500">Stage {stageNum} of 7: {stage}</span>
                          <span className="text-slate-400">{Math.round((stageNum / 7) * 100)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden flex">
                          <div 
                            className={`h-full transition-all duration-300 ${stage === 'Live Portal' ? 'bg-emerald-500' : 'bg-blue-600'}`} 
                            style={{ width: `${(stageNum / 7) * 100}%` }}
                          />
                        </div>
                        <div className="text-[9px] text-slate-400 font-mono flex items-center gap-1 pt-0.5">
                          <span>Register</span> <FiChevronRight className="w-2.5 h-2.5 inline" /> 
                          <span>Review</span> <FiChevronRight className="w-2.5 h-2.5 inline" /> 
                          <span>Docs</span> <FiChevronRight className="w-2.5 h-2.5 inline" /> 
                          <span>BG</span> <FiChevronRight className="w-2.5 h-2.5 inline" /> 
                          <span>Admin</span> <FiChevronRight className="w-2.5 h-2.5 inline" /> 
                          <span>Sub</span> <FiChevronRight className="w-2.5 h-2.5 inline" /> 
                          <span className="text-emerald-500 font-bold">Live</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 max-w-xs space-y-1">
                      <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <FiCheckCircle className="w-3 h-3 text-emerald-500" />
                        <span>{e.docsStatus || 'Document Verification Pending'}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1">
                        <FiClock className="w-3 h-3 text-blue-400" />
                        <span>{e.bgCheckStatus || 'Passed Clear'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#E4F4EC] text-[#12163A] border border-[#C3E6D5] shadow-2xs">
                        {e.subscriptionPlan || 'Enterprise Tier'}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1 font-bold">
                        {e.usedSeats.toLocaleString()} / {e.seats.toLocaleString()} Seats
                      </div>
                    </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onEditEntity(e)}
                        title="Approve Next Workflow Stage / Edit Details"
                        className="px-2.5 py-1 rounded-lg bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold text-[10px] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-xs flex items-center gap-1"
                      >
                        <FiCheckCircle className="w-3 h-3" /> Approve
                      </button>
                      <button
                        onClick={() => onSimulateWorkspace(e.role)}
                        aria-label={`Launch ${e.role} Live Portal`}
                        title={`Launch ${e.role} Live Portal`}
                        className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer shadow-xs"
                      >
                        <FiExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onToggleStatus(e.id)}
                        aria-label={e.status === 'active' ? 'Suspend Access' : 'Activate Access'}
                        title={e.status === 'active' ? 'Suspend Access' : 'Activate Access'}
                        className={`p-1.5 rounded-lg border transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer ${
                          e.status === 'active' 
                            ? 'bg-amber-500/20 border-amber-500/30 text-amber-400 hover:bg-amber-500/30' 
                            : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30'
                        }`}
                      >
                        <FiPower className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmEntity(e)}
                        aria-label="Revoke and Delete Access"
                        title="Revoke & Delete Access"
                        className="p-1.5 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:bg-rose-500/30 transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
            )}
          </tbody>
        </table>
      </div>

      <div className={`mt-4 pt-4 border-t flex items-center justify-between text-xs ${borderDivider} ${textMuted}`}>
        <div>
          Showing <strong>{paginatedEntities.length}</strong> of <strong>{filteredEntities.length}</strong> partner entities (Page {currentPage} of {totalPages})
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="px-3 py-1 rounded-lg border border-slate-700 bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 font-bold transition cursor-pointer"
          >
            Prev Page
          </button>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="px-3 py-1 rounded-lg border border-slate-700 bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 font-bold transition cursor-pointer"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};
