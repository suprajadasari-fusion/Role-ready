var _a;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, Meta, Links, ScrollRestoration, Scripts, redirect, useNavigate, useParams, useLocation } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect, useRef, useMemo } from "react";
import { QueryClient, QueryClientProvider, useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector, Provider } from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { FaCircleCheck, FaCompass, FaWandMagicSparkles, FaShieldHalved, FaEnvelope, FaMobileScreen, FaSchool, FaGraduationCap, FaUserCheck, FaChalkboardUser, FaBriefcase, FaBuilding, FaLock, FaEyeSlash, FaEye, FaKey, FaArrowRight, FaXmark, FaChartPie, FaFileLines, FaMagnifyingGlass, FaBrain, FaCalendarDays, FaAward, FaBullhorn, FaBookOpen, FaHandshake, FaUsers, FaVideo, FaWallet, FaSliders, FaListCheck, FaArrowTrendUp, FaFileCode, FaUser, FaRightFromBracket, FaBars, FaSun, FaMoon, FaBell, FaDownload, FaPlus, FaStar, FaIndianRupeeSign, FaClock, FaFire, FaMoneyBillWave, FaFilter, FaLocationDot, FaPaperPlane, FaUsersGear, FaCheck, FaCircleExclamation, FaPlay, FaRotateRight, FaMicrophone, FaBookmark, FaRegBookmark, FaTrash, FaArrowRightToBracket, FaFloppyDisk, FaUpload, FaBuildingUser, FaLandmark } from "react-icons/fa6";
import { UserPlus, X, Key, Edit3, Save, Sparkles, Plus, ShieldCheck, Minimize2, Maximize2, Monitor, Volume2, VideoOff, MicOff, Mic, Video, MessageSquare, PhoneOff, FileText, CheckCircle2, Send, Building2, School, GraduationCap, UserCheck, BookOpen, Briefcase, Globe, Clock, ExternalLink, Power, Trash2, Sliders, Brain, Download } from "lucide-react";
import { z } from "zod";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const initialUser = {
  id: "usr-student-01",
  name: "Alex Rivera",
  email: "alex.rivera@student.role-ready.ai",
  role: "student",
  institution: "IIT Delhi / Class of 2026",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  token: "mock-jwt-token-role-ready-2026"
};
const initialState$8 = {
  user: initialUser,
  isAuthenticated: true,
  isLoading: false,
  error: null
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState$8,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.setItem("role_ready_auth_user", JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("role_ready_auth_user");
      }
    },
    setWorkspaceRole: (state, action) => {
      if (state.user) {
        state.user.role = action.payload;
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});
const { setLoading, loginSuccess, logout, setWorkspaceRole, setError } = authSlice.actions;
const authReducer = authSlice.reducer;
const initialState$7 = {
  name: "Alex Rivera",
  email: "alex.rivera@student.role-ready.ai",
  phone: "+91 98765 43210",
  bio: "Passionate AI Systems student & Fullstack engineer focused on neural recommendation models, React, and Python MLOps.",
  gradeOrDegree: "B.Tech Computer Science & AI (Final Year)",
  institution: "Indian Institute of Technology (IIT) Delhi",
  targetCareer: "AI & Machine Learning Architect",
  gpa: "9.4 / 10.0",
  skills: ["Python", "PyTorch", "React 19", "TypeScript", "Redux Toolkit", "FastAPI", "AWS Cloud"],
  resumeUploaded: true,
  resumeFileName: "Alex_Rivera_AI_Architect_Resume_2026.pdf",
  preferredWorkLocation: "Bengaluru / Hyderabad / Remote"
};
const profileSlice = createSlice({
  name: "profile",
  initialState: initialState$7,
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    addSkill: (state, action) => {
      if (!state.skills.includes(action.payload)) {
        state.skills.push(action.payload);
      }
    },
    removeSkill: (state, action) => {
      state.skills = state.skills.filter((s) => s !== action.payload);
    },
    setResumeFile: (state, action) => {
      state.resumeUploaded = action.payload.uploaded;
      state.resumeFileName = action.payload.fileName;
    }
  }
});
const { updateProfile, addSkill, removeSkill, setResumeFile } = profileSlice.actions;
const profileReducer = profileSlice.reducer;
const initialItems = [
  {
    id: "notif-1",
    title: "AI Interview Practice Ready",
    message: 'Your AI Mock Interview for "Junior AI Architect" is generated.',
    category: "interview",
    timestamp: "10 mins ago",
    isRead: false,
    actionUrl: "/interview-ai"
  },
  {
    id: "notif-2",
    title: "High AI Fit Job Posting (96%)",
    message: 'NeuralCorp AI Labs posted "Junior AI & Deep Learning Engineer".',
    category: "jobs",
    timestamp: "1 hour ago",
    isRead: false,
    actionUrl: "/jobs"
  },
  {
    id: "notif-3",
    title: "Scholarship Application Update",
    message: "Stage 1 verified for National STEM Fellowship grant.",
    category: "scholarship",
    timestamp: "3 hours ago",
    isRead: true,
    actionUrl: "/scholarships"
  },
  {
    id: "notif-4",
    title: "14-Day Study Streak Badge",
    message: "You earned the Study Streak Gold Badge in Learning Center.",
    category: "learning",
    timestamp: "Yesterday",
    isRead: true,
    actionUrl: "/learning-center"
  }
];
const initialState$6 = {
  items: initialItems,
  unreadCount: initialItems.filter((i) => !i.isRead).length
};
const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState$6,
  reducers: {
    setNotifications: (state, action) => {
      state.items = action.payload;
      state.unreadCount = action.payload.filter((i) => !i.isRead).length;
    },
    markAsRead: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && !item.isRead) {
        item.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach((i) => {
        i.isRead = true;
      });
      state.unreadCount = 0;
    },
    addNotification: (state, action) => {
      const newNotif = {
        ...action.payload,
        id: `notif-${Date.now()}`,
        timestamp: "Just now",
        isRead: false
      };
      state.items.unshift(newNotif);
      state.unreadCount += 1;
    },
    clearAllNotifications: (state) => {
      state.items = [];
      state.unreadCount = 0;
    }
  }
});
const { setNotifications, markAsRead, markAllAsRead, addNotification, clearAllNotifications } = notificationsSlice.actions;
const notificationsReducer = notificationsSlice.reducer;
const initialState$5 = {
  jobsList: [
    {
      id: "job-101",
      title: "Junior AI & Deep Learning Engineer",
      company: "NeuralCorp AI Labs",
      location: "Bengaluru / Remote",
      salary: "₹14.0 - ₹24.0 LPA",
      experience: "0 - 2 Yrs",
      type: "Full-time",
      matchScore: 96,
      tags: ["Python", "PyTorch", "Transformers", "LLMs"],
      description: "Design and deploy neural recommendation pipelines and multi-modal transformers for enterprise clients.",
      postedDate: "2 days ago"
    },
    {
      id: "job-102",
      title: "Fullstack React & Node.js Developer",
      company: "Apex Cloud Solutions",
      location: "Hyderabad, AP",
      salary: "₹12.0 - ₹18.0 LPA",
      experience: "0 - 1 Yrs",
      type: "Full-time",
      matchScore: 92,
      tags: ["React", "TypeScript", "Redux", "Tailwind"],
      description: "Build high-performance micro-frontend applications with real-time state management and accessible UI components.",
      postedDate: "1 day ago"
    },
    {
      id: "job-103",
      title: "Quantitative Data Science Intern",
      company: "Quantum Wealth Analytics",
      location: "Mumbai, MH",
      salary: "₹45,000 / mo",
      experience: "Internship",
      type: "Internship",
      matchScore: 89,
      tags: ["Python", "Pandas", "Stochastics", "Algorithmic Trading"],
      description: "Collaborate with quantitative researchers to develop statistical arbitrage models and risk engines.",
      postedDate: "3 days ago"
    }
  ],
  savedJobIds: ["job-101"],
  appliedJobIds: [],
  searchQuery: "",
  selectedCategory: "All"
};
const jobsSlice = createSlice({
  name: "jobs",
  initialState: initialState$5,
  reducers: {
    setJobs: (state, action) => {
      state.jobsList = action.payload;
    },
    addJobPosting: (state, action) => {
      state.jobsList.unshift(action.payload);
    },
    toggleSaveJob: (state, action) => {
      const jobId = action.payload;
      if (state.savedJobIds.includes(jobId)) {
        state.savedJobIds = state.savedJobIds.filter((id) => id !== jobId);
      } else {
        state.savedJobIds.push(jobId);
      }
    },
    applyToJob: (state, action) => {
      if (!state.appliedJobIds.includes(action.payload)) {
        state.appliedJobIds.push(action.payload);
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  }
});
const { setJobs, addJobPosting, toggleSaveJob, applyToJob, setSearchQuery, setSelectedCategory: setSelectedCategory$1 } = jobsSlice.actions;
const jobsReducer = jobsSlice.reducer;
const initialState$4 = {
  items: [
    {
      id: "sch-01",
      name: "National STEM Excellence Fellowship 2026",
      provider: "Ministry of Science & Technology",
      amount: "₹2,50,000 / year",
      deadline: "April 30, 2026",
      eligibility: "GPA >= 8.5, Science/Tech Stream",
      fitScore: 96,
      category: "Merit",
      description: "Full tuition funding and annual research grant for high-achieving STEM students across India."
    },
    {
      id: "sch-02",
      name: "Women in AI & Future Tech Leaders Grant",
      provider: "Global Tech Foundation",
      amount: "₹1,80,000 / year",
      deadline: "May 15, 2026",
      eligibility: "Female STEM undergraduates",
      fitScore: 92,
      category: "STEM",
      description: "Dedicated merit-cum-need fellowship program supporting female developers and research engineers."
    },
    {
      id: "sch-03",
      name: "Central Equity & Merit Education Grant",
      provider: "Central Board of Education Desk",
      amount: "₹1,00,000 / year",
      deadline: "May 01, 2026",
      eligibility: "Income < ₹6.0 LPA",
      fitScore: 90,
      category: "Equity",
      description: "Financial assistance for meritorious students pursuing professional engineering and degree tracks."
    }
  ],
  appliedIds: ["sch-01"],
  selectedCategory: "All"
};
const scholarshipsSlice = createSlice({
  name: "scholarships",
  initialState: initialState$4,
  reducers: {
    setScholarships: (state, action) => {
      state.items = action.payload;
    },
    applyScholarship: (state, action) => {
      if (!state.appliedIds.includes(action.payload)) {
        state.appliedIds.push(action.payload);
      }
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  }
});
const { setScholarships, applyScholarship, setSelectedCategory } = scholarshipsSlice.actions;
const scholarshipsReducer = scholarshipsSlice.reducer;
const initialState$3 = {
  courses: [
    {
      id: "crs-1",
      title: "Mastering Fullstack React 19 & Redux Toolkit",
      instructor: "Dr. Anita Rao",
      category: "Web Architecture",
      progress: 85,
      totalModules: 12,
      completedModules: 10,
      certBadge: "React Architect Certified",
      duration: "18 Hours",
      rating: 4.9
    },
    {
      id: "crs-2",
      title: "Neural Networks, PyTorch & LLM Fine-Tuning",
      instructor: "Prof. Vikram Malhotra",
      category: "AI & Data Science",
      progress: 92,
      totalModules: 15,
      completedModules: 14,
      certBadge: "AI Deep Learning Spec",
      duration: "24 Hours",
      rating: 4.95
    },
    {
      id: "crs-3",
      title: "Data Structures, Algorithms & System Design",
      instructor: "Karan Sharma",
      category: "Computer Science Core",
      progress: 60,
      totalModules: 20,
      completedModules: 12,
      certBadge: "AlgoExpert Specialist",
      duration: "30 Hours",
      rating: 4.85
    }
  ],
  streakDays: 14,
  lastStudiedDate: "2026-08-20",
  selectedCourseId: "crs-1"
};
const learningSlice = createSlice({
  name: "learning",
  initialState: initialState$3,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    updateCourseProgress: (state, action) => {
      const course = state.courses.find((c) => c.id === action.payload.courseId);
      if (course) {
        course.progress = action.payload.progress;
        course.completedModules = action.payload.completedModules;
      }
    },
    incrementStreak: (state) => {
      state.streakDays += 1;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourseId = action.payload;
    }
  }
});
const { setCourses, updateCourseProgress, incrementStreak, setSelectedCourse } = learningSlice.actions;
const learningReducer = learningSlice.reducer;
const initialState$2 = {
  targetRole: "AI & Machine Learning Architect",
  activeQuestionIndex: 0,
  questions: [
    "Explain how attention mechanisms function in Transformer architectures and why multi-head attention outperforms single-head attention.",
    "How do you address gradient vanishing or explosion issues in deep neural networks during long sequence training?",
    "Describe your strategy for evaluating MLOps pipeline latency and optimizing LLM inference throughput in production.",
    "Walk through an end-to-end design of a real-time recommendation engine handling 100,000 requests per second."
  ],
  userAnswers: {},
  isCompleted: false,
  overallScore: 88,
  feedbacks: []
};
const interviewSlice = createSlice({
  name: "interview",
  initialState: initialState$2,
  reducers: {
    setTargetRole: (state, action) => {
      state.targetRole = action.payload;
    },
    saveAnswer: (state, action) => {
      state.userAnswers[action.payload.index] = action.payload.answer;
    },
    nextQuestion: (state) => {
      if (state.activeQuestionIndex < state.questions.length - 1) {
        state.activeQuestionIndex += 1;
      }
    },
    prevQuestion: (state) => {
      if (state.activeQuestionIndex > 0) {
        state.activeQuestionIndex -= 1;
      }
    },
    completeSession: (state, action) => {
      state.isCompleted = true;
      state.overallScore = action.payload.score;
      state.feedbacks = action.payload.feedbacks;
    },
    resetSession: (state) => {
      state.activeQuestionIndex = 0;
      state.userAnswers = {};
      state.isCompleted = false;
      state.feedbacks = [];
    }
  }
});
const { setTargetRole, saveAnswer, nextQuestion, prevQuestion, completeSession, resetSession } = interviewSlice.actions;
const interviewReducer = interviewSlice.reducer;
const initialState$1 = {
  fullName: "Alex Rivera",
  email: "alex.rivera@student.role-ready.ai",
  phone: "+91 98765 43210",
  location: "New Delhi, India",
  linkedin: "https://linkedin.com/in/alexrivera-ai",
  github: "https://github.com/alexrivera-ai",
  summary: "Results-driven AI & Fullstack Systems candidate with expertise in React 19, Redux Toolkit, Python, PyTorch, and cloud microservices. Proven track record building real-time career intelligence interfaces and neural matchers.",
  education: [
    {
      id: "edu-1",
      institution: "Indian Institute of Technology (IIT) Delhi",
      degree: "B.Tech Computer Science & Artificial Intelligence",
      year: "2022 - 2026",
      score: "CGPA: 9.4 / 10.0"
    }
  ],
  experience: [
    {
      id: "exp-1",
      company: "NeuralCorp AI Labs",
      role: "AI Systems Engineering Intern",
      duration: "May 2025 - Aug 2025",
      description: "Architected high-throughput transformer inference backend serving 50k+ daily users. Reduced P99 latency by 35% using PyTorch JIT compilation."
    }
  ],
  skills: "React 19, Redux Toolkit, TypeScript, Tailwind CSS, Python, PyTorch, FastAPI, AWS, Docker, Kubernetes",
  atsScore: 92,
  atsFeedback: [
    "✓ Formatting compliance: 100% Parser compatible",
    "✓ Keyword density match: High (React, Redux, PyTorch, Cloud)",
    "✓ Action verbs impact: Excellent metric descriptions",
    "💡 Tip: Add target certifications (e.g. AWS Certified Developer) for +5 score boost"
  ]
};
const resumeSlice = createSlice({
  name: "resume",
  initialState: initialState$1,
  reducers: {
    updateContactInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    setEducation: (state, action) => {
      state.education = action.payload;
    },
    setExperience: (state, action) => {
      state.experience = action.payload;
    },
    runAtsScan: (state) => {
      state.atsScore = Math.min(98, state.atsScore + 4);
      state.atsFeedback = [
        "✓ Formatting compliance: 100% Parser compatible",
        "✓ Keyword density match: Optimal for Senior/Junior AI Engineer roles",
        "✓ Action verbs & quantifiable metrics present in experience bullets",
        "✨ Verified ATS Ready for direct corporate submission!"
      ];
    }
  }
});
const { updateContactInfo, setEducation, setExperience, runAtsScan } = resumeSlice.actions;
const resumeReducer = resumeSlice.reducer;
const initialState = {
  isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
  lastSyncedTimestamp: Date.now(),
  syncQueueCount: 0
};
const offlineSlice = createSlice({
  name: "offline",
  initialState,
  reducers: {
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
      if (action.payload) {
        state.lastSyncedTimestamp = Date.now();
        state.syncQueueCount = 0;
      }
    },
    addToSyncQueue: (state) => {
      state.syncQueueCount += 1;
    }
  }
});
const { setOnlineStatus, addToSyncQueue } = offlineSlice.actions;
const offlineReducer = offlineSlice.reducer;
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    notifications: notificationsReducer,
    jobs: jobsReducer,
    scholarships: scholarshipsReducer,
    learning: learningReducer,
    interview: interviewReducer,
    resume: resumeReducer,
    offline: offlineReducer
  }
});
const useAppDispatch = () => useDispatch();
const useAppSelector = useSelector;
const CACHE_PREFIX = "role_ready_offline_";
const offlineCache = {
  /**
   * Save data into offline cache
   */
  set: (key, data) => {
    if (typeof window === "undefined") return;
    try {
      const entry2 = {
        timestamp: Date.now(),
        data
      };
      localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry2));
    } catch (err) {
      console.warn("Offline cache storage quota exceeded or failed:", err);
    }
  },
  /**
   * Retrieve cached data
   */
  get: (key, maxAgeMs = 1e3 * 60 * 60 * 24) => {
    if (typeof window === "undefined") return null;
    try {
      const item = localStorage.getItem(`${CACHE_PREFIX}${key}`);
      if (!item) return null;
      const entry2 = JSON.parse(item);
      const isExpired = Date.now() - entry2.timestamp > maxAgeMs;
      if (isExpired) {
        localStorage.removeItem(`${CACHE_PREFIX}${key}`);
        return null;
      }
      return entry2.data;
    } catch (err) {
      console.warn("Failed to parse offline cache:", err);
      return null;
    }
  },
  /**
   * Clear offline cache for a key or all keys
   */
  clear: (key) => {
    if (typeof window === "undefined") return;
    if (key) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
    } else {
      Object.keys(localStorage).forEach((k) => {
        if (k.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(k);
        }
      });
    }
  },
  /**
   * Register PWA Service Worker for offline static asset caching
   */
  registerServiceWorker: () => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then((reg) => {
          console.log("Role Ready Service Worker registered:", reg.scope);
        }).catch((err) => {
          console.warn("Service Worker registration failed:", err);
        });
      });
    }
  }
};
const stylesheet = "/assets/app-hkPL-Zca.css";
function links() {
  return [{
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  }, {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  }, {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }, {
    rel: "stylesheet",
    href: stylesheet
  }, {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
  }];
}
function GlobalOfflineNotifier() {
  const dispatch = useAppDispatch();
  const isOnline = useAppSelector((state) => state.offline.isOnline);
  useEffect(() => {
    offlineCache.registerServiceWorker();
    const handleOnline = () => dispatch(setOnlineStatus(true));
    const handleOffline = () => dispatch(setOnlineStatus(false));
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dispatch]);
  if (isOnline) return null;
  return /* @__PURE__ */ jsxs("div", {
    role: "alert",
    "aria-live": "assertive",
    className: "bg-amber-500 text-slate-950 font-medium text-xs px-4 py-2 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-md",
    children: [/* @__PURE__ */ jsx("span", {
      className: "w-2 h-2 rounded-full bg-slate-950 animate-ping"
    }), /* @__PURE__ */ jsx("span", {
      children: "You are currently in Offline Mode. Showing cached data from local store."
    })]
  });
}
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx("title", {
        children: "Role Ready | Multi-Role AI Career Intelligence Platform"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "bg-slate-50 text-slate-900 font-sans antialiased",
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1e3 * 60 * 5,
        refetchOnWindowFocus: false
      }
    }
  }));
  return /* @__PURE__ */ jsx(Provider, {
    store,
    children: /* @__PURE__ */ jsxs(QueryClientProvider, {
      client: queryClient,
      children: [/* @__PURE__ */ jsx(GlobalOfflineNotifier, {}), /* @__PURE__ */ jsx(Outlet, {})]
    })
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function loader() {
  return redirect("/login");
}
const _index = UNSAFE_withComponentProps(function Index() {
  return null;
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _index,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const login = UNSAFE_withComponentProps(function LoginRoute() {
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState("super-admin");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const demoAccounts = [{
    role: "super-admin",
    label: "Super Admin",
    email: "admin@roleready.ai",
    password: "Super#Admin2026!",
    phone: "+91 98111 22233",
    icon: FaShieldHalved
  }, {
    role: "school",
    label: "School Admin",
    email: "principal@dpsrkp.edu.in",
    password: "School#DPS2026!",
    phone: "+91 98222 33344",
    icon: FaSchool
  }, {
    role: "college",
    label: "College Placement",
    email: "placements@iitb.ac.in",
    password: "IITB#College2026!",
    phone: "+91 98333 44455",
    icon: FaGraduationCap
  }, {
    role: "mentor",
    label: "Mentor Counselor",
    email: "r.sharma@careerguider.org",
    password: "Mentor#Sharma2026!",
    phone: "+91 98444 55566",
    icon: FaUserCheck
  }, {
    role: "training",
    label: "Training Institute",
    email: "director@apexskill.org",
    password: "Apex#Training2026!",
    phone: "+91 98555 66677",
    icon: FaChalkboardUser
  }, {
    role: "recruiter",
    label: "Talent Recruiter",
    email: "priya_v@infosys.com",
    password: "Infosys#Recruit2026!",
    phone: "+91 98666 77788",
    icon: FaBriefcase
  }, {
    role: "company",
    label: "Enterprise Company",
    email: "careers@tcs.com",
    password: "TCS#Enterprise2026!",
    phone: "+91 98777 88899",
    icon: FaBuilding
  }];
  const handleSelectDemo = (acc) => {
    setSelectedRole(acc.role);
    setEmail(acc.email);
    setPassword(acc.password);
    setPhoneNumber(acc.phone);
    setOtpCode("849201");
    setOtpSent(true);
    setToastMessage(`Auto-filled demo credentials for ${acc.label}`);
    setTimeout(() => setToastMessage(null), 3e3);
  };
  const handleSendOtp = () => {
    if (!phoneNumber) {
      setToastMessage("Please enter a mobile phone number.");
      setTimeout(() => setToastMessage(null), 3e3);
      return;
    }
    setOtpSent(true);
    setOtpCode("849201");
    setToastMessage(`SMS Verification OTP dispatched to ${phoneNumber}! (Demo OTP: 849201)`);
    setTimeout(() => setToastMessage(null), 4e3);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (authMethod === "email" && !email) {
      setToastMessage("Please enter an official email address.");
      setTimeout(() => setToastMessage(null), 3e3);
      return;
    }
    if (authMethod === "otp" && (!phoneNumber || !otpCode)) {
      setToastMessage("Please enter phone number and 6-digit OTP code.");
      setTimeout(() => setToastMessage(null), 3e3);
      return;
    }
    setIsLoading(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("rr_active_role", selectedRole);
    }
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/${selectedRole}`);
    }, 600);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans",
    children: [/* @__PURE__ */ jsx("div", {
      className: "absolute -top-32 -left-32 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
    }), toastMessage && /* @__PURE__ */ jsxs("div", {
      className: "fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-bounce max-w-md",
      children: [/* @__PURE__ */ jsx(FaCircleCheck, {
        className: "w-4 h-4 text-emerald-400 shrink-0"
      }), /* @__PURE__ */ jsx("span", {
        children: toastMessage
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "max-w-5xl w-full bg-white rounded-3xl border border-blue-100 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "lg:col-span-5 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden",
        children: [/* @__PURE__ */ jsx("div", {
          className: "absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-3 mb-8",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 shadow-lg",
              children: /* @__PURE__ */ jsx(FaCompass, {
                className: "w-7 h-7"
              })
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("h1", {
                className: "font-extrabold text-2xl tracking-tight text-white",
                children: "Role Ready"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-[11px] font-semibold text-blue-200 tracking-wide uppercase",
                children: "AI Career Intelligence"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold",
              children: [/* @__PURE__ */ jsx(FaWandMagicSparkles, {
                className: "w-3.5 h-3.5 text-blue-300"
              }), " Authentication & Authorization"]
            }), /* @__PURE__ */ jsx("h2", {
              className: "text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight text-white",
              children: "Multi-Channel Secure Access Portal"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-blue-100/80 leading-relaxed",
              children: "Log in seamlessly via Email Password or Mobile OTP verification."
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-8 pt-6 border-t border-blue-500/20 text-xs text-blue-200/80 space-y-2",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2",
            children: [/* @__PURE__ */ jsx(FaShieldHalved, {
              className: "w-4 h-4 text-emerald-400"
            }), /* @__PURE__ */ jsx("span", {
              children: "Role-Based Access Control (RBAC) Active"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2",
            children: [/* @__PURE__ */ jsx(FaCircleCheck, {
              className: "w-4 h-4 text-emerald-400"
            }), /* @__PURE__ */ jsx("span", {
              children: "Multi-Factor Mobile OTP & SSL Encrypted"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "lg:col-span-7 p-8 lg:p-10 flex flex-col justify-between",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between mb-6",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("h2", {
                className: "text-xl font-extrabold text-slate-900",
                children: "Sign In to Your Workspace"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-xs text-slate-500 mt-1",
                children: "Select authentication method & workspace role to proceed"
              })]
            }), /* @__PURE__ */ jsx("span", {
              className: "text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100",
              children: "v2.4 Secure Login"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mb-5 p-1 bg-slate-100 rounded-2xl flex gap-1 border border-slate-200",
            children: [/* @__PURE__ */ jsxs("button", {
              type: "button",
              onClick: () => setAuthMethod("email"),
              className: `flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${authMethod === "email" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`,
              children: [/* @__PURE__ */ jsx(FaEnvelope, {
                className: "w-3.5 h-3.5"
              }), /* @__PURE__ */ jsx("span", {
                children: "Email Login"
              })]
            }), /* @__PURE__ */ jsxs("button", {
              type: "button",
              onClick: () => setAuthMethod("otp"),
              className: `flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${authMethod === "otp" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`,
              children: [/* @__PURE__ */ jsx(FaMobileScreen, {
                className: "w-3.5 h-3.5"
              }), /* @__PURE__ */ jsx("span", {
                children: "Mobile OTP"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mb-5",
            children: [/* @__PURE__ */ jsx("label", {
              className: "block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2",
              children: "Quick Demo Role Selector"
            }), /* @__PURE__ */ jsx("div", {
              className: "grid grid-cols-2 sm:grid-cols-4 gap-2",
              children: demoAccounts.map((acc) => {
                const Icon = acc.icon;
                const isSelected = selectedRole === acc.role;
                return /* @__PURE__ */ jsxs("button", {
                  type: "button",
                  onClick: () => handleSelectDemo(acc),
                  className: `p-2.5 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${isSelected ? "bg-blue-50 border-blue-500 text-blue-700 shadow-xs" : "bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-blue-50/40 hover:border-blue-200"}`,
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex items-center justify-between mb-1",
                    children: [/* @__PURE__ */ jsx(Icon, {
                      className: `w-4 h-4 ${isSelected ? "text-blue-600" : "text-slate-500"}`
                    }), isSelected && /* @__PURE__ */ jsx(FaCircleCheck, {
                      className: "w-3.5 h-3.5 text-blue-600"
                    })]
                  }), /* @__PURE__ */ jsx("span", {
                    className: "text-[11px] font-bold truncate",
                    children: acc.label
                  })]
                }, acc.role);
              })
            })]
          }), /* @__PURE__ */ jsxs("form", {
            onSubmit: handleLogin,
            className: "space-y-4 text-xs",
            children: [authMethod === "email" ? (
              /* EMAIL LOGIN METHOD */
              /* @__PURE__ */ jsxs(Fragment, {
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    className: "block font-bold text-slate-700 mb-1.5",
                    children: "Official Email Address"
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "relative",
                    children: [/* @__PURE__ */ jsx(FaEnvelope, {
                      className: "w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2"
                    }), /* @__PURE__ */ jsx("input", {
                      type: "email",
                      required: true,
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      placeholder: "name@domain.com",
                      className: "w-full pl-10 pr-4 py-2.5 bg-blue-50/40 border border-blue-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex items-center justify-between mb-1.5",
                    children: [/* @__PURE__ */ jsx("label", {
                      className: "font-bold text-slate-700",
                      children: "Account Password"
                    }), /* @__PURE__ */ jsx("button", {
                      type: "button",
                      onClick: () => {
                        setToastMessage("Password reset link dispatched to registered email address.");
                        setTimeout(() => setToastMessage(null), 3e3);
                      },
                      className: "text-blue-600 hover:underline text-[11px] font-semibold cursor-pointer",
                      children: "Forgot Password?"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "relative",
                    children: [/* @__PURE__ */ jsx(FaLock, {
                      className: "w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2"
                    }), /* @__PURE__ */ jsx("input", {
                      type: showPassword ? "text" : "password",
                      required: true,
                      value: password,
                      onChange: (e) => setPassword(e.target.value),
                      placeholder: "••••••••••••",
                      className: "w-full pl-10 pr-10 py-2.5 bg-blue-50/40 border border-blue-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    }), /* @__PURE__ */ jsx("button", {
                      type: "button",
                      onClick: () => setShowPassword(!showPassword),
                      className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 cursor-pointer",
                      children: showPassword ? /* @__PURE__ */ jsx(FaEyeSlash, {
                        className: "w-4 h-4"
                      }) : /* @__PURE__ */ jsx(FaEye, {
                        className: "w-4 h-4"
                      })
                    })]
                  })]
                })]
              })
            ) : (
              /* MOBILE OTP METHOD */
              /* @__PURE__ */ jsxs(Fragment, {
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    className: "block font-bold text-slate-700 mb-1.5",
                    children: "Mobile Phone Number"
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex gap-2",
                    children: [/* @__PURE__ */ jsxs("div", {
                      className: "relative flex-1",
                      children: [/* @__PURE__ */ jsx(FaMobileScreen, {
                        className: "w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2"
                      }), /* @__PURE__ */ jsx("input", {
                        type: "text",
                        required: true,
                        value: phoneNumber,
                        onChange: (e) => setPhoneNumber(e.target.value),
                        placeholder: "+91 98765 43210",
                        className: "w-full pl-10 pr-4 py-2.5 bg-blue-50/40 border border-blue-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                      })]
                    }), /* @__PURE__ */ jsx("button", {
                      type: "button",
                      onClick: handleSendOtp,
                      className: "px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition cursor-pointer shrink-0",
                      children: otpSent ? "Resend OTP" : "Send OTP"
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    className: "block font-bold text-slate-700 mb-1.5",
                    children: "6-Digit Verification OTP Code"
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "relative",
                    children: [/* @__PURE__ */ jsx(FaKey, {
                      className: "w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2"
                    }), /* @__PURE__ */ jsx("input", {
                      type: "text",
                      maxLength: 6,
                      required: true,
                      value: otpCode,
                      onChange: (e) => setOtpCode(e.target.value),
                      placeholder: "e.g. 849201",
                      className: "w-full pl-10 pr-4 py-2.5 bg-blue-50/40 border border-blue-200 rounded-xl text-slate-900 font-mono tracking-widest text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                    })]
                  }), otpSent && /* @__PURE__ */ jsxs("span", {
                    className: "text-emerald-600 text-[11px] font-semibold mt-1 block",
                    children: ["✓ SMS OTP Code sent to ", phoneNumber, " (Demo Code: 849201)"]
                  })]
                })]
              })
            ), /* @__PURE__ */ jsx("div", {
              className: "flex items-center justify-between pt-1",
              children: /* @__PURE__ */ jsxs("label", {
                className: "flex items-center gap-2 cursor-pointer text-slate-600 font-medium",
                children: [/* @__PURE__ */ jsx("input", {
                  type: "checkbox",
                  checked: rememberMe,
                  onChange: (e) => setRememberMe(e.target.checked),
                  className: "w-4 h-4 accent-blue-600 rounded"
                }), /* @__PURE__ */ jsx("span", {
                  children: "Keep session active on this device"
                })]
              })
            }), /* @__PURE__ */ jsx("button", {
              type: "submit",
              disabled: isLoading,
              className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 mt-4 active:scale-98",
              children: isLoading ? /* @__PURE__ */ jsx("span", {
                children: "Authenticating Session..."
              }) : /* @__PURE__ */ jsxs(Fragment, {
                children: [/* @__PURE__ */ jsxs("span", {
                  children: ["Sign In to ", selectedRole.toUpperCase(), " Workspace"]
                }), /* @__PURE__ */ jsx(FaArrowRight, {
                  className: "w-4 h-4"
                })]
              })
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400",
          children: [/* @__PURE__ */ jsx("span", {
            children: "© 2026 Role Ready AI Inc. All rights reserved."
          }), /* @__PURE__ */ jsx("span", {
            className: "font-semibold text-blue-600",
            children: "Enterprise SSL Secured"
          })]
        })]
      })]
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login
}, Symbol.toStringTag, { value: "Module" }));
const __vite_import_meta_env__ = {};
const API_BASE_URL = typeof window !== "undefined" ? ((_a = window.__ENV__) == null ? void 0 : _a.VITE_API_BASE_URL) || (__vite_import_meta_env__ == null ? void 0 : __vite_import_meta_env__.VITE_API_BASE_URL) || "" : "";
async function apiFetch(endpoint, options, fallbackFn) {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: { "Content-Type": "application/json", ...options == null ? void 0 : options.headers },
        ...options
      });
      if (res.ok) {
        return await res.json();
        89;
      }
    } catch (err) {
      console.warn(`[API Connection Warning] Failed to reach ${API_BASE_URL}${endpoint}, falling back to LocalStorage persistence.`, err);
    }
  }
  if (fallbackFn) {
    return await fallbackFn();
  }
  throw new Error(`API Endpoint ${endpoint} failed and no fallback was provided.`);
}
const initialEntities = [
  {
    id: "ent-101",
    name: "Delhi Public School, R.K. Puram",
    role: "school",
    contactEmail: "admin@dpsrkp.edu.in",
    domain: "dpsrkp.edu.in",
    seats: 4500,
    usedSeats: 3820,
    features: ["AI Discover Engine", "Scholarship Portal", "Institutional Analytics"],
    status: "active",
    onboardedDate: "2026-01-15",
    approvalStage: "Live Portal",
    docsStatus: "CBSE Affiliation #10301 Verified",
    bgCheckStatus: "Passed - Clear Security Clearance",
    subscriptionPlan: "Institutional Enterprise Tier"
  },
  {
    id: "ent-102",
    name: "Indian Institute of Technology (IIT) Bombay",
    role: "college",
    contactEmail: "placements@iitb.ac.in",
    domain: "iitb.ac.in",
    seats: 12e3,
    usedSeats: 11450,
    features: ["AI Discover Engine", "Job & Internship Board", "AI Resume & Interview AI", "Institutional Analytics"],
    status: "active",
    onboardedDate: "2026-01-10",
    approvalStage: "Live Portal",
    docsStatus: "UGC & NIRF Rank #1 Verified",
    bgCheckStatus: "Passed - Clear University Clearance",
    subscriptionPlan: "University Enterprise Pro"
  },
  {
    id: "ent-103",
    name: "Dr. Rajesh Sharma (Senior Career Specialist)",
    role: "mentor",
    contactEmail: "r.sharma@careerguider.org",
    domain: "careerguider.org",
    seats: 250,
    usedSeats: 210,
    features: ["AI Discover Engine", "Mentorship Marketplace", "Institutional Analytics"],
    status: "active",
    onboardedDate: "2026-02-01",
    approvalStage: "Live Portal",
    docsStatus: "Ph.D. IIT Bombay Degree Verified",
    bgCheckStatus: "Passed - Verified Master Counselor",
    subscriptionPlan: "Master Counselor Pro"
  },
  {
    id: "ent-104",
    name: "Apex Skill Development Academy",
    role: "training",
    contactEmail: "head@apexskill.org",
    domain: "apexskill.org",
    seats: 3500,
    usedSeats: 2900,
    features: ["AI Discover Engine", "Job & Internship Board", "AI Resume & Interview AI"],
    status: "active",
    onboardedDate: "2026-02-12",
    approvalStage: "Live Portal",
    docsStatus: "NSDC Skill Provider Registration Verified",
    bgCheckStatus: "Passed - Verified Academy",
    subscriptionPlan: "Academy Pro Tier"
  },
  {
    id: "ent-105",
    name: "Priya Verma (Infosys Talent Acquisition)",
    role: "recruiter",
    contactEmail: "priya_v@infosys.com",
    domain: "infosys.com",
    seats: 1500,
    usedSeats: 890,
    features: ["Job & Internship Board", "AI Resume & Interview AI", "Institutional Analytics"],
    status: "active",
    onboardedDate: "2026-02-20",
    approvalStage: "Live Portal",
    docsStatus: "CIN U72200MH2020PTC Tax Verified",
    bgCheckStatus: "Passed - Verified Corporate Employer",
    subscriptionPlan: "Enterprise Hiring Pro"
  },
  {
    id: "ent-106",
    name: "Tata Consultancy Services (TCS) Enterprise",
    role: "company",
    contactEmail: "careers@tcs.com",
    domain: "tcs.com",
    seats: 8e3,
    usedSeats: 6200,
    features: ["Job & Internship Board", "AI Resume & Interview AI", "Institutional Analytics"],
    status: "active",
    onboardedDate: "2026-01-05",
    approvalStage: "Live Portal",
    docsStatus: "Corporate Identity & Tax ID Verified",
    bgCheckStatus: "Passed - Enterprise Clearance",
    subscriptionPlan: "Enterprise Unlimited"
  },
  {
    id: "ent-107",
    name: "National Skill Development Mission (NSDC)",
    role: "college",
    contactEmail: "portal@nsdc.gov.in",
    domain: "nsdc.gov.in",
    seats: 5e4,
    usedSeats: 41200,
    features: ["AI Discover Engine", "Scholarship Portal", "Job & Internship Board", "Institutional Analytics"],
    status: "active",
    onboardedDate: "2025-12-01",
    approvalStage: "Live Portal",
    docsStatus: "Govt Ministry Authorization Verified",
    bgCheckStatus: "Passed - Government Portal Clear",
    subscriptionPlan: "National Sector Plan"
  },
  {
    id: "ent-108",
    name: "St. Xavier's International School",
    role: "school",
    contactEmail: "principal@stxaviers.edu",
    domain: "stxaviers.edu",
    seats: 2200,
    usedSeats: 1850,
    features: ["AI Discover Engine", "Scholarship Portal"],
    status: "pending",
    onboardedDate: "2026-03-01",
    approvalStage: "Document Verification",
    docsStatus: "CBSE Affiliation Certificate Uploaded (Pending Review)",
    bgCheckStatus: "In Progress - Security Audit",
    subscriptionPlan: "School Starter Plan"
  },
  {
    id: "ent-109",
    name: "CodeCraft Technology Institute",
    role: "training",
    contactEmail: "admissions@codecraft.io",
    domain: "codecraft.io",
    seats: 1e3,
    usedSeats: 420,
    features: ["Job & Internship Board", "AI Resume & Interview AI"],
    status: "active",
    onboardedDate: "2026-02-28",
    approvalStage: "Admin Approval",
    docsStatus: "Tech Academy Accreditation Verified",
    bgCheckStatus: "Passed - Background Audit",
    subscriptionPlan: "Institute Pro Plan"
  },
  {
    id: "ent-110",
    name: "Vanguard Wealth Management",
    role: "company",
    contactEmail: "recruiting@vanguard.com",
    domain: "vanguard.com",
    seats: 500,
    usedSeats: 120,
    features: ["Job & Internship Board"],
    status: "pending",
    onboardedDate: "2026-03-02",
    approvalStage: "Background Check",
    docsStatus: "FINRA & Tax Registration Verified",
    bgCheckStatus: "Pending Financial Compliance Check",
    subscriptionPlan: "Enterprise Starter Plan"
  }
];
const initialLogs = [
  { id: "log-1", time: "2026-03-04 10:14:20", admin: "Root Admin", action: "Provisioned Access", target: "St. Xavier's International School", role: "school", ip: "192.168.1.10", status: "Success" },
  { id: "log-2", time: "2026-03-04 09:45:00", admin: "Root Admin", action: "Granted Government Quota", target: "National Skill Development Mission", role: "government", ip: "192.168.1.10", status: "Success" },
  { id: "log-3", time: "2026-03-03 16:22:15", admin: "Root Admin", action: "Activated Recruiter Credentials", target: "Infosys Talent Acquisition", role: "recruiter", ip: "192.168.1.10", status: "Success" }
];
function getStoredEntities() {
  if (typeof window === "undefined") return initialEntities;
  const item = localStorage.getItem("rr_entities");
  return item ? JSON.parse(item) : initialEntities;
}
function getStoredLogs() {
  if (typeof window === "undefined") return initialLogs;
  const item = localStorage.getItem("rr_audit_logs");
  return item ? JSON.parse(item) : initialLogs;
}
async function fetchEntities() {
  return apiFetch("/api/entities", { method: "GET" }, async () => {
    await new Promise((r) => setTimeout(r, 100));
    return getStoredEntities();
  });
}
async function fetchAuditLogs() {
  return apiFetch("/api/audit-logs", { method: "GET" }, async () => {
    await new Promise((r) => setTimeout(r, 80));
    return getStoredLogs();
  });
}
async function addEntity(newEntity) {
  return apiFetch("/api/entities", {
    method: "POST",
    body: JSON.stringify(newEntity)
  }, async () => {
    const current = getStoredEntities();
    const entity = {
      ...newEntity,
      id: `ent-${Date.now().toString().slice(-4)}`,
      usedSeats: 0,
      onboardedDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    const updated = [entity, ...current];
    if (typeof window !== "undefined") localStorage.setItem("rr_entities", JSON.stringify(updated));
    await addAuditLog({
      action: "Provisioned Partner Access",
      target: entity.name,
      role: entity.role
    });
    return entity;
  });
}
async function updateEntity(id, updates) {
  return apiFetch(`/api/entities/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates)
  }, async () => {
    const current = getStoredEntities();
    let updatedEntity;
    const updated = current.map((e) => {
      if (e.id === id) {
        updatedEntity = { ...e, ...updates };
        return updatedEntity;
      }
      return e;
    });
    if (typeof window !== "undefined") localStorage.setItem("rr_entities", JSON.stringify(updated));
    if (updatedEntity) {
      await addAuditLog({
        action: `Updated Access Config (${updatedEntity.status})`,
        target: updatedEntity.name,
        role: updatedEntity.role
      });
    }
    return updatedEntity;
  });
}
async function deleteEntity(id) {
  return apiFetch(`/api/entities/${id}`, {
    method: "DELETE"
  }, async () => {
    const current = getStoredEntities();
    const target = current.find((e) => e.id === id);
    const updated = current.filter((e) => e.id !== id);
    if (typeof window !== "undefined") localStorage.setItem("rr_entities", JSON.stringify(updated));
    if (target) {
      await addAuditLog({
        action: "Revoked Access & Deleted Entity",
        target: target.name,
        role: target.role
      });
    }
    return id;
  });
}
async function addAuditLog(log) {
  return apiFetch("/api/audit-logs", {
    method: "POST",
    body: JSON.stringify(log)
  }, async () => {
    const current = getStoredLogs();
    const newLog = {
      id: `log-${Date.now().toString().slice(-4)}`,
      time: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 19),
      admin: "Root Admin",
      action: log.action,
      target: log.target,
      role: log.role,
      ip: "192.168.1.10",
      status: "Success"
    };
    const updated = [newLog, ...current];
    if (typeof window !== "undefined") localStorage.setItem("rr_audit_logs", JSON.stringify(updated));
    return newLog;
  });
}
async function saveRBACWeights(matrixData) {
  return apiFetch("/api/rbac/matrix", {
    method: "POST",
    body: JSON.stringify(matrixData)
  }, async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("rr_rbac_matrix", JSON.stringify(matrixData));
    }
    return matrixData;
  });
}
async function saveAIWeights(weights) {
  return apiFetch("/api/ai/weights", {
    method: "POST",
    body: JSON.stringify(weights)
  }, async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("rr_ai_weights", JSON.stringify(weights));
    }
    return weights;
  });
}
const Sidebar = ({
  currentWorkspace,
  onWorkspaceChange,
  activeView,
  onViewChange,
  onRoleFilter,
  totalEntities,
  isDarkMode,
  isMobileOpen = false,
  onCloseMobile = () => {
  }
}) => {
  const unreadCount = useAppSelector((state) => state.notifications.unreadCount);
  const roleNavItems = {
    "student": [
      { id: "overview", label: "Dashboard", icon: FaChartPie },
      { id: "discover", label: "Career Discovery", icon: FaCompass },
      { id: "schools", label: "Schools Hub", icon: FaSchool },
      { id: "colleges", label: "College Explorer", icon: FaGraduationCap },
      { id: "scholarships", label: "Scholarships", icon: FaAward },
      { id: "learning-center", label: "Learning Center", icon: FaBookOpen },
      { id: "resume-builder", label: "Resume Builder", icon: FaFileCode },
      { id: "interview-ai", label: "Interview AI", icon: FaBrain },
      { id: "jobs", label: "Jobs & Internships", icon: FaBriefcase },
      { id: "notifications", label: "Notifications", icon: FaBullhorn },
      { id: "profile", label: "User Profile", icon: FaUser }
    ],
    "super-admin": [
      { id: "overview", label: "Dashboard Overview", icon: FaChartPie },
      { id: "access", label: "Access Provisioning", icon: FaShieldHalved },
      { id: "rbac", label: "Permission Matrix", icon: FaSliders },
      { id: "ai", label: "AI Engine Control", icon: FaBrain },
      { id: "audit", label: "Audit & Compliance", icon: FaListCheck }
    ],
    "school": [
      { id: "overview", label: "Dashboard", icon: FaChartPie },
      { id: "students", label: "Students Roster", icon: FaUsers },
      { id: "teachers", label: "Teachers", icon: FaChalkboardUser },
      { id: "assessments", label: "Assessments", icon: FaListCheck },
      { id: "reports", label: "Career Reports", icon: FaFileLines },
      { id: "events", label: "Events", icon: FaCalendarDays },
      { id: "analytics", label: "Analytics", icon: FaArrowTrendUp },
      { id: "notifications", label: "Notifications", icon: FaBullhorn },
      { id: "settings", label: "Settings", icon: FaSliders }
    ],
    "college": [
      { id: "overview", label: "Dashboard", icon: FaGraduationCap },
      { id: "programs", label: "Degree Programs", icon: FaBookOpen },
      { id: "admissions", label: "Admissions Desk", icon: FaUserCheck },
      { id: "scholarships", label: "Scholarships Cell", icon: FaAward },
      { id: "placement-cell", label: "Placement Cell", icon: FaBriefcase },
      { id: "industry-connect", label: "Industry MoUs", icon: FaHandshake },
      { id: "notifications", label: "Notifications", icon: FaBullhorn },
      { id: "settings", label: "Settings", icon: FaSliders }
    ],
    "mentor": [
      { id: "overview", label: "Dashboard", icon: FaUserCheck },
      { id: "profile", label: "Profile Verification", icon: FaUserCheck },
      { id: "skills", label: "Expertise Matrix", icon: FaBrain },
      { id: "availability", label: "Availability Calendar", icon: FaCalendarDays },
      { id: "student-requests", label: "Counseling Requests", icon: FaUsers },
      { id: "video-sessions", label: "Live Video Sessions", icon: FaVideo },
      { id: "wallet", label: "Earnings Wallet", icon: FaWallet },
      { id: "notifications", label: "Notifications", icon: FaBullhorn }
    ],
    "training": [
      { id: "overview", label: "Institute Overview", icon: FaChalkboardUser },
      { id: "courses", label: "Skill Courses", icon: FaBookOpen },
      { id: "certs", label: "Certifications", icon: FaAward },
      { id: "hiring", label: "Hiring Partners", icon: FaHandshake }
    ],
    "recruiter": [
      { id: "overview", label: "Talent Desk", icon: FaBriefcase },
      { id: "verification", label: "Company Verification", icon: FaBuilding },
      { id: "jobs", label: "Job Postings", icon: FaFileLines },
      { id: "campus-hiring", label: "Campus Drives", icon: FaGraduationCap },
      { id: "student-search", label: "Student Search", icon: FaMagnifyingGlass },
      { id: "ai-match", label: "AI Matcher", icon: FaBrain },
      { id: "interviews", label: "Interviews", icon: FaCalendarDays },
      { id: "offers", label: "Offer Letters", icon: FaAward },
      { id: "notifications", label: "Notifications", icon: FaBullhorn }
    ],
    "company": [
      { id: "overview", label: "Company Overview", icon: FaBuilding },
      { id: "internships", label: "Internship Programs", icon: FaBriefcase },
      { id: "partnerships", label: "Campus MoUs", icon: FaGraduationCap },
      { id: "pipeline", label: "Talent Pipeline", icon: FaChartPie }
    ]
  };
  const navItems = roleNavItems[currentWorkspace] || roleNavItems["super-admin"];
  const sidebarContent = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: `p-4 sm:p-5 flex items-center justify-between border-b shrink-0 ${isDarkMode ? "border-slate-800 bg-slate-950/60" : "border-blue-100 bg-blue-50/40"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0", children: /* @__PURE__ */ jsx(FaCompass, { className: "w-5 h-5 animate-pulse-glow" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: `font-bold text-lg tracking-tight font-sans ${isDarkMode ? "text-white" : "text-slate-900"}`, children: "Role Ready" }),
          /* @__PURE__ */ jsx("span", { className: "inline-block text-[11px] font-medium bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-md border border-blue-400/20", children: currentWorkspace === "super-admin" ? "Super Admin" : `${currentWorkspace.charAt(0).toUpperCase() + currentWorkspace.slice(1)} Portal` })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onCloseMobile,
          className: "lg:hidden text-slate-400 hover:text-white p-1 cursor-pointer",
          "aria-label": "Close Mobile Sidebar",
          children: /* @__PURE__ */ jsx(FaXmark, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "flex-1 overflow-y-auto p-4 space-y-6", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: `text-[11px] font-semibold tracking-wider uppercase px-2 mb-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`, children: [
        currentWorkspace.charAt(0).toUpperCase() + currentWorkspace.slice(1),
        " Navigation"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-1", children: navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              onViewChange(item.id);
              onCloseMobile();
            },
            "aria-current": isActive ? "page" : void 0,
            "aria-label": item.label,
            className: `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${isActive ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.01]" : isDarkMode ? "text-slate-300 hover:bg-slate-800 hover:text-white" : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"}`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(Icon, { className: `w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}` }),
                /* @__PURE__ */ jsx("span", { children: item.label })
              ] }),
              item.id === "notifications" && unreadCount > 0 && /* @__PURE__ */ jsx("span", { className: "bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold", children: unreadCount }),
              item.id === "access" && /* @__PURE__ */ jsx("span", { className: "bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full font-medium", children: totalEntities })
            ]
          },
          item.id
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: `p-4 border-t space-y-3 shrink-0 ${isDarkMode ? "border-slate-800 bg-slate-950/60" : "border-blue-100 bg-blue-50/40"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: `text-xs font-medium ${isDarkMode ? "text-white" : "text-slate-900"}`, children: "AI Engine v2.4" }),
          /* @__PURE__ */ jsx("div", { className: `text-xs font-normal ${isDarkMode ? "text-slate-400" : "text-slate-500"}`, children: "All Microservices Operational" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            if (typeof window !== "undefined") {
              window.location.href = "/login";
            }
          },
          "aria-label": "Log Out of System",
          className: `w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border ${isDarkMode ? "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/50 shadow-xs" : "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 hover:border-rose-300 shadow-xs"}`,
          children: [
            /* @__PURE__ */ jsx(FaRightFromBracket, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsx("span", { children: "Log Out" })
          ]
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isMobileOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 lg:hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          onClick: onCloseMobile,
          className: "fixed inset-0 bg-slate-950/80 backdrop-blur-xs",
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsx(
        "aside",
        {
          role: "navigation",
          "aria-label": "Mobile Navigation Sidebar",
          className: `w-72 h-full flex flex-col fixed top-0 bottom-0 left-0 z-50 shadow-2xl border-r font-sans ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900"}`,
          children: sidebarContent
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "aside",
      {
        role: "navigation",
        "aria-label": "Main Navigation Sidebar",
        className: `hidden lg:flex w-72 shrink-0 h-screen sticky top-0 left-0 z-30 flex-col border-r font-sans transition-colors duration-200 ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900"}`,
        children: sidebarContent
      }
    )
  ] });
};
const Topbar = ({
  currentWorkspace,
  searchQuery,
  onSearchChange,
  onShowToast,
  isDarkMode,
  onToggleTheme,
  onNavigateNotifications,
  onToggleMobileSidebar
}) => {
  const unreadCount = useAppSelector((state) => state.notifications.unreadCount);
  const profile = useAppSelector((state) => state.profile);
  const roleNameMap = {
    "student": "Student Workspace Portal",
    "super-admin": "Super Admin (Governance)",
    "school": "School Admin Portal",
    "college": "College Admin Portal",
    "mentor": "Mentor Desk",
    "training": "Training Institute Portal",
    "recruiter": "Recruiter Talent Desk",
    "company": "Enterprise Company Portal"
  };
  return /* @__PURE__ */ jsxs(
    "header",
    {
      role: "banner",
      "aria-label": "Top Navigation Header",
      className: `h-16 border-b px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 font-sans transition-colors duration-200 ${isDarkMode ? "bg-slate-900/90 border-slate-800 text-white backdrop-blur-md" : "bg-white/90 border-slate-200 text-slate-900 backdrop-blur-md shadow-2xs"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onToggleMobileSidebar,
              "aria-label": "Toggle Navigation Menu",
              className: `lg:hidden p-2 rounded-xl border transition cursor-pointer ${isDarkMode ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-slate-100 border-slate-200 text-slate-800"}`,
              children: /* @__PURE__ */ jsx(FaBars, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative w-48 sm:w-72 md:w-96", children: [
            /* @__PURE__ */ jsx(FaMagnifyingGlass, { className: `w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDarkMode ? "text-slate-400" : "text-blue-500"}` }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: searchQuery,
                onChange: (e) => onSearchChange(e.target.value),
                placeholder: `Search in ${roleNameMap[currentWorkspace] || "Workspace"}...`,
                "aria-label": "Search Workspace",
                className: `w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm font-normal transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? "bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400" : "bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400"}`
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onToggleTheme,
              "aria-label": isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme",
              className: `flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer ${isDarkMode ? "bg-slate-800 border-amber-500/40 text-amber-400 hover:bg-slate-700" : "bg-blue-50 border-blue-200 text-slate-900 hover:bg-blue-100"}`,
              children: isDarkMode ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(FaSun, { className: "w-3.5 h-3.5 text-amber-400" }),
                /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Light" })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(FaMoon, { className: "w-3.5 h-3.5 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Dark" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                if (onNavigateNotifications) {
                  onNavigateNotifications();
                } else {
                  onShowToast(`Notifications: ${unreadCount} unread system alerts.`);
                }
              },
              "aria-label": `View Notifications (${unreadCount} unread)`,
              className: `relative p-2 rounded-xl border transition-all duration-200 cursor-pointer ${isDarkMode ? "bg-slate-800 border-slate-700 text-slate-300 hover:text-white" : "bg-blue-50 border-blue-200 text-slate-900 hover:bg-blue-100"}`,
              children: [
                /* @__PURE__ */ jsx(FaBell, { className: "w-4 h-4 text-blue-500" }),
                unreadCount > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center", children: unreadCount })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: `h-6 w-px ${isDarkMode ? "bg-slate-800" : "bg-slate-200"}` }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-md", children: profile.name.charAt(0) }),
            /* @__PURE__ */ jsxs("div", { className: "hidden md:block text-left", children: [
              /* @__PURE__ */ jsx("div", { className: `text-xs font-semibold leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`, children: profile.name }),
              /* @__PURE__ */ jsxs("div", { className: "text-[11px] font-medium text-blue-400", children: [
                currentWorkspace.charAt(0).toUpperCase() + currentWorkspace.slice(1),
                " Portal"
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
};
const GrantAccessModal = ({
  isOpen,
  onClose,
  onSubmit,
  isDarkMode = true
}) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("school");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [seats, setSeats] = useState(1e3);
  const [features, setFeatures] = useState([
    "AI Discover Engine",
    "Scholarship Portal",
    "Institutional Analytics"
  ]);
  if (!isOpen) return null;
  const handleToggleFeature = (feature) => {
    if (features.includes(feature)) {
      setFeatures(features.filter((f) => f !== feature));
    } else {
      setFeatures([...features, feature]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    onSubmit({
      name,
      role,
      contactEmail: email,
      domain: domain || email.split("@")[1] || "domain.com",
      seats,
      features,
      status: "active",
      approvalStage: "Document Verification",
      docsStatus: "Compliance Certificates Uploaded (Pending Review)",
      bgCheckStatus: "Pending Security Audit",
      subscriptionPlan: "Institutional Starter Plan"
    });
    setName("");
    setEmail("");
    setDomain("");
    onClose();
  };
  const availableFeatures = [
    "AI Discover Engine",
    "Scholarship Portal",
    "Job & Internship Board",
    "Mentorship Marketplace",
    "Institutional Analytics",
    "AI Resume & Interview AI"
  ];
  const cardBg = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-2xl" : "bg-white border-blue-100 text-slate-900 shadow-2xl";
  const inputBg = isDarkMode ? "bg-slate-800/80 border-slate-700 text-white placeholder-slate-400 focus:ring-blue-500" : "bg-blue-50/40 border-blue-200 text-slate-900 placeholder-slate-400 focus:ring-blue-500 focus:bg-white";
  const labelColor = isDarkMode ? "text-slate-300" : "text-slate-700";
  const borderDivider = isDarkMode ? "border-slate-800" : "border-blue-100";
  const cancelBtnClass = isDarkMode ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200";
  return /* @__PURE__ */ jsx("div", { className: `fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in ${isDarkMode ? "bg-slate-950/70" : "bg-slate-900/40"}`, children: /* @__PURE__ */ jsxs("div", { className: `rounded-3xl max-w-xl w-full border shadow-2xl overflow-hidden animate-scale-up ${cardBg}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-5 bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white", children: /* @__PURE__ */ jsx(UserPlus, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg", children: "Grant Ecosystem Partner Access" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-100 font-normal", children: "Provision credentials for schools, colleges, mentors, HR & academies" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: "w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer",
          children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-white" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: `block text-[13px] font-medium mb-1.5 ${labelColor}`, children: "Organization / Entity Name *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            required: true,
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "e.g. St. Xavier High School, IIT Delhi, Infosys HR",
            className: `w-full px-3.5 py-2.5 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 transition ${inputBg}`
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: `block text-[13px] font-medium mb-1.5 ${labelColor}`, children: "Partner Role Category *" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: role,
              onChange: (e) => setRole(e.target.value),
              className: `w-full px-3.5 py-2.5 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 cursor-pointer ${inputBg}`,
              children: [
                /* @__PURE__ */ jsx("option", { value: "school", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "🏫 School Admin (K-12)" }),
                /* @__PURE__ */ jsx("option", { value: "college", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "🎓 College Admin (Higher Ed)" }),
                /* @__PURE__ */ jsx("option", { value: "mentor", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "👨‍🏫 Mentor / Counselor" }),
                /* @__PURE__ */ jsx("option", { value: "training", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "🏫 Training Institute" }),
                /* @__PURE__ */ jsx("option", { value: "recruiter", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "👔 Recruiter / HR Lead" }),
                /* @__PURE__ */ jsx("option", { value: "company", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "🏢 Enterprise Employer" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: `block text-[13px] font-medium mb-1.5 ${labelColor}`, children: "Primary Admin Email *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              required: true,
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "admin@organization.edu",
              className: `w-full px-3.5 py-2.5 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 transition ${inputBg}`
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: `block text-[13px] font-medium mb-1.5 ${labelColor}`, children: "Verified Official Domain" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: domain,
              onChange: (e) => setDomain(e.target.value),
              placeholder: "stxaviers.edu",
              className: `w-full px-3.5 py-2.5 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 transition ${inputBg}`
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: `block text-[13px] font-medium mb-1.5 ${labelColor}`, children: "Allocated Seat Quota *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: 10,
              max: 1e5,
              value: seats,
              onChange: (e) => setSeats(Number(e.target.value)),
              className: `w-full px-3.5 py-2.5 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 transition ${inputBg}`
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: `block text-[13px] font-medium mb-2 ${labelColor}`, children: "Granted Feature Permissions" }),
        /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 gap-2 p-3 rounded-2xl border ${isDarkMode ? "bg-slate-800/40 border-slate-800" : "bg-blue-50/30 border-blue-100"}`, children: availableFeatures.map((f) => /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-2 cursor-pointer text-xs font-medium ${isDarkMode ? "text-slate-300" : "text-slate-700"}`, children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: features.includes(f),
              onChange: () => handleToggleFeature(f),
              className: "accent-blue-600 rounded"
            }
          ),
          /* @__PURE__ */ jsx("span", { children: f })
        ] }, f)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `pt-4 flex items-center justify-end gap-3 border-t ${borderDivider}`, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: `px-4 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${cancelBtnClass}`,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            className: "px-5 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95",
            children: [
              /* @__PURE__ */ jsx(Key, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: "Generate Credentials & Provision" })
            ]
          }
        )
      ] })
    ] })
  ] }) });
};
const EditModal = ({
  entity,
  isOpen,
  onClose,
  onSave,
  isDarkMode = true
}) => {
  const [seats, setSeats] = useState(1e3);
  const [status, setStatus] = useState("active");
  const [approvalStage, setApprovalStage] = useState("Live Portal");
  const [docsStatus, setDocsStatus] = useState("");
  const [bgCheckStatus, setBgCheckStatus] = useState("");
  useEffect(() => {
    if (entity) {
      setSeats(entity.seats);
      setStatus(entity.status);
      setApprovalStage(entity.approvalStage || (entity.status === "active" ? "Live Portal" : "Document Verification"));
      setDocsStatus(entity.docsStatus || "Compliance Certificates Verified");
      setBgCheckStatus(entity.bgCheckStatus || "Passed - Security Clearance Clear");
    }
  }, [entity]);
  if (!isOpen || !entity) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    const isLive = approvalStage === "Live Portal";
    onSave(entity.id, {
      seats,
      status: isLive ? "active" : "pending",
      approvalStage,
      docsStatus,
      bgCheckStatus
    });
    onClose();
  };
  const cardBg = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-2xl" : "bg-white border-blue-100 text-slate-900 shadow-2xl";
  const inputBg = isDarkMode ? "bg-slate-800/80 border-slate-700 text-white placeholder-slate-400 focus:ring-blue-500" : "bg-blue-50/40 border-blue-200 text-slate-900 placeholder-slate-400 focus:ring-blue-500 focus:bg-white";
  const labelColor = isDarkMode ? "text-slate-300" : "text-slate-700";
  const borderDivider = isDarkMode ? "border-slate-800" : "border-blue-100";
  const cancelBtnClass = isDarkMode ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200";
  return /* @__PURE__ */ jsx("div", { className: `fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in ${isDarkMode ? "bg-slate-950/70" : "bg-slate-900/40"}`, children: /* @__PURE__ */ jsxs("div", { className: `rounded-3xl max-w-md w-full border shadow-2xl overflow-hidden animate-scale-up ${cardBg}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsx(Edit3, { className: "w-5 h-5" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-base", children: [
            "Approval Pipeline: ",
            entity.name
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-100 font-normal", children: "Super Admin authorization & verification pipeline" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "p-1 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer", children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-white" }) })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: `block text-[13px] font-medium mb-1.5 ${labelColor}`, children: "Approval Pipeline Stage" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: approvalStage,
            onChange: (e) => setApprovalStage(e.target.value),
            className: `w-full px-3.5 py-2.5 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 cursor-pointer ${inputBg}`,
            children: [
              /* @__PURE__ */ jsx("option", { value: "Pending Review", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "1. Pending Review" }),
              /* @__PURE__ */ jsx("option", { value: "Document Verification", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "2. Document Verification" }),
              /* @__PURE__ */ jsx("option", { value: "Background Check", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "3. Background Check" }),
              /* @__PURE__ */ jsx("option", { value: "Admin Approval", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "4. Admin Approval" }),
              /* @__PURE__ */ jsx("option", { value: "Subscription", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "5. Subscription Plan" }),
              /* @__PURE__ */ jsx("option", { value: "Live Portal", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "6. Live Portal (Active & Verified)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: `block text-[13px] font-medium mb-1.5 ${labelColor}`, children: "Document Verification Notes" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: docsStatus,
            onChange: (e) => setDocsStatus(e.target.value),
            placeholder: "e.g. CBSE Affiliation #10301 Verified",
            className: `w-full px-3.5 py-2.5 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 transition ${inputBg}`
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: `block text-[13px] font-medium mb-1.5 ${labelColor}`, children: "Background Check Status" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: bgCheckStatus,
            onChange: (e) => setBgCheckStatus(e.target.value),
            placeholder: "e.g. Passed - Clear Background Check",
            className: `w-full px-3.5 py-2.5 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 transition ${inputBg}`
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: `block text-[13px] font-medium mb-1.5 ${labelColor}`, children: "Allocated Seat Quota" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            value: seats,
            onChange: (e) => setSeats(Number(e.target.value)),
            className: `w-full px-3.5 py-2.5 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 transition ${inputBg}`
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `pt-4 flex items-center justify-end gap-3 border-t ${borderDivider}`, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: `px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer ${cancelBtnClass}`,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            className: "px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-md transition cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95",
            children: [
              /* @__PURE__ */ jsx(Save, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsx("span", { children: "Save Changes" })
            ]
          }
        )
      ] })
    ] })
  ] }) });
};
const ActionModal = ({
  isOpen,
  title,
  subtitle,
  fields,
  onClose,
  onSubmit,
  isDarkMode = true
}) => {
  const [formData, setFormData] = useState({});
  if (!isOpen) return null;
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
    onClose();
  };
  const cardBg = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-2xl" : "bg-white border-blue-100 text-slate-900 shadow-2xl";
  const headerBg = isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-blue-50/60 border-blue-100";
  const inputBg = isDarkMode ? "bg-slate-800/80 border-slate-700 text-white placeholder-slate-400 focus:ring-blue-500" : "bg-slate-50 border-blue-200 text-slate-900 placeholder-slate-400 focus:ring-blue-500 focus:bg-white";
  const labelColor = isDarkMode ? "text-slate-300" : "text-slate-700";
  const subtitleColor = isDarkMode ? "text-slate-400" : "text-slate-500";
  const titleColor = isDarkMode ? "text-white" : "text-slate-900";
  const borderDivider = isDarkMode ? "border-slate-800" : "border-blue-100";
  const cancelBtnClass = isDarkMode ? "border-slate-700 text-slate-300 hover:bg-slate-800" : "border-blue-200 text-slate-700 hover:bg-blue-50";
  const closeIconClass = isDarkMode ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-400 hover:text-slate-800 hover:bg-blue-50";
  return /* @__PURE__ */ jsx("div", { className: `fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in font-sans ${isDarkMode ? "bg-slate-950/70" : "bg-slate-900/40"}`, children: /* @__PURE__ */ jsxs("div", { className: `border rounded-3xl max-w-md w-full overflow-hidden relative animate-scale-up ${cardBg}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `p-6 border-b flex items-center justify-between ${headerBg}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-500 border border-blue-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5 text-blue-500" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: `font-semibold text-base tracking-tight ${titleColor}`, children: title }),
          /* @__PURE__ */ jsx("p", { className: `text-xs font-normal ${subtitleColor}`, children: subtitle })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: `p-2 rounded-xl transition cursor-pointer ${closeIconClass}`,
          children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-4", children: [
      fields.map((f) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: `block text-[13px] font-medium mb-1.5 ${labelColor}`, children: f.label }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: f.type,
            required: true,
            value: formData[f.name] || "",
            onChange: (e) => handleChange(f.name, e.target.value),
            placeholder: f.placeholder,
            className: `w-full px-3.5 py-2.5 border rounded-xl text-sm font-normal focus:outline-none focus:ring-2 transition ${inputBg}`
          }
        )
      ] }, f.name)),
      /* @__PURE__ */ jsxs("div", { className: `pt-4 flex items-center justify-end gap-3 border-t ${borderDivider}`, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: `px-4 py-2.5 rounded-xl border text-sm font-medium transition cursor-pointer ${cancelBtnClass}`,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            className: "px-5 py-2.5 rounded-xl bg-[#12163A] hover:bg-[#1A2050] text-white text-sm font-medium transition shadow-md cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 text-[#3665EE]" }),
              /* @__PURE__ */ jsx("span", { children: "Submit & Save" })
            ]
          }
        )
      ] })
    ] })
  ] }) });
};
const SchoolDashboard = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [searchQuery, setSearchQuery2] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [studentDetailTab, setStudentDetailTab] = useState("overview");
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState({
    title: "",
    subtitle: "",
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
  const filteredStudents = students.filter((s) => {
    const matchesGrade = selectedGrade === "All" || s.grade === selectedGrade;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase()) || s.careerGoal.toLowerCase().includes(searchQuery.toLowerCase());
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
  const openTriggerModal = (title, subtitle, fields) => {
    setActionModalConfig({ title, subtitle, fields });
    setIsActionModalOpen(true);
  };
  const handleModalFormSubmit = (data) => {
    if (actionModalConfig.title === "Onboard Student Batch") {
      const studentName = data.name || "New Student";
      const studentGrade = data.grade || "Grade 11";
      const studentSection = data.section || "Section A";
      const studentGoal = data.careerGoal || "Software & AI Engineer";
      const newStudent = {
        id: `STU-${Math.floor(8807 + Math.random() * 1e3)}`,
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
        email: `${studentName.toLowerCase().replace(/\s+/g, ".")}@school.edu`,
        careerGoal: studentGoal,
        hollandCode: "RIE (Realistic • Investigative • Enterprising)",
        topSkills: ["Python", "Problem Solving", "AI Fundamentals"],
        topCollege: "IIT Bombay",
        topScholarship: "National STEM Leadership Aid (₹3.5L/yr)"
      };
      setStudents((prev) => [newStudent, ...prev]);
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
        email: `${teacherName.toLowerCase().replace(/\s+/g, ".")}@school.edu`,
        rating: "5.0 / 5.0 (New Faculty)",
        projects: "0 Cohorts Supervised"
      };
      setTeachersList((prev) => [newTeacher, ...prev]);
      onShowToast(`Successfully added teacher: ${newTeacher.name} (${newTeacher.dept})!`);
    } else if (actionModalConfig.title === "Assign Assessment") {
      const newAs = {
        name: data.name || "Career Aptitude & Skill Evaluation",
        grade: data.grade || "All Grades",
        assigned: 500,
        completed: 0,
        score: "Pending"
      };
      setAssessmentsList((prev) => [newAs, ...prev]);
      onShowToast(`Assigned new assessment: ${newAs.name}!`);
    } else if (actionModalConfig.title === "Schedule Event") {
      const newEv = {
        title: data.title || "Career Guidance Workshop",
        date: data.date || "Upcoming",
        attendees: "100 Students Enrolled",
        bg: "bg-[#DEE9FF]",
        border: "border-[#C6D9FF]"
      };
      setEventsList((prev) => [newEv, ...prev]);
      onShowToast(`Scheduled new event: ${newEv.title}!`);
    } else {
      onShowToast(`Action completed: ${actionModalConfig.title}`);
    }
    setIsActionModalOpen(false);
  };
  const renderContent = () => {
    if (activeSubView === "overview") {
      return /* @__PURE__ */ jsxs("div", { className: "space-y-6 font-sans", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#12163A] text-white shadow-md border border-[#12163A] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-slate-300", children: "Total Students (Grades 8-12)" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight text-white", children: students.length + 3814 }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full inline-block", children: "100% Active Profiles" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-[#4B5563]", children: "Total Teachers & Mentors" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight text-[#12163A]", children: "142" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#12163A]/70", children: "Across 12 Departments" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-[#4B5563]", children: "Assessment Completion" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight text-[#3665EE]", children: "91.4%" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#12163A]", children: "3,490 / 3,820 Tested" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-[#4B5563]", children: "Avg Career Readiness Score" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight text-[#12163A]", children: "88.2 / 100" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#3665EE]", children: "Top 5% Regionally" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base text-[#12163A]", children: "Grade Enrolment & Career DNA Status" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3", children: [
            { grade: "Grade 8", count: 620, readiness: "76% Ready", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
            { grade: "Grade 9", count: 780, readiness: "82% Ready", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
            { grade: "Grade 10", count: 1050, readiness: "89% Ready", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
            { grade: "Grade 11", count: 920, readiness: "93% Ready", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
            { grade: "Grade 12", count: 850, readiness: "96% Ready", bg: "bg-[#12163A]", border: "border-[#12163A]", dark: true }
          ].map((g, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-[20px] border text-center ${g.bg} ${g.border} ${g.dark ? "text-white" : "text-[#12163A]"} hover-card-lift`, children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium block text-xs", children: g.grade }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold my-1", children: g.count }),
            /* @__PURE__ */ jsx("span", { className: `text-xs font-medium ${g.dark ? "text-[#E4F4EC]" : "text-[#3665EE]"}`, children: g.readiness })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] border border-[#C6D9FF] shadow-xs space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "Learning Progress" }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm text-[#3665EE]", children: "86.4% Avg" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#4B5563]", children: "Course completion rates across AI, STEM, & Skill tracks" }),
            /* @__PURE__ */ jsx("div", { className: "w-full h-2.5 bg-white/80 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#3665EE] rounded-full", style: { width: "86%" } }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] border border-[#EAD0BC] shadow-xs space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "Students Requiring Attention" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-xs text-[#12163A] bg-[#12163A]/10 px-2.5 py-0.5 rounded-full", children: "42 Students" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#4B5563]", children: "Incomplete assessments or low career readiness score" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onShowToast("Navigating to filtered Student Attention list"),
                className: "text-[#3665EE] font-medium text-sm hover:underline cursor-pointer",
                children: "View Needs Attention Roster →"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] text-[#12163A] border border-[#C3E6D5] shadow-xs space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "Placement Readiness" }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm text-[#12163A]", children: "78% Placement Ready" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#4B5563]", children: "Grade 11 & 12 students qualified for internships & admissions" }),
            /* @__PURE__ */ jsx("div", { className: "w-full h-2.5 bg-white/80 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#3665EE] rounded-full", style: { width: "78%" } }) })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "students") {
      return /* @__PURE__ */ jsxs("div", { className: "space-y-6 font-sans", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
                /* @__PURE__ */ jsx(FaUsers, { className: "w-5 h-5 text-[#3665EE]" }),
                " Student Roster (Grades 8 - 12)"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "School admin management for registered student profiles" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => openTriggerModal("Onboard Student Batch", "Import and register a new student profile into the grade roster", [
                    { label: "Student Full Name", name: "name", type: "text", placeholder: "Rahul Verma" },
                    { label: "Grade (e.g. 8, 9, 10, 11, 12)", name: "grade", type: "text", placeholder: "Grade 11" },
                    { label: "Section", name: "section", type: "text", placeholder: "Section A" },
                    { label: "Target Career Goal", name: "careerGoal", type: "text", placeholder: "AI & Software Engineer" }
                  ]),
                  className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
                  children: [
                    /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                    " Onboard Student Batch"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => onShowToast("Exported Grade Roster to CSV"),
                  className: "px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200 bg-slate-50 text-[#12163A] hover:bg-slate-100 transition cursor-pointer flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx(FaDownload, { className: "w-3.5 h-3.5" }),
                    " Export CSV"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 pt-2", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: ["All", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((g) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSelectedGrade(g),
                className: `px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${selectedGrade === g ? "bg-[#12163A] text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`,
                children: g
              },
              g
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "relative w-64", children: [
              /* @__PURE__ */ jsx(FaMagnifyingGlass, { className: "w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Search students...",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery2(e.target.value),
                  className: "w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-xl text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#3665EE] bg-slate-50 text-[#12163A]"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-2xl border border-[#C6D9FF]", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b text-xs font-semibold uppercase tracking-wider bg-[#DEE9FF]/50 text-[#12163A] border-[#C6D9FF]", children: [
              /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Student Name" }),
              /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Roll No / ID" }),
              /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Career Score" }),
              /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Assessment Status" }),
              /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Career DNA" }),
              /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Learning Progress" }),
              /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Resume Score" }),
              /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Placement Readiness" }),
              /* @__PURE__ */ jsx("th", { className: "p-3.5 text-right", children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-[#C6D9FF]/60 text-sm font-normal", children: filteredStudents.map((s) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-[#DEE9FF]/30 transition-colors", children: [
              /* @__PURE__ */ jsxs("td", { className: "p-3.5 font-medium text-[#12163A]", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  s.name,
                  " (",
                  s.grade,
                  " - ",
                  s.section,
                  ")"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-xs font-normal text-[#6B7280]", children: s.email })
              ] }),
              /* @__PURE__ */ jsx("td", { className: "p-3.5 font-mono text-xs text-[#3665EE]", children: s.id }),
              /* @__PURE__ */ jsxs("td", { className: "p-3.5 font-semibold text-[#3665EE]", children: [
                s.careerScore,
                " / 100"
              ] }),
              /* @__PURE__ */ jsx("td", { className: "p-3.5 font-medium text-emerald-600", children: s.assessmentStatus }),
              /* @__PURE__ */ jsx("td", { className: "p-3.5", children: /* @__PURE__ */ jsx("span", { className: "bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-medium text-xs whitespace-nowrap shadow-2xs", children: s.careerDnaStatus }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3.5 font-medium text-[#12163A]", children: s.learningProgress }),
              /* @__PURE__ */ jsx("td", { className: "p-3.5 font-semibold text-[#3665EE]", children: s.resumeScore }),
              /* @__PURE__ */ jsx("td", { className: "p-3.5", children: /* @__PURE__ */ jsx("span", { className: `px-2.5 py-0.5 rounded-full font-medium text-xs border ${s.placementReadiness.includes("High") ? "bg-emerald-50 text-emerald-700 border-emerald-200" : s.placementReadiness.includes("Moderate") ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-rose-50 text-rose-700 border-rose-200"}`, children: s.placementReadiness }) }),
              /* @__PURE__ */ jsx("td", { className: "p-3.5 text-right", children: /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setSelectedStudent(s),
                  className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-medium px-3 py-1.5 rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5 ml-auto hover:scale-105 active:scale-95",
                  children: [
                    /* @__PURE__ */ jsx(FaEye, { className: "w-3.5 h-3.5" }),
                    " View Profile"
                  ]
                }
              ) })
            ] }, s.id)) })
          ] }) })
        ] }),
        selectedStudent && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 backdrop-blur-md bg-[#12163A]/70 flex items-center justify-center p-4 animate-fade-in font-sans", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[28px] max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-scale-up text-sm font-sans", children: [
          /* @__PURE__ */ jsxs("div", { className: "px-6 py-5 bg-[#12163A] text-white flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold uppercase tracking-wider text-[#DEE9FF]", children: "School Admin Student View" }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold flex items-center gap-2", children: selectedStudent.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-300 font-normal", children: [
                selectedStudent.grade,
                " • ",
                selectedStudent.section,
                " • Roll ID: ",
                selectedStudent.id
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSelectedStudent(null),
                className: "p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer text-white",
                children: /* @__PURE__ */ jsx(FaXmark, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "px-6 border-b border-slate-200 flex gap-2 overflow-x-auto bg-slate-50", children: [
            { id: "overview", label: "1. Overview" },
            { id: "intelligence", label: "2. Career DNA & Intelligence" },
            { id: "assessments", label: "3. Assessments" },
            { id: "learning", label: "4. Skills & Learning" },
            { id: "opportunities", label: "5. Colleges & Scholarships" },
            { id: "placement", label: "6. Placement Readiness" },
            { id: "academic", label: "7. Academic Summary" }
          ].map((t) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setStudentDetailTab(t.id),
              className: `px-4 py-3 text-xs font-medium transition whitespace-nowrap cursor-pointer border-b-2 ${studentDetailTab === t.id ? "border-[#3665EE] text-[#3665EE] font-semibold" : "border-transparent text-[#6B7280] hover:text-[#12163A]"}`,
              children: t.label
            },
            t.id
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 max-h-[60vh] overflow-y-auto space-y-4", children: [
            studentDetailTab === "overview" && /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3 text-center", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-[#DEE9FF] border-[#C6D9FF]", children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium text-xs text-[#6B7280]", children: "Career Score" }),
                /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-[#3665EE] mt-1", children: [
                  selectedStudent.careerScore,
                  " / 100"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-[#E4F4EC] border-[#C3E6D5]", children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium text-xs text-[#6B7280]", children: "Learning Progress" }),
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-[#12163A] mt-1", children: selectedStudent.learningProgress })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-[#F6E6D8] border-[#EAD0BC]", children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium text-xs text-[#6B7280]", children: "Placement Readiness" }),
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-[#12163A] mt-1", children: selectedStudent.placementReadiness })
              ] })
            ] }) }),
            studentDetailTab === "intelligence" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-[#F6E6D8] border-[#EAD0BC] space-y-2", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "Career DNA & Personality Profile" }),
                /* @__PURE__ */ jsx("p", { className: "text-[#3665EE] font-semibold text-sm", children: selectedStudent.hollandCode })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-[#E4F4EC] border-[#C3E6D5] space-y-2", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "AI Recommended Career Goal" }),
                /* @__PURE__ */ jsx("p", { className: "text-[#12163A] font-semibold text-sm", children: selectedStudent.careerGoal })
              ] })
            ] }),
            studentDetailTab === "assessments" && /* @__PURE__ */ jsx("div", { className: "space-y-3", children: ["Aptitude Assessment (Score: 94%)", "Psychometric Holland Code Test (Score: Completed)", "Emotional Intelligence (EQ Score: 88%)"].map((a, i) => /* @__PURE__ */ jsxs("div", { className: "p-3.5 rounded-xl border bg-slate-50 border-slate-200 flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-sm text-[#12163A]", children: a }),
              /* @__PURE__ */ jsx("span", { className: "text-[#3665EE] font-semibold text-xs", children: "Verified" })
            ] }, i)) }),
            studentDetailTab === "learning" && /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-[#DEE9FF] border-[#C6D9FF] space-y-2", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "Key Acquired Skills" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: selectedStudent.topSkills.map((sk) => /* @__PURE__ */ jsx("span", { className: "bg-[#12163A] text-white px-3 py-1 rounded-lg font-medium text-xs", children: sk }, sk)) })
            ] }) }),
            studentDetailTab === "opportunities" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-white border-slate-200 space-y-1", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "Recommended College" }),
                /* @__PURE__ */ jsx("p", { className: "text-[#3665EE] font-semibold text-sm", children: selectedStudent.topCollege })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-[#E4F4EC] border-[#C3E6D5] space-y-1", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "Scholarship Eligibility" }),
                /* @__PURE__ */ jsx("p", { className: "text-[#12163A] font-semibold text-sm", children: selectedStudent.topScholarship })
              ] })
            ] }),
            studentDetailTab === "placement" && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-white border-slate-200 space-y-2", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "ATS Resume Score" }),
              /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-[#3665EE]", children: selectedStudent.resumeScore })
            ] }),
            studentDetailTab === "academic" && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-slate-50 border-slate-200 space-y-2", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "Academic Performance Summary" }),
              /* @__PURE__ */ jsx("p", { className: "text-[#6B7280] text-sm font-normal", children: "Term 1 Average: 89.4% • Attendance: 96.2%" })
            ] })
          ] })
        ] }) })
      ] });
    }
    if (activeSubView === "teachers") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaChalkboardUser, { className: "w-5 h-5 text-[#3665EE]" }),
              " Teacher & Faculty Management"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "142 Registered school teachers & career mentors across departments" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Add Teacher", "Register a new teacher or mentor", [
                { label: "Teacher Name", name: "name", type: "text", placeholder: "Dr. Rajesh Verma" },
                { label: "Department", name: "department", type: "text", placeholder: "Computer Science & AI" },
                { label: "Primary Subject", name: "subject", type: "text", placeholder: "Artificial Intelligence & ML" },
                { label: "Qualification", name: "qualification", type: "text", placeholder: "Ph.D. Computer Science (IIT Delhi)" },
                { label: "Assigned Classes", name: "classes", type: "text", placeholder: "Grade 11-A, 12-A" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Add Teacher"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: teachersList.map((t, i) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] transition-all hover:shadow-md", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: t.name }),
            /* @__PURE__ */ jsxs("span", { className: "text-[#3665EE] font-medium text-xs", children: [
              t.dept,
              " • ",
              t.subject
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-[#4B5563] font-normal", children: [
              t.classes,
              " • Assigned: ",
              t.studentsCount
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setSelectedTeacher(t),
              className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-xs px-3.5 py-1.5 rounded-xl cursor-pointer transition hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsx(FaEye, { className: "w-3.5 h-3.5" }),
                " View Teacher"
              ]
            }
          )
        ] }, i)) })
      ] });
    }
    if (activeSubView === "assessments") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaListCheck, { className: "w-5 h-5 text-[#3665EE]" }),
              " Assessments & Career Readiness Control"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Manage interest assessments, psychometric tests, and aptitude evaluations" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Assign Assessment", "Publish assessment to Grade batches", [
                { label: "Assessment Name", name: "name", type: "text", placeholder: "Grade 10 Aptitude Test" },
                { label: "Target Grade", name: "grade", type: "text", placeholder: "Grade 10" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Assign Assessment"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: assessmentsList.map((as, i) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] border bg-[#F6E6D8] border-[#EAD0BC] flex items-center justify-between text-[#12163A]", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: as.name }),
            /* @__PURE__ */ jsxs("span", { className: "text-[#3665EE] font-medium text-xs", children: [
              as.grade,
              " • Completed: ",
              as.completed,
              "/",
              as.assigned
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-[#12163A] font-semibold text-sm", children: [
              "Avg Score: ",
              as.score
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => onShowToast(`Analyzing results for ${as.name}`), className: "text-[#3665EE] font-medium text-xs hover:underline", children: "View Results" })
          ] })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "reports") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaFileLines, { className: "w-5 h-5 text-[#3665EE]" }),
              " Institutional Career & AI Intelligence Reports"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "School-wide intelligence summaries, skill gap matrices, and AI recommendation distribution" })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => onShowToast("Generated full School Career Intelligence PDF Report"), className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md", children: [
            /* @__PURE__ */ jsx(FaDownload, { className: "w-3.5 h-3.5" }),
            " Download Full PDF Report"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          { title: "Career Interest Distribution Report", desc: "68% STEM • 18% Finance • 14% Creative Arts", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
          { title: "Career DNA Summary Report", desc: "Top Trait: Investigative & Problem Solving", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
          { title: "Skill Gap & AI Recommendation Report", desc: "Top Need: Advanced Data Structures & PyTorch", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
        ].map((rp, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border space-y-2 cursor-pointer ${rp.bg} ${rp.border} text-[#12163A] hover-card-lift`, onClick: () => onShowToast(`Opening ${rp.title}`), children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: rp.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#4B5563] font-normal", children: rp.desc })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "events") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaCalendarDays, { className: "w-5 h-5 text-[#3665EE]" }),
              " Career Events & Guidance Sessions"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Schedule and manage career workshops, college awareness, & parent guidance" })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => openTriggerModal("Schedule Event", "Create a new school guidance workshop", [
            { label: "Event Title", name: "title", type: "text", placeholder: "IIT Admissions Workshop" },
            { label: "Date & Time", name: "date", type: "text", placeholder: "Tomorrow, 10:00 AM" }
          ]), className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md", children: [
            /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
            " Schedule Event"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: eventsList.map((ev, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-[20px] border flex items-center justify-between ${ev.bg} ${ev.border} text-[#12163A]`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: ev.title }),
            /* @__PURE__ */ jsxs("span", { className: "text-[#3665EE] font-medium text-xs", children: [
              ev.date,
              " • ",
              ev.attendees
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "bg-[#12163A] text-white font-medium text-xs px-3 py-1 rounded-full", children: "Upcoming" })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "analytics") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaArrowTrendUp, { className: "w-5 h-5 text-[#3665EE]" }),
            " School-Wide Student Growth & Engagement Analytics"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Institutional analytics for career readiness growth, engagement index, and skill mastery" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] text-[#4B5563]", children: "Student Growth Rate" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-[#12163A] mt-1", children: "+14.2% YoY" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] text-[#4B5563]", children: "Overall Engagement Index" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-[#3665EE] mt-1", children: "94.8%" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] text-[#4B5563]", children: "Skill Mastery Benchmark" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-[#12163A] mt-1", children: "89% Advanced" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "performance") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaBrain, { className: "w-5 h-5 text-[#3665EE]" }),
            " Academic & Career Performance Monitoring"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Grade performance, attendance tracking, and assessment score distributions" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          { title: "Academic Avg Score", val: "84.5%", sub: "96% Attendance Rate", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
          { title: "Assessment Score Avg", val: "88.0%", sub: "91% Completion", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
          { title: "Skill Development", val: "92.4%", sub: "Top Benchmark", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
        ].map((pf, i) => /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-[24px] border space-y-1 ${pf.bg} ${pf.border} text-[#12163A]`, children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] text-[#4B5563]", children: pf.title }),
          /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-[#12163A]", children: pf.val }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-[#4B5563]", children: pf.sub })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "placement") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaBriefcase, { className: "w-5 h-5 text-[#3665EE]" }),
            " Placement & Internship Readiness Reports"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Higher-ed placement readiness, internship qualifiers, and ATS resume ratings" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] text-[#4B5563]", children: "Placement Ready" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-[#12163A] mt-1", children: "3,420 Students" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] text-[#4B5563]", children: "Internship Ready" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-[#3665EE] mt-1", children: "2,980 Students" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] text-[#4B5563]", children: "Resume ATS Verified" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-[#12163A] mt-1", children: "3,120 Verified" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-rose-50 border border-rose-200 text-rose-800", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] text-rose-600", children: "Requiring Guidance" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-rose-700 mt-1", children: "180 Students" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "notifications") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaBullhorn, { className: "w-5 h-5 text-[#3665EE]" }),
              " School Admin Notifications & Alerts"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Assessment reminders, student milestones, scholarship deadlines" })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => onShowToast("Marked all notifications as read"), className: "text-[#3665EE] font-medium text-sm hover:underline cursor-pointer", children: "Mark All as Read" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          { title: "Grade 10 Holland Code Assessment Completed", time: "10 mins ago", type: "Assessment Alert", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
          { title: "National STEM Scholarship Deadline Closing in 3 Days", time: "1 hour ago", type: "Scholarship Deadline", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
          { title: "Parent Career Guidance Workshop Scheduled for 15th August", time: "3 hours ago", type: "Event Reminder", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
        ].map((nt, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-[20px] border flex items-center justify-between ${nt.bg} ${nt.border} text-[#12163A]`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: nt.title }),
            /* @__PURE__ */ jsxs("span", { className: "text-[#3665EE] font-medium text-xs", children: [
              nt.type,
              " • ",
              nt.time
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium", children: "New" })
        ] }, i)) })
      ] });
    }
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaSliders, { className: "w-5 h-5 text-[#3665EE]" }),
          " School Governance & System Settings"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Configure school profile, academic year, grade management, and teacher permissions" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "School Profile & Accreditation" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#4B5563]", children: "St. Xavier's International School • Academic Year 2026-2027" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "Teacher & Admin Permissions" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#4B5563]", children: "142 Teacher Accounts • Role-Based Access Enabled" })
        ] })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    renderContent(),
    /* @__PURE__ */ jsx(
      ActionModal,
      {
        isOpen: isActionModalOpen,
        title: actionModalConfig.title,
        subtitle: actionModalConfig.subtitle,
        fields: actionModalConfig.fields,
        onClose: () => setIsActionModalOpen(false),
        onSubmit: handleModalFormSubmit,
        isDarkMode
      }
    ),
    selectedTeacher && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 backdrop-blur-md bg-[#12163A]/70 flex items-center justify-center p-4 animate-fade-in font-sans", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[28px] max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-scale-up text-sm font-sans", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-6 py-5 bg-[#12163A] text-white flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-[#3665EE] flex items-center justify-center font-bold text-base text-white shadow-md", children: /* @__PURE__ */ jsx(FaChalkboardUser, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base text-white", children: selectedTeacher.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-300 font-normal", children: selectedTeacher.qualification })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedTeacher(null),
            className: "p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer text-white",
            children: /* @__PURE__ */ jsx(FaXmark, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-4 text-[#12163A]", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-3.5 rounded-2xl bg-[#DEE9FF] border border-[#C6D9FF]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-xs text-[#4B5563] block", children: "Department & Subject" }),
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm text-[#12163A] mt-0.5", children: selectedTeacher.dept }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-[#3665EE] font-medium", children: selectedTeacher.subject })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-3.5 rounded-2xl bg-[#E4F4EC] border border-[#C3E6D5]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-xs text-[#4B5563] block", children: "Faculty Rating & Status" }),
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm text-[#12163A] mt-0.5", children: selectedTeacher.rating }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-emerald-700 font-medium", children: selectedTeacher.experience })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-[#F6E6D8] border border-[#EAD0BC] space-y-2", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "Assigned Classes & Batches" }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm font-normal text-[#12163A]", children: [
            selectedTeacher.classes,
            " • ",
            selectedTeacher.studentsCount
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#4B5563] font-normal", children: [
            "Official Email: ",
            /* @__PURE__ */ jsx("span", { className: "font-mono text-[#3665EE] font-medium", children: selectedTeacher.email })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-white border border-slate-200 space-y-1", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "Supervised Student Science & Career Projects" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#4B5563]", children: selectedTeacher.projects })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-3 flex items-center justify-end gap-3 border-t border-slate-100", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                onShowToast(`Downloaded faculty dossier PDF for ${selectedTeacher.name}`);
                setSelectedTeacher(null);
              },
              className: "px-4 py-2.5 rounded-xl font-medium text-sm bg-[#3665EE] text-white hover:bg-[#2A54D5] transition cursor-pointer shadow-sm flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsx(FaDownload, { className: "w-3.5 h-3.5" }),
                " Download Dossier PDF"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedTeacher(null),
              className: "px-4 py-2.5 rounded-xl font-medium text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer",
              children: "Close"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
};
const CollegeDashboard = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState({
    title: "",
    subtitle: "",
    fields: []
  });
  const [programsList, setProgramsList] = useState([
    { code: "CS-101", title: "B.Tech Computer Science & AI", degree: "Undergraduate (4 Yrs)", seats: 480, enrolled: 472, avgCtc: "₹28.5 LPA" },
    { code: "ECE-201", title: "B.Tech Electronics & Communication", degree: "Undergraduate (4 Yrs)", seats: 360, enrolled: 350, avgCtc: "₹22.0 LPA" },
    { code: "MBA-301", title: "MBA Fintech & Analytics", degree: "Postgraduate (2 Yrs)", seats: 240, enrolled: 235, avgCtc: "₹24.0 LPA" },
    { code: "DS-401", title: "M.Tech Data Science & MLOps", degree: "Postgraduate (2 Yrs)", seats: 180, enrolled: 175, avgCtc: "₹26.5 LPA" },
    { code: "BIO-501", title: "B.Sc Biotech & Bioinformatics", degree: "Undergraduate (3 Yrs)", seats: 200, enrolled: 190, avgCtc: "₹18.0 LPA" }
  ]);
  const [admissionsList, setAdmissionsList] = useState([
    { title: "JEE Advanced Engineering Drive", cutoff: "JEE Adv Rank < 500", seats: "480 Seats", applied: "14,200 Applicants", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
    { title: "BITSAT Merit Admission Drive", cutoff: "BITSAT Score > 320", seats: "360 Seats", applied: "8,900 Applicants", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
    { title: "GATE Post-Graduate Drive", cutoff: "GATE Score > 750", seats: "180 Seats", applied: "4,100 Applicants", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
    { title: "CAT MBA Admission Drive", cutoff: "CAT Percentile > 98.5%", seats: "240 Seats", applied: "6,800 Applicants", bg: "bg-white", border: "border-slate-200" }
  ]);
  const [scholarshipsList, setScholarshipsList] = useState([
    { title: "National STEM Merit Fellowship", pool: "₹3.5 Crores", applicants: "420 Applicants", disbursed: "₹2.8 Crores Disbursed", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
    { title: "Global AI & Innovation Merit Grant", pool: "₹2.5 Crores", applicants: "290 Applicants", disbursed: "₹2.0 Crores Disbursed", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
    { title: "Higher Education Equity Aid", pool: "₹1.5 Crores", applicants: "180 Applicants", disbursed: "₹1.2 Crores Disbursed", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" }
  ]);
  const [drivesList, setDrivesList] = useState([
    { company: "Google Cloud India", role: "Cloud Solutions Engineer", ctc: "₹28.0 LPA", applicants: "180 Shortlisted", status: "Interview Phase" },
    { company: "Infosys Technologies", role: "Specialist Programmer", ctc: "₹9.5 LPA", applicants: "420 Students", status: "Active Drive" },
    { company: "TCS Enterprise", role: "Digital Innovator", ctc: "₹7.0 LPA", applicants: "890 Students", status: "Registrations Open" },
    { company: "Microsoft Research", role: "AI Research Scientist", ctc: "₹35.0 LPA", applicants: "95 Shortlisted", status: "Shortlisting Phase" }
  ]);
  const [partnersList, setPartnersList] = useState([
    { company: "Amazon Web Services (AWS)", track: "Cloud Architecture Internships", mou: "Active (6-Month Cohort)", status: "Active Partner" },
    { company: "Microsoft Corp", track: "AI & Quantum Computing Lab", mou: "Active (R&D Sponsorship)", status: "Active Partner" },
    { company: "Google Cloud", track: "AI Academy Certification Track", mou: "Active (Faculty & Student Access)", status: "Active Partner" },
    { company: "Goldman Sachs", track: "Quantitative Finance Mentorship", mou: "Active (Campus Hiring MoU)", status: "Active Partner" }
  ]);
  const [applicationsList, setApplicationsList] = useState([
    { id: "APP-9901", name: "Aarav Sharma", program: "B.Tech Computer Science & AI", score: "JEE Adv Rank 420", status: "Verified & Enrolled", docs: "Complete" },
    { id: "APP-9902", name: "Ananya Roy", program: "B.Tech Electronics & Comm", score: "JEE Adv Rank 880", status: "Verified & Enrolled", docs: "Complete" },
    { id: "APP-9903", name: "Karan Patel", program: "MBA Fintech & Analytics", score: "CAT 99.2 Percentile", status: "Under Review", docs: "Pending Verification" },
    { id: "APP-9904", name: "Riya Sen", program: "M.Tech Data Science", score: "GATE Score 790", status: "Verified & Enrolled", docs: "Complete" }
  ]);
  const openTriggerModal = (title, subtitle, fields) => {
    setActionModalConfig({ title, subtitle, fields });
    setIsActionModalOpen(true);
  };
  const handleModalFormSubmit = (data) => {
    if (actionModalConfig.title === "Add Academic Program") {
      const newProg = {
        code: `PRG-${Math.floor(100 + Math.random() * 900)}`,
        title: data.title || "Specialized Tech Degree",
        degree: data.degree || "Undergraduate (4 Yrs)",
        seats: parseInt(data.seats) || 120,
        enrolled: 1,
        avgCtc: data.avgCtc || "₹20.0 LPA"
      };
      setProgramsList([newProg, ...programsList]);
      onShowToast(`Added new academic program: ${newProg.title}!`);
    } else if (actionModalConfig.title === "Launch Admission Drive") {
      const newDrive = {
        title: data.title || "Entrance Admission Drive 2026",
        cutoff: data.cutoff || "JEE Adv Rank < 1000",
        seats: data.seats ? data.seats.toLowerCase().includes("seat") ? data.seats : `${data.seats} Seats` : "300 Seats",
        applied: "0 Applicants",
        bg: "bg-[#DEE9FF]",
        border: "border-[#C6D9FF]"
      };
      setAdmissionsList([newDrive, ...admissionsList]);
      onShowToast(`Launched new admission drive: ${newDrive.title}!`);
    } else if (actionModalConfig.title === "Create Scholarship Fund") {
      const newScholarship = {
        title: data.title || "Alumni STEM Merit Aid",
        pool: data.amount || "₹1.0 Crore",
        applicants: "0 Applicants",
        disbursed: "₹0 Disbursed",
        bg: "bg-[#DEE9FF]",
        border: "border-[#C6D9FF]"
      };
      setScholarshipsList([newScholarship, ...scholarshipsList]);
      onShowToast(`Created scholarship fund: ${newScholarship.title}!`);
    } else if (actionModalConfig.title === "Schedule Placement Drive") {
      const newDrive = {
        company: data.company || "Corporate Recruiter",
        role: data.role || "Graduate Software Engineer",
        ctc: data.ctc || "₹14.0 LPA",
        applicants: "1 Enrolled",
        status: "Registrations Open"
      };
      setDrivesList([newDrive, ...drivesList]);
      onShowToast(`Scheduled campus placement drive for ${newDrive.company}!`);
    } else if (actionModalConfig.title === "Register Corporate Partner") {
      const newPartner = {
        company: data.company || "Enterprise Tech Partner",
        track: data.track || "Industry Internship Track",
        mou: "Active (Campus MoU Signed)",
        status: "Active Partner"
      };
      setPartnersList([newPartner, ...partnersList]);
      onShowToast(`Registered corporate partner: ${newPartner.company}!`);
    } else {
      onShowToast(`Action completed: ${actionModalConfig.title}`);
    }
    setIsActionModalOpen(false);
  };
  const renderContent = () => {
    if (activeSubView === "overview") {
      return /* @__PURE__ */ jsxs("div", { className: "space-y-6 font-sans", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#12163A] text-white shadow-md border border-[#12163A] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-slate-300", children: "Total Enrolled Undergrads" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight text-white", children: "11,450" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full inline-block", children: "9 Active Batches" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-[#4B5563]", children: "Placement Rate" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight text-[#12163A]", children: "94.2%" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#3665EE]", children: "+5.1% YoY Increase" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-[#4B5563]", children: "Corporate Placement Drives" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight text-[#3665EE]", children: "148 Drives" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#12163A]", children: "18 Drives Open Now" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-[#4B5563]", children: "Average CTC Package" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight text-[#12163A]", children: "₹24.5 LPA" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#3665EE]", children: "Max Package: ₹110 LPA" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base text-[#12163A]", children: "College Registration & Institutional Accreditation" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Verified University Portal • NIRF Rank #1 • NAAC A++ Grade" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "bg-[#E4F4EC] text-[#12163A] font-medium text-xs px-3.5 py-1 rounded-full border border-[#C3E6D5]", children: "✓ Verification Completed" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 pt-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-1", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] text-[#4B5563]", children: "Admissions Pipeline" }),
              /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-[#3665EE]", children: "1,470 Seats Filled" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-[#4B5563]", children: "98.2% Capacity Enrolled" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A] space-y-1", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] text-[#4B5563]", children: "Scholarships Disbursed" }),
              /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-[#12163A]", children: "₹6.3 Crores" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-[#4B5563]", children: "890 Merit Recipients" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] bg-[#E4F4EC] border border-[#C3E6D5] text-[#12163A] space-y-1", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] text-[#4B5563]", children: "Industry MoUs Active" }),
              /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-[#12163A]", children: "42 Active MoUs" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#3665EE]", children: "Top Global Enterprise Partners" })
            ] })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "programs") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaBookOpen, { className: "w-5 h-5 text-[#3665EE]" }),
              " Academic Programs & Degree Tracks"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Manage undergraduate, postgraduate, and doctoral degree programs" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Add Academic Program", "Register a new degree track or specialized program", [
                { label: "Program Title", name: "title", type: "text", placeholder: "B.Tech Computer Science & AI" },
                { label: "Degree Level", name: "degree", type: "text", placeholder: "Undergraduate (4 Yrs)" },
                { label: "Seat Capacity", name: "seats", type: "number", placeholder: "480" },
                { label: "Expected Avg CTC", name: "avgCtc", type: "text", placeholder: "₹25.0 LPA" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Add Academic Program"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: programsList.map((p, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs bg-[#12163A] text-white px-2 py-0.5 rounded-md font-medium", children: p.code }),
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: p.title })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#4B5563] font-normal mt-1", children: [
              p.degree,
              " • Enrolled: ",
              p.enrolled,
              " / ",
              p.seats,
              " Seats"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-[#3665EE] font-semibold text-sm", children: [
              "Avg CTC: ",
              p.avgCtc
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs bg-white text-[#12163A] border border-slate-200 px-2.5 py-0.5 rounded-full font-medium", children: "Active Track" })
          ] })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "admissions") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaUserCheck, { className: "w-5 h-5 text-[#3665EE]" }),
              " College Admissions & Entrance Cutoff Hub"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Configure admission drives, entrance examination ranks, & seat quotas" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Launch Admission Drive", "Open a new admission cycle for target entrance exams", [
                { label: "Drive Title", name: "title", type: "text", placeholder: "JEE Advanced Engineering Drive 2026" },
                { label: "Target Cutoff Rank", name: "cutoff", type: "text", placeholder: "JEE Adv Rank < 500" },
                { label: "Seat Capacity", name: "seats", type: "text", placeholder: "480 Seats" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Launch Admission Drive"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: admissionsList.map((ad, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border space-y-2 ${ad.bg} ${ad.border} text-[#12163A] hover-card-lift`, children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium", children: ad.cutoff }),
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: ad.title }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm pt-1", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#3665EE]", children: ad.seats }),
            /* @__PURE__ */ jsx("span", { className: "text-[#4B5563] font-normal", children: ad.applied })
          ] })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "applications") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaFileLines, { className: "w-5 h-5 text-[#3665EE]" }),
              " Student Application & Enrollment Pipeline"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Review student application forms, entrance rankings, and document verification" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => onShowToast("Exported Applications Pipeline CSV"),
              className: "px-4 py-2.5 rounded-xl font-medium text-sm border border-slate-200 bg-slate-50 text-[#12163A] hover:bg-slate-100 transition cursor-pointer flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(FaDownload, { className: "w-3.5 h-3.5" }),
                " Export Applications"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "rounded-[24px] border border-slate-200 overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b text-xs font-semibold uppercase tracking-wider bg-[#DEE9FF]/50 text-[#12163A] border-[#C6D9FF]", children: [
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Application ID" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Student Name" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Program Applied" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Entrance Score" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Document Status" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Application Status" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5 text-right", children: "Action" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-100 text-sm font-normal", children: applicationsList.map((app) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-[#DEE9FF]/20 transition-colors", children: [
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-mono text-[#3665EE] font-medium text-xs", children: app.id }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-semibold text-[#12163A]", children: app.name }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 text-[#4B5563]", children: app.program }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-medium text-[#12163A]", children: app.score }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-medium text-emerald-600", children: app.docs }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5", children: /* @__PURE__ */ jsx("span", { className: "bg-[#E4F4EC] text-[#12163A] border border-[#C3E6D5] px-2.5 py-0.5 rounded-full font-medium text-xs", children: app.status }) }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 text-right", children: /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onShowToast(`Reviewed application for ${app.name}`),
                className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-medium px-3 py-1.5 rounded-lg text-xs transition cursor-pointer",
                children: "Review"
              }
            ) })
          ] }, app.id)) })
        ] }) })
      ] });
    }
    if (activeSubView === "scholarships") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaAward, { className: "w-5 h-5 text-[#3665EE]" }),
              " Institutional Scholarship & Aid Cell"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "₹8.5 Crores in institutional merit aid and corporate scholarship grants" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Create Scholarship Fund", "Establish a new merit or need-based aid fund", [
                { label: "Scholarship Name", name: "title", type: "text", placeholder: "Alumni STEM Merit Aid" },
                { label: "Annual Fund Pool", name: "amount", type: "text", placeholder: "₹1.5 Crores" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Create Scholarship Fund"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: scholarshipsList.map((sch, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border flex items-center justify-between ${sch.bg} ${sch.border} text-[#12163A] hover-card-lift`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: sch.title }),
            /* @__PURE__ */ jsxs("span", { className: "text-[#3665EE] font-medium text-xs", children: [
              "Pool: ",
              sch.pool,
              " • ",
              sch.applicants
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm text-[#12163A]", children: sch.disbursed }),
            /* @__PURE__ */ jsx("span", { className: "text-xs bg-white border border-slate-200 text-[#12163A] px-2.5 py-0.5 rounded-full font-medium", children: "Active Fund" })
          ] })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "placement-cell" || activeSubView === "drives") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaBriefcase, { className: "w-5 h-5 text-[#3665EE]" }),
              " Campus Placement Cell & Recruitment Hub"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Manage corporate placement drives, CTC packages, & interview schedules" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Schedule Placement Drive", "Publish a new corporate recruiting drive", [
                { label: "Company Name", name: "company", type: "text", placeholder: "Microsoft India" },
                { label: "Job Role Title", name: "role", type: "text", placeholder: "Software Development Engineer" },
                { label: "Annual CTC Package", name: "ctc", type: "text", placeholder: "₹24.0 LPA" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Schedule Placement Drive"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: drivesList.map((d, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: d.company }),
            /* @__PURE__ */ jsx("span", { className: "text-[#3665EE] font-medium text-xs", children: d.role }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-[#4B5563] font-normal", children: d.applicants })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[#12163A] font-semibold text-sm", children: d.ctc }),
            /* @__PURE__ */ jsx("span", { className: "text-xs bg-white border border-slate-200 text-[#12163A] px-2.5 py-0.5 rounded-full font-medium", children: d.status })
          ] })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "industry-connect") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaHandshake, { className: "w-5 h-5 text-[#3665EE]" }),
              " Industry Connect & Enterprise MoUs"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Corporate partnerships, R&D labs, and summer/winter internship tracks" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Register Corporate Partner", "Sign a new campus recruiting MoU", [
                { label: "Company Name", name: "company", type: "text", placeholder: "NVIDIA Graphics India" },
                { label: "Internship / MoU Track", name: "track", type: "text", placeholder: "AI Hardware & CUDA Labs" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Register Corporate Partner"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: partnersList.map((pr, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#F6E6D8] border-[#EAD0BC] space-y-2 text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium", children: pr.status }),
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: pr.company }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#3665EE] font-medium", children: pr.track }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-[#4B5563] font-normal", children: pr.mou })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "analytics") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaArrowTrendUp, { className: "w-5 h-5 text-[#3665EE]" }),
            " Institutional Performance & Placement Analytics"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Placement trends, NIRF benchmarks, and corporate compensation distributions" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] text-[#4B5563]", children: "YoY Placement Growth" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-[#12163A] mt-1", children: "+5.1% YoY" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] text-[#4B5563]", children: "Software & AI Hiring Share" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-[#3665EE] mt-1", children: "62.0%" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] text-[#4B5563]", children: "Highest Package Recorded" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-[#12163A] mt-1", children: "₹110 LPA" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "notifications") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaBullhorn, { className: "w-5 h-5 text-[#3665EE]" }),
              " College Admin Notifications & Announcements"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Placement deadlines, MoU updates, and institutional accreditation alerts" })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => onShowToast("Marked all notifications as read"), className: "text-[#3665EE] font-medium text-sm hover:underline cursor-pointer", children: "Mark All as Read" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          { title: "Placement Drive Registrations Closing for Microsoft India", time: "15 mins ago", type: "Placement Alert", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
          { title: "National STEM Scholarship Disbursal Batch Approved", time: "2 hours ago", type: "Scholarship Disbursal", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
          { title: "NIRF Ranking Audit Verification Completed Successfully", time: "5 hours ago", type: "NIRF Audit", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" }
        ].map((nt, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-[20px] border flex items-center justify-between ${nt.bg} ${nt.border} text-[#12163A]`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: nt.title }),
            /* @__PURE__ */ jsxs("span", { className: "text-[#3665EE] font-medium text-xs", children: [
              nt.type,
              " • ",
              nt.time
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium", children: "New" })
        ] }, i)) })
      ] });
    }
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaSliders, { className: "w-5 h-5 text-[#3665EE]" }),
          " College Governance & System Settings"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Configure institutional profile, academic year, campus settings, & user permissions" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "University Profile & NAAC Grade" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#4B5563]", children: "Indian Institute of Technology / University Desk • NIRF Rank #1 • NAAC A++" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "Faculty & Placement Cell Permissions" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#4B5563]", children: "85 Placement Officers & Faculty Accounts • RBAC Access Enabled" })
        ] })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    renderContent(),
    /* @__PURE__ */ jsx(
      ActionModal,
      {
        isOpen: isActionModalOpen,
        title: actionModalConfig.title,
        subtitle: actionModalConfig.subtitle,
        fields: actionModalConfig.fields,
        onClose: () => setIsActionModalOpen(false),
        onSubmit: handleModalFormSubmit,
        isDarkMode
      }
    )
  ] });
};
const LiveCallModal = ({
  isOpen,
  participantName,
  participantRole,
  onClose,
  onShowToast,
  isDarkMode = true
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { sender: participantName, text: "Hello Dr. Sharma! Excited to review my AI engineering pathway.", time: "12:00 PM" },
    { sender: "System AI", text: "✓ HD Encrypted Call Established. Live AI Speech Transcription Active.", time: "12:00 PM" }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [sessionNote, setSessionNote] = useState("");
  const [notesSaved, setNotesSaved] = useState(false);
  const chatBottomRef = useRef(null);
  useEffect(() => {
    let interval;
    if (isOpen) {
      setCallSeconds(0);
      interval = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1e3);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen]);
  useEffect(() => {
    var _a2;
    (_a2 = chatBottomRef.current) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatOpen]);
  if (!isOpen) return null;
  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const now = (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChatMessages((prev) => [...prev, { sender: "You (Mentor)", text: inputMsg.trim(), time: now }]);
    setInputMsg("");
  };
  const handleSaveNotes = () => {
    if (!sessionNote.trim()) {
      onShowToast("Please enter session notes before saving.");
      return;
    }
    setNotesSaved(true);
    onShowToast(`Session notes for ${participantName} saved to Student Portfolio!`);
  };
  const handleEndCall = () => {
    onShowToast(`Video Call Ended with ${participantName}. Call Duration: ${formatTimer(callSeconds)}.`);
    onClose();
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in font-sans text-white", children: /* @__PURE__ */ jsxs("div", { className: `w-full max-w-6xl h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative ${isFullscreen ? "fixed inset-0 h-screen max-w-none rounded-none" : ""}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "h-16 px-6 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between z-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm text-white", children: participantName }),
            /* @__PURE__ */ jsxs("span", { className: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" }),
              "LIVE • 1080p Encrypted"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 font-normal", children: participantRole })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-800/80 border border-slate-700/60 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium text-blue-400 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-blue-500 animate-pulse" }),
          formatTimer(callSeconds)
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsFullscreen(!isFullscreen),
            className: "p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer",
            title: isFullscreen ? "Exit Fullscreen" : "Fullscreen",
            children: isFullscreen ? /* @__PURE__ */ jsx(Minimize2, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Maximize2, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleEndCall,
            className: "p-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition cursor-pointer",
            title: "Close Room",
            children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex overflow-hidden relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-slate-950 p-4 flex flex-col relative justify-between overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 flex items-center justify-center group", children: [
          isScreenSharing ? (
            /* Screen Share Simulation */
            /* @__PURE__ */ jsxs("div", { className: "w-full h-full bg-slate-900 p-6 flex flex-col items-center justify-center space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400", children: /* @__PURE__ */ jsx(Monitor, { className: "w-12 h-12 animate-pulse" }) }),
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-white", children: "Sharing Screen: Neural Network Architecture Review.pdf" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-slate-400 max-w-sm text-center", children: "Live screen broadcast active for 1-on-1 counseling session." })
            ] })
          ) : (
            /* Participant Avatar / Camera Video Simulation */
            /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative mb-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-4xl font-bold shadow-2xl border-4 border-slate-800", children: participantName.split(" ").map((n) => n[0]).join("") }),
                /* @__PURE__ */ jsxs("div", { className: "absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-lg", children: [
                  /* @__PURE__ */ jsx(Volume2, { className: "w-3 h-3 animate-bounce" }),
                  " Speaking"
                ] })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white", children: participantName }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 font-normal", children: participantRole })
            ] })
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 w-44 h-32 rounded-2xl overflow-hidden bg-slate-800 border-2 border-slate-700/80 shadow-2xl flex flex-col items-center justify-center transition-all hover:scale-105", children: isVideoOff ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center text-slate-400", children: [
            /* @__PURE__ */ jsx(VideoOff, { className: "w-6 h-6 mb-1 text-slate-500" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", children: "Camera Paused" })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "w-full h-full bg-gradient-to-br from-indigo-900 to-slate-900 flex flex-col items-center justify-center relative p-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-xs shadow-md", children: "YOU" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-slate-300 mt-1", children: "Dr. Rajesh (You)" }),
            /* @__PURE__ */ jsx("span", { className: "absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-400" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-4 left-4 bg-slate-950/70 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-medium", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-blue-400 animate-pulse" }),
            /* @__PURE__ */ jsx("span", { children: "AI Live Transcript & Holland Code DNA Active" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 flex items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setIsMuted(!isMuted);
                onShowToast(isMuted ? "Microphone Unmuted" : "Microphone Muted");
              },
              className: `p-3.5 rounded-2xl font-medium transition shadow-lg cursor-pointer flex items-center gap-2 ${isMuted ? "bg-rose-600 text-white hover:bg-rose-700" : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"}`,
              title: isMuted ? "Unmute Microphone" : "Mute Microphone",
              children: isMuted ? /* @__PURE__ */ jsx(MicOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Mic, { className: "w-5 h-5 text-blue-400" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setIsVideoOff(!isVideoOff);
                onShowToast(isVideoOff ? "Camera Enabled" : "Camera Disabled");
              },
              className: `p-3.5 rounded-2xl font-medium transition shadow-lg cursor-pointer flex items-center gap-2 ${isVideoOff ? "bg-rose-600 text-white hover:bg-rose-700" : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"}`,
              title: isVideoOff ? "Start Video" : "Stop Video",
              children: isVideoOff ? /* @__PURE__ */ jsx(VideoOff, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Video, { className: "w-5 h-5 text-blue-400" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setIsScreenSharing(!isScreenSharing);
                onShowToast(isScreenSharing ? "Stopped Screen Sharing" : "Started Screen Sharing");
              },
              className: `p-3.5 rounded-2xl font-medium transition shadow-lg cursor-pointer flex items-center gap-2 ${isScreenSharing ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"}`,
              title: "Share Screen",
              children: /* @__PURE__ */ jsx(Monitor, { className: "w-5 h-5 text-blue-400" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsChatOpen(!isChatOpen),
              className: `p-3.5 rounded-2xl font-medium transition shadow-lg cursor-pointer flex items-center gap-2 ${isChatOpen ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"}`,
              title: "Toggle In-Call Chat & Notes",
              children: /* @__PURE__ */ jsx(MessageSquare, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleEndCall,
              className: "px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm transition shadow-lg cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(PhoneOff, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsx("span", { children: "End Call" })
              ]
            }
          )
        ] })
      ] }),
      isChatOpen && /* @__PURE__ */ jsxs("div", { className: "w-80 md:w-96 bg-slate-900 border-l border-slate-800 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-sm flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4 text-blue-400" }),
            " Live Chat & AI Takeaways"
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsChatOpen(false),
              className: "text-slate-400 hover:text-white transition cursor-pointer",
              children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-3", children: [
          chatMessages.map((msg, i) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: `p-3 rounded-2xl space-y-1 ${msg.sender.includes("You") ? "bg-blue-600/30 border border-blue-500/40 ml-4 text-white" : msg.sender.includes("System") ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300" : "bg-slate-800 border border-slate-700/80 mr-4 text-slate-200"}`,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs font-medium opacity-80", children: [
                  /* @__PURE__ */ jsx("span", { children: msg.sender }),
                  /* @__PURE__ */ jsx("span", { children: msg.time })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-normal leading-relaxed", children: msg.text })
              ]
            },
            i
          )),
          /* @__PURE__ */ jsx("div", { ref: chatBottomRef })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 border-t border-slate-800 bg-slate-950/40 space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("label", { className: "text-[13px] font-medium text-slate-300 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(FileText, { className: "w-3.5 h-3.5 text-blue-400" }),
              " In-Call Session Takeaways"
            ] }),
            notesSaved && /* @__PURE__ */ jsxs("span", { className: "text-xs font-medium text-emerald-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3 h-3" }),
              " Saved"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 2,
              value: sessionNote,
              onChange: (e) => {
                setSessionNote(e.target.value);
                setNotesSaved(false);
              },
              placeholder: "Record action items for student portfolio...",
              className: "w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm font-normal text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleSaveNotes,
              className: "w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5",
              children: "Save Notes to Portfolio"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSendMessage, className: "p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: inputMsg,
              onChange: (e) => setInputMsg(e.target.value),
              placeholder: "Send live message...",
              className: "flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-normal text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "p-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition cursor-pointer flex items-center justify-center",
              children: /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" })
            }
          )
        ] })
      ] })
    ] })
  ] }) });
};
const MentorDashboard = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState({
    title: "",
    subtitle: "",
    fields: []
  });
  const [isLiveCallOpen, setIsLiveCallOpen] = useState(false);
  const [liveCallParticipant, setLiveCallParticipant] = useState({ name: "Aarav Sharma", role: "Grade 12-A • AI Track" });
  const [walletBalance, setWalletBalance] = useState(48500);
  const [hourlyRate, setHourlyRate] = useState(1500);
  const [mentorTitle, setMentorTitle] = useState("Senior Career Counselor & AI Specialist");
  const [mentorBio, setMentorBio] = useState("AI Architecture, Neural Systems & Career Strategy Specialist with 12+ years mentoring top STEM candidates.");
  const [guidanceList, setGuidanceList] = useState([
    { name: "Aarav Sharma", code: "RIE (Realistic, Investigative, Enterprising)", score: "Career Score 92/100", recommendation: "AI & ML Systems Engineering Track" },
    { name: "Ananya Roy", code: "ISA (Investigative, Social, Artistic)", score: "Career Score 88/100", recommendation: "Biotech & Bio-Informatics Track" }
  ]);
  const [skillsList, setSkillsList] = useState([
    { name: "AI & MLOps Architecture", level: "Expert", mentees: "18 Students Mentored" },
    { name: "Full-Stack System Design", level: "Expert", mentees: "24 Students Mentored" },
    { name: "Quant Finance & Stochastics", level: "Advanced", mentees: "12 Students Mentored" },
    { name: "ATS Resume & Tech Interview Prep", level: "Master Counselor", mentees: "42 Students Mentored" }
  ]);
  const [slotsList, setSlotsList] = useState([
    { id: 1, day: "Today", time: "2:00 PM - 3:00 PM", mentee: "Aarav Sharma", topic: "AI Engineer Roadmap Review", status: "Confirmed Session", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
    { id: 2, day: "Today", time: "4:00 PM - 5:00 PM", mentee: "Ananya Roy", topic: "Biotech & Genomics Research", status: "Confirmed Session", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
    { id: 3, day: "Tomorrow", time: "11:00 AM - 12:00 PM", mentee: "Open Slot", topic: "1-on-1 Career Strategy", status: "Available", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
    { id: 4, day: "Tomorrow", time: "3:00 PM - 4:00 PM", mentee: "Open Slot", topic: "Resume & Portfolio Feedback", status: "Available", bg: "bg-white", border: "border-slate-200" }
  ]);
  const [requestsList, setRequestsList] = useState([
    { id: "REQ-401", name: "Karan Patel", goal: "Quant Analyst at Goldman Sachs", slot: "Tomorrow, 5:00 PM", topic: "Stochastic Calculus & Mock Interview", match: "98% Neural Alignment", status: "Pending Approval" },
    { id: "REQ-402", name: "Riya Sen", goal: "Robotics Engineer at Boston Dynamics", slot: "Friday, 10:00 AM", topic: "ROS2 & Embedded C++ Career Guidance", match: "95% Neural Alignment", status: "Pending Approval" }
  ]);
  const [payoutsList, setPayoutsList] = useState([
    { id: "TXN-8801", date: "01 Aug 2026", amount: "₹18,000", status: "Processed & Paid", account: "HDFC Bank (•••• 4092)" },
    { id: "TXN-8802", date: "15 Jul 2026", amount: "₹24,500", status: "Processed & Paid", account: "HDFC Bank (•••• 4092)" }
  ]);
  const openTriggerModal = (title, subtitle, fields) => {
    setActionModalConfig({ title, subtitle, fields });
    setIsActionModalOpen(true);
  };
  const handleModalFormSubmit = (data) => {
    if (actionModalConfig.title === "Add Available Slot") {
      const newSlot = {
        id: Date.now(),
        day: data.day || "Tomorrow",
        time: data.time || "2:00 PM - 3:00 PM",
        mentee: "Open Slot",
        topic: data.topic || "1-on-1 Career Counseling",
        status: "Available",
        bg: "bg-[#DEE9FF]",
        border: "border-[#C6D9FF]"
      };
      setSlotsList([newSlot, ...slotsList]);
      onShowToast(`Added new availability slot for ${newSlot.day} (${newSlot.time})!`);
    } else if (actionModalConfig.title === "Add Mentorship Skill") {
      const newSkill = {
        name: data.name || "Technical Domain",
        level: data.level || "Expert",
        mentees: "1 Student Mentored"
      };
      setSkillsList([newSkill, ...skillsList]);
      onShowToast(`Added mentorship expertise domain: ${newSkill.name}!`);
    } else if (actionModalConfig.title === "Edit Profile & Rates") {
      if (data.rate) setHourlyRate(parseInt(data.rate) || hourlyRate);
      if (data.bio) setMentorBio(data.bio);
      if (data.title) setMentorTitle(data.title);
      onShowToast(`Updated profile details & session rate (₹${data.rate || hourlyRate}/hr)!`);
    } else if (actionModalConfig.title === "Request Payout Withdrawal") {
      const withdrawAmt = parseInt(data.amount) || 1e4;
      if (withdrawAmt > walletBalance) {
        onShowToast("Insufficient wallet balance for withdrawal!");
      } else {
        setWalletBalance((prev) => prev - withdrawAmt);
        const newPayout = {
          id: `TXN-${Math.floor(1e3 + Math.random() * 9e3)}`,
          date: "Today",
          amount: `₹${withdrawAmt.toLocaleString()}`,
          status: "Processing Payout",
          account: "HDFC Bank (•••• 4092)"
        };
        setPayoutsList([newPayout, ...payoutsList]);
        onShowToast(`Requested withdrawal of ₹${withdrawAmt.toLocaleString()} to HDFC Bank!`);
      }
    } else if (actionModalConfig.title === "Save Session Notes") {
      onShowToast(`Saved session notes for ${data.student || "Mentee"}!`);
    } else if (actionModalConfig.title === "Issue Career Action Plan") {
      const studentName = data.student || "Student Mentee";
      const milestone = data.milestone || "AI & Tech Career Action Plan";
      const hollandCode = data.code || "RIE (Realistic, Investigative, Enterprising)";
      const newPlan = {
        name: studentName,
        code: hollandCode,
        score: "Career Score 95/100",
        recommendation: milestone
      };
      setGuidanceList([newPlan, ...guidanceList]);
      onShowToast(`Issued career action plan to ${newPlan.name}!`);
    } else {
      onShowToast(`Action completed: ${actionModalConfig.title}`);
    }
    setIsActionModalOpen(false);
  };
  const renderContent = () => {
    if (activeSubView === "overview") {
      return /* @__PURE__ */ jsxs("div", { className: "space-y-6 font-sans", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#12163A] text-white shadow-md space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-slate-300", children: "Assigned Mentees" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight text-white", children: "42 Students" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full inline-block", children: "12 Active Mentorships" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-[#4B5563]", children: "Completed Sessions" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight text-[#12163A]", children: "184 Hours" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#3665EE]", children: "99.4% Student Rating" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-[#4B5563]", children: "Upcoming Bookings" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight text-[#3665EE]", children: "6 Sessions" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#12163A]", children: "2 Pending Requests" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-[#4B5563]", children: "Current Session Rate" }),
            /* @__PURE__ */ jsxs("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight text-[#12163A]", children: [
              "₹",
              hourlyRate,
              "/hr"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#3665EE]", children: "60 Min 1-on-1 Call" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-emerald-50 text-emerald-950 shadow-sm border border-emerald-200 space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-emerald-700", children: "Wallet Balance" }),
            /* @__PURE__ */ jsxs("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight text-emerald-900", children: [
              "₹",
              walletBalance.toLocaleString()
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-emerald-600", children: "Available for Payout" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base text-[#12163A]", children: "Dr. Rajesh Sharma" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm font-normal text-[#6B7280]", children: [
              "Ph.D. Computer Science (IIT Bombay) • Ex-Google Senior Tech Lead • Session Rate: ₹",
              hourlyRate,
              "/hr"
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "bg-[#E4F4EC] text-[#12163A] font-medium text-xs px-3.5 py-1 rounded-full border border-[#C3E6D5]", children: "✓ Verified Master Mentor" })
        ] }) })
      ] });
    }
    if (activeSubView === "profile") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaUserCheck, { className: "w-5 h-5 text-[#3665EE]" }),
              " Mentor Profile & Verification Credentials"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Verified mentor badge, academic degrees, and professional biography" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openTriggerModal("Edit Profile & Rates", "Update mentor bio and session pricing", [
                { label: "Hourly Session Rate (₹)", name: "rate", type: "number", placeholder: hourlyRate.toString() },
                { label: "Specialization / Title", name: "title", type: "text", placeholder: mentorTitle },
                { label: "Bio / Specialization", name: "bio", type: "text", placeholder: mentorBio }
              ]),
              className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: "Edit Profile & Rates"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-3 text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium", children: "Session Rate & Title" }),
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: mentorTitle }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold text-[#3665EE]", children: [
              "₹",
              hourlyRate,
              " / 60 Min Session"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-3 text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium", children: "Biography & Specialization" }),
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "Ph.D. CS & AI (IIT Bombay)" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#4B5563]", children: mentorBio })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] space-y-3 text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium", children: "Verification Status" }),
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "✓ Verified Master Mentor" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#4B5563]", children: "Background Checked • Identity Verified • Approved for 1-on-1 High School & University Counseling" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "skills") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaBrain, { className: "w-5 h-5 text-[#3665EE]" }),
              " Mentorship Skill Matrix & Technical Domains"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Expertise domains for AI-driven student matching" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Add Mentorship Skill", "Add a new domain expertise for student counseling", [
                { label: "Skill / Domain Title", name: "name", type: "text", placeholder: "Cybersecurity Architecture" },
                { label: "Expertise Level", name: "level", type: "text", placeholder: "Expert" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Add Mentorship Skill"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: skillsList.map((s, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: s.name }),
            /* @__PURE__ */ jsx("span", { className: "text-[#3665EE] font-medium text-xs", children: s.mentees })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-medium shadow-2xs", children: s.level })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "availability" || activeSubView === "calendar") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaCalendarDays, { className: "w-5 h-5 text-[#3665EE]" }),
              " Slot Booking & Availability Calendar"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Configure 1-on-1 counseling time slots and manage student bookings" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Add Available Slot", "Create a new time slot for student bookings", [
                { label: "Target Day", name: "day", type: "text", placeholder: "Tomorrow" },
                { label: "Time Slot", name: "time", type: "text", placeholder: "2:00 PM - 3:00 PM" },
                { label: "Counseling Topic", name: "topic", type: "text", placeholder: "1-on-1 Career Strategy" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Add Available Slot"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: slotsList.map((sl) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-[20px] border flex items-center justify-between ${sl.bg} ${sl.border} text-[#12163A] hover-card-lift`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-medium text-xs text-[#3665EE]", children: [
                sl.day,
                " • ",
                sl.time
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs bg-white border border-slate-200 text-[#12163A] px-2 py-0.5 rounded-md font-medium", children: sl.status })
            ] }),
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A] mt-1", children: sl.topic }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-[#4B5563] font-normal", children: [
              "Student: ",
              sl.mentee
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast(`Managed slot for ${sl.time}`),
              className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-sm px-3.5 py-1.5 rounded-xl cursor-pointer",
              children: "Manage Slot"
            }
          )
        ] }, sl.id)) })
      ] });
    }
    if (activeSubView === "student-requests" || activeSubView === "mentees") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaUsers, { className: "w-5 h-5 text-[#3665EE]" }),
            " Student Counseling Booking Requests"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Review pending mentorship booking requests and neural alignment scores" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: requestsList.map((req) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#F6E6D8] border-[#EAD0BC] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium", children: req.match }),
              /* @__PURE__ */ jsx("span", { className: "text-[#3665EE] font-medium text-xs", children: req.slot })
            ] }),
            /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-base text-[#12163A] mt-1", children: [
              req.name,
              " • Goal: ",
              req.goal
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#4B5563] font-normal", children: [
              "Topic: ",
              req.topic
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setRequestsList(requestsList.filter((r) => r.id !== req.id));
                onShowToast(`Accepted counseling request from ${req.name}!`);
              },
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-3.5 py-1.5 rounded-xl cursor-pointer",
              children: "Accept Request"
            }
          ) })
        ] }, req.id)) })
      ] });
    }
    if (activeSubView === "video-sessions" || activeSubView === "counseling") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaVideo, { className: "w-5 h-5 text-[#3665EE]" }),
              " Live 1-on-1 Video Counseling Room"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "HD encrypted video room with live screen share & action plan notes" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Save Session Notes", "Record counseling takeaways and student action items", [
                { label: "Action Items for Student", name: "notes", type: "text", placeholder: "Complete PyTorch tutorial and ATS Resume update" }
              ]),
              className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md",
              children: [
                /* @__PURE__ */ jsx(FaFileLines, { className: "w-3.5 h-3.5" }),
                " Save Session Notes"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 rounded-[24px] bg-[#12163A] text-white text-center space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-[#3665EE] flex items-center justify-center mx-auto shadow-lg", children: /* @__PURE__ */ jsx(FaVideo, { className: "w-8 h-8 text-white" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white", children: "Encrypted Video Counseling Room" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-300 font-normal max-w-md mx-auto", children: "Ready to launch 1-on-1 video call with Aarav Sharma (Grade 12-A). Camera and mic ready." }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setLiveCallParticipant({ name: "Aarav Sharma", role: "Grade 12-A • AI Track" });
                setIsLiveCallOpen(true);
                onShowToast("Camera & Microphone connected! Launching HD video call.");
              },
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-6 py-2.5 rounded-xl cursor-pointer shadow-md transition hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto",
              children: [
                /* @__PURE__ */ jsx(FaVideo, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "Launch Live Call Now" })
              ]
            }
          )
        ] })
      ] });
    }
    if (activeSubView === "guidance") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaCompass, { className: "w-5 h-5 text-[#3665EE]" }),
              " Student Assessment Review & Career Guidance"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Review Holland Code DNA passports & issue customized career roadmaps" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Issue Career Action Plan", "Send structured action items to student portal", [
                { label: "Target Student Name", name: "student", type: "text", placeholder: "Aarav Sharma" },
                { label: "Recommended Milestone / Strategy", name: "milestone", type: "text", placeholder: "Complete PyTorch Certification & System Design" },
                { label: "Holland Code / Track", name: "code", type: "text", placeholder: "RIE (Realistic, Investigative, Enterprising)" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Issue Career Action Plan"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: guidanceList.map((gd, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#E4F4EC] border-[#C3E6D5] text-[#12163A] space-y-2 hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: gd.name }),
            /* @__PURE__ */ jsx("span", { className: "text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium", children: gd.score })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#3665EE] font-medium", children: gd.code }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#4B5563] font-normal", children: [
            "Custom Strategy: ",
            gd.recommendation
          ] })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "ratings") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaStar, { className: "w-5 h-5 text-amber-500" }),
            " Student Ratings & Counselor Reviews"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Verified student feedback and rating breakdowns (4.9 / 5.0 Average Score)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl lg:text-4xl font-bold text-[#3665EE]", children: "4.9 / 5.0" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-[#12163A] mt-1", children: "Average Star Rating" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-[#4B5563] font-normal", children: "142 Total Reviews" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl lg:text-4xl font-bold text-[#12163A]", children: "98.4%" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-[#12163A] mt-1", children: "Student Satisfaction" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-[#4B5563] font-normal", children: "Top 1% Mentor Badge" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl lg:text-4xl font-bold text-[#12163A]", children: "184 Hrs" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-[#12163A] mt-1", children: "Counseling Experience" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-[#3665EE] font-medium", children: "Certified Master" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "wallet") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaWallet, { className: "w-5 h-5 text-[#3665EE]" }),
              " Mentor Wallet & Bank Payout Desk"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Track session earnings, wallet balance, & request direct bank transfers" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Request Payout Withdrawal", "Transfer earnings from wallet to verified bank account", [
                { label: "Withdrawal Amount (₹)", name: "amount", type: "number", placeholder: "10000" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaIndianRupeeSign, { className: "w-3.5 h-3.5" }),
                " Request Payout Withdrawal"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#12163A] text-white space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-300 font-medium text-[13px]", children: "Available Wallet Balance" }),
            /* @__PURE__ */ jsxs("div", { className: "text-2xl lg:text-3xl font-bold text-white", children: [
              "₹",
              walletBalance.toLocaleString()
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full font-medium inline-block", children: "Ready for Withdrawal" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#4B5563] font-medium text-[13px]", children: "Pending Escrow Balance" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-[#3665EE]", children: "₹12,000" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-[#4B5563] font-normal", children: "Releases after session completion" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A] space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#4B5563] font-medium text-[13px]", children: "Total Lifetime Earnings" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-[#12163A]", children: "₹2,45,000" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-[#3665EE] font-medium", children: "HDFC Direct Transfer" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "notifications") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaBullhorn, { className: "w-5 h-5 text-[#3665EE]" }),
              " Mentor Notifications & Session Reminders"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Session alerts, booking requests, and payout confirmation receipts" })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => onShowToast("Marked all mentor alerts as read"), className: "text-[#3665EE] font-medium text-sm hover:underline cursor-pointer", children: "Mark All as Read" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          { title: "Session Reminder: Video call with Aarav Sharma in 15 mins", time: "10 mins ago", type: "Calendar Alert", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
          { title: "New 1-on-1 Counseling Booking Request from Karan Patel", time: "1 hour ago", type: "Booking Request", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
          { title: "Bank Payout Transfer of ₹18,000 Processed to HDFC Bank", time: "1 day ago", type: "Payout Receipt", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
        ].map((nt, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-[20px] border flex items-center justify-between ${nt.bg} ${nt.border} text-[#12163A]`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: nt.title }),
            /* @__PURE__ */ jsxs("span", { className: "text-[#3665EE] font-medium text-xs", children: [
              nt.type,
              " • ",
              nt.time
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium", children: "New" })
        ] }, i)) })
      ] });
    }
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaSliders, { className: "w-5 h-5 text-[#3665EE]" }),
          " Mentor Settings & Account Preferences"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Configure session rates, camera/mic devices, & withdrawal bank details" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "Session Pricing Settings" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm font-normal text-[#4B5563]", children: [
            "Current Rate: ₹",
            hourlyRate,
            " / 60 Min Session • Auto-Accept Eligible Requests"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: "Payout Bank Account Details" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#4B5563]", children: "HDFC Bank • A/C No: •••• 4092 • IFSC: HDFC0001290 • Instant Payout Enabled" })
        ] })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    renderContent(),
    /* @__PURE__ */ jsx(
      ActionModal,
      {
        isOpen: isActionModalOpen,
        title: actionModalConfig.title,
        subtitle: actionModalConfig.subtitle,
        fields: actionModalConfig.fields,
        onClose: () => setIsActionModalOpen(false),
        onSubmit: handleModalFormSubmit,
        isDarkMode
      }
    ),
    /* @__PURE__ */ jsx(
      LiveCallModal,
      {
        isOpen: isLiveCallOpen,
        participantName: liveCallParticipant.name,
        participantRole: liveCallParticipant.role,
        onClose: () => setIsLiveCallOpen(false),
        onShowToast,
        isDarkMode
      }
    )
  ] });
};
const StudentToolsViews = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  if (activeSubView === "discovery") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaCompass, { className: "w-5 h-5 text-[#3665EE]" }),
            " Career Discovery Engine"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Explore 500+ future-ready career paths curated by AI neural alignment" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search careers, skills, or degrees...",
            className: "px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#3665EE] bg-slate-50 text-[#12163A]"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        { title: "AI & ML Systems Engineer", salary: "₹18 - ₹35 LPA", growth: "+38% YoY", skills: ["Python", "PyTorch", "MLOps"], match: "98% Neural Match", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
        { title: "Fintech & Quantitative Analyst", salary: "₹16 - ₹28 LPA", growth: "+26% YoY", skills: ["Financial Modeling", "Python", "Stochastics"], match: "94% Neural Match", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
        { title: "Robotics & Embedded Engineer", salary: "₹14 - ₹26 LPA", growth: "+31% YoY", skills: ["C++", "ROS2", "Microcontrollers"], match: "91% Neural Match", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
        { title: "Product & UI/UX Designer", salary: "₹12 - ₹22 LPA", growth: "+24% YoY", skills: ["Figma", "User Research", "Prototyping"], match: "89% Neural Match", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
        { title: "Biotech & Bio-Informatics Researcher", salary: "₹15 - ₹27 LPA", growth: "+29% YoY", skills: ["Genomics", "R", "CRISPR Tech"], match: "87% Neural Match", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
        { title: "Cybersecurity Architect", salary: "₹18 - ₹32 LPA", growth: "+35% YoY", skills: ["SIEM", "Zero Trust", "Cloud Security"], match: "86% Neural Match", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
      ].map((c, i) => /* @__PURE__ */ jsxs(
        "div",
        {
          onClick: () => onShowToast(`Exploring career roadmap for ${c.title}`),
          className: `p-5 rounded-[24px] border space-y-3 cursor-pointer transition-all duration-200 hover:-translate-y-1 ${c.bg} ${c.border} text-[#12163A] min-w-0 hover-card-lift`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-medium shadow-2xs whitespace-nowrap", children: c.match }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-[#3665EE]", children: c.growth })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base truncate text-[#12163A]", children: c.title }),
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm text-[#3665EE]", children: c.salary }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: c.skills.map((sk, idx) => /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-0.5 rounded-md bg-white/80 text-[#12163A] font-medium", children: sk }, idx)) })
          ]
        },
        i
      )) })
    ] });
  }
  if (activeSubView === "assessment") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaListCheck, { className: "w-5 h-5 text-[#3665EE]" }),
            " Online Aptitude & Skill Assessment"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Timed cognitive & analytical reasoning test (Question 4 of 15)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[#12163A] font-mono font-medium text-xs bg-[#DEE9FF] border border-[#C6D9FF] px-3.5 py-1.5 rounded-xl", children: [
          /* @__PURE__ */ jsx(FaClock, { className: "w-3.5 h-3.5 text-[#3665EE]" }),
          " 18:45 Remaining"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#3665EE]", children: "Category: Logical & Spatial Reasoning" }),
          /* @__PURE__ */ jsx("span", { className: "text-[#4B5563] font-normal", children: "Score Weight: 25 Points" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-medium text-sm leading-relaxed text-[#12163A]", children: "If all Engineers are Problem Solvers, and some Problem Solvers use Neural Networks, which of the following statements MUST logically hold true?" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2.5 pt-2", children: [
          "A) All Engineers use Neural Networks",
          "B) Some Engineers are Problem Solvers who utilize computational logic",
          "C) No Problem Solvers are Engineers",
          "D) Neural Networks can only be designed by Engineers"
        ].map((opt, idx) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onShowToast(`Selected Option ${String.fromCharCode(65 + idx)}`),
            className: `w-full text-left p-3.5 rounded-xl border text-sm font-normal transition cursor-pointer ${idx === 1 ? "bg-[#12163A] border-[#12163A] text-white font-medium" : "bg-white border-slate-200 hover:bg-[#F6E6D8] text-[#12163A]"}`,
            children: opt
          },
          idx
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 flex items-center justify-between border-t border-[#C6D9FF]", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => onShowToast("Navigated to previous question"), className: "px-4 py-2 rounded-xl font-medium text-sm border border-slate-300 bg-white text-[#12163A] hover:bg-slate-50 transition cursor-pointer", children: "Previous Question" }),
          /* @__PURE__ */ jsx("button", { onClick: () => onShowToast("Assessment answers submitted! AI Score generated."), className: "px-5 py-2.5 rounded-xl font-medium text-sm bg-[#12163A] text-white shadow-md cursor-pointer transition hover:bg-[#1A2050]", children: "Submit Assessment" })
        ] })
      ] })
    ] });
  }
  if (activeSubView === "psychometric") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaBrain, { className: "w-5 h-5 text-[#3665EE]" }),
          " RIASEC Psychometric & Personality Assessment"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Holland Code interest spectrum profiling (Rate your preference for each workplace scenario)" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
        { q: "I enjoy dissecting complex algorithmic code to find logical bottlenecks.", code: "Investigative (I)", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
        { q: "I prefer leading cross-functional teams to pitch new product ideas.", code: "Enterprising (E)", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
        { q: "I like sketching user experience mockups and visual interfaces.", code: "Artistic (A)", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
      ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border space-y-3 ${item.bg} ${item.border} text-[#12163A]`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium text-sm text-[#12163A]", children: item.q }),
          /* @__PURE__ */ jsx("span", { className: "text-xs bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-medium shadow-2xs whitespace-nowrap", children: item.code })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 text-xs pt-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#6B7280]", children: "Strongly Disagree" }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: [1, 2, 3, 4, 5].map((val) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast(`Rated ${val} for scenario ${i + 1}`),
              className: `w-7 h-7 rounded-full font-medium text-xs transition cursor-pointer ${val === 4 && i === 0 ? "bg-[#12163A] text-white shadow-md" : "bg-white hover:bg-[#3665EE] hover:text-white text-[#12163A] border border-slate-200"}`,
              children: val
            },
            val
          )) }),
          /* @__PURE__ */ jsx("span", { className: "text-[#6B7280]", children: "Strongly Agree" })
        ] })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "dna") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaBrain, { className: "w-5 h-5 text-[#3665EE]" }),
            " Career DNA Genome Profile & Aptitude Tracker"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Holland Code: RIE (Realistic • Investigative • Enterprising)" })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => onShowToast("Downloading official Career DNA Passport PDF"),
            className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-sm px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 shrink-0",
            children: [
              /* @__PURE__ */ jsx(FaDownload, { className: "w-3.5 h-3.5 text-[#DEE9FF]" }),
              " Download DNA Passport"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A] space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-[#4B5563]", children: "Aptitude Score" }),
          /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-[#3665EE] truncate", children: "96th Percentile" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#12163A] bg-white/70 px-2 py-0.5 rounded-full inline-block", children: "Top 4% Nationally" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#12163A] text-white border border-[#12163A] space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-slate-300", children: "Primary Personality" }),
          /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-[#E4F4EC] truncate", children: "Investigative" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-300 font-normal", children: "Problem Solver & Analytical" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-[#4B5563]", children: "Stream Recommendation" }),
          /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-[#3665EE] truncate", children: "Science (PCM + CS)" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#12163A]", children: "98.2% Fit Index" })
        ] })
      ] })
    ] });
  }
  if (activeSubView === "ai-recommendations") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaBrain, { className: "w-5 h-5 text-[#3665EE]" }),
          " AI Neural Recommendation Engine"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Predictive career alignment calculated from aptitude, interest, and industry demand" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
        { role: "Artificial Intelligence Architect", match: "98%", rationale: "High mathematical reasoning + top code proficiency fit.", bg: "bg-white", border: "border-slate-200" },
        { role: "Cloud Infrastructure Engineer", match: "94%", rationale: "Strong system design aptitude + cloud computing interest.", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
        { role: "Fintech Data Scientist", match: "91%", rationale: "Statistical affinity + quantitative problem-solving score.", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
        { role: "Cybersecurity Analyst", match: "89%", rationale: "High spatial logic + SOC framework understanding.", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
      ].map((rec, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${rec.bg} ${rec.border} text-[#12163A] hover-card-lift`, onClick: () => onShowToast(`Viewing detailed AI breakdown for ${rec.role}`), children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: rec.role }),
          /* @__PURE__ */ jsx("p", { className: "text-xs mt-1 text-[#4B5563] font-normal", children: rec.rationale })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-[#3665EE]", children: rec.match }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#12163A]", children: "Neural Match" })
        ] })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "scholarships") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaAward, { className: "w-5 h-5 text-[#3665EE]" }),
          " Scholarship & Merit Aid Explorer"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "₹12.5 Crores in active national, state, and corporate scholarships open for application" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
        { title: "National STEM Leadership Grant", provider: "Ministry of Science & Tech", amount: "₹3,50,000 / yr", deadline: "Closes in 12 Days", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
        { title: "Global AI & Innovation Merit Aid", provider: "Role Ready Foundation", amount: "₹2,00,000 / yr", deadline: "Closes in 18 Days", bg: "bg-white", border: "border-slate-200" },
        { title: "State Higher Education Equity Aid", provider: "State Government Desk", amount: "₹1,50,000 / yr", deadline: "Closes in 25 Days", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
      ].map((sch, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border flex items-center justify-between transition-all duration-200 ${sch.bg} ${sch.border} text-[#12163A] hover-card-lift`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base text-[#12163A]", children: sch.title }),
          /* @__PURE__ */ jsxs("span", { className: "font-medium text-xs text-[#3665EE]", children: [
            sch.provider,
            " • ",
            sch.deadline
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm text-[#12163A]", children: sch.amount }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast(`Submitted application for ${sch.title}!`),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer shadow-xs hover:scale-105 active:scale-95",
              children: "Apply Now"
            }
          )
        ] })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "colleges") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaGraduationCap, { className: "w-5 h-5 text-[#3665EE]" }),
          " University & College Explorer Directory"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Compare NIRF ranks, admission cutoffs, course offerings, and campus placements" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        { name: "Indian Institute of Technology (IIT Bombay)", rank: "NIRF #1", avgCtc: "₹28.5 LPA", cutoff: "JEE Adv < 500", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
        { name: "BITS Pilani (Main Campus)", rank: "NIRF #7", avgCtc: "₹24.0 LPA", cutoff: "BITSAT > 320", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
        { name: "IIIT Hyderabad", rank: "NIRF #12", avgCtc: "₹31.0 LPA", cutoff: "JEE Main < 1200", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
      ].map((col, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border space-y-2 cursor-pointer transition-all duration-200 ${col.bg} ${col.border} text-[#12163A] min-w-0 hover-card-lift`, onClick: () => onShowToast(`Added ${col.name} to Target Wishlist`), children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-medium", children: col.rank }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base truncate text-[#12163A]", children: col.name }),
        /* @__PURE__ */ jsxs("div", { className: "font-semibold text-sm text-[#3665EE]", children: [
          "Avg CTC: ",
          col.avgCtc
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-[#4B5563] font-normal", children: [
          "Cutoff: ",
          col.cutoff
        ] })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "roadmap") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaArrowTrendUp, { className: "w-5 h-5 text-[#3665EE]" }),
          " Interactive Career Milestone Roadmap"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Step-by-step guidance from Class 10 to AI Engineering Leader" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
        { step: "Phase 1: Class 10th", desc: "Complete Career DNA test & select PCM + CS stream.", status: "Completed", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
        { step: "Phase 2: Class 12th & Entrances", desc: "Prepare JEE Advanced / BITSAT & achieve 95%+ in boards.", status: "In Progress", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
        { step: "Phase 3: Undergraduate Degree", desc: "B.Tech in Computer Science / AI & build 4 portfolio projects.", status: "Upcoming", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
        { step: "Phase 4: Industry Internship", desc: "6-month corporate internship with top tech enterprise.", status: "Upcoming", bg: "bg-white", border: "border-slate-200" }
      ].map((rd, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border flex items-center justify-between ${rd.bg} ${rd.border} text-[#12163A] hover-card-lift`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-[#12163A] text-white flex items-center justify-center font-semibold text-xs shrink-0", children: i + 1 }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm text-[#12163A]", children: rd.step }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-normal text-[#4B5563]", children: rd.desc })
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs px-3 py-1 rounded-full font-medium border bg-white border-slate-200 text-[#12163A] shrink-0", children: rd.status })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "resume-ats") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaFileLines, { className: "w-5 h-5 text-[#3665EE]" }),
            " AI ATS Resume Score & Optimizer Dashboard"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Automated ATS scanner compliance & keyword density optimization" })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => onShowToast("Running AI Resume Optimizer scan..."),
            className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-medium text-sm px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
            children: [
              /* @__PURE__ */ jsx(FaStar, { className: "w-3.5 h-3.5 text-[#DEE9FF]" }),
              " Run AI Resume Scan"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs text-center space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-[#6B7280]", children: "Overall ATS Score" }),
          /* @__PURE__ */ jsx("div", { className: "text-3xl lg:text-4xl font-bold text-[#3665EE]", children: "88 / 100" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium bg-[#12163A] text-white px-3 py-0.5 rounded-full inline-block", children: "Completion Badge: Navy" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-[#12163A]", children: "AI Suggestions" }),
          /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-[#12163A]", children: "92% Keyword Fit" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-[#4B5563] font-normal", children: "14/15 Target Skills Added" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-[#12163A]", children: "Achievements Grade" }),
          /* @__PURE__ */ jsx("div", { className: "text-3xl lg:text-4xl font-bold text-[#12163A]", children: "A+" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-[#4B5563] font-normal", children: "100% Parser Compliant" })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaBookOpen, { className: "w-5 h-5 text-[#3665EE]" }),
          " Skill Mastery & Learning Progress Tracker"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-normal text-[#6B7280]", children: "Track active courses, earned certification badges, and daily study streaks" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[#12163A] font-medium text-xs bg-[#E4F4EC] border border-[#C3E6D5] px-3.5 py-1.5 rounded-xl", children: [
        /* @__PURE__ */ jsx(FaFire, { className: "w-4 h-4 text-[#3665EE]" }),
        " 14-Day Streak!"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#12163A] text-white space-y-3 cursor-pointer hover-card-lift", onClick: () => onShowToast("Resumed Python AI module"), children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs uppercase font-medium text-[#DEE9FF]", children: "Continue Learning" }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base text-white", children: "Python for Data Science & AI" }),
        /* @__PURE__ */ jsx("div", { className: "w-full h-2.5 bg-white/20 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#3665EE] rounded-full", style: { width: "85%" } }) }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-[#DEE9FF] block font-medium", children: "85% Completed" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-3 cursor-pointer hover-card-lift", onClick: () => onShowToast("Opening System Design course"), children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs uppercase font-medium text-[#3665EE]", children: "Recommended Course" }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base text-[#12163A]", children: "System Design & Microservices" }),
        /* @__PURE__ */ jsx("div", { className: "w-full h-2.5 bg-white/80 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#3665EE] rounded-full", style: { width: "60%" } }) }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-[#4B5563] block font-medium", children: "60% Completed" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-[#12163A] space-y-3 cursor-pointer hover-card-lift", onClick: () => onShowToast("Viewing Cloud Cert badge"), children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs uppercase font-medium text-[#12163A]", children: "Achievement Badge" }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base text-[#12163A]", children: "Cloud Architecture (AWS)" }),
        /* @__PURE__ */ jsx("div", { className: "w-full h-2.5 bg-white/80 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#3665EE] rounded-full", style: { width: "45%" } }) }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-[#12163A] block font-medium", children: "Foundational Certification Earned" })
      ] })
    ] })
  ] });
};
const INITIAL_HIRING_PARTNERS = [
  // 1. IT Services & Global Consulting (12)
  { id: "hp-1", name: "Infosys", category: "IT Services", track: "Full Stack & Cloud AI", hired: "420 Placed", avgPkg: "₹9.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Bengaluru / Pan-India" },
  { id: "hp-2", name: "Tata Consultancy Services (TCS)", category: "IT Services", track: "Digital Innovator Track", hired: "580 Placed", avgPkg: "₹7.5 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Mumbai / Pan-India" },
  { id: "hp-3", name: "Accenture", category: "IT Services", track: "Cloud Infrastructure & Data", hired: "390 Placed", avgPkg: "₹8.8 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Bengaluru / Hyderabad" },
  { id: "hp-4", name: "Cognizant", category: "IT Services", track: "GenAI & Full Stack", hired: "310 Placed", avgPkg: "₹8.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Chennai / Pune" },
  { id: "hp-5", name: "Capgemini", category: "IT Services", track: "Cloud & Cybersecurity", hired: "280 Placed", avgPkg: "₹7.8 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Mumbai / Bengaluru" },
  { id: "hp-6", name: "Wipro Technologies", category: "IT Services", track: "Enterprise Java & DevOps", hired: "260 Placed", avgPkg: "₹7.2 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Bengaluru / Hyderabad" },
  { id: "hp-7", name: "HCLTech", category: "IT Services", track: "Hybrid Cloud & AI Eng", hired: "240 Placed", avgPkg: "₹7.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Noida / Chennai" },
  { id: "hp-8", name: "Tech Mahindra", category: "IT Services", track: "5G & Telecom AI", hired: "190 Placed", avgPkg: "₹7.0 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Pune / Hyderabad" },
  { id: "hp-9", name: "LTIMindtree", category: "IT Services", track: "Enterprise Cloud Platforms", hired: "180 Placed", avgPkg: "₹8.2 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Mumbai / Bengaluru" },
  { id: "hp-10", name: "Hexaware Technologies", category: "IT Services", track: "Automation & Modern Web", hired: "140 Placed", avgPkg: "₹7.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Navi Mumbai / Chennai" },
  { id: "hp-11", name: "Persistent Systems", category: "IT Services", track: "Software Product Eng", hired: "160 Placed", avgPkg: "₹9.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Pune / Goa" },
  { id: "hp-12", name: "Mphasis", category: "IT Services", track: "Next-Gen Banking Tech", hired: "130 Placed", avgPkg: "₹7.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Bengaluru / Pune" },
  // 2. Big Tech & Product Giants (10)
  { id: "hp-13", name: "Microsoft", category: "Big Tech", track: "Cloud & Applied AI Lab", hired: "95 Placed", avgPkg: "₹32.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Hyderabad / Bengaluru" },
  { id: "hp-14", name: "Amazon Web Services (AWS)", category: "Big Tech", track: "Cloud Architecture & DevOps", hired: "110 Placed", avgPkg: "₹28.5 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru / Hyderabad" },
  { id: "hp-15", name: "Google Cloud", category: "Big Tech", track: "Data Science & MLOps", hired: "85 Placed", avgPkg: "₹34.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru / Gurugram" },
  { id: "hp-16", name: "Oracle Corporation", category: "Big Tech", track: "Database Systems & OCI", hired: "90 Placed", avgPkg: "₹19.0 LPA", mouDate: "2023 - 2026", status: "Enterprise Tier", location: "Bengaluru / Hyderabad" },
  { id: "hp-17", name: "Cisco Systems", category: "Big Tech", track: "Networking & Cyber Defense", hired: "75 Placed", avgPkg: "₹22.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },
  { id: "hp-18", name: "IBM India", category: "Big Tech", track: "Quantum & Hybrid Cloud", hired: "120 Placed", avgPkg: "₹14.5 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Bengaluru / Kochi" },
  { id: "hp-19", name: "SAP Labs India", category: "Big Tech", track: "Enterprise Cloud ERP", hired: "80 Placed", avgPkg: "₹18.5 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru / Pune" },
  { id: "hp-20", name: "Adobe Systems", category: "Big Tech", track: "Creative Cloud & Media AI", hired: "60 Placed", avgPkg: "₹29.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Noida / Bengaluru" },
  { id: "hp-21", name: "Salesforce", category: "Big Tech", track: "Enterprise CRM & Agentforce", hired: "70 Placed", avgPkg: "₹24.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Hyderabad / Bengaluru" },
  { id: "hp-22", name: "Intel Corporation", category: "Big Tech", track: "Embedded Systems & Edge AI", hired: "55 Placed", avgPkg: "₹21.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },
  // 3. FinTech, Banking & Capital Markets (10)
  { id: "hp-23", name: "Goldman Sachs", category: "FinTech & Banking", track: "Quantitative Finance & Tech", hired: "65 Placed", avgPkg: "₹26.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru / Hyderabad" },
  { id: "hp-24", name: "Morgan Stanley", category: "FinTech & Banking", track: "Capital Markets Systems", hired: "50 Placed", avgPkg: "₹25.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Mumbai / Bengaluru" },
  { id: "hp-25", name: "JPMorgan Chase", category: "FinTech & Banking", track: "Core Banking & Cloud", hired: "110 Placed", avgPkg: "₹20.5 LPA", mouDate: "2023 - 2026", status: "Enterprise Tier", location: "Mumbai / Bengaluru" },
  { id: "hp-26", name: "Barclays Global", category: "FinTech & Banking", track: "FinTech Security & Payments", hired: "85 Placed", avgPkg: "₹16.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Pune / Chennai" },
  { id: "hp-27", name: "BNY Mellon", category: "FinTech & Banking", track: "Asset Servicing Cloud Tech", hired: "60 Placed", avgPkg: "₹17.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Pune / Chennai" },
  { id: "hp-28", name: "Deutsche Bank", category: "FinTech & Banking", track: "Algorithmic Trading Tech", hired: "70 Placed", avgPkg: "₹19.5 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Pune / Bengaluru" },
  { id: "hp-29", name: "HSBC Technology", category: "FinTech & Banking", track: "Global Digital Banking Apps", hired: "95 Placed", avgPkg: "₹15.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Pune / Hyderabad" },
  { id: "hp-30", name: "Paytm (One97)", category: "FinTech & Banking", track: "Payments Gateway & Microservices", hired: "75 Placed", avgPkg: "₹14.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Noida / Bengaluru" },
  { id: "hp-31", name: "PhonePe", category: "FinTech & Banking", track: "High-Throughput UPI Systems", hired: "80 Placed", avgPkg: "₹22.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru / Pune" },
  { id: "hp-32", name: "Razorpay", category: "FinTech & Banking", track: "Payment APIs & Fraud ML", hired: "65 Placed", avgPkg: "₹21.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },
  // 4. AI, Data Science & Analytics (8)
  { id: "hp-33", name: "Fractal Analytics", category: "AI & Data Science", track: "Generative AI & BI Copilots", hired: "85 Placed", avgPkg: "₹16.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Mumbai / Bengaluru" },
  { id: "hp-34", name: "Mu Sigma", category: "AI & Data Science", track: "Big Data & Decision Sciences", hired: "90 Placed", avgPkg: "₹12.0 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Bengaluru" },
  { id: "hp-35", name: "LatentView Analytics", category: "AI & Data Science", track: "Predictive Analytics & Modeling", hired: "60 Placed", avgPkg: "₹13.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Chennai / Bengaluru" },
  { id: "hp-36", name: "Tiger Analytics", category: "AI & Data Science", track: "Advanced ML & Data Engineering", hired: "70 Placed", avgPkg: "₹15.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Chennai / Bengaluru" },
  { id: "hp-37", name: "Quantiphi", category: "AI & Data Science", track: "Computer Vision & Applied AI", hired: "75 Placed", avgPkg: "₹14.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Mumbai / Bengaluru" },
  { id: "hp-38", name: "Dataiku India", category: "AI & Data Science", track: "Enterprise MLOps & Pipelines", hired: "45 Placed", avgPkg: "₹18.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Bengaluru" },
  { id: "hp-39", name: "Innovaccer", category: "AI & Data Science", track: "Healthcare Intelligence Cloud", hired: "55 Placed", avgPkg: "₹17.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Noida / Bengaluru" },
  { id: "hp-40", name: "Tredence Analytics", category: "AI & Data Science", track: "Last-Mile Retail AI & Analytics", hired: "65 Placed", avgPkg: "₹14.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Bengaluru / Gurugram" },
  // 5. Cloud, DevOps & Cybersecurity (8)
  { id: "hp-41", name: "Palo Alto Networks", category: "Cloud & Cyber", track: "Threat Intelligence & SOC Ops", hired: "40 Placed", avgPkg: "₹24.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },
  { id: "hp-42", name: "Fortinet India", category: "Cloud & Cyber", track: "Network Security & Firewalls", hired: "50 Placed", avgPkg: "₹16.0 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Bengaluru / Pune" },
  { id: "hp-43", name: "Zscaler", category: "Cloud & Cyber", track: "Zero Trust Cloud Architecture", hired: "45 Placed", avgPkg: "₹22.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Chandigarh / Bengaluru" },
  { id: "hp-44", name: "Cloudflare", category: "Cloud & Cyber", track: "Edge Systems & CDN Security", hired: "35 Placed", avgPkg: "₹26.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },
  { id: "hp-45", name: "Red Hat (IBM)", category: "Cloud & Cyber", track: "OpenShift & Linux Kernel Dev", hired: "60 Placed", avgPkg: "₹18.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Pune / Bengaluru" },
  { id: "hp-46", name: "VMware (Broadcom)", category: "Cloud & Cyber", track: "Virtualization & Multi-Cloud", hired: "55 Placed", avgPkg: "₹20.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru / Pune" },
  { id: "hp-47", name: "CrowdStrike", category: "Cloud & Cyber", track: "Falcon SecOps & Incident Response", hired: "30 Placed", avgPkg: "₹25.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Pune / Bengaluru" },
  { id: "hp-48", name: "Trend Micro", category: "Cloud & Cyber", track: "Hybrid Cloud Threat Defense", hired: "40 Placed", avgPkg: "₹15.5 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Bengaluru / Mumbai" },
  // 6. E-Commerce, Logistics & Consumer Tech (8)
  { id: "hp-49", name: "Flipkart", category: "E-Commerce & Retail", track: "High-Scale Microservices & Logistics", hired: "90 Placed", avgPkg: "₹22.5 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },
  { id: "hp-50", name: "Swiggy", category: "E-Commerce & Retail", track: "Hyperlocal Dispatch Algorithms", hired: "70 Placed", avgPkg: "₹21.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },
  { id: "hp-51", name: "Zomato", category: "E-Commerce & Retail", track: "Live Order Pipeline & Mobile Apps", hired: "65 Placed", avgPkg: "₹20.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Gurugram" },
  { id: "hp-52", name: "Meesho", category: "E-Commerce & Retail", track: "Social Commerce & Scalable Tech", hired: "60 Placed", avgPkg: "₹19.5 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },
  { id: "hp-53", name: "Nykaa", category: "E-Commerce & Retail", track: "Omnichannel Tech & E-Commerce", hired: "50 Placed", avgPkg: "₹15.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Mumbai / Gurugram" },
  { id: "hp-54", name: "MakeMyTrip", category: "E-Commerce & Retail", track: "Travel Booking Engines & Cloud", hired: "55 Placed", avgPkg: "₹16.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Gurugram / Bengaluru" },
  { id: "hp-55", name: "Delhivery", category: "E-Commerce & Retail", track: "Automated Logistics & Routing Tech", hired: "60 Placed", avgPkg: "₹15.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Gurugram / Hyderabad" },
  { id: "hp-56", name: "Blinkit", category: "E-Commerce & Retail", track: "Dark Store Inventory Ops & AI", hired: "45 Placed", avgPkg: "₹18.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Gurugram" },
  // 7. Automotive, Telecom & Embedded Systems (8)
  { id: "hp-57", name: "Bosch Global Software", category: "Automotive & IoT", track: "Embedded IoT & Smart Mobility", hired: "105 Placed", avgPkg: "₹12.5 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Bengaluru / Coimbatore" },
  { id: "hp-58", name: "KPIT Technologies", category: "Automotive & IoT", track: "Autonomous Driving & EV Tech", hired: "85 Placed", avgPkg: "₹11.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Pune / Bengaluru" },
  { id: "hp-59", name: "Tata Elxsi", category: "Automotive & IoT", track: "Connected Vehicles & UI/UX Design", hired: "90 Placed", avgPkg: "₹10.5 LPA", mouDate: "2023 - 2026", status: "MoU Signed", location: "Bengaluru / Kerala" },
  { id: "hp-60", name: "Qualcomm India", category: "Automotive & IoT", track: "Wireless SoC & 5G Edge Computing", hired: "60 Placed", avgPkg: "₹26.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Hyderabad / Bengaluru" },
  { id: "hp-61", name: "Samsung R&D Institute", category: "Automotive & IoT", track: "Smart Devices, Camera AI & 5G", hired: "80 Placed", avgPkg: "₹20.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru / Noida" },
  { id: "hp-62", name: "Texas Instruments", category: "Automotive & IoT", track: "Embedded VLSI & Firmware Dev", hired: "45 Placed", avgPkg: "₹24.0 LPA", mouDate: "2024 - 2027", status: "Enterprise Tier", location: "Bengaluru" },
  { id: "hp-63", name: "Continental Automotive", category: "Automotive & IoT", track: "ADAS & Automotive Cyber Defense", hired: "50 Placed", avgPkg: "₹13.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Bengaluru" },
  { id: "hp-64", name: "Jio Platforms", category: "Automotive & IoT", track: "Cloud Native 5G & Telecom Platforms", hired: "130 Placed", avgPkg: "₹14.0 LPA", mouDate: "2024 - 2027", status: "MoU Signed", location: "Mumbai / Hyderabad" }
];
const TrainingDashboard = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [searchQuery, setSearchQuery2] = useState("");
  const [selectedCategory, setSelectedCategory2] = useState("All");
  const [hiringPartners, setHiringPartners] = useState(INITIAL_HIRING_PARTNERS);
  const [coursesList, setCoursesList] = useState([
    { title: "Full Stack AI Engineering", duration: "16 Weeks", enrolled: "840 Trainees", status: "Active Cohort" },
    { title: "Cloud Architecture (AWS/GCP)", duration: "12 Weeks", enrolled: "620 Trainees", status: "Active Cohort" },
    { title: "Cybersecurity & SOC Operations", duration: "14 Weeks", enrolled: "450 Trainees", status: "Enrolling Now" }
  ]);
  if (["discovery", "assessment", "psychometric", "dna", "ai-recommendations", "scholarships", "colleges", "roadmap", "resume-ats", "learning"].includes(activeSubView)) {
    return /* @__PURE__ */ jsx(StudentToolsViews, { activeSubView, onShowToast, isDarkMode });
  }
  const handleAddBootcamp = (data) => {
    const newCourse = {
      title: data.title || "Specialized Tech Bootcamp",
      duration: data.duration || "12 Weeks",
      enrolled: "1 Cohort",
      status: "Enrolling Now"
    };
    setCoursesList([newCourse, ...coursesList]);
    onShowToast(`Launched new bootcamp track: ${newCourse.title}!`);
  };
  const handleAddHiringPartner = (data) => {
    const newPartner = {
      id: `hp-${Date.now()}`,
      name: data.name || "New Corporate Partner",
      category: data.category || "IT Services",
      track: data.track || "Full Stack & Cloud Track",
      hired: data.quota ? `${data.quota} Placed` : "10 Placed",
      avgPkg: data.avgPkg || "₹10.0 LPA",
      mouDate: "2026 - 2029",
      status: data.tier || "MoU Signed",
      location: data.location || "Pan-India"
    };
    setHiringPartners([newPartner, ...hiringPartners]);
    onShowToast(`Successfully onboarded hiring enterprise: ${newPartner.name}!`);
  };
  const categories = ["All", "IT Services", "Big Tech", "FinTech & Banking", "AI & Data Science", "Cloud & Cyber", "E-Commerce & Retail", "Automotive & IoT"];
  const filteredPartners = useMemo(() => {
    return hiringPartners.filter((partner) => {
      const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) || partner.track.toLowerCase().includes(searchQuery.toLowerCase()) || partner.category.toLowerCase().includes(searchQuery.toLowerCase()) || partner.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || partner.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [hiringPartners, searchQuery, selectedCategory]);
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-xl" : "bg-white border-blue-100 text-slate-900 shadow-sm";
  const subCardClass = isDarkMode ? "bg-slate-800/80 border-slate-700/80 text-white hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10" : "bg-white border-slate-200 text-slate-900 hover:border-blue-500 hover:shadow-md";
  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-500";
  const textHeading = isDarkMode ? "text-white" : "text-slate-900";
  const borderDivider = isDarkMode ? "border-slate-800" : "border-slate-100";
  if (activeSubView === "courses") {
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: `text-xl font-semibold flex items-center gap-2 ${textHeading}`, children: [
            /* @__PURE__ */ jsx(FaBookOpen, { className: "w-5 h-5 text-blue-500" }),
            " Skill Courses & Curriculum Track Page"
          ] }),
          /* @__PURE__ */ jsx("p", { className: `text-sm font-normal ${textMuted}`, children: "Industry bootcamps and certification learning modules" })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsModalOpen(true),
            className: "bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-500/20",
            children: [
              /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
              " Add New Bootcamp"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: coursesList.map((c, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-xl border space-y-2 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast(`Opened course details for ${c.title}`), children: [
        /* @__PURE__ */ jsx("div", { className: `font-semibold text-base ${textHeading}`, children: c.title }),
        /* @__PURE__ */ jsxs("div", { className: "text-blue-500 font-medium text-sm", children: [
          c.duration,
          " • ",
          c.enrolled
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-medium inline-block", children: c.status })
      ] }, i)) }),
      /* @__PURE__ */ jsx(
        ActionModal,
        {
          isOpen: isModalOpen,
          title: "Add New Skill Bootcamp",
          subtitle: "Publish an accredited skill certification curriculum track",
          fields: [
            { label: "Bootcamp Course Title", name: "title", type: "text", placeholder: "e.g. Data Engineering & Analytics" },
            { label: "Duration", name: "duration", type: "text", placeholder: "e.g. 10 Weeks" }
          ],
          onClose: () => setIsModalOpen(false),
          onSubmit: handleAddBootcamp,
          isDarkMode
        }
      )
    ] });
  }
  if (activeSubView === "certs") {
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("h2", { className: `text-xl font-semibold flex items-center gap-2 ${textHeading}`, children: [
        /* @__PURE__ */ jsx(FaAward, { className: "w-5 h-5 text-blue-500" }),
        " Certifications Registry Page"
      ] }),
      /* @__PURE__ */ jsx("p", { className: `text-sm font-normal ${textMuted}`, children: "Industry-accredited digital credentials issued to trainees" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
        { name: "Aarav Sharma", cert: "Certified Full Stack AI Specialist", date: "2026-02-28", id: "CERT-AI-9941" },
        { name: "Riya Sen", cert: "Cloud Infrastructure Specialist", date: "2026-02-25", id: "CERT-CL-8820" }
      ].map((ct, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast(`Verifying certificate ${ct.id}`), children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: `font-semibold text-base ${textHeading}`, children: ct.name }),
          /* @__PURE__ */ jsx("span", { className: "text-blue-500 font-medium text-xs", children: ct.cert })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("span", { className: "text-emerald-500 font-mono font-medium text-xs", children: ct.id }),
          /* @__PURE__ */ jsx("div", { className: `text-xs font-normal ${textMuted}`, children: ct.date })
        ] })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "hiring") {
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: `flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ${borderDivider}`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: `text-xl font-semibold flex items-center gap-2 ${textHeading}`, children: [
            /* @__PURE__ */ jsx(FaHandshake, { className: "w-5 h-5 text-blue-500" }),
            " Hiring Partner Enterprises Page",
            /* @__PURE__ */ jsxs("span", { className: "text-xs bg-blue-500/10 text-blue-500 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-medium ml-2", children: [
              hiringPartners.length,
              " Companies"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: `text-sm font-normal ${textMuted}`, children: [
            hiringPartners.length,
            " Corporate partners actively recruiting directly from institute bootcamps across 7 industry tracks"
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsPartnerModalOpen(true),
            className: "bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 self-start md:self-auto",
            children: [
              /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsx("span", { children: "Register Corporate Partner" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3.5", children: [
        /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border ${isDarkMode ? "bg-slate-800/60 border-slate-700/60" : "bg-slate-50 border-slate-200"}`, children: [
          /* @__PURE__ */ jsx("span", { className: `text-[13px] font-medium block ${textMuted}`, children: "Total Active Partners" }),
          /* @__PURE__ */ jsxs("div", { className: "text-2xl lg:text-3xl font-bold text-blue-500 mt-1 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(FaBuilding, { className: "w-4 h-4" }),
            " ",
            hiringPartners.length,
            " Enterprises"
          ] }),
          /* @__PURE__ */ jsx("span", { className: `text-xs font-normal ${textMuted}`, children: "100% Signed MoUs" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border ${isDarkMode ? "bg-slate-800/60 border-slate-700/60" : "bg-slate-50 border-slate-200"}`, children: [
          /* @__PURE__ */ jsx("span", { className: `text-[13px] font-medium block ${textMuted}`, children: "Trainees Placed" }),
          /* @__PURE__ */ jsxs("div", { className: "text-2xl lg:text-3xl font-bold text-emerald-500 mt-1 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(FaUsers, { className: "w-4 h-4" }),
            " 5,420+"
          ] }),
          /* @__PURE__ */ jsx("span", { className: `text-xs font-normal ${textMuted}`, children: "Across All Cohorts" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border ${isDarkMode ? "bg-slate-800/60 border-slate-700/60" : "bg-slate-50 border-slate-200"}`, children: [
          /* @__PURE__ */ jsx("span", { className: `text-[13px] font-medium block ${textMuted}`, children: "Average Offer CTC" }),
          /* @__PURE__ */ jsxs("div", { className: "text-2xl lg:text-3xl font-bold text-purple-500 mt-1 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(FaMoneyBillWave, { className: "w-4 h-4" }),
            " ₹16.4 LPA"
          ] }),
          /* @__PURE__ */ jsx("span", { className: `text-xs font-normal ${textMuted}`, children: "Highest ₹34.0 LPA" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border ${isDarkMode ? "bg-slate-800/60 border-slate-700/60" : "bg-slate-50 border-slate-200"}`, children: [
          /* @__PURE__ */ jsx("span", { className: `text-[13px] font-medium block ${textMuted}`, children: "Industry Verticals" }),
          /* @__PURE__ */ jsxs("div", { className: "text-2xl lg:text-3xl font-bold text-amber-500 mt-1 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(FaFilter, { className: "w-4 h-4" }),
            " 7 Sectors"
          ] }),
          /* @__PURE__ */ jsx("span", { className: `text-xs font-normal ${textMuted}`, children: "AI, Cloud, FinTech, & More" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsx(FaMagnifyingGlass, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: searchQuery,
                onChange: (e) => setSearchQuery2(e.target.value),
                placeholder: "Search by company name, track, sector, or location...",
                className: `w-full pl-10 pr-4 py-2.5 text-sm font-normal rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDarkMode ? "bg-slate-800/90 border-slate-700 text-white placeholder-slate-500" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"}`
              }
            ),
            searchQuery && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSearchQuery2(""),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs",
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `text-xs font-medium self-center ${textMuted}`, children: [
            "Showing ",
            filteredPartners.length,
            " of ",
            hiringPartners.length,
            " partners"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none", children: categories.map((cat) => {
          const count = cat === "All" ? hiringPartners.length : hiringPartners.filter((p) => p.category === cat).length;
          const isSelected = selectedCategory === cat;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setSelectedCategory2(cat),
              className: `px-3 py-1.5 rounded-xl font-medium text-xs whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${isSelected ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : isDarkMode ? "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200"}`,
              children: [
                /* @__PURE__ */ jsx("span", { children: cat }),
                /* @__PURE__ */ jsx("span", { className: `text-xs px-1.5 py-0.2 rounded-full font-medium ${isSelected ? "bg-white/20 text-white" : isDarkMode ? "bg-slate-700 text-slate-300" : "bg-slate-200 text-slate-700"}`, children: count })
              ]
            },
            cat
          );
        }) })
      ] }),
      filteredPartners.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: filteredPartners.map((hp) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 ${subCardClass}`,
          onClick: () => onShowToast(`Opened MoU & candidate quota specs for ${hp.name} (${hp.track})`),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-semibold text-xs", children: /* @__PURE__ */ jsx(FaBuilding, { className: "w-3.5 h-3.5" }) }),
                  /* @__PURE__ */ jsx("h4", { className: `font-semibold text-base leading-snug ${textHeading}`, children: hp.name })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `text-xs px-2 py-0.5 rounded-full border font-medium shrink-0 ${hp.status === "Enterprise Tier" ? "bg-purple-500/20 text-purple-400 border-purple-500/30" : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"}`, children: hp.status })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between text-xs", children: /* @__PURE__ */ jsx("span", { className: "text-blue-500 font-medium", children: hp.track }) }),
                /* @__PURE__ */ jsxs("div", { className: `text-xs flex items-center gap-1 ${textMuted}`, children: [
                  /* @__PURE__ */ jsx(FaLocationDot, { className: "w-2.5 h-2.5 text-slate-400" }),
                  /* @__PURE__ */ jsx("span", { children: hp.location })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: `mt-3 pt-2.5 border-t flex items-center justify-between text-xs ${borderDivider}`, children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: `text-xs block ${textMuted}`, children: "Trainees" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-emerald-500", children: hp.hired })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsx("span", { className: `text-xs block ${textMuted}`, children: "Avg Package" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-purple-500", children: hp.avgPkg })
              ] })
            ] })
          ]
        },
        hp.id
      )) }) : /* @__PURE__ */ jsxs("div", { className: `p-12 text-center rounded-2xl border ${isDarkMode ? "bg-slate-800/40 border-slate-800" : "bg-slate-50 border-slate-200"}`, children: [
        /* @__PURE__ */ jsx(FaBuilding, { className: "w-10 h-10 mx-auto text-slate-500 mb-3" }),
        /* @__PURE__ */ jsx("h3", { className: `font-semibold text-base ${textHeading}`, children: "No hiring partners match your criteria" }),
        /* @__PURE__ */ jsx("p", { className: `text-sm mt-1 ${textMuted}`, children: "Try searching for a different company name or clearing the category filter." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setSearchQuery2("");
              setSelectedCategory2("All");
            },
            className: "mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition",
            children: "Reset Search & Filters"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        ActionModal,
        {
          isOpen: isPartnerModalOpen,
          title: "Register Corporate Hiring Partner",
          subtitle: "Sign a recruitment agreement MoU with an enterprise hiring partner",
          fields: [
            { label: "Company / Enterprise Name", name: "name", type: "text", placeholder: "e.g. NVIDIA Corporation India" },
            { label: "Industry Category", name: "category", type: "text", placeholder: "e.g. AI & Data Science / Big Tech" },
            { label: "Bootcamp Training Track", name: "track", type: "text", placeholder: "e.g. Deep Learning & CUDA Computing" },
            { label: "Annual Hiring Quota", name: "quota", type: "text", placeholder: "e.g. 50" },
            { label: "Average CTC Offered", name: "avgPkg", type: "text", placeholder: "e.g. ₹28.0 LPA" },
            { label: "Location / Tech Hub", name: "location", type: "text", placeholder: "e.g. Bengaluru / Pune" }
          ],
          onClose: () => setIsPartnerModalOpen(false),
          onSubmit: handleAddHiringPartner,
          isDarkMode
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans transition-colors duration-200 ${cardClass}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `pb-4 border-b ${borderDivider}`, children: [
      /* @__PURE__ */ jsxs("h2", { className: `text-xl font-semibold flex items-center gap-2 ${textHeading}`, children: [
        /* @__PURE__ */ jsx(FaChalkboardUser, { className: "w-5 h-5 text-blue-500" }),
        " Training Institute Portal Overview"
      ] }),
      /* @__PURE__ */ jsx("p", { className: `text-sm font-normal ${textMuted}`, children: "Skill bootcamps, certified trainees, accreditation tracks, and hiring enterprise ties" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Trainee Cohorts"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-medium text-[13px] block ${textMuted}`, children: "Active Trainees" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-blue-500 mt-1", children: "2,900" }),
        /* @__PURE__ */ jsx("span", { className: `text-xs font-normal ${textMuted}`, children: "12 Certified Bootcamps" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Certification Rates"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-medium text-[13px] block ${textMuted}`, children: "Cert Completion" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-emerald-500 mt-1", children: "91.4%" }),
        /* @__PURE__ */ jsx("span", { className: `text-xs font-normal ${textMuted}`, children: "Industry Accredited" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing 64 Hiring Partner Enterprises"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-medium text-[13px] block ${textMuted}`, children: "Placement Partners" }),
        /* @__PURE__ */ jsxs("div", { className: "text-2xl lg:text-3xl font-bold text-blue-500 mt-1", children: [
          hiringPartners.length,
          " Companies"
        ] }),
        /* @__PURE__ */ jsx("span", { className: `text-xs font-normal ${textMuted}`, children: "Tech & Cloud Tracks" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Employment Index"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-medium text-[13px] block ${textMuted}`, children: "Employment Index" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-emerald-500 mt-1", children: "88%" }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-emerald-500 flex items-center gap-1 mt-1 font-medium", children: [
          /* @__PURE__ */ jsx(FaArrowTrendUp, { className: "w-3 h-3" }),
          " Hired within 90 days"
        ] })
      ] })
    ] })
  ] });
};
const RecruiterDashboard = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const dispatch = useAppDispatch();
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState({
    title: "",
    subtitle: "",
    fields: []
  });
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [newJobForm, setNewJobForm] = useState({
    title: "",
    company: "Google Cloud India Pvt Ltd",
    salary: "",
    location: "",
    type: "Full-time",
    skills: "",
    description: ""
  });
  const [isLiveCallOpen, setIsLiveCallOpen] = useState(false);
  const [liveCallParticipant, setLiveCallParticipant] = useState({ name: "Aarav Sharma", role: "AI & MLOps Candidate" });
  const [companyName, setCompanyName] = useState("Google Cloud India Pvt Ltd");
  const [companyLocation, setCompanyLocation] = useState("Bengaluru, India");
  const [jobsList, setJobsList] = useState([
    { id: "JOB-101", title: "Cloud Solutions Engineer", ctc: "₹28.0 LPA", location: "Bengaluru / Remote", applicants: 420, status: "Active Requisition", type: "Full-time", tags: ["AWS", "Cloud", "Kubernetes"] },
    { id: "JOB-102", title: "AI & MLOps Scientist", ctc: "₹35.0 LPA", location: "Hyderabad", applicants: 180, status: "Shortlisting Phase", type: "Full-time", tags: ["Python", "PyTorch", "MLOps"] },
    { id: "JOB-103", title: "Quant Financial Analyst", ctc: "₹24.0 LPA", location: "Mumbai", applicants: 310, status: "Interview Phase", type: "Full-time", tags: ["Python", "Stochastics", "Risk"] },
    { id: "JOB-104", title: "Full-Stack Software Engineer", ctc: "₹18.0 LPA", location: "Gurugram", applicants: 330, status: "Active Requisition", type: "Full-time", tags: ["React", "TypeScript", "Node.js"] }
  ]);
  const [campusList, setCampusList] = useState([
    { university: "IIT Bombay", driveDate: "12th August 2026", roles: "AI & Cloud Engineers", students: "480 Registered", status: "Confirmed Drive" },
    { university: "BITS Pilani", driveDate: "18th August 2026", roles: "Quant & Software Engineers", students: "360 Registered", status: "Confirmed Drive" },
    { university: "IISc Bangalore", driveDate: "25th August 2026", roles: "Research Scientists", students: "190 Registered", status: "Registration Open" }
  ]);
  const [interviewsList, setInterviewsList] = useState([
    { id: "INT-501", candidate: "Aarav Sharma", role: "AI & MLOps Scientist", round: "Technical System Design", time: "Today, 3:00 PM", panel: "Dr. Rajesh Verma", status: "Confirmed" },
    { id: "INT-502", candidate: "Ananya Roy", role: "Cloud Solutions Engineer", round: "Coding & Architecture", time: "Tomorrow, 11:30 AM", panel: "Senior Architect", status: "Confirmed" }
  ]);
  const [offersList, setOffersList] = useState([
    { id: "OFF-901", candidate: "Aarav Sharma", role: "AI & MLOps Scientist", ctc: "₹35.0 LPA", status: "Accepted & Signed" },
    { id: "OFF-902", candidate: "Riya Sen", role: "Full-Stack Software Engineer", ctc: "₹18.0 LPA", status: "Offer Sent (Pending)" }
  ]);
  const openTriggerModal = (title, subtitle, fields) => {
    setActionModalConfig({ title, subtitle, fields });
    setIsActionModalOpen(true);
  };
  const handlePostJobSubmit = (e) => {
    e.preventDefault();
    if (!newJobForm.title.trim()) {
      onShowToast("Please enter a job role title.");
      return;
    }
    const generatedId = `JOB-${Math.floor(100 + Math.random() * 900)}`;
    const salaryText = newJobForm.salary.trim() || "₹22.0 - ₹32.0 LPA";
    const locText = newJobForm.location.trim() || "Bengaluru / Remote";
    const skillList = newJobForm.skills ? newJobForm.skills.split(",").map((s) => s.trim()) : ["React", "Python", "Cloud"];
    const newJobItem = {
      id: generatedId,
      title: newJobForm.title,
      company: companyName,
      location: locText,
      salary: salaryText,
      experience: "0 - 3 Yrs",
      type: newJobForm.type,
      matchScore: 95,
      tags: skillList,
      description: newJobForm.description || "Exciting corporate engineering role at " + companyName + ". Work on high-impact cloud systems and AI algorithms.",
      postedDate: "Just now"
    };
    const recruiterJobEntry = {
      id: generatedId,
      title: newJobForm.title,
      ctc: salaryText,
      location: locText,
      applicants: 0,
      status: "Active Requisition",
      type: newJobForm.type,
      tags: skillList
    };
    setJobsList([recruiterJobEntry, ...jobsList]);
    dispatch(addJobPosting(newJobItem));
    dispatch(addNotification({
      title: "New Job Requisition Published",
      message: `${companyName} published "${newJobForm.title}" for candidates.`,
      category: "jobs"
    }));
    onShowToast(`Successfully published job requisition: ${newJobForm.title}!`);
    setIsPostJobModalOpen(false);
    setNewJobForm({
      title: "",
      company: companyName,
      salary: "",
      location: "",
      type: "Full-time",
      skills: "",
      description: ""
    });
  };
  const handleModalFormSubmit = (data) => {
    if (actionModalConfig.title === "Edit Corporate Profile") {
      if (data.name) setCompanyName(data.name);
      if (data.location) setCompanyLocation(data.location);
      onShowToast(`Updated corporate profile for ${data.name || companyName}!`);
    } else if (actionModalConfig.title === "Post New Job Requisition") {
      const generatedId = `JOB-${Math.floor(100 + Math.random() * 900)}`;
      const newJob = {
        id: generatedId,
        title: data.title || "Cloud Solutions Engineer",
        ctc: data.ctc || "₹28.0 LPA",
        location: data.location || "Bengaluru",
        applicants: 0,
        status: "Active Requisition",
        type: "Full-time",
        tags: ["Cloud", "Engineering"]
      };
      setJobsList([newJob, ...jobsList]);
      dispatch(addJobPosting({
        id: generatedId,
        title: newJob.title,
        company: companyName,
        location: newJob.location,
        salary: newJob.ctc,
        experience: "0 - 2 Yrs",
        type: "Full-time",
        matchScore: 94,
        tags: ["Cloud", "Engineering", "Systems"],
        description: `Direct requisition for ${newJob.title} posted by ${companyName}.`,
        postedDate: "Just now"
      }));
      onShowToast(`Posted new job requisition for ${newJob.title}!`);
    } else if (actionModalConfig.title === "Register Campus Drive") {
      const newCampus = {
        university: data.university || "University Partner",
        driveDate: data.date || "Next Month",
        roles: data.roles || "Engineering Roles",
        students: "100 Registered",
        status: "Confirmed Drive"
      };
      setCampusList([newCampus, ...campusList]);
      onShowToast(`Registered campus placement drive at ${newCampus.university}!`);
    } else if (actionModalConfig.title === "Schedule Candidate Interview") {
      const newInt = {
        id: `INT-${Math.floor(100 + Math.random() * 900)}`,
        candidate: data.candidate || "Student Applicant",
        role: data.role || "Software Engineer",
        round: "Technical Interview 1",
        time: data.time || "Tomorrow, 2:00 PM",
        panel: "Tech Lead Panel",
        status: "Confirmed"
      };
      setInterviewsList([newInt, ...interviewsList]);
      onShowToast(`Scheduled interview with ${newInt.candidate}!`);
    } else if (actionModalConfig.title === "Issue Offer Letter") {
      const newOffer = {
        id: `OFF-${Math.floor(100 + Math.random() * 900)}`,
        candidate: data.candidate || "Selected Candidate",
        role: data.role || "Engineer",
        ctc: data.ctc || "₹22.0 LPA",
        status: "Offer Sent (Pending)"
      };
      setOffersList([newOffer, ...offersList]);
      onShowToast(`Issued offer letter to ${newOffer.candidate} for ${newOffer.ctc}!`);
    } else {
      onShowToast(`Action completed: ${actionModalConfig.title}`);
    }
    setIsActionModalOpen(false);
  };
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900 shadow-xs";
  const renderContent = () => {
    if (activeSubView === "overview") {
      return /* @__PURE__ */ jsxs("div", { className: "space-y-6 font-sans", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-slate-900 text-white shadow-md border border-slate-800 space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-xs text-slate-400 block", children: "Active Job Requisitions" }),
            /* @__PURE__ */ jsxs("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight text-white", children: [
              jobsList.length,
              " Roles"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full inline-block border border-emerald-500/30", children: "Across 6 Global Offices" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-blue-500/10 text-white shadow-sm border border-blue-500/20 space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-xs text-blue-300 block", children: "Applications Received" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight text-blue-400", children: "1,240" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-blue-300", children: "AI Resume Screened" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-amber-500/10 text-white shadow-sm border border-amber-500/20 space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-xs text-amber-300 block", children: "Avg ATS Match Fit" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight text-amber-400", children: "88%" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-amber-300", children: "High Skill Alignment" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-emerald-500/10 text-white shadow-sm border border-emerald-500/20 space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-xs text-emerald-300 block", children: "Offers Extended" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight text-emerald-400", children: "42 Extended" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-emerald-300", children: "38 Offers Accepted" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-2xl border space-y-4 ${cardClass}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "font-bold text-lg text-white flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(FaBuilding, { className: "w-5 h-5 text-blue-400" }),
                " ",
                companyName,
                " • Enterprise Recruiter Hiring Desk"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-400 mt-0.5", children: [
                "Location: ",
                companyLocation,
                " • Verified Employer Badge Active"
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setIsPostJobModalOpen(true),
                className: "bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20",
                children: [
                  /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsx("span", { children: "Post New Job Requisition" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(FaCalendarDays, { className: "w-5 h-5 text-blue-400" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm text-white", children: "Upcoming Campus Placement Drive" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-300 font-normal", children: "IIT Bombay • 12th August 2026 • 480 Registered Candidates" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => onShowToast("Navigated to IIT Bombay Campus Hiring Control"),
                className: "bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsx(FaBriefcase, { className: "w-3.5 h-3.5" }),
                  " Manage Drive"
                ]
              }
            )
          ] })
        ] })
      ] });
    }
    if (activeSubView === "verification") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(FaBuilding, { className: "w-5 h-5 text-blue-400" }),
              " Company Profile & Enterprise Verification"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: "Verified employer badge, corporate registration, & campus hiring agreements" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setIsPostJobModalOpen(true),
                className: "bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-lg shadow-blue-500/20",
                children: [
                  /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                  " Post Job Requisition"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => openTriggerModal("Edit Corporate Profile", "Update company description and location", [
                  { label: "Company Name", name: "name", type: "text", placeholder: companyName },
                  { label: "Headquarters Location", name: "location", type: "text", placeholder: companyLocation }
                ]),
                className: "bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs px-4 py-2 rounded-xl border border-slate-700 transition cursor-pointer flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsx(FaSliders, { className: "w-3.5 h-3.5 text-blue-400" }),
                  " Edit Profile"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 text-white", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-blue-400 uppercase tracking-wider block", children: "Corporate Identity" }),
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-base text-white", children: companyName }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-300", children: [
              "Location: ",
              companyLocation,
              " • Tax ID Verified • NAAC Campus MoU Approved"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 text-white", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-emerald-400 uppercase tracking-wider block", children: "Verification Status" }),
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-base text-emerald-300", children: "✓ Verified Corporate Employer" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-300", children: "Verified Employer • Direct Campus Placement Rights • AI Resume Access Enabled" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "jobs") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(FaBriefcase, { className: "w-5 h-5 text-blue-400" }),
              " Job & Internship Requisitions Hub"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: "Post new job descriptions, set CTC packages, & track applicant candidate pipelines" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setIsPostJobModalOpen(true),
              className: "bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Post New Job Requisition" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: jobsList.map((j) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border bg-slate-800/80 border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 text-white hover:border-blue-500/40 transition", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs bg-blue-600 text-white px-2 py-0.5 rounded-md font-mono font-bold", children: j.id }),
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-base text-white", children: j.title }),
              /* @__PURE__ */ jsx("span", { className: "text-[11px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-md font-medium", children: j.type || "Full-time" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-400 font-normal mt-1", children: [
              j.location,
              " • ",
              j.applicants,
              " Candidates Applied"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right flex md:flex-col items-center md:items-end justify-between gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "text-blue-400 font-bold text-sm", children: j.ctc }),
            /* @__PURE__ */ jsx("span", { className: "text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-medium", children: j.status })
          ] })
        ] }, j.id)) })
      ] });
    }
    if (activeSubView === "campus-hiring") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(FaGraduationCap, { className: "w-5 h-5 text-blue-400" }),
              " University Campus Placement Drives"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: "Partner universities, campus drive schedules, & candidate rosters" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Register Campus Drive", "Schedule a new placement drive at a partner university", [
                { label: "University Name", name: "university", type: "text", placeholder: "IIT Bombay" },
                { label: "Drive Date", name: "date", type: "text", placeholder: "12th August 2026" },
                { label: "Hiring Roles", name: "roles", type: "text", placeholder: "AI & Cloud Engineers" }
              ]),
              className: "bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Register Campus Drive"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: campusList.map((c, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border bg-slate-800/80 border-slate-700 flex items-center justify-between text-white", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-base text-white", children: c.university }),
            /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-medium text-xs", children: c.roles }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-slate-400 font-normal", children: [
              "Drive Date: ",
              c.driveDate,
              " • ",
              c.students
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs bg-slate-700 text-slate-200 px-2.5 py-0.5 rounded-full font-medium", children: c.status })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "student-search") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(FaMagnifyingGlass, { className: "w-5 h-5 text-blue-400" }),
            " Global Student Talent Search Engine"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: "Search 50,000+ verified student resumes by skills, ATS fit, and degree" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search candidates by skill e.g. Python, PyTorch, C++...",
              className: "flex-1 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast("Executed Neural Talent Search across 50,000+ candidate profiles!"),
              className: "bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-6 py-2.5 rounded-xl transition cursor-pointer shadow-md",
              children: "Search Talent Database"
            }
          )
        ] }) })
      ] });
    }
    if (activeSubView === "ai-match" || activeSubView === "matcher") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(FaBrain, { className: "w-5 h-5 text-blue-400" }),
            " AI Neural Candidate Matcher Engine"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: "Screen candidates using AI ATS fit algorithms and skill alignment" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          { name: "Aarav Sharma", college: "IIT Bombay", match: "98% Neural Match", role: "AI & MLOps Scientist", skills: ["Python", "PyTorch", "MLOps"], score: "ATS Score 96/100" },
          { name: "Ananya Roy", college: "BITS Pilani", match: "94% Neural Match", role: "Cloud Solutions Engineer", skills: ["AWS", "Docker", "Go"], score: "ATS Score 91/100" }
        ].map((cand, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border bg-slate-800/80 border-slate-700 flex items-center justify-between text-white", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-medium border border-emerald-500/30", children: cand.match }),
              /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-medium text-xs", children: cand.score })
            ] }),
            /* @__PURE__ */ jsxs("h4", { className: "font-bold text-base text-white mt-1", children: [
              cand.name,
              " • ",
              cand.college
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-400", children: [
              "Target Role: ",
              cand.role
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast(`Shortlisted ${cand.name} for technical interview!`),
              className: "bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-md",
              children: "Shortlist Candidate"
            }
          )
        ] }, i)) })
      ] });
    }
    if (activeSubView === "interviews") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(FaCalendarDays, { className: "w-5 h-5 text-blue-400" }),
              " Scheduled Candidate Interviews"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: "Interview panel schedules, evaluation rubrics, & video interview links" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Schedule Candidate Interview", "Set up a technical or HR interview round", [
                { label: "Candidate Name", name: "candidate", type: "text", placeholder: "Aarav Sharma" },
                { label: "Job Role", name: "role", type: "text", placeholder: "AI & MLOps Scientist" },
                { label: "Date & Time", name: "time", type: "text", placeholder: "Tomorrow, 3:00 PM" }
              ]),
              className: "bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Schedule Candidate Interview"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: interviewsList.map((int) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl border bg-slate-800/80 border-slate-700 flex items-center justify-between text-white", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-xs text-blue-400", children: int.time }),
              /* @__PURE__ */ jsx("span", { className: "text-xs bg-slate-700 text-slate-200 px-2 py-0.5 rounded-md font-medium", children: int.status })
            ] }),
            /* @__PURE__ */ jsxs("h4", { className: "font-bold text-base text-white mt-1", children: [
              int.candidate,
              " • Role: ",
              int.role
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-slate-400", children: [
              "Round: ",
              int.round,
              " • Panel: ",
              int.panel
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setLiveCallParticipant({ name: int.candidate, role: `Role: ${int.role}` });
                setIsLiveCallOpen(true);
                onShowToast(`Joined interview video room for ${int.candidate}`);
              },
              className: "bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-3.5 py-1.5 rounded-xl cursor-pointer shadow-md transition",
              children: "Join Video Call"
            }
          )
        ] }, int.id)) })
      ] });
    }
    if (activeSubView === "offers") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(FaAward, { className: "w-5 h-5 text-blue-400" }),
              " Offer Letters & Compensation (CTC) Desk"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: "Manage offer rollouts, CTC packages, & candidate acceptance tracking" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Issue Offer Letter", "Send official offer letter to selected candidate", [
                { label: "Candidate Name", name: "candidate", type: "text", placeholder: "Aarav Sharma" },
                { label: "Offered Role", name: "role", type: "text", placeholder: "AI & MLOps Scientist" },
                { label: "Annual CTC Package", name: "ctc", type: "text", placeholder: "₹35.0 LPA" }
              ]),
              className: "bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Issue Offer Letter"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: offersList.map((off) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border bg-slate-800/80 border-slate-700 flex items-center justify-between text-white", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-base text-white", children: off.candidate }),
            /* @__PURE__ */ jsxs("span", { className: "text-blue-400 font-medium text-xs", children: [
              off.role,
              " • CTC: ",
              off.ctc
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-medium", children: off.status })
        ] }, off.id)) })
      ] });
    }
    if (activeSubView === "hiring-analytics") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold flex items-center gap-2 text-white", children: [
            /* @__PURE__ */ jsx(FaArrowTrendUp, { className: "w-5 h-5 text-blue-400" }),
            " Enterprise Hiring Analytics & Talent Funnel"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: "Recruitment efficiency, time-to-hire metrics, & campus conversion rates" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-slate-800/80 border border-slate-700 text-center text-white", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl lg:text-4xl font-bold text-blue-400", children: "14 Days" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-white mt-1", children: "Average Time-to-Hire" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400 font-normal", children: "50% Faster than Industry" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center text-white", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl lg:text-4xl font-bold text-emerald-400", children: "90.4%" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-white mt-1", children: "Offer Acceptance Rate" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400 font-normal", children: "38 Accepted / 42 Extended" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center text-white", children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl lg:text-4xl font-bold text-amber-400", children: "42.0%" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-white mt-1", children: "Diversity Hiring Ratio" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-amber-300 font-medium", children: "Verified DEI Metric" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "notifications") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(FaBullhorn, { className: "w-5 h-5 text-blue-400" }),
              " Recruiter Notifications & Hiring Alerts"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: "Candidate applications, interview confirmations, and offer acceptance receipts" })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => onShowToast("Marked all recruiter alerts as read"), className: "text-blue-400 font-medium text-xs hover:underline cursor-pointer", children: "Mark All as Read" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          { title: "Aarav Sharma Accepted & Signed Offer Letter for ₹35.0 LPA!", time: "15 mins ago", type: "Offer Accepted", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
          { title: "IIT Bombay Placement Drive Registration Approved", time: "2 hours ago", type: "Campus Drive", bg: "bg-slate-800/80", border: "border-slate-700" },
          { title: "New Candidate Application Received for AI Scientist Role", time: "4 hours ago", type: "Applicant Alert", bg: "bg-slate-800/80", border: "border-slate-700" }
        ].map((nt, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-2xl border flex items-center justify-between ${nt.bg} ${nt.border} text-white`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-white", children: nt.title }),
            /* @__PURE__ */ jsxs("span", { className: "text-blue-400 font-medium text-xs", children: [
              nt.type,
              " • ",
              nt.time
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs bg-blue-600 text-white px-2.5 py-0.5 rounded-full font-medium", children: "New" })
        ] }, i)) })
      ] });
    }
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold flex items-center gap-2 text-white", children: [
          /* @__PURE__ */ jsx(FaSliders, { className: "w-5 h-5 text-blue-400" }),
          " Recruiter Governance & System Settings"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: "Configure enterprise team permissions, ATS integrations, & interviewer panels" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 text-white", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-white", children: "ATS Integration & API Keys" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: "Role Ready AI Neural Matcher v2.4 Connected • Real-time Sync Active" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 text-white", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-white", children: "Interviewer Panel Access Control" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400", children: "24 Enterprise Interviewer Accounts • RBAC Access Enabled" })
        ] })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    renderContent(),
    isPostJobModalOpen && /* @__PURE__ */ jsx("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "post-job-title", className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: `w-full max-w-lg p-6 rounded-2xl border shadow-2xl space-y-5 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs text-blue-400 font-semibold uppercase tracking-wider", children: companyName }),
          /* @__PURE__ */ jsxs("h3", { id: "post-job-title", className: "text-lg font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FaBriefcase, { className: "w-4 h-4 text-blue-400" }),
            " Post New Job Requisition"
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsPostJobModalOpen(false),
            "aria-label": "Close modal",
            className: "text-slate-400 hover:text-white font-bold p-1 cursor-pointer",
            children: /* @__PURE__ */ jsx(FaXmark, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handlePostJobSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Job Role Title *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              placeholder: "e.g. Cloud Solutions Architect / AI Engineer",
              value: newJobForm.title,
              onChange: (e) => setNewJobForm({ ...newJobForm, title: e.target.value }),
              className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Annual CTC Package (INR)" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(FaIndianRupeeSign, { className: "w-3 h-3 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "e.g. ₹28.0 - ₹35.0 LPA",
                  value: newJobForm.salary,
                  onChange: (e) => setNewJobForm({ ...newJobForm, salary: e.target.value }),
                  className: "w-full pl-8 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Office Location" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(FaLocationDot, { className: "w-3 h-3 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "e.g. Bengaluru / Remote",
                  value: newJobForm.location,
                  onChange: (e) => setNewJobForm({ ...newJobForm, location: e.target.value }),
                  className: "w-full pl-8 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Job Type" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: newJobForm.type,
                onChange: (e) => setNewJobForm({ ...newJobForm, type: e.target.value }),
                className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "Full-time", children: "Full-time Position" }),
                  /* @__PURE__ */ jsx("option", { value: "Internship", children: "Corporate Internship" }),
                  /* @__PURE__ */ jsx("option", { value: "Contract", children: "Contract / Project" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Required Skills (comma separated)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "e.g. React, Python, AWS, PyTorch",
                value: newJobForm.skills,
                onChange: (e) => setNewJobForm({ ...newJobForm, skills: e.target.value }),
                className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Job Overview & Requirements" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 4,
              placeholder: "Describe key responsibilities, team structure, and qualifications...",
              value: newJobForm.description,
              onChange: (e) => setNewJobForm({ ...newJobForm, description: e.target.value }),
              className: "w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-3 flex justify-end gap-3 border-t border-slate-800", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setIsPostJobModalOpen(false),
              className: "px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition cursor-pointer",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              className: "px-5 py-2 rounded-xl text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer flex items-center gap-1.5 shadow-lg shadow-blue-500/20",
              children: [
                /* @__PURE__ */ jsx(FaPaperPlane, { className: "w-3 h-3" }),
                " Publish Job Requisition"
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      ActionModal,
      {
        isOpen: isActionModalOpen,
        title: actionModalConfig.title,
        subtitle: actionModalConfig.subtitle,
        fields: actionModalConfig.fields,
        onClose: () => setIsActionModalOpen(false),
        onSubmit: handleModalFormSubmit,
        isDarkMode
      }
    ),
    /* @__PURE__ */ jsx(
      LiveCallModal,
      {
        isOpen: isLiveCallOpen,
        participantName: liveCallParticipant.name,
        participantRole: liveCallParticipant.role,
        onClose: () => setIsLiveCallOpen(false),
        onShowToast,
        isDarkMode
      }
    )
  ] });
};
const CompanyDashboard = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [internshipsList, setInternshipsList] = useState([
    { cohort: "Summer AI & Cloud Cohort 2026", duration: "6 Months", stipend: "₹40,000 / mo", interns: "180 Interns", ppo: "82% PPO Rate" },
    { cohort: "Winter Full Stack Engineering Drive", duration: "3 Months", stipend: "₹30,000 / mo", interns: "240 Interns", ppo: "75% PPO Rate" }
  ]);
  if (["discovery", "assessment", "psychometric", "dna", "ai-recommendations", "scholarships", "colleges", "roadmap", "resume-ats", "learning"].includes(activeSubView)) {
    return /* @__PURE__ */ jsx(StudentToolsViews, { activeSubView, onShowToast, isDarkMode });
  }
  const handleLaunchInternship = (data) => {
    const newCohort = {
      cohort: data.cohort || "Enterprise Internship Track",
      duration: data.duration || "6 Months",
      stipend: data.stipend || "₹35,000 / mo",
      interns: "1 Cohort",
      ppo: "Registrations Open"
    };
    setInternshipsList([newCohort, ...internshipsList]);
    onShowToast(`Launched new internship cohort: ${newCohort.cohort}!`);
  };
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-xl" : "bg-white border-blue-100 text-slate-900 shadow-sm";
  const subCardClass = isDarkMode ? "bg-slate-800/80 border-slate-700/80 text-white" : "bg-blue-50/40 border-blue-100 text-slate-900";
  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-500";
  const textHeading = isDarkMode ? "text-white" : "text-slate-900";
  const borderDivider = isDarkMode ? "border-slate-800" : "border-slate-100";
  if (activeSubView === "internships") {
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: `text-xl font-semibold flex items-center gap-2 ${textHeading}`, children: [
            /* @__PURE__ */ jsx(FaBriefcase, { className: "w-5 h-5 text-blue-500" }),
            " Corporate Internship Programs Page"
          ] }),
          /* @__PURE__ */ jsx("p", { className: `text-sm font-normal ${textMuted}`, children: "Summer & Winter internship cohorts for university engineering students" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsModalOpen(true),
            className: "bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-500/20",
            children: "+ Launch Internship Drive"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: internshipsList.map((inProg, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 ${subCardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: `font-semibold text-base ${textHeading}`, children: inProg.cohort }),
          /* @__PURE__ */ jsxs("span", { className: "text-blue-500 font-medium text-xs", children: [
            inProg.duration,
            " • Stipend: ",
            inProg.stipend
          ] }),
          /* @__PURE__ */ jsx("div", { className: `text-xs font-normal ${textMuted}`, children: inProg.interns })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 font-medium", children: inProg.ppo })
      ] }, i)) }),
      /* @__PURE__ */ jsx(
        ActionModal,
        {
          isOpen: isModalOpen,
          title: "Launch Corporate Internship Drive",
          subtitle: "Publish a new university internship program cohort",
          fields: [
            { label: "Internship Program Name", name: "cohort", type: "text", placeholder: "e.g. Summer AI Innovation Cohort" },
            { label: "Program Duration", name: "duration", type: "text", placeholder: "e.g. 6 Months" },
            { label: "Monthly Stipend", name: "stipend", type: "text", placeholder: "e.g. ₹40,000 / mo" }
          ],
          onClose: () => setIsModalOpen(false),
          onSubmit: handleLaunchInternship,
          isDarkMode
        }
      )
    ] });
  }
  if (activeSubView === "partnerships") {
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("h2", { className: `text-xl font-semibold flex items-center gap-2 ${textHeading}`, children: [
        /* @__PURE__ */ jsx(FaGraduationCap, { className: "w-5 h-5 text-blue-500" }),
        " Campus University MoUs Page"
      ] }),
      /* @__PURE__ */ jsx("p", { className: `text-sm font-normal ${textMuted}`, children: "45 Partner universities with signed corporate recruitment MoUs" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: ["IIT Bombay MoU", "IIT Delhi MoU", "BITS Pilani MoU", "NIT Trichy MoU", "DTU Delhi MoU"].map((mou, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border font-semibold text-sm flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast(`Opened MoU record for ${mou}`), children: [
        /* @__PURE__ */ jsx("span", { className: textHeading, children: mou }),
        /* @__PURE__ */ jsx("span", { className: "text-emerald-400 text-xs bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-medium", children: "Active MoU" })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "pipeline") {
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("h2", { className: `text-xl font-semibold flex items-center gap-2 ${textHeading}`, children: [
        /* @__PURE__ */ jsx(FaUsersGear, { className: "w-5 h-5 text-blue-500" }),
        " Talent Funnel Pipeline Page"
      ] }),
      /* @__PURE__ */ jsx("p", { className: `text-sm font-normal ${textMuted}`, children: "Pipeline stage metrics from campus sourcing to PPO conversion" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
        { stage: "Sourced Candidates", count: "4,200", sub: "Top 45 Universities" },
        { stage: "Shortlisted for Test", count: "1,450", sub: "Coding & Aptitude Round" },
        { stage: "Interview Cleared", count: "620", sub: "Technical + HR Cleared" },
        { stage: "PPO Offered", count: "480", sub: "Full Time Pre-Placement" }
      ].map((pip, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border space-y-1 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast(`Viewing stage pipeline for ${pip.stage}`), children: [
        /* @__PURE__ */ jsx("span", { className: `font-medium text-[13px] block ${textMuted}`, children: pip.stage }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-blue-500", children: pip.count }),
        /* @__PURE__ */ jsx("span", { className: `text-xs font-normal ${textMuted}`, children: pip.sub })
      ] }, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 font-sans transition-colors duration-200 ${cardClass}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `pb-4 border-b ${borderDivider}`, children: [
      /* @__PURE__ */ jsxs("h2", { className: `text-xl font-semibold flex items-center gap-2 ${textHeading}`, children: [
        /* @__PURE__ */ jsx(FaBuilding, { className: "w-5 h-5 text-blue-500" }),
        " Enterprise Company Portal Overview"
      ] }),
      /* @__PURE__ */ jsx("p", { className: `text-sm font-normal ${textMuted}`, children: "Corporate internship drives, university MoUs, intern enrollment, and PPO conversions" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Internship Drives"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-medium text-[13px] block ${textMuted}`, children: "Internship Drives" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-blue-500 mt-1", children: "12 Drives" }),
        /* @__PURE__ */ jsx("span", { className: `text-xs font-normal ${textMuted}`, children: "Summer & Winter Tracks" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Campus MoUs"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-medium text-[13px] block text-[#4B5563] ${textMuted}`, children: "Partner Universities" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-blue-500 mt-1", children: "45 Colleges" }),
        /* @__PURE__ */ jsx("span", { className: `text-xs font-normal ${textMuted}`, children: "Direct MoUs Signed" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Enrolled Interns"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-medium text-[13px] block ${textMuted}`, children: "Enrolled Interns" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-emerald-500 mt-1", children: "620 Interns" }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-emerald-500 flex items-center gap-1 mt-1 font-medium", children: [
          /* @__PURE__ */ jsx(FaArrowTrendUp, { className: "w-3 h-3" }),
          " 78% PPO Conversion Rate"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Monthly Stipends"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-medium text-[13px] block ${textMuted}`, children: "Monthly Stipend" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold text-emerald-500 mt-1", children: "₹35,000 / mo" }),
        /* @__PURE__ */ jsx("span", { className: `text-xs font-normal ${textMuted}`, children: "Competitive Package" })
      ] })
    ] })
  ] });
};
const StudentDashboard = ({
  onShowToast,
  onNavigateView,
  isDarkMode = true
}) => {
  const profile = useAppSelector((state) => state.profile);
  const { streakDays } = useAppSelector((state) => state.learning);
  const { atsScore } = useAppSelector((state) => state.resume);
  const { unreadCount } = useAppSelector((state) => state.notifications);
  const { savedJobIds } = useAppSelector((state) => state.jobs);
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900 shadow-xs";
  const subCardClass = isDarkMode ? "bg-slate-800/80 border-slate-700/80" : "bg-blue-50/40 border-blue-100";
  return /* @__PURE__ */ jsxs("div", { role: "main", "aria-label": "Student Unified Workspace Dashboard", className: "space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-6 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "bg-blue-500/20 text-blue-400 text-xs font-semibold px-2.5 py-0.5 rounded-md border border-blue-500/30", children: "Student Career Workspace" }),
          /* @__PURE__ */ jsx("span", { className: "bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2.5 py-0.5 rounded-md border border-emerald-500/30", children: "AI Readiness: 94/100" })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-extrabold tracking-tight", children: [
          "Welcome back, ",
          profile.name,
          "! 👋"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: `text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`, children: [
          "Target Career Goal: ",
          /* @__PURE__ */ jsx("strong", { className: "text-blue-400", children: profile.targetCareer }),
          " • ",
          profile.institution
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => onNavigateView("interview-ai"),
            className: "bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20",
            children: [
              /* @__PURE__ */ jsx(FaBrain, { className: "w-4 h-4 text-blue-200" }),
              " Launch AI Interview"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => onNavigateView("resume-builder"),
            className: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(FaFileCode, { className: "w-4 h-4 text-emerald-400" }),
              " ATS Resume (",
              atsScore,
              "/100)"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5", children: [
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border space-y-2 ${subCardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-slate-400 text-xs", children: [
          /* @__PURE__ */ jsx("span", { children: "Study Streak" }),
          /* @__PURE__ */ jsx(FaFire, { className: "w-4 h-4 text-amber-500 animate-bounce" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-white", children: [
          streakDays,
          " Days"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-emerald-400 text-xs font-semibold", children: "Active Goal Met" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border space-y-2 ${subCardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-slate-400 text-xs", children: [
          /* @__PURE__ */ jsx("span", { children: "ATS Resume Score" }),
          /* @__PURE__ */ jsx(FaFileCode, { className: "w-4 h-4 text-blue-400" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-blue-400", children: [
          atsScore,
          " / 100"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-blue-300 text-xs font-semibold", children: "Verified Parser Compliant" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border space-y-2 ${subCardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-slate-400 text-xs", children: [
          /* @__PURE__ */ jsx("span", { children: "Saved Jobs" }),
          /* @__PURE__ */ jsx(FaBriefcase, { className: "w-4 h-4 text-emerald-400" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-emerald-400", children: [
          savedJobIds.length,
          " Opportunities"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-emerald-300 text-xs font-semibold", children: "Ready for Application" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border space-y-2 ${subCardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-slate-400 text-xs", children: [
          /* @__PURE__ */ jsx("span", { children: "Unread Alerts" }),
          /* @__PURE__ */ jsx(FaBullhorn, { className: "w-4 h-4 text-purple-400" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-purple-400", children: [
          unreadCount,
          " Alerts"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-purple-300 text-xs font-semibold", children: "System & Job Matches" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-2xl border space-y-4 ${cardClass}`, children: [
      /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-white", children: "Quick Module Shortcuts" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
        { id: "discover", title: "Career Discovery", desc: "500+ AI fit pathways", icon: FaCompass, color: "text-blue-400" },
        { id: "scholarships", title: "Scholarships", desc: "₹1.5Cr available aid", icon: FaAward, color: "text-emerald-400" },
        { id: "learning-center", title: "Learning Hub", desc: "Skill bootcamps & streak", icon: FaBookOpen, color: "text-amber-400" },
        { id: "interview-ai", title: "Interview AI", desc: "Real-time mock simulator", icon: FaBrain, color: "text-purple-400" },
        { id: "resume-builder", title: "Resume ATS", desc: "AI scanner & PDF generator", icon: FaFileCode, color: "text-blue-400" },
        { id: "jobs", title: "Jobs & Internships", desc: "Corporate hiring requisitions", icon: FaBriefcase, color: "text-emerald-400" },
        { id: "notifications", title: "Notifications", desc: "Alerts & status pipeline", icon: FaBullhorn, color: "text-purple-400" },
        { id: "profile", title: "User Profile", desc: "Personal details & security", icon: FaCircleCheck, color: "text-blue-400" }
      ].map((item) => {
        const Icon = item.icon;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => onNavigateView(item.id),
            className: `p-4 rounded-xl border text-left transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/50 cursor-pointer space-y-2 ${subCardClass}`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsx(Icon, { className: `w-5 h-5 ${item.color}` }),
                /* @__PURE__ */ jsx(FaArrowRight, { className: "w-3 h-3 text-slate-500" })
              ] }),
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-xs text-white", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-400", children: item.desc })
            ]
          },
          item.id
        );
      }) })
    ] })
  ] });
};
const DiscoverModule = ({ onShowToast, isDarkMode = true }) => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery2] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedCareer, setSelectedCareer] = useState(null);
  const careersList = [
    {
      id: "car-1",
      title: "AI & Machine Learning Systems Architect",
      industry: "AI & Data Science",
      salary: "₹25.0 - ₹45.0 LPA",
      growth: "+38% YoY Expansion",
      matchScore: 96,
      tags: ["Python", "PyTorch", "Transformers", "MLOps", "System Architecture"],
      overview: "Design high-performance deep learning models, LLM pipelines, and automated MLOps infrastructure for global enterprises.",
      keySkills: ["Distributed Training", "PyTorch/JIT", "Kubernetes MLOps", "Neural Search"],
      roadmapSteps: ["Undergraduate CS/AI Degree", "ML Engineering Intern", "Senior AI Engineer", "AI Systems Architect"]
    },
    {
      id: "car-2",
      title: "Quantitative Risk & Financial Analyst",
      industry: "Fintech & Quant",
      salary: "₹22.0 - ₹38.0 LPA",
      growth: "+26% YoY Expansion",
      matchScore: 92,
      tags: ["Financial Modeling", "Python", "Stochastics", "Risk Analysis"],
      overview: "Utilize mathematical algorithms, time-series forecasting, and stochastic calculus to optimize portfolio risk.",
      keySkills: ["Monte Carlo Simulation", "Python QuantLib", "Options Pricing", "SQL/KDB+"],
      roadmapSteps: ["BS Mathematics / Finance", "Quant Data Analyst", "Senior Quant Trader", "Chief Risk Architect"]
    },
    {
      id: "car-3",
      title: "Cloud Security & DevSecOps Lead",
      industry: "Cybersecurity",
      salary: "₹20.0 - ₹34.0 LPA",
      growth: "+31% YoY Expansion",
      matchScore: 89,
      tags: ["AWS", "Zero Trust", "Kubernetes", "CI/CD", "SIEM"],
      overview: "Protect multi-cloud infrastructure through automated security policies, container scanning, and zero-trust protocols.",
      keySkills: ["DevSecOps Automation", "AWS Security Specialty", "Terraform Sentinel", "Incident Response"],
      roadmapSteps: ["Computer Science Degree", "DevOps Specialist", "Cloud Security Architect", "Chief Information Security Officer"]
    },
    {
      id: "car-4",
      title: "Biomedical & Genomic Data Engineer",
      industry: "Biotech & Health",
      salary: "₹18.0 - ₹28.0 LPA",
      growth: "+29% YoY Expansion",
      matchScore: 87,
      tags: ["Genomics", "Bioinformatics", "R", "Python", "CRISPR Tech"],
      overview: "Analyze high-throughput DNA sequencing data and build predictive biological algorithms for gene editing.",
      keySkills: ["Next-Gen Sequencing (NGS)", "Biopython", "CRISPR Target Selection", "Cloud Genomics"],
      roadmapSteps: ["BS Bio-Informatics", "Computational Biologist", "Senior Genomic Engineer", "Director of Bio-Research"]
    },
    {
      id: "car-5",
      title: "Fullstack Platform Engineer (React 19 & Cloud)",
      industry: "Software Engineering",
      salary: "₹18.0 - ₹32.0 LPA",
      growth: "+24% YoY Expansion",
      matchScore: 94,
      tags: ["React 19", "TypeScript", "Redux Toolkit", "FastAPI", "GraphQL"],
      overview: "Architect responsive, accessible micro-frontends and scalable event-driven microservices.",
      keySkills: ["React Server Components", "Redux Toolkit Architecture", "Node.js/FastAPI", "PostgreSQL"],
      roadmapSteps: ["Computer Science Degree", "Frontend Developer", "Fullstack Engineer", "Principal Platform Architect"]
    },
    {
      id: "car-6",
      title: "Robotics & Autonomous Fleet Engineer",
      industry: "Robotics & Hardware",
      salary: "₹20.0 - ₹36.0 LPA",
      growth: "+34% YoY Expansion",
      matchScore: 88,
      tags: ["ROS2", "C++", "Computer Vision", "LIDAR", "Control Systems"],
      overview: "Program autonomous navigation systems, sensor fusion engines, and robotic kinematics for industrial automation.",
      keySkills: ["ROS2 Navigation Stack", "C++ 20 Embedded", "SLAM Algorithms", "PyTorch Vision"],
      roadmapSteps: ["BS Mechatronics / CS", "Embedded Systems Engineer", "Robotics Architect", "VP of Autonomous Systems"]
    }
  ];
  const filteredCareers = careersList.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesIndustry = selectedIndustry === "All" || c.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900 shadow-xs";
  const subCardClass = isDarkMode ? "bg-slate-800/80 border-slate-700/80" : "bg-blue-50/40 border-blue-100";
  return /* @__PURE__ */ jsxs("div", { role: "main", "aria-label": "Career Discovery Hub", className: "space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FaCompass, { className: "w-5 h-5 text-blue-500" }),
          " Career Discovery & AI Neural Alignment Hub"
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`, children: "Explore 500+ high-growth future careers with real-time market compensation in INR and AI skill matching." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(FaMagnifyingGlass, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search careers, skills...",
              value: searchQuery,
              onChange: (e) => setSearchQuery2(e.target.value),
              "aria-label": "Search career pathways",
              className: `pl-9 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: selectedIndustry,
            onChange: (e) => setSelectedIndustry(e.target.value),
            "aria-label": "Filter by industry",
            className: `px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`,
            children: [
              /* @__PURE__ */ jsx("option", { value: "All", children: "All Industries" }),
              /* @__PURE__ */ jsx("option", { value: "AI & Data Science", children: "AI & Data Science" }),
              /* @__PURE__ */ jsx("option", { value: "Fintech & Quant", children: "Fintech & Quant" }),
              /* @__PURE__ */ jsx("option", { value: "Cybersecurity", children: "Cybersecurity" }),
              /* @__PURE__ */ jsx("option", { value: "Biotech & Health", children: "Biotech & Health" }),
              /* @__PURE__ */ jsx("option", { value: "Software Engineering", children: "Software Engineering" }),
              /* @__PURE__ */ jsx("option", { value: "Robotics & Hardware", children: "Robotics & Hardware" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: filteredCareers.map((car) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `p-5 rounded-2xl border space-y-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${subCardClass}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxs("span", { className: "bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-emerald-500/30", children: [
              car.matchScore,
              "% AI Match"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-blue-400 text-xs font-medium flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(FaArrowTrendUp, { className: "w-3 h-3" }),
              " ",
              car.growth
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base leading-snug", children: car.title }),
            /* @__PURE__ */ jsx("span", { className: `text-xs font-medium ${isDarkMode ? "text-slate-400" : "text-slate-500"}`, children: car.industry })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-blue-500 font-bold text-sm", children: car.salary }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: car.tags.map((t, idx) => /* @__PURE__ */ jsx("span", { className: `text-xs px-2 py-0.5 rounded-md font-medium border ${isDarkMode ? "bg-slate-900 border-slate-700 text-slate-300" : "bg-white border-blue-100 text-slate-700"}`, children: t }, idx)) }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setSelectedCareer(car);
                onShowToast(`Opened detailed roadmap for ${car.title}`);
                dispatch(addNotification({
                  title: "Career Exploration",
                  message: `Explored detailed roadmap for ${car.title}`,
                  category: "system"
                }));
              },
              className: "w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-xl text-sm transition cursor-pointer flex items-center justify-center gap-1.5",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Explore Pathway" }),
                /* @__PURE__ */ jsx(FaArrowRight, { className: "w-3 h-3" })
              ]
            }
          )
        ]
      },
      car.id
    )) }),
    selectedCareer && /* @__PURE__ */ jsx("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "career-modal-title", className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: `w-full max-w-2xl p-6 rounded-2xl border shadow-2xl space-y-6 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start pb-4 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-blue-400 uppercase tracking-wider", children: selectedCareer.industry }),
          /* @__PURE__ */ jsx("h3", { id: "career-modal-title", className: "text-xl font-bold text-white mt-1", children: selectedCareer.title })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedCareer(null),
            "aria-label": "Close career modal",
            className: "text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer",
            children: "✕"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-slate-300", children: selectedCareer.overview }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400 block", children: "Est. Market Compensation" }),
            /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-blue-400", children: selectedCareer.salary })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400 block", children: "Neural Match Score" }),
            /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold text-emerald-400", children: [
              selectedCareer.matchScore,
              "% Compatibility"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-white mb-2", children: "Key Skillstack Required:" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: selectedCareer.keySkills.map((sk, i) => /* @__PURE__ */ jsxs("span", { className: "text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-lg flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(FaCheck, { className: "w-3 h-3 text-blue-400" }),
            " ",
            sk
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-white mb-2", children: "Step-by-Step Career Progression:" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: selectedCareer.roadmapSteps.map((step, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs text-slate-300 bg-slate-800 p-2.5 rounded-xl border border-slate-700", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0", children: idx + 1 }),
            /* @__PURE__ */ jsx("span", { children: step })
          ] }, idx)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-4 flex justify-end gap-3 border-t border-slate-800", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedCareer(null),
            className: "px-4 py-2 rounded-xl text-sm font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition cursor-pointer",
            children: "Close"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              onShowToast(`Enrolled target goal: ${selectedCareer.title}!`);
              setSelectedCareer(null);
            },
            className: "px-5 py-2 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer",
            children: "Set as Target Career Goal"
          }
        )
      ] })
    ] }) })
  ] });
};
z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["student", "school", "college", "mentor", "recruiter", "super-admin"])
});
z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
  role: z.enum(["student", "school", "college", "mentor", "recruiter", "super-admin"]),
  institution: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone number required (10+ digits)").max(15),
  bio: z.string().max(300, "Bio must be under 300 characters"),
  gradeOrDegree: z.string().min(1, "Grade or Degree program is required"),
  institution: z.string().min(2, "School or University name is required"),
  targetCareer: z.string().min(2, "Target career path is required"),
  skills: z.array(z.string()).min(1, "At least one skill tag is required")
});
const resumeSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Phone number is required"),
  location: z.string().min(2, "City/State is required"),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  summary: z.string().min(30, "Professional summary should be at least 30 characters"),
  education: z.array(z.object({
    institution: z.string().min(1, "Institution is required"),
    degree: z.string().min(1, "Degree/Grade is required"),
    year: z.string().min(1, "Graduation year is required"),
    score: z.string().optional()
  })).min(1, "Add at least one education entry"),
  experience: z.array(z.object({
    company: z.string().min(1, "Company/Organization is required"),
    role: z.string().min(1, "Role title is required"),
    duration: z.string().min(1, "Duration is required"),
    description: z.string().min(10, "Bullet points are required")
  })),
  skills: z.string().min(2, "Key skills separated by commas")
});
const jobApplicationSchema = z.object({
  jobId: z.string().min(1),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  coverLetter: z.string().min(20, "Cover letter must be at least 20 characters"),
  availableFrom: z.string().min(1, "Notice period / availability date is required")
});
const scholarshipApplicationSchema = z.object({
  scholarshipId: z.string().min(1),
  studentName: z.string().min(2, "Student name is required"),
  gpaOrPercentage: z.string().min(1, "Current GPA or Percentage is required"),
  annualFamilyIncome: z.string().min(1, "Annual family income bracket is required"),
  statementOfPurpose: z.string().min(50, "Statement of Purpose should be at least 50 characters"),
  documentUrl: z.string().optional()
});
const ScholarshipsModule = ({ onShowToast, isDarkMode = true }) => {
  const dispatch = useAppDispatch();
  const { items: scholarshipsList, appliedIds, selectedCategory } = useAppSelector((state) => state.scholarships);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [formData, setFormData] = useState({
    gpaOrPercentage: "9.4",
    annualFamilyIncome: "₹4.5 LPA",
    statementOfPurpose: "I am passionate about applying artificial intelligence and neural computing to solve critical societal challenges..."
  });
  const [formErrors, setFormErrors] = useState({});
  const filteredScholarships = scholarshipsList.filter((s) => {
    return selectedCategory === "All" || s.category === selectedCategory;
  });
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900 shadow-xs";
  const subCardClass = isDarkMode ? "bg-slate-800/80 border-slate-700/80" : "bg-blue-50/40 border-blue-100";
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedScholarship) return;
    const result = scholarshipApplicationSchema.safeParse({
      scholarshipId: selectedScholarship.id,
      studentName: "Alex Rivera",
      ...formData
    });
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(fieldErrors);
      return;
    }
    dispatch(applyScholarship(selectedScholarship.id));
    dispatch(addNotification({
      title: "Scholarship Application Submitted",
      message: `Your application for "${selectedScholarship.name}" has been received!`,
      category: "scholarship"
    }));
    onShowToast(`Successfully submitted application for ${selectedScholarship.name}!`);
    setSelectedScholarship(null);
    setFormErrors({});
  };
  return /* @__PURE__ */ jsxs("div", { role: "main", "aria-label": "Scholarships and Merit Grants Portal", className: "space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FaAward, { className: "w-5 h-5 text-blue-500" }),
          " Scholarships & Institutional Merit Grants Desk"
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`, children: "Explore active fellowships, merit grants, and STEM scholarship opportunities with 1-click application tracking." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: ["All", "Merit", "STEM", "Equity"].map((cat) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => dispatch(setSelectedCategory(cat)),
          className: `px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${selectedCategory === cat ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : isDarkMode ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-blue-50 text-slate-700 hover:bg-blue-100"}`,
          children: cat
        },
        cat
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: filteredScholarships.map((sch) => {
      const isApplied = appliedIds.includes(sch.id);
      return /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border space-y-4 flex flex-col justify-between ${subCardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2.5 py-0.5 rounded-md border border-blue-500/20", children: sch.provider }),
            /* @__PURE__ */ jsxs("span", { className: "text-emerald-400 text-xs font-bold bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30", children: [
              sch.fitScore,
              "% Fit"
            ] })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base leading-snug", children: sch.name }),
          /* @__PURE__ */ jsx("div", { className: "text-emerald-400 font-bold text-lg", children: sch.amount }),
          /* @__PURE__ */ jsx("p", { className: `text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`, children: sch.description }),
          /* @__PURE__ */ jsxs("div", { className: `text-xs font-medium ${isDarkMode ? "text-slate-300" : "text-slate-700"}`, children: [
            /* @__PURE__ */ jsx("strong", { children: "Eligibility:" }),
            " ",
            sch.eligibility
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-3 border-t border-slate-700/50 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("span", { className: `text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`, children: [
            "Deadline: ",
            sch.deadline
          ] }),
          isApplied ? /* @__PURE__ */ jsxs("span", { className: "bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(FaCircleCheck, { className: "w-3.5 h-3.5" }),
            " Applied"
          ] }) : /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setSelectedScholarship(sch);
                setFormErrors({});
              },
              className: "bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsx(FaPaperPlane, { className: "w-3 h-3" }),
                " Direct Apply"
              ]
            }
          )
        ] })
      ] }, sch.id);
    }) }),
    selectedScholarship && /* @__PURE__ */ jsx("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "sch-modal-title", className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: `w-full max-w-lg p-6 rounded-2xl border shadow-2xl space-y-5 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs text-blue-400 font-semibold", children: selectedScholarship.provider }),
          /* @__PURE__ */ jsx("h3", { id: "sch-modal-title", className: "text-lg font-bold text-white", children: selectedScholarship.name })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setSelectedScholarship(null), className: "text-slate-400 hover:text-white font-bold p-1 cursor-pointer", children: "✕" })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleFormSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Current Academic Score / GPA" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.gpaOrPercentage,
              onChange: (e) => setFormData({ ...formData, gpaOrPercentage: e.target.value }),
              className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          formErrors.gpaOrPercentage && /* @__PURE__ */ jsxs("span", { className: "text-rose-400 text-xs mt-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(FaCircleExclamation, { className: "w-3 h-3" }),
            " ",
            formErrors.gpaOrPercentage
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Annual Family Income Bracket" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.annualFamilyIncome,
              onChange: (e) => setFormData({ ...formData, annualFamilyIncome: e.target.value }),
              className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          formErrors.annualFamilyIncome && /* @__PURE__ */ jsxs("span", { className: "text-rose-400 text-xs mt-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(FaCircleExclamation, { className: "w-3 h-3" }),
            " ",
            formErrors.annualFamilyIncome
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Statement of Purpose (SOP)" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 4,
              value: formData.statementOfPurpose,
              onChange: (e) => setFormData({ ...formData, statementOfPurpose: e.target.value }),
              className: "w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          formErrors.statementOfPurpose && /* @__PURE__ */ jsxs("span", { className: "text-rose-400 text-xs mt-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(FaCircleExclamation, { className: "w-3 h-3" }),
            " ",
            formErrors.statementOfPurpose
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-3 flex justify-end gap-3 border-t border-slate-800", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedScholarship(null),
              className: "px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition cursor-pointer",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "px-5 py-2 rounded-xl text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer",
              children: "Submit Official Application"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
};
const LearningCenterModule = ({ onShowToast, isDarkMode = true }) => {
  const dispatch = useAppDispatch();
  const { courses, streakDays } = useAppSelector((state) => state.learning);
  const [activeCourseModal, setActiveCourseModal] = useState(null);
  const [quizScore, setQuizScore] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900 shadow-xs";
  const subCardClass = isDarkMode ? "bg-slate-800/80 border-slate-700/80" : "bg-blue-50/40 border-blue-100";
  const handleLessonComplete = (courseId) => {
    dispatch(updateCourseProgress({
      courseId,
      progress: 95,
      completedModules: 11
    }));
    dispatch(incrementStreak());
    dispatch(addNotification({
      title: "Lesson Milestone Completed",
      message: "You completed a course lesson and maintained your daily study streak!",
      category: "learning"
    }));
    onShowToast("Lesson completed! Daily study streak updated to " + (streakDays + 1) + " days!");
  };
  return /* @__PURE__ */ jsxs("div", { role: "main", "aria-label": "Learning Center and Skill Bootcamps", className: "space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FaBookOpen, { className: "w-5 h-5 text-blue-500" }),
          " Learning Center & Skill Mastery Tracks"
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`, children: "Interactive industry bootcamps, automated quiz evaluation, and downloadable certification badges." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-2xl", children: [
        /* @__PURE__ */ jsx(FaFire, { className: "w-5 h-5 text-amber-500 animate-bounce" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "text-sm font-bold text-amber-400", children: [
            streakDays,
            "-Day Study Streak!"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-amber-300/80", children: "Active Learning Goal Met" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: courses.map((crs) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border space-y-4 flex flex-col justify-between ${subCardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-blue-400 bg-blue-500/20 px-2.5 py-0.5 rounded-md border border-blue-500/30", children: crs.category }),
          /* @__PURE__ */ jsxs("span", { className: "text-amber-400 text-xs font-bold flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(FaStar, { className: "w-3 h-3 text-amber-400" }),
            " ",
            crs.rating
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base leading-snug", children: crs.title }),
        /* @__PURE__ */ jsxs("p", { className: `text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`, children: [
          "Instructor: ",
          crs.instructor
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs font-medium mb-1", children: [
            /* @__PURE__ */ jsxs("span", { className: isDarkMode ? "text-slate-300" : "text-slate-700", children: [
              "Modules (",
              crs.completedModules,
              "/",
              crs.totalModules,
              ")"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-blue-400 font-bold", children: [
              crs.progress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `w-full h-2.5 rounded-full overflow-hidden ${isDarkMode ? "bg-slate-700" : "bg-slate-200"}`, children: /* @__PURE__ */ jsx("div", { className: "bg-blue-600 h-full transition-all duration-300", style: { width: `${crs.progress}%` } }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs pt-1 text-slate-400", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx(FaClock, { className: "inline w-3 h-3 text-blue-400 mr-1" }),
            " ",
            crs.duration
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-emerald-400 font-medium", children: crs.certBadge })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-3 border-t border-slate-700/50 flex gap-2", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setActiveCourseModal(crs);
              setQuizScore(null);
              setSelectedAnswer(null);
            },
            className: "flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5",
            children: [
              /* @__PURE__ */ jsx(FaPlay, { className: "w-3 h-3" }),
              " Resume Course"
            ]
          }
        ),
        crs.progress >= 80 && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onShowToast(`Downloaded Official Certificate for ${crs.title}!`),
            "aria-label": "Download Certificate",
            className: "bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl text-xs transition cursor-pointer",
            children: /* @__PURE__ */ jsx(FaDownload, { className: "w-3.5 h-3.5" })
          }
        )
      ] })
    ] }, crs.id)) }),
    activeCourseModal && /* @__PURE__ */ jsx("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "course-modal-title", className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: `w-full max-w-2xl p-6 rounded-2xl border shadow-2xl space-y-5 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs text-blue-400 font-semibold", children: activeCourseModal.category }),
          /* @__PURE__ */ jsx("h3", { id: "course-modal-title", className: "text-lg font-bold text-white", children: activeCourseModal.title })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setActiveCourseModal(null), className: "text-slate-400 hover:text-white font-bold p-1 cursor-pointer", children: "✕" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative w-full h-48 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden group", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleLessonComplete(activeCourseModal.id),
            className: "z-10 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition shadow-lg cursor-pointer group-hover:scale-110",
            children: /* @__PURE__ */ jsx(FaPlay, { className: "w-5 h-5 ml-1" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-3 left-4 right-4 flex justify-between items-center text-xs text-slate-300 font-mono", children: [
          /* @__PURE__ */ jsx("span", { children: "Module 11: Real-time State & Async Thunks" }),
          /* @__PURE__ */ jsx("span", { children: "14:20 / 22:00" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3", children: [
        /* @__PURE__ */ jsxs("h4", { className: "text-sm font-semibold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FaAward, { className: "w-4 h-4 text-blue-400" }),
          " Module Knowledge Quiz Check"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-300", children: "Which Redux Toolkit function is used to automatically generate action creators and action types based on reducers?" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: ["A) createStore()", "B) createSlice()", "C) combineReducers()", "D) applyMiddleware()"].map((opt, idx) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setSelectedAnswer(idx);
              if (idx === 1) {
                setQuizScore(100);
              } else {
                setQuizScore(50);
              }
            },
            className: `w-full text-left p-2.5 rounded-xl border text-xs transition cursor-pointer ${selectedAnswer === idx ? idx === 1 ? "bg-emerald-600/30 border-emerald-500 text-emerald-300" : "bg-rose-600/30 border-rose-500 text-rose-300" : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700"}`,
            children: opt
          },
          idx
        )) }),
        quizScore !== null && /* @__PURE__ */ jsxs("div", { className: `p-3 rounded-xl border text-xs font-semibold flex items-center justify-between ${quizScore === 100 ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" : "bg-rose-500/20 border-rose-500/40 text-rose-300"}`, children: [
          /* @__PURE__ */ jsx("span", { children: quizScore === 100 ? "✓ Correct! createSlice() simplifies Redux state logic." : "✕ Incorrect. Try option B (createSlice())." }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Score: ",
            quizScore,
            "/100"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-3 flex justify-end gap-3 border-t border-slate-800", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setActiveCourseModal(null),
            className: "px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition cursor-pointer",
            children: "Close"
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleLessonComplete(activeCourseModal.id),
            className: "px-5 py-2 rounded-xl text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsx(FaCircleCheck, { className: "w-3.5 h-3.5" }),
              " Mark Module Complete"
            ]
          }
        )
      ] })
    ] }) })
  ] });
};
const ResumeBuilderModule = ({ onShowToast, isDarkMode = true }) => {
  const dispatch = useAppDispatch();
  const resumeState = useAppSelector((state) => state.resume);
  const [activeTab, setActiveTab] = useState("editor");
  const [formData, setFormData] = useState({
    fullName: resumeState.fullName,
    email: resumeState.email,
    phone: resumeState.phone,
    location: resumeState.location,
    linkedin: resumeState.linkedin,
    github: resumeState.github,
    summary: resumeState.summary,
    skills: resumeState.skills
  });
  const [formErrors, setFormErrors] = useState({});
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900 shadow-xs";
  const subCardClass = isDarkMode ? "bg-slate-800/80 border-slate-700/80" : "bg-blue-50/40 border-blue-100";
  const handleScanAts = () => {
    const validation = resumeSchema.safeParse({
      ...formData,
      education: resumeState.education,
      experience: resumeState.experience
    });
    if (!validation.success) {
      const errors = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(errors);
      onShowToast("Please fix resume validation errors before scanning.");
      return;
    }
    dispatch(updateContactInfo(formData));
    dispatch(runAtsScan());
    dispatch(addNotification({
      title: "Resume ATS Scan Completed",
      message: `Your resume ATS Score is now ${resumeState.atsScore}/100. Ready for application!`,
      category: "system"
    }));
    onShowToast(`AI Scan completed! ATS Compatibility boosted to ${resumeState.atsScore}/100!`);
    setFormErrors({});
  };
  return /* @__PURE__ */ jsxs("div", { role: "main", "aria-label": "Interactive Resume Builder and ATS Scanner", className: "space-y-6 font-sans w-full max-w-full overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: `p-5 sm:p-6 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg sm:text-xl font-bold flex items-center gap-2 truncate", children: [
          /* @__PURE__ */ jsx(FaFileCode, { className: "w-5 h-5 text-blue-500 shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "truncate", children: "Interactive Resume Builder & AI ATS Scanner" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-xs sm:text-sm mt-1 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`, children: "Scan resume against corporate ATS parsers, optimize keyword density, and download PDF resumes." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 shrink-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex bg-slate-800 p-1 rounded-xl border border-slate-700", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveTab("editor"),
              className: `px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${activeTab === "editor" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`,
              children: "Form Editor"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveTab("preview"),
              className: `px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${activeTab === "preview" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`,
              children: "Live Preview"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleScanAts,
            className: "bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20",
            children: [
              /* @__PURE__ */ jsx(FaStar, { className: "w-3.5 h-3.5" }),
              " Run AI ATS Scan"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-w-0", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-6 min-w-0", children: activeTab === "editor" ? /* @__PURE__ */ jsxs("div", { className: `p-5 sm:p-6 rounded-2xl border space-y-5 min-w-0 ${cardClass}`, children: [
        /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-white border-b border-slate-800 pb-3", children: "Personal Details & Summary" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs text-slate-300 font-medium block mb-1", children: "Full Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.fullName,
                onChange: (e) => setFormData({ ...formData, fullName: e.target.value }),
                className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            ),
            formErrors.fullName && /* @__PURE__ */ jsx("span", { className: "text-rose-400 text-xs mt-1 block", children: formErrors.fullName })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs text-slate-300 font-medium block mb-1", children: "Email Address" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                value: formData.email,
                onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            ),
            formErrors.email && /* @__PURE__ */ jsx("span", { className: "text-rose-400 text-xs mt-1 block", children: formErrors.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs text-slate-300 font-medium block mb-1", children: "Phone Number" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.phone,
                onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
                className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs text-slate-300 font-medium block mb-1", children: "Location (City, State)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.location,
                onChange: (e) => setFormData({ ...formData, location: e.target.value }),
                className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-slate-300 font-medium block mb-1", children: "Professional Summary" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 4,
              value: formData.summary,
              onChange: (e) => setFormData({ ...formData, summary: e.target.value }),
              className: "w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          formErrors.summary && /* @__PURE__ */ jsx("span", { className: "text-rose-400 text-xs mt-1 block", children: formErrors.summary })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs text-slate-300 font-medium block mb-1", children: "Key Technical Skills (comma separated)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.skills,
              onChange: (e) => setFormData({ ...formData, skills: e.target.value }),
              className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: `p-6 sm:p-8 rounded-2xl border font-sans space-y-6 min-w-0 ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "border-b border-slate-800 pb-4 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl font-bold text-white", children: formData.fullName }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-slate-400 mt-1 flex flex-wrap justify-center gap-2 sm:gap-3", children: [
            /* @__PURE__ */ jsx("span", { children: formData.email }),
            " • ",
            /* @__PURE__ */ jsx("span", { children: formData.phone }),
            " • ",
            /* @__PURE__ */ jsx("span", { children: formData.location })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-blue-400 mb-2", children: "Professional Summary" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed text-slate-300 break-words", children: formData.summary })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-blue-400 mb-2", children: "Education & Credentials" }),
          resumeState.education.map((edu) => /* @__PURE__ */ jsxs("div", { className: "text-xs text-slate-300 flex justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { className: "text-white block", children: edu.institution }),
              /* @__PURE__ */ jsx("span", { children: edu.degree })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-mono shrink-0", children: edu.year })
          ] }, edu.id))
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-blue-400 mb-2", children: "Work Experience & Achievements" }),
          resumeState.experience.map((exp) => /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-xs text-slate-300", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-bold text-white gap-2", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                exp.role,
                " — ",
                exp.company
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-mono shrink-0", children: exp.duration })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 break-words", children: exp.description })
          ] }, exp.id))
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-blue-400 mb-2", children: "Key Skillstack" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: formData.skills.split(",").map((sk, i) => /* @__PURE__ */ jsx("span", { className: "text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2.5 py-0.5 rounded-md", children: sk.trim() }, i)) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 sm:p-6 rounded-2xl border space-y-5 flex flex-col justify-between min-w-0 ${subCardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 min-w-0", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-base font-bold text-white flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsx("span", { children: "ATS Compatibility Score" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-md border border-emerald-500/30 shrink-0", children: "Verified Parser" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center py-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-3xl sm:text-4xl font-extrabold text-blue-400", children: [
              resumeState.atsScore,
              " / 100"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400", children: "High Match for Tier-1 Enterprises" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-xs min-w-0", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-white", children: "AI ATS Scanner Feedback:" }),
            resumeState.atsFeedback.map((fb, idx) => /* @__PURE__ */ jsx("div", { className: "p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 font-medium break-words", children: fb }, idx))
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => onShowToast("Downloaded ATS PDF Resume!"),
            className: "w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-2",
            children: [
              /* @__PURE__ */ jsx(FaDownload, { className: "w-3.5 h-3.5" }),
              " Download ATS PDF Resume"
            ]
          }
        )
      ] })
    ] })
  ] });
};
const InterviewAIModule = ({ onShowToast, isDarkMode = true }) => {
  const dispatch = useAppDispatch();
  const { targetRole, activeQuestionIndex, questions, userAnswers, isCompleted, overallScore, feedbacks } = useAppSelector((state) => state.interview);
  const [currentInput, setCurrentInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900 shadow-xs";
  const subCardClass = isDarkMode ? "bg-slate-800/80 border-slate-700/80" : "bg-blue-50/40 border-blue-100";
  const currentQuestionText = questions[activeQuestionIndex];
  const handleSaveCurrentAnswer = () => {
    if (!currentInput.trim()) return;
    dispatch(saveAnswer({ index: activeQuestionIndex, answer: currentInput }));
    if (activeQuestionIndex < questions.length - 1) {
      dispatch(nextQuestion());
      setCurrentInput(userAnswers[activeQuestionIndex + 1] || "");
    } else {
      const sampleFeedbacks = questions.map((q, i) => ({
        question: q,
        answerText: userAnswers[i] || currentInput || "Answered during AI live audio practice.",
        score: 90 - i * 2,
        grammarRating: "95% Excellent",
        techAccuracy: "High Conceptual Depth",
        aiSuggestion: "Strong architectural reasoning. Consider adding specific benchmark metrics."
      }));
      dispatch(completeSession({ score: 92, feedbacks: sampleFeedbacks }));
      dispatch(addNotification({
        title: "AI Mock Interview Evaluated",
        message: "Your AI Mock Interview feedback scorecard is ready (Score: 92/100)!",
        category: "interview"
      }));
      onShowToast("AI Interview practice finished! Evaluation Scorecard generated (92/100)!");
    }
  };
  const handleSimulateVoiceInput = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setCurrentInput("In Transformer models, multi-head attention projects queries, keys, and values into parallel subspace representations. This enables the model to simultaneously attend to information from different representation subspaces at different positions, significantly boosting expressive power over single-head attention.");
      onShowToast("Simulated AI voice-to-text input recorded successfully!");
    }, 2e3);
  };
  return /* @__PURE__ */ jsxs("div", { role: "main", "aria-label": "Interview AI Simulator Desk", className: "space-y-6 font-sans w-full max-w-full overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: `p-5 sm:p-6 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg sm:text-xl font-bold flex items-center gap-2 truncate", children: [
          /* @__PURE__ */ jsx(FaBrain, { className: "w-5 h-5 text-blue-500 shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "truncate", children: "Interview AI Practice & Real-Time Evaluator Desk" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-xs sm:text-sm mt-1 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`, children: "Practice live technical & behavioral questions with real-time AI speech evaluation and confidence scoring." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 shrink-0", children: [
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: targetRole,
            onChange: (e) => dispatch(setTargetRole(e.target.value)),
            "aria-label": "Target Role Selector",
            className: "px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-full",
            children: [
              /* @__PURE__ */ jsx("option", { value: "AI & Machine Learning Architect", children: "AI & ML Architect" }),
              /* @__PURE__ */ jsx("option", { value: "Fullstack React & Node.js Developer", children: "Fullstack React Developer" }),
              /* @__PURE__ */ jsx("option", { value: "Quantitative Risk Analyst", children: "Quantitative Risk Analyst" }),
              /* @__PURE__ */ jsx("option", { value: "Cloud Security Engineer", children: "Cloud Security Engineer" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              dispatch(resetSession());
              setCurrentInput("");
              onShowToast("Reset AI Interview Session");
            },
            className: "bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-xl text-xs cursor-pointer border border-slate-700 shrink-0",
            title: "Reset Session",
            children: /* @__PURE__ */ jsx(FaRotateRight, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }),
    !isCompleted ? /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: `lg:col-span-2 p-5 sm:p-6 rounded-2xl border space-y-5 min-w-0 ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-between items-center pb-3 border-b border-slate-800 gap-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30 shrink-0", children: [
            "Question ",
            activeQuestionIndex + 1,
            " of ",
            questions.length
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-slate-400 truncate", children: [
            "Target Role: ",
            targetRole
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 min-w-0", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-blue-400 block", children: "AI Interviewer Question:" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base font-semibold text-white leading-relaxed break-words", children: currentQuestionText })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-between items-center gap-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300", children: "Your Answer (Type or Speak into Microphone)" }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: handleSimulateVoiceInput,
                className: `px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer border transition shrink-0 ${isRecording ? "bg-rose-600 text-white border-rose-500 animate-pulse" : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"}`,
                children: [
                  /* @__PURE__ */ jsx(FaMicrophone, { className: `w-3 h-3 ${isRecording ? "text-white" : "text-rose-400"}` }),
                  /* @__PURE__ */ jsx("span", { children: isRecording ? "Recording Speech..." : "Voice Practice Mode" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 6,
              value: currentInput,
              onChange: (e) => setCurrentInput(e.target.value),
              placeholder: "Structure your answer using the STAR framework (Situation, Task, Action, Result)...",
              className: "w-full p-4 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-3 border-t border-slate-800 flex flex-wrap justify-between items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                if (activeQuestionIndex > 0) {
                  dispatch(prevQuestion());
                  setCurrentInput(userAnswers[activeQuestionIndex - 1] || "");
                }
              },
              disabled: activeQuestionIndex === 0,
              className: "px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-50 cursor-pointer",
              children: "Previous"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleSaveCurrentAnswer,
              className: "px-5 py-2.5 rounded-xl text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer flex items-center gap-1.5 shadow-lg shadow-blue-500/20",
              children: [
                /* @__PURE__ */ jsx("span", { children: activeQuestionIndex === questions.length - 1 ? "Submit & Finalize AI Interview" : "Next Question" }),
                /* @__PURE__ */ jsx(FaPaperPlane, { className: "w-3 h-3" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `p-5 sm:p-6 rounded-2xl border space-y-5 flex flex-col justify-between min-w-0 ${subCardClass}`, children: /* @__PURE__ */ jsxs("div", { className: "space-y-4 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center space-y-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20", children: /* @__PURE__ */ jsx(FaVideo, { className: "w-7 h-7 sm:w-8 sm:h-8 animate-pulse" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-white truncate", children: "AI Neural Evaluator v2.4" }),
          /* @__PURE__ */ jsx("span", { className: "inline-block text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-md border border-emerald-500/30", children: "Listening Active" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2 text-xs min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 block truncate", children: "Grammar & Fluency" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-emerald-400 block truncate", children: "96% Optimal" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 block truncate", children: "Technical Depth Index" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-blue-400 block truncate", children: "Advanced Architectural" })
          ] })
        ] })
      ] }) })
    ] }) : (
      /* Evaluation Scorecard View */
      /* @__PURE__ */ jsxs("div", { className: `p-6 sm:p-8 rounded-2xl border space-y-6 min-w-0 ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20", children: "Evaluation Scorecard Ready" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-white mt-1", children: "AI Mock Interview Results" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:text-right", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-3xl font-extrabold text-blue-400", children: [
              overallScore,
              " / 100"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400", children: "Top 5% Candidate Performance" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 min-w-0", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-white", children: "Question-by-Question Breakdown:" }),
          feedbacks.map((fb, idx) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-between items-start gap-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-blue-400", children: [
                "Q",
                idx + 1,
                ": ",
                fb.question
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-md shrink-0", children: [
                fb.score,
                "/100"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-300 italic break-words", children: [
              '" ',
              fb.answerText,
              ' "'
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-blue-300 font-medium pt-1 break-words", children: [
              "✨ AI Feedback: ",
              fb.aiSuggestion
            ] })
          ] }, idx))
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-slate-800 flex flex-wrap justify-end gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => dispatch(resetSession()),
              className: "px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition cursor-pointer",
              children: "Practice Another Session"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => onShowToast("Downloaded Official Interview Evaluation Report PDF!"),
              className: "px-5 py-2 rounded-xl text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsx(FaDownload, { className: "w-3.5 h-3.5" }),
                " Download Scorecard PDF"
              ]
            }
          )
        ] })
      ] })
    )
  ] });
};
const JobsModule = ({ onShowToast, isDarkMode = true }) => {
  const dispatch = useAppDispatch();
  const { jobsList, savedJobIds, appliedJobIds, searchQuery, selectedCategory } = useAppSelector((state) => state.jobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appForm, setAppForm] = useState({
    fullName: "Alex Rivera",
    email: "alex.rivera@student.role-ready.ai",
    phone: "+91 98765 43210",
    experienceLevel: "0 - 2 Years",
    coverLetter: "I am highly interested in applying for this position. I possess strong experience in React 19, Redux Toolkit, and Python machine learning pipelines.",
    availableFrom: "Immediate (0 - 15 Days)"
  });
  const [formErrors, setFormErrors] = useState({});
  const filteredJobs = jobsList.filter((j) => {
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.company.toLowerCase().includes(searchQuery.toLowerCase()) || j.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === "All" || j.type === selectedCategory;
    return matchesSearch && matchesCat;
  });
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900 shadow-xs";
  const subCardClass = isDarkMode ? "bg-slate-800/80 border-slate-700/80" : "bg-blue-50/40 border-blue-100";
  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!selectedJob) return;
    const result = jobApplicationSchema.safeParse({
      jobId: selectedJob.id,
      ...appForm
    });
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(fieldErrors);
      return;
    }
    dispatch(applyToJob(selectedJob.id));
    dispatch(addNotification({
      title: "Job Application Received",
      message: `Successfully applied to ${selectedJob.title} at ${selectedJob.company}!`,
      category: "jobs"
    }));
    onShowToast(`Application submitted for ${selectedJob.title} at ${selectedJob.company}!`);
    setSelectedJob(null);
    setFormErrors({});
  };
  return /* @__PURE__ */ jsxs("div", { role: "main", "aria-label": "Jobs and Corporate Internships Board", className: "space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FaBriefcase, { className: "w-5 h-5 text-blue-500" }),
          " Jobs & Corporate Internships Marketplace"
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`, children: "Explore top corporate requisitions matched with your AI Neural Skill Score in INR." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(FaMagnifyingGlass, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search jobs, tech skills...",
              value: searchQuery,
              onChange: (e) => dispatch(setSearchQuery(e.target.value)),
              "aria-label": "Search job postings",
              className: `pl-9 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: selectedCategory,
            onChange: (e) => dispatch(setSelectedCategory$1(e.target.value)),
            "aria-label": "Filter job type",
            className: `px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`,
            children: [
              /* @__PURE__ */ jsx("option", { value: "All", children: "All Types" }),
              /* @__PURE__ */ jsx("option", { value: "Full-time", children: "Full-time" }),
              /* @__PURE__ */ jsx("option", { value: "Internship", children: "Internship" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: filteredJobs.map((job) => {
      const isSaved = savedJobIds.includes(job.id);
      const isApplied = appliedJobIds.includes(job.id);
      return /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border space-y-4 flex flex-col justify-between ${subCardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-md border border-emerald-500/30", children: [
              job.matchScore,
              "% Neural Match"
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => dispatch(toggleSaveJob(job.id)),
                "aria-label": isSaved ? "Unbookmark job" : "Bookmark job",
                className: "text-slate-400 hover:text-amber-400 cursor-pointer transition p-1",
                children: isSaved ? /* @__PURE__ */ jsx(FaBookmark, { className: "w-4 h-4 text-amber-400" }) : /* @__PURE__ */ jsx(FaRegBookmark, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base leading-snug", children: job.title }),
            /* @__PURE__ */ jsxs("span", { className: `text-xs font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"}`, children: [
              job.company,
              " • ",
              job.location
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-blue-400 font-bold text-sm", children: job.salary }),
          /* @__PURE__ */ jsx("p", { className: `text-xs ${isDarkMode ? "text-slate-400" : "text-slate-600"}`, children: job.description }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: job.tags.map((t, idx) => /* @__PURE__ */ jsx("span", { className: `text-xs px-2 py-0.5 rounded-md font-medium border ${isDarkMode ? "bg-slate-900 border-slate-700 text-slate-300" : "bg-white border-blue-100 text-slate-700"}`, children: t }, idx)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-3 border-t border-slate-700/50 flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("span", { className: `text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`, children: job.postedDate }),
          isApplied ? /* @__PURE__ */ jsxs("span", { className: "bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(FaCircleCheck, { className: "w-3.5 h-3.5" }),
            " Applied"
          ] }) : /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setSelectedJob(job);
                setFormErrors({});
              },
              className: "bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsx(FaPaperPlane, { className: "w-3 h-3" }),
                " Easy Apply"
              ]
            }
          )
        ] })
      ] }, job.id);
    }) }),
    selectedJob && /* @__PURE__ */ jsx("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "job-modal-title", className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: `w-full max-w-lg p-6 rounded-2xl border shadow-2xl space-y-5 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs text-blue-400 font-semibold", children: selectedJob.company }),
          /* @__PURE__ */ jsx("h3", { id: "job-modal-title", className: "text-lg font-bold text-white", children: selectedJob.title })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setSelectedJob(null), className: "text-slate-400 hover:text-white font-bold p-1 cursor-pointer", children: "✕" })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleApplySubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Full Candidate Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: appForm.fullName,
              onChange: (e) => setAppForm({ ...appForm, fullName: e.target.value }),
              className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          formErrors.fullName && /* @__PURE__ */ jsx("span", { className: "text-rose-400 text-xs mt-1 block", children: formErrors.fullName })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Email" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                value: appForm.email,
                onChange: (e) => setAppForm({ ...appForm, email: e.target.value }),
                className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            ),
            formErrors.email && /* @__PURE__ */ jsx("span", { className: "text-rose-400 text-xs mt-1 block", children: formErrors.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Phone" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: appForm.phone,
                onChange: (e) => setAppForm({ ...appForm, phone: e.target.value }),
                className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            ),
            formErrors.phone && /* @__PURE__ */ jsx("span", { className: "text-rose-400 text-xs mt-1 block", children: formErrors.phone })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Cover Letter & Pitch" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 4,
              value: appForm.coverLetter,
              onChange: (e) => setAppForm({ ...appForm, coverLetter: e.target.value }),
              className: "w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          ),
          formErrors.coverLetter && /* @__PURE__ */ jsx("span", { className: "text-rose-400 text-xs mt-1 block", children: formErrors.coverLetter })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-3 flex justify-end gap-3 border-t border-slate-800", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedJob(null),
              className: "px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition cursor-pointer",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "px-5 py-2 rounded-xl text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer",
              children: "Submit Application"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
};
const NotificationsModule = ({
  onShowToast,
  onNavigateView,
  isDarkMode = true
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items: notifList, unreadCount } = useAppSelector((state) => state.notifications);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedNotif, setSelectedNotif] = useState(null);
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900 shadow-xs";
  const subCardClass = isDarkMode ? "bg-slate-800/80 border-slate-700/80" : "bg-blue-50/40 border-blue-100";
  const filteredNotifs = notifList.filter((n) => {
    return activeCategory === "All" || n.category === activeCategory.toLowerCase();
  });
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "interview":
        return /* @__PURE__ */ jsx(FaBrain, { className: "w-4 h-4 text-purple-400" });
      case "jobs":
        return /* @__PURE__ */ jsx(FaBriefcase, { className: "w-4 h-4 text-blue-400" });
      case "scholarship":
        return /* @__PURE__ */ jsx(FaAward, { className: "w-4 h-4 text-emerald-400" });
      case "learning":
        return /* @__PURE__ */ jsx(FaBookOpen, { className: "w-4 h-4 text-amber-400" });
      default:
        return /* @__PURE__ */ jsx(FaBullhorn, { className: "w-4 h-4 text-blue-400" });
    }
  };
  const handleNavigateToUrl = (actionUrl) => {
    if (!actionUrl) return;
    const cleanView = actionUrl.replace(/^\//, "");
    if (onNavigateView) {
      onNavigateView(cleanView);
    } else {
      navigate(`/${cleanView}`);
    }
  };
  const handleNotificationClick = (n) => {
    dispatch(markAsRead(n.id));
    setSelectedNotif(n);
  };
  return /* @__PURE__ */ jsxs("div", { role: "main", "aria-label": "Central Notifications Center", className: "space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FaBullhorn, { className: "w-5 h-5 text-blue-500" }),
          " Notifications & Platform System Alerts",
          unreadCount > 0 && /* @__PURE__ */ jsxs("span", { className: "bg-rose-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full", children: [
            unreadCount,
            " New"
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`, children: "Real-time updates on job applications, interview schedules, scholarships, and learning milestones." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              dispatch(markAllAsRead());
              onShowToast("Marked all notifications as read!");
            },
            className: "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 font-medium text-xs px-3.5 py-2 rounded-xl transition cursor-pointer border border-blue-500/30 flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsx(FaCheck, { className: "w-3 h-3" }),
              " Mark All as Read"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              dispatch(clearAllNotifications());
              onShowToast("Cleared all notifications.");
            },
            className: "bg-slate-800 text-slate-400 hover:text-white font-medium text-xs px-3.5 py-2 rounded-xl transition cursor-pointer border border-slate-700 flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsx(FaTrash, { className: "w-3 h-3" }),
              " Clear All"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-1", children: ["All", "Interview", "Jobs", "Scholarship", "Learning", "System"].map((cat) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setActiveCategory(cat),
        className: `px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${activeCategory === cat ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : isDarkMode ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-blue-50 text-slate-700 hover:bg-blue-100"}`,
        children: cat
      },
      cat
    )) }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: filteredNotifs.length === 0 ? /* @__PURE__ */ jsx("div", { className: `p-8 text-center rounded-2xl border ${cardClass}`, children: /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "No notifications found in this category." }) }) : filteredNotifs.map((n) => /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: () => handleNotificationClick(n),
        className: `p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 hover:-translate-y-0.5 ${!n.isRead ? "bg-blue-950/40 border-blue-500/40 shadow-md" : subCardClass}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3.5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0", children: getCategoryIcon(n.category) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm text-white", children: n.title }),
                !n.isRead && /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-blue-500 animate-ping" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: `text-xs mt-0.5 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`, children: n.message }),
              /* @__PURE__ */ jsx("span", { className: "text-[11px] text-slate-400 mt-1 block", children: n.timestamp })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                dispatch(markAsRead(n.id));
                if (n.actionUrl) {
                  handleNavigateToUrl(n.actionUrl);
                } else {
                  setSelectedNotif(n);
                }
              },
              className: "bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white px-3 py-1.5 rounded-xl border border-blue-500/30 text-xs font-semibold flex items-center gap-1.5 transition shrink-0 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx("span", { children: "View Details" }),
                /* @__PURE__ */ jsx(FaArrowRight, { className: "w-3 h-3" })
              ]
            }
          )
        ]
      },
      n.id
    )) }),
    selectedNotif && /* @__PURE__ */ jsx("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "notif-modal-title", className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: `w-full max-w-lg p-6 rounded-2xl border shadow-2xl space-y-5 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center", children: getCategoryIcon(selectedNotif.category) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("span", { className: "text-xs text-blue-400 font-semibold uppercase tracking-wider", children: [
              selectedNotif.category,
              " Alert"
            ] }),
            /* @__PURE__ */ jsx("h3", { id: "notif-modal-title", className: "text-lg font-bold text-white", children: selectedNotif.title })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedNotif(null),
            "aria-label": "Close notification modal",
            className: "text-slate-400 hover:text-white font-bold p-1 cursor-pointer",
            children: /* @__PURE__ */ jsx(FaXmark, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-slate-400 block font-mono", children: [
            "Timestamp: ",
            selectedNotif.timestamp
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-200 leading-relaxed", children: selectedNotif.message })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-slate-400 px-1", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-emerald-400 font-medium", children: [
            /* @__PURE__ */ jsx(FaCircleCheck, { className: "w-3.5 h-3.5" }),
            " Marked as Read"
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            "ID: ",
            selectedNotif.id
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-3 flex justify-end gap-3 border-t border-slate-800", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setSelectedNotif(null),
            className: "px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition cursor-pointer",
            children: "Close"
          }
        ),
        selectedNotif.actionUrl && /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              const url = selectedNotif.actionUrl;
              setSelectedNotif(null);
              handleNavigateToUrl(url);
            },
            className: "px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer flex items-center gap-1.5 shadow-lg shadow-blue-500/20",
            children: [
              /* @__PURE__ */ jsx(FaArrowRightToBracket, { className: "w-3.5 h-3.5" }),
              " Go to Module"
            ]
          }
        )
      ] })
    ] }) })
  ] });
};
const ProfileModule = ({ onShowToast, isDarkMode = true }) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);
  const isOnline = useAppSelector((state) => state.offline.isOnline);
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    bio: profile.bio,
    gradeOrDegree: profile.gradeOrDegree,
    institution: profile.institution,
    targetCareer: profile.targetCareer,
    skills: profile.skills
  });
  const [newSkillText, setNewSkillText] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900 shadow-xs";
  const subCardClass = isDarkMode ? "bg-slate-800/80 border-slate-700/80" : "bg-blue-50/40 border-blue-100";
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const result = profileSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(fieldErrors);
      return;
    }
    dispatch(updateProfile(formData));
    dispatch(addNotification({
      title: "Profile Updated",
      message: "Your personal information, skills, and target career goals have been saved.",
      category: "system"
    }));
    onShowToast("Profile information successfully updated!");
    setFormErrors({});
  };
  const handleAddSkill = () => {
    if (!newSkillText.trim()) return;
    dispatch(addSkill(newSkillText.trim()));
    setFormData({ ...formData, skills: [...formData.skills, newSkillText.trim()] });
    setNewSkillText("");
  };
  return /* @__PURE__ */ jsxs("div", { role: "main", "aria-label": "User Profile and Account Governance", className: "space-y-6 font-sans w-full max-w-full overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: `p-5 sm:p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 min-w-0", children: [
        /* @__PURE__ */ jsx("div", { className: "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shadow-blue-500/20 shrink-0", children: profile.name.charAt(0) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg sm:text-xl font-bold flex flex-wrap items-center gap-2 truncate", children: [
            /* @__PURE__ */ jsx("span", { className: "truncate", children: profile.name }),
            /* @__PURE__ */ jsx("span", { className: "bg-blue-500/20 text-blue-400 text-xs font-semibold px-2.5 py-0.5 rounded-md border border-blue-500/30 shrink-0", children: "Verified Student" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: `text-xs sm:text-sm mt-0.5 truncate ${isDarkMode ? "text-slate-400" : "text-slate-600"}`, children: [
            profile.institution,
            " • ",
            profile.gradeOrDegree
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 shrink-0", children: /* @__PURE__ */ jsxs("span", { className: `text-xs px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 ${isOnline ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}`, children: [
        /* @__PURE__ */ jsx("span", { className: `w-2 h-2 rounded-full ${isOnline ? "bg-emerald-500" : "bg-amber-500 animate-ping"}` }),
        /* @__PURE__ */ jsx("span", { children: isOnline ? "Online Sync Active" : "Offline Cache Active" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSaveProfile, className: "grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: `lg:col-span-2 p-5 sm:p-6 rounded-2xl border space-y-5 min-w-0 ${cardClass}`, children: [
        /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-white border-b border-slate-800 pb-3", children: "Personal & Academic Details" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Full Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.name,
                onChange: (e) => setFormData({ ...formData, name: e.target.value }),
                className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            ),
            formErrors.name && /* @__PURE__ */ jsx("span", { className: "text-rose-400 text-xs mt-1 block", children: formErrors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Email Address" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                value: formData.email,
                onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            ),
            formErrors.email && /* @__PURE__ */ jsx("span", { className: "text-rose-400 text-xs mt-1 block", children: formErrors.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Phone Number" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.phone,
                onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
                className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            ),
            formErrors.phone && /* @__PURE__ */ jsx("span", { className: "text-rose-400 text-xs mt-1 block", children: formErrors.phone })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Target Career Pathway" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.targetCareer,
                onChange: (e) => setFormData({ ...formData, targetCareer: e.target.value }),
                className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            ),
            formErrors.targetCareer && /* @__PURE__ */ jsx("span", { className: "text-rose-400 text-xs mt-1 block", children: formErrors.targetCareer })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Grade or Degree Program" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.gradeOrDegree,
                onChange: (e) => setFormData({ ...formData, gradeOrDegree: e.target.value }),
                className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "School / University Institution" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.institution,
                onChange: (e) => setFormData({ ...formData, institution: e.target.value }),
                className: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-1", children: "Bio / Statement of Purpose" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 4,
              value: formData.bio,
              onChange: (e) => setFormData({ ...formData, bio: e.target.value }),
              className: "w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-slate-300 block mb-2", children: "Technical Skill Matrix Tags" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: formData.skills.map((skill, idx) => /* @__PURE__ */ jsxs("span", { className: "text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-lg flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx("span", { children: skill }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  dispatch(removeSkill(skill));
                  setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) });
                },
                className: "hover:text-rose-400 cursor-pointer",
                children: /* @__PURE__ */ jsx(FaXmark, { className: "w-3 h-3" })
              }
            )
          ] }, idx)) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Add new skill tag (e.g. Docker, PyTorch)...",
                value: newSkillText,
                onChange: (e) => setNewSkillText(e.target.value),
                className: "flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: handleAddSkill,
                className: "px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl cursor-pointer flex items-center justify-center gap-1 shrink-0",
                children: [
                  /* @__PURE__ */ jsx(FaPlus, { className: "w-3 h-3" }),
                  " Add Skill"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-slate-800 flex justify-end", children: /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            className: "px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20",
            children: [
              /* @__PURE__ */ jsx(FaFloppyDisk, { className: "w-3.5 h-3.5" }),
              " Save Profile Changes"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `p-5 sm:p-6 rounded-2xl border space-y-6 flex flex-col justify-between min-w-0 ${subCardClass}`, children: /* @__PURE__ */ jsxs("div", { className: "space-y-5 min-w-0", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-white border-b border-slate-700 pb-3", children: "Resume & Security" }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 min-w-0", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-slate-300 block", children: "Uploaded Corporate Resume" }),
          profile.resumeUploaded ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs bg-blue-500/10 border border-blue-500/30 p-2.5 rounded-lg text-blue-300 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0 truncate", children: [
              /* @__PURE__ */ jsx(FaFileLines, { className: "w-4 h-4 text-blue-400 shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "truncate", children: profile.resumeFileName })
            ] }),
            /* @__PURE__ */ jsx(FaCircleCheck, { className: "w-4 h-4 text-emerald-400 shrink-0 ml-2" })
          ] }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400 block", children: "No resume uploaded yet." }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                dispatch(setResumeFile({ uploaded: true, fileName: "Alex_Rivera_Resume_Updated_2026.pdf" }));
                onShowToast("Uploaded new resume file!");
              },
              className: "w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5",
              children: [
                /* @__PURE__ */ jsx(FaUpload, { className: "w-3 h-3 text-blue-400" }),
                " Upload PDF Resume"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 min-w-0", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold text-slate-300 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(FaShieldHalved, { className: "w-3.5 h-3.5 text-emerald-400 shrink-0" }),
            " Security & 2FA Status"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 break-words", children: "Two-Factor Authentication is enabled via Authenticator App." }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => onShowToast("Password change modal opened"),
              className: "text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 pt-1",
              children: [
                /* @__PURE__ */ jsx(FaLock, { className: "w-3 h-3" }),
                " Change Password"
              ]
            }
          )
        ] })
      ] }) })
    ] })
  ] });
};
const RoleWorkspaceViews = ({
  currentWorkspace,
  activeSubView,
  onShowToast,
  onNavigateView = () => {
  },
  isDarkMode = true
}) => {
  switch (activeSubView) {
    case "discover":
      return /* @__PURE__ */ jsx(DiscoverModule, { onShowToast, isDarkMode });
    case "scholarships":
      return /* @__PURE__ */ jsx(ScholarshipsModule, { onShowToast, isDarkMode });
    case "learning-center":
    case "learning":
      return /* @__PURE__ */ jsx(LearningCenterModule, { onShowToast, isDarkMode });
    case "resume-builder":
    case "resume":
    case "resume-ats":
      return /* @__PURE__ */ jsx(ResumeBuilderModule, { onShowToast, isDarkMode });
    case "interview-ai":
    case "interviews":
      return /* @__PURE__ */ jsx(InterviewAIModule, { onShowToast, isDarkMode });
    case "jobs":
      return /* @__PURE__ */ jsx(JobsModule, { onShowToast, isDarkMode });
    case "notifications":
      return /* @__PURE__ */ jsx(NotificationsModule, { onShowToast, onNavigateView, isDarkMode });
    case "profile":
      return /* @__PURE__ */ jsx(ProfileModule, { onShowToast, isDarkMode });
  }
  switch (currentWorkspace) {
    case "student":
      return /* @__PURE__ */ jsx(StudentDashboard, { onShowToast, onNavigateView, isDarkMode });
    case "school":
      return /* @__PURE__ */ jsx(SchoolDashboard, { activeSubView, onShowToast, isDarkMode });
    case "college":
      return /* @__PURE__ */ jsx(CollegeDashboard, { activeSubView, onShowToast, isDarkMode });
    case "mentor":
      return /* @__PURE__ */ jsx(MentorDashboard, { activeSubView, onShowToast, isDarkMode });
    case "training":
      return /* @__PURE__ */ jsx(TrainingDashboard, { activeSubView, onShowToast, isDarkMode });
    case "recruiter":
      return /* @__PURE__ */ jsx(RecruiterDashboard, { activeSubView, onShowToast, isDarkMode });
    case "company":
      return /* @__PURE__ */ jsx(CompanyDashboard, { activeSubView, onShowToast, isDarkMode });
    default:
      return /* @__PURE__ */ jsx(StudentDashboard, { onShowToast, onNavigateView, isDarkMode });
  }
};
const MetricsGrid = ({
  currentWorkspace,
  totalEntities,
  totalSeats,
  pendingCount,
  isDarkMode = false
}) => {
  const cardBg = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-md hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/40 cursor-pointer transition-all duration-200" : "bg-white border-blue-100 text-slate-900 shadow-xs hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 cursor-pointer transition-all duration-200";
  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-500";
  const textHeading = isDarkMode ? "text-white" : "text-slate-900";
  if (currentWorkspace === "super-admin") {
    return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 font-sans", children: [
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border transition ${cardBg}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: `text-[13px] font-medium ${textMuted}`, children: "Provisioned Entities" }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(FaBuildingUser, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: `text-2xl lg:text-3xl font-bold tracking-tight mb-1 ${textHeading}`, children: totalEntities }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs font-medium text-emerald-500 flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(FaArrowTrendUp, { className: "w-3.5 h-3.5" }),
          " +14.2% active growth"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border transition ${cardBg}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: `text-[13px] font-medium ${textMuted}`, children: "Active Seat Quotas" }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(FaUsersGear, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: `text-2xl lg:text-3xl font-bold tracking-tight mb-1 ${textHeading}`, children: totalSeats.toLocaleString() }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs font-medium text-blue-500 flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(FaShieldHalved, { className: "w-3.5 h-3.5" }),
          " 84.6% allocated"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border transition ${cardBg}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: `text-[13px] font-medium ${textMuted}`, children: "AI Career DNA Runs" }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(FaBrain, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: `text-2xl lg:text-3xl font-bold tracking-tight mb-1 ${textHeading}`, children: "2.8M" }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs font-medium text-emerald-500 flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(FaArrowTrendUp, { className: "w-3.5 h-3.5" }),
          " 99.4% Latency <450ms"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border transition ${cardBg}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: `text-[13px] font-medium ${textMuted}`, children: "Pending Approvals" }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(FaClock, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: `text-2xl lg:text-3xl font-bold tracking-tight mb-1 ${textHeading}`, children: pendingCount }),
        /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-amber-500 flex items-center gap-1", children: "Action required by Admin" })
      ] })
    ] });
  }
  const roleMetricsMap = {
    school: [
      { label: "Enrolled Students (8-12)", value: "3,820", sub: "100% Profile Completion", icon: FaUsersGear },
      { label: "Career DNA Completed", value: "3,450", sub: "90.3% Completion Rate", icon: FaBrain },
      { label: "Top Stream Match", value: "68% STEM", sub: "22% Commerce / 10% Humanities", icon: FaGraduationCap },
      { label: "Scholarships Fit", value: "₹1.2 Crores", sub: "412 Grants Awarded", icon: FaAward }
    ],
    college: [
      { label: "Total Undergrads", value: "11,450", sub: "9 Active Batches", icon: FaGraduationCap },
      { label: "Placement Rate", value: "94.2%", sub: "+5.1% YoY Increase", icon: FaBriefcase },
      { label: "Corporate Partners", value: "148 Drives", sub: "18 Drives Open Now", icon: FaHandshake },
      { label: "Average CTC Package", value: "₹24.5 LPA", sub: "Max Package: ₹110 LPA", icon: FaIndianRupeeSign }
    ],
    mentor: [
      { label: "Assigned Mentees", value: "42 Students", sub: "Active Counseling", icon: FaUsersGear },
      { label: "Sessions Completed", value: "184 Hours", sub: "98% Satisfaction Rating", icon: FaClock },
      { label: "Upcoming Appointments", value: "6 Sessions", sub: "Next session at 2:00 PM", icon: FaBriefcase },
      { label: "Counselor Score", value: "4.9 / 5.0", sub: "Master Level Certified", icon: FaAward }
    ],
    training: [
      { label: "Active Trainees", value: "2,900", sub: "12 Certified Bootcamps", icon: FaBookOpen },
      { label: "Cert Completion", value: "91.4%", sub: "Industry Accredited", icon: FaAward },
      { label: "Placement Partners", value: "64 Companies", sub: "Tech & Cloud Tracks", icon: FaHandshake },
      { label: "Employment Index", value: "88%", sub: "Hired within 90 days", icon: FaBriefcase }
    ],
    recruiter: [
      { label: "Active Job Postings", value: "18 Roles", sub: "Across 6 Global Offices", icon: FaBullhorn },
      { label: "Applications Received", value: "1,240", sub: "AI Resume Screened", icon: FaUsersGear },
      { label: "Avg ATS Score Fit", value: "88%", sub: "High Skill Alignment", icon: FaBrain },
      { label: "Offers Extended", value: "42 Extended", sub: "38 Offers Accepted", icon: FaBriefcase }
    ],
    company: [
      { label: "Internship Drives", value: "12 Drives", sub: "Summer & Winter Tracks", icon: FaBriefcase },
      { label: "Partner Universities", value: "45 Colleges", sub: "Direct MoUs Signed", icon: FaGraduationCap },
      { label: "Enrolled Interns", value: "620 Interns", sub: "78% PPO Conversion Rate", icon: FaUsersGear },
      { label: "Monthly Stipend", value: "₹35,000 / mo", sub: "Competitive Package", icon: FaIndianRupeeSign }
    ],
    government: [
      { label: "Scholarships Granted", value: "₹115 Crores", sub: "48,200 Beneficiaries", icon: FaLandmark },
      { label: "District Missions", value: "124 Active", sub: "Statewide Skill Coverage", icon: FaBuildingUser },
      { label: "Employability Index", value: "82.4%", sub: "+8.2% YoY Improvement", icon: FaArrowTrendUp },
      { label: "Certified Skills", value: "110,000", sub: "Government Accredited", icon: FaAward }
    ]
  };
  const metrics = roleMetricsMap[currentWorkspace] || roleMetricsMap.school;
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 font-sans", children: metrics.map((m, idx) => {
    const Icon = m.icon;
    return /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border transition ${cardBg}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsx("span", { className: `text-[13px] font-medium ${textMuted}`, children: m.label }),
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: `text-2xl lg:text-3xl font-bold tracking-tight mb-1 ${textHeading}`, children: m.value }),
      /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-blue-500", children: m.sub })
    ] }, idx);
  }) });
};
const EntitiesTable = ({
  entities,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSimulateWorkspace,
  onEditEntity,
  onToggleStatus,
  onDeleteEntity,
  isDarkMode = false
}) => {
  const roleCounts = {
    all: entities.length,
    school: 0,
    college: 0,
    mentor: 0,
    training: 0,
    recruiter: 0,
    company: 0
  };
  entities.forEach((e) => {
    if (roleCounts[e.role] !== void 0) roleCounts[e.role]++;
  });
  const filteredEntities = entities.filter((e) => {
    const matchesFilter = activeFilter === "all" || e.role === activeFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || e.name.toLowerCase().includes(q) || e.contactEmail.toLowerCase().includes(q) || e.domain.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });
  const roleLabels = {
    school: "School Admin",
    college: "College Admin",
    mentor: "Mentor Desk",
    training: "Training Inst.",
    recruiter: "Recruiter HR",
    company: "Enterprise Co."
  };
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-xl" : "bg-white border-blue-100 text-slate-900 shadow-sm";
  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-500";
  const textHeading = isDarkMode ? "text-white" : "text-slate-900";
  const tableHeaderBg = isDarkMode ? "bg-slate-800/80 text-slate-300 border-slate-700" : "bg-slate-50/50 text-slate-400 border-slate-200";
  const borderDivider = isDarkMode ? "border-slate-800" : "border-slate-100";
  return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 mb-8 font-sans transition-colors duration-200 ${cardClass}`, children: [
    /* @__PURE__ */ jsx("div", { className: `flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b ${borderDivider}`, children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: `text-lg font-semibold ${textHeading}`, children: "Partner Access & Ecosystem Governance" }),
      /* @__PURE__ */ jsx("p", { className: `text-sm font-normal ${textMuted}`, children: "Super Admin authorization hub for schools, colleges, mentors, training academies, recruiters, and companies" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none", children: [
      { id: "all", label: "All Verticals", icon: Building2 },
      { id: "school", label: "Schools", icon: School },
      { id: "college", label: "Colleges", icon: GraduationCap },
      { id: "mentor", label: "Mentors", icon: UserCheck },
      { id: "training", label: "Training", icon: BookOpen },
      { id: "recruiter", label: "Recruiters", icon: Briefcase },
      { id: "company", label: "Companies", icon: Building2 }
    ].map((tab) => {
      const Icon = tab.icon;
      const isActive = activeFilter === tab.id;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => onFilterChange(tab.id),
          className: `px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95 ${isActive ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : isDarkMode ? "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white" : "bg-blue-50 text-slate-700 hover:bg-blue-100 hover:text-blue-700"}`,
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsx("span", { children: tab.label }),
            /* @__PURE__ */ jsx("span", { className: `text-xs px-2 py-0.5 rounded-full font-medium ${isActive ? "bg-blue-700 text-white" : isDarkMode ? "bg-slate-700 text-blue-300" : "bg-blue-100 text-blue-700"}`, children: roleCounts[tab.id] || 0 })
          ]
        },
        tab.id
      );
    }) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: `border-b text-xs font-semibold uppercase tracking-wider ${tableHeaderBg}`, children: [
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 rounded-l-xl", children: "Entity Name" }),
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Role Category" }),
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Admin Email & Domain" }),
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Approval Pipeline" }),
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Verification Status" }),
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Subscription Tier" }),
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 rounded-r-xl text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: `divide-y text-sm ${borderDivider}`, children: filteredEntities.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", { colSpan: 7, className: `py-12 text-center text-sm font-normal ${textMuted}`, children: [
        /* @__PURE__ */ jsx(Building2, { className: "w-10 h-10 mx-auto text-blue-400 mb-2 opacity-60" }),
        "No partner entities match the selected filter or search term."
      ] }) }) : filteredEntities.map((e) => {
        const stage = e.approvalStage || (e.status === "active" ? "Live Portal" : "Document Verification");
        const stageNum = stage === "Live Portal" ? 7 : stage === "Subscription" ? 6 : stage === "Admin Approval" ? 5 : stage === "Background Check" ? 4 : stage === "Document Verification" ? 3 : stage === "Pending Review" ? 2 : 1;
        return /* @__PURE__ */ jsxs("tr", { className: `transition-all duration-200 ${isDarkMode ? "hover:bg-slate-800/80" : "hover:bg-blue-50/70"}`, children: [
          /* @__PURE__ */ jsxs("td", { className: `py-4 px-4 font-semibold ${textHeading}`, children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", children: e.name }),
            /* @__PURE__ */ jsxs("span", { className: `text-xs font-mono font-normal ${textMuted}`, children: [
              "ID: ",
              e.id
            ] })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "py-4 px-4", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-transform duration-200 hover:scale-105 ${isDarkMode ? "bg-blue-500/20 text-blue-300 border-blue-500/30" : "bg-blue-50 text-blue-700 border-blue-200"}`, children: roleLabels[e.role] || e.role }) }),
          /* @__PURE__ */ jsxs("td", { className: `py-4 px-4 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`, children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onSimulateWorkspace(e.role),
                title: `Click email to open ${e.role.toUpperCase()} Workspace Dashboard`,
                className: "text-sm font-medium text-[#3665EE] hover:underline cursor-pointer text-left block",
                children: e.contactEmail
              }
            ),
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-normal text-blue-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Globe, { className: "w-3 h-3" }),
              " ",
              e.domain
            ] })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "py-4 px-4 min-w-[220px]", children: /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs font-medium", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-blue-500", children: [
                "Stage ",
                stageNum,
                " of 7: ",
                stage
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "text-slate-400 font-normal", children: [
                Math.round(stageNum / 7 * 100),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-full h-1.5 bg-slate-200 rounded-full overflow-hidden flex", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: `h-full transition-all duration-300 ${stage === "Live Portal" ? "bg-emerald-500" : "bg-blue-600"}`,
                style: { width: `${stageNum / 7 * 100}%` }
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-slate-400 font-mono flex flex-wrap gap-1 pt-0.5", children: [
              /* @__PURE__ */ jsx("span", { children: "1. Register" }),
              " →",
              /* @__PURE__ */ jsx("span", { children: "2. Pending" }),
              " →",
              /* @__PURE__ */ jsx("span", { children: "3. Docs" }),
              " →",
              /* @__PURE__ */ jsx("span", { children: "4. BG Check" }),
              " →",
              /* @__PURE__ */ jsx("span", { children: "5. Admin" }),
              " →",
              /* @__PURE__ */ jsx("span", { children: "6. Sub" }),
              " →",
              /* @__PURE__ */ jsx("span", { className: "text-emerald-500 font-medium", children: "7. Live" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("td", { className: "py-4 px-4 max-w-xs space-y-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3 h-3 text-emerald-500" }),
              /* @__PURE__ */ jsx("span", { children: e.docsStatus || "Document Verification Pending" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs font-normal text-slate-500 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3 text-blue-400" }),
              /* @__PURE__ */ jsx("span", { children: e.bgCheckStatus || "Passed Clear" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "py-4 px-4", children: [
            /* @__PURE__ */ jsx("span", { className: "inline-block px-2.5 py-1 rounded-lg text-xs font-medium bg-[#E4F4EC] text-[#12163A] border border-[#C3E6D5] shadow-2xs", children: e.subscriptionPlan || "Enterprise Tier" }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-slate-400 mt-1 font-normal", children: [
              e.usedSeats.toLocaleString(),
              " / ",
              e.seats.toLocaleString(),
              " Seats"
            ] })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "py-4 px-4 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => onEditEntity(e),
                title: "Approve Next Workflow Stage / Edit Details",
                className: "px-2.5 py-1 rounded-lg bg-[#3665EE] hover:bg-[#2A54D5] text-white font-medium text-xs transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-xs flex items-center gap-1",
                children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3 h-3" }),
                  " Approve Step"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onSimulateWorkspace(e.role),
                title: `Launch ${e.role} Live Portal`,
                className: "p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer shadow-xs",
                children: /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onToggleStatus(e.id),
                title: e.status === "active" ? "Suspend Access" : "Activate Access",
                className: `p-1.5 rounded-lg border transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer ${e.status === "active" ? "bg-amber-500/20 border-amber-500/30 text-amber-400 hover:bg-amber-500/30" : "bg-emerald-500/20 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30"}`,
                children: /* @__PURE__ */ jsx(Power, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onDeleteEntity(e.id),
                title: "Revoke & Delete Access",
                className: "p-1.5 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:bg-rose-500/30 transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer",
                children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] }) })
        ] }, e.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: `mt-4 pt-4 border-t flex items-center justify-between text-xs ${borderDivider} ${textMuted}`, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        "Showing ",
        /* @__PURE__ */ jsx("strong", { children: filteredEntities.length }),
        " of ",
        /* @__PURE__ */ jsx("strong", { children: entities.length }),
        " registered ecosystem entities"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "font-medium text-blue-400", children: "All entity state managed via TanStack Query" })
    ] })
  ] });
};
const rbacModules = [
  { name: "AI Career Discovery & DNA Engine", key: "ai_discovery" },
  { name: "Scholarship Finder & Direct Apply", key: "scholarships" },
  { name: "Jobs & Internships Marketplace", key: "jobs" },
  { name: "Mentor Booking & Counselor Desk", key: "mentorship" },
  { name: "Institutional Analytics & Reports", key: "analytics" },
  { name: "AI Resume Builder & ATS Scanner", key: "resume_ai" },
  { name: "AI Mock Interview Assistant", key: "interview_ai" },
  { name: "Parent Dashboard Linkage", key: "parent_portal" }
];
const RBACMatrix = ({ onSave, isDarkMode = false }) => {
  const roles = ["School", "College", "Mentor", "Training", "Recruiter", "Company", "Government"];
  const handleSave = async () => {
    await saveRBACWeights({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), modules: rbacModules });
    onSave();
  };
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-xl" : "bg-white border-blue-100 text-slate-900 shadow-sm";
  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-500";
  const textHeading = isDarkMode ? "text-white" : "text-slate-900";
  const borderDivider = isDarkMode ? "border-slate-800" : "border-slate-100";
  return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 mb-8 font-sans transition-colors duration-200 ${cardClass}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between mb-6 pb-4 border-b ${borderDivider}`, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Sliders, { className: "w-5 h-5 text-blue-500" }),
          /* @__PURE__ */ jsx("h2", { className: `text-lg font-semibold ${textHeading}`, children: "Role-Based Access Control (RBAC) Matrix" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-sm font-normal mt-1 ${textMuted}`, children: "Configure granular module permissions and data visibility policies across all 7 partner role verticals" })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleSave,
          className: "flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer",
          children: [
            /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: "Save Global RBAC Matrix" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: `border-b text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "bg-slate-800/80 text-slate-300 border-slate-700" : "bg-slate-50/50 text-slate-400 border-slate-200"}`, children: [
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 rounded-l-xl", children: "Platform Module / Capability" }),
        roles.map((r) => /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 text-center", children: r }, r))
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: `divide-y ${borderDivider}`, children: rbacModules.map((mod, idx) => /* @__PURE__ */ jsxs("tr", { className: `transition ${isDarkMode ? "hover:bg-slate-800/60" : "hover:bg-blue-50/40"}`, children: [
        /* @__PURE__ */ jsx("td", { className: `py-4 px-4 font-medium ${textHeading}`, children: mod.name }),
        roles.map((r, rIdx) => {
          const isChecked = (idx + rIdx) % 2 === 0 || idx === 0;
          return /* @__PURE__ */ jsx("td", { className: "py-4 px-4 text-center", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              defaultChecked: isChecked,
              className: "w-4 h-4 accent-blue-600 rounded cursor-pointer"
            }
          ) }, r);
        })
      ] }, mod.key)) })
    ] }) })
  ] });
};
const AIEngineConfig = ({ onSaveWeights, isDarkMode = false }) => {
  const [aptitude, setAptitude] = useState(40);
  const [interest, setInterest] = useState(35);
  const [market, setMarket] = useState(25);
  const handleSave = async () => {
    await saveAIWeights({ aptitude, interest, market });
    onSaveWeights();
  };
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-xl" : "bg-white border-blue-100 text-slate-900 shadow-sm";
  const subCardClass = isDarkMode ? "bg-slate-800/80 border-slate-700/80 text-white" : "bg-blue-50/40 border-blue-100 text-slate-900";
  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-500";
  const textHeading = isDarkMode ? "text-white" : "text-slate-900";
  const borderDivider = isDarkMode ? "border-slate-800" : "border-slate-100";
  return /* @__PURE__ */ jsx("div", { className: "space-y-6 mb-8 font-sans", children: /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 transition-colors duration-200 ${cardClass}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between mb-4 pb-3 border-b ${borderDivider}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Brain, { className: "w-5 h-5 text-blue-500 animate-pulse" }),
        /* @__PURE__ */ jsx("h2", { className: `text-lg font-semibold ${textHeading}`, children: "AI Career Intelligence Engine Configuration" })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "bg-emerald-500/20 text-emerald-400 text-xs font-medium px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-400" }),
        " Custom ML Models Operational"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mt-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("h3", { className: `font-semibold text-base flex items-center gap-2 ${textHeading}`, children: [
          /* @__PURE__ */ jsx(Sliders, { className: "w-4 h-4 text-blue-500" }),
          "Algorithm Weighting Parameters"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: `flex justify-between text-sm font-medium mb-1.5 ${textHeading}`, children: [
            /* @__PURE__ */ jsx("span", { children: "Academic Aptitude Score Weight" }),
            /* @__PURE__ */ jsxs("span", { className: "text-blue-500 font-semibold", children: [
              aptitude,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "range",
              min: "10",
              max: "80",
              value: aptitude,
              onChange: (e) => setAptitude(Number(e.target.value)),
              className: "w-full accent-blue-600 cursor-pointer"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: `flex justify-between text-sm font-medium mb-1.5 ${textHeading}`, children: [
            /* @__PURE__ */ jsx("span", { children: "Psychometric Interest Fit Weight" }),
            /* @__PURE__ */ jsxs("span", { className: "text-blue-500 font-semibold", children: [
              interest,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "range",
              min: "10",
              max: "80",
              value: interest,
              onChange: (e) => setInterest(Number(e.target.value)),
              className: "w-full accent-blue-600 cursor-pointer"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: `flex justify-between text-sm font-medium mb-1.5 ${textHeading}`, children: [
            /* @__PURE__ */ jsx("span", { children: "Industry Market Demand Weight" }),
            /* @__PURE__ */ jsxs("span", { className: "text-blue-500 font-semibold", children: [
              market,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "range",
              min: "10",
              max: "80",
              value: market,
              onChange: (e) => setMarket(Number(e.target.value)),
              className: "w-full accent-blue-600 cursor-pointer"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSave,
            className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 rounded-xl transition cursor-pointer shadow-md shadow-blue-500/20",
            children: "Apply AI Recommendation Weights"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border ${subCardClass}`, children: [
        /* @__PURE__ */ jsx("h3", { className: `font-semibold text-base mb-4 ${textHeading}`, children: "AI Microservice Telemetry" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          { name: "Neural Candidate Matcher v2.4", status: "Operational", latency: "18ms" },
          { name: "Holland RIASEC Scoring Model", status: "Operational", latency: "12ms" },
          { name: "ATS Resume Keyphrase Parser", status: "Operational", latency: "42ms" },
          { name: "Scholarship Match Auditor", status: "Operational", latency: "15ms" }
        ].map((m, i) => /* @__PURE__ */ jsxs("div", { className: `p-3 rounded-xl border flex items-center justify-between ${isDarkMode ? "bg-slate-900 border-slate-700" : "bg-white border-blue-100"}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: `text-sm font-medium ${textHeading}`, children: m.name }),
            /* @__PURE__ */ jsxs("div", { className: `text-xs font-normal ${textMuted}`, children: [
              "Latency: ",
              m.latency
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "bg-emerald-500/20 text-emerald-400 font-medium px-2.5 py-0.5 rounded-full text-xs", children: m.status })
        ] }, i)) })
      ] })
    ] })
  ] }) });
};
const AuditFeed = ({
  logs,
  showFullTable = false,
  isDarkMode = false
}) => {
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-xl" : "bg-white border-blue-100 text-slate-900 shadow-sm";
  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-500";
  const textHeading = isDarkMode ? "text-white" : "text-slate-900";
  const borderDivider = isDarkMode ? "border-slate-800" : "border-slate-100";
  if (showFullTable) {
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 mb-8 font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between mb-6 pb-4 border-b ${borderDivider}`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: `text-lg font-semibold ${textHeading}`, children: "System Security Audit Logs" }),
          /* @__PURE__ */ jsx("p", { className: `text-sm font-normal ${textMuted}`, children: "Immutable record of all Super Admin access grants and permission changes" })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: `flex items-center gap-2 font-medium text-sm px-4 py-2 rounded-xl transition cursor-pointer ${isDarkMode ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`, children: [
          /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: "Export Log CSV" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: `border-b text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "bg-slate-800/80 text-slate-300 border-slate-700" : "bg-slate-50/50 text-slate-400 border-slate-200"}`, children: [
          /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 rounded-l-xl", children: "Timestamp" }),
          /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Administrator" }),
          /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Action Type" }),
          /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Target Entity" }),
          /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Role" }),
          /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "IP Address" }),
          /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 rounded-r-xl", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: `divide-y ${borderDivider}`, children: logs.map((log) => /* @__PURE__ */ jsxs("tr", { className: `transition ${isDarkMode ? "hover:bg-slate-800/60" : "hover:bg-blue-50/40"}`, children: [
          /* @__PURE__ */ jsx("td", { className: `py-3.5 px-4 font-mono text-xs ${textMuted}`, children: log.time }),
          /* @__PURE__ */ jsx("td", { className: `py-3.5 px-4 font-semibold ${textHeading}`, children: log.admin }),
          /* @__PURE__ */ jsx("td", { className: "py-3.5 px-4 font-medium text-blue-500", children: log.action }),
          /* @__PURE__ */ jsx("td", { className: `py-3.5 px-4 font-normal ${isDarkMode ? "text-slate-300" : "text-slate-800"}`, children: log.target }),
          /* @__PURE__ */ jsx("td", { className: "py-3.5 px-4", children: /* @__PURE__ */ jsx("span", { className: "bg-blue-500/20 text-blue-300 font-medium px-2 py-0.5 rounded-md text-xs", children: log.role }) }),
          /* @__PURE__ */ jsx("td", { className: `py-3.5 px-4 font-mono text-xs ${textMuted}`, children: log.ip }),
          /* @__PURE__ */ jsx("td", { className: "py-3.5 px-4", children: /* @__PURE__ */ jsx("span", { className: "bg-emerald-500/20 text-emerald-400 font-medium px-2.5 py-0.5 rounded-full text-xs", children: log.status }) })
        ] }, log.id)) })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 font-sans transition-colors duration-200 ${cardClass}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between mb-4 pb-3 border-b ${borderDivider}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(ShieldCheck, { className: "w-5 h-5 text-blue-400" }),
        /* @__PURE__ */ jsx("h3", { className: `font-semibold text-base ${textHeading}`, children: "Live Governance Audit Feed" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "bg-blue-500/20 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-500/30", children: "Real-Time Audit Active" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: logs.slice(0, 5).map((log) => /* @__PURE__ */ jsxs("div", { className: `p-3 rounded-xl border flex items-center justify-between transition ${isDarkMode ? "bg-slate-800/80 border-slate-700/80" : "bg-blue-50/40 border-blue-100"}`, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: `text-sm font-semibold ${textHeading}`, children: log.action }),
        /* @__PURE__ */ jsxs("div", { className: `text-xs font-normal ${textMuted}`, children: [
          "Actor: ",
          log.admin,
          " • Target: ",
          log.target
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsx("span", { className: "bg-emerald-500/20 text-emerald-400 text-xs font-medium px-2 py-0.5 rounded-full block mb-1", children: log.status }),
        /* @__PURE__ */ jsx("span", { className: `text-xs font-mono ${textMuted}`, children: log.time })
      ] })
    ] }, log.id)) })
  ] });
};
const SuperAdminDashboard = ({
  activeSubView,
  entities,
  auditLogs,
  activeRoleFilter,
  searchQuery,
  onFilterChange,
  onSimulateWorkspace,
  onEditEntity,
  onToggleStatus,
  onDeleteEntity,
  onWorkspaceChange,
  onShowToast,
  isDarkMode
}) => {
  const totalSeats = entities.reduce((acc, curr) => acc + curr.seats, 0);
  const pendingCount = entities.filter((e) => e.status === "pending").length;
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-xl" : "bg-white border-blue-100 text-slate-900 shadow-sm";
  const subCardClass = isDarkMode ? "bg-slate-800/80 border-slate-700/80 text-white" : "bg-blue-50/40 border-blue-100 text-slate-900";
  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-500";
  const textHeading = isDarkMode ? "text-white" : "text-slate-900";
  if (activeSubView === "access") {
    return /* @__PURE__ */ jsx(
      EntitiesTable,
      {
        entities,
        activeFilter: activeRoleFilter,
        onFilterChange,
        searchQuery,
        onSimulateWorkspace,
        onEditEntity,
        onToggleStatus,
        onDeleteEntity,
        isDarkMode
      }
    );
  }
  if (activeSubView === "rbac") {
    return /* @__PURE__ */ jsx(RBACMatrix, { onSave: () => onShowToast("Saved global RBAC Matrix policies!"), isDarkMode });
  }
  if (activeSubView === "ai") {
    return /* @__PURE__ */ jsx(AIEngineConfig, { onSaveWeights: () => onShowToast("Applied new AI recommendation weights!"), isDarkMode });
  }
  if (activeSubView === "audit") {
    return /* @__PURE__ */ jsx(AuditFeed, { logs: auditLogs, showFullTable: true, isDarkMode });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 font-sans", children: [
    /* @__PURE__ */ jsx(
      MetricsGrid,
      {
        currentWorkspace: "super-admin",
        totalEntities: entities.length,
        totalSeats,
        pendingCount,
        isDarkMode
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsx("h3", { className: `font-semibold text-base mb-4 ${textHeading}`, children: "Registered Ecosystem Partner Breakdown" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm", children: [
        { name: "School Admins", count: "2 Registered", icon: FaSchool, role: "school" },
        { name: "College Admins", count: "1 Registered", icon: FaGraduationCap, role: "college" },
        { name: "Mentors & Counselors", count: "1 Registered", icon: FaUserCheck, role: "mentor" },
        { name: "Training Academies", count: "2 Registered", icon: FaChalkboardUser, role: "training" },
        { name: "Recruiters & HR", count: "1 Registered", icon: FaBriefcase, role: "recruiter" },
        { name: "Companies", count: "1 Registered", icon: FaBuilding, role: "company" }
      ].map((v, i) => {
        const Icon = v.icon;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => onWorkspaceChange(v.role),
            className: `p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 ${subCardClass} hover:-translate-y-1 hover:shadow-lg hover:border-blue-500`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 text-blue-500" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: `font-semibold text-sm ${textHeading}`, children: v.name }),
                  /* @__PURE__ */ jsx("div", { className: `text-xs font-normal ${textMuted}`, children: v.count })
                ] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/30", children: "Active" })
            ]
          },
          i
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsx(AuditFeed, { logs: auditLogs, isDarkMode }),
      /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900 shadow-xs"}`, children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base mb-3", children: "TanStack Query Cache Telemetry" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: `flex justify-between p-2.5 rounded-xl ${isDarkMode ? "bg-slate-800 text-slate-300" : "bg-blue-50/50 text-slate-600"}`, children: [
            /* @__PURE__ */ jsx("span", { children: "Entities Cached Records" }),
            /* @__PURE__ */ jsxs("strong", { className: "text-blue-500 font-semibold", children: [
              entities.length,
              " items"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `flex justify-between p-2.5 rounded-xl ${isDarkMode ? "bg-slate-800 text-slate-300" : "bg-blue-50/50 text-slate-600"}`, children: [
            /* @__PURE__ */ jsx("span", { children: "Audit Stream Cached Records" }),
            /* @__PURE__ */ jsxs("strong", { className: "text-blue-500 font-semibold", children: [
              auditLogs.length,
              " logs"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `flex justify-between p-2.5 rounded-xl ${isDarkMode ? "bg-slate-800 text-slate-300" : "bg-blue-50/50 text-slate-600"}`, children: [
            /* @__PURE__ */ jsx("span", { children: "Active Workspace" }),
            /* @__PURE__ */ jsx("span", { className: "text-blue-500 font-mono font-semibold", children: "Super Admin" })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const $role = UNSAFE_withComponentProps(function RoleDashboardRoute() {
  var _a2;
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const roleAliasMap = {
    "student": "student",
    "students": "student",
    "learner": "student",
    "super-admin": "super-admin",
    "superadmin": "super-admin",
    "admin": "super-admin",
    "school": "school",
    "schools": "school",
    "college": "college",
    "colleges": "college",
    "mentor": "mentor",
    "mentors": "mentor",
    "counselor": "mentor",
    "training": "training",
    "trainings": "training",
    "recruiter": "recruiter",
    "recruiters": "recruiter",
    "hr": "recruiter",
    "company": "company",
    "companies": "company"
  };
  const standaloneModules = ["discover", "scholarships", "learning-center", "learning", "resume-builder", "resume", "interview-ai", "jobs", "notifications", "profile"];
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const rawPathRole = ((_a2 = pathSegments[0]) == null ? void 0 : _a2.toLowerCase()) || "";
  const rawParamRole = (params.role || "").toLowerCase();
  const isDirectModule = standaloneModules.includes(rawPathRole);
  const resolvedRole = isDirectModule ? "student" : roleAliasMap[rawParamRole] || roleAliasMap[rawPathRole] || "student";
  const currentWorkspace = resolvedRole;
  const activeSubView = isDirectModule ? rawPathRole : (params["*"] || pathSegments[1] || "overview").toLowerCase().replace(/^\//, "") || "overview";
  const [activeRoleFilter, setActiveRoleFilter] = useState("all");
  const [searchQuery, setSearchQuery2] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("role_ready_theme");
      if (savedTheme !== null) {
        return savedTheme === "dark";
      }
    }
    return true;
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("role_ready_theme", isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode]);
  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  const {
    data: entities = []
  } = useQuery({
    queryKey: ["entities"],
    queryFn: fetchEntities
  });
  const {
    data: auditLogs = []
  } = useQuery({
    queryKey: ["auditLogs"],
    queryFn: fetchAuditLogs
  });
  const addEntityMutation = useMutation({
    mutationFn: addEntity,
    onSuccess: (newEnt) => {
      queryClient.invalidateQueries({
        queryKey: ["entities"]
      });
      queryClient.invalidateQueries({
        queryKey: ["auditLogs"]
      });
      showToast(`Provisioned access for ${newEnt.name}!`);
    }
  });
  const updateEntityMutation = useMutation({
    mutationFn: ({
      id,
      updates
    }) => updateEntity(id, updates),
    onSuccess: (updatedEnt) => {
      queryClient.invalidateQueries({
        queryKey: ["entities"]
      });
      queryClient.invalidateQueries({
        queryKey: ["auditLogs"]
      });
      showToast(`Updated access configuration for ${updatedEnt.name}`);
    }
  });
  const deleteEntityMutation = useMutation({
    mutationFn: deleteEntity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["entities"]
      });
      queryClient.invalidateQueries({
        queryKey: ["auditLogs"]
      });
      showToast(`Revoked partner entity access successfully`);
    }
  });
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4e3);
  };
  const handleWorkspaceChange = (role) => {
    navigate(`/${role}`);
    showToast(`Switched to ${role.toUpperCase()} Workspace Portal!`);
  };
  const handleViewChange = (view) => {
    if (view === "overview") {
      navigate(`/${currentWorkspace}`);
    } else {
      navigate(`/${currentWorkspace}/${view}`);
    }
  };
  const handleSimulateWorkspace = (role) => {
    handleWorkspaceChange(role);
  };
  const getSubViewTitle = () => {
    if (activeSubView === "overview") {
      const portalNames = {
        "student": "Student Career Readiness Workspace",
        "super-admin": "Super Admin Governance Hub",
        "school": "School Admin Portal Overview",
        "college": "College Admin Portal Overview",
        "mentor": "Mentor & Counselor Desk Overview",
        "training": "Training Institute Portal Overview",
        "recruiter": "Recruiter Talent Desk Overview",
        "company": "Enterprise Company Portal Overview"
      };
      return portalNames[currentWorkspace] || "Workspace Overview";
    }
    const titles = {
      "discover": "Career Discovery & Neural Alignment Engine",
      "scholarships": "Scholarships & Institutional Merit Aid Cell",
      "learning-center": "Learning Center & Skill Bootcamps",
      "learning": "Learning Center & Skill Bootcamps",
      "resume-builder": "AI Resume Builder & ATS Scanner",
      "resume": "AI Resume Builder & ATS Scanner",
      "interview-ai": "Interview AI Simulator & Real-time Practice",
      "interviews": "Scheduled Candidate Interviews & AI Simulator",
      "jobs": "Jobs & Corporate Internships Marketplace",
      "notifications": "Central Notifications & System Alerts",
      "profile": "User Profile & Skill Matrix Manager",
      "access": "Access Provisioning & Quota Management Hub",
      "rbac": "Role-Based Access Control (RBAC) Matrix",
      "ai": "AI Recommendation Engine Control",
      "audit": "System Security Audit & Compliance Logs",
      "students": "Students Roster Management",
      "teachers": "Teacher & Faculty Management",
      "assessments": "Assessments & Career Readiness",
      "reports": "Career & AI Intelligence Reports",
      "events": "Events & Guidance Workshops",
      "analytics": "Student Analytics & Growth"
    };
    return titles[activeSubView] || `${activeSubView.toUpperCase()} Workspace`;
  };
  return /* @__PURE__ */ jsxs("div", {
    className: `min-h-screen flex w-full transition-colors duration-200 ${isDarkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"}`,
    children: [/* @__PURE__ */ jsx(Sidebar, {
      currentWorkspace,
      onWorkspaceChange: handleWorkspaceChange,
      activeView: activeSubView,
      onViewChange: handleViewChange,
      onRoleFilter: setActiveRoleFilter,
      totalEntities: entities.length,
      isDarkMode,
      isMobileOpen: isMobileSidebarOpen,
      onCloseMobile: () => setIsMobileSidebarOpen(false)
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex-1 flex flex-col min-w-0 w-full overflow-x-hidden",
      children: [/* @__PURE__ */ jsx(Topbar, {
        currentWorkspace,
        searchQuery,
        onSearchChange: setSearchQuery2,
        onShowToast: showToast,
        isDarkMode,
        onToggleTheme: handleToggleTheme,
        onNavigateNotifications: () => handleViewChange("notifications"),
        onToggleMobileSidebar: () => setIsMobileSidebarOpen((prev) => !prev)
      }), /* @__PURE__ */ jsxs("main", {
        className: "p-4 sm:p-6 lg:p-8 flex-1 animate-fade-in min-w-0 w-full",
        role: "main",
        children: [toastMessage && /* @__PURE__ */ jsxs("div", {
          role: "status",
          "aria-live": "polite",
          className: "fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl shadow-xl border border-blue-500/30 flex items-center gap-3 animate-bounce max-w-xs sm:max-w-md",
          children: [/* @__PURE__ */ jsx(FaCircleCheck, {
            className: "w-5 h-5 text-blue-400 shrink-0"
          }), /* @__PURE__ */ jsx("span", {
            className: "text-xs font-medium truncate",
            children: toastMessage
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8",
          children: [/* @__PURE__ */ jsx("div", {
            className: "min-w-0",
            children: /* @__PURE__ */ jsx("h1", {
              className: `text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight truncate ${isDarkMode ? "text-white" : "text-slate-900"}`,
              children: getSubViewTitle()
            })
          }), currentWorkspace === "super-admin" && (activeSubView === "access" || activeSubView === "overview") && /* @__PURE__ */ jsxs("button", {
            onClick: () => setIsGrantModalOpen(true),
            className: "bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 shrink-0 self-start sm:self-auto",
            children: [/* @__PURE__ */ jsx(FaPlus, {
              className: "w-3.5 h-3.5"
            }), /* @__PURE__ */ jsx("span", {
              children: "Provision Partner Access"
            })]
          })]
        }), currentWorkspace === "super-admin" ? /* @__PURE__ */ jsx(SuperAdminDashboard, {
          activeSubView,
          entities,
          auditLogs,
          activeRoleFilter,
          searchQuery,
          onFilterChange: setActiveRoleFilter,
          onSimulateWorkspace: handleSimulateWorkspace,
          onEditEntity: (ent) => setEditingEntity(ent),
          onToggleStatus: (id) => {
            const ent = entities.find((e) => e.id === id);
            if (ent) {
              const newStatus = ent.status === "active" ? "suspended" : "active";
              updateEntityMutation.mutate({
                id,
                updates: {
                  status: newStatus
                }
              });
            }
          },
          onDeleteEntity: (id) => {
            if (confirm("Are you sure you want to revoke access for this partner entity?")) {
              deleteEntityMutation.mutate(id);
            }
          },
          onWorkspaceChange: handleWorkspaceChange,
          onShowToast: showToast,
          isDarkMode
        }) : /* @__PURE__ */ jsx(RoleWorkspaceViews, {
          currentWorkspace,
          activeSubView,
          onShowToast: showToast,
          onNavigateView: handleViewChange,
          isDarkMode
        })]
      }, `${currentWorkspace}-${activeSubView}`)]
    }), /* @__PURE__ */ jsx(GrantAccessModal, {
      isOpen: isGrantModalOpen,
      onClose: () => setIsGrantModalOpen(false),
      onSubmit: (data) => addEntityMutation.mutate(data),
      isDarkMode
    }), /* @__PURE__ */ jsx(EditModal, {
      entity: editingEntity,
      isOpen: !!editingEntity,
      onClose: () => setEditingEntity(null),
      onSave: (id, updates) => updateEntityMutation.mutate({
        id,
        updates
      }),
      isDarkMode
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $role
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-mqEXup25.js", "imports": ["/assets/jsx-runtime-D_zvdyIk.js", "/assets/chunk-62JRHF6Z-VuIJK2qh.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/root-gQd4CeSZ.js", "imports": ["/assets/jsx-runtime-D_zvdyIk.js", "/assets/chunk-62JRHF6Z-VuIJK2qh.js", "/assets/store-BEeAaAuQ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/_index-0XcP_yKV.js", "imports": ["/assets/chunk-62JRHF6Z-VuIJK2qh.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/login-Cb9qA7sR.js", "imports": ["/assets/chunk-62JRHF6Z-VuIJK2qh.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/index-C2sQeFGN.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "role-root": { "id": "role-root", "parentId": "root", "path": ":role", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/_role-ChRwteSJ.js", "imports": ["/assets/chunk-62JRHF6Z-VuIJK2qh.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/store-BEeAaAuQ.js", "/assets/index-C2sQeFGN.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "role-splat": { "id": "role-splat", "parentId": "root", "path": ":role/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/_role-ChRwteSJ.js", "imports": ["/assets/chunk-62JRHF6Z-VuIJK2qh.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/store-BEeAaAuQ.js", "/assets/index-C2sQeFGN.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-46a49eee.js", "version": "46a49eee", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "v8_passThroughRequests": false, "v8_trailingSlashAwareDataRequests": false, "unstable_previewServerPrerendering": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "role-root": {
    id: "role-root",
    parentId: "root",
    path: ":role",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "role-splat": {
    id: "role-splat",
    parentId: "root",
    path: ":role/*",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
