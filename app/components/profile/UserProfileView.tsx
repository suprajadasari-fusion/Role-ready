import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserProfile, updateUserProfile, uploadProfilePhoto, normalizeUserProfile, getCachedUser } from '../../lib/api';
import { UserProfile } from '../../lib/types';
import { ProfileHeader } from './ProfileHeader';
import { ProfileDetails } from './ProfileDetails';
import { ProfileForm } from './ProfileForm';
import { FiAlertCircle } from 'react-icons/fi';

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

  // Synchronous initial fallback from cached user session so UI is never stuck on empty skeletons
  const cached = typeof window !== 'undefined' ? getCachedUser() : null;
  const initialProfile: UserProfile | null = cached ? normalizeUserProfile(cached) : null;

  const [formData, setFormData] = useState<UserProfile | null>(initialProfile);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 1. Fetch Logged-in User Profile via TanStack Query
  const { data: profile, isLoading, isError, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    initialData: initialProfile || undefined,
    staleTime: 1000 * 60 * 2, // 2 minutes
    retry: 1
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
    onError: () => {
      onShowToast("Unable to update profile. Please try again.");
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

  // Client-Side Validation Logic matching backend schema
  const validateForm = (): boolean => {
    if (!formData) return false;
    const newErrors: Record<string, string> = {};

    // First Name Validation
    if (!formData.firstName || !formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    // Last Name Validation
    if (!formData.lastName || !formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    // Phone / Mobile Validation
    const phoneVal = (formData.phoneNumber || formData.mobile || '').replace(/\D/g, '');
    if (!phoneVal) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (phoneVal.length < 7) {
      newErrors.phoneNumber = "Please enter a valid phone number with at least 7 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Field change handler
  const handleFieldChange = (field: keyof UserProfile, value: any) => {
    if (!formData) return;
    const updated = { ...formData, [field]: value };
    if (field === 'firstName' || field === 'lastName') {
      const f = field === 'firstName' ? value : formData.firstName || '';
      const l = field === 'lastName' ? value : formData.lastName || '';
      updated.fullName = `${f} ${l}`.trim();
    }
    if (field === 'phoneNumber') {
      updated.mobile = value;
    }
    setFormData(updated);
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
      const newSkills = [...currentSkills, skill];
      setFormData({
        ...formData,
        skills: newSkills,
        roleData: { ...(formData.roleData || {}), skills: newSkills }
      });
    }
  };

  const handleRemoveSkill = (index: number) => {
    if (!formData) return;
    const updatedSkills = (formData.skills || []).filter((_, i) => i !== index);
    setFormData({
      ...formData,
      skills: updatedSkills,
      roleData: { ...(formData.roleData || {}), skills: updatedSkills }
    });
  };

  // Photo change handler
  const handlePhotoChange = (newPhotoUrl: string) => {
    if (formData) {
      setFormData({ ...formData, avatarUrl: newPhotoUrl });
      photoMutation.mutate(newPhotoUrl);
    }
  };

  // Save changes handler matching PUT /api/v1/profile/complete
  const handleSave = () => {
    if (!formData) return;
    if (validateForm()) {
      const payload = {
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        phoneNumber: formData.phoneNumber || formData.mobile || '',
        bio: formData.bio || '',
        onboardingCompleted: true,
        roleData: {
          ...(formData.roleData || {}),
          dob: formData.dob || '',
          gender: formData.gender || '',
          location: formData.location || '',
          education: { qualification: formData.education || '' },
          qualification: formData.qualification || '',
          skills: formData.skills || []
        }
      };
      updateMutation.mutate(payload as any);
    } else {
      onShowToast("Please fix validation errors before saving.");
    }
  };

  // Cancel handler
  const handleCancel = () => {
    if (profile) {
      setFormData(profile);
    } else if (initialProfile) {
      setFormData(initialProfile);
    }
    setErrors({});
    setIsEditing(false);
  };

  // ERROR STATE: Only if we truly have no profile data to display
  if (isError && !formData && !initialProfile) {
    return (
      <div className="p-8 text-center space-y-4 max-w-md mx-auto bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-3xl font-sans">
        <FiAlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h3 className="font-extrabold text-base text-rose-600 dark:text-rose-400">Failed to Load Profile</h3>
        <p className="text-xs text-rose-500">{(error as any)?.message || "Server connection error"}</p>
        <button 
          type="button"
          onClick={() => queryClient.invalidateQueries({ queryKey: ['userProfile'] })}
          className="bg-rose-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-rose-500 transition cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  // LOADING SKELETON: Only when actively loading and we don't even have cached profile data
  if (isLoading && !formData && !initialProfile) {
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

  // Active profile model guaranteed non-null
  const activeProfile: UserProfile = formData || profile || initialProfile || normalizeUserProfile(null);

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* 1. Profile Header with Avatar & Actions */}
      <ProfileHeader
        profile={activeProfile}
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
        <ProfileDetails profile={activeProfile} isDarkMode={isDarkMode} />
      ) : (
        <ProfileForm 
          formData={activeProfile}
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
