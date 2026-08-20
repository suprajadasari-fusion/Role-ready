import { useState } from 'react';
import { 
  FaFileCode, 
  FaUpload, 
  FaStar, 
  FaDownload, 
  FaPlus, 
  FaTrash, 
  FaCircleCheck, 
  FaCircleExclamation 
} from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '~/store/store';
import { updateContactInfo, runAtsScan } from '~/store/slices/resumeSlice';
import { addNotification } from '~/store/slices/notificationsSlice';
import { resumeSchema } from '~/lib/validation';

interface ResumeBuilderModuleProps {
  onShowToast: (msg: string) => void;
  isDarkMode?: boolean;
}

export const ResumeBuilderModule: React.FC<ResumeBuilderModuleProps> = ({ onShowToast, isDarkMode = true }) => {
  const dispatch = useAppDispatch();
  const resumeState = useAppSelector(state => state.resume);

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [formData, setFormData] = useState({
    fullName: resumeState.fullName,
    email: resumeState.email,
    phone: resumeState.phone,
    location: resumeState.location,
    linkedin: resumeState.linkedin,
    github: resumeState.github,
    summary: resumeState.summary,
    skills: resumeState.skills
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const cardClass = isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-blue-100 text-slate-900 shadow-xs';
  const subCardClass = isDarkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-blue-50/40 border-blue-100';

  const handleScanAts = () => {
    const validation = resumeSchema.safeParse({
      ...formData,
      education: resumeState.education,
      experience: resumeState.experience
    });

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(errors);
      onShowToast('Please fix resume validation errors before scanning.');
      return;
    }

    dispatch(updateContactInfo(formData));
    dispatch(runAtsScan());
    dispatch(addNotification({
      title: 'Resume ATS Scan Completed',
      message: `Your resume ATS Score is now ${resumeState.atsScore}/100. Ready for application!`,
      category: 'system'
    }));

    onShowToast(`AI Scan completed! ATS Compatibility boosted to ${resumeState.atsScore}/100!`);
    setFormErrors({});
  };

  return (
    <div role="main" aria-label="Interactive Resume Builder and ATS Scanner" className="space-y-6 font-sans w-full max-w-full overflow-hidden">
      {/* Top Banner */}
      <div className={`p-5 sm:p-6 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${cardClass}`}>
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 truncate">
            <FaFileCode className="w-5 h-5 text-blue-500 shrink-0" />
            <span className="truncate">Interactive Resume Builder & AI ATS Scanner</span>
          </h2>
          <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Scan resume against corporate ATS parsers, optimize keyword density, and download PDF resumes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                activeTab === 'editor' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Form Editor
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                activeTab === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Live Preview
            </button>
          </div>

          <button
            onClick={handleScanAts}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <FaStar className="w-3.5 h-3.5" /> Run AI ATS Scan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-w-0">
        {/* Editor or Preview Pane */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          {activeTab === 'editor' ? (
            <div className={`p-5 sm:p-6 rounded-2xl border space-y-5 min-w-0 ${cardClass}`}>
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Personal Details & Summary</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formErrors.fullName && <span className="text-rose-400 text-xs mt-1 block">{formErrors.fullName}</span>}
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formErrors.email && <span className="text-rose-400 text-xs mt-1 block">{formErrors.email}</span>}
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Location (City, State)</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Professional Summary</label>
                <textarea
                  rows={4}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.summary && <span className="text-rose-400 text-xs mt-1 block">{formErrors.summary}</span>}
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Key Technical Skills (comma separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : (
            <div className={`p-6 sm:p-8 rounded-2xl border font-sans space-y-6 min-w-0 ${cardClass}`}>
              <div className="border-b border-slate-800 pb-4 text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-white">{formData.fullName}</h2>
                <div className="text-xs text-slate-400 mt-1 flex flex-wrap justify-center gap-2 sm:gap-3">
                  <span>{formData.email}</span> • <span>{formData.phone}</span> • <span>{formData.location}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">Professional Summary</h3>
                <p className="text-xs leading-relaxed text-slate-300 break-words">{formData.summary}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">Education & Credentials</h3>
                {resumeState.education.map((edu) => (
                  <div key={edu.id} className="text-xs text-slate-300 flex justify-between gap-2">
                    <div>
                      <strong className="text-white block">{edu.institution}</strong>
                      <span>{edu.degree}</span>
                    </div>
                    <span className="text-slate-400 font-mono shrink-0">{edu.year}</span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">Work Experience & Achievements</h3>
                {resumeState.experience.map((exp) => (
                  <div key={exp.id} className="space-y-1 text-xs text-slate-300">
                    <div className="flex justify-between font-bold text-white gap-2">
                      <span>{exp.role} — {exp.company}</span>
                      <span className="text-slate-400 font-mono shrink-0">{exp.duration}</span>
                    </div>
                    <p className="text-slate-400 break-words">{exp.description}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">Key Skillstack</h3>
                <div className="flex flex-wrap gap-1">
                  {formData.skills.split(',').map((sk, i) => (
                    <span key={i} className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2.5 py-0.5 rounded-md">
                      {sk.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ATS Score & Analytics Sidebar */}
        <div className={`p-5 sm:p-6 rounded-2xl border space-y-5 flex flex-col justify-between min-w-0 ${subCardClass}`}>
          <div className="space-y-4 min-w-0">
            <h3 className="text-base font-bold text-white flex items-center justify-between gap-2">
              <span>ATS Compatibility Score</span>
              <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-md border border-emerald-500/30 shrink-0">
                Verified Parser
              </span>
            </h3>

            <div className="text-center py-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">{resumeState.atsScore} / 100</div>
              <span className="text-xs text-slate-400">High Match for Tier-1 Enterprises</span>
            </div>

            <div className="space-y-2 text-xs min-w-0">
              <h4 className="font-semibold text-white">AI ATS Scanner Feedback:</h4>
              {resumeState.atsFeedback.map((fb, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 font-medium break-words">
                  {fb}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onShowToast('Downloaded ATS PDF Resume!')}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-2"
          >
            <FaDownload className="w-3.5 h-3.5" /> Download ATS PDF Resume
          </button>
        </div>
      </div>
    </div>
  );
};
