import React, { useState } from 'react';
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
  FiBell
} from 'react-icons/fi';
import { ActionModal } from '../ActionModal';

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
  // Modal Action State
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState<{ title: string; subtitle: string; fields: any[] }>({
    title: '',
    subtitle: '',
    fields: []
  });

  // Sample College Data State
  const [programsList, setProgramsList] = useState([
    { code: "CS-101", title: "B.Tech Computer Science & AI", degree: "Undergraduate (4 Yrs)", seats: 480, enrolled: 472, avgCtc: "₹28.5 LPA" },
    { code: "ECE-201", title: "B.Tech Electronics & Communication", degree: "Undergraduate (4 Yrs)", seats: 360, enrolled: 350, avgCtc: "₹22.0 LPA" },
    { code: "MBA-301", title: "MBA Fintech & Analytics", degree: "Postgraduate (2 Yrs)", seats: 240, enrolled: 235, avgCtc: "₹24.0 LPA" },
    { code: "DS-401", title: "M.Tech Data Science & MLOps", degree: "Postgraduate (2 Yrs)", seats: 180, enrolled: 175, avgCtc: "₹26.5 LPA" },
    { code: "BIO-501", title: "B.Sc Biotech & Bioinformatics", degree: "Undergraduate (3 Yrs)", seats: 200, enrolled: 190, avgCtc: "₹18.0 LPA" }
  ]);

  const [admissionsList, setAdmissionsList] = useState([
    { title: "JEE Advanced Engineering Drive", cutoff: "JEE Adv Rank < 500", seats: "480 Seats", applied: "14,200 Applicants", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
    { title: "BITSAT Merit Admission Drive", cutoff: "BITSAT Score > 320", seats: "360 Seats", applied: "8,900 Applicants", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
    { title: "GATE Post-Graduate Drive", cutoff: "GATE Score > 750", seats: "180 Seats", applied: "4,100 Applicants", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
    { title: "CAT MBA Admission Drive", cutoff: "CAT Percentile > 98.5%", seats: "240 Seats", applied: "6,800 Applicants", bg: "bg-white", border: "border-slate-200" }
  ]);

  const [scholarshipsList, setScholarshipsList] = useState([
    { title: "National STEM Merit Fellowship", pool: "₹3.5 Crores", applicants: "420 Applicants", disbursed: "₹2.8 Crores Disbursed", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
    { title: "Global AI & Innovation Merit Grant", pool: "₹2.5 Crores", applicants: "290 Applicants", disbursed: "₹2.0 Crores Disbursed", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
    { title: "Higher Education Equity Aid", pool: "₹1.5 Crores", applicants: "180 Applicants", disbursed: "₹1.2 Crores Disbursed", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" }
  ]);

  const [drivesList, setDrivesList] = useState([
    { company: "Google Cloud India", role: "Cloud Solutions Engineer", ctc: "₹28.0 LPA", applicants: "180 Shortlisted", status: "Interview Phase" },
    { company: "Infosys Technologies", role: "Specialist Programmer", ctc: "₹9.5 LPA", applicants: "420 Students", status: "Active Drive" },
    { company: "TCS Enterprise", role: "Digital Innovator", ctc: "₹7.0 LPA", applicants: "890 Students", status: "Registrations Open" },
    { company: "Microsoft Research", role: "AI Research Scientist", ctc: "₹35.0 LPA", applicants: "95 Shortlisted", status: "Shortlisting Phase" }
  ]);

  const [partnersList, setPartnersList] = useState([
    { company: "Amazon Web Services (AWS)", track: "Cloud Architecture Internships", mou: "Active (6-Month Cohort)", status: "Active Partner" },
    { company: "Microsoft Corp", track: "AI & Quantum Computing Lab", mou: "Active (R&D Sponsorship)", status: "Active Partner" },
    { company: "Google Cloud", track: "AI Academy Certification Track", mou: "Active (Faculty & Student Access)", status: "Active Partner" },
    { company: "Goldman Sachs", track: "Quantitative Finance Mentorship", mou: "Active (Campus Hiring MoU)", status: "Active Partner" }
  ]);

  const [applicationsList, setApplicationsList] = useState([
    { id: "APP-9901", name: "Aarav Sharma", program: "B.Tech Computer Science & AI", score: "JEE Adv Rank 420", status: "Verified & Enrolled", docs: "Complete" },
    { id: "APP-9902", name: "Ananya Roy", program: "B.Tech Electronics & Comm", score: "JEE Adv Rank 880", status: "Verified & Enrolled", docs: "Complete" },
    { id: "APP-9903", name: "Karan Patel", program: "MBA Fintech & Analytics", score: "CAT 99.2 Percentile", status: "Under Review", docs: "Pending Verification" },
    { id: "APP-9904", name: "Riya Sen", program: "M.Tech Data Science", score: "GATE Score 790", status: "Verified & Enrolled", docs: "Complete" }
  ]);

  const openTriggerModal = (title: string, subtitle: string, fields: any[]) => {
    setActionModalConfig({ title, subtitle, fields });
    setIsActionModalOpen(true);
  };

  const handleModalFormSubmit = (data: Record<string, string>) => {
    if (actionModalConfig.title === "Add Academic Program") {
      const newProg = {
        code: `PRG-${Math.floor(100 + Math.random() * 900)}`,
        title: data.title || "Specialized Tech Degree",
        degree: data.degree || "Undergraduate (4 Yrs)",
        seats: parseInt(data.seats) || 120,
        enrolled: 1,
        avgCtc: data.avgCtc || "₹20.0 LPA"
      };
      setProgramsList([newProg, ...programsList]);
      onShowToast(`Added new academic program: ${newProg.title}!`);
    } else if (actionModalConfig.title === "Launch Admission Drive") {
      const newDrive = {
        title: data.title || "Entrance Admission Drive 2026",
        cutoff: data.cutoff || "JEE Adv Rank < 1000",
        seats: data.seats ? (data.seats.toLowerCase().includes("seat") ? data.seats : `${data.seats} Seats`) : "300 Seats",
        applied: "0 Applicants",
        bg: "bg-[#DEE9FF]",
        border: "border-[#C6D9FF]"
      };
      setAdmissionsList([newDrive, ...admissionsList]);
      onShowToast(`Launched new admission drive: ${newDrive.title}!`);
    } else if (actionModalConfig.title === "Create Scholarship Fund") {
      const newScholarship = {
        title: data.title || "Alumni STEM Merit Aid",
        pool: data.amount || "₹1.0 Crore",
        applicants: "0 Applicants",
        disbursed: "₹0 Disbursed",
        bg: "bg-[#DEE9FF]",
        border: "border-[#C6D9FF]"
      };
      setScholarshipsList([newScholarship, ...scholarshipsList]);
      onShowToast(`Created scholarship fund: ${newScholarship.title}!`);
    } else if (actionModalConfig.title === "Schedule Placement Drive") {
      const newDrive = {
        company: data.company || "Corporate Recruiter",
        role: data.role || "Graduate Software Engineer",
        ctc: data.ctc || "₹14.0 LPA",
        applicants: "1 Enrolled",
        status: "Registrations Open"
      };
      setDrivesList([newDrive, ...drivesList]);
      onShowToast(`Scheduled campus placement drive for ${newDrive.company}!`);
    } else if (actionModalConfig.title === "Register Corporate Partner") {
      const newPartner = {
        company: data.company || "Enterprise Tech Partner",
        track: data.track || "Industry Internship Track",
        mou: "Active (Campus MoU Signed)",
        status: "Active Partner"
      };
      setPartnersList([newPartner, ...partnersList]);
      onShowToast(`Registered corporate partner: ${newPartner.company}!`);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-[24px] bg-[#12163A] text-white shadow-md border border-[#12163A] space-y-2 hover-card-lift">
              <span className="font-medium text-[13px] block text-slate-300">Total Enrolled Undergrads</span>
              <div className="text-2xl lg:text-3xl font-bold tracking-tight text-white">11,450</div>
              <span className="text-xs font-medium text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full inline-block">9 Active Batches</span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift">
              <span className="font-medium text-[13px] block text-[#4B5563]">Placement Rate</span>
              <div className="text-2xl lg:text-3xl font-bold tracking-tight text-[#12163A]">94.2%</div>
              <span className="text-xs font-medium text-[#3665EE]">+5.1% YoY Increase</span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift">
              <span className="font-medium text-[13px] block text-[#4B5563]">Corporate Placement Drives</span>
              <div className="text-2xl lg:text-3xl font-bold tracking-tight text-[#3665EE]">148 Drives</div>
              <span className="text-xs font-medium text-[#12163A]">18 Drives Open Now</span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift">
              <span className="font-medium text-[13px] block text-[#4B5563]">Average CTC Package</span>
              <div className="text-2xl lg:text-3xl font-bold tracking-tight text-[#12163A]">₹24.5 LPA</div>
              <span className="text-xs font-medium text-[#3665EE]">Max Package: ₹110 LPA</span>
            </div>
          </div>

          {/* Registration & Accreditation Status */}
          <div className="p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-base text-[#12163A]">College Registration & Institutional Accreditation</h3>
                <p className="text-sm font-normal text-[#6B7280]">Verified University Portal • NIRF Rank #1 • NAAC A++ Grade</p>
              </div>
              <span className="bg-[#E4F4EC] text-[#12163A] font-medium text-xs px-3.5 py-1 rounded-full border border-[#C3E6D5]">
                ✓ Verification Completed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-[20px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-1">
                <span className="font-medium text-[13px] text-[#4B5563]">Admissions Pipeline</span>
                <div className="text-2xl font-bold text-[#3665EE]">1,470 Seats Filled</div>
                <span className="text-xs font-normal text-[#4B5563]">98.2% Capacity Enrolled</span>
              </div>

              <div className="p-4 rounded-[20px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A] space-y-1">
                <span className="font-medium text-[13px] text-[#4B5563]">Scholarships Disbursed</span>
                <div className="text-2xl font-bold text-[#12163A]">₹6.3 Crores</div>
                <span className="text-xs font-normal text-[#4B5563]">890 Merit Recipients</span>
              </div>

              <div className="p-4 rounded-[20px] bg-[#E4F4EC] border border-[#C3E6D5] text-[#12163A] space-y-1">
                <span className="font-medium text-[13px] text-[#4B5563]">Industry MoUs Active</span>
                <div className="text-2xl font-bold text-[#12163A]">42 Active MoUs</div>
                <span className="text-xs font-medium text-[#3665EE]">Top Global Enterprise Partners</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 2. PROGRAMS
    if (activeSubView === 'programs') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
<<<<<<< HEAD
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaBookOpen className="w-5 h-5 text-[#3665EE]" /> Academic Programs & Degree Tracks
=======
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiBookOpen className="w-5 h-5 text-[#3665EE]" /> Academic Programs & Degree Tracks
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">Manage undergraduate, postgraduate, and doctoral degree programs</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Add Academic Program", "Register a new degree track or specialized program", [
                { label: "Program Title", name: "title", type: "text", placeholder: "B.Tech Computer Science & AI" },
                { label: "Degree Level", name: "degree", type: "text", placeholder: "Undergraduate (4 Yrs)" },
                { label: "Seat Capacity", name: "seats", type: "number", placeholder: "480" },
                { label: "Expected Avg CTC", name: "avgCtc", type: "text", placeholder: "₹25.0 LPA" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-3.5 h-3.5" /> Add Academic Program
            </button>
          </div>

          <div className="space-y-3">
            {programsList.map((p, i) => (
              <div key={i} className="p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-[#12163A] text-white px-2 py-0.5 rounded-md font-medium">{p.code}</span>
                    <h4 className="font-semibold text-base text-[#12163A]">{p.title}</h4>
                  </div>
                  <p className="text-sm text-[#4B5563] font-normal mt-1">{p.degree} • Enrolled: {p.enrolled} / {p.seats} Seats</p>
                </div>
                <div className="text-right">
                  <div className="text-[#3665EE] font-semibold text-sm">Avg CTC: {p.avgCtc}</div>
                  <span className="text-xs bg-white text-[#12163A] border border-slate-200 px-2.5 py-0.5 rounded-full font-medium">Active Track</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 3. ADMISSIONS
    if (activeSubView === 'admissions') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
<<<<<<< HEAD
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaUserCheck className="w-5 h-5 text-[#3665EE]" /> College Admissions & Entrance Cutoff Hub
=======
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiUserCheck className="w-5 h-5 text-[#3665EE]" /> College Admissions & Entrance Cutoff Hub
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">Configure admission drives, entrance examination ranks, & seat quotas</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Launch Admission Drive", "Open a new admission cycle for target entrance exams", [
                { label: "Drive Title", name: "title", type: "text", placeholder: "JEE Advanced Engineering Drive 2026" },
                { label: "Target Cutoff Rank", name: "cutoff", type: "text", placeholder: "JEE Adv Rank < 500" },
                { label: "Seat Capacity", name: "seats", type: "text", placeholder: "480 Seats" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-3.5 h-3.5" /> Launch Admission Drive
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {admissionsList.map((ad, i) => (
              <div key={i} className={`p-5 rounded-[24px] border space-y-2 ${ad.bg} ${ad.border} text-[#12163A] hover-card-lift`}>
                <span className="text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium">{ad.cutoff}</span>
                <h4 className="font-semibold text-base text-[#12163A]">{ad.title}</h4>
                <div className="flex items-center justify-between text-sm pt-1">
                  <span className="font-semibold text-[#3665EE]">{ad.seats}</span>
                  <span className="text-[#4B5563] font-normal">{ad.applied}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 4. APPLICATIONS
    if (activeSubView === 'applications') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
<<<<<<< HEAD
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaFileLines className="w-5 h-5 text-[#3665EE]" /> Student Application & Enrollment Pipeline
=======
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiFileText className="w-5 h-5 text-[#3665EE]" /> Student Application & Enrollment Pipeline
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">Review student application forms, entrance rankings, and document verification</p>
            </div>
            <button 
<<<<<<< HEAD
              onClick={() => onShowToast("Exported Applications Pipeline CSV")}
              className="px-4 py-2.5 rounded-xl font-medium text-sm border border-slate-200 bg-slate-50 text-[#12163A] hover:bg-slate-100 transition cursor-pointer flex items-center gap-2"
=======
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
              className="px-4 py-2 rounded-xl font-bold border border-slate-200 bg-slate-50 text-[#12163A] hover:bg-slate-100 transition cursor-pointer flex items-center gap-2"
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            >
              <FiDownload className="w-3.5 h-3.5" /> Export Applications
            </button>
          </div>

          <div className="rounded-[24px] border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-xs font-semibold uppercase tracking-wider bg-[#DEE9FF]/50 text-[#12163A] border-[#C6D9FF]">
                  <th className="p-3.5">Application ID</th>
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">Program Applied</th>
                  <th className="p-3.5">Entrance Score</th>
                  <th className="p-3.5">Document Status</th>
                  <th className="p-3.5">Application Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-normal">
                {applicationsList.map((app) => (
                  <tr key={app.id} className="hover:bg-[#DEE9FF]/20 transition-colors">
                    <td className="p-3.5 font-mono text-[#3665EE] font-medium text-xs">{app.id}</td>
                    <td className="p-3.5 font-semibold text-[#12163A]">{app.name}</td>
                    <td className="p-3.5 text-[#4B5563]">{app.program}</td>
                    <td className="p-3.5 font-medium text-[#12163A]">{app.score}</td>
                    <td className="p-3.5 font-medium text-emerald-600">{app.docs}</td>
                    <td className="p-3.5">
                      <span className="bg-[#E4F4EC] text-[#12163A] border border-[#C3E6D5] px-2.5 py-0.5 rounded-full font-medium text-xs">
                        {app.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button 
                        onClick={() => onShowToast(`Reviewed application for ${app.name}`)}
                        className="bg-[#12163A] hover:bg-[#1A2050] text-white font-medium px-3 py-1.5 rounded-lg text-xs transition cursor-pointer"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // 5. SCHOLARSHIPS
    if (activeSubView === 'scholarships') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
<<<<<<< HEAD
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaAward className="w-5 h-5 text-[#3665EE]" /> Institutional Scholarship & Aid Cell
=======
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiAward className="w-5 h-5 text-[#3665EE]" /> Institutional Scholarship & Aid Cell
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">₹8.5 Crores in institutional merit aid and corporate scholarship grants</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Create Scholarship Fund", "Establish a new merit or need-based aid fund", [
                { label: "Scholarship Name", name: "title", type: "text", placeholder: "Alumni STEM Merit Aid" },
                { label: "Annual Fund Pool", name: "amount", type: "text", placeholder: "₹1.5 Crores" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-3.5 h-3.5" /> Create Scholarship Fund
            </button>
          </div>

          <div className="space-y-3">
            {scholarshipsList.map((sch, i) => (
              <div key={i} className={`p-5 rounded-[24px] border flex items-center justify-between ${sch.bg} ${sch.border} text-[#12163A] hover-card-lift`}>
                <div>
                  <h4 className="font-semibold text-base text-[#12163A]">{sch.title}</h4>
                  <span className="text-[#3665EE] font-medium text-xs">Pool: {sch.pool} • {sch.applicants}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm text-[#12163A]">{sch.disbursed}</div>
                  <span className="text-xs bg-white border border-slate-200 text-[#12163A] px-2.5 py-0.5 rounded-full font-medium">Active Fund</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 6. PLACEMENT CELL
    if (activeSubView === 'placement-cell' || activeSubView === 'drives') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
<<<<<<< HEAD
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaBriefcase className="w-5 h-5 text-[#3665EE]" /> Campus Placement Cell & Recruitment Hub
=======
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiBriefcase className="w-5 h-5 text-[#3665EE]" /> Campus Placement Cell & Recruitment Hub
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">Manage corporate placement drives, CTC packages, & interview schedules</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Schedule Placement Drive", "Publish a new corporate recruiting drive", [
                { label: "Company Name", name: "company", type: "text", placeholder: "Microsoft India" },
                { label: "Job Role Title", name: "role", type: "text", placeholder: "Software Development Engineer" },
                { label: "Annual CTC Package", name: "ctc", type: "text", placeholder: "₹24.0 LPA" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-3.5 h-3.5" /> Schedule Placement Drive
            </button>
          </div>

          <div className="space-y-3">
            {drivesList.map((d, i) => (
              <div key={i} className="p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift">
                <div>
                  <h4 className="font-semibold text-base text-[#12163A]">{d.company}</h4>
                  <span className="text-[#3665EE] font-medium text-xs">{d.role}</span>
                  <div className="text-xs text-[#4B5563] font-normal">{d.applicants}</div>
                </div>
                <div className="text-right">
                  <div className="text-[#12163A] font-semibold text-sm">{d.ctc}</div>
                  <span className="text-xs bg-white border border-slate-200 text-[#12163A] px-2.5 py-0.5 rounded-full font-medium">{d.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 7. INDUSTRY CONNECT
    if (activeSubView === 'industry-connect') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
<<<<<<< HEAD
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaHandshake className="w-5 h-5 text-[#3665EE]" /> Industry Connect & Enterprise MoUs
=======
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiBriefcase className="w-5 h-5 text-[#3665EE]" /> Industry Connect & Enterprise MoUs
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">Corporate partnerships, R&D labs, and summer/winter internship tracks</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Register Corporate Partner", "Sign a new campus recruiting MoU", [
                { label: "Company Name", name: "company", type: "text", placeholder: "NVIDIA Graphics India" },
                { label: "Internship / MoU Track", name: "track", type: "text", placeholder: "AI Hardware & CUDA Labs" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
            >
              <FiPlus className="w-3.5 h-3.5" /> Register Corporate Partner
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partnersList.map((pr, i) => (
              <div key={i} className="p-5 rounded-[24px] border bg-[#F6E6D8] border-[#EAD0BC] space-y-2 text-[#12163A] hover-card-lift">
                <span className="text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium">{pr.status}</span>
                <h4 className="font-semibold text-base text-[#12163A]">{pr.company}</h4>
                <p className="text-xs text-[#3665EE] font-medium">{pr.track}</p>
                <div className="text-xs text-[#4B5563] font-normal">{pr.mou}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 8. ANALYTICS
    if (activeSubView === 'analytics') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="pb-4 border-b border-slate-100">
<<<<<<< HEAD
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
              <FaArrowTrendUp className="w-5 h-5 text-[#3665EE]" /> Institutional Performance & Placement Analytics
=======
            <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
              <FiTrendingUp className="w-5 h-5 text-[#3665EE]" /> Institutional Performance & Placement Analytics
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </h2>
            <p className="text-sm font-normal text-[#6B7280]">Placement trends, NIRF benchmarks, and corporate compensation distributions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]">
              <span className="font-medium text-[13px] text-[#4B5563]">YoY Placement Growth</span>
              <div className="text-2xl lg:text-3xl font-bold text-[#12163A] mt-1">+5.1% YoY</div>
            </div>
            <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]">
              <span className="font-medium text-[13px] text-[#4B5563]">Software & AI Hiring Share</span>
              <div className="text-2xl lg:text-3xl font-bold text-[#3665EE] mt-1">62.0%</div>
            </div>
            <div className="p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]">
              <span className="font-medium text-[13px] text-[#4B5563]">Highest Package Recorded</span>
              <div className="text-2xl lg:text-3xl font-bold text-[#12163A] mt-1">₹110 LPA</div>
            </div>
          </div>
        </div>
      );
    }

    // 9. NOTIFICATIONS
    if (activeSubView === 'notifications') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
<<<<<<< HEAD
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaBullhorn className="w-5 h-5 text-[#3665EE]" /> College Admin Notifications & Announcements
=======
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiBell className="w-5 h-5 text-[#3665EE]" /> College Admin Notifications & Announcements
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">Placement deadlines, MoU updates, and institutional accreditation alerts</p>
            </div>
            <button onClick={() => onShowToast("Marked all notifications as read")} className="text-[#3665EE] font-medium text-sm hover:underline cursor-pointer">
              Mark All as Read
            </button>
          </div>

          <div className="space-y-3">
            {[
              { title: "Placement Drive Registrations Closing for Microsoft India", time: "15 mins ago", type: "Placement Alert", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
              { title: "National STEM Scholarship Disbursal Batch Approved", time: "2 hours ago", type: "Scholarship Disbursal", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
              { title: "NIRF Ranking Audit Verification Completed Successfully", time: "5 hours ago", type: "NIRF Audit", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" }
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

    // 10. SETTINGS
    return (
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
<<<<<<< HEAD
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
            <FaSliders className="w-5 h-5 text-[#3665EE]" /> College Governance & System Settings
=======
          <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
            <FiSliders className="w-5 h-5 text-[#3665EE]" /> College Governance & System Settings
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
          </h2>
          <p className="text-sm font-normal text-[#6B7280]">Configure institutional profile, academic year, campus settings, & user permissions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]">
            <h4 className="font-semibold text-base text-[#12163A]">University Profile & NAAC Grade</h4>
            <p className="text-sm font-normal text-[#4B5563]">Indian Institute of Technology / University Desk • NIRF Rank #1 • NAAC A++</p>
          </div>
          <div className="p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]">
            <h4 className="font-semibold text-base text-[#12163A]">Faculty & Placement Cell Permissions</h4>
            <p className="text-sm font-normal text-[#4B5563]">85 Placement Officers & Faculty Accounts • RBAC Access Enabled</p>
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
