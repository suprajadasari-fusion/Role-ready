import React, { useState } from 'react';
import { 
  FiGrid, 
  FiBookOpen, 
  FiAward, 
  FiBriefcase, 
  FiTrendingUp 
} from 'react-icons/fi';
import { ActionModal } from '../ActionModal';
import { StudentToolsViews } from '../StudentToolsViews';

interface TrainingDashboardProps {
  activeSubView: string;
  onShowToast: (msg: string) => void;
  isDarkMode: boolean;
}

export const TrainingDashboard: React.FC<TrainingDashboardProps> = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coursesList, setCoursesList] = useState([
    { title: "Full Stack AI Engineering", duration: "16 Weeks", enrolled: "840 Trainees", status: "Active Cohort" },
    { title: "Cloud Architecture (AWS/GCP)", duration: "12 Weeks", enrolled: "620 Trainees", status: "Active Cohort" },
    { title: "Cybersecurity & SOC Operations", duration: "14 Weeks", enrolled: "450 Trainees", status: "Enrolling Now" }
  ]);

  if (['discovery', 'assessment', 'psychometric', 'dna', 'ai-recommendations', 'scholarships', 'colleges', 'roadmap', 'resume-ats', 'learning'].includes(activeSubView)) {
    return <StudentToolsViews activeSubView={activeSubView} onShowToast={onShowToast} isDarkMode={isDarkMode} />;
  }

  const handleAddBootcamp = (data: Record<string, string>) => {
    const newCourse = {
      title: data.title || "Specialized Tech Bootcamp",
      duration: data.duration || "12 Weeks",
      enrolled: "1 Cohort",
      status: "Enrolling Now"
    };
    setCoursesList([newCourse, ...coursesList]);
    onShowToast(`Launched new bootcamp track: ${newCourse.title}!`);
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

  if (activeSubView === 'courses') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiBookOpen className="w-5 h-5 text-blue-500" /> Skill Courses & Curriculum Track Page
            </h2>
            <p className={textMuted}>Industry bootcamps and certification learning modules</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            + Add New Bootcamp
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coursesList.map((c, i) => (
            <div key={i} className={`p-4 rounded-xl border space-y-2 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast(`Opened course details for ${c.title}`)}>
              <div className={`font-bold text-sm ${textHeading}`}>{c.title}</div>
              <div className="text-blue-400 font-semibold">{c.duration} • {c.enrolled}</div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold inline-block">{c.status}</span>
            </div>
          ))}
        </div>

        <ActionModal
          isOpen={isModalOpen}
          title="Add New Skill Bootcamp"
          subtitle="Publish an accredited skill certification curriculum track"
          fields={[
            { label: "Bootcamp Course Title", name: "title", type: "text", placeholder: "e.g. Data Engineering & Analytics" },
            { label: "Duration", name: "duration", type: "text", placeholder: "e.g. 10 Weeks" }
          ]}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddBootcamp}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  if (activeSubView === 'certs') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
          <FiAward className="w-5 h-5 text-blue-500" /> Certifications Registry Page
        </h2>
        <p className={textMuted}>Industry-accredited digital credentials issued to trainees</p>
        <div className="space-y-3">
          {[
            { name: "Aarav Sharma", cert: "Certified Full Stack AI Specialist", date: "2026-02-28", id: "CERT-AI-9941" },
            { name: "Riya Sen", cert: "Cloud Infrastructure Specialist", date: "2026-02-25", id: "CERT-CL-8820" }
          ].map((ct, i) => (
            <div key={i} className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast(`Verifying certificate ${ct.id}`)}>
              <div>
                <h4 className={`font-bold ${textHeading}`}>{ct.name}</h4>
                <span className="text-blue-400 font-semibold">{ct.cert}</span>
              </div>
              <div className="text-right">
                <span className="text-emerald-400 font-mono font-bold">{ct.id}</span>
                <div className={`text-[10px] ${textMuted}`}>{ct.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeSubView === 'hiring') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
          <FiBriefcase className="w-5 h-5 text-blue-500" /> Hiring Partner Enterprises Page
        </h2>
        <p className={textMuted}>64 Corporate partners recruiting directly from institute bootcamps</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["Infosys", "TCS", "Accenture", "Cognizant", "Capgemini", "Wipro", "HCL Tech", "Tech Mahindra"].map((hp, i) => (
            <div key={i} className={`p-4 rounded-xl border font-bold flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast(`Opened MoU details for ${hp}`)}>
              <span className={textHeading}>{hp}</span>
              <span className="text-emerald-400 text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">MoU Signed</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Training Overview Dashboard
  return (
    <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
      <div className={`pb-4 border-b ${borderDivider}`}>
        <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
          <FiGrid className="w-5 h-5 text-blue-500" /> Training Institute Portal Overview
        </h2>
        <p className={textMuted}>Skill bootcamps, certified trainees, accreditation tracks, and hiring enterprise ties</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Trainee Cohorts")}>
          <span className={`font-semibold block ${textMuted}`}>Active Trainees</span>
          <div className="text-2xl font-bold text-blue-400 mt-1">2,900</div>
          <span className={`text-[10px] ${textMuted}`}>12 Certified Bootcamps</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Certification Rates")}>
          <span className={`font-semibold block ${textMuted}`}>Cert Completion</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">91.4%</div>
          <span className={`text-[10px] ${textMuted}`}>Industry Accredited</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Hiring Partners")}>
          <span className={`font-semibold block ${textMuted}`}>Placement Partners</span>
          <div className="text-2xl font-bold text-blue-400 mt-1">64 Companies</div>
          <span className={`text-[10px] ${textMuted}`}>Tech & Cloud Tracks</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Employment Index")}>
          <span className={`font-semibold block ${textMuted}`}>Employment Index</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">88%</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-bold">
            <FiTrendingUp className="w-3 h-3" /> Hired within 90 days
          </span>
        </div>
      </div>
    </div>
  );
};
