import React, { useState } from 'react';
import {
  FiMail,
  FiCheckCircle,
  FiAlertTriangle,
  FiArrowRight,
  FiRefreshCw,
  FiShield
} from 'react-icons/fi';
import { authService } from '../../services/authService';
import { formatApiError } from '../../lib/errorUtils';

interface EmailVerificationProps {
  email: string;
  role: string;
  onVerified: () => void;
  onBackToEdit: () => void;
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  role,
  onVerified,
  onBackToEdit
}) => {
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanOtp = otpCode.trim();
    if (!cleanOtp) {
      setErrorMessage('Please enter the 6-digit verification OTP code.');
      return;
    }
    if (cleanOtp.length < 6) {
      setErrorMessage('OTP code must be 6 digits.');
      return;
    }

    setLoading(true);

    try {
      await authService.verifyEmail({
        email: email.trim().toLowerCase(),
        otpCode: cleanOtp
      });

      setLoading(false);
      setSuccessMessage('Email verified successfully! Preparing your workspace...');
      setTimeout(() => {
        onVerified();
      }, 1200);
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(formatApiError(err));
    }
  };

  const handleResendOtp = async () => {
    if (resendLoading) return;
    setResendLoading(true);
    setErrorMessage(null);

    try {
      await authService.forgotPassword({ email: email.trim().toLowerCase() });
      setResendLoading(false);
      setSuccessMessage('A fresh verification OTP code has been dispatched to your email.');
    } catch (err: any) {
      setResendLoading(false);
      setErrorMessage(formatApiError(err));
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Header */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold mb-1 border border-emerald-200/60">
            Step 3 of 3 • Email Verification
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Verify Your Email Address
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            We sent a 6-digit security code to verify your <strong className="text-slate-800 font-semibold">{email}</strong> inbox.
          </p>
        </div>

        {/* Success Banner */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <FiCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="leading-snug font-medium">{successMessage}</span>
          </div>
        )}

        {/* Error Banner */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
            <FiAlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* Registration Context Card */}
        <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-200/60 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
              <FiMail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                Target Role: {role.toUpperCase().replace(/_/g, ' ')}
              </div>
              <div className="text-xs text-slate-700 font-mono truncate max-w-xs sm:max-w-sm">
                {email}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onBackToEdit}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
          >
            Edit Info
          </button>
        </div>

        {/* OTP Input Form */}
        <form onSubmit={handleVerify} className="space-y-4 max-w-md mx-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-center">
              Enter 6-Digit Verification Code
            </label>
            <div className="relative">
              <input
                type="text"
                maxLength={6}
                autoFocus
                required
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="w-full text-center tracking-[0.5em] font-mono text-xl py-3 bg-white border border-blue-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-inner h-13"
              />
            </div>
            <p className="text-[11px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
              <FiShield className="w-3 h-3 text-emerald-500" />
              Secured with one-time cryptographic token
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || otpCode.length < 6}
            className="w-full bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying Code...</span>
              </span>
            ) : (
              <>
                <span>Verify &amp; Activate Account</span>
                <FiArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-600">
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={resendLoading}
          className="font-semibold text-blue-600 hover:underline flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <FiRefreshCw className={`w-3.5 h-3.5 ${resendLoading ? 'animate-spin' : ''}`} />
          <span>{resendLoading ? 'Dispatching...' : 'Resend OTP Code'}</span>
        </button>

        <button
          type="button"
          onClick={onVerified}
          className="text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
        >
          Skip &amp; Sign In Later
        </button>
      </div>
    </div>
  );
};
