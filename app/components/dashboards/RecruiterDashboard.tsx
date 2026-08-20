import React, { useState } from 'react';
import { 
  FaBriefcase, 
  FaBuilding, 
  FaFileLines, 
  FaGraduationCap, 
  FaMagnifyingGlass, 
  FaBrain, 
  FaCalendarDays, 
  FaAward, 
  FaArrowTrendUp, 
  FaBullhorn, 
  FaSliders, 
  FaPlus, 
  FaCheck, 
  FaDownload, 
  FaUserCheck, 
  FaIndianRupeeSign, 
  FaClock,
  FaCircleCheck,
  FaXmark,
  FaPaperPlane,
  FaLocationDot
} from 'react-icons/fa6';
import { ActionModal } from '../ActionModal';
import { LiveCallModal } from '../LiveCallModal';
import { useAppDispatch } from '~/store/store';
import { addJobPosting } from '~/store/slices/jobsSlice';
import { addNotification } from '~/store/slices/notificationsSlice';

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
  const dispatch = useAppDispatch();

  // Action Modal State
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState<{ title: string; subtitle: string; fields: any[] }>({
    title: '',
    subtitle: '',
    fields: []
  });

  // Dedicated Quick Post Job Modal State
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [newJobForm, setNewJobForm] = useState({
    title: '',
    company: 'Google Cloud India Pvt Ltd',
    salary: '',
    location: '',
    type: 'Full-time' as 'Full-time' | 'Internship' | 'Contract',
    skills: '',
    description: ''
  });

  // Live Call State
  const [isLiveCallOpen, setIsLiveCallOpen] = useState(false);
  const [liveCallParticipant, setLiveCallParticipant] = useState({ name: "Aarav Sharma", role: "AI & MLOps Candidate" });

  // Recruiter Data State
  const [companyName, setCompanyName] = useState("Google Cloud India Pvt Ltd");
  const [companyLocation, setCompanyLocation] = useState("Bengaluru, India");

  const [jobsList, setJobsList] = useState([
    { id: "JOB-101", title: "Cloud Solutions Engineer", ctc: "₹28.0 LPA", location: "Bengaluru / Remote", applicants: 420, status: "Active Requisition", type: "Full-time", tags: ["AWS", "Cloud", "Kubernetes"] },
    { id: "JOB-102", title: "AI & MLOps Scientist", ctc: "₹35.0 LPA", location: "Hyderabad", applicants: 180, status: "Shortlisting Phase", type: "Full-time", tags: ["Python", "PyTorch", "MLOps"] },
    { id: "JOB-103", title: "Quant Financial Analyst", ctc: "₹24.0 LPA", location: "Mumbai", applicants: 310, status: "Interview Phase", type: "Full-time", tags: ["Python", "Stochastics", "Risk"] },
    { id: "JOB-104", title: "Full-Stack Software Engineer", ctc: "₹18.0 LPA", location: "Gurugram", applicants: 330, status: "Active Requisition", type: "Full-time", tags: ["React", "TypeScript", "Node.js"] }
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

  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobForm.title.trim()) {
      onShowToast("Please enter a job role title.");
      return;
    }

    const generatedId = `JOB-${Math.floor(100 + Math.random() * 900)}`;
    const salaryText = newJobForm.salary.trim() || "₹22.0 - ₹32.0 LPA";
    const locText = newJobForm.location.trim() || "Bengaluru / Remote";
    const skillList = newJobForm.skills ? newJobForm.skills.split(',').map(s => s.trim()) : ["React", "Python", "Cloud"];

    const newJobItem = {
      id: generatedId,
      title: newJobForm.title,
      company: companyName,
      location: locText,
      salary: salaryText,
      experience: "0 - 3 Yrs",
      type: newJobForm.type,
      matchScore: 95,
      tags: skillList,
      description: newJobForm.description || "Exciting corporate engineering role at " + companyName + ". Work on high-impact cloud systems and AI algorithms.",
      postedDate: "Just now"
    };

    // Update Recruiter local list
    const recruiterJobEntry = {
      id: generatedId,
      title: newJobForm.title,
      ctc: salaryText,
      location: locText,
      applicants: 0,
      status: "Active Requisition",
      type: newJobForm.type,
      tags: skillList
    };

    setJobsList([recruiterJobEntry, ...jobsList]);

    // Dispatch to Redux Store so Students can see the new job on Job Marketplace
    dispatch(addJobPosting(newJobItem));
    dispatch(addNotification({
      title: "New Job Requisition Published",
      message: `${companyName} published "${newJobForm.title}" for candidates.`,
      category: "jobs"
    }));

    onShowToast(`Successfully published job requisition: ${newJobForm.title}!`);
    setIsPostJobModalOpen(false);
    setNewJobForm({
      title: '',
      company: companyName,
      salary: '',
      location: '',
      type: 'Full-time',
      skills: '',
      description: ''
    });
  };

  const handleModalFormSubmit = (data: Record<string, string>) => {
    if (actionModalConfig.title === "Edit Corporate Profile") {
      if (data.name) setCompanyName(data.name);
      if (data.location) setCompanyLocation(data.location);
      onShowToast(`Updated corporate profile for ${data.name || companyName}!`);
    } else if (actionModalConfig.title === "Post New Job Requisition") {
      const generatedId = `JOB-${Math.floor(100 + Math.random() * 900)}`;
      const newJob = {
        id: generatedId,
        title: data.title || "Cloud Solutions Engineer",
        ctc: data.ctc || "₹28.0 LPA",
        location: data.location || "Bengaluru",
        applicants: 0,
        status: "Active Requisition",
        type: "Full-time" as const,
        tags: ["Cloud", "Engineering"]
      };
      setJobsList([newJob, ...jobsList]);
      
      // Dispatch to Redux
      dispatch(addJobPosting({
        id: generatedId,
        title: newJob.title,
        company: companyName,
        location: newJob.location,
        salary: newJob.ctc,
        experience: "0 - 2 Yrs",
        type: "Full-time",
        matchScore: 94,
        tags: ["Cloud", "Engineering", "Systems"],
        description: `Direct requisition for ${newJob.title} posted by ${companyName}.`,
        postedDate: "Just now"
      }));

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

  const cardClass = isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-blue-100 text-slate-900 shadow-xs';

  const renderContent = () => {
    // 1. DASHBOARD OVERVIEW
    if (activeSubView === 'overview') {
      return (
        <div className="space-y-6 font-sans">
          {/* Overview KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-md border border-slate-800 space-y-2">
              <span className="font-medium text-xs text-slate-400 block">Active Job Requisitions</span>
              <div className="text-2xl lg:text-3xl font-bold tracking-tight text-white">{jobsList.length} Roles</div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full inline-block border border-emerald-500/30">
                Across 6 Global Offices
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-blue-500/10 text-white shadow-sm border border-blue-500/20 space-y-2">
              <span className="font-medium text-xs text-blue-300 block">Applications Received</span>
              <div className="text-2xl lg:text-3xl font-bold tracking-tight text-blue-400">1,240</div>
              <span className="text-xs font-semibold text-blue-300">AI Resume Screened</span>
            </div>

            <div className="p-6 rounded-2xl bg-amber-500/10 text-white shadow-sm border border-amber-500/20 space-y-2">
              <span className="font-medium text-xs text-amber-300 block">Avg ATS Match Fit</span>
              <div className="text-2xl lg:text-3xl font-bold tracking-tight text-amber-400">88%</div>
              <span className="text-xs font-semibold text-amber-300">High Skill Alignment</span>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-500/10 text-white shadow-sm border border-emerald-500/20 space-y-2">
              <span className="font-medium text-xs text-emerald-300 block">Offers Extended</span>
              <div className="text-2xl lg:text-3xl font-bold tracking-tight text-emerald-400">42 Extended</div>
              <span className="text-xs font-semibold text-emerald-300">38 Offers Accepted</span>
            </div>
          </div>

          {/* Corporate Header & Direct Post Job Action */}
          <div className={`p-6 rounded-2xl border space-y-4 ${cardClass}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <FaBuilding className="w-5 h-5 text-blue-400" /> {companyName} • Enterprise Recruiter Hiring Desk
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Location: {companyLocation} • Verified Employer Badge Active</p>
              </div>

              {/* Prominent Button to Add New Job Posting */}
              <button
                onClick={() => setIsPostJobModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <FaPlus className="w-3.5 h-3.5" />
                <span>Post New Job Requisition</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FaCalendarDays className="w-5 h-5 text-blue-400" />
                <div>
                  <h4 className="font-semibold text-sm text-white">Upcoming Campus Placement Drive</h4>
                  <p className="text-xs text-slate-300 font-normal">IIT Bombay • 12th August 2026 • 480 Registered Candidates</p>
                </div>
              </div>
              <button 
                onClick={() => onShowToast("Navigated to IIT Bombay Campus Hiring Control")}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5"
              >
                <FaBriefcase className="w-3.5 h-3.5" /> Manage Drive
              </button>
            </div>
          </div>
        </div>
      );
    }

    // 2. COMPANY & VERIFICATION
    if (activeSubView === 'verification') {
      return (
        <div className={`rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <FaBuilding className="w-5 h-5 text-blue-400" /> Company Profile & Enterprise Verification
              </h2>
              <p className="text-xs text-slate-400">Verified employer badge, corporate registration, & campus hiring agreements</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsPostJobModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-lg shadow-blue-500/20"
              >
                <FaPlus className="w-3.5 h-3.5" /> Post Job Requisition
              </button>
              <button 
                onClick={() => openTriggerModal("Edit Corporate Profile", "Update company description and location", [
                  { label: "Company Name", name: "name", type: "text", placeholder: companyName },
                  { label: "Headquarters Location", name: "location", type: "text", placeholder: companyLocation }
                ])}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs px-4 py-2 rounded-xl border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
              >
                <FaSliders className="w-3.5 h-3.5 text-blue-400" /> Edit Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 text-white">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block">Corporate Identity</span>
              <h4 className="font-bold text-base text-white">{companyName}</h4>
              <p className="text-xs text-slate-300">Location: {companyLocation} • Tax ID Verified • NAAC Campus MoU Approved</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 text-white">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">Verification Status</span>
              <h4 className="font-bold text-base text-emerald-300">✓ Verified Corporate Employer</h4>
              <p className="text-xs text-slate-300">Verified Employer • Direct Campus Placement Rights • AI Resume Access Enabled</p>
            </div>
          </div>
        </div>
      );
    }

    // 3. JOB POSTINGS REQUISITION HUB
    if (activeSubView === 'jobs') {
      return (
        <div className={`rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-4">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <FaBriefcase className="w-5 h-5 text-blue-400" /> Job & Internship Requisitions Hub
              </h2>
              <p className="text-xs text-slate-400">Post new job descriptions, set CTC packages, & track applicant candidate pipelines</p>
            </div>

            {/* Direct React-Icon Button to Open Job Posting Modal */}
            <button 
              onClick={() => setIsPostJobModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95"
            >
              <FaPlus className="w-3.5 h-3.5" />
              <span>Post New Job Requisition</span>
            </button>
          </div>

          <div className="space-y-3">
            {jobsList.map((j) => (
              <div key={j.id} className="p-5 rounded-2xl border bg-slate-800/80 border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 text-white hover:border-blue-500/40 transition">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-md font-mono font-bold">{j.id}</span>
                    <h4 className="font-bold text-base text-white">{j.title}</h4>
                    <span className="text-[11px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-md font-medium">{j.type || 'Full-time'}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-normal mt-1">{j.location} • {j.applicants} Candidates Applied</p>
                </div>
                <div className="text-right flex md:flex-col items-center md:items-end justify-between gap-2">
                  <div className="text-blue-400 font-bold text-sm">{j.ctc}</div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-medium">
                    {j.status}
                  </span>
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
        <div className={`rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <FaGraduationCap className="w-5 h-5 text-blue-400" /> University Campus Placement Drives
              </h2>
              <p className="text-xs text-slate-400">Partner universities, campus drive schedules, & candidate rosters</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Register Campus Drive", "Schedule a new placement drive at a partner university", [
                { label: "University Name", name: "university", type: "text", placeholder: "IIT Bombay" },
                { label: "Drive Date", name: "date", type: "text", placeholder: "12th August 2026" },
                { label: "Hiring Roles", name: "roles", type: "text", placeholder: "AI & Cloud Engineers" }
              ])}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <FaPlus className="w-3.5 h-3.5" /> Register Campus Drive
            </button>
          </div>

          <div className="space-y-3">
            {campusList.map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border bg-slate-800/80 border-slate-700 flex items-center justify-between text-white">
                <div>
                  <h4 className="font-bold text-base text-white">{c.university}</h4>
                  <span className="text-blue-400 font-medium text-xs">{c.roles}</span>
                  <div className="text-xs text-slate-400 font-normal">Drive Date: {c.driveDate} • {c.students}</div>
                </div>
                <span className="text-xs bg-slate-700 text-slate-200 px-2.5 py-0.5 rounded-full font-medium">{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 5. STUDENT SEARCH
    if (activeSubView === 'student-search') {
      return (
        <div className={`rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`}>
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              <FaMagnifyingGlass className="w-5 h-5 text-blue-400" /> Global Student Talent Search Engine
            </h2>
            <p className="text-xs text-slate-400">Search 50,000+ verified student resumes by skills, ATS fit, and degree</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                placeholder="Search candidates by skill e.g. Python, PyTorch, C++..." 
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={() => onShowToast("Executed Neural Talent Search across 50,000+ candidate profiles!")}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-6 py-2.5 rounded-xl transition cursor-pointer shadow-md"
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
        <div className={`rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`}>
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              <FaBrain className="w-5 h-5 text-blue-400" /> AI Neural Candidate Matcher Engine
            </h2>
            <p className="text-xs text-slate-400">Screen candidates using AI ATS fit algorithms and skill alignment</p>
          </div>

          <div className="space-y-3">
            {[
              { name: "Aarav Sharma", college: "IIT Bombay", match: "98% Neural Match", role: "AI & MLOps Scientist", skills: ["Python", "PyTorch", "MLOps"], score: "ATS Score 96/100" },
              { name: "Ananya Roy", college: "BITS Pilani", match: "94% Neural Match", role: "Cloud Solutions Engineer", skills: ["AWS", "Docker", "Go"], score: "ATS Score 91/100" }
            ].map((cand, i) => (
              <div key={i} className="p-5 rounded-2xl border bg-slate-800/80 border-slate-700 flex items-center justify-between text-white">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-medium border border-emerald-500/30">{cand.match}</span>
                    <span className="text-blue-400 font-medium text-xs">{cand.score}</span>
                  </div>
                  <h4 className="font-bold text-base text-white mt-1">{cand.name} • {cand.college}</h4>
                  <p className="text-xs text-slate-400">Target Role: {cand.role}</p>
                </div>
                <button 
                  onClick={() => onShowToast(`Shortlisted ${cand.name} for technical interview!`)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-md"
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
        <div className={`rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <FaCalendarDays className="w-5 h-5 text-blue-400" /> Scheduled Candidate Interviews
              </h2>
              <p className="text-xs text-slate-400">Interview panel schedules, evaluation rubrics, & video interview links</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Schedule Candidate Interview", "Set up a technical or HR interview round", [
                { label: "Candidate Name", name: "candidate", type: "text", placeholder: "Aarav Sharma" },
                { label: "Job Role", name: "role", type: "text", placeholder: "AI & MLOps Scientist" },
                { label: "Date & Time", name: "time", type: "text", placeholder: "Tomorrow, 3:00 PM" }
              ])}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <FaPlus className="w-3.5 h-3.5" /> Schedule Candidate Interview
            </button>
          </div>

          <div className="space-y-3">
            {interviewsList.map((int) => (
              <div key={int.id} className="p-4 rounded-2xl border bg-slate-800/80 border-slate-700 flex items-center justify-between text-white">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-xs text-blue-400">{int.time}</span>
                    <span className="text-xs bg-slate-700 text-slate-200 px-2 py-0.5 rounded-md font-medium">{int.status}</span>
                  </div>
                  <h4 className="font-bold text-base text-white mt-1">{int.candidate} • Role: {int.role}</h4>
                  <div className="text-xs text-slate-400">Round: {int.round} • Panel: {int.panel}</div>
                </div>
                <button 
                  onClick={() => {
                    setLiveCallParticipant({ name: int.candidate, role: `Role: ${int.role}` });
                    setIsLiveCallOpen(true);
                    onShowToast(`Joined interview video room for ${int.candidate}`);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-3.5 py-1.5 rounded-xl cursor-pointer shadow-md transition"
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
        <div className={`rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <FaAward className="w-5 h-5 text-blue-400" /> Offer Letters & Compensation (CTC) Desk
              </h2>
              <p className="text-xs text-slate-400">Manage offer rollouts, CTC packages, & candidate acceptance tracking</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Issue Offer Letter", "Send official offer letter to selected candidate", [
                { label: "Candidate Name", name: "candidate", type: "text", placeholder: "Aarav Sharma" },
                { label: "Offered Role", name: "role", type: "text", placeholder: "AI & MLOps Scientist" },
                { label: "Annual CTC Package", name: "ctc", type: "text", placeholder: "₹35.0 LPA" }
              ])}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <FaPlus className="w-3.5 h-3.5" /> Issue Offer Letter
            </button>
          </div>

          <div className="space-y-3">
            {offersList.map((off) => (
              <div key={off.id} className="p-5 rounded-2xl border bg-slate-800/80 border-slate-700 flex items-center justify-between text-white">
                <div>
                  <h4 className="font-bold text-base text-white">{off.candidate}</h4>
                  <span className="text-blue-400 font-medium text-xs">{off.role} • CTC: {off.ctc}</span>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-medium">{off.status}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 9. HIRING ANALYTICS
    if (activeSubView === 'hiring-analytics') {
      return (
        <div className={`rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`}>
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              <FaArrowTrendUp className="w-5 h-5 text-blue-400" /> Enterprise Hiring Analytics & Talent Funnel
            </h2>
            <p className="text-xs text-slate-400">Recruitment efficiency, time-to-hire metrics, & campus conversion rates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 text-center text-white">
              <div className="text-3xl lg:text-4xl font-bold text-blue-400">14 Days</div>
              <p className="text-xs font-semibold text-white mt-1">Average Time-to-Hire</p>
              <span className="text-xs text-slate-400 font-normal">50% Faster than Industry</span>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center text-white">
              <div className="text-3xl lg:text-4xl font-bold text-emerald-400">90.4%</div>
              <p className="text-xs font-semibold text-white mt-1">Offer Acceptance Rate</p>
              <span className="text-xs text-slate-400 font-normal">38 Accepted / 42 Extended</span>
            </div>
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center text-white">
              <div className="text-3xl lg:text-4xl font-bold text-amber-400">42.0%</div>
              <p className="text-xs font-semibold text-white mt-1">Diversity Hiring Ratio</p>
              <span className="text-xs text-amber-300 font-medium">Verified DEI Metric</span>
            </div>
          </div>
        </div>
      );
    }

    // 10. NOTIFICATIONS
    if (activeSubView === 'notifications') {
      return (
        <div className={`rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`}>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <FaBullhorn className="w-5 h-5 text-blue-400" /> Recruiter Notifications & Hiring Alerts
              </h2>
              <p className="text-xs text-slate-400">Candidate applications, interview confirmations, and offer acceptance receipts</p>
            </div>
            <button onClick={() => onShowToast("Marked all recruiter alerts as read")} className="text-blue-400 font-medium text-xs hover:underline cursor-pointer">
              Mark All as Read
            </button>
          </div>

          <div className="space-y-3">
            {[
              { title: "Aarav Sharma Accepted & Signed Offer Letter for ₹35.0 LPA!", time: "15 mins ago", type: "Offer Accepted", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
              { title: "IIT Bombay Placement Drive Registration Approved", time: "2 hours ago", type: "Campus Drive", bg: "bg-slate-800/80", border: "border-slate-700" },
              { title: "New Candidate Application Received for AI Scientist Role", time: "4 hours ago", type: "Applicant Alert", bg: "bg-slate-800/80", border: "border-slate-700" }
            ].map((nt, i) => (
              <div key={i} className={`p-4 rounded-2xl border flex items-center justify-between ${nt.bg} ${nt.border} text-white`}>
                <div>
                  <h4 className="font-bold text-sm text-white">{nt.title}</h4>
                  <span className="text-blue-400 font-medium text-xs">{nt.type} • {nt.time}</span>
                </div>
                <span className="text-xs bg-blue-600 text-white px-2.5 py-0.5 rounded-full font-medium">New</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 11. SETTINGS
    return (
      <div className={`rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`}>
        <div className="pb-4 border-b border-slate-800">
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <FaSliders className="w-5 h-5 text-blue-400" /> Recruiter Governance & System Settings
          </h2>
          <p className="text-xs text-slate-400">Configure enterprise team permissions, ATS integrations, & interviewer panels</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 text-white">
            <h4 className="font-bold text-sm text-white">ATS Integration & API Keys</h4>
            <p className="text-xs text-slate-400">Role Ready AI Neural Matcher v2.4 Connected • Real-time Sync Active</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 text-white">
            <h4 className="font-bold text-sm text-white">Interviewer Panel Access Control</h4>
            <p className="text-xs text-slate-400">24 Enterprise Interviewer Accounts • RBAC Access Enabled</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {renderContent()}

      {/* DEDICATED NEW JOB POSTING MODAL FOR RECRUITERS */}
      {isPostJobModalOpen && (
        <div role="dialog" aria-modal="true" aria-labelledby="post-job-title" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl space-y-5 ${cardClass}`}>
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">{companyName}</span>
                <h3 id="post-job-title" className="text-lg font-bold text-white flex items-center gap-2">
                  <FaBriefcase className="w-4 h-4 text-blue-400" /> Post New Job Requisition
                </h3>
              </div>
              <button 
                onClick={() => setIsPostJobModalOpen(false)} 
                aria-label="Close modal"
                className="text-slate-400 hover:text-white font-bold p-1 cursor-pointer"
              >
                <FaXmark className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePostJobSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Job Role Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cloud Solutions Architect / AI Engineer"
                  value={newJobForm.title}
                  onChange={(e) => setNewJobForm({ ...newJobForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Annual CTC Package (INR)</label>
                  <div className="relative">
                    <FaIndianRupeeSign className="w-3 h-3 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. ₹28.0 - ₹35.0 LPA"
                      value={newJobForm.salary}
                      onChange={(e) => setNewJobForm({ ...newJobForm, salary: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Office Location</label>
                  <div className="relative">
                    <FaLocationDot className="w-3 h-3 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru / Remote"
                      value={newJobForm.location}
                      onChange={(e) => setNewJobForm({ ...newJobForm, location: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Job Type</label>
                  <select
                    value={newJobForm.type}
                    onChange={(e) => setNewJobForm({ ...newJobForm, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Full-time">Full-time Position</option>
                    <option value="Internship">Corporate Internship</option>
                    <option value="Contract">Contract / Project</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Required Skills (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. React, Python, AWS, PyTorch"
                    value={newJobForm.skills}
                    onChange={(e) => setNewJobForm({ ...newJobForm, skills: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Job Overview & Requirements</label>
                <textarea
                  rows={4}
                  placeholder="Describe key responsibilities, team structure, and qualifications..."
                  value={newJobForm.description}
                  onChange={(e) => setNewJobForm({ ...newJobForm, description: e.target.value })}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsPostJobModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer flex items-center gap-1.5 shadow-lg shadow-blue-500/20"
                >
                  <FaPaperPlane className="w-3 h-3" /> Publish Job Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GLOBAL ACTION MODAL FOR OTHER RECRUITER ACTIONS */}
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
