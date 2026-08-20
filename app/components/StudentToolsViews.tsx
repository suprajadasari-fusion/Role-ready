import React from 'react';
import { 
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
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
              <FaCompass className="w-5 h-5 text-[#3665EE]" /> Career Discovery Engine
            </h2>
            <p className="text-sm font-normal text-[#6B7280]">Explore 500+ future-ready career paths curated by AI neural alignment</p>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Search careers, skills, or degrees..." 
              className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#3665EE] bg-slate-50 text-[#12163A]"
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
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
              <FaListCheck className="w-5 h-5 text-[#3665EE]" /> Online Aptitude & Skill Assessment
            </h2>
            <p className="text-sm font-normal text-[#6B7280]">Timed cognitive & analytical reasoning test (Question 4 of 15)</p>
          </div>
          <div className="flex items-center gap-2 text-[#12163A] font-mono font-medium text-xs bg-[#DEE9FF] border border-[#C6D9FF] px-3.5 py-1.5 rounded-xl">
            <FaClock className="w-3.5 h-3.5 text-[#3665EE]" /> 18:45 Remaining
          </div>
        </div>

        <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#3665EE]">Category: Logical & Spatial Reasoning</span>
            <span className="text-[#4B5563] font-normal">Score Weight: 25 Points</span>
          </div>

          <p className="font-medium text-sm leading-relaxed text-[#12163A]">
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
                className={`w-full text-left p-3.5 rounded-xl border text-sm font-normal transition cursor-pointer ${
                  idx === 1 
                    ? 'bg-[#12163A] border-[#12163A] text-white font-medium' 
                    : 'bg-white border-slate-200 hover:bg-[#F6E6D8] text-[#12163A]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#C6D9FF]">
            <button onClick={() => onShowToast("Navigated to previous question")} className="px-4 py-2 rounded-xl font-medium text-sm border border-slate-300 bg-white text-[#12163A] hover:bg-slate-50 transition cursor-pointer">
              Previous Question
            </button>
            <button onClick={() => onShowToast("Assessment answers submitted! AI Score generated.")} className="px-5 py-2.5 rounded-xl font-medium text-sm bg-[#12163A] text-white shadow-md cursor-pointer transition hover:bg-[#1A2050]">
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
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
            <FaBrain className="w-5 h-5 text-[#3665EE]" /> RIASEC Psychometric & Personality Assessment
          </h2>
          <p className="text-sm font-normal text-[#6B7280]">Holland Code interest spectrum profiling (Rate your preference for each workplace scenario)</p>
        </div>

        <div className="space-y-4">
          {[
            { q: "I enjoy dissecting complex algorithmic code to find logical bottlenecks.", code: "Investigative (I)", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
            { q: "I prefer leading cross-functional teams to pitch new product ideas.", code: "Enterprising (E)", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
            { q: "I like sketching user experience mockups and visual interfaces.", code: "Artistic (A)", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
          ].map((item, i) => (
            <div key={i} className={`p-5 rounded-[24px] border space-y-3 ${item.bg} ${item.border} text-[#12163A]`}>
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm text-[#12163A]">{item.q}</p>
                <span className="text-xs bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-medium shadow-2xs whitespace-nowrap">{item.code}</span>
              </div>
              <div className="flex items-center justify-between gap-2 text-xs pt-1">
                <span className="text-[#6B7280]">Strongly Disagree</span>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      onClick={() => onShowToast(`Rated ${val} for scenario ${i + 1}`)}
                      className={`w-7 h-7 rounded-full font-medium text-xs transition cursor-pointer ${
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
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
              <FaBrain className="w-5 h-5 text-[#3665EE]" /> Career DNA Genome Profile & Aptitude Tracker
            </h2>
            <p className="text-sm font-normal text-[#6B7280]">Holland Code: RIE (Realistic • Investigative • Enterprising)</p>
          </div>
          <button 
            onClick={() => onShowToast("Downloading official Career DNA Passport PDF")}
            className="bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-sm px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 shrink-0"
          >
            <FaDownload className="w-3.5 h-3.5 text-[#DEE9FF]" /> Download DNA Passport
          </button>
        </div>

        {/* Warm Peach & Navy Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A] space-y-2 min-w-0 hover-card-lift">
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
          </div>
        </div>
      </div>
    );
  }

  // 5. AI RECOMMENDATION DASHBOARD
  if (activeSubView === 'ai-recommendations') {
    return (
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
            <FaBrain className="w-5 h-5 text-[#3665EE]" /> AI Neural Recommendation Engine
          </h2>
          <p className="text-sm font-normal text-[#6B7280]">Predictive career alignment calculated from aptitude, interest, and industry demand</p>
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
                <h4 className="font-semibold text-base text-[#12163A]">{rec.role}</h4>
                <p className="text-xs mt-1 text-[#4B5563] font-normal">{rec.rationale}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#3665EE]">{rec.match}</div>
                <span className="text-xs font-medium text-[#12163A]">Neural Match</span>
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
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
            <FaAward className="w-5 h-5 text-[#3665EE]" /> Scholarship & Merit Aid Explorer
          </h2>
          <p className="text-sm font-normal text-[#6B7280]">₹12.5 Crores in active national, state, and corporate scholarships open for application</p>
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
                <h4 className="font-semibold text-base text-[#12163A]">{sch.title}</h4>
                <span className="font-medium text-xs text-[#3665EE]">{sch.provider} • {sch.deadline}</span>
              </div>
              <div className="text-right flex items-center gap-3">
                <div className="font-semibold text-sm text-[#12163A]">{sch.amount}</div>
                <button 
                  onClick={() => onShowToast(`Submitted application for ${sch.title}!`)}
                  className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer shadow-xs hover:scale-105 active:scale-95"
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
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
            <FaGraduationCap className="w-5 h-5 text-[#3665EE]" /> University & College Explorer Directory
          </h2>
          <p className="text-sm font-normal text-[#6B7280]">Compare NIRF ranks, admission cutoffs, course offerings, and campus placements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Indian Institute of Technology (IIT Bombay)", rank: "NIRF #1", avgCtc: "₹28.5 LPA", cutoff: "JEE Adv < 500", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
            { name: "BITS Pilani (Main Campus)", rank: "NIRF #7", avgCtc: "₹24.0 LPA", cutoff: "BITSAT > 320", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
            { name: "IIIT Hyderabad", rank: "NIRF #12", avgCtc: "₹31.0 LPA", cutoff: "JEE Main < 1200", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
          ].map((col, i) => (
            <div key={i} className={`p-5 rounded-[24px] border space-y-2 cursor-pointer transition-all duration-200 ${col.bg} ${col.border} text-[#12163A] min-w-0 hover-card-lift`} onClick={() => onShowToast(`Added ${col.name} to Target Wishlist`)}>
              <span className="text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium">{col.rank}</span>
              <h3 className="font-semibold text-base truncate text-[#12163A]">{col.name}</h3>
              <div className="font-semibold text-sm text-[#3665EE]">Avg CTC: {col.avgCtc}</div>
              <div className="text-xs text-[#4B5563] font-normal">Cutoff: {col.cutoff}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 8. CAREER ROADMAP
  if (activeSubView === 'roadmap') {
    return (
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
            <FaArrowTrendUp className="w-5 h-5 text-[#3665EE]" /> Interactive Career Milestone Roadmap
          </h2>
          <p className="text-sm font-normal text-[#6B7280]">Step-by-step guidance from Class 10 to AI Engineering Leader</p>
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
                <div className="w-8 h-8 rounded-full bg-[#12163A] text-white flex items-center justify-center font-semibold text-xs shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#12163A]">{rd.step}</h4>
                  <p className="text-xs font-normal text-[#4B5563]">{rd.desc}</p>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full font-medium border bg-white border-slate-200 text-[#12163A] shrink-0">
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
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
              <FaFileLines className="w-5 h-5 text-[#3665EE]" /> AI ATS Resume Score & Optimizer Dashboard
            </h2>
            <p className="text-sm font-normal text-[#6B7280]">Automated ATS scanner compliance & keyword density optimization</p>
          </div>
          <button 
            onClick={() => onShowToast("Running AI Resume Optimizer scan...")}
            className="bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-sm px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
          >
            <FaStar className="w-3.5 h-3.5 text-[#DEE9FF]" /> Run AI Resume Scan
          </button>
        </div>

        {/* White Cards, Blue Progress, Navy Completion Badge, Peach Suggestions, Mint Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs text-center space-y-2 min-w-0 hover-card-lift">
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
          </div>
        </div>
      </div>
    );
  }

  // 10. LEARNING PROGRESS DASHBOARD
  return (
    <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
            <FaBookOpen className="w-5 h-5 text-[#3665EE]" /> Skill Mastery & Learning Progress Tracker
          </h2>
          <p className="text-sm font-normal text-[#6B7280]">Track active courses, earned certification badges, and daily study streaks</p>
        </div>
        <div className="flex items-center gap-2 text-[#12163A] font-medium text-xs bg-[#E4F4EC] border border-[#C3E6D5] px-3.5 py-1.5 rounded-xl">
          <FaFire className="w-4 h-4 text-[#3665EE]" /> 14-Day Streak!
        </div>
      </div>

      {/* Learning Color Usage: Continue Learning -> Navy, Courses -> Soft Blue, Achievements -> Mint, Insights -> Peach, Progress -> Blue */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Navy Card: Continue Learning */}
        <div className="p-6 rounded-[24px] bg-[#12163A] text-white space-y-3 cursor-pointer hover-card-lift" onClick={() => onShowToast("Resumed Python AI module")}>
          <span className="text-xs uppercase font-medium text-[#DEE9FF]">Continue Learning</span>
          <h3 className="font-semibold text-base text-white">Python for Data Science & AI</h3>
          <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-[#3665EE] rounded-full" style={{ width: '85%' }} />
          </div>
          <span className="text-xs text-[#DEE9FF] block font-medium">85% Completed</span>
        </div>

        {/* Soft Blue Card: Recommended Courses */}
        <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-3 cursor-pointer hover-card-lift" onClick={() => onShowToast("Opening System Design course")}>
          <span className="text-xs uppercase font-medium text-[#3665EE]">Recommended Course</span>
          <h3 className="font-semibold text-base text-[#12163A]">System Design & Microservices</h3>
          <div className="w-full h-2.5 bg-white/80 rounded-full overflow-hidden">
            <div className="h-full bg-[#3665EE] rounded-full" style={{ width: '60%' }} />
          </div>
          <span className="text-xs text-[#4B5563] block font-medium">60% Completed</span>
        </div>

        {/* Mint Card: Achievements */}
        <div className="p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-[#12163A] space-y-3 cursor-pointer hover-card-lift" onClick={() => onShowToast("Viewing Cloud Cert badge")}>
          <span className="text-xs uppercase font-medium text-[#12163A]">Achievement Badge</span>
          <h3 className="font-semibold text-base text-[#12163A]">Cloud Architecture (AWS)</h3>
          <div className="w-full h-2.5 bg-white/80 rounded-full overflow-hidden">
            <div className="h-full bg-[#3665EE] rounded-full" style={{ width: '45%' }} />
          </div>
          <span className="text-xs text-[#12163A] block font-medium">Foundational Certification Earned</span>
        </div>
      </div>
    </div>
  );
};
