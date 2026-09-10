import React, { useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiCalendar, 
  FiMapPin, 
  FiBookOpen, 
  FiAward, 
  FiPlus, 
  FiX, 
  FiFileText,
  FiAlertCircle
} from 'react-icons/fi';
import { UserProfile } from '../../lib/types';

interface ProfileFormProps {
  formData: UserProfile;
  errors: Record<string, string>;
  onChange: (field: keyof UserProfile, value: any) => void;
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (index: number) => void;
  isDarkMode?: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  formData,
  errors,
  onChange,
  onAddSkill,
  onRemoveSkill,
  isDarkMode = false
}) => {
  const [newSkillInput, setNewSkillInput] = useState('');

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (newSkillInput.trim()) {
        onAddSkill(newSkillInput.trim());
        setNewSkillInput('');
      }
    }
  };

  const handleAddSkillClick = () => {
    if (newSkillInput.trim()) {
      onAddSkill(newSkillInput.trim());
      setNewSkillInput('');
    }
  };

  const inputClass = (hasError?: boolean) => `
    w-full px-4 py-2.5 rounded-xl border text-xs font-semibold transition focus:outline-none focus:ring-2 
    ${hasError 
      ? 'border-rose-500 ring-rose-500/20 bg-rose-500/5' 
      : isDarkMode 
        ? 'border-slate-700 bg-slate-800 text-white focus:ring-blue-500/30 focus:border-blue-500' 
        : 'border-slate-200 bg-slate-50 text-slate-900 focus:ring-blue-500/30 focus:border-blue-500'
    }
  `;

  const labelClass = "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5";

  return (
    <div className="space-y-6 font-sans">
      {/* SECTION 1: PERSONAL INFORMATION */}
      <div className={`rounded-3xl border p-6 sm:p-7 space-y-5 ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-blue-100 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
            <FiUser className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-base">Edit Personal Details</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          {/* First Name */}
          <div>
            <label className={labelClass}>First Name *</label>
            <div className="relative">
              <input 
                type="text"
                value={formData.firstName || ''}
                onChange={(e) => onChange('firstName', e.target.value)}
                placeholder="Enter first name"
                className={inputClass(!!errors.firstName)}
              />
            </div>
            {errors.firstName && (
              <p className="text-[11px] text-rose-500 font-bold mt-1 flex items-center gap-1">
                <FiAlertCircle className="w-3 h-3" /> {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className={labelClass}>Last Name *</label>
            <div className="relative">
              <input 
                type="text"
                value={formData.lastName || ''}
                onChange={(e) => onChange('lastName', e.target.value)}
                placeholder="Enter last name"
                className={inputClass(!!errors.lastName)}
              />
            </div>
            {errors.lastName && (
              <p className="text-[11px] text-rose-500 font-bold mt-1 flex items-center gap-1">
                <FiAlertCircle className="w-3 h-3" /> {errors.lastName}
              </p>
            )}
          </div>

          {/* Email Address (Account identifier - Read only) */}
          <div>
            <label className={labelClass}>
              Email Address <span className="text-[10px] text-slate-400 font-normal">(Account Identity)</span>
            </label>
            <div className="relative">
              <input 
                type="email"
                value={formData.email}
                disabled
                title="Account email cannot be modified from profile"
                className="w-full px-4 py-2.5 rounded-xl border text-xs font-semibold bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className={labelClass}>Phone Number *</label>
            <div className="relative">
              <input 
                type="text"
                value={formData.phoneNumber || formData.mobile || ''}
                onChange={(e) => {
                  onChange('phoneNumber', e.target.value);
                  onChange('mobile', e.target.value);
                }}
                placeholder="+91 98765 43210"
                className={inputClass(!!errors.phoneNumber)}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-[11px] text-rose-500 font-bold mt-1 flex items-center gap-1">
                <FiAlertCircle className="w-3 h-3" /> {errors.phoneNumber}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className={labelClass}>Date of Birth</label>
            <input 
              type="date"
              value={formData.dob}
              onChange={(e) => onChange('dob', e.target.value)}
              className={inputClass()}
            />
          </div>

          {/* Gender */}
          <div>
            <label className={labelClass}>Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => onChange('gender', e.target.value)}
              className={inputClass()}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer Not to Say">Prefer Not to Say</option>
            </select>
          </div>

          {/* Location / Address */}
          <div>
            <label className={labelClass}>Location / Address</label>
            <input 
              type="text"
              value={formData.location}
              onChange={(e) => onChange('location', e.target.value)}
              placeholder="City, Country"
              className={inputClass()}
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: EDUCATION & QUALIFICATIONS */}
      <div className={`rounded-3xl border p-6 sm:p-7 space-y-5 ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-blue-100 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
            <FiBookOpen className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-base">Education & Qualification</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div>
            <label className={labelClass}>Highest Education</label>
            <input 
              type="text"
              value={formData.education}
              onChange={(e) => onChange('education', e.target.value)}
              placeholder="e.g. Ph.D. in Computer Science"
              className={inputClass()}
            />
          </div>

          <div>
            <label className={labelClass}>Professional Qualification</label>
            <input 
              type="text"
              value={formData.qualification}
              onChange={(e) => onChange('qualification', e.target.value)}
              placeholder="e.g. Senior Career Advisor"
              className={inputClass()}
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: BIO & SKILLS */}
      <div className={`rounded-3xl border p-6 sm:p-7 space-y-5 ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-blue-100 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
            <FiFileText className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-base">Bio & Skills</h3>
        </div>

        {/* Bio Textarea */}
        <div>
          <label className={labelClass}>Bio / About Me</label>
          <textarea 
            rows={4}
            value={formData.bio}
            onChange={(e) => onChange('bio', e.target.value)}
            placeholder="Write a brief professional bio..."
            className={inputClass()}
          />
        </div>

        {/* Skills Tag Input */}
        <div>
          <label className={labelClass}>Skills & Core Expertise</label>
          <div className="flex items-center gap-2 mb-3">
            <input 
              type="text"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Add skill (e.g. AI Strategy) & press Enter"
              className={inputClass()}
            />
            <button
              type="button"
              onClick={handleAddSkillClick}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1 shrink-0 text-xs shadow-md"
            >
              <FiPlus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {formData.skills && formData.skills.map((skill, idx) => (
              <span 
                key={idx}
                className="bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => onRemoveSkill(idx)}
                  className="text-blue-400 hover:text-rose-500 transition cursor-pointer p-0.5"
                  title="Remove skill"
                >
                  <FiX className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
