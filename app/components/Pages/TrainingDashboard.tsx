import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  FiGrid, 
  FiBookOpen, 
  FiAward, 
  FiBriefcase, 
  FiTrendingUp,
  FiPlus,
  FiClock,
  FiUsers,
  FiUserCheck,
  FiCalendar,
  FiCheckSquare,
  FiFileText,
  FiBell,
  FiSliders,
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiCheck,
  FiAlertCircle,
  FiActivity
} from 'react-icons/fi';
import { ActionModal } from '../ActionModal';
import { StudentToolsViews } from '../StudentToolsViews';
import { 
  trainingService, 
  TrainingCourse, 
  TrainingBatch, 
  TrainingLearner, 
  TrainingTrainer, 
  TrainingEnrollment, 
  TrainingCert 
} from '../../services/trainingService';

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

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatchFilter, setSelectedBatchFilter] = useState('All');
  const [selectedLearnerModal, setSelectedLearnerModal] = useState<TrainingLearner | null>(null);

  // Modal Action State
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState<{ title: string; subtitle: string; fields: any[] }>({
    title: '',
    subtitle: '',
    fields: []
  });

  // Query live training institute data
  const { data: trainingData, isLoading } = useQuery({
    queryKey: ['trainingData'],
    queryFn: () => trainingService.getTrainingData()
  });

  const coursesList: TrainingCourse[] = trainingData?.courses || [];
  const batchesList: TrainingBatch[] = trainingData?.batches || [];
  const learnersList: TrainingLearner[] = trainingData?.learners || [];
  const trainersList: TrainingTrainer[] = trainingData?.trainers || [];
  const enrollmentsList: TrainingEnrollment[] = trainingData?.enrollments || [];
  const certificationsList: TrainingCert[] = trainingData?.certifications || [];

  // Attendance local toggle state
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, boolean>>({
    'LRN-001': true,
    'LRN-002': true,
    'LRN-003': true,
    'LRN-004': false,
    'LRN-005': true
  });

  const updateMutation = useMutation({
    mutationFn: (updates: {
      courses?: TrainingCourse[];
      batches?: TrainingBatch[];
      learners?: TrainingLearner[];
      trainers?: TrainingTrainer[];
      enrollments?: TrainingEnrollment[];
      certifications?: TrainingCert[];
    }) => trainingService.updateTrainingData(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainingData'] });
    },
    onError: () => {
      onShowToast("Unable to save changes. Please try again.");
    }
  });

  if (['discovery', 'assessment', 'psychometric', 'dna', 'ai-recommendations', 'scholarships', 'colleges', 'roadmap', 'resume-ats', 'learning'].includes(activeSubView)) {
    return <StudentToolsViews activeSubView={activeSubView} onShowToast={onShowToast} isDarkMode={isDarkMode} />;
  }

  const openTriggerModal = (title: string, subtitle: string, fields: any[]) => {
    setActionModalConfig({ title, subtitle, fields });
    setIsActionModalOpen(true);
  };

  const handleModalFormSubmit = (data: Record<string, string>) => {
    if (actionModalConfig.title === "Add New Skill Bootcamp") {
      const newCourse: TrainingCourse = {
        id: `CRS-${Math.floor(100 + Math.random() * 900)}`,
        title: data.title || "Specialized Tech Bootcamp",
        duration: data.duration || "12 Weeks",
        enrolled: "0 Trainees Enrolled",
        status: "Active Cohort",
        category: data.category || "Technology",
        modulesCount: parseInt(data.modulesCount) || 12
      };
      const updatedCourses = [newCourse, ...coursesList];
      updateMutation.mutate({ courses: updatedCourses });
      onShowToast(`Published new bootcamp: ${newCourse.title}!`);
    } else if (actionModalConfig.title === "Create Training Batch") {
      const newBatch: TrainingBatch = {
        id: `BAT-${Math.floor(200 + Math.random() * 800)}`,
        name: data.name || "Specialized Batch 2026",
        course: data.course || (coursesList[0]?.title || "Full-Stack Web Dev"),
        trainer: data.trainer || "Senior Faculty",
        timing: data.timing || "Mon-Fri 10:00 - 13:00",
        startDate: data.startDate || "2026-04-01",
        enrolled: 0,
        capacity: parseInt(data.capacity) || 40,
        status: 'Upcoming'
      };
      const updatedBatches = [newBatch, ...batchesList];
      updateMutation.mutate({ batches: updatedBatches });
      onShowToast(`Created new training cohort: ${newBatch.name}!`);
    } else if (actionModalConfig.title === "Onboard Trainer") {
      const newTrainer: TrainingTrainer = {
        id: `TRN-${Math.floor(10 + Math.random() * 90)}`,
        name: data.name || "Instructor Name",
        email: data.email || "trainer@institute.edu",
        specialization: data.specialization || "Software Architecture",
        batches: data.batches || "New Cohort Assigned",
        rating: 5.0,
        status: 'Active'
      };
      const updatedTrainers = [newTrainer, ...trainersList];
      updateMutation.mutate({ trainers: updatedTrainers });
      onShowToast(`Onboarded trainer: ${newTrainer.name}!`);
    } else if (actionModalConfig.title === "Issue Certificate") {
      const newCert: TrainingCert = {
        id: `CRT-${Math.floor(1000 + Math.random() * 9000)}`,
        name: data.name || "Accredited Industry Credential",
        recipient: data.recipient || "Trainee Name",
        body: "Role Ready Certification Council",
        validity: "Lifetime",
        issueDate: new Date().toISOString().split('T')[0],
        status: 'Verified'
      };
      const updatedCerts = [newCert, ...certificationsList];
      updateMutation.mutate({ certifications: updatedCerts });
      onShowToast(`Issued digital certificate to ${newCert.recipient}!`);
    }
    setIsActionModalOpen(false);
  };

  const cardClass = isDarkMode
    ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
    : 'bg-white border-blue-100 text-slate-900 shadow-sm';

  const subCardClass = isDarkMode
    ? 'bg-slate-800/80 border-slate-700/80 text-white'
    : 'bg-blue-50/40 border-blue-100 text-slate-900';

  const textMuted = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const textHeading = isDarkMode ? 'text-white' : 'text-slate-900';
  const borderDivider = isDarkMode ? 'border-slate-800' : 'border-slate-100';

  // 1. COURSES / PROGRAMS
  if (activeSubView === 'courses') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiBookOpen className="w-5 h-5 text-blue-500" /> Skill Courses & Curriculum Tracks
            </h2>
            <p className={textMuted}>Industry bootcamps, certification tracks, and training curricula</p>
          </div>
          <button 
            onClick={() => openTriggerModal("Add New Skill Bootcamp", "Publish an accredited skill certification curriculum track", [
              { label: "Bootcamp Course Title", name: "title", type: "text", placeholder: "e.g. Data Engineering & Analytics" },
              { label: "Duration", name: "duration", type: "text", placeholder: "e.g. 10 Weeks" },
              { label: "Category", name: "category", type: "text", placeholder: "e.g. Cloud & AI" },
              { label: "Total Modules", name: "modulesCount", type: "number", placeholder: "14" }
            ])} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            <FiPlus className="w-4 h-4" /> Add New Course
          </button>
        </div>

        {coursesList.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            <FiBookOpen className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
            No skill bootcamps published yet. Click '+ Add New Course' to launch a track.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coursesList.map((c, i) => (
              <div key={i} className={`p-4 rounded-xl border space-y-3 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast(`Opened curriculum details for ${c.title}`)}>
                <div className="flex items-start justify-between">
                  <div className={`font-bold text-sm ${textHeading}`}>{c.title}</div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                    {c.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-[11px]">
                  <FiClock className="w-3.5 h-3.5" /> {c.duration} • {c.enrolled}
                </div>
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-700/20">
                  <span className={textMuted}>{c.category || 'Technology'}</span>
                  <span className="text-blue-500 font-bold">{c.modulesCount || 12} Modules</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <ActionModal
          isOpen={isActionModalOpen}
          title={actionModalConfig.title}
          subtitle={actionModalConfig.subtitle}
          fields={actionModalConfig.fields}
          onClose={() => setIsActionModalOpen(false)}
          onSubmit={handleModalFormSubmit}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  // 2. BATCHES / COHORTS
  if (activeSubView === 'batches') {
    const filteredBatches = selectedBatchFilter === 'All' 
      ? batchesList 
      : batchesList.filter(b => b.status === selectedBatchFilter);

    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiCalendar className="w-5 h-5 text-blue-500" /> Batches & Cohorts Management
            </h2>
            <p className={textMuted}>Manage active learner cohorts, schedules, trainer assignments, and capacities</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-800/20 p-1 rounded-xl border border-slate-700/30">
              {['All', 'Active', 'Upcoming', 'Completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedBatchFilter(status)}
                  className={`px-3 py-1 rounded-lg font-semibold text-xs transition cursor-pointer ${
                    selectedBatchFilter === status
                      ? 'bg-blue-600 text-white shadow-sm'
                      : textMuted
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <button 
              onClick={() => openTriggerModal("Create Training Batch", "Launch a new cohort for scheduled training", [
                { label: "Batch Name", name: "name", type: "text", placeholder: "e.g. Full-Stack Sprint Cohort 2" },
                { label: "Associated Course", name: "course", type: "text", placeholder: "e.g. Full-Stack Web Development" },
                { label: "Assigned Trainer", name: "trainer", type: "text", placeholder: "e.g. Dr. Ramesh Sundaram" },
                { label: "Schedule Timing", name: "timing", type: "text", placeholder: "e.g. Mon-Fri 09:00 - 12:00" },
                { label: "Learner Capacity", name: "capacity", type: "number", placeholder: "40" },
                { label: "Start Date", name: "startDate", type: "date", placeholder: "" }
              ])} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-500/20"
            >
              <FiPlus className="w-4 h-4" /> Create Batch
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBatches.map((b) => {
            const fillPct = Math.round((b.enrolled / b.capacity) * 100);
            return (
              <div key={b.id} className={`p-5 rounded-2xl border space-y-3 transition hover:shadow-md hover:border-blue-500 ${subCardClass}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`font-bold text-sm ${textHeading}`}>{b.name}</h3>
                    <div className="text-blue-400 font-semibold mt-0.5">{b.course}</div>
                  </div>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                    b.status === 'Active'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : b.status === 'Upcoming'
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                  }`}>
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>
                    <span className={textMuted}>Trainer:</span> <span className="font-semibold">{b.trainer}</span>
                  </div>
                  <div>
                    <span className={textMuted}>Timing:</span> <span className="font-semibold">{b.timing}</span>
                  </div>
                  <div>
                    <span className={textMuted}>Start Date:</span> <span className="font-semibold">{b.startDate}</span>
                  </div>
                  <div>
                    <span className={textMuted}>Enrolled:</span> <span className="font-semibold">{b.enrolled} / {b.capacity}</span>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px]">
                    <span className={textMuted}>Cohort Seat Utilization</span>
                    <span className="font-bold text-blue-400">{fillPct}%</span>
                  </div>
                  <div className="w-full bg-slate-700/30 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${Math.min(100, fillPct)}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-700/20">
                  <button 
                    onClick={() => onShowToast(`Viewing attendance roster for ${b.name}`)}
                    className="px-3 py-1.5 rounded-lg border border-slate-600/40 hover:border-blue-500 text-xs font-semibold transition cursor-pointer"
                  >
                    Attendance
                  </button>
                  <button 
                    onClick={() => onShowToast(`Managing batch details for ${b.name}`)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition cursor-pointer"
                  >
                    Manage Cohort
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <ActionModal
          isOpen={isActionModalOpen}
          title={actionModalConfig.title}
          subtitle={actionModalConfig.subtitle}
          fields={actionModalConfig.fields}
          onClose={() => setIsActionModalOpen(false)}
          onSubmit={handleModalFormSubmit}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  // 3. LEARNERS / STUDENTS
  if (activeSubView === 'learners') {
    const filteredLearners = learnersList.filter(l => 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiUsers className="w-5 h-5 text-blue-500" /> Enrolled Learners & Trainees Roster
            </h2>
            <p className={textMuted}>{learnersList.length} active trainees tracking attendance, performance, and certification</p>
          </div>
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search learners or courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border focus:outline-none focus:border-blue-500 ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b ${borderDivider} text-[11px] ${textMuted}`}>
                <th className="pb-3 font-semibold">Trainee Name</th>
                <th className="pb-3 font-semibold">Enrolled Course</th>
                <th className="pb-3 font-semibold">Batch</th>
                <th className="pb-3 font-semibold text-center">Attendance</th>
                <th className="pb-3 font-semibold text-center">Assessment Score</th>
                <th className="pb-3 font-semibold text-center">Certificate Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/20">
              {filteredLearners.map((learner) => (
                <tr key={learner.id} className="hover:bg-slate-800/10 transition">
                  <td className="py-3.5">
                    <div className={`font-bold ${textHeading}`}>{learner.name}</div>
                    <div className={`text-[10px] ${textMuted}`}>{learner.email}</div>
                  </td>
                  <td className="py-3.5 font-medium">{learner.course}</td>
                  <td className="py-3.5 text-blue-400 font-semibold">{learner.batch}</td>
                  <td className="py-3.5 text-center">
                    <span className={`font-bold ${learner.attendance >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {learner.attendance}%
                    </span>
                  </td>
                  <td className="py-3.5 text-center">
                    <span className="font-bold text-blue-500">{learner.score} / 100</span>
                  </td>
                  <td className="py-3.5 text-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                      learner.certStatus === 'Issued'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : learner.certStatus === 'Pending'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }`}>
                      {learner.certStatus}
                    </span>
                  </td>
                  <td className="py-3.5 text-right space-x-2">
                    <button
                      onClick={() => setSelectedLearnerModal(learner)}
                      className="px-2.5 py-1 rounded-lg border border-slate-600/40 hover:border-blue-500 text-[11px] font-semibold transition cursor-pointer"
                    >
                      Details
                    </button>
                    {learner.certStatus !== 'Issued' && (
                      <button
                        onClick={() => {
                          openTriggerModal("Issue Certificate", `Grant official completion credential to ${learner.name}`, [
                            { label: "Credential Title", name: "name", type: "text", placeholder: `${learner.course} Professional Certificate` },
                            { label: "Recipient Name", name: "recipient", type: "text", placeholder: learner.name }
                          ]);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition cursor-pointer"
                      >
                        Issue Cert
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedLearnerModal && (
          <div className="fixed inset-0 z-50 backdrop-blur-md bg-slate-950/70 flex items-center justify-center p-4">
            <div className={`max-w-md w-full rounded-2xl border p-6 space-y-4 shadow-2xl ${cardClass}`}>
              <div className="flex items-center justify-between border-b pb-3 border-slate-700/40">
                <h3 className={`text-base font-bold ${textHeading}`}>Learner Profile Summary</h3>
                <button onClick={() => setSelectedLearnerModal(null)} className="text-slate-400 hover:text-white text-lg font-bold">×</button>
              </div>
              <div className="space-y-2 text-xs">
                <div><span className={textMuted}>Name:</span> <span className="font-bold">{selectedLearnerModal.name}</span></div>
                <div><span className={textMuted}>Email:</span> <span className="font-bold">{selectedLearnerModal.email}</span></div>
                <div><span className={textMuted}>Course:</span> <span className="font-bold text-blue-400">{selectedLearnerModal.course}</span></div>
                <div><span className={textMuted}>Batch:</span> <span className="font-bold">{selectedLearnerModal.batch}</span></div>
                <div><span className={textMuted}>Attendance:</span> <span className="font-bold text-emerald-400">{selectedLearnerModal.attendance}%</span></div>
                <div><span className={textMuted}>Assessment Score:</span> <span className="font-bold text-blue-500">{selectedLearnerModal.score}/100</span></div>
                <div><span className={textMuted}>Certificate:</span> <span className="font-bold">{selectedLearnerModal.certStatus}</span></div>
              </div>
              <div className="pt-3 border-t border-slate-700/40 flex justify-end">
                <button onClick={() => setSelectedLearnerModal(null)} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs">Close</button>
              </div>
            </div>
          </div>
        )}

        <ActionModal
          isOpen={isActionModalOpen}
          title={actionModalConfig.title}
          subtitle={actionModalConfig.subtitle}
          fields={actionModalConfig.fields}
          onClose={() => setIsActionModalOpen(false)}
          onSubmit={handleModalFormSubmit}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  // 4. TRAINERS / FACULTY
  if (activeSubView === 'trainers') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiUserCheck className="w-5 h-5 text-blue-500" /> Trainers & Certified Faculty
            </h2>
            <p className={textMuted}>Manage technical instructors, curriculum architects, and mentors</p>
          </div>
          <button 
            onClick={() => openTriggerModal("Onboard Trainer", "Register a new certified instructor or technical trainer", [
              { label: "Instructor Full Name", name: "name", type: "text", placeholder: "e.g. Dr. Rajesh Verma" },
              { label: "Work Email", name: "email", type: "email", placeholder: "e.g. r.verma@institute.edu" },
              { label: "Specialization", name: "specialization", type: "text", placeholder: "e.g. Cloud Security & AWS" },
              { label: "Assigned Batches", name: "batches", type: "text", placeholder: "e.g. Cloud & DevOps Weekend" }
            ])} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            <FiPlus className="w-4 h-4" /> Onboard Trainer
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trainersList.map((t) => (
            <div key={t.id} className={`p-5 rounded-2xl border space-y-3 transition hover:shadow-md hover:border-blue-500 ${subCardClass}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`font-bold text-sm ${textHeading}`}>{t.name}</h3>
                  <div className="text-blue-400 font-semibold mt-0.5">{t.specialization}</div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                  ★ {t.rating} Rating
                </span>
              </div>
              <div className="text-[11px] space-y-1">
                <div><span className={textMuted}>Email:</span> <span className="font-mono text-blue-500">{t.email}</span></div>
                <div><span className={textMuted}>Batches:</span> <span className="font-semibold">{t.batches}</span></div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-700/20">
                <button 
                  onClick={() => onShowToast(`Assigned schedule updated for ${t.name}`)}
                  className="px-3 py-1.5 rounded-lg border border-slate-600/40 hover:border-blue-500 text-xs font-semibold transition cursor-pointer"
                >
                  View Schedule
                </button>
                <button 
                  onClick={() => onShowToast(`Contacting trainer ${t.name}`)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </div>
          ))}
        </div>

        <ActionModal
          isOpen={isActionModalOpen}
          title={actionModalConfig.title}
          subtitle={actionModalConfig.subtitle}
          fields={actionModalConfig.fields}
          onClose={() => setIsActionModalOpen(false)}
          onSubmit={handleModalFormSubmit}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  // 5. ENROLLMENTS
  if (activeSubView === 'enrollments') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiFileText className="w-5 h-5 text-blue-500" /> Course Enrollments & Applications
            </h2>
            <p className={textMuted}>Trainee applications, admission verification, and fee payment statuses</p>
          </div>
          <button 
            onClick={() => onShowToast("Exporting enrollment records...")}
            className="px-3 py-2 rounded-xl border border-slate-600/40 hover:border-blue-500 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <FiDownload className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>

        <div className="space-y-3">
          {enrollmentsList.map((enr) => (
            <div key={enr.id} className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${subCardClass}`}>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className={`font-bold text-sm ${textHeading}`}>{enr.learnerName}</h4>
                  <span className="text-[10px] font-mono text-slate-400">({enr.id})</span>
                </div>
                <div className="text-blue-400 font-semibold text-[11px] mt-0.5">{enr.course} • {enr.batch}</div>
                <div className={`text-[10px] ${textMuted} mt-0.5`}>Applied on {enr.date} • {enr.email}</div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${
                  enr.paymentStatus === 'Paid'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : enr.paymentStatus === 'Partial'
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                }`}>
                  Payment: {enr.paymentStatus}
                </span>

                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${
                  enr.status === 'Approved'
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    : 'bg-slate-500/20 text-slate-300 border-slate-500/30'
                }`}>
                  {enr.status}
                </span>

                {enr.status !== 'Approved' && (
                  <button
                    onClick={() => {
                      const updated = enrollmentsList.map(e => e.id === enr.id ? { ...e, status: 'Approved' as const } : e);
                      updateMutation.mutate({ enrollments: updated });
                      onShowToast(`Approved enrollment for ${enr.learnerName}!`);
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition cursor-pointer"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 6. ATTENDANCE
  if (activeSubView === 'attendance') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiCheckSquare className="w-5 h-5 text-blue-500" /> Batch Attendance & Class Presence
            </h2>
            <p className={textMuted}>Daily class roll-call, presence logs, and cohort attendance statistics</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-blue-400">Date: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <button 
              onClick={() => onShowToast("Attendance recorded and synchronized successfully!")}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <FiCheck className="w-4 h-4" /> Save Attendance
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className={`p-4 rounded-xl border ${subCardClass}`}>
            <span className={textMuted}>Total Trainees</span>
            <div className="text-xl font-bold text-blue-400 mt-1">{learnersList.length}</div>
          </div>
          <div className={`p-4 rounded-xl border ${subCardClass}`}>
            <span className={textMuted}>Present Today</span>
            <div className="text-xl font-bold text-emerald-400 mt-1">
              {Object.values(attendanceRecords).filter(Boolean).length}
            </div>
          </div>
          <div className={`p-4 rounded-xl border ${subCardClass}`}>
            <span className={textMuted}>Cohort Attendance Rate</span>
            <div className="text-xl font-bold text-blue-500 mt-1">94%</div>
          </div>
        </div>

        <div className="space-y-2">
          {learnersList.map((learner) => {
            const isPresent = attendanceRecords[learner.id] ?? true;
            return (
              <div key={learner.id} className={`p-3.5 rounded-xl border flex items-center justify-between transition ${subCardClass}`}>
                <div>
                  <h4 className={`font-bold text-sm ${textHeading}`}>{learner.name}</h4>
                  <span className={`text-[11px] ${textMuted}`}>{learner.batch} • {learner.email}</span>
                </div>
                <button
                  onClick={() => {
                    setAttendanceRecords(prev => ({ ...prev, [learner.id]: !isPresent }));
                    onShowToast(`Marked ${learner.name} as ${!isPresent ? 'Present' : 'Absent'}`);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                    isPresent
                      ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600/30'
                      : 'bg-rose-600/20 text-rose-400 border border-rose-500/40 hover:bg-rose-600/30'
                  }`}
                >
                  {isPresent ? <FiCheck className="w-3.5 h-3.5" /> : null}
                  {isPresent ? 'Present' : 'Absent'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 7. PROGRESS TRACKING
  if (activeSubView === 'progress') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`pb-4 border-b ${borderDivider}`}>
          <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
            <FiTrendingUp className="w-5 h-5 text-blue-500" /> Learner Milestone & Skill Progress Tracking
          </h2>
          <p className={textMuted}>Curriculum module completion, coding lab submissions, and mock interview readiness</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Overall Curriculum Completion", val: "78%", sub: "+12% this month" },
            { label: "Hands-on Lab Projects Submitted", val: "340", sub: "92% evaluation rate" },
            { label: "Average Skill Assessment Score", val: "89/100", sub: "Industry benchmark met" },
            { label: "Placement Ready Trainees", val: "54", sub: "Interview scheduled" }
          ].map((stat, i) => (
            <div key={i} className={`p-4 rounded-xl border space-y-1 ${subCardClass}`}>
              <span className={`text-[11px] ${textMuted}`}>{stat.label}</span>
              <div className="text-2xl font-bold text-blue-400">{stat.val}</div>
              <span className="text-[10px] text-emerald-400 font-semibold">{stat.sub}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4 pt-2">
          <h3 className={`font-bold text-sm ${textHeading}`}>Batch-wise Milestone Completion</h3>
          {batchesList.slice(0, 3).map((b, i) => (
            <div key={i} className={`p-4 rounded-xl border space-y-2 ${subCardClass}`}>
              <div className="flex justify-between font-bold">
                <span className={textHeading}>{b.name}</span>
                <span className="text-blue-400">{70 + i * 10}% Completed</span>
              </div>
              <div className="w-full bg-slate-700/30 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${70 + i * 10}%` }} />
              </div>
              <div className="flex justify-between text-[10px]">
                <span className={textMuted}>Modules: 10 / 14 Completed</span>
                <span className="text-emerald-400 font-semibold">On Track</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 8. CERTIFICATES / CERTS
  if (activeSubView === 'certificates' || activeSubView === 'certs') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiAward className="w-5 h-5 text-blue-500" /> Certifications & Digital Credentials Registry
            </h2>
            <p className={textMuted}>Industry-accredited credentials issued upon program and capstone completion</p>
          </div>
          <button 
            onClick={() => openTriggerModal("Issue Certificate", "Publish and issue an official credential to a trainee", [
              { label: "Credential Title", name: "name", type: "text", placeholder: "e.g. Certified Full-Stack Engineer" },
              { label: "Recipient Name", name: "recipient", type: "text", placeholder: "e.g. Aditya Sharma" }
            ])} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            <FiPlus className="w-4 h-4" /> Issue Certificate
          </button>
        </div>

        {certificationsList.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            <FiAward className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" />
            No digital credentials issued yet. Click '+ Issue Certificate' to grant an award.
          </div>
        ) : (
          <div className="space-y-3">
            {certificationsList.map((ct) => (
              <div key={ct.id} className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast(`Verifying certificate ${ct.name}`)}>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className={`font-bold text-sm ${textHeading}`}>{ct.name}</h4>
                    <span className="text-[10px] font-mono text-slate-400">({ct.id})</span>
                  </div>
                  <span className="text-blue-400 font-semibold">{ct.recipient} • {ct.body}</span>
                  <div className={`text-[10px] ${textMuted} mt-0.5`}>Issued: {ct.issueDate} • Validity: {ct.validity}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 text-[10px] bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">
                    {ct.status}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowToast(`Downloading credential PDF for ${ct.recipient}`);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-600/40 hover:border-blue-500 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <FiDownload className="w-3.5 h-3.5" /> PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <ActionModal
          isOpen={isActionModalOpen}
          title={actionModalConfig.title}
          subtitle={actionModalConfig.subtitle}
          fields={actionModalConfig.fields}
          onClose={() => setIsActionModalOpen(false)}
          onSubmit={handleModalFormSubmit}
          isDarkMode={isDarkMode}
        />
      </div>
    );
  }

  // 9. REPORTS
  if (activeSubView === 'reports') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiFileText className="w-5 h-5 text-blue-500" /> Training Analytics & Performance Reports
            </h2>
            <p className={textMuted}>Institutional completion audits, placement rates, and curriculum outcome reports</p>
          </div>
          <button 
            onClick={() => onShowToast("Downloading comprehensive quarterly report...")}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md"
          >
            <FiDownload className="w-4 h-4" /> Download Performance Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-5 rounded-xl border space-y-2 ${subCardClass}`}>
            <span className={`text-[11px] font-semibold ${textMuted}`}>Cohort Completion Rate</span>
            <div className="text-3xl font-bold text-blue-400">92.4%</div>
            <p className={`text-[10px] ${textMuted}`}>Trainees who completed all lab assignments & capstone</p>
          </div>
          <div className={`p-5 rounded-xl border space-y-2 ${subCardClass}`}>
            <span className={`text-[11px] font-semibold ${textMuted}`}>Certification Exam Pass Rate</span>
            <div className="text-3xl font-bold text-emerald-400">88.7%</div>
            <p className={`text-[10px] ${textMuted}`}>First-attempt clearance rate on accredited assessments</p>
          </div>
          <div className={`p-5 rounded-xl border space-y-2 ${subCardClass}`}>
            <span className={`text-[11px] font-semibold ${textMuted}`}>Placement Conversion Rate</span>
            <div className="text-3xl font-bold text-blue-500">81.0%</div>
            <p className={`text-[10px] ${textMuted}`}>Trainees hired by corporate partners within 90 days</p>
          </div>
        </div>
      </div>
    );
  }

  // 10. NOTIFICATIONS
  if (activeSubView === 'notifications') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiBell className="w-5 h-5 text-blue-500" /> Notifications & Academy Alerts
            </h2>
            <p className={textMuted}>Batch kickoffs, certification approvals, and enrollment updates</p>
          </div>
          <button onClick={() => onShowToast("Marked all notifications as read")} className="text-blue-400 font-bold hover:underline cursor-pointer">
            Mark All as Read
          </button>
        </div>

        <div className="space-y-3">
          {[
            { title: "New Batch Kickoff: Full-Stack Web Dev Q1 starts this Monday", time: "25 mins ago", tag: "Batch Alert" },
            { title: "3 Trainees cleared the Cloud & DevOps Final Certification Exam", time: "2 hours ago", tag: "Assessment" },
            { title: "New Enrollment Application received from Deepa Kulkarni", time: "5 hours ago", tag: "Enrollment" }
          ].map((nt, i) => (
            <div key={i} className={`p-4 rounded-xl border flex items-center justify-between ${subCardClass}`}>
              <div>
                <h4 className={`font-bold ${textHeading}`}>{nt.title}</h4>
                <span className="text-blue-400 font-semibold">{nt.tag} • {nt.time}</span>
              </div>
              <span className="text-[10px] bg-blue-600/20 text-blue-400 px-2.5 py-0.5 rounded-full font-bold border border-blue-500/30">New</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 11. SETTINGS
  if (activeSubView === 'settings') {
    return (
      <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
        <div className={`flex items-center justify-between pb-4 border-b ${borderDivider}`}>
          <div>
            <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
              <FiSliders className="w-5 h-5 text-blue-500" /> Training Institute Governance & Settings
            </h2>
            <p className={textMuted}>Configure institute accreditation profile, default cohort limits, and LMS synchronization</p>
          </div>
          <button 
            onClick={() => onShowToast("Training institute settings saved successfully!")}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
          >
            Save Settings
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-5 rounded-xl border space-y-2 ${subCardClass}`}>
            <h4 className={`font-bold text-sm ${textHeading}`}>Institute Accreditation</h4>
            <p className={textMuted}>National Skill Council Accredited Center • Code: TI-98421</p>
            <div className="text-[11px] font-mono text-blue-400 font-bold">LMS Sync: Active</div>
          </div>
          <div className={`p-5 rounded-xl border space-y-2 ${subCardClass}`}>
            <h4 className={`font-bold text-sm ${textHeading}`}>Default Cohort Limits</h4>
            <p className={textMuted}>Maximum 50 Trainees per Batch • Minimum Attendance Threshold: 80%</p>
            <div className="text-[11px] font-bold text-emerald-400">Rules Applied to All Bootcamps</div>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT: OVERVIEW / DASHBOARD
  return (
    <div className={`rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`}>
      <div className={`pb-4 border-b ${borderDivider}`}>
        <h2 className={`text-lg font-bold flex items-center gap-2 ${textHeading}`}>
          <FiGrid className="w-5 h-5 text-blue-500" /> Training Institute Portal Overview
        </h2>
        <p className={textMuted}>Skill bootcamps, certified trainees, scheduled cohorts, and placement conversion tracks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Courses")}>
          <span className={`font-semibold block ${textMuted}`}>Active Courses</span>
          <div className="text-2xl font-bold text-blue-400 mt-1">{coursesList.length}</div>
          <span className={`text-[10px] ${textMuted}`}>{coursesList.length > 0 ? 'Live Bootcamps' : 'No active bootcamps'}</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Batches")}>
          <span className={`font-semibold block ${textMuted}`}>Active Batches</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{batchesList.filter(b => b.status === 'Active').length}</div>
          <span className={`text-[10px] ${textMuted}`}>{batchesList.length} Total Cohorts</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Learners")}>
          <span className={`font-semibold block ${textMuted}`}>Enrolled Learners</span>
          <div className="text-2xl font-bold text-blue-400 mt-1">{learnersList.length}</div>
          <span className={`text-[10px] ${textMuted}`}>Across All Tracks</span>
        </div>

        <div className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`} onClick={() => onShowToast("Viewing Digital Certifications")}>
          <span className={`font-semibold block ${textMuted}`}>Digital Credentials</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{certificationsList.length}</div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-bold">
            <FiTrendingUp className="w-3 h-3" /> Industry Accredited
          </span>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className={`font-bold text-sm ${textHeading}`}>Active Cohorts & Batches</h3>
          <span className={`text-[11px] ${textMuted}`}>{batchesList.length} Batches Running</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {batchesList.slice(0, 4).map((batch) => (
            <div key={batch.id} className={`p-4 rounded-xl border space-y-2 ${subCardClass}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={`font-bold ${textHeading}`}>{batch.name}</h4>
                  <div className="text-blue-400 text-[11px] font-semibold">{batch.course}</div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                  {batch.status}
                </span>
              </div>
              <div className="flex justify-between text-[11px] pt-1">
                <span className={textMuted}>Trainer: {batch.trainer}</span>
                <span className="font-semibold text-blue-500">{batch.enrolled} / {batch.capacity} Enrolled</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

