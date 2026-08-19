import React from 'react';
import { RoleType } from '~/lib/types';
import { 
  FaBuildingUser, 
  FaUsersGear, 
  FaBrain, 
  FaClock, 
  FaGraduationCap, 
  FaBriefcase, 
  FaHandshake, 
  FaIndianRupeeSign,
  FaAward,
  FaBookOpen,
  FaBullhorn,
  FaLandmark,
  FaArrowTrendUp,
  FaShieldHalved
} from 'react-icons/fa6';

interface MetricsGridProps {
  currentWorkspace: RoleType;
  totalEntities: number;
  totalSeats: number;
  pendingCount: number;
  isDarkMode?: boolean;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({
  currentWorkspace,
  totalEntities,
  totalSeats,
  pendingCount,
  isDarkMode = false
}) => {
  const cardBg = isDarkMode 
    ? 'bg-slate-900 border-slate-800 text-white shadow-md hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/40 cursor-pointer transition-all duration-300' 
    : 'bg-white border-blue-100 text-slate-900 shadow-xs hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 cursor-pointer transition-all duration-300';

  const textMuted = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const textHeading = isDarkMode ? 'text-white' : 'text-slate-900';

  if (currentWorkspace === 'super-admin') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 font-sans">
        <div className={`p-5 rounded-2xl border transition ${cardBg}`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold ${textMuted}`}>Provisioned Entities</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <FaBuildingUser className="w-5 h-5" />
            </div>
          </div>
          <h3 className={`text-2xl font-extrabold mb-1 ${textHeading}`}>{totalEntities}</h3>
          <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
            <FaArrowTrendUp className="w-3.5 h-3.5" /> +14.2% active growth
          </span>
        </div>

        <div className={`p-5 rounded-2xl border transition ${cardBg}`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold ${textMuted}`}>Active Seat Quotas</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <FaUsersGear className="w-5 h-5" />
            </div>
          </div>
          <h3 className={`text-2xl font-extrabold mb-1 ${textHeading}`}>{totalSeats.toLocaleString()}</h3>
          <span className="text-[11px] font-semibold text-blue-400 flex items-center gap-1">
            <FaShieldHalved className="w-3.5 h-3.5" /> 84.6% allocated
          </span>
        </div>

        <div className={`p-5 rounded-2xl border transition ${cardBg}`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold ${textMuted}`}>AI Career DNA Runs</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <FaBrain className="w-5 h-5" />
            </div>
          </div>
          <h3 className={`text-2xl font-extrabold mb-1 ${textHeading}`}>2.8M</h3>
          <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
            <FaArrowTrendUp className="w-3.5 h-3.5" /> 99.4% Latency &lt;450ms
          </span>
        </div>

        <div className={`p-5 rounded-2xl border transition ${cardBg}`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold ${textMuted}`}>Pending Approvals</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <FaClock className="w-5 h-5" />
            </div>
          </div>
          <h3 className={`text-2xl font-extrabold mb-1 ${textHeading}`}>{pendingCount}</h3>
          <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
            Action required by Admin
          </span>
        </div>
      </div>
    );
  }

  // Specialized Cards for specific role workspace views
  const roleMetricsMap: Record<string, Array<{ label: string; value: string; sub: string; icon: any }>> = {
    school: [
      { label: "Enrolled Students (8-12)", value: "3,820", sub: "100% Profile Completion", icon: FaUsersGear },
      { label: "Career DNA Completed", value: "3,450", sub: "90.3% Completion Rate", icon: FaBrain },
      { label: "Top Stream Match", value: "68% STEM", sub: "22% Commerce / 10% Humanities", icon: FaGraduationCap },
      { label: "Scholarships Fit", value: "₹1.2 Crores", sub: "412 Grants Awarded", icon: FaAward }
    ],
    college: [
      { label: "Total Undergrads", value: "11,450", sub: "9 Active Batches", icon: FaGraduationCap },
      { label: "Placement Rate", value: "94.2%", sub: "+5.1% YoY Increase", icon: FaBriefcase },
      { label: "Corporate Partners", value: "148 Drives", sub: "18 Drives Open Now", icon: FaHandshake },
      { label: "Average CTC Package", value: "₹24.5 LPA", sub: "Max Package: ₹110 LPA", icon: FaIndianRupeeSign }
    ],
    mentor: [
      { label: "Assigned Mentees", value: "42 Students", sub: "Active Counseling", icon: FaUsersGear },
      { label: "Sessions Completed", value: "184 Hours", sub: "98% Satisfaction Rating", icon: FaClock },
      { label: "Upcoming Appointments", value: "6 Sessions", sub: "Next session at 2:00 PM", icon: FaBriefcase },
      { label: "Counselor Score", value: "4.9 / 5.0", sub: "Master Level Certified", icon: FaAward }
    ],
    training: [
      { label: "Active Trainees", value: "2,900", sub: "12 Certified Bootcamps", icon: FaBookOpen },
      { label: "Cert Completion", value: "91.4%", sub: "Industry Accredited", icon: FaAward },
      { label: "Placement Partners", value: "64 Companies", sub: "Tech & Cloud Tracks", icon: FaHandshake },
      { label: "Employment Index", value: "88%", sub: "Hired within 90 days", icon: FaBriefcase }
    ],
    recruiter: [
      { label: "Active Job Postings", value: "18 Roles", sub: "Across 6 Global Offices", icon: FaBullhorn },
      { label: "Applications Received", value: "1,240", sub: "AI Resume Screened", icon: FaUsersGear },
      { label: "Avg ATS Score Fit", value: "88%", sub: "High Skill Alignment", icon: FaBrain },
      { label: "Offers Extended", value: "42 Extended", sub: "38 Offers Accepted", icon: FaBriefcase }
    ],
    company: [
      { label: "Internship Drives", value: "12 Drives", sub: "Summer & Winter Tracks", icon: FaBriefcase },
      { label: "Partner Universities", value: "45 Colleges", sub: "Direct MoUs Signed", icon: FaGraduationCap },
      { label: "Enrolled Interns", value: "620 Interns", sub: "78% PPO Conversion Rate", icon: FaUsersGear },
      { label: "Monthly Stipend", value: "₹35,000 / mo", sub: "Competitive Package", icon: FaIndianRupeeSign }
    ],
    government: [
      { label: "Scholarships Granted", value: "₹115 Crores", sub: "48,200 Beneficiaries", icon: FaLandmark },
      { label: "District Missions", value: "124 Active", sub: "Statewide Skill Coverage", icon: FaBuildingUser },
      { label: "Employability Index", value: "82.4%", sub: "+8.2% YoY Improvement", icon: FaArrowTrendUp },
      { label: "Certified Skills", value: "110,000", sub: "Government Accredited", icon: FaAward }
    ]
  };

  const metrics = roleMetricsMap[currentWorkspace] || roleMetricsMap.school;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 font-sans">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div key={idx} className={`p-5 rounded-2xl border transition ${cardBg}`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-semibold ${textMuted}`}>{m.label}</span>
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <h3 className={`text-2xl font-extrabold mb-1 ${textHeading}`}>{m.value}</h3>
            <span className="text-[11px] font-semibold text-blue-400">{m.sub}</span>
          </div>
        );
      })}
    </div>
  );
};
