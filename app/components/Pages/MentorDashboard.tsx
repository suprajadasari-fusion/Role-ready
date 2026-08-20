import React, { useState } from 'react';
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
  // Modal State
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState<{ title: string; subtitle: string; fields: any[] }>({
    title: '',
    subtitle: '',
    fields: []
  });

  // Mentor Data State
  const [walletBalance, setWalletBalance] = useState(48500);
  const [hourlyRate, setHourlyRate] = useState(1500);

  const [skillsList, setSkillsList] = useState([
    { name: "AI & MLOps Architecture", level: "Expert", mentees: "18 Students Mentored" },
    { name: "Full-Stack System Design", level: "Expert", mentees: "24 Students Mentored" },
    { name: "Quant Finance & Stochastics", level: "Advanced", mentees: "12 Students Mentored" },
    { name: "ATS Resume & Tech Interview Prep", level: "Master Counselor", mentees: "42 Students Mentored" }
  ]);

  const [slotsList, setSlotsList] = useState([
    { id: 1, day: "Today", time: "2:00 PM - 3:00 PM", mentee: "Aarav Sharma", topic: "AI Engineer Roadmap Review", status: "Confirmed Session", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
    { id: 2, day: "Today", time: "4:00 PM - 5:00 PM", mentee: "Ananya Roy", topic: "Biotech & Genomics Research", status: "Confirmed Session", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
    { id: 3, day: "Tomorrow", time: "11:00 AM - 12:00 PM", mentee: "Open Slot", topic: "1-on-1 Career Strategy", status: "Available", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
    { id: 4, day: "Tomorrow", time: "3:00 PM - 4:00 PM", mentee: "Open Slot", topic: "Resume & Portfolio Feedback", status: "Available", bg: "bg-white", border: "border-slate-200" }
  ]);

  const [requestsList, setRequestsList] = useState([
    { id: "REQ-401", name: "Karan Patel", goal: "Quant Analyst at Goldman Sachs", slot: "Tomorrow, 5:00 PM", topic: "Stochastic Calculus & Mock Interview", match: "98% Neural Alignment", status: "Pending Approval" },
    { id: "REQ-402", name: "Riya Sen", goal: "Robotics Engineer at Boston Dynamics", slot: "Friday, 10:00 AM", topic: "ROS2 & Embedded C++ Career Guidance", match: "95% Neural Alignment", status: "Pending Approval" }
  ]);

  const [payoutsList, setPayoutsList] = useState([
    { id: "TXN-8801", date: "01 Aug 2026", amount: "₹18,000", status: "Processed & Paid", account: "HDFC Bank (•••• 4092)" },
    { id: "TXN-8802", date: "15 Jul 2026", amount: "₹24,500", status: "Processed & Paid", account: "HDFC Bank (•••• 4092)" }
  ]);

  const openTriggerModal = (title: string, subtitle: string, fields: any[]) => {
    setActionModalConfig({ title, subtitle, fields });
    setIsActionModalOpen(true);
  };

  const handleModalFormSubmit = (data: Record<string, string>) => {
    if (actionModalConfig.title === "Add Available Slot") {
      const newSlot = {
        id: Date.now(),
        day: data.day || "Tomorrow",
        time: data.time || "2:00 PM - 3:00 PM",
        mentee: "Open Slot",
        topic: data.topic || "1-on-1 Career Counseling",
        status: "Available",
        bg: "bg-[#DEE9FF]",
        border: "border-[#C6D9FF]"
      };
      setSlotsList([newSlot, ...slotsList]);
      onShowToast(`Added new availability slot for ${newSlot.day} (${newSlot.time})!`);
    } else if (actionModalConfig.title === "Add Mentorship Skill") {
      const newSkill = {
        name: data.name || "Technical Domain",
        level: data.level || "Expert",
        mentees: "1 Student Mentored"
      };
      setSkillsList([newSkill, ...skillsList]);
      onShowToast(`Added mentorship expertise domain: ${newSkill.name}!`);
    } else if (actionModalConfig.title === "Request Payout Withdrawal") {
      const withdrawAmt = parseInt(data.amount) || 10000;
      if (withdrawAmt > walletBalance) {
        onShowToast("Insufficient wallet balance for withdrawal!");
      } else {
        setWalletBalance(prev => prev - withdrawAmt);
        const newPayout = {
          id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
          date: "Today",
          amount: `₹${withdrawAmt.toLocaleString()}`,
          status: "Processing Payout",
          account: "HDFC Bank (•••• 4092)"
        };
        setPayoutsList([newPayout, ...payoutsList]);
        onShowToast(`Requested withdrawal of ₹${withdrawAmt.toLocaleString()} to HDFC Bank!`);
      }
    } else {
      onShowToast(`Action completed: ${actionModalConfig.title}`);
    }
    setIsActionModalOpen(false);
  };

  const renderContent = () => {
    // 1. DASHBOARD OVERVIEW
    if (activeSubView === 'overview') {
      return (
        <div className="space-y-6 font-sans">
          {/* Overview KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            <div className="p-5 rounded-[24px] bg-[#12163A] text-white shadow-md space-y-2 hover-card-lift">
              <span className="font-semibold block text-slate-300">Assigned Mentees</span>
              <div className="text-3xl font-extrabold text-white">42 Students</div>
              <span className="text-[10px] font-bold text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full inline-block">Active Counseling</span>
            </div>

            <div className="p-5 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift">
              <span className="font-semibold block text-[#4B5563]">Completed Sessions</span>
              <div className="text-3xl font-extrabold text-[#3665EE]">184 Hours</div>
              <span className="text-[10px] font-bold text-[#12163A]">98% Rating</span>
            </div>

            <div className="p-5 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift">
              <span className="font-semibold block text-[#4B5563]">Upcoming Today</span>
              <div className="text-3xl font-extrabold text-[#12163A]">6 Sessions</div>
              <span className="text-[10px] font-bold text-[#3665EE]">Next at 2:00 PM</span>
            </div>

            <div className="p-5 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift">
              <span className="font-semibold block text-[#4B5563]">Counselor Rating</span>
              <div className="text-3xl font-extrabold text-[#12163A]">4.9 / 5.0</div>
              <span className="text-[10px] font-bold text-[#12163A]">Master Counselor</span>
            </div>

            <div className="p-5 rounded-[24px] bg-white text-[#12163A] shadow-sm border border-slate-200 space-y-2 hover-card-lift">
              <span className="font-semibold block text-[#6B7280]">Wallet Balance</span>
              <div className="text-2xl font-extrabold text-[#3665EE]">₹{walletBalance.toLocaleString()}</div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">Available</span>
            </div>
          </div>

          {/* Verification & Profile Summary */}
          <div className="p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#12163A]">Dr. Rajesh Verma • Senior AI & Career Counselor</h3>
                <p className="text-xs text-[#6B7280]">Ph.D. Computer Science (IIT Bombay) • Ex-Google Senior Tech Lead • Session Rate: ₹{hourlyRate}/hr</p>
              </div>
              <span className="bg-[#E4F4EC] text-[#12163A] font-bold text-xs px-3.5 py-1 rounded-full border border-[#C3E6D5]">
                ✓ Verified Master Counselor
              </span>
            </div>

            <div className="p-4 rounded-[20px] bg-[#DEE9FF] border border-[#C6D9FF] flex items-center justify-between text-[#12163A]">
              <div className="flex items-center gap-3">
                <FiClock className="w-5 h-5 text-[#3665EE]" />
                <div>
                  <h4 className="font-bold text-sm text-[#12163A]">Next Video Counseling Session</h4>
                  <p className="text-xs text-[#4B5563]">Aarav Sharma (Grade 12-A) • AI & Machine Learning Pathway Strategy</p>
                </div>
              </div>
              <button 
                onClick={() => onShowToast("Joining live video counseling session...")}
                className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md"
              >
                <FiVideo className="w-3.5 h-3.5" /> Start Video Session
              </button>
            </div>
          </div>
        </div>
      );
    }

    // 2. PROFILE & VERIFICATION
    if (activeSubView === 'profile') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiUserCheck className="w-5 h-5 text-[#3665EE]" /> Mentor Profile & Verification Credentials
              </h2>
              <p className="text-[#6B7280]">Verified mentor badge, academic degrees, and professional biography</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Edit Profile & Rates", "Update mentor bio and session pricing", [
                { label: "Hourly Session Rate (₹)", name: "rate", type: "number", placeholder: "1500" },
                { label: "Bio / Specialization", name: "bio", type: "text", placeholder: "AI Architecture & Career Strategy" }
              ])}
              className="bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md"
            >
              Edit Profile & Rates
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-3 text-[#12163A]">
              <span className="text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold">Academic Background</span>
              <h4 className="font-bold text-sm text-[#12163A]">Ph.D. Computer Science & Artificial Intelligence</h4>
              <p className="text-xs text-[#4B5563]">Indian Institute of Technology (IIT Bombay) • Specialization in Deep Learning & Neural Architectures</p>
            </div>

            <div className="p-5 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] space-y-3 text-[#12163A]">
              <span className="text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold">Verification Status</span>
              <h4 className="font-bold text-sm text-[#12163A]">✓ Verified Master Mentor Badge</h4>
              <p className="text-xs text-[#4B5563]">Background Checked • Identity Verified • Approved for 1-on-1 High School & University Counseling</p>
            </div>
          </div>
        </div>
      );
    }

    // 3. SKILLS & EXPERTISE
    if (activeSubView === 'skills') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiCpu className="w-5 h-5 text-[#3665EE]" /> Mentorship Skill Matrix & Technical Domains
              </h2>
              <p className="text-[#6B7280]">Expertise domains for AI-driven student matching</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Add Mentorship Skill", "Add a new domain expertise for student counseling", [
                { label: "Skill / Domain Title", name: "name", type: "text", placeholder: "Cybersecurity Architecture" },
                { label: "Expertise Level", name: "level", type: "text", placeholder: "Expert" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-3.5 h-3.5" /> Add Mentorship Skill
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillsList.map((s, i) => (
              <div key={i} className="p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift">
                <div>
                  <h4 className="font-bold text-sm text-[#12163A]">{s.name}</h4>
                  <span className="text-[#3665EE] font-semibold">{s.mentees}</span>
                </div>
                <span className="text-[10px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-bold shadow-2xs">
                  {s.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 4. AVAILABILITY & CALENDAR
    if (activeSubView === 'availability' || activeSubView === 'calendar') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiCalendar className="w-5 h-5 text-[#3665EE]" /> Slot Booking & Availability Calendar
              </h2>
              <p className="text-[#6B7280]">Configure 1-on-1 counseling time slots and manage student bookings</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Add Available Slot", "Create a new time slot for student bookings", [
                { label: "Target Day", name: "day", type: "text", placeholder: "Tomorrow" },
                { label: "Time Slot", name: "time", type: "text", placeholder: "2:00 PM - 3:00 PM" },
                { label: "Counseling Topic", name: "topic", type: "text", placeholder: "1-on-1 Career Strategy" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-3.5 h-3.5" /> Add Available Slot
            </button>
          </div>

          <div className="space-y-3">
            {slotsList.map((sl) => (
              <div key={sl.id} className={`p-4 rounded-[20px] border flex items-center justify-between ${sl.bg} ${sl.border} text-[#12163A] hover-card-lift`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#3665EE]">{sl.day} • {sl.time}</span>
                    <span className="text-[10px] bg-white border border-slate-200 text-[#12163A] px-2 py-0.5 rounded-md font-bold">{sl.status}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#12163A] mt-1">{sl.topic}</h4>
                  <div className="text-[11px] text-[#4B5563]">Student: {sl.mentee}</div>
                </div>
                <button 
                  onClick={() => onShowToast(`Managed slot for ${sl.time}`)}
                  className="bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-3.5 py-1.5 rounded-xl cursor-pointer"
                >
                  Manage Slot
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 5. STUDENT REQUESTS
    if (activeSubView === 'student-requests' || activeSubView === 'mentees') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiUsers className="w-5 h-5 text-[#3665EE]" /> Student Counseling Booking Requests
              </h2>
              <p className="text-[#6B7280]">Review pending mentorship booking requests and neural alignment scores</p>
            </div>
          </div>

          <div className="space-y-3">
            {requestsList.map((req) => (
              <div key={req.id} className="p-5 rounded-[24px] border bg-[#F6E6D8] border-[#EAD0BC] flex items-center justify-between text-[#12163A] hover-card-lift">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold">{req.match}</span>
                    <span className="text-[#3665EE] font-bold">{req.slot}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#12163A] mt-1">{req.name} • Goal: {req.goal}</h4>
                  <p className="text-xs text-[#4B5563]">Topic: {req.topic}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setRequestsList(requestsList.filter(r => r.id !== req.id));
                      onShowToast(`Accepted counseling request from ${req.name}!`);
                    }}
                    className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-3.5 py-1.5 rounded-xl cursor-pointer"
                  >
                    Accept Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 6. VIDEO SESSIONS
    if (activeSubView === 'video-sessions' || activeSubView === 'counseling') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiVideo className="w-5 h-5 text-[#3665EE]" /> Live 1-on-1 Video Counseling Room
              </h2>
              <p className="text-[#6B7280]">HD encrypted video room with live screen share & action plan notes</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Save Session Notes", "Record counseling takeaways and student action items", [
                { label: "Action Items for Student", name: "notes", type: "text", placeholder: "Complete PyTorch tutorial and ATS Resume update" }
              ])}
              className="bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md"
            >
              <FiFileText className="w-3.5 h-3.5" /> Save Session Notes
            </button>
          </div>

          <div className="p-8 rounded-[24px] bg-[#12163A] text-white text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#3665EE] flex items-center justify-center mx-auto shadow-lg">
              <FiVideo className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold">Encrypted Video Counseling Room</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Ready to launch 1-on-1 video call with Aarav Sharma (Grade 12-A). Camera and mic ready.
            </p>
            <button 
              onClick={() => onShowToast("Camera & Microphone connected! Launching HD video stream.")}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-6 py-2.5 rounded-xl cursor-pointer shadow-md transition hover:scale-105"
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
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiCompass className="w-5 h-5 text-[#3665EE]" /> Student Assessment Review & Career Guidance
              </h2>
              <p className="text-[#6B7280]">Review Holland Code DNA passports & issue customized career roadmaps</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Issue Career Action Plan", "Send structured action items to student portal", [
                { label: "Target Student", name: "student", type: "text", placeholder: "Aarav Sharma" },
                { label: "Recommended Milestone", name: "milestone", type: "text", placeholder: "Complete PyTorch Certification" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-3.5 h-3.5" /> Issue Career Action Plan
            </button>
          </div>

          <div className="space-y-3">
            {[
              { name: "Aarav Sharma", code: "RIE (Realistic, Investigative, Enterprising)", score: "Career Score 92/100", recommendation: "AI & ML Systems Engineering Track" },
              { name: "Ananya Roy", code: "ISA (Investigative, Social, Artistic)", score: "Career Score 88/100", recommendation: "Biotech & Bio-Informatics Track" }
            ].map((gd, i) => (
              <div key={i} className="p-5 rounded-[24px] border bg-[#E4F4EC] border-[#C3E6D5] text-[#12163A] space-y-2 hover-card-lift">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#12163A]">{gd.name}</h4>
                  <span className="text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold">{gd.score}</span>
                </div>
                <p className="text-xs text-[#3665EE] font-semibold">{gd.code}</p>
                <p className="text-xs text-[#4B5563]">Custom Strategy: {gd.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 8. RATINGS & REVIEWS
    if (activeSubView === 'ratings') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
              <FiStar className="w-5 h-5 text-amber-500" /> Student Ratings & Counselor Reviews
            </h2>
            <p className="text-[#6B7280]">Verified student feedback and rating breakdowns (4.9 / 5.0 Average Score)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]">
              <div className="text-4xl font-extrabold text-[#3665EE]">4.9 / 5.0</div>
              <p className="text-xs font-bold text-[#12163A] mt-1">Average Star Rating</p>
              <span className="text-[10px] text-[#4B5563]">142 Total Reviews</span>
            </div>
            <div className="p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]">
              <div className="text-4xl font-extrabold text-[#12163A]">98.4%</div>
              <p className="text-xs font-bold text-[#12163A] mt-1">Student Satisfaction</p>
              <span className="text-[10px] text-[#4B5563]">Top 1% Mentor Badge</span>
            </div>
            <div className="p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]">
              <div className="text-4xl font-extrabold text-[#12163A]">184 Hrs</div>
              <p className="text-xs font-bold text-[#12163A] mt-1">Counseling Experience</p>
              <span className="text-[10px] text-[#3665EE]">Certified Master</span>
            </div>
          </div>
        </div>
      );
    }

    // 9. WALLET & PAYOUTS
    if (activeSubView === 'wallet') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiCreditCard className="w-5 h-5 text-[#3665EE]" /> Mentor Wallet & Bank Payout Desk
              </h2>
              <p className="text-[#6B7280]">Track session earnings, wallet balance, & request direct bank transfers</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Request Payout Withdrawal", "Transfer earnings from wallet to verified bank account", [
                { label: "Withdrawal Amount (₹)", name: "amount", type: "number", placeholder: "10000" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiDollarSign className="w-3.5 h-3.5" /> Request Payout Withdrawal
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-[24px] bg-[#12163A] text-white space-y-2">
              <span className="text-slate-300 font-semibold">Available Wallet Balance</span>
              <div className="text-3xl font-extrabold text-white">₹{walletBalance.toLocaleString()}</div>
              <span className="text-[10px] text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full inline-block">Ready for Withdrawal</span>
            </div>
            <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-2">
              <span className="text-[#4B5563] font-semibold">Pending Escrow Balance</span>
              <div className="text-3xl font-extrabold text-[#3665EE]">₹12,000</div>
              <span className="text-[10px] text-[#4B5563]">Releases after session completion</span>
            </div>
            <div className="p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A] space-y-2">
              <span className="text-[#4B5563] font-semibold">Total Lifetime Earnings</span>
              <div className="text-3xl font-extrabold text-[#12163A]">₹2,45,000</div>
              <span className="text-[10px] text-[#3665EE]">HDFC Direct Transfer</span>
            </div>
          </div>
        </div>
      );
    }

    // 10. NOTIFICATIONS
    if (activeSubView === 'notifications') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiBell className="w-5 h-5 text-[#3665EE]" /> Mentor Notifications & Session Reminders
              </h2>
              <p className="text-[#6B7280]">Session alerts, booking requests, and payout confirmation receipts</p>
            </div>
            <button onClick={() => onShowToast("Marked all mentor alerts as read")} className="text-[#3665EE] font-bold hover:underline cursor-pointer">
              Mark All as Read
            </button>
          </div>

          <div className="space-y-3">
            {[
              { title: "Session Reminder: Video call with Aarav Sharma in 15 mins", time: "10 mins ago", type: "Calendar Alert", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
              { title: "New 1-on-1 Counseling Booking Request from Karan Patel", time: "1 hour ago", type: "Booking Request", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
              { title: "Bank Payout Transfer of ₹18,000 Processed to HDFC Bank", time: "1 day ago", type: "Payout Receipt", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
            ].map((nt, i) => (
              <div key={i} className={`p-4 rounded-[20px] border flex items-center justify-between ${nt.bg} ${nt.border} text-[#12163A]`}>
                <div>
                  <h4 className="font-bold text-[#12163A]">{nt.title}</h4>
                  <span className="text-[#3665EE] font-semibold">{nt.type} • {nt.time}</span>
                </div>
                <span className="text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold">New</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 11. SETTINGS
    return (
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
            <FiSliders className="w-5 h-5 text-[#3665EE]" /> Mentor Settings & Account Preferences
          </h2>
          <p className="text-[#6B7280]">Configure session rates, camera/mic devices, & withdrawal bank details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]">
            <h4 className="font-bold text-sm text-[#12163A]">Session Pricing Settings</h4>
            <p className="text-[#4B5563]">Current Rate: ₹{hourlyRate} / 60 Min Session • Auto-Accept Eligible Requests</p>
          </div>
          <div className="p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]">
            <h4 className="font-bold text-sm text-[#12163A]">Payout Bank Account Details</h4>
            <p className="text-[#4B5563]">HDFC Bank • A/C No: •••• 4092 • IFSC: HDFC0001290 • Instant Payout Enabled</p>
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
