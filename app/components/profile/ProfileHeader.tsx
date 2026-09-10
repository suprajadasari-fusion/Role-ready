import React from 'react';
import { FiEdit2, FiCheck, FiX, FiMail, FiMapPin, FiShield, FiPhone } from 'react-icons/fi';
import { UserProfile } from '../../lib/types';
import { ProfileImageUpload } from './ProfileImageUpload';

interface ProfileHeaderProps {
  profile: UserProfile;
  isEditing: boolean;
  isSaving: boolean;
  onEditClick: () => void;
  onSaveClick: () => void;
  onCancelClick: () => void;
  onPhotoChange: (newPhotoUrl: string) => void;
  isDarkMode?: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  isEditing,
  isSaving,
  onEditClick,
  onSaveClick,
  onCancelClick,
  onPhotoChange,
  isDarkMode = false
}) => {
  const roleDisplayNames: Record<string, string> = {
    'super-admin': 'Super Administrator',
    'school': 'School Administrator',
    'college': 'College Dean / Admin',
    'mentor': 'Certified Executive Career Mentor',
    'training': 'Training Institute Director',
    'recruiter': 'Corporate Talent Lead',
    'company': 'Enterprise Company Lead',
    'parent': 'Parent & Family Guardian'
  };

  const displayName = profile.firstName && profile.lastName 
    ? `${profile.firstName} ${profile.lastName}` 
    : (profile.fullName || 'User Profile');

  const headline = profile.qualification 
    || (profile.roleData?.experience ? `${profile.roleData.experience}+ Years Experience • Career Advisor` : null)
    || 'Certified Career Guidance Specialist';

  return (
    <div className={`rounded-3xl border overflow-hidden transition-all duration-200 ${
      isDarkMode 
        ? 'bg-slate-900 border-slate-800 text-white shadow-xl' 
        : 'bg-white border-blue-100 text-slate-900 shadow-sm'
    }`}>
      {/* 1. Cover Banner */}
      <div className="h-36 sm:h-44 bg-gradient-to-r from-[#12163A] via-blue-700 to-indigo-800 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400/25 via-transparent to-transparent" />
        <div className="absolute top-4 right-5 sm:top-5 sm:right-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 shadow-xs">
            <FiShield className="w-3.5 h-3.5 text-blue-300" />
            <span>{roleDisplayNames[profile.role] || profile.role}</span>
          </span>
        </div>
      </div>

      {/* 2. Main Profile Content Body */}
      <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
        {/* Row: Avatar + Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-16 mb-4">
          <ProfileImageUpload 
            avatarUrl={profile.avatarUrl}
            name={displayName}
            isEditing={isEditing}
            onPhotoChange={onPhotoChange}
            isDarkMode={isDarkMode}
          />

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
            {!isEditing ? (
              <button
                type="button"
                onClick={onEditClick}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <FiEdit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onCancelClick}
                  disabled={isSaving}
                  className={`font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isDarkMode 
                      ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700' 
                      : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <FiX className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  type="button"
                  onClick={onSaveClick}
                  disabled={isSaving}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  <FiCheck className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* User Identity Details */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {displayName}
            </h2>
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${
              isDarkMode 
                ? 'bg-blue-500/15 border-blue-500/30 text-blue-400' 
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              {roleDisplayNames[profile.role] || profile.role}
            </span>
          </div>

          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {headline}
          </p>

          {/* Contact Metadata Bar */}
          <div className="flex items-center gap-5 sm:gap-7 text-xs text-slate-500 dark:text-slate-400 flex-wrap pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
            {profile.email && (
              <span className="flex items-center gap-1.5">
                <FiMail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span className="font-medium text-slate-700 dark:text-slate-300">{profile.email}</span>
              </span>
            )}
            {(profile.phoneNumber || profile.mobile) && (
              <span className="flex items-center gap-1.5">
                <FiPhone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="font-medium text-slate-700 dark:text-slate-300">{profile.phoneNumber || profile.mobile}</span>
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <FiMapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="font-medium text-slate-700 dark:text-slate-300">{profile.location || 'Remote / Global'}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
