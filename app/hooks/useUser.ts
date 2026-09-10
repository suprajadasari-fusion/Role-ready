import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { getAccessToken } from '../services/apiClient';

export function useCurrentUser() {
  const token = getAccessToken();

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => userService.getCurrentUser(),
    enabled: !!token,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
}

export function useAdminHealth() {
  const token = getAccessToken();

  return useQuery({
    queryKey: ['adminHealth'],
    queryFn: () => userService.getAdminHealth(),
    enabled: !!token
  });
}
