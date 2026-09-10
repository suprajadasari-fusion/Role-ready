import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  FiCompass,
  FiShield,
  FiCheckCircle,
  FiLock,
  FiCheck
} from 'react-icons/fi';
import {
  RoleSelection,
  SignupRoleId,
  ParentSignup,
  ParentFormData,
  MentorSignup,
  MentorFormData,
  RecruiterSignup,
  RecruiterFormData,
  CompanySignup,
  CompanyFormData,
  InstitutionSignup,
  InstitutionFormData,
  StudentSignup,
  StudentFormData,
  EmailVerification
} from '../components/signup';

type SignupStep = 'role-selection' | 'form' | 'verification' | 'complete';

export default function SignupRoute() {
  const navigate = useNavigate();

  // Multi-step state machine
  const [step, setStep] = useState<SignupStep>('role-selection');
  const [selectedRole, setSelectedRole] = useState<SignupRoleId>('parent');

  // Completed registration payload returned from backend API
  const [registrationResult, setRegistrationResult] = useState<{ email: string; role: string }>({
    email: '',
    role: ''
  });

  // State caches for each role (preserves form data when navigating back)
  const [parentData, setParentData] = useState<ParentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    childrenDetails: [{ studentId: '', relationship: 'Father' }]
  });

  const [mentorData, setMentorData] = useState<MentorFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    skills: ['TypeScript', 'System Design', 'AI/ML'],
    experience: 5,
    bio: ''
  });

  const [recruiterData, setRecruiterData] = useState<RecruiterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    designation: 'Talent Acquisition Lead',
    experience: 3
  });

  const [companyData, setCompanyData] = useState<CompanyFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyProfile: '',
    industry: 'Technology & Cloud',
    gst: '',
    website: 'https://'
  });

  const [institutionData, setInstitutionData] = useState<InstitutionFormData>({
    institutionType: 'training',
    institutionName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    street: '12 Knowledge Campus Way',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560001',
    roleTitle: 'Director'
  });

  const [studentData, setStudentData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    parentName: '',
    parentEmail: ''
  });

  // Handle successful registration response
  const handleRegistrationSuccess = (data: { email: string; role: string }) => {
    setRegistrationResult(data);
    setStep('verification');
  };

  // Handle successful email OTP verification
  const handleVerificationComplete = () => {
    setStep('complete');
    setTimeout(() => {
      navigate('/login');
    }, 1200);
  };

  // Update institution sub-type when selecting institutional roles
  const handleRoleSelection = (role: SignupRoleId) => {
    setSelectedRole(role);
    if (role === 'school' || role === 'college' || role === 'training') {
      setInstitutionData((prev) => ({
        ...prev,
        institutionType: role,
        roleTitle: role === 'school' ? 'Principal' : role === 'college' ? 'Dean' : 'Director'
      }));
    }
  };

  // Progress Steps Definition
  const stepsList = [
    { key: 'role-selection', label: 'Role Selection', number: 1 },
    { key: 'form', label: 'Information', number: 2 },
    { key: 'verification', label: 'Verification', number: 3 }
  ];

  const currentStepNumber =
    step === 'role-selection' ? 1 : step === 'form' ? 2 : 3;

  return (
    <div className="h-screen w-full overflow-hidden flex items-center justify-center p-3 sm:p-5 lg:p-7 bg-gradient-to-br from-blue-100/50 via-slate-50 to-blue-50/40 relative font-sans box-border select-none">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Split SaaS Container Card */}
      <div className="max-w-5xl w-full bg-white rounded-[28px] border border-slate-200/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10 max-h-[96vh]">
        {/* Left Hero Branding Panel (4 Cols) */}
        <div className="lg:col-span-4 bg-gradient-to-b from-[#1D4ED8] via-[#1E40AF] to-[#0F172A] p-6 lg:p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/login')}
          >
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner shrink-0">
              <FiCompass className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight leading-tight">
                Role Ready
              </h1>
              <span className="text-[9px] font-semibold text-blue-200 tracking-wider uppercase block">
                AI CAREER INTELLIGENCE
              </span>
            </div>
          </div>

          {/* Middle Context & Progress */}
          <div className="space-y-4 my-auto py-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-100 text-xs font-semibold">
              <span className="text-amber-300">✦</span> Verified Multi-Role Onboarding
            </div>

            <h2 className="text-xl lg:text-[22px] font-bold text-white leading-tight tracking-tight">
              {step === 'role-selection' && "Select Your Ecosystem Role"}
              {step === 'form' && "Complete Workspace Information"}
              {step === 'verification' && "One-Time Security Verification"}
              {step === 'complete' && "Workspace Account Ready!"}
            </h2>

            <p className="text-xs text-blue-100/80 leading-relaxed font-normal">
              Register parents, mentors, recruiters, and educational institutions with strict role-isolated access and verifiable credentials.
            </p>

            {/* Visual Step Progress Tracker */}
            <div className="pt-2 space-y-2">
              <div className="text-[10px] uppercase font-bold tracking-wider text-blue-200">
                Signup Progress:
              </div>
              <div className="flex items-center gap-2">
                {stepsList.map((st, i) => {
                  const isDone = currentStepNumber > st.number;
                  const isCurrent = currentStepNumber === st.number;
                  return (
                    <React.Fragment key={st.key}>
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition ${
                            isDone
                              ? 'bg-emerald-400 text-slate-950 shadow-sm'
                              : isCurrent
                              ? 'bg-white text-blue-700 shadow-md ring-2 ring-blue-300/60'
                              : 'bg-white/20 text-white/70'
                          }`}
                        >
                          {isDone ? <FiCheck className="w-3.5 h-3.5 stroke-[3]" /> : st.number}
                        </div>
                        <span
                          className={`text-xs ${
                            isCurrent ? 'text-white font-semibold' : 'text-blue-200/70 font-normal'
                          }`}
                        >
                          {st.label}
                        </span>
                      </div>
                      {i < stepsList.length - 1 && (
                        <span className="text-white/30 text-xs">─</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Security Info */}
          <div className="pt-4 border-t border-white/15 text-xs text-blue-100/90 space-y-1.5">
            <div className="flex items-center gap-2">
              <FiShield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-[11px]">End-to-End IAM Authorization</span>
            </div>
            <div className="flex items-center gap-2">
              <FiLock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-[11px]">Strict Role-Based Access Control (RBAC)</span>
            </div>
          </div>
        </div>

        {/* Right Form & Step Panel (8 Cols) */}
        <div className="lg:col-span-8 p-6 lg:p-8 flex flex-col justify-between bg-white overflow-hidden max-h-[96vh]">
          {/* STEP 1: Role Selection */}
          {step === 'role-selection' && (
            <RoleSelection
              selectedRole={selectedRole}
              onSelectRole={handleRoleSelection}
              onContinue={() => setStep('form')}
              onNavigateLogin={() => navigate('/login')}
            />
          )}

          {/* STEP 2: Role-Specific Information Form */}
          {step === 'form' && (
            <>
              {selectedRole === 'parent' && (
                <ParentSignup
                  formData={parentData}
                  onChange={(patch) => setParentData((prev) => ({ ...prev, ...patch }))}
                  onBack={() => setStep('role-selection')}
                  onSuccess={handleRegistrationSuccess}
                />
              )}

              {selectedRole === 'mentor' && (
                <MentorSignup
                  formData={mentorData}
                  onChange={(patch) => setMentorData((prev) => ({ ...prev, ...patch }))}
                  onBack={() => setStep('role-selection')}
                  onSuccess={handleRegistrationSuccess}
                />
              )}

              {selectedRole === 'recruiter' && (
                <RecruiterSignup
                  formData={recruiterData}
                  onChange={(patch) => setRecruiterData((prev) => ({ ...prev, ...patch }))}
                  onBack={() => setStep('role-selection')}
                  onSuccess={handleRegistrationSuccess}
                />
              )}

              {selectedRole === 'company' && (
                <CompanySignup
                  formData={companyData}
                  onChange={(patch) => setCompanyData((prev) => ({ ...prev, ...patch }))}
                  onBack={() => setStep('role-selection')}
                  onSuccess={handleRegistrationSuccess}
                />
              )}

              {(selectedRole === 'training' || selectedRole === 'school' || selectedRole === 'college') && (
                <InstitutionSignup
                  formData={institutionData}
                  onChange={(patch) => setInstitutionData((prev) => ({ ...prev, ...patch }))}
                  onBack={() => setStep('role-selection')}
                  onSuccess={handleRegistrationSuccess}
                />
              )}

              {selectedRole === 'student' && (
                <StudentSignup
                  formData={studentData}
                  onChange={(patch) => setStudentData((prev) => ({ ...prev, ...patch }))}
                  onBack={() => setStep('role-selection')}
                  onSuccess={handleRegistrationSuccess}
                />
              )}
            </>
          )}

          {/* STEP 3: Email OTP Verification */}
          {step === 'verification' && (
            <EmailVerification
              email={registrationResult.email}
              role={registrationResult.role}
              onVerified={handleVerificationComplete}
              onBackToEdit={() => setStep('form')}
            />
          )}

          {/* STEP 4: Complete State */}
          {step === 'complete' && (
            <div className="py-8 text-center space-y-4 my-auto">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <FiCheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Account Verified Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  Your credentials are now active on the Role Ready IAM gateway. Redirecting to workspace sign in...
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer"
              >
                Sign In Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
