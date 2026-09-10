import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '../services/adminService';
import {
  CreateTenantRequest,
  InstitutionRegisterRequest,
  ApproveInstitutionRequest,
  CreateSubscriptionRequest,
  CohortAnalyticsParams,
  ItemAnalysisParams
} from '../types/admin.types';
import { getAccessToken } from '../services/apiClient';

export function useAdmin() {
  const queryClient = useQueryClient();
  const token = getAccessToken();

  const healthQuery = useQuery({
    queryKey: ['adminHealth'],
    queryFn: () => adminService.getHealth(),
    enabled: !!token
  });

  const cohortSkillQuery = useQuery({
    queryKey: ['cohortSkillAnalytics'],
    queryFn: () => adminService.getCohortSkillAnalytics(),
    enabled: !!token,
    retry: 1
  });

  const createTenantMutation = useMutation({
    mutationFn: (data: CreateTenantRequest) => adminService.createTenant(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entities'] });
    }
  });

  const registerInstitutionMutation = useMutation({
    mutationFn: (data: InstitutionRegisterRequest) => adminService.registerInstitution(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entities'] });
    }
  });

  const approveInstitutionMutation = useMutation({
    mutationFn: (data: ApproveInstitutionRequest) => adminService.approveInstitution(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entities'] });
    }
  });

  const createSubscriptionMutation = useMutation({
    mutationFn: (data: CreateSubscriptionRequest) => adminService.createSubscription(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entities'] });
    }
  });

  return {
    health: healthQuery.data,
    isHealthLoading: healthQuery.isLoading,
    refetchHealth: healthQuery.refetch,

    cohortSkills: cohortSkillQuery.data,
    isCohortSkillsLoading: cohortSkillQuery.isLoading,

    createTenant: createTenantMutation.mutateAsync,
    isCreatingTenant: createTenantMutation.isPending,

    registerInstitution: registerInstitutionMutation.mutateAsync,
    isRegisteringInstitution: registerInstitutionMutation.isPending,

    approveInstitution: approveInstitutionMutation.mutateAsync,
    isApprovingInstitution: approveInstitutionMutation.isPending,

    createSubscription: createSubscriptionMutation.mutateAsync,
    isCreatingSubscription: createSubscriptionMutation.isPending
  };
}
