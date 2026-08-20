import React from 'react';
import { RoleType } from '../lib/types';
import { SchoolDashboard } from './dashboards/SchoolDashboard';
import { CollegeDashboard } from './dashboards/CollegeDashboard';
import { MentorDashboard } from './dashboards/MentorDashboard';
import { TrainingDashboard } from './dashboards/TrainingDashboard';
import { RecruiterDashboard } from './dashboards/RecruiterDashboard';
import { CompanyDashboard } from './dashboards/CompanyDashboard';
import { StudentDashboard } from './dashboards/StudentDashboard';

import { DiscoverModule } from './modules/DiscoverModule';
import { ScholarshipsModule } from './modules/ScholarshipsModule';
import { LearningCenterModule } from './modules/LearningCenterModule';
import { ResumeBuilderModule } from './modules/ResumeBuilderModule';
import { InterviewAIModule } from './modules/InterviewAIModule';
import { JobsModule } from './modules/JobsModule';
import { NotificationsModule } from './modules/NotificationsModule';
import { ProfileModule } from './modules/ProfileModule';

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
  // Direct module subview routing override (works across all roles)
  switch (activeSubView) {
    case 'discover':
      return <DiscoverModule onShowToast={onShowToast} isDarkMode={isDarkMode} />;
    case 'scholarships':
      return <ScholarshipsModule onShowToast={onShowToast} isDarkMode={isDarkMode} />;
    case 'learning-center':
    case 'learning':
      return <LearningCenterModule onShowToast={onShowToast} isDarkMode={isDarkMode} />;
    case 'resume-builder':
    case 'resume':
    case 'resume-ats':
      return <ResumeBuilderModule onShowToast={onShowToast} isDarkMode={isDarkMode} />;
    case 'interview-ai':
    case 'interviews':
      return <InterviewAIModule onShowToast={onShowToast} isDarkMode={isDarkMode} />;
    case 'jobs':
      return <JobsModule onShowToast={onShowToast} isDarkMode={isDarkMode} />;
    case 'notifications':
      return <NotificationsModule onShowToast={onShowToast} onNavigateView={onNavigateView} isDarkMode={isDarkMode} />;
    case 'profile':
      return <ProfileModule onShowToast={onShowToast} isDarkMode={isDarkMode} />;
  }

  // Workspace level default dashboards
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
