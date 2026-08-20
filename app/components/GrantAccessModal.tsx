import React, { useState } from 'react';
import { RoleType } from '../lib/types';
import { FiUserPlus, FiX, FiKey } from 'react-icons/fi';

interface GrantAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    role: RoleType;
    contactEmail: string;
    domain: string;
    seats: number;
    features: string[];
    status: 'active';
  }) => void;
  isDarkMode?: boolean;
}

export const GrantAccessModal: React.FC<GrantAccessModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isDarkMode = true
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<RoleType>('school');
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('');
  const [seats, setSeats] = useState(1000);
  const [features, setFeatures] = useState<string[]>([
    "AI Discover Engine",
    "Scholarship Portal",
    "Institutional Analytics"
  ]);

  if (!isOpen) return null;

  const handleToggleFeature = (feature: string) => {
    if (features.includes(feature)) {
      setFeatures(features.filter(f => f !== feature));
    } else {
      setFeatures([...features, feature]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    onSubmit({
      name,
      role,
      contactEmail: email,
      domain: domain || email.split('@')[1] || 'domain.com',
      seats,
      features,
      status: 'active',
      approvalStage: 'Document Verification',
      docsStatus: 'Compliance Certificates Uploaded (Pending Review)',
      bgCheckStatus: 'Pending Security Audit',
      subscriptionPlan: 'Institutional Starter Plan'
    } as any);

    setName('');
    setEmail('');
    setDomain('');
    onClose();
  };

  const availableFeatures = [
    "AI Discover Engine",
    "Scholarship Portal",
    "Job & Internship Board",
    "Mentorship Marketplace",
    "Institutional Analytics",
    "AI Resume & Interview AI"
  ];

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
      <div className={`rounded-3xl max-w-xl w-full border shadow-2xl overflow-hidden animate-scale-up ${cardBg}`}>
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <FiUserPlus className="w-5 h-5" />
            </div>
            <div>
<<<<<<< HEAD
              <h3 className="font-semibold text-lg">Grant Ecosystem Partner Access</h3>
              <p className="text-xs text-blue-100 font-normal">Provision credentials for schools, colleges, mentors, HR & academies</p>
=======
              <h3 className="font-bold text-base">Grant Ecosystem Partner Access</h3>
              <p className="text-xs text-blue-100 font-medium">Provision credentials for Schools, Colleges, Mentors, HR & Academies</p>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer"
          >
            <FiX className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={`block text-[13px] font-medium mb-1.5 ${labelColor}`}>Organization / Entity Name *</label>
            <input 
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. St. Xavier High School, IIT Delhi, Infosys HR"
              className={`w-full px-3.5 py-2.5 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 transition ${inputBg}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-[13px] font-medium mb-1.5 ${labelColor}`}>Partner Role Category *</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as RoleType)}
                className={`w-full px-3.5 py-2.5 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 cursor-pointer ${inputBg}`}
              >
                <option value="school" className={isDarkMode ? 'bg-slate-900 text-white' : ''}>School Admin (K-12)</option>
                <option value="college" className={isDarkMode ? 'bg-slate-900 text-white' : ''}>College Admin (Higher Ed)</option>
                <option value="mentor" className={isDarkMode ? 'bg-slate-900 text-white' : ''}>Mentor / Counselor</option>
                <option value="training" className={isDarkMode ? 'bg-slate-900 text-white' : ''}>Training Institute</option>
                <option value="recruiter" className={isDarkMode ? 'bg-slate-900 text-white' : ''}>Recruiter / HR Lead</option>
                <option value="company" className={isDarkMode ? 'bg-slate-900 text-white' : ''}>Enterprise Employer</option>
              </select>
            </div>

            <div>
              <label className={`block text-[13px] font-medium mb-1.5 ${labelColor}`}>Primary Admin Email *</label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@organization.edu"
                className={`w-full px-3.5 py-2.5 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 transition ${inputBg}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-[13px] font-medium mb-1.5 ${labelColor}`}>Verified Official Domain</label>
              <input 
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="stxaviers.edu"
                className={`w-full px-3.5 py-2.5 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 transition ${inputBg}`}
              />
            </div>

            <div>
              <label className={`block text-[13px] font-medium mb-1.5 ${labelColor}`}>Allocated Seat Quota *</label>
              <input 
                type="number"
                min={10}
                max={100000}
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className={`w-full px-3.5 py-2.5 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 transition ${inputBg}`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-[13px] font-medium mb-2 ${labelColor}`}>Granted Feature Permissions</label>
            <div className={`grid grid-cols-2 gap-2 p-3 rounded-2xl border ${
              isDarkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-blue-50/30 border-blue-100'
            }`}>
              {availableFeatures.map(f => (
                <label key={f} className={`flex items-center gap-2 cursor-pointer text-xs font-medium ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  <input 
                    type="checkbox"
                    checked={features.includes(f)}
                    onChange={() => handleToggleFeature(f)}
                    className="accent-blue-600 rounded"
                  />
                  <span>{f}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={`pt-4 flex items-center justify-end gap-3 border-t ${borderDivider}`}>
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${cancelBtnClass}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <FiKey className="w-4 h-4" />
              <span>Generate Credentials & Provision</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
