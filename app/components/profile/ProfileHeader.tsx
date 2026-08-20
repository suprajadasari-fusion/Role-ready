import React from 'react';
import { FiEdit2, FiCheck, FiX, FiMail, FiMapPin, FiShield, FiUser } from 'react-icons/fi';
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
    'super-admin': 'Super Admin Governance Root',
    'school': 'School Institutional Administrator',
    'college': 'College Admissions & Dean',
    'mentor': 'Certified Executive Career Mentor',
    'training': 'Skill Academy Director',
    'recruiter': 'Corporate Talent Lead',
    'company': 'Enterprise Program Lead'
  };

  return (
    <div className={`rounded-3xl border p-6 sm:p-8 relative overflow-hidden transition-all duration-200 ${
      isDarkMode 
        ? 'bg-slate-900 border-slate-800 text-white shadow-xl' 
        : 'bg-white border-blue-100 text-slate-900 shadow-sm'
    }`}>
      {/* Background Decorative Gradient Header Banner */}
      <div className="h-28 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 relative opacity-90">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 relative z-10 -mt-16 sm:-mt-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
          <ProfileImageUpload 
            avatarUrl={profile.avatarUrl}
            isEditing={isEditing}
            onPhotoChange={onPhotoChange}
            isDarkMode={isDarkMode}
          />
          <div className="space-y-1 pb-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">{profile.fullName || 'User Profile'}</h2>
              <span className="bg-blue-500/15 border border-blue-500/30 text-blue-500 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <FiShield className="w-3.5 h-3.5" />
                <span>{roleDisplayNames[profile.role] || profile.role}</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{profile.qualification || 'Career Professional'}</p>

            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 flex-wrap pt-1">
              {profile.email && (
                <span className="flex items-center gap-1.5">
                  <FiMail className="w-3.5 h-3.5 text-blue-500" />
                  <span>{profile.email}</span>
                </span>
              )}
              {profile.location && (
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span>{profile.location}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Profile Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
          {!isEditing ? (
            <button
              type="button"
              onClick={onEditClick}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
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
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <FiX className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                type="button"
                onClick={onSaveClick}
                disabled={isSaving}
                className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiCheck className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
