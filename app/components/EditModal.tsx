import React, { useState, useEffect } from 'react';
import { EcosystemEntity, StatusType } from '~/lib/types';
import { Edit3, X, Save } from 'lucide-react';

interface EditModalProps {
  entity: EcosystemEntity | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<EcosystemEntity>) => void;
  isDarkMode?: boolean;
}

export const EditModal: React.FC<EditModalProps> = ({
  entity,
  isOpen,
  onClose,
  onSave,
  isDarkMode = true
}) => {
  const [seats, setSeats] = useState(1000);
  const [status, setStatus] = useState<StatusType>('active');
  const [approvalStage, setApprovalStage] = useState<any>('Live Portal');
  const [docsStatus, setDocsStatus] = useState('');
  const [bgCheckStatus, setBgCheckStatus] = useState('');

  useEffect(() => {
    if (entity) {
      setSeats(entity.seats);
      setStatus(entity.status);
      setApprovalStage(entity.approvalStage || (entity.status === 'active' ? 'Live Portal' : 'Document Verification'));
      setDocsStatus(entity.docsStatus || 'Compliance Certificates Verified');
      setBgCheckStatus(entity.bgCheckStatus || 'Passed - Security Clearance Clear');
    }
  }, [entity]);

  if (!isOpen || !entity) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isLive = approvalStage === 'Live Portal';
    onSave(entity.id, { 
      seats, 
      status: isLive ? 'active' : 'pending',
      approvalStage,
      docsStatus,
      bgCheckStatus
    });
    onClose();
  };

  const cardBg = isDarkMode
    ? 'bg-slate-900 border-slate-800 text-white shadow-2xl'
    : 'bg-white border-blue-100 text-slate-900 shadow-2xl';

  const inputBg = isDarkMode
    ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-400 focus:ring-blue-500'
    : 'bg-blue-50/40 border-blue-200 text-slate-900 placeholder-slate-400 focus:ring-blue-500 focus:bg-white';

  const labelColor = isDarkMode ? 'text-slate-300' : 'text-slate-700';
  const borderDivider = isDarkMode ? 'border-slate-800' : 'border-blue-100';

  const cancelBtnClass = isDarkMode
    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
    : 'bg-slate-100 text-slate-600 hover:bg-slate-200';

  return (
    <div className={`fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in ${
      isDarkMode ? 'bg-slate-950/70' : 'bg-slate-900/40'
    }`}>
      <div className={`rounded-3xl max-w-md w-full border shadow-2xl overflow-hidden animate-scale-up ${cardBg}`}>
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Edit3 className="w-5 h-5" />
            <div>
              <h3 className="font-extrabold text-sm">Approval Pipeline: {entity.name}</h3>
              <p className="text-[11px] text-blue-100">Super Admin authorization & verification pipeline</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className={`block font-bold mb-1 ${labelColor}`}>Approval Pipeline Stage</label>
            <select
              value={approvalStage}
              onChange={(e) => setApprovalStage(e.target.value as any)}
              className={`w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 cursor-pointer font-bold ${inputBg}`}
            >
              <option value="Pending Review" className={isDarkMode ? 'bg-slate-900 text-white' : ''}>1. Pending Review</option>
              <option value="Document Verification" className={isDarkMode ? 'bg-slate-900 text-white' : ''}>2. Document Verification</option>
              <option value="Background Check" className={isDarkMode ? 'bg-slate-900 text-white' : ''}>3. Background Check</option>
              <option value="Admin Approval" className={isDarkMode ? 'bg-slate-900 text-white' : ''}>4. Admin Approval</option>
              <option value="Subscription" className={isDarkMode ? 'bg-slate-900 text-white' : ''}>5. Subscription Plan</option>
              <option value="Live Portal" className={isDarkMode ? 'bg-slate-900 text-white' : ''}>6. Live Portal (Active & Verified)</option>
            </select>
          </div>

          <div>
            <label className={`block font-bold mb-1 ${labelColor}`}>Document Verification Notes</label>
            <input 
              type="text"
              value={docsStatus}
              onChange={(e) => setDocsStatus(e.target.value)}
              placeholder="e.g. CBSE Affiliation #10301 Verified"
              className={`w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition ${inputBg}`}
            />
          </div>

          <div>
            <label className={`block font-bold mb-1 ${labelColor}`}>Background Check Status</label>
            <input 
              type="text"
              value={bgCheckStatus}
              onChange={(e) => setBgCheckStatus(e.target.value)}
              placeholder="e.g. Passed - Clear Background Check"
              className={`w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition ${inputBg}`}
            />
          </div>

          <div>
            <label className={`block font-bold mb-1 ${labelColor}`}>Allocated Seat Quota</label>
            <input 
              type="number"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className={`w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition ${inputBg}`}
            />
          </div>

          <div className={`pt-4 flex items-center justify-end gap-3 border-t ${borderDivider}`}>
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl font-bold transition cursor-pointer ${cancelBtnClass}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
