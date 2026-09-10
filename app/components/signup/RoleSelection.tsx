import React from 'react';
import {
  FiUsers,
  FiUserCheck,
  FiBriefcase,
  FiGrid,
  FiBookOpen,
  FiAward,
  FiCpu,
  FiArrowRight,
  FiCheck
} from 'react-icons/fi';

export type SignupRoleId = 'parent' | 'mentor' | 'recruiter' | 'company' | 'training' | 'school' | 'college' | 'student';

export interface RoleOption {
  id: SignupRoleId;
  title: string;
  badge: string;
  description: string;
  icon: any;
  color: string;
}

export const SIGNUP_ROLES: RoleOption[] = [
  {
    id: 'parent',
    title: 'Parent Desk',
    badge: 'Family & Guardian',
    description: 'Monitor your child\'s career trajectory, aptitude assessments, and guidance milestones.',
    icon: FiUsers,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'training',
    title: 'Training Institute',
    badge: 'Vocational & Skill Org',
    description: 'Manage specialized training cohorts, industry upskilling programs, and batch credentials.',
    icon: FiCpu,
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'school',
    title: 'School Admin',
    badge: 'K-12 Education',
    description: 'Administer school student aptitude mapping, foundational career discovery, and counseling.',
    icon: FiBookOpen,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'college',
    title: 'College Admin',
    badge: 'Higher Education',
    description: 'Drive placement office analytics, verify student readiness, and host campus hiring drives.',
    icon: FiAward,
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'mentor',
    title: 'Mentor Desk',
    badge: 'Industry Expert',
    description: 'Conduct 1-on-1 coaching, code and resume reviews, mock interviews, and career advisory.',
    icon: FiUserCheck,
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'recruiter',
    title: 'Recruiter Desk',
    badge: 'Talent Acquisition',
    description: 'Source pre-assessed candidates with verified skill readiness, schedule rounds, and hire.',
    icon: FiBriefcase,
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'company',
    title: 'Company Admin',
    badge: 'Enterprise Employer',
    description: 'Manage organization hiring pipelines, team seats, campus engagements, and recruitment policies.',
    icon: FiGrid,
    color: 'from-slate-700 to-slate-900'
  }
];

interface RoleSelectionProps {
  selectedRole: SignupRoleId;
  onSelectRole: (role: SignupRoleId) => void;
  onContinue: () => void;
  onNavigateLogin: () => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({
  selectedRole,
  onSelectRole,
  onContinue,
  onNavigateLogin
}) => {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Header */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold mb-1 border border-blue-200/60">
            Step 1 of 3 • Role Selection
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Choose Your Workspace Role
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Select the role that fits your organization to configure your dedicated dashboard and permissions.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[50vh] overflow-y-auto pr-1">
          {SIGNUP_ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <div
                key={role.id}
                onClick={() => onSelectRole(role.id)}
                className={`relative p-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-200 text-left flex flex-col justify-between group ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 shadow-md shadow-blue-500/10'
                    : 'border-slate-200/80 bg-white hover:border-blue-300 hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm bg-gradient-to-br ${role.color}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">
                          {role.title}
                        </h3>
                        <span className="text-[10px] font-medium text-slate-400 block">
                          {role.badge}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white group-hover:border-blue-400'
                      }`}
                    >
                      {isSelected && <FiCheck className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 mt-4 space-y-2.5">
        <button
          type="button"
          onClick={onContinue}
          className="w-full bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Continue to Information Form</span>
          <FiArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center text-xs text-slate-600">
          Already registered on Role Ready?{' '}
          <button
            type="button"
            onClick={onNavigateLogin}
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer ml-0.5"
          >
            Sign In to Workspace
          </button>
        </div>
      </div>
    </div>
  );
};
