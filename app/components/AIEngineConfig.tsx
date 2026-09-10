import React, { useState } from 'react';
import { FiCpu, FiSliders, FiCheckCircle } from 'react-icons/fi';
import { saveAIWeights } from '../lib/api';

interface AIEngineConfigProps {
  onSaveWeights: () => void;
  isDarkMode?: boolean;
}

export const AIEngineConfig: React.FC<AIEngineConfigProps> = ({ onSaveWeights, isDarkMode = false }) => {
  const [aptitude, setAptitude] = useState(40);
  const [interest, setInterest] = useState(35);
  const [market, setMarket] = useState(25);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await saveAIWeights({ aptitude, interest, market });
    setIsSaving(false);
    onSaveWeights();
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

  return (
    <div className="space-y-6 mb-8 font-sans">
      <div className={`rounded-2xl border p-6 transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between mb-4 pb-3 border-b ${borderDivider}`}>
          <div className="flex items-center gap-2">
<<<<<<< HEAD
            <Brain className="w-5 h-5 text-blue-500 animate-pulse" />
            <h2 className={`text-lg font-semibold ${textHeading}`}>AI Career Intelligence Engine Configuration</h2>
          </div>
          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-medium px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Custom ML Models Operational
=======
            <FiCpu className="w-5 h-5 text-blue-500 animate-pulse" />
            <h2 className={`text-lg font-bold ${textHeading}`}>AI Career Intelligence Engine Configuration</h2>
          </div>
          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
            <FiCheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Custom ML Models Operational
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Slider Tuning Form */}
<<<<<<< HEAD
          <div className="space-y-5">
            <h3 className={`font-semibold text-base flex items-center gap-2 ${textHeading}`}>
              <Sliders className="w-4 h-4 text-blue-500" />
=======
          <div className="space-y-5 text-xs">
            <h3 className={`font-bold text-sm flex items-center gap-2 ${textHeading}`}>
              <FiSliders className="w-4 h-4 text-blue-500" />
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              Algorithm Weighting Parameters
            </h3>

            <div>
              <div className={`flex justify-between text-sm font-medium mb-1.5 ${textHeading}`}>
                <span>Academic Aptitude Score Weight</span>
                <span className="text-blue-500 font-semibold">{aptitude}%</span>
              </div>
              <input 
                type="range"
                min="10"
                max="80"
                value={aptitude}
                onChange={(e) => setAptitude(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className={`flex justify-between text-sm font-medium mb-1.5 ${textHeading}`}>
                <span>Psychometric Interest Fit Weight</span>
                <span className="text-blue-500 font-semibold">{interest}%</span>
              </div>
              <input 
                type="range"
                min="10"
                max="80"
                value={interest}
                onChange={(e) => setInterest(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className={`flex justify-between text-sm font-medium mb-1.5 ${textHeading}`}>
                <span>Industry Market Demand Weight</span>
                <span className="text-blue-500 font-semibold">{market}%</span>
              </div>
              <input 
                type="range"
                min="10"
                max="80"
                value={market}
                onChange={(e) => setMarket(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <button
              onClick={handleSave}
<<<<<<< HEAD
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 rounded-xl transition cursor-pointer shadow-md shadow-blue-500/20"
=======
              disabled={isSaving}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-xl transition cursor-pointer"
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            >
              {isSaving ? 'Applying AI Weights...' : 'Apply AI Recommendation Weights'}
            </button>
          </div>

          {/* Microservices Health Dashboard */}
          <div className={`p-5 rounded-2xl border ${subCardClass}`}>
<<<<<<< HEAD
            <h3 className={`font-semibold text-base mb-4 ${textHeading}`}>AI Microservice Telemetry</h3>
            <div className="space-y-3">
=======
            <h3 className={`font-bold text-sm mb-4 ${textHeading}`}>AI Engine Modules</h3>
            <div className="space-y-3 text-xs">
>>>>>>> origin/omsai
              {[
                { name: "Neural Candidate Matcher v2.4", status: "Operational", latency: "18ms" },
                { name: "Holland RIASEC Scoring Model", status: "Operational", latency: "12ms" },
                { name: "ATS Resume Keyphrase Parser", status: "Operational", latency: "42ms" },
                { name: "Scholarship Match Auditor", status: "Operational", latency: "15ms" }
              ].map((m, i) => (
                <div key={i} className={`p-3 rounded-xl border flex items-center justify-between ${
                  isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-blue-100'
                }`}>
                  <div>
                    <div className={`text-sm font-medium ${textHeading}`}>{m.name}</div>
                    <div className={`text-xs font-normal ${textMuted}`}>Latency: {m.latency}</div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 font-medium px-2.5 py-0.5 rounded-full text-xs">
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
