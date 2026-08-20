import React, { useState } from 'react';
import { 
  FaCompass, 
  FaMagnifyingGlass, 
  FaArrowRight, 
  FaBrain, 
  FaFire, 
  FaArrowTrendUp, 
  FaSliders,
  FaCheck
} from 'react-icons/fa6';
import { useAppDispatch } from '~/store/store';
import { addNotification } from '~/store/slices/notificationsSlice';

interface DiscoverModuleProps {
  onShowToast: (msg: string) => void;
  isDarkMode?: boolean;
}

export const DiscoverModule: React.FC<DiscoverModuleProps> = ({ onShowToast, isDarkMode = true }) => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedCareer, setSelectedCareer] = useState<any | null>(null);

  const careersList = [
    {
      id: 'car-1',
      title: 'AI & Machine Learning Systems Architect',
      industry: 'AI & Data Science',
      salary: '₹25.0 - ₹45.0 LPA',
      growth: '+38% YoY Expansion',
      matchScore: 96,
      tags: ['Python', 'PyTorch', 'Transformers', 'MLOps', 'System Architecture'],
      overview: 'Design high-performance deep learning models, LLM pipelines, and automated MLOps infrastructure for global enterprises.',
      keySkills: ['Distributed Training', 'PyTorch/JIT', 'Kubernetes MLOps', 'Neural Search'],
      roadmapSteps: ['Undergraduate CS/AI Degree', 'ML Engineering Intern', 'Senior AI Engineer', 'AI Systems Architect']
    },
    {
      id: 'car-2',
      title: 'Quantitative Risk & Financial Analyst',
      industry: 'Fintech & Quant',
      salary: '₹22.0 - ₹38.0 LPA',
      growth: '+26% YoY Expansion',
      matchScore: 92,
      tags: ['Financial Modeling', 'Python', 'Stochastics', 'Risk Analysis'],
      overview: 'Utilize mathematical algorithms, time-series forecasting, and stochastic calculus to optimize portfolio risk.',
      keySkills: ['Monte Carlo Simulation', 'Python QuantLib', 'Options Pricing', 'SQL/KDB+'],
      roadmapSteps: ['BS Mathematics / Finance', 'Quant Data Analyst', 'Senior Quant Trader', 'Chief Risk Architect']
    },
    {
      id: 'car-3',
      title: 'Cloud Security & DevSecOps Lead',
      industry: 'Cybersecurity',
      salary: '₹20.0 - ₹34.0 LPA',
      growth: '+31% YoY Expansion',
      matchScore: 89,
      tags: ['AWS', 'Zero Trust', 'Kubernetes', 'CI/CD', 'SIEM'],
      overview: 'Protect multi-cloud infrastructure through automated security policies, container scanning, and zero-trust protocols.',
      keySkills: ['DevSecOps Automation', 'AWS Security Specialty', 'Terraform Sentinel', 'Incident Response'],
      roadmapSteps: ['Computer Science Degree', 'DevOps Specialist', 'Cloud Security Architect', 'Chief Information Security Officer']
    },
    {
      id: 'car-4',
      title: 'Biomedical & Genomic Data Engineer',
      industry: 'Biotech & Health',
      salary: '₹18.0 - ₹28.0 LPA',
      growth: '+29% YoY Expansion',
      matchScore: 87,
      tags: ['Genomics', 'Bioinformatics', 'R', 'Python', 'CRISPR Tech'],
      overview: 'Analyze high-throughput DNA sequencing data and build predictive biological algorithms for gene editing.',
      keySkills: ['Next-Gen Sequencing (NGS)', 'Biopython', 'CRISPR Target Selection', 'Cloud Genomics'],
      roadmapSteps: ['BS Bio-Informatics', 'Computational Biologist', 'Senior Genomic Engineer', 'Director of Bio-Research']
    },
    {
      id: 'car-5',
      title: 'Fullstack Platform Engineer (React 19 & Cloud)',
      industry: 'Software Engineering',
      salary: '₹18.0 - ₹32.0 LPA',
      growth: '+24% YoY Expansion',
      matchScore: 94,
      tags: ['React 19', 'TypeScript', 'Redux Toolkit', 'FastAPI', 'GraphQL'],
      overview: 'Architect responsive, accessible micro-frontends and scalable event-driven microservices.',
      keySkills: ['React Server Components', 'Redux Toolkit Architecture', 'Node.js/FastAPI', 'PostgreSQL'],
      roadmapSteps: ['Computer Science Degree', 'Frontend Developer', 'Fullstack Engineer', 'Principal Platform Architect']
    },
    {
      id: 'car-6',
      title: 'Robotics & Autonomous Fleet Engineer',
      industry: 'Robotics & Hardware',
      salary: '₹20.0 - ₹36.0 LPA',
      growth: '+34% YoY Expansion',
      matchScore: 88,
      tags: ['ROS2', 'C++', 'Computer Vision', 'LIDAR', 'Control Systems'],
      overview: 'Program autonomous navigation systems, sensor fusion engines, and robotic kinematics for industrial automation.',
      keySkills: ['ROS2 Navigation Stack', 'C++ 20 Embedded', 'SLAM Algorithms', 'PyTorch Vision'],
      roadmapSteps: ['BS Mechatronics / CS', 'Embedded Systems Engineer', 'Robotics Architect', 'VP of Autonomous Systems']
    }
  ];

  const filteredCareers = careersList.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesIndustry = selectedIndustry === 'All' || c.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const cardClass = isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-blue-100 text-slate-900 shadow-xs';
  const subCardClass = isDarkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-blue-50/40 border-blue-100';

  return (
    <div role="main" aria-label="Career Discovery Hub" className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${cardClass}`}>
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaCompass className="w-5 h-5 text-blue-500" /> Career Discovery & AI Neural Alignment Hub
          </h2>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Explore 500+ high-growth future careers with real-time market compensation in INR and AI skill matching.
          </p>
        </div>

        {/* Search & Industry Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <FaMagnifyingGlass className="w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search careers, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search career pathways"
              className={`pl-9 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            aria-label="Filter by industry"
            className={`px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          >
            <option value="All">All Industries</option>
            <option value="AI & Data Science">AI & Data Science</option>
            <option value="Fintech & Quant">Fintech & Quant</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Biotech & Health">Biotech & Health</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Robotics & Hardware">Robotics & Hardware</option>
          </select>
        </div>
      </div>

      {/* Grid of Career Pathway Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredCareers.map((car) => (
          <div 
            key={car.id}
            className={`p-5 rounded-2xl border space-y-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${subCardClass}`}
          >
            <div className="flex justify-between items-start">
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-emerald-500/30">
                {car.matchScore}% AI Match
              </span>
              <span className="text-blue-400 text-xs font-medium flex items-center gap-1">
                <FaArrowTrendUp className="w-3 h-3" /> {car.growth}
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-base leading-snug">{car.title}</h3>
              <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{car.industry}</span>
            </div>

            <div className="text-blue-500 font-bold text-sm">{car.salary}</div>

            <div className="flex flex-wrap gap-1">
              {car.tags.map((t, idx) => (
                <span key={idx} className={`text-xs px-2 py-0.5 rounded-md font-medium border ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-blue-100 text-slate-700'
                }`}>
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                setSelectedCareer(car);
                onShowToast(`Opened detailed roadmap for ${car.title}`);
                dispatch(addNotification({
                  title: 'Career Exploration',
                  message: `Explored detailed roadmap for ${car.title}`,
                  category: 'system'
                }));
              }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-xl text-sm transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Explore Pathway</span>
              <FaArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Modal Detail for Selected Career */}
      {selectedCareer && (
        <div role="dialog" aria-modal="true" aria-labelledby="career-modal-title" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl p-6 rounded-2xl border shadow-2xl space-y-6 ${cardClass}`}>
            <div className="flex justify-between items-start pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">{selectedCareer.industry}</span>
                <h3 id="career-modal-title" className="text-xl font-bold text-white mt-1">{selectedCareer.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedCareer(null)}
                aria-label="Close career modal"
                className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-slate-300">{selectedCareer.overview}</p>
              
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                <div>
                  <span className="text-xs text-slate-400 block">Est. Market Compensation</span>
                  <span className="text-lg font-bold text-blue-400">{selectedCareer.salary}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Neural Match Score</span>
                  <span className="text-lg font-bold text-emerald-400">{selectedCareer.matchScore}% Compatibility</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Key Skillstack Required:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.keySkills.map((sk: string, i: number) => (
                    <span key={i} className="text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-lg flex items-center gap-1">
                      <FaCheck className="w-3 h-3 text-blue-400" /> {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Step-by-Step Career Progression:</h4>
                <div className="space-y-2">
                  {selectedCareer.roadmapSteps.map((step: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 text-xs text-slate-300 bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedCareer(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onShowToast(`Enrolled target goal: ${selectedCareer.title}!`);
                  setSelectedCareer(null);
                }}
                className="px-5 py-2 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer"
              >
                Set as Target Career Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
