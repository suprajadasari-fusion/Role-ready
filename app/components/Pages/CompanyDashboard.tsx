import React, { useState } from 'react';
import { 
  FiGrid, 
  FiBriefcase, 
  FiBookOpen, 
  FiUsers, 
  FiDollarSign, 
  FiTrendingUp 
} from 'react-icons/fi';
import { ActionModal } from '../ActionModal';
import { StudentToolsViews } from '../StudentToolsViews';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [internshipsList, setInternshipsList] = useState([
    { cohort: "Summer AI & Cloud Cohort 2026", duration: "6 Months", stipend: "₹40,000 / mo", interns: "180 Interns", ppo: "82% PPO Rate" },
    { cohort: "Winter Full Stack Engineering Drive", duration: "3 Months", stipend: "₹30,000 / mo", interns: "240 Interns", ppo: "75% PPO Rate" }
  ]);

  if (['discovery', 'assessment', 'psychometric', 'dna', 'ai-recommendations', 'scholarships', 'colleges', 'roadmap', 'resume-ats', 'learning'].includes(activeSubView)) {
    return <StudentToolsViews activeSubView={activeSubView} onShowToast={onShowToast} isDarkMode={isDarkMode} />;
  }

  const handleLaunchInternship = (data: Record<string, string>) => {
    const newCohort = {
      cohort: data.cohort || "Enterprise Internship Track",
      duration: data.duration || "6 Months",
      stipend: data.stipend || "₹35,000 / mo",
      interns: "1 Cohort",
      ppo: "Registrations Open"
    };
    setInternshipsList([newCohort, ...internshipsList]);
    onShowToast(`Launched new internship cohort: ${newCohort.cohort}!`);
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

  if (activeSubView === 'internships') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiBriefcase className="w-5 h-5 text-blue-500" /> Corporate Internship Programs Page
            </h2>
            <p className={textMuted}>Summer & Winter internship cohorts for university engineering students</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            + Launch Internship Drive
          </button>
        </div>
        <div className="space-y-3">
          {internshipsList.map((inProg, i) => (
            <div key={i} className={`p-4 rounded-xl border flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 ${subCardClass}`}>
              <div>
                <h4 className={`font-bold text-sm ${textHeading}`}>{inProg.cohort}</h4>
                <span className="text-blue-400 font-semibold">{inProg.duration} • Stipend: {inProg.stipend}</span>
                <div className={`text-[11px] ${textMuted}`}>{inProg.interns}</div>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 font-bold">{inProg.ppo}</span>
            </div>
          ))}
        </div>

        <ActionModal
          isOpen={isModalOpen}
          title="Launch Corporate Internship Drive"
          subtitle="Publish a new university internship program cohort"
          fields={[
            { label: "Internship Program Name", name: "cohort", type: "text", placeholder: "e.g. Summer AI Innovation Cohort" },
            { label: "Program Duration", name: "duration", type: "text", placeholder: "e.g. 6 Months" },
            { label: "Monthly Stipend", name: "stipend", type: "text", placeholder: "e.g. ₹40,000 / mo" }
          ]}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleLaunchInternship}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  if (activeSubView === 'partnerships') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
          <FiBookOpen className="w-5 h-5 text-blue-500" /> Campus University MoUs Page
        </h2>
        <p className={textMuted}>45 Partner universities with signed corporate recruitment MoUs</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["IIT Bombay MoU", "IIT Delhi MoU", "BITS Pilani MoU", "NIT Trichy MoU", "DTU Delhi MoU"].map((mou, i) => (
            <div key={i} className={`p-4 rounded-xl border font-bold flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast(`Opened MoU record for ${mou}`)}>
              <span className={textHeading}>{mou}</span>
              <span className="text-emerald-400 text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">Active MoU</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeSubView === 'pipeline') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
          <FiUsers className="w-5 h-5 text-blue-500" /> Talent Funnel Pipeline Page
        </h2>
        <p className={textMuted}>Pipeline stage metrics from campus sourcing to PPO conversion</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { stage: "Sourced Candidates", count: "4,200", sub: "Top 45 Universities" },
            { stage: "Shortlisted for Test", count: "1,450", sub: "Coding & Aptitude Round" },
            { stage: "Interview Cleared", count: "620", sub: "Technical + HR Cleared" },
            { stage: "PPO Offered", count: "480", sub: "Full Time Pre-Placement" }
          ].map((pip, i) => (
            <div key={i} className={`p-4 rounded-xl border space-y-1 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast(`Viewing stage pipeline for ${pip.stage}`)}>
              <span className={`font-semibold block ${textMuted}`}>{pip.stage}</span>
              <div className="text-2xl font-bold text-blue-400">{pip.count}</div>
              <span className={`text-[11px] ${textMuted}`}>{pip.sub}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Company Overview Dashboard
  return (
    <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
      <div className={`pb-4 border-b ${borderDivider}`}>
        <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
          <FiGrid className="w-5 h-5 text-blue-500" /> Enterprise Company Portal Overview
        </h2>
        <p className={textMuted}>Corporate internship drives, university MoUs, intern enrollment, and PPO conversions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Internship Drives")}>
          <span className={`font-semibold block ${textMuted}`}>Internship Drives</span>
          <div className="text-2xl font-bold text-blue-400 mt-1">12 Drives</div>
          <span className={`text-[10px] ${textMuted}`}>Summer & Winter Tracks</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Campus MoUs")}>
          <span className={`font-semibold block ${textMuted}`}>Partner Universities</span>
          <div className="text-2xl font-bold text-blue-400 mt-1">45 Colleges</div>
          <span className={`text-[10px] ${textMuted}`}>Direct MoUs Signed</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Enrolled Interns")}>
          <span className={`font-semibold block ${textMuted}`}>Enrolled Interns</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">620 Interns</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-bold">
            <FiTrendingUp className="w-3 h-3" /> 78% PPO Conversion Rate
          </span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Monthly Stipends")}>
          <span className={`font-semibold block ${textMuted}`}>Monthly Stipend</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">₹35,000 / mo</div>
          <span className={`text-[10px] ${textMuted}`}>Competitive Package</span>
        </div>
      </div>
    </div>
  );
};
