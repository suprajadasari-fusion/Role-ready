import React from 'react';
import { RoleType } from '../lib/types';
import { SchoolDashboard } from './dashboards/SchoolDashboard';
import { CollegeDashboard } from './dashboards/CollegeDashboard';
import { MentorDashboard } from './dashboards/MentorDashboard';
import { TrainingDashboard } from './dashboards/TrainingDashboard';
import { RecruiterDashboard } from './dashboards/RecruiterDashboard';
import { CompanyDashboard } from './dashboards/CompanyDashboard';
import { UserProfileView } from './profile/UserProfileView';
import { StudentDashboard } from './dashboards/StudentDashboard';

interface RoleWorkspaceViewsProps {
  currentWorkspace: RoleType;
  activeSubView: string;
  onShowToast: (msg: string) => void;
  onNavigateView?: (view: string) => void;
  isDarkMode?: boolean;
}

export const RoleWorkspaceViews: React.FC<RoleWorkspaceViewsProps> = ({
  currentWorkspace,
  activeSubView,
  onShowToast,
  onNavigateView = () => {},
  isDarkMode = true
}) => {
  if (activeSubView === 'profile') {
    return <UserProfileView onShowToast={onShowToast} isDarkMode={isDarkMode} />;
  }

  switch (currentWorkspace) {
    case 'student':
      return <StudentDashboard onShowToast={onShowToast} onNavigateView={onNavigateView} isDarkMode={isDarkMode} />;
    case 'school':
      return <SchoolDashboard activeSubView={activeSubView} onShowToast={onShowToast} isDarkMode={isDarkMode} />;
    case 'college':
      return <CollegeDashboard activeSubView={activeSubView} onShowToast={onShowToast} isDarkMode={isDarkMode} />;
    case 'mentor':
      return <MentorDashboard activeSubView={activeSubView} onShowToast={onShowToast} isDarkMode={isDarkMode} />;
    case 'training':
      return <TrainingDashboard activeSubView={activeSubView} onShowToast={onShowToast} isDarkMode={isDarkMode} />;
    case 'recruiter':
      return <RecruiterDashboard activeSubView={activeSubView} onShowToast={onShowToast} isDarkMode={isDarkMode} />;
    case 'company':
      return <CompanyDashboard activeSubView={activeSubView} onShowToast={onShowToast} isDarkMode={isDarkMode} />;
    default:
      return <StudentDashboard onShowToast={onShowToast} onNavigateView={onNavigateView} isDarkMode={isDarkMode} />;
  }
};
