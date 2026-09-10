import React from 'react';
import { RoleType } from '../lib/types';
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
import {
  FiGrid, 
  FiUsers, 
  FiCpu, 
  FiClock, 
  FiAward, 
  FiBriefcase, 
  FiDollarSign,
  FiBookOpen,
  FiBell,
  FiTrendingUp,
  FiShield
} from 'react-icons/fi';

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
  isDarkMode = false/
}) => {
  const cardBg = isDarkMode 
    ? 'bg-slate-900 border-slate-800 text-white shadow-md hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/40 cursor-pointer transition-all duration-200' 
    : 'bg-white border-blue-100 text-slate-900 shadow-xs hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 cursor-pointer transition-all duration-200';

  const textMuted = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const textHeading = isDarkMode ? 'text-white' : 'text-slate-900';

  if (currentWorkspace === 'super-admin') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 font-sans">
        <div className={`p-5 rounded-2xl border transition ${cardBg}`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[13px] font-medium ${textMuted}`}>Provisioned Entities</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <FiGrid className="w-5 h-5" />
            </div>
          </div>
<<<<<<< HEAD
          <h3 className={`text-2xl lg:text-3xl font-bold tracking-tight mb-1 ${textHeading}`}>{totalEntities}</h3>
          <span className="text-xs font-medium text-emerald-500 flex items-center gap-1">
            <FaArrowTrendUp className="w-3.5 h-3.5" /> +14.2% active growth
=======
          <h3 className={`text-2xl font-bold mb-1 ${textHeading}`}>{totalEntities}</h3>
          <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
            <FiTrendingUp className="w-3.5 h-3.5" /> {totalEntities > 0 ? `${totalEntities} registered partners` : 'Awaiting registrations'}
>>>>>>> origin/omsai
          </span>
        </div>

        <div className={`p-5 rounded-2xl border transition ${cardBg}`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[13px] font-medium ${textMuted}`}>Active Seat Quotas</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <FiUsers className="w-5 h-5" />
            </div>
          </div>
<<<<<<< HEAD
          <h3 className={`text-2xl lg:text-3xl font-bold tracking-tight mb-1 ${textHeading}`}>{totalSeats.toLocaleString()}</h3>
          <span className="text-xs font-medium text-blue-500 flex items-center gap-1">
            <FaShieldHalved className="w-3.5 h-3.5" /> 84.6% allocated
=======
          <h3 className={`text-2xl font-bold mb-1 ${textHeading}`}>{totalSeats.toLocaleString()}</h3>
          <span className="text-[11px] font-semibold text-blue-400 flex items-center gap-1">
            <FiShield className="w-3.5 h-3.5" /> {totalSeats > 0 ? 'Allocated across entities' : 'Quotas not allocated'}
>>>>>>> origin/omsai
          </span>
        </div>

        <div className={`p-5 rounded-2xl border transition ${cardBg}`}>
          <div className="flex items-center justify-between mb-3">
<<<<<<< HEAD
            <span className={`text-[13px] font-medium ${textMuted}`}>AI Career DNA Runs</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
=======
            <span className={`text-xs font-semibold ${textMuted}`}>System Infrastructure</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
>>>>>>> origin/omsai
              <FiCpu className="w-5 h-5" />
            </div>
          </div>
          <h3 className={`text-2xl font-bold mb-1 ${textHeading}`}>Live</h3>
          <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
            <FiTrendingUp className="w-3.5 h-3.5" /> Platform Services Active
          </span>
        </div>

        <div className={`p-5 rounded-2xl border transition ${cardBg}`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[13px] font-medium ${textMuted}`}>Pending Approvals</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <FiClock className="w-5 h-5" />
            </div>
          </div>
          <h3 className={`text-2xl font-bold mb-1 ${textHeading}`}>{pendingCount}</h3>
          <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
            {pendingCount > 0 ? 'Action required by Admin' : 'All entities verified'}
          </span>
        </div>
      </div>
    );
  }

  // Specialized Cards for specific role workspace views
  const roleMetricsMap: Record<string, Array<{ label: string; value: string; sub: string; icon: any }>> = {
    school: [
      { label: "Enrolled Students (8-12)", value: "3,820", sub: "100% Profile Completion", icon: FiUsers },
      { label: "Career DNA Completed", value: "3,450", sub: "90.3% Completion Rate", icon: FiCpu },
      { label: "Top Stream Match", value: "68% STEM", sub: "22% Commerce / 10% Humanities", icon: FiAward },
      { label: "Scholarships Fit", value: "₹1.2 Crores", sub: "412 Grants Awarded", icon: FiAward }
    ],
    college: [
      { label: "Total Undergrads", value: "11,450", sub: "9 Active Batches", icon: FiAward },
      { label: "Placement Rate", value: "94.2%", sub: "+5.1% YoY Increase", icon: FiBriefcase },
      { label: "Corporate Partners", value: "148 Drives", sub: "18 Drives Open Now", icon: FiUsers },
      { label: "Average CTC Package", value: "₹24.5 LPA", sub: "Max Package: ₹110 LPA", icon: FiDollarSign }
    ],
    mentor: [
      { label: "Assigned Mentees", value: "42 Students", sub: "Active Counseling", icon: FiUsers },
      { label: "Sessions Completed", value: "184 Hours", sub: "98% Satisfaction Rating", icon: FiClock },
      { label: "Upcoming Appointments", value: "6 Sessions", sub: "Next session at 2:00 PM", icon: FiBriefcase },
      { label: "Counselor Score", value: "4.9 / 5.0", sub: "Master Level Certified", icon: FiAward }
    ],
    training: [
      { label: "Active Trainees", value: "2,900", sub: "12 Certified Bootcamps", icon: FiBookOpen },
      { label: "Cert Completion", value: "91.4%", sub: "Industry Accredited", icon: FiAward },
      { label: "Placement Partners", value: "64 Companies", sub: "Tech & Cloud Tracks", icon: FiBriefcase },
      { label: "Employment Index", value: "88%", sub: "Hired within 90 days", icon: FiBriefcase }
    ],
    recruiter: [
      { label: "Active Job Postings", value: "18 Roles", sub: "Across 6 Global Offices", icon: FiBell },
      { label: "Applications Received", value: "1,240", sub: "AI Resume Screened", icon: FiUsers },
      { label: "Avg ATS Score Fit", value: "88%", sub: "High Skill Alignment", icon: FiCpu },
      { label: "Offers Extended", value: "42 Extended", sub: "38 Offers Accepted", icon: FiBriefcase }
    ],
    company: [
      { label: "Internship Drives", value: "12 Drives", sub: "Summer & Winter Tracks", icon: FiBriefcase },
      { label: "Partner Universities", value: "45 Colleges", sub: "Direct MoUs Signed", icon: FiAward },
      { label: "Enrolled Interns", value: "620 Interns", sub: "78% PPO Conversion Rate", icon: FiUsers },
      { label: "Monthly Stipend", value: "₹35,000 / mo", sub: "Competitive Package", icon: FiDollarSign }
    ],
    government: [
      { label: "Scholarships Granted", value: "₹115 Crores", sub: "48,200 Beneficiaries", icon: FiGrid },
      { label: "District Missions", value: "124 Active", sub: "Statewide Skill Coverage", icon: FiGrid },
      { label: "Employability Index", value: "82.4%", sub: "+8.2% YoY Improvement", icon: FiTrendingUp },
      { label: "Certified Skills", value: "110,000", sub: "Government Accredited", icon: FiAward }
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
              <span className={`text-[13px] font-medium ${textMuted}`}>{m.label}</span>
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <h3 className={`text-2xl lg:text-3xl font-bold tracking-tight mb-1 ${textHeading}`}>{m.value}</h3>
            <span className="text-xs font-medium text-blue-500">{m.sub}</span>
          </div>
        );
      })}
    </div>
  );
};
