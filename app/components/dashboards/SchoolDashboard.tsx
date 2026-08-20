import React, { useState } from 'react';
import { 
  FaChartPie, 
  FaUsers, 
  FaChalkboardUser, 
  FaListCheck, 
  FaFileLines, 
  FaCalendarDays, 
  FaArrowTrendUp, 
  FaBrain, 
  FaBriefcase, 
  FaBullhorn, 
  FaSliders, 
  FaPlus, 
  FaMagnifyingGlass, 
  FaFilter, 
  FaDownload, 
  FaEye, 
  FaCheck, 
  FaXmark, 
  FaAward, 
  FaGraduationCap, 
  FaBookOpen, 
  FaStar, 
  FaCircleExclamation, 
  FaUserCheck 
} from 'react-icons/fa6';
import { ActionModal } from '../ActionModal';

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
  // State for Student Roster & Student Details Modal (School Admin View)
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<any | null>(null);
  const [studentDetailTab, setStudentDetailTab] = useState<string>('overview');
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState<{ title: string; subtitle: string; fields: any[] }>({
    title: '',
    subtitle: '',
    fields: []
  });

  const [teachersList, setTeachersList] = useState([
    {
      id: "TCH-201",
      name: "Dr. Rajesh Verma",
      qualification: "Ph.D. Computer Science & AI (IIT Delhi)",
      dept: "Computer Science & AI",
      subject: "Artificial Intelligence & Machine Learning",
      classes: "Grade 11-A, 12-A",
      studentsCount: "120 Students Assigned",
      experience: "14 Years Teaching Experience",
      email: "rajesh.verma@dpsrkp.edu.in",
      rating: "4.9 / 5.0 (Master Faculty)",
      projects: "18 AI Science Exhibition Projects Supervised"
    },
    {
      id: "TCH-202",
      name: "Prof. Sunita Rao",
      qualification: "M.Sc Biotech & Molecular Genetics (AIIMS)",
      dept: "Science & Biotech",
      subject: "Biology & Genetics",
      classes: "Grade 11-B, 12-B",
      studentsCount: "115 Students Assigned",
      experience: "11 Years Teaching Experience",
      email: "sunita.rao@dpsrkp.edu.in",
      rating: "4.8 / 5.0 (Senior Mentor)",
      projects: "14 Bio-Informatics Research Cohorts"
    },
    {
      id: "TCH-203",
      name: "Ketan Mehta",
      qualification: "M.Tech Financial Mathematics (ISI Kolkata)",
      dept: "Mathematics & Fintech",
      subject: "Advanced Stochastics & Calculus",
      classes: "Grade 12-C",
      studentsCount: "90 Students Assigned",
      experience: "9 Years Teaching Experience",
      email: "ketan.mehta@dpsrkp.edu.in",
      rating: "4.9 / 5.0 (Math Specialist)",
      projects: "12 Algorithmic Trading Simulations"
    }
  ]);

  const cardClass = isDarkMode
    ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
    : 'bg-white border-blue-100 text-slate-900 shadow-sm';

  const subCardClass = isDarkMode
    ? 'bg-slate-800/80 border-slate-700/80 text-white'
    : 'bg-slate-50/80 border-blue-100 text-slate-900 shadow-2xs';

  const textMuted = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const textHeading = isDarkMode ? 'text-white' : 'text-slate-900';
  const borderDivider = isDarkMode ? 'border-slate-800' : 'border-slate-100';

  // Sample School Students Data State
  const [students, setStudents] = useState([
    {
      id: "STU-8801",
      name: "Aarav Sharma",
      grade: "Grade 12",
      section: "Section A",
      careerScore: 94,
      assessmentStatus: "Completed (4/4)",
      careerDnaStatus: "RIE Verified",
      learningProgress: "88%",
      skillProgress: "92%",
      resumeScore: "88/100",
      placementReadiness: "High Readiness",
      status: "Active",
      email: "aarav.sharma@school.edu",
      careerGoal: "AI & Neural Systems Engineer",
      hollandCode: "RIE (Realistic • Investigative • Enterprising)",
      topSkills: ["Python", "PyTorch", "System Design"],
      topCollege: "IIT Bombay",
      topScholarship: "National STEM Leadership Aid (₹3.5L/yr)"
    },
    {
      id: "STU-8802",
      name: "Ananya Roy",
      grade: "Grade 11",
      section: "Section B",
      careerScore: 91,
      assessmentStatus: "Completed (4/4)",
      careerDnaStatus: "ISA Verified",
      learningProgress: "92%",
      skillProgress: "89%",
      resumeScore: "85/100",
      placementReadiness: "High Readiness",
      status: "Active",
      email: "ananya.roy@school.edu",
      careerGoal: "Biotechnology Researcher",
      hollandCode: "ISA (Investigative • Social • Artistic)",
      topSkills: ["Genomics", "R", "Cell Culture"],
      topCollege: "BITS Pilani",
      topScholarship: "Global Innovation Grant (₹2.0L/yr)"
    },
    {
      id: "STU-8803",
      name: "Karan Patel",
      grade: "Grade 12",
      section: "Section C",
      careerScore: 86,
      assessmentStatus: "Completed (3/4)",
      careerDnaStatus: "EAS Verified",
      learningProgress: "78%",
      skillProgress: "82%",
      resumeScore: "79/100",
      placementReadiness: "Moderate Readiness",
      status: "Active",
      email: "karan.patel@school.edu",
      careerGoal: "Fintech Analyst",
      hollandCode: "EAS (Enterprising • Artistic • Social)",
      topSkills: ["Financial Modeling", "Excel", "Python"],
      topCollege: "IIIT Hyderabad",
      topScholarship: "State Higher Ed Grant (₹1.5L/yr)"
    },
    {
      id: "STU-8804",
      name: "Riya Sen",
      grade: "Grade 10",
      section: "Section A",
      careerScore: 89,
      assessmentStatus: "Completed (4/4)",
      careerDnaStatus: "ART Verified",
      learningProgress: "84%",
      skillProgress: "86%",
      resumeScore: "82/100",
      placementReadiness: "High Readiness",
      status: "Active",
      email: "riya.sen@school.edu",
      careerGoal: "UI/UX Product Designer",
      hollandCode: "ART (Artistic • Realistic • Technical)",
      topSkills: ["Figma", "User Research", "Prototyping"],
      topCollege: "NID Ahmedabad",
      topScholarship: "Creative Merit Scholarship (₹1.8L/yr)"
    },
    {
      id: "STU-8805",
      name: "Devansh Verma",
      grade: "Grade 9",
      section: "Section B",
      careerScore: 78,
      assessmentStatus: "Pending (2/4)",
      careerDnaStatus: "In Progress",
      learningProgress: "65%",
      skillProgress: "70%",
      resumeScore: "70/100",
      placementReadiness: "Needs Attention",
      status: "Active",
      email: "devansh.v@school.edu",
      careerGoal: "Robotics Technician",
      hollandCode: "RIC (Realistic • Investigative • Conventional)",
      topSkills: ["C++", "Arduino", "3D Modeling"],
      topCollege: "DTU Delhi",
      topScholarship: "State Talent Search Aid (₹1.0L/yr)"
    },
    {
      id: "STU-8806",
      name: "Priya Sharma",
      grade: "Grade 8",
      section: "Section A",
      careerScore: 82,
      assessmentStatus: "Completed (4/4)",
      careerDnaStatus: "SIA Verified",
      learningProgress: "80%",
      skillProgress: "78%",
      resumeScore: "75/100",
      placementReadiness: "Developing",
      status: "Active",
      email: "priya.s@school.edu",
      careerGoal: "Environmental Scientist",
      hollandCode: "SIA (Social • Investigative • Artistic)",
      topSkills: ["Data Collection", "Public Speaking", "Biology"],
      topCollege: "St. Xavier's College",
      topScholarship: "Green Earth Fellowship (₹1.2L/yr)"
    }
  ]);

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

      setStudents(prev => [newStudent, ...prev]);
      onShowToast(`Successfully onboarded student: ${newStudent.name} (${newStudent.grade})!`);
    } else if (actionModalConfig.title === "Add Teacher") {
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
    } else {
      onShowToast(`Action completed: ${actionModalConfig.title}`);
    }
    setIsActionModalOpen(false);
  };

  const renderContent = () => {
    // 1. DASHBOARD OVERVIEW
    if (activeSubView === 'overview') {
      return (
        <div className="space-y-6 font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-[24px] bg-[#12163A] text-white shadow-md border border-[#12163A] space-y-2 hover-card-lift">
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
            </div>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-semibold text-base text-[#12163A]">Grade Enrolment & Career DNA Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm">
            <div className="p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] border border-[#C6D9FF] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-base text-[#12163A]">Learning Progress</h4>
                <span className="font-semibold text-sm text-[#3665EE]">86.4% Avg</span>
              </div>
              <p className="text-sm font-normal text-[#4B5563]">Course completion rates across AI, STEM, & Skill tracks</p>
              <div className="w-full h-2.5 bg-white/80 rounded-full overflow-hidden">
                <div className="h-full bg-[#3665EE] rounded-full" style={{ width: '86%' }} />
              </div>
            </div>

            <div className="p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] border border-[#EAD0BC] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-base text-[#12163A]">Students Requiring Attention</h4>
                <span className="font-medium text-xs text-[#12163A] bg-[#12163A]/10 px-2.5 py-0.5 rounded-full">42 Students</span>
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
                <h4 className="font-semibold text-base text-[#12163A]">Placement Readiness</h4>
                <span className="font-semibold text-sm text-[#12163A]">78% Placement Ready</span>
              </div>
              <p className="text-sm font-normal text-[#4B5563]">Grade 11 & 12 students qualified for internships & admissions</p>
              <div className="w-full h-2.5 bg-white/80 rounded-full overflow-hidden">
                <div className="h-full bg-[#3665EE] rounded-full" style={{ width: '78%' }} />
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
                <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                  <FaUsers className="w-5 h-5 text-[#3665EE]" /> Student Roster (Grades 8 - 12)
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
                  <FaPlus className="w-3.5 h-3.5" /> Onboard Student Batch
                </button>
                <button 
                  onClick={() => onShowToast("Exported Grade Roster to CSV")}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200 bg-slate-50 text-[#12163A] hover:bg-slate-100 transition cursor-pointer flex items-center gap-2"
                >
                  <FaDownload className="w-3.5 h-3.5" /> Export CSV
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
                <tbody className="divide-y divide-[#C6D9FF]/60 text-sm font-normal">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-[#DEE9FF]/30 transition-colors">
                      <td className="p-3.5 font-medium text-[#12163A]">
                        <div>{s.name} ({s.grade} - {s.section})</div>
                        <div className="text-xs font-normal text-[#6B7280]">{s.email}</div>
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
                        <button
                          onClick={() => setSelectedStudent(s)}
                          className="bg-[#12163A] hover:bg-[#1A2050] text-white font-medium px-3 py-1.5 rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5 ml-auto hover:scale-105 active:scale-95"
                        >
                          <FaEye className="w-3.5 h-3.5" /> View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
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
                  <button 
                    onClick={() => setSelectedStudent(null)} 
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer text-white"
                  >
                    <FaXmark className="w-4 h-4" />
                  </button>
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
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaChalkboardUser className="w-5 h-5 text-[#3665EE]" /> Teacher & Faculty Management
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">142 Registered school teachers & career mentors across departments</p>
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
              <FaPlus className="w-3.5 h-3.5" /> Add Teacher
            </button>
          </div>

          <div className="space-y-3">
            {teachersList.map((t, i) => (
              <div key={i} className="p-4 rounded-[20px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] transition-all hover:shadow-md">
                <div>
                  <h4 className="font-semibold text-base text-[#12163A]">{t.name}</h4>
                  <span className="text-[#3665EE] font-medium text-xs">{t.dept} • {t.subject}</span>
                  <div className="text-xs text-[#4B5563] font-normal">{t.classes} • Assigned: {t.studentsCount}</div>
                </div>
                <button 
                  onClick={() => setSelectedTeacher(t)}
                  className="bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-xs px-3.5 py-1.5 rounded-xl cursor-pointer transition hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5"
                >
                  <FaEye className="w-3.5 h-3.5" /> View Teacher
                </button>
              </div>
            ))}
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
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaListCheck className="w-5 h-5 text-[#3665EE]" /> Assessments & Career Readiness Control
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
              <FaPlus className="w-3.5 h-3.5" /> Assign Assessment
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
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaFileLines className="w-5 h-5 text-[#3665EE]" /> Institutional Career & AI Intelligence Reports
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">School-wide intelligence summaries, skill gap matrices, and AI recommendation distribution</p>
            </div>
            <button onClick={() => onShowToast("Generated full School Career Intelligence PDF Report")} className="bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md">
              <FaDownload className="w-3.5 h-3.5" /> Download Full PDF Report
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
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaCalendarDays className="w-5 h-5 text-[#3665EE]" /> Career Events & Guidance Sessions
              </h2>
              <p className="text-sm font-normal text-[#6B7280]">Schedule and manage career workshops, college awareness, & parent guidance</p>
            </div>
            <button onClick={() => openTriggerModal("Schedule Event", "Create a new school guidance workshop", [
              { label: "Event Title", name: "title", type: "text", placeholder: "IIT Admissions Workshop" },
              { label: "Date & Time", name: "date", type: "text", placeholder: "Tomorrow, 10:00 AM" }
            ])} className="bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md">
              <FaPlus className="w-3.5 h-3.5" /> Schedule Event
            </button>
          </div>

          <div className="space-y-3">
            {eventsList.map((ev, i) => (
              <div key={i} className={`p-4 rounded-[20px] border flex items-center justify-between ${ev.bg} ${ev.border} text-[#12163A]`}>
                <div>
                  <h4 className="font-semibold text-base text-[#12163A]">{ev.title}</h4>
                  <span className="text-[#3665EE] font-medium text-xs">{ev.date} • {ev.attendees}</span>
                </div>
                <span className="bg-[#12163A] text-white font-medium text-xs px-3 py-1 rounded-full">Upcoming</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 7. STUDENT ANALYTICS
    if (activeSubView === 'analytics') {
      return (
        <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
              <FaArrowTrendUp className="w-5 h-5 text-[#3665EE]" /> School-Wide Student Growth & Engagement Analytics
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
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
              <FaBrain className="w-5 h-5 text-[#3665EE]" /> Academic & Career Performance Monitoring
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
            <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
              <FaBriefcase className="w-5 h-5 text-[#3665EE]" /> Placement & Internship Readiness Reports
            </h2>
            <p className="text-sm font-normal text-[#6B7280]">Higher-ed placement readiness, internship qualifiers, and ATS resume ratings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-[#12163A]">
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
              <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
                <FaBullhorn className="w-5 h-5 text-[#3665EE]" /> School Admin Notifications & Alerts
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
      <div className="rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#12163A]">
            <FaSliders className="w-5 h-5 text-[#3665EE]" /> School Governance & System Settings
          </h2>
          <p className="text-sm font-normal text-[#6B7280]">Configure school profile, academic year, grade management, and teacher permissions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]">
            <h4 className="font-semibold text-base text-[#12163A]">School Profile & Accreditation</h4>
            <p className="text-sm font-normal text-[#4B5563]">St. Xavier's International School • Academic Year 2026-2027</p>
          </div>
          <div className="p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]">
            <h4 className="font-semibold text-base text-[#12163A]">Teacher & Admin Permissions</h4>
            <p className="text-sm font-normal text-[#4B5563]">142 Teacher Accounts • Role-Based Access Enabled</p>
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
                  <FaChalkboardUser className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-white">{selectedTeacher.name}</h3>
                  <p className="text-xs text-slate-300 font-normal">{selectedTeacher.qualification}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTeacher(null)} 
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer text-white"
              >
                <FaXmark className="w-4 h-4" />
              </button>
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
                  <FaDownload className="w-3.5 h-3.5" /> Download Dossier PDF
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
    </div>
  );
};
