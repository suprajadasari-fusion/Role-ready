<<<<<<< HEAD:app/components/dashboards/TrainingDashboard.tsx
import React, { useState, useMemo } from 'react';
=======
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
>>>>>>> origin/omsai:app/components/Pages/TrainingDashboard.tsx
import { 
<<<<<<< HEAD
  FaChalkboardUser, 
  FaBookOpen, 
  FaAward, 
  FaHandshake, 
  FaBriefcase, 
  FaArrowTrendUp,
  FaBuilding,
  FaMagnifyingGlass,
  FaPlus,
  FaFilter,
  FaLocationDot,
  FaUsers,
  FaMoneyBillWave,
  FaCircleCheck
} from 'react-icons/fa6';
=======
  FiGrid, 
  FiBookOpen, 
  FiAward, 
  FiBriefcase, 
  FiTrendingUp,
  FiPlus,
  FiClock
} from 'react-icons/fi';
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
import { ActionModal } from '../ActionModal';
import { StudentToolsViews } from '../StudentToolsViews';
import { trainingService, TrainingCourse } from '../../services/trainingService';

export interface HiringPartner {
  id: string;
  name: string;
  category: string;
  track: string;
  hired: string;
  avgPkg: string;
  mouDate: string;
  status: 'MoU Signed' | 'Active MoU' | 'Enterprise Tier';
  location: string;
}

const INITIAL_HIRING_PARTNERS: HiringPartner[] = [
  // 1. IT Services & Global Consulting (12)
  { id: 'hp-1', name: "Infosys", category: "IT Services", track: "Full Stack & Cloud AI", hired: "420 Placed", avgPkg: "₹9.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Bengaluru / Pan-India" },
  { id: 'hp-2', name: "Tata Consultancy Services (TCS)", category: "IT Services", track: "Digital Innovator Track", hired: "580 Placed", avgPkg: "₹7.5 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Mumbai / Pan-India" },
  { id: 'hp-3', name: "Accenture", category: "IT Services", track: "Cloud Infrastructure & Data", hired: "390 Placed", avgPkg: "₹8.8 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Bengaluru / Hyderabad" },
  { id: 'hp-4', name: "Cognizant", category: "IT Services", track: "GenAI & Full Stack", hired: "310 Placed", avgPkg: "₹8.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Chennai / Pune" },
  { id: 'hp-5', name: "Capgemini", category: "IT Services", track: "Cloud & Cybersecurity", hired: "280 Placed", avgPkg: "₹7.8 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Mumbai / Bengaluru" },
  { id: 'hp-6', name: "Wipro Technologies", category: "IT Services", track: "Enterprise Java & DevOps", hired: "260 Placed", avgPkg: "₹7.2 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Bengaluru / Hyderabad" },
  { id: 'hp-7', name: "HCLTech", category: "IT Services", track: "Hybrid Cloud & AI Eng", hired: "240 Placed", avgPkg: "₹7.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Noida / Chennai" },
  { id: 'hp-8', name: "Tech Mahindra", category: "IT Services", track: "5G & Telecom AI", hired: "190 Placed", avgPkg: "₹7.0 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Pune / Hyderabad" },
  { id: 'hp-9', name: "LTIMindtree", category: "IT Services", track: "Enterprise Cloud Platforms", hired: "180 Placed", avgPkg: "₹8.2 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Mumbai / Bengaluru" },
  { id: 'hp-10', name: "Hexaware Technologies", category: "IT Services", track: "Automation & Modern Web", hired: "140 Placed", avgPkg: "₹7.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Navi Mumbai / Chennai" },
  { id: 'hp-11', name: "Persistent Systems", category: "IT Services", track: "Software Product Eng", hired: "160 Placed", avgPkg: "₹9.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Pune / Goa" },
  { id: 'hp-12', name: "Mphasis", category: "IT Services", track: "Next-Gen Banking Tech", hired: "130 Placed", avgPkg: "₹7.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Bengaluru / Pune" },

  // 2. Big Tech & Product Giants (10)
  { id: 'hp-13', name: "Microsoft", category: "Big Tech", track: "Cloud & Applied AI Lab", hired: "95 Placed", avgPkg: "₹32.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Hyderabad / Bengaluru" },
  { id: 'hp-14', name: "Amazon Web Services (AWS)", category: "Big Tech", track: "Cloud Architecture & DevOps", hired: "110 Placed", avgPkg: "₹28.5 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru / Hyderabad" },
  { id: 'hp-15', name: "Google Cloud", category: "Big Tech", track: "Data Science & MLOps", hired: "85 Placed", avgPkg: "₹34.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru / Gurugram" },
  { id: 'hp-16', name: "Oracle Corporation", category: "Big Tech", track: "Database Systems & OCI", hired: "90 Placed", avgPkg: "₹19.0 LPA", mouDate: "2023 - 2026", status: "Enterprise Tier", location: "Bengaluru / Hyderabad" },
  { id: 'hp-17', name: "Cisco Systems", category: "Big Tech", track: "Networking & Cyber Defense", hired: "75 Placed", avgPkg: "₹22.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },
  { id: 'hp-18', name: "IBM India", category: "Big Tech", track: "Quantum & Hybrid Cloud", hired: "120 Placed", avgPkg: "₹14.5 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Bengaluru / Kochi" },
  { id: 'hp-19', name: "SAP Labs India", category: "Big Tech", track: "Enterprise Cloud ERP", hired: "80 Placed", avgPkg: "₹18.5 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru / Pune" },
  { id: 'hp-20', name: "Adobe Systems", category: "Big Tech", track: "Creative Cloud & Media AI", hired: "60 Placed", avgPkg: "₹29.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Noida / Bengaluru" },
  { id: 'hp-21', name: "Salesforce", category: "Big Tech", track: "Enterprise CRM & Agentforce", hired: "70 Placed", avgPkg: "₹24.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Hyderabad / Bengaluru" },
  { id: 'hp-22', name: "Intel Corporation", category: "Big Tech", track: "Embedded Systems & Edge AI", hired: "55 Placed", avgPkg: "₹21.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },

  // 3. FinTech, Banking & Capital Markets (10)
  { id: 'hp-23', name: "Goldman Sachs", category: "FinTech & Banking", track: "Quantitative Finance & Tech", hired: "65 Placed", avgPkg: "₹26.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru / Hyderabad" },
  { id: 'hp-24', name: "Morgan Stanley", category: "FinTech & Banking", track: "Capital Markets Systems", hired: "50 Placed", avgPkg: "₹25.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Mumbai / Bengaluru" },
  { id: 'hp-25', name: "JPMorgan Chase", category: "FinTech & Banking", track: "Core Banking & Cloud", hired: "110 Placed", avgPkg: "₹20.5 LPA", mouDate: "2023 - 2026", status: "Enterprise Tier", location: "Mumbai / Bengaluru" },
  { id: 'hp-26', name: "Barclays Global", category: "FinTech & Banking", track: "FinTech Security & Payments", hired: "85 Placed", avgPkg: "₹16.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Pune / Chennai" },
  { id: 'hp-27', name: "BNY Mellon", category: "FinTech & Banking", track: "Asset Servicing Cloud Tech", hired: "60 Placed", avgPkg: "₹17.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Pune / Chennai" },
  { id: 'hp-28', name: "Deutsche Bank", category: "FinTech & Banking", track: "Algorithmic Trading Tech", hired: "70 Placed", avgPkg: "₹19.5 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Pune / Bengaluru" },
  { id: 'hp-29', name: "HSBC Technology", category: "FinTech & Banking", track: "Global Digital Banking Apps", hired: "95 Placed", avgPkg: "₹15.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Pune / Hyderabad" },
  { id: 'hp-30', name: "Paytm (One97)", category: "FinTech & Banking", track: "Payments Gateway & Microservices", hired: "75 Placed", avgPkg: "₹14.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Noida / Bengaluru" },
  { id: 'hp-31', name: "PhonePe", category: "FinTech & Banking", track: "High-Throughput UPI Systems", hired: "80 Placed", avgPkg: "₹22.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru / Pune" },
  { id: 'hp-32', name: "Razorpay", category: "FinTech & Banking", track: "Payment APIs & Fraud ML", hired: "65 Placed", avgPkg: "₹21.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },

  // 4. AI, Data Science & Analytics (8)
  { id: 'hp-33', name: "Fractal Analytics", category: "AI & Data Science", track: "Generative AI & BI Copilots", hired: "85 Placed", avgPkg: "₹16.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Mumbai / Bengaluru" },
  { id: 'hp-34', name: "Mu Sigma", category: "AI & Data Science", track: "Big Data & Decision Sciences", hired: "90 Placed", avgPkg: "₹12.0 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Bengaluru" },
  { id: 'hp-35', name: "LatentView Analytics", category: "AI & Data Science", track: "Predictive Analytics & Modeling", hired: "60 Placed", avgPkg: "₹13.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Chennai / Bengaluru" },
  { id: 'hp-36', name: "Tiger Analytics", category: "AI & Data Science", track: "Advanced ML & Data Engineering", hired: "70 Placed", avgPkg: "₹15.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Chennai / Bengaluru" },
  { id: 'hp-37', name: "Quantiphi", category: "AI & Data Science", track: "Computer Vision & Applied AI", hired: "75 Placed", avgPkg: "₹14.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Mumbai / Bengaluru" },
  { id: 'hp-38', name: "Dataiku India", category: "AI & Data Science", track: "Enterprise MLOps & Pipelines", hired: "45 Placed", avgPkg: "₹18.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Bengaluru" },
  { id: 'hp-39', name: "Innovaccer", category: "AI & Data Science", track: "Healthcare Intelligence Cloud", hired: "55 Placed", avgPkg: "₹17.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Noida / Bengaluru" },
  { id: 'hp-40', name: "Tredence Analytics", category: "AI & Data Science", track: "Last-Mile Retail AI & Analytics", hired: "65 Placed", avgPkg: "₹14.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Bengaluru / Gurugram" },

  // 5. Cloud, DevOps & Cybersecurity (8)
  { id: 'hp-41', name: "Palo Alto Networks", category: "Cloud & Cyber", track: "Threat Intelligence & SOC Ops", hired: "40 Placed", avgPkg: "₹24.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },
  { id: 'hp-42', name: "Fortinet India", category: "Cloud & Cyber", track: "Network Security & Firewalls", hired: "50 Placed", avgPkg: "₹16.0 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Bengaluru / Pune" },
  { id: 'hp-43', name: "Zscaler", category: "Cloud & Cyber", track: "Zero Trust Cloud Architecture", hired: "45 Placed", avgPkg: "₹22.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Chandigarh / Bengaluru" },
  { id: 'hp-44', name: "Cloudflare", category: "Cloud & Cyber", track: "Edge Systems & CDN Security", hired: "35 Placed", avgPkg: "₹26.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },
  { id: 'hp-45', name: "Red Hat (IBM)", category: "Cloud & Cyber", track: "OpenShift & Linux Kernel Dev", hired: "60 Placed", avgPkg: "₹18.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Pune / Bengaluru" },
  { id: 'hp-46', name: "VMware (Broadcom)", category: "Cloud & Cyber", track: "Virtualization & Multi-Cloud", hired: "55 Placed", avgPkg: "₹20.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru / Pune" },
  { id: 'hp-47', name: "CrowdStrike", category: "Cloud & Cyber", track: "Falcon SecOps & Incident Response", hired: "30 Placed", avgPkg: "₹25.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Pune / Bengaluru" },
  { id: 'hp-48', name: "Trend Micro", category: "Cloud & Cyber", track: "Hybrid Cloud Threat Defense", hired: "40 Placed", avgPkg: "₹15.5 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Bengaluru / Mumbai" },

  // 6. E-Commerce, Logistics & Consumer Tech (8)
  { id: 'hp-49', name: "Flipkart", category: "E-Commerce & Retail", track: "High-Scale Microservices & Logistics", hired: "90 Placed", avgPkg: "₹22.5 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },
  { id: 'hp-50', name: "Swiggy", category: "E-Commerce & Retail", track: "Hyperlocal Dispatch Algorithms", hired: "70 Placed", avgPkg: "₹21.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },
  { id: 'hp-51', name: "Zomato", category: "E-Commerce & Retail", track: "Live Order Pipeline & Mobile Apps", hired: "65 Placed", avgPkg: "₹20.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Gurugram" },
  { id: 'hp-52', name: "Meesho", category: "E-Commerce & Retail", track: "Social Commerce & Scalable Tech", hired: "60 Placed", avgPkg: "₹19.5 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },
  { id: 'hp-53', name: "Nykaa", category: "E-Commerce & Retail", track: "Omnichannel Tech & E-Commerce", hired: "50 Placed", avgPkg: "₹15.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Mumbai / Gurugram" },
  { id: 'hp-54', name: "MakeMyTrip", category: "E-Commerce & Retail", track: "Travel Booking Engines & Cloud", hired: "55 Placed", avgPkg: "₹16.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Gurugram / Bengaluru" },
  { id: 'hp-55', name: "Delhivery", category: "E-Commerce & Retail", track: "Automated Logistics & Routing Tech", hired: "60 Placed", avgPkg: "₹15.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Gurugram / Hyderabad" },
  { id: 'hp-56', name: "Blinkit", category: "E-Commerce & Retail", track: "Dark Store Inventory Ops & AI", hired: "45 Placed", avgPkg: "₹18.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Gurugram" },

  // 7. Automotive, Telecom & Embedded Systems (8)
  { id: 'hp-57', name: "Bosch Global Software", category: "Automotive & IoT", track: "Embedded IoT & Smart Mobility", hired: "105 Placed", avgPkg: "₹12.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Bengaluru / Coimbatore" },
  { id: 'hp-58', name: "KPIT Technologies", category: "Automotive & IoT", track: "Autonomous Driving & EV Tech", hired: "85 Placed", avgPkg: "₹11.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Pune / Bengaluru" },
  { id: 'hp-59', name: "Tata Elxsi", category: "Automotive & IoT", track: "Connected Vehicles & UI/UX Design", hired: "90 Placed", avgPkg: "₹10.5 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Bengaluru / Kerala" },
  { id: 'hp-60', name: "Qualcomm India", category: "Automotive & IoT", track: "Wireless SoC & 5G Edge Computing", hired: "60 Placed", avgPkg: "₹26.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Hyderabad / Bengaluru" },
  { id: 'hp-61', name: "Samsung R&D Institute", category: "Automotive & IoT", track: "Smart Devices, Camera AI & 5G", hired: "80 Placed", avgPkg: "₹20.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru / Noida" },
  { id: 'hp-62', name: "Texas Instruments", category: "Automotive & IoT", track: "Embedded VLSI & Firmware Dev", hired: "45 Placed", avgPkg: "₹24.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },
  { id: 'hp-63', name: "Continental Automotive", category: "Automotive & IoT", track: "ADAS & Automotive Cyber Defense", hired: "50 Placed", avgPkg: "₹13.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Bengaluru" },
  { id: 'hp-64', name: "Jio Platforms", category: "Automotive & IoT", track: "Cloud Native 5G & Telecom Platforms", hired: "130 Placed", avgPkg: "₹14.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Mumbai / Hyderabad" }
];

interface TrainingDashboardProps {
  activeSubView: string;
  onShowToast: (msg: string) => void;
  isDarkMode: boolean;
}

export const TrainingDashboard: React.FC<TrainingDashboardProps> = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
<<<<<<< HEAD:app/components/dashboards/TrainingDashboard.tsx
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hiringPartners, setHiringPartners] = useState<HiringPartner[]>(INITIAL_HIRING_PARTNERS);

  const [coursesList, setCoursesList] = useState([
    { title: "Full Stack AI Engineering", duration: "16 Weeks", enrolled: "840 Trainees", status: "Active Cohort" },
    { title: "Cloud Architecture (AWS/GCP)", duration: "12 Weeks", enrolled: "620 Trainees", status: "Active Cohort" },
    { title: "Cybersecurity & SOC Operations", duration: "14 Weeks", enrolled: "450 Trainees", status: "Enrolling Now" }
  ]);
=======

  // Live query for training courses and certifications
  const { data: trainingData, isLoading } = useQuery({
    queryKey: ['trainingData'],
    queryFn: () => trainingService.getTrainingData()
  });

  const coursesList = trainingData?.courses || [];
  const certifications = trainingData?.certifications || [];

  const addBootcampMutation = useMutation({
    mutationFn: (course: TrainingCourse) => trainingService.addBootcampTrack(course),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainingData'] });
      onShowToast("Published new bootcamp track successfully!");
    },
    onError: (err: any) => {
      onShowToast("Unable to publish bootcamp. Please try again.");
    }
  });
>>>>>>> origin/omsai:app/components/Pages/TrainingDashboard.tsx

  if (['discovery', 'assessment', 'psychometric', 'dna', 'ai-recommendations', 'scholarships', 'colleges', 'roadmap', 'resume-ats', 'learning'].includes(activeSubView)) {
    return <StudentToolsViews activeSubView={activeSubView} onShowToast={onShowToast} isDarkMode={isDarkMode} />;
  }

  const handleAddBootcamp = (data: Record<string, string>) => {
    const newCourse: TrainingCourse = {
      title: data.title || "Specialized Tech Bootcamp",
      duration: data.duration || "12 Weeks",
      enrolled: "1 Cohort Enrolled",
      status: "Active Cohort"
    };
    addBootcampMutation.mutate(newCourse);
    setIsModalOpen(false);
  };

  const handleAddHiringPartner = (data: Record<string, string>) => {
    const newPartner: HiringPartner = {
      id: `hp-${Date.now()}`,
      name: data.name || "New Corporate Partner",
      category: data.category || "IT Services",
      track: data.track || "Full Stack & Cloud Track",
      hired: data.quota ? `${data.quota} Placed` : "10 Placed",
      avgPkg: data.avgPkg || "₹10.0 LPA",
      mouDate: "2026 - 2029",
      status: (data.tier as any) || "MoU Signed",
      location: data.location || "Pan-India"
    };
    setHiringPartners([newPartner, ...hiringPartners]);
    onShowToast(`Successfully onboarded hiring enterprise: ${newPartner.name}!`);
  };

  const categories = ['All', 'IT Services', 'Big Tech', 'FinTech & Banking', 'AI & Data Science', 'Cloud & Cyber', 'E-Commerce & Retail', 'Automotive & IoT'];

  const filteredPartners = useMemo(() => {
    return hiringPartners.filter(partner => {
      const matchesSearch = 
        partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.track.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || partner.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [hiringPartners, searchQuery, selectedCategory]);

  const cardClass = isDarkMode
    ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
    : 'bg-white border-blue-100 text-slate-900 shadow-sm';

  const subCardClass = isDarkMode
    ? 'bg-slate-800/80 border-slate-700/80 text-white hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10'
    : 'bg-white border-slate-200 text-slate-900 hover:border-blue-500 hover:shadow-md';

  const textMuted = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const textHeading = isDarkMode ? 'text-white' : 'text-slate-900';
  const borderDivider = isDarkMode ? 'border-slate-800' : 'border-slate-100';

  if (activeSubView === 'courses') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
<<<<<<< HEAD
            <h2 className={`text-xl font-semibold flex items-center gap-2 ${textHeading}`}>
              <FaBookOpen className="w-5 h-5 text-blue-500" /> Skill Courses & Curriculum Track Page
=======
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
<<<<<<< HEAD:app/components/dashboards/TrainingDashboard.tsx
              <FiBookOpen className="w-5 h-5 text-blue-500" /> Skill Courses & Curriculum Track Page
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
=======
              <FiBookOpen className="w-5 h-5 text-blue-500" /> Skill Courses & Curriculum Track
>>>>>>> origin/omsai:app/components/Pages/TrainingDashboard.tsx
            </h2>
            <p className={`text-sm font-normal ${textMuted}`}>Industry bootcamps and certification learning modules</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            <FaPlus className="w-3.5 h-3.5" /> Add New Bootcamp
          </button>
        </div>
<<<<<<< HEAD:app/components/dashboards/TrainingDashboard.tsx
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coursesList.map((c, i) => (
            <div key={i} className={`p-5 rounded-xl border space-y-2 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast(`Opened course details for ${c.title}`)}>
              <div className={`font-semibold text-base ${textHeading}`}>{c.title}</div>
              <div className="text-blue-500 font-medium text-sm">{c.duration} • {c.enrolled}</div>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-medium inline-block">{c.status}</span>
            </div>
          ))}
        </div>
=======

        {coursesList.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            <FiBookOpen className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
            No skill bootcamps published yet. Click '+ Add New Bootcamp' to launch a track.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coursesList.map((c, i) => (
              <div key={i} className={`p-4 rounded-xl border space-y-2 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast(`Opened course details for ${c.title}`)}>
                <div className={`font-bold text-sm ${textHeading}`}>{c.title}</div>
                <div className="text-blue-400 font-semibold">{c.duration} • {c.enrolled}</div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold inline-block">{c.status}</span>
              </div>
            ))}
          </div>
        )}
>>>>>>> origin/omsai:app/components/Pages/TrainingDashboard.tsx

        <ActionModal
          isOpen={isModalOpen}
          title="Add New Skill Bootcamp"
          subtitle="Publish an accredited skill certification curriculum track"
          fields={[
            { label: "Bootcamp Course Title", name: "title", type: "text", placeholder: "e.g. Data Engineering & Analytics" },
            { label: "Duration", name: "duration", type: "text", placeholder: "e.g. 10 Weeks" }
          ]}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddBootcamp}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  if (activeSubView === 'certs') {
    return (
<<<<<<< HEAD
      <div className={`rounded-2xl border p-6 space-y-6 font-sans transition-colors duration-200 ${cardClass}`}>
        <h2 className={`text-xl font-semibold flex items-center gap-2 ${textHeading}`}>
          <FaAward className="w-5 h-5 text-blue-500" /> Certifications Registry Page
=======
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
<<<<<<< HEAD:app/components/dashboards/TrainingDashboard.tsx
          <FiAward className="w-5 h-5 text-blue-500" /> Certifications Registry Page
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
        </h2>
        <p className={`text-sm font-normal ${textMuted}`}>Industry-accredited digital credentials issued to trainees</p>
        <div className="space-y-3">
          {[
            { name: "Aarav Sharma", cert: "Certified Full Stack AI Specialist", date: "2026-02-28", id: "CERT-AI-9941" },
            { name: "Riya Sen", cert: "Cloud Infrastructure Specialist", date: "2026-02-25", id: "CERT-CL-8820" }
          ].map((ct, i) => (
            <div key={i} className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast(`Verifying certificate ${ct.id}`)}>
              <div>
                <h4 className={`font-semibold text-base ${textHeading}`}>{ct.name}</h4>
                <span className="text-blue-500 font-medium text-xs">{ct.cert}</span>
              </div>
              <div className="text-right">
                <span className="text-emerald-500 font-mono font-medium text-xs">{ct.id}</span>
                <div className={`text-xs font-normal ${textMuted}`}>{ct.date}</div>
              </div>
            </div>
          ))}
        </div>
=======
          <FiAward className="w-5 h-5 text-blue-500" /> Certifications Registry
        </h2>
        <p className={textMuted}>Industry-accredited digital credentials issued to trainees</p>
        {certifications.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            <FiAward className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
            No digital credentials issued yet. Certifications sync automatically upon module completion.
          </div>
        ) : (
          <div className="space-y-3">
            {certifications.map((ct, i) => (
              <div key={i} className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast(`Verifying certificate ${ct.name}`)}>
                <div>
                  <h4 className={`font-bold ${textHeading}`}>{ct.name}</h4>
                  <span className="text-blue-400 font-semibold">{ct.body}</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-mono font-bold">{ct.validity}</span>
                  <div className={`text-[10px] ${textMuted}`}>{ct.activeCandidates}</div>
                </div>
              </div>
            ))}
          </div>
        )}
>>>>>>> origin/omsai:app/components/Pages/TrainingDashboard.tsx
      </div>
    );
  }

  if (activeSubView === 'hiring') {
    return (
<<<<<<< HEAD
      <div className={`rounded-2xl border p-6 space-y-6 font-sans transition-colors duration-200 ${cardClass}`}>
        {/* Header and Top Action Bar */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-xl font-semibold flex items-center gap-2 ${textHeading}`}>
              <FaHandshake className="w-5 h-5 text-blue-500" /> Hiring Partner Enterprises Page
              <span className="text-xs bg-blue-500/10 text-blue-500 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-medium ml-2">
                {hiringPartners.length} Companies
              </span>
            </h2>
            <p className={`text-sm font-normal ${textMuted}`}>
              {hiringPartners.length} Corporate partners actively recruiting directly from institute bootcamps across 7 industry tracks
            </p>
          </div>
          <button 
            onClick={() => setIsPartnerModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 self-start md:self-auto"
          >
            <FaPlus className="w-3.5 h-3.5" />
            <span>Register Corporate Partner</span>
          </button>
=======
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
          <FiBriefcase className="w-5 h-5 text-blue-500" /> Hiring Partner Enterprises
        </h2>
        <p className={textMuted}>Corporate partners recruiting directly from institute bootcamps</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["Infosys", "TCS", "Accenture", "Cognizant", "Capgemini", "Wipro", "HCL Tech", "Tech Mahindra"].map((hp, i) => (
            <div key={i} className={`p-4 rounded-xl border font-bold flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast(`Opened MoU details for ${hp}`)}>
              <span className={textHeading}>{hp}</span>
              <span className="text-emerald-400 text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">MoU Active</span>
            </div>
          ))}
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
        </div>

        {/* Overview Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`text-[13px] font-medium block ${textMuted}`}>Total Active Partners</span>
            <div className="text-2xl lg:text-3xl font-bold text-blue-500 mt-1 flex items-center gap-1.5">
              <FaBuilding className="w-4 h-4" /> {hiringPartners.length} Enterprises
            </div>
            <span className={`text-xs font-normal ${textMuted}`}>100% Signed MoUs</span>
          </div>

          <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`text-[13px] font-medium block ${textMuted}`}>Trainees Placed</span>
            <div className="text-2xl lg:text-3xl font-bold text-emerald-500 mt-1 flex items-center gap-1.5">
              <FaUsers className="w-4 h-4" /> 5,420+
            </div>
            <span className={`text-xs font-normal ${textMuted}`}>Across All Cohorts</span>
          </div>

          <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`text-[13px] font-medium block ${textMuted}`}>Average Offer CTC</span>
            <div className="text-2xl lg:text-3xl font-bold text-purple-500 mt-1 flex items-center gap-1.5">
              <FaMoneyBillWave className="w-4 h-4" /> ₹16.4 LPA
            </div>
            <span className={`text-xs font-normal ${textMuted}`}>Highest ₹34.0 LPA</span>
          </div>

          <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`text-[13px] font-medium block ${textMuted}`}>Industry Verticals</span>
            <div className="text-2xl lg:text-3xl font-bold text-amber-500 mt-1 flex items-center gap-1.5">
              <FaFilter className="w-4 h-4" /> 7 Sectors
            </div>
            <span className={`text-xs font-normal ${textMuted}`}>AI, Cloud, FinTech, & More</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1">
              <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by company name, track, sector, or location..."
                className={`w-full pl-10 pr-4 py-2.5 text-sm font-normal rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800/90 border-slate-700 text-white placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <div className={`text-xs font-medium self-center ${textMuted}`}>
              Showing {filteredPartners.length} of {hiringPartners.length} partners
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const count = cat === 'All' 
                ? hiringPartners.length 
                : hiringPartners.filter(p => p.category === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-medium text-xs whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : isDarkMode
                        ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-xs px-1.5 py-0.2 rounded-full font-medium ${
                    isSelected 
                      ? 'bg-white/20 text-white' 
                      : isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 64 Corporate Partners Grid */}
        {filteredPartners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredPartners.map((hp) => (
              <div 
                key={hp.id} 
                className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 ${subCardClass}`} 
                onClick={() => onShowToast(`Opened MoU & candidate quota specs for ${hp.name} (${hp.track})`)}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-semibold text-xs">
                        <FaBuilding className="w-3.5 h-3.5" />
                      </div>
                      <h4 className={`font-semibold text-base leading-snug ${textHeading}`}>{hp.name}</h4>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium shrink-0 ${
                      hp.status === 'Enterprise Tier'
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {hp.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-500 font-medium">{hp.track}</span>
                    </div>
                    <div className={`text-xs flex items-center gap-1 ${textMuted}`}>
                      <FaLocationDot className="w-2.5 h-2.5 text-slate-400" />
                      <span>{hp.location}</span>
                    </div>
                  </div>
                </div>

                <div className={`mt-3 pt-2.5 border-t flex items-center justify-between text-xs ${borderDivider}`}>
                  <div>
                    <span className={`text-xs block ${textMuted}`}>Trainees</span>
                    <span className="font-semibold text-emerald-500">{hp.hired}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs block ${textMuted}`}>Avg Package</span>
                    <span className="font-semibold text-purple-500">{hp.avgPkg}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`p-12 text-center rounded-2xl border ${isDarkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <FaBuilding className="w-10 h-10 mx-auto text-slate-500 mb-3" />
            <h3 className={`font-semibold text-base ${textHeading}`}>No hiring partners match your criteria</h3>
            <p className={`text-sm mt-1 ${textMuted}`}>Try searching for a different company name or clearing the category filter.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* Action Modal for Registering a New Partner */}
        <ActionModal
          isOpen={isPartnerModalOpen}
          title="Register Corporate Hiring Partner"
          subtitle="Sign a recruitment agreement MoU with an enterprise hiring partner"
          fields={[
            { label: "Company / Enterprise Name", name: "name", type: "text", placeholder: "e.g. NVIDIA Corporation India" },
            { label: "Industry Category", name: "category", type: "text", placeholder: "e.g. AI & Data Science / Big Tech" },
            { label: "Bootcamp Training Track", name: "track", type: "text", placeholder: "e.g. Deep Learning & CUDA Computing" },
            { label: "Annual Hiring Quota", name: "quota", type: "text", placeholder: "e.g. 50" },
            { label: "Average CTC Offered", name: "avgPkg", type: "text", placeholder: "e.g. ₹28.0 LPA" },
            { label: "Location / Tech Hub", name: "location", type: "text", placeholder: "e.g. Bengaluru / Pune" }
          ]}
          onClose={() => setIsPartnerModalOpen(false)}
          onSubmit={handleAddHiringPartner}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  // Training Overview Dashboard
  return (
    <div className={`rounded-2xl border p-6 space-y-6 font-sans transition-colors duration-200 ${cardClass}`}>
      <div className={`pb-4 border-b ${borderDivider}`}>
<<<<<<< HEAD
        <h2 className={`text-xl font-semibold flex items-center gap-2 ${textHeading}`}>
          <FaChalkboardUser className="w-5 h-5 text-blue-500" /> Training Institute Portal Overview
=======
        <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
          <FiGrid className="w-5 h-5 text-blue-500" /> Training Institute Portal Overview
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
        </h2>
        <p className={`text-sm font-normal ${textMuted}`}>Skill bootcamps, certified trainees, accreditation tracks, and hiring enterprise ties</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Trainee Cohorts")}>
<<<<<<< HEAD:app/components/dashboards/TrainingDashboard.tsx
<<<<<<< HEAD
          <span className={`font-medium text-[13px] block ${textMuted}`}>Active Trainees</span>
          <div className="text-2xl lg:text-3xl font-bold text-blue-500 mt-1">2,900</div>
          <span className={`text-xs font-normal ${textMuted}`}>12 Certified Bootcamps</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Certification Rates")}>
          <span className={`font-medium text-[13px] block ${textMuted}`}>Cert Completion</span>
          <div className="text-2xl lg:text-3xl font-bold text-emerald-500 mt-1">91.4%</div>
          <span className={`text-xs font-normal ${textMuted}`}>Industry Accredited</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing 64 Hiring Partner Enterprises")}>
          <span className={`font-medium text-[13px] block ${textMuted}`}>Placement Partners</span>
          <div className="text-2xl lg:text-3xl font-bold text-blue-500 mt-1">{hiringPartners.length} Companies</div>
          <span className={`text-xs font-normal ${textMuted}`}>Tech & Cloud Tracks</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Employment Index")}>
          <span className={`font-medium text-[13px] block ${textMuted}`}>Employment Index</span>
          <div className="text-2xl lg:text-3xl font-bold text-emerald-500 mt-1">88%</div>
          <span className="text-xs text-emerald-500 flex items-center gap-1 mt-1 font-medium">
            <FaArrowTrendUp className="w-3 h-3" /> Hired within 90 days
=======
          <span className={`font-semibold block ${textMuted}`}>Active Trainees</span>
          <div className="text-2xl font-bold text-blue-400 mt-1">2,900</div>
          <span className={`text-[10px] ${textMuted}`}>12 Certified Bootcamps</span>
=======
          <span className={`font-semibold block ${textMuted}`}>Active Tracks</span>
          <div className="text-2xl font-bold text-blue-400 mt-1">{coursesList.length}</div>
          <span className={`text-[10px] ${textMuted}`}>{coursesList.length > 0 ? 'Live Bootcamps' : 'No active bootcamps'}</span>
>>>>>>> origin/omsai:app/components/Pages/TrainingDashboard.tsx
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Certification Rates")}>
          <span className={`font-semibold block ${textMuted}`}>Digital Credentials</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{certifications.length}</div>
          <span className={`text-[10px] ${textMuted}`}>Industry Accredited</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Hiring Partners")}>
          <span className={`font-semibold block ${textMuted}`}>Corporate Placement</span>
          <div className="text-2xl font-bold text-blue-400 mt-1">8 Partners</div>
          <span className={`text-[10px] ${textMuted}`}>MoU Signed</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Employment Index")}>
          <span className={`font-semibold block ${textMuted}`}>Platform Status</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">Connected</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-bold">
<<<<<<< HEAD:app/components/dashboards/TrainingDashboard.tsx
            <FiTrendingUp className="w-3 h-3" /> Hired within 90 days
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
=======
            <FiTrendingUp className="w-3 h-3" /> System Synchronized
>>>>>>> origin/omsai:app/components/Pages/TrainingDashboard.tsx
          </span>
        </div>
      </div>
    </div>
  );
};
