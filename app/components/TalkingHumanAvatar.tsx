import React, { useState } from 'react';
import { 
  FaVolumeHigh, 
  FaStop, 
  FaWandMagicSparkles, 
  FaRobot
} from 'react-icons/fa6';

interface TalkingHumanAvatarProps {
  onShowToast: (msg: string) => void;
  isDarkMode?: boolean;
}

export const TalkingHumanAvatar: React.FC<TalkingHumanAvatarProps> = ({ 
  onShowToast, 
  isDarkMode = false 
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeechText, setCurrentSpeechText] = useState(
    "Hello! I am your AI Career Twin & Human Advisor. Based on your Career DNA score of 94%, you have an exceptional fit for AI & Machine Learning Architecture!"
  );
  const [userQuery, setUserQuery] = useState('');

  // Speech Synthesis
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onShowToast("Voice synthesis not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Preset Prompts
  const presetQuestions = [
    { 
      q: "What is my top career recommendation?", 
      a: "Based on your high logical reasoning score of 94%, your top recommendation is AI & Machine Learning Architect with an estimated package of ₹25 to ₹45 LPA!" 
    },
    { 
      q: "How can I boost my ATS resume score?", 
      a: "To boost your ATS resume score from 88 to 94, add key technical terms like PyTorch, Deep Learning, and System Architecture into your skills section." 
    },
    { 
      q: "Which scholarships am I eligible for?", 
      a: "You are currently eligible for the National Science Fellowship valued at ₹2,50,000 per year. The application deadline is April 15." 
    }
  ];

  const handleAskQuestion = (q: string, answer: string) => {
    setCurrentSpeechText(answer);
    speakText(answer);
    onShowToast(`AI Avatar: Speaking response for "${q}"`);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const response = `Great question about "${userQuery}". According to your Career DNA analysis, focusing on computational problem solving and practical project portfolios will accelerate your career roadmap.`;
    setCurrentSpeechText(response);
    speakText(response);
    setUserQuery('');
  };

  return (
    <div className={`rounded-3xl border p-6 shadow-2xl relative overflow-hidden font-sans mb-8 transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-slate-900 border-blue-500/30 text-white' 
        : 'bg-white border-blue-100 text-slate-900 shadow-md'
    }`}>
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* Human Avatar Image Container (4 Cols) */}
        <div className="md:col-span-4 flex flex-col items-center justify-center">
          <div className="relative group">
            {/* Speaking Glow Animation */}
            <div className={`absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 opacity-75 blur-md transition duration-300 ${
              isSpeaking ? 'animate-pulse opacity-100' : 'opacity-40'
            }`} />

            {/* Human Headshot Image */}
            <img 
              src="/human_avatar.jpg" 
              alt="AI Human Advisor Headshot" 
              className={`w-48 h-48 rounded-full object-cover border-4 shadow-2xl relative z-10 ${
                isDarkMode ? 'border-white/20' : 'border-blue-100'
              }`}
            />

            {/* Speaking Badge */}
            <div className={`absolute bottom-2 right-2 z-20 backdrop-blur-md px-3 py-1 rounded-full border text-xs font-medium flex items-center gap-1.5 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-900/90 border-blue-400/40 text-blue-300' 
                : 'bg-white/90 border-blue-200 text-blue-700'
            }`}>
              {isSpeaking ? (
                <>
                  <FaVolumeHigh className="w-3.5 h-3.5 text-emerald-500 animate-bounce" />
                  <span className="text-emerald-500 font-semibold">Speaking Out Loud...</span>
                </>
              ) : (
                <>
                  <FaWandMagicSparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>AI Advisor Active</span>
                </>
              )}
            </div>
          </div>

          <div className="mt-4 text-center">
            <h3 className={`font-semibold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Ananya Sharma
            </h3>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              Interactive AI Human Career Advisor
            </p>
          </div>
        </div>

        {/* Interactive Speech & Query Interface (8 Cols) */}
        <div className="md:col-span-8 space-y-4">
          {/* Active Speech Box */}
          <div className={`p-4 rounded-2xl backdrop-blur-md border ${
            isDarkMode 
              ? 'bg-slate-800/80 border-blue-500/30' 
              : 'bg-blue-50/60 border-blue-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-500 flex items-center gap-1.5">
                <FaRobot className="w-3.5 h-3.5" /> Live Voice Advice Speech
              </span>

              {isSpeaking ? (
                <button 
                  onClick={stopSpeech}
                  className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1"
                >
                  <FaStop className="w-3 h-3" /> Stop Voice
                </button>
              ) : (
                <button 
                  onClick={() => speakText(currentSpeechText)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <FaVolumeHigh className="w-3 h-3" /> Speak Out Loud
                </button>
              )}
            </div>

            <p className={`text-sm leading-relaxed font-normal ${
              isDarkMode ? 'text-slate-200' : 'text-slate-800'
            }`}>
              "{currentSpeechText}"
            </p>
          </div>

          {/* Quick Preset Voice Prompts */}
          <div>
            <label className={`block text-xs font-medium mb-2 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Ask AI Human Advisor Out Loud
            </label>
            <div className="flex flex-wrap gap-2">
              {presetQuestions.map((pq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskQuestion(pq.q, pq.a)}
                  className={`text-xs px-3 py-1.5 rounded-xl transition cursor-pointer font-medium text-left border ${
                    isDarkMode 
                      ? 'bg-blue-950/60 hover:bg-blue-600/30 border-blue-500/30 hover:border-blue-400 text-blue-200' 
                      : 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800'
                  }`}
                >
                  💬 {pq.q}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Question Form */}
          <form onSubmit={handleCustomSubmit} className="flex gap-2 pt-1">
            <input 
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Ask your AI Human Advisor anything about career pathways..."
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 border ${
                isDarkMode 
                  ? 'bg-slate-800 border-blue-500/30 text-white placeholder-slate-400' 
                  : 'bg-blue-50/50 border-blue-200 text-slate-900 placeholder-slate-400'
              }`}
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md shadow-blue-600/30"
            >
              <FaVolumeHigh className="w-3.5 h-3.5" />
              <span>Talk & Answer</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
