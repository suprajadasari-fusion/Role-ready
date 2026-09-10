import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  FiGrid, 
  FiBookOpen, 
  FiAward, 
  FiBriefcase, 
  FiTrendingUp,
  FiPlus,
  FiClock
} from 'react-icons/fi';
import { ActionModal } from '../ActionModal';
import { StudentToolsViews } from '../StudentToolsViews';
import { trainingService, TrainingCourse } from '../../services/trainingService';

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
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Live query for training courses and certifications
  const { data: trainingData, isLoading } = useQuery({
    queryKey: ['trainingData'],
    queryFn: () => trainingService.getTrainingData()
  });

  const coursesList = trainingData?.courses || [];
  const certifications = trainingData?.certifications || [];

  const addBootcampMutation = useMutation({
    mutationFn: (course: TrainingCourse) => trainingService.addBootcampTrack(course),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainingData'] });
      onShowToast("Published new bootcamp track successfully!");
    },
    onError: (err: any) => {
      onShowToast("Unable to publish bootcamp. Please try again.");
    }
  });

  if (['discovery', 'assessment', 'psychometric', 'dna', 'ai-recommendations', 'scholarships', 'colleges', 'roadmap', 'resume-ats', 'learning'].includes(activeSubView)) {
    return <StudentToolsViews activeSubView={activeSubView} onShowToast={onShowToast} isDarkMode={isDarkMode} />;
  }

  const handleAddBootcamp = (data: Record<string, string>) => {
    const newCourse: TrainingCourse = {
      title: data.title || "Specialized Tech Bootcamp",
      duration: data.duration || "12 Weeks",
      enrolled: "1 Cohort Enrolled",
      status: "Active Cohort"
    };
    addBootcampMutation.mutate(newCourse);
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

  if (activeSubView === 'courses') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiBookOpen className="w-5 h-5 text-blue-500" /> Skill Courses & Curriculum Track
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

        {coursesList.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            <FiBookOpen className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
            No skill bootcamps published yet. Click '+ Add New Bootcamp' to launch a track.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coursesList.map((c, i) => (
              <div key={i} className={`p-4 rounded-xl border space-y-2 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast(`Opened course details for ${c.title}`)}>
                <div className={`font-bold text-sm ${textHeading}`}>{c.title}</div>
                <div className="text-blue-400 font-semibold">{c.duration} • {c.enrolled}</div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold inline-block">{c.status}</span>
              </div>
            ))}
          </div>
        )}

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
          <FiAward className="w-5 h-5 text-blue-500" /> Certifications Registry
        </h2>
        <p className={textMuted}>Industry-accredited digital credentials issued to trainees</p>
        {certifications.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            <FiAward className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
            No digital credentials issued yet. Certifications sync automatically upon module completion.
          </div>
        ) : (
          <div className="space-y-3">
            {certifications.map((ct, i) => (
              <div key={i} className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast(`Verifying certificate ${ct.name}`)}>
                <div>
                  <h4 className={`font-bold ${textHeading}`}>{ct.name}</h4>
                  <span className="text-blue-400 font-semibold">{ct.body}</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-mono font-bold">{ct.validity}</span>
                  <div className={`text-[10px] ${textMuted}`}>{ct.activeCandidates}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (activeSubView === 'hiring') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
          <FiBriefcase className="w-5 h-5 text-blue-500" /> Hiring Partner Enterprises
        </h2>
        <p className={textMuted}>Corporate partners recruiting directly from institute bootcamps</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["Infosys", "TCS", "Accenture", "Cognizant", "Capgemini", "Wipro", "HCL Tech", "Tech Mahindra"].map((hp, i) => (
            <div key={i} className={`p-4 rounded-xl border font-bold flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast(`Opened MoU details for ${hp}`)}>
              <span className={textHeading}>{hp}</span>
              <span className="text-emerald-400 text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">MoU Active</span>
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
          <span className={`font-semibold block ${textMuted}`}>Active Tracks</span>
          <div className="text-2xl font-bold text-blue-400 mt-1">{coursesList.length}</div>
          <span className={`text-[10px] ${textMuted}`}>{coursesList.length > 0 ? 'Live Bootcamps' : 'No active bootcamps'}</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Certification Rates")}>
          <span className={`font-semibold block ${textMuted}`}>Digital Credentials</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{certifications.length}</div>
          <span className={`text-[10px] ${textMuted}`}>Industry Accredited</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Hiring Partners")}>
          <span className={`font-semibold block ${textMuted}`}>Corporate Placement</span>
          <div className="text-2xl font-bold text-blue-400 mt-1">8 Partners</div>
          <span className={`text-[10px] ${textMuted}`}>MoU Signed</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Employment Index")}>
          <span className={`font-semibold block ${textMuted}`}>Platform Status</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">Connected</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-bold">
            <FiTrendingUp className="w-3 h-3" /> System Synchronized
          </span>
        </div>
      </div>
    </div>
  );
};
