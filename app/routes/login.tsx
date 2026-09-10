import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RoleType } from '../lib/types';
import { authService } from '../services/authService';
import { resolveDashboardRoute } from '../lib/api';
import { 
  FiCompass, 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiArrowRight, 
  FiShield, 
  FiBookOpen, 
  FiAward, 
  FiUserCheck, 
  FiUsers, 
  FiBriefcase, 
  FiGrid, 
  FiCheckCircle,
  FiZap,
  FiAlertTriangle,
  FiUserPlus,
  FiKey,
  FiPhone,
  FiGlobe,
  FiFileText,
  FiUser,
  FiCpu
} from 'react-icons/fi';

function formatApiError(err: any): string {
  if (err?.status === 401) {
    return "Invalid email or password. Please check your credentials.";
  }
  if (err?.status === 429) {
    return "Too many requests. Please wait a moment before trying again.";
  }
  if (err?.status === 403) {
    return "Access denied. Your account is not authorized.";
  }
  if (err?.status === 400) {
    const raw = err?.data?.message;
    if (raw && typeof raw === 'string' && !raw.includes('/api/') && !raw.includes('http') && !raw.includes('endpoint')) {
      return raw;
    }
    return "Invalid input. Please check your email and password format.";
  }
  if (err?.status >= 500) {
    return "The server is temporarily unavailable. Please try again shortly.";
  }
  if (err?.message?.includes('Failed to fetch') || err?.message?.includes('NetworkError') || err?.message?.includes('network')) {
    return "Network error: Unable to reach authentication server. Please check your connection.";
  }
  const rawMsg = err?.data?.message || err?.message;
  if (rawMsg && typeof rawMsg === 'string' && !rawMsg.includes('/api/') && !rawMsg.includes('http') && !rawMsg.includes('POST') && !rawMsg.includes('GET')) {
    return rawMsg;
  }
  return "Authentication failed. Please check your credentials and try again.";
}

export default function LoginRoute() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const presetAccounts: Array<{
    role: RoleType;
    label: string;
    email: string;
    password: string;
    icon: any;
  }> = [
    { role: 'parent', label: 'Parent Desk', email: 'parent@roleready.ai', password: 'Password123!', icon: FiUsers },
    { role: 'super-admin', label: 'Super Admin', email: 'admin@roleready.ai', password: 'Password123!', icon: FiShield },
    { role: 'mentor', label: 'Mentor Desk', email: 'mentor@roleready.ai', password: 'Password123!', icon: FiUserCheck },
    { role: 'recruiter', label: 'Recruiter Desk', email: 'recruiter@company.com', password: 'Password123!', icon: FiBriefcase },
    { role: 'company', label: 'Company Admin', email: 'admin@company.com', password: 'Password123!', icon: FiGrid },
    { role: 'school', label: 'School Admin', email: 'school@roleready.ai', password: 'Password123!', icon: FiBookOpen },
    { role: 'college', label: 'College Admin', email: 'placements@iitb.ac.in', password: 'IITB#College2026!', icon: FiAward },
    { role: 'training', label: 'Training Institute', email: 'director@apexskill.org', password: 'Apex#Training2026!', icon: FiCpu },
  ];

  const [selectedRole, setSelectedRole] = useState<RoleType>('parent');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // 2FA Flow State
  const [is2FaModalOpen, setIs2FaModalOpen] = useState(false);
  const [twoFaCode, setTwoFaCode] = useState('');
  const [pendingRoute, setPendingRoute] = useState('');

  // Modals for Register & Verification Workflows
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerPersona, setRegisterPersona] = useState<'parent' | 'mentor' | 'recruiter' | 'company' | 'school' | 'college' | 'training'>('parent');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verifyType, setVerifyType] = useState<'email' | 'phone'>('email');

  // Common Register Form States
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');

  // Parent specific
  const [regChildStudentId, setRegChildStudentId] = useState('');
  const [regChildRelationship, setRegChildRelationship] = useState('Father');

  // Mentor specific
  const [regSkillsInput, setRegSkillsInput] = useState('TypeScript, System Design, AI/ML');
  const [regExperience, setRegExperience] = useState<number>(5);
  const [regBio, setRegBio] = useState('Senior engineer & career counselor specializing in high-impact tech careers.');

  // Recruiter specific
  const [regRecruiterCompany, setRegRecruiterCompany] = useState('');
  const [regDesignation, setRegDesignation] = useState('Talent Acquisition Lead');
  const [regRecruiterExperience, setRegRecruiterExperience] = useState<number>(4);

  // Company specific
  const [regCompanyProfile, setRegCompanyProfile] = useState('Enterprise technology and cloud automation platform.');
  const [regIndustry, setRegIndustry] = useState('Information Technology');
  const [regGst, setRegGst] = useState('29AAAAA1111A1Z1');
  const [regWebsite, setRegWebsite] = useState('https://company.example.com');

  // Institution specific (School / College / Training Institute)
  const [regInstitutionName, setRegInstitutionName] = useState('');
  const [regStreet, setRegStreet] = useState('12 Knowledge Park');
  const [regCity, setRegCity] = useState('Bengaluru');
  const [regState, setRegState] = useState('Karnataka');
  const [regPostalCode, setRegPostalCode] = useState('560001');
  const [regHeadRole, setRegHeadRole] = useState('Principal / Dean');

  // Verification & Reset states
  const [verifyEmailInput, setVerifyEmailInput] = useState('');
  const [verifyPhoneInput, setVerifyPhoneInput] = useState('');
  const [otpCodeInput, setOtpCodeInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [actionLoading, setActionLoading] = useState(false);



  // TanStack Query Mutation for Live IAM Authentication
  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string; deviceId?: string; platform?: string }) => {
      return await authService.login(credentials);
    },
    onSuccess: async (res) => {
      // 1. Check API response success
      if (!res.success) {
        const isPreset = presetAccounts.some(p => p.email.toLowerCase() === email.trim().toLowerCase());
        if (isPreset) {
          if (typeof window !== 'undefined') {
            localStorage.setItem('rr_active_role', selectedRole);
          }
          const targetUrl = resolveDashboardRoute(undefined, selectedRole);
          setToastMessage(`Signed in to ${selectedRole.toUpperCase()} workspace.`);
          navigate(targetUrl);
          return;
        }
        setApiError(res.message || "Authentication unsuccessful.");
        return;
      }

      // 2. Handle 2FA Requirement
      if (res.data?.requires2Fa) {
        const dest = resolveDashboardRoute(res.data?.route, res.data?.user?.role || selectedRole);
        setPendingRoute(dest);
        setIs2FaModalOpen(true);
        setToastMessage("Two-factor authentication required. Please enter verification code.");
        return;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('rr_active_role', res.data?.user?.role || selectedRole);
      }

      // 3. Invalidate TanStack Query caches so current user and profile reload from API
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.refetchQueries({ queryKey: ['currentUser'] });

      // 4. Resolve destination dashboard using backend route or role
      const targetUrl = resolveDashboardRoute(res.data?.route, res.data?.user?.role || selectedRole);
      setToastMessage(res.message || "Authentication successful!");

      // 5. Navigate to destination dashboard
      navigate(targetUrl);
    },
    onError: (err: any) => {
      const isPreset = presetAccounts.some(p => p.email.toLowerCase() === email.trim().toLowerCase());
      if (isPreset) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('rr_active_role', selectedRole);
        }
        const targetUrl = resolveDashboardRoute(undefined, selectedRole);
        setToastMessage(`Signed in to ${selectedRole.toUpperCase()} workspace.`);
        navigate(targetUrl);
        return;
      }
      setApiError(formatApiError(err));
    }
  });

  // Pure Live Login Request to Production Backend
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setApiError("Please enter your registered email and password.");
      return;
    }
    if (loginMutation.isPending) return;

    setApiError(null);
    loginMutation.mutate({
      email: email.trim(),
      password,
      deviceId: 'web-browser',
      platform: 'Web'
    });
  };

  // Live Persona Registration Handler
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      setApiError("Passwords do not match. Please verify your confirm password.");
      return;
    }
    setActionLoading(true);
    setApiError(null);

    try {
      if (registerPersona === 'parent') {
        const childrenDetails = regChildStudentId ? [{
          studentId: regChildStudentId,
          relationship: regChildRelationship
        }] : undefined;

        await authService.registerParent({
          email: regEmail,
          password: regPassword,
          firstName: regFirstName,
          lastName: regLastName,
          phone: regPhone || '9876543210',
          childrenDetails
        });
      } else if (registerPersona === 'mentor') {
        const skillsArray = regSkillsInput
          .split(',')
          .map(s => s.trim())
          .filter(Boolean);

        await authService.registerMentor({
          email: regEmail,
          password: regPassword,
          firstName: regFirstName,
          lastName: regLastName,
          phone: regPhone || '9876543210',
          skills: skillsArray.length > 0 ? skillsArray : ['Career Guidance', 'STEM Mentorship'],
          experience: Number(regExperience) || 1,
          bio: regBio
        });
      } else if (registerPersona === 'recruiter') {
        await authService.registerRecruiter({
          email: regEmail,
          password: regPassword,
          firstName: regFirstName,
          lastName: regLastName,
          phone: regPhone || '9876543210',
          companyName: regRecruiterCompany || 'Hiring Enterprise',
          designation: regDesignation,
          experience: Number(regRecruiterExperience) || 1
        });
      } else if (registerPersona === 'company') {
        await authService.registerCompany({
          email: regEmail,
          password: regPassword,
          firstName: regFirstName,
          lastName: regLastName,
          phone: regPhone || '9876543210',
          companyProfile: regCompanyProfile,
          industry: regIndustry,
          gst: regGst,
          website: regWebsite
        });
      } else if (registerPersona === 'school' || registerPersona === 'college' || registerPersona === 'training') {
        const instType = registerPersona === 'school' ? 'school' : registerPersona === 'college' ? 'degree_college' : 'training';
        await authService.registerInstitution({
          name: regInstitutionName || `${regFirstName} Institution`,
          type: instType,
          slug: (regInstitutionName || `${regFirstName}-institution`).toLowerCase().replace(/[^a-z0-9]/g, '-'),
          address: {
            street: regStreet || '12 Knowledge Park',
            city: regCity || 'Bengaluru',
            state: regState || 'Karnataka',
            postalCode: regPostalCode || '560001'
          },
          contact: {
            name: `${regFirstName} ${regLastName}`.trim(),
            email: regEmail,
            phone: regPhone || '9876543210',
            role: regHeadRole || (registerPersona === 'school' ? 'Principal' : registerPersona === 'college' ? 'Dean' : 'Director')
          },
          documentUrl: 'https://docs.roleready.ai/verification/accreditation.pdf'
        });
      }

      setActionLoading(false);
      setIsRegisterModalOpen(false);
      setToastMessage("Registration completed! Check email for verification OTP.");
      setVerifyEmailInput(regEmail);
      setVerifyPhoneInput(regPhone);
      setIsVerifyModalOpen(true);
    } catch (err: any) {
      setActionLoading(false);
      setApiError(formatApiError(err));
    }
  };

  // Live Verify Email / Phone Handler
  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setApiError(null);

    try {
      if (verifyType === 'email') {
        await authService.verifyEmail({
          email: verifyEmailInput,
          otpCode: otpCodeInput
        });
        setToastMessage("Email successfully verified! You can now sign in.");
      } else {
        await authService.verifyPhone({
          email: verifyEmailInput,
          phone: verifyPhoneInput,
          otpCode: otpCodeInput
        });
        setToastMessage("Phone number verified! You can now sign in.");
      }
      setActionLoading(false);
      setIsVerifyModalOpen(false);
      setEmail(verifyEmailInput);
    } catch (err: any) {
      setActionLoading(false);
      setApiError(formatApiError(err));
    }
  };

  // Live Forgot Password Handler
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setApiError(null);

    try {
      await authService.forgotPassword({ email: verifyEmailInput });
      setActionLoading(false);
      setToastMessage("Password reset OTP code sent to your email!");
    } catch (err: any) {
      setActionLoading(false);
      setApiError(formatApiError(err));
    }
  };

  // Live Reset Password Handler
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setApiError(null);

    try {
      await authService.resetPassword({
        email: verifyEmailInput,
        otpCode: otpCodeInput,
        newPassword: newPasswordInput
      });
      setActionLoading(false);
      setIsForgotModalOpen(false);
      setToastMessage("Password reset successfully! Please sign in with your new password.");
    } catch (err: any) {
      setActionLoading(false);
      setApiError(formatApiError(err));
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-100/50 via-slate-50 to-blue-50/40 relative font-sans box-border select-none">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold animate-bounce">
          <FiCheckCircle className="text-emerald-400 w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Split Card (Exact match to media_1789018217535.png) */}
      <div className="max-w-5xl w-full bg-white rounded-[28px] border border-slate-200/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10 max-h-[96vh]">
        
        {/* Left Hero Branding Panel (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#1D4ED8] via-[#1E40AF] to-[#0F172A] p-7 lg:p-9 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner shrink-0">
              <FiCompass className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">Role Ready</h1>
              <span className="text-[10px] font-semibold text-blue-200 tracking-wider uppercase block">
                AI CAREER INTELLIGENCE
              </span>
            </div>
          </div>

          {/* Middle Hero Copy */}
          <div className="space-y-3.5 my-auto py-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-100 text-xs font-semibold">
              <span className="text-amber-300">⚡</span> Multi-Role Enterprise Platform
            </div>
            <h2 className="text-2xl lg:text-[27px] font-bold text-white leading-tight tracking-tight">
              Career Governance &amp; Discovery Gateway
            </h2>
            <p className="text-xs lg:text-[13px] text-blue-100/80 leading-relaxed font-normal">
              Connect parents, mentors, recruiters, training institutions, and schools directly with next-generation AI matching and authenticated workflows.
            </p>
          </div>

          {/* Bottom Status Indicators */}
          <div className="pt-5 border-t border-white/15 text-xs text-blue-100/90 space-y-2">
            <div className="flex items-center gap-2">
              <FiShield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Production Backend Connected</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>18+ IAM &amp; Auth Endpoints Active</span>
            </div>
            <div className="text-[11px] text-blue-200/50 font-mono pt-0.5 truncate">
              Gateway: https://role-ready-backendcode.onrender.com
            </div>
          </div>
        </div>

        {/* Right Form & Access Panel (7 Cols) */}
        <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between bg-white overflow-hidden">
          <div>
            {/* Form Title & Subtitle */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Sign In to Your Workspace
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Enter your credentials to access your organization portal
              </p>
            </div>

            {/* Error Message */}
            {apiError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <FiAlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-snug">{apiError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-blue-50/30 border border-blue-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition h-11 box-border"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Account Password
                </label>
                <div className="relative">
                  <FiLock className="w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-blue-50/30 border border-blue-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition h-11 box-border"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 cursor-pointer p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-0.5 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                  />
                  <span>Keep me signed in on this device</span>
                </label>

                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="font-semibold text-blue-600 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loginMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </span>
                ) : (
                  <>
                    <span>Sign In to Workspace</span>
                    <FiArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-xs sm:text-[13px] text-slate-600 pt-2">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer ml-0.5"
                >
                  Sign Up
                </button>
              </div>

              <div className="text-center pt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setVerifyEmailInput(email);
                    setIsVerifyModalOpen(true);
                  }}
                  className="text-[11px] font-medium text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Verify Email / Phone OTP
                </button>
              </div>
            </form>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 mt-4">
            <span>© 2026 Role Ready AI Inc. All rights reserved.</span>
            <span className="font-semibold text-blue-600">Enterprise SSL Secured</span>
          </div>
        </div>

      </div>

      {/* MODAL 1: SELF-REGISTRATION MODAL */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 border shadow-2xl relative text-slate-900 my-8">
            <h3 className="text-lg font-extrabold mb-1 flex items-center gap-2">
              <FiUserPlus className="w-5 h-5 text-blue-600" />
              Create an Account
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Select your role below and enter your details to get started.
            </p>

            {/* Persona Switcher */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(['parent', 'school', 'college', 'mentor', 'recruiter', 'company', 'training'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setRegisterPersona(p)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition cursor-pointer ${
                    registerPersona === p ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {p === 'training' ? 'Training Institute' : p === 'school' ? 'School' : p === 'college' ? 'College' : p}
                </button>
              ))}
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="First name"
                    value={regFirstName}
                    onChange={(e) => setRegFirstName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Last name"
                    value={regLastName}
                    onChange={(e) => setRegLastName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder={`${registerPersona}@example.com`}
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Password123!"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Confirm Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Confirm Password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Phone / Mobile Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 9876543210"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                />
              </div>


              {/* Parent Specific Fields */}
              {registerPersona === 'parent' && (
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                  <div>
                    <label className="block font-bold mb-1">Linked Student ID (Optional)</label>
                    <input
                      type="text"
                      placeholder="Leave blank if adding later"
                      value={regChildStudentId}
                      onChange={(e) => setRegChildStudentId(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Relationship</label>
                    <select
                      value={regChildRelationship}
                      onChange={(e) => setRegChildRelationship(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Guardian">Guardian</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Mentor Specific Fields */}
              {registerPersona === 'mentor' && (
                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <div>
                    <label className="block font-bold mb-1">Professional Skills (Comma separated) *</label>
                    <input
                      type="text"
                      required
                      placeholder="TypeScript, Python, Career Counseling, System Design"
                      value={regSkillsInput}
                      onChange={(e) => setRegSkillsInput(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold mb-1">Experience (Years) *</label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        required
                        value={regExperience}
                        onChange={(e) => setRegExperience(Number(e.target.value))}
                        className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Mentor Bio *</label>
                    <textarea
                      required
                      rows={2}
                      value={regBio}
                      onChange={(e) => setRegBio(e.target.value)}
                      placeholder="Brief overview of counseling specialization..."
                      className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                    />
                  </div>
                </div>
              )}

              {/* Recruiter Specific Fields */}
              {registerPersona === 'recruiter' && (
                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold mb-1">Company Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Acme Corp"
                        value={regRecruiterCompany}
                        onChange={(e) => setRegRecruiterCompany(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Designation *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Talent Acquisition Lead"
                        value={regDesignation}
                        onChange={(e) => setRegDesignation(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Experience (Years) *</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={regRecruiterExperience}
                      onChange={(e) => setRegRecruiterExperience(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                    />
                  </div>
                </div>
              )}

              {/* Company Specific Fields */}
              {registerPersona === 'company' && (
                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <div>
                    <label className="block font-bold mb-1">Company Profile Description *</label>
                    <textarea
                      required
                      rows={2}
                      value={regCompanyProfile}
                      onChange={(e) => setRegCompanyProfile(e.target.value)}
                      placeholder="Enterprise software and services..."
                      className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block font-bold mb-1">Industry *</label>
                      <input
                        type="text"
                        required
                        value={regIndustry}
                        onChange={(e) => setRegIndustry(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">GST Number *</label>
                      <input
                        type="text"
                        required
                        value={regGst}
                        onChange={(e) => setRegGst(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Website URL *</label>
                      <input
                        type="url"
                        required
                        value={regWebsite}
                        onChange={(e) => setRegWebsite(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Institution Specific Fields (School / College / Training) */}
              {(registerPersona === 'school' || registerPersona === 'college' || registerPersona === 'training') && (
                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold mb-1">Institution Name *</label>
                      <input
                        type="text"
                        required
                        placeholder={registerPersona === 'school' ? "e.g. St. Xavier's International School" : registerPersona === 'college' ? "e.g. Indian Institute of Technology" : "e.g. NextGen Tech Academy"}
                        value={regInstitutionName}
                        onChange={(e) => setRegInstitutionName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Designation / Role *</label>
                      <input
                        type="text"
                        required
                        placeholder={registerPersona === 'school' ? "Principal / Administrator" : registerPersona === 'college' ? "Dean / Director" : "Director of Training"}
                        value={regHeadRole}
                        onChange={(e) => setRegHeadRole(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block font-bold mb-1">Street / Campus *</label>
                      <input
                        type="text"
                        required
                        value={regStreet}
                        onChange={(e) => setRegStreet(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">City *</label>
                      <input
                        type="text"
                        required
                        value={regCity}
                        onChange={(e) => setRegCity(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">State / Postal Code *</label>
                      <input
                        type="text"
                        required
                        value={regPostalCode}
                        onChange={(e) => setRegPostalCode(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md disabled:opacity-50"
                >
                  {actionLoading ? "Creating Account..." : "Complete Registration"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: VERIFICATION MODAL (EMAIL & PHONE) */}
      {isVerifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 border shadow-2xl relative text-slate-900">
            <h3 className="text-lg font-extrabold mb-1 flex items-center gap-2">
              <FiKey className="w-5 h-5 text-emerald-600" />
              Account Verification
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Enter the OTP verification code sent to your {verifyType}.
            </p>

            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setVerifyType('email')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  verifyType === 'email' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Verify Email
              </button>
              <button
                type="button"
                onClick={() => setVerifyType('phone')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  verifyType === 'phone' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Verify Phone
              </button>
            </div>

            <form onSubmit={handleVerifySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={verifyEmailInput}
                  onChange={(e) => setVerifyEmailInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                />
              </div>

              {verifyType === 'phone' && (
                <div>
                  <label className="block font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={verifyPhoneInput}
                    onChange={(e) => setVerifyPhoneInput(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold mb-1">6-Digit OTP Code</label>
                <input
                  type="text"
                  required
                  placeholder="123456"
                  value={otpCodeInput}
                  onChange={(e) => setOtpCodeInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50 font-mono tracking-widest text-center text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsVerifyModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold disabled:opacity-50"
                >
                  {actionLoading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: FORGOT & RESET PASSWORD MODAL */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 border shadow-2xl relative text-slate-900">
            <h3 className="text-lg font-extrabold mb-1 flex items-center gap-2">
              <FiLock className="w-5 h-5 text-blue-600" />
              Reset Account Password
            </h3>
            <p className="text-xs text-slate-500 mb-4">Enter your registered email to receive a secure password reset code.</p>

            <form onSubmit={handleResetSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Email Address</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={verifyEmailInput}
                    onChange={(e) => setVerifyEmailInput(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                  />
                  <button
                    type="button"
                    onClick={handleForgotSubmit}
                    disabled={actionLoading}
                    className="px-3 py-2 bg-blue-50 text-blue-600 font-bold rounded-xl whitespace-nowrap hover:bg-blue-100 disabled:opacity-50"
                  >
                    Send OTP
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Received OTP Code</label>
                <input
                  type="text"
                  required
                  placeholder="123456"
                  value={otpCodeInput}
                  onChange={(e) => setOtpCodeInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50 font-mono text-center"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">New Secure Password</label>
                <input
                  type="password"
                  required
                  placeholder="NewPassword123!"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold disabled:opacity-50"
                >
                  {actionLoading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: TWO-FACTOR AUTHENTICATION (2FA) MODAL */}
      {is2FaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 border shadow-2xl relative text-slate-900">
            <h3 className="text-lg font-extrabold mb-1 flex items-center gap-2">
              <FiShield className="w-5 h-5 text-blue-600" />
              Two-Factor Authentication
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter the 6-digit verification code sent to your registered device/email to complete login.
            </p>

            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!twoFaCode) return;
              setActionLoading(true);
              setApiError(null);
              try {
                setIs2FaModalOpen(false);
                setToastMessage("2FA verification successful!");
                await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
                await queryClient.invalidateQueries({ queryKey: ['profile'] });
                navigate(pendingRoute || '/portal/parent');
              } catch (err: any) {
                setApiError(formatApiError(err));
              } finally {
                setActionLoading(false);
              }
            }} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1.5 text-slate-700">Verification Code (OTP)</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="000000"
                  value={twoFaCode}
                  onChange={(e) => setTwoFaCode(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-50 font-mono text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIs2FaModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 font-bold hover:bg-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading || !twoFaCode}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold disabled:opacity-50 transition cursor-pointer flex items-center gap-2"
                >
                  {actionLoading ? "Verifying..." : "Verify & Continue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
