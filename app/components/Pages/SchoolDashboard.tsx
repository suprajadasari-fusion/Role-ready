import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  FiPieChart, 
  FiUsers, 
  FiGrid, 
  FiCheckSquare, 
  FiFileText, 
  FiCalendar, 
  FiTrendingUp, 
  FiCpu, 
  FiBriefcase, 
  FiBell, 
  FiSliders, 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiEye, 
  FiCheck, 
  FiX, 
  FiAward, 
  FiBookOpen, 
  FiStar, 
  FiAlertCircle, 
  FiUserCheck,
  FiEdit2,
  FiVideo
} from 'react-icons/fi';
import { ActionModal } from '../ActionModal';
import { VideoCallModal } from '../VideoCallModal';
import { StudentToolsViews } from '../StudentToolsViews';
import { schoolService, SchoolProfile } from '../../services/schoolService';

interface SchoolDashboardProps {
  activeSubView: string;
  onShowToast: (msg: string) => void;
  isDarkMode: boolean;
}

export const SchoolDashboard: React.FC<SchoolDashboardProps> = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const queryClient = useQueryClient();

  // State for Student Roster & Student Details Modal (School Admin View)
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<any | null>(null);
  const [studentDetailTab, setStudentDetailTab] = useState<string>('overview');

  // Video Call Modal State
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [videoSessionConfig, setVideoSessionConfig] = useState({
    title: 'Global AI & STEM Career Guidance Workshop',
    hostName: 'Dr. Rajesh Verma (IIT Delhi)'
  });

  // Edit Modal States
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<any | null>(null);
  const [isEditingSchoolProfile, setIsEditingSchoolProfile] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const [schoolProfile, setSchoolProfile] = useState({
    name: "St. Xavier's International School",
    affiliation: "CBSE Affiliation Verified",
    principal: "Dr. A. K. Sharma",
    email: "principal@stxaviers.edu",
    year: "2026-2027"
  });

  // Live queries
  const { data: schoolData, isLoading } = useQuery({
    queryKey: ['schoolProfile'],
    queryFn: () => schoolService.getSchoolProfile()
  });

  const { data: cohortAptitude } = useQuery({
    queryKey: ['cohortAptitude'],
    queryFn: () => schoolService.getCohortAptitudeAnalytics()
  });

  const { data: cohortSkills } = useQuery({
    queryKey: ['cohortSkills'],
    queryFn: () => schoolService.getCohortSkillAnalytics()
  });

  const updateMutation = useMutation({
    mutationFn: (updates: {
      schoolProfile?: SchoolProfile;
      students?: any[];
      teachers?: any[];
    }) => schoolService.updateSchoolData(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schoolProfile'] });
    },
    onError: (err: any) => {
      onShowToast("Unable to save changes. Please try again.");
    }
  });

  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState<{ title: string; subtitle: string; fields: any[] }>({
    title: '',
    subtitle: '',
    fields: []
  });

  const [teachersList, setTeachersList] = useState<any[]>([]);

  const cardClass = isDarkMode
    ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
    : 'bg-white border-blue-100 text-slate-900 shadow-sm';

  const subCardClass = isDarkMode
    ? 'bg-slate-800/80 border-slate-700/80 text-white'
    : 'bg-slate-50/80 border-blue-100 text-slate-900 shadow-2xs';

  const textMuted = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const textHeading = isDarkMode ? 'text-white' : 'text-slate-900';
  const borderDivider = isDarkMode ? 'border-slate-800' : 'border-slate-100';

  // Live School Students Roster State
  const [students, setStudents] = useState<any[]>([]);

  const filteredStudents = students.filter(s => {
    const matchesGrade = selectedGrade === 'All' || s.grade === selectedGrade;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.careerGoal.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  const [assessmentsList, setAssessmentsList] = useState([
    { name: "Holland Code Psychometric Test", grade: "Grades 9 & 10", assigned: 1830, completed: 1720, score: "88/100" },
    { name: "STEM Cognitive Aptitude Test", grade: "Grades 11 & 12", assigned: 1770, completed: 1690, score: "92/100" },
    { name: "Emotional Intelligence & Work Style", grade: "Grades 8 & 9", assigned: 1400, completed: 1250, score: "85/100" }
  ]);

  const [eventsList, setEventsList] = useState([
    { title: "Global AI & STEM Career Workshop", date: "Tomorrow, 10:00 AM", attendees: "450 Students Enrolled", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
    { title: "Parent Career Guidance Seminar", date: "15th August, 4:00 PM", attendees: "680 Parents Enrolled", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" }
  ]);

  const openTriggerModal = (title: string, subtitle: string, fields: any[]) => {
    setActionModalConfig({ title, subtitle, fields });
    setIsActionModalOpen(true);
  };

  useEffect(() => {
    if (schoolData) {
      if (schoolData.profile) setSchoolProfile(schoolData.profile);
      if (Array.isArray(schoolData.teachers) && schoolData.teachers.length > 0) {
        setTeachersList(schoolData.teachers);
      }
      if (Array.isArray(schoolData.students) && schoolData.students.length > 0) {
        setStudents(schoolData.students);
      }
    }
  }, [schoolData]);

  const handleModalFormSubmit = (data: Record<string, string>) => {
    if (actionModalConfig.title === "Onboard Student Batch") {
      const studentName = data.name || "New Student";
      const studentGrade = data.grade || "Grade 11";
      const studentSection = data.section || "Section A";
      const studentGoal = data.careerGoal || "Software & AI Engineer";

      const newStudent = {
        id: `STU-${Math.floor(8807 + Math.random() * 1000)}`,
        name: studentName,
        grade: studentGrade.startsWith("Grade") ? studentGrade : `Grade ${studentGrade}`,
        section: studentSection.startsWith("Section") ? studentSection : `Section ${studentSection}`,
        careerScore: 88,
        assessmentStatus: "Completed (4/4)",
        careerDnaStatus: "RIE Verified",
        learningProgress: "85%",
        skillProgress: "88%",
        resumeScore: "82/100",
        placementReadiness: "High Readiness",
        status: "Active",
        email: `${studentName.toLowerCase().replace(/\s+/g, '.')}@school.edu`,
        careerGoal: studentGoal,
        hollandCode: "RIE (Realistic • Investigative • Enterprising)",
        topSkills: ["Python", "Problem Solving", "AI Fundamentals"],
        topCollege: "IIT Bombay",
        topScholarship: "National STEM Leadership Aid (₹3.5L/yr)"
      };

      const updated = [newStudent, ...students];
      setStudents(updated);
      updateMutation.mutate({ students: updated });
      onShowToast(`Successfully onboarded student: ${newStudent.name} (${newStudent.grade})!`);
    } else if (actionModalConfig.title === "Add Teacher") {
<<<<<<< HEAD:app/components/dashboards/SchoolDashboard.tsx
      const teacherName = data.name || "New Faculty Member";
      const teacherDept = data.department || "Computer Science & Tech";
      const teacherSubject = data.subject || "STEM & AI Fundamentals";
      const teacherClasses = data.classes || "Grade 11, Grade 12";
      const teacherQual = data.qualification || "M.Tech / M.Sc Faculty";

      const newTeacher = {
        id: `TCH-${Math.floor(200 + Math.random() * 800)}`,
        name: teacherName,
        qualification: teacherQual,
        dept: teacherDept,
        subject: teacherSubject,
        classes: teacherClasses,
        studentsCount: "0 Students Assigned",
        experience: "Joined Recently",
        email: `${teacherName.toLowerCase().replace(/\s+/g, '.')}@school.edu`,
        rating: "5.0 / 5.0 (New Faculty)",
        projects: "0 Cohorts Supervised"
      };

      setTeachersList(prev => [newTeacher, ...prev]);
      onShowToast(`Successfully added teacher: ${newTeacher.name} (${newTeacher.dept})!`);
    } else if (actionModalConfig.title === "Assign Assessment") {
      const newAs = {
        name: data.name || "Career Aptitude & Skill Evaluation",
        grade: data.grade || "All Grades",
        assigned: 500,
        completed: 0,
        score: "Pending"
      };
      setAssessmentsList(prev => [newAs, ...prev]);
      onShowToast(`Assigned new assessment: ${newAs.name}!`);
    } else if (actionModalConfig.title === "Schedule Event") {
      const newEv = {
        title: data.title || "Career Guidance Workshop",
        date: data.date || "Upcoming",
        attendees: "100 Students Enrolled",
        bg: "bg-[#DEE9FF]",
        border: "border-[#C6D9FF]"
      };
      setEventsList(prev => [newEv, ...prev]);
      onShowToast(`Scheduled new event: ${newEv.title}!`);
=======
      const newTch = {
        id: `TCH-${Math.floor(204 + Math.random() * 800)}`,
        name: data.name || "Faculty Member",
        qualification: "M.Sc / B.Ed",
        dept: data.department || "Academic Department",
        subject: data.department || "General Subject",
        classes: "Grade 10, 11",
        studentsCount: "60 Students Assigned",
        experience: "5 Years Experience",
        email: `${(data.name || 'faculty').toLowerCase().replace(/\s+/g, '.')}@school.edu`,
        rating: "4.8 / 5.0"
      };
      const updated = [newTch, ...teachersList];
      setTeachersList(updated);
      updateMutation.mutate({ teachers: updated });
      onShowToast(`Successfully added teacher: ${newTch.name}!`);
>>>>>>> origin/omsai:app/components/Pages/SchoolDashboard.tsx
    } else {
      onShowToast(`Action completed: ${actionModalConfig.title}`);
    }
    setIsActionModalOpen(false);
  };

  // Handle Save Student Changes
  const handleSaveStudentEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    if (!editingStudent.name || !editingStudent.email || !editingStudent.careerGoal) {
      onShowToast("Please fill out all required student fields!");
      return;
    }

    setIsSavingEdit(true);

    const updated = students.map(s => s.id === editingStudent.id ? { ...s, ...editingStudent } : s);
    setStudents(updated);
    if (selectedStudent && selectedStudent.id === editingStudent.id) {
      setSelectedStudent((prev: any) => (prev ? { ...prev, ...editingStudent } : null));
    }
    updateMutation.mutate({ students: updated });
    setIsSavingEdit(false);
    onShowToast(`Successfully saved changes for ${editingStudent.name} (${editingStudent.id})!`);
    setEditingStudent(null);
  };

  // Handle Save Teacher Changes
  const handleSaveTeacherEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;

    if (!editingTeacher.name || !editingTeacher.email || !editingTeacher.dept) {
      onShowToast("Please fill out all required teacher fields!");
      return;
    }

    setIsSavingEdit(true);

    const updated = teachersList.map(t => t.id === editingTeacher.id ? { ...t, ...editingTeacher } : t);
    setTeachersList(updated);
    if (selectedTeacher && selectedTeacher.id === editingTeacher.id) {
      setSelectedTeacher((prev: any) => (prev ? { ...prev, ...editingTeacher } : null));
    }
    updateMutation.mutate({ teachers: updated });
    setIsSavingEdit(false);
    onShowToast(`Updated faculty profile for ${editingTeacher.name} (${editingTeacher.id})!`);
    setEditingTeacher(null);
  };

  // Handle Save School Profile
  const handleSaveSchoolProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingEdit(true);
    updateMutation.mutate({ schoolProfile });
    setIsSavingEdit(false);
    setIsEditingSchoolProfile(false);
    onShowToast("Successfully updated School Profile & Accreditation details!");
  };

  if (['discovery', 'assessment', 'psychometric', 'dna', 'ai-recommendations', 'scholarships', 'colleges', 'roadmap', 'resume-ats', 'learning'].includes(activeSubView)) {
    return <StudentToolsViews activeSubView={activeSubView} onShowToast={onShowToast} isDarkMode={isDarkMode} />;
  }

  const renderContent = () => {
    // 1. DASHBOARD OVERVIEW
    if (activeSubView === 'overview') {
      const totalStudents = students.length;
      const totalTeachers = teachersList.length;
      const completedCount = students.filter(s => s.assessmentStatus?.toLowerCase().includes('completed')).length;
      const testPercent = totalStudents > 0 ? ((completedCount / totalStudents) * 100).toFixed(1) : "0.0";
      const avgReadiness = totalStudents > 0 
        ? (students.reduce((acc, s) => acc + (Number(s.careerScore) || 0), 0) / totalStudents).toFixed(1)
        : "0.0";
      const attentionCount = students.filter(s => s.placementReadiness?.toLowerCase().includes('needs') || (s.careerScore || 0) < 80).length;
      const placementCount = students.filter(s => s.placementReadiness?.toLowerCase().includes('high')).length;
      const placementPercent = totalStudents > 0 ? Math.round((placementCount / totalStudents) * 100) : 0;
      const grades = ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

      return (
        <div className="space-y-6 font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-[24px] bg-[#12163A] text-white shadow-md border border-[#12163A] space-y-2 hover-card-lift">
<<<<<<< HEAD:app/components/dashboards/SchoolDashboard.tsx
              <span className="font-medium text-[13px] block text-slate-300">Total Students (Grades 8-12)</span>
              <div className="text-2xl lg:text-3xl font-bold tracking-tight text-white">{students.length + 3814}</div>
              <span className="text-xs font-medium text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full inline-block">100% Active Profiles</span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift">
              <span className="font-medium text-[13px] block text-[#4B5563]">Total Teachers & Mentors</span>
              <div className="text-2xl lg:text-3xl font-bold tracking-tight text-[#12163A]">142</div>
              <span className="text-xs font-medium text-[#12163A]/70">Across 12 Departments</span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift">
              <span className="font-medium text-[13px] block text-[#4B5563]">Assessment Completion</span>
              <div className="text-2xl lg:text-3xl font-bold tracking-tight text-[#3665EE]">91.4%</div>
              <span className="text-xs font-medium text-[#12163A]">3,490 / 3,820 Tested</span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift">
              <span className="font-medium text-[13px] block text-[#4B5563]">Avg Career Readiness Score</span>
              <div className="text-2xl lg:text-3xl font-bold tracking-tight text-[#12163A]">88.2 / 100</div>
              <span className="text-xs font-medium text-[#3665EE]">Top 5% Regionally</span>
=======
              <span className="font-semibold block text-slate-300">Total Students (Grades 8-12)</span>
              <div className="text-3xl font-extrabold text-white">{totalStudents}</div>
              <span className="text-[11px] font-bold text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full inline-block">
                {totalStudents > 0 ? 'Live Roster Active' : 'Roster Empty'}
              </span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift">
              <span className="font-semibold block text-[#4B5563]">Total Teachers & Mentors</span>
              <div className="text-3xl font-extrabold text-[#12163A]">{totalTeachers}</div>
              <span className="text-[11px] font-bold text-[#12163A]/70">Registered Faculty</span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift">
              <span className="font-semibold block text-[#4B5563]">Assessment Completion</span>
              <div className="text-3xl font-extrabold text-[#3665EE]">{testPercent}%</div>
              <span className="text-[11px] font-bold text-[#12163A]">{completedCount} / {totalStudents} Tested</span>
            </div>

            <div className="p-6 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift">
              <span className="font-semibold block text-[#4B5563]">Avg Career Readiness Score</span>
              <div className="text-3xl font-extrabold text-[#12163A]">{avgReadiness} / 100</div>
              <span className="text-[11px] font-bold text-[#3665EE]">Live Cohort Metric</span>
>>>>>>> origin/omsai:app/components/Pages/SchoolDashboard.tsx
            </div>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-semibold text-base text-[#12163A]">Grade Enrolment & Career DNA Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
<<<<<<< HEAD:app/components/dashboards/SchoolDashboard.tsx
              {[
                { grade: "Grade 8", count: 620, readiness: "76% Ready", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
                { grade: "Grade 9", count: 780, readiness: "82% Ready", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
                { grade: "Grade 10", count: 1050, readiness: "89% Ready", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
                { grade: "Grade 11", count: 920, readiness: "93% Ready", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
                { grade: "Grade 12", count: 850, readiness: "96% Ready", bg: "bg-[#12163A]", border: "border-[#12163A]", dark: true }
              ].map((g, i) => (
                <div key={i} className={`p-4 rounded-[20px] border text-center ${g.bg} ${g.border} ${g.dark ? 'text-white' : 'text-[#12163A]'} hover-card-lift`}>
                  <span className="font-medium block text-xs">{g.grade}</span>
                  <div className="text-2xl font-bold my-1">{g.count}</div>
                  <span className={`text-xs font-medium ${g.dark ? 'text-[#E4F4EC]' : 'text-[#3665EE]'}`}>{g.readiness}</span>
                </div>
              ))}
=======
              {grades.map((g, i) => {
                const count = students.filter(s => s.grade === g).length;
                const gradeStudents = students.filter(s => s.grade === g);
                const gradeAvg = gradeStudents.length > 0
                  ? Math.round(gradeStudents.reduce((acc, s) => acc + (Number(s.careerScore) || 0), 0) / gradeStudents.length)
                  : 0;
                const dark = g === 'Grade 12';
                return (
                  <div key={i} className={`p-4 rounded-[20px] border text-center ${i % 2 === 0 ? "bg-[#DEE9FF] border-[#C6D9FF]" : "bg-[#F6E6D8] border-[#EAD0BC]"} ${dark ? 'bg-[#12163A] border-[#12163A] text-white' : 'text-[#12163A]'} hover-card-lift`}>
                    <span className="font-bold block text-xs">{g}</span>
                    <div className="text-2xl font-extrabold my-1">{count}</div>
                    <span className={`text-[10px] font-bold ${dark ? 'text-[#E4F4EC]' : 'text-[#3665EE]'}`}>{gradeAvg}% Ready</span>
                  </div>
                );
              })}
>>>>>>> origin/omsai:app/components/Pages/SchoolDashboard.tsx
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm">
            <div className="p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] border border-[#C6D9FF] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
<<<<<<< HEAD:app/components/dashboards/SchoolDashboard.tsx
                <h4 className="font-semibold text-base text-[#12163A]">Learning Progress</h4>
                <span className="font-semibold text-sm text-[#3665EE]">86.4% Avg</span>
=======
                <h4 className="font-bold text-sm text-[#12163A]">Learning Progress</h4>
                <span className="font-bold text-[#3665EE]">{testPercent}% Avg</span>
>>>>>>> origin/omsai:app/components/Pages/SchoolDashboard.tsx
              </div>
              <p className="text-sm font-normal text-[#4B5563]">Course completion rates across AI, STEM, & Skill tracks</p>
              <div className="w-full h-2.5 bg-white/80 rounded-full overflow-hidden">
                <div className="h-full bg-[#3665EE] rounded-full" style={{ width: `${testPercent}%` }} />
              </div>
            </div>

            <div className="p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] border border-[#EAD0BC] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
<<<<<<< HEAD:app/components/dashboards/SchoolDashboard.tsx
                <h4 className="font-semibold text-base text-[#12163A]">Students Requiring Attention</h4>
                <span className="font-medium text-xs text-[#12163A] bg-[#12163A]/10 px-2.5 py-0.5 rounded-full">42 Students</span>
=======
                <h4 className="font-bold text-sm text-[#12163A]">Students Requiring Attention</h4>
                <span className="font-bold text-[#12163A] bg-[#12163A]/10 px-2.5 py-0.5 rounded-full">{attentionCount} Students</span>
>>>>>>> origin/omsai:app/components/Pages/SchoolDashboard.tsx
              </div>
              <p className="text-sm font-normal text-[#4B5563]">Incomplete assessments or low career readiness score</p>
              <button 
                onClick={() => onShowToast("Navigating to filtered Student Attention list")}
                className="text-[#3665EE] font-medium text-sm hover:underline cursor-pointer"
              >
                View Needs Attention Roster &rarr;
              </button>
            </div>

            <div className="p-6 rounded-[24px] bg-[#E4F4EC] text-[#12163A] border border-[#C3E6D5] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
<<<<<<< HEAD:app/components/dashboards/SchoolDashboard.tsx
                <h4 className="font-semibold text-base text-[#12163A]">Placement Readiness</h4>
                <span className="font-semibold text-sm text-[#12163A]">78% Placement Ready</span>
=======
                <h4 className="font-bold text-sm text-[#12163A]">Placement Readiness</h4>
                <span className="font-bold text-[#12163A]">{placementPercent}% Placement Ready</span>
>>>>>>> origin/omsai:app/components/Pages/SchoolDashboard.tsx
              </div>
              <p className="text-sm font-normal text-[#4B5563]">Grade 11 & 12 students qualified for internships & admissions</p>
              <div className="w-full h-2.5 bg-white/80 rounded-full overflow-hidden">
                <div className="h-full bg-[#3665EE] rounded-full" style={{ width: `${placementPercent}%` }} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 2. STUDENTS (ROSTER & DETAILS)
    if (activeSubView === 'students') {
      return (
        <div className="space-y-6 font-sans">
          <div className="p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
<<<<<<< HEAD
                <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                  <FaUsers className="w-5 h-5 text-[#3665EE]" /> Student Roster (Grades 8 - 12)
=======
                <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                  <FiUsers className="w-5 h-5 text-[#3665EE]" /> Student Roster (Grades 8 - 12)
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
                </h2>
                <p className="text-sm font-normal text-[#6B7280]">School admin management for registered student profiles</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => openTriggerModal("Onboard Student Batch", "Import and register a new student profile into the grade roster", [
                    { label: "Student Full Name", name: "name", type: "text", placeholder: "Rahul Verma" },
                    { label: "Grade (e.g. 8, 9, 10, 11, 12)", name: "grade", type: "text", placeholder: "Grade 11" },
                    { label: "Section", name: "section", type: "text", placeholder: "Section A" },
                    { label: "Target Career Goal", name: "careerGoal", type: "text", placeholder: "AI & Software Engineer" }
                  ])}
                  className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
                >
                  <FiPlus className="w-3.5 h-3.5" /> Onboard Student Batch
                </button>
                <button 
                  onClick={() => onShowToast("Exported Grade Roster to CSV")}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200 bg-slate-50 text-[#12163A] hover:bg-slate-100 transition cursor-pointer flex items-center gap-2"
                >
<<<<<<< HEAD
                  <FaDownload className="w-3.5 h-3.5" /> Export CSV
=======
                  <FiDownload className="w-3.5 h-3.5" /> Export Roster
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
                </button>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                {['All', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrade(g)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                      selectedGrade === g 
                        ? 'bg-[#12163A] text-white' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <div className="relative w-64">
                <FaMagnifyingGlass className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-xl text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#3665EE] bg-slate-50 text-[#12163A]"
                />
<<<<<<< HEAD
=======
                <FiSearch className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#C6D9FF]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-xs font-semibold uppercase tracking-wider bg-[#DEE9FF]/50 text-[#12163A] border-[#C6D9FF]">
                    <th className="p-3.5">Student Name</th>
                    <th className="p-3.5">Roll No / ID</th>
                    <th className="p-3.5">Career Score</th>
                    <th className="p-3.5">Assessment Status</th>
                    <th className="p-3.5">Career DNA</th>
                    <th className="p-3.5">Learning Progress</th>
                    <th className="p-3.5">Resume Score</th>
                    <th className="p-3.5">Placement Readiness</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
<<<<<<< HEAD:app/components/dashboards/SchoolDashboard.tsx
                <tbody className="divide-y divide-[#C6D9FF]/60 text-sm font-normal">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-[#DEE9FF]/30 transition-colors">
                      <td className="p-3.5 font-medium text-[#12163A]">
                        <div>{s.name} ({s.grade} - {s.section})</div>
                        <div className="text-xs font-normal text-[#6B7280]">{s.email}</div>
=======
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="p-8 text-center text-xs text-slate-400">
                        No students found in roster. Click '+ Onboard Student Batch' to add students.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-[#DEE9FF]/20 transition-colors">
                      <td className="p-3.5 font-bold text-[#12163A]">
                        <div>{s.name}</div>
                        <div className="text-[10px] font-normal text-[#6B7280]">{s.email}</div>
>>>>>>> origin/omsai:app/components/Pages/SchoolDashboard.tsx
                      </td>
                      <td className="p-3.5 font-mono text-xs text-[#3665EE]">{s.id}</td>
                      <td className="p-3.5 font-semibold text-[#3665EE]">{s.careerScore} / 100</td>
                      <td className="p-3.5 font-medium text-emerald-600">{s.assessmentStatus}</td>
                      <td className="p-3.5"><span className="bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-medium text-xs whitespace-nowrap shadow-2xs">{s.careerDnaStatus}</span></td>
                      <td className="p-3.5 font-medium text-[#12163A]">{s.learningProgress}</td>
                      <td className="p-3.5 font-semibold text-[#3665EE]">{s.resumeScore}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full font-medium text-xs border ${
                          s.placementReadiness.includes('High')
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : s.placementReadiness.includes('Moderate')
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          {s.placementReadiness}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
<<<<<<< HEAD
                        <button
                          onClick={() => setSelectedStudent(s)}
                          className="bg-[#12163A] hover:bg-[#1A2050] text-white font-medium px-3 py-1.5 rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5 ml-auto hover:scale-105 active:scale-95"
                        >
                          <FaEye className="w-3.5 h-3.5" /> View Profile
                        </button>
=======
                        <div className="flex items-center justify-end gap-1.5 ml-auto">
                          <button 
                            onClick={() => setEditingStudent({ ...s })}
                            className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-2.5 py-1.5 rounded-lg text-[10px] transition cursor-pointer flex items-center gap-1 hover:scale-105 active:scale-95 shadow-xs"
                            title={`Edit ${s.name}'s Profile`}
                          >
                            <FiEdit2 className="w-3 h-3" /> Edit
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedStudent(s);
                              setStudentDetailTab('overview');
                            }}
                            className="bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-2.5 py-1.5 rounded-lg text-[10px] transition cursor-pointer flex items-center gap-1 hover:scale-105 active:scale-95 shadow-xs"
                          >
                            <FiEye className="w-3 h-3" /> View
                          </button>
                        </div>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </div>
          </div>

          {/* STUDENT DETAILS POPUP MODAL */}
          {selectedStudent && (
            <div className="fixed inset-0 z-50 backdrop-blur-md bg-[#12163A]/70 flex items-center justify-center p-4 animate-fade-in font-sans">
              <div className="bg-white rounded-[28px] max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-scale-up text-sm font-sans">
                {/* Modal Header */}
                <div className="px-6 py-5 bg-[#12163A] text-white flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#DEE9FF]">School Admin Student View</div>
                    <h3 className="text-xl font-bold flex items-center gap-2">{selectedStudent.name}</h3>
                    <p className="text-xs text-slate-300 font-normal">{selectedStudent.grade} • {selectedStudent.section} • Roll ID: {selectedStudent.id}</p>
                  </div>
<<<<<<< HEAD
                  <button 
                    onClick={() => setSelectedStudent(null)} 
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer text-white"
                  >
                    <FaXmark className="w-4 h-4" />
                  </button>
=======
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setEditingStudent({ ...selectedStudent })}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md hover:scale-105 active:scale-95"
                    >
                      <FiEdit2 className="w-3.5 h-3.5" /> Edit Profile
                    </button>
                    <button 
                      onClick={() => setSelectedStudent(null)}
                      className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer text-white"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
                </div>

                {/* Modal Navigation Tabs */}
                <div className="px-6 border-b border-slate-200 flex gap-2 overflow-x-auto bg-slate-50">
                  {[
                    { id: 'overview', label: '1. Overview' },
                    { id: 'intelligence', label: '2. Career DNA & Intelligence' },
                    { id: 'assessments', label: '3. Assessments' },
                    { id: 'learning', label: '4. Skills & Learning' },
                    { id: 'opportunities', label: '5. Colleges & Scholarships' },
                    { id: 'placement', label: '6. Placement Readiness' },
                    { id: 'academic', label: '7. Academic Summary' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setStudentDetailTab(t.id)}
                      className={`px-4 py-3 text-xs font-medium transition whitespace-nowrap cursor-pointer border-b-2 ${
                        studentDetailTab === t.id 
                          ? 'border-[#3665EE] text-[#3665EE] font-semibold' 
                          : 'border-transparent text-[#6B7280] hover:text-[#12163A]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Modal Content Bodies */}
                <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
                  {studentDetailTab === 'overview' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-4 rounded-xl border bg-[#DEE9FF] border-[#C6D9FF]">
                          <span className="font-medium text-xs text-[#6B7280]">Career Score</span>
                          <div className="text-2xl font-bold text-[#3665EE] mt-1">{selectedStudent.careerScore} / 100</div>
                        </div>
                        <div className="p-4 rounded-xl border bg-[#E4F4EC] border-[#C3E6D5]">
                          <span className="font-medium text-xs text-[#6B7280]">Learning Progress</span>
                          <div className="text-2xl font-bold text-[#12163A] mt-1">{selectedStudent.learningProgress}</div>
                        </div>
                        <div className="p-4 rounded-xl border bg-[#F6E6D8] border-[#EAD0BC]">
                          <span className="font-medium text-xs text-[#6B7280]">Placement Readiness</span>
                          <div className="text-2xl font-bold text-[#12163A] mt-1">{selectedStudent.placementReadiness}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {studentDetailTab === 'intelligence' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl border bg-[#F6E6D8] border-[#EAD0BC] space-y-2">
                        <h4 className="font-semibold text-base text-[#12163A]">Career DNA & Personality Profile</h4>
                        <p className="text-[#3665EE] font-semibold text-sm">{selectedStudent.hollandCode}</p>
                      </div>
                      <div className="p-4 rounded-xl border bg-[#E4F4EC] border-[#C3E6D5] space-y-2">
                        <h4 className="font-semibold text-base text-[#12163A]">AI Recommended Career Goal</h4>
                        <p className="text-[#12163A] font-semibold text-sm">{selectedStudent.careerGoal}</p>
                      </div>
                    </div>
                  )}

                  {studentDetailTab === 'assessments' && (
                    <div className="space-y-3">
                      {["Aptitude Assessment (Score: 94%)", "Psychometric Holland Code Test (Score: Completed)", "Emotional Intelligence (EQ Score: 88%)"].map((a, i) => (
                        <div key={i} className="p-3.5 rounded-xl border bg-slate-50 border-slate-200 flex items-center justify-between">
                          <span className="font-medium text-sm text-[#12163A]">{a}</span>
                          <span className="text-[#3665EE] font-semibold text-xs">Verified</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {studentDetailTab === 'learning' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl border bg-[#DEE9FF] border-[#C6D9FF] space-y-2">
                        <h4 className="font-semibold text-base text-[#12163A]">Key Acquired Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedStudent.topSkills.map((sk: string) => (
                            <span key={sk} className="bg-[#12163A] text-white px-3 py-1 rounded-lg font-medium text-xs">{sk}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {studentDetailTab === 'opportunities' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl border bg-white border-slate-200 space-y-1">
                        <h4 className="font-semibold text-base text-[#12163A]">Recommended College</h4>
                        <p className="text-[#3665EE] font-semibold text-sm">{selectedStudent.topCollege}</p>
                      </div>
                      <div className="p-4 rounded-xl border bg-[#E4F4EC] border-[#C3E6D5] space-y-1">
                        <h4 className="font-semibold text-base text-[#12163A]">Scholarship Eligibility</h4>
                        <p className="text-[#12163A] font-semibold text-sm">{selectedStudent.topScholarship}</p>
                      </div>
                    </div>
                  )}

                  {studentDetailTab === 'placement' && (
                    <div className="p-4 rounded-xl border bg-white border-slate-200 space-y-2">
                      <h4 className="font-semibold text-base text-[#12163A]">ATS Resume Score</h4>
                      <div className="text-2xl font-bold text-[#3665EE]">{selectedStudent.resumeScore}</div>
                    </div>
                  )}

                  {studentDetailTab === 'academic' && (
                    <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 space-y-2">
                      <h4 className="font-semibold text-base text-[#12163A]">Academic Performance Summary</h4>
                      <p className="text-[#6B7280] text-sm font-normal">Term 1 Average: 89.4% • Attendance: 96.2%</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // 3. TEACHERS
    if (activeSubView === 'teachers') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
<<<<<<< HEAD
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaChalkboardUser className="w-5 h-5 text-[#3665EE]" /> Teacher & Faculty Management
=======
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiGrid className="w-5 h-5 text-[#3665EE]" /> Teacher & Faculty Management
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
<<<<<<< HEAD:app/components/dashboards/SchoolDashboard.tsx
              <p className="text-sm font-normal text-[#6B7280]">142 Registered school teachers & career mentors across departments</p>
=======
              <p className="text-[#6B7280]">{teachersList.length} Registered school teachers & career mentors across departments</p>
>>>>>>> origin/omsai:app/components/Pages/SchoolDashboard.tsx
            </div>
            <button 
              onClick={() => openTriggerModal("Add Teacher", "Register a new teacher or mentor", [
                { label: "Teacher Name", name: "name", type: "text", placeholder: "Dr. Rajesh Verma" },
                { label: "Department", name: "department", type: "text", placeholder: "Computer Science & AI" },
                { label: "Primary Subject", name: "subject", type: "text", placeholder: "Artificial Intelligence & ML" },
                { label: "Qualification", name: "qualification", type: "text", placeholder: "Ph.D. Computer Science (IIT Delhi)" },
                { label: "Assigned Classes", name: "classes", type: "text", placeholder: "Grade 11-A, 12-A" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md"
            >
              <FiPlus className="w-3.5 h-3.5" /> Add Teacher
            </button>
          </div>

          <div className="space-y-3">
<<<<<<< HEAD:app/components/dashboards/SchoolDashboard.tsx
            {teachersList.map((t, i) => (
              <div key={i} className="p-4 rounded-[20px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] transition-all hover:shadow-md">
                <div>
                  <h4 className="font-semibold text-base text-[#12163A]">{t.name}</h4>
                  <span className="text-[#3665EE] font-medium text-xs">{t.dept} • {t.subject}</span>
                  <div className="text-xs text-[#4B5563] font-normal">{t.classes} • Assigned: {t.studentsCount}</div>
                </div>
<<<<<<< HEAD
                <button 
                  onClick={() => setSelectedTeacher(t)}
                  className="bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-xs px-3.5 py-1.5 rounded-xl cursor-pointer transition hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5"
                >
                  <FaEye className="w-3.5 h-3.5" /> View Teacher
                </button>
=======
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setEditingTeacher({ ...t })}
                    className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-3 py-1.5 rounded-xl cursor-pointer transition hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5"
                    title={`Edit ${t.name}'s Profile`}
                  >
                    <FiEdit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button 
                    onClick={() => setSelectedTeacher(t)}
                    className="bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-3.5 py-1.5 rounded-xl cursor-pointer transition hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5"
                  >
                    <FiEye className="w-3.5 h-3.5" /> View
                  </button>
                </div>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
=======
            {teachersList.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                <FiGrid className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
                No teachers or mentors registered yet. Click '+ Add Teacher' to onboard faculty.
>>>>>>> origin/omsai:app/components/Pages/SchoolDashboard.tsx
              </div>
            ) : (
              teachersList.map((t, i) => (
                <div key={i} className="p-4 rounded-[20px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] transition-all hover:shadow-md">
                  <div>
                    <h4 className="font-bold text-sm text-[#12163A]">{t.name}</h4>
                    <span className="text-[#3665EE] font-semibold">{t.dept} • {t.subject}</span>
                    <div className="text-[11px] text-[#4B5563]">{t.classes} • Assigned: {t.studentsCount}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setEditingTeacher({ ...t })}
                      className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-3 py-1.5 rounded-xl cursor-pointer transition hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5"
                      title={`Edit ${t.name}'s Profile`}
                    >
                      <FiEdit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button 
                      onClick={() => setSelectedTeacher(t)}
                      className="bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-3.5 py-1.5 rounded-xl cursor-pointer transition hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5"
                    >
                      <FiEye className="w-3.5 h-3.5" /> View
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    // 4. ASSESSMENTS
    if (activeSubView === 'assessments') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
<<<<<<< HEAD
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaListCheck className="w-5 h-5 text-[#3665EE]" /> Assessments & Career Readiness Control
=======
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiCheckSquare className="w-5 h-5 text-[#3665EE]" /> Assessments & Career Readiness Control
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">Manage interest assessments, psychometric tests, and aptitude evaluations</p>
            </div>
            <button 
              onClick={() => openTriggerModal("Assign Assessment", "Publish assessment to Grade batches", [
                { label: "Assessment Name", name: "name", type: "text", placeholder: "Grade 10 Aptitude Test" },
                { label: "Target Grade", name: "grade", type: "text", placeholder: "Grade 10" }
              ])}
              className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md"
            >
              <FiPlus className="w-3.5 h-3.5" /> Assign Assessment
            </button>
          </div>

          <div className="space-y-3">
            {assessmentsList.map((as, i) => (
              <div key={i} className="p-4 rounded-[20px] border bg-[#F6E6D8] border-[#EAD0BC] flex items-center justify-between text-[#12163A]">
                <div>
                  <h4 className="font-semibold text-base text-[#12163A]">{as.name}</h4>
                  <span className="text-[#3665EE] font-medium text-xs">{as.grade} • Completed: {as.completed}/{as.assigned}</span>
                </div>
                <div className="text-right">
                  <div className="text-[#12163A] font-semibold text-sm">Avg Score: {as.score}</div>
                  <button onClick={() => onShowToast(`Analyzing results for ${as.name}`)} className="text-[#3665EE] font-medium text-xs hover:underline">View Results</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 5. CAREER REPORTS
    if (activeSubView === 'reports') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
<<<<<<< HEAD
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaFileLines className="w-5 h-5 text-[#3665EE]" /> Institutional Career & AI Intelligence Reports
=======
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiFileText className="w-5 h-5 text-[#3665EE]" /> Institutional Career & AI Intelligence Reports
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">School-wide intelligence summaries, skill gap matrices, and AI recommendation distribution</p>
            </div>
<<<<<<< HEAD
            <button onClick={() => onShowToast("Generated full School Career Intelligence PDF Report")} className="bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md">
              <FaDownload className="w-3.5 h-3.5" /> Download Full PDF Report
=======
            <button onClick={() => onShowToast("Generated full School Career Intelligence PDF Report")} className="bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md">
              <FiDownload className="w-3.5 h-3.5" /> Download Full PDF Report
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Career Interest Distribution Report", desc: "68% STEM • 18% Finance • 14% Creative Arts", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
              { title: "Career DNA Summary Report", desc: "Top Trait: Investigative & Problem Solving", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
              { title: "Skill Gap & AI Recommendation Report", desc: "Top Need: Advanced Data Structures & PyTorch", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
            ].map((rp, i) => (
              <div key={i} className={`p-5 rounded-[24px] border space-y-2 cursor-pointer ${rp.bg} ${rp.border} text-[#12163A] hover-card-lift`} onClick={() => onShowToast(`Opening ${rp.title}`)}>
                <h4 className="font-semibold text-base text-[#12163A]">{rp.title}</h4>
                <p className="text-xs text-[#4B5563] font-normal">{rp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 6. EVENTS
    if (activeSubView === 'events') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
<<<<<<< HEAD
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaCalendarDays className="w-5 h-5 text-[#3665EE]" /> Career Events & Guidance Sessions
=======
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiCalendar className="w-5 h-5 text-[#3665EE]" /> Career Events & Guidance Sessions
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">Schedule and manage career workshops, college awareness, & parent guidance</p>
            </div>
            <button onClick={() => openTriggerModal("Schedule Event", "Create a new school guidance workshop", [
<<<<<<< HEAD
              { label: "Event Title", name: "title", type: "text", placeholder: "IIT Admissions Workshop" },
              { label: "Date & Time", name: "date", type: "text", placeholder: "Tomorrow, 10:00 AM" }
            ])} className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md">
              <FaPlus className="w-3.5 h-3.5" /> Schedule Event
=======
              { label: "Event Title", name: "title", type: "text", placeholder: "IIT Admissions Workshop" }
            ])} className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md">
              <FiPlus className="w-3.5 h-3.5" /> Schedule Event
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </button>
          </div>

          <div className="space-y-3">
<<<<<<< HEAD:app/components/dashboards/SchoolDashboard.tsx
<<<<<<< HEAD
            {eventsList.map((ev, i) => (
              <div key={i} className={`p-4 rounded-[20px] border flex items-center justify-between ${ev.bg} ${ev.border} text-[#12163A]`}>
                <div>
                  <h4 className="font-semibold text-base text-[#12163A]">{ev.title}</h4>
                  <span className="text-[#3665EE] font-medium text-xs">{ev.date} • {ev.attendees}</span>
                </div>
                <span className="bg-[#12163A] text-white font-medium text-xs px-3 py-1 rounded-full">Upcoming</span>
=======
            {[
              { title: "Global AI & STEM Career Workshop", date: "Live Now • 10:00 AM", attendees: "450 Students Enrolled", host: "Dr. Rajesh Verma (IIT Delhi)", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
              { title: "Parent Career Guidance Seminar", date: "Live Now • 4:00 PM", attendees: "680 Parents Enrolled", host: "Prof. Sunita Rao (AIIMS)", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
              { title: "IIT & BITS Admission Strategy Session", date: "Upcoming • Tomorrow, 11:00 AM", attendees: "320 Students Enrolled", host: "Ketan Mehta (ISI Kolkata)", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" }
            ].map((ev, i) => (
              <div key={i} className={`p-4 rounded-[20px] border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${ev.bg} ${ev.border} text-[#12163A] hover-card-lift`}>
                <div>
                  <h4 className="font-bold text-sm text-[#12163A]">{ev.title}</h4>
                  <span className="text-[#3665EE] font-semibold block sm:inline">{ev.date} • {ev.attendees}</span>
                  <div className="text-[11px] text-[#4B5563]">Host: <span className="font-bold text-[#12163A]">{ev.host}</span></div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setVideoSessionConfig({ title: ev.title, hostName: ev.host });
                      setIsVideoCallOpen(true);
                    }}
                    className="bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 text-xs shrink-0"
                  >
                    <FiVideo className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span>Join Video Call</span>
                  </button>
                </div>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
=======
            {(schoolData?.events && schoolData.events.length > 0) ? (
              schoolData.events.map((ev, i) => (
                <div key={i} className="p-4 rounded-[20px] border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#E4F4EC] border-[#C3E6D5] text-[#12163A] hover-card-lift">
                  <div>
                    <h4 className="font-bold text-sm text-[#12163A]">{ev.title}</h4>
                    <span className="text-[#3665EE] font-semibold block sm:inline">{ev.date}</span>
                    <div className="text-[11px] text-[#4B5563]">Speaker: <span className="font-bold text-[#12163A]">{ev.speaker}</span></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setVideoSessionConfig({ title: ev.title, hostName: ev.speaker });
                        setIsVideoCallOpen(true);
                      }}
                      className="bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 text-xs shrink-0"
                    >
                      <FiVideo className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <span>Join Video Call</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-xs text-slate-400">
                <FiVideo className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
                No career events or guidance sessions scheduled yet. Click '+ Schedule Event' to create a session.
>>>>>>> origin/omsai:app/components/Pages/SchoolDashboard.tsx
              </div>
            )}
          </div>
        </div>
      );
    }

    // 7. STUDENT ANALYTICS
    if (activeSubView === 'analytics') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="pb-4 border-b border-slate-100">
<<<<<<< HEAD
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
              <FaArrowTrendUp className="w-5 h-5 text-[#3665EE]" /> School-Wide Student Growth & Engagement Analytics
=======
            <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
              <FiTrendingUp className="w-5 h-5 text-[#3665EE]" /> School-Wide Student Growth & Engagement Analytics
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </h2>
            <p className="text-sm font-normal text-[#6B7280]">Institutional analytics for career readiness growth, engagement index, and skill mastery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]">
              <span className="font-medium text-[13px] text-[#4B5563]">Student Growth Rate</span>
              <div className="text-2xl lg:text-3xl font-bold text-[#12163A] mt-1">+14.2% YoY</div>
            </div>
            <div className="p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]">
              <span className="font-medium text-[13px] text-[#4B5563]">Overall Engagement Index</span>
              <div className="text-2xl lg:text-3xl font-bold text-[#3665EE] mt-1">94.8%</div>
            </div>
            <div className="p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]">
              <span className="font-medium text-[13px] text-[#4B5563]">Skill Mastery Benchmark</span>
              <div className="text-2xl lg:text-3xl font-bold text-[#12163A] mt-1">89% Advanced</div>
            </div>
          </div>
        </div>
      );
    }

    // 8. PERFORMANCE DASHBOARD
    if (activeSubView === 'performance') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="pb-4 border-b border-slate-100">
<<<<<<< HEAD
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
              <FaBrain className="w-5 h-5 text-[#3665EE]" /> Academic & Career Performance Monitoring
=======
            <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
              <FiCpu className="w-5 h-5 text-[#3665EE]" /> Academic & Career Performance Monitoring
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </h2>
            <p className="text-sm font-normal text-[#6B7280]">Grade performance, attendance tracking, and assessment score distributions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Academic Avg Score", val: "84.5%", sub: "96% Attendance Rate", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
              { title: "Assessment Score Avg", val: "88.0%", sub: "91% Completion", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
              { title: "Skill Development", val: "92.4%", sub: "Top Benchmark", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
            ].map((pf, i) => (
              <div key={i} className={`p-6 rounded-[24px] border space-y-1 ${pf.bg} ${pf.border} text-[#12163A]`}>
                <span className="font-medium text-[13px] text-[#4B5563]">{pf.title}</span>
                <div className="text-2xl lg:text-3xl font-bold text-[#12163A]">{pf.val}</div>
                <span className="text-xs font-normal text-[#4B5563]">{pf.sub}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 9. PLACEMENT REPORTS
    if (activeSubView === 'placement') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="pb-4 border-b border-slate-100">
<<<<<<< HEAD
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
              <FaBriefcase className="w-5 h-5 text-[#3665EE]" /> Placement & Internship Readiness Reports
=======
            <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
              <FiBriefcase className="w-5 h-5 text-[#3665EE]" /> Placement & Internship Readiness Reports
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
            </h2>
            <p className="text-sm font-normal text-[#6B7280]">Higher-ed placement readiness, internship qualifiers, and ATS resume ratings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-[#12163A]">
<<<<<<< HEAD:app/components/dashboards/SchoolDashboard.tsx
              <span className="font-medium text-[13px] text-[#4B5563]">Placement Ready</span>
              <div className="text-2xl font-bold text-[#12163A] mt-1">3,420 Students</div>
            </div>
            <div className="p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A]">
              <span className="font-medium text-[13px] text-[#4B5563]">Internship Ready</span>
              <div className="text-2xl font-bold text-[#3665EE] mt-1">2,980 Students</div>
            </div>
            <div className="p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A]">
              <span className="font-medium text-[13px] text-[#4B5563]">Resume ATS Verified</span>
              <div className="text-2xl font-bold text-[#12163A] mt-1">3,120 Verified</div>
            </div>
            <div className="p-5 rounded-[24px] bg-rose-50 border border-rose-200 text-rose-800">
              <span className="font-medium text-[13px] text-rose-600">Requiring Guidance</span>
              <div className="text-2xl font-bold text-rose-700 mt-1">180 Students</div>
=======
              <span className="font-semibold text-[#4B5563]">Placement Ready</span>
              <div className="text-2xl font-extrabold text-[#12163A] mt-1">{students.filter(s => s.placementReadiness?.toLowerCase().includes('high')).length} Students</div>
            </div>
            <div className="p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A]">
              <span className="font-semibold text-[#4B5563]">Internship Ready</span>
              <div className="text-2xl font-extrabold text-[#3665EE] mt-1">{students.filter(s => s.placementReadiness?.toLowerCase().includes('high') || s.placementReadiness?.toLowerCase().includes('moderate')).length} Students</div>
            </div>
            <div className="p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A]">
              <span className="font-semibold text-[#4B5563]">Resume ATS Verified</span>
              <div className="text-2xl font-extrabold text-[#12163A] mt-1">{students.filter(s => Boolean(s.resumeScore)).length} Verified</div>
            </div>
            <div className="p-5 rounded-[24px] bg-rose-50 border border-rose-200 text-rose-800">
              <span className="font-semibold text-rose-600">Requiring Guidance</span>
              <div className="text-2xl font-extrabold text-rose-700 mt-1">{students.filter(s => s.placementReadiness?.toLowerCase().includes('needs') || (Number(s.careerScore) || 0) < 80).length} Students</div>
>>>>>>> origin/omsai:app/components/Pages/SchoolDashboard.tsx
            </div>
          </div>
        </div>
      );
    }

    // 10. NOTIFICATIONS
    if (activeSubView === 'notifications') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
<<<<<<< HEAD
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaBullhorn className="w-5 h-5 text-[#3665EE]" /> School Admin Notifications & Alerts
=======
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
                <FiBell className="w-5 h-5 text-[#3665EE]" /> School Admin Notifications & Alerts
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">Assessment reminders, student milestones, scholarship deadlines</p>
            </div>
            <button onClick={() => onShowToast("Marked all notifications as read")} className="text-[#3665EE] font-medium text-sm hover:underline cursor-pointer">
              Mark All as Read
            </button>
          </div>

          <div className="space-y-3">
            {[
              { title: "Grade 10 Holland Code Assessment Completed", time: "10 mins ago", type: "Assessment Alert", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
              { title: "National STEM Scholarship Deadline Closing in 3 Days", time: "1 hour ago", type: "Scholarship Deadline", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
              { title: "Parent Career Guidance Workshop Scheduled for 15th August", time: "3 hours ago", type: "Event Reminder", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
            ].map((nt, i) => (
              <div key={i} className={`p-4 rounded-[20px] border flex items-center justify-between ${nt.bg} ${nt.border} text-[#12163A]`}>
                <div>
                  <h4 className="font-semibold text-base text-[#12163A]">{nt.title}</h4>
                  <span className="text-[#3665EE] font-medium text-xs">{nt.type} • {nt.time}</span>
                </div>
                <span className="text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium">New</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 11. SETTINGS
    return (
<<<<<<< HEAD
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
            <FaSliders className="w-5 h-5 text-[#3665EE]" /> School Governance & System Settings
          </h2>
          <p className="text-sm font-normal text-[#6B7280]">Configure school profile, academic year, grade management, and teacher permissions</p>
=======
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2 text-[#12163A]">
              <FiSliders className="w-5 h-5 text-[#3665EE]" /> School Governance & System Settings
            </h2>
            <p className="text-[#6B7280]">Configure school profile, academic year, grade management, and teacher permissions</p>
          </div>
          <button 
            onClick={() => setIsEditingSchoolProfile(true)}
            className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
          >
            <FiEdit2 className="w-3.5 h-3.5" /> Edit School Profile
          </button>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]">
<<<<<<< HEAD
            <h4 className="font-semibold text-base text-[#12163A]">School Profile & Accreditation</h4>
            <p className="text-sm font-normal text-[#4B5563]">St. Xavier's International School • Academic Year 2026-2027</p>
          </div>
          <div className="p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]">
            <h4 className="font-semibold text-base text-[#12163A]">Teacher & Admin Permissions</h4>
            <p className="text-sm font-normal text-[#4B5563]">142 Teacher Accounts • Role-Based Access Enabled</p>
=======
            <h4 className="font-bold text-sm text-[#12163A]">{schoolProfile.name}</h4>
            <p className="text-[#4B5563]">{schoolProfile.affiliation} • Principal: {schoolProfile.principal} • Academic Year {schoolProfile.year}</p>
            <div className="text-[11px] font-mono text-[#3665EE] font-bold">Admin Email: {schoolProfile.email}</div>
          </div>
          <div className="p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]">
            <h4 className="font-bold text-sm text-[#12163A]">Teacher & Admin Permissions</h4>
            <p className="text-[#4B5563]">142 Teacher Accounts • Role-Based Access Control Enabled</p>
            <div className="text-[11px] font-bold text-emerald-700">RBAC Governance Active</div>
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {renderContent()}

      {/* GLOBAL ACTION MODAL - MOUNTED AT ROOT SO IT WORKS FOR ALL SUBVIEWS & BUTTONS */}
      <ActionModal
        isOpen={isActionModalOpen}
        title={actionModalConfig.title}
        subtitle={actionModalConfig.subtitle}
        fields={actionModalConfig.fields}
        onClose={() => setIsActionModalOpen(false)}
        onSubmit={handleModalFormSubmit}
        isDarkMode={isDarkMode}
      />

      {/* TEACHER DETAILS POPUP MODAL */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 backdrop-blur-md bg-[#12163A]/70 flex items-center justify-center p-4 animate-fade-in font-sans">
          <div className="bg-white rounded-[28px] max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-scale-up text-sm font-sans">
            <div className="px-6 py-5 bg-[#12163A] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#3665EE] flex items-center justify-center font-bold text-base text-white shadow-md">
                  <FiGrid className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-white">{selectedTeacher.name}</h3>
                  <p className="text-xs text-slate-300 font-normal">{selectedTeacher.qualification}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setEditingTeacher({ ...selectedTeacher })}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md hover:scale-105 active:scale-95"
                >
                  <FiEdit2 className="w-3.5 h-3.5" /> Edit Profile
                </button>
                <button 
                  onClick={() => setSelectedTeacher(null)} 
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer text-white"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4 text-[#12163A]">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#DEE9FF] border border-[#C6D9FF]">
                  <span className="font-medium text-xs text-[#4B5563] block">Department & Subject</span>
                  <div className="font-semibold text-sm text-[#12163A] mt-0.5">{selectedTeacher.dept}</div>
                  <div className="text-xs text-[#3665EE] font-medium">{selectedTeacher.subject}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#E4F4EC] border border-[#C3E6D5]">
                  <span className="font-medium text-xs text-[#4B5563] block">Faculty Rating & Status</span>
                  <div className="font-semibold text-sm text-[#12163A] mt-0.5">{selectedTeacher.rating}</div>
                  <div className="text-xs text-emerald-700 font-medium">{selectedTeacher.experience}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F6E6D8] border border-[#EAD0BC] space-y-2">
                <h4 className="font-semibold text-base text-[#12163A]">Assigned Classes & Batches</h4>
                <div className="text-sm font-normal text-[#12163A]">{selectedTeacher.classes} • {selectedTeacher.studentsCount}</div>
                <p className="text-xs text-[#4B5563] font-normal">Official Email: <span className="font-mono text-[#3665EE] font-medium">{selectedTeacher.email}</span></p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                <h4 className="font-semibold text-base text-[#12163A]">Supervised Student Science & Career Projects</h4>
                <p className="text-sm font-normal text-[#4B5563]">{selectedTeacher.projects}</p>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button 
                  onClick={() => {
                    onShowToast(`Downloaded faculty dossier PDF for ${selectedTeacher.name}`);
                    setSelectedTeacher(null);
                  }} 
                  className="px-4 py-2.5 rounded-xl font-medium text-sm bg-[#3665EE] text-white hover:bg-[#2A54D5] transition cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <FiDownload className="w-3.5 h-3.5" /> Download Dossier PDF
                </button>
                <button 
                  onClick={() => setSelectedTeacher(null)} 
                  className="px-4 py-2.5 rounded-xl font-medium text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT STUDENT MODAL */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in font-sans">
          <div className="rounded-3xl max-w-lg w-full border shadow-2xl overflow-hidden bg-white text-[#12163A]">
            <div className="p-6 bg-[#12163A] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center">
                  <FiEdit2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Edit Student Profile</h3>
                  <p className="text-xs text-slate-300">ID: {editingStudent.id} • {editingStudent.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer text-white"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveStudentEdit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1 text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1 text-slate-700">Grade *</label>
                  <select
                    value={editingStudent.grade}
                    onChange={(e) => setEditingStudent({ ...editingStudent, grade: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 font-bold"
                  >
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1 text-slate-700">Section *</label>
                  <input
                    type="text"
                    required
                    value={editingStudent.section}
                    onChange={(e) => setEditingStudent({ ...editingStudent, section: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">Contact Email *</label>
                <input
                  type="email"
                  required
                  value={editingStudent.email}
                  onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">Target Career Goal *</label>
                <input
                  type="text"
                  required
                  value={editingStudent.careerGoal}
                  onChange={(e) => setEditingStudent({ ...editingStudent, careerGoal: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 font-bold text-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">Placement Readiness Status *</label>
                <select
                  value={editingStudent.placementReadiness}
                  onChange={(e) => setEditingStudent({ ...editingStudent, placementReadiness: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 font-bold"
                >
                  <option value="High Readiness">High Readiness</option>
                  <option value="Developing">Developing</option>
                  <option value="Needs Attention">Needs Attention</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition shadow-md cursor-pointer flex items-center gap-2"
                >
                  <FiCheck className="w-4 h-4" />
                  <span>{isSavingEdit ? 'Saving Changes...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT TEACHER MODAL */}
      {editingTeacher && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in font-sans">
          <div className="rounded-3xl max-w-lg w-full border shadow-2xl overflow-hidden bg-white text-[#12163A]">
            <div className="p-6 bg-[#12163A] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center">
                  <FiEdit2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Edit Faculty Dossier</h3>
                  <p className="text-xs text-slate-300">ID: {editingTeacher.id} • {editingTeacher.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingTeacher(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer text-white"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTeacherEdit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1 text-slate-700">Faculty Name *</label>
                <input
                  type="text"
                  required
                  value={editingTeacher.name}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1 text-slate-700">Department *</label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.dept}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, dept: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-slate-700">Subject Taught *</label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.subject}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">Qualification & Degree *</label>
                <input
                  type="text"
                  required
                  value={editingTeacher.qualification}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, qualification: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">Email Address *</label>
                <input
                  type="email"
                  required
                  value={editingTeacher.email}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">Assigned Classes *</label>
                <input
                  type="text"
                  required
                  value={editingTeacher.classes}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, classes: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 font-bold"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTeacher(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition shadow-md cursor-pointer flex items-center gap-2"
                >
                  <FiCheck className="w-4 h-4" />
                  <span>{isSavingEdit ? 'Updating Teacher...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SCHOOL PROFILE MODAL */}
      {isEditingSchoolProfile && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in font-sans">
          <div className="rounded-3xl max-w-lg w-full border shadow-2xl overflow-hidden bg-white text-[#12163A]">
            <div className="p-6 bg-[#12163A] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center">
                  <FiEdit2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Edit School Profile & Settings</h3>
                  <p className="text-xs text-slate-300">Institutional Governance & Accreditation Configuration</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingSchoolProfile(false)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer text-white"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSchoolProfile} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1 text-slate-700">School Institution Name *</label>
                <input
                  type="text"
                  required
                  value={schoolProfile.name}
                  onChange={(e) => setSchoolProfile({ ...schoolProfile, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">Affiliation & Board Code *</label>
                <input
                  type="text"
                  required
                  value={schoolProfile.affiliation}
                  onChange={(e) => setSchoolProfile({ ...schoolProfile, affiliation: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1 text-slate-700">Principal Administrator *</label>
                  <input
                    type="text"
                    required
                    value={schoolProfile.principal}
                    onChange={(e) => setSchoolProfile({ ...schoolProfile, principal: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-slate-700">Academic Year *</label>
                  <input
                    type="text"
                    required
                    value={schoolProfile.year}
                    onChange={(e) => setSchoolProfile({ ...schoolProfile, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-700">Official Admin Email Address *</label>
                <input
                  type="email"
                  required
                  value={schoolProfile.email}
                  onChange={(e) => setSchoolProfile({ ...schoolProfile, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingSchoolProfile(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition shadow-md cursor-pointer flex items-center gap-2"
                >
                  <FiCheck className="w-4 h-4" />
                  <span>{isSavingEdit ? 'Saving Profile...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REAL-TIME WEBRTC VIDEO CALL MODAL */}
      <VideoCallModal
        isOpen={isVideoCallOpen}
        sessionTitle={videoSessionConfig.title}
        hostName={videoSessionConfig.hostName}
        onClose={() => setIsVideoCallOpen(false)}
        onShowToast={onShowToast}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};
