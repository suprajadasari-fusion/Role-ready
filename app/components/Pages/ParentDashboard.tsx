import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { changePassword } from '../../lib/api';
import { 
  FiUsers, 
  FiUserPlus, 
  FiCheckCircle, 
  FiCreditCard, 
  FiTrendingUp, 
  FiBookOpen, 
  FiAward, 
  FiFileText, 
  FiShield, 
  FiCopy, 
  FiCheck, 
  FiAlertTriangle, 
  FiArrowRight, 
  FiDownload, 
  FiStar, 
  FiCalendar, 
  FiZap, 
  FiKey, 
  FiCompass, 
  FiActivity, 
  FiClock, 
  FiSliders, 
  FiRefreshCw, 
  FiBell, 
  FiDollarSign, 
  FiMapPin, 
  FiExternalLink, 
  FiUserCheck,
  FiInfo
} from 'react-icons/fi';
import { 
  ChildAccount, 
  ParentFamilyProfile, 
  FamilySubscription,
  AttendanceSummary,
  AcademicProgressData,
  CareerProgressData,
  LearningProgressData,
  ParentReport,
  Scholarship,
  CollegeItem,
  MentorItem,
  MentorBooking,
  ParentNotification,
  FeeSummary
} from '../../lib/types';
import { 
  fetchParentProfile, 
  saveParentFamilyProfile,
  addChildToFamily,
  toggleChildAccess,
  FAMILY_PLANS,
  updateParentSubscription,
  processFamilyPayment,
  retryFamilyPayment,
  fetchChildAttendance,
  fetchChildMarks,
  fetchChildAcademicProgress,
  fetchChildCareerProgress,
  fetchParentReports,
  fetchChildLearningProgress,
  fetchScholarships,
  fetchColleges,
  fetchMentors,
  bookMentorSession,
  fetchMentorBookings,
  fetchParentNotifications,
  markNotificationAsRead,
  fetchChildFees
} from '../../services/parent';

interface ParentDashboardProps {
  activeSubView: string;
  onShowToast: (msg: string) => void;
  isDarkMode: boolean;
}

function getFriendlyErrorMessage(err: any, fallback: string): string {
  if (!err) return fallback;
  const msg = typeof err === 'string' ? err : err?.message || '';
  if (!msg || typeof msg !== 'string' || msg.includes('/api/') || msg.includes('http') || msg.includes('POST') || msg.includes('GET') || msg.includes('500') || msg.includes('404') || msg.includes('status code')) {
    return fallback;
  }
  return msg;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const queryClient = useQueryClient();

  // --------------------------------------------------------------------------
  // 1. LIVE TANSTACK QUERY DATA LAYER (Zero Mock Data, Pure Live APIs)
  // --------------------------------------------------------------------------

  // Parent Profile & Family Roster (TanStack query key: 'parent-profile')
  const { 
    data: familyProfile, 
    isLoading: isProfileLoading, 
    refetch: refetchProfile 
  } = useQuery<ParentFamilyProfile>({
    queryKey: ['parent-profile'],
    queryFn: fetchParentProfile
  });

  const childrenList: ChildAccount[] = familyProfile?.children || [];

  // Active selected child state (persists across tab switches)
  const [selectedChildId, setSelectedChildId] = useState<string>('');

  // Sync selectedChildId when children load
  useEffect(() => {
    if (childrenList.length > 0) {
      if (!selectedChildId || !childrenList.some(c => c.id === selectedChildId)) {
        setSelectedChildId(childrenList[0].id);
      }
    } else {
      setSelectedChildId('');
    }
  }, [childrenList, selectedChildId]);

  const selectedChild: ChildAccount | undefined = childrenList.find(c => c.id === selectedChildId) || childrenList[0];

  // Child-specific reactive queries based on selectedChildId
  const { data: attendanceData } = useQuery<AttendanceSummary>({
    queryKey: ['parent-attendance', selectedChildId],
    queryFn: () => fetchChildAttendance(selectedChildId),
    enabled: !!selectedChildId
  });

  const { data: academicProgress } = useQuery<AcademicProgressData>({
    queryKey: ['parent-academic-progress', selectedChildId],
    queryFn: () => fetchChildAcademicProgress(selectedChildId),
    enabled: !!selectedChildId
  });

  const { data: careerProgress } = useQuery<CareerProgressData>({
    queryKey: ['parent-career-progress', selectedChildId],
    queryFn: () => fetchChildCareerProgress(selectedChildId),
    enabled: !!selectedChildId
  });

  const { data: learningProgress } = useQuery<LearningProgressData>({
    queryKey: ['parent-learning-progress', selectedChildId],
    queryFn: () => fetchChildLearningProgress(selectedChildId),
    enabled: !!selectedChildId
  });

  const { data: reportsData = [] } = useQuery<ParentReport[]>({
    queryKey: ['parent-reports', selectedChildId],
    queryFn: () => fetchParentReports(selectedChildId),
    enabled: !!selectedChildId
  });

  const { data: feesData } = useQuery<FeeSummary>({
    queryKey: ['parent-fees', selectedChildId],
    queryFn: () => fetchChildFees(selectedChildId),
    enabled: !!selectedChildId
  });

  // Global Parent Domain Queries
  const { data: scholarships = [] } = useQuery<Scholarship[]>({
    queryKey: ['parent-scholarships', selectedChildId],
    queryFn: () => fetchScholarships(selectedChildId)
  });

  const { data: colleges = [] } = useQuery<CollegeItem[]>({
    queryKey: ['parent-colleges', selectedChildId],
    queryFn: () => fetchColleges(selectedChildId)
  });

  const { data: mentors = [] } = useQuery<MentorItem[]>({
    queryKey: ['parent-mentors'],
    queryFn: fetchMentors
  });

  const { data: mentorBookings = [], refetch: refetchBookings } = useQuery<MentorBooking[]>({
    queryKey: ['parent-bookings'],
    queryFn: fetchMentorBookings
  });

  const { data: notifications = [] } = useQuery<ParentNotification[]>({
    queryKey: ['parent-notifications'],
    queryFn: fetchParentNotifications
  });

  // --------------------------------------------------------------------------
  // 2. ONBOARDING WIZARD & MODAL STATES
  // --------------------------------------------------------------------------
  
  const [isOnboardingMode, setIsOnboardingMode] = useState<boolean>(false);
  const [onboardingStep, setOnboardingStep] = useState<number>(1);

  // Auto-trigger onboarding if profile is explicitly marked not completed
  useEffect(() => {
    if (familyProfile && familyProfile.onboardingCompleted === false) {
      setIsOnboardingMode(true);
    }
  }, [familyProfile]);

  // Modal States
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isBookMentorModalOpen, setIsBookMentorModalOpen] = useState(false);
  const [selectedMentorToBook, setSelectedMentorToBook] = useState<MentorItem | null>(null);
  const [selectedPlanToBuy, setSelectedPlanToBuy] = useState<'starter' | 'growth' | 'elite'>('growth');
  const [paymentOutcomeSim, setPaymentOutcomeSim] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Child Form States (matching live backend DTOs)
  const [childFormFirstName, setChildFormFirstName] = useState('');
  const [childFormLastName, setChildFormLastName] = useState('');
  const [childFormEmail, setChildFormEmail] = useState('');
  const [childFormPhone, setChildFormPhone] = useState('');
  const [childFormRelationship, setChildFormRelationship] = useState('Child');
  const [childFormGrade, setChildFormGrade] = useState('Grade 10 - Secondary');
  const [childFormSchool, setChildFormSchool] = useState('');
  const [childFormCareer, setChildFormCareer] = useState('');
  const [childFormDob, setChildFormDob] = useState('2010-01-01');
  const [isSavingChild, setIsSavingChild] = useState(false);

  // Booking Mentor Form States
  const [bookingDate, setBookingDate] = useState('2026-09-18');
  const [bookingTime, setBookingTime] = useState('04:00 PM - 05:00 PM');
  const [bookingTopic, setBookingTopic] = useState('Career Pathway & College Shortlist Guidance');
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    onShowToast("Student login credentials copied to clipboard!");
    setTimeout(() => setCopiedId(null), 3000);
  };

  // --------------------------------------------------------------------------
  // 3. MUTATIONS & ACTIONS (Strict Live API Calls)
  // --------------------------------------------------------------------------

  // Add Child Action (Registers student via POST /api/v1/auth/register/student, then updates Parent Profile)
  const handleCreateChild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!childFormFirstName.trim() || !familyProfile) return;

    setIsSavingChild(true);
    const generatedEmail = childFormEmail.trim() || 
      `student.${childFormFirstName.toLowerCase()}.${Date.now().toString().slice(-4)}@roleready.ai`;

    try {
      const { child } = await addChildToFamily(familyProfile, {
        firstName: childFormFirstName.trim(),
        lastName: childFormLastName.trim() || 'Student',
        email: generatedEmail,
        phone: childFormPhone || familyProfile.phone,
        relationship: childFormRelationship,
        grade: childFormGrade,
        school: childFormSchool || 'Role Ready Partner School',
        targetCareer: childFormCareer.trim() || 'Technology & Engineering',
        dob: childFormDob
      });

      await queryClient.invalidateQueries({ queryKey: ['parent-profile'] });
      setSelectedChildId(child.id);
      setIsAddChildModalOpen(false);
      setChildFormFirstName('');
      setChildFormLastName('');
      setChildFormEmail('');
      setChildFormCareer('');
      onShowToast(`Student credentials created for ${child.name}! Account is ready.`);
    } catch (err: any) {
      onShowToast(getFriendlyErrorMessage(err, "Unable to add student account. Please try again."));
    } finally {
      setIsSavingChild(false);
    }
  };

  // Toggle Child License Access
  const handleToggleAccess = async (childId: string) => {
    if (!familyProfile) return;

    const targetChild = childrenList.find(c => c.id === childId);
    if (!targetChild) return;

    const nextAccess = !targetChild.hasAccess;
    const currentActiveCount = childrenList.filter(c => c.hasAccess).length;
    const maxAllowed = familyProfile.subscription?.maxChildren || 1;

    if (nextAccess && currentActiveCount >= maxAllowed) {
      onShowToast(`Seat quota reached! Current plan allows max ${maxAllowed} student seats. Please upgrade.`);
      return;
    }

    try {
      await toggleChildAccess(familyProfile, childId, nextAccess);
      await queryClient.invalidateQueries({ queryKey: ['parent-profile'] });
      onShowToast(`Student access license ${nextAccess ? 'granted' : 'revoked'} for ${targetChild.name}.`);
    } catch (err: any) {
      onShowToast(getFriendlyErrorMessage(err, "Unable to update access permissions. Please try again."));
    }
  };

  // Payment Execution (Simulates Success vs Failed Retry decision paths)
  const handleExecutePayment = async (outcome: 'success' | 'failed') => {
    setPaymentOutcomeSim('processing');

    const planConfig = FAMILY_PLANS.find(p => p.id === selectedPlanToBuy) || FAMILY_PLANS[1];
    const orderId = `ORD-RR-${Date.now()}`;

    try {
      const result = await processFamilyPayment({
        orderId,
        amount: planConfig.priceMonthly,
        currency: 'INR',
        planId: planConfig.backendPlanId,
        paymentMethod: 'UPI'
      }, outcome === 'failed');

      if (result.success && familyProfile) {
        await updateParentSubscription(familyProfile, planConfig);
        await queryClient.invalidateQueries({ queryKey: ['parent-profile'] });
        setPaymentOutcomeSim('success');
        onShowToast(`Payment Succeeded! Activated ${planConfig.name}. Student licenses unlocked!`);

        setTimeout(() => {
          setIsPaymentModalOpen(false);
          setPaymentOutcomeSim('idle');
          if (isOnboardingMode && onboardingStep === 5) {
            setOnboardingStep(6);
          }
        }, 1200);
      } else {
        setPaymentOutcomeSim('failed');
        onShowToast("Payment Failed. Bank declined transaction. Click 'Retry Payment' to retry.");
      }
    } catch (err: any) {
      setPaymentOutcomeSim('failed');
      onShowToast(getFriendlyErrorMessage(err, "Payment could not be completed. Please try again."));
    }
  };

  // Mentor Booking Submission
  const handleConfirmMentorBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentorToBook || !selectedChild) {
      onShowToast("Please select a child before booking a mentor.");
      return;
    }

    setIsBookingSubmitting(true);
    try {
      await bookMentorSession({
        mentorId: selectedMentorToBook.id,
        mentorName: selectedMentorToBook.name,
        studentId: selectedChild.id,
        studentName: selectedChild.name,
        date: bookingDate,
        timeSlot: bookingTime,
        topic: bookingTopic
      });
      await queryClient.invalidateQueries({ queryKey: ['parent-bookings'] });
      setIsBookMentorModalOpen(false);
      onShowToast(`Counseling session booked with ${selectedMentorToBook.name} for ${selectedChild.name}!`);
    } catch (err: any) {
      onShowToast(getFriendlyErrorMessage(err, "Unable to confirm booking. Please try again."));
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  // Complete Onboarding & transition to Live Dashboard
  const handleCompleteOnboarding = async () => {
    if (!familyProfile) return;
    try {
      await saveParentFamilyProfile({
        ...familyProfile,
        onboardingCompleted: true
      });
      await queryClient.invalidateQueries({ queryKey: ['parent-profile'] });
      setIsOnboardingMode(false);
      onShowToast("Family Onboarding Complete! Welcome to your live Parent Dashboard.");
    } catch (err: any) {
      onShowToast(getFriendlyErrorMessage(err, "Unable to finalize setup. Please try again."));
      setIsOnboardingMode(false);
    }
  };

  // Settings & Password Change States
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [notifyAcademic, setNotifyAcademic] = useState(true);
  const [notifyAttendance, setNotifyAttendance] = useState(true);
  const [notifyCareer, setNotifyCareer] = useState(true);
  const [notifyMentors, setNotifyMentors] = useState(true);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      onShowToast("Please enter current and new password.");
      return;
    }
    if (newPassword.length < 6) {
      onShowToast("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      onShowToast("New passwords do not match.");
      return;
    }
    setIsChangingPassword(true);
    try {
      await changePassword(oldPassword, newPassword);
      onShowToast("Password updated successfully!");
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      onShowToast(getFriendlyErrorMessage(err, "Failed to update password. Please check your current password."));
    } finally {
      setIsChangingPassword(false);
    }
  };

  // --------------------------------------------------------------------------
  // 4. RENDER ONBOARDING WIZARD VIEW (If in Onboarding Mode)
  // --------------------------------------------------------------------------
  if (isOnboardingMode) {
    return (
      <div className={`max-w-4xl mx-auto space-y-6 p-6 rounded-3xl border shadow-xl ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-blue-100 text-slate-900'
      }`}>
        {/* Onboarding Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-wider text-blue-500">
              Role Ready Parent Onboarding Pipeline
            </span>
            <h2 className="text-xl md:text-[22px] font-semibold leading-[1.3] tracking-[-0.015em] flex items-center gap-2.5 mt-1">
              <FiShield className="w-5 h-5 text-emerald-400" />
              Family Setup & Student Access Assignment
            </h2>
            <p className="text-[14px] font-normal leading-relaxed text-slate-400 mt-1">
              Configure family portal, register student accounts, choose a plan, and unlock learning suites.
            </p>
          </div>
          <button
            onClick={() => setIsOnboardingMode(false)}
            className="px-3.5 py-2 rounded-xl text-[14px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer self-start md:self-auto"
          >
            Skip to Dashboard →
          </button>
        </div>

        {/* 6-Step Visual Stepper Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          {[
            { num: 1, label: "Family Info" },
            { num: 2, label: "Child Management" },
            { num: 3, label: "Review Accounts" },
            { num: 4, label: "Select Plan" },
            { num: 5, label: "Payment Gateway" },
            { num: 6, label: "Assign Access" }
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => setOnboardingStep(s.num)}
              className={`p-3 rounded-2xl border cursor-pointer transition flex items-center gap-2.5 ${
                onboardingStep === s.num
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                  : onboardingStep > s.num
                    ? isDarkMode ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : isDarkMode ? 'bg-slate-800/40 border-slate-700/50 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <span className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 ${
                onboardingStep === s.num ? 'bg-white text-blue-600' : 'bg-slate-700/50 text-current'
              }`}>
                {onboardingStep > s.num ? <FiCheck className="w-3 h-3" /> : s.num}
              </span>
              <span className="font-semibold text-[12px] truncate">{s.label}</span>
            </div>
          ))}
        </div>

        {/* STEP 1: FAMILY INFORMATION */}
        {onboardingStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-xl md:text-[22px] font-semibold leading-[1.3] tracking-[-0.015em] flex items-center gap-2.5">
              <FiUsers className="w-5 h-5 text-blue-400" />
              Step 1: Family Contact & Guardian Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-medium text-slate-300 mb-1.5">Parent / Guardian Full Name</label>
                <input
                  type="text"
                  defaultValue={familyProfile?.parentName || ""}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px] font-normal leading-normal"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-slate-300 mb-1.5">Parent Email Address</label>
                <input
                  type="email"
                  disabled
                  value={familyProfile?.parentEmail || ""}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/30 text-slate-400 text-[14px] font-normal leading-normal cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-slate-300 mb-1.5">Mobile / Primary Phone</label>
                <input
                  type="text"
                  defaultValue={familyProfile?.phone || ""}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px] font-normal leading-normal"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-slate-300 mb-1.5">Emergency Contact</label>
                <input
                  type="text"
                  defaultValue={familyProfile?.emergencyContact || ""}
                  placeholder="Emergency phone or spouse contact"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px] font-normal leading-normal"
                />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setOnboardingStep(2)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[14px] shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Continue to Child Management</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CHILD MANAGEMENT */}
        {onboardingStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl md:text-[22px] font-semibold leading-[1.3] tracking-[-0.015em] flex items-center gap-2.5">
                  <FiKey className="w-5 h-5 text-amber-400" />
                  Step 2: Add Children & Create Student Login Credentials
                </h3>
                <p className="text-[14px] font-normal leading-relaxed text-slate-400 mt-1">
                  Each child receives independent student login credentials to access their student portal.
                </p>
              </div>
              <button
                onClick={() => setIsAddChildModalOpen(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold shadow-md cursor-pointer flex items-center gap-2"
              >
                <FiUserPlus className="w-4 h-4" />
                + Add Child
              </button>
            </div>

            {childrenList.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-700 rounded-2xl bg-slate-800/30 space-y-3">
                <FiUserPlus className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-[16px] font-semibold text-slate-300">No children registered yet</p>
                <p className="text-[14px] font-normal text-slate-400 max-w-sm mx-auto">
                  Click the button above to register your child's student account. Their login credentials will be generated automatically.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {childrenList.map((c) => (
                  <div key={c.id} className="p-4 rounded-2xl border border-slate-700 bg-slate-800/50 space-y-2">
                    <div className="flex items-center gap-3">
                      <img src={c.avatarUrl} alt={c.name} className="w-12 h-12 rounded-xl object-cover border border-blue-400" />
                      <div>
                        <h4 className="text-[16px] font-semibold leading-[1.35]">{c.name}</h4>
                        <p className="text-slate-400 text-[13px] font-normal mt-0.5">{c.grade} • {c.school}</p>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/60 font-mono text-[13px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-sans text-[12px] font-medium">Email:</span>
                        <span className="text-blue-300 font-bold">{c.studentEmail}</span>
                      </div>
                      {c.tempPassword && (
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-sans text-[12px] font-medium">Password:</span>
                          <span className="text-emerald-400 font-bold">{c.tempPassword}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setOnboardingStep(1)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[14px]"
              >
                Back
              </button>
              <button
                onClick={() => setOnboardingStep(3)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[14px] shadow-md flex items-center gap-2"
              >
                <span>Review Family Accounts</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW FAMILY ACCOUNTS */}
        {onboardingStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-xl md:text-[22px] font-semibold leading-[1.3] tracking-[-0.015em] flex items-center gap-2.5">
              <FiUserCheck className="w-5 h-5 text-purple-400" />
              Step 3: Review Family Accounts & Required Seats
            </h3>
            <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/30 flex items-center justify-between">
              <div>
                <span className="font-semibold text-[13px] text-blue-300">Total Children Registered:</span>
                <p className="text-[24px] font-bold mt-0.5">{childrenList.length} Student Accounts</p>
              </div>
              <div className="text-right">
                <span className="font-semibold text-[13px] text-slate-400">Recommended Plan:</span>
                <p className="text-[15px] font-bold text-emerald-400 mt-0.5">
                  {childrenList.length <= 1 ? "Starter (1 Seat)" : childrenList.length <= 3 ? "Growth (3 Seats)" : "Elite (5 Seats)"}
                </p>
              </div>
            </div>

            {childrenList.length === 0 ? (
              <div className="p-6 text-center border border-dashed border-slate-700 rounded-2xl text-[14px] text-slate-400">
                No children registered yet. Please go back to Step 2 to add a child.
              </div>
            ) : (
              <div className="border border-slate-700/60 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-800 text-slate-400 font-semibold uppercase text-[12px] tracking-wider">
                    <tr>
                      <th className="p-3.5">Child Name</th>
                      <th className="p-3.5">Grade & School</th>
                      <th className="p-3.5">Student Login Email</th>
                      <th className="p-3.5">Target Career</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-[14px]">
                    {childrenList.map((c) => (
                      <tr key={c.id}>
                        <td className="p-3.5 font-semibold">{c.name}</td>
                        <td className="p-3.5 text-slate-400">{c.grade}</td>
                        <td className="p-3.5 font-mono text-blue-300 text-[13px]">{c.studentEmail}</td>
                        <td className="p-3.5 text-emerald-400 font-medium">{c.targetCareer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setOnboardingStep(2)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[14px]"
              >
                Back
              </button>
              <button
                onClick={() => setOnboardingStep(4)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[14px] shadow-md flex items-center gap-2"
              >
                <span>Select Family Subscription</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SUBSCRIPTION SELECTION */}
        {onboardingStep === 4 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-xl md:text-[22px] font-semibold leading-[1.3] tracking-[-0.015em] flex items-center gap-2.5">
              <FiCreditCard className="w-5 h-5 text-emerald-400" />
              Step 4: Select Family Subscription Plan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FAMILY_PLANS.map((p) => {
                const isSelected = selectedPlanToBuy === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPlanToBuy(p.id)}
                    className={`p-5 rounded-2xl border cursor-pointer transition relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-900/30 border-blue-500 shadow-xl'
                        : isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      {p.popular && (
                        <span className="text-[12px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                          Most Popular
                        </span>
                      )}
                      <h4 className="text-[18px] font-semibold leading-[1.35] mt-2">{p.name}</h4>
                      <p className="text-[24px] font-bold text-blue-400 mt-1">₹{p.priceMonthly.toLocaleString()} <span className="text-[13px] font-normal text-slate-400">/ mo</span></p>
                      <p className="text-[13px] font-semibold text-emerald-400 mt-1">Up to {p.maxChildren} Student Accounts</p>
                      <ul className="mt-3 space-y-2 text-[14px] font-normal leading-relaxed text-slate-300">
                        {p.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <FiCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between text-[13px] font-semibold">
                      <span className={isSelected ? 'text-blue-400' : 'text-slate-400'}>
                        {isSelected ? '✓ Selected' : 'Click to Select'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setOnboardingStep(3)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[14px]"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setOnboardingStep(5);
                  setIsPaymentModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[14px] shadow-md flex items-center gap-2"
              >
                <span>Proceed to Payment Gateway</span>
                <FiCreditCard className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: PAYMENT GATEWAY SIMULATION */}
        {onboardingStep === 5 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-xl md:text-[22px] font-semibold leading-[1.3] tracking-[-0.015em] flex items-center gap-2.5">
              <FiCreditCard className="w-5 h-5 text-emerald-400" />
              Step 5: Payment Gateway Simulation
            </h3>
            <p className="text-[14px] font-normal leading-relaxed text-slate-400">
              Test both execution branches: <strong>Success ➔ Activate Plan</strong> vs <strong>Failed ➔ Retry Payment</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2 text-[14px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Chosen Plan:</span>
                <span className="font-semibold uppercase">{selectedPlanToBuy} Plan</span>
              </div>
              <div className="flex justify-between font-bold border-t border-slate-700 pt-2 text-[16px]">
                <span>Total Amount Due:</span>
                <span className="text-blue-400">
                  ₹{(FAMILY_PLANS.find(p => p.id === selectedPlanToBuy)?.priceMonthly || 999).toLocaleString()} / Month
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleExecutePayment('success')}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <FiCheckCircle className="w-4 h-4" />
                Simulate Payment Success (Activate Plan)
              </button>
              <button
                onClick={() => handleExecutePayment('failed')}
                className="flex-1 py-3 bg-rose-600/80 hover:bg-rose-600 text-white rounded-xl text-[14px] font-semibold shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <FiAlertTriangle className="w-4 h-4" />
                Simulate Payment Failure (Test Retry)
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: ASSIGN STUDENT ACCESS */}
        {onboardingStep === 6 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-xl md:text-[22px] font-semibold leading-[1.3] tracking-[-0.015em] flex items-center gap-2.5">
              <FiUserCheck className="w-5 h-5 text-emerald-400" />
              Step 6: Assign Access to Student Accounts
            </h3>
            <p className="text-[14px] font-normal leading-relaxed text-slate-400">
              Toggle access licenses for your registered children. Licensed children can log into their independent Student Portal.
            </p>

            {childrenList.length === 0 ? (
              <div className="p-6 text-center border border-dashed border-slate-700 rounded-2xl text-[14px] text-slate-400">
                No children accounts registered yet.
              </div>
            ) : (
              <div className="space-y-2">
                {childrenList.map((c) => (
                  <div key={c.id} className="p-3.5 rounded-2xl border border-slate-700 bg-slate-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={c.avatarUrl} alt={c.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <h4 className="text-[15px] font-semibold">{c.name}</h4>
                        <p className="text-slate-400 text-[13px] font-normal">{c.studentEmail}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleAccess(c.id)}
                      className={`px-3.5 py-1.5 rounded-xl font-semibold text-[13px] transition cursor-pointer ${
                        c.hasAccess ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {c.hasAccess ? "✓ Access Active" : "Assign License"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button
                onClick={handleCompleteOnboarding}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-semibold text-[15px] shadow-xl cursor-pointer flex items-center gap-2"
              >
                <span>Finish Onboarding & Launch Dashboard</span>
                <FiCheckCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 5. MAIN PARENT DASHBOARD (ONBOARDING COMPLETED)
  // --------------------------------------------------------------------------
  return (
    <div className="space-y-8 font-sans">
      
      {/* A. DASHBOARD TOP BANNER & CHILD SELECTOR */}
      <div className={`p-5 rounded-3xl border transition-all ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-700/30">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-wider text-blue-500">
              Role Ready Parent Intelligence Suite
            </span>
            <h2 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 mt-0.5">
              <FiShield className="w-5 h-5 text-emerald-400" />
              Welcome, {familyProfile?.parentName || "Parent"}
            </h2>
            <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">
              Active Plan: <strong className="text-emerald-400 font-semibold">{familyProfile?.subscription?.planName || "No Plan"}</strong> ({familyProfile?.subscription?.usedSeats || 0}/{familyProfile?.subscription?.maxChildren || 1} Seats In Use)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsOnboardingMode(true)}
              className="px-3.5 py-2 rounded-xl text-[14px] font-semibold bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition cursor-pointer flex items-center gap-1.5"
            >
              <FiSliders className="w-4 h-4" />
              Review Family Flow
            </button>

            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[14px] font-semibold transition shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <FiCreditCard className="w-4 h-4" />
              Manage Plan
            </button>

            <button
              onClick={() => setIsAddChildModalOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold transition shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <FiUserPlus className="w-4 h-4" />
              + Add Child
            </button>
          </div>
        </div>

        {/* Child Switcher Cards (Reactive Selector) */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-semibold uppercase text-slate-400 tracking-wider">
              Select Child to Inspect (Synchronizes all sub-views reactively):
            </span>
          </div>

          {childrenList.length === 0 ? (
            <div className="p-6 rounded-2xl border border-dashed border-slate-700 bg-slate-800/30 text-center">
              <FiUsers className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-[16px] font-semibold text-slate-300">No children accounts registered yet</p>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">Register a child account to monitor attendance, academic progress, and career milestones.</p>
              <button
                onClick={() => setIsAddChildModalOpen(true)}
                className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold transition inline-flex items-center gap-2 cursor-pointer"
              >
                <FiUserPlus className="w-4 h-4" />
                + Add First Child
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {childrenList.map((c) => {
                const isSelected = selectedChild?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedChildId(c.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-900/30 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                        : isDarkMode ? 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={c.avatarUrl} alt={c.name} className="w-10 h-10 rounded-xl object-cover border border-blue-400" />
                      <div>
                        <h4 className="font-semibold text-[16px] leading-[1.35]">{c.name}</h4>
                        <p className="text-[13px] text-slate-400">{c.grade}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2.5 py-0.5 rounded-full text-[12px] font-medium ${
                        c.hasAccess ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {c.hasAccess ? "Active" : "No License"}
                      </span>
                      {isSelected && <span className="block text-[12px] text-blue-400 font-semibold mt-1">Inspecting</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* B. TAB CONTENT VIEWS */}
      
      {/* If no children exist and user is viewing child-specific tabs */}
      {!selectedChild && ['attendance', 'academic', 'learning', 'career', 'career-reports', 'fees'].includes(activeSubView) && (
        <div className={`p-10 rounded-3xl border text-center ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-blue-100 text-slate-900'
        }`}>
          <FiInfo className="w-10 h-10 text-blue-400 mx-auto mb-3" />
          <h3 className="text-[17px] md:text-[18px] font-semibold leading-[1.35]">No Child Account Selected</h3>
          <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 max-w-sm mx-auto leading-normal">
            Please register or select a child account to inspect their progress, attendance, and evaluation records.
          </p>
          <button
            onClick={() => setIsAddChildModalOpen(true)}
            className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold transition inline-flex items-center gap-2 cursor-pointer"
          >
            <FiUserPlus className="w-4 h-4" />
            + Add Child
          </button>
        </div>
      )}

      {/* 1. OVERVIEW TAB */}
      {activeSubView === 'overview' && (
        <div className="space-y-6">
          {selectedChild ? (
            <>
              {/* 4 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`p-5 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'}`}>
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[12px] font-semibold uppercase tracking-wider">Overall Attendance</span>
                    <FiCheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[30px] md:text-[32px] font-bold leading-none tracking-[-0.02em]">{attendanceData?.overallPercentage || 0}%</span>
                  </div>
                  <p className="text-[13px] text-slate-400 mt-2">
                    {attendanceData?.totalDays ? `${attendanceData.presentDays} of ${attendanceData.totalDays} days attended` : "No attendance logs recorded yet"}
                  </p>
                </div>

                <div className={`p-5 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'}`}>
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[12px] font-semibold uppercase tracking-wider">Academic GPA</span>
                    <FiAward className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[30px] md:text-[32px] font-bold leading-none tracking-[-0.02em]">{academicProgress?.overallGpa || 0}</span>
                    <span className="text-[13px] font-medium text-slate-400">/ 10.0</span>
                  </div>
                  <p className="text-[13px] text-slate-400 mt-2">
                    {academicProgress?.classRank !== '-' ? `Class Rank: ${academicProgress?.classRank}` : "Exams pending evaluation"}
                  </p>
                </div>

                <div className={`p-5 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'}`}>
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[12px] font-semibold uppercase tracking-wider">Weekly Study Hours</span>
                    <FiClock className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[30px] md:text-[32px] font-bold leading-none tracking-[-0.02em]">{learningProgress?.weeklyStudyHours || 0}</span>
                    <span className="text-[13px] font-medium text-slate-400">Hrs / Wk</span>
                  </div>
                  <p className="text-[13px] text-slate-400 mt-2">
                    {learningProgress?.totalCoursesEnrolled ? `${learningProgress.totalCoursesEnrolled} active courses` : "No courses enrolled yet"}
                  </p>
                </div>

                <div className={`p-5 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'}`}>
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[12px] font-semibold uppercase tracking-wider">AI Career Alignment</span>
                    <FiZap className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[30px] md:text-[32px] font-bold leading-none tracking-[-0.02em]">{selectedChild.matchScore}%</span>
                  </div>
                  <p className="text-[13px] text-blue-300 mt-2 truncate">
                    {selectedChild.topAiCareerMatch || "Pending assessment"}
                  </p>
                </div>
              </div>

              {/* Subject Mastery Snapshot */}
              <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'}`}>
                <h3 className="text-[17px] md:text-[18px] font-semibold leading-[1.35] flex items-center gap-2 mb-4">
                  <FiBookOpen className="w-5 h-5 text-blue-400" />
                  Subject Mastery Snapshot — {selectedChild.name}
                </h3>
                {(academicProgress?.subjects?.length || 0) === 0 ? (
                  <div className="text-center py-6 text-[13px] text-slate-400 border border-dashed border-slate-700/60 rounded-2xl">
                    No academic subject evaluation marks published yet for this student.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {academicProgress?.subjects.map((s) => (
                      <div key={s.id} className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold text-[14px]">{s.subject}</span>
                          <span className="text-[14px] font-bold text-blue-400">{s.grade}</span>
                        </div>
                        <div className="w-full bg-slate-700/40 rounded-full h-2 mb-2 overflow-hidden">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${s.score}%` }} />
                        </div>
                        <div className="flex justify-between text-[12px] text-slate-400">
                          <span>Score: {s.score}%</span>
                          <span className="text-emerald-400 font-semibold">{s.remarks}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      )}

      {/* 2. MY CHILDREN TAB */}
      {activeSubView === 'children' && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'} space-y-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40">
            <div>
              <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2">
                <FiUsers className="w-5 h-5 text-blue-400" />
                My Children & Student Credentials Desk
              </h3>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">
                Created login credentials for your children to access their independent Student Learning Suite.
              </p>
            </div>
            <button
              onClick={() => setIsAddChildModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[14px] font-semibold shadow-md cursor-pointer flex items-center gap-2"
            >
              <FiUserPlus className="w-4 h-4" />
              Add Child & Generate Credentials
            </button>
          </div>

          {childrenList.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-slate-700 rounded-2xl bg-slate-800/30">
              <FiUserPlus className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-[16px] font-semibold text-slate-300">No children accounts registered yet</p>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">Click the button above to register your first child.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {childrenList.map((c) => (
                <div key={c.id} className={`p-5 rounded-3xl border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-4`}>
                  <div className="flex items-center gap-4">
                    <img src={c.avatarUrl} alt={c.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-400 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[16px] md:text-[17px] leading-[1.35]">{c.name}</h4>
                      <p className="text-[13px] text-slate-400">{c.grade} • {c.school}</p>
                      <span className="inline-block mt-1 text-[12px] font-medium px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                        Target: {c.targetCareer}
                      </span>
                    </div>
                  </div>

                  {/* Credentials Box */}
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700/60 font-mono text-[13px] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-sans text-[12px]">Login Email:</span>
                      <span className="text-blue-300 font-bold">{c.studentEmail}</span>
                    </div>
                    {c.tempPassword && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-sans text-[12px]">Password:</span>
                        <span className="text-emerald-400 font-bold">{c.tempPassword}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-700/40">
                    <button
                      onClick={() => handleCopy(`Email: ${c.studentEmail}\nPassword: ${c.tempPassword || 'Custom'}\nPortal: https://roleready.ai/login`, c.id)}
                      className="px-3.5 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-[14px] font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copiedId === c.id ? <FiCheck className="w-4 h-4 text-emerald-400" /> : <FiCopy className="w-4 h-4" />}
                      <span>{copiedId === c.id ? "Copied!" : "Copy Credentials"}</span>
                    </button>

                    <button
                      onClick={() => handleToggleAccess(c.id)}
                      className={`px-3.5 py-2 rounded-xl text-[14px] font-semibold cursor-pointer transition ${
                        c.hasAccess ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {c.hasAccess ? "✓ License Active" : "Assign License"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. FAMILY ACCOUNTS TAB */}
      {activeSubView === 'accounts' && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'} space-y-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40">
            <div>
              <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2">
                <FiShield className="w-5 h-5 text-blue-400" />
                Family Accounts & Member Governance
              </h3>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">
                Manage registered family accounts, student access permissions, and independent student credentials.
              </p>
            </div>
            <button
              onClick={() => setIsAddChildModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[14px] font-semibold shadow-md cursor-pointer flex items-center gap-2"
            >
              <FiUserPlus className="w-4 h-4" />
              Add Child Account
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-blue-50/50 border-blue-100'}`}>
              <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider block">Total Members</span>
              <p className="text-[26px] md:text-[28px] font-bold leading-none mt-2 text-blue-400">{childrenList.length + 1}</p>
              <span className="text-[12px] text-slate-400 mt-1 block">1 Guardian • {childrenList.length} Students</span>
            </div>
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-emerald-50/50 border-emerald-100'}`}>
              <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider block">Student Seat Allocation</span>
              <p className="text-[26px] md:text-[28px] font-bold leading-none mt-2 text-emerald-400">
                {childrenList.filter(c => c.hasAccess).length} / {familyProfile?.subscription?.maxChildren || 1}
              </p>
              <span className="text-[12px] text-slate-400 mt-1 block">Active Licenses Assigned</span>
            </div>
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-purple-50/50 border-purple-100'}`}>
              <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider block">Family Subscription</span>
              <p className="text-[26px] md:text-[28px] font-bold leading-none mt-2 text-purple-400">{familyProfile?.subscription?.planName || "Starter"}</p>
              <span className="text-[12px] text-emerald-400 font-semibold mt-1 block">Active & Live</span>
            </div>
          </div>

          {/* Primary Guardian Card */}
          <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-800/40 border-slate-700/80' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-lg">
                  <FiShield className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-[17px] md:text-[18px] leading-[1.35]">{familyProfile?.parentName || "Guardian Account"}</h4>
                    <span className="px-2.5 py-0.5 rounded-full text-[12px] font-semibold uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      Primary Admin
                    </span>
                  </div>
                  <p className="text-[13px] md:text-[14px] text-slate-400 mt-0.5 leading-normal">
                    {familyProfile?.parentEmail} • {familyProfile?.phone || "No phone registered"}
                  </p>
                </div>
              </div>
              <span className="text-[13px] font-medium px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                Full Portal Ownership
              </span>
            </div>
          </div>

          {/* Student Members List */}
          <div className="space-y-3">
            <h4 className="text-[16px] md:text-[17px] font-semibold text-slate-300 flex items-center gap-2">
              <FiUsers className="w-4 h-4 text-blue-400" />
              Student Accounts ({childrenList.length})
            </h4>

            {childrenList.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-700 rounded-2xl bg-slate-800/20">
                <p className="text-[13px] md:text-[14px] text-slate-400">No student accounts registered yet in your family.</p>
                <button
                  onClick={() => setIsAddChildModalOpen(true)}
                  className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[14px] font-semibold transition inline-flex items-center gap-2"
                >
                  <FiUserPlus className="w-4 h-4" />
                  Register First Child
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {childrenList.map((c) => (
                  <div key={c.id} className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'} space-y-3`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={c.avatarUrl} alt={c.name} className="w-11 h-11 rounded-xl object-cover border border-blue-400 shrink-0" />
                        <div>
                          <h5 className="font-semibold text-[16px] leading-[1.35]">{c.name}</h5>
                          <p className="text-[13px] text-slate-400">{c.grade} • {c.school}</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[12px] font-medium ${
                        c.hasAccess ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {c.hasAccess ? "Active License" : "Inactive"}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-[13px] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-sans text-[12px]">Login Email:</span>
                        <span className="text-blue-300 font-bold">{c.studentEmail}</span>
                      </div>
                      {c.tempPassword && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-sans text-[12px]">Password:</span>
                          <span className="text-emerald-400 font-bold">{c.tempPassword}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/40">
                      <button
                        onClick={() => handleCopy(`Email: ${c.studentEmail}\nPassword: ${c.tempPassword || 'Custom'}\nPortal: https://roleready.ai/login`, c.id)}
                        className="px-3.5 py-1.5 bg-slate-700/70 hover:bg-slate-700 text-white rounded-xl text-[14px] font-semibold flex items-center gap-1.5 transition cursor-pointer"
                      >
                        {copiedId === c.id ? <FiCheck className="w-4 h-4 text-emerald-400" /> : <FiCopy className="w-4 h-4" />}
                        <span>{copiedId === c.id ? "Copied" : "Copy Info"}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedChildId(c.id);
                            onShowToast(`Selected ${c.name} for monitoring`);
                          }}
                          className={`px-3.5 py-1.5 rounded-xl text-[14px] font-semibold cursor-pointer transition ${
                            selectedChild?.id === c.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {selectedChild?.id === c.id ? "Selected" : "Select"}
                        </button>
                        <button
                          onClick={() => handleToggleAccess(c.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-[14px] font-semibold cursor-pointer transition ${
                            c.hasAccess ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                          }`}
                        >
                          {c.hasAccess ? "Revoke Seat" : "Assign Seat"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. ATTENDANCE TAB */}
      {activeSubView === 'attendance' && selectedChild && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'} space-y-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40">
            <div>
              <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2">
                <FiCalendar className="w-5 h-5 text-emerald-400" />
                Attendance & Classroom Presence — {selectedChild.name}
              </h3>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">Live attendance feed verified directly from institutional portal.</p>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[13px] font-semibold">
              {attendanceData?.overallPercentage || 0}% Overall Presence
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700 text-center">
              <span className="text-slate-400 text-[12px] font-semibold uppercase tracking-wider block">Total Days</span>
              <span className="text-[28px] md:text-[30px] font-bold leading-none mt-2 block">{attendanceData?.totalDays || 0}</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center">
              <span className="text-emerald-400 text-[12px] font-semibold uppercase tracking-wider block">Present Days</span>
              <span className="text-[28px] md:text-[30px] font-bold leading-none text-emerald-400 mt-2 block">{attendanceData?.presentDays || 0}</span>
            </div>
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-center">
              <span className="text-rose-400 text-[12px] font-semibold uppercase tracking-wider block">Absent Days</span>
              <span className="text-[28px] md:text-[30px] font-bold leading-none text-rose-400 mt-2 block">{attendanceData?.absentDays || 0}</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-center">
              <span className="text-amber-400 text-[12px] font-semibold uppercase tracking-wider block">Late Days</span>
              <span className="text-[28px] md:text-[30px] font-bold leading-none text-amber-400 mt-2 block">{attendanceData?.lateDays || 0}</span>
            </div>
          </div>

          {/* Subject Attendance Breakdown */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase text-slate-400 mb-3 tracking-wider">Subject-Wise Attendance</h4>
            {(attendanceData?.subjectBreakdown?.length || 0) === 0 ? (
              <div className="text-center py-6 text-[13px] text-slate-400 border border-dashed border-slate-700/60 rounded-2xl">
                No subject attendance records submitted yet for this student.
              </div>
            ) : (
              <div className="space-y-2.5">
                {attendanceData?.subjectBreakdown.map((sub, i) => (
                  <div key={i} className="p-3.5 rounded-2xl border border-slate-700 bg-slate-800/40 flex items-center justify-between text-[14px]">
                    <div>
                      <span className="font-semibold">{sub.subject}</span>
                      <p className="text-slate-400 text-[12px] mt-0.5">{sub.attendedClasses} of {sub.totalClasses} classes attended</p>
                    </div>
                    <span className="font-bold text-emerald-400 text-[15px]">{sub.percentage}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Daily Attendance Logs */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase text-slate-400 mb-3 tracking-wider">Recent Classroom Check-ins</h4>
            {(attendanceData?.recentLogs?.length || 0) === 0 ? (
              <div className="text-center py-6 text-[13px] text-slate-400 border border-dashed border-slate-700/60 rounded-2xl">
                No classroom check-in logs recorded yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-800 border border-slate-700 rounded-2xl overflow-hidden text-[14px]">
                {attendanceData?.recentLogs.map((log) => (
                  <div key={log.id} className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${log.status === 'present' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      <span className="font-medium text-[14px]">{log.subject}</span>
                      <span className="text-slate-400 text-[13px]">{log.remarks}</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[12px]">{log.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. ACADEMIC PERFORMANCE TAB */}
      {activeSubView === 'academic' && selectedChild && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'} space-y-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40">
            <div>
              <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2">
                <FiBookOpen className="w-5 h-5 text-blue-400" />
                Academic Performance & Exam Reports — {selectedChild.name}
              </h3>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">Institutional grades, term examinations, and teacher recommendations.</p>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[13px] font-semibold">
              {academicProgress?.gradingSystem || "10-Point CGPA"}
            </span>
          </div>

          {/* Marks Breakdown Table */}
          <div className="border border-slate-700 rounded-2xl overflow-hidden text-[14px]">
            <table className="w-full text-left">
              <thead className="bg-slate-800 text-slate-400 font-semibold uppercase text-[12px] tracking-wider">
                <tr>
                  <th className="p-3.5">Subject</th>
                  <th className="p-3.5">Term</th>
                  <th className="p-3.5">Score</th>
                  <th className="p-3.5">Grade</th>
                  <th className="p-3.5">Class Avg</th>
                  <th className="p-3.5">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {(academicProgress?.subjects?.length || 0) === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-400 text-[13px]">
                      No academic marks or exam grades recorded yet for this student.
                    </td>
                  </tr>
                ) : (
                  academicProgress?.subjects.map((sub) => (
                    <tr key={sub.id}>
                      <td className="p-3.5 font-semibold text-[14px]">{sub.subject}</td>
                      <td className="p-3.5 text-slate-400 text-[14px]">{sub.term}</td>
                      <td className="p-3.5 font-bold text-blue-400 text-[14px]">{sub.score} / {sub.maxScore}</td>
                      <td className="p-3.5 font-bold text-emerald-400 text-[14px]">{sub.grade}</td>
                      <td className="p-3.5 text-slate-400 text-[14px]">{sub.classAverage}%</td>
                      <td className="p-3.5 text-slate-300 text-[14px]">{sub.remarks}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Teacher Feedback */}
          {academicProgress?.teacherFeedback && (
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700 text-[14px]">
              <span className="font-semibold text-blue-400 text-[12px] uppercase tracking-wider block mb-1">Academic Counselor Review:</span>
              <p className="text-slate-300 leading-relaxed text-[14px]">{academicProgress.teacherFeedback}</p>
            </div>
          )}
        </div>
      )}

      {/* 5. CAREER PROGRESS TAB */}
      {activeSubView === 'career' && selectedChild && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'} space-y-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40">
            <div>
              <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2">
                <FiCompass className="w-5 h-5 text-indigo-400" />
                Career DNA & Psychometric Trajectory — {selectedChild.name}
              </h3>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">Calculated via Holland RIASEC Hexagonal Cognitive Aptitude Assessment.</p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[13px] font-semibold">
              Holland Code: {careerProgress?.riasecCode || "Pending"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Holland Scores (6 Cols) */}
            <div className="lg:col-span-6 space-y-3">
              <h4 className="text-[12px] font-semibold uppercase text-slate-400 tracking-wider">RIASEC Psychological Profile</h4>
              {(careerProgress?.hollandScores?.length || 0) === 0 ? (
                <div className="p-6 text-center border border-dashed border-slate-700 rounded-2xl text-[13px] text-slate-400">
                  RIASEC Holland Code assessment pending. When your student completes the diagnostic in their portal, live psychometric data will appear here.
                </div>
              ) : (
                careerProgress?.hollandScores.map((t, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[14px]">
                      <span className="text-slate-300 font-medium">{t.trait}</span>
                      <span className="font-semibold">{t.score}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className={`${t.color} h-2 rounded-full`} style={{ width: `${t.score}%` }} />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* AI Career Pathways (6 Cols) */}
            <div className="lg:col-span-6 space-y-3">
              <h4 className="text-[12px] font-semibold uppercase text-slate-400 tracking-wider">AI Neural Career Pathways</h4>
              {(careerProgress?.pathways?.length || 0) === 0 ? (
                <div className="p-6 text-center border border-dashed border-slate-700 rounded-2xl text-[13px] text-slate-400">
                  Career pathways will generate once the student completes their career diagnostic.
                </div>
              ) : (
                careerProgress?.pathways.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl border border-slate-700 bg-slate-800/50 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <h5 className="font-semibold text-[16px] leading-[1.35]">{p.title}</h5>
                      <span className="font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20 text-[12px]">
                        {p.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-slate-400 text-[13px] leading-normal">{p.matchRationale}</p>
                    <p className="text-blue-300 text-[13px] font-medium">Est. Salary: {p.salaryRange} • {p.growthOutlook}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. CAREER REPORTS TAB */}
      {activeSubView === 'career-reports' && selectedChild && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'} space-y-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40">
            <div>
              <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2">
                <FiFileText className="w-5 h-5 text-blue-400" />
                AI Career Reports & Assessments — {selectedChild.name}
              </h3>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">Download official evaluation dossiers and counselor reviews.</p>
            </div>
          </div>

          {reportsData.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-slate-700 rounded-2xl text-[13px] text-slate-400">
              No official evaluation reports published yet for this student.
            </div>
          ) : (
            <div className="space-y-3">
              {reportsData.map((rep) => (
                <div key={rep.id} className="p-4 rounded-2xl border border-slate-700 bg-slate-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-[16px] md:text-[17px] leading-[1.35]">{rep.title}</h4>
                    <p className="text-slate-400 text-[14px] mt-1 leading-normal">{rep.summary}</p>
                    <p className="text-[12px] text-blue-300 mt-1 font-medium">Generated: {rep.generatedDate}</p>
                  </div>
                  <button
                    onClick={() => onShowToast(`Downloading report: ${rep.title}...`)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold transition shadow-md cursor-pointer flex items-center gap-2 shrink-0 self-start md:self-auto"
                  >
                    <FiDownload className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 7. LEARNING PROGRESS TAB */}
      {activeSubView === 'learning' && selectedChild && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'} space-y-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40">
            <div>
              <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2">
                <FiActivity className="w-5 h-5 text-indigo-400" />
                Learning Progress & Active Course Tracks — {selectedChild.name}
              </h3>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">Courses and curriculum modules completed in the Student Learning Suite.</p>
            </div>
            <span className="text-[13px] font-semibold text-emerald-400">
              {learningProgress?.weeklyStudyHours || 0} Study Hours This Week
            </span>
          </div>

          {(learningProgress?.activeCourses?.length || 0) === 0 ? (
            <div className="p-8 text-center border border-dashed border-slate-700 rounded-2xl text-[13px] text-slate-400">
              No active curriculum courses enrolled yet in Student Learning Suite.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {learningProgress?.activeCourses.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl border border-slate-700 bg-slate-800/40 flex flex-col justify-between">
                  <div>
                    <span className="text-[12px] font-semibold uppercase text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full">{c.category}</span>
                    <h4 className="font-semibold text-[16px] leading-[1.35] mt-2">{c.title}</h4>
                    <p className="text-slate-400 text-[13px] mt-0.5">{c.provider}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-700/60">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-400 text-[13px]">Lessons: {c.completedLessons}/{c.totalLessons}</span>
                      <span className="font-semibold text-[13px] text-blue-400">{c.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${c.progressPercent}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 8. SCHOLARSHIPS TAB */}
      {activeSubView === 'scholarships' && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'} space-y-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40">
            <div>
              <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2">
                <FiAward className="w-5 h-5 text-indigo-400" />
                Scholarship Opportunities {selectedChild ? `Matched for ${selectedChild.name}` : ''}
              </h3>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">Directly matched to student's academic standing, grade, and eligibility criteria.</p>
            </div>
          </div>

          {scholarships.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-700 rounded-3xl p-6">
              <FiAward className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <h4 className="text-[16px] font-semibold text-slate-300">No Scholarship Recommendations Yet</h4>
              <p className="text-[13px] text-slate-400 mt-1 max-w-sm mx-auto">
                When scholarship recommendations become available based on student criteria, they will be listed here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scholarships.map((sch) => (
                <div key={sch.id} className="p-5 rounded-3xl border border-slate-700 bg-slate-800/40 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-[16px] md:text-[17px] leading-[1.35]">{sch.name}</h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-emerald-500/20 text-emerald-300">
                        {sch.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-slate-400 text-[13px] mt-0.5">{sch.provider}</p>
                    <p className="text-emerald-400 font-bold mt-2 text-[16px]">{sch.amount}</p>
                    <p className="text-slate-300 text-[13px] mt-2"><strong>Criteria:</strong> {sch.eligibilityCriteria}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                    <span className="text-slate-400 text-[12px]">Deadline: {sch.deadline}</span>
                    <a
                      href={sch.applyLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[14px] font-semibold flex items-center gap-1.5 transition"
                    >
                      <span>Apply Guide</span>
                      <FiExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 9. COLLEGE EXPLORER TAB */}
      {activeSubView === 'colleges' && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'} space-y-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40">
            <div>
              <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2">
                <FiCompass className="w-5 h-5 text-blue-400" />
                Target University & College Explorer
              </h3>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">Curated universities aligned with student career trajectory.</p>
            </div>
          </div>

          {colleges.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-700 rounded-3xl p-6">
              <FiCompass className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <h4 className="text-[16px] font-semibold text-slate-300">No College Recommendations Yet</h4>
              <p className="text-[13px] text-slate-400 mt-1 max-w-sm mx-auto">
                When universities are mapped to the student's career trajectory, they will be displayed here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {colleges.map((col) => (
                <div key={col.id} className="p-5 rounded-3xl border border-slate-700 bg-slate-800/40 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-[16px] md:text-[17px] leading-[1.35]">{col.name}</h4>
                        <p className="text-slate-400 text-[13px] flex items-center gap-1 mt-0.5">
                          <FiMapPin className="w-3.5 h-3.5" />
                          {col.location}
                        </p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-blue-500/20 text-blue-300">
                        Rank #{col.ranking}
                      </span>
                    </div>

                    <div className="mt-3 space-y-1 text-[13px]">
                      <p className="text-slate-300"><strong>Annual Fees:</strong> {col.feesAnnual}</p>
                      <p className="text-slate-300"><strong>Admissions Selectivity:</strong> {col.acceptanceRate}</p>
                      <p className="text-slate-400"><strong>Programs:</strong> {col.programs.join(' • ')}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                    <span className="text-emerald-400 font-semibold text-[13px]">Min GPA: {col.minGpaRequired}</span>
                    <button
                      onClick={() => onShowToast(`Shortlisted ${col.name}!`)}
                      className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[14px] font-semibold transition cursor-pointer"
                    >
                      Shortlist College
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 10. MENTOR BOOKING TAB */}
      {activeSubView === 'mentors' && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'} space-y-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40">
            <div>
              <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2">
                <FiUserCheck className="w-5 h-5 text-emerald-400" />
                1-on-1 Certified Mentor & Counselor Booking
              </h3>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">Book personal sessions with industry architects and admissions experts.</p>
            </div>
          </div>

          {mentorBookings.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-[12px] font-semibold uppercase text-slate-400 tracking-wider">Scheduled Mentorship Sessions</h4>
              {mentorBookings.map((bk) => (
                <div key={bk.id} className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h5 className="font-semibold text-[16px] leading-[1.35] text-emerald-400">Session with {bk.mentorName}</h5>
                    <p className="text-slate-300 text-[13px] mt-0.5">{bk.topic}</p>
                    <p className="text-slate-400 text-[12px] mt-1">{bk.date} at {bk.timeSlot} • Student: {bk.studentName}</p>
                  </div>
                  <a
                    href={bk.meetingLink || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold transition flex items-center gap-2 shrink-0 self-start md:self-auto"
                  >
                    <span>Join Video Call</span>
                    <FiExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Mentors Directory */}
          {mentors.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-700 rounded-3xl p-6">
              <FiUsers className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <h4 className="text-[16px] font-semibold text-slate-300">No Mentors Currently Available</h4>
              <p className="text-[13px] text-slate-400 mt-1 max-w-sm mx-auto">
                Verified mentors are being updated on the network. Please check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mentors.map((m) => (
                <div key={m.id} className="p-5 rounded-3xl border border-slate-700 bg-slate-800/40 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <img src={m.avatarUrl} alt={m.name} className="w-12 h-12 rounded-xl object-cover border border-emerald-400 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-[16px] md:text-[17px] leading-[1.35]">{m.name}</h4>
                        <p className="text-slate-400 text-[13px]">{m.title}</p>
                      </div>
                    </div>
                    <p className="text-emerald-400 font-semibold text-[13px] mt-2">{m.organization}</p>
                    <p className="text-slate-300 text-[13px] mt-2 leading-relaxed">{m.bio}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-amber-400 font-semibold text-[13px]">
                      <FiStar className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{m.rating} ({m.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
                    <span className="font-semibold text-[15px] text-blue-400">{m.hourlyRate}</span>
                    <button
                      onClick={() => {
                        setSelectedMentorToBook(m);
                        setIsBookMentorModalOpen(true);
                      }}
                      className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[14px] font-semibold transition cursor-pointer"
                    >
                      Book Slot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 11. NOTIFICATIONS TAB */}
      {activeSubView === 'notifications' && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'} space-y-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40">
            <div>
              <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2">
                <FiBell className="w-5 h-5 text-amber-400" />
                Family Notifications & Activity Alerts
              </h3>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">Real-time alerts across academic results, scholarships, and sessions.</p>
            </div>
            <button
              onClick={() => onShowToast("All notifications marked as read!")}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[14px] font-semibold transition cursor-pointer"
            >
              Mark All Read
            </button>
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-700 rounded-3xl p-6">
              <FiBell className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <h4 className="text-[16px] font-semibold text-slate-300">No Notifications</h4>
              <p className="text-[13px] text-slate-400 mt-1">You're all caught up! New alerts and academic milestones will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800 border border-slate-700 rounded-2xl overflow-hidden text-[14px]">
              {notifications.map((n) => (
                <div key={n.id} className="p-4 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {!n.isRead && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                      <h4 className="font-semibold text-[16px] leading-[1.35]">{n.title}</h4>
                    </div>
                    <p className="text-slate-300 text-[14px] leading-normal">{n.message}</p>
                    <span className="text-[12px] text-slate-400 block mt-0.5">{n.timestamp}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[12px] font-semibold uppercase bg-slate-800 text-slate-400 shrink-0">
                    {n.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 12. SUBSCRIPTION PLANS TAB */}
      {activeSubView === 'subscription' && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'} space-y-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40">
            <div>
              <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2">
                <FiCreditCard className="w-5 h-5 text-emerald-400" />
                Subscription Plans & Family Seat Allocation
              </h3>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">
                Choose the optimal plan to unlock AI assessment suites, career roadmaps, and mentor sessions for your children.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedPlanToBuy(familyProfile?.subscription?.planId || 'growth');
                setIsPaymentModalOpen(true);
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold shadow-md cursor-pointer flex items-center gap-2"
            >
              <FiZap className="w-4 h-4" />
              Manage / Upgrade Plan
            </button>
          </div>

          {/* Current Active Plan Overview */}
          <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-blue-950/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  Current Active Plan
                </span>
                <span className="text-[13px] text-slate-400 font-medium">• Renews {familyProfile?.subscription?.renewalDate || 'Monthly'}</span>
              </div>
              <h4 className="text-[22px] md:text-[24px] font-bold mt-2 text-white leading-[1.25]">{familyProfile?.subscription?.planName || "Starter Plan"}</h4>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">
                Allocated Seats: <span className="text-emerald-400 font-semibold">{childrenList.filter(c => c.hasAccess).length}</span> of <span className="font-semibold text-white">{familyProfile?.subscription?.maxChildren || 1}</span> student accounts active.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[13px] text-slate-400 block font-medium">Monthly Investment</span>
              <p className="text-[26px] md:text-[28px] font-bold text-emerald-400 leading-none mt-1">₹{(familyProfile?.subscription?.priceMonthly || 499).toLocaleString()} <span className="text-[13px] text-slate-400 font-normal">/ mo</span></p>
              <span className="text-[12px] text-emerald-300 font-medium bg-emerald-500/10 px-2.5 py-0.5 rounded-full mt-1.5 inline-block">
                Tax Invoice Generated
              </span>
            </div>
          </div>

          {/* Tier Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FAMILY_PLANS.map((p) => {
              const isCurrent = (familyProfile?.subscription?.planId === p.id) || (!familyProfile?.subscription?.planId && p.id === 'starter');
              return (
                <div
                  key={p.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition relative ${
                    isCurrent
                      ? 'bg-blue-900/30 border-blue-500 shadow-xl ring-1 ring-blue-500/50'
                      : isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      {p.popular ? (
                        <span className="text-[12px] font-semibold uppercase text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                          Most Popular
                        </span>
                      ) : <span />}
                      {isCurrent && (
                        <span className="text-[12px] font-semibold uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                          Active Plan
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-[17px] md:text-[18px] leading-[1.35] mt-2">{p.name}</h4>
                    <p className="text-[22px] md:text-[24px] font-bold text-blue-400 mt-1">₹{p.priceMonthly.toLocaleString()} <span className="text-[13px] text-slate-400 font-normal">/ mo</span></p>
                    <p className="text-[13px] font-semibold text-emerald-400 mt-1">Up to {p.maxChildren} Student Accounts</p>
                    <ul className="mt-4 space-y-2 text-[13px] text-slate-300">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <FiCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-700/50">
                    <button
                      onClick={() => {
                        setSelectedPlanToBuy(p.id);
                        setIsPaymentModalOpen(true);
                      }}
                      className={`w-full py-2.5 rounded-xl text-[14px] font-semibold transition cursor-pointer ${
                        isCurrent
                          ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40 hover:bg-blue-600/50'
                          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                      }`}
                    >
                      {isCurrent ? "Current Active Tier" : `Upgrade to ${p.name}`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 12. FEE MANAGEMENT TAB */}
      {activeSubView === 'fees' && selectedChild && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'} space-y-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40">
            <div>
              <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2">
                <FiDollarSign className="w-5 h-5 text-emerald-400" />
                Fee Management & Invoicing Desk — {selectedChild.name}
              </h3>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">Platform subscriptions, school tuition schedules, and payment receipts.</p>
            </div>
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold shadow-md cursor-pointer flex items-center gap-2"
            >
              <FiCreditCard className="w-4 h-4" />
              Pay Pending Dues
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700 text-center">
              <span className="text-slate-400 text-[12px] font-semibold uppercase tracking-wider block">Total Billed Fees</span>
              <span className="text-[26px] md:text-[28px] font-bold leading-none mt-2 block">₹{(feesData?.totalFees || 0).toLocaleString()}</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center">
              <span className="text-emerald-400 text-[12px] font-semibold uppercase tracking-wider block">Paid Amount</span>
              <span className="text-[26px] md:text-[28px] font-bold leading-none text-emerald-400 mt-2 block">₹{(feesData?.totalPaid || 0).toLocaleString()}</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-center">
              <span className="text-amber-400 text-[12px] font-semibold uppercase tracking-wider block">Pending Due</span>
              <span className="text-[26px] md:text-[28px] font-bold leading-none text-amber-400 mt-2 block">₹{(feesData?.totalPending || 0).toLocaleString()}</span>
            </div>
          </div>

          <div className="border border-slate-700 rounded-2xl overflow-hidden text-[14px]">
            <table className="w-full text-left">
              <thead className="bg-slate-800 text-slate-400 font-semibold uppercase text-[12px] tracking-wider">
                <tr>
                  <th className="p-3.5">Invoice No</th>
                  <th className="p-3.5">Fee Category</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Due Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {(feesData?.records?.length || 0) === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-400 text-[13px]">
                      No fee records or invoices found for this student.
                    </td>
                  </tr>
                ) : (
                  feesData?.records.map((rec) => (
                    <tr key={rec.id}>
                      <td className="p-3.5 font-mono text-blue-300 text-[13px]">{rec.invoiceNo || "-"}</td>
                      <td className="p-3.5 font-semibold text-[14px]">{rec.title}</td>
                      <td className="p-3.5 font-bold text-[14px]">₹{rec.amount.toLocaleString()}</td>
                      <td className="p-3.5 text-slate-400 text-[13px]">{rec.dueDate}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[12px] font-medium ${
                          rec.status === 'paid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {rec.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3.5">
                        {rec.status === 'paid' ? (
                          <button
                            onClick={() => onShowToast(`Downloading invoice receipt: ${rec.invoiceNo}...`)}
                            className="text-[13px] text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                          >
                            Receipt PDF
                          </button>
                        ) : (
                          <button
                            onClick={() => setIsPaymentModalOpen(true)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-[13px] cursor-pointer"
                          >
                            Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 13. SETTINGS TAB */}
      {activeSubView === 'settings' && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'} space-y-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40">
            <div>
              <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2">
                <FiSliders className="w-5 h-5 text-blue-400" />
                Parent Account Settings & Security
              </h3>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">
                Configure guardian profile metadata, notification channels, and account authentication security.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Profile & Notification Preferences */}
            <div className="space-y-5">
              <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-3`}>
                <h4 className="font-semibold text-[16px] md:text-[17px] leading-[1.35] text-blue-400 flex items-center gap-2">
                  <FiUserCheck className="w-4 h-4" />
                  Guardian Identity Details
                </h4>
                <div className="space-y-2.5">
                  <div>
                    <span className="text-slate-400 block text-[12px] font-medium">Guardian Name:</span>
                    <span className="font-semibold text-white text-[15px]">{familyProfile?.parentName || "Parent Account"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[12px] font-medium">Primary Email:</span>
                    <span className="font-mono text-blue-300 text-[13px]">{familyProfile?.parentEmail}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[12px] font-medium">Primary Contact:</span>
                    <span className="text-slate-200 text-[14px]">{familyProfile?.phone || "Not Set"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[12px] font-medium">Emergency Contact:</span>
                    <span className="text-slate-200 text-[14px]">{familyProfile?.emergencyContact || "Not Set"}</span>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-3`}>
                <h4 className="font-semibold text-[16px] md:text-[17px] leading-[1.35] text-emerald-400 flex items-center gap-2">
                  <FiBell className="w-4 h-4" />
                  Notification Preferences
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-slate-300 text-[14px]">Academic & Grade Alerts</span>
                    <input 
                      type="checkbox" 
                      checked={notifyAcademic} 
                      onChange={(e) => {
                        setNotifyAcademic(e.target.checked);
                        onShowToast(`Academic notifications ${e.target.checked ? 'enabled' : 'disabled'}`);
                      }}
                      className="accent-blue-500 w-4 h-4 cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-slate-300 text-[14px]">Classroom Attendance Alerts</span>
                    <input 
                      type="checkbox" 
                      checked={notifyAttendance} 
                      onChange={(e) => {
                        setNotifyAttendance(e.target.checked);
                        onShowToast(`Attendance notifications ${e.target.checked ? 'enabled' : 'disabled'}`);
                      }}
                      className="accent-blue-500 w-4 h-4 cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-slate-300 text-[14px]">Career Diagnostic Milestones</span>
                    <input 
                      type="checkbox" 
                      checked={notifyCareer} 
                      onChange={(e) => {
                        setNotifyCareer(e.target.checked);
                        onShowToast(`Career alerts ${e.target.checked ? 'enabled' : 'disabled'}`);
                      }}
                      className="accent-blue-500 w-4 h-4 cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-slate-300 text-[14px]">1-on-1 Mentor Session Reminders</span>
                    <input 
                      type="checkbox" 
                      checked={notifyMentors} 
                      onChange={(e) => {
                        setNotifyMentors(e.target.checked);
                        onShowToast(`Mentor reminders ${e.target.checked ? 'enabled' : 'disabled'}`);
                      }}
                      className="accent-blue-500 w-4 h-4 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Change Password Form */}
            <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-4`}>
              <div>
                <h4 className="font-semibold text-[16px] md:text-[17px] leading-[1.35] text-blue-400 flex items-center gap-2">
                  <FiKey className="w-4 h-4" />
                  Change Account Password
                </h4>
                <p className="text-[13px] text-slate-400 mt-1 leading-normal">
                  Ensure your account is protected with a strong, secure password.
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-3.5">
                <div>
                  <label className="block text-[13px] font-medium text-slate-300 mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-slate-300 mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-slate-300 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[14px] font-semibold shadow-md transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isChangingPassword ? (
                      <>
                        <FiRefreshCw className="w-4 h-4 animate-spin" />
                        <span>Updating Password...</span>
                      </>
                    ) : (
                      <>
                        <FiKey className="w-4 h-4" />
                        <span>Update Password</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 14. PROFILE TAB */}
      {activeSubView === 'profile' && (
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-blue-100 shadow-sm'} space-y-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40">
            <div>
              <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2">
                <FiShield className="w-5 h-5 text-blue-400" />
                Parent & Family Profile Management
              </h3>
              <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal">Manage your guardian profile, contact details, and account preferences.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700 space-y-3">
              <h4 className="font-semibold text-[16px] md:text-[17px] leading-[1.35] text-blue-400">Guardian Contact Information</h4>
              <div>
                <span className="text-slate-400 block text-[12px] font-medium">Guardian Name:</span>
                <span className="font-semibold text-white text-[15px]">{familyProfile?.parentName || "Not Set"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[12px] font-medium">Primary Email:</span>
                <span className="font-mono text-blue-300 text-[13px]">{familyProfile?.parentEmail || "Not Set"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[12px] font-medium">Primary Mobile:</span>
                <span className="text-slate-200 text-[14px]">{familyProfile?.phone || "Not Set"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[12px] font-medium">Emergency Contact:</span>
                <span className="text-slate-200 text-[14px]">{familyProfile?.emergencyContact || "Not Set"}</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700 space-y-3">
              <h4 className="font-semibold text-[16px] md:text-[17px] leading-[1.35] text-emerald-400">Family Subscription State</h4>
              <div>
                <span className="text-slate-400 block text-[12px] font-medium">Active Plan:</span>
                <span className="font-semibold text-white text-[15px]">{familyProfile?.subscription?.planName || "No Plan"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[12px] font-medium">Seat Allocation:</span>
                <span className="text-slate-200 text-[14px]">
                  {familyProfile?.subscription?.usedSeats || 0} of {familyProfile?.subscription?.maxChildren || 1} Student Licenses Allocated
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[12px] font-medium">Billing Cycle:</span>
                <span className="text-slate-200 text-[14px]">Monthly • ₹{(familyProfile?.subscription?.priceMonthly || 0).toLocaleString()} / month</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[12px] font-medium">Renewal Date:</span>
                <span className="text-emerald-400 font-semibold text-[14px]">{familyProfile?.subscription?.renewalDate || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------------
          MODAL 1: ADD CHILD & CREATE CREDENTIALS (Live API POST /register/student)
          ---------------------------------------------------------------------- */}
      {isAddChildModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl relative ${
            isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] mb-1 flex items-center gap-2">
              <FiUserPlus className="w-5 h-5 text-blue-400" />
              Add Child & Generate Student Credentials
            </h3>
            <p className="text-[13px] md:text-[14px] text-slate-400 mb-5 leading-normal">
              Enter student details to generate and set up their individual student portal access.
            </p>

            <form onSubmit={handleCreateChild} className="space-y-4 font-sans">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-medium mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lucas"
                    value={childFormFirstName}
                    onChange={(e) => setChildFormFirstName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Doe"
                    value={childFormLastName}
                    onChange={(e) => setChildFormLastName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-medium mb-1">Student Login Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="Auto-generated if empty"
                    value={childFormEmail}
                    onChange={(e) => setChildFormEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium mb-1">Relationship</label>
                  <select
                    value={childFormRelationship}
                    onChange={(e) => setChildFormRelationship(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
                  >
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Child">Child</option>
                    <option value="Ward">Ward / Guardian</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-medium mb-1">Current Grade / Year</label>
                  <select
                    value={childFormGrade}
                    onChange={(e) => setChildFormGrade(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
                  >
                    <option>Grade 8 - Middle School</option>
                    <option>Grade 9 - Foundation</option>
                    <option>Grade 10 - Secondary</option>
                    <option>Grade 11 - STEM Track</option>
                    <option>Grade 12 - Senior High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={childFormDob}
                    onChange={(e) => setChildFormDob(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium mb-1">Affiliated School</label>
                <input
                  type="text"
                  placeholder="e.g. Modern High School"
                  value={childFormSchool}
                  onChange={(e) => setChildFormSchool(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium mb-1">Target Career / Focus Track</label>
                <input
                  type="text"
                  placeholder="e.g. AI Architect, Robotics, Medicine, Design"
                  value={childFormCareer}
                  onChange={(e) => setChildFormCareer(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
                />
              </div>

              <div className="p-3 rounded-2xl bg-blue-950/30 border border-blue-500/20 text-[12px] text-blue-200">
                ℹ️ Student account credentials (Email and temporary password) will be automatically created.
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddChildModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[14px] font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingChild}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[14px] font-semibold transition cursor-pointer shadow-md flex items-center gap-2"
                >
                  {isSavingChild ? <FiRefreshCw className="w-4 h-4 animate-spin" /> : null}
                  <span>{isSavingChild ? "Creating Credentials..." : "Save & Register Student"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------------
          MODAL 2: PAYMENT GATEWAY (SUCCESS VS FAILED RETRY DECISION PATHS)
          ---------------------------------------------------------------------- */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl relative ${
            isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] mb-1 flex items-center gap-2">
              <FiCreditCard className="w-5 h-5 text-emerald-400" />
              Role Ready Family Checkout
            </h3>
            <p className="text-[13px] text-slate-400 mb-4 leading-normal">
              Payment Execution Flow: <strong>Success ➔ Activate Plan</strong> vs <strong>Failed ➔ Retry Payment</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2 mb-4 text-[14px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Plan:</span>
                <span className="font-semibold uppercase">{selectedPlanToBuy} Plan</span>
              </div>
              <div className="flex justify-between font-semibold border-t border-slate-700 pt-2">
                <span>Amount:</span>
                <span className="text-blue-400 font-bold text-[18px]">
                  ₹{(FAMILY_PLANS.find(p => p.id === selectedPlanToBuy)?.priceMonthly || 999).toLocaleString()} / Month
                </span>
              </div>
            </div>

            {paymentOutcomeSim === 'processing' && (
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[13px] flex items-center gap-3 animate-pulse mb-4">
                <FiRefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing bank authorization & activating student licenses...</span>
              </div>
            )}

            {paymentOutcomeSim === 'failed' && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[13px] space-y-2 mb-4">
                <div className="flex items-center gap-2 font-semibold">
                  <FiAlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Payment Declined by Card Issuer</span>
                </div>
                <p className="text-[12px] text-rose-200/80">
                  Simulated transaction decline. Click "Retry Payment" below to attempt transaction recovery.
                </p>
                <button
                  onClick={() => handleExecutePayment('success')}
                  className="mt-2 w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-[14px] transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <FiRefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Payment (Simulate Recovery)</span>
                </button>
              </div>
            )}

            {paymentOutcomeSim === 'success' && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[13px] flex items-center gap-2 mb-4 font-semibold">
                <FiCheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Payment Verified! Student seats activated.</span>
              </div>
            )}

            <div className="space-y-2.5">
              <button
                disabled={paymentOutcomeSim === 'processing'}
                onClick={() => handleExecutePayment('success')}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[14px] transition cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <FiCheckCircle className="w-4 h-4" />
                <span>Simulate Payment Success (Activate Plan)</span>
              </button>

              <button
                disabled={paymentOutcomeSim === 'processing'}
                onClick={() => handleExecutePayment('failed')}
                className="w-full py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white font-semibold text-[14px] transition cursor-pointer flex items-center justify-center gap-2"
              >
                <FiAlertTriangle className="w-4 h-4" />
                <span>Simulate Payment Failure (Test Retry State)</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 font-semibold text-[14px] transition cursor-pointer"
              >
                Close Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------------
          MODAL 3: BOOK MENTOR SESSION MODAL
          ---------------------------------------------------------------------- */}
      {isBookMentorModalOpen && selectedMentorToBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl relative ${
            isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] mb-1 flex items-center gap-2">
              <FiUserCheck className="w-5 h-5 text-emerald-400" />
              Book Session with {selectedMentorToBook.name}
            </h3>
            <p className="text-[13px] text-slate-400 mb-4">{selectedMentorToBook.organization}</p>

            <form onSubmit={handleConfirmMentorBooking} className="space-y-3 font-sans">
              <div>
                <label className="block font-medium text-[13px] mb-1">Student Attendee</label>
                <input
                  type="text"
                  disabled
                  value={selectedChild ? `${selectedChild.name} (${selectedChild.grade})` : "No child selected"}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/30 text-slate-300 text-[14px]"
                />
              </div>

              <div>
                <label className="block font-medium text-[13px] mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
                />
              </div>

              <div>
                <label className="block font-medium text-[13px] mb-1">Select Available Time Slot</label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
                >
                  {selectedMentorToBook.availableSlots.length > 0 ? (
                    selectedMentorToBook.availableSlots.map((slot, i) => (
                      <option key={i} value={slot}>{slot}</option>
                    ))
                  ) : (
                    <>
                      <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                      <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                      <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block font-medium text-[13px] mb-1">Counseling Focus Topic</label>
                <input
                  type="text"
                  value={bookingTopic}
                  onChange={(e) => setBookingTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-700/60">
                <span className="font-semibold text-[16px] text-emerald-400">{selectedMentorToBook.hourlyRate}</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBookMentorModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[14px] transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isBookingSubmitting || !selectedChild}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[14px] transition cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isBookingSubmitting ? "Confirming..." : "Confirm Booking"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
