import { useState } from 'react';
import { 
  FaBrain, 
  FaMicrophone, 
  FaPaperPlane, 
  FaCircleCheck, 
  FaRotateRight, 
  FaDownload, 
  FaVideo,
  FaAward
} from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '~/store/store';
import { saveAnswer, nextQuestion, prevQuestion, completeSession, resetSession, setTargetRole } from '~/store/slices/interviewSlice';
import { addNotification } from '~/store/slices/notificationsSlice';

interface InterviewAIModuleProps {
  onShowToast: (msg: string) => void;
  isDarkMode?: boolean;
}

export const InterviewAIModule: React.FC<InterviewAIModuleProps> = ({ onShowToast, isDarkMode = true }) => {
  const dispatch = useAppDispatch();
  const { targetRole, activeQuestionIndex, questions, userAnswers, isCompleted, overallScore, feedbacks } = useAppSelector(state => state.interview);

  const [currentInput, setCurrentInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const cardClass = isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-blue-100 text-slate-900 shadow-xs';
  const subCardClass = isDarkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-blue-50/40 border-blue-100';

  const currentQuestionText = questions[activeQuestionIndex];

  const handleSaveCurrentAnswer = () => {
    if (!currentInput.trim()) return;
    dispatch(saveAnswer({ index: activeQuestionIndex, answer: currentInput }));
    if (activeQuestionIndex < questions.length - 1) {
      dispatch(nextQuestion());
      setCurrentInput(userAnswers[activeQuestionIndex + 1] || '');
    } else {
      const sampleFeedbacks = questions.map((q, i) => ({
        question: q,
        answerText: userAnswers[i] || currentInput || 'Answered during AI live audio practice.',
        score: 90 - (i * 2),
        grammarRating: '95% Excellent',
        techAccuracy: 'High Conceptual Depth',
        aiSuggestion: 'Strong architectural reasoning. Consider adding specific benchmark metrics.'
      }));
      dispatch(completeSession({ score: 92, feedbacks: sampleFeedbacks }));
      dispatch(addNotification({
        title: 'AI Mock Interview Evaluated',
        message: 'Your AI Mock Interview feedback scorecard is ready (Score: 92/100)!',
        category: 'interview'
      }));
      onShowToast('AI Interview practice finished! Evaluation Scorecard generated (92/100)!');
    }
  };

  const handleSimulateVoiceInput = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setCurrentInput('In Transformer models, multi-head attention projects queries, keys, and values into parallel subspace representations. This enables the model to simultaneously attend to information from different representation subspaces at different positions, significantly boosting expressive power over single-head attention.');
      onShowToast('Simulated AI voice-to-text input recorded successfully!');
    }, 2000);
  };

  return (
    <div role="main" aria-label="Interview AI Simulator Desk" className="space-y-6 font-sans w-full max-w-full overflow-hidden">
      {/* Top Banner */}
      <div className={`p-5 sm:p-6 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${cardClass}`}>
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 truncate">
            <FaBrain className="w-5 h-5 text-blue-500 shrink-0" />
            <span className="truncate">Interview AI Practice & Real-Time Evaluator Desk</span>
          </h2>
          <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Practice live technical & behavioral questions with real-time AI speech evaluation and confidence scoring.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <select
            value={targetRole}
            onChange={(e) => dispatch(setTargetRole(e.target.value))}
            aria-label="Target Role Selector"
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-full"
          >
            <option value="AI & Machine Learning Architect">AI & ML Architect</option>
            <option value="Fullstack React & Node.js Developer">Fullstack React Developer</option>
            <option value="Quantitative Risk Analyst">Quantitative Risk Analyst</option>
            <option value="Cloud Security Engineer">Cloud Security Engineer</option>
          </select>

          <button
            onClick={() => {
              dispatch(resetSession());
              setCurrentInput('');
              onShowToast('Reset AI Interview Session');
            }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-xl text-xs cursor-pointer border border-slate-700 shrink-0"
            title="Reset Session"
          >
            <FaRotateRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isCompleted ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-w-0">
          {/* Main Interview Practice Box */}
          <div className={`lg:col-span-2 p-5 sm:p-6 rounded-2xl border space-y-5 min-w-0 ${cardClass}`}>
            <div className="flex flex-wrap justify-between items-center pb-3 border-b border-slate-800 gap-2">
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30 shrink-0">
                Question {activeQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-xs text-slate-400 truncate">Target Role: {targetRole}</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block">AI Interviewer Question:</span>
              <p className="text-sm sm:text-base font-semibold text-white leading-relaxed break-words">{currentQuestionText}</p>
            </div>

            <div className="space-y-3 min-w-0">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <label className="text-xs font-medium text-slate-300">Your Answer (Type or Speak into Microphone)</label>
                <button
                  type="button"
                  onClick={handleSimulateVoiceInput}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer border transition shrink-0 ${
                    isRecording 
                      ? 'bg-rose-600 text-white border-rose-500 animate-pulse' 
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <FaMicrophone className={`w-3 h-3 ${isRecording ? 'text-white' : 'text-rose-400'}`} />
                  <span>{isRecording ? 'Recording Speech...' : 'Voice Practice Mode'}</span>
                </button>
              </div>

              <textarea
                rows={6}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Structure your answer using the STAR framework (Situation, Task, Action, Result)..."
                className="w-full p-4 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
              />
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-wrap justify-between items-center gap-3">
              <button
                onClick={() => {
                  if (activeQuestionIndex > 0) {
                    dispatch(prevQuestion());
                    setCurrentInput(userAnswers[activeQuestionIndex - 1] || '');
                  }
                }}
                disabled={activeQuestionIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
              >
                Previous
              </button>

              <button
                onClick={handleSaveCurrentAnswer}
                className="px-5 py-2.5 rounded-xl text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer flex items-center gap-1.5 shadow-lg shadow-blue-500/20"
              >
                <span>{activeQuestionIndex === questions.length - 1 ? 'Submit & Finalize AI Interview' : 'Next Question'}</span>
                <FaPaperPlane className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* AI Avatar & Real-time Metrics Sidebar */}
          <div className={`p-5 sm:p-6 rounded-2xl border space-y-5 flex flex-col justify-between min-w-0 ${subCardClass}`}>
            <div className="space-y-4 min-w-0">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                  <FaVideo className="w-7 h-7 sm:w-8 sm:h-8 animate-pulse" />
                </div>
                <h3 className="text-sm font-bold text-white truncate">AI Neural Evaluator v2.4</h3>
                <span className="inline-block text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                  Listening Active
                </span>
              </div>

              <div className="space-y-3 pt-2 text-xs min-w-0">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block truncate">Grammar & Fluency</span>
                  <span className="text-sm font-bold text-emerald-400 block truncate">96% Optimal</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block truncate">Technical Depth Index</span>
                  <span className="text-sm font-bold text-blue-400 block truncate">Advanced Architectural</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Evaluation Scorecard View */
        <div className={`p-6 sm:p-8 rounded-2xl border space-y-6 min-w-0 ${cardClass}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-3">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
                Evaluation Scorecard Ready
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">AI Mock Interview Results</h3>
            </div>
            <div className="sm:text-right">
              <div className="text-3xl font-extrabold text-blue-400">{overallScore} / 100</div>
              <span className="text-xs text-slate-400">Top 5% Candidate Performance</span>
            </div>
          </div>

          <div className="space-y-4 min-w-0">
            <h4 className="text-sm font-bold text-white">Question-by-Question Breakdown:</h4>
            {feedbacks.map((fb, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2 min-w-0">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <span className="text-xs font-bold text-blue-400">Q{idx + 1}: {fb.question}</span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-md shrink-0">{fb.score}/100</span>
                </div>
                <p className="text-xs text-slate-300 italic break-words">" {fb.answerText} "</p>
                <div className="text-xs text-blue-300 font-medium pt-1 break-words">✨ AI Feedback: {fb.aiSuggestion}</div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap justify-end gap-3">
            <button
              onClick={() => dispatch(resetSession())}
              className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition cursor-pointer"
            >
              Practice Another Session
            </button>
            <button
              onClick={() => onShowToast('Downloaded Official Interview Evaluation Report PDF!')}
              className="px-5 py-2 rounded-xl text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer flex items-center gap-1.5"
            >
              <FaDownload className="w-3.5 h-3.5" /> Download Scorecard PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
