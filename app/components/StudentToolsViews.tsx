import React from 'react';
import { 
<<<<<<< HEAD
  FaCompass, 
  FaListCheck, 
  FaBrain, 
  FaAward, 
  FaGraduationCap, 
  FaArrowTrendUp, 
  FaFileLines, 
  FaBookOpen, 
  FaClock, 
  FaDownload, 
  FaFire, 
  FaStar 
} from 'react-icons/fa6';
=======
  FiCompass, 
  FiCheckSquare, 
  FiCpu, 
  FiAward, 
  FiBookOpen, 
  FiTrendingUp, 
  FiFileText, 
  FiClock, 
  FiDownload,
  FiZap,
  FiStar
} from 'react-icons/fi';
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c

interface StudentToolsViewsProps {
  activeSubView: string;
  onShowToast: (msg: string) => void;
  isDarkMode: boolean;
}

export const StudentToolsViews: React.FC<StudentToolsViewsProps> = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {

  // 1. CAREER DISCOVERY UI
  if (activeSubView === 'discovery') {
    return (
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
          <div>
<<<<<<< HEAD
<<<<<<< HEAD
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
              <FaCompass className="w-5 h-5 text-[#3665EE]" /> Career Discovery Engine
=======
            <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
=======
            <h2 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]">
>>>>>>> origin/omsai
              <FiCompass className="w-5 h-5 text-[#3665EE]" /> Career Discovery Engine
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </h2>
<<<<<<< HEAD
            <p className="text-sm font-normal text-[#6B7280]">Explore 500+ future-ready career paths curated by AI neural alignment</p>
=======
            <p className="text-[13px] md:text-[14px] text-[#6B7280] mt-1 leading-normal">Explore 500+ future-ready career paths curated by AI neural alignment</p>
>>>>>>> origin/omsai
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Search careers, skills, or degrees..." 
<<<<<<< HEAD
              className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#3665EE] bg-slate-50 text-[#12163A]"
=======
              className="px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3665EE] bg-slate-50 text-[#12163A] text-[14px]"
>>>>>>> origin/omsai
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "AI & ML Systems Engineer", salary: "₹18 - ₹35 LPA", growth: "+38% YoY", skills: ["Python", "PyTorch", "MLOps"], match: "98% Neural Match", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
            { title: "Fintech & Quantitative Analyst", salary: "₹16 - ₹28 LPA", growth: "+26% YoY", skills: ["Financial Modeling", "Python", "Stochastics"], match: "94% Neural Match", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
            { title: "Robotics & Embedded Engineer", salary: "₹14 - ₹26 LPA", growth: "+31% YoY", skills: ["C++", "ROS2", "Microcontrollers"], match: "91% Neural Match", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
            { title: "Product & UI/UX Designer", salary: "₹12 - ₹22 LPA", growth: "+24% YoY", skills: ["Figma", "User Research", "Prototyping"], match: "89% Neural Match", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
            { title: "Biotech & Bio-Informatics Researcher", salary: "₹15 - ₹27 LPA", growth: "+29% YoY", skills: ["Genomics", "R", "CRISPR Tech"], match: "87% Neural Match", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
            { title: "Cybersecurity Architect", salary: "₹18 - ₹32 LPA", growth: "+35% YoY", skills: ["SIEM", "Zero Trust", "Cloud Security"], match: "86% Neural Match", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
          ].map((c, i) => (
            <div 
              key={i} 
              onClick={() => onShowToast(`Exploring career roadmap for ${c.title}`)}
              className={`p-5 rounded-[24px] border space-y-3 cursor-pointer transition-all duration-200 hover:-translate-y-1 ${c.bg} ${c.border} text-[#12163A] min-w-0 hover-card-lift`}
            >
              <div className="flex items-center justify-between">
<<<<<<< HEAD
                <span className="text-xs bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-medium shadow-2xs whitespace-nowrap">
                  {c.match}
                </span>
                <span className="text-xs font-semibold text-[#3665EE]">{c.growth}</span>
              </div>
              <h3 className="font-semibold text-base truncate text-[#12163A]">{c.title}</h3>
              <div className="font-semibold text-sm text-[#3665EE]">{c.salary}</div>
              <div className="flex flex-wrap gap-1">
                {c.skills.map((sk, idx) => (
                  <span key={idx} className="text-xs px-2 py-0.5 rounded-md bg-white/80 text-[#12163A] font-medium">
=======
                <span className="text-[12px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-semibold shadow-2xs whitespace-nowrap">
                  {c.match}
                </span>
                <span className="text-[12px] font-semibold text-[#3665EE]">{c.growth}</span>
              </div>
              <h3 className="font-semibold text-[16px] md:text-[17px] leading-[1.35] truncate text-[#12163A]">{c.title}</h3>
              <div className="font-semibold text-[14px] text-[#3665EE]">{c.salary}</div>
              <div className="flex flex-wrap gap-1.5">
                {c.skills.map((sk, idx) => (
                  <span key={idx} className="text-[12px] px-2.5 py-0.5 rounded-md bg-white/80 text-[#12163A] font-medium">
>>>>>>> origin/omsai
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. ASSESSMENT SCREENS
  if (activeSubView === 'assessment') {
    return (
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
<<<<<<< HEAD
<<<<<<< HEAD
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
              <FaListCheck className="w-5 h-5 text-[#3665EE]" /> Online Aptitude & Skill Assessment
=======
            <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
=======
            <h2 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]">
>>>>>>> origin/omsai
              <FiCheckSquare className="w-5 h-5 text-[#3665EE]" /> Online Aptitude & Skill Assessment
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </h2>
<<<<<<< HEAD
            <p className="text-sm font-normal text-[#6B7280]">Timed cognitive & analytical reasoning test (Question 4 of 15)</p>
          </div>
<<<<<<< HEAD
          <div className="flex items-center gap-2 text-[#12163A] font-mono font-medium text-xs bg-[#DEE9FF] border border-[#C6D9FF] px-3.5 py-1.5 rounded-xl">
            <FaClock className="w-3.5 h-3.5 text-[#3665EE]" /> 18:45 Remaining
=======
          <div className="flex items-center gap-2 text-[#12163A] font-mono font-bold bg-[#DEE9FF] border border-[#C6D9FF] px-3.5 py-1.5 rounded-xl">
=======
            <p className="text-[13px] md:text-[14px] text-[#6B7280] mt-1 leading-normal">Timed cognitive & analytical reasoning test (Question 4 of 15)</p>
          </div>
          <div className="flex items-center gap-2 text-[#12163A] font-mono font-semibold text-[13px] bg-[#DEE9FF] border border-[#C6D9FF] px-3.5 py-1.5 rounded-xl">
>>>>>>> origin/omsai
            <FiClock className="w-3.5 h-3.5 text-[#3665EE]" /> 18:45 Remaining
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
          </div>
        </div>

        <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-4">
<<<<<<< HEAD
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#3665EE]">Category: Logical & Spatial Reasoning</span>
            <span className="text-[#4B5563] font-normal">Score Weight: 25 Points</span>
          </div>

          <p className="font-medium text-sm leading-relaxed text-[#12163A]">
=======
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-semibold text-[#3665EE]">Category: Logical & Spatial Reasoning</span>
            <span className="text-[#4B5563]">Score Weight: 25 Points</span>
          </div>

          <p className="font-medium text-[15px] leading-relaxed text-[#12163A]">
>>>>>>> origin/omsai
            If all Engineers are Problem Solvers, and some Problem Solvers use Neural Networks, which of the following statements MUST logically hold true?
          </p>

          <div className="space-y-2.5 pt-2">
            {[
              "A) All Engineers use Neural Networks",
              "B) Some Engineers are Problem Solvers who utilize computational logic",
              "C) No Problem Solvers are Engineers",
              "D) Neural Networks can only be designed by Engineers"
            ].map((opt, idx) => (
              <button 
                key={idx}
                onClick={() => onShowToast(`Selected Option ${String.fromCharCode(65 + idx)}`)}
<<<<<<< HEAD
                className={`w-full text-left p-3.5 rounded-xl border text-sm font-normal transition cursor-pointer ${
                  idx === 1 
                    ? 'bg-[#12163A] border-[#12163A] text-white font-medium' 
=======
                className={`w-full text-left p-3.5 rounded-xl border text-[14px] font-medium transition cursor-pointer ${
                  idx === 1 
                    ? 'bg-[#12163A] border-[#12163A] text-white font-semibold' 
>>>>>>> origin/omsai
                    : 'bg-white border-slate-200 hover:bg-[#F6E6D8] text-[#12163A]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#C6D9FF]">
<<<<<<< HEAD
            <button onClick={() => onShowToast("Navigated to previous question")} className="px-4 py-2 rounded-xl font-medium text-sm border border-slate-300 bg-white text-[#12163A] hover:bg-slate-50 transition cursor-pointer">
              Previous Question
            </button>
            <button onClick={() => onShowToast("Assessment answers submitted! AI Score generated.")} className="px-5 py-2.5 rounded-xl font-medium text-sm bg-[#12163A] text-white shadow-md cursor-pointer transition hover:bg-[#1A2050]">
=======
            <button onClick={() => onShowToast("Navigated to previous question")} className="px-4 py-2 rounded-xl text-[14px] font-semibold border border-slate-300 bg-white text-[#12163A] hover:bg-slate-50 transition cursor-pointer">
              Previous Question
            </button>
            <button onClick={() => onShowToast("Assessment answers submitted! AI Score generated.")} className="px-5 py-2.5 rounded-xl text-[14px] font-semibold bg-[#12163A] text-white shadow-md cursor-pointer transition hover:bg-[#1A2050]">
>>>>>>> origin/omsai
              Submit Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. PSYCHOMETRIC TEST UI
  if (activeSubView === 'psychometric') {
    return (
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
<<<<<<< HEAD
<<<<<<< HEAD
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
            <FaBrain className="w-5 h-5 text-[#3665EE]" /> RIASEC Psychometric & Personality Assessment
=======
          <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
=======
          <h2 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]">
>>>>>>> origin/omsai
            <FiCpu className="w-5 h-5 text-[#3665EE]" /> RIASEC Psychometric & Personality Assessment
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
          </h2>
<<<<<<< HEAD
          <p className="text-sm font-normal text-[#6B7280]">Holland Code interest spectrum profiling (Rate your preference for each workplace scenario)</p>
=======
          <p className="text-[13px] md:text-[14px] text-[#6B7280] mt-1 leading-normal">Holland Code interest spectrum profiling (Rate your preference for each workplace scenario)</p>
>>>>>>> origin/omsai
        </div>

        <div className="space-y-4">
          {[
            { q: "I enjoy dissecting complex algorithmic code to find logical bottlenecks.", code: "Investigative (I)", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
            { q: "I prefer leading cross-functional teams to pitch new product ideas.", code: "Enterprising (E)", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
            { q: "I like sketching user experience mockups and visual interfaces.", code: "Artistic (A)", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
          ].map((item, i) => (
            <div key={i} className={`p-5 rounded-[24px] border space-y-3 ${item.bg} ${item.border} text-[#12163A]`}>
              <div className="flex items-center justify-between">
<<<<<<< HEAD
                <p className="font-medium text-sm text-[#12163A]">{item.q}</p>
                <span className="text-xs bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-medium shadow-2xs whitespace-nowrap">{item.code}</span>
              </div>
              <div className="flex items-center justify-between gap-2 text-xs pt-1">
=======
                <p className="font-semibold text-[15px] text-[#12163A]">{item.q}</p>
                <span className="text-[12px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-semibold shadow-2xs whitespace-nowrap">{item.code}</span>
              </div>
              <div className="flex items-center justify-between gap-2 text-[13px] pt-1">
>>>>>>> origin/omsai
                <span className="text-[#6B7280]">Strongly Disagree</span>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      onClick={() => onShowToast(`Rated ${val} for scenario ${i + 1}`)}
<<<<<<< HEAD
                      className={`w-7 h-7 rounded-full font-medium text-xs transition cursor-pointer ${
=======
                      className={`w-8 h-8 rounded-full text-[14px] font-semibold transition cursor-pointer ${
>>>>>>> origin/omsai
                        val === 4 && i === 0
                          ? 'bg-[#12163A] text-white shadow-md'
                          : 'bg-white hover:bg-[#3665EE] hover:text-white text-[#12163A] border border-slate-200'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                <span className="text-[#6B7280]">Strongly Agree</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4. CAREER DNA DASHBOARD
  if (activeSubView === 'dna') {
    return (
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
          <div>
<<<<<<< HEAD
<<<<<<< HEAD
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
              <FaBrain className="w-5 h-5 text-[#3665EE]" /> Career DNA Genome Profile & Aptitude Tracker
=======
            <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
=======
            <h2 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]">
>>>>>>> origin/omsai
              <FiCpu className="w-5 h-5 text-[#3665EE]" /> Career DNA Genome Profile & Aptitude Tracker
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </h2>
<<<<<<< HEAD
            <p className="text-sm font-normal text-[#6B7280]">Holland Code: RIE (Realistic • Investigative • Enterprising)</p>
          </div>
          <button 
            onClick={() => onShowToast("Downloading official Career DNA Passport PDF")}
            className="bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-sm px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 shrink-0"
=======
            <p className="text-[13px] md:text-[14px] text-[#6B7280] mt-1 leading-normal">Holland Code: RIE (Realistic • Investigative • Enterprising)</p>
          </div>
          <button 
            onClick={() => onShowToast("Downloading official Career DNA Passport PDF")}
            className="bg-[#12163A] hover:bg-[#1A2050] text-white text-[14px] font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 shrink-0"
>>>>>>> origin/omsai
          >
            <FiDownload className="w-4 h-4 text-[#DEE9FF]" /> Download DNA Passport
          </button>
        </div>

        {/* Warm Peach & Navy Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A] space-y-2 min-w-0 hover-card-lift">
<<<<<<< HEAD
<<<<<<< HEAD
            <span className="font-medium text-[13px] block text-[#4B5563]">Aptitude Score</span>
            <div className="text-2xl lg:text-3xl font-bold text-[#3665EE] truncate">96th Percentile</div>
            <span className="text-xs font-medium text-[#12163A] bg-white/70 px-2 py-0.5 rounded-full inline-block">Top 4% Nationally</span>
          </div>

          <div className="p-6 rounded-[24px] bg-[#12163A] text-white border border-[#12163A] space-y-2 min-w-0 hover-card-lift">
            <span className="font-medium text-[13px] block text-slate-300">Primary Personality</span>
            <div className="text-2xl lg:text-3xl font-bold text-[#E4F4EC] truncate">Investigative</div>
            <span className="text-xs text-slate-300 font-normal">Problem Solver & Analytical</span>
          </div>

          <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-2 min-w-0 hover-card-lift">
            <span className="font-medium text-[13px] block text-[#4B5563]">Stream Recommendation</span>
            <div className="text-2xl lg:text-3xl font-bold text-[#3665EE] truncate">Science (PCM + CS)</div>
            <span className="text-xs font-medium text-[#12163A]">98.2% Fit Index</span>
=======
            <span className="font-semibold block text-[#4B5563]">Aptitude Score</span>
            <div className="text-3xl font-bold text-[#3665EE] truncate">96th Percentile</div>
            <span className="text-[11px] font-bold text-[#12163A] bg-white/70 px-2 py-0.5 rounded-full inline-block">Top 4% Nationally</span>
=======
            <span className="font-medium text-[13px] block text-[#4B5563]">Aptitude Score</span>
            <div className="text-[28px] md:text-[30px] font-bold text-[#3665EE] truncate leading-none mt-1">96th Percentile</div>
            <span className="text-[12px] font-semibold text-[#12163A] bg-white/70 px-2.5 py-0.5 rounded-full inline-block mt-1">Top 4% Nationally</span>
>>>>>>> origin/omsai
          </div>

          <div className="p-6 rounded-[24px] bg-[#12163A] text-white border border-[#12163A] space-y-2 min-w-0 hover-card-lift">
            <span className="font-medium text-[13px] block text-slate-300">Primary Personality</span>
            <div className="text-[28px] md:text-[30px] font-bold text-[#E4F4EC] truncate leading-none mt-1">Investigative</div>
            <span className="text-[12px] text-slate-300 mt-1 block">Problem Solver & Analytical</span>
          </div>

          <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-2 min-w-0 hover-card-lift">
<<<<<<< HEAD
            <span className="font-semibold block text-[#4B5563]">Stream Recommendation</span>
            <div className="text-3xl font-bold text-[#3665EE] truncate">Science (PCM + CS)</div>
            <span className="text-[11px] font-bold text-[#12163A]">98.2% Fit Index</span>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
=======
            <span className="font-medium text-[13px] block text-[#4B5563]">Stream Recommendation</span>
            <div className="text-[28px] md:text-[30px] font-bold text-[#3665EE] truncate leading-none mt-1">Science (PCM + CS)</div>
            <span className="text-[12px] font-semibold text-[#12163A] mt-1 block">98.2% Fit Index</span>
>>>>>>> origin/omsai
          </div>
        </div>
      </div>
    );
  }

  // 5. AI RECOMMENDATION DASHBOARD
  if (activeSubView === 'ai-recommendations') {
    return (
<<<<<<< HEAD
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
<<<<<<< HEAD
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
            <FaBrain className="w-5 h-5 text-[#3665EE]" /> AI Neural Recommendation Engine
=======
          <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
=======
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-[14px] font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]">
>>>>>>> origin/omsai
            <FiCpu className="w-5 h-5 text-[#3665EE]" /> AI Neural Recommendation Engine
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
          </h2>
<<<<<<< HEAD
          <p className="text-sm font-normal text-[#6B7280]">Predictive career alignment calculated from aptitude, interest, and industry demand</p>
=======
          <p className="text-[13px] md:text-[14px] text-[#6B7280] font-normal leading-normal mt-1">Predictive career alignment calculated from aptitude, interest, and industry demand</p>
>>>>>>> origin/omsai
        </div>

        {/* Alternating Cards: White, Soft Blue, Peach, Mint */}
        <div className="space-y-4">
          {[
            { role: "Artificial Intelligence Architect", match: "98%", rationale: "High mathematical reasoning + top code proficiency fit.", bg: "bg-white", border: "border-slate-200" },
            { role: "Cloud Infrastructure Engineer", match: "94%", rationale: "Strong system design aptitude + cloud computing interest.", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
            { role: "Fintech Data Scientist", match: "91%", rationale: "Statistical affinity + quantitative problem-solving score.", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
            { role: "Cybersecurity Analyst", match: "89%", rationale: "High spatial logic + SOC framework understanding.", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
          ].map((rec, i) => (
            <div key={i} className={`p-5 rounded-[24px] border flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${rec.bg} ${rec.border} text-[#12163A] hover-card-lift`} onClick={() => onShowToast(`Viewing detailed AI breakdown for ${rec.role}`)}>
              <div>
<<<<<<< HEAD
                <h4 className="font-semibold text-base text-[#12163A]">{rec.role}</h4>
                <p className="text-xs mt-1 text-[#4B5563] font-normal">{rec.rationale}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#3665EE]">{rec.match}</div>
<<<<<<< HEAD
                <span className="text-xs font-medium text-[#12163A]">Neural Match</span>
=======
                <span className="text-[10px] font-bold text-[#12163A]">Neural Match</span>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
=======
                <h4 className="text-[16px] font-semibold text-[#12163A]">{rec.role}</h4>
                <p className="text-[13px] mt-1 text-[#4B5563] font-normal leading-normal">{rec.rationale}</p>
              </div>
              <div className="text-right">
                <div className="text-[28px] md:text-[30px] font-bold text-[#3665EE] leading-none">{rec.match}</div>
                <span className="text-[12px] font-semibold text-[#12163A] uppercase tracking-wide mt-1 block">Neural Match</span>
>>>>>>> origin/omsai
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 6. SCHOLARSHIP EXPLORER
  if (activeSubView === 'scholarships') {
    return (
<<<<<<< HEAD
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
<<<<<<< HEAD
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
            <FaAward className="w-5 h-5 text-[#3665EE]" /> Scholarship & Merit Aid Explorer
=======
          <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
=======
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-[14px] font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]">
>>>>>>> origin/omsai
            <FiAward className="w-5 h-5 text-[#3665EE]" /> Scholarship & Merit Aid Explorer
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
          </h2>
<<<<<<< HEAD
          <p className="text-sm font-normal text-[#6B7280]">₹12.5 Crores in active national, state, and corporate scholarships open for application</p>
=======
          <p className="text-[13px] md:text-[14px] text-[#6B7280] font-normal leading-normal mt-1">₹12.5 Crores in active national, state, and corporate scholarships open for application</p>
>>>>>>> origin/omsai
        </div>

        {/* Mint + White Cards with Blue Action Buttons */}
        <div className="space-y-3">
          {[
            { title: "National STEM Leadership Grant", provider: "Ministry of Science & Tech", amount: "₹3,50,000 / yr", deadline: "Closes in 12 Days", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
            { title: "Global AI & Innovation Merit Aid", provider: "Role Ready Foundation", amount: "₹2,00,000 / yr", deadline: "Closes in 18 Days", bg: "bg-white", border: "border-slate-200" },
            { title: "State Higher Education Equity Aid", provider: "State Government Desk", amount: "₹1,50,000 / yr", deadline: "Closes in 25 Days", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
          ].map((sch, i) => (
            <div key={i} className={`p-5 rounded-[24px] border flex items-center justify-between transition-all duration-200 ${sch.bg} ${sch.border} text-[#12163A] hover-card-lift`}>
              <div>
<<<<<<< HEAD
                <h4 className="font-semibold text-base text-[#12163A]">{sch.title}</h4>
                <span className="font-medium text-xs text-[#3665EE]">{sch.provider} • {sch.deadline}</span>
              </div>
              <div className="text-right flex items-center gap-3">
<<<<<<< HEAD
                <div className="font-semibold text-sm text-[#12163A]">{sch.amount}</div>
=======
                <div className="font-bold text-sm text-[#12163A]">{sch.amount}</div>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
                <button 
                  onClick={() => onShowToast(`Submitted application for ${sch.title}!`)}
                  className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer shadow-xs hover:scale-105 active:scale-95"
=======
                <h4 className="text-[16px] font-semibold text-[#12163A]">{sch.title}</h4>
                <span className="text-[13px] font-medium text-[#3665EE]">{sch.provider} • {sch.deadline}</span>
              </div>
              <div className="text-right flex items-center gap-3">
                <div className="text-[15px] font-semibold text-[#12163A]">{sch.amount}</div>
                <button 
                  onClick={() => onShowToast(`Submitted application for ${sch.title}!`)}
                  className="bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer shadow-xs hover:scale-105 active:scale-95"
>>>>>>> origin/omsai
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 7. COLLEGE EXPLORER
  if (activeSubView === 'colleges') {
    return (
<<<<<<< HEAD
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
<<<<<<< HEAD
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
            <FaGraduationCap className="w-5 h-5 text-[#3665EE]" /> University & College Explorer Directory
=======
          <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
=======
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-[14px] font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]">
>>>>>>> origin/omsai
            <FiBookOpen className="w-5 h-5 text-[#3665EE]" /> University & College Explorer Directory
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
          </h2>
<<<<<<< HEAD
          <p className="text-sm font-normal text-[#6B7280]">Compare NIRF ranks, admission cutoffs, course offerings, and campus placements</p>
=======
          <p className="text-[13px] md:text-[14px] text-[#6B7280] font-normal leading-normal mt-1">Compare NIRF ranks, admission cutoffs, course offerings, and campus placements</p>
>>>>>>> origin/omsai
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Indian Institute of Technology (IIT Bombay)", rank: "NIRF #1", avgCtc: "₹28.5 LPA", cutoff: "JEE Adv < 500", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
            { name: "BITS Pilani (Main Campus)", rank: "NIRF #7", avgCtc: "₹24.0 LPA", cutoff: "BITSAT > 320", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
            { name: "IIIT Hyderabad", rank: "NIRF #12", avgCtc: "₹31.0 LPA", cutoff: "JEE Main < 1200", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
          ].map((col, i) => (
            <div key={i} className={`p-5 rounded-[24px] border space-y-2 cursor-pointer transition-all duration-200 ${col.bg} ${col.border} text-[#12163A] min-w-0 hover-card-lift`} onClick={() => onShowToast(`Added ${col.name} to Target Wishlist`)}>
<<<<<<< HEAD
              <span className="text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium">{col.rank}</span>
              <h3 className="font-semibold text-base truncate text-[#12163A]">{col.name}</h3>
              <div className="font-semibold text-sm text-[#3665EE]">Avg CTC: {col.avgCtc}</div>
              <div className="text-xs text-[#4B5563] font-normal">Cutoff: {col.cutoff}</div>
=======
              <span className="text-[12px] bg-[#12163A] text-white px-3 py-1 rounded-full font-semibold">{col.rank}</span>
              <h3 className="text-[16px] font-semibold truncate text-[#12163A] mt-2">{col.name}</h3>
              <div className="text-[14px] font-semibold text-[#3665EE]">Avg CTC: {col.avgCtc}</div>
              <div className="text-[13px] text-[#4B5563] font-normal">Cutoff: {col.cutoff}</div>
>>>>>>> origin/omsai
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 8. CAREER ROADMAP
  if (activeSubView === 'roadmap') {
    return (
<<<<<<< HEAD
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
<<<<<<< HEAD
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
            <FaArrowTrendUp className="w-5 h-5 text-[#3665EE]" /> Interactive Career Milestone Roadmap
=======
          <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
=======
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-[14px] font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]">
>>>>>>> origin/omsai
            <FiTrendingUp className="w-5 h-5 text-[#3665EE]" /> Interactive Career Milestone Roadmap
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
          </h2>
<<<<<<< HEAD
          <p className="text-sm font-normal text-[#6B7280]">Step-by-step guidance from Class 10 to AI Engineering Leader</p>
=======
          <p className="text-[13px] md:text-[14px] text-[#6B7280] font-normal leading-normal mt-1">Step-by-step guidance from Class 10 to AI Engineering Leader</p>
>>>>>>> origin/omsai
        </div>

        <div className="space-y-4">
          {[
            { step: "Phase 1: Class 10th", desc: "Complete Career DNA test & select PCM + CS stream.", status: "Completed", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
            { step: "Phase 2: Class 12th & Entrances", desc: "Prepare JEE Advanced / BITSAT & achieve 95%+ in boards.", status: "In Progress", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
            { step: "Phase 3: Undergraduate Degree", desc: "B.Tech in Computer Science / AI & build 4 portfolio projects.", status: "Upcoming", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
            { step: "Phase 4: Industry Internship", desc: "6-month corporate internship with top tech enterprise.", status: "Upcoming", bg: "bg-white", border: "border-slate-200" }
          ].map((rd, i) => (
            <div key={i} className={`p-5 rounded-[24px] border flex items-center justify-between ${rd.bg} ${rd.border} text-[#12163A] hover-card-lift`}>
              <div className="flex items-center gap-3">
<<<<<<< HEAD
                <div className="w-8 h-8 rounded-full bg-[#12163A] text-white flex items-center justify-center font-semibold text-xs shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#12163A]">{rd.step}</h4>
                  <p className="text-xs font-normal text-[#4B5563]">{rd.desc}</p>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full font-medium border bg-white border-slate-200 text-[#12163A] shrink-0">
=======
                <div className="w-8 h-8 rounded-full bg-[#12163A] text-white flex items-center justify-center font-semibold text-[13px] shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h4 className="text-[16px] font-semibold text-[#12163A]">{rd.step}</h4>
                  <p className="text-[13px] text-[#4B5563] font-normal leading-normal mt-0.5">{rd.desc}</p>
                </div>
              </div>
              <span className="text-[12px] px-3 py-1 rounded-full font-semibold border bg-white border-slate-200 text-[#12163A] shrink-0">
>>>>>>> origin/omsai
                {rd.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 9. RESUME SCORE DASHBOARD
  if (activeSubView === 'resume-ats') {
    return (
<<<<<<< HEAD
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
<<<<<<< HEAD
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
              <FaFileLines className="w-5 h-5 text-[#3665EE]" /> AI ATS Resume Score & Optimizer Dashboard
=======
            <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
=======
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-[14px] font-sans shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]">
>>>>>>> origin/omsai
              <FiFileText className="w-5 h-5 text-[#3665EE]" /> AI ATS Resume Score & Optimizer Dashboard
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </h2>
<<<<<<< HEAD
            <p className="text-sm font-normal text-[#6B7280]">Automated ATS scanner compliance & keyword density optimization</p>
          </div>
          <button 
            onClick={() => onShowToast("Running AI Resume Optimizer scan...")}
            className="bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-sm px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
=======
            <p className="text-[13px] md:text-[14px] text-[#6B7280] font-normal leading-normal mt-1">Automated ATS scanner compliance & keyword density optimization</p>
          </div>
          <button 
            onClick={() => onShowToast("Running AI Resume Optimizer scan...")}
            className="bg-[#12163A] hover:bg-[#1A2050] text-white text-[14px] font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
>>>>>>> origin/omsai
          >
            <FiStar className="w-4 h-4 text-[#DEE9FF]" /> Run AI Resume Scan
          </button>
        </div>

        {/* White Cards, Blue Progress, Navy Completion Badge, Peach Suggestions, Mint Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs text-center space-y-2 min-w-0 hover-card-lift">
<<<<<<< HEAD
<<<<<<< HEAD
            <span className="font-medium text-[13px] block text-[#6B7280]">Overall ATS Score</span>
            <div className="text-3xl lg:text-4xl font-bold text-[#3665EE]">88 / 100</div>
            <span className="text-xs font-medium bg-[#12163A] text-white px-3 py-0.5 rounded-full inline-block">Completion Badge: Navy</span>
          </div>

          <div className="p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center space-y-2 min-w-0 hover-card-lift">
            <span className="font-medium text-[13px] block text-[#12163A]">AI Suggestions</span>
            <div className="text-2xl lg:text-3xl font-bold text-[#12163A]">92% Keyword Fit</div>
            <span className="text-xs text-[#4B5563] font-normal">14/15 Target Skills Added</span>
          </div>

          <div className="p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center space-y-2 min-w-0 hover-card-lift">
            <span className="font-medium text-[13px] block text-[#12163A]">Achievements Grade</span>
            <div className="text-3xl lg:text-4xl font-bold text-[#12163A]">A+</div>
            <span className="text-xs text-[#4B5563] font-normal">100% Parser Compliant</span>
=======
            <span className="font-semibold block text-[#6B7280]">Overall ATS Score</span>
            <div className="text-4xl font-bold text-[#3665EE]">88 / 100</div>
            <span className="text-[10px] font-bold bg-[#12163A] text-white px-3 py-0.5 rounded-full inline-block">Completion Badge: Navy</span>
=======
            <span className="text-[13px] font-medium block text-[#6B7280]">Overall ATS Score</span>
            <div className="text-[32px] md:text-[36px] font-bold text-[#3665EE] leading-none">88 / 100</div>
            <span className="text-[12px] font-medium bg-[#12163A] text-white px-3 py-1 rounded-full inline-block mt-2">Completion Badge: Navy</span>
>>>>>>> origin/omsai
          </div>

          <div className="p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center space-y-2 min-w-0 hover-card-lift">
            <span className="text-[13px] font-medium block text-[#12163A]">AI Suggestions</span>
            <div className="text-[26px] md:text-[28px] font-bold text-[#12163A] leading-tight">92% Keyword Fit</div>
            <span className="text-[12px] text-[#4B5563] font-medium block mt-1">14/15 Target Skills Added</span>
          </div>

          <div className="p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center space-y-2 min-w-0 hover-card-lift">
<<<<<<< HEAD
            <span className="font-semibold block text-[#12163A]">Achievements Grade</span>
            <div className="text-4xl font-bold text-[#12163A]">A+</div>
            <span className="text-[10px] text-[#4B5563]">100% Parser Compliant</span>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
=======
            <span className="text-[13px] font-medium block text-[#12163A]">Achievements Grade</span>
            <div className="text-[32px] md:text-[36px] font-bold text-[#12163A] leading-none">A+</div>
            <span className="text-[12px] text-[#4B5563] font-medium block mt-1">100% Parser Compliant</span>
>>>>>>> origin/omsai
          </div>
        </div>
      </div>
    );
  }

  // 10. LEARNING PROGRESS DASHBOARD
  return (
<<<<<<< HEAD
    <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
<<<<<<< HEAD
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
            <FaBookOpen className="w-5 h-5 text-[#3665EE]" /> Skill Mastery & Learning Progress Tracker
=======
          <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
=======
    <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-[14px] font-sans shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]">
>>>>>>> origin/omsai
            <FiBookOpen className="w-5 h-5 text-[#3665EE]" /> Skill Mastery & Learning Progress Tracker
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
          </h2>
<<<<<<< HEAD
          <p className="text-sm font-normal text-[#6B7280]">Track active courses, earned certification badges, and daily study streaks</p>
        </div>
<<<<<<< HEAD
        <div className="flex items-center gap-2 text-[#12163A] font-medium text-xs bg-[#E4F4EC] border border-[#C3E6D5] px-3.5 py-1.5 rounded-xl">
          <FaFire className="w-4 h-4 text-[#3665EE]" /> 14-Day Streak!
=======
        <div className="flex items-center gap-2 text-[#12163A] font-bold bg-[#E4F4EC] border border-[#C3E6D5] px-3.5 py-1.5 rounded-xl">
=======
          <p className="text-[13px] md:text-[14px] text-[#6B7280] font-normal leading-normal mt-1">Track active courses, earned certification badges, and daily study streaks</p>
        </div>
        <div className="flex items-center gap-2 text-[#12163A] text-[13px] font-semibold bg-[#E4F4EC] border border-[#C3E6D5] px-3.5 py-1.5 rounded-xl">
>>>>>>> origin/omsai
          <FiZap className="w-4 h-4 text-[#3665EE]" /> 14-Day Streak!
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
        </div>
      </div>

      {/* Learning Color Usage: Continue Learning -> Navy, Courses -> Soft Blue, Achievements -> Mint, Insights -> Peach, Progress -> Blue */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Navy Card: Continue Learning */}
        <div className="p-6 rounded-[24px] bg-[#12163A] text-white space-y-3 cursor-pointer hover-card-lift" onClick={() => onShowToast("Resumed Python AI module")}>
<<<<<<< HEAD
          <span className="text-xs uppercase font-medium text-[#DEE9FF]">Continue Learning</span>
          <h3 className="font-semibold text-base text-white">Python for Data Science & AI</h3>
          <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-[#3665EE] rounded-full" style={{ width: '85%' }} />
          </div>
          <span className="text-xs text-[#DEE9FF] block font-medium">85% Completed</span>
=======
          <span className="text-[12px] uppercase font-semibold text-[#DEE9FF] tracking-wider">Continue Learning</span>
          <h3 className="text-[16px] md:text-[17px] font-semibold text-white leading-snug">Python for Data Science & AI</h3>
          <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-[#3665EE] rounded-full" style={{ width: '85%' }} />
          </div>
          <span className="text-[13px] text-[#DEE9FF] block font-medium">85% Completed</span>
>>>>>>> origin/omsai
        </div>

        {/* Soft Blue Card: Recommended Courses */}
        <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-3 cursor-pointer hover-card-lift" onClick={() => onShowToast("Opening System Design course")}>
<<<<<<< HEAD
          <span className="text-xs uppercase font-medium text-[#3665EE]">Recommended Course</span>
          <h3 className="font-semibold text-base text-[#12163A]">System Design & Microservices</h3>
          <div className="w-full h-2.5 bg-white/80 rounded-full overflow-hidden">
            <div className="h-full bg-[#3665EE] rounded-full" style={{ width: '60%' }} />
          </div>
          <span className="text-xs text-[#4B5563] block font-medium">60% Completed</span>
=======
          <span className="text-[12px] uppercase font-semibold text-[#3665EE] tracking-wider">Recommended Course</span>
          <h3 className="text-[16px] md:text-[17px] font-semibold text-[#12163A] leading-snug">System Design & Microservices</h3>
          <div className="w-full h-2.5 bg-white/80 rounded-full overflow-hidden">
            <div className="h-full bg-[#3665EE] rounded-full" style={{ width: '60%' }} />
          </div>
          <span className="text-[13px] text-[#4B5563] block font-medium">60% Completed</span>
>>>>>>> origin/omsai
        </div>

        {/* Mint Card: Achievements */}
        <div className="p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-[#12163A] space-y-3 cursor-pointer hover-card-lift" onClick={() => onShowToast("Viewing Cloud Cert badge")}>
<<<<<<< HEAD
          <span className="text-xs uppercase font-medium text-[#12163A]">Achievement Badge</span>
          <h3 className="font-semibold text-base text-[#12163A]">Cloud Architecture (AWS)</h3>
          <div className="w-full h-2.5 bg-white/80 rounded-full overflow-hidden">
            <div className="h-full bg-[#3665EE] rounded-full" style={{ width: '45%' }} />
          </div>
          <span className="text-xs text-[#12163A] block font-medium">Foundational Certification Earned</span>
=======
          <span className="text-[12px] uppercase font-semibold text-[#12163A] tracking-wider">Achievement Badge</span>
          <h3 className="text-[16px] md:text-[17px] font-semibold text-[#12163A] leading-snug">Cloud Architecture (AWS)</h3>
          <div className="w-full h-2.5 bg-white/80 rounded-full overflow-hidden">
            <div className="h-full bg-[#3665EE] rounded-full" style={{ width: '45%' }} />
          </div>
          <span className="text-[13px] text-[#12163A] block font-medium">Foundational Certification Earned</span>
>>>>>>> origin/omsai
        </div>
      </div>
    </div>
  );
};
