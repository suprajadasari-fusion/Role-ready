import React, { useState } from 'react';
import { 
  FaUserCheck, 
  FaFloppyDisk, 
  FaUpload, 
  FaPlus, 
  FaXmark, 
  FaLock, 
  FaShieldHalved, 
  FaCircleCheck, 
  FaCircleExclamation,
  FaFileLines
} from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '~/store/store';
import { updateProfile, addSkill, removeSkill, setResumeFile } from '~/store/slices/profileSlice';
import { addNotification } from '~/store/slices/notificationsSlice';
import { profileSchema } from '~/lib/validation';

interface ProfileModuleProps {
  onShowToast: (msg: string) => void;
  isDarkMode?: boolean;
}

export const ProfileModule: React.FC<ProfileModuleProps> = ({ onShowToast, isDarkMode = true }) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.profile);
  const isOnline = useAppSelector(state => state.offline.isOnline);

  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    bio: profile.bio,
    gradeOrDegree: profile.gradeOrDegree,
    institution: profile.institution,
    targetCareer: profile.targetCareer,
    skills: profile.skills
  });

  const [newSkillText, setNewSkillText] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const cardClass = isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-blue-100 text-slate-900 shadow-xs';
  const subCardClass = isDarkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-blue-50/40 border-blue-100';

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const result = profileSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(fieldErrors);
      return;
    }

    dispatch(updateProfile(formData));
    dispatch(addNotification({
      title: 'Profile Updated',
      message: 'Your personal information, skills, and target career goals have been saved.',
      category: 'system'
    }));

    onShowToast('Profile information successfully updated!');
    setFormErrors({});
  };

  const handleAddSkill = () => {
    if (!newSkillText.trim()) return;
    dispatch(addSkill(newSkillText.trim()));
    setFormData({ ...formData, skills: [...formData.skills, newSkillText.trim()] });
    setNewSkillText('');
  };

  return (
    <div role="main" aria-label="User Profile and Account Governance" className="space-y-6 font-sans w-full max-w-full overflow-hidden">
      {/* Top Banner */}
      <div className={`p-5 sm:p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${cardClass}`}>
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shadow-blue-500/20 shrink-0">
            {profile.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold flex flex-wrap items-center gap-2 truncate">
              <span className="truncate">{profile.name}</span>
              <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-2.5 py-0.5 rounded-md border border-blue-500/30 shrink-0">
                Verified Student
              </span>
            </h2>
            <p className={`text-xs sm:text-sm mt-0.5 truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {profile.institution} • {profile.gradeOrDegree}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className={`text-xs px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 ${
            isOnline ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-amber-500 animate-ping'}`} />
            <span>{isOnline ? 'Online Sync Active' : 'Offline Cache Active'}</span>
          </span>
        </div>
      </div>

      <form onSubmit={handleSaveProfile} className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-w-0">
        {/* Main Personal Info Editor */}
        <div className={`lg:col-span-2 p-5 sm:p-6 rounded-2xl border space-y-5 min-w-0 ${cardClass}`}>
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Personal & Academic Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formErrors.name && <span className="text-rose-400 text-xs mt-1 block">{formErrors.name}</span>}
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formErrors.email && <span className="text-rose-400 text-xs mt-1 block">{formErrors.email}</span>}
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formErrors.phone && <span className="text-rose-400 text-xs mt-1 block">{formErrors.phone}</span>}
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Target Career Pathway</label>
              <input
                type="text"
                value={formData.targetCareer}
                onChange={(e) => setFormData({ ...formData, targetCareer: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formErrors.targetCareer && <span className="text-rose-400 text-xs mt-1 block">{formErrors.targetCareer}</span>}
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Grade or Degree Program</label>
              <input
                type="text"
                value={formData.gradeOrDegree}
                onChange={(e) => setFormData({ ...formData, gradeOrDegree: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">School / University Institution</label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Bio / Statement of Purpose</label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Skill Matrix Tags */}
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-2">Technical Skill Matrix Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.skills.map((skill, idx) => (
                <span key={idx} className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-lg flex items-center gap-1.5">
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(removeSkill(skill));
                      setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
                    }}
                    className="hover:text-rose-400 cursor-pointer"
                  >
                    <FaXmark className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Add new skill tag (e.g. Docker, PyTorch)..."
                value={newSkillText}
                onChange={(e) => setNewSkillText(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl cursor-pointer flex items-center justify-center gap-1 shrink-0"
              >
                <FaPlus className="w-3 h-3" /> Add Skill
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <FaFloppyDisk className="w-3.5 h-3.5" /> Save Profile Changes
            </button>
          </div>
        </div>

        {/* Resume Upload & Security Settings Sidebar */}
        <div className={`p-5 sm:p-6 rounded-2xl border space-y-6 flex flex-col justify-between min-w-0 ${subCardClass}`}>
          <div className="space-y-5 min-w-0">
            <h3 className="text-base font-bold text-white border-b border-slate-700 pb-3">Resume & Security</h3>

            {/* Resume File Manager */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 min-w-0">
              <span className="text-xs font-semibold text-slate-300 block">Uploaded Corporate Resume</span>
              {profile.resumeUploaded ? (
                <div className="flex items-center justify-between text-xs bg-blue-500/10 border border-blue-500/30 p-2.5 rounded-lg text-blue-300 min-w-0">
                  <div className="flex items-center gap-2 min-w-0 truncate">
                    <FaFileLines className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="truncate">{profile.resumeFileName}</span>
                  </div>
                  <FaCircleCheck className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                </div>
              ) : (
                <span className="text-xs text-slate-400 block">No resume uploaded yet.</span>
              )}

              <button
                type="button"
                onClick={() => {
                  dispatch(setResumeFile({ uploaded: true, fileName: 'Alex_Rivera_Resume_Updated_2026.pdf' }));
                  onShowToast('Uploaded new resume file!');
                }}
                className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <FaUpload className="w-3 h-3 text-blue-400" /> Upload PDF Resume
              </button>
            </div>

            {/* Security Overview */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 min-w-0">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <FaShieldHalved className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Security & 2FA Status
              </span>
              <p className="text-xs text-slate-400 break-words">Two-Factor Authentication is enabled via Authenticator App.</p>
              <button
                type="button"
                onClick={() => onShowToast('Password change modal opened')}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 pt-1"
              >
                <FaLock className="w-3 h-3" /> Change Password
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
