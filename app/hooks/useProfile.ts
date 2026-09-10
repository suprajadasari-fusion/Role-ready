import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../services/profileService';
import { CompleteProfileRequest, AvatarUpdateRequest } from '../types/profile.types';
import { getAccessToken } from '../services/apiClient';

export function useProfile() {
  const queryClient = useQueryClient();
  const token = getAccessToken();

  const profileQuery = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => profileService.getProfile(),
    enabled: !!token
  });

  const completeProfileMutation = useMutation({
    mutationFn: (data: CompleteProfileRequest) => profileService.completeProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });

  const updateAvatarMutation = useMutation({
    mutationFn: (data: AvatarUpdateRequest) => profileService.updateAvatar(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });

  const uploadFileMutation = useMutation({
    mutationFn: (file: File) => profileService.uploadProfileFile(file)
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    error: profileQuery.error,
    refetchProfile: profileQuery.refetch,

    completeProfile: completeProfileMutation.mutateAsync,
    isCompletingProfile: completeProfileMutation.isPending,

    updateAvatar: updateAvatarMutation.mutateAsync,
    isUpdatingAvatar: updateAvatarMutation.isPending,

    uploadProfileFile: uploadFileMutation.mutateAsync,
    isUploadingFile: uploadFileMutation.isPending
  };
}
