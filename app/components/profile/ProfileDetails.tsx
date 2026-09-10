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
  FiCheckCircle
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
    : 'bg-slate-50/60 border-slate-100';

  const textMuted = isDarkMode ? 'text-slate-400' : 'text-slate-500';

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
            <h3 className="font-extrabold text-base">Personal Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className={`p-4 rounded-2xl border space-y-1 ${subCardClass}`}>
              <span className={`text-[11px] font-medium block ${textMuted}`}>Full Name</span>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                {profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName}` : (profile.fullName || 'N/A')}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${subCardClass}`}>
              <span className={`text-[11px] font-medium flex items-center gap-1 ${textMuted}`}>
                <FiMail className="w-3 h-3 text-blue-500" /> Email Address
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{profile.email || 'N/A'}</p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${subCardClass}`}>
              <span className={`text-[11px] font-medium flex items-center gap-1 ${textMuted}`}>
                <FiPhone className="w-3 h-3 text-blue-500" /> Phone Number
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white">{profile.phoneNumber || profile.mobile || 'N/A'}</p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${subCardClass}`}>
              <span className={`text-[11px] font-medium flex items-center gap-1 ${textMuted}`}>
                <FiCalendar className="w-3 h-3 text-blue-500" /> Date of Birth
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white">{profile.dob || 'N/A'}</p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${subCardClass}`}>
              <span className={`text-[11px] font-medium block ${textMuted}`}>Gender</span>
              <p className="font-bold text-sm text-slate-900 dark:text-white">{profile.gender || 'N/A'}</p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${subCardClass}`}>
              <span className={`text-[11px] font-medium flex items-center gap-1 ${textMuted}`}>
                <FiMapPin className="w-3 h-3 text-blue-500" /> Location / Address
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white">{profile.location || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Education & Qualifications Card */}
        <div className={`rounded-3xl border p-6 sm:p-7 space-y-5 ${cardClass}`}>
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
              <FiBookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-base">Education & Qualification</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className={`p-4 rounded-2xl border space-y-1.5 ${subCardClass}`}>
              <span className={`text-[11px] font-medium flex items-center gap-1 ${textMuted}`}>
                <FiBookOpen className="w-3 h-3 text-indigo-500" /> Highest Education
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white leading-snug">{profile.education || 'N/A'}</p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1.5 ${subCardClass}`}>
              <span className={`text-[11px] font-medium flex items-center gap-1 ${textMuted}`}>
                <FiAward className="w-3 h-3 text-indigo-500" /> Professional Qualification
              </span>
              <p className="font-bold text-sm text-slate-900 dark:text-white leading-snug">{profile.qualification || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT 1 COLUMN: Bio & Skills */}
      <div className="space-y-6">
        {/* Bio / About Me Card */}
        <div className={`rounded-3xl border p-6 sm:p-7 space-y-4 ${cardClass}`}>
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
              <FiFileText className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-base">Bio / About Me</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
            "{profile.bio || 'No bio specified yet.'}"
          </p>
        </div>

        {/* Skills Card */}
        <div className={`rounded-3xl border p-6 sm:p-7 space-y-4 ${cardClass}`}>
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <FiCpu className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-base">Skills & Expertise</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.skills && profile.skills.length > 0 ? (
              profile.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                >
                  <FiCheckCircle className="w-3.5 h-3.5 text-blue-500" />
                  <span>{skill}</span>
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400">No skills added yet.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
