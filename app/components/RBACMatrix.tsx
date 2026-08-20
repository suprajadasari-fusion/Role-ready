import React from 'react';
import { Save, Sliders } from 'lucide-react';
import { RBACModule } from '~/lib/types';
import { saveRBACWeights } from '~/lib/api';

export const rbacModules: RBACModule[] = [
  { name: "AI Career Discovery & DNA Engine", key: "ai_discovery" },
  { name: "Scholarship Finder & Direct Apply", key: "scholarships" },
  { name: "Jobs & Internships Marketplace", key: "jobs" },
  { name: "Mentor Booking & Counselor Desk", key: "mentorship" },
  { name: "Institutional Analytics & Reports", key: "analytics" },
  { name: "AI Resume Builder & ATS Scanner", key: "resume_ai" },
  { name: "AI Mock Interview Assistant", key: "interview_ai" },
  { name: "Parent Dashboard Linkage", key: "parent_portal" }
];

interface RBACMatrixProps {
  onSave: () => void;
  isDarkMode?: boolean;
}

export const RBACMatrix: React.FC<RBACMatrixProps> = ({ onSave, isDarkMode = false }) => {
  const roles = ["School", "College", "Mentor", "Training", "Recruiter", "Company", "Government"];

  const handleSave = async () => {
    await saveRBACWeights({ timestamp: new Date().toISOString(), modules: rbacModules });
    onSave();
  };

  const cardClass = isDarkMode
    ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
    : 'bg-white border-blue-100 text-slate-900 shadow-sm';

  const textMuted = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const textHeading = isDarkMode ? 'text-white' : 'text-slate-900';
  const borderDivider = isDarkMode ? 'border-slate-800' : 'border-slate-100';

  return (
    <div className={`rounded-2xl border p-6 mb-8 font-sans transition-colors duration-200 ${cardClass}`}>
      <div className={`flex items-center justify-between mb-6 pb-4 border-b ${borderDivider}`}>
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-500" />
            <h2 className={`text-lg font-semibold ${textHeading}`}>Role-Based Access Control (RBAC) Matrix</h2>
          </div>
          <p className={`text-sm font-normal mt-1 ${textMuted}`}>
            Configure granular module permissions and data visibility policies across all 7 partner role verticals
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Global RBAC Matrix</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className={`border-b text-xs font-semibold uppercase tracking-wider ${
              isDarkMode ? 'bg-slate-800/80 text-slate-300 border-slate-700' : 'bg-slate-50/50 text-slate-400 border-slate-200'
            }`}>
              <th className="py-3.5 px-4 rounded-l-xl">Platform Module / Capability</th>
              {roles.map(r => (
                <th key={r} className="py-3.5 px-4 text-center">{r}</th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${borderDivider}`}>
            {rbacModules.map((mod, idx) => (
              <tr key={mod.key} className={`transition ${isDarkMode ? 'hover:bg-slate-800/60' : 'hover:bg-blue-50/40'}`}>
                <td className={`py-4 px-4 font-medium ${textHeading}`}>{mod.name}</td>
                {roles.map((r, rIdx) => {
                  const isChecked = (idx + rIdx) % 2 === 0 || idx === 0;
                  return (
                    <td key={r} className="py-4 px-4 text-center">
                      <input 
                        type="checkbox" 
                        defaultChecked={isChecked} 
                        className="w-4 h-4 accent-blue-600 rounded cursor-pointer" 
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
