import React, { useState } from 'react';
import { 
  FaBookOpen, 
  FaFire, 
  FaPlay, 
  FaCircleCheck, 
  FaAward, 
  FaClock, 
  FaStar,
  FaDownload
} from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '~/store/store';
import { updateCourseProgress, incrementStreak } from '~/store/slices/learningSlice';
import { addNotification } from '~/store/slices/notificationsSlice';

interface LearningCenterModuleProps {
  onShowToast: (msg: string) => void;
  isDarkMode?: boolean;
}

export const LearningCenterModule: React.FC<LearningCenterModuleProps> = ({ onShowToast, isDarkMode = true }) => {
  const dispatch = useAppDispatch();
  const { courses, streakDays } = useAppSelector(state => state.learning);
  const [activeCourseModal, setActiveCourseModal] = useState<any | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const cardClass = isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-blue-100 text-slate-900 shadow-xs';
  const subCardClass = isDarkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-blue-50/40 border-blue-100';

  const handleLessonComplete = (courseId: string) => {
    dispatch(updateCourseProgress({
      courseId,
      progress: 95,
      completedModules: 11
    }));
    dispatch(incrementStreak());
    dispatch(addNotification({
      title: 'Lesson Milestone Completed',
      message: 'You completed a course lesson and maintained your daily study streak!',
      category: 'learning'
    }));
    onShowToast('Lesson completed! Daily study streak updated to ' + (streakDays + 1) + ' days!');
  };

  return (
    <div role="main" aria-label="Learning Center and Skill Bootcamps" className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${cardClass}`}>
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaBookOpen className="w-5 h-5 text-blue-500" /> Learning Center & Skill Mastery Tracks
          </h2>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Interactive industry bootcamps, automated quiz evaluation, and downloadable certification badges.
          </p>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-2xl">
          <FaFire className="w-5 h-5 text-amber-500 animate-bounce" />
          <div>
            <div className="text-sm font-bold text-amber-400">{streakDays}-Day Study Streak!</div>
            <div className="text-xs text-amber-300/80">Active Learning Goal Met</div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {courses.map((crs) => (
          <div key={crs.id} className={`p-5 rounded-2xl border space-y-4 flex flex-col justify-between ${subCardClass}`}>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-blue-400 bg-blue-500/20 px-2.5 py-0.5 rounded-md border border-blue-500/30">
                  {crs.category}
                </span>
                <span className="text-amber-400 text-xs font-bold flex items-center gap-1">
                  <FaStar className="w-3 h-3 text-amber-400" /> {crs.rating}
                </span>
              </div>

              <h3 className="font-semibold text-base leading-snug">{crs.title}</h3>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Instructor: {crs.instructor}</p>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>Modules ({crs.completedModules}/{crs.totalModules})</span>
                  <span className="text-blue-400 font-bold">{crs.progress}%</span>
                </div>
                <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                  <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${crs.progress}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 text-slate-400">
                <span><FaClock className="inline w-3 h-3 text-blue-400 mr-1" /> {crs.duration}</span>
                <span className="text-emerald-400 font-medium">{crs.certBadge}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/50 flex gap-2">
              <button
                onClick={() => {
                  setActiveCourseModal(crs);
                  setQuizScore(null);
                  setSelectedAnswer(null);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <FaPlay className="w-3 h-3" /> Resume Course
              </button>
              {crs.progress >= 80 && (
                <button
                  onClick={() => onShowToast(`Downloaded Official Certificate for ${crs.title}!`)}
                  aria-label="Download Certificate"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl text-xs transition cursor-pointer"
                >
                  <FaDownload className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Video & Quiz Modal */}
      {activeCourseModal && (
        <div role="dialog" aria-modal="true" aria-labelledby="course-modal-title" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl p-6 rounded-2xl border shadow-2xl space-y-5 ${cardClass}`}>
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs text-blue-400 font-semibold">{activeCourseModal.category}</span>
                <h3 id="course-modal-title" className="text-lg font-bold text-white">{activeCourseModal.title}</h3>
              </div>
              <button onClick={() => setActiveCourseModal(null)} className="text-slate-400 hover:text-white font-bold p-1 cursor-pointer">✕</button>
            </div>

            {/* Video Player Mock */}
            <div className="relative w-full h-48 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              <button 
                onClick={() => handleLessonComplete(activeCourseModal.id)}
                className="z-10 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition shadow-lg cursor-pointer group-hover:scale-110"
              >
                <FaPlay className="w-5 h-5 ml-1" />
              </button>
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-xs text-slate-300 font-mono">
                <span>Module 11: Real-time State & Async Thunks</span>
                <span>14:20 / 22:00</span>
              </div>
            </div>

            {/* Instant Knowledge Quiz */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <FaAward className="w-4 h-4 text-blue-400" /> Module Knowledge Quiz Check
              </h4>
              <p className="text-xs text-slate-300">
                Which Redux Toolkit function is used to automatically generate action creators and action types based on reducers?
              </p>

              <div className="space-y-2">
                {['A) createStore()', 'B) createSlice()', 'C) combineReducers()', 'D) applyMiddleware()'].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedAnswer(idx);
                      if (idx === 1) {
                        setQuizScore(100);
                      } else {
                        setQuizScore(50);
                      }
                    }}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition cursor-pointer ${
                      selectedAnswer === idx
                        ? idx === 1 ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300' : 'bg-rose-600/30 border-rose-500 text-rose-300'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {quizScore !== null && (
                <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                  quizScore === 100 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                }`}>
                  <span>{quizScore === 100 ? '✓ Correct! createSlice() simplifies Redux state logic.' : '✕ Incorrect. Try option B (createSlice()).'}</span>
                  <span>Score: {quizScore}/100</span>
                </div>
              )}
            </div>

            <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => handleLessonComplete(activeCourseModal.id)}
                className="px-5 py-2 rounded-xl text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <FaCircleCheck className="w-3.5 h-3.5" /> Mark Module Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
