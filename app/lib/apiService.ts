import { offlineCache } from './offlineCache';

export interface JobItem {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  experience: string;
  type: 'Full-time' | 'Internship' | 'Contract';
  matchScore: number;
  tags: string[];
  description: string;
  postedDate: string;
}

export interface ScholarshipItem {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: string;
  fitScore: number;
  category: 'Merit' | 'STEM' | 'Equity' | 'Corporate';
  description: string;
}

export interface CourseItem {
  id: string;
  title: string;
  instructor: string;
  category: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  certBadge: string;
  duration: string;
  rating: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'system' | 'jobs' | 'interview' | 'scholarship' | 'learning';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export const apiService = {
  // Simulate Network Latency
  delay: (ms = 400) => new Promise(res => setTimeout(res, ms)),

  // 1. Fetch Jobs
  fetchJobs: async (): Promise<JobItem[]> => {
    await apiService.delay(350);
    const cached = offlineCache.get<JobItem[]>('jobs');
    if (cached) return cached;

    const data: JobItem[] = [
      {
        id: 'job-101',
        title: 'Junior AI & Deep Learning Engineer',
        company: 'NeuralCorp AI Labs',
        location: 'Bengaluru / Remote',
        salary: '₹14.0 - ₹24.0 LPA',
        experience: '0 - 2 Yrs',
        type: 'Full-time',
        matchScore: 96,
        tags: ['Python', 'PyTorch', 'Transformers', 'LLMs'],
        description: 'Design and deploy neural recommendation pipelines and multi-modal transformers for enterprise clients.',
        postedDate: '2 days ago'
      },
      {
        id: 'job-102',
        title: 'Fullstack React & Node.js Developer',
        company: 'Apex Cloud Solutions',
        location: 'Hyderabad, AP',
        salary: '₹12.0 - ₹18.0 LPA',
        experience: '0 - 1 Yrs',
        type: 'Full-time',
        matchScore: 92,
        tags: ['React', 'TypeScript', 'Redux', 'Tailwind'],
        description: 'Build high-performance micro-frontend applications with real-time state management and accessible UI components.',
        postedDate: '1 day ago'
      },
      {
        id: 'job-103',
        title: 'Quantitative Data Science Intern',
        company: 'Quantum Wealth Analytics',
        location: 'Mumbai, MH',
        salary: '₹45,000 / mo',
        experience: 'Internship',
        type: 'Internship',
        matchScore: 89,
        tags: ['Python', 'Pandas', 'Stochastics', 'Algorithmic Trading'],
        description: 'Collaborate with quantitative researchers to develop statistical arbitrage models and risk engines.',
        postedDate: '3 days ago'
      },
      {
        id: 'job-104',
        title: 'Cloud & DevSecOps Engineer',
        company: 'KubeSecure Enterprise',
        location: 'Pune / Remote',
        salary: '₹16.0 - ₹26.0 LPA',
        experience: '1 - 3 Yrs',
        type: 'Full-time',
        matchScore: 87,
        tags: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
        description: 'Implement zero-trust container security policies and automated CI/CD pipelines across multi-cloud clusters.',
        postedDate: 'Just now'
      }
    ];

    offlineCache.set('jobs', data);
    return data;
  },

  // 2. Fetch Scholarships
  fetchScholarships: async (): Promise<ScholarshipItem[]> => {
    await apiService.delay(300);
    const cached = offlineCache.get<ScholarshipItem[]>('scholarships');
    if (cached) return cached;

    const data: ScholarshipItem[] = [
      {
        id: 'sch-01',
        name: 'National STEM Excellence Fellowship 2026',
        provider: 'Ministry of Science & Technology',
        amount: '₹2,50,000 / year',
        deadline: 'April 30, 2026',
        eligibility: 'GPA >= 8.5, Science/Tech Stream',
        fitScore: 96,
        category: 'Merit',
        description: 'Full tuition funding and annual research grant for high-achieving STEM students across India.'
      },
      {
        id: 'sch-02',
        name: 'Women in AI & Future Tech Leaders Grant',
        provider: 'Global Tech Foundation',
        amount: '₹1,80,000 / year',
        deadline: 'May 15, 2026',
        eligibility: 'Female STEM undergraduates',
        fitScore: 92,
        category: 'STEM',
        description: 'Dedicated merit-cum-need fellowship program supporting female developers and research engineers.'
      },
      {
        id: 'sch-03',
        name: 'Central Equity & Merit Education Grant',
        provider: 'Central Board of Education Desk',
        amount: '₹1,00,000 / year',
        deadline: 'May 01, 2026',
        eligibility: 'Income < ₹6.0 LPA',
        fitScore: 90,
        category: 'Equity',
        description: 'Financial assistance for meritorious students pursuing professional engineering and degree tracks.'
      }
    ];

    offlineCache.set('scholarships', data);
    return data;
  },

  // 3. Fetch Learning Courses
  fetchCourses: async (): Promise<CourseItem[]> => {
    await apiService.delay(350);
    const cached = offlineCache.get<CourseItem[]>('courses');
    if (cached) return cached;

    const data: CourseItem[] = [
      {
        id: 'crs-1',
        title: 'Mastering Fullstack React 19 & Redux Toolkit',
        instructor: 'Dr. Anita Rao',
        category: 'Web Architecture',
        progress: 85,
        totalModules: 12,
        completedModules: 10,
        certBadge: 'React Architect Certified',
        duration: '18 Hours',
        rating: 4.9
      },
      {
        id: 'crs-2',
        title: 'Neural Networks, PyTorch & LLM Fine-Tuning',
        instructor: 'Prof. Vikram Malhotra',
        category: 'AI & Data Science',
        progress: 92,
        totalModules: 15,
        completedModules: 14,
        certBadge: 'AI Deep Learning Spec',
        duration: '24 Hours',
        rating: 4.95
      },
      {
        id: 'crs-3',
        title: 'Data Structures, Algorithms & System Design',
        instructor: 'Karan Sharma',
        category: 'Computer Science Core',
        progress: 60,
        totalModules: 20,
        completedModules: 12,
        certBadge: 'AlgoExpert Specialist',
        duration: '30 Hours',
        rating: 4.85
      }
    ];

    offlineCache.set('courses', data);
    return data;
  },

  // 4. Fetch Central Notifications
  fetchNotifications: async (): Promise<NotificationItem[]> => {
    await apiService.delay(200);
    const data: NotificationItem[] = [
      {
        id: 'notif-1',
        title: 'Interview Scheduled',
        message: 'Your AI Mock Interview for "Junior AI Engineer" is ready to launch.',
        category: 'interview',
        timestamp: '10 mins ago',
        isRead: false,
        actionUrl: '/interview-ai'
      },
      {
        id: 'notif-2',
        title: 'New Job Match (96%)',
        message: 'NeuralCorp AI Labs posted "Junior AI & Deep Learning Engineer".',
        category: 'jobs',
        timestamp: '1 hour ago',
        isRead: false,
        actionUrl: '/jobs'
      },
      {
        id: 'notif-3',
        title: 'Scholarship Application Approved',
        message: 'Your application for "National STEM Fellowship" passed Stage 1 verification.',
        category: 'scholarship',
        timestamp: '3 hours ago',
        isRead: true,
        actionUrl: '/scholarships'
      },
      {
        id: 'notif-4',
        title: 'Learning Streak Milestone!',
        message: 'Congratulations! You achieved a 14-day consecutive study streak.',
        category: 'learning',
        timestamp: 'Yesterday',
        isRead: true,
        actionUrl: '/learning-center'
      }
    ];
    return data;
  }
};
