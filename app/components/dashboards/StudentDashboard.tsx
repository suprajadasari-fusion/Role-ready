import React from 'react';
import { 
  FaCompass, 
  FaBrain, 
  FaAward, 
  FaBookOpen, 
  FaFileCode, 
  FaBriefcase, 
  FaBullhorn, 
  FaArrowRight, 
  FaFire, 
  FaCircleCheck
} from 'react-icons/fa6';
import { useAppSelector } from '~/store/store';

interface StudentDashboardProps {
  onShowToast: (msg: string) => void;
  onNavigateView: (view: string) => void;
  isDarkMode?: boolean;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ 
  onShowToast, 
  onNavigateView, 
  isDarkMode = true 
}) => {
  const profile = useAppSelector(state => state.profile);
  const { streakDays } = useAppSelector(state => state.learning);
  const { atsScore } = useAppSelector(state => state.resume);
  const { unreadCount } = useAppSelector(state => state.notifications);
  const { savedJobIds } = useAppSelector(state => state.jobs);

  const cardClass = isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-blue-100 text-slate-900 shadow-xs';
  const subCardClass = isDarkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-blue-50/40 border-blue-100';

  return (
    <div role="main" aria-label="Student Unified Workspace Dashboard" className="space-y-6 font-sans">
      {/* Welcome Hero Banner */}
      <div className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-6 ${cardClass}`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-2.5 py-0.5 rounded-md border border-blue-500/30">
              Student Career Workspace
            </span>
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2.5 py-0.5 rounded-md border border-emerald-500/30">
              AI Readiness: 94/100
            </span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            Welcome back, {profile.name}! 👋
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Target Career Goal: <strong className="text-blue-400">{profile.targetCareer}</strong> • {profile.institution}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateView('interview-ai')}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <FaBrain className="w-4 h-4 text-blue-200" /> Launch AI Interview
          </button>
          <button
            onClick={() => onNavigateView('resume-builder')}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2"
          >
            <FaFileCode className="w-4 h-4 text-emerald-400" /> ATS Resume ({atsScore}/100)
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div className={`p-5 rounded-2xl border space-y-2 ${subCardClass}`}>
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Study Streak</span>
            <FaFire className="w-4 h-4 text-amber-500 animate-bounce" />
          </div>
          <div className="text-2xl font-bold text-white">{streakDays} Days</div>
          <span className="text-emerald-400 text-xs font-semibold">Active Goal Met</span>
        </div>

        <div className={`p-5 rounded-2xl border space-y-2 ${subCardClass}`}>
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>ATS Resume Score</span>
            <FaFileCode className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400">{atsScore} / 100</div>
          <span className="text-blue-300 text-xs font-semibold">Verified Parser Compliant</span>
        </div>

        <div className={`p-5 rounded-2xl border space-y-2 ${subCardClass}`}>
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Saved Jobs</span>
            <FaBriefcase className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">{savedJobIds.length} Opportunities</div>
          <span className="text-emerald-300 text-xs font-semibold">Ready for Application</span>
        </div>

        <div className={`p-5 rounded-2xl border space-y-2 ${subCardClass}`}>
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>Unread Alerts</span>
            <FaBullhorn className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-purple-400">{unreadCount} Alerts</div>
          <span className="text-purple-300 text-xs font-semibold">System & Job Matches</span>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className={`p-6 rounded-2xl border space-y-4 ${cardClass}`}>
        <h3 className="text-base font-bold text-white">Quick Module Shortcuts</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 'discover', title: 'Career Discovery', desc: '500+ AI fit pathways', icon: FaCompass, color: 'text-blue-400' },
            { id: 'scholarships', title: 'Scholarships', desc: '₹1.5Cr available aid', icon: FaAward, color: 'text-emerald-400' },
            { id: 'learning-center', title: 'Learning Hub', desc: 'Skill bootcamps & streak', icon: FaBookOpen, color: 'text-amber-400' },
            { id: 'interview-ai', title: 'Interview AI', desc: 'Real-time mock simulator', icon: FaBrain, color: 'text-purple-400' },
            { id: 'resume-builder', title: 'Resume ATS', desc: 'AI scanner & PDF generator', icon: FaFileCode, color: 'text-blue-400' },
            { id: 'jobs', title: 'Jobs & Internships', desc: 'Corporate hiring requisitions', icon: FaBriefcase, color: 'text-emerald-400' },
            { id: 'notifications', title: 'Notifications', desc: 'Alerts & status pipeline', icon: FaBullhorn, color: 'text-purple-400' },
            { id: 'profile', title: 'User Profile', desc: 'Personal details & security', icon: FaCircleCheck, color: 'text-blue-400' }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigateView(item.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/50 cursor-pointer space-y-2 ${subCardClass}`}
              >
                <div className="flex justify-between items-center">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <FaArrowRight className="w-3 h-3 text-slate-500" />
                </div>
                <h4 className="font-semibold text-xs text-white">{item.title}</h4>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
