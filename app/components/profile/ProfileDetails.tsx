import React from 'react';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiCalendar, 
  FiMapPin, 
  FiAward, 
  FiBookOpen, 
  FiCpu, 
  FiFileText,
  FiCheckCircle,
  FiShield
} from 'react-icons/fi';
import { UserProfile } from '../../lib/types';

interface ProfileDetailsProps {
  profile: UserProfile;
  isDarkMode?: boolean;
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  profile,
  isDarkMode = false
}) => {
  const cardClass = isDarkMode 
    ? 'bg-slate-900 border-slate-800 text-white shadow-xl' 
    : 'bg-white border-blue-100 text-slate-900 shadow-sm';

  const subCardClass = isDarkMode
    ? 'bg-slate-800/60 border-slate-700/60'
    : 'bg-slate-50/70 border-slate-200/70';

  const textMuted = isDarkMode ? 'text-slate-400' : 'text-slate-500';

  const fullName = profile.firstName && profile.lastName 
    ? `${profile.firstName} ${profile.lastName}` 
    : (profile.fullName || 'User Profile');

  const defaultSkills = [
    'Career Advisory',
    'Interview Preparation',
    'Technical Roadmaps',
    'Resume Guidance'
  ];

  const displaySkills = profile.skills && profile.skills.length > 0 
    ? profile.skills 
    : defaultSkills;

  const defaultBio = profile.role === 'mentor'
    ? 'Dedicated career mentor and domain specialist empowering students and professionals to achieve their career aspirations.'
    : 'Authenticated Role Ready ecosystem member actively managing educational and career milestones.';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      {/* LEFT 2 COLUMNS: Personal Information & Qualifications */}
      <div className="lg:col-span-2 space-y-6">
        {/* Personal Details Card */}
        <div className={`rounded-3xl border p-6 sm:p-7 space-y-5 ${cardClass}`}>
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
              <FiUser className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base">Personal Information</h3>
              <p className={`text-xs ${textMuted} mt-0.5`}>Your verified personal identity and contact details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className={`p-4 rounded-2xl border space-y-1 ${subCardClass}`}>
              <span className={`text-[11px] font-medium block ${textMuted}`}>Full Name</span>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                {fullName}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${subCardClass}`}>
              <span className={`text-[11px] font-medium flex items-center gap-1 ${textMuted}`}>
                <FiMail className="w-3.5 h-3.5 text-blue-500" /> Email Address
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white truncate" title={profile.email}>
                {profile.email || 'Not Provided'}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${subCardClass}`}>
              <span className={`text-[11px] font-medium flex items-center gap-1 ${textMuted}`}>
                <FiPhone className="w-3.5 h-3.5 text-emerald-500" /> Phone Number
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                {profile.phoneNumber || profile.mobile || 'Not Provided'}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${subCardClass}`}>
              <span className={`text-[11px] font-medium flex items-center gap-1 ${textMuted}`}>
                <FiCalendar className="w-3.5 h-3.5 text-purple-500" /> Date of Birth
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                {profile.dob || 'Not Provided'}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${subCardClass}`}>
              <span className={`text-[11px] font-medium block ${textMuted}`}>Gender</span>
              <p className="font-bold text-sm text-slate-900 dark:text-white capitalize">
                {profile.gender || 'Not Specified'}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${subCardClass}`}>
              <span className={`text-[11px] font-medium flex items-center gap-1 ${textMuted}`}>
                <FiMapPin className="w-3.5 h-3.5 text-rose-500" /> Location / Address
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                {profile.location || 'Remote / Global'}
              </p>
            </div>
          </div>
        </div>

        {/* Education & Qualifications Card */}
        <div className={`rounded-3xl border p-6 sm:p-7 space-y-5 ${cardClass}`}>
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
              <FiBookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base">Education & Credentials</h3>
              <p className={`text-xs ${textMuted} mt-0.5`}>Academic degrees, certifications, and industry recognition</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className={`p-4 rounded-2xl border space-y-1.5 ${subCardClass}`}>
              <span className={`text-[11px] font-medium flex items-center gap-1 ${textMuted}`}>
                <FiBookOpen className="w-3.5 h-3.5 text-indigo-500" /> Highest Education
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                {profile.education || 'Master of Technology / Post Graduate'}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1.5 ${subCardClass}`}>
              <span className={`text-[11px] font-medium flex items-center gap-1 ${textMuted}`}>
                <FiAward className="w-3.5 h-3.5 text-amber-500" /> Professional Qualification
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                {profile.qualification || 'Certified Career Mentor & Advisor'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT 1 COLUMN: Bio, Skills, Account Status */}
      <div className="space-y-6">
        {/* Bio / About Me Card */}
        <div className={`rounded-3xl border p-6 sm:p-7 space-y-4 ${cardClass}`}>
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
              <FiFileText className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base">Bio / About Me</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic bg-slate-50/50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            "{profile.bio || defaultBio}"
          </p>
        </div>

        {/* Skills Card */}
        <div className={`rounded-3xl border p-6 sm:p-7 space-y-4 ${cardClass}`}>
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <FiCpu className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base">Skills & Specializations</h3>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {displaySkills.map((skill, index) => (
              <span 
                key={index}
                className="bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs"
              >
                <FiCheckCircle className="w-3.5 h-3.5 text-blue-500" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Account Security & Verification Card */}
        <div className={`rounded-3xl border p-6 sm:p-7 space-y-4 ${cardClass}`}>
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <FiShield className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base">Account Security</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className={textMuted}>Identity Status</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <FiCheckCircle className="w-3.5 h-3.5" /> Verified Account
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className={textMuted}>Access Level</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">Authenticated Role</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className={textMuted}>Session State</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
