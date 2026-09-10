import React, { useState } from 'react';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiArrowRight,
  FiAlertTriangle,
  FiBookOpen
} from 'react-icons/fi';
import { authService } from '../../services/authService';
import { formatApiError } from '../../lib/errorUtils';
import { RegisterStudentRequest } from '../../types/auth.types';

export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  parentName: string;
  parentEmail: string;
}

interface StudentSignupProps {
  formData: StudentFormData;
  onChange: (data: Partial<StudentFormData>) => void;
  onBack: () => void;
  onSuccess: (data: { email: string; role: string }) => void;
}

export const StudentSignup: React.FC<StudentSignupProps> = ({
  formData,
  onChange,
  onBack,
  onSuccess
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Student email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{8,15}$/.test(formData.phone)) {
      errors.phone = 'Enter a valid phone number';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.parentName.trim()) {
      errors.parentName = 'Parent or guardian full name is required';
    }
    if (!formData.parentEmail.trim()) {
      errors.parentEmail = 'Parent or guardian email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
      errors.parentEmail = 'Enter a valid parent email address';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) return;

    setLoading(true);

    const payload: RegisterStudentRequest = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phone: formData.phone.trim(),
      parentName: formData.parentName.trim(),
      parentEmail: formData.parentEmail.trim().toLowerCase()
    };

    try {
      const res = await authService.registerStudent(payload);
      setLoading(false);

      const returnedEmail = res?.data?.email || payload.email;
      const returnedRole = res?.data?.role || 'STUDENT';
      onSuccess({ email: returnedEmail, role: returnedRole });
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(formatApiError(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
      <div>
        {/* Step Indicator & Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold mb-1 border border-blue-200/60">
              Step 2 of 3 • Student Registration
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FiBookOpen className="text-blue-600 w-6 h-6" /> Student Account Setup
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Enter your student profile details and parent/guardian contact for progress verification.
            </p>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white cursor-pointer"
          >
            <FiArrowLeft className="w-3.5 h-3.5" /> Back to Roles
          </button>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
            <FiAlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        <div className="space-y-4 max-h-[52vh] overflow-y-auto pr-1">
          {/* Section 1: Student Information */}
          <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. Student Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  First Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FiUser className="w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => onChange({ firstName: e.target.value })}
                    placeholder="e.g. Alex"
                    className={`w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${
                      fieldErrors.firstName ? 'border-rose-300' : 'border-slate-200 focus:ring-blue-500/20'
                    }`}
                  />
                </div>
                {fieldErrors.firstName && <p className="text-[10px] text-rose-600 mt-1">{fieldErrors.firstName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Last Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => onChange({ lastName: e.target.value })}
                  placeholder="e.g. Johnson"
                  className={`w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${
                    fieldErrors.lastName ? 'border-rose-300' : 'border-slate-200 focus:ring-blue-500/20'
                  }`}
                />
                {fieldErrors.lastName && <p className="text-[10px] text-rose-600 mt-1">{fieldErrors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FiMail className="w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => onChange({ email: e.target.value })}
                    placeholder="student@example.com"
                    className={`w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${
                      fieldErrors.email ? 'border-rose-300' : 'border-slate-200 focus:ring-blue-500/20'
                    }`}
                  />
                </div>
                {fieldErrors.email && <p className="text-[10px] text-rose-600 mt-1">{fieldErrors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FiPhone className="w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => onChange({ phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${
                      fieldErrors.phone ? 'border-rose-300' : 'border-slate-200 focus:ring-blue-500/20'
                    }`}
                  />
                </div>
                {fieldErrors.phone && <p className="text-[10px] text-rose-600 mt-1">{fieldErrors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FiLock className="w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => onChange({ password: e.target.value })}
                    placeholder="Min 8 characters"
                    className={`w-full pl-9 pr-9 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${
                      fieldErrors.password ? 'border-rose-300' : 'border-slate-200 focus:ring-blue-500/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1"
                  >
                    {showPassword ? <FiEyeOff className="w-3.5 h-3.5" /> : <FiEye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {fieldErrors.password && <p className="text-[10px] text-rose-600 mt-1">{fieldErrors.password}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FiLock className="w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => onChange({ confirmPassword: e.target.value })}
                    placeholder="Confirm password"
                    className={`w-full pl-9 pr-9 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${
                      fieldErrors.confirmPassword ? 'border-rose-300' : 'border-slate-200 focus:ring-blue-500/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1"
                  >
                    {showConfirmPassword ? <FiEyeOff className="w-3.5 h-3.5" /> : <FiEye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && <p className="text-[10px] text-rose-600 mt-1">{fieldErrors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Parent Information */}
          <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              2. Parent / Guardian Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Parent / Guardian Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => onChange({ parentName: e.target.value })}
                  placeholder="e.g. Jane Johnson"
                  className={`w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${
                    fieldErrors.parentName ? 'border-rose-300' : 'border-slate-200 focus:ring-blue-500/20'
                  }`}
                />
                {fieldErrors.parentName && <p className="text-[10px] text-rose-600 mt-1">{fieldErrors.parentName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Parent Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FiMail className="w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => onChange({ parentEmail: e.target.value })}
                    placeholder="parent@example.com"
                    className={`w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${
                      fieldErrors.parentEmail ? 'border-rose-300' : 'border-slate-200 focus:ring-blue-500/20'
                    }`}
                  />
                </div>
                {fieldErrors.parentEmail && <p className="text-[10px] text-rose-600 mt-1">{fieldErrors.parentEmail}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Submit */}
      <div className="pt-4 border-t border-slate-100 mt-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="w-1/3 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer"
        >
          ← Change Role
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-2/3 bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creating Student Account...</span>
            </span>
          ) : (
            <>
              <span>Submit &amp; Proceed to Verification</span>
              <FiArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
