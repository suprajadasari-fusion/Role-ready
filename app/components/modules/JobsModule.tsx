import { useState } from 'react';
import { 
  FaBriefcase, 
  FaMagnifyingGlass, 
  FaBookmark, 
  FaRegBookmark, 
  FaPaperPlane, 
  FaCircleCheck, 
  FaCircleExclamation 
} from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '~/store/store';
import { toggleSaveJob, applyToJob, setSearchQuery, setSelectedCategory } from '~/store/slices/jobsSlice';
import { addNotification } from '~/store/slices/notificationsSlice';
import { jobApplicationSchema } from '~/lib/validation';
import { JobItem } from '~/lib/apiService';

interface JobsModuleProps {
  onShowToast: (msg: string) => void;
  isDarkMode?: boolean;
}

export const JobsModule: React.FC<JobsModuleProps> = ({ onShowToast, isDarkMode = true }) => {
  const dispatch = useAppDispatch();
  const { jobsList, savedJobIds, appliedJobIds, searchQuery, selectedCategory } = useAppSelector(state => state.jobs);

  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);

  // Zod Application Modal State
  const [appForm, setAppForm] = useState({
    fullName: 'Alex Rivera',
    email: 'alex.rivera@student.role-ready.ai',
    phone: '+91 98765 43210',
    experienceLevel: '0 - 2 Years',
    coverLetter: 'I am highly interested in applying for this position. I possess strong experience in React 19, Redux Toolkit, and Python machine learning pipelines.',
    availableFrom: 'Immediate (0 - 15 Days)'
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const filteredJobs = jobsList.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || j.type === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const cardClass = isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-blue-100 text-slate-900 shadow-xs';
  const subCardClass = isDarkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-blue-50/40 border-blue-100';

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    const result = jobApplicationSchema.safeParse({
      jobId: selectedJob.id,
      ...appForm
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(fieldErrors);
      return;
    }

    dispatch(applyToJob(selectedJob.id));
    dispatch(addNotification({
      title: 'Job Application Received',
      message: `Successfully applied to ${selectedJob.title} at ${selectedJob.company}!`,
      category: 'jobs'
    }));

    onShowToast(`Application submitted for ${selectedJob.title} at ${selectedJob.company}!`);
    setSelectedJob(null);
    setFormErrors({});
  };

  return (
    <div role="main" aria-label="Jobs and Corporate Internships Board" className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${cardClass}`}>
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaBriefcase className="w-5 h-5 text-blue-500" /> Jobs & Corporate Internships Marketplace
          </h2>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Explore top corporate requisitions matched with your AI Neural Skill Score in INR.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <FaMagnifyingGlass className="w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search jobs, tech skills..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              aria-label="Search job postings"
              className={`pl-9 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
            aria-label="Filter job type"
            className={`px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          >
            <option value="All">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredJobs.map((job) => {
          const isSaved = savedJobIds.includes(job.id);
          const isApplied = appliedJobIds.includes(job.id);

          return (
            <div key={job.id} className={`p-5 rounded-2xl border space-y-4 flex flex-col justify-between ${subCardClass}`}>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-md border border-emerald-500/30">
                    {job.matchScore}% Neural Match
                  </span>
                  <button
                    onClick={() => dispatch(toggleSaveJob(job.id))}
                    aria-label={isSaved ? "Unbookmark job" : "Bookmark job"}
                    className="text-slate-400 hover:text-amber-400 cursor-pointer transition p-1"
                  >
                    {isSaved ? <FaBookmark className="w-4 h-4 text-amber-400" /> : <FaRegBookmark className="w-4 h-4" />}
                  </button>
                </div>

                <div>
                  <h3 className="font-semibold text-base leading-snug">{job.title}</h3>
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{job.company} • {job.location}</span>
                </div>

                <div className="text-blue-400 font-bold text-sm">{job.salary}</div>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{job.description}</p>

                <div className="flex flex-wrap gap-1">
                  {job.tags.map((t, idx) => (
                    <span key={idx} className={`text-xs px-2 py-0.5 rounded-md font-medium border ${
                      isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-blue-100 text-slate-700'
                    }`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700/50 flex justify-between items-center">
                <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{job.postedDate}</span>
                {isApplied ? (
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1">
                    <FaCircleCheck className="w-3.5 h-3.5" /> Applied
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setFormErrors({});
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5"
                  >
                    <FaPaperPlane className="w-3 h-3" /> Easy Apply
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Easy Apply Modal with Zod Validation */}
      {selectedJob && (
        <div role="dialog" aria-modal="true" aria-labelledby="job-modal-title" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl space-y-5 ${cardClass}`}>
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs text-blue-400 font-semibold">{selectedJob.company}</span>
                <h3 id="job-modal-title" className="text-lg font-bold text-white">{selectedJob.title}</h3>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-slate-400 hover:text-white font-bold p-1 cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Full Candidate Name</label>
                <input
                  type="text"
                  value={appForm.fullName}
                  onChange={(e) => setAppForm({ ...appForm, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.fullName && <span className="text-rose-400 text-xs mt-1 block">{formErrors.fullName}</span>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Email</label>
                  <input
                    type="email"
                    value={appForm.email}
                    onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formErrors.email && <span className="text-rose-400 text-xs mt-1 block">{formErrors.email}</span>}
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Phone</label>
                  <input
                    type="text"
                    value={appForm.phone}
                    onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formErrors.phone && <span className="text-rose-400 text-xs mt-1 block">{formErrors.phone}</span>}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Cover Letter & Pitch</label>
                <textarea
                  rows={4}
                  value={appForm.coverLetter}
                  onChange={(e) => setAppForm({ ...appForm, coverLetter: e.target.value })}
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.coverLetter && <span className="text-rose-400 text-xs mt-1 block">{formErrors.coverLetter}</span>}
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
