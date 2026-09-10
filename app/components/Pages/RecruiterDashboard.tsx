import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
import { StudentToolsViews } from '../StudentToolsViews';
import { recruiterService, RecruiterJob, RecruiterCampusDrive, RecruiterInterview, RecruiterOffer } from '../../services/recruiterService';

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
  const queryClient = useQueryClient();

  // Modal State
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState<{ title: string; subtitle: string; fields: any[] }>({
    title: '',
    subtitle: '',
    fields: []
  });

  // Query live recruiter data from backend
  const { data: recruiterData, isLoading } = useQuery({
    queryKey: ['recruiterData'],
    queryFn: () => recruiterService.getRecruiterData()
  });

  const jobsList: RecruiterJob[] = recruiterData?.jobs || [];
  const campusList: RecruiterCampusDrive[] = recruiterData?.campusDrives || [];
  const interviewsList: RecruiterInterview[] = recruiterData?.interviews || [];
  const offersList: RecruiterOffer[] = recruiterData?.offers || [];

  // Mutations
  const updateMutation = useMutation({
    mutationFn: (updates: {
      jobs?: RecruiterJob[];
      campusDrives?: RecruiterCampusDrive[];
      interviews?: RecruiterInterview[];
      offers?: RecruiterOffer[];
    }) => recruiterService.updateRecruiterData(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recruiterData'] });
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

  const handleModalFormSubmit = async (data: Record<string, string>) => {
    if (actionModalConfig.title === "Post New Job Requisition") {
      const newJob: RecruiterJob = {
        id: `JOB-${Math.floor(100 + Math.random() * 900)}`,
        title: data.title || "Software Engineer",
        ctc: data.ctc || "₹20.0 LPA",
        location: data.location || "Bengaluru",
        applicants: 0,
        status: "Active Requisition"
      };
      const updatedJobs = [newJob, ...jobsList];
      updateMutation.mutate({ jobs: updatedJobs });
      recruiterService.saveJobPosting(newJob).catch(() => {});
      onShowToast(`Posted new job requisition for ${newJob.title}!`);
    } else if (actionModalConfig.title === "Register Campus Drive") {
      const newCampus: RecruiterCampusDrive = {
        university: data.university || "University Partner",
        driveDate: data.date || "Next Month",
        roles: data.roles || "Engineering Roles",
        students: "0 Registered",
        status: "Confirmed Drive"
      };
      const updatedCampus = [newCampus, ...campusList];
      updateMutation.mutate({ campusDrives: updatedCampus });
      onShowToast(`Registered campus placement drive at ${newCampus.university}!`);
    } else if (actionModalConfig.title === "Schedule Candidate Interview") {
      const newInt: RecruiterInterview = {
        id: `INT-${Math.floor(100 + Math.random() * 900)}`,
        candidate: data.candidate || "Student Applicant",
        role: data.role || "Software Engineer",
        round: "Technical Interview 1",
        time: data.time || "Tomorrow, 2:00 PM",
        panel: "Tech Lead Panel",
        status: "Confirmed"
      };
      const updatedInterviews = [newInt, ...interviewsList];
      updateMutation.mutate({ interviews: updatedInterviews });
      onShowToast(`Scheduled interview with ${newInt.candidate}!`);
    } else if (actionModalConfig.title === "Issue Offer Letter") {
      const newOffer: RecruiterOffer = {
        id: `OFF-${Math.floor(100 + Math.random() * 900)}`,
        candidate: data.candidate || "Selected Candidate",
        role: data.role || "Engineer",
        ctc: data.ctc || "₹22.0 LPA",
        status: "Offer Sent (Pending)"
      };
      const updatedOffers = [newOffer, ...offersList];
      updateMutation.mutate({ offers: updatedOffers });
      onShowToast(`Issued offer letter to ${newOffer.candidate} for ${newOffer.ctc}!`);
    } else {
      onShowToast(`Action completed: ${actionModalConfig.title}`);
    }
    setIsActionModalOpen(false);
  };

  const cardClass = isDarkMode
    ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
    : 'bg-white border-slate-200 text-slate-900 shadow-xs';

  const subCardClass = isDarkMode
    ? 'bg-slate-800/80 border-slate-700/80 text-white'
    : 'bg-blue-50/40 border-blue-100 text-slate-900';

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
            <div className="p-6 rounded-[24px] bg-[#12163A] text-white shadow-md border border-[#12163A] space-y-2 hover-card-lift">
              <span className="text-[13px] font-medium block text-slate-300">Active Job Postings</span>
              <div className="text-[28px] md:text-[32px] font-bold text-white leading-none tracking-[-0.02em]">{jobsList.length} Roles</div>
              <span className="text-[12px] font-semibold text-[#E4F4EC] bg-[#E4F4EC]/10 px-2.5 py-0.5 rounded-full inline-block">
                Active Job Requisitions
              </span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift">
              <span className="text-[13px] font-medium block text-[#4B5563]">Campus Drives</span>
              <div className="text-[28px] md:text-[32px] font-bold text-[#3665EE] leading-none tracking-[-0.02em]">{campusList.length} Scheduled</div>
              <span className="text-[12px] font-semibold text-[#12163A]">University Partnerships</span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift">
              <span className="text-[13px] font-medium block text-[#4B5563]">Interviews Scheduled</span>
              <div className="text-[28px] md:text-[32px] font-bold text-[#12163A] leading-none tracking-[-0.02em]">{interviewsList.length} Candidates</div>
              <span className="text-[12px] font-semibold text-[#3665EE]">Live Technical Evaluation</span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift">
              <span className="text-[13px] font-medium block text-[#4B5563]">Offers Extended</span>
              <div className="text-[28px] md:text-[32px] font-bold text-[#12163A] leading-none tracking-[-0.02em]">{offersList.length} Extended</div>
              <span className="text-[12px] font-semibold text-[#12163A]">Talent Conversion Desk</span>
            </div>
          </div>

          {/* Corporate Verification Banner */}
          <div className={`p-6 rounded-[24px] border space-y-4 ${cardClass}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className={`text-[16px] md:text-[18px] font-semibold ${textHeading}`}>Corporate Talent Acquisition & Campus Hiring Desk</h3>
                <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal mt-1`}>Role Ready Verified Employer Partner • Direct Campus Hiring Rights</p>
              </div>
              <span className="bg-[#E4F4EC] text-[#12163A] font-semibold text-[12px] px-3.5 py-1 rounded-full border border-[#C3E6D5] self-start sm:self-auto">
                ✓ Verified Corporate Employer
              </span>
            </div>

            {campusList.length > 0 ? (
              <div className="p-5 rounded-[20px] bg-[#DEE9FF] border border-[#C6D9FF] flex items-center justify-between text-[#12163A]">
                <div className="flex items-center gap-3">
                  <FiCalendar className="w-5 h-5 text-[#3665EE]" />
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#12163A]">Next Campus Placement Drive</h4>
                    <p className="text-[13px] text-[#4B5563] mt-0.5">{campusList[0].university} • {campusList[0].driveDate} • {campusList[0].roles}</p>
                  </div>
                </div>
                <button 
                  onClick={() => onShowToast(`Managing drive for ${campusList[0].university}`)}
                  className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer shadow-md"
                >
                  Manage Drive
                </button>
              </div>
            ) : (
              <div className="p-5 rounded-[20px] bg-[#DEE9FF]/40 border border-[#C6D9FF] flex items-center justify-between text-[#12163A]">
                <div className="flex items-center gap-3">
                  <FiBookOpen className="w-5 h-5 text-[#3665EE]" />
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#12163A]">No Upcoming Campus Drives</h4>
                    <p className="text-[13px] text-[#4B5563] mt-0.5">Schedule placement drives at partner universities to start interviewing</p>
                  </div>
                </div>
                <button 
                  onClick={() => openTriggerModal("Register Campus Drive", "Schedule a new placement drive at a partner university", [
                    { label: "University Name", name: "university", type: "text", placeholder: "IIT Bombay" },
                    { label: "Drive Date", name: "date", type: "text", placeholder: "12th August 2026" },
                    { label: "Hiring Roles", name: "roles", type: "text", placeholder: "AI & Cloud Engineers" }
                  ])}
                  className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer shadow-md"
                >
                  + Register Drive
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    // 2. COMPANY & VERIFICATION
    if (activeSubView === 'verification') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiGrid className="w-5 h-5 text-[#3665EE]" /> Company Profile & Enterprise Verification
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Verified employer badge, corporate registration, & campus hiring agreements</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Edit Corporate Profile", "Update company description and contact", [
                { label: "Company Name", name: "name", type: "text", placeholder: "Corporate Talent Desk" },
                { label: "Headquarters", name: "location", type: "text", placeholder: "Bengaluru, India" }
              ])}
              className="bg-[#12163A] hover:bg-[#1A2050] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md"
            >
              Edit Corporate Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-3 text-[#12163A]">
              <span className="text-[12px] bg-[#12163A] text-white px-3 py-1 rounded-full font-semibold">Corporate Identity</span>
              <h4 className="text-[16px] font-semibold text-[#12163A]">Role Ready Corporate Hiring Partner</h4>
              <p className="text-[13px] text-[#4B5563] font-normal leading-normal">Tenant Enterprise Verified • AI Candidate Matcher Access Active</p>
            </div>

            <div className="p-5 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] space-y-3 text-[#12163A]">
              <span className="text-[12px] bg-[#12163A] text-white px-3 py-1 rounded-full font-semibold">Verification Status</span>
              <h4 className="text-[16px] font-semibold text-[#12163A]">✓ Verified Corporate Employer</h4>
              <p className="text-[13px] text-[#4B5563] font-normal leading-normal">Direct Campus Placement Rights • AI Resume Pipeline Enabled</p>
            </div>
          </div>
        </div>
      );
    }

    // 3. JOB POSTINGS
    if (activeSubView === 'jobs') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiFileText className="w-5 h-5 text-[#3665EE]" /> Job & Internship Requisitions Hub
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Manage active job descriptions, CTC packages, & applicant pipelines</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Post New Job Requisition", "Publish a new job opening to university students", [
                { label: "Job Role Title", name: "title", type: "text", placeholder: "Cloud Solutions Engineer" },
                { label: "Annual CTC Package", name: "ctc", type: "text", placeholder: "₹28.0 LPA" },
                { label: "Office Location", name: "location", type: "text", placeholder: "Bengaluru / Remote" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-4 h-4" /> Post New Job Requisition
            </button>
          </div>

          {jobsList.length === 0 ? (
            <div className="py-12 text-center text-[13px] text-slate-400">
              <FiBriefcase className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
              No active job requisitions found. Click '+ Post New Job Requisition' to create one.
            </div>
          ) : (
            <div className="space-y-3">
              {jobsList.map((j) => (
                <div key={j.id} className="p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-md font-semibold">{j.id}</span>
                      <h4 className="text-[16px] font-semibold text-[#12163A]">{j.title}</h4>
                    </div>
                    <p className="text-[13px] text-[#4B5563] mt-1">{j.location} • {j.applicants || 0} Candidates Applied</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[#3665EE] font-bold text-[16px]">{j.ctc}</div>
                    <span className="text-[12px] bg-white border border-slate-200 text-[#12163A] px-3 py-1 rounded-full font-semibold block mt-1">{j.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // 3B. CREATE JOB POSTING
    if (activeSubView === 'create-job') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`pb-4 border-b ${borderDivider}`}>
            <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
              <FiPlus className="w-5 h-5 text-[#3665EE]" /> Create & Publish Job Requisition
            </h2>
            <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>
              Broadcast new job opening to student talent pools across partner universities
            </p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const title = (form.elements.namedItem('title') as HTMLInputElement)?.value || "Software Engineer";
            const ctc = (form.elements.namedItem('ctc') as HTMLInputElement)?.value || "₹18.0 LPA";
            const location = (form.elements.namedItem('location') as HTMLInputElement)?.value || "Bengaluru / Remote";
            const newJob: RecruiterJob = {
              id: `JOB-${Math.floor(100 + Math.random() * 900)}`,
              title,
              ctc,
              location,
              applicants: 0,
              status: "Active Requisition"
            };
            const updated = [newJob, ...jobsList];
            updateMutation.mutate({ jobs: updated });
            onShowToast(`Published new job requisition: ${title} (${ctc})!`);
          }} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title</label>
                <input name="title" required placeholder="e.g. Cloud Infrastructure Engineer" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Annual CTC Range</label>
                <input name="ctc" required placeholder="e.g. ₹18.0 - 24.0 LPA" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Job Location</label>
                <input name="location" required placeholder="e.g. Bengaluru / Pune / Remote" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Experience Level</label>
                <input name="experience" placeholder="e.g. Entry Level (0-2 Years)" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Skills Required (Comma-separated)</label>
              <input name="skills" placeholder="e.g. Python, Docker, Kubernetes, AWS, PostgreSQL" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Job Description & Responsibilities</label>
              <textarea name="description" rows={4} placeholder="Describe core responsibilities, key qualifications, and compensation perks..." className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-sm" />
            </div>
            <button type="submit" className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition cursor-pointer shadow-md">
              Publish Job Requisition
            </button>
          </form>
        </div>
      );
    }

    // 4. CAMPUS HIRING
    if (activeSubView === 'campus-hiring') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiBookOpen className="w-5 h-5 text-[#3665EE]" /> University Campus Placement Drives
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Partner universities, campus drive schedules, & candidate rosters</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Register Campus Drive", "Schedule a new placement drive at a partner university", [
                { label: "University Name", name: "university", type: "text", placeholder: "IIT Bombay" },
                { label: "Drive Date", name: "date", type: "text", placeholder: "12th August 2026" },
                { label: "Hiring Roles", name: "roles", type: "text", placeholder: "AI & Cloud Engineers" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-4 h-4" /> Register Campus Drive
            </button>
          </div>

          {campusList.length === 0 ? (
            <div className="py-12 text-center text-[13px] text-slate-400">
              <FiBookOpen className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
              No campus placement drives registered. Click '+ Register Campus Drive' to schedule one.
            </div>
          ) : (
            <div className="space-y-3">
              {campusList.map((c, i) => (
                <div key={i} className="p-5 rounded-[24px] border bg-[#F6E6D8] border-[#EAD0BC] flex items-center justify-between text-[#12163A] hover-card-lift">
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#12163A]">{c.university}</h4>
                    <span className="text-[#3665EE] text-[13px] font-medium">{c.roles}</span>
                    <div className="text-[13px] text-[#4B5563] mt-0.5">Drive Date: {c.driveDate} • {c.students}</div>
                  </div>
                  <span className="text-[12px] bg-white border border-slate-200 text-[#12163A] px-3 py-1 rounded-full font-semibold">{c.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // 5. STUDENT TALENT POOL & CANDIDATES
    if (activeSubView === 'student-search' || activeSubView === 'candidates') {
      const candidates = [
        { name: "Aarav Sharma", college: "IIT Delhi", branch: "Computer Science", gpa: "9.2 CGPA", skills: ["Python", "PyTorch", "System Design"], atsMatch: 95 },
        { name: "Priya Nair", college: "BITS Pilani", branch: "Electronics & Communication", gpa: "8.9 CGPA", skills: ["C++", "Embedded Linux", "Verilog"], atsMatch: 91 },
        { name: "Kavya Menon", college: "NIT Surathkal", branch: "Information Technology", gpa: "9.0 CGPA", skills: ["React", "TypeScript", "Node.js", "Docker"], atsMatch: 88 }
      ];

      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`pb-4 border-b ${borderDivider}`}>
            <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
              <FiSearch className="w-5 h-5 text-[#3665EE]" /> Candidate Talent Pool & Resume Search
            </h2>
            <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Search verified university candidates by skills, GPA, & ATS score</p>
          </div>

          <div className="p-4 rounded-xl bg-[#DEE9FF]/40 border border-[#C6D9FF] flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              placeholder="Search by skill e.g. Python, Docker, React, AWS..." 
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-[#12163A] text-sm focus:outline-none"
            />
            <button 
              onClick={() => onShowToast("Executed search across verified student candidate pool!")}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-sm font-semibold px-6 py-2.5 rounded-xl cursor-pointer"
            >
              Search Candidates
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {candidates.map((c, idx) => (
              <div key={idx} className={`p-4 rounded-xl border ${subCardClass} space-y-3 flex flex-col justify-between`}>
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={`font-semibold text-[15px] ${textHeading}`}>{c.name}</h4>
                      <p className={`text-xs ${textMuted}`}>{c.college} • {c.branch}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400">
                      {c.atsMatch}% Fit
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-blue-400 mt-2">{c.gpa}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {c.skills.map((s, si) => (
                      <span key={si} className="text-[10px] bg-slate-700/40 text-slate-300 px-2 py-0.5 rounded-md">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-700/40 flex items-center justify-between">
                  <button onClick={() => onShowToast(`Downloaded resume for ${c.name}`)} className="text-xs text-blue-400 font-semibold hover:underline">
                    Download Resume
                  </button>
                  <button onClick={() => onShowToast(`Shortlisted ${c.name}!`)} className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer">
                    Shortlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 5B. APPLICATIONS PIPELINE
    if (activeSubView === 'applications') {
      const apps = [
        { id: 'APP-101', candidate: "Aarav Sharma", role: "AI & MLOps Scientist", college: "IIT Delhi", appliedDate: "2 days ago", matchScore: 95, status: "Under Review" },
        { id: 'APP-102', candidate: "Priya Nair", role: "Software Engineer", college: "BITS Pilani", appliedDate: "3 days ago", matchScore: 91, status: "Shortlisted" },
        { id: 'APP-103', candidate: "Rohan Patel", role: "Cloud Solutions Architect", college: "NIT Trichy", appliedDate: "4 days ago", matchScore: 84, status: "Applied" }
      ];

      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`pb-4 border-b ${borderDivider}`}>
            <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
              <FiFileText className="w-5 h-5 text-[#3665EE]" /> Candidate Applications Pipeline
            </h2>
            <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>
              Review incoming applications, evaluate ATS match scores, and progress candidate stages
            </p>
          </div>

          <div className="divide-y divide-slate-800 border border-slate-700 rounded-2xl overflow-hidden text-sm">
            {apps.map((a) => (
              <div key={a.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{a.candidate}</span>
                    <span className="text-xs text-slate-400">({a.college})</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400">{a.role}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Applied: {a.appliedDate} • ATS Alignment: <strong className="text-emerald-400">{a.matchScore}%</strong></p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">{a.status}</span>
                  <button onClick={() => onShowToast(`Moved ${a.candidate} to Shortlist!`)} className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-xl cursor-pointer">
                    Shortlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 5C. SHORTLISTED CANDIDATES
    if (activeSubView === 'shortlisted') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`pb-4 border-b ${borderDivider}`}>
            <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
              <FiUserCheck className="w-5 h-5 text-emerald-400" /> Shortlisted Candidates Pool
            </h2>
            <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>
              Candidates approved for technical evaluation and interviews
            </p>
          </div>

          <div className="space-y-3">
            {[
              { name: "Priya Nair", role: "Software Engineer", college: "BITS Pilani", ctc: "₹20.0 LPA", match: 91 },
              { name: "Aarav Sharma", role: "AI & MLOps Scientist", college: "IIT Delhi", ctc: "₹28.0 LPA", match: 95 }
            ].map((sc, idx) => (
              <div key={idx} className={`p-4 rounded-xl border ${subCardClass} flex items-center justify-between`}>
                <div>
                  <h4 className={`font-semibold text-sm ${textHeading}`}>{sc.name}</h4>
                  <p className={`text-xs ${textMuted}`}>{sc.role} • {sc.college} • Target CTC: {sc.ctc}</p>
                </div>
                <button 
                  onClick={() => openTriggerModal("Schedule Candidate Interview", "Set up interview round", [
                    { label: "Candidate Name", name: "candidate", type: "text", placeholder: sc.name },
                    { label: "Job Role", name: "role", type: "text", placeholder: sc.role },
                    { label: "Date & Time", name: "time", type: "text", placeholder: "Tomorrow, 2:00 PM" }
                  ])}
                  className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer"
                >
                  Schedule Interview
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 6. AI MATCHER
    if (activeSubView === 'ai-match' || activeSubView === 'matcher') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`pb-4 border-b ${borderDivider}`}>
            <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
              <FiCpu className="w-5 h-5 text-[#3665EE]" /> AI Neural Candidate Matcher Engine
            </h2>
            <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Screen candidates using AI ATS fit algorithms and skill alignment</p>
          </div>

          <div className="py-12 text-center text-[13px] text-slate-400">
            <FiCpu className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
            AI Matcher actively analyzes applications for published job requisitions.
          </div>
        </div>
      );
    }

    // 7. INTERVIEWS
    if (activeSubView === 'interviews') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiCalendar className="w-5 h-5 text-[#3665EE]" /> Scheduled Candidate Interviews
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Interview panel schedules, evaluation rubrics, & video interview links</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Schedule Candidate Interview", "Set up a technical or HR interview round", [
                { label: "Candidate Name", name: "candidate", type: "text", placeholder: "Aarav Sharma" },
                { label: "Job Role", name: "role", type: "text", placeholder: "AI & MLOps Scientist" },
                { label: "Date & Time", name: "time", type: "text", placeholder: "Tomorrow, 3:00 PM" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-4 h-4" /> Schedule Candidate Interview
            </button>
          </div>

          {interviewsList.length === 0 ? (
            <div className="py-12 text-center text-[13px] text-slate-400">
              <FiCalendar className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
              No interviews scheduled yet. Click '+ Schedule Candidate Interview' to set up a session.
            </div>
          ) : (
            <div className="space-y-3">
              {interviewsList.map((int) => (
                <div key={int.id} className="p-4 rounded-[20px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold text-[#3665EE]">{int.time}</span>
                      <span className="text-[12px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-0.5 rounded-md font-semibold">{int.status}</span>
                    </div>
                    <h4 className="text-[16px] font-semibold text-[#12163A] mt-1">{int.candidate} • Role: {int.role}</h4>
                    <div className="text-[13px] text-[#4B5563]">Round: {int.round} • Panel: {int.panel}</div>
                  </div>
                  <button 
                    onClick={() => onShowToast(`Joined interview video room for ${int.candidate}`)}
                    className="bg-[#12163A] hover:bg-[#1A2050] text-white text-[14px] font-semibold px-3.5 py-1.5 rounded-xl cursor-pointer"
                  >
                    Join Video Call
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // 8. OFFER LETTERS & SELECTED CANDIDATES
    if (activeSubView === 'offers' || activeSubView === 'selected') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiAward className="w-5 h-5 text-[#3665EE]" /> Offer Letters & Compensation (CTC) Desk
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Manage offer rollouts, CTC packages, & candidate acceptance tracking</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Issue Offer Letter", "Send official offer letter to selected candidate", [
                { label: "Candidate Name", name: "candidate", type: "text", placeholder: "Candidate Name" },
                { label: "Offered Role", name: "role", type: "text", placeholder: "AI Engineer" },
                { label: "Annual CTC Package", name: "ctc", type: "text", placeholder: "₹25.0 LPA" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-4 h-4" /> Issue Offer Letter
            </button>
          </div>

          {offersList.length === 0 ? (
            <div className="py-12 text-center text-[13px] text-slate-400">
              <FiAward className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
              No offer letters issued yet. Click '+ Issue Offer Letter' to roll out an offer.
            </div>
          ) : (
            <div className="space-y-3">
              {offersList.map((off) => (
                <div key={off.id} className="p-5 rounded-[24px] border bg-[#E4F4EC] border-[#C3E6D5] flex items-center justify-between text-[#12163A] hover-card-lift">
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#12163A]">{off.candidate}</h4>
                    <span className="text-[#3665EE] text-[13px] font-medium">{off.role} • CTC: {off.ctc}</span>
                  </div>
                  <span className="text-[12px] bg-[#12163A] text-white px-3 py-1 rounded-full font-semibold">{off.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // 9. HIRING ANALYTICS
    if (activeSubView === 'hiring-analytics') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`pb-4 border-b ${borderDivider}`}>
            <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
              <FiTrendingUp className="w-5 h-5 text-[#3665EE]" /> Enterprise Hiring Analytics & Talent Funnel
            </h2>
            <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Recruitment efficiency, time-to-hire metrics, & campus conversion rates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]">
              <div className="text-[32px] md:text-[36px] font-bold text-[#3665EE] leading-none">{jobsList.length}</div>
              <p className="text-[14px] font-semibold text-[#12163A] mt-2">Active Job Requisitions</p>
              <span className="text-[12px] text-[#4B5563] block mt-0.5">Published Roles</span>
            </div>
            <div className="p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]">
              <div className="text-[32px] md:text-[36px] font-bold text-[#12163A] leading-none">{offersList.length}</div>
              <p className="text-[14px] font-semibold text-[#12163A] mt-2">Offers Extended</p>
              <span className="text-[12px] text-[#4B5563] block mt-0.5">Live Pipeline Status</span>
            </div>
            <div className="p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]">
              <div className="text-[32px] md:text-[36px] font-bold text-[#12163A] leading-none">{campusList.length}</div>
              <p className="text-[14px] font-semibold text-[#12163A] mt-2">Campus Placement Drives</p>
              <span className="text-[12px] text-[#3665EE] font-medium block mt-0.5">Partner Institutions</span>
            </div>
          </div>
        </div>
      );
    }

    // 9B. MESSAGES & COMMUNICATIONS
    if (activeSubView === 'messages') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`pb-4 border-b ${borderDivider}`}>
            <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
              <FiFileText className="w-5 h-5 text-[#3665EE]" /> Candidate & University Placement Cell Messages
            </h2>
            <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>
              Direct communication with job applicants and college placement officers
            </p>
          </div>

          <div className="space-y-3">
            {[
              { sender: "Aarav Sharma (Candidate - AI Engineer)", time: "10:15 AM", message: "Thank you for the interview confirmation! I have accepted the calendar invite.", unread: true },
              { sender: "Placement Cell (IIT Delhi)", time: "Yesterday", message: "The registered student list for your upcoming campus drive has been finalized.", unread: false }
            ].map((m, idx) => (
              <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition ${subCardClass}`} onClick={() => onShowToast(`Opened message with ${m.sender}`)}>
                <div>
                  <div className="flex items-center gap-2">
                    {m.unread && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                    <span className={`font-semibold text-sm ${textHeading}`}>{m.sender}</span>
                    <span className={`text-[11px] ${textMuted}`}>{m.time}</span>
                  </div>
                  <p className={`text-xs mt-1 ${textMuted}`}>{m.message}</p>
                </div>
                <button className="text-xs text-blue-400 font-semibold hover:underline">Reply</button>
              </div>
            ))}
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
                <FiBell className="w-5 h-5 text-[#3665EE]" /> Recruiter Notifications & Hiring Alerts
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Candidate applications, interview confirmations, and offer acceptance receipts</p>
            </div>
            <button onClick={() => onShowToast("Marked all recruiter alerts as read")} className="text-[#3665EE] text-[14px] font-semibold hover:underline cursor-pointer">
              Mark All as Read
            </button>
          </div>

          <div className="space-y-3">
            {jobsList.length > 0 ? (
              <div className="p-4 rounded-[20px] border flex items-center justify-between bg-[#DEE9FF] border-[#C6D9FF] text-[#12163A]">
                <div>
                  <h4 className="text-[16px] font-semibold text-[#12163A]">Active Requisition: {jobsList[0].title}</h4>
                  <span className="text-[#3665EE] text-[13px] font-medium">Job Posting • Live on Campus Portal</span>
                </div>
                <span className="text-[12px] bg-[#12163A] text-white px-3 py-1 rounded-full font-semibold">Active</span>
              </div>
            ) : (
              <div className="py-8 text-center text-[13px] text-slate-400">
                No active notifications at this time.
              </div>
            )}
          </div>
        </div>
      );
    }

    // 11. SETTINGS
    return (
      <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
        <div className={`pb-4 border-b ${borderDivider}`}>
          <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
            <FiSliders className="w-5 h-5 text-[#3665EE]" /> Recruiter Governance & System Settings
          </h2>
          <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Configure enterprise team permissions, ATS integrations, & interviewer panels</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]">
            <h4 className="text-[16px] font-semibold text-[#12163A]">ATS & Sourcing Integration</h4>
            <p className="text-[13px] text-[#4B5563]">Role Ready Candidate Matcher Connected • Real-time Sync Active</p>
          </div>
          <div className="p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]">
            <h4 className="text-[16px] font-semibold text-[#12163A]">Interviewer Panel Access Control</h4>
            <p className="text-[13px] text-[#4B5563]">Enterprise Interviewer Accounts • RBAC Access Enabled</p>
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
