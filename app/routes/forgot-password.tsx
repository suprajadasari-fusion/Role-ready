import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { authService } from '../services/authService';
import {
  FiCompass,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiArrowLeft,
  FiShield,
  FiCheckCircle,
  FiAlertTriangle,
  FiKey,
  FiRefreshCw
} from 'react-icons/fi';

function formatApiError(err: any): string {
  if (err?.status === 404) {
    return "Account not found with this email address. Please check your input or sign up.";
  }
  if (err?.status === 429) {
    return "Too many requests. Please wait a moment before requesting another OTP.";
  }
  if (err?.status === 400) {
    const raw = err?.data?.message;
    if (raw && typeof raw === 'string' && !raw.includes('/api/') && !raw.includes('http') && !raw.includes('endpoint')) {
      return raw;
    }
    return "Invalid request. Please verify the OTP code and password requirements.";
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
  return "Unable to complete request. Please verify your details and try again.";
}

export default function ForgotPasswordRoute() {
  const navigate = useNavigate();

  // Workflow steps: 1 = Request OTP, 2 = Verify OTP & Set New Password, 3 = Completed Success
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Step 1: Submit Email for Recovery OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setApiError("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      await authService.forgotPassword({ email: email.trim().toLowerCase() });
      setLoading(false);
      setToastMessage("Recovery OTP dispatched to your email!");
      setStep(2);
    } catch (err: any) {
      setLoading(false);
      // For development/mock resilience if endpoint responds or succeeds:
      setApiError(formatApiError(err));
    }
  };

  // Step 2: Submit Reset Password with OTP
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim()) {
      setApiError("Please enter the 6-digit OTP code sent to your email.");
      return;
    }
    if (newPassword.length < 8) {
      setApiError("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setApiError("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      await authService.resetPassword({
        email: email.trim().toLowerCase(),
        otpCode: otpCode.trim(),
        newPassword
      });
      setLoading(false);
      setToastMessage("Password reset successfully!");
      setStep(3);
    } catch (err: any) {
      setLoading(false);
      setApiError(formatApiError(err));
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (loading) return;
    setLoading(true);
    setApiError(null);
    try {
      await authService.forgotPassword({ email: email.trim().toLowerCase() });
      setLoading(false);
      setToastMessage("A fresh OTP code has been dispatched!");
    } catch (err: any) {
      setLoading(false);
      setApiError(formatApiError(err));
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-100/50 via-slate-50 to-blue-50/40 relative font-sans box-border select-none">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold animate-bounce">
          <FiCheckCircle className="text-emerald-400 w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main SaaS Card */}
      <div className="max-w-4xl w-full bg-white rounded-[28px] border border-slate-200/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10 max-h-[96vh]">
        
        {/* Left Hero Branding Panel (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#1D4ED8] via-[#1E40AF] to-[#0F172A] p-7 lg:p-9 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/login')}>
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

          {/* Middle Recovery Info */}
          <div className="space-y-3.5 my-auto py-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-100 text-xs font-semibold">
              <FiKey className="text-amber-300 w-3.5 h-3.5" /> Identity &amp; Access Recovery
            </div>
            <h2 className="text-2xl lg:text-[26px] font-bold text-white leading-tight tracking-tight">
              Secure Account Reset
            </h2>
            <p className="text-xs lg:text-[13px] text-blue-100/80 leading-relaxed font-normal">
              Self-service password recovery with cryptographic one-time authorization tokens. Restores access across all authenticated Role Ready workspaces.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-blue-200 font-medium">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 1 ? 'bg-white text-blue-700' : 'bg-white/20 text-white'}`}>1</span>
              <span className="text-xs">Email OTP</span>
              <span className="text-white/40">─</span>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 2 ? 'bg-white text-blue-700' : 'bg-white/20 text-white'}`}>2</span>
              <span className="text-xs">Reset Key</span>
              <span className="text-white/40">─</span>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step === 3 ? 'bg-emerald-400 text-slate-900' : 'bg-white/20 text-white'}`}>✓</span>
            </div>
          </div>

          {/* Bottom Security Info */}
          <div className="pt-5 border-t border-white/15 text-xs text-blue-100/90 space-y-2">
            <div className="flex items-center gap-2">
              <FiShield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>TLS 1.3 End-to-End Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Knowledge Password Storage</span>
            </div>
            <div className="text-[11px] text-blue-200/50 font-mono pt-0.5 truncate">
              Gateway: https://role-ready-backendcode.onrender.com
            </div>
          </div>
        </div>

        {/* Right Action Panel (7 Cols) */}
        <div className="lg:col-span-7 p-8 lg:p-11 flex flex-col justify-between bg-white overflow-y-auto max-h-[96vh]">
          <div>
            {/* Header */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition mb-3 cursor-pointer"
              >
                <FiArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
              </button>

              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {step === 1 && "Forgot Your Password?"}
                {step === 2 && "Enter OTP & New Password"}
                {step === 3 && "Password Successfully Reset"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {step === 1 && "Enter your registered email address and we'll send a 6-digit verification code."}
                {step === 2 && `We sent a 6-digit code to ${email}. Set your new credentials below.`}
                {step === 3 && "Your workspace credentials have been updated securely."}
              </p>
            </div>

            {/* Error Message */}
            {apiError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <FiAlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-snug">{apiError}</span>
              </div>
            )}

            {/* STEP 1: Request OTP Form */}
            {step === 1 && (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Registered Email Address
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
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    A 6-digit verification code will be dispatched via IAM auth.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Dispatching OTP...</span>
                    </span>
                  ) : (
                    <>
                      <span>Send Recovery OTP</span>
                      <FiArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center text-xs text-slate-600 pt-3">
                  Remembered your password?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer ml-0.5"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Verify OTP & New Password Form */}
            {step === 2 && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      6-Digit Security OTP
                    </label>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="text-[11px] text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <FiRefreshCw className="w-3 h-3" /> Resend Code
                    </button>
                  </div>
                  <div className="relative">
                    <FiKey className="w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="123456"
                      className="w-full pl-10 pr-4 py-2.5 bg-blue-50/30 border border-blue-200 rounded-xl text-slate-900 font-mono tracking-widest text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition h-11 box-border"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    New Account Password
                  </label>
                  <div className="relative">
                    <FiLock className="w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
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

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <FiLock className="w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full pl-10 pr-10 py-2.5 bg-blue-50/30 border border-blue-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition h-11 box-border"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 cursor-pointer p-1"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm py-3 rounded-xl transition cursor-pointer"
                  >
                    Change Email
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-2/3 bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Updating Password...</span>
                      </span>
                    ) : (
                      <>
                        <span>Reset Password</span>
                        <FiCheckCircle className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Success Confirmation */}
            {step === 3 && (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <FiCheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Password Reset Complete!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                    Your password has been successfully reset. You can now log into your Role Ready workspace with your new credentials.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="w-full max-w-xs mx-auto bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  <span>Go to Sign In</span>
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 mt-4">
            <span>© 2026 Role Ready AI Inc.</span>
            <span className="font-semibold text-blue-600">Enterprise IAM Gateway</span>
          </div>
        </div>

      </div>
    </div>
  );
}
