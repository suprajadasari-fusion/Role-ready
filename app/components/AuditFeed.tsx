import React from 'react';
import { AuditLog } from '~/lib/types';
import { ShieldCheck, Download } from 'lucide-react';

interface AuditFeedProps {
  logs: AuditLog[];
  showFullTable?: boolean;
  isDarkMode?: boolean;
}

export const AuditFeed: React.FC<AuditFeedProps> = ({ 
  logs, 
  showFullTable = false, 
  isDarkMode = false 
}) => {
  const cardClass = isDarkMode
    ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
    : 'bg-white border-blue-100 text-slate-900 shadow-sm';

  const textMuted = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const textHeading = isDarkMode ? 'text-white' : 'text-slate-900';
  const borderDivider = isDarkMode ? 'border-slate-800' : 'border-slate-100';

  if (showFullTable) {
    return (
      <div className={`rounded-2xl border p-6 mb-8 font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between mb-6 pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold ${textHeading}`}>System Security Audit Logs</h2>
            <p className={`text-xs ${textMuted}`}>Immutable record of all Super Admin access grants and permission changes</p>
          </div>
          <button className={`flex items-center gap-2 font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer ${
            isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}>
            <Download className="w-4 h-4" />
            <span>Export Log CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                isDarkMode ? 'bg-slate-800/80 text-slate-300 border-slate-700' : 'bg-slate-50/50 text-slate-400 border-slate-200'
              }`}>
                <th className="py-3.5 px-4 rounded-l-xl">Timestamp</th>
                <th className="py-3.5 px-4">Administrator</th>
                <th className="py-3.5 px-4">Action Type</th>
                <th className="py-3.5 px-4">Target Entity</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">IP Address</th>
                <th className="py-3.5 px-4 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${borderDivider}`}>
              {logs.map((log) => (
                <tr key={log.id} className={`transition ${isDarkMode ? 'hover:bg-slate-800/60' : 'hover:bg-blue-50/40'}`}>
                  <td className={`py-3.5 px-4 font-mono ${textMuted}`}>{log.time}</td>
                  <td className={`py-3.5 px-4 font-bold ${textHeading}`}>{log.admin}</td>
                  <td className="py-3.5 px-4 font-semibold text-blue-400">{log.action}</td>
                  <td className={`py-3.5 px-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>{log.target}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded-md text-[10px]">
                      {log.role}
                    </span>
                  </td>
                  <td className={`py-3.5 px-4 font-mono text-[11px] ${textMuted}`}>{log.ip}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border p-6 font-sans transition-colors duration-200 ${cardClass}`}>
      <div className={`flex items-center justify-between mb-4 pb-3 border-b ${borderDivider}`}>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-400" />
          <h3 className={`font-bold text-sm ${textHeading}`}>Live Governance Audit Feed</h3>
        </div>
        <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-500/30">
          Real-Time Audit Active
        </span>
      </div>

      <div className="space-y-3 text-xs">
        {logs.slice(0, 5).map((log) => (
          <div key={log.id} className={`p-3 rounded-xl border flex items-center justify-between transition ${
            isDarkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-blue-50/40 border-blue-100'
          }`}>
            <div>
              <div className={`font-bold ${textHeading}`}>{log.action}</div>
              <div className={`text-[11px] ${textMuted}`}>Actor: {log.admin} • Target: {log.target}</div>
            </div>
            <div className="text-right">
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full block mb-1">
                {log.status}
              </span>
              <span className={`text-[10px] font-mono ${textMuted}`}>{log.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
