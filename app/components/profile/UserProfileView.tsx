import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserProfile, updateUserProfile, uploadProfilePhoto } from '../../lib/api';
import { UserProfile } from '../../lib/types';
import { ProfileHeader } from './ProfileHeader';
import { ProfileDetails } from './ProfileDetails';
import { ProfileForm } from './ProfileForm';
import { FiRefreshCw, FiAlertCircle } from 'react-icons/fi';

interface UserProfileViewProps {
  onShowToast: (msg: string) => void;
  isDarkMode?: boolean;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  onShowToast,
  isDarkMode = false
}) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 1. Fetch Logged-in User Profile via TanStack Query
  const { data: profile, isLoading, isError, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile
  });

  // Sync state when profile is fetched or updated
  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  // 2. Profile Update Mutation
  const updateMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(['userProfile'], updatedProfile);
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      setIsEditing(false);
      onShowToast("Profile information updated successfully!");
    },
    onError: (err: any) => {
      onShowToast(`Failed to update profile: ${err.message || 'Server error'}`);
    }
  });

  // 3. Photo Upload Mutation
  const photoMutation = useMutation({
    mutationFn: uploadProfilePhoto,
    onSuccess: (res) => {
      if (formData) {
        setFormData({ ...formData, avatarUrl: res.avatarUrl });
      }
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      onShowToast("Profile picture updated!");
    }
  });

  // Client-Side Validation Logic
  const validateForm = (): boolean => {
    if (!formData) return false;
    const newErrors: Record<string, string> = {};

    // Name Validation
    if (!formData.fullName || !formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address format.";
    }

    // Mobile Validation
    const mobileDigits = formData.mobile.replace(/\D/g, '');
    if (!formData.mobile || !formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (mobileDigits.length < 7) {
      newErrors.mobile = "Please enter a valid mobile number with at least 7 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Field change handler
  const handleFieldChange = (field: keyof UserProfile, value: any) => {
    if (!formData) return;
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  // Skill Add & Remove Handlers
  const handleAddSkill = (skill: string) => {
    if (!formData) return;
    const currentSkills = formData.skills || [];
    if (!currentSkills.includes(skill)) {
      setFormData({ ...formData, skills: [...currentSkills, skill] });
    }
  };

  const handleRemoveSkill = (index: number) => {
    if (!formData) return;
    const updatedSkills = (formData.skills || []).filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updatedSkills });
  };

  // Photo change handler
  const handlePhotoChange = (newPhotoUrl: string) => {
    if (formData) {
      setFormData({ ...formData, avatarUrl: newPhotoUrl });
      photoMutation.mutate(newPhotoUrl);
    }
  };

  // Save changes handler
  const handleSave = () => {
    if (!formData) return;
    if (validateForm()) {
      updateMutation.mutate(formData);
    } else {
      onShowToast("Please fix validation errors before saving.");
    }
  };

  // Cancel handler
  const handleCancel = () => {
    if (profile) {
      setFormData(profile);
    }
    setErrors({});
    setIsEditing(false);
  };

  // LOADING STATE SKELETON
  if (isLoading || !formData) {
    return (
      <div className="space-y-6 font-sans animate-pulse max-w-5xl mx-auto">
        <div className="h-48 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-64 rounded-3xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (isError) {
    return (
      <div className="p-8 text-center space-y-4 max-w-md mx-auto bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-3xl font-sans">
        <FiAlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h3 className="font-extrabold text-base text-rose-600 dark:text-rose-400">Failed to Load Profile</h3>
        <p className="text-xs text-rose-500">{(error as any)?.message || "Server connection error"}</p>
        <button 
          onClick={() => queryClient.invalidateQueries({ queryKey: ['userProfile'] })}
          className="bg-rose-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-rose-500 transition cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* 1. Profile Header with Avatar & Actions */}
      <ProfileHeader
        profile={formData}
        isEditing={isEditing}
        isSaving={updateMutation.isPending}
        onEditClick={() => setIsEditing(true)}
        onSaveClick={handleSave}
        onCancelClick={handleCancel}
        onPhotoChange={handlePhotoChange}
        isDarkMode={isDarkMode}
      />

      {/* 2. Main Content Body: Read-only Mode OR Editable Form Mode */}
      {!isEditing ? (
        <ProfileDetails profile={formData} isDarkMode={isDarkMode} />
      ) : (
        <ProfileForm 
          formData={formData}
          errors={errors}
          onChange={handleFieldChange}
          onAddSkill={handleAddSkill}
          onRemoveSkill={handleRemoveSkill}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};
