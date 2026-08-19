import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { RoleType } from '~/lib/types';
import { 
  FaCompass, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaArrowRight, 
  FaShieldHalved, 
  FaSchool, 
  FaGraduationCap, 
  FaUserCheck, 
  FaChalkboardUser, 
  FaBriefcase, 
  FaBuilding, 
  FaLandmark, 
  FaCircleCheck,
  FaWandMagicSparkles
} from 'react-icons/fa6';

export default function LoginRoute() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<RoleType>('super-admin');
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const demoAccounts: Array<{
    role: RoleType;
    label: string;
    email: string;
    password: string;
    icon: any;
    color: string;
  }> = [
    { role: 'super-admin', label: 'Super Admin', email: 'admin@roleready.ai', password: 'Super#Admin2026!', icon: FaShieldHalved, color: 'bg-blue-600' },
    { role: 'school', label: 'School Admin', email: 'principal@dpsrkp.edu.in', password: 'School#DPS2026!', icon: FaSchool, color: 'bg-blue-600' },
    { role: 'college', label: 'College Placement', email: 'placements@iitb.ac.in', password: 'IITB#College2026!', icon: FaGraduationCap, color: 'bg-blue-600' },
    { role: 'mentor', label: 'Mentor Counselor', email: 'r.sharma@careerguider.org', password: 'Mentor#Sharma2026!', icon: FaUserCheck, color: 'bg-blue-600' },
    { role: 'training', label: 'Training Institute', email: 'director@apexskill.org', password: 'Apex#Training2026!', icon: FaChalkboardUser, color: 'bg-blue-600' },
    { role: 'recruiter', label: 'Talent Recruiter', email: 'priya_v@infosys.com', password: 'Infosys#Recruit2026!', icon: FaBriefcase, color: 'bg-blue-600' },
    { role: 'company', label: 'Enterprise Company', email: 'careers@tcs.com', password: 'TCS#Enterprise2026!', icon: FaBuilding, color: 'bg-blue-600' }
  ];

  const handleSelectDemo = (acc: typeof demoAccounts[0]) => {
    setSelectedRole(acc.role);
    setEmail(acc.email);
    setPassword(acc.password);
    setToastMessage(`Auto-filled unique credentials for ${acc.label}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('rr_active_role', selectedRole);
    }

    setTimeout(() => {
      setIsLoading(false);
      navigate(`/${selectedRole}`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-bounce">
          <FaCircleCheck className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-5xl w-full bg-white rounded-3xl border border-blue-100 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* Left Hero Branding Panel (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl" />

          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 shadow-lg">
                <FaCompass className="w-7 h-7" />
              </div>
              <div>
                <h1 className="font-extrabold text-2xl tracking-tight text-white">Role Ready</h1>
                <span className="text-[11px] font-semibold text-blue-200 tracking-wide uppercase">AI Career Intelligence</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold">
                <FaWandMagicSparkles className="w-3.5 h-3.5 text-blue-300" /> Multi-Role Enterprise Portal
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight text-white">
                Empowering Ecosystem Career Governance
              </h2>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                Unified workspace access for Schools, Universities, Career Counselors, Skill Academies, Recruiters & Government Bodies.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-blue-500/20 text-xs text-blue-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <FaShieldHalved className="w-4 h-4 text-emerald-400" />
              <span>Role-Based Access Control (RBAC) Active</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCircleCheck className="w-4 h-4 text-emerald-400" />
              <span>TanStack Query State Sync Operational</span>
            </div>
          </div>
        </div>

        {/* Right Form & Quick Access Panel (7 Cols) */}
        <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Sign In to Your Workspace</h2>
                <p className="text-xs text-slate-500 mt-1">Select a demo role or enter your credentials to proceed</p>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                v2.4 Secure Login
              </span>
            </div>

            {/* Quick Demo Role Selector Grid */}
            <div className="mb-6">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Quick Demo Role Login
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {demoAccounts.map((acc) => {
                  const Icon = acc.icon;
                  const isSelected = selectedRole === acc.role;
                  return (
                    <button
                      key={acc.role}
                      type="button"
                      onClick={() => handleSelectDemo(acc)}
                      className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs' 
                          : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-blue-50/40 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`} />
                        {isSelected && <FaCircleCheck className="w-3.5 h-3.5 text-blue-600" />}
                      </div>
                      <span className="text-[11px] font-bold truncate">{acc.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Login Form */}
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Official Admin Email Address</label>
                <div className="relative">
                  <FaEnvelope className="w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@roleready.ai"
                    className="w-full pl-10 pr-4 py-2.5 bg-blue-50/40 border border-blue-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-700">Account Password</label>
                  <button 
                    type="button" 
                    onClick={() => {
                      setToastMessage("Password reset link dispatched!");
                      setTimeout(() => setToastMessage(null), 3000);
                    }}
                    className="text-blue-600 hover:underline text-[11px] font-semibold cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <FaLock className="w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-blue-50/40 border border-blue-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <span>Keep me signed in on this device</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to {selectedRole.toUpperCase()} Workspace</span>
                    <FaArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>© 2026 Role Ready AI Inc. All rights reserved.</span>
            <span className="font-semibold text-blue-600">Enterprise SSL Secured</span>
          </div>
        </div>

      </div>
    </div>
  );
}
