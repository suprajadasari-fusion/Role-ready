import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  FiGrid, 
  FiBriefcase, 
  FiBookOpen, 
  FiUsers, 
  FiDollarSign, 
  FiTrendingUp,
  FiPlus,
  FiSearch,
  FiCalendar,
  FiFileText,
  FiBell,
  FiSliders,
  FiCheckSquare,
  FiUserCheck,
  FiDownload,
  FiEye,
  FiCheck,
  FiClock,
  FiSend,
  FiMessageSquare,
  FiStar,
  FiAward
} from 'react-icons/fi';
import { ActionModal } from '../ActionModal';
import { StudentToolsViews } from '../StudentToolsViews';
import { 
  companyService, 
  CompanyJob, 
  CompanyCandidate, 
  CompanyApplication, 
  CompanyInterview, 
  CompanyEmployee, 
  CompanyInternship, 
  CompanyPartnership 
} from '../../services/companyService';

interface CompanyDashboardProps {
  activeSubView: string;
  onShowToast: (msg: string) => void;
  isDarkMode: boolean;
}

export const CompanyDashboard: React.FC<CompanyDashboardProps> = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const queryClient = useQueryClient();

  // Search & Filters State
  const [candidateSearchQuery, setCandidateSearchQuery] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState('All');
  const [selectedCandidateModal, setSelectedCandidateModal] = useState<CompanyCandidate | null>(null);

  // Message compose state
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([
    { id: 1, sender: 'Placement Officer (IIT Bombay)', text: 'Hello, the shortlist for the Summer 2026 AI Innovation drive is confirmed.', time: '10:30 AM', isMe: false },
    { id: 2, sender: 'Company Talent Lead', text: 'Thank you! We will conduct technical rounds tomorrow starting at 14:00 PM.', time: '11:15 AM', isMe: true },
    { id: 3, sender: 'Candidate: Arjun Das', text: 'Confirmed receipt of the system design interview invitation.', time: '12:00 PM', isMe: false }
  ]);

  // Modal Action State
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState<{ title: string; subtitle: string; fields: any[] }>({
    title: '',
    subtitle: '',
    fields: []
  });

  // Live query for company data from backend profile roleData
  const { data: companyData, isLoading } = useQuery({
    queryKey: ['companyData'],
    queryFn: () => companyService.getCompanyData()
  });

  const jobsList: CompanyJob[] = companyData?.jobs || [];
  const candidatesList: CompanyCandidate[] = companyData?.candidates || [];
  const applicationsList: CompanyApplication[] = companyData?.applications || [];
  const interviewsList: CompanyInterview[] = companyData?.interviews || [];
  const employeesList: CompanyEmployee[] = companyData?.employees || [];
  const internshipsList: CompanyInternship[] = companyData?.internships || [];
  const partnershipsList: CompanyPartnership[] = companyData?.partnerships || [];

  const updateMutation = useMutation({
    mutationFn: (updates: {
      jobs?: CompanyJob[];
      candidates?: CompanyCandidate[];
      applications?: CompanyApplication[];
      interviews?: CompanyInterview[];
      employees?: CompanyEmployee[];
      internships?: CompanyInternship[];
      partnerships?: CompanyPartnership[];
    }) => companyService.updateCompanyData(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companyData'] });
    },
    onError: () => {
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
    if (actionModalConfig.title === "Post Job Requisition") {
      const newJob: CompanyJob = {
        id: `JOB-${Math.floor(500 + Math.random() * 500)}`,
        title: data.title || "Full-Stack Software Engineer",
        department: data.department || "Core Engineering",
        location: data.location || "Bengaluru / Hybrid",
        type: (data.type as any) || "Full-time",
        openings: parseInt(data.openings) || 5,
        applicants: 0,
        status: "Active",
        postedDate: new Date().toISOString().split('T')[0]
      };
      const updated = [newJob, ...jobsList];
      updateMutation.mutate({ jobs: updated });
      onShowToast(`Posted new job requisition: ${newJob.title}!`);
    } else if (actionModalConfig.title === "Schedule Interview") {
      const newInt: CompanyInterview = {
        id: `INT-${Math.floor(300 + Math.random() * 700)}`,
        candidateName: data.candidateName || "Candidate Name",
        role: data.role || "Software Engineer",
        round: data.round || "Technical Interview Round",
        interviewer: data.interviewer || "Technical Lead",
        date: data.date || "Tomorrow",
        time: data.time || "14:00 PM",
        status: "Scheduled",
        meetLink: "https://meet.role-ready.com/interview"
      };
      const updated = [newInt, ...interviewsList];
      updateMutation.mutate({ interviews: updated });
      onShowToast(`Scheduled interview with ${newInt.candidateName}!`);
    } else if (actionModalConfig.title === "Onboard Employee") {
      const newEmp: CompanyEmployee = {
        id: `EMP-${Math.floor(10 + Math.random() * 90)}`,
        name: data.name || "Employee Name",
        department: data.department || "Engineering",
        designation: data.designation || "Associate Engineer",
        joinedDate: new Date().toISOString().split('T')[0],
        email: data.email || "employee@enterprise.com",
        status: "Active"
      };
      const updated = [newEmp, ...employeesList];
      updateMutation.mutate({ employees: updated });
      onShowToast(`Onboarded team member: ${newEmp.name}!`);
    } else if (actionModalConfig.title === "Register Campus Drive") {
      const newPartner: CompanyPartnership = {
        college: data.college || "Partner University",
        type: data.type || "Campus Placement Drive 2026",
        mouYear: "2026-2027",
        studentsHired: "Planning Stage",
        status: "Active MoU"
      };
      const updated = [newPartner, ...partnershipsList];
      updateMutation.mutate({ partnerships: updated });
      onShowToast(`Registered campus drive for ${newPartner.college}!`);
    }
    setIsActionModalOpen(false);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'Company Talent Lead',
      text: messageInput.trim(),
      time: 'Just now',
      isMe: true
    };
    setChatMessages(prev => [...prev, newMsg]);
    setMessageInput('');
    onShowToast("Message sent successfully!");
  };

  const cardClass = isDarkMode
    ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
    : 'bg-white border-blue-100 text-slate-900 shadow-sm';

  const subCardClass = isDarkMode
    ? 'bg-slate-800/80 border-slate-700/80 text-white'
    : 'bg-blue-50/40 border-blue-100 text-slate-900';

  const textMuted = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const textHeading = isDarkMode ? 'text-white' : 'text-slate-900';
  const borderDivider = isDarkMode ? 'border-slate-800' : 'border-slate-100';

  // 1. JOBS / REQUISITIONS
  if (activeSubView === 'jobs') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiBriefcase className="w-5 h-5 text-blue-500" /> Enterprise Job & Internship Requisitions
            </h2>
            <p className={textMuted}>Manage active job postings, graduate campus roles, and university openings</p>
          </div>
          <button 
            onClick={() => openTriggerModal("Post Job Requisition", "Create a new graduate or lateral job posting", [
              { label: "Job Title", name: "title", type: "text", placeholder: "e.g. Associate Cloud Engineer" },
              { label: "Department", name: "department", type: "text", placeholder: "e.g. Platform Infrastructure" },
              { label: "Location", name: "location", type: "text", placeholder: "e.g. Bengaluru / Hybrid" },
              { label: "Employment Type", name: "type", type: "text", placeholder: "e.g. Full-time / Internship" },
              { label: "Number of Openings", name: "openings", type: "number", placeholder: "10" }
            ])}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            <FiPlus className="w-4 h-4" /> Post New Job
          </button>
        </div>

        <div className="space-y-3">
          {jobsList.map((job) => (
            <div key={job.id} className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${subCardClass} transition hover:shadow-md hover:border-blue-500`}>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className={`font-bold text-sm ${textHeading}`}>{job.title}</h4>
                  <span className="text-[10px] font-mono text-slate-400">({job.id})</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold">
                    {job.type}
                  </span>
                </div>
                <div className="text-blue-400 font-semibold text-[11px] mt-0.5">{job.department} • {job.location}</div>
                <div className={`text-[10px] ${textMuted} mt-0.5`}>Posted: {job.postedDate} • {job.openings} Openings</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-emerald-400 font-bold text-sm">{job.applicants}</span>
                  <div className={`text-[10px] ${textMuted}`}>Applicants</div>
                </div>
                <button
                  onClick={() => onShowToast(`Viewing applicants for ${job.title}`)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3.5 py-1.5 rounded-xl text-xs transition cursor-pointer"
                >
                  View Pipeline
                </button>
              </div>
            </div>
          ))}
        </div>

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
  }

  // 2. CANDIDATES / TALENT SEARCH
  if (activeSubView === 'candidates') {
    const filteredCandidates = candidatesList.filter(c => 
      c.name.toLowerCase().includes(candidateSearchQuery.toLowerCase()) ||
      c.college.toLowerCase().includes(candidateSearchQuery.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(candidateSearchQuery.toLowerCase()))
    );

    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiSearch className="w-5 h-5 text-blue-500" /> Talent Pool & Candidate Database
            </h2>
            <p className={textMuted}>Verified university engineering students and campus job seekers</p>
          </div>
          <div className="relative w-full md:w-72">
            <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by candidate, college or skill..."
              value={candidateSearchQuery}
              onChange={(e) => setCandidateSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border focus:outline-none focus:border-blue-500 ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCandidates.map((c) => (
            <div key={c.id} className={`p-5 rounded-2xl border space-y-3 ${subCardClass} transition hover:shadow-md hover:border-blue-500`}>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={`font-bold text-sm ${textHeading}`}>{c.name}</h4>
                  <div className="text-blue-400 font-semibold text-[11px]">{c.college} • {c.degree}</div>
                  <div className={`text-[10px] ${textMuted}`}>{c.experience}</div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/30">
                  {c.matchScore}% Match
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {c.skills.map((sk, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-700/30 px-2 py-0.5 rounded-md font-medium">
                    {sk}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-700/20">
                <button
                  onClick={() => setSelectedCandidateModal(c)}
                  className="px-3 py-1.5 rounded-lg border border-slate-600/40 hover:border-blue-500 text-xs font-semibold transition cursor-pointer"
                >
                  View Resume
                </button>
                <button
                  onClick={() => {
                    openTriggerModal("Schedule Interview", `Invite ${c.name} for technical interview`, [
                      { label: "Candidate Name", name: "candidateName", type: "text", placeholder: c.name },
                      { label: "Target Position", name: "role", type: "text", placeholder: "Graduate Software Engineer" },
                      { label: "Interview Round", name: "round", type: "text", placeholder: "Technical Screening" },
                      { label: "Interviewer", name: "interviewer", type: "text", placeholder: "Lead Architect" }
                    ]);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition cursor-pointer"
                >
                  Schedule Interview
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedCandidateModal && (
          <div className="fixed inset-0 z-50 backdrop-blur-md bg-slate-950/70 flex items-center justify-center p-4">
            <div className={`max-w-md w-full rounded-2xl border p-6 space-y-4 shadow-2xl ${cardClass}`}>
              <div className="flex items-center justify-between border-b pb-3 border-slate-700/40">
                <h3 className={`text-base font-bold ${textHeading}`}>Candidate Resume & ATS Profile</h3>
                <button onClick={() => setSelectedCandidateModal(null)} className="text-slate-400 hover:text-white text-lg font-bold">×</button>
              </div>
              <div className="space-y-2 text-xs">
                <div><span className={textMuted}>Name:</span> <span className="font-bold">{selectedCandidateModal.name}</span></div>
                <div><span className={textMuted}>Email:</span> <span className="font-mono text-blue-400">{selectedCandidateModal.email}</span></div>
                <div><span className={textMuted}>University:</span> <span className="font-bold">{selectedCandidateModal.college}</span></div>
                <div><span className={textMuted}>Degree:</span> <span>{selectedCandidateModal.degree}</span></div>
                <div><span className={textMuted}>AI Match Fit:</span> <span className="font-bold text-emerald-400">{selectedCandidateModal.matchScore}%</span></div>
                <div className="pt-2"><span className={textMuted}>Verified Skills:</span></div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidateModal.skills.map((s, idx) => (
                    <span key={idx} className="bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded text-[10px] font-bold">{s}</span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-slate-700/40 flex justify-between items-center">
                <button 
                  onClick={() => {
                    onShowToast(`Downloading ATS resume for ${selectedCandidateModal.name}`);
                    setSelectedCandidateModal(null);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-600/40 text-xs font-semibold flex items-center gap-1.5"
                >
                  <FiDownload className="w-3.5 h-3.5" /> Download PDF
                </button>
                <button onClick={() => setSelectedCandidateModal(null)} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs">Close</button>
              </div>
            </div>
          </div>
        )}

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
  }

  // 3. APPLICATIONS PIPELINE
  if (activeSubView === 'applications') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiFileText className="w-5 h-5 text-blue-500" /> Candidate Application Pipeline
            </h2>
            <p className={textMuted}>Track candidate lifecycle stages from screening to offer rollout</p>
          </div>
          <button 
            onClick={() => onShowToast("Exported application records to CSV")}
            className="px-3 py-2 rounded-xl border border-slate-600/40 hover:border-blue-500 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <FiDownload className="w-3.5 h-3.5" /> Export Funnel
          </button>
        </div>

        <div className="space-y-3">
          {applicationsList.map((app) => (
            <div key={app.id} className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${subCardClass}`}>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className={`font-bold text-sm ${textHeading}`}>{app.applicantName}</h4>
                  <span className="text-[10px] font-mono text-slate-400">({app.id})</span>
                </div>
                <div className="text-blue-400 font-semibold text-[11px] mt-0.5">{app.position}</div>
                <div className={`text-[10px] ${textMuted} mt-0.5`}>Applied on {app.appliedDate} • Evaluation: {app.score}</div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${
                  app.stage === 'Offer Sent'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : app.stage === 'Technical Round' || app.stage === 'HR Round'
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    : 'bg-slate-500/20 text-slate-300 border-slate-500/30'
                }`}>
                  {app.stage}
                </span>

                <button
                  onClick={() => {
                    const nextStage = app.stage === 'Screening' ? 'Technical Round' : app.stage === 'Technical Round' ? 'HR Round' : 'Offer Sent';
                    const updated = applicationsList.map(a => a.id === app.id ? { ...a, stage: nextStage as any } : a);
                    updateMutation.mutate({ applications: updated });
                    onShowToast(`Advanced ${app.applicantName} to ${nextStage}!`);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition cursor-pointer"
                >
                  Advance Stage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4. INTERVIEWS
  if (activeSubView === 'interviews') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiCalendar className="w-5 h-5 text-blue-500" /> Scheduled Candidate Interviews & Panels
            </h2>
            <p className={textMuted}>Technical assessments, leadership rounds, and live interview rooms</p>
          </div>
          <button 
            onClick={() => openTriggerModal("Schedule Interview", "Book a virtual interview panel slot", [
              { label: "Candidate Name", name: "candidateName", type: "text", placeholder: "e.g. Sneha Kulkarni" },
              { label: "Role Position", name: "role", type: "text", placeholder: "e.g. AI Engineering Intern" },
              { label: "Interview Round", name: "round", type: "text", placeholder: "e.g. Machine Learning Deep Dive" },
              { label: "Interviewer Panel", name: "interviewer", type: "text", placeholder: "e.g. Dr. Ananya Roy" },
              { label: "Interview Date", name: "date", type: "text", placeholder: "e.g. March 18, 2026" },
              { label: "Time Slot", name: "time", type: "text", placeholder: "e.g. 11:00 AM" }
            ])}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            <FiPlus className="w-4 h-4" /> Schedule Interview
          </button>
        </div>

        <div className="space-y-3">
          {interviewsList.map((int) => (
            <div key={int.id} className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${subCardClass} transition hover:shadow-md`}>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className={`font-bold text-sm ${textHeading}`}>{int.candidateName}</h4>
                  <span className="text-blue-400 font-semibold text-xs">• {int.role}</span>
                </div>
                <div className="text-blue-500 font-semibold text-[11px] mt-0.5">{int.round}</div>
                <div className={`text-[10px] ${textMuted} mt-0.5`}>
                  Interviewer: {int.interviewer} • Scheduled for {int.date} at {int.time}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${
                  int.status === 'Completed'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                }`}>
                  {int.status}
                </span>
                <button
                  onClick={() => onShowToast(`Entering meeting room for ${int.candidateName}`)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition cursor-pointer"
                >
                  Join Meeting Room
                </button>
              </div>
            </div>
          ))}
        </div>

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
  }

  // 5. EMPLOYEES / WORKFORCE
  if (activeSubView === 'employees') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiUsers className="w-5 h-5 text-blue-500" /> Internal Workforce & Team Directory
            </h2>
            <p className={textMuted}>Corporate team members, technical interviewers, and campus recruiting leads</p>
          </div>
          <button 
            onClick={() => openTriggerModal("Onboard Employee", "Add a new company hiring manager or engineer", [
              { label: "Full Name", name: "name", type: "text", placeholder: "e.g. Vikram Mehta" },
              { label: "Department", name: "department", type: "text", placeholder: "e.g. Core Engineering" },
              { label: "Designation", name: "designation", type: "text", placeholder: "e.g. Staff Software Engineer" },
              { label: "Corporate Email", name: "email", type: "email", placeholder: "e.g. v.mehta@enterprise.com" }
            ])}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            <FiPlus className="w-4 h-4" /> Onboard Employee
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {employeesList.map((emp) => (
            <div key={emp.id} className={`p-5 rounded-2xl border space-y-2 ${subCardClass} transition hover:shadow-md`}>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={`font-bold text-sm ${textHeading}`}>{emp.name}</h4>
                  <div className="text-blue-400 font-semibold text-[11px]">{emp.designation}</div>
                  <div className={`text-[10px] ${textMuted}`}>{emp.department} • Joined {emp.joinedDate}</div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/30">
                  {emp.status}
                </span>
              </div>
              <div className="text-[11px] pt-1">
                <span className={textMuted}>Work Email:</span> <span className="font-mono text-blue-500">{emp.email}</span>
              </div>
            </div>
          ))}
        </div>

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
  }

  // 6. RECRUITMENT / CAMPUS DRIVES
  if (activeSubView === 'recruitment') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiTrendingUp className="w-5 h-5 text-blue-500" /> Campus Recruitment Drives & University MoUs
            </h2>
            <p className={textMuted}>On-campus recruitment schedules, academic partnerships, and hiring funnel velocity</p>
          </div>
          <button 
            onClick={() => openTriggerModal("Register Campus Drive", "Schedule recruitment drive with an accredited institution", [
              { label: "University / Institute", name: "college", type: "text", placeholder: "e.g. IIT Bombay" },
              { label: "Drive Program Type", name: "type", type: "text", placeholder: "e.g. SDE-1 Graduate Drive 2026" }
            ])}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            <FiPlus className="w-4 h-4" /> Register Campus Drive
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {partnershipsList.map((p, idx) => (
            <div key={idx} className={`p-5 rounded-2xl border space-y-2 ${subCardClass} transition hover:shadow-md hover:border-blue-500`}>
              <div className="flex items-start justify-between">
                <h4 className={`font-bold text-sm ${textHeading}`}>{p.college}</h4>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                  {p.status}
                </span>
              </div>
              <div className="text-blue-400 font-semibold text-[11px]">{p.type}</div>
              <div className="text-[10px] text-slate-400">MoU Period: {p.mouYear} • {p.studentsHired}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3 pt-2">
          <h3 className={`font-bold text-sm ${textHeading}`}>Talent Funnel Velocity</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { stage: "Sourced Candidates", count: "540", sub: "From 5 Universities" },
              { stage: "Online Assessments Cleared", count: "182", sub: "Aptitude & Coding" },
              { stage: "Technical Cleared", count: "64", sub: "System Design + DS" },
              { stage: "Offers Accepted", count: "38", sub: "Batch 2026 Joined" }
            ].map((st, i) => (
              <div key={i} className={`p-4 rounded-xl border space-y-1 ${subCardClass}`}>
                <span className={`text-[11px] ${textMuted}`}>{st.stage}</span>
                <div className="text-2xl font-bold text-blue-400">{st.count}</div>
                <span className="text-[10px] text-emerald-400 font-semibold">{st.sub}</span>
              </div>
            ))}
          </div>
        </div>

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
  }

  // 7. REPORTS / ANALYTICS
  if (activeSubView === 'reports') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiFileText className="w-5 h-5 text-blue-500" /> Corporate Hiring & Recruitment Analytics
            </h2>
            <p className={textMuted}>Executive talent acquisition intelligence, cost per hire, and offer clearance ratios</p>
          </div>
          <button 
            onClick={() => onShowToast("Generated full Talent Acquisition PDF Report")}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <FiDownload className="w-4 h-4" /> Download Hiring Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Average Time-to-Hire", val: "18 Days", sub: "Industry standard: 35 days" },
            { label: "Offer Acceptance Rate", val: "86.4%", sub: "High candidate sentiment" },
            { label: "Sourcing Channel Quality", val: "94/100", sub: "Top tier campus talent" },
            { label: "Cost-per-Hire Savings", val: "42%", sub: "Via Role Ready automated ATS" }
          ].map((stat, i) => (
            <div key={i} className={`p-4 rounded-xl border space-y-1 ${subCardClass}`}>
              <span className={`text-[11px] ${textMuted}`}>{stat.label}</span>
              <div className="text-2xl font-bold text-blue-400">{stat.val}</div>
              <span className="text-[10px] text-emerald-400 font-semibold">{stat.sub}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 8. MESSAGES
  if (activeSubView === 'messages') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`pb-4 border-b ${borderDivider}`}>
          <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
            <FiMessageSquare className="w-5 h-5 text-blue-500" /> Candidate & University Placement Cell Desk
          </h2>
          <p className={textMuted}>Direct communication channel for shortlists, interview arrangements, and offer queries</p>
        </div>

        <div className={`p-4 rounded-xl border space-y-3 min-h-[220px] max-h-[300px] overflow-y-auto ${subCardClass}`}>
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                <span className="font-semibold">{msg.sender}</span>
                <span>• {msg.time}</span>
              </div>
              <div className={`p-3 rounded-2xl max-w-sm text-xs ${
                msg.isMe 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : isDarkMode ? 'bg-slate-700 text-white rounded-tl-none' : 'bg-white border text-slate-900 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="text"
            placeholder="Type your message to candidate or placement cell..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className={`flex-1 px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-500 ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
          >
            <FiSend className="w-3.5 h-3.5" /> Send
          </button>
        </div>
      </div>
    );
  }

  // 9. NOTIFICATIONS
  if (activeSubView === 'notifications') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiBell className="w-5 h-5 text-blue-500" /> Notifications & Recruitment Alerts
            </h2>
            <p className={textMuted}>New applications, interview confirmations, and offer status updates</p>
          </div>
          <button onClick={() => onShowToast("Marked all notifications as read")} className="text-blue-400 font-bold hover:underline cursor-pointer">
            Mark All as Read
          </button>
        </div>

        <div className="space-y-3">
          {[
            { title: "Arjun Das accepted technical interview slot for Tomorrow at 14:30 PM", time: "15 mins ago", tag: "Interview" },
            { title: "12 New Applications submitted for Graduate SDE-1 Position", time: "1 hour ago", tag: "Job Portal" },
            { title: "IIT Bombay placement office confirmed Campus Drive MoU", time: "4 hours ago", tag: "Campus MoU" }
          ].map((nt, i) => (
            <div key={i} className={`p-4 rounded-xl border flex items-center justify-between ${subCardClass}`}>
              <div>
                <h4 className={`font-bold ${textHeading}`}>{nt.title}</h4>
                <span className="text-blue-400 font-semibold">{nt.tag} • {nt.time}</span>
              </div>
              <span className="text-[10px] bg-blue-600/20 text-blue-400 px-2.5 py-0.5 rounded-full font-bold border border-blue-500/30">New</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 10. SETTINGS
  if (activeSubView === 'settings') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiSliders className="w-5 h-5 text-blue-500" /> Company Settings & Employer Governance
            </h2>
            <p className={textMuted}>Configure enterprise corporate profile, employer branding, and ATS integration settings</p>
          </div>
          <button 
            onClick={() => onShowToast("Enterprise settings saved successfully!")}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
          >
            Save Settings
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-5 rounded-xl border space-y-2 ${subCardClass}`}>
            <h4 className={`font-bold text-sm ${textHeading}`}>Enterprise Employer Verification</h4>
            <p className={textMuted}>Corporate Registration: CIN-U72200KA2021PTC • GSTIN Verified</p>
            <div className="text-[11px] font-bold text-emerald-400">Employer Badge: Tier-1 Verified Partner</div>
          </div>
          <div className={`p-5 rounded-xl border space-y-2 ${subCardClass}`}>
            <h4 className={`font-bold text-sm ${textHeading}`}>Campus Recruitment Automation</h4>
            <p className={textMuted}>AI Matching Threshold: 85% • Automated Screening Tests Enabled</p>
            <div className="text-[11px] font-bold text-blue-400">ATS Synchronization Active</div>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT: OVERVIEW / DASHBOARD
  return (
    <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
      <div className={`pb-4 border-b ${borderDivider}`}>
        <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
          <FiGrid className="w-5 h-5 text-blue-500" /> Enterprise Company Portal Overview
        </h2>
        <p className={textMuted}>Corporate recruitment drives, campus talent sourcing, candidate pipeline, and hiring conversion tracks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Job Requisitions")}>
          <span className={`font-semibold block ${textMuted}`}>Active Job Requisitions</span>
          <div className="text-2xl font-bold text-blue-400 mt-1">{jobsList.length}</div>
          <span className={`text-[10px] ${textMuted}`}>{jobsList.reduce((acc, j) => acc + j.openings, 0)} Total Openings</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Applications")}>
          <span className={`font-semibold block ${textMuted}`}>Candidate Applications</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{applicationsList.length}</div>
          <span className={`text-[10px] ${textMuted}`}>In Active Funnel</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Scheduled Interviews")}>
          <span className={`font-semibold block ${textMuted}`}>Scheduled Interviews</span>
          <div className="text-2xl font-bold text-blue-400 mt-1">{interviewsList.length}</div>
          <span className={`text-[10px] ${textMuted}`}>Active Panels</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Partner Universities")}>
          <span className={`font-semibold block ${textMuted}`}>Campus MoUs</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{partnershipsList.length}</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-bold">
            <FiTrendingUp className="w-3 h-3" /> Tier-1 University MoUs
          </span>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className={`font-bold text-sm ${textHeading}`}>Recent Requisitions & Campus Openings</h3>
          <span className={`text-[11px] ${textMuted}`}>{jobsList.length} Open Positions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobsList.slice(0, 4).map((job) => (
            <div key={job.id} className={`p-4 rounded-xl border space-y-2 ${subCardClass}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={`font-bold ${textHeading}`}>{job.title}</h4>
                  <div className="text-blue-400 text-[11px] font-semibold">{job.department} • {job.location}</div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                  {job.status}
                </span>
              </div>
              <div className="flex justify-between text-[11px] pt-1">
                <span className={textMuted}>Type: {job.type}</span>
                <span className="font-semibold text-blue-500">{job.applicants} Applicants</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

