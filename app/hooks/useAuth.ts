import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authService } from '../services/authService';
import {
  LoginRequest,
  RegisterStudentRequest,
  RegisterParentRequest,
  RegisterMentorRequest,
  RegisterRecruiterRequest,
  RegisterCompanyRequest,
  VerifyEmailRequest,
  VerifyPhoneRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest
} from '../types/auth.types';

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (req: LoginRequest) => authService.login(req),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });

      // Navigate according to the actual backend response
      const targetRoute = res.data?.route || (res.data?.user?.role ? `/${res.data.user.role.toLowerCase()}` : '/student');
      navigate(targetRoute);
    }
  });

  const registerStudentMutation = useMutation({
    mutationFn: (req: RegisterStudentRequest) => authService.registerStudent(req)
  });

  const registerParentMutation = useMutation({
    mutationFn: (req: RegisterParentRequest) => authService.registerParent(req)
  });

  const registerMentorMutation = useMutation({
    mutationFn: (req: RegisterMentorRequest) => authService.registerMentor(req)
  });

  const registerRecruiterMutation = useMutation({
    mutationFn: (req: RegisterRecruiterRequest) => authService.registerRecruiter(req)
  });

  const registerCompanyMutation = useMutation({
    mutationFn: (req: RegisterCompanyRequest) => authService.registerCompany(req)
  });

  const verifyEmailMutation = useMutation({
    mutationFn: (req: VerifyEmailRequest) => authService.verifyEmail(req)
  });

  const verifyPhoneMutation = useMutation({
    mutationFn: (req: VerifyPhoneRequest) => authService.verifyPhone(req)
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (req: ForgotPasswordRequest) => authService.forgotPassword(req)
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (req: ResetPasswordRequest) => authService.resetPassword(req)
  });

  const changePasswordMutation = useMutation({
    mutationFn: (req: ChangePasswordRequest) => authService.changePassword(req)
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
      navigate('/login');
    }
  });

  return {
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    registerStudent: registerStudentMutation.mutateAsync,
    isRegisteringStudent: registerStudentMutation.isPending,

    registerParent: registerParentMutation.mutateAsync,
    isRegisteringParent: registerParentMutation.isPending,

    registerMentor: registerMentorMutation.mutateAsync,
    isRegisteringMentor: registerMentorMutation.isPending,

    registerRecruiter: registerRecruiterMutation.mutateAsync,
    isRegisteringRecruiter: registerRecruiterMutation.isPending,

    registerCompany: registerCompanyMutation.mutateAsync,
    isRegisteringCompany: registerCompanyMutation.isPending,

    verifyEmail: verifyEmailMutation.mutateAsync,
    isVerifyingEmail: verifyEmailMutation.isPending,

    verifyPhone: verifyPhoneMutation.mutateAsync,
    isVerifyingPhone: verifyPhoneMutation.isPending,

    forgotPassword: forgotPasswordMutation.mutateAsync,
    isSubmittingForgot: forgotPasswordMutation.isPending,

    resetPassword: resetPasswordMutation.mutateAsync,
    isSubmittingReset: resetPasswordMutation.isPending,

    changePassword: changePasswordMutation.mutateAsync,
    isChangingPassword: changePasswordMutation.isPending,

    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending
  };
}
