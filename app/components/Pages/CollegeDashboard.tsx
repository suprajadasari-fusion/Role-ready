import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  FiBookOpen, 
  FiUserCheck, 
  FiFileText, 
  FiAward, 
  FiBriefcase, 
  FiTrendingUp, 
  FiPlus, 
  FiSearch, 
  FiDownload, 
  FiEye, 
  FiCheck, 
  FiX, 
  FiClock, 
  FiGrid, 
  FiDollarSign,
  FiSliders,
  FiBell,
  FiCalendar
} from 'react-icons/fi';
import { ActionModal } from '../ActionModal';
import { StudentToolsViews } from '../StudentToolsViews';
import { collegeService, CollegeProgram, CollegeDrive, CollegePartner, CollegeApplication } from '../../services/collegeService';

interface CollegeDashboardProps {
  activeSubView: string;
  onShowToast: (msg: string) => void;
  isDarkMode: boolean;
}

export const CollegeDashboard: React.FC<CollegeDashboardProps> = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const queryClient = useQueryClient();

  // Modal Action State
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState<{ title: string; subtitle: string; fields: any[] }>({
    title: '',
    subtitle: '',
    fields: []
  });

  // Query live college data from backend
  const { data: collegeData, isLoading } = useQuery({
    queryKey: ['collegeData'],
    queryFn: () => collegeService.getCollegeData()
  });

  const programsList: CollegeProgram[] = collegeData?.programs || [];
  const drivesList: CollegeDrive[] = collegeData?.drives || [];
  const partnersList: CollegePartner[] = collegeData?.partners || [];
  const applicationsList: CollegeApplication[] = collegeData?.applications || [];

  const updateMutation = useMutation({
    mutationFn: (updates: {
      programs?: CollegeProgram[];
      drives?: CollegeDrive[];
      partners?: CollegePartner[];
      applications?: CollegeApplication[];
    }) => collegeService.updateCollegeData(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collegeData'] });
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
    if (actionModalConfig.title === "Add Academic Program") {
      const newProg: CollegeProgram = {
        code: `PRG-${Math.floor(100 + Math.random() * 900)}`,
        title: data.title || "Specialized Tech Degree",
        degree: data.degree || "Undergraduate (4 Yrs)",
        seats: parseInt(data.seats) || 120,
        enrolled: 0,
        avgCtc: data.avgCtc || "₹20.0 LPA"
      };
      const updatedPrograms = [newProg, ...programsList];
      updateMutation.mutate({ programs: updatedPrograms });
      onShowToast(`Added new academic program: ${newProg.title}!`);
    } else if (actionModalConfig.title === "Schedule Placement Drive") {
      const newDrive: CollegeDrive = {
        company: data.company || "Corporate Recruiter",
        role: data.role || "Graduate Software Engineer",
        ctc: data.ctc || "₹14.0 LPA",
        applicants: "0 Students",
        status: "Registrations Open"
      };
      const updatedDrives = [newDrive, ...drivesList];
      updateMutation.mutate({ drives: updatedDrives });
      collegeService.savePlacementDrive(newDrive).catch(() => {});
      onShowToast(`Scheduled campus placement drive for ${newDrive.company}!`);
    } else if (actionModalConfig.title === "Register Corporate Partner") {
      const newPartner: CollegePartner = {
        company: data.company || "Enterprise Tech Partner",
        track: data.track || "Industry Internship Track",
        mou: "Active (Campus MoU Signed)",
        status: "Active Partner"
      };
      const updatedPartners = [newPartner, ...partnersList];
      updateMutation.mutate({ partners: updatedPartners });
      onShowToast(`Registered corporate partner: ${newPartner.company}!`);
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
              <span className="text-[13px] font-medium block text-slate-300">Degree Programs</span>
              <div className="text-[28px] md:text-[32px] font-bold text-white leading-none tracking-[-0.02em]">{programsList.length} Tracks</div>
              <span className="text-[12px] font-semibold text-[#E4F4EC] bg-[#E4F4EC]/10 px-2.5 py-0.5 rounded-full inline-block">Active Academics</span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift">
              <span className="text-[13px] font-medium block text-[#4B5563]">Applications</span>
              <div className="text-[28px] md:text-[32px] font-bold text-[#12163A] leading-none tracking-[-0.02em]">{applicationsList.length}</div>
              <span className="text-[12px] font-semibold text-[#3665EE]">Admissions Pipeline</span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift">
              <span className="text-[13px] font-medium block text-[#4B5563]">Placement Drives</span>
              <div className="text-[28px] md:text-[32px] font-bold text-[#3665EE] leading-none tracking-[-0.02em]">{drivesList.length} Drives</div>
              <span className="text-[12px] font-semibold text-[#12163A]">Corporate Recruitment</span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift">
              <span className="text-[13px] font-medium block text-[#4B5563]">Corporate Partners</span>
              <div className="text-[28px] md:text-[32px] font-bold text-[#12163A] leading-none tracking-[-0.02em]">{partnersList.length} MoUs</div>
              <span className="text-[12px] font-semibold text-[#3665EE]">Active Collaborations</span>
            </div>
          </div>

          {/* Registration & Accreditation Status */}
          <div className={`p-6 rounded-[24px] border space-y-4 ${cardClass}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className={`text-[16px] md:text-[18px] font-semibold ${textHeading}`}>College Registration & Institutional Accreditation</h3>
                <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal mt-1`}>Role Ready Verified Higher Education Institution Portal</p>
              </div>
              <span className="bg-[#E4F4EC] text-[#12163A] font-semibold text-[12px] px-3.5 py-1 rounded-full border border-[#C3E6D5] self-start sm:self-auto">
                ✓ Verification Completed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-[20px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-1">
                <span className="text-[13px] font-medium text-[#4B5563]">Admissions Pipeline</span>
                <div className="text-[20px] md:text-[22px] font-bold text-[#3665EE]">{applicationsList.length} Applications</div>
                <span className="text-[12px] text-[#4B5563] block">Live Student Pipeline</span>
              </div>

              <div className="p-4 rounded-[20px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A] space-y-1">
                <span className="text-[13px] font-medium text-[#4B5563]">Corporate Placement Drives</span>
                <div className="text-[20px] md:text-[22px] font-bold text-[#12163A]">{drivesList.length} Active Drives</div>
                <span className="text-[12px] text-[#4B5563] block">Campus Recruitment Desk</span>
              </div>

              <div className="p-4 rounded-[20px] bg-[#E4F4EC] border border-[#C3E6D5] text-[#12163A] space-y-1">
                <span className="text-[13px] font-medium text-[#4B5563]">Industry MoUs Active</span>
                <div className="text-[20px] md:text-[22px] font-bold text-[#12163A]">{partnersList.length} Active MoUs</div>
                <span className="text-[12px] text-[#3665EE] font-medium block">Industry Tech Partners</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 2. STUDENTS MANAGEMENT
    if (activeSubView === 'students') {
      const enrolledStudents = [
        { id: "COL-STU-01", name: "Aarav Sharma", dept: "Computer Science & Engineering", year: "Final Year (Sem 7)", gpa: "9.2 CGPA", placementStatus: "Placed (Microsoft)", ctc: "₹24.0 LPA" },
        { id: "COL-STU-02", name: "Priya Nair", dept: "Electronics & Communication", year: "Final Year (Sem 7)", gpa: "8.9 CGPA", placementStatus: "Placed (Qualcomm)", ctc: "₹18.5 LPA" },
        { id: "COL-STU-03", name: "Rohan Patel", dept: "Mechanical Engineering", year: "Third Year (Sem 5)", gpa: "8.4 CGPA", placementStatus: "Internship Active", ctc: "₹45,000 / mo" },
        { id: "COL-STU-04", name: "Kavya Menon", dept: "Information Technology", year: "Final Year (Sem 7)", gpa: "9.1 CGPA", placementStatus: "Shortlisted (Google)", ctc: "Under Review" }
      ];

      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiBookOpen className="w-5 h-5 text-[#3665EE]" /> Enrolled Student Management & Academic Records
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>
                Filter by academic department, semester, and placement readiness status
              </p>
            </div>
            <button
              onClick={() => onShowToast("Exported enrolled student registry to CSV")}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#3665EE] text-white hover:bg-[#2A54D5] cursor-pointer"
            >
              Export Registry
            </button>
          </div>

          <div className="rounded-2xl border border-slate-700/60 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#DEE9FF]/40 text-[#12163A] uppercase text-[11px] font-bold border-b border-[#C6D9FF]">
                <tr>
                  <th className="p-3.5">Roll / ID</th>
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Year / Sem</th>
                  <th className="p-3.5">CGPA</th>
                  <th className="p-3.5">Placement Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40 text-[13px]">
                {enrolledStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/20">
                    <td className="p-3.5 font-mono text-blue-400 font-semibold">{s.id}</td>
                    <td className={`p-3.5 font-semibold ${textHeading}`}>{s.name}</td>
                    <td className={`p-3.5 ${textMuted}`}>{s.dept}</td>
                    <td className={`p-3.5 ${textMuted}`}>{s.year}</td>
                    <td className="p-3.5 font-bold text-emerald-400">{s.gpa}</td>
                    <td className="p-3.5">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                        {s.placementStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // 2B. DEPARTMENTS MANAGEMENT
    if (activeSubView === 'departments') {
      const departments = [
        { name: "Computer Science & Engineering", code: "CSE", head: "Dr. K. R. Raman", facultyCount: 42, studentsCount: 480, labs: 8 },
        { name: "Electronics & Communication", code: "ECE", head: "Dr. S. Mukherjee", facultyCount: 34, studentsCount: 360, labs: 6 },
        { name: "Information Technology", code: "IT", head: "Dr. V. Sundaram", facultyCount: 28, studentsCount: 240, labs: 5 },
        { name: "Mechanical Engineering", code: "ME", head: "Dr. R. K. Nair", facultyCount: 30, studentsCount: 280, labs: 7 }
      ];

      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`pb-4 border-b ${borderDivider}`}>
            <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
              <FiGrid className="w-5 h-5 text-[#3665EE]" /> Academic Department & Faculty Management
            </h2>
            <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>
              Academic divisions, faculty heads, student strength, and research laboratories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departments.map((d, idx) => (
              <div key={idx} className={`p-5 rounded-2xl border ${subCardClass} space-y-3`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-[#3665EE] text-white px-2.5 py-0.5 rounded-md">{d.code}</span>
                  <span className={`text-xs ${textMuted}`}>{d.facultyCount} Faculty Members</span>
                </div>
                <h4 className={`text-base font-semibold ${textHeading}`}>{d.name}</h4>
                <p className={`text-xs ${textMuted}`}>Department Head: <strong className="text-slate-200">{d.head}</strong></p>
                <div className="pt-2 border-t border-slate-700/40 flex justify-between text-xs">
                  <span>Enrolled: <strong>{d.studentsCount} Students</strong></span>
                  <span>Research Labs: <strong>{d.labs} Labs</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 2C. PROGRAMS & COURSES
    if (activeSubView === 'programs' || activeSubView === 'courses') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiBookOpen className="w-5 h-5 text-[#3665EE]" /> Academic Programs & Degree Tracks
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Manage undergraduate, postgraduate, and doctoral degree programs</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Add Academic Program", "Register a new degree track or specialized program", [
                { label: "Program Title", name: "title", type: "text", placeholder: "B.Tech Computer Science & AI" },
                { label: "Degree Level", name: "degree", type: "text", placeholder: "Undergraduate (4 Yrs)" },
                { label: "Seat Capacity", name: "seats", type: "number", placeholder: "120" },
                { label: "Expected Avg CTC", name: "avgCtc", type: "text", placeholder: "₹20.0 LPA" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-4 h-4" /> Add Academic Program
            </button>
          </div>

          {programsList.length === 0 ? (
            <div className="py-12 text-center text-[13px] text-slate-400">
              <FiBookOpen className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
              No academic programs added yet. Click '+ Add Academic Program' to publish a degree track.
            </div>
          ) : (
            <div className="space-y-3">
              {programsList.map((p, i) => (
                <div key={i} className="p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-md font-semibold">{p.code}</span>
                      <h4 className="text-[16px] font-semibold text-[#12163A]">{p.title}</h4>
                    </div>
                    <p className="text-[13px] text-[#4B5563] mt-1">{p.degree} • Enrolled: {p.enrolled} / {p.seats} Seats</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[#3665EE] font-bold text-[16px]">Avg CTC: {p.avgCtc}</div>
                    <span className="text-[12px] bg-white text-[#12163A] border border-slate-200 px-3 py-1 rounded-full font-semibold block mt-1">Active Track</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // 3. ADMISSIONS
    if (activeSubView === 'admissions') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiUserCheck className="w-5 h-5 text-[#3665EE]" /> College Admissions & Entrance Cutoff Hub
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Configure admission drives, entrance examination cutoffs, & quotas</p>
            </div>
          </div>

          <div className="py-12 text-center text-[13px] text-slate-400">
            <FiUserCheck className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
            Admissions cycles are synchronized with registered academic programs.
          </div>
        </div>
      );
    }

    // 4. APPLICATIONS
    if (activeSubView === 'applications') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiFileText className="w-5 h-5 text-[#3665EE]" /> Student Application & Enrollment Pipeline
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Review student applications and admission status</p>
            </div>
            {applicationsList.length > 0 && (
              <button 
                onClick={() => {
                  const headers = ["Application ID", "Student Name", "Program Applied", "Entrance Score", "Document Status", "Application Status"];
                  const rows = applicationsList.map(a => [a.id, `"${a.name}"`, `"${a.program}"`, `"${a.score}"`, `"${a.docs}"`, `"${a.status}"`]);
                  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
                  const link = document.createElement("a");
                  link.setAttribute("href", encodeURI(csvContent));
                  link.setAttribute("download", `college-applications-${new Date().toISOString().slice(0,10)}.csv`);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  onShowToast("Downloaded Applications Pipeline CSV!");
                }}
                className="px-4 py-2 rounded-xl text-[14px] font-semibold border border-slate-200 bg-slate-50 text-[#12163A] hover:bg-slate-100 transition cursor-pointer flex items-center gap-2"
              >
                <FiDownload className="w-4 h-4" /> Export Applications
              </button>
            )}
          </div>

          {applicationsList.length === 0 ? (
            <div className="py-12 text-center text-[13px] text-slate-400">
              <FiFileText className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
              No student applications in pipeline yet.
            </div>
          ) : (
            <div className="rounded-[24px] border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-[12px] font-semibold uppercase bg-[#DEE9FF]/50 text-[#12163A] border-[#C6D9FF]">
                    <th className="p-3.5">Application ID</th>
                    <th className="p-3.5">Student Name</th>
                    <th className="p-3.5">Program Applied</th>
                    <th className="p-3.5">Entrance Score</th>
                    <th className="p-3.5">Document Status</th>
                    <th className="p-3.5">Application Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[14px]">
                  {applicationsList.map((app) => (
                    <tr key={app.id} className="hover:bg-[#DEE9FF]/20 transition-colors">
                      <td className="p-3.5 font-mono text-[#3665EE] font-semibold text-[13px]">{app.id}</td>
                      <td className="p-3.5 font-semibold text-[#12163A]">{app.name}</td>
                      <td className="p-3.5 text-[#4B5563]">{app.program}</td>
                      <td className="p-3.5 font-medium text-[#12163A]">{app.score}</td>
                      <td className="p-3.5 font-medium text-emerald-600">{app.docs}</td>
                      <td className="p-3.5">
                        <span className="bg-[#E4F4EC] text-[#12163A] border border-[#C3E6D5] px-2.5 py-0.5 rounded-full font-semibold text-[12px]">
                          {app.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button 
                          onClick={() => onShowToast(`Reviewed application for ${app.name}`)}
                          className="bg-[#12163A] hover:bg-[#1A2050] text-white font-semibold px-3 py-1.5 rounded-lg text-[12px] transition cursor-pointer"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    }

    // 5. SCHOLARSHIPS
    if (activeSubView === 'scholarships') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiAward className="w-5 h-5 text-[#3665EE]" /> Institutional Scholarship & Aid Cell
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Institutional merit aid and corporate scholarship grants</p>
            </div>
          </div>

          <div className="py-12 text-center text-[13px] text-slate-400">
            <FiAward className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
            Scholarship schemes are matched dynamically with qualified student applicants.
          </div>
        </div>
      );
    }

    // 6. PLACEMENT CELL & CAMPUS DRIVES
    if (activeSubView === 'placement-cell' || activeSubView === 'placements' || activeSubView === 'jobs' || activeSubView === 'drives') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiBriefcase className="w-5 h-5 text-[#3665EE]" /> Campus Placement Cell & Corporate Recruitment Hub
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Manage corporate placement drives, CTC packages, & applicant rosters</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Schedule Placement Drive", "Publish a new corporate recruiting drive", [
                { label: "Company Name", name: "company", type: "text", placeholder: "Microsoft India" },
                { label: "Job Role Title", name: "role", type: "text", placeholder: "Software Development Engineer" },
                { label: "Annual CTC Package", name: "ctc", type: "text", placeholder: "₹24.0 LPA" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-4 h-4" /> Schedule Placement Drive
            </button>
          </div>

          {drivesList.length === 0 ? (
            <div className="py-12 text-center text-[13px] text-slate-400">
              <FiBriefcase className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
              No campus placement drives scheduled yet. Click '+ Schedule Placement Drive' to invite companies.
            </div>
          ) : (
            <div className="space-y-3">
              {drivesList.map((d, i) => (
                <div key={i} className="p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift">
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#12163A]">{d.company}</h4>
                    <span className="text-[#3665EE] text-[13px] font-medium">{d.role}</span>
                    <div className="text-[13px] text-[#4B5563] mt-0.5">{d.applicants}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#12163A] font-bold text-[16px]">{d.ctc}</div>
                    <span className="text-[12px] bg-white border border-slate-200 text-[#12163A] px-3 py-1 rounded-full font-semibold block mt-1">{d.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // 7. INDUSTRY CONNECT
    if (activeSubView === 'industry-connect') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiBriefcase className="w-5 h-5 text-[#3665EE]" /> Industry Connect & Enterprise MoUs
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Corporate partnerships, R&D labs, and summer/winter internship tracks</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Register Corporate Partner", "Sign a new campus recruiting MoU", [
                { label: "Company Name", name: "company", type: "text", placeholder: "NVIDIA Graphics India" },
                { label: "Internship / MoU Track", name: "track", type: "text", placeholder: "AI Hardware & CUDA Labs" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-4 h-4" /> Register Corporate Partner
            </button>
          </div>

          {partnersList.length === 0 ? (
            <div className="py-12 text-center text-[13px] text-slate-400">
              <FiBriefcase className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
              No industry corporate partners registered yet. Click '+ Register Corporate Partner' to add partner MoUs.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partnersList.map((pr, i) => (
                <div key={i} className="p-5 rounded-[24px] border bg-[#F6E6D8] border-[#EAD0BC] space-y-2 text-[#12163A] hover-card-lift">
                  <span className="text-[12px] bg-[#12163A] text-white px-3 py-0.5 rounded-full font-semibold">{pr.status}</span>
                  <h4 className="text-[16px] font-semibold text-[#12163A] mt-1">{pr.company}</h4>
                  <p className="text-[13px] text-[#3665EE] font-medium">{pr.track}</p>
                  <div className="text-[13px] text-[#4B5563]">{pr.mou}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // 7B. EVENTS & WORKSHOPS
    if (activeSubView === 'events') {
      const events = [
        { title: "Annual Tech Innovation Hackathon 2026", date: "September 24-25, 2026", type: "Hackathon", venue: "Auditorium & Innovation Hub", registered: "128 Teams" },
        { title: "Industry AI Keynote: LLMs in Production", date: "October 02, 2026", type: "Guest Lecture", venue: "Virtual Webinar Room", registered: "450 Students" },
        { title: "Autumn Career & Internship Fair", date: "October 15, 2026", type: "Career Fair", venue: "Campus Convention Center", registered: "45 Corporate Partners" }
      ];

      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`pb-4 border-b ${borderDivider}`}>
            <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
              <FiCalendar className="w-5 h-5 text-[#3665EE]" /> Campus Events, Hackathons & Guidance Workshops
            </h2>
            <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>
              Technical hackathons, guest lectures, industry symposiums, and career fairs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((ev, idx) => (
              <div key={idx} className={`p-5 rounded-2xl border ${subCardClass} space-y-3 flex flex-col justify-between`}>
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold uppercase text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">{ev.type}</span>
                  <h4 className={`text-base font-semibold ${textHeading}`}>{ev.title}</h4>
                  <p className={`text-xs ${textMuted}`}>Date: {ev.date}</p>
                  <p className={`text-xs ${textMuted}`}>Venue: {ev.venue}</p>
                </div>
                <div className="pt-2 border-t border-slate-700/40 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-400">{ev.registered}</span>
                  <button onClick={() => onShowToast(`Registered for ${ev.title}`)} className="text-xs text-blue-400 font-semibold hover:underline cursor-pointer">
                    Manage Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 8. ANALYTICS & REPORTS
    if (activeSubView === 'analytics' || activeSubView === 'reports') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`pb-4 border-b ${borderDivider}`}>
            <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
              <FiTrendingUp className="w-5 h-5 text-[#3665EE]" /> Institutional Performance & Placement Reports
            </h2>
            <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Placement trends and corporate recruitment distributions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]">
              <span className="text-[13px] font-medium text-[#4B5563]">Academic Programs</span>
              <div className="text-[28px] md:text-[32px] font-bold text-[#12163A] leading-none my-1">{programsList.length}</div>
            </div>
            <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]">
              <span className="text-[13px] font-medium text-[#4B5563]">Placement Drives</span>
              <div className="text-[28px] md:text-[32px] font-bold text-[#3665EE] leading-none my-1">{drivesList.length}</div>
            </div>
            <div className="p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]">
              <span className="text-[13px] font-medium text-[#4B5563]">Corporate Partners</span>
              <div className="text-[28px] md:text-[32px] font-bold text-[#12163A] leading-none my-1">{partnersList.length}</div>
            </div>
          </div>
        </div>
      );
    }

    // 9. NOTIFICATIONS
    if (activeSubView === 'notifications') {
      return (
        <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
            <div>
              <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
                <FiBell className="w-5 h-5 text-[#3665EE]" /> College Admin Notifications & Announcements
              </h2>
              <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Placement deadlines, MoU updates, and institutional accreditation alerts</p>
            </div>
            <button onClick={() => onShowToast("Marked all notifications as read")} className="text-[#3665EE] text-[14px] font-semibold hover:underline cursor-pointer">
              Mark All as Read
            </button>
          </div>

          <div className="py-8 text-center text-[13px] text-slate-400">
            No active institutional alerts at this time.
          </div>
        </div>
      );
    }

    // 10. SETTINGS
    return (
      <div className={`rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`}>
        <div className={`pb-4 border-b ${borderDivider}`}>
          <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
            <FiSliders className="w-5 h-5 text-[#3665EE]" /> College Governance & System Settings
          </h2>
          <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Configure institutional profile, academic year, campus settings, & user permissions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]">
            <h4 className="text-[16px] font-semibold text-[#12163A]">University Profile</h4>
            <p className="text-[13px] text-[#4B5563]">Higher Education Degree College Institution Desk</p>
          </div>
          <div className="p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]">
            <h4 className="text-[16px] font-semibold text-[#12163A]">Placement Cell RBAC Permissions</h4>
            <p className="text-[13px] text-[#4B5563]">Institutional Placement Officers & Faculty Accounts Active</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {renderContent()}

      {/* GLOBAL ACTION MODAL FOR COLLEGE DASHBOARD */}
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
