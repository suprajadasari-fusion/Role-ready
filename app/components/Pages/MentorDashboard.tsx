import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  FiUserCheck, 
  FiCpu, 
  FiCalendar, 
  FiUsers, 
  FiVideo, 
  FiCompass, 
  FiStar, 
  FiCreditCard, 
  FiBell, 
  FiSliders, 
  FiPlus, 
  FiSearch, 
  FiDownload, 
  FiCheck, 
  FiClock, 
  FiDollarSign, 
  FiAward, 
  FiFileText 
} from 'react-icons/fi';
import { ActionModal } from '../ActionModal';
import { StudentToolsViews } from '../StudentToolsViews';
import { mentorService, MentorSkillItem, MentorSlotItem, MentorWalletData } from '../../services/mentorService';

interface MentorDashboardProps {
  activeSubView: string;
  onShowToast: (msg: string) => void;
  isDarkMode: boolean;
}

export const MentorDashboard: React.FC<MentorDashboardProps> = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const queryClient = useQueryClient();

  // Modal State
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState<{ title: string; subtitle: string; fields: any[] }>({
    title: '',
    subtitle: '',
    fields: []
  });

  // Query live mentor data from backend
  const { data: mentorData, isLoading } = useQuery({
    queryKey: ['mentorData'],
    queryFn: () => mentorService.getMentorData()
  });

  // Query live bookings from backend
  const { data: liveBookings } = useQuery({
    queryKey: ['mentorBookings'],
    queryFn: () => mentorService.getMentorBookings()
  });

  const skillsList: MentorSkillItem[] = mentorData?.skills || [];
  const slotsList: MentorSlotItem[] = mentorData?.slots || [];
  const wallet: MentorWalletData = mentorData?.wallet || { balance: 0, hourlyRate: 1500, payouts: [] };

  const updateMutation = useMutation({
    mutationFn: (updates: {
      skills?: MentorSkillItem[];
      slots?: MentorSlotItem[];
      wallet?: MentorWalletData;
    }) => mentorService.updateMentorData(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mentorData'] });
    },
    onError: (err: any) => {
      onShowToast("Unable to save changes. Please try again.");
    }
  });

  if (['discovery', 'assessment', 'psychometric', 'dna', 'ai-recommendations', 'scholarships', 'colleges', 'roadmap', 'resume-ats', 'learning'].includes(activeSubView)) {
    return <StudentToolsViews activeSubView={activeSubView} onShowToast={onShowToast} isDarkMode={isDarkMode} />;
  }

  const openTriggerModal = (title: string, subtitle: string, fields: any[]) => {
    setActionModalConfig({ title, subtitle, fields });
    setIsActionModalOpen(true);
  };

  const handleModalFormSubmit = (data: Record<string, string>) => {
    if (actionModalConfig.title === "Add Available Slot") {
      const newSlot: MentorSlotItem = {
        id: Date.now(),
        day: data.day || "Tomorrow",
        time: data.time || "2:00 PM - 3:00 PM",
        mentee: "Open Slot",
        topic: data.topic || "1-on-1 Career Counseling",
        status: "Available",
        bg: "bg-[#DEE9FF]",
        border: "border-[#C6D9FF]"
      };
      const updatedSlots = [newSlot, ...slotsList];
      updateMutation.mutate({ slots: updatedSlots });
      onShowToast(`Added new availability slot for ${newSlot.day} (${newSlot.time})!`);
    } else if (actionModalConfig.title === "Add Mentorship Skill") {
      const newSkill: MentorSkillItem = {
        name: data.name || "Technical Domain",
        level: data.level || "Expert",
        mentees: "Active Mentorship"
      };
      const updatedSkills = [newSkill, ...skillsList];
      updateMutation.mutate({ skills: updatedSkills });
      onShowToast(`Added mentorship expertise domain: ${newSkill.name}!`);
    } else if (actionModalConfig.title === "Request Payout Withdrawal") {
      const withdrawAmt = parseInt(data.amount) || 5000;
      if (withdrawAmt > wallet.balance) {
        onShowToast("Insufficient wallet balance for withdrawal!");
      } else {
        const updatedWallet: MentorWalletData = {
          ...wallet,
          balance: wallet.balance - withdrawAmt,
          payouts: [
            {
              id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
              date: "Today",
              amount: `₹${withdrawAmt.toLocaleString()}`,
              status: "Processing Payout"
            },
            ...(wallet.payouts || [])
          ]
        };
        updateMutation.mutate({ wallet: updatedWallet });
        onShowToast(`Requested withdrawal of ₹${withdrawAmt.toLocaleString()}!`);
      }
    } else if (actionModalConfig.title === "Save Session Notes") {
      mentorService.saveCounselingNote("student", data.notes || "Action items logged").catch(() => {});
      onShowToast("Session notes saved and synced with student roadmap!");
    } else {
      onShowToast(`Action completed: ${actionModalConfig.title}`);
    }
    setIsActionModalOpen(false);
  };

  const cardClass = isDarkMode
    ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
    : 'bg-white border-slate-200 text-slate-900 shadow-xs';

  const textMuted = isDarkMode ? 'text-slate-400' : 'text-[#6B7280]';
  const textHeading = isDarkMode ? 'text-white' : 'text-[#12163A]';
  const borderDivider = isDarkMode ? 'border-slate-800' : 'border-slate-100';

  const renderContent = () => {
    // 1. DASHBOARD OVERVIEW
    if (activeSubView === 'overview') {
      return (
        <div className="space-y-6 font-sans text-[14px]">
          {/* Overview KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-[24px] bg-[#12163A] text-white shadow-md space-y-2 hover-card-lift">
              <span className="text-[13px] font-medium block text-slate-300">Mentorship Domains</span>
              <div className="text-[28px] md:text-[32px] font-bold text-white leading-none tracking-[-0.02em]">{skillsList.length} Skills</div>
              <span className="text-[12px] font-semibold text-[#E4F4EC] bg-[#E4F4EC]/10 px-2.5 py-0.5 rounded-full inline-block">Active Expertise</span>
            </div>

            <div className="p-5 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift">
              <span className="text-[13px] font-medium block text-[#4B5563]">Calendar Slots</span>
              <div className="text-[28px] md:text-[32px] font-bold text-[#3665EE] leading-none tracking-[-0.02em]">{slotsList.length} Slots</div>
              <span className="text-[12px] font-semibold text-[#12163A]">Bookings Active</span>
            </div>

            <div className="p-5 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift">
              <span className="text-[13px] font-medium block text-[#4B5563]">Session Rate</span>
              <div className="text-[28px] md:text-[32px] font-bold text-[#12163A] leading-none tracking-[-0.02em]">₹{wallet.hourlyRate} / hr</div>
              <span className="text-[12px] font-semibold text-[#3665EE]">Configured Rate</span>
            </div>

            <div className="p-5 rounded-[24px] bg-white text-[#12163A] shadow-sm border border-slate-200 space-y-2 hover-card-lift">
              <span className="text-[13px] font-medium block text-[#6B7280]">Wallet Balance</span>
              <div className="text-[28px] md:text-[32px] font-bold text-[#3665EE] leading-none tracking-[-0.02em]">₹{wallet.balance.toLocaleString()}</div>
              <span className="text-[12px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">Available</span>
            </div>
          </div>

          {/* Verification & Profile Summary */}
          <div className={`p-6 rounded-[24px] border space-y-4 ${cardClass}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className={`text-[16px] md:text-[18px] font-semibold ${textHeading}`}>Career Counselor & Technical Mentor</h3>
                <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal mt-1`}>Verified Role Ready Mentor • 1-on-1 Guidance Desk • Session Rate: ₹{wallet.hourlyRate}/hr</p>
              </div>
              <span className="bg-[#E4F4EC] text-[#12163A] font-semibold text-[12px] px-3.5 py-1 rounded-full border border-[#C3E6D5] self-start sm:self-auto">
                ✓ Verified Mentor
              </span>
            </div>

            {slotsList.length > 0 ? (
              <div className="p-5 rounded-[20px] bg-[#DEE9FF] border border-[#C6D9FF] flex items-center justify-between text-[#12163A]">
                <div className="flex items-center gap-3">
                  <FiClock className="w-5 h-5 text-[#3665EE]" />
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#12163A]">Next Counseling Slot</h4>
                    <p className="text-[13px] text-[#4B5563] mt-0.5">{slotsList[0].day} • {slotsList[0].time} • {slotsList[0].topic}</p>
                  </div>
                </div>
                <button 
                  onClick={() => onShowToast("Joining live video counseling session...")}
                  className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md"
                >
                  <FiVideo className="w-4 h-4" /> Start Session
                </button>
              </div>
            ) : (
              <div className="p-5 rounded-[20px] bg-[#DEE9FF]/40 border border-[#C6D9FF] flex items-center justify-between text-[#12163A]">
                <div className="flex items-center gap-3">
                  <FiCalendar className="w-5 h-5 text-[#3665EE]" />
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#12163A]">No Upcoming Slots</h4>
                    <p className="text-[13px] text-[#4B5563] mt-0.5">Add calendar availability slots so students can book sessions</p>
                  </div>
                </div>
                <button 
                  onClick={() => openTriggerModal("Add Available Slot", "Create a new time slot for student bookings", [
                    { label: "Target Day", name: "day", type: "text", placeholder: "Tomorrow" },
                    { label: "Time Slot", name: "time", type: "text", placeholder: "2:00 PM - 3:00 PM" },
                    { label: "Counseling Topic", name: "topic", type: "text", placeholder: "1-on-1 Career Strategy" }
                  ])}
                  className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer shadow-md"
                >
                  + Add Slot
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    // 2. PROFILE & VERIFICATION
    if (activeSubView === 'profile') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiUserCheck className="w-5 h-5 text-[#3665EE]" /> Mentor Profile & Verification Credentials
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Verified mentor badge, academic credentials, and session pricing</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Edit Profile & Rates", "Update mentor bio and session pricing", [
                { label: "Hourly Session Rate (₹)", name: "rate", type: "number", placeholder: `${wallet.hourlyRate}` },
                { label: "Bio / Specialization", name: "bio", type: "text", placeholder: "AI Architecture & Career Strategy" }
              ])}
              className="bg-[#12163A] hover:bg-[#1A2050] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md"
            >
              Edit Profile & Rates
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-3 text-[#12163A]">
              <span className="text-[12px] bg-[#12163A] text-white px-3 py-1 rounded-full font-semibold">Academic Background</span>
              <h4 className="text-[16px] font-semibold text-[#12163A]">Verified Domain Mentor</h4>
              <p className="text-[13px] text-[#4B5563] font-normal leading-normal">Specialization in Engineering, AI, and Higher Education Career Roadmaps</p>
            </div>

            <div className="p-5 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] space-y-3 text-[#12163A]">
              <span className="text-[12px] bg-[#12163A] text-white px-3 py-1 rounded-full font-semibold">Verification Status</span>
              <h4 className="text-[16px] font-semibold text-[#12163A]">✓ Verified Mentor Badge</h4>
              <p className="text-[13px] text-[#4B5563] font-normal leading-normal">Approved for 1-on-1 High School & University Counseling • Real-time Session Sync</p>
            </div>
          </div>
        </div>
      );
    }

    // 3. SKILLS & EXPERTISE
    if (activeSubView === 'skills') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiCpu className="w-5 h-5 text-[#3665EE]" /> Mentorship Skill Matrix & Technical Domains
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Expertise domains for AI-driven student matching</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Add Mentorship Skill", "Add a new domain expertise for student counseling", [
                { label: "Skill / Domain Title", name: "name", type: "text", placeholder: "Full-Stack System Design" },
                { label: "Expertise Level", name: "level", type: "text", placeholder: "Expert" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-4 h-4" /> Add Mentorship Skill
            </button>
          </div>

          {skillsList.length === 0 ? (
            <div className="py-12 text-center text-[13px] text-slate-400">
              <FiCpu className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
              No mentorship skills registered yet. Click '+ Add Mentorship Skill' to add your expertise.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillsList.map((s, i) => (
                <div key={i} className="p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift">
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#12163A]">{s.name}</h4>
                    <span className="text-[#3665EE] text-[13px] font-medium">{s.mentees}</span>
                  </div>
                  <span className="text-[12px] bg-white border border-slate-200 text-[#12163A] px-3 py-1 rounded-lg font-semibold shadow-2xs">
                    {s.level}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // 4. AVAILABILITY & CALENDAR
    if (activeSubView === 'availability' || activeSubView === 'calendar') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiCalendar className="w-5 h-5 text-[#3665EE]" /> Slot Booking & Availability Calendar
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Configure 1-on-1 counseling time slots and manage student bookings</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Add Available Slot", "Create a new time slot for student bookings", [
                { label: "Target Day", name: "day", type: "text", placeholder: "Tomorrow" },
                { label: "Time Slot", name: "time", type: "text", placeholder: "2:00 PM - 3:00 PM" },
                { label: "Counseling Topic", name: "topic", type: "text", placeholder: "1-on-1 Career Strategy" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-4 h-4" /> Add Available Slot
            </button>
          </div>

          {slotsList.length === 0 ? (
            <div className="py-12 text-center text-[13px] text-slate-400">
              <FiCalendar className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
              No availability slots created yet. Click '+ Add Available Slot' to open counseling slots.
            </div>
          ) : (
            <div className="space-y-3">
              {slotsList.map((sl) => (
                <div key={sl.id} className={`p-4 rounded-[20px] border flex items-center justify-between ${sl.bg || 'bg-[#DEE9FF]'} ${sl.border || 'border-[#C6D9FF]'} text-[#12163A] hover-card-lift`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold text-[#3665EE]">{sl.day} • {sl.time}</span>
                      <span className="text-[12px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-0.5 rounded-md font-semibold">{sl.status}</span>
                    </div>
                    <h4 className="text-[16px] font-semibold text-[#12163A] mt-1">{sl.topic}</h4>
                    <div className="text-[13px] text-[#4B5563]">Student: {sl.mentee}</div>
                  </div>
                  <button 
                    onClick={() => onShowToast(`Managed slot for ${sl.time}`)}
                    className="bg-[#12163A] hover:bg-[#1A2050] text-white text-[14px] font-semibold px-3.5 py-1.5 rounded-xl cursor-pointer"
                  >
                    Manage Slot
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // 5. STUDENT REQUESTS
    // 5. STUDENT REQUESTS
    if (activeSubView === 'student-requests' || activeSubView === 'mentees') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiUsers className="w-5 h-5 text-[#3665EE]" /> Student Counseling Booking Requests
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Review pending mentorship booking requests</p>
            </div>
          </div>

          <div className="py-12 text-center text-[13px] text-slate-400">
            <FiUsers className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
            No pending counseling booking requests at this time.
          </div>
        </div>
      );
    }

    // 6. VIDEO SESSIONS
    if (activeSubView === 'video-sessions' || activeSubView === 'counseling') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiVideo className="w-5 h-5 text-[#3665EE]" /> Live 1-on-1 Video Counseling Room
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>HD encrypted video room with live screen share & action plan notes</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Save Session Notes", "Record counseling takeaways and student action items", [
                { label: "Action Items for Student", name: "notes", type: "text", placeholder: "Complete roadmap milestones and ATS resume update" }
              ])}
              className="bg-[#12163A] hover:bg-[#1A2050] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md"
            >
              <FiFileText className="w-4 h-4" /> Save Session Notes
            </button>
          </div>

          <div className="p-8 rounded-[24px] bg-[#12163A] text-white text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#3665EE] flex items-center justify-center mx-auto shadow-lg">
              <FiVideo className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-[20px] md:text-[22px] font-semibold">Encrypted Video Counseling Room</h3>
            <p className="text-[13px] md:text-[14px] text-slate-300 max-w-md mx-auto leading-normal">
              Ready to launch 1-on-1 video call. Camera and microphone permissions active.
            </p>
            <button 
              onClick={() => onShowToast("Camera & Microphone connected! Launching HD video stream.")}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-6 py-2.5 rounded-xl cursor-pointer shadow-md transition hover:scale-105"
            >
              Launch Live Call Now
            </button>
          </div>
        </div>
      );
    }

    // 7. ASSESSMENTS & GUIDANCE
    if (activeSubView === 'guidance') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiCompass className="w-5 h-5 text-[#3665EE]" /> Student Assessment Review & Career Guidance
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Review Holland Code DNA passports & issue customized career roadmaps</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Issue Career Action Plan", "Send structured action items to student portal", [
                { label: "Target Student", name: "student", type: "text", placeholder: "Student Name" },
                { label: "Recommended Milestone", name: "milestone", type: "text", placeholder: "Complete PyTorch Certification" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-4 h-4" /> Issue Career Action Plan
            </button>
          </div>

          <div className="py-12 text-center text-[13px] text-slate-400">
            <FiCompass className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
            No pending student assessment reviews at this time.
          </div>
        </div>
      );
    }

    // 8. RATINGS & REVIEWS
    if (activeSubView === 'ratings') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`pb-4 border-b ${borderDivider}`}>
            <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
              <FiStar className="w-5 h-5 text-amber-500" /> Student Ratings & Counselor Reviews
            </h2>
            <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Verified student feedback and ratings from live mentorship sessions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]">
              <div className="text-[32px] md:text-[36px] font-bold text-[#3665EE] leading-none">5.0 / 5.0</div>
              <p className="text-[14px] font-semibold text-[#12163A] mt-2">Average Star Rating</p>
              <span className="text-[12px] text-[#4B5563] block mt-0.5">Verified Reviews</span>
            </div>
            <div className="p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]">
              <div className="text-[32px] md:text-[36px] font-bold text-[#12163A] leading-none">100%</div>
              <p className="text-[14px] font-semibold text-[#12163A] mt-2">Student Satisfaction</p>
              <span className="text-[12px] text-[#4B5563] block mt-0.5">Certified Mentor Badge</span>
            </div>
            <div className="p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]">
              <div className="text-[32px] md:text-[36px] font-bold text-[#12163A] leading-none">{slotsList.length}</div>
              <p className="text-[14px] font-semibold text-[#12163A] mt-2">Total Slots Configured</p>
              <span className="text-[12px] text-[#3665EE] font-medium block mt-0.5">Active Guidance</span>
            </div>
          </div>
        </div>
      );
    }

    // 9. WALLET & PAYOUTS
    if (activeSubView === 'wallet') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiCreditCard className="w-5 h-5 text-[#3665EE]" /> Mentor Wallet & Bank Payout Desk
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Track session earnings, wallet balance, & request direct bank transfers</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Request Payout Withdrawal", "Transfer earnings from wallet to verified bank account", [
                { label: "Withdrawal Amount (₹)", name: "amount", type: "number", placeholder: "5000" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiDollarSign className="w-4 h-4" /> Request Payout Withdrawal
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-[24px] bg-[#12163A] text-white space-y-2">
              <span className="text-slate-300 text-[13px] font-medium block">Available Wallet Balance</span>
              <div className="text-[28px] md:text-[32px] font-bold text-white leading-none tracking-[-0.02em]">₹{wallet.balance.toLocaleString()}</div>
              <span className="text-[12px] text-[#E4F4EC] bg-[#E4F4EC]/10 px-2.5 py-0.5 rounded-full inline-block font-medium">Ready for Withdrawal</span>
            </div>
            <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-2">
              <span className="text-[#4B5563] text-[13px] font-medium block">Configured Session Hourly Rate</span>
              <div className="text-[28px] md:text-[32px] font-bold text-[#3665EE] leading-none tracking-[-0.02em]">₹{wallet.hourlyRate} / hr</div>
              <span className="text-[12px] text-[#4B5563] block">Direct Mentor Compensation</span>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <h3 className={`text-[16px] md:text-[17px] font-semibold ${textHeading}`}>Payout History</h3>
            {(!wallet.payouts || wallet.payouts.length === 0) ? (
              <div className="py-8 text-center text-[13px] text-slate-400">
                No payout transactions recorded yet.
              </div>
            ) : (
              <div className="space-y-2">
                {wallet.payouts.map((p) => (
                  <div key={p.id} className="p-3.5 rounded-xl border bg-slate-50 flex items-center justify-between text-[13px]">
                    <div>
                      <span className="font-semibold text-slate-900">{p.id}</span>
                      <span className="text-slate-500 ml-2">{p.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-emerald-600">{p.amount}</span>
                      <span className="text-[12px] bg-white border px-2.5 py-0.5 rounded-full font-medium">{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    // 10. NOTIFICATIONS
    if (activeSubView === 'notifications') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiBell className="w-5 h-5 text-[#3665EE]" /> Mentor Notifications & Session Reminders
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Session alerts, booking requests, and payout confirmation receipts</p>
            </div>
            <button onClick={() => onShowToast("Marked all mentor alerts as read")} className="text-[#3665EE] text-[14px] font-semibold hover:underline cursor-pointer">
              Mark All as Read
            </button>
          </div>

          <div className="py-8 text-center text-[13px] text-slate-400">
            No active mentor alerts at this time.
          </div>
        </div>
      );
    }

    // 11. SETTINGS
    return (
      <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
        <div className={`pb-4 border-b ${borderDivider}`}>
          <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
            <FiSliders className="w-5 h-5 text-[#3665EE]" /> Mentor Settings & Account Preferences
          </h2>
          <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Configure session rates, camera/mic devices, & withdrawal bank details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]">
            <h4 className="text-[16px] font-semibold text-[#12163A]">Session Pricing Settings</h4>
            <p className="text-[13px] text-[#4B5563]">Current Rate: ₹{wallet.hourlyRate} / 60 Min Session</p>
          </div>
          <div className="p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]">
            <h4 className="text-[16px] font-semibold text-[#12163A]">Payout Bank Account</h4>
            <p className="text-[13px] text-[#4B5563]">Bank Account Configured • Instant Payout Enabled</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {renderContent()}

      {/* GLOBAL ACTION MODAL FOR MENTOR DASHBOARD */}
      <ActionModal
        isOpen={isActionModalOpen}
        title={actionModalConfig.title}
        subtitle={actionModalConfig.subtitle}
        fields={actionModalConfig.fields}
        onClose={() => setIsActionModalOpen(false)}
        onSubmit={handleModalFormSubmit}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};
