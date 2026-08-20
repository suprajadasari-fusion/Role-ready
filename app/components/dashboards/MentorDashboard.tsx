import React, { useState } from 'react';
import { 
  FaUserCheck, 
  FaBrain, 
  FaCalendarDays, 
  FaUsers, 
  FaVideo, 
  FaCompass, 
  FaStar, 
  FaWallet, 
  FaBullhorn, 
  FaSliders, 
  FaPlus, 
  FaMagnifyingGlass, 
  FaDownload, 
  FaCheck, 
  FaClock, 
  FaIndianRupeeSign, 
  FaAward, 
  FaLaptopCode,
  FaFileLines
} from 'react-icons/fa6';
import { ActionModal } from '../ActionModal';
import { LiveCallModal } from '../LiveCallModal';

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

  // Live Video Call Modal State
  const [isLiveCallOpen, setIsLiveCallOpen] = useState(false);
  const [liveCallParticipant, setLiveCallParticipant] = useState({ name: "Aarav Sharma", role: "Grade 12-A • AI Track" });

  // Mentor Data State
  const [walletBalance, setWalletBalance] = useState(48500);
  const [hourlyRate, setHourlyRate] = useState(1500);
  const [mentorTitle, setMentorTitle] = useState("Senior Career Counselor & AI Specialist");
  const [mentorBio, setMentorBio] = useState("AI Architecture, Neural Systems & Career Strategy Specialist with 12+ years mentoring top STEM candidates.");

  const [guidanceList, setGuidanceList] = useState([
    { name: "Aarav Sharma", code: "RIE (Realistic, Investigative, Enterprising)", score: "Career Score 92/100", recommendation: "AI & ML Systems Engineering Track" },
    { name: "Ananya Roy", code: "ISA (Investigative, Social, Artistic)", score: "Career Score 88/100", recommendation: "Biotech & Bio-Informatics Track" }
  ]);

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
    } else if (actionModalConfig.title === "Edit Profile & Rates") {
      if (data.rate) setHourlyRate(parseInt(data.rate) || hourlyRate);
      if (data.bio) setMentorBio(data.bio);
      if (data.title) setMentorTitle(data.title);
      onShowToast(`Updated profile details & session rate (₹${data.rate || hourlyRate}/hr)!`);
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
    } else if (actionModalConfig.title === "Save Session Notes") {
      onShowToast(`Saved session notes for ${data.student || 'Mentee'}!`);
    } else if (actionModalConfig.title === "Issue Career Action Plan") {
      const studentName = data.student || "Student Mentee";
      const milestone = data.milestone || "AI & Tech Career Action Plan";
      const hollandCode = data.code || "RIE (Realistic, Investigative, Enterprising)";

      const newPlan = {
        name: studentName,
        code: hollandCode,
        score: "Career Score 95/100",
        recommendation: milestone
      };

      setGuidanceList([newPlan, ...guidanceList]);
      onShowToast(`Issued career action plan to ${newPlan.name}!`);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-[24px] bg-[#12163A] text-white shadow-md space-y-2 hover-card-lift">
              <span className="font-medium text-[13px] block text-slate-300">Assigned Mentees</span>
              <div className="text-2xl lg:text-3xl font-bold tracking-tight text-white">42 Students</div>
              <span className="text-xs font-medium text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full inline-block">12 Active Mentorships</span>
            </div>

            <div className="p-5 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift">
              <span className="font-medium text-[13px] block text-[#4B5563]">Completed Sessions</span>
              <div className="text-2xl lg:text-3xl font-bold tracking-tight text-[#12163A]">184 Hours</div>
              <span className="text-xs font-medium text-[#3665EE]">99.4% Student Rating</span>
            </div>

            <div className="p-5 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift">
              <span className="font-medium text-[13px] block text-[#4B5563]">Upcoming Bookings</span>
              <div className="text-2xl lg:text-3xl font-bold tracking-tight text-[#3665EE]">6 Sessions</div>
              <span className="text-xs font-medium text-[#12163A]">2 Pending Requests</span>
            </div>

            <div className="p-5 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift">
              <span className="font-medium text-[13px] block text-[#4B5563]">Current Session Rate</span>
              <div className="text-2xl lg:text-3xl font-bold tracking-tight text-[#12163A]">₹{hourlyRate}/hr</div>
              <span className="text-xs font-medium text-[#3665EE]">60 Min 1-on-1 Call</span>
            </div>

            <div className="p-5 rounded-[24px] bg-emerald-50 text-emerald-950 shadow-sm border border-emerald-200 space-y-2 hover-card-lift">
              <span className="font-medium text-[13px] block text-emerald-700">Wallet Balance</span>
              <div className="text-2xl lg:text-3xl font-bold tracking-tight text-emerald-900">₹{walletBalance.toLocaleString()}</div>
              <span className="text-xs font-medium text-emerald-600">Available for Payout</span>
            </div>
          </div>

          {/* Mentor Profile Banner */}
          <div className="p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-base text-[#12163A]">Dr. Rajesh Sharma</h3>
                <p className="text-sm font-normal text-[#6B7280]">Ph.D. Computer Science (IIT Bombay) • Ex-Google Senior Tech Lead • Session Rate: ₹{hourlyRate}/hr</p>
              </div>
              <span className="bg-[#E4F4EC] text-[#12163A] font-medium text-xs px-3.5 py-1 rounded-full border border-[#C3E6D5]">
                ✓ Verified Master Mentor
              </span>
            </div>
          </div>
        </div>
      );
    }

    // 2. PROFILE & VERIFICATION
    if (activeSubView === 'profile') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaUserCheck className="w-5 h-5 text-[#3665EE]" /> Mentor Profile & Verification Credentials
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">Verified mentor badge, academic degrees, and professional biography</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Edit Profile & Rates", "Update mentor bio and session pricing", [
                { label: "Hourly Session Rate (₹)", name: "rate", type: "number", placeholder: hourlyRate.toString() },
                { label: "Specialization / Title", name: "title", type: "text", placeholder: mentorTitle },
                { label: "Bio / Specialization", name: "bio", type: "text", placeholder: mentorBio }
              ])}
              className="bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              Edit Profile & Rates
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-3 text-[#12163A]">
              <span className="text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium">Session Rate & Title</span>
              <h4 className="font-semibold text-base text-[#12163A]">{mentorTitle}</h4>
              <p className="text-sm font-semibold text-[#3665EE]">₹{hourlyRate} / 60 Min Session</p>
            </div>

            <div className="p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-3 text-[#12163A]">
              <span className="text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium">Biography & Specialization</span>
              <h4 className="font-semibold text-base text-[#12163A]">Ph.D. CS & AI (IIT Bombay)</h4>
              <p className="text-sm font-normal text-[#4B5563]">{mentorBio}</p>
            </div>

            <div className="p-5 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] space-y-3 text-[#12163A]">
              <span className="text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium">Verification Status</span>
              <h4 className="font-semibold text-base text-[#12163A]">✓ Verified Master Mentor</h4>
              <p className="text-sm font-normal text-[#4B5563]">Background Checked • Identity Verified • Approved for 1-on-1 High School & University Counseling</p>
            </div>
          </div>
        </div>
      );
    }

    // 3. SKILLS & EXPERTISE
    if (activeSubView === 'skills') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaBrain className="w-5 h-5 text-[#3665EE]" /> Mentorship Skill Matrix & Technical Domains
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">Expertise domains for AI-driven student matching</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Add Mentorship Skill", "Add a new domain expertise for student counseling", [
                { label: "Skill / Domain Title", name: "name", type: "text", placeholder: "Cybersecurity Architecture" },
                { label: "Expertise Level", name: "level", type: "text", placeholder: "Expert" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FaPlus className="w-3.5 h-3.5" /> Add Mentorship Skill
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillsList.map((s, i) => (
              <div key={i} className="p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift">
                <div>
                  <h4 className="font-semibold text-base text-[#12163A]">{s.name}</h4>
                  <span className="text-[#3665EE] font-medium text-xs">{s.mentees}</span>
                </div>
                <span className="text-xs bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-medium shadow-2xs">
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
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaCalendarDays className="w-5 h-5 text-[#3665EE]" /> Slot Booking & Availability Calendar
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">Configure 1-on-1 counseling time slots and manage student bookings</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Add Available Slot", "Create a new time slot for student bookings", [
                { label: "Target Day", name: "day", type: "text", placeholder: "Tomorrow" },
                { label: "Time Slot", name: "time", type: "text", placeholder: "2:00 PM - 3:00 PM" },
                { label: "Counseling Topic", name: "topic", type: "text", placeholder: "1-on-1 Career Strategy" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FaPlus className="w-3.5 h-3.5" /> Add Available Slot
            </button>
          </div>

          <div className="space-y-3">
            {slotsList.map((sl) => (
              <div key={sl.id} className={`p-4 rounded-[20px] border flex items-center justify-between ${sl.bg} ${sl.border} text-[#12163A] hover-card-lift`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-xs text-[#3665EE]">{sl.day} • {sl.time}</span>
                    <span className="text-xs bg-white border border-slate-200 text-[#12163A] px-2 py-0.5 rounded-md font-medium">{sl.status}</span>
                  </div>
                  <h4 className="font-semibold text-base text-[#12163A] mt-1">{sl.topic}</h4>
                  <div className="text-xs text-[#4B5563] font-normal">Student: {sl.mentee}</div>
                </div>
                <button 
                  onClick={() => onShowToast(`Managed slot for ${sl.time}`)}
                  className="bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-sm px-3.5 py-1.5 rounded-xl cursor-pointer"
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
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaUsers className="w-5 h-5 text-[#3665EE]" /> Student Counseling Booking Requests
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">Review pending mentorship booking requests and neural alignment scores</p>
            </div>
          </div>

          <div className="space-y-3">
            {requestsList.map((req) => (
              <div key={req.id} className="p-5 rounded-[24px] border bg-[#F6E6D8] border-[#EAD0BC] flex items-center justify-between text-[#12163A] hover-card-lift">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium">{req.match}</span>
                    <span className="text-[#3665EE] font-medium text-xs">{req.slot}</span>
                  </div>
                  <h4 className="font-semibold text-base text-[#12163A] mt-1">{req.name} • Goal: {req.goal}</h4>
                  <p className="text-xs text-[#4B5563] font-normal">Topic: {req.topic}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setRequestsList(requestsList.filter(r => r.id !== req.id));
                      onShowToast(`Accepted counseling request from ${req.name}!`);
                    }}
                    className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-3.5 py-1.5 rounded-xl cursor-pointer"
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
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaVideo className="w-5 h-5 text-[#3665EE]" /> Live 1-on-1 Video Counseling Room
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">HD encrypted video room with live screen share & action plan notes</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Save Session Notes", "Record counseling takeaways and student action items", [
                { label: "Action Items for Student", name: "notes", type: "text", placeholder: "Complete PyTorch tutorial and ATS Resume update" }
              ])}
              className="bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md"
            >
              <FaFileLines className="w-3.5 h-3.5" /> Save Session Notes
            </button>
          </div>

          <div className="p-8 rounded-[24px] bg-[#12163A] text-white text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#3665EE] flex items-center justify-center mx-auto shadow-lg">
              <FaVideo className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Encrypted Video Counseling Room</h3>
            <p className="text-sm text-slate-300 font-normal max-w-md mx-auto">
              Ready to launch 1-on-1 video call with Aarav Sharma (Grade 12-A). Camera and mic ready.
            </p>
            <button 
              onClick={() => {
                setLiveCallParticipant({ name: "Aarav Sharma", role: "Grade 12-A • AI Track" });
                setIsLiveCallOpen(true);
                onShowToast("Camera & Microphone connected! Launching HD video call.");
              }}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-6 py-2.5 rounded-xl cursor-pointer shadow-md transition hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
            >
              <FaVideo className="w-4 h-4" />
              <span>Launch Live Call Now</span>
            </button>
          </div>
        </div>
      );
    }

    // 7. ASSESSMENTS & GUIDANCE
    if (activeSubView === 'guidance') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaCompass className="w-5 h-5 text-[#3665EE]" /> Student Assessment Review & Career Guidance
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">Review Holland Code DNA passports & issue customized career roadmaps</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Issue Career Action Plan", "Send structured action items to student portal", [
                { label: "Target Student Name", name: "student", type: "text", placeholder: "Aarav Sharma" },
                { label: "Recommended Milestone / Strategy", name: "milestone", type: "text", placeholder: "Complete PyTorch Certification & System Design" },
                { label: "Holland Code / Track", name: "code", type: "text", placeholder: "RIE (Realistic, Investigative, Enterprising)" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FaPlus className="w-3.5 h-3.5" /> Issue Career Action Plan
            </button>
          </div>

          <div className="space-y-3">
            {guidanceList.map((gd, i) => (
              <div key={i} className="p-5 rounded-[24px] border bg-[#E4F4EC] border-[#C3E6D5] text-[#12163A] space-y-2 hover-card-lift">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-base text-[#12163A]">{gd.name}</h4>
                  <span className="text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium">{gd.score}</span>
                </div>
                <p className="text-xs text-[#3665EE] font-medium">{gd.code}</p>
                <p className="text-xs text-[#4B5563] font-normal">Custom Strategy: {gd.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 8. RATINGS & REVIEWS
    if (activeSubView === 'ratings') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
              <FaStar className="w-5 h-5 text-amber-500" /> Student Ratings & Counselor Reviews
            </h2>
            <p className="text-sm font-normal text-[#6B7280]">Verified student feedback and rating breakdowns (4.9 / 5.0 Average Score)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]">
              <div className="text-3xl lg:text-4xl font-bold text-[#3665EE]">4.9 / 5.0</div>
              <p className="text-sm font-semibold text-[#12163A] mt-1">Average Star Rating</p>
              <span className="text-xs text-[#4B5563] font-normal">142 Total Reviews</span>
            </div>
            <div className="p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]">
              <div className="text-3xl lg:text-4xl font-bold text-[#12163A]">98.4%</div>
              <p className="text-sm font-semibold text-[#12163A] mt-1">Student Satisfaction</p>
              <span className="text-xs text-[#4B5563] font-normal">Top 1% Mentor Badge</span>
            </div>
            <div className="p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]">
              <div className="text-3xl lg:text-4xl font-bold text-[#12163A]">184 Hrs</div>
              <p className="text-sm font-semibold text-[#12163A] mt-1">Counseling Experience</p>
              <span className="text-xs text-[#3665EE] font-medium">Certified Master</span>
            </div>
          </div>
        </div>
      );
    }

    // 9. WALLET & PAYOUTS
    if (activeSubView === 'wallet') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaWallet className="w-5 h-5 text-[#3665EE]" /> Mentor Wallet & Bank Payout Desk
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">Track session earnings, wallet balance, & request direct bank transfers</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Request Payout Withdrawal", "Transfer earnings from wallet to verified bank account", [
                { label: "Withdrawal Amount (₹)", name: "amount", type: "number", placeholder: "10000" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FaIndianRupeeSign className="w-3.5 h-3.5" /> Request Payout Withdrawal
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-[24px] bg-[#12163A] text-white space-y-2">
              <span className="text-slate-300 font-medium text-[13px]">Available Wallet Balance</span>
              <div className="text-2xl lg:text-3xl font-bold text-white">₹{walletBalance.toLocaleString()}</div>
              <span className="text-xs text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full font-medium inline-block">Ready for Withdrawal</span>
            </div>
            <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-2">
              <span className="text-[#4B5563] font-medium text-[13px]">Pending Escrow Balance</span>
              <div className="text-2xl lg:text-3xl font-bold text-[#3665EE]">₹12,000</div>
              <span className="text-xs text-[#4B5563] font-normal">Releases after session completion</span>
            </div>
            <div className="p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A] space-y-2">
              <span className="text-[#4B5563] font-medium text-[13px]">Total Lifetime Earnings</span>
              <div className="text-2xl lg:text-3xl font-bold text-[#12163A]">₹2,45,000</div>
              <span className="text-xs text-[#3665EE] font-medium">HDFC Direct Transfer</span>
            </div>
          </div>
        </div>
      );
    }

    // 10. NOTIFICATIONS
    if (activeSubView === 'notifications') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaBullhorn className="w-5 h-5 text-[#3665EE]" /> Mentor Notifications & Session Reminders
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">Session alerts, booking requests, and payout confirmation receipts</p>
            </div>
            <button onClick={() => onShowToast("Marked all mentor alerts as read")} className="text-[#3665EE] font-medium text-sm hover:underline cursor-pointer">
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
                  <h4 className="font-semibold text-base text-[#12163A]">{nt.title}</h4>
                  <span className="text-[#3665EE] font-medium text-xs">{nt.type} • {nt.time}</span>
                </div>
                <span className="text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium">New</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 11. SETTINGS
    return (
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
            <FaSliders className="w-5 h-5 text-[#3665EE]" /> Mentor Settings & Account Preferences
          </h2>
          <p className="text-sm font-normal text-[#6B7280]">Configure session rates, camera/mic devices, & withdrawal bank details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]">
            <h4 className="font-semibold text-base text-[#12163A]">Session Pricing Settings</h4>
            <p className="text-sm font-normal text-[#4B5563]">Current Rate: ₹{hourlyRate} / 60 Min Session • Auto-Accept Eligible Requests</p>
          </div>
          <div className="p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]">
            <h4 className="font-semibold text-base text-[#12163A]">Payout Bank Account Details</h4>
            <p className="text-sm font-normal text-[#4B5563]">HDFC Bank • A/C No: •••• 4092 • IFSC: HDFC0001290 • Instant Payout Enabled</p>
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

      {/* LIVE INTERACTIVE VIDEO CALL MODAL */}
      <LiveCallModal
        isOpen={isLiveCallOpen}
        participantName={liveCallParticipant.name}
        participantRole={liveCallParticipant.role}
        onClose={() => setIsLiveCallOpen(false)}
        onShowToast={onShowToast}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};
