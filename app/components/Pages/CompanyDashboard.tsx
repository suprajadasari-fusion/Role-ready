import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  FiGrid, 
  FiBriefcase, 
  FiBookOpen, 
  FiUsers, 
  FiDollarSign, 
  FiTrendingUp,
  FiPlus
} from 'react-icons/fi';
import { ActionModal } from '../ActionModal';
import { StudentToolsViews } from '../StudentToolsViews';
import { companyService, CompanyInternship } from '../../services/companyService';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Live query for company data from backend profile roleData
  const { data: companyData, isLoading } = useQuery({
    queryKey: ['companyData'],
    queryFn: () => companyService.getCompanyData()
  });

  const internshipsList = companyData?.internships || [];
  const partnershipsList = companyData?.partnerships || [];

  const launchCohortMutation = useMutation({
    mutationFn: (cohort: CompanyInternship) => companyService.launchInternshipCohort(cohort),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companyData'] });
      onShowToast("Published new corporate internship cohort successfully!");
    },
    onError: (err: any) => {
      onShowToast("Unable to launch cohort. Please try again.");
    }
  });

  if (['discovery', 'assessment', 'psychometric', 'dna', 'ai-recommendations', 'scholarships', 'colleges', 'roadmap', 'resume-ats', 'learning'].includes(activeSubView)) {
    return <StudentToolsViews activeSubView={activeSubView} onShowToast={onShowToast} isDarkMode={isDarkMode} />;
  }

  const handleLaunchInternship = (data: Record<string, string>) => {
    const newCohort: CompanyInternship = {
      cohort: data.cohort || "Enterprise Internship Track",
      duration: data.duration || "6 Months",
      stipend: data.stipend || "₹35,000 / mo",
      interns: "1 Cohort Enrolled",
      ppo: "Registrations Open"
    };
    launchCohortMutation.mutate(newCohort);
    setIsModalOpen(false);
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
      <div className={`rounded-2xl border p-6 space-y-6 text-[14px] font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
              <FiBriefcase className="w-5 h-5 text-[#3665EE]" /> Corporate Internship Programs
            </h2>
            <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Summer & Winter internship cohorts for university engineering students</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            + Launch Internship Drive
          </button>
        </div>

        {internshipsList.length === 0 ? (
          <div className="py-12 text-center text-[13px] text-slate-400">
            <FiBriefcase className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
            No corporate internship cohorts active yet. Click '+ Launch Internship Drive' to publish a program.
          </div>
        ) : (
          <div className="space-y-3">
            {internshipsList.map((inProg, i) => (
              <div key={i} className={`p-4 rounded-xl border flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3665EE] ${subCardClass}`}>
                <div>
                  <h4 className={`text-[16px] font-semibold ${textHeading}`}>{inProg.cohort}</h4>
                  <span className="text-[#3665EE] font-medium text-[13px]">{inProg.duration} • Stipend: {inProg.stipend}</span>
                  <div className={`text-[13px] ${textMuted} font-normal mt-0.5`}>{inProg.interns}</div>
                </div>
                <span className="text-[12px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 font-semibold">{inProg.ppo}</span>
              </div>
            ))}
          </div>
        )}

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
      <div className={`rounded-2xl border p-6 space-y-6 text-[14px] font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`pb-4 border-b ${borderDivider}`}>
          <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
            <FiBookOpen className="w-5 h-5 text-[#3665EE]" /> Campus University MoUs
          </h2>
          <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Partner universities with signed corporate recruitment MoUs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["IIT Bombay MoU", "IIT Delhi MoU", "BITS Pilani MoU", "NIT Trichy MoU", "DTU Delhi MoU"].map((mou, i) => (
            <div key={i} className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[#3665EE] ${subCardClass}`} onClick={() => onShowToast(`Opened MoU record for ${mou}`)}>
              <span className={`text-[15px] font-semibold ${textHeading}`}>{mou}</span>
              <span className="text-emerald-500 text-[12px] bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium">Active MoU</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeSubView === 'pipeline') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-[14px] font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`pb-4 border-b ${borderDivider}`}>
          <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
            <FiUsers className="w-5 h-5 text-[#3665EE]" /> Talent Funnel Pipeline
          </h2>
          <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Pipeline stage metrics from campus sourcing to PPO conversion</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { stage: "Sourced Candidates", count: internshipsList.length > 0 ? "420" : "0", sub: "Partner Universities" },
            { stage: "Shortlisted for Test", count: internshipsList.length > 0 ? "145" : "0", sub: "Coding & Aptitude Round" },
            { stage: "Interview Cleared", count: internshipsList.length > 0 ? "62" : "0", sub: "Technical + HR Cleared" },
            { stage: "PPO Offered", count: internshipsList.length > 0 ? "48" : "0", sub: "Full Time Pre-Placement" }
          ].map((pip, i) => (
            <div key={i} className={`p-5 rounded-xl border space-y-1 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[#3665EE] ${subCardClass}`} onClick={() => onShowToast(`Viewing stage pipeline for ${pip.stage}`)}>
              <span className={`text-[13px] font-medium block ${textMuted}`}>{pip.stage}</span>
              <div className="text-[28px] md:text-[30px] font-bold text-[#3665EE] leading-none my-1">{pip.count}</div>
              <span className={`text-[12px] ${textMuted} block`}>{pip.sub}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Company Overview Dashboard
  return (
    <div className={`rounded-2xl border p-6 space-y-6 text-[14px] font-sans transition-colors duration-200 ${cardClass}`}>
      <div className={`pb-4 border-b ${borderDivider}`}>
        <h2 className={`text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`}>
          <FiGrid className="w-5 h-5 text-[#3665EE]" /> Enterprise Company Portal Overview
        </h2>
        <p className={`text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`}>Corporate internship drives, university MoUs, intern enrollment, and PPO conversions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[#3665EE] ${subCardClass}`} onClick={() => onShowToast("Viewing Internship Drives")}>
          <span className={`text-[13px] font-medium block ${textMuted}`}>Active Drives</span>
          <div className="text-[28px] md:text-[30px] font-bold text-[#3665EE] leading-none my-1">{internshipsList.length}</div>
          <span className={`text-[12px] ${textMuted} block`}>{internshipsList.length > 0 ? 'Live Cohorts' : 'No active cohorts'}</span>
        </div>

        <div className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[#3665EE] ${subCardClass}`} onClick={() => onShowToast("Viewing Campus MoUs")}>
          <span className={`text-[13px] font-medium block ${textMuted}`}>Partner Universities</span>
          <div className="text-[28px] md:text-[30px] font-bold text-[#3665EE] leading-none my-1">5 Colleges</div>
          <span className={`text-[12px] ${textMuted} block`}>Direct MoUs Signed</span>
        </div>

        <div className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[#3665EE] ${subCardClass}`} onClick={() => onShowToast("Viewing Enrolled Interns")}>
          <span className={`text-[13px] font-medium block ${textMuted}`}>Enrolled Candidates</span>
          <div className="text-[28px] md:text-[30px] font-bold text-emerald-500 leading-none my-1">{internshipsList.length > 0 ? 'Active' : '0'}</div>
          <span className="text-[12px] text-emerald-600 flex items-center gap-1 font-medium mt-1">
            <FiTrendingUp className="w-3.5 h-3.5" /> PPO Track Active
          </span>
        </div>

        <div className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[#3665EE] ${subCardClass}`} onClick={() => onShowToast("Viewing Monthly Stipends")}>
          <span className={`text-[13px] font-medium block ${textMuted}`}>System Status</span>
          <div className="text-[28px] md:text-[30px] font-bold text-emerald-500 leading-none my-1">Connected</div>
          <span className={`text-[12px] ${textMuted} block`}>Real-time Sync Active</span>
        </div>
      </div>
    </div>
  );
};
