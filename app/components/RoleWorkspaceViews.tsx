import React from 'react';
import { RoleType } from '~/lib/types';
import { SchoolDashboard } from './dashboards/SchoolDashboard';
import { CollegeDashboard } from './dashboards/CollegeDashboard';
import { MentorDashboard } from './dashboards/MentorDashboard';
import { TrainingDashboard } from './dashboards/TrainingDashboard';
import { RecruiterDashboard } from './dashboards/RecruiterDashboard';
import { CompanyDashboard } from './dashboards/CompanyDashboard';

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
