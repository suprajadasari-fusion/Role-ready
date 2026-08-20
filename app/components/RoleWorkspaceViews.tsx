import React from 'react';
import { RoleType } from '../lib/types';
import { SchoolDashboard } from './Pages/SchoolDashboard';
import { CollegeDashboard } from './Pages/CollegeDashboard';
import { MentorDashboard } from './Pages/MentorDashboard';
import { TrainingDashboard } from './Pages/TrainingDashboard';
import { RecruiterDashboard } from './Pages/RecruiterDashboard';
import { CompanyDashboard } from './Pages/CompanyDashboard';
import { UserProfileView } from './profile/UserProfileView';

interface RoleWorkspaceViewsProps {
  currentWorkspace: RoleType;
  activeSubView: string;
  onShowToast: (msg: string) => void;
  isDarkMode?: boolean;
}

export const RoleWorkspaceViews: React.FC<RoleWorkspaceViewsProps> = ({
  currentWorkspace,
  activeSubView,
  onShowToast,
  isDarkMode = false
}) => {
  if (activeSubView === 'profile') {
    return <UserProfileView onShowToast={onShowToast} isDarkMode={isDarkMode} />;
  }

  switch (currentWorkspace) {
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
      return null;
  }
};
