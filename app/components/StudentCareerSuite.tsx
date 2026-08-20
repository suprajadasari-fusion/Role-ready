import React, { useState } from 'react';
import { 
<<<<<<< HEAD
  FaCompass, 
  FaClipboardList, 
  FaBrain, 
  FaDna, 
  FaWandMagicSparkles, 
  FaAward, 
  FaGraduationCap, 
  FaRoute, 
  FaFileCode, 
  FaChartLine, 
  FaCircleCheck, 
  FaArrowRight, 
  FaMagnifyingGlass, 
  FaDownload, 
  FaStar, 
  FaFire, 
  FaClock, 
  FaUpload, 
  FaBolt,
  FaBookOpen,
  FaBriefcase
} from 'react-icons/fa6';
=======
  FiCompass, 
  FiClipboard, 
  FiCpu, 
  FiZap, 
  FiAward, 
  FiBookOpen, 
  FiTrendingUp, 
  FiCheckCircle, 
  FiArrowRight, 
  FiSearch, 
  FiDownload, 
  FiStar, 
  FiClock, 
  FiUpload, 
  FiGrid,
  FiBriefcase,
  FiDollarSign,
  FiFileText
} from 'react-icons/fi';
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c

import { TalkingHumanAvatar } from './TalkingHumanAvatar';

interface StudentCareerSuiteProps {
  onShowToast: (msg: string) => void;
  isDarkMode?: boolean;
}

export const StudentCareerSuite: React.FC<StudentCareerSuiteProps> = ({ 
  onShowToast, 
  isDarkMode = false 
}) => {
  const [activeTab, setActiveTab] = useState<
    'discovery' | 'assessment' | 'psychometric' | 'dna' | 'ai-recs' | 'scholarships' | 'colleges' | 'roadmap' | 'resume' | 'learning'
  >('discovery');

  // Psychometric Quiz State
  const [riasecScores, setRiasecScores] = useState({
    investigative: 88,
    realistic: 72,
    artistic: 81,
    social: 65,
    enterprising: 90,
    conventional: 60
  });

  // Resume ATS Score State
  const [resumeText, setResumeText] = useState("Software Engineer candidate with React, TypeScript, Node.js, and Python ML background...");
  const [atsScore, setAtsScore] = useState(88);

  const tabs: Array<{ id: typeof activeTab; label: string; icon: any }> = [
    { id: 'discovery', label: '1. Career Discovery', icon: FiCompass },
    { id: 'assessment', label: '2. Assessments', icon: FiClipboard },
    { id: 'psychometric', label: '3. Psychometric Test', icon: FiCpu },
    { id: 'dna', label: '4. Career DNA', icon: FiZap },
    { id: 'ai-recs', label: '5. AI Recommendations', icon: FiCpu },
    { id: 'scholarships', label: '6. Scholarships', icon: FiAward },
    { id: 'colleges', label: '7. College Explorer', icon: FiBookOpen },
    { id: 'roadmap', label: '8. Career Roadmap', icon: FiTrendingUp },
    { id: 'resume', label: '9. Resume ATS Score', icon: FiFileText },
    { id: 'learning', label: '10. Learning Progress', icon: FiTrendingUp }
  ];

  const cardClass = isDarkMode
    ? 'bg-slate-900 border-slate-800 text-white shadow-lg'
    : 'bg-white border-blue-100 text-slate-900 shadow-xs';

  const subCardClass = isDarkMode
    ? 'bg-slate-800/80 border-slate-700/80'
    : 'bg-blue-50/30 border-blue-100';

  const textMuted = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const textHeading = isDarkMode ? 'text-white' : 'text-slate-900';

  return (
    <div className="space-y-6 mb-8 font-sans">
      {/* Interactive AI Talking Human Avatar Advisor */}
      <TalkingHumanAvatar onShowToast={onShowToast} isDarkMode={isDarkMode} />

      {/* 10 Feature Tabs Bar */}
      <div className={`rounded-2xl border p-3 overflow-x-auto scrollbar-none ${cardClass}`}>
        <div className="flex items-center gap-1.5 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : isDarkMode
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                      : 'bg-blue-50/40 text-slate-600 hover:bg-blue-100/60 hover:text-blue-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-blue-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. CAREER DISCOVERY UI */}
      {activeTab === 'discovery' && (
        <div className={`rounded-2xl border p-6 space-y-6 ${cardClass}`}>
          <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ${
            isDarkMode ? 'border-slate-800' : 'border-slate-100'
          }`}>
            <div>
<<<<<<< HEAD
              <h2 className={`text-xl font-semibold flex items-center gap-2 ${textHeading}`}>
                <FaCompass className="w-5 h-5 text-blue-500" /> Career Discovery Engine
=======
              <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
                <FiCompass className="w-5 h-5 text-blue-500" /> Career Discovery Engine
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
              <p className={`text-sm font-normal ${textMuted}`}>Explore 500+ future-ready career pathways, required skillstacks, and market compensation in INR</p>
            </div>
            <div className="relative w-72">
              <FiSearch className="w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search careers (e.g. AI Architect, Quant Analyst)..." 
                className={`w-full pl-9 pr-3 py-2 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-blue-50/50 border-blue-200 text-slate-800'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "AI & Machine Learning Architect", salary: "₹25.0 - ₹45.0 LPA", growth: "+34% YoY Growth", fit: "96% DNA Fit Match", tags: ["Python", "PyTorch", "LLMs", "Deep Learning"] },
              { title: "Quantitative Financial Analyst", salary: "₹22.0 - ₹38.0 LPA", growth: "+22% YoY Growth", fit: "92% DNA Fit Match", tags: ["Stochastics", "Python", "Algorithmic Trading", "Risk"] },
              { title: "Cloud & Cybersecurity Strategist", salary: "₹20.0 - ₹32.0 LPA", growth: "+28% YoY Growth", fit: "89% DNA Fit Match", tags: ["AWS", "Zero Trust", "DevSecOps", "Kubernetes"] },
              { title: "Biomedical & Genomic Engineer", salary: "₹18.0 - ₹28.0 LPA", growth: "+26% YoY Growth", fit: "85% DNA Fit Match", tags: ["CRISPR", "Bioinformatics", "Genomics", "Data"] },
              { title: "Fintech Product Director", salary: "₹24.0 - ₹40.0 LPA", growth: "+19% YoY Growth", fit: "88% DNA Fit Match", tags: ["Blockchain", "UX Strategy", "Agile", "APIs"] },
              { title: "Renewable Energy Grid Architect", salary: "₹19.0 - ₹30.0 LPA", growth: "+31% YoY Growth", fit: "84% DNA Fit Match", tags: ["Solar Grid", "IoT", "CleanTech", "Smart Grids"] }
            ].map((c, idx) => (
              <div key={idx} className={`p-5 rounded-2xl border transition space-y-3 ${subCardClass}`}>
                <div className="flex justify-between items-start">
                  <h3 className={`font-semibold text-base leading-snug ${textHeading}`}>{c.title}</h3>
                  <span className="bg-emerald-500/20 text-emerald-400 font-medium px-2 py-0.5 rounded-md text-xs border border-emerald-500/30 shrink-0">
                    {c.fit}
                  </span>
                </div>
                <div className="text-blue-500 font-semibold text-sm">{c.salary}</div>
                <div className={`font-normal text-xs ${textMuted}`}>{c.growth}</div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {c.tags.map((t, i) => (
                    <span key={i} className={`font-medium px-2 py-0.5 rounded-md border text-xs ${
                      isDarkMode ? 'bg-slate-700 text-slate-200 border-slate-600' : 'bg-white text-slate-700 border-blue-100'
                    }`}>
                      {t}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => onShowToast(`Opened Career Pathway Guide for ${c.title}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 text-sm"
                >
                  <span>Explore Pathway</span> <FiArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. ASSESSMENT SCREENS */}
      {activeTab === 'assessment' && (
        <div className={`rounded-2xl border p-6 space-y-6 ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
            <div>
<<<<<<< HEAD
              <h2 className={`text-xl font-semibold flex items-center gap-2 ${textHeading}`}>
                <FaClipboardList className="w-5 h-5 text-blue-500" /> Aptitude & Skill Diagnostic Tests
=======
              <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
                <FiClipboard className="w-5 h-5 text-blue-500" /> Aptitude & Skill Diagnostic Tests
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
              <p className={`text-sm font-normal ${textMuted}`}>Standardized cognitive reasoning and technical skill benchmark assessments</p>
            </div>
            <span className="bg-blue-500/20 text-blue-400 font-medium text-xs px-3 py-1 rounded-full border border-blue-500/30">
              4 Active Diagnostic Modules
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { name: "Logical & Abstract Reasoning Assessment", qCount: "25 Questions", time: "30 Mins", score: "94 / 100 Score", status: "Completed" },
              { name: "Numerical & Quantitative Aptitude Test", qCount: "30 Questions", time: "40 Mins", score: "88 / 100 Score", status: "Completed" },
              { name: "Verbal & Computational Logic Exam", qCount: "20 Questions", time: "25 Mins", score: "91 / 100 Score", status: "Completed" },
              { name: "Algorithmic Problem Solving Test", qCount: "15 Coding Challenges", time: "60 Mins", score: "Pending Launch", status: "Ready" }
            ].map((a, i) => (
              <div key={i} className={`p-5 rounded-2xl border flex items-center justify-between ${subCardClass}`}>
                <div>
<<<<<<< HEAD
                  <h4 className={`font-semibold text-base mb-1 ${textHeading}`}>{a.name}</h4>
                  <div className={`text-xs font-normal flex items-center gap-3 ${textMuted}`}>
                    <span><FaClock className="inline w-3 h-3 text-blue-400" /> {a.time}</span>
=======
                  <h4 className={`font-extrabold text-sm mb-1 ${textHeading}`}>{a.name}</h4>
                  <div className={`text-[11px] font-medium flex items-center gap-3 ${textMuted}`}>
                    <span><FiClock className="inline w-3 h-3 text-blue-400" /> {a.time}</span>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
                    <span>{a.qCount}</span>
                  </div>
                  <div className="mt-2 text-blue-500 font-semibold text-sm">{a.score}</div>
                </div>
                <button 
                  onClick={() => onShowToast(`Launching Assessment: ${a.name}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer shrink-0"
                >
                  {a.status === 'Completed' ? 'Retake Test' : 'Start Test'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. PSYCHOMETRIC TEST UI */}
      {activeTab === 'psychometric' && (
        <div className={`rounded-2xl border p-6 space-y-6 ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
            <div>
<<<<<<< HEAD
              <h2 className={`text-xl font-semibold flex items-center gap-2 ${textHeading}`}>
                <FaBrain className="w-5 h-5 text-blue-500" /> Holland Code (RIASEC) Psychometric Inventory
=======
              <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
                <FiCpu className="w-5 h-5 text-blue-500" /> Holland Code (RIASEC) Psychometric Inventory
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
              <p className={`text-sm font-normal ${textMuted}`}>Measures vocational personality traits across 6 key interest domains</p>
            </div>
            <button 
              onClick={() => onShowToast("Psychometric RIASEC profile updated!")}
              className="bg-blue-600 text-white font-medium text-sm px-4 py-2 rounded-xl shadow-xs cursor-pointer"
            >
              Re-Calculate Holland Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`space-y-4 p-5 rounded-2xl border ${subCardClass}`}>
              <h3 className={`font-semibold text-base ${textHeading}`}>Interactive RIASEC Trait Score</h3>
              
              <div>
                <div className={`flex justify-between text-sm font-medium mb-1.5 ${textHeading}`}>
                  <span>Investigative (Analytical / Research)</span>
                  <span className="text-blue-500 font-semibold">{riasecScores.investigative}%</span>
                </div>
                <input 
                  type="range" min="30" max="100" 
                  value={riasecScores.investigative} 
                  onChange={(e) => setRiasecScores({ ...riasecScores, investigative: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className={`flex justify-between text-sm font-medium mb-1.5 ${textHeading}`}>
                  <span>Enterprising (Leadership / Business)</span>
                  <span className="text-blue-500 font-semibold">{riasecScores.enterprising}%</span>
                </div>
                <input 
                  type="range" min="30" max="100" 
                  value={riasecScores.enterprising} 
                  onChange={(e) => setRiasecScores({ ...riasecScores, enterprising: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className={`flex justify-between text-sm font-medium mb-1.5 ${textHeading}`}>
                  <span>Artistic (Creative / Architectural)</span>
                  <span className="text-blue-500 font-semibold">{riasecScores.artistic}%</span>
                </div>
                <input 
                  type="range" min="30" max="100" 
                  value={riasecScores.artistic} 
                  onChange={(e) => setRiasecScores({ ...riasecScores, artistic: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            <div className={`p-5 rounded-2xl border flex flex-col justify-between ${subCardClass}`}>
              <div>
                <h3 className={`font-semibold text-base mb-2 ${textHeading}`}>Holland Code Profile Result: I-E-A</h3>
                <p className={`text-sm font-normal leading-relaxed mb-4 ${textMuted}`}>
                  Primary Profile: <strong>Investigative - Enterprising - Artistic</strong>. High affinity for complex analytical problem solving, data modeling, combined with strategic leadership drive.
                </p>
              </div>
              <div className={`p-4 rounded-xl border font-medium text-sm flex items-center justify-between ${
                isDarkMode ? 'bg-slate-900 border-slate-700 text-blue-400' : 'bg-white border-blue-100 text-blue-700'
              }`}>
                <span>Dominant Archetype Fit</span>
                <span className="bg-blue-500/20 px-3 py-1 rounded-lg border border-blue-500/30 text-xs font-semibold">Tech Strategist</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CAREER DNA DASHBOARD */}
      {activeTab === 'dna' && (
        <div className={`rounded-2xl border p-6 space-y-6 ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
            <div>
<<<<<<< HEAD
              <h2 className={`text-xl font-semibold flex items-center gap-2 ${textHeading}`}>
                <FaDna className="w-5 h-5 text-blue-500" /> Unified Student Career DNA Profile
=======
              <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
                <FiZap className="w-5 h-5 text-blue-500" /> Unified Student Career DNA Profile
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
              <p className={`text-sm font-normal ${textMuted}`}>Synthesis of cognitive aptitude, psychometrics, market demand, and values alignment</p>
            </div>
            <button 
              onClick={() => onShowToast("Exported Official Career DNA Certificate PDF!")}
              className="bg-blue-600 text-white font-medium text-sm px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer"
            >
              <FiDownload className="w-3.5 h-3.5" /> Download Career DNA PDF
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { label: "Cognitive Aptitude Index", score: "94 / 100", status: "Top 2% Nationwide", icon: FiCpu },
              { label: "Psychometric Trait Alignment", score: "90 / 100", status: "High STEM Alignment", icon: FiZap },
              { label: "Industry Market Demand", score: "96 / 100", status: "High Growth Sector", icon: FiZap },
              { label: "Values & Passion Fit", score: "92 / 100", status: "Optimal Satisfaction", icon: FiStar }
            ].map((d, i) => {
              const Icon = d.icon;
              return (
                <div key={i} className={`p-5 rounded-2xl border ${subCardClass}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[13px] font-medium ${textMuted}`}>{d.label}</span>
                    <Icon className="w-4 h-4 text-blue-500" />
                  </div>
<<<<<<< HEAD
                  <div className={`text-2xl lg:text-3xl font-bold tracking-tight mb-1 ${textHeading}`}>{d.score}</div>
                  <span className="text-blue-500 font-medium text-xs">{d.status}</span>
=======
                  <div className={`text-2xl font-bold mb-1 ${textHeading}`}>{d.score}</div>
                  <span className="text-blue-400 font-bold">{d.status}</span>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. AI RECOMMENDATION DASHBOARD */}
      {activeTab === 'ai-recs' && (
        <div className={`rounded-2xl border p-6 space-y-6 ${cardClass}`}>
          <div className={`pb-4 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
<<<<<<< HEAD
            <h2 className={`text-xl font-semibold flex items-center gap-2 ${textHeading}`}>
              <FaWandMagicSparkles className="w-5 h-5 text-blue-500" /> AI Recommendation Engine Output
=======
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiCpu className="w-5 h-5 text-blue-500" /> AI Recommendation Engine Output
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </h2>
            <p className={`text-sm font-normal ${textMuted}`}>Personalized career pathway matches generated via custom neural network recommendation models</p>
          </div>

          <div className="space-y-4">
            {[
              { match: "96%", role: "AI & Deep Learning Architect", reason: "94% Logical aptitude score + high Investigative RIASEC interest profile matches senior machine learning career trajectories.", demand: "+34% Market Expansion" },
              { match: "92%", role: "Quantitative Risk & Financial Analyst", reason: "Strong mathematical aptitude combined with Enterprising leadership traits fits quantitative risk engineering roles.", demand: "+22% Market Expansion" },
              { match: "89%", role: "Enterprise Cloud Security Director", reason: "High spatial visualization and systemic reasoning scores align with cloud security architecture.", demand: "+28% Market Expansion" }
            ].map((r, i) => (
              <div key={i} className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${subCardClass}`}>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                    {r.match}
                  </div>
                  <div>
<<<<<<< HEAD
                    <h3 className={`font-semibold text-base mb-1 ${textHeading}`}>{r.role}</h3>
                    <p className={`text-sm font-normal leading-relaxed mb-2 ${textMuted}`}>{r.reason}</p>
                    <span className="bg-emerald-500/20 text-emerald-400 font-medium text-xs px-2.5 py-0.5 rounded-md border border-emerald-500/30">
=======
                    <h3 className={`font-bold text-sm mb-1 ${textHeading}`}>{r.role}</h3>
                    <p className={`leading-relaxed mb-2 ${textMuted}`}>{r.reason}</p>
                    <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-0.5 rounded-md border border-emerald-500/30">
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
                      {r.demand}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => onShowToast(`Enrolled in AI Roadmap for ${r.role}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-xl transition shrink-0 cursor-pointer"
                >
                  Select Roadmap
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. SCHOLARSHIP EXPLORER */}
      {activeTab === 'scholarships' && (
        <div className={`rounded-2xl border p-6 space-y-6 ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
            <div>
<<<<<<< HEAD
              <h2 className={`text-xl font-semibold flex items-center gap-2 ${textHeading}`}>
                <FaAward className="w-5 h-5 text-blue-500" /> Scholarship & Merit Grant Explorer
=======
              <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
                <FiAward className="w-5 h-5 text-blue-500" /> Scholarship & Merit Grant Explorer
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
              <p className={`text-sm font-normal ${textMuted}`}>Direct application portal for national merit fellowships and STEM grants in Indian Rupees</p>
            </div>
            <span className="bg-blue-500/20 text-blue-400 font-medium text-xs px-3 py-1 rounded-full border border-blue-500/30">
              Total Value: ₹1.5 Crores Available
            </span>
          </div>

          <div className="space-y-4">
            {[
              { name: "National Science & Tech Fellowship", provider: "Ministry of Science", amount: "₹2,50,000 / yr", deadline: "15 April 2026", match: "Eligible (94% Fit)" },
              { name: "Women in Engineering Excellence Grant", provider: "Global Tech Foundation", amount: "₹1,50,000 / yr", deadline: "01 May 2026", match: "Eligible (90% Fit)" },
              { name: "CBSE Merit Academic Excellence Grant", provider: "Central Education Board", amount: "₹1,00,000 / yr", deadline: "20 April 2026", match: "Eligible (96% Fit)" }
            ].map((s, i) => (
              <div key={i} className={`p-5 rounded-2xl border flex items-center justify-between ${subCardClass}`}>
                <div>
<<<<<<< HEAD
                  <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">{s.provider}</span>
                  <h3 className={`font-semibold text-base mb-1 ${textHeading}`}>{s.name}</h3>
                  <div className="text-emerald-500 font-semibold text-sm">{s.amount}</div>
                  <div className={`text-xs font-normal mt-1 ${textMuted}`}>Deadline: {s.deadline}</div>
=======
                  <span className="text-[10px] font-bold text-blue-400 uppercase">{s.provider}</span>
                  <h3 className={`font-bold text-sm mb-1 ${textHeading}`}>{s.name}</h3>
                  <div className="text-emerald-400 font-bold text-sm">{s.amount}</div>
                  <div className={`text-[11px] mt-1 ${textMuted}`}>Deadline: {s.deadline}</div>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
                </div>
                <button 
                  onClick={() => onShowToast(`Applied to ${s.name} successfully!`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition cursor-pointer"
                >
                  Direct Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. COLLEGE EXPLORER */}
      {activeTab === 'colleges' && (
        <div className={`rounded-2xl border p-6 space-y-6 ${cardClass}`}>
          <div className={`pb-4 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
<<<<<<< HEAD
            <h2 className={`text-xl font-semibold flex items-center gap-2 ${textHeading}`}>
              <FaGraduationCap className="w-5 h-5 text-blue-500" /> College & University Admissions Explorer
=======
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiBookOpen className="w-5 h-5 text-blue-500" /> College & University Admissions Explorer
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </h2>
            <p className={`text-sm font-normal ${textMuted}`}>AI acceptance probability calculator and NIRF university rankings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Indian Institute of Technology (IIT) Bombay", rank: "NIRF Rank #1", chance: "92% High Chance", ctc: "Avg CTC: ₹24.5 LPA", location: "Mumbai, India" },
              { name: "BITS Pilani Main Campus", rank: "NIRF Rank #5", chance: "88% High Chance", ctc: "Avg CTC: ₹20.8 LPA", location: "Pilani, Rajasthan" },
              { name: "International Institute of Info Tech (IIIT) Hyderabad", rank: "NIRF Rank #8", chance: "90% High Chance", ctc: "Avg CTC: ₹26.2 LPA", location: "Hyderabad, India" }
            ].map((col, i) => (
              <div key={i} className={`p-5 rounded-2xl border space-y-3 ${subCardClass}`}>
<<<<<<< HEAD
                <span className="bg-blue-500/20 text-blue-400 font-medium px-2 py-0.5 rounded-md text-xs border border-blue-500/30">{col.rank}</span>
                <h3 className={`font-semibold text-base leading-snug ${textHeading}`}>{col.name}</h3>
                <div className="text-emerald-500 font-semibold text-sm">{col.chance}</div>
                <div className={`text-xs font-normal ${textMuted}`}>{col.ctc}</div>
                <div className={`text-xs font-normal ${textMuted}`}>{col.location}</div>
=======
                <span className="bg-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded-md text-[10px] border border-blue-500/30">{col.rank}</span>
                <h3 className={`font-bold text-sm leading-snug ${textHeading}`}>{col.name}</h3>
                <div className="text-emerald-400 font-bold">{col.chance}</div>
                <div className={`font-medium ${textMuted}`}>{col.ctc}</div>
                <div className={`text-[11px] ${textMuted}`}>{col.location}</div>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
                <button 
                  onClick={() => onShowToast(`Calculated admissions odds for ${col.name}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 rounded-xl transition cursor-pointer"
                >
                  View Admission Criteria
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. CAREER ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className={`rounded-2xl border p-6 space-y-6 ${cardClass}`}>
          <div className={`pb-4 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
<<<<<<< HEAD
            <h2 className={`text-xl font-semibold flex items-center gap-2 ${textHeading}`}>
              <FaRoute className="w-5 h-5 text-blue-500" /> Milestone Career Roadmap
=======
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiTrendingUp className="w-5 h-5 text-blue-500" /> Milestone Career Roadmap
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </h2>
            <p className={`text-sm font-normal ${textMuted}`}>Step-by-step milestone path to becoming a Senior AI Architect</p>
          </div>

          <div className="space-y-6 relative pl-6 border-l-2 border-blue-500/40">
            {[
              { step: "Step 1: Secondary Education (Class 10 - 12)", desc: "Focus on PCM (Physics, Chemistry, Math), Algorithmic Logic, and Python fundamentals.", status: "Completed", icon: FiCheckCircle },
              { step: "Step 2: Undergrad Degree (B.Tech CS / AI)", desc: "Enroll at Top University, master Data Structures, Algorithms, Machine Learning theory.", status: "In Progress", icon: FiClock },
              { step: "Step 3: Industry Internship (Summer Tech Drive)", desc: "Complete 3-month Software & Cloud Engineering internship at Tier-1 Tech firm.", status: "Upcoming", icon: FiBriefcase },
              { step: "Step 4: Full-Time Placement (AI Architect / Quant)", desc: "Secure campus offer as AI/ML Engineer with competitive CTC package in INR.", status: "Goal Target", icon: FiAward }
            ].map((m, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs shadow-sm font-semibold">
                  {i + 1}
                </div>
                <div className={`p-4 rounded-xl border ${subCardClass}`}>
                  <div className="flex justify-between items-center mb-1">
<<<<<<< HEAD
                    <h4 className={`font-semibold text-sm ${textHeading}`}>{m.step}</h4>
                    <span className="bg-blue-500/20 text-blue-400 font-medium px-2 py-0.5 rounded-md text-xs">{m.status}</span>
=======
                    <h4 className={`font-bold text-xs ${textHeading}`}>{m.step}</h4>
                    <span className="bg-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded-md text-[10px]">{m.status}</span>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
                  </div>
                  <p className={`text-xs font-normal ${textMuted}`}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. RESUME SCORE DASHBOARD */}
      {activeTab === 'resume' && (
        <div className={`rounded-2xl border p-6 space-y-6 ${cardClass}`}>
          <div className={`pb-4 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
<<<<<<< HEAD
            <h2 className={`text-xl font-semibold flex items-center gap-2 ${textHeading}`}>
              <FaFileCode className="w-5 h-5 text-blue-500" /> AI Resume ATS Matcher & Score Dashboard
=======
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiFileText className="w-5 h-5 text-blue-500" /> AI Resume ATS Matcher & Score Dashboard
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </h2>
            <p className={`text-sm font-normal ${textMuted}`}>Scan your resume against target AI/Tech job descriptions for ATS keyword optimization</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <label className={`text-[13px] font-medium block ${textHeading}`}>Paste Resume Content or Upload File</label>
              <textarea 
                rows={7}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className={`w-full p-4 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-blue-50/30 border-blue-200 text-slate-800'
                }`}
              />
              <button 
                onClick={() => {
                  setAtsScore(94);
                  onShowToast("AI scanned resume! ATS score boosted to 94/100!");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2"
              >
                <FiUpload className="w-3.5 h-3.5" /> Scan Resume with AI ATS Scanner
              </button>
            </div>

            <div className={`p-5 rounded-2xl border flex flex-col justify-between ${subCardClass}`}>
              <div>
<<<<<<< HEAD
                <span className={`text-[13px] font-medium block mb-1 ${textMuted}`}>ATS Resume Compatibility</span>
                <div className="text-3xl lg:text-4xl font-bold text-blue-500 mb-2">{atsScore} / 100</div>
=======
                <span className={`font-bold block mb-1 ${textMuted}`}>ATS Resume Compatibility</span>
                <div className="text-4xl font-bold text-blue-500 mb-2">{atsScore} / 100</div>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
                <div className="space-y-2">
                  <div className={`flex justify-between text-xs font-medium ${textHeading}`}>
                    <span>Keyword Density Match</span><strong className="text-emerald-500 font-semibold">92%</strong>
                  </div>
                  <div className={`flex justify-between text-xs font-medium ${textHeading}`}>
                    <span>Formatting Compliance</span><strong className="text-emerald-500 font-semibold">100%</strong>
                  </div>
                  <div className={`flex justify-between text-xs font-medium ${textHeading}`}>
                    <span>Action Verbs Impact</span><strong className="text-emerald-500 font-semibold">86%</strong>
                  </div>
                </div>
              </div>
              <div className={`mt-4 p-3 rounded-xl border text-xs font-medium ${
                isDarkMode ? 'bg-slate-900 border-slate-700 text-blue-400' : 'bg-white border-blue-100 text-blue-700'
              }`}>
                Suggestion: Add 'PyTorch', 'System Architecture' for +6 points
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. LEARNING PROGRESS DASHBOARD */}
      {activeTab === 'learning' && (
        <div className={`rounded-2xl border p-6 space-y-6 ${cardClass}`}>
          <div className={`flex items-center justify-between pb-4 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
            <div>
<<<<<<< HEAD
              <h2 className={`text-xl font-semibold flex items-center gap-2 ${textHeading}`}>
                <FaChartLine className="w-5 h-5 text-blue-500" /> Learning Progress & Skill Tracker
=======
              <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
                <FiTrendingUp className="w-5 h-5 text-blue-500" /> Learning Progress & Skill Tracker
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
              <p className={`text-sm font-normal ${textMuted}`}>Track active bootcamp courses, study streaks, and earned certificate badges</p>
            </div>
<<<<<<< HEAD
            <span className="bg-amber-500/20 text-amber-500 font-medium text-xs px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
              <FaFire className="w-3.5 h-3.5 text-amber-500 animate-bounce" /> 14 Day Study Streak
=======
            <span className="bg-amber-500/20 text-amber-400 font-bold px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
              <FiZap className="w-3.5 h-3.5 text-amber-500 animate-bounce" /> 14 Day Study Streak
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Fullstack Cloud & React Architecture", progress: 85, cert: "AWS Certified", icon: FiBookOpen },
              { name: "Neural Networks & Deep Learning Spec", progress: 92, cert: "OpenAI Certified", icon: FiCpu },
              { name: "Data Structures & Algorithmic Thinking", progress: 78, cert: "AlgoExpert Certified", icon: FiFileText }
            ].map((lp, i) => {
              const Icon = lp.icon;
              return (
                <div key={i} className={`p-5 rounded-2xl border space-y-3 ${subCardClass}`}>
                  <div className="flex justify-between items-center">
                    <Icon className="w-5 h-5 text-blue-500" />
                    <span className="bg-blue-500/20 text-blue-400 font-medium px-2 py-0.5 rounded-md text-xs border border-blue-500/30">{lp.cert}</span>
                  </div>
<<<<<<< HEAD
                  <h3 className={`font-semibold text-sm leading-snug ${textHeading}`}>{lp.name}</h3>
=======
                  <h3 className={`font-bold text-xs leading-snug ${textHeading}`}>{lp.name}</h3>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
                  <div>
                    <div className={`flex justify-between text-xs font-medium mb-1.5 ${textMuted}`}>
                      <span>Progress</span><span className="text-blue-500 font-semibold">{lp.progress}%</span>
                    </div>
                    <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                      <div className="bg-blue-600 h-full" style={{ width: `${lp.progress}%` }} />
                    </div>
                  </div>
                  <button 
                    onClick={() => onShowToast(`Resumed learning: ${lp.name}`)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 rounded-xl transition cursor-pointer"
                  >
                    Continue Course
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
