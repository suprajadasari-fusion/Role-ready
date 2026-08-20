import React, { useState } from 'react';
import { 
  FiBriefcase, 
  FiGrid, 
  FiFileText, 
  FiBookOpen, 
  FiSearch, 
  FiCpu, 
  FiCalendar, 
  FiAward, 
  FiTrendingUp, 
  FiBell, 
  FiSliders, 
  FiPlus, 
  FiCheck, 
  FiDownload, 
  FiUserCheck, 
  FiDollarSign, 
  FiClock 
} from 'react-icons/fi';
import { ActionModal } from '../ActionModal';

interface RecruiterDashboardProps {
  activeSubView: string;
  onShowToast: (msg: string) => void;
  isDarkMode: boolean;
}

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({
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

  // Recruiter Data State
  const [jobsList, setJobsList] = useState([
    { id: "JOB-101", title: "Cloud Solutions Engineer", ctc: "₹28.0 LPA", location: "Bengaluru / Remote", applicants: 420, status: "Active Requisition" },
    { id: "JOB-102", title: "AI & MLOps Scientist", ctc: "₹35.0 LPA", location: "Hyderabad", applicants: 180, status: "Shortlisting Phase" },
    { id: "JOB-103", title: "Quant Financial Analyst", ctc: "₹24.0 LPA", location: "Mumbai", applicants: 310, status: "Interview Phase" },
    { id: "JOB-104", title: "Full-Stack Software Engineer", ctc: "₹18.0 LPA", location: "Gurugram", applicants: 330, status: "Active Requisition" }
  ]);

  const [campusList, setCampusList] = useState([
    { university: "IIT Bombay", driveDate: "12th August 2026", roles: "AI & Cloud Engineers", students: "480 Registered", status: "Confirmed Drive" },
    { university: "BITS Pilani", driveDate: "18th August 2026", roles: "Quant & Software Engineers", students: "360 Registered", status: "Confirmed Drive" },
    { university: "IISc Bangalore", driveDate: "25th August 2026", roles: "Research Scientists", students: "190 Registered", status: "Registration Open" }
  ]);

  const [interviewsList, setInterviewsList] = useState([
    { id: "INT-501", candidate: "Aarav Sharma", role: "AI & MLOps Scientist", round: "Technical System Design", time: "Today, 3:00 PM", panel: "Dr. Rajesh Verma", status: "Confirmed" },
    { id: "INT-502", candidate: "Ananya Roy", role: "Cloud Solutions Engineer", round: "Coding & Architecture", time: "Tomorrow, 11:30 AM", panel: "Senior Architect", status: "Confirmed" }
  ]);

  const [offersList, setOffersList] = useState([
    { id: "OFF-901", candidate: "Aarav Sharma", role: "AI & MLOps Scientist", ctc: "₹35.0 LPA", status: "Accepted & Signed" },
    { id: "OFF-902", candidate: "Riya Sen", role: "Full-Stack Software Engineer", ctc: "₹18.0 LPA", status: "Offer Sent (Pending)" }
  ]);

  const openTriggerModal = (title: string, subtitle: string, fields: any[]) => {
    setActionModalConfig({ title, subtitle, fields });
    setIsActionModalOpen(true);
  };

  const handleModalFormSubmit = (data: Record<string, string>) => {
    if (actionModalConfig.title === "Post New Job Requisition") {
      const newJob = {
        id: `JOB-${Math.floor(100 + Math.random() * 900)}`,
        title: data.title || "Software Engineer",
        ctc: data.ctc || "₹20.0 LPA",
        location: data.location || "Bengaluru",
        applicants: 1,
        status: "Active Requisition"
      };
      setJobsList([newJob, ...jobsList]);
      onShowToast(`Posted new job requisition for ${newJob.title}!`);
    } else if (actionModalConfig.title === "Register Campus Drive") {
      const newCampus = {
        university: data.university || "University Partner",
        driveDate: data.date || "Next Month",
        roles: data.roles || "Engineering Roles",
        students: "100 Registered",
        status: "Confirmed Drive"
      };
      setCampusList([newCampus, ...campusList]);
      onShowToast(`Registered campus placement drive at ${newCampus.university}!`);
    } else if (actionModalConfig.title === "Schedule Candidate Interview") {
      const newInt = {
        id: `INT-${Math.floor(100 + Math.random() * 900)}`,
        candidate: data.candidate || "Student Applicant",
        role: data.role || "Software Engineer",
        round: "Technical Interview 1",
        time: data.time || "Tomorrow, 2:00 PM",
        panel: "Tech Lead Panel",
        status: "Confirmed"
      };
      setInterviewsList([newInt, ...interviewsList]);
      onShowToast(`Scheduled interview with ${newInt.candidate}!`);
    } else if (actionModalConfig.title === "Issue Offer Letter") {
      const newOffer = {
        id: `OFF-${Math.floor(100 + Math.random() * 900)}`,
        candidate: data.candidate || "Selected Candidate",
        role: data.role || "Engineer",
        ctc: data.ctc || "₹22.0 LPA",
        status: "Offer Sent (Pending)"
      };
      setOffersList([newOffer, ...offersList]);
      onShowToast(`Issued offer letter to ${newOffer.candidate} for ${newOffer.ctc}!`);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-6 rounded-[24px] bg-[#12163A] text-white shadow-md border border-[#12163A] space-y-2 hover-card-lift">
              <span className="font-semibold block text-slate-300">Active Job Postings</span>
              <div className="text-3xl font-extrabold text-white">18 Roles</div>
              <span className="text-[11px] font-bold text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full inline-block">Across 6 Global Offices</span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift">
              <span className="font-semibold block text-[#4B5563]">Applications Received</span>
              <div className="text-3xl font-extrabold text-[#3665EE]">1,240</div>
              <span className="text-[11px] font-bold text-[#12163A]">AI Resume Screened</span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift">
              <span className="font-semibold block text-[#4B5563]">Avg ATS Score Fit</span>
              <div className="text-3xl font-extrabold text-[#12163A]">88%</div>
              <span className="text-[11px] font-bold text-[#3665EE]">High Skill Alignment</span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift">
              <span className="font-semibold block text-[#4B5563]">Offers Extended</span>
              <div className="text-3xl font-extrabold text-[#12163A]">42 Extended</div>
              <span className="text-[11px] font-bold text-[#12163A]">38 Offers Accepted</span>
            </div>
          </div>

          {/* Corporate Verification Banner */}
          <div className="p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#12163A]">Google Cloud India • Enterprise Corporate Hiring Desk</h3>
                <p className="text-xs text-[#6B7280]">CIN: U72200MH2020PTC123456 • Verified Campus Hiring Partner</p>
              </div>
              <span className="bg-[#E4F4EC] text-[#12163A] font-bold text-xs px-3.5 py-1 rounded-full border border-[#C3E6D5]">
                ✓ Verified Corporate Employer
              </span>
            </div>

            <div className="p-4 rounded-[20px] bg-[#DEE9FF] border border-[#C6D9FF] flex items-center justify-between text-[#12163A]">
              <div className="flex items-center gap-3">
                <FiCalendar className="w-5 h-5 text-[#3665EE]" />
                <div>
                  <h4 className="font-bold text-sm text-[#12163A]">Upcoming Campus Placement Drive</h4>
                  <p className="text-xs text-[#4B5563]">IIT Bombay • 12th August 2026 • 480 Registered Candidates</p>
                </div>
              </div>
              <button 
                onClick={() => onShowToast("Navigated to IIT Bombay Campus Hiring Control")}
                className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer shadow-md"
              >
                Manage Drive
              </button>
            </div>
          </div>
        </div>
      );
    }

    // 2. COMPANY & VERIFICATION
    if (activeSubView === 'verification') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiGrid className="w-5 h-5 text-[#3665EE]" /> Company Profile & Enterprise Verification
              </h2>
              <p className="text-[#6B7280]">Verified employer badge, corporate registration, & campus hiring agreements</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Edit Corporate Profile", "Update company description and logo", [
                { label: "Company Name", name: "name", type: "text", placeholder: "Google Cloud India" },
                { label: "Headquarters", name: "location", type: "text", placeholder: "Bengaluru, India" }
              ])}
              className="bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md"
            >
              Edit Corporate Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-3 text-[#12163A]">
              <span className="text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold">Corporate Identity</span>
              <h4 className="font-bold text-sm text-[#12163A]">Google Cloud India Pvt Ltd</h4>
              <p className="text-xs text-[#4B5563]">CIN: U72200MH2020PTC123456 • Tax ID Verified • NAAC Campus MoU Approved</p>
            </div>

            <div className="p-5 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] space-y-3 text-[#12163A]">
              <span className="text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold">Verification Status</span>
              <h4 className="font-bold text-sm text-[#12163A]">✓ Verified Corporate Employer</h4>
              <p className="text-xs text-[#4B5563]">Verified Employer • Direct Campus Placement Rights • AI Resume Access Enabled</p>
            </div>
          </div>
        </div>
      );
    }

    // 3. JOB POSTINGS
    if (activeSubView === 'jobs') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiFileText className="w-5 h-5 text-[#3665EE]" /> Job & Internship Requisitions Hub
              </h2>
              <p className="text-[#6B7280]">Manage active job descriptions, CTC packages, & applicant pipelines</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Post New Job Requisition", "Publish a new job opening to university students", [
                { label: "Job Role Title", name: "title", type: "text", placeholder: "Cloud Solutions Engineer" },
                { label: "Annual CTC Package", name: "ctc", type: "text", placeholder: "₹28.0 LPA" },
                { label: "Office Location", name: "location", type: "text", placeholder: "Bengaluru / Remote" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-3.5 h-3.5" /> Post New Job Requisition
            </button>
          </div>

          <div className="space-y-3">
            {jobsList.map((j) => (
              <div key={j.id} className="p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-[#12163A] text-white px-2 py-0.5 rounded-md font-bold">{j.id}</span>
                    <h4 className="font-bold text-sm text-[#12163A]">{j.title}</h4>
                  </div>
                  <p className="text-xs text-[#4B5563] mt-1">{j.location} • {j.applicants} Candidates Applied</p>
                </div>
                <div className="text-right">
                  <div className="text-[#3665EE] font-extrabold text-sm">{j.ctc}</div>
                  <span className="text-[10px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-0.5 rounded-full font-bold">{j.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 4. CAMPUS HIRING
    if (activeSubView === 'campus-hiring') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiBookOpen className="w-5 h-5 text-[#3665EE]" /> University Campus Placement Drives
              </h2>
              <p className="text-[#6B7280]">Partner universities, campus drive schedules, & candidate rosters</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Register Campus Drive", "Schedule a new placement drive at a partner university", [
                { label: "University Name", name: "university", type: "text", placeholder: "IIT Bombay" },
                { label: "Drive Date", name: "date", type: "text", placeholder: "12th August 2026" },
                { label: "Hiring Roles", name: "roles", type: "text", placeholder: "AI & Cloud Engineers" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-3.5 h-3.5" /> Register Campus Drive
            </button>
          </div>

          <div className="space-y-3">
            {campusList.map((c, i) => (
              <div key={i} className="p-5 rounded-[24px] border bg-[#F6E6D8] border-[#EAD0BC] flex items-center justify-between text-[#12163A] hover-card-lift">
                <div>
                  <h4 className="font-bold text-sm text-[#12163A]">{c.university}</h4>
                  <span className="text-[#3665EE] font-semibold">{c.roles}</span>
                  <div className="text-[11px] text-[#4B5563]">Drive Date: {c.driveDate} • {c.students}</div>
                </div>
                <span className="text-[10px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-0.5 rounded-full font-bold">{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 5. STUDENT SEARCH
    if (activeSubView === 'student-search') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiSearch className="w-5 h-5 text-[#3665EE]" /> Global Student Talent Search Engine
              </h2>
              <p className="text-[#6B7280]">Search 50,000+ verified student resumes by skills, ATS fit, and degree</p>
            </div>
          </div>

          <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                placeholder="Search candidates by skill e.g. Python, PyTorch, C++..." 
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-[#12163A] focus:outline-none focus:ring-2 focus:ring-[#3665EE]"
              />
              <button 
                onClick={() => onShowToast("Executed Neural Talent Search across 50,000+ candidate profiles!")}
                className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-6 py-2.5 rounded-xl transition cursor-pointer shadow-md"
              >
                Search Talent Database
              </button>
            </div>
          </div>
        </div>
      );
    }

    // 6. AI MATCHER
    if (activeSubView === 'ai-match' || activeSubView === 'matcher') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
              <FiCpu className="w-5 h-5 text-[#3665EE]" /> AI Neural Candidate Matcher Engine
            </h2>
            <p className="text-[#6B7280]">Screen candidates using AI ATS fit algorithms and skill alignment</p>
          </div>

          <div className="space-y-3">
            {[
              { name: "Aarav Sharma", college: "IIT Bombay", match: "98% Neural Match", role: "AI & MLOps Scientist", skills: ["Python", "PyTorch", "MLOps"], score: "ATS Score 96/100" },
              { name: "Ananya Roy", college: "BITS Pilani", match: "94% Neural Match", role: "Cloud Solutions Engineer", skills: ["AWS", "Docker", "Go"], score: "ATS Score 91/100" }
            ].map((cand, i) => (
              <div key={i} className="p-5 rounded-[24px] border bg-[#E4F4EC] border-[#C3E6D5] flex items-center justify-between text-[#12163A] hover-card-lift">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold">{cand.match}</span>
                    <span className="text-[#3665EE] font-bold">{cand.score}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#12163A] mt-1">{cand.name} • {cand.college}</h4>
                  <p className="text-xs text-[#4B5563]">Target Role: {cand.role}</p>
                </div>
                <button 
                  onClick={() => onShowToast(`Shortlisted ${cand.name} for technical interview!`)}
                  className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer shadow-md"
                >
                  Shortlist Candidate
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 7. INTERVIEWS
    if (activeSubView === 'interviews') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiCalendar className="w-5 h-5 text-[#3665EE]" /> Scheduled Candidate Interviews
              </h2>
              <p className="text-[#6B7280]">Interview panel schedules, evaluation rubrics, & video interview links</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Schedule Candidate Interview", "Set up a technical or HR interview round", [
                { label: "Candidate Name", name: "candidate", type: "text", placeholder: "Aarav Sharma" },
                { label: "Job Role", name: "role", type: "text", placeholder: "AI & MLOps Scientist" },
                { label: "Date & Time", name: "time", type: "text", placeholder: "Tomorrow, 3:00 PM" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-3.5 h-3.5" /> Schedule Candidate Interview
            </button>
          </div>

          <div className="space-y-3">
            {interviewsList.map((int) => (
              <div key={int.id} className="p-4 rounded-[20px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#3665EE]">{int.time}</span>
                    <span className="text-[10px] bg-white border border-slate-200 text-[#12163A] px-2 py-0.5 rounded-md font-bold">{int.status}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#12163A] mt-1">{int.candidate} • Role: {int.role}</h4>
                  <div className="text-[11px] text-[#4B5563]">Round: {int.round} • Panel: {int.panel}</div>
                </div>
                <button 
                  onClick={() => onShowToast(`Joined interview video room for ${int.candidate}`)}
                  className="bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-3.5 py-1.5 rounded-xl cursor-pointer"
                >
                  Join Video Call
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 8. OFFER LETTERS
    if (activeSubView === 'offers') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiAward className="w-5 h-5 text-[#3665EE]" /> Offer Letters & Compensation (CTC) Desk
              </h2>
              <p className="text-[#6B7280]">Manage offer rollouts, CTC packages, & candidate acceptance tracking</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Issue Offer Letter", "Send official offer letter to selected candidate", [
                { label: "Candidate Name", name: "candidate", type: "text", placeholder: "Aarav Sharma" },
                { label: "Offered Role", name: "role", type: "text", placeholder: "AI & MLOps Scientist" },
                { label: "Annual CTC Package", name: "ctc", type: "text", placeholder: "₹35.0 LPA" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-3.5 h-3.5" /> Issue Offer Letter
            </button>
          </div>

          <div className="space-y-3">
            {offersList.map((off) => (
              <div key={off.id} className="p-5 rounded-[24px] border bg-[#E4F4EC] border-[#C3E6D5] flex items-center justify-between text-[#12163A] hover-card-lift">
                <div>
                  <h4 className="font-bold text-sm text-[#12163A]">{off.candidate}</h4>
                  <span className="text-[#3665EE] font-semibold">{off.role} • CTC: {off.ctc}</span>
                </div>
                <span className="text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold">{off.status}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 9. HIRING ANALYTICS
    if (activeSubView === 'hiring-analytics') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
              <FiTrendingUp className="w-5 h-5 text-[#3665EE]" /> Enterprise Hiring Analytics & Talent Funnel
            </h2>
            <p className="text-[#6B7280]">Recruitment efficiency, time-to-hire metrics, & campus conversion rates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]">
              <div className="text-4xl font-extrabold text-[#3665EE]">14 Days</div>
              <p className="text-xs font-bold text-[#12163A] mt-1">Average Time-to-Hire</p>
              <span className="text-[10px] text-[#4B5563]">50% Faster than Industry</span>
            </div>
            <div className="p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]">
              <div className="text-4xl font-extrabold text-[#12163A]">90.4%</div>
              <p className="text-xs font-bold text-[#12163A] mt-1">Offer Acceptance Rate</p>
              <span className="text-[10px] text-[#4B5563]">38 Accepted / 42 Extended</span>
            </div>
            <div className="p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]">
              <div className="text-4xl font-extrabold text-[#12163A]">42.0%</div>
              <p className="text-xs font-bold text-[#12163A] mt-1">Diversity Hiring Ratio</p>
              <span className="text-[10px] text-[#3665EE]">Verified DEI Metric</span>
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
                <FiBell className="w-5 h-5 text-[#3665EE]" /> Recruiter Notifications & Hiring Alerts
              </h2>
              <p className="text-[#6B7280]">Candidate applications, interview confirmations, and offer acceptance receipts</p>
            </div>
            <button onClick={() => onShowToast("Marked all recruiter alerts as read")} className="text-[#3665EE] font-bold hover:underline cursor-pointer">
              Mark All as Read
            </button>
          </div>

          <div className="space-y-3">
            {[
              { title: "Aarav Sharma Accepted & Signed Offer Letter for ₹35.0 LPA!", time: "15 mins ago", type: "Offer Accepted", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
              { title: "IIT Bombay Placement Drive Registration Approved", time: "2 hours ago", type: "Campus Drive", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
              { title: "New Candidate Application Received for AI Scientist Role", time: "4 hours ago", type: "Applicant Alert", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" }
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
            <FiSliders className="w-5 h-5 text-[#3665EE]" /> Recruiter Governance & System Settings
          </h2>
          <p className="text-[#6B7280]">Configure enterprise team permissions, ATS integrations, & interviewer panels</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]">
            <h4 className="font-bold text-sm text-[#12163A]">ATS Integration & API Keys</h4>
            <p className="text-[#4B5563]">Role Ready AI Neural Matcher v2.4 Connected • Real-time Sync Active</p>
          </div>
          <div className="p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]">
            <h4 className="font-bold text-sm text-[#12163A]">Interviewer Panel Access Control</h4>
            <p className="text-[#4B5563]">24 Enterprise Interviewer Accounts • RBAC Access Enabled</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {renderContent()}

      {/* GLOBAL ACTION MODAL FOR RECRUITER DASHBOARD */}
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
