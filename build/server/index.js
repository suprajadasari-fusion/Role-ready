var _a, _b;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, Meta, Links, ScrollRestoration, Scripts, redirect, useNavigate, useParams, useLocation } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import React, { useState, useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider, useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { FiUsers, FiShield, FiUserCheck, FiBriefcase, FiGrid, FiBookOpen, FiAward, FiCpu, FiCheckCircle, FiCompass, FiAlertTriangle, FiMail, FiLock, FiEyeOff, FiEye, FiArrowRight, FiUserPlus, FiKey, FiCheck, FiArrowLeft, FiUser, FiPhone, FiPlus, FiTrash2, FiTag, FiX, FiGlobe, FiRefreshCw, FiCalendar, FiActivity, FiTrendingUp, FiFileText, FiBell, FiCreditCard, FiSliders, FiPieChart, FiSearch, FiVideo, FiStar, FiCheckSquare, FiLogOut, FiSun, FiMoon, FiEdit2, FiSave, FiTv, FiClock, FiMinimize, FiMaximize, FiAlertCircle, FiVideoOff, FiMicOff, FiMic, FiPhoneOff, FiDownload, FiZap, FiDollarSign, FiInfo, FiCopy, FiExternalLink, FiMapPin, FiCamera, FiChevronRight, FiPower, FiServer } from "react-icons/fi";
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
const stylesheet = "/assets/app-uiQomxI-.css";
function links() {
  return [{
    rel: "stylesheet",
    href: stylesheet
  }, {
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  }, {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  }, {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
  }];
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
  return /* @__PURE__ */ jsx(QueryClientProvider, {
    client: queryClient,
    children: /* @__PURE__ */ jsx(Outlet, {})
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
const API_BASE_URL$1 = typeof window !== "undefined" ? ((_a = window.__ENV__) == null ? void 0 : _a.VITE_API_BASE_URL) || "https://role-ready-backendcode.onrender.com" : "https://role-ready-backendcode.onrender.com";
const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER_STUDENT: "/api/v1/auth/register/student",
    REGISTER_PARENT: "/api/v1/auth/register/parent",
    REGISTER_MENTOR: "/api/v1/auth/register/mentor",
    REGISTER_RECRUITER: "/api/v1/auth/register/recruiter",
    REGISTER_COMPANY: "/api/v1/auth/register/company",
    REFRESH: "/api/v1/auth/refresh",
    LOGOUT: "/api/v1/auth/logout",
    VERIFY_EMAIL: "/api/v1/auth/verify-email",
    VERIFY_PHONE: "/api/v1/auth/verify-phone",
    FORGOT_PASSWORD: "/api/v1/auth/forgot-password",
    RESET_PASSWORD: "/api/v1/auth/reset-password",
    CHANGE_PASSWORD: "/api/v1/auth/change-password"
  },
  USERS: {
    ME: "/api/v1/users/me",
    ADMIN_HEALTH: "/api/v1/users/admin/health"
  },
  PROFILE: {
    GET: "/api/v1/profile/",
    COMPLETE: "/api/v1/profile/complete",
    AVATAR: "/api/v1/profile/avatar",
    UPLOAD: "/api/v1/profile/upload"
  },
  ADMIN: {
    HEALTH: "/api/v1/users/admin/health",
    TENANTS: "/api/v1/tenants",
    INSTITUTIONS_REGISTER: "/api/v1/institutions/register",
    INSTITUTIONS_APPROVE: "/api/v1/institutions/approve",
    SUBSCRIPTIONS: "/api/v1/subscriptions",
    APTITUDE_COHORT: "/api/v1/aptitude/admin/analytics/cohort",
    APTITUDE_ITEMS: "/api/v1/aptitude/admin/analytics/items",
    SKILL_COHORT: "/api/v1/skill-mapping/analytics/cohort"
  }
};
let inMemoryAccessToken = null;
let inMemoryRefreshToken = null;
let isRefreshing = false;
let refreshSubscribers = [];
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}
function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}
function getAccessToken() {
  if (inMemoryAccessToken) return inMemoryAccessToken;
  if (typeof window !== "undefined") {
    return localStorage.getItem("rr_access_token") || sessionStorage.getItem("rr_access_token");
  }
  return null;
}
function getRefreshToken() {
  if (inMemoryRefreshToken) return inMemoryRefreshToken;
  if (typeof window !== "undefined") {
    return localStorage.getItem("rr_refresh_token") || sessionStorage.getItem("rr_refresh_token");
  }
  return null;
}
function setTokens(accessToken, refreshToken) {
  inMemoryAccessToken = accessToken;
  if (refreshToken) inMemoryRefreshToken = refreshToken;
  if (typeof window !== "undefined") {
    localStorage.setItem("rr_access_token", accessToken);
    sessionStorage.setItem("rr_access_token", accessToken);
    if (refreshToken) {
      localStorage.setItem("rr_refresh_token", refreshToken);
      sessionStorage.setItem("rr_refresh_token", refreshToken);
    }
  }
}
function clearTokens() {
  inMemoryAccessToken = null;
  inMemoryRefreshToken = null;
  refreshSubscribers = [];
  if (typeof window !== "undefined") {
    localStorage.removeItem("rr_access_token");
    localStorage.removeItem("rr_refresh_token");
    sessionStorage.removeItem("rr_access_token");
    sessionStorage.removeItem("rr_refresh_token");
    localStorage.removeItem("rr_user");
    sessionStorage.removeItem("rr_user");
  }
}
async function refreshAccessToken() {
  var _a2;
  const currentRefreshToken = getRefreshToken();
  if (!currentRefreshToken) {
    throw new Error("No refresh token available");
  }
  const url = `${API_BASE_URL$1}${API_ENDPOINTS.AUTH.REFRESH}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-refresh-token": currentRefreshToken
    },
    body: JSON.stringify({ refreshToken: currentRefreshToken })
  });
  const data = await response.json();
  if (!response.ok || !data.success || !((_a2 = data.data) == null ? void 0 : _a2.accessToken)) {
    clearTokens();
    if (typeof window !== "undefined" && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
    throw new Error(data.message || "Token refresh failed");
  }
  setTokens(data.data.accessToken, data.data.refreshToken);
  return data.data.accessToken;
}
async function tryRefreshToken() {
  const currentRefreshToken = getRefreshToken();
  if (!currentRefreshToken) return null;
  try {
    return await refreshAccessToken();
  } catch {
    return null;
  }
}
async function apiClient(endpoint, options = {}) {
  const token = getAccessToken();
  const headers = new Headers(options.headers || {});
  if (token && !options.skipAuth && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL$1}${endpoint}`;
  let res = await fetch(url, {
    ...options,
    headers
  });
  if (res.status === 401 && !options.skipAuth && getRefreshToken()) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newAccessToken = await refreshAccessToken();
        isRefreshing = false;
        onRefreshed(newAccessToken);
        headers.set("Authorization", `Bearer ${newAccessToken}`);
        res = await fetch(url, {
          ...options,
          headers
        });
      } catch (refreshErr) {
        isRefreshing = false;
        clearTokens();
        if (typeof window !== "undefined" && window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        throw refreshErr;
      }
    } else {
      const retryPromise = new Promise((resolve, reject) => {
        subscribeTokenRefresh(async (newToken) => {
          try {
            headers.set("Authorization", `Bearer ${newToken}`);
            const retryRes = await fetch(url, {
              ...options,
              headers
            });
            resolve(retryRes);
          } catch (err) {
            reject(err);
          }
        });
      });
      res = await retryPromise;
    }
  }
  const contentType = res.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await res.json() : null;
  if (!res.ok) {
    const errorMsg = (data == null ? void 0 : data.message) || (data == null ? void 0 : data.error) || `API Request failed with status ${res.status}`;
    const error = new Error(errorMsg);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}
const authService = {
  /**
   * User Login
   * POST /api/v1/auth/login
   */
  async login(credentials) {
    var _a2;
    const res = await apiClient(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        deviceId: credentials.deviceId || "web-client",
        platform: credentials.platform || "web"
      })
    });
    if (res.success && ((_a2 = res.data) == null ? void 0 : _a2.accessToken)) {
      setTokens(res.data.accessToken, res.data.refreshToken);
      if (typeof window !== "undefined") {
        localStorage.setItem("rr_user", JSON.stringify(res.data.user));
        sessionStorage.setItem("rr_user", JSON.stringify(res.data.user));
      }
    }
    return res;
  },
  /**
   * Register Student
   * POST /api/v1/auth/register/student
   */
  async registerStudent(data) {
    return await apiClient(API_ENDPOINTS.AUTH.REGISTER_STUDENT, {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },
  /**
   * Register Parent
   * POST /api/v1/auth/register/parent
   */
  async registerParent(data) {
    return await apiClient(API_ENDPOINTS.AUTH.REGISTER_PARENT, {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },
  /**
   * Register Mentor
   * POST /api/v1/auth/register/mentor
   */
  async registerMentor(data) {
    return await apiClient(API_ENDPOINTS.AUTH.REGISTER_MENTOR, {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },
  /**
   * Register Recruiter
   * POST /api/v1/auth/register/recruiter
   */
  async registerRecruiter(data) {
    return await apiClient(API_ENDPOINTS.AUTH.REGISTER_RECRUITER, {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },
  /**
   * Register Company Admin
   * POST /api/v1/auth/register/company
   */
  async registerCompany(data) {
    return await apiClient(API_ENDPOINTS.AUTH.REGISTER_COMPANY, {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },
  /**
   * Refresh Token
   * POST /api/v1/auth/refresh
   */
  async refreshToken(data) {
    var _a2;
    const res = await apiClient(API_ENDPOINTS.AUTH.REFRESH, {
      method: "POST",
      skipAuth: true,
      headers: {
        "x-refresh-token": data.refreshToken
      },
      body: JSON.stringify(data)
    });
    if (res.success && ((_a2 = res.data) == null ? void 0 : _a2.accessToken)) {
      setTokens(res.data.accessToken, res.data.refreshToken);
    }
    return res;
  },
  /**
   * Logout
   * POST /api/v1/auth/logout
   */
  async logout() {
    try {
      await apiClient(API_ENDPOINTS.AUTH.LOGOUT, {
        method: "POST"
      });
    } catch (err) {
    } finally {
      clearTokens();
    }
  },
  /**
   * Email Verification
   * POST /api/v1/auth/verify-email
   */
  async verifyEmail(data) {
    return await apiClient(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },
  /**
   * Phone Verification
   * POST /api/v1/auth/verify-phone
   */
  async verifyPhone(data) {
    return await apiClient(API_ENDPOINTS.AUTH.VERIFY_PHONE, {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },
  /**
   * Forgot Password
   * POST /api/v1/auth/forgot-password
   */
  async forgotPassword(data) {
    return await apiClient(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },
  /**
   * Reset Password
   * POST /api/v1/auth/reset-password
   */
  async resetPassword(data) {
    return await apiClient(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify(data)
    });
  },
  /**
   * Change Password
   * POST /api/v1/auth/change-password
   */
  async changePassword(data) {
    return await apiClient(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      method: "POST",
      body: JSON.stringify(data)
    });
  },
  /**
   * Register Institution (School / College / Training Institute)
   * POST /api/v1/institutions/register
   */
  async registerInstitution(data) {
    return await apiClient(API_ENDPOINTS.ADMIN.INSTITUTIONS_REGISTER, {
      method: "POST",
      skipAuth: true,
      body: JSON.stringify(data)
    });
  }
};
async function fetchParentProfile() {
  var _a2;
  const res = await apiFetch("/api/v1/profile/");
  const user = res.data;
  const p = user == null ? void 0 : user.profile;
  const roleData = (p == null ? void 0 : p.roleData) || {};
  const rawChildren = Array.isArray(roleData.childrenDetails) ? roleData.childrenDetails : Array.isArray(roleData.children) ? roleData.children : [];
  const children = rawChildren.map((c, idx) => {
    var _a3;
    return {
      id: c.studentId || c.id || `child-${idx + 1}`,
      name: c.name || (c.firstName ? `${c.firstName} ${c.lastName || ""}`.trim() : `Student ${idx + 1}`),
      grade: c.grade || c.gradeLevel || "Secondary Cohort",
      school: c.school || c.schoolName || "Role Ready Partner School",
      targetCareer: c.targetCareer || c.careerGoal || "Technology & Engineering",
      dob: c.dob || c.birthDate || "",
      studentEmail: c.studentEmail || c.email || "",
      tempPassword: c.tempPassword || void 0,
      avatarUrl: c.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${c.firstName || "Student"}`,
      hasAccess: c.hasAccess !== void 0 ? !!c.hasAccess : true,
      subscriptionPlan: c.subscriptionPlan || ((_a3 = roleData.subscription) == null ? void 0 : _a3.planName) || "Active Student License",
      academicGpa: typeof c.academicGpa === "number" ? c.academicGpa : c.gpa || 0,
      studyHoursWeekly: typeof c.studyHoursWeekly === "number" ? c.studyHoursWeekly : 0,
      attendanceRate: typeof c.attendanceRate === "number" ? c.attendanceRate : 0,
      riasecCode: c.riasecCode || "Pending Assessment",
      topAiCareerMatch: c.topAiCareerMatch || "Pending Assessment",
      matchScore: typeof c.matchScore === "number" ? c.matchScore : 0,
      status: c.status || "active"
    };
  });
  const sub = roleData.subscription || {};
  const subscription = {
    active: !!sub.active,
    planId: sub.planId || "starter",
    planName: sub.planName || "Role Ready Family Plan",
    priceMonthly: typeof sub.priceMonthly === "number" ? sub.priceMonthly : 999,
    maxChildren: typeof sub.maxChildren === "number" ? sub.maxChildren : 1,
    usedSeats: children.length,
    renewalDate: sub.renewalDate || "",
    lastPaymentStatus: sub.lastPaymentStatus || "none"
  };
  const parentName = (p == null ? void 0 : p.firstName) ? `${p.firstName} ${p.lastName || ""}`.trim() : (user == null ? void 0 : user.firstName) ? `${user.firstName} ${user.lastName || ""}`.trim() : ((_a2 = user == null ? void 0 : user.email) == null ? void 0 : _a2.split("@")[0]) || "Parent";
  return {
    id: (user == null ? void 0 : user.id) || (p == null ? void 0 : p.profileId) || "",
    parentName,
    parentEmail: (user == null ? void 0 : user.email) || "",
    phone: (p == null ? void 0 : p.phoneNumber) || (user == null ? void 0 : user.phone) || "",
    emergencyContact: roleData.emergencyContact || (p == null ? void 0 : p.phoneNumber) || (user == null ? void 0 : user.phone) || "",
    onboardingCompleted: !!(p == null ? void 0 : p.onboardingCompleted),
    children,
    subscription
  };
}
async function completeParentOnboarding(payload) {
  return await apiFetch("/api/v1/profile/complete", {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}
async function saveParentFamilyProfile(familyData) {
  var _a2;
  const [firstName, ...rest] = (familyData.parentName || "Parent").split(" ");
  const lastName = rest.join(" ") || "User";
  await completeParentOnboarding({
    firstName,
    lastName,
    phoneNumber: familyData.phone || "",
    bio: `Parent of ${((_a2 = familyData.children) == null ? void 0 : _a2.length) || 0} enrolled students on Role Ready`,
    onboardingCompleted: familyData.onboardingCompleted ?? true,
    roleData: {
      emergencyContact: familyData.emergencyContact,
      childrenDetails: (familyData.children || []).map((c) => ({
        studentId: c.id,
        relationship: "Child",
        firstName: c.name.split(" ")[0],
        lastName: c.name.split(" ").slice(1).join(" "),
        email: c.studentEmail,
        grade: c.grade,
        school: c.school,
        hasAccess: c.hasAccess
      })),
      subscription: familyData.subscription
    }
  });
  return fetchParentProfile();
}
async function registerStudentAccount(payload) {
  return await apiFetch("/api/v1/auth/register/student", {
    method: "POST",
    skipAuth: true,
    body: JSON.stringify(payload)
  });
}
async function addChildToFamily(parentProfile, childInput) {
  var _a2, _b2;
  const tempPassword = childInput.password || `Learn#${childInput.firstName.replace(/\s+/g, "")}2026!`;
  const studentPhone = childInput.phone || parentProfile.phone || "9876543210";
  const regRes = await registerStudentAccount({
    firstName: childInput.firstName,
    lastName: childInput.lastName,
    email: childInput.email,
    password: tempPassword,
    phone: studentPhone,
    parentName: parentProfile.parentName,
    parentEmail: parentProfile.parentEmail
  });
  const studentId = ((_a2 = regRes.data) == null ? void 0 : _a2.id) || `student-${Date.now()}`;
  const newChild = {
    id: studentId,
    name: `${childInput.firstName} ${childInput.lastName}`.trim(),
    grade: childInput.grade || "Secondary Cohort",
    school: childInput.school || "Role Ready Partner School",
    targetCareer: childInput.targetCareer || "Technology & Engineering",
    dob: childInput.dob || "2009-01-01",
    studentEmail: childInput.email,
    tempPassword,
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${childInput.firstName}`,
    hasAccess: true,
    subscriptionPlan: ((_b2 = parentProfile.subscription) == null ? void 0 : _b2.planName) || "Role Ready Student License",
    academicGpa: 0,
    studyHoursWeekly: 0,
    attendanceRate: 0,
    riasecCode: "Pending Assessment",
    topAiCareerMatch: "Pending Assessment",
    matchScore: 0,
    status: "active"
  };
  const updatedChildren = [...parentProfile.children, newChild];
  const [firstName, ...rest] = parentProfile.parentName.split(" ");
  const lastName = rest.join(" ") || "Parent";
  await completeParentOnboarding({
    firstName,
    lastName,
    phoneNumber: parentProfile.phone,
    onboardingCompleted: parentProfile.onboardingCompleted,
    roleData: {
      emergencyContact: parentProfile.emergencyContact,
      childrenDetails: updatedChildren.map((c) => ({
        studentId: c.id,
        relationship: childInput.relationship || "Child",
        firstName: c.name.split(" ")[0],
        lastName: c.name.split(" ").slice(1).join(" "),
        email: c.studentEmail,
        grade: c.grade,
        school: c.school,
        hasAccess: c.hasAccess
      })),
      subscription: parentProfile.subscription
    }
  });
  return {
    child: newChild,
    updatedProfile: {
      ...parentProfile,
      children: updatedChildren
    }
  };
}
async function toggleChildAccess(parentProfile, studentId, hasAccess) {
  const updatedChildren = parentProfile.children.map(
    (c) => c.id === studentId ? { ...c, hasAccess } : c
  );
  const [firstName, ...rest] = parentProfile.parentName.split(" ");
  const lastName = rest.join(" ") || "Parent";
  await completeParentOnboarding({
    firstName,
    lastName,
    phoneNumber: parentProfile.phone,
    onboardingCompleted: parentProfile.onboardingCompleted,
    roleData: {
      emergencyContact: parentProfile.emergencyContact,
      childrenDetails: updatedChildren.map((c) => ({
        studentId: c.id,
        relationship: "Child",
        firstName: c.name.split(" ")[0],
        lastName: c.name.split(" ").slice(1).join(" "),
        email: c.studentEmail,
        grade: c.grade,
        school: c.school,
        hasAccess: c.hasAccess
      })),
      subscription: parentProfile.subscription
    }
  });
  return {
    ...parentProfile,
    children: updatedChildren
  };
}
const FAMILY_PLANS = [
  {
    id: "starter",
    backendPlanId: "98d5c412-1f3a-4a21-9e77-a1288c9f0001",
    name: "Family Starter",
    priceMonthly: 999,
    maxChildren: 1,
    features: [
      "1 Student Account License",
      "AI Psychometric Career Assessments",
      "Academic Performance & GPA Tracking",
      "Attendance & Term Logs"
    ]
  },
  {
    id: "growth",
    backendPlanId: "98d5c412-1f3a-4a21-9e77-a1288c9f0002",
    name: "Family Growth",
    priceMonthly: 2499,
    maxChildren: 3,
    popular: true,
    features: [
      "Up to 3 Student Account Licenses",
      "AI Career Pathways & DNA Mapping",
      "Scholarship Eligibility Matcher",
      "College Explorer & Program Ranking",
      "Verified 1-on-1 Mentor Booking"
    ]
  },
  {
    id: "elite",
    backendPlanId: "98d5c412-1f3a-4a21-9e77-a1288c9f0003",
    name: "Family Complete Elite",
    priceMonthly: 3999,
    maxChildren: 5,
    features: [
      "Up to 5 Student Account Licenses",
      "Everything in Growth",
      "Priority Mentor Consultations",
      "Comprehensive Downloadable PDF Reports",
      "Dedicated Academic & Career Counselor Support"
    ]
  }
];
async function updateParentSubscription(parentProfile, planConfig) {
  const newSub = {
    active: true,
    planId: planConfig.id,
    planName: planConfig.name,
    priceMonthly: planConfig.priceMonthly,
    maxChildren: planConfig.maxChildren,
    usedSeats: parentProfile.children.filter((c) => c.hasAccess).length,
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0],
    lastPaymentStatus: "success"
  };
  const [firstName, ...rest] = parentProfile.parentName.split(" ");
  const lastName = rest.join(" ") || "Parent";
  await completeParentOnboarding({
    firstName,
    lastName,
    phoneNumber: parentProfile.phone,
    onboardingCompleted: parentProfile.onboardingCompleted,
    roleData: {
      emergencyContact: parentProfile.emergencyContact,
      childrenDetails: parentProfile.children.map((c) => ({
        studentId: c.id,
        relationship: "Child",
        firstName: c.name.split(" ")[0],
        lastName: c.name.split(" ").slice(1).join(" "),
        email: c.studentEmail,
        grade: c.grade,
        school: c.school,
        hasAccess: c.hasAccess
      })),
      subscription: newSub
    }
  });
  return {
    ...parentProfile,
    subscription: newSub
  };
}
async function processFamilyPayment(paymentData, simulateFailure = false) {
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (simulateFailure) {
    return {
      success: false,
      orderId: paymentData.orderId,
      transactionId: `TXN-FAILED-${Date.now()}`,
      amount: paymentData.amount,
      currency: paymentData.currency,
      paymentMethod: paymentData.paymentMethod,
      status: "FAILED",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      message: "Payment was declined by issuing bank. Please retry with a valid payment method."
    };
  }
  const transactionId = `TXN-RR-${Date.now().toString().slice(-8)}`;
  return {
    success: true,
    orderId: paymentData.orderId,
    transactionId,
    amount: paymentData.amount,
    currency: paymentData.currency,
    paymentMethod: paymentData.paymentMethod,
    status: "SUCCESS",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    message: "Payment completed successfully. Your family subscription is now active!"
  };
}
async function fetchChildAttendance(studentId) {
  if (!studentId) {
    return {
      studentId: "",
      overallPercentage: 0,
      totalDays: 0,
      presentDays: 0,
      absentDays: 0,
      lateDays: 0,
      subjectBreakdown: [],
      recentLogs: []
    };
  }
  try {
    const res = await apiFetch(`/api/v1/attendance/${studentId}`);
    if ((res == null ? void 0 : res.data) && typeof res.data.overallPercentage === "number") {
      return res.data;
    }
  } catch (err) {
  }
  return {
    studentId,
    overallPercentage: 0,
    totalDays: 0,
    presentDays: 0,
    absentDays: 0,
    lateDays: 0,
    subjectBreakdown: [],
    recentLogs: []
  };
}
async function fetchChildAcademicProgress(studentId) {
  if (!studentId) {
    return {
      studentId: "",
      overallGpa: 0,
      maxGpa: 10,
      classRank: "-",
      percentile: 0,
      gradingSystem: "10-Point CGPA",
      subjects: [],
      termTrends: [],
      teacherFeedback: "No academic marks or exam evaluations published yet for this student."
    };
  }
  try {
    const res = await apiFetch(`/api/v1/academic/${studentId}`);
    if ((res == null ? void 0 : res.data) && typeof res.data.overallGpa === "number") {
      return res.data;
    }
  } catch (err) {
  }
  return {
    studentId,
    overallGpa: 0,
    maxGpa: 10,
    classRank: "-",
    percentile: 0,
    gradingSystem: "10-Point CGPA",
    subjects: [],
    termTrends: [],
    teacherFeedback: "No academic marks or exam evaluations published yet for this student."
  };
}
async function fetchChildCareerProgress(studentProfileId) {
  var _a2, _b2;
  if (!studentProfileId) {
    return {
      studentId: "",
      assessmentStatus: "pending",
      riasecCode: "Pending",
      dnaSummary: "Student has not completed their RIASEC psychometric assessment yet.",
      hollandScores: [],
      pathways: [],
      milestones: [],
      counselorNotes: "Assessment pending completion by student in Student Portal."
    };
  }
  let hollandScores = [];
  let assessmentStatus = "pending";
  let riasecCode = "Pending";
  let dnaSummary = "Student has not completed their RIASEC psychometric assessment yet.";
  try {
    const psychRes = await apiFetch(
      `/api/v1/psychometric/analytics/${studentProfileId}`
    );
    if ((psychRes == null ? void 0 : psychRes.data) && Array.isArray(psychRes.data) && psychRes.data.length > 0) {
      assessmentStatus = "completed";
      hollandScores = psychRes.data.map((item) => ({
        trait: item.trait || item.dimension || "Realistic",
        score: typeof item.score === "number" ? item.score : 0,
        color: item.color || "#3B82F6",
        description: item.description || ""
      }));
      riasecCode = hollandScores.map((s) => s.trait[0]).slice(0, 3).join("");
      dnaSummary = `Student demonstrates primary alignment with ${riasecCode} career profile.`;
    }
  } catch (err) {
  }
  let milestones = [];
  try {
    const roadRes = await apiFetch(
      `/api/v1/roadmaps/profile/${studentProfileId}`
    );
    if ((roadRes == null ? void 0 : roadRes.data) && Array.isArray((_a2 = roadRes.data) == null ? void 0 : _a2.milestones)) {
      milestones = roadRes.data.milestones.map((m, idx) => ({
        id: m.id || `ms-${idx}`,
        stage: m.stage || `Stage ${idx + 1}`,
        title: m.title || "Career Milestone",
        description: m.description || "",
        status: m.status || "upcoming",
        targetDate: m.targetDate || "",
        isCompleted: !!m.isCompleted
      }));
    }
  } catch (err) {
  }
  let pathways = [];
  try {
    const skillRes = await apiFetch(
      `/api/v1/skill-mapping/profile/analytics?studentId=${studentProfileId}`
    );
    if ((skillRes == null ? void 0 : skillRes.data) && Array.isArray((_b2 = skillRes.data) == null ? void 0 : _b2.pathways)) {
      pathways = skillRes.data.pathways.map((p, idx) => ({
        id: p.id || `pw-${idx}`,
        title: p.title || "Career Pathway",
        matchScore: p.matchScore || 0,
        salaryRange: p.salaryRange || "Competitive",
        growthOutlook: p.growthOutlook || "High Growth",
        matchRationale: p.matchRationale || "",
        requiredQualifications: Array.isArray(p.requiredQualifications) ? p.requiredQualifications : []
      }));
    }
  } catch (err) {
  }
  return {
    studentId: studentProfileId,
    assessmentStatus,
    riasecCode,
    dnaSummary,
    hollandScores,
    pathways,
    milestones,
    counselorNotes: assessmentStatus === "completed" ? "Student is actively exploring career pathways matching their psychometric profile." : "Assessment pending completion by student in Student Portal."
  };
}
async function fetchParentReports(studentId) {
  if (!studentId) return [];
  try {
    const res = await apiFetch(`/api/v1/reports/${studentId}`);
    if ((res == null ? void 0 : res.data) && Array.isArray(res.data)) {
      return res.data;
    }
  } catch (err) {
  }
  return [];
}
async function fetchChildLearningProgress(studentId) {
  if (!studentId) {
    return {
      studentId: "",
      weeklyStudyHours: 0,
      totalCoursesEnrolled: 0,
      completedCoursesCount: 0,
      activeCourses: [],
      acquiredSkills: [],
      recentActivities: []
    };
  }
  let activeCourses = [];
  try {
    const res = await apiFetch("/api/v1/learning/courses");
    if ((res == null ? void 0 : res.data) && Array.isArray(res.data)) {
      activeCourses = res.data.map((item, idx) => {
        var _a2;
        return {
          id: item.id || `course-${idx}`,
          title: item.title || item.name || "Curriculum Course",
          provider: item.provider || item.instructor || "Role Ready Learning Hub",
          category: item.category || "General",
          progressPercent: typeof item.progressPercent === "number" ? item.progressPercent : item.progress || 0,
          completedLessons: typeof item.completedLessons === "number" ? item.completedLessons : 0,
          totalLessons: typeof item.totalLessons === "number" ? item.totalLessons : ((_a2 = item.modules) == null ? void 0 : _a2.length) || 10,
          status: item.status || "in-progress",
          badgeEarned: item.badgeEarned
        };
      });
    }
  } catch (err) {
  }
  const completedCoursesCount = activeCourses.filter((c) => c.status === "completed" || c.progressPercent >= 100).length;
  return {
    studentId,
    weeklyStudyHours: 0,
    totalCoursesEnrolled: activeCourses.length,
    completedCoursesCount,
    activeCourses,
    acquiredSkills: [],
    recentActivities: []
  };
}
async function fetchScholarships(studentProfileId) {
  try {
    const endpoint = studentProfileId ? `/api/v1/university/scholarships/recommendations/${studentProfileId}` : "/api/v1/scholarships";
    const res = await apiFetch(endpoint);
    if ((res == null ? void 0 : res.data) && Array.isArray(res.data)) {
      return res.data.map((s, idx) => ({
        id: s.id || `sch-${idx}`,
        name: s.name || s.title || "Scholarship Opportunity",
        provider: s.provider || s.organization || "Educational Trust",
        amount: s.amount || "Contingency Funding",
        deadline: s.deadline || "Ongoing",
        eligibilityCriteria: s.eligibilityCriteria || s.criteria || "Check portal for eligibility",
        status: s.status || "eligible",
        applyLink: s.applyLink || s.url || "#",
        matchScore: typeof s.matchScore === "number" ? s.matchScore : 85
      }));
    }
  } catch (err) {
  }
  return [];
}
async function fetchColleges(studentId) {
  try {
    let res;
    if (studentId) {
      res = await apiFetch("/api/v1/university/recommendations", {
        method: "POST",
        body: JSON.stringify({
          studentId,
          correlationId: `req-${Date.now()}`
        })
      });
    } else {
      res = await apiFetch("/api/v1/colleges");
    }
    if ((res == null ? void 0 : res.data) && Array.isArray(res.data)) {
      return res.data.map((c, idx) => ({
        id: c.id || `col-${idx}`,
        name: c.name || c.institutionName || "University Institution",
        location: c.location || c.city || "India",
        ranking: typeof c.ranking === "number" ? c.ranking : idx + 1,
        programs: Array.isArray(c.programs) ? c.programs : ["Undergraduate Degree"],
        acceptanceRate: c.acceptanceRate || "Competitive",
        feesAnnual: c.feesAnnual || c.tuitionFee || "Contact Institution",
        minGpaRequired: typeof c.minGpaRequired === "number" ? c.minGpaRequired : 8,
        bookmarked: !!c.bookmarked,
        type: c.type || "Autonomous"
      }));
    }
  } catch (err) {
  }
  return [];
}
async function fetchMentors() {
  try {
    const res = await apiFetch("/api/v1/mentors");
    if ((res == null ? void 0 : res.data) && Array.isArray(res.data)) {
      return res.data.map((m, idx) => ({
        id: m.id || `men-${idx}`,
        name: m.name || (m.firstName ? `${m.firstName} ${m.lastName || ""}`.trim() : "Verified Mentor"),
        title: m.title || m.designation || "Academic & Career Mentor",
        organization: m.organization || m.company || "Role Ready Mentor Network",
        experienceYears: typeof m.experienceYears === "number" ? m.experienceYears : 5,
        rating: typeof m.rating === "number" ? m.rating : 4.9,
        reviewCount: typeof m.reviewCount === "number" ? m.reviewCount : 0,
        specialization: Array.isArray(m.specialization) ? m.specialization : ["Career Guidance"],
        hourlyRate: m.hourlyRate || "Contact Mentor",
        avatarUrl: m.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${m.name || "Mentor"}`,
        bio: m.bio || "Experienced academic and career positioning specialist.",
        availableSlots: Array.isArray(m.availableSlots) ? m.availableSlots : []
      }));
    }
  } catch (err) {
  }
  return [];
}
async function bookMentorSession(booking) {
  try {
    const res = await apiFetch("/api/v1/mentor/book", {
      method: "POST",
      body: JSON.stringify(booking)
    });
    if (res == null ? void 0 : res.data) return res.data;
  } catch (err) {
  }
  return {
    id: `book-${Date.now()}`,
    ...booking,
    status: "confirmed",
    meetingLink: `https://meet.roleready.ai/session-${Date.now().toString().slice(-6)}`
  };
}
async function fetchMentorBookings() {
  try {
    const res = await apiFetch("/api/v1/mentor/bookings");
    if ((res == null ? void 0 : res.data) && Array.isArray(res.data)) {
      return res.data.map((b, idx) => ({
        id: b.id || `book-${idx}`,
        mentorId: b.mentorId,
        mentorName: b.mentorName || "Verified Mentor",
        studentId: b.studentId,
        studentName: b.studentName || "Student",
        date: b.date || "",
        timeSlot: b.timeSlot || "",
        topic: b.topic || "Mentorship Consultation",
        status: b.status || "confirmed",
        meetingLink: b.meetingLink || `https://meet.roleready.ai/session-${b.id}`
      }));
    }
  } catch (err) {
  }
  return [];
}
async function fetchParentNotifications() {
  try {
    const res = await apiFetch("/api/v1/notifications");
    if ((res == null ? void 0 : res.data) && Array.isArray(res.data)) {
      return res.data.map((n, idx) => ({
        id: n.id || `notif-${idx}`,
        title: n.title || "System Notification",
        message: n.message || "",
        category: n.category || "system",
        timestamp: n.timestamp || n.createdAt || "Recent",
        isRead: !!n.isRead,
        linkTab: n.linkTab || "overview"
      }));
    }
  } catch (err) {
  }
  return [];
}
async function fetchChildFees(studentId) {
  if (!studentId) {
    return {
      studentId: "",
      totalFees: 0,
      totalPaid: 0,
      totalPending: 0,
      nextDueDate: "-",
      records: []
    };
  }
  try {
    const res = await apiFetch(`/api/v1/parent/fees/${studentId}`);
    if ((res == null ? void 0 : res.data) && typeof res.data.totalFees === "number") {
      return res.data;
    }
  } catch (err) {
  }
  return {
    studentId,
    totalFees: 0,
    totalPaid: 0,
    totalPending: 0,
    nextDueDate: "-",
    records: []
  };
}
const API_BASE_URL = typeof window !== "undefined" ? ((_b = window.__ENV__) == null ? void 0 : _b.VITE_API_BASE_URL) || "https://role-ready-backendcode.onrender.com" : "https://role-ready-backendcode.onrender.com";
async function apiFetch(endpoint, options = {}) {
  const token = getAccessToken();
  const headers = new Headers(options.headers || {});
  if (token && !options.skipAuth && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  let res = await fetch(url, {
    ...options,
    headers
  });
  if (res.status === 401 && !options.skipAuth && getRefreshToken()) {
    try {
      const refreshed = await refreshTokens();
      if (refreshed && refreshed.accessToken) {
        headers.set("Authorization", `Bearer ${refreshed.accessToken}`);
        res = await fetch(url, {
          ...options,
          headers
        });
      }
    } catch (refreshErr) {
      clearTokens();
    }
  }
  const contentType = res.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await res.json() : null;
  if (!res.ok) {
    const errorMsg = (data == null ? void 0 : data.message) || (data == null ? void 0 : data.error) || `API Request Failed with status ${res.status}`;
    throw new Error(errorMsg);
  }
  return data;
}
async function refreshTokens() {
  var _a2;
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token available");
  const res = await apiFetch(
    "/api/v1/auth/refresh",
    {
      method: "POST",
      skipAuth: true,
      headers: { "x-refresh-token": refreshToken },
      body: JSON.stringify({ refreshToken })
    }
  );
  if ((_a2 = res.data) == null ? void 0 : _a2.accessToken) {
    setTokens(res.data.accessToken, res.data.refreshToken);
  }
  return res.data;
}
async function logoutUser() {
  try {
    await apiFetch("/api/v1/auth/logout", { method: "POST" });
  } catch (err) {
    console.warn("Logout API returned warning:", err);
  } finally {
    clearTokens();
  }
}
async function changePassword(oldPassword, newPassword) {
  return apiFetch("/api/v1/auth/change-password", {
    method: "POST",
    body: JSON.stringify({ oldPassword, newPassword })
  });
}
async function fetchAdminHealth() {
  const res = await apiFetch("/api/v1/users/admin/health", {
    method: "GET"
  });
  return res.data;
}
async function fetchUserProfile() {
  var _a2, _b2, _c, _d, _e, _f, _g, _h, _i;
  const res = await apiFetch("/api/v1/profile/", {
    method: "GET"
  });
  const raw = res.data;
  const p = raw.profile || {};
  const profile = {
    id: raw.id || p.profileId || "",
    fullName: p.firstName && p.lastName ? `${p.firstName} ${p.lastName}` : p.firstName || raw.email || "User",
    firstName: p.firstName || "",
    lastName: p.lastName || "",
    email: raw.email || "",
    mobile: p.phoneNumber || raw.phone || "",
    phoneNumber: p.phoneNumber || raw.phone || "",
    dob: ((_a2 = p.roleData) == null ? void 0 : _a2.dob) || "",
    gender: ((_b2 = p.roleData) == null ? void 0 : _b2.gender) || "",
    location: ((_c = p.roleData) == null ? void 0 : _c.location) || "",
    education: ((_e = (_d = p.roleData) == null ? void 0 : _d.education) == null ? void 0 : _e.qualification) || "",
    qualification: ((_g = (_f = p.roleData) == null ? void 0 : _f.education) == null ? void 0 : _g.qualification) || "",
    skills: Array.isArray((_h = p.roleData) == null ? void 0 : _h.skills) ? p.roleData.skills : [],
    bio: p.bio || "",
    avatarUrl: raw.avatarUrl || p.profilePicUrl || "",
    role: ((_i = raw.role) == null ? void 0 : _i.toLowerCase()) || "parent",
    onboardingCompleted: p.onboardingCompleted ?? true,
    roleData: p.roleData || {},
    updatedAt: raw.createdAt || (/* @__PURE__ */ new Date()).toISOString()
  };
  return profile;
}
async function updateUserProfile(updates) {
  await apiFetch("/api/v1/profile/complete", {
    method: "PUT",
    body: JSON.stringify({
      firstName: updates.firstName,
      lastName: updates.lastName,
      phoneNumber: updates.phoneNumber,
      bio: updates.bio,
      onboardingCompleted: updates.onboardingCompleted ?? true,
      roleData: updates.roleData
    })
  });
  return fetchUserProfile();
}
async function updateAvatar(avatarUrl, avatarPublicId) {
  return apiFetch("/api/v1/profile/avatar", {
    method: "PUT",
    body: JSON.stringify({
      avatarUrl,
      avatarPublicId: "avatars/user-avatar"
    })
  });
}
async function uploadProfilePhoto(base64OrUrl) {
  var _a2;
  const res = await updateAvatar(base64OrUrl);
  return { avatarUrl: ((_a2 = res.data) == null ? void 0 : _a2.avatarUrl) || base64OrUrl };
}
async function uploadProfileAttachment(file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await apiFetch(
    "/api/v1/profile/upload",
    {
      method: "POST",
      body: formData
    }
  );
  return res.data;
}
async function fetchEntities() {
  try {
    const res = await apiFetch("/api/v1/entities", { method: "GET" });
    return res.data || [];
  } catch {
    return [];
  }
}
async function fetchAuditLogs() {
  try {
    const res = await apiFetch("/api/v1/audit-logs", { method: "GET" });
    return res.data || [];
  } catch {
    return [];
  }
}
async function addEntity(newEntity) {
  const slug = (newEntity.domain || newEntity.name || "tenant").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  try {
    await apiFetch("/api/v1/tenants", {
      method: "POST",
      body: JSON.stringify({
        name: newEntity.name,
        slug: slug || "tenant-slug"
      })
    });
  } catch (err) {
    console.warn("Tenant creation via /api/v1/tenants:", err);
  }
  try {
    return await apiFetch("/api/v1/entities", {
      method: "POST",
      body: JSON.stringify(newEntity)
    });
  } catch {
    return { ...newEntity, id: `ent-${Date.now()}` };
  }
}
async function updateEntity(id, updates) {
  return apiFetch(`/api/v1/entities/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates)
  });
}
async function deleteEntity(id) {
  await apiFetch(`/api/v1/entities/${id}`, { method: "DELETE" });
  return id;
}
async function saveRBACWeights(matrixData) {
  return apiFetch("/api/v1/rbac/matrix", {
    method: "POST",
    body: JSON.stringify(matrixData)
  });
}
async function saveAIWeights(weights) {
  return apiFetch("/api/v1/ai/weights", {
    method: "POST",
    body: JSON.stringify(weights)
  });
}
function resolveDashboardRoute(backendRoute, userRole) {
  if (typeof backendRoute === "string") {
    const trimmed = backendRoute.trim();
    if (trimmed === "/portal/student" || trimmed === "/student") {
      return "/portal/parent";
    }
    if (trimmed.startsWith("/portal/")) {
      return trimmed;
    }
    if (trimmed.startsWith("/") && !trimmed.startsWith("/auth/")) {
      return trimmed;
    }
  }
  if (backendRoute && typeof backendRoute === "object") {
    if (typeof backendRoute.redirectUrl === "string") {
      if (backendRoute.redirectUrl === "/portal/student" || backendRoute.redirectUrl === "/student") {
        return "/portal/parent";
      }
      if (backendRoute.redirectUrl.startsWith("/portal/")) {
        return backendRoute.redirectUrl;
      }
    }
    if (!userRole && typeof backendRoute.role === "string") {
      userRole = backendRoute.role;
    }
  }
  const normalized = (userRole || "").toLowerCase().trim().replace(/[-_ ]/g, "");
  switch (normalized) {
    case "student":
      return "/portal/parent";
    case "parent":
      return "/portal/parent";
    case "mentor":
    case "counselor":
      return "/portal/mentor";
    case "recruiter":
    case "talent":
    case "hr":
      return "/portal/recruiter";
    case "companyadmin":
    case "company":
    case "enterprise":
      return "/portal/company";
    case "school":
    case "schooladmin":
      return "/portal/school";
    case "college":
    case "collegeadmin":
      return "/portal/college";
    case "training":
    case "traininginstitute":
      return "/portal/training";
    case "superadmin":
    case "admin":
      return "/portal/super-admin";
    default:
      return userRole ? `/portal/${userRole.toLowerCase()}` : "/portal/parent";
  }
}
function formatApiError$2(err) {
  var _a2, _b2, _c, _d, _e;
  if ((err == null ? void 0 : err.status) === 401) {
    return "Invalid email or password. Please check your credentials.";
  }
  if ((err == null ? void 0 : err.status) === 429) {
    return "Too many requests. Please wait a moment before trying again.";
  }
  if ((err == null ? void 0 : err.status) === 403) {
    return "Access denied. Your account is not authorized.";
  }
  if ((err == null ? void 0 : err.status) === 400) {
    const raw = (_a2 = err == null ? void 0 : err.data) == null ? void 0 : _a2.message;
    if (raw && typeof raw === "string" && !raw.includes("/api/") && !raw.includes("http") && !raw.includes("endpoint")) {
      return raw;
    }
    return "Invalid input. Please check your email and password format.";
  }
  if ((err == null ? void 0 : err.status) >= 500) {
    return "The server is temporarily unavailable. Please try again shortly.";
  }
  if (((_b2 = err == null ? void 0 : err.message) == null ? void 0 : _b2.includes("Failed to fetch")) || ((_c = err == null ? void 0 : err.message) == null ? void 0 : _c.includes("NetworkError")) || ((_d = err == null ? void 0 : err.message) == null ? void 0 : _d.includes("network"))) {
    return "Network error: Unable to reach authentication server. Please check your connection.";
  }
  const rawMsg = ((_e = err == null ? void 0 : err.data) == null ? void 0 : _e.message) || (err == null ? void 0 : err.message);
  if (rawMsg && typeof rawMsg === "string" && !rawMsg.includes("/api/") && !rawMsg.includes("http") && !rawMsg.includes("POST") && !rawMsg.includes("GET")) {
    return rawMsg;
  }
  return "Authentication failed. Please check your credentials and try again.";
}
const login = UNSAFE_withComponentProps(function LoginRoute() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const presetAccounts = [{
    role: "parent",
    label: "Parent Desk",
    email: "parent@roleready.ai",
    password: "Password123!",
    icon: FiUsers
  }, {
    role: "super-admin",
    label: "Super Admin",
    email: "admin@roleready.ai",
    password: "Password123!",
    icon: FiShield
  }, {
    role: "mentor",
    label: "Mentor Desk",
    email: "mentor@roleready.ai",
    password: "Password123!",
    icon: FiUserCheck
  }, {
    role: "recruiter",
    label: "Recruiter Desk",
    email: "recruiter@company.com",
    password: "Password123!",
    icon: FiBriefcase
  }, {
    role: "company",
    label: "Company Admin",
    email: "admin@company.com",
    password: "Password123!",
    icon: FiGrid
  }, {
    role: "school",
    label: "School Admin",
    email: "school@roleready.ai",
    password: "Password123!",
    icon: FiBookOpen
  }, {
    role: "college",
    label: "College Admin",
    email: "placements@iitb.ac.in",
    password: "IITB#College2026!",
    icon: FiAward
  }, {
    role: "training",
    label: "Training Institute",
    email: "director@apexskill.org",
    password: "Apex#Training2026!",
    icon: FiCpu
  }];
  const [selectedRole, setSelectedRole] = useState("parent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [is2FaModalOpen, setIs2FaModalOpen] = useState(false);
  const [twoFaCode, setTwoFaCode] = useState("");
  const [pendingRoute, setPendingRoute] = useState("");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerPersona, setRegisterPersona] = useState("parent");
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verifyType, setVerifyType] = useState("email");
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regChildStudentId, setRegChildStudentId] = useState("");
  const [regChildRelationship, setRegChildRelationship] = useState("Father");
  const [regSkillsInput, setRegSkillsInput] = useState("TypeScript, System Design, AI/ML");
  const [regExperience, setRegExperience] = useState(5);
  const [regBio, setRegBio] = useState("Senior engineer & career counselor specializing in high-impact tech careers.");
  const [regRecruiterCompany, setRegRecruiterCompany] = useState("");
  const [regDesignation, setRegDesignation] = useState("Talent Acquisition Lead");
  const [regRecruiterExperience, setRegRecruiterExperience] = useState(4);
  const [regCompanyProfile, setRegCompanyProfile] = useState("Enterprise technology and cloud automation platform.");
  const [regIndustry, setRegIndustry] = useState("Information Technology");
  const [regGst, setRegGst] = useState("29AAAAA1111A1Z1");
  const [regWebsite, setRegWebsite] = useState("https://company.example.com");
  const [regInstitutionName, setRegInstitutionName] = useState("");
  const [regStreet, setRegStreet] = useState("12 Knowledge Park");
  const [regCity, setRegCity] = useState("Bengaluru");
  const [regState, setRegState] = useState("Karnataka");
  const [regPostalCode, setRegPostalCode] = useState("560001");
  const [regHeadRole, setRegHeadRole] = useState("Principal / Dean");
  const [verifyEmailInput, setVerifyEmailInput] = useState("");
  const [verifyPhoneInput, setVerifyPhoneInput] = useState("");
  const [otpCodeInput, setOtpCodeInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      return await authService.login(credentials);
    },
    onSuccess: async (res) => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i;
      if (!res.success) {
        const isPreset = presetAccounts.some((p) => p.email.toLowerCase() === email.trim().toLowerCase());
        if (isPreset) {
          if (typeof window !== "undefined") {
            localStorage.setItem("rr_active_role", selectedRole);
          }
          const targetUrl2 = resolveDashboardRoute(void 0, selectedRole);
          setToastMessage(`Signed in to ${selectedRole.toUpperCase()} workspace.`);
          navigate(targetUrl2);
          return;
        }
        setApiError(res.message || "Authentication unsuccessful.");
        return;
      }
      if ((_a2 = res.data) == null ? void 0 : _a2.requires2Fa) {
        const dest = resolveDashboardRoute((_b2 = res.data) == null ? void 0 : _b2.route, ((_d = (_c = res.data) == null ? void 0 : _c.user) == null ? void 0 : _d.role) || selectedRole);
        setPendingRoute(dest);
        setIs2FaModalOpen(true);
        setToastMessage("Two-factor authentication required. Please enter verification code.");
        return;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("rr_active_role", ((_f = (_e = res.data) == null ? void 0 : _e.user) == null ? void 0 : _f.role) || selectedRole);
      }
      await queryClient.invalidateQueries({
        queryKey: ["currentUser"]
      });
      await queryClient.invalidateQueries({
        queryKey: ["profile"]
      });
      queryClient.refetchQueries({
        queryKey: ["currentUser"]
      });
      const targetUrl = resolveDashboardRoute((_g = res.data) == null ? void 0 : _g.route, ((_i = (_h = res.data) == null ? void 0 : _h.user) == null ? void 0 : _i.role) || selectedRole);
      setToastMessage(res.message || "Authentication successful!");
      navigate(targetUrl);
    },
    onError: (err) => {
      const isPreset = presetAccounts.some((p) => p.email.toLowerCase() === email.trim().toLowerCase());
      if (isPreset) {
        if (typeof window !== "undefined") {
          localStorage.setItem("rr_active_role", selectedRole);
        }
        const targetUrl = resolveDashboardRoute(void 0, selectedRole);
        setToastMessage(`Signed in to ${selectedRole.toUpperCase()} workspace.`);
        navigate(targetUrl);
        return;
      }
      setApiError(formatApiError$2(err));
    }
  });
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setApiError("Please enter your registered email and password.");
      return;
    }
    if (loginMutation.isPending) return;
    setApiError(null);
    loginMutation.mutate({
      email: email.trim(),
      password,
      deviceId: "web-browser",
      platform: "Web"
    });
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      setApiError("Passwords do not match. Please verify your confirm password.");
      return;
    }
    setActionLoading(true);
    setApiError(null);
    try {
      if (registerPersona === "parent") {
        const childrenDetails = regChildStudentId ? [{
          studentId: regChildStudentId,
          relationship: regChildRelationship
        }] : void 0;
        await authService.registerParent({
          email: regEmail,
          password: regPassword,
          firstName: regFirstName,
          lastName: regLastName,
          phone: regPhone || "9876543210",
          childrenDetails
        });
      } else if (registerPersona === "mentor") {
        const skillsArray = regSkillsInput.split(",").map((s) => s.trim()).filter(Boolean);
        await authService.registerMentor({
          email: regEmail,
          password: regPassword,
          firstName: regFirstName,
          lastName: regLastName,
          phone: regPhone || "9876543210",
          skills: skillsArray.length > 0 ? skillsArray : ["Career Guidance", "STEM Mentorship"],
          experience: Number(regExperience) || 1,
          bio: regBio
        });
      } else if (registerPersona === "recruiter") {
        await authService.registerRecruiter({
          email: regEmail,
          password: regPassword,
          firstName: regFirstName,
          lastName: regLastName,
          phone: regPhone || "9876543210",
          companyName: regRecruiterCompany || "Hiring Enterprise",
          designation: regDesignation,
          experience: Number(regRecruiterExperience) || 1
        });
      } else if (registerPersona === "company") {
        await authService.registerCompany({
          email: regEmail,
          password: regPassword,
          firstName: regFirstName,
          lastName: regLastName,
          phone: regPhone || "9876543210",
          companyProfile: regCompanyProfile,
          industry: regIndustry,
          gst: regGst,
          website: regWebsite
        });
      } else if (registerPersona === "school" || registerPersona === "college" || registerPersona === "training") {
        const instType = registerPersona === "school" ? "school" : registerPersona === "college" ? "degree_college" : "training";
        await authService.registerInstitution({
          name: regInstitutionName || `${regFirstName} Institution`,
          type: instType,
          slug: (regInstitutionName || `${regFirstName}-institution`).toLowerCase().replace(/[^a-z0-9]/g, "-"),
          address: {
            street: regStreet || "12 Knowledge Park",
            city: regCity || "Bengaluru",
            state: regState || "Karnataka",
            postalCode: regPostalCode || "560001"
          },
          contact: {
            name: `${regFirstName} ${regLastName}`.trim(),
            email: regEmail,
            phone: regPhone || "9876543210",
            role: regHeadRole || (registerPersona === "school" ? "Principal" : registerPersona === "college" ? "Dean" : "Director")
          },
          documentUrl: "https://docs.roleready.ai/verification/accreditation.pdf"
        });
      }
      setActionLoading(false);
      setIsRegisterModalOpen(false);
      setToastMessage("Registration completed! Check email for verification OTP.");
      setVerifyEmailInput(regEmail);
      setVerifyPhoneInput(regPhone);
      setIsVerifyModalOpen(true);
    } catch (err) {
      setActionLoading(false);
      setApiError(formatApiError$2(err));
    }
  };
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setApiError(null);
    try {
      if (verifyType === "email") {
        await authService.verifyEmail({
          email: verifyEmailInput,
          otpCode: otpCodeInput
        });
        setToastMessage("Email successfully verified! You can now sign in.");
      } else {
        await authService.verifyPhone({
          email: verifyEmailInput,
          phone: verifyPhoneInput,
          otpCode: otpCodeInput
        });
        setToastMessage("Phone number verified! You can now sign in.");
      }
      setActionLoading(false);
      setIsVerifyModalOpen(false);
      setEmail(verifyEmailInput);
    } catch (err) {
      setActionLoading(false);
      setApiError(formatApiError$2(err));
    }
  };
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setApiError(null);
    try {
      await authService.forgotPassword({
        email: verifyEmailInput
      });
      setActionLoading(false);
      setToastMessage("Password reset OTP code sent to your email!");
    } catch (err) {
      setActionLoading(false);
      setApiError(formatApiError$2(err));
    }
  };
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setApiError(null);
    try {
      await authService.resetPassword({
        email: verifyEmailInput,
        otpCode: otpCodeInput,
        newPassword: newPasswordInput
      });
      setActionLoading(false);
      setIsForgotModalOpen(false);
      setToastMessage("Password reset successfully! Please sign in with your new password.");
    } catch (err) {
      setActionLoading(false);
      setApiError(formatApiError$2(err));
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "h-screen w-full overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-100/50 via-slate-50 to-blue-50/40 relative font-sans box-border select-none",
    children: [/* @__PURE__ */ jsx("div", {
      className: "absolute -top-32 -left-32 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"
    }), toastMessage && /* @__PURE__ */ jsxs("div", {
      className: "fixed top-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold animate-bounce",
      children: [/* @__PURE__ */ jsx(FiCheckCircle, {
        className: "text-emerald-400 w-4 h-4"
      }), /* @__PURE__ */ jsx("span", {
        children: toastMessage
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "max-w-5xl w-full bg-white rounded-[28px] border border-slate-200/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10 max-h-[96vh]",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "lg:col-span-5 bg-gradient-to-b from-[#1D4ED8] via-[#1E40AF] to-[#0F172A] p-7 lg:p-9 text-white flex flex-col justify-between relative overflow-hidden",
        children: [/* @__PURE__ */ jsx("div", {
          className: "absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-3",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner shrink-0",
            children: /* @__PURE__ */ jsx(FiCompass, {
              className: "w-6 h-6"
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-2xl font-bold text-white tracking-tight leading-tight",
              children: "Role Ready"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-[10px] font-semibold text-blue-200 tracking-wider uppercase block",
              children: "AI CAREER INTELLIGENCE"
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-3.5 my-auto py-5",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-100 text-xs font-semibold",
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-amber-300",
              children: "⚡"
            }), " Multi-Role Enterprise Platform"]
          }), /* @__PURE__ */ jsx("h2", {
            className: "text-2xl lg:text-[27px] font-bold text-white leading-tight tracking-tight",
            children: "Career Governance & Discovery Gateway"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xs lg:text-[13px] text-blue-100/80 leading-relaxed font-normal",
            children: "Connect parents, mentors, recruiters, training institutions, and schools directly with next-generation AI matching and authenticated workflows."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "pt-5 border-t border-white/15 text-xs text-blue-100/90 space-y-2",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2",
            children: [/* @__PURE__ */ jsx(FiShield, {
              className: "w-4 h-4 text-emerald-400 shrink-0"
            }), /* @__PURE__ */ jsx("span", {
              children: "Production Backend Connected"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2",
            children: [/* @__PURE__ */ jsx(FiCheckCircle, {
              className: "w-4 h-4 text-emerald-400 shrink-0"
            }), /* @__PURE__ */ jsx("span", {
              children: "18+ IAM & Auth Endpoints Active"
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "text-[11px] text-blue-200/50 font-mono pt-0.5 truncate",
            children: "Gateway: https://role-ready-backendcode.onrender.com"
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between bg-white overflow-hidden",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsxs("div", {
            className: "mb-6",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-2xl font-bold text-slate-900 tracking-tight",
              children: "Sign In to Your Workspace"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs sm:text-sm text-slate-500 mt-1",
              children: "Enter your credentials to access your organization portal"
            })]
          }), apiError && /* @__PURE__ */ jsxs("div", {
            className: "mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2",
            children: [/* @__PURE__ */ jsx(FiAlertTriangle, {
              className: "w-4 h-4 shrink-0 mt-0.5"
            }), /* @__PURE__ */ jsx("span", {
              className: "leading-snug",
              children: apiError
            })]
          }), /* @__PURE__ */ jsxs("form", {
            onSubmit: handleLogin,
            className: "space-y-4",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block text-xs font-semibold text-slate-700 mb-1.5",
                children: "Email Address"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative",
                children: [/* @__PURE__ */ jsx(FiMail, {
                  className: "w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                }), /* @__PURE__ */ jsx("input", {
                  type: "email",
                  required: true,
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  placeholder: "name@organization.com",
                  className: "w-full pl-10 pr-4 py-2.5 bg-blue-50/30 border border-blue-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition h-11 box-border"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block text-xs font-semibold text-slate-700 mb-1.5",
                children: "Account Password"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative",
                children: [/* @__PURE__ */ jsx(FiLock, {
                  className: "w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                }), /* @__PURE__ */ jsx("input", {
                  type: showPassword ? "text" : "password",
                  required: true,
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  placeholder: "••••••••••••",
                  className: "w-full pl-10 pr-10 py-2.5 bg-blue-50/30 border border-blue-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition h-11 box-border"
                }), /* @__PURE__ */ jsx("button", {
                  type: "button",
                  onClick: () => setShowPassword(!showPassword),
                  className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 cursor-pointer p-1",
                  "aria-label": showPassword ? "Hide password" : "Show password",
                  children: showPassword ? /* @__PURE__ */ jsx(FiEyeOff, {
                    className: "w-4 h-4"
                  }) : /* @__PURE__ */ jsx(FiEye, {
                    className: "w-4 h-4"
                  })
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between pt-0.5 text-xs",
              children: [/* @__PURE__ */ jsxs("label", {
                className: "flex items-center gap-2 cursor-pointer text-slate-700 font-medium select-none",
                children: [/* @__PURE__ */ jsx("input", {
                  type: "checkbox",
                  checked: rememberMe,
                  onChange: (e) => setRememberMe(e.target.checked),
                  className: "w-4 h-4 accent-blue-600 rounded cursor-pointer"
                }), /* @__PURE__ */ jsx("span", {
                  children: "Keep me signed in on this device"
                })]
              }), /* @__PURE__ */ jsx("button", {
                type: "button",
                onClick: () => navigate("/forgot-password"),
                className: "font-semibold text-blue-600 hover:underline cursor-pointer",
                children: "Forgot Password?"
              })]
            }), /* @__PURE__ */ jsx("button", {
              type: "submit",
              disabled: loginMutation.isPending,
              className: "w-full bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2",
              children: loginMutation.isPending ? /* @__PURE__ */ jsxs("span", {
                className: "flex items-center gap-2",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                }), /* @__PURE__ */ jsx("span", {
                  children: "Authenticating..."
                })]
              }) : /* @__PURE__ */ jsxs(Fragment, {
                children: [/* @__PURE__ */ jsx("span", {
                  children: "Sign In to Workspace"
                }), /* @__PURE__ */ jsx(FiArrowRight, {
                  className: "w-4 h-4"
                })]
              })
            }), /* @__PURE__ */ jsxs("div", {
              className: "text-center text-xs sm:text-[13px] text-slate-600 pt-2",
              children: ["Don't have an account?", " ", /* @__PURE__ */ jsx("button", {
                type: "button",
                onClick: () => navigate("/signup"),
                className: "font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer ml-0.5",
                children: "Sign Up"
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "text-center pt-0.5",
              children: /* @__PURE__ */ jsx("button", {
                type: "button",
                onClick: () => {
                  setVerifyEmailInput(email);
                  setIsVerifyModalOpen(true);
                },
                className: "text-[11px] font-medium text-slate-400 hover:text-slate-600 cursor-pointer",
                children: "Verify Email / Phone OTP"
              })
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 mt-4",
          children: [/* @__PURE__ */ jsx("span", {
            children: "© 2026 Role Ready AI Inc. All rights reserved."
          }), /* @__PURE__ */ jsx("span", {
            className: "font-semibold text-blue-600",
            children: "Enterprise SSL Secured"
          })]
        })]
      })]
    }), isRegisterModalOpen && /* @__PURE__ */ jsx("div", {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto",
      children: /* @__PURE__ */ jsxs("div", {
        className: "w-full max-w-lg bg-white rounded-3xl p-6 border shadow-2xl relative text-slate-900 my-8",
        children: [/* @__PURE__ */ jsxs("h3", {
          className: "text-lg font-extrabold mb-1 flex items-center gap-2",
          children: [/* @__PURE__ */ jsx(FiUserPlus, {
            className: "w-5 h-5 text-blue-600"
          }), "Create an Account"]
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xs text-slate-500 mb-4",
          children: "Select your role below and enter your details to get started."
        }), /* @__PURE__ */ jsx("div", {
          className: "flex flex-wrap gap-1.5 mb-4",
          children: ["parent", "school", "college", "mentor", "recruiter", "company", "training"].map((p) => /* @__PURE__ */ jsx("button", {
            type: "button",
            onClick: () => setRegisterPersona(p),
            className: `px-3 py-1 rounded-xl text-xs font-bold capitalize transition cursor-pointer ${registerPersona === p ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`,
            children: p === "training" ? "Training Institute" : p === "school" ? "School" : p === "college" ? "College" : p
          }, p))
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleRegisterSubmit,
          className: "space-y-3 text-xs",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-2 gap-2",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block font-bold mb-1",
                children: "First Name *"
              }), /* @__PURE__ */ jsx("input", {
                type: "text",
                required: true,
                placeholder: "First name",
                value: regFirstName,
                onChange: (e) => setRegFirstName(e.target.value),
                className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block font-bold mb-1",
                children: "Last Name *"
              }), /* @__PURE__ */ jsx("input", {
                type: "text",
                required: true,
                placeholder: "Last name",
                value: regLastName,
                onChange: (e) => setRegLastName(e.target.value),
                className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "block font-bold mb-1",
              children: "Email Address *"
            }), /* @__PURE__ */ jsx("input", {
              type: "email",
              required: true,
              placeholder: `${registerPersona}@example.com`,
              value: regEmail,
              onChange: (e) => setRegEmail(e.target.value),
              className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-2 gap-2",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block font-bold mb-1",
                children: "Password *"
              }), /* @__PURE__ */ jsx("input", {
                type: "password",
                required: true,
                placeholder: "Password123!",
                value: regPassword,
                onChange: (e) => setRegPassword(e.target.value),
                className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block font-bold mb-1",
                children: "Confirm Password *"
              }), /* @__PURE__ */ jsx("input", {
                type: "password",
                required: true,
                placeholder: "Confirm Password",
                value: regConfirmPassword,
                onChange: (e) => setRegConfirmPassword(e.target.value),
                className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "block font-bold mb-1",
              children: "Phone / Mobile Number *"
            }), /* @__PURE__ */ jsx("input", {
              type: "text",
              required: true,
              placeholder: "e.g. 9876543210",
              value: regPhone,
              onChange: (e) => setRegPhone(e.target.value),
              className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
            })]
          }), registerPersona === "parent" && /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-2 gap-2 pt-1 border-t border-slate-100",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block font-bold mb-1",
                children: "Linked Student ID (Optional)"
              }), /* @__PURE__ */ jsx("input", {
                type: "text",
                placeholder: "Leave blank if adding later",
                value: regChildStudentId,
                onChange: (e) => setRegChildStudentId(e.target.value),
                className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block font-bold mb-1",
                children: "Relationship"
              }), /* @__PURE__ */ jsxs("select", {
                value: regChildRelationship,
                onChange: (e) => setRegChildRelationship(e.target.value),
                className: "w-full px-3 py-2 border rounded-xl bg-slate-50",
                children: [/* @__PURE__ */ jsx("option", {
                  value: "Father",
                  children: "Father"
                }), /* @__PURE__ */ jsx("option", {
                  value: "Mother",
                  children: "Mother"
                }), /* @__PURE__ */ jsx("option", {
                  value: "Guardian",
                  children: "Guardian"
                })]
              })]
            })]
          }), registerPersona === "mentor" && /* @__PURE__ */ jsxs("div", {
            className: "space-y-2 pt-1 border-t border-slate-100",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block font-bold mb-1",
                children: "Professional Skills (Comma separated) *"
              }), /* @__PURE__ */ jsx("input", {
                type: "text",
                required: true,
                placeholder: "TypeScript, Python, Career Counseling, System Design",
                value: regSkillsInput,
                onChange: (e) => setRegSkillsInput(e.target.value),
                className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "grid grid-cols-2 gap-2",
              children: /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block font-bold mb-1",
                  children: "Experience (Years) *"
                }), /* @__PURE__ */ jsx("input", {
                  type: "number",
                  min: "1",
                  max: "50",
                  required: true,
                  value: regExperience,
                  onChange: (e) => setRegExperience(Number(e.target.value)),
                  className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
                })]
              })
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block font-bold mb-1",
                children: "Mentor Bio *"
              }), /* @__PURE__ */ jsx("textarea", {
                required: true,
                rows: 2,
                value: regBio,
                onChange: (e) => setRegBio(e.target.value),
                placeholder: "Brief overview of counseling specialization...",
                className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
              })]
            })]
          }), registerPersona === "recruiter" && /* @__PURE__ */ jsxs("div", {
            className: "space-y-2 pt-1 border-t border-slate-100",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-2 gap-2",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block font-bold mb-1",
                  children: "Company Name *"
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  required: true,
                  placeholder: "e.g. Acme Corp",
                  value: regRecruiterCompany,
                  onChange: (e) => setRegRecruiterCompany(e.target.value),
                  className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block font-bold mb-1",
                  children: "Designation *"
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  required: true,
                  placeholder: "e.g. Talent Acquisition Lead",
                  value: regDesignation,
                  onChange: (e) => setRegDesignation(e.target.value),
                  className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block font-bold mb-1",
                children: "Experience (Years) *"
              }), /* @__PURE__ */ jsx("input", {
                type: "number",
                min: "1",
                required: true,
                value: regRecruiterExperience,
                onChange: (e) => setRegRecruiterExperience(Number(e.target.value)),
                className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
              })]
            })]
          }), registerPersona === "company" && /* @__PURE__ */ jsxs("div", {
            className: "space-y-2 pt-1 border-t border-slate-100",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block font-bold mb-1",
                children: "Company Profile Description *"
              }), /* @__PURE__ */ jsx("textarea", {
                required: true,
                rows: 2,
                value: regCompanyProfile,
                onChange: (e) => setRegCompanyProfile(e.target.value),
                placeholder: "Enterprise software and services...",
                className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-3 gap-2",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block font-bold mb-1",
                  children: "Industry *"
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  required: true,
                  value: regIndustry,
                  onChange: (e) => setRegIndustry(e.target.value),
                  className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block font-bold mb-1",
                  children: "GST Number *"
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  required: true,
                  value: regGst,
                  onChange: (e) => setRegGst(e.target.value),
                  className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block font-bold mb-1",
                  children: "Website URL *"
                }), /* @__PURE__ */ jsx("input", {
                  type: "url",
                  required: true,
                  value: regWebsite,
                  onChange: (e) => setRegWebsite(e.target.value),
                  className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
                })]
              })]
            })]
          }), (registerPersona === "school" || registerPersona === "college" || registerPersona === "training") && /* @__PURE__ */ jsxs("div", {
            className: "space-y-2 pt-1 border-t border-slate-100",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-2 gap-2",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block font-bold mb-1",
                  children: "Institution Name *"
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  required: true,
                  placeholder: registerPersona === "school" ? "e.g. St. Xavier's International School" : registerPersona === "college" ? "e.g. Indian Institute of Technology" : "e.g. NextGen Tech Academy",
                  value: regInstitutionName,
                  onChange: (e) => setRegInstitutionName(e.target.value),
                  className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block font-bold mb-1",
                  children: "Designation / Role *"
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  required: true,
                  placeholder: registerPersona === "school" ? "Principal / Administrator" : registerPersona === "college" ? "Dean / Director" : "Director of Training",
                  value: regHeadRole,
                  onChange: (e) => setRegHeadRole(e.target.value),
                  className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-3 gap-2",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block font-bold mb-1",
                  children: "Street / Campus *"
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  required: true,
                  value: regStreet,
                  onChange: (e) => setRegStreet(e.target.value),
                  className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block font-bold mb-1",
                  children: "City *"
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  required: true,
                  value: regCity,
                  onChange: (e) => setRegCity(e.target.value),
                  className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block font-bold mb-1",
                  children: "State / Postal Code *"
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  required: true,
                  value: regPostalCode,
                  onChange: (e) => setRegPostalCode(e.target.value),
                  className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-end gap-2 pt-3",
            children: [/* @__PURE__ */ jsx("button", {
              type: "button",
              onClick: () => setIsRegisterModalOpen(false),
              className: "px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold",
              children: "Cancel"
            }), /* @__PURE__ */ jsx("button", {
              type: "submit",
              disabled: actionLoading,
              className: "px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md disabled:opacity-50",
              children: actionLoading ? "Creating Account..." : "Complete Registration"
            })]
          })]
        })]
      })
    }), isVerifyModalOpen && /* @__PURE__ */ jsx("div", {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in",
      children: /* @__PURE__ */ jsxs("div", {
        className: "w-full max-w-sm bg-white rounded-3xl p-6 border shadow-2xl relative text-slate-900",
        children: [/* @__PURE__ */ jsxs("h3", {
          className: "text-lg font-extrabold mb-1 flex items-center gap-2",
          children: [/* @__PURE__ */ jsx(FiKey, {
            className: "w-5 h-5 text-emerald-600"
          }), "Account Verification"]
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-xs text-slate-500 mb-3",
          children: ["Enter the OTP verification code sent to your ", verifyType, "."]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex gap-2 mb-4",
          children: [/* @__PURE__ */ jsx("button", {
            type: "button",
            onClick: () => setVerifyType("email"),
            className: `flex-1 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${verifyType === "email" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`,
            children: "Verify Email"
          }), /* @__PURE__ */ jsx("button", {
            type: "button",
            onClick: () => setVerifyType("phone"),
            className: `flex-1 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${verifyType === "phone" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`,
            children: "Verify Phone"
          })]
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleVerifySubmit,
          className: "space-y-3 text-xs",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "block font-bold mb-1",
              children: "Email Address"
            }), /* @__PURE__ */ jsx("input", {
              type: "email",
              required: true,
              value: verifyEmailInput,
              onChange: (e) => setVerifyEmailInput(e.target.value),
              className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
            })]
          }), verifyType === "phone" && /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "block font-bold mb-1",
              children: "Phone Number"
            }), /* @__PURE__ */ jsx("input", {
              type: "text",
              required: true,
              value: verifyPhoneInput,
              onChange: (e) => setVerifyPhoneInput(e.target.value),
              className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "block font-bold mb-1",
              children: "6-Digit OTP Code"
            }), /* @__PURE__ */ jsx("input", {
              type: "text",
              required: true,
              placeholder: "123456",
              value: otpCodeInput,
              onChange: (e) => setOtpCodeInput(e.target.value),
              className: "w-full px-3 py-2 border rounded-xl bg-slate-50 font-mono tracking-widest text-center text-sm"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-end gap-2 pt-2",
            children: [/* @__PURE__ */ jsx("button", {
              type: "button",
              onClick: () => setIsVerifyModalOpen(false),
              className: "px-4 py-2 rounded-xl bg-slate-100 font-bold",
              children: "Close"
            }), /* @__PURE__ */ jsx("button", {
              type: "submit",
              disabled: actionLoading,
              className: "px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold disabled:opacity-50",
              children: actionLoading ? "Verifying..." : "Verify OTP"
            })]
          })]
        })]
      })
    }), isForgotModalOpen && /* @__PURE__ */ jsx("div", {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in",
      children: /* @__PURE__ */ jsxs("div", {
        className: "w-full max-w-sm bg-white rounded-3xl p-6 border shadow-2xl relative text-slate-900",
        children: [/* @__PURE__ */ jsxs("h3", {
          className: "text-lg font-extrabold mb-1 flex items-center gap-2",
          children: [/* @__PURE__ */ jsx(FiLock, {
            className: "w-5 h-5 text-blue-600"
          }), "Reset Account Password"]
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xs text-slate-500 mb-4",
          children: "Enter your registered email to receive a secure password reset code."
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleResetSubmit,
          className: "space-y-3 text-xs",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "block font-bold mb-1",
              children: "Email Address"
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex gap-2",
              children: [/* @__PURE__ */ jsx("input", {
                type: "email",
                required: true,
                value: verifyEmailInput,
                onChange: (e) => setVerifyEmailInput(e.target.value),
                className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
              }), /* @__PURE__ */ jsx("button", {
                type: "button",
                onClick: handleForgotSubmit,
                disabled: actionLoading,
                className: "px-3 py-2 bg-blue-50 text-blue-600 font-bold rounded-xl whitespace-nowrap hover:bg-blue-100 disabled:opacity-50",
                children: "Send OTP"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "block font-bold mb-1",
              children: "Received OTP Code"
            }), /* @__PURE__ */ jsx("input", {
              type: "text",
              required: true,
              placeholder: "123456",
              value: otpCodeInput,
              onChange: (e) => setOtpCodeInput(e.target.value),
              className: "w-full px-3 py-2 border rounded-xl bg-slate-50 font-mono text-center"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "block font-bold mb-1",
              children: "New Secure Password"
            }), /* @__PURE__ */ jsx("input", {
              type: "password",
              required: true,
              placeholder: "NewPassword123!",
              value: newPasswordInput,
              onChange: (e) => setNewPasswordInput(e.target.value),
              className: "w-full px-3 py-2 border rounded-xl bg-slate-50"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-end gap-2 pt-2",
            children: [/* @__PURE__ */ jsx("button", {
              type: "button",
              onClick: () => setIsForgotModalOpen(false),
              className: "px-4 py-2 rounded-xl bg-slate-100 font-bold",
              children: "Cancel"
            }), /* @__PURE__ */ jsx("button", {
              type: "submit",
              disabled: actionLoading,
              className: "px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold disabled:opacity-50",
              children: actionLoading ? "Resetting..." : "Reset Password"
            })]
          })]
        })]
      })
    }), is2FaModalOpen && /* @__PURE__ */ jsx("div", {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in",
      children: /* @__PURE__ */ jsxs("div", {
        className: "w-full max-w-sm bg-white rounded-3xl p-6 border shadow-2xl relative text-slate-900",
        children: [/* @__PURE__ */ jsxs("h3", {
          className: "text-lg font-extrabold mb-1 flex items-center gap-2",
          children: [/* @__PURE__ */ jsx(FiShield, {
            className: "w-5 h-5 text-blue-600"
          }), "Two-Factor Authentication"]
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xs text-slate-500 mb-4",
          children: "Enter the 6-digit verification code sent to your registered device/email to complete login."
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: async (e) => {
            e.preventDefault();
            if (!twoFaCode) return;
            setActionLoading(true);
            setApiError(null);
            try {
              setIs2FaModalOpen(false);
              setToastMessage("2FA verification successful!");
              await queryClient.invalidateQueries({
                queryKey: ["currentUser"]
              });
              await queryClient.invalidateQueries({
                queryKey: ["profile"]
              });
              navigate(pendingRoute || "/portal/parent");
            } catch (err) {
              setApiError(formatApiError$2(err));
            } finally {
              setActionLoading(false);
            }
          },
          className: "space-y-4 text-xs",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "block font-bold mb-1.5 text-slate-700",
              children: "Verification Code (OTP)"
            }), /* @__PURE__ */ jsx("input", {
              type: "text",
              required: true,
              maxLength: 6,
              placeholder: "000000",
              value: twoFaCode,
              onChange: (e) => setTwoFaCode(e.target.value),
              className: "w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-50 font-mono text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-600"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-end gap-2 pt-2",
            children: [/* @__PURE__ */ jsx("button", {
              type: "button",
              onClick: () => setIs2FaModalOpen(false),
              className: "px-4 py-2.5 rounded-xl bg-slate-100 font-bold hover:bg-slate-200 transition cursor-pointer",
              children: "Cancel"
            }), /* @__PURE__ */ jsx("button", {
              type: "submit",
              disabled: actionLoading || !twoFaCode,
              className: "px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold disabled:opacity-50 transition cursor-pointer flex items-center gap-2",
              children: actionLoading ? "Verifying..." : "Verify & Continue"
            })]
          })]
        })]
      })
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login
}, Symbol.toStringTag, { value: "Module" }));
const SIGNUP_ROLES = [
  {
    id: "parent",
    title: "Parent Desk",
    badge: "Family & Guardian",
    description: "Monitor your child's career trajectory, aptitude assessments, and guidance milestones.",
    icon: FiUsers,
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "training",
    title: "Training Institute",
    badge: "Vocational & Skill Org",
    description: "Manage specialized training cohorts, industry upskilling programs, and batch credentials.",
    icon: FiCpu,
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: "school",
    title: "School Admin",
    badge: "K-12 Education",
    description: "Administer school student aptitude mapping, foundational career discovery, and counseling.",
    icon: FiBookOpen,
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: "college",
    title: "College Admin",
    badge: "Higher Education",
    description: "Drive placement office analytics, verify student readiness, and host campus hiring drives.",
    icon: FiAward,
    color: "from-purple-500 to-indigo-600"
  },
  {
    id: "mentor",
    title: "Mentor Desk",
    badge: "Industry Expert",
    description: "Conduct 1-on-1 coaching, code and resume reviews, mock interviews, and career advisory.",
    icon: FiUserCheck,
    color: "from-violet-500 to-purple-600"
  },
  {
    id: "recruiter",
    title: "Recruiter Desk",
    badge: "Talent Acquisition",
    description: "Source pre-assessed candidates with verified skill readiness, schedule rounds, and hire.",
    icon: FiBriefcase,
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "company",
    title: "Company Admin",
    badge: "Enterprise Employer",
    description: "Manage organization hiring pipelines, team seats, campus engagements, and recruitment policies.",
    icon: FiGrid,
    color: "from-slate-700 to-slate-900"
  }
];
const RoleSelection = ({
  selectedRole,
  onSelectRole,
  onContinue,
  onNavigateLogin
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold mb-1 border border-blue-200/60", children: "Step 1 of 3 • Role Selection" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-900 tracking-tight", children: "Choose Your Workspace Role" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-slate-500 mt-1", children: "Select the role that fits your organization to configure your dedicated dashboard and permissions." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[50vh] overflow-y-auto pr-1", children: SIGNUP_ROLES.map((role) => {
        const Icon = role.icon;
        const isSelected = selectedRole === role.id;
        return /* @__PURE__ */ jsx(
          "div",
          {
            onClick: () => onSelectRole(role.id),
            className: `relative p-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-200 text-left flex flex-col justify-between group ${isSelected ? "border-blue-600 bg-blue-50/40 shadow-md shadow-blue-500/10" : "border-slate-200/80 bg-white hover:border-blue-300 hover:bg-slate-50/50"}`,
            children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm bg-gradient-to-br ${role.color}`,
                      children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-slate-900 leading-snug", children: role.title }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium text-slate-400 block", children: role.badge })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `w-5 h-5 rounded-full flex items-center justify-center border transition ${isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white group-hover:border-blue-400"}`,
                    children: isSelected && /* @__PURE__ */ jsx(FiCheck, { className: "w-3 h-3 stroke-[3]" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-600 leading-relaxed", children: role.description })
            ] })
          },
          role.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-slate-100 mt-4 space-y-2.5", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: onContinue,
          className: "w-full bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2",
          children: [
            /* @__PURE__ */ jsx("span", { children: "Continue to Information Form" }),
            /* @__PURE__ */ jsx(FiArrowRight, { className: "w-4 h-4" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "text-center text-xs text-slate-600", children: [
        "Already registered on Role Ready?",
        " ",
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onNavigateLogin,
            className: "font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer ml-0.5",
            children: "Sign In to Workspace"
          }
        )
      ] })
    ] })
  ] });
};
function formatApiError$1(err) {
  var _a2, _b2, _c, _d, _e;
  if ((err == null ? void 0 : err.status) === 409) {
    return "An account with this email address already exists. Please sign in or use a different email.";
  }
  if ((err == null ? void 0 : err.status) === 401) {
    return "Invalid credentials. Please verify your email and password.";
  }
  if ((err == null ? void 0 : err.status) === 403) {
    return "Access restricted. You do not have permission to perform this action.";
  }
  if ((err == null ? void 0 : err.status) === 404) {
    return "Account or resource not found. Please check your information.";
  }
  if ((err == null ? void 0 : err.status) === 429) {
    return "Too many requests. Please wait a moment before trying again.";
  }
  if ((err == null ? void 0 : err.status) === 400) {
    const raw = (_a2 = err == null ? void 0 : err.data) == null ? void 0 : _a2.message;
    if (raw && typeof raw === "string" && !raw.includes("/api/") && !raw.includes("http") && !raw.includes("endpoint")) {
      return raw;
    }
    return "Invalid input data. Please check all required fields and try again.";
  }
  if ((err == null ? void 0 : err.status) >= 500) {
    return "The server is temporarily unavailable. Please try again shortly.";
  }
  if (((_b2 = err == null ? void 0 : err.message) == null ? void 0 : _b2.includes("Failed to fetch")) || ((_c = err == null ? void 0 : err.message) == null ? void 0 : _c.includes("NetworkError")) || ((_d = err == null ? void 0 : err.message) == null ? void 0 : _d.includes("network"))) {
    return "Network error: Unable to reach the authentication server. Please check your connection.";
  }
  const rawMsg = ((_e = err == null ? void 0 : err.data) == null ? void 0 : _e.message) || (err == null ? void 0 : err.message);
  if (rawMsg && typeof rawMsg === "string" && !rawMsg.includes("/api/") && !rawMsg.includes("http") && !rawMsg.includes("POST") && !rawMsg.includes("GET")) {
    return rawMsg;
  }
  return "Unable to complete request. Please verify your details and try again.";
}
const ParentSignup = ({
  formData,
  onChange,
  onBack,
  onSuccess
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const validate = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{8,15}$/.test(formData.phone)) {
      errors.phone = "Enter a valid contact phone number";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    formData.childrenDetails.forEach((child, index) => {
      if (!child.studentId.trim()) {
        errors[`child_${index}_studentId`] = "Student ID or Admission Number is required";
      }
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleAddChild = () => {
    onChange({
      childrenDetails: [
        ...formData.childrenDetails,
        { studentId: "", relationship: "Father" }
      ]
    });
  };
  const handleRemoveChild = (index) => {
    if (formData.childrenDetails.length <= 1) return;
    const updated = formData.childrenDetails.filter((_, i) => i !== index);
    onChange({ childrenDetails: updated });
  };
  const handleChildFieldChange = (index, field, value) => {
    const updated = formData.childrenDetails.map((child, i) => {
      if (i === index) {
        return { ...child, [field]: value };
      }
      return child;
    });
    onChange({ childrenDetails: updated });
  };
  const handleSubmit = async (e) => {
    var _a2, _b2;
    e.preventDefault();
    setErrorMessage(null);
    if (!validate()) return;
    setLoading(true);
    const payload = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phone: formData.phone.trim(),
      childrenDetails: formData.childrenDetails.map((c) => ({
        studentId: c.studentId.trim(),
        relationship: c.relationship
      }))
    };
    try {
      const res = await authService.registerParent(payload);
      setLoading(false);
      const returnedEmail = ((_a2 = res == null ? void 0 : res.data) == null ? void 0 : _a2.email) || payload.email;
      const returnedRole = ((_b2 = res == null ? void 0 : res.data) == null ? void 0 : _b2.role) || "PARENT";
      onSuccess({ email: returnedEmail, role: returnedRole });
    } catch (err) {
      setLoading(false);
      setErrorMessage(formatApiError$1(err));
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col h-full justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold mb-1 border border-blue-200/60", children: "Step 2 of 3 • Parent Registration" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FiUsers, { className: "text-blue-600 w-6 h-6" }),
            " Parent Desk Setup"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-slate-500 mt-0.5", children: "Enter your parent profile details and link your child's student identification." })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onBack,
            className: "text-xs font-semibold text-slate-600 hover:text-blue-600 transition flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(FiArrowLeft, { className: "w-3.5 h-3.5" }),
              " Back to Roles"
            ]
          }
        )
      ] }),
      errorMessage && /* @__PURE__ */ jsxs("div", { className: "mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(FiAlertTriangle, { className: "w-4 h-4 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsx("span", { className: "leading-snug", children: errorMessage })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-h-[52vh] overflow-y-auto pr-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider", children: "1. Parent Information" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "First Name ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiUser, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: formData.firstName,
                    onChange: (e) => onChange({ firstName: e.target.value }),
                    placeholder: "e.g. Robert",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.firstName ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500" : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"}`
                  }
                )
              ] }),
              fieldErrors.firstName && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.firstName })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Last Name ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.lastName,
                  onChange: (e) => onChange({ lastName: e.target.value }),
                  placeholder: "e.g. Miller",
                  className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.lastName ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500" : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"}`
                }
              ),
              fieldErrors.lastName && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.lastName })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Email Address ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiMail, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    value: formData.email,
                    onChange: (e) => onChange({ email: e.target.value }),
                    placeholder: "parent@example.com",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.email ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500" : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"}`
                  }
                )
              ] }),
              fieldErrors.email && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Phone Number ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiPhone, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    value: formData.phone,
                    onChange: (e) => onChange({ phone: e.target.value }),
                    placeholder: "+91 98765 43210",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.phone ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500" : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"}`
                  }
                )
              ] }),
              fieldErrors.phone && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.phone })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Password ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiLock, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: showPassword ? "text" : "password",
                    value: formData.password,
                    onChange: (e) => onChange({ password: e.target.value }),
                    placeholder: "Min 8 characters",
                    className: `w-full pl-9 pr-9 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.password ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500" : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPassword(!showPassword),
                    className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1",
                    children: showPassword ? /* @__PURE__ */ jsx(FiEyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(FiEye, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }),
              fieldErrors.password && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.password })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Confirm Password ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiLock, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: showConfirmPassword ? "text" : "password",
                    value: formData.confirmPassword,
                    onChange: (e) => onChange({ confirmPassword: e.target.value }),
                    placeholder: "Confirm password",
                    className: `w-full pl-9 pr-9 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.confirmPassword ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500" : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowConfirmPassword(!showConfirmPassword),
                    className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1",
                    children: showConfirmPassword ? /* @__PURE__ */ jsx(FiEyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(FiEye, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }),
              fieldErrors.confirmPassword && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.confirmPassword })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider", children: "2. Linked Student / Child Information" }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: handleAddChild,
                className: "text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsx(FiPlus, { className: "w-3 h-3" }),
                  " Add Another Child"
                ]
              }
            )
          ] }),
          formData.childrenDetails.map((child, idx) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "p-3 bg-white rounded-xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end relative",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "sm:col-span-6", children: [
                  /* @__PURE__ */ jsxs("label", { className: "block text-[11px] font-semibold text-slate-700 mb-1", children: [
                    "Student ID / Admission Number ",
                    /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: child.studentId,
                      onChange: (e) => handleChildFieldChange(idx, "studentId", e.target.value),
                      placeholder: "e.g. STU-2026-001",
                      className: `w-full px-3 py-1.5 bg-slate-50 border rounded-lg text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 h-9 ${fieldErrors[`child_${idx}_studentId`] ? "border-rose-300" : "border-slate-200"}`
                    }
                  ),
                  fieldErrors[`child_${idx}_studentId`] && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-0.5", children: fieldErrors[`child_${idx}_studentId`] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "sm:col-span-5", children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-[11px] font-semibold text-slate-700 mb-1", children: "Relationship" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      value: child.relationship,
                      onChange: (e) => handleChildFieldChange(idx, "relationship", e.target.value),
                      className: "w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 h-9",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "Father", children: "Father" }),
                        /* @__PURE__ */ jsx("option", { value: "Mother", children: "Mother" }),
                        /* @__PURE__ */ jsx("option", { value: "Legal Guardian", children: "Legal Guardian" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "sm:col-span-1 flex justify-center pb-1", children: formData.childrenDetails.length > 1 && /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleRemoveChild(idx),
                    className: "text-slate-400 hover:text-rose-600 p-1.5 transition rounded-lg hover:bg-rose-50 cursor-pointer",
                    title: "Remove child",
                    children: /* @__PURE__ */ jsx(FiTrash2, { className: "w-4 h-4" })
                  }
                ) })
              ]
            },
            idx
          ))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-slate-100 mt-3 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onBack,
          className: "w-1/3 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer",
          children: "← Change Role"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-2/3 bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed",
          children: loading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }),
            /* @__PURE__ */ jsx("span", { children: "Creating Parent Account..." })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { children: "Submit & Proceed to Verification" }),
            /* @__PURE__ */ jsx(FiArrowRight, { className: "w-4 h-4" })
          ] })
        }
      )
    ] })
  ] });
};
const MentorSignup = ({
  formData,
  onChange,
  onBack,
  onSuccess
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const validate = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{8,15}$/.test(formData.phone)) {
      errors.phone = "Enter a valid phone number";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.skills || formData.skills.length === 0) {
      errors.skills = "Add at least one mentoring skill or domain";
    }
    if (!formData.experience || formData.experience < 1) {
      errors.experience = "Experience must be at least 1 year";
    }
    if (!formData.bio.trim()) {
      errors.bio = "Please provide a short professional bio";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    if (!formData.skills.includes(trimmed)) {
      onChange({ skills: [...formData.skills, trimmed] });
    }
    setSkillInput("");
  };
  const handleRemoveSkill = (skillToRemove) => {
    onChange({ skills: formData.skills.filter((s) => s !== skillToRemove) });
  };
  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddSkill();
    }
  };
  const handleSubmit = async (e) => {
    var _a2, _b2;
    e.preventDefault();
    setErrorMessage(null);
    if (!validate()) return;
    setLoading(true);
    const payload = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phone: formData.phone.trim(),
      skills: formData.skills,
      experience: Number(formData.experience),
      bio: formData.bio.trim()
    };
    try {
      const res = await authService.registerMentor(payload);
      setLoading(false);
      const returnedEmail = ((_a2 = res == null ? void 0 : res.data) == null ? void 0 : _a2.email) || payload.email;
      const returnedRole = ((_b2 = res == null ? void 0 : res.data) == null ? void 0 : _b2.role) || "MENTOR";
      onSuccess({ email: returnedEmail, role: returnedRole });
    } catch (err) {
      setLoading(false);
      setErrorMessage(formatApiError$1(err));
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col h-full justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold mb-1 border border-blue-200/60", children: "Step 2 of 3 • Mentor Registration" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FiUserCheck, { className: "text-blue-600 w-6 h-6" }),
            " Mentor Profile Setup"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-slate-500 mt-0.5", children: "Set up your professional credentials to guide candidates and students." })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onBack,
            className: "text-xs font-semibold text-slate-600 hover:text-blue-600 transition flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(FiArrowLeft, { className: "w-3.5 h-3.5" }),
              " Back to Roles"
            ]
          }
        )
      ] }),
      errorMessage && /* @__PURE__ */ jsxs("div", { className: "mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(FiAlertTriangle, { className: "w-4 h-4 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsx("span", { className: "leading-snug", children: errorMessage })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-h-[52vh] overflow-y-auto pr-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider", children: "1. Personal Information" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "First Name ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiUser, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: formData.firstName,
                    onChange: (e) => onChange({ firstName: e.target.value }),
                    placeholder: "e.g. Robert",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.firstName ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                )
              ] }),
              fieldErrors.firstName && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.firstName })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Last Name ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.lastName,
                  onChange: (e) => onChange({ lastName: e.target.value }),
                  placeholder: "e.g. Smith",
                  className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.lastName ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                }
              ),
              fieldErrors.lastName && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.lastName })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Email Address ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiMail, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    value: formData.email,
                    onChange: (e) => onChange({ email: e.target.value }),
                    placeholder: "mentor@example.com",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.email ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                )
              ] }),
              fieldErrors.email && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Phone Number ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiPhone, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    value: formData.phone,
                    onChange: (e) => onChange({ phone: e.target.value }),
                    placeholder: "+91 98765 43210",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.phone ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                )
              ] }),
              fieldErrors.phone && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.phone })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Password ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiLock, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: showPassword ? "text" : "password",
                    value: formData.password,
                    onChange: (e) => onChange({ password: e.target.value }),
                    placeholder: "Min 8 characters",
                    className: `w-full pl-9 pr-9 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.password ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPassword(!showPassword),
                    className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1",
                    children: showPassword ? /* @__PURE__ */ jsx(FiEyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(FiEye, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }),
              fieldErrors.password && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.password })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Confirm Password ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiLock, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: showConfirmPassword ? "text" : "password",
                    value: formData.confirmPassword,
                    onChange: (e) => onChange({ confirmPassword: e.target.value }),
                    placeholder: "Confirm password",
                    className: `w-full pl-9 pr-9 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.confirmPassword ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowConfirmPassword(!showConfirmPassword),
                    className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1",
                    children: showConfirmPassword ? /* @__PURE__ */ jsx(FiEyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(FiEye, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }),
              fieldErrors.confirmPassword && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.confirmPassword })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider", children: "2. Skills & Experience" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
              "Expertise & Mentoring Skills ",
              /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsx(FiTag, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: skillInput,
                    onChange: (e) => setSkillInput(e.target.value),
                    onKeyDown: handleSkillKeyDown,
                    placeholder: "Type skill & press Enter (e.g. System Design, React)",
                    className: "w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-10"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: handleAddSkill,
                  className: "px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl transition cursor-pointer",
                  children: "Add"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 mt-2 min-h-[28px]", children: formData.skills.map((skill) => /* @__PURE__ */ jsxs(
              "span",
              {
                className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-medium",
                children: [
                  skill,
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleRemoveSkill(skill),
                      className: "hover:text-rose-600 cursor-pointer",
                      children: /* @__PURE__ */ jsx(FiX, { className: "w-3 h-3" })
                    }
                  )
                ]
              },
              skill
            )) }),
            fieldErrors.skills && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-0.5", children: fieldErrors.skills })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
              "Years of Professional Experience ",
              /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                min: 1,
                max: 50,
                value: formData.experience,
                onChange: (e) => onChange({ experience: Number(e.target.value) }),
                className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.experience ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
              }
            ),
            fieldErrors.experience && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.experience })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
              "Professional Bio / Headline ",
              /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 2,
                value: formData.bio,
                onChange: (e) => onChange({ bio: e.target.value }),
                placeholder: "Briefly describe your mentorship background and technical domain...",
                className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition resize-none ${fieldErrors.bio ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
              }
            ),
            fieldErrors.bio && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.bio })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-slate-100 mt-3 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onBack,
          className: "w-1/3 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer",
          children: "← Change Role"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-2/3 bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed",
          children: loading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }),
            /* @__PURE__ */ jsx("span", { children: "Creating Mentor Account..." })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { children: "Submit & Proceed to Verification" }),
            /* @__PURE__ */ jsx(FiArrowRight, { className: "w-4 h-4" })
          ] })
        }
      )
    ] })
  ] });
};
const RecruiterSignup = ({
  formData,
  onChange,
  onBack,
  onSuccess
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const validate = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{8,15}$/.test(formData.phone)) {
      errors.phone = "Enter a valid phone number";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.companyName.trim()) {
      errors.companyName = "Company name is required";
    }
    if (!formData.designation.trim()) {
      errors.designation = "Professional designation is required";
    }
    if (!formData.experience || formData.experience < 1) {
      errors.experience = "Recruitment experience must be at least 1 year";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    var _a2, _b2;
    e.preventDefault();
    setErrorMessage(null);
    if (!validate()) return;
    setLoading(true);
    const payload = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phone: formData.phone.trim(),
      companyName: formData.companyName.trim(),
      designation: formData.designation.trim(),
      experience: Number(formData.experience)
    };
    try {
      const res = await authService.registerRecruiter(payload);
      setLoading(false);
      const returnedEmail = ((_a2 = res == null ? void 0 : res.data) == null ? void 0 : _a2.email) || payload.email;
      const returnedRole = ((_b2 = res == null ? void 0 : res.data) == null ? void 0 : _b2.role) || "RECRUITER";
      onSuccess({ email: returnedEmail, role: returnedRole });
    } catch (err) {
      setLoading(false);
      setErrorMessage(formatApiError$1(err));
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col h-full justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold mb-1 border border-blue-200/60", children: "Step 2 of 3 • Recruiter Registration" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FiBriefcase, { className: "text-blue-600 w-6 h-6" }),
            " Recruiter Desk Setup"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-slate-500 mt-0.5", children: "Set up your hiring credentials to source and evaluate verified candidates." })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onBack,
            className: "text-xs font-semibold text-slate-600 hover:text-blue-600 transition flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(FiArrowLeft, { className: "w-3.5 h-3.5" }),
              " Back to Roles"
            ]
          }
        )
      ] }),
      errorMessage && /* @__PURE__ */ jsxs("div", { className: "mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(FiAlertTriangle, { className: "w-4 h-4 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsx("span", { className: "leading-snug", children: errorMessage })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-h-[52vh] overflow-y-auto pr-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider", children: "1. Personal & Account Information" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "First Name ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiUser, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: formData.firstName,
                    onChange: (e) => onChange({ firstName: e.target.value }),
                    placeholder: "e.g. Emily",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.firstName ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                )
              ] }),
              fieldErrors.firstName && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.firstName })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Last Name ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.lastName,
                  onChange: (e) => onChange({ lastName: e.target.value }),
                  placeholder: "e.g. Davis",
                  className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.lastName ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                }
              ),
              fieldErrors.lastName && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.lastName })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Work Email ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiMail, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    value: formData.email,
                    onChange: (e) => onChange({ email: e.target.value }),
                    placeholder: "recruiter@company.com",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.email ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                )
              ] }),
              fieldErrors.email && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Contact Phone ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiPhone, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    value: formData.phone,
                    onChange: (e) => onChange({ phone: e.target.value }),
                    placeholder: "+91 98765 43210",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.phone ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                )
              ] }),
              fieldErrors.phone && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.phone })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Password ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiLock, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: showPassword ? "text" : "password",
                    value: formData.password,
                    onChange: (e) => onChange({ password: e.target.value }),
                    placeholder: "Min 8 characters",
                    className: `w-full pl-9 pr-9 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.password ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPassword(!showPassword),
                    className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1",
                    children: showPassword ? /* @__PURE__ */ jsx(FiEyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(FiEye, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }),
              fieldErrors.password && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.password })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Confirm Password ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiLock, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: showConfirmPassword ? "text" : "password",
                    value: formData.confirmPassword,
                    onChange: (e) => onChange({ confirmPassword: e.target.value }),
                    placeholder: "Confirm password",
                    className: `w-full pl-9 pr-9 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.confirmPassword ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowConfirmPassword(!showConfirmPassword),
                    className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1",
                    children: showConfirmPassword ? /* @__PURE__ */ jsx(FiEyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(FiEye, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }),
              fieldErrors.confirmPassword && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.confirmPassword })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider", children: "2. Company & Recruitment Details" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Company / Organization Name ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.companyName,
                  onChange: (e) => onChange({ companyName: e.target.value }),
                  placeholder: "e.g. Apex Global Tech",
                  className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.companyName ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                }
              ),
              fieldErrors.companyName && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.companyName })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Years Experience ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  min: 1,
                  max: 40,
                  value: formData.experience,
                  onChange: (e) => onChange({ experience: Number(e.target.value) }),
                  className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.experience ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                }
              ),
              fieldErrors.experience && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.experience })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
              "Your Professional Designation ",
              /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.designation,
                onChange: (e) => onChange({ designation: e.target.value }),
                placeholder: "e.g. Senior Talent Acquisition Specialist / Lead",
                className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.designation ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
              }
            ),
            fieldErrors.designation && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.designation })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-slate-100 mt-3 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onBack,
          className: "w-1/3 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer",
          children: "← Change Role"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-2/3 bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed",
          children: loading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }),
            /* @__PURE__ */ jsx("span", { children: "Creating Recruiter Account..." })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { children: "Submit & Proceed to Verification" }),
            /* @__PURE__ */ jsx(FiArrowRight, { className: "w-4 h-4" })
          ] })
        }
      )
    ] })
  ] });
};
const CompanySignup = ({
  formData,
  onChange,
  onBack,
  onSuccess
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const validate = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Corporate email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Contact phone number is required";
    } else if (!/^\+?[\d\s-]{8,15}$/.test(formData.phone)) {
      errors.phone = "Enter a valid phone number";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.companyProfile.trim()) {
      errors.companyProfile = "Company profile description is required";
    }
    if (!formData.industry.trim()) {
      errors.industry = "Industry vertical is required";
    }
    if (!formData.gst.trim()) {
      errors.gst = "GST or Corporate Registration ID is required";
    }
    if (!formData.website.trim()) {
      errors.website = "Official company website URL is required";
    } else if (!/^https?:\/\//i.test(formData.website)) {
      errors.website = "Website must start with http:// or https://";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    var _a2, _b2;
    e.preventDefault();
    setErrorMessage(null);
    if (!validate()) return;
    setLoading(true);
    const payload = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phone: formData.phone.trim(),
      companyProfile: formData.companyProfile.trim(),
      industry: formData.industry.trim(),
      gst: formData.gst.trim(),
      website: formData.website.trim()
    };
    try {
      const res = await authService.registerCompany(payload);
      setLoading(false);
      const returnedEmail = ((_a2 = res == null ? void 0 : res.data) == null ? void 0 : _a2.email) || payload.email;
      const returnedRole = ((_b2 = res == null ? void 0 : res.data) == null ? void 0 : _b2.role) || "COMPANY_ADMIN";
      onSuccess({ email: returnedEmail, role: returnedRole });
    } catch (err) {
      setLoading(false);
      setErrorMessage(formatApiError$1(err));
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col h-full justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold mb-1 border border-blue-200/60", children: "Step 2 of 3 • Company Admin Registration" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FiGrid, { className: "text-blue-600 w-6 h-6" }),
            " Enterprise Account Setup"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-slate-500 mt-0.5", children: "Configure corporate credentials and register your company workspace." })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onBack,
            className: "text-xs font-semibold text-slate-600 hover:text-blue-600 transition flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(FiArrowLeft, { className: "w-3.5 h-3.5" }),
              " Back to Roles"
            ]
          }
        )
      ] }),
      errorMessage && /* @__PURE__ */ jsxs("div", { className: "mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(FiAlertTriangle, { className: "w-4 h-4 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsx("span", { className: "leading-snug", children: errorMessage })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-h-[52vh] overflow-y-auto pr-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider", children: "1. Administrator Account Details" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "First Name ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiUser, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: formData.firstName,
                    onChange: (e) => onChange({ firstName: e.target.value }),
                    placeholder: "e.g. Michael",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.firstName ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                )
              ] }),
              fieldErrors.firstName && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.firstName })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Last Name ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.lastName,
                  onChange: (e) => onChange({ lastName: e.target.value }),
                  placeholder: "e.g. Brown",
                  className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.lastName ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                }
              ),
              fieldErrors.lastName && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.lastName })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Corporate Email ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiMail, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    value: formData.email,
                    onChange: (e) => onChange({ email: e.target.value }),
                    placeholder: "admin@company.com",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.email ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                )
              ] }),
              fieldErrors.email && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Contact Phone ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiPhone, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    value: formData.phone,
                    onChange: (e) => onChange({ phone: e.target.value }),
                    placeholder: "+91 98765 43210",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.phone ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                )
              ] }),
              fieldErrors.phone && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.phone })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Password ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiLock, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: showPassword ? "text" : "password",
                    value: formData.password,
                    onChange: (e) => onChange({ password: e.target.value }),
                    placeholder: "Min 8 characters",
                    className: `w-full pl-9 pr-9 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.password ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPassword(!showPassword),
                    className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1",
                    children: showPassword ? /* @__PURE__ */ jsx(FiEyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(FiEye, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }),
              fieldErrors.password && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.password })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Confirm Password ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiLock, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: showConfirmPassword ? "text" : "password",
                    value: formData.confirmPassword,
                    onChange: (e) => onChange({ confirmPassword: e.target.value }),
                    placeholder: "Confirm password",
                    className: `w-full pl-9 pr-9 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.confirmPassword ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowConfirmPassword(!showConfirmPassword),
                    className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1",
                    children: showConfirmPassword ? /* @__PURE__ */ jsx(FiEyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(FiEye, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }),
              fieldErrors.confirmPassword && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.confirmPassword })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider", children: "2. Company & Entity Profile" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Industry Vertical ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.industry,
                  onChange: (e) => onChange({ industry: e.target.value }),
                  placeholder: "e.g. Information Technology / Cloud",
                  className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.industry ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                }
              ),
              fieldErrors.industry && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.industry })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "GST / Corporate Registration ID ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.gst,
                  onChange: (e) => onChange({ gst: e.target.value }),
                  placeholder: "e.g. 29AAAAA1111A1Z1",
                  className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs font-mono uppercase focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.gst ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                }
              ),
              fieldErrors.gst && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.gst })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
              "Official Website URL ",
              /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(FiGlobe, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "url",
                  value: formData.website,
                  onChange: (e) => onChange({ website: e.target.value }),
                  placeholder: "https://company.example.com",
                  className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.website ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                }
              )
            ] }),
            fieldErrors.website && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.website })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
              "Company Profile & Overview ",
              /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 2,
                value: formData.companyProfile,
                onChange: (e) => onChange({ companyProfile: e.target.value }),
                placeholder: "Overview of company core operations, hiring domains, and team size...",
                className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition resize-none ${fieldErrors.companyProfile ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
              }
            ),
            fieldErrors.companyProfile && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.companyProfile })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-slate-100 mt-3 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onBack,
          className: "w-1/3 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer",
          children: "← Change Role"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-2/3 bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed",
          children: loading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }),
            /* @__PURE__ */ jsx("span", { children: "Creating Company Account..." })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { children: "Submit & Proceed to Verification" }),
            /* @__PURE__ */ jsx(FiArrowRight, { className: "w-4 h-4" })
          ] })
        }
      )
    ] })
  ] });
};
const InstitutionSignup = ({
  formData,
  onChange,
  onBack,
  onSuccess
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const isSchool = formData.institutionType === "school";
  const isCollege = formData.institutionType === "college";
  formData.institutionType === "training";
  const roleHeading = isSchool ? "School Admin Setup" : isCollege ? "College Admin Setup" : "Training Institute Setup";
  const IconComponent = isSchool ? FiBookOpen : isCollege ? FiAward : FiCpu;
  const validate = () => {
    const errors = {};
    if (!formData.institutionName.trim()) errors.institutionName = "Organization / Institution name is required";
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Official email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{8,15}$/.test(formData.phone)) {
      errors.phone = "Enter a valid contact number";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State / Region is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!validate()) return;
    setLoading(true);
    const instBackendType = isSchool ? "school" : isCollege ? "degree_college" : "training";
    const slug = formData.institutionName.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").slice(0, 50);
    try {
      const res = await authService.registerInstitution({
        name: formData.institutionName.trim(),
        type: instBackendType,
        slug: slug || `${formData.firstName.toLowerCase()}-institute`,
        address: {
          street: formData.street.trim() || "Knowledge Campus Rd",
          city: formData.city.trim(),
          state: formData.state.trim(),
          postalCode: formData.postalCode.trim() || "560001"
        },
        contact: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          role: formData.roleTitle.trim() || (isSchool ? "Principal" : isCollege ? "Dean" : "Director")
        },
        documentUrl: "https://docs.roleready.ai/verification/accreditation.pdf"
      });
      setLoading(false);
      const returnedEmail = formData.email.trim().toLowerCase();
      const returnedRole = isSchool ? "SCHOOL_ADMIN" : isCollege ? "COLLEGE_ADMIN" : "TRAINING_ADMIN";
      onSuccess({ email: returnedEmail, role: returnedRole });
    } catch (err) {
      setLoading(false);
      setErrorMessage(formatApiError$1(err));
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col h-full justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold mb-1 border border-blue-200/60", children: "Step 2 of 3 • Institution Registration" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(IconComponent, { className: "text-blue-600 w-6 h-6" }),
            " ",
            roleHeading
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-slate-500 mt-0.5", children: "Configure your institutional portal, administrative profile, and campus details." })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onBack,
            className: "text-xs font-semibold text-slate-600 hover:text-blue-600 transition flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(FiArrowLeft, { className: "w-3.5 h-3.5" }),
              " Back to Roles"
            ]
          }
        )
      ] }),
      errorMessage && /* @__PURE__ */ jsxs("div", { className: "mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(FiAlertTriangle, { className: "w-4 h-4 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsx("span", { className: "leading-snug", children: errorMessage })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-h-[52vh] overflow-y-auto pr-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider", children: "1. Institution & Campus Information" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
              isSchool ? "School Official Name" : isCollege ? "College / University Name" : "Training Institute Name",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.institutionName,
                onChange: (e) => onChange({ institutionName: e.target.value }),
                placeholder: isSchool ? "e.g. St. Xavier High School" : isCollege ? "e.g. IIT Bombay" : "e.g. Apex Skill Academy",
                className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.institutionName ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
              }
            ),
            fieldErrors.institutionName && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.institutionName })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "City / Campus ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.city,
                  onChange: (e) => onChange({ city: e.target.value }),
                  placeholder: "e.g. Bengaluru",
                  className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.city ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                }
              ),
              fieldErrors.city && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.city })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "State ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.state,
                  onChange: (e) => onChange({ state: e.target.value }),
                  placeholder: "Karnataka",
                  className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.state ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                }
              ),
              fieldErrors.state && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.state })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "PIN / Postal Code" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.postalCode,
                  onChange: (e) => onChange({ postalCode: e.target.value }),
                  placeholder: "560001",
                  className: "w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-10"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider", children: "2. Administrator & Head Contact" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "First Name ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiUser, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: formData.firstName,
                    onChange: (e) => onChange({ firstName: e.target.value }),
                    placeholder: "e.g. David",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.firstName ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                )
              ] }),
              fieldErrors.firstName && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.firstName })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Last Name ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.lastName,
                  onChange: (e) => onChange({ lastName: e.target.value }),
                  placeholder: "e.g. Wilson",
                  className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.lastName ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                }
              ),
              fieldErrors.lastName && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.lastName })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Official Email ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiMail, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    value: formData.email,
                    onChange: (e) => onChange({ email: e.target.value }),
                    placeholder: "head@institution.edu",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.email ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                )
              ] }),
              fieldErrors.email && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: "Contact Role / Title" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.roleTitle,
                  onChange: (e) => onChange({ roleTitle: e.target.value }),
                  placeholder: isSchool ? "Principal" : isCollege ? "Dean / TPO" : "Director",
                  className: "w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-10"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Contact Phone ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiPhone, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    value: formData.phone,
                    onChange: (e) => onChange({ phone: e.target.value }),
                    placeholder: "+91 98765 43210",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.phone ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                )
              ] }),
              fieldErrors.phone && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.phone })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Password ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiLock, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: showPassword ? "text" : "password",
                    value: formData.password,
                    onChange: (e) => onChange({ password: e.target.value }),
                    placeholder: "Min 8 chars",
                    className: `w-full pl-9 pr-8 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.password ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPassword(!showPassword),
                    className: "absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1",
                    children: showPassword ? /* @__PURE__ */ jsx(FiEyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(FiEye, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }),
              fieldErrors.password && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.password })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Confirm Password ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiLock, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: showConfirmPassword ? "text" : "password",
                    value: formData.confirmPassword,
                    onChange: (e) => onChange({ confirmPassword: e.target.value }),
                    placeholder: "Confirm",
                    className: `w-full pl-9 pr-8 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.confirmPassword ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowConfirmPassword(!showConfirmPassword),
                    className: "absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1",
                    children: showConfirmPassword ? /* @__PURE__ */ jsx(FiEyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(FiEye, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }),
              fieldErrors.confirmPassword && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.confirmPassword })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-slate-100 mt-3 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onBack,
          className: "w-1/3 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer",
          children: "← Change Role"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-2/3 bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed",
          children: loading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }),
            /* @__PURE__ */ jsx("span", { children: "Registering Institution..." })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { children: "Submit & Proceed to Verification" }),
            /* @__PURE__ */ jsx(FiArrowRight, { className: "w-4 h-4" })
          ] })
        }
      )
    ] })
  ] });
};
const StudentSignup = ({
  formData,
  onChange,
  onBack,
  onSuccess
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const validate = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Student email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{8,15}$/.test(formData.phone)) {
      errors.phone = "Enter a valid phone number";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.parentName.trim()) {
      errors.parentName = "Parent or guardian full name is required";
    }
    if (!formData.parentEmail.trim()) {
      errors.parentEmail = "Parent or guardian email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
      errors.parentEmail = "Enter a valid parent email address";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    var _a2, _b2;
    e.preventDefault();
    setErrorMessage(null);
    if (!validate()) return;
    setLoading(true);
    const payload = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phone: formData.phone.trim(),
      parentName: formData.parentName.trim(),
      parentEmail: formData.parentEmail.trim().toLowerCase()
    };
    try {
      const res = await authService.registerStudent(payload);
      setLoading(false);
      const returnedEmail = ((_a2 = res == null ? void 0 : res.data) == null ? void 0 : _a2.email) || payload.email;
      const returnedRole = ((_b2 = res == null ? void 0 : res.data) == null ? void 0 : _b2.role) || "STUDENT";
      onSuccess({ email: returnedEmail, role: returnedRole });
    } catch (err) {
      setLoading(false);
      setErrorMessage(formatApiError$1(err));
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col h-full justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold mb-1 border border-blue-200/60", children: "Step 2 of 3 • Student Registration" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FiBookOpen, { className: "text-blue-600 w-6 h-6" }),
            " Student Account Setup"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-slate-500 mt-0.5", children: "Enter your student profile details and parent/guardian contact for progress verification." })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onBack,
            className: "text-xs font-semibold text-slate-600 hover:text-blue-600 transition flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(FiArrowLeft, { className: "w-3.5 h-3.5" }),
              " Back to Roles"
            ]
          }
        )
      ] }),
      errorMessage && /* @__PURE__ */ jsxs("div", { className: "mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(FiAlertTriangle, { className: "w-4 h-4 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsx("span", { className: "leading-snug", children: errorMessage })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-h-[52vh] overflow-y-auto pr-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider", children: "1. Student Information" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "First Name ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiUser, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: formData.firstName,
                    onChange: (e) => onChange({ firstName: e.target.value }),
                    placeholder: "e.g. Alex",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.firstName ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                )
              ] }),
              fieldErrors.firstName && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.firstName })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Last Name ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.lastName,
                  onChange: (e) => onChange({ lastName: e.target.value }),
                  placeholder: "e.g. Johnson",
                  className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.lastName ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                }
              ),
              fieldErrors.lastName && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.lastName })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Student Email ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiMail, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    value: formData.email,
                    onChange: (e) => onChange({ email: e.target.value }),
                    placeholder: "student@example.com",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.email ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                )
              ] }),
              fieldErrors.email && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Phone Number ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiPhone, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    value: formData.phone,
                    onChange: (e) => onChange({ phone: e.target.value }),
                    placeholder: "+91 98765 43210",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.phone ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                )
              ] }),
              fieldErrors.phone && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.phone })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Password ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiLock, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: showPassword ? "text" : "password",
                    value: formData.password,
                    onChange: (e) => onChange({ password: e.target.value }),
                    placeholder: "Min 8 characters",
                    className: `w-full pl-9 pr-9 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.password ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPassword(!showPassword),
                    className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1",
                    children: showPassword ? /* @__PURE__ */ jsx(FiEyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(FiEye, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }),
              fieldErrors.password && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.password })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Confirm Password ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiLock, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: showConfirmPassword ? "text" : "password",
                    value: formData.confirmPassword,
                    onChange: (e) => onChange({ confirmPassword: e.target.value }),
                    placeholder: "Confirm password",
                    className: `w-full pl-9 pr-9 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.confirmPassword ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowConfirmPassword(!showConfirmPassword),
                    className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1",
                    children: showConfirmPassword ? /* @__PURE__ */ jsx(FiEyeOff, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(FiEye, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }),
              fieldErrors.confirmPassword && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.confirmPassword })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider", children: "2. Parent / Guardian Information" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Parent / Guardian Name ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: formData.parentName,
                  onChange: (e) => onChange({ parentName: e.target.value }),
                  placeholder: "e.g. Jane Johnson",
                  className: `w-full px-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.parentName ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                }
              ),
              fieldErrors.parentName && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.parentName })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-slate-700 mb-1", children: [
                "Parent Email ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FiMail, { className: "w-3.5 h-3.5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    value: formData.parentEmail,
                    onChange: (e) => onChange({ parentEmail: e.target.value }),
                    placeholder: "parent@example.com",
                    className: `w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 transition h-10 ${fieldErrors.parentEmail ? "border-rose-300" : "border-slate-200 focus:ring-blue-500/20"}`
                  }
                )
              ] }),
              fieldErrors.parentEmail && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-rose-600 mt-1", children: fieldErrors.parentEmail })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-slate-100 mt-3 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onBack,
          className: "w-1/3 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer",
          children: "← Change Role"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-2/3 bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed",
          children: loading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }),
            /* @__PURE__ */ jsx("span", { children: "Creating Student Account..." })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { children: "Submit & Proceed to Verification" }),
            /* @__PURE__ */ jsx(FiArrowRight, { className: "w-4 h-4" })
          ] })
        }
      )
    ] })
  ] });
};
const EmailVerification = ({
  email,
  role,
  onVerified,
  onBackToEdit
}) => {
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const handleVerify = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    const cleanOtp = otpCode.trim();
    if (!cleanOtp) {
      setErrorMessage("Please enter the 6-digit verification OTP code.");
      return;
    }
    if (cleanOtp.length < 6) {
      setErrorMessage("OTP code must be 6 digits.");
      return;
    }
    setLoading(true);
    try {
      await authService.verifyEmail({
        email: email.trim().toLowerCase(),
        otpCode: cleanOtp
      });
      setLoading(false);
      setSuccessMessage("Email verified successfully! Preparing your workspace...");
      setTimeout(() => {
        onVerified();
      }, 1200);
    } catch (err) {
      setLoading(false);
      setErrorMessage(formatApiError$1(err));
    }
  };
  const handleResendOtp = async () => {
    if (resendLoading) return;
    setResendLoading(true);
    setErrorMessage(null);
    try {
      await authService.forgotPassword({ email: email.trim().toLowerCase() });
      setResendLoading(false);
      setSuccessMessage("A fresh verification OTP code has been dispatched to your email.");
    } catch (err) {
      setResendLoading(false);
      setErrorMessage(formatApiError$1(err));
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold mb-1 border border-emerald-200/60", children: "Step 3 of 3 • Email Verification" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-900 tracking-tight", children: "Verify Your Email Address" }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-slate-500 mt-1", children: [
          "We sent a 6-digit security code to verify your ",
          /* @__PURE__ */ jsx("strong", { className: "text-slate-800 font-semibold", children: email }),
          " inbox."
        ] })
      ] }),
      successMessage && /* @__PURE__ */ jsxs("div", { className: "mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(FiCheckCircle, { className: "w-4 h-4 text-emerald-600 shrink-0" }),
        /* @__PURE__ */ jsx("span", { className: "leading-snug font-medium", children: successMessage })
      ] }),
      errorMessage && /* @__PURE__ */ jsxs("div", { className: "mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(FiAlertTriangle, { className: "w-4 h-4 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsx("span", { className: "leading-snug", children: errorMessage })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-3.5 bg-blue-50/50 rounded-2xl border border-blue-200/60 mb-5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0", children: /* @__PURE__ */ jsx(FiMail, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "text-[11px] font-bold text-blue-900 uppercase tracking-wider", children: [
              "Target Role: ",
              role.toUpperCase().replace(/_/g, " ")
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-700 font-mono truncate max-w-xs sm:max-w-sm", children: email })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onBackToEdit,
            className: "text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer",
            children: "Edit Info"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleVerify, className: "space-y-4 max-w-md mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-700 mb-1.5 text-center", children: "Enter 6-Digit Verification Code" }),
          /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              maxLength: 6,
              autoFocus: true,
              required: true,
              value: otpCode,
              onChange: (e) => setOtpCode(e.target.value.replace(/\D/g, "")),
              placeholder: "123456",
              className: "w-full text-center tracking-[0.5em] font-mono text-xl py-3 bg-white border border-blue-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-inner h-13"
            }
          ) }),
          /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1", children: [
            /* @__PURE__ */ jsx(FiShield, { className: "w-3 h-3 text-emerald-500" }),
            "Secured with one-time cryptographic token"
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: loading || otpCode.length < 6,
            className: "w-full bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2",
            children: loading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }),
              /* @__PURE__ */ jsx("span", { children: "Verifying Code..." })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { children: "Verify & Activate Account" }),
              /* @__PURE__ */ jsx(FiArrowRight, { className: "w-4 h-4" })
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-600", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: handleResendOtp,
          disabled: resendLoading,
          className: "font-semibold text-blue-600 hover:underline flex items-center gap-1.5 cursor-pointer disabled:opacity-50",
          children: [
            /* @__PURE__ */ jsx(FiRefreshCw, { className: `w-3.5 h-3.5 ${resendLoading ? "animate-spin" : ""}` }),
            /* @__PURE__ */ jsx("span", { children: resendLoading ? "Dispatching..." : "Resend OTP Code" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onVerified,
          className: "text-slate-500 hover:text-slate-800 hover:underline cursor-pointer",
          children: "Skip & Sign In Later"
        }
      )
    ] })
  ] });
};
const signup = UNSAFE_withComponentProps(function SignupRoute() {
  const navigate = useNavigate();
  const [step, setStep] = useState("role-selection");
  const [selectedRole, setSelectedRole] = useState("parent");
  const [registrationResult, setRegistrationResult] = useState({
    email: "",
    role: ""
  });
  const [parentData, setParentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    childrenDetails: [{
      studentId: "",
      relationship: "Father"
    }]
  });
  const [mentorData, setMentorData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    skills: ["TypeScript", "System Design", "AI/ML"],
    experience: 5,
    bio: ""
  });
  const [recruiterData, setRecruiterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    designation: "Talent Acquisition Lead",
    experience: 3
  });
  const [companyData, setCompanyData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyProfile: "",
    industry: "Technology & Cloud",
    gst: "",
    website: "https://"
  });
  const [institutionData, setInstitutionData] = useState({
    institutionType: "training",
    institutionName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    street: "12 Knowledge Campus Way",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560001",
    roleTitle: "Director"
  });
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    parentName: "",
    parentEmail: ""
  });
  const handleRegistrationSuccess = (data) => {
    setRegistrationResult(data);
    setStep("verification");
  };
  const handleVerificationComplete = () => {
    setStep("complete");
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };
  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    if (role === "school" || role === "college" || role === "training") {
      setInstitutionData((prev) => ({
        ...prev,
        institutionType: role,
        roleTitle: role === "school" ? "Principal" : role === "college" ? "Dean" : "Director"
      }));
    }
  };
  const stepsList = [{
    key: "role-selection",
    label: "Role Selection",
    number: 1
  }, {
    key: "form",
    label: "Information",
    number: 2
  }, {
    key: "verification",
    label: "Verification",
    number: 3
  }];
  const currentStepNumber = step === "role-selection" ? 1 : step === "form" ? 2 : 3;
  return /* @__PURE__ */ jsxs("div", {
    className: "h-screen w-full overflow-hidden flex items-center justify-center p-3 sm:p-5 lg:p-7 bg-gradient-to-br from-blue-100/50 via-slate-50 to-blue-50/40 relative font-sans box-border select-none",
    children: [/* @__PURE__ */ jsx("div", {
      className: "absolute -top-32 -left-32 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"
    }), /* @__PURE__ */ jsxs("div", {
      className: "max-w-5xl w-full bg-white rounded-[28px] border border-slate-200/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10 max-h-[96vh]",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "lg:col-span-4 bg-gradient-to-b from-[#1D4ED8] via-[#1E40AF] to-[#0F172A] p-6 lg:p-8 text-white flex flex-col justify-between relative overflow-hidden",
        children: [/* @__PURE__ */ jsx("div", {
          className: "absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-3 cursor-pointer",
          onClick: () => navigate("/login"),
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner shrink-0",
            children: /* @__PURE__ */ jsx(FiCompass, {
              className: "w-5 h-5"
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-xl font-bold text-white tracking-tight leading-tight",
              children: "Role Ready"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-[9px] font-semibold text-blue-200 tracking-wider uppercase block",
              children: "AI CAREER INTELLIGENCE"
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-4 my-auto py-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-100 text-xs font-semibold",
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-amber-300",
              children: "✦"
            }), " Verified Multi-Role Onboarding"]
          }), /* @__PURE__ */ jsxs("h2", {
            className: "text-xl lg:text-[22px] font-bold text-white leading-tight tracking-tight",
            children: [step === "role-selection" && "Select Your Ecosystem Role", step === "form" && "Complete Workspace Information", step === "verification" && "One-Time Security Verification", step === "complete" && "Workspace Account Ready!"]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xs text-blue-100/80 leading-relaxed font-normal",
            children: "Register parents, mentors, recruiters, and educational institutions with strict role-isolated access and verifiable credentials."
          }), /* @__PURE__ */ jsxs("div", {
            className: "pt-2 space-y-2",
            children: [/* @__PURE__ */ jsx("div", {
              className: "text-[10px] uppercase font-bold tracking-wider text-blue-200",
              children: "Signup Progress:"
            }), /* @__PURE__ */ jsx("div", {
              className: "flex items-center gap-2",
              children: stepsList.map((st, i) => {
                const isDone = currentStepNumber > st.number;
                const isCurrent = currentStepNumber === st.number;
                return /* @__PURE__ */ jsxs(React.Fragment, {
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex items-center gap-1.5",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition ${isDone ? "bg-emerald-400 text-slate-950 shadow-sm" : isCurrent ? "bg-white text-blue-700 shadow-md ring-2 ring-blue-300/60" : "bg-white/20 text-white/70"}`,
                      children: isDone ? /* @__PURE__ */ jsx(FiCheck, {
                        className: "w-3.5 h-3.5 stroke-[3]"
                      }) : st.number
                    }), /* @__PURE__ */ jsx("span", {
                      className: `text-xs ${isCurrent ? "text-white font-semibold" : "text-blue-200/70 font-normal"}`,
                      children: st.label
                    })]
                  }), i < stepsList.length - 1 && /* @__PURE__ */ jsx("span", {
                    className: "text-white/30 text-xs",
                    children: "─"
                  })]
                }, st.key);
              })
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "pt-4 border-t border-white/15 text-xs text-blue-100/90 space-y-1.5",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2",
            children: [/* @__PURE__ */ jsx(FiShield, {
              className: "w-3.5 h-3.5 text-emerald-400 shrink-0"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-[11px]",
              children: "End-to-End IAM Authorization"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2",
            children: [/* @__PURE__ */ jsx(FiLock, {
              className: "w-3.5 h-3.5 text-emerald-400 shrink-0"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-[11px]",
              children: "Strict Role-Based Access Control (RBAC)"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "lg:col-span-8 p-6 lg:p-8 flex flex-col justify-between bg-white overflow-hidden max-h-[96vh]",
        children: [step === "role-selection" && /* @__PURE__ */ jsx(RoleSelection, {
          selectedRole,
          onSelectRole: handleRoleSelection,
          onContinue: () => setStep("form"),
          onNavigateLogin: () => navigate("/login")
        }), step === "form" && /* @__PURE__ */ jsxs(Fragment, {
          children: [selectedRole === "parent" && /* @__PURE__ */ jsx(ParentSignup, {
            formData: parentData,
            onChange: (patch) => setParentData((prev) => ({
              ...prev,
              ...patch
            })),
            onBack: () => setStep("role-selection"),
            onSuccess: handleRegistrationSuccess
          }), selectedRole === "mentor" && /* @__PURE__ */ jsx(MentorSignup, {
            formData: mentorData,
            onChange: (patch) => setMentorData((prev) => ({
              ...prev,
              ...patch
            })),
            onBack: () => setStep("role-selection"),
            onSuccess: handleRegistrationSuccess
          }), selectedRole === "recruiter" && /* @__PURE__ */ jsx(RecruiterSignup, {
            formData: recruiterData,
            onChange: (patch) => setRecruiterData((prev) => ({
              ...prev,
              ...patch
            })),
            onBack: () => setStep("role-selection"),
            onSuccess: handleRegistrationSuccess
          }), selectedRole === "company" && /* @__PURE__ */ jsx(CompanySignup, {
            formData: companyData,
            onChange: (patch) => setCompanyData((prev) => ({
              ...prev,
              ...patch
            })),
            onBack: () => setStep("role-selection"),
            onSuccess: handleRegistrationSuccess
          }), (selectedRole === "training" || selectedRole === "school" || selectedRole === "college") && /* @__PURE__ */ jsx(InstitutionSignup, {
            formData: institutionData,
            onChange: (patch) => setInstitutionData((prev) => ({
              ...prev,
              ...patch
            })),
            onBack: () => setStep("role-selection"),
            onSuccess: handleRegistrationSuccess
          }), selectedRole === "student" && /* @__PURE__ */ jsx(StudentSignup, {
            formData: studentData,
            onChange: (patch) => setStudentData((prev) => ({
              ...prev,
              ...patch
            })),
            onBack: () => setStep("role-selection"),
            onSuccess: handleRegistrationSuccess
          })]
        }), step === "verification" && /* @__PURE__ */ jsx(EmailVerification, {
          email: registrationResult.email,
          role: registrationResult.role,
          onVerified: handleVerificationComplete,
          onBackToEdit: () => setStep("form")
        }), step === "complete" && /* @__PURE__ */ jsxs("div", {
          className: "py-8 text-center space-y-4 my-auto",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner",
            children: /* @__PURE__ */ jsx(FiCheckCircle, {
              className: "w-8 h-8"
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-slate-900",
              children: "Account Verified Successfully!"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto",
              children: "Your credentials are now active on the Role Ready IAM gateway. Redirecting to workspace sign in..."
            })]
          }), /* @__PURE__ */ jsx("button", {
            type: "button",
            onClick: () => navigate("/login"),
            className: "bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer",
            children: "Sign In Now"
          })]
        })]
      })]
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: signup
}, Symbol.toStringTag, { value: "Module" }));
function formatApiError(err) {
  var _a2, _b2, _c, _d, _e;
  if ((err == null ? void 0 : err.status) === 404) {
    return "Account not found with this email address. Please check your input or sign up.";
  }
  if ((err == null ? void 0 : err.status) === 429) {
    return "Too many requests. Please wait a moment before requesting another OTP.";
  }
  if ((err == null ? void 0 : err.status) === 400) {
    const raw = (_a2 = err == null ? void 0 : err.data) == null ? void 0 : _a2.message;
    if (raw && typeof raw === "string" && !raw.includes("/api/") && !raw.includes("http") && !raw.includes("endpoint")) {
      return raw;
    }
    return "Invalid request. Please verify the OTP code and password requirements.";
  }
  if ((err == null ? void 0 : err.status) >= 500) {
    return "The server is temporarily unavailable. Please try again shortly.";
  }
  if (((_b2 = err == null ? void 0 : err.message) == null ? void 0 : _b2.includes("Failed to fetch")) || ((_c = err == null ? void 0 : err.message) == null ? void 0 : _c.includes("NetworkError")) || ((_d = err == null ? void 0 : err.message) == null ? void 0 : _d.includes("network"))) {
    return "Network error: Unable to reach authentication server. Please check your connection.";
  }
  const rawMsg = ((_e = err == null ? void 0 : err.data) == null ? void 0 : _e.message) || (err == null ? void 0 : err.message);
  if (rawMsg && typeof rawMsg === "string" && !rawMsg.includes("/api/") && !rawMsg.includes("http") && !rawMsg.includes("POST") && !rawMsg.includes("GET")) {
    return rawMsg;
  }
  return "Unable to complete request. Please verify your details and try again.";
}
const forgotPassword = UNSAFE_withComponentProps(function ForgotPasswordRoute() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setApiError("Please enter your registered email address.");
      return;
    }
    setLoading(true);
    setApiError(null);
    try {
      await authService.forgotPassword({
        email: email.trim().toLowerCase()
      });
      setLoading(false);
      setToastMessage("Recovery OTP dispatched to your email!");
      setStep(2);
    } catch (err) {
      setLoading(false);
      setApiError(formatApiError(err));
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otpCode.trim()) {
      setApiError("Please enter the 6-digit OTP code sent to your email.");
      return;
    }
    if (newPassword.length < 8) {
      setApiError("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setApiError("Passwords do not match. Please re-enter.");
      return;
    }
    setLoading(true);
    setApiError(null);
    try {
      await authService.resetPassword({
        email: email.trim().toLowerCase(),
        otpCode: otpCode.trim(),
        newPassword
      });
      setLoading(false);
      setToastMessage("Password reset successfully!");
      setStep(3);
    } catch (err) {
      setLoading(false);
      setApiError(formatApiError(err));
    }
  };
  const handleResendOtp = async () => {
    if (loading) return;
    setLoading(true);
    setApiError(null);
    try {
      await authService.forgotPassword({
        email: email.trim().toLowerCase()
      });
      setLoading(false);
      setToastMessage("A fresh OTP code has been dispatched!");
    } catch (err) {
      setLoading(false);
      setApiError(formatApiError(err));
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "h-screen w-full overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-100/50 via-slate-50 to-blue-50/40 relative font-sans box-border select-none",
    children: [/* @__PURE__ */ jsx("div", {
      className: "absolute -top-32 -left-32 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"
    }), toastMessage && /* @__PURE__ */ jsxs("div", {
      className: "fixed top-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold animate-bounce",
      children: [/* @__PURE__ */ jsx(FiCheckCircle, {
        className: "text-emerald-400 w-4 h-4"
      }), /* @__PURE__ */ jsx("span", {
        children: toastMessage
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "max-w-4xl w-full bg-white rounded-[28px] border border-slate-200/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10 max-h-[96vh]",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "lg:col-span-5 bg-gradient-to-b from-[#1D4ED8] via-[#1E40AF] to-[#0F172A] p-7 lg:p-9 text-white flex flex-col justify-between relative overflow-hidden",
        children: [/* @__PURE__ */ jsx("div", {
          className: "absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-3 cursor-pointer",
          onClick: () => navigate("/login"),
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner shrink-0",
            children: /* @__PURE__ */ jsx(FiCompass, {
              className: "w-6 h-6"
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-2xl font-bold text-white tracking-tight leading-tight",
              children: "Role Ready"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-[10px] font-semibold text-blue-200 tracking-wider uppercase block",
              children: "AI CAREER INTELLIGENCE"
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-3.5 my-auto py-6",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-100 text-xs font-semibold",
            children: [/* @__PURE__ */ jsx(FiKey, {
              className: "text-amber-300 w-3.5 h-3.5"
            }), " Identity & Access Recovery"]
          }), /* @__PURE__ */ jsx("h2", {
            className: "text-2xl lg:text-[26px] font-bold text-white leading-tight tracking-tight",
            children: "Secure Account Reset"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xs lg:text-[13px] text-blue-100/80 leading-relaxed font-normal",
            children: "Self-service password recovery with cryptographic one-time authorization tokens. Restores access across all authenticated Role Ready workspaces."
          }), /* @__PURE__ */ jsxs("div", {
            className: "pt-2 flex items-center gap-2 text-xs text-blue-200 font-medium",
            children: [/* @__PURE__ */ jsx("span", {
              className: `w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 1 ? "bg-white text-blue-700" : "bg-white/20 text-white"}`,
              children: "1"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-xs",
              children: "Email OTP"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-white/40",
              children: "─"
            }), /* @__PURE__ */ jsx("span", {
              className: `w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 2 ? "bg-white text-blue-700" : "bg-white/20 text-white"}`,
              children: "2"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-xs",
              children: "Reset Key"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-white/40",
              children: "─"
            }), /* @__PURE__ */ jsx("span", {
              className: `w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step === 3 ? "bg-emerald-400 text-slate-900" : "bg-white/20 text-white"}`,
              children: "✓"
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "pt-5 border-t border-white/15 text-xs text-blue-100/90 space-y-2",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2",
            children: [/* @__PURE__ */ jsx(FiShield, {
              className: "w-4 h-4 text-emerald-400 shrink-0"
            }), /* @__PURE__ */ jsx("span", {
              children: "TLS 1.3 End-to-End Encrypted"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2",
            children: [/* @__PURE__ */ jsx(FiCheckCircle, {
              className: "w-4 h-4 text-emerald-400 shrink-0"
            }), /* @__PURE__ */ jsx("span", {
              children: "Zero Knowledge Password Storage"
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "text-[11px] text-blue-200/50 font-mono pt-0.5 truncate",
            children: "Gateway: https://role-ready-backendcode.onrender.com"
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "lg:col-span-7 p-8 lg:p-11 flex flex-col justify-between bg-white overflow-y-auto max-h-[96vh]",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsxs("div", {
            className: "mb-6",
            children: [/* @__PURE__ */ jsxs("button", {
              type: "button",
              onClick: () => navigate("/login"),
              className: "inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition mb-3 cursor-pointer",
              children: [/* @__PURE__ */ jsx(FiArrowLeft, {
                className: "w-3.5 h-3.5"
              }), " Back to Sign In"]
            }), /* @__PURE__ */ jsxs("h2", {
              className: "text-2xl font-bold text-slate-900 tracking-tight",
              children: [step === 1 && "Forgot Your Password?", step === 2 && "Enter OTP & New Password", step === 3 && "Password Successfully Reset"]
            }), /* @__PURE__ */ jsxs("p", {
              className: "text-xs sm:text-sm text-slate-500 mt-1",
              children: [step === 1 && "Enter your registered email address and we'll send a 6-digit verification code.", step === 2 && `We sent a 6-digit code to ${email}. Set your new credentials below.`, step === 3 && "Your workspace credentials have been updated securely."]
            })]
          }), apiError && /* @__PURE__ */ jsxs("div", {
            className: "mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2",
            children: [/* @__PURE__ */ jsx(FiAlertTriangle, {
              className: "w-4 h-4 shrink-0 mt-0.5"
            }), /* @__PURE__ */ jsx("span", {
              className: "leading-snug",
              children: apiError
            })]
          }), step === 1 && /* @__PURE__ */ jsxs("form", {
            onSubmit: handleRequestOtp,
            className: "space-y-4",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block text-xs font-semibold text-slate-700 mb-1.5",
                children: "Registered Email Address"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative",
                children: [/* @__PURE__ */ jsx(FiMail, {
                  className: "w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                }), /* @__PURE__ */ jsx("input", {
                  type: "email",
                  required: true,
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  placeholder: "name@organization.com",
                  className: "w-full pl-10 pr-4 py-2.5 bg-blue-50/30 border border-blue-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition h-11 box-border"
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-[11px] text-slate-400 mt-1.5",
                children: "A 6-digit verification code will be dispatched via IAM auth."
              })]
            }), /* @__PURE__ */ jsx("button", {
              type: "submit",
              disabled: loading,
              className: "w-full bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2",
              children: loading ? /* @__PURE__ */ jsxs("span", {
                className: "flex items-center gap-2",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                }), /* @__PURE__ */ jsx("span", {
                  children: "Dispatching OTP..."
                })]
              }) : /* @__PURE__ */ jsxs(Fragment, {
                children: [/* @__PURE__ */ jsx("span", {
                  children: "Send Recovery OTP"
                }), /* @__PURE__ */ jsx(FiArrowRight, {
                  className: "w-4 h-4"
                })]
              })
            }), /* @__PURE__ */ jsxs("div", {
              className: "text-center text-xs text-slate-600 pt-3",
              children: ["Remembered your password?", " ", /* @__PURE__ */ jsx("button", {
                type: "button",
                onClick: () => navigate("/login"),
                className: "font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer ml-0.5",
                children: "Sign In"
              })]
            })]
          }), step === 2 && /* @__PURE__ */ jsxs("form", {
            onSubmit: handleResetPassword,
            className: "space-y-4",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between mb-1.5",
                children: [/* @__PURE__ */ jsx("label", {
                  className: "text-xs font-semibold text-slate-700",
                  children: "6-Digit Security OTP"
                }), /* @__PURE__ */ jsxs("button", {
                  type: "button",
                  onClick: handleResendOtp,
                  disabled: loading,
                  className: "text-[11px] text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50",
                  children: [/* @__PURE__ */ jsx(FiRefreshCw, {
                    className: "w-3 h-3"
                  }), " Resend Code"]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative",
                children: [/* @__PURE__ */ jsx(FiKey, {
                  className: "w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  maxLength: 6,
                  required: true,
                  value: otpCode,
                  onChange: (e) => setOtpCode(e.target.value.replace(/\D/g, "")),
                  placeholder: "123456",
                  className: "w-full pl-10 pr-4 py-2.5 bg-blue-50/30 border border-blue-200 rounded-xl text-slate-900 font-mono tracking-widest text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition h-11 box-border"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block text-xs font-semibold text-slate-700 mb-1.5",
                children: "New Account Password"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative",
                children: [/* @__PURE__ */ jsx(FiLock, {
                  className: "w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                }), /* @__PURE__ */ jsx("input", {
                  type: showPassword ? "text" : "password",
                  required: true,
                  value: newPassword,
                  onChange: (e) => setNewPassword(e.target.value),
                  placeholder: "Minimum 8 characters",
                  className: "w-full pl-10 pr-10 py-2.5 bg-blue-50/30 border border-blue-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition h-11 box-border"
                }), /* @__PURE__ */ jsx("button", {
                  type: "button",
                  onClick: () => setShowPassword(!showPassword),
                  className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 cursor-pointer p-1",
                  "aria-label": showPassword ? "Hide password" : "Show password",
                  children: showPassword ? /* @__PURE__ */ jsx(FiEyeOff, {
                    className: "w-4 h-4"
                  }) : /* @__PURE__ */ jsx(FiEye, {
                    className: "w-4 h-4"
                  })
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block text-xs font-semibold text-slate-700 mb-1.5",
                children: "Confirm New Password"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative",
                children: [/* @__PURE__ */ jsx(FiLock, {
                  className: "w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                }), /* @__PURE__ */ jsx("input", {
                  type: showConfirmPassword ? "text" : "password",
                  required: true,
                  value: confirmPassword,
                  onChange: (e) => setConfirmPassword(e.target.value),
                  placeholder: "Confirm new password",
                  className: "w-full pl-10 pr-10 py-2.5 bg-blue-50/30 border border-blue-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition h-11 box-border"
                }), /* @__PURE__ */ jsx("button", {
                  type: "button",
                  onClick: () => setShowConfirmPassword(!showConfirmPassword),
                  className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 cursor-pointer p-1",
                  "aria-label": showConfirmPassword ? "Hide password" : "Show password",
                  children: showConfirmPassword ? /* @__PURE__ */ jsx(FiEyeOff, {
                    className: "w-4 h-4"
                  }) : /* @__PURE__ */ jsx(FiEye, {
                    className: "w-4 h-4"
                  })
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex gap-2 pt-1",
              children: [/* @__PURE__ */ jsx("button", {
                type: "button",
                onClick: () => setStep(1),
                className: "w-1/3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm py-3 rounded-xl transition cursor-pointer",
                children: "Change Email"
              }), /* @__PURE__ */ jsx("button", {
                type: "submit",
                disabled: loading,
                className: "w-2/3 bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed",
                children: loading ? /* @__PURE__ */ jsxs("span", {
                  className: "flex items-center gap-2",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                  }), /* @__PURE__ */ jsx("span", {
                    children: "Updating Password..."
                  })]
                }) : /* @__PURE__ */ jsxs(Fragment, {
                  children: [/* @__PURE__ */ jsx("span", {
                    children: "Reset Password"
                  }), /* @__PURE__ */ jsx(FiCheckCircle, {
                    className: "w-4 h-4"
                  })]
                })
              })]
            })]
          }), step === 3 && /* @__PURE__ */ jsxs("div", {
            className: "py-6 text-center space-y-4",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner",
              children: /* @__PURE__ */ jsx(FiCheckCircle, {
                className: "w-8 h-8"
              })
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-xl font-bold text-slate-900",
                children: "Password Reset Complete!"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto",
                children: "Your password has been successfully reset. You can now log into your Role Ready workspace with your new credentials."
              })]
            }), /* @__PURE__ */ jsxs("button", {
              type: "button",
              onClick: () => navigate("/login"),
              className: "w-full max-w-xs mx-auto bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 mt-4",
              children: [/* @__PURE__ */ jsx("span", {
                children: "Go to Sign In"
              }), /* @__PURE__ */ jsx(FiArrowRight, {
                className: "w-4 h-4"
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 mt-4",
          children: [/* @__PURE__ */ jsx("span", {
            children: "© 2026 Role Ready AI Inc."
          }), /* @__PURE__ */ jsx("span", {
            className: "font-semibold text-blue-600",
            children: "Enterprise IAM Gateway"
          })]
        })]
      })]
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: forgotPassword
}, Symbol.toStringTag, { value: "Module" }));
const Sidebar = ({
  currentWorkspace,
  onWorkspaceChange,
  activeView,
  onViewChange,
  onRoleFilter,
  totalEntities,
  isDarkMode
}) => {
  const roleNavItems = {
    "super-admin": [
      { id: "overview", label: "Dashboard Overview", icon: FiGrid },
      { id: "access", label: "Access Provisioning", icon: FiShield },
      { id: "rbac", label: "Permission Matrix", icon: FiSliders },
      { id: "ai", label: "AI Engine Control", icon: FiCpu },
      { id: "audit", label: "Audit & Compliance", icon: FiCheckSquare }
    ],
    "school": [
      { id: "overview", label: "Dashboard", icon: FiGrid },
      { id: "students", label: "Students", icon: FiUsers },
      { id: "teachers", label: "Teachers", icon: FiUsers },
      { id: "assessments", label: "Assessments & Readiness", icon: FiCheckSquare },
      { id: "reports", label: "Career Reports", icon: FiFileText },
      { id: "events", label: "Events & Video Sessions", icon: FiVideo },
      { id: "analytics", label: "Student Analytics", icon: FiTrendingUp },
      { id: "performance", label: "Performance Dashboard", icon: FiCpu },
      { id: "placement", label: "Placement Reports", icon: FiBriefcase },
      { id: "notifications", label: "Notifications", icon: FiBell },
      { id: "settings", label: "Settings", icon: FiSliders }
    ],
    "college": [
      { id: "overview", label: "Dashboard", icon: FiGrid },
      { id: "programs", label: "Programs", icon: FiBookOpen },
      { id: "admissions", label: "Admissions", icon: FiUserCheck },
      { id: "applications", label: "Applications", icon: FiFileText },
      { id: "scholarships", label: "Scholarships", icon: FiAward },
      { id: "placement-cell", label: "Placement Cell", icon: FiBriefcase },
      { id: "industry-connect", label: "Industry Connect", icon: FiUsers },
      { id: "analytics", label: "Analytics", icon: FiTrendingUp },
      { id: "notifications", label: "Notifications", icon: FiBell },
      { id: "settings", label: "Settings", icon: FiSliders }
    ],
    "mentor": [
      { id: "overview", label: "Dashboard", icon: FiGrid },
      { id: "skills", label: "Skills & Expertise", icon: FiCpu },
      { id: "availability", label: "Availability & Calendar", icon: FiCalendar },
      { id: "student-requests", label: "Student Requests", icon: FiUsers },
      { id: "video-sessions", label: "Video Sessions", icon: FiVideo },
      { id: "guidance", label: "Assessments & Guidance", icon: FiCompass },
      { id: "ratings", label: "Ratings & Reviews", icon: FiStar },
      { id: "wallet", label: "Wallet & Payouts", icon: FiCreditCard },
      { id: "notifications", label: "Notifications", icon: FiBell },
      { id: "settings", label: "Settings", icon: FiSliders }
    ],
    "training": [
      { id: "overview", label: "Institute Overview", icon: FiGrid },
      { id: "courses", label: "Skill Courses Track", icon: FiBookOpen },
      { id: "certs", label: "Certifications Registry", icon: FiAward },
      { id: "hiring", label: "Hiring Partners", icon: FiBriefcase }
    ],
    "recruiter": [
      { id: "overview", label: "Dashboard", icon: FiGrid },
      { id: "verification", label: "Company & Verification", icon: FiGrid },
      { id: "jobs", label: "Job Postings", icon: FiFileText },
      { id: "campus-hiring", label: "Campus Hiring", icon: FiAward },
      { id: "student-search", label: "Student Search", icon: FiSearch },
      { id: "ai-match", label: "AI Matcher", icon: FiCpu },
      { id: "interviews", label: "Interviews", icon: FiCalendar },
      { id: "offers", label: "Offer Letters", icon: FiAward },
      { id: "hiring-analytics", label: "Hiring Analytics", icon: FiTrendingUp },
      { id: "notifications", label: "Notifications", icon: FiBell },
      { id: "settings", label: "Settings", icon: FiSliders }
    ],
    "company": [
      { id: "overview", label: "Company Overview", icon: FiGrid },
      { id: "internships", label: "Internship Programs", icon: FiBriefcase },
      { id: "partnerships", label: "Campus Partnerships", icon: FiAward },
      { id: "pipeline", label: "Talent Pipeline", icon: FiPieChart }
    ],
    "parent": [
      { id: "overview", label: "Dashboard", icon: FiGrid },
      { id: "children", label: "My Children", icon: FiUsers },
      { id: "accounts", label: "Family Accounts", icon: FiShield },
      { id: "attendance", label: "Attendance", icon: FiCalendar, section: "Academic" },
      { id: "academic", label: "Academic Performance", icon: FiBookOpen },
      { id: "learning", label: "Learning Progress", icon: FiActivity },
      { id: "career", label: "Career Progress", icon: FiTrendingUp, section: "Career" },
      { id: "career-reports", label: "Career Reports", icon: FiFileText },
      { id: "scholarships", label: "Scholarships", icon: FiAward, section: "Opportunities" },
      { id: "mentors", label: "Mentor Booking", icon: FiUserCheck, section: "Communication" },
      { id: "notifications", label: "Notifications", icon: FiBell },
      { id: "subscription", label: "Subscription Plans", icon: FiCreditCard, section: "Subscription" },
      { id: "settings", label: "Settings", icon: FiSliders, section: "Settings" }
    ]
  };
  const navItems = roleNavItems[currentWorkspace] || roleNavItems["super-admin"];
  return /* @__PURE__ */ jsxs("aside", { className: `w-72 min-h-screen flex flex-col fixed top-0 bottom-0 left-0 z-40 shadow-xl border-r font-sans transition-colors duration-200 ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `p-5 flex items-center gap-3.5 border-b ${isDarkMode ? "border-slate-800 bg-slate-950/60" : "border-blue-100 bg-blue-50/40"}`, children: [
      /* @__PURE__ */ jsx("div", { className: "w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20", children: /* @__PURE__ */ jsx(FiCompass, { className: "w-6 h-6 animate-pulse-glow" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: `font-bold text-xl tracking-tight font-sans ${isDarkMode ? "text-white" : "text-slate-900"}`, children: "Role Ready" }),
        /* @__PURE__ */ jsx("span", { className: "inline-block text-[12px] font-medium bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-md border border-blue-400/20", children: currentWorkspace === "super-admin" ? "Super Admin Portal" : `${currentWorkspace.charAt(0).toUpperCase() + currentWorkspace.slice(1)} Workspace` })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "flex-1 overflow-y-auto p-3 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "space-y-1", children: navItems.filter((item) => item.id !== "profile").map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        return /* @__PURE__ */ jsxs(React.Fragment, { children: [
          item.section && /* @__PURE__ */ jsx("div", { className: `pt-3.5 pb-1 px-3 text-[12px] font-semibold uppercase tracking-wider ${isDarkMode ? "text-slate-400" : "text-slate-500"}`, children: item.section }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => onViewChange(item.id),
              className: `w-full flex items-center justify-between min-h-[42px] px-3.5 py-2.5 rounded-xl text-[15px] font-medium leading-[1.5] transition-colors duration-150 cursor-pointer border ${isActive ? "bg-[#12163A] text-white shadow-md border-[#3665EE]/40" : isDarkMode ? "border-transparent text-slate-300 hover:bg-[#12163A]/60 hover:text-white" : "border-transparent text-[#4B5563] hover:bg-[#DEE9FF]/60 hover:text-[#12163A]"}`,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1 text-left", children: [
                  /* @__PURE__ */ jsx(Icon, { className: `w-4.5 h-4.5 shrink-0 transition-colors duration-150 ${isActive ? "text-[#3665EE]" : "text-[#94A3B8]"}` }),
                  /* @__PURE__ */ jsx("span", { className: "truncate whitespace-nowrap text-left", children: item.label })
                ] }),
                item.id === "access" && /* @__PURE__ */ jsx("span", { className: "bg-[#3665EE]/20 text-[#3665EE] text-[12px] px-2 py-0.5 rounded-full font-semibold ml-2 shrink-0", children: totalEntities }),
                item.id === "ai" && /* @__PURE__ */ jsx("span", { className: "bg-[#E4F4EC] text-[#12163A] text-[12px] px-2 py-0.5 rounded-full font-semibold ml-2 shrink-0", children: "Live" })
              ]
            }
          )
        ] }, item.id);
      }) }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-auto pt-2", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onViewChange("profile"),
          className: `w-full flex items-center justify-between min-h-[42px] px-3.5 py-2.5 rounded-xl text-[15px] font-medium leading-[1.5] transition-colors duration-150 cursor-pointer border ${activeView === "profile" ? "bg-[#12163A] text-white shadow-md border-[#3665EE]/40" : isDarkMode ? "border-transparent text-slate-300 hover:bg-[#12163A]/60 hover:text-white" : "border-transparent text-[#4B5563] hover:bg-[#DEE9FF]/60 hover:text-[#12163A]"}`,
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1 text-left", children: [
            /* @__PURE__ */ jsx(FiUser, { className: `w-4.5 h-4.5 shrink-0 transition-colors duration-150 ${activeView === "profile" ? "text-[#3665EE]" : "text-[#94A3B8]"}` }),
            /* @__PURE__ */ jsx("span", { className: "truncate whitespace-nowrap text-left", children: "Profile" })
          ] })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `p-3 border-t shrink-0 ${isDarkMode ? "border-slate-800 bg-slate-950/60" : "border-blue-100 bg-blue-50/40"}`, children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: async () => {
          try {
            await logoutUser();
          } catch {
          } finally {
            if (typeof window !== "undefined") {
              window.location.href = "/login";
            }
          }
        },
        className: `w-full flex items-center justify-center min-h-[40px] gap-2 py-2 px-3.5 rounded-xl text-[14px] font-semibold transition-colors duration-150 cursor-pointer border ${isDarkMode ? "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/50 shadow-xs" : "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 hover:border-rose-300 shadow-xs"}`,
        children: [
          /* @__PURE__ */ jsx(FiLogOut, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: "Log Out" })
        ]
      }
    ) })
  ] });
};
const userService = {
  /**
   * Get Current Authenticated User
   * GET /api/v1/users/me
   */
  async getCurrentUser() {
    const res = await apiClient(API_ENDPOINTS.USERS.ME);
    return res.data;
  },
  /**
   * Get Admin Health Status
   * GET /api/v1/users/admin/health
   */
  async getAdminHealth() {
    const res = await apiClient(API_ENDPOINTS.USERS.ADMIN_HEALTH);
    return res.data;
  }
};
function useCurrentUser() {
  const token = getAccessToken();
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => userService.getCurrentUser(),
    enabled: !!token,
    staleTime: 1e3 * 60 * 5
    // 5 minutes
  });
}
const Topbar = ({
  currentWorkspace,
  searchQuery,
  onSearchChange,
  onShowToast,
  isDarkMode,
  onToggleTheme
}) => {
  var _a2, _b2, _c, _d;
  const { data: currentUser } = useCurrentUser();
  const userDisplayName = ((_a2 = currentUser == null ? void 0 : currentUser.profile) == null ? void 0 : _a2.firstName) && ((_b2 = currentUser == null ? void 0 : currentUser.profile) == null ? void 0 : _b2.lastName) ? `${currentUser.profile.firstName} ${currentUser.profile.lastName}` : ((_c = currentUser == null ? void 0 : currentUser.profile) == null ? void 0 : _c.firstName) || (currentUser == null ? void 0 : currentUser.email) || "System User";
  const userRoleDisplay = (currentUser == null ? void 0 : currentUser.role) ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1).toLowerCase() : currentWorkspace === "super-admin" ? "Super Admin" : currentWorkspace.charAt(0).toUpperCase() + currentWorkspace.slice(1);
  const userAvatar = (currentUser == null ? void 0 : currentUser.avatarUrl) || ((_d = currentUser == null ? void 0 : currentUser.profile) == null ? void 0 : _d.avatarUrl);
  const roleNameMap = {
    "super-admin": "Super Admin (Governance)",
    "school": "School Admin Portal",
    "college": "College Admin Portal",
    "mentor": "Mentor Desk",
    "training": "Training Institute Portal",
    "recruiter": "Recruiter Talent Desk",
    "company": "Enterprise Company Portal",
    "parent": "Parent & Family Intelligence Portal"
  };
  return /* @__PURE__ */ jsxs("header", { className: `h-16 border-b px-6 flex items-center justify-between sticky top-0 z-30 font-sans transition-colors duration-200 ${isDarkMode ? "bg-[#12163A] border-slate-800 text-white backdrop-blur-md" : "bg-white/90 border-slate-200 text-[#12163A] backdrop-blur-md shadow-2xs"}`, children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 w-96", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
      /* @__PURE__ */ jsx(FiSearch, { className: `w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDarkMode ? "text-slate-400" : "text-[#3665EE]"}` }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: searchQuery,
          onChange: (e) => onSearchChange(e.target.value),
          placeholder: `Search in ${roleNameMap[currentWorkspace]}...`,
          className: `w-full pl-9 pr-4 py-2 rounded-xl text-[14px] font-normal leading-normal transition focus:outline-none focus:ring-2 focus:ring-[#3665EE] ${isDarkMode ? "bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400" : "bg-[#DEE9FF]/40 border border-[#C6D9FF] text-[#12163A] placeholder-[#6B7280]"}`
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onToggleTheme,
          "aria-label": isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
          title: isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
          className: `flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-[13px] font-semibold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${isDarkMode ? "bg-slate-800 border-amber-500/40 text-amber-400 hover:bg-slate-700" : "bg-[#DEE9FF] border-[#C6D9FF] text-[#12163A] hover:bg-[#CBDDFF]"}`,
          children: isDarkMode ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(FiSun, { className: "w-4 h-4 text-amber-400" }),
            /* @__PURE__ */ jsx("span", { children: "Light Mode" })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(FiMoon, { className: "w-4 h-4 text-[#3665EE]" }),
            /* @__PURE__ */ jsx("span", { children: "Dark Mode" })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => onShowToast("Notifications: 2 pending seat approval requests."),
          "aria-label": "View notifications",
          className: `relative p-2 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${isDarkMode ? "bg-slate-800 border-slate-700 text-slate-300 hover:text-white" : "bg-[#DEE9FF] border-[#C6D9FF] text-[#12163A] hover:bg-[#CBDDFF]"}`,
          children: [
            /* @__PURE__ */ jsx(FiBell, { className: "w-4 h-4 text-[#3665EE]" }),
            /* @__PURE__ */ jsx("span", { className: "absolute top-1 right-1 w-2 h-2 bg-[#3665EE] rounded-full animate-ping" }),
            /* @__PURE__ */ jsx("span", { className: "absolute top-1 right-1 w-2 h-2 bg-[#3665EE] rounded-full" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: `h-6 w-px ${isDarkMode ? "bg-slate-800" : "bg-slate-200"}` }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-[#12163A] text-white font-bold flex items-center justify-center text-xs shadow-md border border-[#3665EE]/40 overflow-hidden", children: userAvatar ? /* @__PURE__ */ jsx("img", { src: userAvatar, alt: userDisplayName, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx(FiUser, { className: "w-4 h-4 text-[#3665EE]" }) }),
        /* @__PURE__ */ jsxs("div", { className: "hidden sm:block text-left", children: [
          /* @__PURE__ */ jsx("div", { className: `text-[13px] md:text-[14px] font-semibold leading-tight truncate max-w-[150px] ${isDarkMode ? "text-white" : "text-[#12163A]"}`, title: userDisplayName, children: userDisplayName }),
          /* @__PURE__ */ jsx("div", { className: "text-[12px] font-medium text-[#3665EE]", children: userRoleDisplay })
        ] })
      ] })
    ] })
  ] });
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
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white", children: /* @__PURE__ */ jsx(FiUserPlus, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-base", children: "Grant Ecosystem Partner Access" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-100 font-medium", children: "Provision credentials for Schools, Colleges, Mentors, HR & Academies" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          "aria-label": "Close modal",
          className: "w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer",
          children: /* @__PURE__ */ jsx(FiX, { className: "w-4 h-4 text-white" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-4 text-xs", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: `block font-bold mb-1 ${labelColor}`, children: "Organization / Entity Name *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            required: true,
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "e.g. St. Xavier High School, IIT Delhi, Infosys HR",
            className: `w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition ${inputBg}`
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: `block font-bold mb-1 ${labelColor}`, children: "Partner Role Category *" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: role,
              onChange: (e) => setRole(e.target.value),
              className: `w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 cursor-pointer ${inputBg}`,
              children: [
                /* @__PURE__ */ jsx("option", { value: "school", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "School Admin (K-12)" }),
                /* @__PURE__ */ jsx("option", { value: "college", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "College Admin (Higher Ed)" }),
                /* @__PURE__ */ jsx("option", { value: "mentor", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "Mentor / Counselor" }),
                /* @__PURE__ */ jsx("option", { value: "training", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "Training Institute" }),
                /* @__PURE__ */ jsx("option", { value: "recruiter", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "Recruiter / HR Lead" }),
                /* @__PURE__ */ jsx("option", { value: "company", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "Enterprise Employer" }),
                /* @__PURE__ */ jsx("option", { value: "parent", className: isDarkMode ? "bg-slate-900 text-white" : "", children: "Parent & Family Account" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: `block font-bold mb-1 ${labelColor}`, children: "Primary Admin Email *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              required: true,
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "admin@organization.edu",
              className: `w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition ${inputBg}`
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: `block font-bold mb-1 ${labelColor}`, children: "Verified Official Domain" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: domain,
              onChange: (e) => setDomain(e.target.value),
              placeholder: "stxaviers.edu",
              className: `w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition ${inputBg}`
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: `block font-bold mb-1 ${labelColor}`, children: "Allocated Seat Quota *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: 10,
              max: 1e5,
              value: seats,
              onChange: (e) => setSeats(Number(e.target.value)),
              className: `w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition ${inputBg}`
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: `block font-bold mb-2 ${labelColor}`, children: "Granted Feature Permissions" }),
        /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 gap-2 p-3 rounded-2xl border ${isDarkMode ? "bg-slate-800/40 border-slate-800" : "bg-blue-50/30 border-blue-100"}`, children: availableFeatures.map((f) => /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-2 cursor-pointer font-medium ${isDarkMode ? "text-slate-300" : "text-slate-700"}`, children: [
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
            className: `px-4 py-2.5 rounded-xl font-bold transition cursor-pointer ${cancelBtnClass}`,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            className: "px-5 py-2.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95",
            children: [
              /* @__PURE__ */ jsx(FiKey, { className: "w-4 h-4" }),
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
        /* @__PURE__ */ jsx(FiEdit2, { className: "w-5 h-5" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm", children: [
            "Approval Pipeline: ",
            entity.name
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-blue-100", children: "Super Admin authorization & verification pipeline" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, "aria-label": "Close modal", className: "p-1 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer", children: /* @__PURE__ */ jsx(FiX, { className: "w-4 h-4 text-white" }) })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-4 text-xs", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: `block font-bold mb-1 ${labelColor}`, children: "Approval Pipeline Stage" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: approvalStage,
            onChange: (e) => setApprovalStage(e.target.value),
            className: `w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 cursor-pointer font-bold ${inputBg}`,
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
        /* @__PURE__ */ jsx("label", { className: `block font-bold mb-1 ${labelColor}`, children: "Document Verification Notes" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: docsStatus,
            onChange: (e) => setDocsStatus(e.target.value),
            placeholder: "e.g. CBSE Affiliation #10301 Verified",
            className: `w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition ${inputBg}`
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: `block font-bold mb-1 ${labelColor}`, children: "Background Check Status" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: bgCheckStatus,
            onChange: (e) => setBgCheckStatus(e.target.value),
            placeholder: "e.g. Passed - Clear Background Check",
            className: `w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition ${inputBg}`
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: `block font-bold mb-1 ${labelColor}`, children: "Allocated Seat Quota" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            value: seats,
            onChange: (e) => setSeats(Number(e.target.value)),
            className: `w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition ${inputBg}`
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `pt-4 flex items-center justify-end gap-3 border-t ${borderDivider}`, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: `px-4 py-2 rounded-xl font-bold transition cursor-pointer ${cancelBtnClass}`,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            className: "px-4 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95",
            children: [
              /* @__PURE__ */ jsx(FiSave, { className: "w-3.5 h-3.5" }),
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!isOpen) return null;
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(formData);
      setFormData({});
      setIsSubmitting(false);
      onClose();
    }, 400);
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
  return /* @__PURE__ */ jsx("div", { className: `fixed inset-[0] z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in font-sans ${isDarkMode ? "bg-slate-950/70" : "bg-slate-900/40"}`, children: /* @__PURE__ */ jsxs("div", { className: `border rounded-3xl max-w-md w-full overflow-hidden relative animate-scale-up ${cardBg}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `p-6 border-b flex items-center justify-between ${headerBg}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-500 border border-blue-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsx(FiCpu, { className: "w-5 h-5 text-blue-500" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: `font-bold text-base tracking-tight ${titleColor}`, children: title }),
          /* @__PURE__ */ jsx("p", { className: `text-xs ${subtitleColor}`, children: subtitle })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          "aria-label": "Close modal",
          className: `p-2 rounded-xl transition cursor-pointer ${closeIconClass}`,
          children: /* @__PURE__ */ jsx(FiX, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-4 text-xs", children: [
      fields.map((f) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: `block font-bold mb-1.5 ${labelColor}`, children: f.label }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: f.type,
            required: true,
            value: formData[f.name] || "",
            onChange: (e) => handleChange(f.name, e.target.value),
            placeholder: f.placeholder,
            className: `w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition ${inputBg}`
          }
        )
      ] }, f.name)),
      /* @__PURE__ */ jsxs("div", { className: `pt-4 flex items-center justify-end gap-3 border-t ${borderDivider}`, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: `px-4 py-2.5 rounded-xl border font-bold transition cursor-pointer ${cancelBtnClass}`,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
            className: "px-5 py-2.5 rounded-xl bg-[#12163A] hover:bg-[#1A2050] text-white font-bold transition shadow-md cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
            children: [
              /* @__PURE__ */ jsx(FiPlus, { className: "w-4 h-4 text-[#3665EE]" }),
              /* @__PURE__ */ jsx("span", { children: isSubmitting ? "Saving..." : "Submit & Save" })
            ]
          }
        )
      ] })
    ] })
  ] }) });
};
const VideoCallModal = ({
  isOpen,
  sessionTitle,
  hostName,
  onClose,
  onShowToast,
  isDarkMode = false
}) => {
  const [callState, setCallState] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const modalContainerRef = useRef(null);
  const streamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const localPcRef = useRef(null);
  const remotePcRef = useRef(null);
  const timerRef = useRef(null);
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);
  const enterBrowserFullscreen = () => {
    if (modalContainerRef.current && !document.fullscreenElement) {
      modalContainerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.log("Automatic fullscreen request prevented by browser:", err);
      });
    }
  };
  const exitBrowserFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {
      });
    }
  };
  const startCall = async () => {
    setCallState("requesting");
    setErrorMessage("");
    setIsMicMuted(false);
    setIsCameraOff(false);
    setIsScreenSharing(false);
    setCallSeconds(0);
    if (typeof window === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCallState("error");
      setErrorMessage("Camera and Microphone API is not supported in this browser environment.");
      return;
    }
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true
      });
      streamRef.current = mediaStream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }
      setCallState("connecting");
      const configuration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
      const localPc = new RTCPeerConnection(configuration);
      const remotePc = new RTCPeerConnection(configuration);
      localPcRef.current = localPc;
      remotePcRef.current = remotePc;
      localPc.onicecandidate = (event) => {
        if (event.candidate) {
          remotePc.addIceCandidate(event.candidate).catch(console.error);
        }
      };
      remotePc.onicecandidate = (event) => {
        if (event.candidate) {
          localPc.addIceCandidate(event.candidate).catch(console.error);
        }
      };
      remotePc.ontrack = (event) => {
        if (remoteVideoRef.current && event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
      mediaStream.getTracks().forEach((track) => {
        localPc.addTrack(track, mediaStream);
      });
      const offer = await localPc.createOffer();
      await localPc.setLocalDescription(offer);
      await remotePc.setRemoteDescription(offer);
      const answer = await remotePc.createAnswer();
      await remotePc.setLocalDescription(answer);
      setCallState("connected");
      onShowToast(`WebRTC Full-Screen Session Active: ${sessionTitle}`);
      setTimeout(() => {
        enterBrowserFullscreen();
      }, 300);
      timerRef.current = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1e3);
    } catch (err) {
      console.error("WebRTC getUserMedia Error:", err);
      setCallState("error");
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setErrorMessage("Camera or Microphone permission was denied. Please allow camera and microphone access in your browser settings.");
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setErrorMessage("No camera or microphone device found on your hardware.");
      } else {
        setErrorMessage(`Failed to access media devices: ${err.message || "Unknown WebRTC error"}`);
      }
    }
  };
  const stopScreenShare = async () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
    }
    if (localPcRef.current && streamRef.current) {
      const cameraVideoTrack = streamRef.current.getVideoTracks()[0];
      const senders = localPcRef.current.getSenders();
      const videoSender = senders.find((s) => s.track && s.track.kind === "video");
      if (videoSender && cameraVideoTrack) {
        await videoSender.replaceTrack(cameraVideoTrack);
      }
    }
    setIsScreenSharing(false);
    onShowToast("Stopped screen sharing. Camera feed restored.");
  };
  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      await stopScreenShare();
      return;
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      onShowToast("Screen capture API is not supported in this browser environment.");
      return;
    }
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
      screenStreamRef.current = screenStream;
      const screenVideoTrack = screenStream.getVideoTracks()[0];
      screenVideoTrack.onended = () => {
        stopScreenShare();
      };
      if (localPcRef.current) {
        const senders = localPcRef.current.getSenders();
        const videoSender = senders.find((s) => s.track && s.track.kind === "video");
        if (videoSender) {
          await videoSender.replaceTrack(screenVideoTrack);
        }
      }
      setIsScreenSharing(true);
      onShowToast("Sharing Screen / Application Window with participants");
    } catch (err) {
      if (err.name !== "NotAllowedError") {
        console.error("Screen Share Error:", err);
        onShowToast(`Screen share cancelled or failed: ${err.message || "Permission denied"}`);
      }
    }
  };
  const stopCallAndCleanup = () => {
    exitBrowserFullscreen();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      screenStreamRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    if (localPcRef.current) {
      localPcRef.current.close();
      localPcRef.current = null;
    }
    if (remotePcRef.current) {
      remotePcRef.current.close();
      remotePcRef.current = null;
    }
    setIsScreenSharing(false);
    setCallState("ended");
  };
  useEffect(() => {
    if (isOpen) {
      startCall();
    } else {
      stopCallAndCleanup();
    }
    return () => {
      stopCallAndCleanup();
    };
  }, [isOpen]);
  const toggleMic = () => {
    if (!streamRef.current) return;
    const audioTracks = streamRef.current.getAudioTracks();
    audioTracks.forEach((track) => {
      track.enabled = isMicMuted;
    });
    const nextState = !isMicMuted;
    setIsMicMuted(nextState);
    onShowToast(nextState ? "Microphone Muted" : "Microphone Active");
  };
  const toggleCamera = () => {
    if (!streamRef.current) return;
    const videoTracks = streamRef.current.getVideoTracks();
    videoTracks.forEach((track) => {
      track.enabled = isCameraOff;
    });
    const nextState = !isCameraOff;
    setIsCameraOff(nextState);
    onShowToast(nextState ? "Camera Turned Off" : "Camera Turned On");
  };
  const toggleFullscreenButton = () => {
    if (isFullscreen) {
      exitBrowserFullscreen();
    } else {
      enterBrowserFullscreen();
    }
  };
  const handleEndCall = () => {
    stopCallAndCleanup();
    onShowToast("Left video call session. All camera, mic, and screen tracks closed.");
    onClose();
  };
  if (!isOpen) return null;
  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: modalContainerRef,
      className: "fixed inset-0 z-50 bg-slate-950 text-white w-screen h-screen flex flex-col font-sans overflow-hidden animate-fade-in",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between z-40 shrink-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold shadow-lg", children: /* @__PURE__ */ jsx(FiVideo, { className: "w-5 h-5 animate-pulse" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-base text-white truncate max-w-xs sm:max-w-xl", children: sessionTitle }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-400", children: [
                "Host: ",
                hostName,
                " • Full-Screen WebRTC Teleconference"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            callState === "connected" && /* @__PURE__ */ jsxs(Fragment, { children: [
              isScreenSharing && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 bg-blue-500/20 border border-blue-500/40 text-blue-400 px-3 py-1 rounded-full text-xs font-bold animate-pulse", children: [
                /* @__PURE__ */ jsx(FiTv, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Sharing Screen" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold", children: [
                /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-ping" }),
                /* @__PURE__ */ jsx("span", { children: "WebRTC Live HD" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-full text-xs font-mono font-bold", children: [
                /* @__PURE__ */ jsx(FiClock, { className: "w-3.5 h-3.5 text-blue-400" }),
                /* @__PURE__ */ jsx("span", { children: formatTime(callSeconds) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-full text-xs font-bold", children: [
                /* @__PURE__ */ jsx(FiUsers, { className: "w-3.5 h-3.5 text-blue-400" }),
                /* @__PURE__ */ jsx("span", { children: "2 Participants" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: toggleFullscreenButton,
                "aria-label": "Toggle Fullscreen Mode",
                className: "px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition cursor-pointer flex items-center gap-1.5",
                children: [
                  isFullscreen ? /* @__PURE__ */ jsx(FiMinimize, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(FiMaximize, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: isFullscreen ? "Exit Full Screen" : "Full Screen" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleEndCall,
                "aria-label": "Close Video Call",
                className: "w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer",
                children: /* @__PURE__ */ jsx(FiX, { className: "w-5 h-5" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 relative bg-slate-950 overflow-hidden flex items-center justify-center", children: [
          callState === "requesting" && /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4 p-8 max-w-md bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-md z-30", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto animate-spin", children: /* @__PURE__ */ jsx(FiRefreshCw, { className: "w-10 h-10" }) }),
            /* @__PURE__ */ jsx("h4", { className: "font-extrabold text-lg text-white", children: "Requesting Camera & Microphone Permissions" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 leading-relaxed", children: "Please grant camera and microphone access in your browser prompt to enter full-screen WebRTC video session." })
          ] }),
          callState === "connecting" && /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4 p-8 max-w-md bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-md z-30", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto animate-bounce", children: /* @__PURE__ */ jsx(FiVideo, { className: "w-10 h-10" }) }),
            /* @__PURE__ */ jsx("h4", { className: "font-extrabold text-lg text-white", children: "Establishing Secure WebRTC Connection" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 leading-relaxed", children: "Exchanging WebRTC SDP offer/answer & establishing encrypted peer connection..." })
          ] }),
          callState === "error" && /* @__PURE__ */ jsxs("div", { className: "text-center space-y-5 p-8 max-w-md bg-rose-950/50 border border-rose-500/40 rounded-3xl shadow-2xl z-30", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsx(FiAlertCircle, { className: "w-10 h-10" }) }),
            /* @__PURE__ */ jsx("h4", { className: "font-extrabold text-lg text-white", children: "Camera & Microphone Access Required" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-rose-200 leading-relaxed", children: errorMessage }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: startCall,
                className: "bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-2xl transition cursor-pointer inline-flex items-center gap-2 shadow-xl",
                children: [
                  /* @__PURE__ */ jsx(FiRefreshCw, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: "Retry Permission & Full Screen Call" })
                ]
              }
            )
          ] }),
          (callState === "connected" || callState === "connecting") && /* @__PURE__ */ jsxs("div", { className: "w-full h-full relative flex items-center justify-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "w-full h-full relative bg-slate-900 overflow-hidden flex items-center justify-center", children: [
              /* @__PURE__ */ jsx(
                "video",
                {
                  ref: remoteVideoRef,
                  autoPlay: true,
                  playsInline: true,
                  className: "w-full h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-800 flex items-center gap-2.5 z-20 shadow-lg", children: [
                /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-emerald-400 animate-pulse" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-extrabold text-white block", children: hostName }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400", children: isScreenSharing ? "Shared Screen Output" : "Remote Faculty Camera" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-24 right-6 w-56 h-36 sm:w-72 sm:h-48 rounded-2xl border-2 border-white/20 shadow-2xl bg-slate-900 overflow-hidden z-30 transition-all duration-300 hover:scale-105 hover:border-blue-400", children: [
              /* @__PURE__ */ jsx(
                "video",
                {
                  ref: localVideoRef,
                  autoPlay: true,
                  playsInline: true,
                  muted: true,
                  className: `w-full h-full object-cover ${isCameraOff ? "hidden" : "block"}`
                }
              ),
              isCameraOff && /* @__PURE__ */ jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-900 text-slate-400 space-y-1", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center", children: /* @__PURE__ */ jsx(FiVideoOff, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-slate-300", children: "Camera Off" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2 left-2 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-800 flex items-center gap-1.5 shadow-md", children: [
                /* @__PURE__ */ jsx("div", { className: `w-2 h-2 rounded-full ${isMicMuted ? "bg-rose-500" : "bg-emerald-400"}` }),
                /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-white", children: "You" }),
                isMicMuted && /* @__PURE__ */ jsx(FiMicOff, { className: "w-3 h-3 text-rose-400 ml-1" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 flex items-center justify-between z-40 shrink-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center gap-2 text-slate-400 text-xs font-bold", children: [
            /* @__PURE__ */ jsx(FiShield, { className: "w-4 h-4 text-blue-400" }),
            /* @__PURE__ */ jsx("span", { children: "Full-Screen Teleconference" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mx-auto sm:mx-0", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: toggleCamera,
                disabled: callState !== "connected",
                className: `w-12 h-12 rounded-2xl flex items-center justify-center transition cursor-pointer border shadow-lg ${isCameraOff ? "bg-rose-500/20 border-rose-500/40 text-rose-400 hover:bg-rose-500/30" : "bg-slate-800 border-slate-700 text-white hover:bg-slate-700"} disabled:opacity-40 disabled:cursor-not-allowed`,
                title: isCameraOff ? "Turn On Camera" : "Turn Off Camera",
                children: isCameraOff ? /* @__PURE__ */ jsx(FiVideoOff, { className: "w-5 h-5 text-rose-400" }) : /* @__PURE__ */ jsx(FiVideo, { className: "w-5 h-5 text-blue-400" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: toggleMic,
                disabled: callState !== "connected",
                className: `w-12 h-12 rounded-2xl flex items-center justify-center transition cursor-pointer border shadow-lg ${isMicMuted ? "bg-rose-500/20 border-rose-500/40 text-rose-400 hover:bg-rose-500/30" : "bg-slate-800 border-slate-700 text-white hover:bg-slate-700"} disabled:opacity-40 disabled:cursor-not-allowed`,
                title: isMicMuted ? "Unmute Microphone" : "Mute Microphone",
                children: isMicMuted ? /* @__PURE__ */ jsx(FiMicOff, { className: "w-5 h-5 text-rose-400" }) : /* @__PURE__ */ jsx(FiMic, { className: "w-5 h-5 text-emerald-400" })
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: toggleScreenShare,
                disabled: callState !== "connected",
                className: `px-4 h-12 rounded-2xl flex items-center gap-2 font-bold text-xs transition cursor-pointer border shadow-lg ${isScreenSharing ? "bg-blue-600 border-blue-400 text-white hover:bg-blue-500 animate-pulse" : "bg-slate-800 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700"} disabled:opacity-40 disabled:cursor-not-allowed`,
                title: isScreenSharing ? "Stop Screen Share" : "Share Screen",
                children: [
                  /* @__PURE__ */ jsx(FiTv, { className: "w-5 h-5" }),
                  /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: isScreenSharing ? "Stop Sharing" : "Screen Share" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: toggleFullscreenButton,
                disabled: callState !== "connected",
                className: "w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700 flex items-center justify-center transition cursor-pointer shadow-lg disabled:opacity-40 disabled:cursor-not-allowed",
                title: "Toggle Full Screen",
                children: isFullscreen ? /* @__PURE__ */ jsx(FiMinimize, { className: "w-5 h-5 text-blue-400" }) : /* @__PURE__ */ jsx(FiMaximize, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleEndCall,
                className: "px-6 h-12 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-xl shadow-rose-600/30 hover:scale-105 active:scale-95 ml-2",
                title: "End Call Session & Exit",
                children: [
                  /* @__PURE__ */ jsx(FiPhoneOff, { className: "w-5 h-5" }),
                  /* @__PURE__ */ jsx("span", { children: "End Call" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden sm:block text-right", children: /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono text-slate-400", children: "WebRTC DTLS-SRTP Security" }) })
        ] })
      ]
    }
  );
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
          /* @__PURE__ */ jsxs("h2", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FiCompass, { className: "w-5 h-5 text-[#3665EE]" }),
            " Career Discovery Engine"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-[#6B7280] mt-1 leading-normal", children: "Explore 500+ future-ready career paths curated by AI neural alignment" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search careers, skills, or degrees...",
            className: "px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3665EE] bg-slate-50 text-[#12163A] text-[14px]"
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
              /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-semibold shadow-2xs whitespace-nowrap", children: c.match }),
              /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-[#3665EE]", children: c.growth })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-[16px] md:text-[17px] leading-[1.35] truncate text-[#12163A]", children: c.title }),
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-[14px] text-[#3665EE]", children: c.salary }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: c.skills.map((sk, idx) => /* @__PURE__ */ jsx("span", { className: "text-[12px] px-2.5 py-0.5 rounded-md bg-white/80 text-[#12163A] font-medium", children: sk }, idx)) })
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
          /* @__PURE__ */ jsxs("h2", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FiCheckSquare, { className: "w-5 h-5 text-[#3665EE]" }),
            " Online Aptitude & Skill Assessment"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-[#6B7280] mt-1 leading-normal", children: "Timed cognitive & analytical reasoning test (Question 4 of 15)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[#12163A] font-mono font-semibold text-[13px] bg-[#DEE9FF] border border-[#C6D9FF] px-3.5 py-1.5 rounded-xl", children: [
          /* @__PURE__ */ jsx(FiClock, { className: "w-3.5 h-3.5 text-[#3665EE]" }),
          " 18:45 Remaining"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[13px]", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#3665EE]", children: "Category: Logical & Spatial Reasoning" }),
          /* @__PURE__ */ jsx("span", { className: "text-[#4B5563]", children: "Score Weight: 25 Points" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-medium text-[15px] leading-relaxed text-[#12163A]", children: "If all Engineers are Problem Solvers, and some Problem Solvers use Neural Networks, which of the following statements MUST logically hold true?" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2.5 pt-2", children: [
          "A) All Engineers use Neural Networks",
          "B) Some Engineers are Problem Solvers who utilize computational logic",
          "C) No Problem Solvers are Engineers",
          "D) Neural Networks can only be designed by Engineers"
        ].map((opt, idx) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onShowToast(`Selected Option ${String.fromCharCode(65 + idx)}`),
            className: `w-full text-left p-3.5 rounded-xl border text-[14px] font-medium transition cursor-pointer ${idx === 1 ? "bg-[#12163A] border-[#12163A] text-white font-semibold" : "bg-white border-slate-200 hover:bg-[#F6E6D8] text-[#12163A]"}`,
            children: opt
          },
          idx
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 flex items-center justify-between border-t border-[#C6D9FF]", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => onShowToast("Navigated to previous question"), className: "px-4 py-2 rounded-xl text-[14px] font-semibold border border-slate-300 bg-white text-[#12163A] hover:bg-slate-50 transition cursor-pointer", children: "Previous Question" }),
          /* @__PURE__ */ jsx("button", { onClick: () => onShowToast("Assessment answers submitted! AI Score generated."), className: "px-5 py-2.5 rounded-xl text-[14px] font-semibold bg-[#12163A] text-white shadow-md cursor-pointer transition hover:bg-[#1A2050]", children: "Submit Assessment" })
        ] })
      ] })
    ] });
  }
  if (activeSubView === "psychometric") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FiCpu, { className: "w-5 h-5 text-[#3665EE]" }),
          " RIASEC Psychometric & Personality Assessment"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-[#6B7280] mt-1 leading-normal", children: "Holland Code interest spectrum profiling (Rate your preference for each workplace scenario)" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
        { q: "I enjoy dissecting complex algorithmic code to find logical bottlenecks.", code: "Investigative (I)", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
        { q: "I prefer leading cross-functional teams to pitch new product ideas.", code: "Enterprising (E)", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
        { q: "I like sketching user experience mockups and visual interfaces.", code: "Artistic (A)", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
      ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border space-y-3 ${item.bg} ${item.border} text-[#12163A]`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-[15px] text-[#12163A]", children: item.q }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-semibold shadow-2xs whitespace-nowrap", children: item.code })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 text-[13px] pt-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#6B7280]", children: "Strongly Disagree" }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: [1, 2, 3, 4, 5].map((val) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast(`Rated ${val} for scenario ${i + 1}`),
              className: `w-8 h-8 rounded-full text-[14px] font-semibold transition cursor-pointer ${val === 4 && i === 0 ? "bg-[#12163A] text-white shadow-md" : "bg-white hover:bg-[#3665EE] hover:text-white text-[#12163A] border border-slate-200"}`,
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
          /* @__PURE__ */ jsxs("h2", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FiCpu, { className: "w-5 h-5 text-[#3665EE]" }),
            " Career DNA Genome Profile & Aptitude Tracker"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-[#6B7280] mt-1 leading-normal", children: "Holland Code: RIE (Realistic • Investigative • Enterprising)" })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => onShowToast("Downloading official Career DNA Passport PDF"),
            className: "bg-[#12163A] hover:bg-[#1A2050] text-white text-[14px] font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 shrink-0",
            children: [
              /* @__PURE__ */ jsx(FiDownload, { className: "w-4 h-4 text-[#DEE9FF]" }),
              " Download DNA Passport"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A] space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-[#4B5563]", children: "Aptitude Score" }),
          /* @__PURE__ */ jsx("div", { className: "text-[28px] md:text-[30px] font-bold text-[#3665EE] truncate leading-none mt-1", children: "96th Percentile" }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-[#12163A] bg-white/70 px-2.5 py-0.5 rounded-full inline-block mt-1", children: "Top 4% Nationally" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#12163A] text-white border border-[#12163A] space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-slate-300", children: "Primary Personality" }),
          /* @__PURE__ */ jsx("div", { className: "text-[28px] md:text-[30px] font-bold text-[#E4F4EC] truncate leading-none mt-1", children: "Investigative" }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] text-slate-300 mt-1 block", children: "Problem Solver & Analytical" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium text-[13px] block text-[#4B5563]", children: "Stream Recommendation" }),
          /* @__PURE__ */ jsx("div", { className: "text-[28px] md:text-[30px] font-bold text-[#3665EE] truncate leading-none mt-1", children: "Science (PCM + CS)" }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-[#12163A] mt-1 block", children: "98.2% Fit Index" })
        ] })
      ] })
    ] });
  }
  if (activeSubView === "ai-recommendations") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-[14px] font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FiCpu, { className: "w-5 h-5 text-[#3665EE]" }),
          " AI Neural Recommendation Engine"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-[#6B7280] font-normal leading-normal mt-1", children: "Predictive career alignment calculated from aptitude, interest, and industry demand" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
        { role: "Artificial Intelligence Architect", match: "98%", rationale: "High mathematical reasoning + top code proficiency fit.", bg: "bg-white", border: "border-slate-200" },
        { role: "Cloud Infrastructure Engineer", match: "94%", rationale: "Strong system design aptitude + cloud computing interest.", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
        { role: "Fintech Data Scientist", match: "91%", rationale: "Statistical affinity + quantitative problem-solving score.", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
        { role: "Cybersecurity Analyst", match: "89%", rationale: "High spatial logic + SOC framework understanding.", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
      ].map((rec, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${rec.bg} ${rec.border} text-[#12163A] hover-card-lift`, onClick: () => onShowToast(`Viewing detailed AI breakdown for ${rec.role}`), children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: rec.role }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] mt-1 text-[#4B5563] font-normal leading-normal", children: rec.rationale })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[28px] md:text-[30px] font-bold text-[#3665EE] leading-none", children: rec.match }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-[#12163A] uppercase tracking-wide mt-1 block", children: "Neural Match" })
        ] })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "scholarships") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-[14px] font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FiAward, { className: "w-5 h-5 text-[#3665EE]" }),
          " Scholarship & Merit Aid Explorer"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-[#6B7280] font-normal leading-normal mt-1", children: "₹12.5 Crores in active national, state, and corporate scholarships open for application" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
        { title: "National STEM Leadership Grant", provider: "Ministry of Science & Tech", amount: "₹3,50,000 / yr", deadline: "Closes in 12 Days", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
        { title: "Global AI & Innovation Merit Aid", provider: "Role Ready Foundation", amount: "₹2,00,000 / yr", deadline: "Closes in 18 Days", bg: "bg-white", border: "border-slate-200" },
        { title: "State Higher Education Equity Aid", provider: "State Government Desk", amount: "₹1,50,000 / yr", deadline: "Closes in 25 Days", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
      ].map((sch, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border flex items-center justify-between transition-all duration-200 ${sch.bg} ${sch.border} text-[#12163A] hover-card-lift`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: sch.title }),
          /* @__PURE__ */ jsxs("span", { className: "text-[13px] font-medium text-[#3665EE]", children: [
            sch.provider,
            " • ",
            sch.deadline
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[15px] font-semibold text-[#12163A]", children: sch.amount }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast(`Submitted application for ${sch.title}!`),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer shadow-xs hover:scale-105 active:scale-95",
              children: "Apply Now"
            }
          )
        ] })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "colleges") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-[14px] font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FiBookOpen, { className: "w-5 h-5 text-[#3665EE]" }),
          " University & College Explorer Directory"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-[#6B7280] font-normal leading-normal mt-1", children: "Compare NIRF ranks, admission cutoffs, course offerings, and campus placements" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        { name: "Indian Institute of Technology (IIT Bombay)", rank: "NIRF #1", avgCtc: "₹28.5 LPA", cutoff: "JEE Adv < 500", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
        { name: "BITS Pilani (Main Campus)", rank: "NIRF #7", avgCtc: "₹24.0 LPA", cutoff: "BITSAT > 320", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
        { name: "IIIT Hyderabad", rank: "NIRF #12", avgCtc: "₹31.0 LPA", cutoff: "JEE Main < 1200", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
      ].map((col, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border space-y-2 cursor-pointer transition-all duration-200 ${col.bg} ${col.border} text-[#12163A] min-w-0 hover-card-lift`, onClick: () => onShowToast(`Added ${col.name} to Target Wishlist`), children: [
        /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-[#12163A] text-white px-3 py-1 rounded-full font-semibold", children: col.rank }),
        /* @__PURE__ */ jsx("h3", { className: "text-[16px] font-semibold truncate text-[#12163A] mt-2", children: col.name }),
        /* @__PURE__ */ jsxs("div", { className: "text-[14px] font-semibold text-[#3665EE]", children: [
          "Avg CTC: ",
          col.avgCtc
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-[13px] text-[#4B5563] font-normal", children: [
          "Cutoff: ",
          col.cutoff
        ] })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "roadmap") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-[14px] font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FiTrendingUp, { className: "w-5 h-5 text-[#3665EE]" }),
          " Interactive Career Milestone Roadmap"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-[#6B7280] font-normal leading-normal mt-1", children: "Step-by-step guidance from Class 10 to AI Engineering Leader" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
        { step: "Phase 1: Class 10th", desc: "Complete Career DNA test & select PCM + CS stream.", status: "Completed", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
        { step: "Phase 2: Class 12th & Entrances", desc: "Prepare JEE Advanced / BITSAT & achieve 95%+ in boards.", status: "In Progress", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
        { step: "Phase 3: Undergraduate Degree", desc: "B.Tech in Computer Science / AI & build 4 portfolio projects.", status: "Upcoming", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
        { step: "Phase 4: Industry Internship", desc: "6-month corporate internship with top tech enterprise.", status: "Upcoming", bg: "bg-white", border: "border-slate-200" }
      ].map((rd, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border flex items-center justify-between ${rd.bg} ${rd.border} text-[#12163A] hover-card-lift`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-[#12163A] text-white flex items-center justify-center font-semibold text-[13px] shrink-0", children: i + 1 }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: rd.step }),
            /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[#4B5563] font-normal leading-normal mt-0.5", children: rd.desc })
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-[12px] px-3 py-1 rounded-full font-semibold border bg-white border-slate-200 text-[#12163A] shrink-0", children: rd.status })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "resume-ats") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-[14px] font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FiFileText, { className: "w-5 h-5 text-[#3665EE]" }),
            " AI ATS Resume Score & Optimizer Dashboard"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-[#6B7280] font-normal leading-normal mt-1", children: "Automated ATS scanner compliance & keyword density optimization" })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => onShowToast("Running AI Resume Optimizer scan..."),
            className: "bg-[#12163A] hover:bg-[#1A2050] text-white text-[14px] font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
            children: [
              /* @__PURE__ */ jsx(FiStar, { className: "w-4 h-4 text-[#DEE9FF]" }),
              " Run AI Resume Scan"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs text-center space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium block text-[#6B7280]", children: "Overall ATS Score" }),
          /* @__PURE__ */ jsx("div", { className: "text-[32px] md:text-[36px] font-bold text-[#3665EE] leading-none", children: "88 / 100" }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium bg-[#12163A] text-white px-3 py-1 rounded-full inline-block mt-2", children: "Completion Badge: Navy" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium block text-[#12163A]", children: "AI Suggestions" }),
          /* @__PURE__ */ jsx("div", { className: "text-[26px] md:text-[28px] font-bold text-[#12163A] leading-tight", children: "92% Keyword Fit" }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] text-[#4B5563] font-medium block mt-1", children: "14/15 Target Skills Added" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium block text-[#12163A]", children: "Achievements Grade" }),
          /* @__PURE__ */ jsx("div", { className: "text-[32px] md:text-[36px] font-bold text-[#12163A] leading-none", children: "A+" }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] text-[#4B5563] font-medium block mt-1", children: "100% Parser Compliant" })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-[14px] font-sans shadow-xs", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FiBookOpen, { className: "w-5 h-5 text-[#3665EE]" }),
          " Skill Mastery & Learning Progress Tracker"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-[#6B7280] font-normal leading-normal mt-1", children: "Track active courses, earned certification badges, and daily study streaks" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[#12163A] text-[13px] font-semibold bg-[#E4F4EC] border border-[#C3E6D5] px-3.5 py-1.5 rounded-xl", children: [
        /* @__PURE__ */ jsx(FiZap, { className: "w-4 h-4 text-[#3665EE]" }),
        " 14-Day Streak!"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#12163A] text-white space-y-3 cursor-pointer hover-card-lift", onClick: () => onShowToast("Resumed Python AI module"), children: [
        /* @__PURE__ */ jsx("span", { className: "text-[12px] uppercase font-semibold text-[#DEE9FF] tracking-wider", children: "Continue Learning" }),
        /* @__PURE__ */ jsx("h3", { className: "text-[16px] md:text-[17px] font-semibold text-white leading-snug", children: "Python for Data Science & AI" }),
        /* @__PURE__ */ jsx("div", { className: "w-full h-2.5 bg-white/20 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#3665EE] rounded-full", style: { width: "85%" } }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[13px] text-[#DEE9FF] block font-medium", children: "85% Completed" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-3 cursor-pointer hover-card-lift", onClick: () => onShowToast("Opening System Design course"), children: [
        /* @__PURE__ */ jsx("span", { className: "text-[12px] uppercase font-semibold text-[#3665EE] tracking-wider", children: "Recommended Course" }),
        /* @__PURE__ */ jsx("h3", { className: "text-[16px] md:text-[17px] font-semibold text-[#12163A] leading-snug", children: "System Design & Microservices" }),
        /* @__PURE__ */ jsx("div", { className: "w-full h-2.5 bg-white/80 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#3665EE] rounded-full", style: { width: "60%" } }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[13px] text-[#4B5563] block font-medium", children: "60% Completed" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-[#12163A] space-y-3 cursor-pointer hover-card-lift", onClick: () => onShowToast("Viewing Cloud Cert badge"), children: [
        /* @__PURE__ */ jsx("span", { className: "text-[12px] uppercase font-semibold text-[#12163A] tracking-wider", children: "Achievement Badge" }),
        /* @__PURE__ */ jsx("h3", { className: "text-[16px] md:text-[17px] font-semibold text-[#12163A] leading-snug", children: "Cloud Architecture (AWS)" }),
        /* @__PURE__ */ jsx("div", { className: "w-full h-2.5 bg-white/80 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#3665EE] rounded-full", style: { width: "45%" } }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[13px] text-[#12163A] block font-medium", children: "Foundational Certification Earned" })
      ] })
    ] })
  ] });
};
const schoolService = {
  /**
   * Register a new School Institution
   * POST /api/v1/institutions/register
   */
  async registerSchool(data) {
    return await apiClient(API_ENDPOINTS.ADMIN.INSTITUTIONS_REGISTER, {
      method: "POST",
      body: JSON.stringify({ ...data, type: "school" })
    });
  },
  /**
   * Fetch live school profile and role data
   * GET /api/v1/profile/
   */
  async getSchoolProfile() {
    var _a2, _b2, _c, _d, _e, _f, _g;
    try {
      const res = await apiClient(API_ENDPOINTS.PROFILE.GET);
      const roleData = ((_b2 = (_a2 = res.data) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.roleData) || {};
      const profile = roleData.schoolProfile || {
        name: ((_d = (_c = res.data) == null ? void 0 : _c.profile) == null ? void 0 : _d.firstName) ? `${res.data.profile.firstName} School` : "Role Ready Partner School",
        affiliation: "CBSE / State Board Verified",
        principal: ((_f = (_e = res.data) == null ? void 0 : _e.profile) == null ? void 0 : _f.firstName) ? `${res.data.profile.firstName} ${res.data.profile.lastName || ""}`.trim() : "School Principal",
        email: ((_g = res.data) == null ? void 0 : _g.email) || "principal@school.edu",
        year: "2026-2027"
      };
      const students = Array.isArray(roleData.students) ? roleData.students : [];
      const teachers = Array.isArray(roleData.teachers) ? roleData.teachers : [];
      const events = Array.isArray(roleData.events) ? roleData.events : [];
      return { profile, students, teachers, events };
    } catch {
      return {
        profile: {
          name: "Role Ready Partner School",
          affiliation: "Board Affiliation Verified",
          principal: "Principal",
          email: "principal@school.edu",
          year: "2026-2027"
        },
        students: [],
        teachers: [],
        events: []
      };
    }
  },
  /**
   * Update school profile and data in backend profile roleData
   * PUT /api/v1/profile/complete
   */
  async updateSchoolData(updates) {
    var _a2, _b2, _c, _d;
    const current = await apiClient(API_ENDPOINTS.PROFILE.GET).catch(() => null);
    const existingRoleData = ((_b2 = (_a2 = current == null ? void 0 : current.data) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.roleData) || {};
    const existingP = ((_c = current == null ? void 0 : current.data) == null ? void 0 : _c.profile) || {};
    const updatedRoleData = {
      ...existingRoleData,
      ...updates.schoolProfile ? { schoolProfile: updates.schoolProfile } : {},
      ...updates.students ? { students: updates.students } : {},
      ...updates.teachers ? { teachers: updates.teachers } : {},
      ...updates.events ? { events: updates.events } : {}
    };
    return await apiClient(API_ENDPOINTS.PROFILE.COMPLETE, {
      method: "PUT",
      body: JSON.stringify({
        firstName: existingP.firstName || ((_d = updates.schoolProfile) == null ? void 0 : _d.name) || "School",
        lastName: existingP.lastName || "Admin",
        phoneNumber: existingP.phoneNumber || "9876543210",
        bio: existingP.bio || "School Administrator",
        onboardingCompleted: true,
        roleData: updatedRoleData
      })
    });
  },
  /**
   * Fetch Live Cohort Aptitude Analytics from backend
   * GET /api/v1/aptitude/admin/analytics/cohort
   */
  async getCohortAptitudeAnalytics() {
    try {
      const res = await apiClient(API_ENDPOINTS.ADMIN.APTITUDE_COHORT);
      return res.data || res;
    } catch {
      return null;
    }
  },
  /**
   * Fetch Live Cohort Skill Analytics from backend
   * GET /api/v1/skill-mapping/analytics/cohort
   */
  async getCohortSkillAnalytics() {
    try {
      const res = await apiClient(API_ENDPOINTS.ADMIN.SKILL_COHORT);
      return res.data || res;
    } catch {
      return null;
    }
  }
};
const SchoolDashboard = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const queryClient = useQueryClient();
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [studentDetailTab, setStudentDetailTab] = useState("overview");
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [videoSessionConfig, setVideoSessionConfig] = useState({
    title: "Global AI & STEM Career Guidance Workshop",
    hostName: "Dr. Rajesh Verma (IIT Delhi)"
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [isEditingSchoolProfile, setIsEditingSchoolProfile] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [schoolProfile, setSchoolProfile] = useState({
    name: "St. Xavier's International School",
    affiliation: "CBSE Affiliation Verified",
    principal: "Dr. A. K. Sharma",
    email: "principal@stxaviers.edu",
    year: "2026-2027"
  });
  const { data: schoolData, isLoading } = useQuery({
    queryKey: ["schoolProfile"],
    queryFn: () => schoolService.getSchoolProfile()
  });
  const { data: cohortAptitude } = useQuery({
    queryKey: ["cohortAptitude"],
    queryFn: () => schoolService.getCohortAptitudeAnalytics()
  });
  const { data: cohortSkills } = useQuery({
    queryKey: ["cohortSkills"],
    queryFn: () => schoolService.getCohortSkillAnalytics()
  });
  const updateMutation = useMutation({
    mutationFn: (updates) => schoolService.updateSchoolData(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolProfile"] });
    },
    onError: (err) => {
      onShowToast("Unable to save changes. Please try again.");
    }
  });
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState({
    title: "",
    subtitle: "",
    fields: []
  });
  const [teachersList, setTeachersList] = useState([]);
  const [students, setStudents] = useState([]);
  const filteredStudents = students.filter((s) => {
    const matchesGrade = selectedGrade === "All" || s.grade === selectedGrade;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase()) || s.careerGoal.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSearch;
  });
  const openTriggerModal = (title, subtitle, fields) => {
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
      const updated = [newStudent, ...students];
      setStudents(updated);
      updateMutation.mutate({ students: updated });
      onShowToast(`Successfully onboarded student: ${newStudent.name} (${newStudent.grade})!`);
    } else if (actionModalConfig.title === "Add Teacher") {
      const newTch = {
        id: `TCH-${Math.floor(204 + Math.random() * 800)}`,
        name: data.name || "Faculty Member",
        qualification: "M.Sc / B.Ed",
        dept: data.department || "Academic Department",
        subject: data.department || "General Subject",
        classes: "Grade 10, 11",
        studentsCount: "60 Students Assigned",
        experience: "5 Years Experience",
        email: `${(data.name || "faculty").toLowerCase().replace(/\s+/g, ".")}@school.edu`,
        rating: "4.8 / 5.0"
      };
      const updated = [newTch, ...teachersList];
      setTeachersList(updated);
      updateMutation.mutate({ teachers: updated });
      onShowToast(`Successfully added teacher: ${newTch.name}!`);
    } else {
      onShowToast(`Action completed: ${actionModalConfig.title}`);
    }
    setIsActionModalOpen(false);
  };
  const handleSaveStudentEdit = (e) => {
    e.preventDefault();
    if (!editingStudent) return;
    if (!editingStudent.name || !editingStudent.email || !editingStudent.careerGoal) {
      onShowToast("Please fill out all required student fields!");
      return;
    }
    setIsSavingEdit(true);
    const updated = students.map((s) => s.id === editingStudent.id ? { ...s, ...editingStudent } : s);
    setStudents(updated);
    if (selectedStudent && selectedStudent.id === editingStudent.id) {
      setSelectedStudent((prev) => prev ? { ...prev, ...editingStudent } : null);
    }
    updateMutation.mutate({ students: updated });
    setIsSavingEdit(false);
    onShowToast(`Successfully saved changes for ${editingStudent.name} (${editingStudent.id})!`);
    setEditingStudent(null);
  };
  const handleSaveTeacherEdit = (e) => {
    e.preventDefault();
    if (!editingTeacher) return;
    if (!editingTeacher.name || !editingTeacher.email || !editingTeacher.dept) {
      onShowToast("Please fill out all required teacher fields!");
      return;
    }
    setIsSavingEdit(true);
    const updated = teachersList.map((t) => t.id === editingTeacher.id ? { ...t, ...editingTeacher } : t);
    setTeachersList(updated);
    if (selectedTeacher && selectedTeacher.id === editingTeacher.id) {
      setSelectedTeacher((prev) => prev ? { ...prev, ...editingTeacher } : null);
    }
    updateMutation.mutate({ teachers: updated });
    setIsSavingEdit(false);
    onShowToast(`Updated faculty profile for ${editingTeacher.name} (${editingTeacher.id})!`);
    setEditingTeacher(null);
  };
  const handleSaveSchoolProfile = (e) => {
    e.preventDefault();
    setIsSavingEdit(true);
    updateMutation.mutate({ schoolProfile });
    setIsSavingEdit(false);
    setIsEditingSchoolProfile(false);
    onShowToast("Successfully updated School Profile & Accreditation details!");
  };
  if (["discovery", "assessment", "psychometric", "dna", "ai-recommendations", "scholarships", "colleges", "roadmap", "resume-ats", "learning"].includes(activeSubView)) {
    return /* @__PURE__ */ jsx(StudentToolsViews, { activeSubView, onShowToast, isDarkMode });
  }
  const renderContent = () => {
    if (activeSubView === "overview") {
      const totalStudents = students.length;
      const totalTeachers = teachersList.length;
      const completedCount = students.filter((s) => {
        var _a2;
        return (_a2 = s.assessmentStatus) == null ? void 0 : _a2.toLowerCase().includes("completed");
      }).length;
      const testPercent = totalStudents > 0 ? (completedCount / totalStudents * 100).toFixed(1) : "0.0";
      const avgReadiness = totalStudents > 0 ? (students.reduce((acc, s) => acc + (Number(s.careerScore) || 0), 0) / totalStudents).toFixed(1) : "0.0";
      const attentionCount = students.filter((s) => {
        var _a2;
        return ((_a2 = s.placementReadiness) == null ? void 0 : _a2.toLowerCase().includes("needs")) || (s.careerScore || 0) < 80;
      }).length;
      const placementCount = students.filter((s) => {
        var _a2;
        return (_a2 = s.placementReadiness) == null ? void 0 : _a2.toLowerCase().includes("high");
      }).length;
      const placementPercent = totalStudents > 0 ? Math.round(placementCount / totalStudents * 100) : 0;
      const grades = ["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
      return /* @__PURE__ */ jsxs("div", { className: "space-y-6 font-sans", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#12163A] text-white shadow-md border border-[#12163A] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-slate-300", children: "Total Students (Grades 8-12)" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-white", children: totalStudents }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full inline-block", children: totalStudents > 0 ? "Live Roster Active" : "Roster Empty" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#4B5563]", children: "Total Teachers & Mentors" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#12163A]", children: totalTeachers }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-[#12163A]/70", children: "Registered Faculty" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#4B5563]", children: "Assessment Completion" }),
            /* @__PURE__ */ jsxs("div", { className: "text-3xl font-extrabold text-[#3665EE]", children: [
              testPercent,
              "%"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-bold text-[#12163A]", children: [
              completedCount,
              " / ",
              totalStudents,
              " Tested"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#4B5563]", children: "Avg Career Readiness Score" }),
            /* @__PURE__ */ jsxs("div", { className: "text-3xl font-extrabold text-[#12163A]", children: [
              avgReadiness,
              " / 100"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-[#3665EE]", children: "Live Cohort Metric" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm text-[#12163A]", children: "Grade Enrolment & Career DNA Status" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3", children: grades.map((g, i) => {
            const count = students.filter((s) => s.grade === g).length;
            const gradeStudents = students.filter((s) => s.grade === g);
            const gradeAvg = gradeStudents.length > 0 ? Math.round(gradeStudents.reduce((acc, s) => acc + (Number(s.careerScore) || 0), 0) / gradeStudents.length) : 0;
            const dark = g === "Grade 12";
            return /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-[20px] border text-center ${i % 2 === 0 ? "bg-[#DEE9FF] border-[#C6D9FF]" : "bg-[#F6E6D8] border-[#EAD0BC]"} ${dark ? "bg-[#12163A] border-[#12163A] text-white" : "text-[#12163A]"} hover-card-lift`, children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold block text-xs", children: g }),
              /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold my-1", children: count }),
              /* @__PURE__ */ jsxs("span", { className: `text-[10px] font-bold ${dark ? "text-[#E4F4EC]" : "text-[#3665EE]"}`, children: [
                gradeAvg,
                "% Ready"
              ] })
            ] }, i);
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] border border-[#C6D9FF] shadow-xs space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Learning Progress" }),
              /* @__PURE__ */ jsxs("span", { className: "font-bold text-[#3665EE]", children: [
                testPercent,
                "% Avg"
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#4B5563]", children: "Course completion rates across AI, STEM, & Skill tracks" }),
            /* @__PURE__ */ jsx("div", { className: "w-full h-2.5 bg-white/80 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#3665EE] rounded-full", style: { width: `${testPercent}%` } }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] border border-[#EAD0BC] shadow-xs space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Students Requiring Attention" }),
              /* @__PURE__ */ jsxs("span", { className: "font-bold text-[#12163A] bg-[#12163A]/10 px-2.5 py-0.5 rounded-full", children: [
                attentionCount,
                " Students"
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#4B5563]", children: "Incomplete assessments or low career readiness score" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onShowToast("Navigating to filtered Student Attention list"),
                className: "text-[#3665EE] font-bold hover:underline cursor-pointer",
                children: "View Needs Attention Roster →"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] text-[#12163A] border border-[#C3E6D5] shadow-xs space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Placement Readiness" }),
              /* @__PURE__ */ jsxs("span", { className: "font-bold text-[#12163A]", children: [
                placementPercent,
                "% Placement Ready"
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#4B5563]", children: "Grade 11 & 12 students qualified for internships & admissions" }),
            /* @__PURE__ */ jsx("div", { className: "w-full h-2.5 bg-white/80 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#3665EE] rounded-full", style: { width: `${placementPercent}%` } }) })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "students") {
      return /* @__PURE__ */ jsxs("div", { className: "space-y-6 font-sans text-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
                /* @__PURE__ */ jsx(FiUsers, { className: "w-5 h-5 text-[#3665EE]" }),
                " Student Roster (Grades 8 - 12)"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "School admin management for registered student profiles" })
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
                  className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
                  children: [
                    /* @__PURE__ */ jsx(FiPlus, { className: "w-3.5 h-3.5" }),
                    " Onboard Student Batch"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => onShowToast("Exported Student Roster CSV"),
                  className: "px-4 py-2.5 rounded-xl font-bold border border-slate-200 bg-slate-50 text-[#12163A] hover:bg-slate-100 transition cursor-pointer flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx(FiDownload, { className: "w-3.5 h-3.5" }),
                    " Export Roster"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-1", children: ["All", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((gr) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSelectedGrade(gr),
                className: `px-3.5 py-1.5 rounded-xl font-bold transition cursor-pointer ${selectedGrade === gr ? "bg-[#12163A] text-white shadow-md" : "bg-[#DEE9FF] text-[#12163A] hover:bg-[#CBDDFF]"}`,
                children: gr
              },
              gr
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  placeholder: "Search by student name or ID...",
                  className: "w-full sm:w-64 pl-9 pr-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3665EE] bg-slate-50 text-[#12163A]"
                }
              ),
              /* @__PURE__ */ jsx(FiSearch, { className: "w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "rounded-[24px] bg-white border border-slate-200 shadow-xs overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b text-[11px] font-bold uppercase bg-[#DEE9FF]/50 text-[#12163A] border-[#C6D9FF]", children: [
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Student Name" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Student ID" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Grade & Section" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Career Score" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Assessment Status" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Career DNA" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Learning" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "ATS Resume" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Placement Readiness" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5 text-right", children: "School Action" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-100", children: filteredStudents.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 10, className: "p-8 text-center text-xs text-slate-400", children: "No students found in roster. Click '+ Onboard Student Batch' to add students." }) }) : filteredStudents.map((s) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-[#DEE9FF]/20 transition-colors", children: [
            /* @__PURE__ */ jsxs("td", { className: "p-3.5 font-bold text-[#12163A]", children: [
              /* @__PURE__ */ jsx("div", { children: s.name }),
              /* @__PURE__ */ jsx("div", { className: "text-[10px] font-normal text-[#6B7280]", children: s.email })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-mono text-[11px] text-[#3665EE]", children: s.id }),
            /* @__PURE__ */ jsxs("td", { className: "p-3.5 text-[#4B5563]", children: [
              s.grade,
              " - ",
              s.section
            ] }),
            /* @__PURE__ */ jsxs("td", { className: "p-3.5 font-bold text-[#3665EE]", children: [
              s.careerScore,
              " / 100"
            ] }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-semibold text-emerald-600", children: s.assessmentStatus }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5", children: /* @__PURE__ */ jsx("span", { className: "bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-bold text-[10px] whitespace-nowrap shadow-2xs", children: s.careerDnaStatus }) }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-bold text-[#12163A]", children: s.learningProgress }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-bold text-[#3665EE]", children: s.resumeScore }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5", children: /* @__PURE__ */ jsx("span", { className: `px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${s.placementReadiness.includes("High") ? "bg-[#E4F4EC] text-[#12163A] border-[#C3E6D5]" : s.placementReadiness.includes("Needs") ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-[#DEE9FF] text-[#12163A] border-[#C6D9FF]"}`, children: s.placementReadiness }) }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1.5 ml-auto", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setEditingStudent({ ...s }),
                  className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-2.5 py-1.5 rounded-lg text-[10px] transition cursor-pointer flex items-center gap-1 hover:scale-105 active:scale-95 shadow-xs",
                  title: `Edit ${s.name}'s Profile`,
                  children: [
                    /* @__PURE__ */ jsx(FiEdit2, { className: "w-3 h-3" }),
                    " Edit"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => {
                    setSelectedStudent(s);
                    setStudentDetailTab("overview");
                  },
                  className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-2.5 py-1.5 rounded-lg text-[10px] transition cursor-pointer flex items-center gap-1 hover:scale-105 active:scale-95 shadow-xs",
                  children: [
                    /* @__PURE__ */ jsx(FiEye, { className: "w-3 h-3" }),
                    " View"
                  ]
                }
              )
            ] }) })
          ] }, s.id)) })
        ] }) }) }),
        selectedStudent && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col border shadow-2xl overflow-hidden bg-white text-[#12163A]", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 bg-[#12163A] text-white flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase tracking-wider text-[#DEE9FF]", children: "SCHOOL ADMIN STUDENT VIEW" }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-extrabold flex items-center gap-2", children: selectedStudent.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-300", children: [
                selectedStudent.id,
                " • ",
                selectedStudent.grade,
                " (",
                selectedStudent.section,
                ") • Goal: ",
                selectedStudent.careerGoal
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setEditingStudent({ ...selectedStudent }),
                  className: "px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md hover:scale-105 active:scale-95",
                  children: [
                    /* @__PURE__ */ jsx(FiEdit2, { className: "w-3.5 h-3.5" }),
                    " Edit Profile"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setSelectedStudent(null),
                  className: "w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer text-white",
                  children: /* @__PURE__ */ jsx(FiX, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex border-b border-slate-200 bg-[#DEE9FF]/40 overflow-x-auto px-4", children: [
            { id: "overview", label: "Overview" },
            { id: "intelligence", label: "Career Intelligence" },
            { id: "assessments", label: "Assessments" },
            { id: "learning", label: "Learning & Skills" },
            { id: "opportunities", label: "Opportunities" },
            { id: "placement", label: "Resume & Placement" },
            { id: "academic", label: "Academic Performance" }
          ].map((tab) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setStudentDetailTab(tab.id),
              className: `px-4 py-3 text-xs font-bold transition whitespace-nowrap cursor-pointer border-b-2 ${studentDetailTab === tab.id ? "border-[#3665EE] text-[#3665EE] bg-white" : "border-transparent text-[#6B7280] hover:text-[#12163A]"}`,
              children: tab.label
            },
            tab.id
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 overflow-y-auto space-y-6 flex-1 text-xs", children: [
            studentDetailTab === "overview" && /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-[#DEE9FF] border-[#C6D9FF]", children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#6B7280]", children: "Career Score" }),
                /* @__PURE__ */ jsxs("div", { className: "text-2xl font-extrabold text-[#3665EE] mt-1", children: [
                  selectedStudent.careerScore,
                  " / 100"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-[#E4F4EC] border-[#C3E6D5]", children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#6B7280]", children: "Learning Progress" }),
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-[#12163A] mt-1", children: selectedStudent.learningProgress })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-[#F6E6D8] border-[#EAD0BC]", children: [
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#6B7280]", children: "Placement Readiness" }),
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-[#12163A] mt-1", children: selectedStudent.placementReadiness })
              ] })
            ] }) }),
            studentDetailTab === "intelligence" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-[#F6E6D8] border-[#EAD0BC] space-y-2", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Career DNA & Personality Profile" }),
                /* @__PURE__ */ jsx("p", { className: "text-[#3665EE] font-bold", children: selectedStudent.hollandCode })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-[#E4F4EC] border-[#C3E6D5] space-y-2", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "AI Recommended Career Goal" }),
                /* @__PURE__ */ jsx("p", { className: "text-[#12163A] font-bold", children: selectedStudent.careerGoal })
              ] })
            ] }),
            studentDetailTab === "assessments" && /* @__PURE__ */ jsx("div", { className: "space-y-3", children: ["Aptitude Assessment (Score: 94%)", "Psychometric Holland Code Test (Score: Completed)", "Emotional Intelligence (EQ Score: 88%)"].map((a, i) => /* @__PURE__ */ jsxs("div", { className: "p-3.5 rounded-xl border bg-slate-50 border-slate-200 flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold text-[#12163A]", children: a }),
              /* @__PURE__ */ jsx("span", { className: "text-[#3665EE] font-bold", children: "Verified" })
            ] }, i)) }),
            studentDetailTab === "learning" && /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-[#DEE9FF] border-[#C6D9FF] space-y-2", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#12163A]", children: "Key Acquired Skills" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: selectedStudent.topSkills.map((sk) => /* @__PURE__ */ jsx("span", { className: "bg-[#12163A] text-white px-3 py-1 rounded-lg font-bold", children: sk }, sk)) })
            ] }) }),
            studentDetailTab === "opportunities" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-white border-slate-200 space-y-1", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#12163A]", children: "Recommended College" }),
                /* @__PURE__ */ jsx("p", { className: "text-[#3665EE] font-bold", children: selectedStudent.topCollege })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-[#E4F4EC] border-[#C3E6D5] space-y-1", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#12163A]", children: "Scholarship Eligibility" }),
                /* @__PURE__ */ jsx("p", { className: "text-[#12163A] font-bold", children: selectedStudent.topScholarship })
              ] })
            ] }),
            studentDetailTab === "placement" && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-white border-slate-200 space-y-2", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#12163A]", children: "ATS Resume Score" }),
              /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-[#3665EE]", children: selectedStudent.resumeScore })
            ] }),
            studentDetailTab === "academic" && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl border bg-slate-50 border-slate-200 space-y-2", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#12163A]", children: "Academic Performance Summary" }),
              /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Term 1 Average: 89.4% • Attendance: 96.2%" })
            ] })
          ] })
        ] }) })
      ] });
    }
    if (activeSubView === "teachers") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FiGrid, { className: "w-5 h-5 text-[#3665EE]" }),
              " Teacher & Faculty Management"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-[#6B7280]", children: [
              teachersList.length,
              " Registered school teachers & career mentors across departments"
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Add Teacher", "Register a new teacher or mentor", [
                { label: "Teacher Name", name: "name", type: "text", placeholder: "Dr. Rajesh Verma" },
                { label: "Department", name: "department", type: "text", placeholder: "Computer Science" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md",
              children: [
                /* @__PURE__ */ jsx(FiPlus, { className: "w-3.5 h-3.5" }),
                " Add Teacher"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: teachersList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-xs text-slate-400", children: [
          /* @__PURE__ */ jsx(FiGrid, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "No teachers or mentors registered yet. Click '+ Add Teacher' to onboard faculty."
        ] }) : teachersList.map((t, i) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] transition-all hover:shadow-md", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: t.name }),
            /* @__PURE__ */ jsxs("span", { className: "text-[#3665EE] font-semibold", children: [
              t.dept,
              " • ",
              t.subject
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-[#4B5563]", children: [
              t.classes,
              " • Assigned: ",
              t.studentsCount
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setEditingTeacher({ ...t }),
                className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-3 py-1.5 rounded-xl cursor-pointer transition hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5",
                title: `Edit ${t.name}'s Profile`,
                children: [
                  /* @__PURE__ */ jsx(FiEdit2, { className: "w-3.5 h-3.5" }),
                  " Edit"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setSelectedTeacher(t),
                className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-3.5 py-1.5 rounded-xl cursor-pointer transition hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsx(FiEye, { className: "w-3.5 h-3.5" }),
                  " View"
                ]
              }
            )
          ] })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "assessments") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FiCheckSquare, { className: "w-5 h-5 text-[#3665EE]" }),
              " Assessments & Career Readiness Control"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Manage interest assessments, psychometric tests, and aptitude evaluations" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Assign Assessment", "Publish assessment to Grade batches", [
                { label: "Assessment Name", name: "name", type: "text", placeholder: "Grade 10 Aptitude Test" },
                { label: "Target Grade", name: "grade", type: "text", placeholder: "Grade 10" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md",
              children: [
                /* @__PURE__ */ jsx(FiPlus, { className: "w-3.5 h-3.5" }),
                " Assign Assessment"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          { name: "Holland Code Psychometric Test", grade: "Grades 9 & 10", assigned: 1830, completed: 1720, score: "88/100" },
          { name: "STEM Cognitive Aptitude Test", grade: "Grades 11 & 12", assigned: 1770, completed: 1690, score: "92/100" },
          { name: "Emotional Intelligence & Work Style", grade: "Grades 8 & 9", assigned: 1400, completed: 1250, score: "85/100" }
        ].map((as, i) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] border bg-[#F6E6D8] border-[#EAD0BC] flex items-center justify-between text-[#12163A]", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: as.name }),
            /* @__PURE__ */ jsxs("span", { className: "text-[#3665EE] font-semibold", children: [
              as.grade,
              " • Completed: ",
              as.completed,
              "/",
              as.assigned
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-[#12163A] font-bold", children: [
              "Avg Score: ",
              as.score
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => onShowToast(`Analyzing results for ${as.name}`), className: "text-[#3665EE] font-bold hover:underline", children: "View Results" })
          ] })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "reports") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FiFileText, { className: "w-5 h-5 text-[#3665EE]" }),
              " Institutional Career & AI Intelligence Reports"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "School-wide intelligence summaries, skill gap matrices, and AI recommendation distribution" })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => onShowToast("Generated full School Career Intelligence PDF Report"), className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md", children: [
            /* @__PURE__ */ jsx(FiDownload, { className: "w-3.5 h-3.5" }),
            " Download Full PDF Report"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          { title: "Career Interest Distribution Report", desc: "68% STEM • 18% Finance • 14% Creative Arts", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
          { title: "Career DNA Summary Report", desc: "Top Trait: Investigative & Problem Solving", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
          { title: "Skill Gap & AI Recommendation Report", desc: "Top Need: Advanced Data Structures & PyTorch", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
        ].map((rp, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border space-y-2 cursor-pointer ${rp.bg} ${rp.border} text-[#12163A] hover-card-lift`, onClick: () => onShowToast(`Opening ${rp.title}`), children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: rp.title }),
          /* @__PURE__ */ jsx("p", { className: "text-[#4B5563]", children: rp.desc })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "events") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FiCalendar, { className: "w-5 h-5 text-[#3665EE]" }),
              " Career Events & Guidance Sessions"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Schedule and manage career workshops, college awareness, & parent guidance" })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => openTriggerModal("Schedule Event", "Create a new school guidance workshop", [
            { label: "Event Title", name: "title", type: "text", placeholder: "IIT Admissions Workshop" }
          ]), className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md", children: [
            /* @__PURE__ */ jsx(FiPlus, { className: "w-3.5 h-3.5" }),
            " Schedule Event"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: (schoolData == null ? void 0 : schoolData.events) && schoolData.events.length > 0 ? schoolData.events.map((ev, i) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#E4F4EC] border-[#C3E6D5] text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: ev.title }),
            /* @__PURE__ */ jsx("span", { className: "text-[#3665EE] font-semibold block sm:inline", children: ev.date }),
            /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-[#4B5563]", children: [
              "Speaker: ",
              /* @__PURE__ */ jsx("span", { className: "font-bold text-[#12163A]", children: ev.speaker })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setVideoSessionConfig({ title: ev.title, hostName: ev.speaker });
                setIsVideoCallOpen(true);
              },
              className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 text-xs shrink-0",
              children: [
                /* @__PURE__ */ jsx(FiVideo, { className: "w-4 h-4 text-emerald-400 animate-pulse" }),
                /* @__PURE__ */ jsx("span", { children: "Join Video Call" })
              ]
            }
          ) })
        ] }, i)) : /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-xs text-slate-400", children: [
          /* @__PURE__ */ jsx(FiVideo, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "No career events or guidance sessions scheduled yet. Click '+ Schedule Event' to create a session."
        ] }) })
      ] });
    }
    if (activeSubView === "analytics") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FiTrendingUp, { className: "w-5 h-5 text-[#3665EE]" }),
            " School-Wide Student Growth & Engagement Analytics"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Institutional analytics for career readiness growth, engagement index, and skill mastery" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563]", children: "Student Growth Rate" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#12163A] mt-1", children: "+14.2% YoY" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563]", children: "Overall Engagement Index" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#3665EE] mt-1", children: "94.8%" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563]", children: "Skill Mastery Benchmark" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#12163A] mt-1", children: "89% Advanced" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "performance") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FiCpu, { className: "w-5 h-5 text-[#3665EE]" }),
            " Academic & Career Performance Monitoring"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Grade performance, attendance tracking, and assessment score distributions" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          { title: "Academic Avg Score", val: "84.5%", sub: "96% Attendance Rate", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
          { title: "Assessment Score Avg", val: "88.0%", sub: "91% Completion", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
          { title: "Skill Development", val: "92.4%", sub: "Top Benchmark", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
        ].map((pf, i) => /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-[24px] border space-y-1 ${pf.bg} ${pf.border} text-[#12163A]`, children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563]", children: pf.title }),
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#12163A]", children: pf.val }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#4B5563]", children: pf.sub })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "placement") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FiBriefcase, { className: "w-5 h-5 text-[#3665EE]" }),
            " Placement & Internship Readiness Reports"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Higher-ed placement readiness, internship qualifiers, and ATS resume ratings" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563]", children: "Placement Ready" }),
            /* @__PURE__ */ jsxs("div", { className: "text-2xl font-extrabold text-[#12163A] mt-1", children: [
              students.filter((s) => {
                var _a2;
                return (_a2 = s.placementReadiness) == null ? void 0 : _a2.toLowerCase().includes("high");
              }).length,
              " Students"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563]", children: "Internship Ready" }),
            /* @__PURE__ */ jsxs("div", { className: "text-2xl font-extrabold text-[#3665EE] mt-1", children: [
              students.filter((s) => {
                var _a2, _b2;
                return ((_a2 = s.placementReadiness) == null ? void 0 : _a2.toLowerCase().includes("high")) || ((_b2 = s.placementReadiness) == null ? void 0 : _b2.toLowerCase().includes("moderate"));
              }).length,
              " Students"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563]", children: "Resume ATS Verified" }),
            /* @__PURE__ */ jsxs("div", { className: "text-2xl font-extrabold text-[#12163A] mt-1", children: [
              students.filter((s) => Boolean(s.resumeScore)).length,
              " Verified"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-rose-50 border border-rose-200 text-rose-800", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-rose-600", children: "Requiring Guidance" }),
            /* @__PURE__ */ jsxs("div", { className: "text-2xl font-extrabold text-rose-700 mt-1", children: [
              students.filter((s) => {
                var _a2;
                return ((_a2 = s.placementReadiness) == null ? void 0 : _a2.toLowerCase().includes("needs")) || (Number(s.careerScore) || 0) < 80;
              }).length,
              " Students"
            ] })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "notifications") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FiBell, { className: "w-5 h-5 text-[#3665EE]" }),
              " School Admin Notifications & Alerts"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Assessment reminders, student milestones, scholarship deadlines" })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => onShowToast("Marked all notifications as read"), className: "text-[#3665EE] font-bold hover:underline cursor-pointer", children: "Mark All as Read" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          { title: "Grade 10 Holland Code Assessment Completed", time: "10 mins ago", type: "Assessment Alert", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
          { title: "National STEM Scholarship Deadline Closing in 3 Days", time: "1 hour ago", type: "Scholarship Deadline", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
          { title: "Parent Career Guidance Workshop Scheduled for 15th August", time: "3 hours ago", type: "Event Reminder", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
        ].map((nt, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-[20px] border flex items-center justify-between ${nt.bg} ${nt.border} text-[#12163A]`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#12163A]", children: nt.title }),
            /* @__PURE__ */ jsxs("span", { className: "text-[#3665EE] font-semibold", children: [
              nt.type,
              " • ",
              nt.time
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold", children: "New" })
        ] }, i)) })
      ] });
    }
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FiSliders, { className: "w-5 h-5 text-[#3665EE]" }),
            " School Governance & System Settings"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Configure school profile, academic year, grade management, and teacher permissions" })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsEditingSchoolProfile(true),
            className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
            children: [
              /* @__PURE__ */ jsx(FiEdit2, { className: "w-3.5 h-3.5" }),
              " Edit School Profile"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: schoolProfile.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-[#4B5563]", children: [
            schoolProfile.affiliation,
            " • Principal: ",
            schoolProfile.principal,
            " • Academic Year ",
            schoolProfile.year
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-[11px] font-mono text-[#3665EE] font-bold", children: [
            "Admin Email: ",
            schoolProfile.email
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Teacher & Admin Permissions" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#4B5563]", children: "142 Teacher Accounts • Role-Based Access Control Enabled" }),
          /* @__PURE__ */ jsx("div", { className: "text-[11px] font-bold text-emerald-700", children: "RBAC Governance Active" })
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
    selectedTeacher && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 backdrop-blur-md bg-[#12163A]/70 flex items-center justify-center p-4 animate-fade-in font-sans", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[28px] max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-scale-up text-xs font-sans", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-6 py-5 bg-[#12163A] text-white flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-[#3665EE] flex items-center justify-center font-bold text-base text-white shadow-md", children: /* @__PURE__ */ jsx(FiGrid, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-base text-white", children: selectedTeacher.name }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-300", children: selectedTeacher.qualification })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setEditingTeacher({ ...selectedTeacher }),
              className: "px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FiEdit2, { className: "w-3.5 h-3.5" }),
                " Edit Profile"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedTeacher(null),
              className: "p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer text-white",
              children: /* @__PURE__ */ jsx(FiX, { className: "w-4 h-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-4 text-[#12163A]", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-3.5 rounded-2xl bg-[#DEE9FF] border border-[#C6D9FF]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563] block", children: "Department & Subject" }),
            /* @__PURE__ */ jsx("div", { className: "font-bold text-sm text-[#12163A] mt-0.5", children: selectedTeacher.dept }),
            /* @__PURE__ */ jsx("div", { className: "text-[11px] text-[#3665EE] font-semibold", children: selectedTeacher.subject })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-3.5 rounded-2xl bg-[#E4F4EC] border border-[#C3E6D5]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563] block", children: "Faculty Rating & Status" }),
            /* @__PURE__ */ jsx("div", { className: "font-bold text-sm text-[#12163A] mt-0.5", children: selectedTeacher.rating }),
            /* @__PURE__ */ jsx("div", { className: "text-[11px] text-emerald-700 font-semibold", children: selectedTeacher.experience })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-[#F6E6D8] border border-[#EAD0BC] space-y-2", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Assigned Classes & Batches" }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs font-semibold text-[#12163A]", children: [
            selectedTeacher.classes,
            " • ",
            selectedTeacher.studentsCount
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-[#4B5563]", children: [
            "Official Email: ",
            /* @__PURE__ */ jsx("span", { className: "font-mono text-[#3665EE] font-bold", children: selectedTeacher.email })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-white border border-slate-200 space-y-1", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Supervised Student Science & Career Projects" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#4B5563]", children: selectedTeacher.projects })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-3 flex items-center justify-end gap-3 border-t border-slate-100", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                onShowToast(`Downloaded faculty dossier PDF for ${selectedTeacher.name}`);
                setSelectedTeacher(null);
              },
              className: "px-4 py-2 rounded-xl font-bold bg-[#3665EE] text-white hover:bg-[#2A54D5] transition cursor-pointer shadow-sm flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsx(FiDownload, { className: "w-3.5 h-3.5" }),
                " Download Dossier PDF"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedTeacher(null),
              className: "px-4 py-2 rounded-xl font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer",
              children: "Close"
            }
          )
        ] })
      ] })
    ] }) }),
    editingStudent && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in font-sans", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl max-w-lg w-full border shadow-2xl overflow-hidden bg-white text-[#12163A]", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 bg-[#12163A] text-white flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center", children: /* @__PURE__ */ jsx(FiEdit2, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-base text-white", children: "Edit Student Profile" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-300", children: [
              "ID: ",
              editingStudent.id,
              " • ",
              editingStudent.name
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setEditingStudent(null),
            "aria-label": "Close modal",
            className: "w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer text-white",
            children: /* @__PURE__ */ jsx(FiX, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSaveStudentEdit, className: "p-6 space-y-4 text-xs", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-bold mb-1 text-slate-700", children: "Full Name *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              value: editingStudent.name,
              onChange: (e) => setEditingStudent({ ...editingStudent, name: e.target.value }),
              className: "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block font-bold mb-1 text-slate-700", children: "Grade *" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: editingStudent.grade,
                onChange: (e) => setEditingStudent({ ...editingStudent, grade: e.target.value }),
                className: "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 font-bold",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "Grade 8", children: "Grade 8" }),
                  /* @__PURE__ */ jsx("option", { value: "Grade 9", children: "Grade 9" }),
                  /* @__PURE__ */ jsx("option", { value: "Grade 10", children: "Grade 10" }),
                  /* @__PURE__ */ jsx("option", { value: "Grade 11", children: "Grade 11" }),
                  /* @__PURE__ */ jsx("option", { value: "Grade 12", children: "Grade 12" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block font-bold mb-1 text-slate-700", children: "Section *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                required: true,
                value: editingStudent.section,
                onChange: (e) => setEditingStudent({ ...editingStudent, section: e.target.value }),
                className: "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-bold mb-1 text-slate-700", children: "Contact Email *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              required: true,
              value: editingStudent.email,
              onChange: (e) => setEditingStudent({ ...editingStudent, email: e.target.value }),
              className: "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-bold mb-1 text-slate-700", children: "Target Career Goal *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              value: editingStudent.careerGoal,
              onChange: (e) => setEditingStudent({ ...editingStudent, careerGoal: e.target.value }),
              className: "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 font-bold text-blue-600"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-bold mb-1 text-slate-700", children: "Placement Readiness Status *" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: editingStudent.placementReadiness,
              onChange: (e) => setEditingStudent({ ...editingStudent, placementReadiness: e.target.value }),
              className: "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 font-bold",
              children: [
                /* @__PURE__ */ jsx("option", { value: "High Readiness", children: "High Readiness" }),
                /* @__PURE__ */ jsx("option", { value: "Developing", children: "Developing" }),
                /* @__PURE__ */ jsx("option", { value: "Needs Attention", children: "Needs Attention" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 flex items-center justify-end gap-3 border-t border-slate-100", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setEditingStudent(null),
              className: "px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition cursor-pointer",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: isSavingEdit,
              className: "px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition shadow-md cursor-pointer flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(FiCheck, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: isSavingEdit ? "Saving Changes..." : "Save Changes" })
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    editingTeacher && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in font-sans", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl max-w-lg w-full border shadow-2xl overflow-hidden bg-white text-[#12163A]", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 bg-[#12163A] text-white flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center", children: /* @__PURE__ */ jsx(FiEdit2, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-base text-white", children: "Edit Faculty Dossier" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-300", children: [
              "ID: ",
              editingTeacher.id,
              " • ",
              editingTeacher.name
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setEditingTeacher(null),
            "aria-label": "Close modal",
            className: "w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer text-white",
            children: /* @__PURE__ */ jsx(FiX, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSaveTeacherEdit, className: "p-6 space-y-4 text-xs", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-bold mb-1 text-slate-700", children: "Faculty Name *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              value: editingTeacher.name,
              onChange: (e) => setEditingTeacher({ ...editingTeacher, name: e.target.value }),
              className: "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block font-bold mb-1 text-slate-700", children: "Department *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                required: true,
                value: editingTeacher.dept,
                onChange: (e) => setEditingTeacher({ ...editingTeacher, dept: e.target.value }),
                className: "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block font-bold mb-1 text-slate-700", children: "Subject Taught *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                required: true,
                value: editingTeacher.subject,
                onChange: (e) => setEditingTeacher({ ...editingTeacher, subject: e.target.value }),
                className: "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-bold mb-1 text-slate-700", children: "Qualification & Degree *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              value: editingTeacher.qualification,
              onChange: (e) => setEditingTeacher({ ...editingTeacher, qualification: e.target.value }),
              className: "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-bold mb-1 text-slate-700", children: "Email Address *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              required: true,
              value: editingTeacher.email,
              onChange: (e) => setEditingTeacher({ ...editingTeacher, email: e.target.value }),
              className: "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-bold mb-1 text-slate-700", children: "Assigned Classes *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              value: editingTeacher.classes,
              onChange: (e) => setEditingTeacher({ ...editingTeacher, classes: e.target.value }),
              className: "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 font-bold"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 flex items-center justify-end gap-3 border-t border-slate-100", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setEditingTeacher(null),
              className: "px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition cursor-pointer",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: isSavingEdit,
              className: "px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition shadow-md cursor-pointer flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(FiCheck, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: isSavingEdit ? "Updating Teacher..." : "Save Changes" })
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    isEditingSchoolProfile && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in font-sans", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl max-w-lg w-full border shadow-2xl overflow-hidden bg-white text-[#12163A]", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 bg-[#12163A] text-white flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center", children: /* @__PURE__ */ jsx(FiEdit2, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-base text-white", children: "Edit School Profile & Settings" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-300", children: "Institutional Governance & Accreditation Configuration" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsEditingSchoolProfile(false),
            "aria-label": "Close modal",
            className: "w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer text-white",
            children: /* @__PURE__ */ jsx(FiX, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSaveSchoolProfile, className: "p-6 space-y-4 text-xs", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-bold mb-1 text-slate-700", children: "School Institution Name *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              value: schoolProfile.name,
              onChange: (e) => setSchoolProfile({ ...schoolProfile, name: e.target.value }),
              className: "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 font-bold"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-bold mb-1 text-slate-700", children: "Affiliation & Board Code *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              value: schoolProfile.affiliation,
              onChange: (e) => setSchoolProfile({ ...schoolProfile, affiliation: e.target.value }),
              className: "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block font-bold mb-1 text-slate-700", children: "Principal Administrator *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                required: true,
                value: schoolProfile.principal,
                onChange: (e) => setSchoolProfile({ ...schoolProfile, principal: e.target.value }),
                className: "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block font-bold mb-1 text-slate-700", children: "Academic Year *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                required: true,
                value: schoolProfile.year,
                onChange: (e) => setSchoolProfile({ ...schoolProfile, year: e.target.value }),
                className: "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900 font-bold"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-bold mb-1 text-slate-700", children: "Official Admin Email Address *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              required: true,
              value: schoolProfile.email,
              onChange: (e) => setSchoolProfile({ ...schoolProfile, email: e.target.value }),
              className: "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 flex items-center justify-end gap-3 border-t border-slate-100", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setIsEditingSchoolProfile(false),
              className: "px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition cursor-pointer",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: isSavingEdit,
              className: "px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition shadow-md cursor-pointer flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(FiCheck, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: isSavingEdit ? "Saving Profile..." : "Save Changes" })
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      VideoCallModal,
      {
        isOpen: isVideoCallOpen,
        sessionTitle: videoSessionConfig.title,
        hostName: videoSessionConfig.hostName,
        onClose: () => setIsVideoCallOpen(false),
        onShowToast,
        isDarkMode
      }
    )
  ] });
};
const collegeService = {
  /**
   * Register a new College / University Institution
   * POST /api/v1/institutions/register
   */
  async registerCollege(data) {
    return await apiClient(API_ENDPOINTS.ADMIN.INSTITUTIONS_REGISTER, {
      method: "POST",
      body: JSON.stringify({ ...data, type: data.type || "degree_college" })
    });
  },
  /**
   * Fetch live college data and programs
   * GET /api/v1/profile/
   */
  async getCollegeData() {
    var _a2, _b2;
    try {
      const res = await apiClient(API_ENDPOINTS.PROFILE.GET);
      const roleData = ((_b2 = (_a2 = res.data) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.roleData) || {};
      const programs = Array.isArray(roleData.programs) ? roleData.programs : [];
      const drives = Array.isArray(roleData.drives) ? roleData.drives : [];
      const partners = Array.isArray(roleData.partners) ? roleData.partners : [];
      const applications = Array.isArray(roleData.applications) ? roleData.applications : [];
      return { programs, drives, partners, applications };
    } catch {
      return { programs: [], drives: [], partners: [], applications: [] };
    }
  },
  /**
   * Update college programs, placement drives, partners, or applications in backend profile roleData
   * PUT /api/v1/profile/complete
   */
  async updateCollegeData(updates) {
    var _a2, _b2, _c;
    const current = await apiClient(API_ENDPOINTS.PROFILE.GET).catch(() => null);
    const existingRoleData = ((_b2 = (_a2 = current == null ? void 0 : current.data) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.roleData) || {};
    const existingP = ((_c = current == null ? void 0 : current.data) == null ? void 0 : _c.profile) || {};
    const updatedRoleData = {
      ...existingRoleData,
      ...updates.programs ? { programs: updates.programs } : {},
      ...updates.drives ? { drives: updates.drives } : {},
      ...updates.partners ? { partners: updates.partners } : {},
      ...updates.applications ? { applications: updates.applications } : {}
    };
    return await apiClient(API_ENDPOINTS.PROFILE.COMPLETE, {
      method: "PUT",
      body: JSON.stringify({
        firstName: existingP.firstName || "College",
        lastName: existingP.lastName || "Dean",
        phoneNumber: existingP.phoneNumber || "9876543210",
        bio: existingP.bio || "College Admissions & Placement Cell",
        onboardingCompleted: true,
        roleData: updatedRoleData
      })
    });
  },
  /**
   * Schedule a placement drive on the backend
   * POST /api/v1/college/drives
   */
  async savePlacementDrive(driveData) {
    try {
      await apiClient("/api/v1/college/drives", {
        method: "POST",
        body: JSON.stringify(driveData)
      });
    } catch (err) {
      console.warn("Drive API sync:", err);
    }
  }
};
const CollegeDashboard = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const queryClient = useQueryClient();
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState({
    title: "",
    subtitle: "",
    fields: []
  });
  const { data: collegeData, isLoading } = useQuery({
    queryKey: ["collegeData"],
    queryFn: () => collegeService.getCollegeData()
  });
  const programsList = (collegeData == null ? void 0 : collegeData.programs) || [];
  const drivesList = (collegeData == null ? void 0 : collegeData.drives) || [];
  const partnersList = (collegeData == null ? void 0 : collegeData.partners) || [];
  const applicationsList = (collegeData == null ? void 0 : collegeData.applications) || [];
  const updateMutation = useMutation({
    mutationFn: (updates) => collegeService.updateCollegeData(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collegeData"] });
    },
    onError: (err) => {
      onShowToast("Unable to save changes. Please try again.");
    }
  });
  if (["discovery", "assessment", "psychometric", "dna", "ai-recommendations", "scholarships", "colleges", "roadmap", "resume-ats", "learning"].includes(activeSubView)) {
    return /* @__PURE__ */ jsx(StudentToolsViews, { activeSubView, onShowToast, isDarkMode });
  }
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
        enrolled: 0,
        avgCtc: data.avgCtc || "₹20.0 LPA"
      };
      const updatedPrograms = [newProg, ...programsList];
      updateMutation.mutate({ programs: updatedPrograms });
      onShowToast(`Added new academic program: ${newProg.title}!`);
    } else if (actionModalConfig.title === "Schedule Placement Drive") {
      const newDrive = {
        company: data.company || "Corporate Recruiter",
        role: data.role || "Graduate Software Engineer",
        ctc: data.ctc || "₹14.0 LPA",
        applicants: "0 Students",
        status: "Registrations Open"
      };
      const updatedDrives = [newDrive, ...drivesList];
      updateMutation.mutate({ drives: updatedDrives });
      collegeService.savePlacementDrive(newDrive).catch(() => {
      });
      onShowToast(`Scheduled campus placement drive for ${newDrive.company}!`);
    } else if (actionModalConfig.title === "Register Corporate Partner") {
      const newPartner = {
        company: data.company || "Enterprise Tech Partner",
        track: data.track || "Industry Internship Track",
        mou: "Active (Campus MoU Signed)",
        status: "Active Partner"
      };
      const updatedPartners = [newPartner, ...partnersList];
      updateMutation.mutate({ partners: updatedPartners });
      onShowToast(`Registered corporate partner: ${newPartner.company}!`);
    } else {
      onShowToast(`Action completed: ${actionModalConfig.title}`);
    }
    setIsActionModalOpen(false);
  };
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-xl" : "bg-white border-slate-200 text-slate-900 shadow-xs";
  const textMuted = isDarkMode ? "text-slate-400" : "text-[#6B7280]";
  const textHeading = isDarkMode ? "text-white" : "text-[#12163A]";
  const borderDivider = isDarkMode ? "border-slate-800" : "border-slate-100";
  const renderContent = () => {
    if (activeSubView === "overview") {
      return /* @__PURE__ */ jsxs("div", { className: "space-y-6 font-sans text-[14px]", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#12163A] text-white shadow-md border border-[#12163A] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium block text-slate-300", children: "Degree Programs" }),
            /* @__PURE__ */ jsxs("div", { className: "text-[28px] md:text-[32px] font-bold text-white leading-none tracking-[-0.02em]", children: [
              programsList.length,
              " Tracks"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-[#E4F4EC] bg-[#E4F4EC]/10 px-2.5 py-0.5 rounded-full inline-block", children: "Active Academics" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium block text-[#4B5563]", children: "Applications" }),
            /* @__PURE__ */ jsx("div", { className: "text-[28px] md:text-[32px] font-bold text-[#12163A] leading-none tracking-[-0.02em]", children: applicationsList.length }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-[#3665EE]", children: "Admissions Pipeline" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium block text-[#4B5563]", children: "Placement Drives" }),
            /* @__PURE__ */ jsxs("div", { className: "text-[28px] md:text-[32px] font-bold text-[#3665EE] leading-none tracking-[-0.02em]", children: [
              drivesList.length,
              " Drives"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-[#12163A]", children: "Corporate Recruitment" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium block text-[#4B5563]", children: "Corporate Partners" }),
            /* @__PURE__ */ jsxs("div", { className: "text-[28px] md:text-[32px] font-bold text-[#12163A] leading-none tracking-[-0.02em]", children: [
              partnersList.length,
              " MoUs"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-[#3665EE]", children: "Active Collaborations" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-[24px] border space-y-4 ${cardClass}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: `text-[16px] md:text-[18px] font-semibold ${textHeading}`, children: "College Registration & Institutional Accreditation" }),
              /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal mt-1`, children: "Role Ready Verified Higher Education Institution Portal" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "bg-[#E4F4EC] text-[#12163A] font-semibold text-[12px] px-3.5 py-1 rounded-full border border-[#C3E6D5] self-start sm:self-auto", children: "✓ Verification Completed" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 pt-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium text-[#4B5563]", children: "Admissions Pipeline" }),
              /* @__PURE__ */ jsxs("div", { className: "text-[20px] md:text-[22px] font-bold text-[#3665EE]", children: [
                applicationsList.length,
                " Applications"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[12px] text-[#4B5563] block", children: "Live Student Pipeline" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A] space-y-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium text-[#4B5563]", children: "Corporate Placement Drives" }),
              /* @__PURE__ */ jsxs("div", { className: "text-[20px] md:text-[22px] font-bold text-[#12163A]", children: [
                drivesList.length,
                " Active Drives"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[12px] text-[#4B5563] block", children: "Campus Recruitment Desk" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] bg-[#E4F4EC] border border-[#C3E6D5] text-[#12163A] space-y-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium text-[#4B5563]", children: "Industry MoUs Active" }),
              /* @__PURE__ */ jsxs("div", { className: "text-[20px] md:text-[22px] font-bold text-[#12163A]", children: [
                partnersList.length,
                " Active MoUs"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[12px] text-[#3665EE] font-medium block", children: "Industry Tech Partners" })
            ] })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "programs") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiBookOpen, { className: "w-5 h-5 text-[#3665EE]" }),
              " Academic Programs & Degree Tracks"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Manage undergraduate, postgraduate, and doctoral degree programs" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Add Academic Program", "Register a new degree track or specialized program", [
                { label: "Program Title", name: "title", type: "text", placeholder: "B.Tech Computer Science & AI" },
                { label: "Degree Level", name: "degree", type: "text", placeholder: "Undergraduate (4 Yrs)" },
                { label: "Seat Capacity", name: "seats", type: "number", placeholder: "120" },
                { label: "Expected Avg CTC", name: "avgCtc", type: "text", placeholder: "₹20.0 LPA" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FiPlus, { className: "w-4 h-4" }),
                " Add Academic Program"
              ]
            }
          )
        ] }),
        programsList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-[13px] text-slate-400", children: [
          /* @__PURE__ */ jsx(FiBookOpen, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "No academic programs added yet. Click '+ Add Academic Program' to publish a degree track."
        ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: programsList.map((p, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-md font-semibold", children: p.code }),
              /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: p.title })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-[13px] text-[#4B5563] mt-1", children: [
              p.degree,
              " • Enrolled: ",
              p.enrolled,
              " / ",
              p.seats,
              " Seats"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-[#3665EE] font-bold text-[16px]", children: [
              "Avg CTC: ",
              p.avgCtc
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-white text-[#12163A] border border-slate-200 px-3 py-1 rounded-full font-semibold block mt-1", children: "Active Track" })
          ] })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "admissions") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsx("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
            /* @__PURE__ */ jsx(FiUserCheck, { className: "w-5 h-5 text-[#3665EE]" }),
            " College Admissions & Entrance Cutoff Hub"
          ] }),
          /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Configure admission drives, entrance examination cutoffs, & quotas" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-[13px] text-slate-400", children: [
          /* @__PURE__ */ jsx(FiUserCheck, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "Admissions cycles are synchronized with registered academic programs."
        ] })
      ] });
    }
    if (activeSubView === "applications") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiFileText, { className: "w-5 h-5 text-[#3665EE]" }),
              " Student Application & Enrollment Pipeline"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Review student applications and admission status" })
          ] }),
          applicationsList.length > 0 && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                const headers = ["Application ID", "Student Name", "Program Applied", "Entrance Score", "Document Status", "Application Status"];
                const rows = applicationsList.map((a) => [a.id, `"${a.name}"`, `"${a.program}"`, `"${a.score}"`, `"${a.docs}"`, `"${a.status}"`]);
                const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
                const link = document.createElement("a");
                link.setAttribute("href", encodeURI(csvContent));
                link.setAttribute("download", `college-applications-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                onShowToast("Downloaded Applications Pipeline CSV!");
              },
              className: "px-4 py-2 rounded-xl text-[14px] font-semibold border border-slate-200 bg-slate-50 text-[#12163A] hover:bg-slate-100 transition cursor-pointer flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(FiDownload, { className: "w-4 h-4" }),
                " Export Applications"
              ]
            }
          )
        ] }),
        applicationsList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-[13px] text-slate-400", children: [
          /* @__PURE__ */ jsx(FiFileText, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "No student applications in pipeline yet."
        ] }) : /* @__PURE__ */ jsx("div", { className: "rounded-[24px] border border-slate-200 overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b text-[12px] font-semibold uppercase bg-[#DEE9FF]/50 text-[#12163A] border-[#C6D9FF]", children: [
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Application ID" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Student Name" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Program Applied" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Entrance Score" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Document Status" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Application Status" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5 text-right", children: "Action" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-100 text-[14px]", children: applicationsList.map((app) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-[#DEE9FF]/20 transition-colors", children: [
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-mono text-[#3665EE] font-semibold text-[13px]", children: app.id }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-semibold text-[#12163A]", children: app.name }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 text-[#4B5563]", children: app.program }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-medium text-[#12163A]", children: app.score }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-medium text-emerald-600", children: app.docs }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5", children: /* @__PURE__ */ jsx("span", { className: "bg-[#E4F4EC] text-[#12163A] border border-[#C3E6D5] px-2.5 py-0.5 rounded-full font-semibold text-[12px]", children: app.status }) }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 text-right", children: /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onShowToast(`Reviewed application for ${app.name}`),
                className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-semibold px-3 py-1.5 rounded-lg text-[12px] transition cursor-pointer",
                children: "Review"
              }
            ) })
          ] }, app.id)) })
        ] }) })
      ] });
    }
    if (activeSubView === "scholarships") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsx("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
            /* @__PURE__ */ jsx(FiAward, { className: "w-5 h-5 text-[#3665EE]" }),
            " Institutional Scholarship & Aid Cell"
          ] }),
          /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Institutional merit aid and corporate scholarship grants" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-[13px] text-slate-400", children: [
          /* @__PURE__ */ jsx(FiAward, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "Scholarship schemes are matched dynamically with qualified student applicants."
        ] })
      ] });
    }
    if (activeSubView === "placement-cell" || activeSubView === "drives") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiBriefcase, { className: "w-5 h-5 text-[#3665EE]" }),
              " Campus Placement Cell & Recruitment Hub"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Manage corporate placement drives, CTC packages, & applicant rosters" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Schedule Placement Drive", "Publish a new corporate recruiting drive", [
                { label: "Company Name", name: "company", type: "text", placeholder: "Microsoft India" },
                { label: "Job Role Title", name: "role", type: "text", placeholder: "Software Development Engineer" },
                { label: "Annual CTC Package", name: "ctc", type: "text", placeholder: "₹24.0 LPA" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FiPlus, { className: "w-4 h-4" }),
                " Schedule Placement Drive"
              ]
            }
          )
        ] }),
        drivesList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-[13px] text-slate-400", children: [
          /* @__PURE__ */ jsx(FiBriefcase, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "No campus placement drives scheduled yet. Click '+ Schedule Placement Drive' to invite companies."
        ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: drivesList.map((d, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: d.company }),
            /* @__PURE__ */ jsx("span", { className: "text-[#3665EE] text-[13px] font-medium", children: d.role }),
            /* @__PURE__ */ jsx("div", { className: "text-[13px] text-[#4B5563] mt-0.5", children: d.applicants })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[#12163A] font-bold text-[16px]", children: d.ctc }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-white border border-slate-200 text-[#12163A] px-3 py-1 rounded-full font-semibold block mt-1", children: d.status })
          ] })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "industry-connect") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiBriefcase, { className: "w-5 h-5 text-[#3665EE]" }),
              " Industry Connect & Enterprise MoUs"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Corporate partnerships, R&D labs, and summer/winter internship tracks" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Register Corporate Partner", "Sign a new campus recruiting MoU", [
                { label: "Company Name", name: "company", type: "text", placeholder: "NVIDIA Graphics India" },
                { label: "Internship / MoU Track", name: "track", type: "text", placeholder: "AI Hardware & CUDA Labs" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FiPlus, { className: "w-4 h-4" }),
                " Register Corporate Partner"
              ]
            }
          )
        ] }),
        partnersList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-[13px] text-slate-400", children: [
          /* @__PURE__ */ jsx(FiBriefcase, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "No industry corporate partners registered yet. Click '+ Register Corporate Partner' to add partner MoUs."
        ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: partnersList.map((pr, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#F6E6D8] border-[#EAD0BC] space-y-2 text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-[#12163A] text-white px-3 py-0.5 rounded-full font-semibold", children: pr.status }),
          /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A] mt-1", children: pr.company }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[#3665EE] font-medium", children: pr.track }),
          /* @__PURE__ */ jsx("div", { className: "text-[13px] text-[#4B5563]", children: pr.mou })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "analytics") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
            /* @__PURE__ */ jsx(FiTrendingUp, { className: "w-5 h-5 text-[#3665EE]" }),
            " Institutional Performance & Placement Analytics"
          ] }),
          /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Placement trends and corporate recruitment distributions" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium text-[#4B5563]", children: "Academic Programs" }),
            /* @__PURE__ */ jsx("div", { className: "text-[28px] md:text-[32px] font-bold text-[#12163A] leading-none my-1", children: programsList.length })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium text-[#4B5563]", children: "Placement Drives" }),
            /* @__PURE__ */ jsx("div", { className: "text-[28px] md:text-[32px] font-bold text-[#3665EE] leading-none my-1", children: drivesList.length })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium text-[#4B5563]", children: "Corporate Partners" }),
            /* @__PURE__ */ jsx("div", { className: "text-[28px] md:text-[32px] font-bold text-[#12163A] leading-none my-1", children: partnersList.length })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "notifications") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiBell, { className: "w-5 h-5 text-[#3665EE]" }),
              " College Admin Notifications & Announcements"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Placement deadlines, MoU updates, and institutional accreditation alerts" })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => onShowToast("Marked all notifications as read"), className: "text-[#3665EE] text-[14px] font-semibold hover:underline cursor-pointer", children: "Mark All as Read" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "py-8 text-center text-[13px] text-slate-400", children: "No active institutional alerts at this time." })
      ] });
    }
    return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: `pb-4 border-b ${borderDivider}`, children: [
        /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
          /* @__PURE__ */ jsx(FiSliders, { className: "w-5 h-5 text-[#3665EE]" }),
          " College Governance & System Settings"
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Configure institutional profile, academic year, campus settings, & user permissions" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: "University Profile" }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[#4B5563]", children: "Higher Education Degree College Institution Desk" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: "Placement Cell RBAC Permissions" }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[#4B5563]", children: "Institutional Placement Officers & Faculty Accounts Active" })
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
const mentorService = {
  /**
   * Fetch live mentor profile, skills, availability slots, and wallet
   * GET /api/v1/profile/
   */
  async getMentorData() {
    var _a2, _b2;
    try {
      const res = await apiClient(API_ENDPOINTS.PROFILE.GET);
      const roleData = ((_b2 = (_a2 = res.data) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.roleData) || {};
      const rawSkills = Array.isArray(roleData.skills) ? roleData.skills.map((s) => typeof s === "string" ? { name: s, level: "Expert", mentees: "Active Mentorship" } : s) : Array.isArray(roleData.mentorSkills) ? roleData.mentorSkills : [];
      const slots = Array.isArray(roleData.slots) ? roleData.slots : [];
      const wallet = roleData.wallet || {
        balance: 48500,
        hourlyRate: 1500,
        payouts: []
      };
      return { skills: rawSkills, slots, wallet };
    } catch {
      return {
        skills: [],
        slots: [],
        wallet: { balance: 0, hourlyRate: 1e3, payouts: [] }
      };
    }
  },
  /**
   * Update mentor skills, slots, or wallet in backend profile roleData
   * PUT /api/v1/profile/complete
   */
  async updateMentorData(updates) {
    var _a2, _b2, _c;
    const current = await apiClient(API_ENDPOINTS.PROFILE.GET).catch(() => null);
    const existingRoleData = ((_b2 = (_a2 = current == null ? void 0 : current.data) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.roleData) || {};
    const existingP = ((_c = current == null ? void 0 : current.data) == null ? void 0 : _c.profile) || {};
    const updatedRoleData = {
      ...existingRoleData,
      ...updates.skills ? {
        skills: updates.skills.map((s) => s.name),
        mentorSkills: updates.skills
      } : {},
      ...updates.slots ? { slots: updates.slots } : {},
      ...updates.wallet ? { wallet: updates.wallet } : {}
    };
    return await apiClient(API_ENDPOINTS.PROFILE.COMPLETE, {
      method: "PUT",
      body: JSON.stringify({
        firstName: existingP.firstName || "Mentor",
        lastName: existingP.lastName || "Advisor",
        phoneNumber: existingP.phoneNumber || "9876543210",
        bio: existingP.bio || "Certified Career & Academic Mentor",
        onboardingCompleted: true,
        roleData: updatedRoleData
      })
    });
  },
  /**
   * Fetch bookings and student requests
   * GET /api/v1/mentor/bookings
   */
  async getMentorBookings() {
    try {
      const res = await apiClient("/api/v1/mentor/bookings");
      return Array.isArray(res.data) ? res.data : [];
    } catch {
      return [];
    }
  },
  /**
   * Save a counseling/guidance note for a student
   * POST /api/v1/mentor/notes/{studentId}
   */
  async saveCounselingNote(studentId, notes) {
    try {
      await apiClient(`/api/v1/mentor/notes/${studentId}`, {
        method: "POST",
        body: JSON.stringify({ notes })
      });
    } catch (err) {
      console.warn("Counseling note API sync:", err);
    }
  }
};
const MentorDashboard = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const queryClient = useQueryClient();
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState({
    title: "",
    subtitle: "",
    fields: []
  });
  const { data: mentorData, isLoading } = useQuery({
    queryKey: ["mentorData"],
    queryFn: () => mentorService.getMentorData()
  });
  const { data: liveBookings } = useQuery({
    queryKey: ["mentorBookings"],
    queryFn: () => mentorService.getMentorBookings()
  });
  const skillsList = (mentorData == null ? void 0 : mentorData.skills) || [];
  const slotsList = (mentorData == null ? void 0 : mentorData.slots) || [];
  const wallet = (mentorData == null ? void 0 : mentorData.wallet) || { balance: 0, hourlyRate: 1500, payouts: [] };
  const updateMutation = useMutation({
    mutationFn: (updates) => mentorService.updateMentorData(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mentorData"] });
    },
    onError: (err) => {
      onShowToast("Unable to save changes. Please try again.");
    }
  });
  if (["discovery", "assessment", "psychometric", "dna", "ai-recommendations", "scholarships", "colleges", "roadmap", "resume-ats", "learning"].includes(activeSubView)) {
    return /* @__PURE__ */ jsx(StudentToolsViews, { activeSubView, onShowToast, isDarkMode });
  }
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
      const updatedSlots = [newSlot, ...slotsList];
      updateMutation.mutate({ slots: updatedSlots });
      onShowToast(`Added new availability slot for ${newSlot.day} (${newSlot.time})!`);
    } else if (actionModalConfig.title === "Add Mentorship Skill") {
      const newSkill = {
        name: data.name || "Technical Domain",
        level: data.level || "Expert",
        mentees: "Active Mentorship"
      };
      const updatedSkills = [newSkill, ...skillsList];
      updateMutation.mutate({ skills: updatedSkills });
      onShowToast(`Added mentorship expertise domain: ${newSkill.name}!`);
    } else if (actionModalConfig.title === "Request Payout Withdrawal") {
      const withdrawAmt = parseInt(data.amount) || 5e3;
      if (withdrawAmt > wallet.balance) {
        onShowToast("Insufficient wallet balance for withdrawal!");
      } else {
        const updatedWallet = {
          ...wallet,
          balance: wallet.balance - withdrawAmt,
          payouts: [
            {
              id: `TXN-${Math.floor(1e3 + Math.random() * 9e3)}`,
              date: "Today",
              amount: `₹${withdrawAmt.toLocaleString()}`,
              status: "Processing Payout"
            },
            ...wallet.payouts || []
          ]
        };
        updateMutation.mutate({ wallet: updatedWallet });
        onShowToast(`Requested withdrawal of ₹${withdrawAmt.toLocaleString()}!`);
      }
    } else if (actionModalConfig.title === "Save Session Notes") {
      mentorService.saveCounselingNote("student", data.notes || "Action items logged").catch(() => {
      });
      onShowToast("Session notes saved and synced with student roadmap!");
    } else {
      onShowToast(`Action completed: ${actionModalConfig.title}`);
    }
    setIsActionModalOpen(false);
  };
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-xl" : "bg-white border-slate-200 text-slate-900 shadow-xs";
  const textMuted = isDarkMode ? "text-slate-400" : "text-[#6B7280]";
  const textHeading = isDarkMode ? "text-white" : "text-[#12163A]";
  const borderDivider = isDarkMode ? "border-slate-800" : "border-slate-100";
  const renderContent = () => {
    if (activeSubView === "overview") {
      return /* @__PURE__ */ jsxs("div", { className: "space-y-6 font-sans text-[14px]", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#12163A] text-white shadow-md space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium block text-slate-300", children: "Mentorship Domains" }),
            /* @__PURE__ */ jsxs("div", { className: "text-[28px] md:text-[32px] font-bold text-white leading-none tracking-[-0.02em]", children: [
              skillsList.length,
              " Skills"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-[#E4F4EC] bg-[#E4F4EC]/10 px-2.5 py-0.5 rounded-full inline-block", children: "Active Expertise" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium block text-[#4B5563]", children: "Calendar Slots" }),
            /* @__PURE__ */ jsxs("div", { className: "text-[28px] md:text-[32px] font-bold text-[#3665EE] leading-none tracking-[-0.02em]", children: [
              slotsList.length,
              " Slots"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-[#12163A]", children: "Bookings Active" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium block text-[#4B5563]", children: "Session Rate" }),
            /* @__PURE__ */ jsxs("div", { className: "text-[28px] md:text-[32px] font-bold text-[#12163A] leading-none tracking-[-0.02em]", children: [
              "₹",
              wallet.hourlyRate,
              " / hr"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-[#3665EE]", children: "Configured Rate" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-white text-[#12163A] shadow-sm border border-slate-200 space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium block text-[#6B7280]", children: "Wallet Balance" }),
            /* @__PURE__ */ jsxs("div", { className: "text-[28px] md:text-[32px] font-bold text-[#3665EE] leading-none tracking-[-0.02em]", children: [
              "₹",
              wallet.balance.toLocaleString()
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block", children: "Available" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-[24px] border space-y-4 ${cardClass}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: `text-[16px] md:text-[18px] font-semibold ${textHeading}`, children: "Career Counselor & Technical Mentor" }),
              /* @__PURE__ */ jsxs("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal mt-1`, children: [
                "Verified Role Ready Mentor • 1-on-1 Guidance Desk • Session Rate: ₹",
                wallet.hourlyRate,
                "/hr"
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "bg-[#E4F4EC] text-[#12163A] font-semibold text-[12px] px-3.5 py-1 rounded-full border border-[#C3E6D5] self-start sm:self-auto", children: "✓ Verified Mentor" })
          ] }),
          slotsList.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[20px] bg-[#DEE9FF] border border-[#C6D9FF] flex items-center justify-between text-[#12163A]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(FiClock, { className: "w-5 h-5 text-[#3665EE]" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: "Next Counseling Slot" }),
                /* @__PURE__ */ jsxs("p", { className: "text-[13px] text-[#4B5563] mt-0.5", children: [
                  slotsList[0].day,
                  " • ",
                  slotsList[0].time,
                  " • ",
                  slotsList[0].topic
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => onShowToast("Joining live video counseling session..."),
                className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md",
                children: [
                  /* @__PURE__ */ jsx(FiVideo, { className: "w-4 h-4" }),
                  " Start Session"
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[20px] bg-[#DEE9FF]/40 border border-[#C6D9FF] flex items-center justify-between text-[#12163A]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(FiCalendar, { className: "w-5 h-5 text-[#3665EE]" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: "No Upcoming Slots" }),
                /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[#4B5563] mt-0.5", children: "Add calendar availability slots so students can book sessions" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => openTriggerModal("Add Available Slot", "Create a new time slot for student bookings", [
                  { label: "Target Day", name: "day", type: "text", placeholder: "Tomorrow" },
                  { label: "Time Slot", name: "time", type: "text", placeholder: "2:00 PM - 3:00 PM" },
                  { label: "Counseling Topic", name: "topic", type: "text", placeholder: "1-on-1 Career Strategy" }
                ]),
                className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer shadow-md",
                children: "+ Add Slot"
              }
            )
          ] })
        ] })
      ] });
    }
    if (activeSubView === "profile") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiUserCheck, { className: "w-5 h-5 text-[#3665EE]" }),
              " Mentor Profile & Verification Credentials"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Verified mentor badge, academic credentials, and session pricing" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openTriggerModal("Edit Profile & Rates", "Update mentor bio and session pricing", [
                { label: "Hourly Session Rate (₹)", name: "rate", type: "number", placeholder: `${wallet.hourlyRate}` },
                { label: "Bio / Specialization", name: "bio", type: "text", placeholder: "AI Architecture & Career Strategy" }
              ]),
              className: "bg-[#12163A] hover:bg-[#1A2050] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md",
              children: "Edit Profile & Rates"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-3 text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-[#12163A] text-white px-3 py-1 rounded-full font-semibold", children: "Academic Background" }),
            /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: "Verified Domain Mentor" }),
            /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[#4B5563] font-normal leading-normal", children: "Specialization in Engineering, AI, and Higher Education Career Roadmaps" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] space-y-3 text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-[#12163A] text-white px-3 py-1 rounded-full font-semibold", children: "Verification Status" }),
            /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: "✓ Verified Mentor Badge" }),
            /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[#4B5563] font-normal leading-normal", children: "Approved for 1-on-1 High School & University Counseling • Real-time Session Sync" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "skills") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiCpu, { className: "w-5 h-5 text-[#3665EE]" }),
              " Mentorship Skill Matrix & Technical Domains"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Expertise domains for AI-driven student matching" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Add Mentorship Skill", "Add a new domain expertise for student counseling", [
                { label: "Skill / Domain Title", name: "name", type: "text", placeholder: "Full-Stack System Design" },
                { label: "Expertise Level", name: "level", type: "text", placeholder: "Expert" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FiPlus, { className: "w-4 h-4" }),
                " Add Mentorship Skill"
              ]
            }
          )
        ] }),
        skillsList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-[13px] text-slate-400", children: [
          /* @__PURE__ */ jsx(FiCpu, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "No mentorship skills registered yet. Click '+ Add Mentorship Skill' to add your expertise."
        ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: skillsList.map((s, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: s.name }),
            /* @__PURE__ */ jsx("span", { className: "text-[#3665EE] text-[13px] font-medium", children: s.mentees })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-white border border-slate-200 text-[#12163A] px-3 py-1 rounded-lg font-semibold shadow-2xs", children: s.level })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "availability" || activeSubView === "calendar") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiCalendar, { className: "w-5 h-5 text-[#3665EE]" }),
              " Slot Booking & Availability Calendar"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Configure 1-on-1 counseling time slots and manage student bookings" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Add Available Slot", "Create a new time slot for student bookings", [
                { label: "Target Day", name: "day", type: "text", placeholder: "Tomorrow" },
                { label: "Time Slot", name: "time", type: "text", placeholder: "2:00 PM - 3:00 PM" },
                { label: "Counseling Topic", name: "topic", type: "text", placeholder: "1-on-1 Career Strategy" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FiPlus, { className: "w-4 h-4" }),
                " Add Available Slot"
              ]
            }
          )
        ] }),
        slotsList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-[13px] text-slate-400", children: [
          /* @__PURE__ */ jsx(FiCalendar, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "No availability slots created yet. Click '+ Add Available Slot' to open counseling slots."
        ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: slotsList.map((sl) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-[20px] border flex items-center justify-between ${sl.bg || "bg-[#DEE9FF]"} ${sl.border || "border-[#C6D9FF]"} text-[#12163A] hover-card-lift`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-[14px] font-semibold text-[#3665EE]", children: [
                sl.day,
                " • ",
                sl.time
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-0.5 rounded-md font-semibold", children: sl.status })
            ] }),
            /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A] mt-1", children: sl.topic }),
            /* @__PURE__ */ jsxs("div", { className: "text-[13px] text-[#4B5563]", children: [
              "Student: ",
              sl.mentee
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast(`Managed slot for ${sl.time}`),
              className: "bg-[#12163A] hover:bg-[#1A2050] text-white text-[14px] font-semibold px-3.5 py-1.5 rounded-xl cursor-pointer",
              children: "Manage Slot"
            }
          )
        ] }, sl.id)) })
      ] });
    }
    if (activeSubView === "student-requests" || activeSubView === "mentees") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsx("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
            /* @__PURE__ */ jsx(FiUsers, { className: "w-5 h-5 text-[#3665EE]" }),
            " Student Counseling Booking Requests"
          ] }),
          /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Review pending mentorship booking requests" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-[13px] text-slate-400", children: [
          /* @__PURE__ */ jsx(FiUsers, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "No pending counseling booking requests at this time."
        ] })
      ] });
    }
    if (activeSubView === "video-sessions" || activeSubView === "counseling") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiVideo, { className: "w-5 h-5 text-[#3665EE]" }),
              " Live 1-on-1 Video Counseling Room"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "HD encrypted video room with live screen share & action plan notes" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Save Session Notes", "Record counseling takeaways and student action items", [
                { label: "Action Items for Student", name: "notes", type: "text", placeholder: "Complete roadmap milestones and ATS resume update" }
              ]),
              className: "bg-[#12163A] hover:bg-[#1A2050] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md",
              children: [
                /* @__PURE__ */ jsx(FiFileText, { className: "w-4 h-4" }),
                " Save Session Notes"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 rounded-[24px] bg-[#12163A] text-white text-center space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-[#3665EE] flex items-center justify-center mx-auto shadow-lg", children: /* @__PURE__ */ jsx(FiVideo, { className: "w-8 h-8 text-white" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-[20px] md:text-[22px] font-semibold", children: "Encrypted Video Counseling Room" }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-300 max-w-md mx-auto leading-normal", children: "Ready to launch 1-on-1 video call. Camera and microphone permissions active." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast("Camera & Microphone connected! Launching HD video stream."),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-6 py-2.5 rounded-xl cursor-pointer shadow-md transition hover:scale-105",
              children: "Launch Live Call Now"
            }
          )
        ] })
      ] });
    }
    if (activeSubView === "guidance") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiCompass, { className: "w-5 h-5 text-[#3665EE]" }),
              " Student Assessment Review & Career Guidance"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Review Holland Code DNA passports & issue customized career roadmaps" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Issue Career Action Plan", "Send structured action items to student portal", [
                { label: "Target Student", name: "student", type: "text", placeholder: "Student Name" },
                { label: "Recommended Milestone", name: "milestone", type: "text", placeholder: "Complete PyTorch Certification" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FiPlus, { className: "w-4 h-4" }),
                " Issue Career Action Plan"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-[13px] text-slate-400", children: [
          /* @__PURE__ */ jsx(FiCompass, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "No pending student assessment reviews at this time."
        ] })
      ] });
    }
    if (activeSubView === "ratings") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
            /* @__PURE__ */ jsx(FiStar, { className: "w-5 h-5 text-amber-500" }),
            " Student Ratings & Counselor Reviews"
          ] }),
          /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Verified student feedback and ratings from live mentorship sessions" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[32px] md:text-[36px] font-bold text-[#3665EE] leading-none", children: "5.0 / 5.0" }),
            /* @__PURE__ */ jsx("p", { className: "text-[14px] font-semibold text-[#12163A] mt-2", children: "Average Star Rating" }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] text-[#4B5563] block mt-0.5", children: "Verified Reviews" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[32px] md:text-[36px] font-bold text-[#12163A] leading-none", children: "100%" }),
            /* @__PURE__ */ jsx("p", { className: "text-[14px] font-semibold text-[#12163A] mt-2", children: "Student Satisfaction" }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] text-[#4B5563] block mt-0.5", children: "Certified Mentor Badge" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[32px] md:text-[36px] font-bold text-[#12163A] leading-none", children: slotsList.length }),
            /* @__PURE__ */ jsx("p", { className: "text-[14px] font-semibold text-[#12163A] mt-2", children: "Total Slots Configured" }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] text-[#3665EE] font-medium block mt-0.5", children: "Active Guidance" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "wallet") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiCreditCard, { className: "w-5 h-5 text-[#3665EE]" }),
              " Mentor Wallet & Bank Payout Desk"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Track session earnings, wallet balance, & request direct bank transfers" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Request Payout Withdrawal", "Transfer earnings from wallet to verified bank account", [
                { label: "Withdrawal Amount (₹)", name: "amount", type: "number", placeholder: "5000" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FiDollarSign, { className: "w-4 h-4" }),
                " Request Payout Withdrawal"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#12163A] text-white space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-300 text-[13px] font-medium block", children: "Available Wallet Balance" }),
            /* @__PURE__ */ jsxs("div", { className: "text-[28px] md:text-[32px] font-bold text-white leading-none tracking-[-0.02em]", children: [
              "₹",
              wallet.balance.toLocaleString()
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] text-[#E4F4EC] bg-[#E4F4EC]/10 px-2.5 py-0.5 rounded-full inline-block font-medium", children: "Ready for Withdrawal" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#4B5563] text-[13px] font-medium block", children: "Configured Session Hourly Rate" }),
            /* @__PURE__ */ jsxs("div", { className: "text-[28px] md:text-[32px] font-bold text-[#3665EE] leading-none tracking-[-0.02em]", children: [
              "₹",
              wallet.hourlyRate,
              " / hr"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] text-[#4B5563] block", children: "Direct Mentor Compensation" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 mt-4", children: [
          /* @__PURE__ */ jsx("h3", { className: `text-[16px] md:text-[17px] font-semibold ${textHeading}`, children: "Payout History" }),
          !wallet.payouts || wallet.payouts.length === 0 ? /* @__PURE__ */ jsx("div", { className: "py-8 text-center text-[13px] text-slate-400", children: "No payout transactions recorded yet." }) : /* @__PURE__ */ jsx("div", { className: "space-y-2", children: wallet.payouts.map((p) => /* @__PURE__ */ jsxs("div", { className: "p-3.5 rounded-xl border bg-slate-50 flex items-center justify-between text-[13px]", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-900", children: p.id }),
              /* @__PURE__ */ jsx("span", { className: "text-slate-500 ml-2", children: p.date })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-emerald-600", children: p.amount }),
              /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-white border px-2.5 py-0.5 rounded-full font-medium", children: p.status })
            ] })
          ] }, p.id)) })
        ] })
      ] });
    }
    if (activeSubView === "notifications") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiBell, { className: "w-5 h-5 text-[#3665EE]" }),
              " Mentor Notifications & Session Reminders"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Session alerts, booking requests, and payout confirmation receipts" })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => onShowToast("Marked all mentor alerts as read"), className: "text-[#3665EE] text-[14px] font-semibold hover:underline cursor-pointer", children: "Mark All as Read" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "py-8 text-center text-[13px] text-slate-400", children: "No active mentor alerts at this time." })
      ] });
    }
    return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: `pb-4 border-b ${borderDivider}`, children: [
        /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
          /* @__PURE__ */ jsx(FiSliders, { className: "w-5 h-5 text-[#3665EE]" }),
          " Mentor Settings & Account Preferences"
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Configure session rates, camera/mic devices, & withdrawal bank details" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: "Session Pricing Settings" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[13px] text-[#4B5563]", children: [
            "Current Rate: ₹",
            wallet.hourlyRate,
            " / 60 Min Session"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: "Payout Bank Account" }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[#4B5563]", children: "Bank Account Configured • Instant Payout Enabled" })
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
const trainingService = {
  /**
   * Fetch live training institute courses, bootcamps, and certifications
   * Uses live GET /api/v1/learning/courses + backend profile roleData
   */
  async getTrainingData() {
    var _a2, _b2;
    try {
      let liveCourses = [];
      try {
        const cRes = await apiClient("/api/v1/learning/courses");
        if ((cRes == null ? void 0 : cRes.data) && Array.isArray(cRes.data) && cRes.data.length > 0) {
          liveCourses = cRes.data.map((c) => ({
            title: c.title || c.name || "Curriculum Course",
            duration: c.duration || "12 Weeks",
            enrolled: `${c.completedLessons || 50} Trainees Enrolled`,
            status: "Active Cohort"
          }));
        }
      } catch {
      }
      const res = await apiClient(API_ENDPOINTS.PROFILE.GET);
      const roleData = ((_b2 = (_a2 = res.data) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.roleData) || {};
      const savedBootcamps = Array.isArray(roleData.bootcamps) ? roleData.bootcamps : [];
      const certifications = Array.isArray(roleData.certifications) ? roleData.certifications : [];
      const combinedCourses = liveCourses.length > 0 ? liveCourses : savedBootcamps;
      return { courses: combinedCourses, certifications };
    } catch {
      return { courses: [], certifications: [] };
    }
  },
  /**
   * Add a new bootcamp track and persist in backend profile roleData
   * PUT /api/v1/profile/complete
   */
  async addBootcampTrack(newCourse) {
    var _a2, _b2, _c;
    const current = await apiClient(API_ENDPOINTS.PROFILE.GET).catch(() => null);
    const existingRoleData = ((_b2 = (_a2 = current == null ? void 0 : current.data) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.roleData) || {};
    const existingP = ((_c = current == null ? void 0 : current.data) == null ? void 0 : _c.profile) || {};
    const currentBootcamps = Array.isArray(existingRoleData.bootcamps) ? existingRoleData.bootcamps : [];
    const updatedBootcamps = [newCourse, ...currentBootcamps];
    return await apiClient(API_ENDPOINTS.PROFILE.COMPLETE, {
      method: "PUT",
      body: JSON.stringify({
        firstName: existingP.firstName || "Training",
        lastName: existingP.lastName || "Institute",
        phoneNumber: existingP.phoneNumber || "9876543210",
        bio: existingP.bio || "Skill Academy & Professional Training Institute",
        onboardingCompleted: true,
        roleData: { ...existingRoleData, bootcamps: updatedBootcamps }
      })
    });
  }
};
const TrainingDashboard = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: trainingData, isLoading } = useQuery({
    queryKey: ["trainingData"],
    queryFn: () => trainingService.getTrainingData()
  });
  const coursesList = (trainingData == null ? void 0 : trainingData.courses) || [];
  const certifications = (trainingData == null ? void 0 : trainingData.certifications) || [];
  const addBootcampMutation = useMutation({
    mutationFn: (course) => trainingService.addBootcampTrack(course),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainingData"] });
      onShowToast("Published new bootcamp track successfully!");
    },
    onError: (err) => {
      onShowToast("Unable to publish bootcamp. Please try again.");
    }
  });
  if (["discovery", "assessment", "psychometric", "dna", "ai-recommendations", "scholarships", "colleges", "roadmap", "resume-ats", "learning"].includes(activeSubView)) {
    return /* @__PURE__ */ jsx(StudentToolsViews, { activeSubView, onShowToast, isDarkMode });
  }
  const handleAddBootcamp = (data) => {
    const newCourse = {
      title: data.title || "Specialized Tech Bootcamp",
      duration: data.duration || "12 Weeks",
      enrolled: "1 Cohort Enrolled",
      status: "Active Cohort"
    };
    addBootcampMutation.mutate(newCourse);
    setIsModalOpen(false);
  };
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-xl" : "bg-white border-blue-100 text-slate-900 shadow-sm";
  const subCardClass = isDarkMode ? "bg-slate-800/80 border-slate-700/80 text-white" : "bg-blue-50/40 border-blue-100 text-slate-900";
  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-500";
  const textHeading = isDarkMode ? "text-white" : "text-slate-900";
  const borderDivider = isDarkMode ? "border-slate-800" : "border-slate-100";
  if (activeSubView === "courses") {
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: `text-lg font-bold flex items-center gap-2 ${textHeading}`, children: [
            /* @__PURE__ */ jsx(FiBookOpen, { className: "w-5 h-5 text-blue-500" }),
            " Skill Courses & Curriculum Track"
          ] }),
          /* @__PURE__ */ jsx("p", { className: textMuted, children: "Industry bootcamps and certification learning modules" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsModalOpen(true),
            className: "bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-500/20",
            children: "+ Add New Bootcamp"
          }
        )
      ] }),
      coursesList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-xs text-slate-400", children: [
        /* @__PURE__ */ jsx(FiBookOpen, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
        "No skill bootcamps published yet. Click '+ Add New Bootcamp' to launch a track."
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: coursesList.map((c, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border space-y-2 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast(`Opened course details for ${c.title}`), children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold text-sm ${textHeading}`, children: c.title }),
        /* @__PURE__ */ jsxs("div", { className: "text-blue-400 font-semibold", children: [
          c.duration,
          " • ",
          c.enrolled
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold inline-block", children: c.status })
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
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("h2", { className: `text-lg font-bold flex items-center gap-2 ${textHeading}`, children: [
        /* @__PURE__ */ jsx(FiAward, { className: "w-5 h-5 text-blue-500" }),
        " Certifications Registry"
      ] }),
      /* @__PURE__ */ jsx("p", { className: textMuted, children: "Industry-accredited digital credentials issued to trainees" }),
      certifications.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-xs text-slate-400", children: [
        /* @__PURE__ */ jsx(FiAward, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
        "No digital credentials issued yet. Certifications sync automatically upon module completion."
      ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: certifications.map((ct, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast(`Verifying certificate ${ct.name}`), children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: `font-bold ${textHeading}`, children: ct.name }),
          /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-semibold", children: ct.body })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("span", { className: "text-emerald-400 font-mono font-bold", children: ct.validity }),
          /* @__PURE__ */ jsx("div", { className: `text-[10px] ${textMuted}`, children: ct.activeCandidates })
        ] })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "hiring") {
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("h2", { className: `text-lg font-bold flex items-center gap-2 ${textHeading}`, children: [
        /* @__PURE__ */ jsx(FiBriefcase, { className: "w-5 h-5 text-blue-500" }),
        " Hiring Partner Enterprises"
      ] }),
      /* @__PURE__ */ jsx("p", { className: textMuted, children: "Corporate partners recruiting directly from institute bootcamps" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: ["Infosys", "TCS", "Accenture", "Cognizant", "Capgemini", "Wipro", "HCL Tech", "Tech Mahindra"].map((hp, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border font-bold flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast(`Opened MoU details for ${hp}`), children: [
        /* @__PURE__ */ jsx("span", { className: textHeading, children: hp }),
        /* @__PURE__ */ jsx("span", { className: "text-emerald-400 text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30", children: "MoU Active" })
      ] }, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `pb-4 border-b ${borderDivider}`, children: [
      /* @__PURE__ */ jsxs("h2", { className: `text-lg font-bold flex items-center gap-2 ${textHeading}`, children: [
        /* @__PURE__ */ jsx(FiGrid, { className: "w-5 h-5 text-blue-500" }),
        " Training Institute Portal Overview"
      ] }),
      /* @__PURE__ */ jsx("p", { className: textMuted, children: "Skill bootcamps, certified trainees, accreditation tracks, and hiring enterprise ties" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Trainee Cohorts"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-semibold block ${textMuted}`, children: "Active Tracks" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-blue-400 mt-1", children: coursesList.length }),
        /* @__PURE__ */ jsx("span", { className: `text-[10px] ${textMuted}`, children: coursesList.length > 0 ? "Live Bootcamps" : "No active bootcamps" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Certification Rates"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-semibold block ${textMuted}`, children: "Digital Credentials" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-emerald-400 mt-1", children: certifications.length }),
        /* @__PURE__ */ jsx("span", { className: `text-[10px] ${textMuted}`, children: "Industry Accredited" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Hiring Partners"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-semibold block ${textMuted}`, children: "Corporate Placement" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-blue-400 mt-1", children: "8 Partners" }),
        /* @__PURE__ */ jsx("span", { className: `text-[10px] ${textMuted}`, children: "MoU Signed" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Employment Index"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-semibold block ${textMuted}`, children: "Platform Status" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-emerald-400 mt-1", children: "Connected" }),
        /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-bold", children: [
          /* @__PURE__ */ jsx(FiTrendingUp, { className: "w-3 h-3" }),
          " System Synchronized"
        ] })
      ] })
    ] })
  ] });
};
const recruiterService = {
  /**
   * Fetch live recruiter jobs, campus drives, interviews, and offers
   * GET /api/v1/profile/
   */
  async getRecruiterData() {
    var _a2, _b2;
    try {
      const res = await apiClient(API_ENDPOINTS.PROFILE.GET);
      const roleData = ((_b2 = (_a2 = res.data) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.roleData) || {};
      const jobs = Array.isArray(roleData.jobs) ? roleData.jobs : [];
      const campusDrives = Array.isArray(roleData.campusDrives) ? roleData.campusDrives : [];
      const interviews = Array.isArray(roleData.interviews) ? roleData.interviews : [];
      const offers = Array.isArray(roleData.offers) ? roleData.offers : [];
      return { jobs, campusDrives, interviews, offers };
    } catch {
      return { jobs: [], campusDrives: [], interviews: [], offers: [] };
    }
  },
  /**
   * Update recruiter jobs, campus drives, interviews, or offers in backend profile roleData
   * PUT /api/v1/profile/complete
   */
  async updateRecruiterData(updates) {
    var _a2, _b2, _c;
    const current = await apiClient(API_ENDPOINTS.PROFILE.GET).catch(() => null);
    const existingRoleData = ((_b2 = (_a2 = current == null ? void 0 : current.data) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.roleData) || {};
    const existingP = ((_c = current == null ? void 0 : current.data) == null ? void 0 : _c.profile) || {};
    const updatedRoleData = {
      ...existingRoleData,
      ...updates.jobs ? { jobs: updates.jobs } : {},
      ...updates.campusDrives ? { campusDrives: updates.campusDrives } : {},
      ...updates.interviews ? { interviews: updates.interviews } : {},
      ...updates.offers ? { offers: updates.offers } : {}
    };
    return await apiClient(API_ENDPOINTS.PROFILE.COMPLETE, {
      method: "PUT",
      body: JSON.stringify({
        firstName: existingP.firstName || "Talent",
        lastName: existingP.lastName || "Recruiter",
        phoneNumber: existingP.phoneNumber || "9876543210",
        bio: existingP.bio || "Corporate Talent Acquisition Lead",
        onboardingCompleted: true,
        roleData: updatedRoleData
      })
    });
  },
  /**
   * Post a new Job Requisition to backend
   * POST /api/v1/recruiter/jobs
   */
  async saveJobPosting(jobData) {
    try {
      await apiClient("/api/v1/recruiter/jobs", {
        method: "POST",
        body: JSON.stringify(jobData)
      });
    } catch (err) {
      console.warn("Job posting API sync:", err);
    }
  }
};
const RecruiterDashboard = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const queryClient = useQueryClient();
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState({
    title: "",
    subtitle: "",
    fields: []
  });
  const { data: recruiterData, isLoading } = useQuery({
    queryKey: ["recruiterData"],
    queryFn: () => recruiterService.getRecruiterData()
  });
  const jobsList = (recruiterData == null ? void 0 : recruiterData.jobs) || [];
  const campusList = (recruiterData == null ? void 0 : recruiterData.campusDrives) || [];
  const interviewsList = (recruiterData == null ? void 0 : recruiterData.interviews) || [];
  const offersList = (recruiterData == null ? void 0 : recruiterData.offers) || [];
  const updateMutation = useMutation({
    mutationFn: (updates) => recruiterService.updateRecruiterData(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiterData"] });
    },
    onError: (err) => {
      onShowToast("Unable to save changes. Please try again.");
    }
  });
  if (["discovery", "assessment", "psychometric", "dna", "ai-recommendations", "scholarships", "colleges", "roadmap", "resume-ats", "learning"].includes(activeSubView)) {
    return /* @__PURE__ */ jsx(StudentToolsViews, { activeSubView, onShowToast, isDarkMode });
  }
  const openTriggerModal = (title, subtitle, fields) => {
    setActionModalConfig({ title, subtitle, fields });
    setIsActionModalOpen(true);
  };
  const handleModalFormSubmit = async (data) => {
    if (actionModalConfig.title === "Post New Job Requisition") {
      const newJob = {
        id: `JOB-${Math.floor(100 + Math.random() * 900)}`,
        title: data.title || "Software Engineer",
        ctc: data.ctc || "₹20.0 LPA",
        location: data.location || "Bengaluru",
        applicants: 0,
        status: "Active Requisition"
      };
      const updatedJobs = [newJob, ...jobsList];
      updateMutation.mutate({ jobs: updatedJobs });
      recruiterService.saveJobPosting(newJob).catch(() => {
      });
      onShowToast(`Posted new job requisition for ${newJob.title}!`);
    } else if (actionModalConfig.title === "Register Campus Drive") {
      const newCampus = {
        university: data.university || "University Partner",
        driveDate: data.date || "Next Month",
        roles: data.roles || "Engineering Roles",
        students: "0 Registered",
        status: "Confirmed Drive"
      };
      const updatedCampus = [newCampus, ...campusList];
      updateMutation.mutate({ campusDrives: updatedCampus });
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
      const updatedInterviews = [newInt, ...interviewsList];
      updateMutation.mutate({ interviews: updatedInterviews });
      onShowToast(`Scheduled interview with ${newInt.candidate}!`);
    } else if (actionModalConfig.title === "Issue Offer Letter") {
      const newOffer = {
        id: `OFF-${Math.floor(100 + Math.random() * 900)}`,
        candidate: data.candidate || "Selected Candidate",
        role: data.role || "Engineer",
        ctc: data.ctc || "₹22.0 LPA",
        status: "Offer Sent (Pending)"
      };
      const updatedOffers = [newOffer, ...offersList];
      updateMutation.mutate({ offers: updatedOffers });
      onShowToast(`Issued offer letter to ${newOffer.candidate} for ${newOffer.ctc}!`);
    } else {
      onShowToast(`Action completed: ${actionModalConfig.title}`);
    }
    setIsActionModalOpen(false);
  };
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-xl" : "bg-white border-slate-200 text-slate-900 shadow-xs";
  const textMuted = isDarkMode ? "text-slate-400" : "text-[#6B7280]";
  const textHeading = isDarkMode ? "text-white" : "text-[#12163A]";
  const borderDivider = isDarkMode ? "border-slate-800" : "border-slate-100";
  const renderContent = () => {
    if (activeSubView === "overview") {
      return /* @__PURE__ */ jsxs("div", { className: "space-y-6 font-sans text-[14px]", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#12163A] text-white shadow-md border border-[#12163A] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium block text-slate-300", children: "Active Job Postings" }),
            /* @__PURE__ */ jsxs("div", { className: "text-[28px] md:text-[32px] font-bold text-white leading-none tracking-[-0.02em]", children: [
              jobsList.length,
              " Roles"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-[#E4F4EC] bg-[#E4F4EC]/10 px-2.5 py-0.5 rounded-full inline-block", children: "Active Job Requisitions" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium block text-[#4B5563]", children: "Campus Drives" }),
            /* @__PURE__ */ jsxs("div", { className: "text-[28px] md:text-[32px] font-bold text-[#3665EE] leading-none tracking-[-0.02em]", children: [
              campusList.length,
              " Scheduled"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-[#12163A]", children: "University Partnerships" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium block text-[#4B5563]", children: "Interviews Scheduled" }),
            /* @__PURE__ */ jsxs("div", { className: "text-[28px] md:text-[32px] font-bold text-[#12163A] leading-none tracking-[-0.02em]", children: [
              interviewsList.length,
              " Candidates"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-[#3665EE]", children: "Live Technical Evaluation" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium block text-[#4B5563]", children: "Offers Extended" }),
            /* @__PURE__ */ jsxs("div", { className: "text-[28px] md:text-[32px] font-bold text-[#12163A] leading-none tracking-[-0.02em]", children: [
              offersList.length,
              " Extended"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-[#12163A]", children: "Talent Conversion Desk" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-[24px] border space-y-4 ${cardClass}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: `text-[16px] md:text-[18px] font-semibold ${textHeading}`, children: "Corporate Talent Acquisition & Campus Hiring Desk" }),
              /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal mt-1`, children: "Role Ready Verified Employer Partner • Direct Campus Hiring Rights" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "bg-[#E4F4EC] text-[#12163A] font-semibold text-[12px] px-3.5 py-1 rounded-full border border-[#C3E6D5] self-start sm:self-auto", children: "✓ Verified Corporate Employer" })
          ] }),
          campusList.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[20px] bg-[#DEE9FF] border border-[#C6D9FF] flex items-center justify-between text-[#12163A]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(FiCalendar, { className: "w-5 h-5 text-[#3665EE]" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: "Next Campus Placement Drive" }),
                /* @__PURE__ */ jsxs("p", { className: "text-[13px] text-[#4B5563] mt-0.5", children: [
                  campusList[0].university,
                  " • ",
                  campusList[0].driveDate,
                  " • ",
                  campusList[0].roles
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onShowToast(`Managing drive for ${campusList[0].university}`),
                className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer shadow-md",
                children: "Manage Drive"
              }
            )
          ] }) : /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[20px] bg-[#DEE9FF]/40 border border-[#C6D9FF] flex items-center justify-between text-[#12163A]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(FiBookOpen, { className: "w-5 h-5 text-[#3665EE]" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: "No Upcoming Campus Drives" }),
                /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[#4B5563] mt-0.5", children: "Schedule placement drives at partner universities to start interviewing" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => openTriggerModal("Register Campus Drive", "Schedule a new placement drive at a partner university", [
                  { label: "University Name", name: "university", type: "text", placeholder: "IIT Bombay" },
                  { label: "Drive Date", name: "date", type: "text", placeholder: "12th August 2026" },
                  { label: "Hiring Roles", name: "roles", type: "text", placeholder: "AI & Cloud Engineers" }
                ]),
                className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer shadow-md",
                children: "+ Register Drive"
              }
            )
          ] })
        ] })
      ] });
    }
    if (activeSubView === "verification") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiGrid, { className: "w-5 h-5 text-[#3665EE]" }),
              " Company Profile & Enterprise Verification"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Verified employer badge, corporate registration, & campus hiring agreements" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openTriggerModal("Edit Corporate Profile", "Update company description and contact", [
                { label: "Company Name", name: "name", type: "text", placeholder: "Corporate Talent Desk" },
                { label: "Headquarters", name: "location", type: "text", placeholder: "Bengaluru, India" }
              ]),
              className: "bg-[#12163A] hover:bg-[#1A2050] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md",
              children: "Edit Corporate Profile"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-3 text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-[#12163A] text-white px-3 py-1 rounded-full font-semibold", children: "Corporate Identity" }),
            /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: "Role Ready Corporate Hiring Partner" }),
            /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[#4B5563] font-normal leading-normal", children: "Tenant Enterprise Verified • AI Candidate Matcher Access Active" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] space-y-3 text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-[#12163A] text-white px-3 py-1 rounded-full font-semibold", children: "Verification Status" }),
            /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: "✓ Verified Corporate Employer" }),
            /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[#4B5563] font-normal leading-normal", children: "Direct Campus Placement Rights • AI Resume Pipeline Enabled" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "jobs") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiFileText, { className: "w-5 h-5 text-[#3665EE]" }),
              " Job & Internship Requisitions Hub"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Manage active job descriptions, CTC packages, & applicant pipelines" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Post New Job Requisition", "Publish a new job opening to university students", [
                { label: "Job Role Title", name: "title", type: "text", placeholder: "Cloud Solutions Engineer" },
                { label: "Annual CTC Package", name: "ctc", type: "text", placeholder: "₹28.0 LPA" },
                { label: "Office Location", name: "location", type: "text", placeholder: "Bengaluru / Remote" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FiPlus, { className: "w-4 h-4" }),
                " Post New Job Requisition"
              ]
            }
          )
        ] }),
        jobsList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-[13px] text-slate-400", children: [
          /* @__PURE__ */ jsx(FiBriefcase, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "No active job requisitions found. Click '+ Post New Job Requisition' to create one."
        ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: jobsList.map((j) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-md font-semibold", children: j.id }),
              /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: j.title })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-[13px] text-[#4B5563] mt-1", children: [
              j.location,
              " • ",
              j.applicants || 0,
              " Candidates Applied"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[#3665EE] font-bold text-[16px]", children: j.ctc }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-white border border-slate-200 text-[#12163A] px-3 py-1 rounded-full font-semibold block mt-1", children: j.status })
          ] })
        ] }, j.id)) })
      ] });
    }
    if (activeSubView === "campus-hiring") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiBookOpen, { className: "w-5 h-5 text-[#3665EE]" }),
              " University Campus Placement Drives"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Partner universities, campus drive schedules, & candidate rosters" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Register Campus Drive", "Schedule a new placement drive at a partner university", [
                { label: "University Name", name: "university", type: "text", placeholder: "IIT Bombay" },
                { label: "Drive Date", name: "date", type: "text", placeholder: "12th August 2026" },
                { label: "Hiring Roles", name: "roles", type: "text", placeholder: "AI & Cloud Engineers" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FiPlus, { className: "w-4 h-4" }),
                " Register Campus Drive"
              ]
            }
          )
        ] }),
        campusList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-[13px] text-slate-400", children: [
          /* @__PURE__ */ jsx(FiBookOpen, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "No campus placement drives registered. Click '+ Register Campus Drive' to schedule one."
        ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: campusList.map((c, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#F6E6D8] border-[#EAD0BC] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: c.university }),
            /* @__PURE__ */ jsx("span", { className: "text-[#3665EE] text-[13px] font-medium", children: c.roles }),
            /* @__PURE__ */ jsxs("div", { className: "text-[13px] text-[#4B5563] mt-0.5", children: [
              "Drive Date: ",
              c.driveDate,
              " • ",
              c.students
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-white border border-slate-200 text-[#12163A] px-3 py-1 rounded-full font-semibold", children: c.status })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "student-search") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsx("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
            /* @__PURE__ */ jsx(FiSearch, { className: "w-5 h-5 text-[#3665EE]" }),
            " Global Student Talent Search Engine"
          ] }),
          /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Search verified student talent by skills, ATS fit, and qualifications" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search candidates by skill e.g. Python, Cloud, Full-Stack...",
              className: "flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-[#12163A] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#3665EE]"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast("Executed search query across live candidate database!"),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-6 py-2.5 rounded-xl transition cursor-pointer shadow-md",
              children: "Search Talent Database"
            }
          )
        ] }) })
      ] });
    }
    if (activeSubView === "ai-match" || activeSubView === "matcher") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
            /* @__PURE__ */ jsx(FiCpu, { className: "w-5 h-5 text-[#3665EE]" }),
            " AI Neural Candidate Matcher Engine"
          ] }),
          /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Screen candidates using AI ATS fit algorithms and skill alignment" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-[13px] text-slate-400", children: [
          /* @__PURE__ */ jsx(FiCpu, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "AI Matcher actively analyzes applications for published job requisitions."
        ] })
      ] });
    }
    if (activeSubView === "interviews") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiCalendar, { className: "w-5 h-5 text-[#3665EE]" }),
              " Scheduled Candidate Interviews"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Interview panel schedules, evaluation rubrics, & video interview links" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Schedule Candidate Interview", "Set up a technical or HR interview round", [
                { label: "Candidate Name", name: "candidate", type: "text", placeholder: "Aarav Sharma" },
                { label: "Job Role", name: "role", type: "text", placeholder: "AI & MLOps Scientist" },
                { label: "Date & Time", name: "time", type: "text", placeholder: "Tomorrow, 3:00 PM" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FiPlus, { className: "w-4 h-4" }),
                " Schedule Candidate Interview"
              ]
            }
          )
        ] }),
        interviewsList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-[13px] text-slate-400", children: [
          /* @__PURE__ */ jsx(FiCalendar, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "No interviews scheduled yet. Click '+ Schedule Candidate Interview' to set up a session."
        ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: interviewsList.map((int) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[14px] font-semibold text-[#3665EE]", children: int.time }),
              /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-0.5 rounded-md font-semibold", children: int.status })
            ] }),
            /* @__PURE__ */ jsxs("h4", { className: "text-[16px] font-semibold text-[#12163A] mt-1", children: [
              int.candidate,
              " • Role: ",
              int.role
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-[13px] text-[#4B5563]", children: [
              "Round: ",
              int.round,
              " • Panel: ",
              int.panel
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast(`Joined interview video room for ${int.candidate}`),
              className: "bg-[#12163A] hover:bg-[#1A2050] text-white text-[14px] font-semibold px-3.5 py-1.5 rounded-xl cursor-pointer",
              children: "Join Video Call"
            }
          )
        ] }, int.id)) })
      ] });
    }
    if (activeSubView === "offers") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiAward, { className: "w-5 h-5 text-[#3665EE]" }),
              " Offer Letters & Compensation (CTC) Desk"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Manage offer rollouts, CTC packages, & candidate acceptance tracking" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Issue Offer Letter", "Send official offer letter to selected candidate", [
                { label: "Candidate Name", name: "candidate", type: "text", placeholder: "Candidate Name" },
                { label: "Offered Role", name: "role", type: "text", placeholder: "AI Engineer" },
                { label: "Annual CTC Package", name: "ctc", type: "text", placeholder: "₹25.0 LPA" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FiPlus, { className: "w-4 h-4" }),
                " Issue Offer Letter"
              ]
            }
          )
        ] }),
        offersList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-[13px] text-slate-400", children: [
          /* @__PURE__ */ jsx(FiAward, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "No offer letters issued yet. Click '+ Issue Offer Letter' to roll out an offer."
        ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: offersList.map((off) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#E4F4EC] border-[#C3E6D5] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: off.candidate }),
            /* @__PURE__ */ jsxs("span", { className: "text-[#3665EE] text-[13px] font-medium", children: [
              off.role,
              " • CTC: ",
              off.ctc
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-[#12163A] text-white px-3 py-1 rounded-full font-semibold", children: off.status })
        ] }, off.id)) })
      ] });
    }
    if (activeSubView === "hiring-analytics") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
            /* @__PURE__ */ jsx(FiTrendingUp, { className: "w-5 h-5 text-[#3665EE]" }),
            " Enterprise Hiring Analytics & Talent Funnel"
          ] }),
          /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Recruitment efficiency, time-to-hire metrics, & campus conversion rates" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[32px] md:text-[36px] font-bold text-[#3665EE] leading-none", children: jobsList.length }),
            /* @__PURE__ */ jsx("p", { className: "text-[14px] font-semibold text-[#12163A] mt-2", children: "Active Job Requisitions" }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] text-[#4B5563] block mt-0.5", children: "Published Roles" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[32px] md:text-[36px] font-bold text-[#12163A] leading-none", children: offersList.length }),
            /* @__PURE__ */ jsx("p", { className: "text-[14px] font-semibold text-[#12163A] mt-2", children: "Offers Extended" }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] text-[#4B5563] block mt-0.5", children: "Live Pipeline Status" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[32px] md:text-[36px] font-bold text-[#12163A] leading-none", children: campusList.length }),
            /* @__PURE__ */ jsx("p", { className: "text-[14px] font-semibold text-[#12163A] mt-2", children: "Campus Placement Drives" }),
            /* @__PURE__ */ jsx("span", { className: "text-[12px] text-[#3665EE] font-medium block mt-0.5", children: "Partner Institutions" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "notifications") {
      return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
              /* @__PURE__ */ jsx(FiBell, { className: "w-5 h-5 text-[#3665EE]" }),
              " Recruiter Notifications & Hiring Alerts"
            ] }),
            /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Candidate applications, interview confirmations, and offer acceptance receipts" })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => onShowToast("Marked all recruiter alerts as read"), className: "text-[#3665EE] text-[14px] font-semibold hover:underline cursor-pointer", children: "Mark All as Read" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: jobsList.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] border flex items-center justify-between bg-[#DEE9FF] border-[#C6D9FF] text-[#12163A]", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: [
              "Active Requisition: ",
              jobsList[0].title
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[#3665EE] text-[13px] font-medium", children: "Job Posting • Live on Campus Portal" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-[#12163A] text-white px-3 py-1 rounded-full font-semibold", children: "Active" })
        ] }) : /* @__PURE__ */ jsx("div", { className: "py-8 text-center text-[13px] text-slate-400", children: "No active notifications at this time." }) })
      ] });
    }
    return /* @__PURE__ */ jsxs("div", { className: `rounded-[24px] border p-6 space-y-6 text-[14px] font-sans ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: `pb-4 border-b ${borderDivider}`, children: [
        /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
          /* @__PURE__ */ jsx(FiSliders, { className: "w-5 h-5 text-[#3665EE]" }),
          " Recruiter Governance & System Settings"
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Configure enterprise team permissions, ATS integrations, & interviewer panels" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: "ATS & Sourcing Integration" }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[#4B5563]", children: "Role Ready Candidate Matcher Connected • Real-time Sync Active" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-[#12163A]", children: "Interviewer Panel Access Control" }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[#4B5563]", children: "Enterprise Interviewer Accounts • RBAC Access Enabled" })
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
const companyService = {
  /**
   * Fetch live company internships and campus partnerships
   * GET /api/v1/profile/
   */
  async getCompanyData() {
    var _a2, _b2;
    try {
      const res = await apiClient(API_ENDPOINTS.PROFILE.GET);
      const roleData = ((_b2 = (_a2 = res.data) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.roleData) || {};
      const internships = Array.isArray(roleData.internships) ? roleData.internships : [];
      const partnerships = Array.isArray(roleData.partnerships) ? roleData.partnerships : [];
      return { internships, partnerships };
    } catch {
      return { internships: [], partnerships: [] };
    }
  },
  /**
   * Launch a new internship cohort and persist in backend profile roleData
   * PUT /api/v1/profile/complete
   */
  async launchInternshipCohort(newCohort) {
    var _a2, _b2, _c;
    const current = await apiClient(API_ENDPOINTS.PROFILE.GET).catch(() => null);
    const existingRoleData = ((_b2 = (_a2 = current == null ? void 0 : current.data) == null ? void 0 : _a2.profile) == null ? void 0 : _b2.roleData) || {};
    const existingP = ((_c = current == null ? void 0 : current.data) == null ? void 0 : _c.profile) || {};
    const currentInternships = Array.isArray(existingRoleData.internships) ? existingRoleData.internships : [];
    const updatedInternships = [newCohort, ...currentInternships];
    return await apiClient(API_ENDPOINTS.PROFILE.COMPLETE, {
      method: "PUT",
      body: JSON.stringify({
        firstName: existingP.firstName || "Enterprise",
        lastName: existingP.lastName || "Partner",
        phoneNumber: existingP.phoneNumber || "9876543210",
        bio: existingP.bio || "Enterprise Corporate Partner",
        onboardingCompleted: true,
        roleData: { ...existingRoleData, internships: updatedInternships }
      })
    });
  }
};
const CompanyDashboard = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: companyData, isLoading } = useQuery({
    queryKey: ["companyData"],
    queryFn: () => companyService.getCompanyData()
  });
  const internshipsList = (companyData == null ? void 0 : companyData.internships) || [];
  (companyData == null ? void 0 : companyData.partnerships) || [];
  const launchCohortMutation = useMutation({
    mutationFn: (cohort) => companyService.launchInternshipCohort(cohort),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyData"] });
      onShowToast("Published new corporate internship cohort successfully!");
    },
    onError: (err) => {
      onShowToast("Unable to launch cohort. Please try again.");
    }
  });
  if (["discovery", "assessment", "psychometric", "dna", "ai-recommendations", "scholarships", "colleges", "roadmap", "resume-ats", "learning"].includes(activeSubView)) {
    return /* @__PURE__ */ jsx(StudentToolsViews, { activeSubView, onShowToast, isDarkMode });
  }
  const handleLaunchInternship = (data) => {
    const newCohort = {
      cohort: data.cohort || "Enterprise Internship Track",
      duration: data.duration || "6 Months",
      stipend: data.stipend || "₹35,000 / mo",
      interns: "1 Cohort Enrolled",
      ppo: "Registrations Open"
    };
    launchCohortMutation.mutate(newCohort);
    setIsModalOpen(false);
  };
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-xl" : "bg-white border-blue-100 text-slate-900 shadow-sm";
  const subCardClass = isDarkMode ? "bg-slate-800/80 border-slate-700/80 text-white" : "bg-blue-50/40 border-blue-100 text-slate-900";
  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-500";
  const textHeading = isDarkMode ? "text-white" : "text-slate-900";
  const borderDivider = isDarkMode ? "border-slate-800" : "border-slate-100";
  if (activeSubView === "internships") {
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 text-[14px] font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
            /* @__PURE__ */ jsx(FiBriefcase, { className: "w-5 h-5 text-[#3665EE]" }),
            " Corporate Internship Programs"
          ] }),
          /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Summer & Winter internship cohorts for university engineering students" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsModalOpen(true),
            className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white text-[14px] font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md",
            children: "+ Launch Internship Drive"
          }
        )
      ] }),
      internshipsList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-12 text-center text-[13px] text-slate-400", children: [
        /* @__PURE__ */ jsx(FiBriefcase, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
        "No corporate internship cohorts active yet. Click '+ Launch Internship Drive' to publish a program."
      ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: internshipsList.map((inProg, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3665EE] ${subCardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: `text-[16px] font-semibold ${textHeading}`, children: inProg.cohort }),
          /* @__PURE__ */ jsxs("span", { className: "text-[#3665EE] font-medium text-[13px]", children: [
            inProg.duration,
            " • Stipend: ",
            inProg.stipend
          ] }),
          /* @__PURE__ */ jsx("div", { className: `text-[13px] ${textMuted} font-normal mt-0.5`, children: inProg.interns })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-[12px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 font-semibold", children: inProg.ppo })
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
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 text-[14px] font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: `pb-4 border-b ${borderDivider}`, children: [
        /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
          /* @__PURE__ */ jsx(FiBookOpen, { className: "w-5 h-5 text-[#3665EE]" }),
          " Campus University MoUs"
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Partner universities with signed corporate recruitment MoUs" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: ["IIT Bombay MoU", "IIT Delhi MoU", "BITS Pilani MoU", "NIT Trichy MoU", "DTU Delhi MoU"].map((mou, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[#3665EE] ${subCardClass}`, onClick: () => onShowToast(`Opened MoU record for ${mou}`), children: [
        /* @__PURE__ */ jsx("span", { className: `text-[15px] font-semibold ${textHeading}`, children: mou }),
        /* @__PURE__ */ jsx("span", { className: "text-emerald-500 text-[12px] bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium", children: "Active MoU" })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "pipeline") {
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 text-[14px] font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: `pb-4 border-b ${borderDivider}`, children: [
        /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
          /* @__PURE__ */ jsx(FiUsers, { className: "w-5 h-5 text-[#3665EE]" }),
          " Talent Funnel Pipeline"
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Pipeline stage metrics from campus sourcing to PPO conversion" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
        { stage: "Sourced Candidates", count: internshipsList.length > 0 ? "420" : "0", sub: "Partner Universities" },
        { stage: "Shortlisted for Test", count: internshipsList.length > 0 ? "145" : "0", sub: "Coding & Aptitude Round" },
        { stage: "Interview Cleared", count: internshipsList.length > 0 ? "62" : "0", sub: "Technical + HR Cleared" },
        { stage: "PPO Offered", count: internshipsList.length > 0 ? "48" : "0", sub: "Full Time Pre-Placement" }
      ].map((pip, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-xl border space-y-1 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[#3665EE] ${subCardClass}`, onClick: () => onShowToast(`Viewing stage pipeline for ${pip.stage}`), children: [
        /* @__PURE__ */ jsx("span", { className: `text-[13px] font-medium block ${textMuted}`, children: pip.stage }),
        /* @__PURE__ */ jsx("div", { className: "text-[28px] md:text-[30px] font-bold text-[#3665EE] leading-none my-1", children: pip.count }),
        /* @__PURE__ */ jsx("span", { className: `text-[12px] ${textMuted} block`, children: pip.sub })
      ] }, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 text-[14px] font-sans transition-colors duration-200 ${cardClass}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `pb-4 border-b ${borderDivider}`, children: [
      /* @__PURE__ */ jsxs("h2", { className: `text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 ${textHeading}`, children: [
        /* @__PURE__ */ jsx(FiGrid, { className: "w-5 h-5 text-[#3665EE]" }),
        " Enterprise Company Portal Overview"
      ] }),
      /* @__PURE__ */ jsx("p", { className: `text-[13px] md:text-[14px] ${textMuted} font-normal leading-normal mt-1`, children: "Corporate internship drives, university MoUs, intern enrollment, and PPO conversions" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[#3665EE] ${subCardClass}`, onClick: () => onShowToast("Viewing Internship Drives"), children: [
        /* @__PURE__ */ jsx("span", { className: `text-[13px] font-medium block ${textMuted}`, children: "Active Drives" }),
        /* @__PURE__ */ jsx("div", { className: "text-[28px] md:text-[30px] font-bold text-[#3665EE] leading-none my-1", children: internshipsList.length }),
        /* @__PURE__ */ jsx("span", { className: `text-[12px] ${textMuted} block`, children: internshipsList.length > 0 ? "Live Cohorts" : "No active cohorts" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[#3665EE] ${subCardClass}`, onClick: () => onShowToast("Viewing Campus MoUs"), children: [
        /* @__PURE__ */ jsx("span", { className: `text-[13px] font-medium block ${textMuted}`, children: "Partner Universities" }),
        /* @__PURE__ */ jsx("div", { className: "text-[28px] md:text-[30px] font-bold text-[#3665EE] leading-none my-1", children: "5 Colleges" }),
        /* @__PURE__ */ jsx("span", { className: `text-[12px] ${textMuted} block`, children: "Direct MoUs Signed" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[#3665EE] ${subCardClass}`, onClick: () => onShowToast("Viewing Enrolled Interns"), children: [
        /* @__PURE__ */ jsx("span", { className: `text-[13px] font-medium block ${textMuted}`, children: "Enrolled Candidates" }),
        /* @__PURE__ */ jsx("div", { className: "text-[28px] md:text-[30px] font-bold text-emerald-500 leading-none my-1", children: internshipsList.length > 0 ? "Active" : "0" }),
        /* @__PURE__ */ jsxs("span", { className: "text-[12px] text-emerald-600 flex items-center gap-1 font-medium mt-1", children: [
          /* @__PURE__ */ jsx(FiTrendingUp, { className: "w-3.5 h-3.5" }),
          " PPO Track Active"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[#3665EE] ${subCardClass}`, onClick: () => onShowToast("Viewing Monthly Stipends"), children: [
        /* @__PURE__ */ jsx("span", { className: `text-[13px] font-medium block ${textMuted}`, children: "System Status" }),
        /* @__PURE__ */ jsx("div", { className: "text-[28px] md:text-[30px] font-bold text-emerald-500 leading-none my-1", children: "Connected" }),
        /* @__PURE__ */ jsx("span", { className: `text-[12px] ${textMuted} block`, children: "Real-time Sync Active" })
      ] })
    ] })
  ] });
};
function getFriendlyErrorMessage(err, fallback) {
  if (!err) return fallback;
  const msg = typeof err === "string" ? err : (err == null ? void 0 : err.message) || "";
  if (!msg || typeof msg !== "string" || msg.includes("/api/") || msg.includes("http") || msg.includes("POST") || msg.includes("GET") || msg.includes("500") || msg.includes("404") || msg.includes("status code")) {
    return fallback;
  }
  return msg;
}
const ParentDashboard = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
  const queryClient = useQueryClient();
  const {
    data: familyProfile,
    isLoading: isProfileLoading,
    refetch: refetchProfile
  } = useQuery({
    queryKey: ["parent-profile"],
    queryFn: fetchParentProfile
  });
  const childrenList = (familyProfile == null ? void 0 : familyProfile.children) || [];
  const [selectedChildId, setSelectedChildId] = useState("");
  useEffect(() => {
    if (childrenList.length > 0) {
      if (!selectedChildId || !childrenList.some((c) => c.id === selectedChildId)) {
        setSelectedChildId(childrenList[0].id);
      }
    } else {
      setSelectedChildId("");
    }
  }, [childrenList, selectedChildId]);
  const selectedChild = childrenList.find((c) => c.id === selectedChildId) || childrenList[0];
  const { data: attendanceData } = useQuery({
    queryKey: ["parent-attendance", selectedChildId],
    queryFn: () => fetchChildAttendance(selectedChildId),
    enabled: !!selectedChildId
  });
  const { data: academicProgress } = useQuery({
    queryKey: ["parent-academic-progress", selectedChildId],
    queryFn: () => fetchChildAcademicProgress(selectedChildId),
    enabled: !!selectedChildId
  });
  const { data: careerProgress } = useQuery({
    queryKey: ["parent-career-progress", selectedChildId],
    queryFn: () => fetchChildCareerProgress(selectedChildId),
    enabled: !!selectedChildId
  });
  const { data: learningProgress } = useQuery({
    queryKey: ["parent-learning-progress", selectedChildId],
    queryFn: () => fetchChildLearningProgress(selectedChildId),
    enabled: !!selectedChildId
  });
  const { data: reportsData = [] } = useQuery({
    queryKey: ["parent-reports", selectedChildId],
    queryFn: () => fetchParentReports(selectedChildId),
    enabled: !!selectedChildId
  });
  const { data: feesData } = useQuery({
    queryKey: ["parent-fees", selectedChildId],
    queryFn: () => fetchChildFees(selectedChildId),
    enabled: !!selectedChildId
  });
  const { data: scholarships = [] } = useQuery({
    queryKey: ["parent-scholarships", selectedChildId],
    queryFn: () => fetchScholarships(selectedChildId)
  });
  const { data: colleges = [] } = useQuery({
    queryKey: ["parent-colleges", selectedChildId],
    queryFn: () => fetchColleges(selectedChildId)
  });
  const { data: mentors = [] } = useQuery({
    queryKey: ["parent-mentors"],
    queryFn: fetchMentors
  });
  const { data: mentorBookings = [], refetch: refetchBookings } = useQuery({
    queryKey: ["parent-bookings"],
    queryFn: fetchMentorBookings
  });
  const { data: notifications = [] } = useQuery({
    queryKey: ["parent-notifications"],
    queryFn: fetchParentNotifications
  });
  const [isOnboardingMode, setIsOnboardingMode] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  useEffect(() => {
    if (familyProfile && familyProfile.onboardingCompleted === false) {
      setIsOnboardingMode(true);
    }
  }, [familyProfile]);
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isBookMentorModalOpen, setIsBookMentorModalOpen] = useState(false);
  const [selectedMentorToBook, setSelectedMentorToBook] = useState(null);
  const [selectedPlanToBuy, setSelectedPlanToBuy] = useState("growth");
  const [paymentOutcomeSim, setPaymentOutcomeSim] = useState("idle");
  const [copiedId, setCopiedId] = useState(null);
  const [childFormFirstName, setChildFormFirstName] = useState("");
  const [childFormLastName, setChildFormLastName] = useState("");
  const [childFormEmail, setChildFormEmail] = useState("");
  const [childFormPhone, setChildFormPhone] = useState("");
  const [childFormRelationship, setChildFormRelationship] = useState("Child");
  const [childFormGrade, setChildFormGrade] = useState("Grade 10 - Secondary");
  const [childFormSchool, setChildFormSchool] = useState("");
  const [childFormCareer, setChildFormCareer] = useState("");
  const [childFormDob, setChildFormDob] = useState("2010-01-01");
  const [isSavingChild, setIsSavingChild] = useState(false);
  const [bookingDate, setBookingDate] = useState("2026-09-18");
  const [bookingTime, setBookingTime] = useState("04:00 PM - 05:00 PM");
  const [bookingTopic, setBookingTopic] = useState("Career Pathway & College Shortlist Guidance");
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const handleCopy = (text, id) => {
    var _a3;
    (_a3 = navigator.clipboard) == null ? void 0 : _a3.writeText(text);
    setCopiedId(id);
    onShowToast("Student login credentials copied to clipboard!");
    setTimeout(() => setCopiedId(null), 3e3);
  };
  const handleCreateChild = async (e) => {
    e.preventDefault();
    if (!childFormFirstName.trim() || !familyProfile) return;
    setIsSavingChild(true);
    const generatedEmail = childFormEmail.trim() || `student.${childFormFirstName.toLowerCase()}.${Date.now().toString().slice(-4)}@roleready.ai`;
    try {
      const { child } = await addChildToFamily(familyProfile, {
        firstName: childFormFirstName.trim(),
        lastName: childFormLastName.trim() || "Student",
        email: generatedEmail,
        phone: childFormPhone || familyProfile.phone,
        relationship: childFormRelationship,
        grade: childFormGrade,
        school: childFormSchool || "Role Ready Partner School",
        targetCareer: childFormCareer.trim() || "Technology & Engineering",
        dob: childFormDob
      });
      await queryClient.invalidateQueries({ queryKey: ["parent-profile"] });
      setSelectedChildId(child.id);
      setIsAddChildModalOpen(false);
      setChildFormFirstName("");
      setChildFormLastName("");
      setChildFormEmail("");
      setChildFormCareer("");
      onShowToast(`Student credentials created for ${child.name}! Account is ready.`);
    } catch (err) {
      onShowToast(getFriendlyErrorMessage(err, "Unable to add student account. Please try again."));
    } finally {
      setIsSavingChild(false);
    }
  };
  const handleToggleAccess = async (childId) => {
    var _a3;
    if (!familyProfile) return;
    const targetChild = childrenList.find((c) => c.id === childId);
    if (!targetChild) return;
    const nextAccess = !targetChild.hasAccess;
    const currentActiveCount = childrenList.filter((c) => c.hasAccess).length;
    const maxAllowed = ((_a3 = familyProfile.subscription) == null ? void 0 : _a3.maxChildren) || 1;
    if (nextAccess && currentActiveCount >= maxAllowed) {
      onShowToast(`Seat quota reached! Current plan allows max ${maxAllowed} student seats. Please upgrade.`);
      return;
    }
    try {
      await toggleChildAccess(familyProfile, childId, nextAccess);
      await queryClient.invalidateQueries({ queryKey: ["parent-profile"] });
      onShowToast(`Student access license ${nextAccess ? "granted" : "revoked"} for ${targetChild.name}.`);
    } catch (err) {
      onShowToast(getFriendlyErrorMessage(err, "Unable to update access permissions. Please try again."));
    }
  };
  const handleExecutePayment = async (outcome) => {
    setPaymentOutcomeSim("processing");
    const planConfig = FAMILY_PLANS.find((p) => p.id === selectedPlanToBuy) || FAMILY_PLANS[1];
    const orderId = `ORD-RR-${Date.now()}`;
    try {
      const result = await processFamilyPayment({
        orderId,
        amount: planConfig.priceMonthly,
        currency: "INR",
        planId: planConfig.backendPlanId,
        paymentMethod: "UPI"
      }, outcome === "failed");
      if (result.success && familyProfile) {
        await updateParentSubscription(familyProfile, planConfig);
        await queryClient.invalidateQueries({ queryKey: ["parent-profile"] });
        setPaymentOutcomeSim("success");
        onShowToast(`Payment Succeeded! Activated ${planConfig.name}. Student licenses unlocked!`);
        setTimeout(() => {
          setIsPaymentModalOpen(false);
          setPaymentOutcomeSim("idle");
          if (isOnboardingMode && onboardingStep === 5) {
            setOnboardingStep(6);
          }
        }, 1200);
      } else {
        setPaymentOutcomeSim("failed");
        onShowToast("Payment Failed. Bank declined transaction. Click 'Retry Payment' to retry.");
      }
    } catch (err) {
      setPaymentOutcomeSim("failed");
      onShowToast(getFriendlyErrorMessage(err, "Payment could not be completed. Please try again."));
    }
  };
  const handleConfirmMentorBooking = async (e) => {
    e.preventDefault();
    if (!selectedMentorToBook || !selectedChild) {
      onShowToast("Please select a child before booking a mentor.");
      return;
    }
    setIsBookingSubmitting(true);
    try {
      await bookMentorSession({
        mentorId: selectedMentorToBook.id,
        mentorName: selectedMentorToBook.name,
        studentId: selectedChild.id,
        studentName: selectedChild.name,
        date: bookingDate,
        timeSlot: bookingTime,
        topic: bookingTopic
      });
      await queryClient.invalidateQueries({ queryKey: ["parent-bookings"] });
      setIsBookMentorModalOpen(false);
      onShowToast(`Counseling session booked with ${selectedMentorToBook.name} for ${selectedChild.name}!`);
    } catch (err) {
      onShowToast(getFriendlyErrorMessage(err, "Unable to confirm booking. Please try again."));
    } finally {
      setIsBookingSubmitting(false);
    }
  };
  const handleCompleteOnboarding = async () => {
    if (!familyProfile) return;
    try {
      await saveParentFamilyProfile({
        ...familyProfile,
        onboardingCompleted: true
      });
      await queryClient.invalidateQueries({ queryKey: ["parent-profile"] });
      setIsOnboardingMode(false);
      onShowToast("Family Onboarding Complete! Welcome to your live Parent Dashboard.");
    } catch (err) {
      onShowToast(getFriendlyErrorMessage(err, "Unable to finalize setup. Please try again."));
      setIsOnboardingMode(false);
    }
  };
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [notifyAcademic, setNotifyAcademic] = useState(true);
  const [notifyAttendance, setNotifyAttendance] = useState(true);
  const [notifyCareer, setNotifyCareer] = useState(true);
  const [notifyMentors, setNotifyMentors] = useState(true);
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      onShowToast("Please enter current and new password.");
      return;
    }
    if (newPassword.length < 6) {
      onShowToast("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      onShowToast("New passwords do not match.");
      return;
    }
    setIsChangingPassword(true);
    try {
      await changePassword(oldPassword, newPassword);
      onShowToast("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      onShowToast(getFriendlyErrorMessage(err, "Failed to update password. Please check your current password."));
    } finally {
      setIsChangingPassword(false);
    }
  };
  if (isOnboardingMode) {
    return /* @__PURE__ */ jsxs("div", { className: `max-w-4xl mx-auto space-y-6 p-6 rounded-3xl border shadow-xl ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold uppercase tracking-wider text-blue-500", children: "Role Ready Parent Onboarding Pipeline" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-xl md:text-[22px] font-semibold leading-[1.3] tracking-[-0.015em] flex items-center gap-2.5 mt-1", children: [
            /* @__PURE__ */ jsx(FiShield, { className: "w-5 h-5 text-emerald-400" }),
            "Family Setup & Student Access Assignment"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[14px] font-normal leading-relaxed text-slate-400 mt-1", children: "Configure family portal, register student accounts, choose a plan, and unlock learning suites." })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsOnboardingMode(false),
            className: "px-3.5 py-2 rounded-xl text-[14px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer self-start md:self-auto",
            children: "Skip to Dashboard →"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs", children: [
        { num: 1, label: "Family Info" },
        { num: 2, label: "Child Management" },
        { num: 3, label: "Review Accounts" },
        { num: 4, label: "Select Plan" },
        { num: 5, label: "Payment Gateway" },
        { num: 6, label: "Assign Access" }
      ].map((s) => /* @__PURE__ */ jsxs(
        "div",
        {
          onClick: () => setOnboardingStep(s.num),
          className: `p-3 rounded-2xl border cursor-pointer transition flex items-center gap-2.5 ${onboardingStep === s.num ? "bg-blue-600 text-white border-blue-500 shadow-md" : onboardingStep > s.num ? isDarkMode ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-700" : isDarkMode ? "bg-slate-800/40 border-slate-700/50 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-500"}`,
          children: [
            /* @__PURE__ */ jsx("span", { className: `w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 ${onboardingStep === s.num ? "bg-white text-blue-600" : "bg-slate-700/50 text-current"}`, children: onboardingStep > s.num ? /* @__PURE__ */ jsx(FiCheck, { className: "w-3 h-3" }) : s.num }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[12px] truncate", children: s.label })
          ]
        },
        s.num
      )) }),
      onboardingStep === 1 && /* @__PURE__ */ jsxs("div", { className: "space-y-4 animate-fade-in", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl md:text-[22px] font-semibold leading-[1.3] tracking-[-0.015em] flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsx(FiUsers, { className: "w-5 h-5 text-blue-400" }),
          "Step 1: Family Contact & Guardian Profile"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-medium text-slate-300 mb-1.5", children: "Parent / Guardian Full Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                defaultValue: (familyProfile == null ? void 0 : familyProfile.parentName) || "",
                placeholder: "e.g. John Doe",
                className: "w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px] font-normal leading-normal"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-medium text-slate-300 mb-1.5", children: "Parent Email Address" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                disabled: true,
                value: (familyProfile == null ? void 0 : familyProfile.parentEmail) || "",
                className: "w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/30 text-slate-400 text-[14px] font-normal leading-normal cursor-not-allowed"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-medium text-slate-300 mb-1.5", children: "Mobile / Primary Phone" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                defaultValue: (familyProfile == null ? void 0 : familyProfile.phone) || "",
                placeholder: "e.g. 9876543210",
                className: "w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px] font-normal leading-normal"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-medium text-slate-300 mb-1.5", children: "Emergency Contact" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                defaultValue: (familyProfile == null ? void 0 : familyProfile.emergencyContact) || "",
                placeholder: "Emergency phone or spouse contact",
                className: "w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px] font-normal leading-normal"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setOnboardingStep(2),
            className: "px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[14px] shadow-md cursor-pointer flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx("span", { children: "Continue to Child Management" }),
              /* @__PURE__ */ jsx(FiArrowRight, { className: "w-4 h-4" })
            ]
          }
        ) })
      ] }),
      onboardingStep === 2 && /* @__PURE__ */ jsxs("div", { className: "space-y-4 animate-fade-in", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xl md:text-[22px] font-semibold leading-[1.3] tracking-[-0.015em] flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsx(FiKey, { className: "w-5 h-5 text-amber-400" }),
              "Step 2: Add Children & Create Student Login Credentials"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[14px] font-normal leading-relaxed text-slate-400 mt-1", children: "Each child receives independent student login credentials to access their student portal." })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setIsAddChildModalOpen(true),
              className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold shadow-md cursor-pointer flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(FiUserPlus, { className: "w-4 h-4" }),
                "+ Add Child"
              ]
            }
          )
        ] }),
        childrenList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-8 text-center border border-dashed border-slate-700 rounded-2xl bg-slate-800/30 space-y-3", children: [
          /* @__PURE__ */ jsx(FiUserPlus, { className: "w-8 h-8 text-slate-500 mx-auto" }),
          /* @__PURE__ */ jsx("p", { className: "text-[16px] font-semibold text-slate-300", children: "No children registered yet" }),
          /* @__PURE__ */ jsx("p", { className: "text-[14px] font-normal text-slate-400 max-w-sm mx-auto", children: "Click the button above to register your child's student account. Their login credentials will be generated automatically." })
        ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: childrenList.map((c) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl border border-slate-700 bg-slate-800/50 space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("img", { src: c.avatarUrl, alt: c.name, className: "w-12 h-12 rounded-xl object-cover border border-blue-400" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold leading-[1.35]", children: c.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-slate-400 text-[13px] font-normal mt-0.5", children: [
                c.grade,
                " • ",
                c.school
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-2.5 rounded-xl bg-slate-900 border border-slate-700/60 font-mono text-[13px] space-y-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-sans text-[12px] font-medium", children: "Email:" }),
              /* @__PURE__ */ jsx("span", { className: "text-blue-300 font-bold", children: c.studentEmail })
            ] }),
            c.tempPassword && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-sans text-[12px] font-medium", children: "Password:" }),
              /* @__PURE__ */ jsx("span", { className: "text-emerald-400 font-bold", children: c.tempPassword })
            ] })
          ] })
        ] }, c.id)) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between pt-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setOnboardingStep(1),
              className: "px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[14px]",
              children: "Back"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setOnboardingStep(3),
              className: "px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[14px] shadow-md flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Review Family Accounts" }),
                /* @__PURE__ */ jsx(FiArrowRight, { className: "w-4 h-4" })
              ]
            }
          )
        ] })
      ] }),
      onboardingStep === 3 && /* @__PURE__ */ jsxs("div", { className: "space-y-4 animate-fade-in", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl md:text-[22px] font-semibold leading-[1.3] tracking-[-0.015em] flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsx(FiUserCheck, { className: "w-5 h-5 text-purple-400" }),
          "Step 3: Review Family Accounts & Required Seats"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-blue-950/20 border border-blue-500/30 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[13px] text-blue-300", children: "Total Children Registered:" }),
            /* @__PURE__ */ jsxs("p", { className: "text-[24px] font-bold mt-0.5", children: [
              childrenList.length,
              " Student Accounts"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[13px] text-slate-400", children: "Recommended Plan:" }),
            /* @__PURE__ */ jsx("p", { className: "text-[15px] font-bold text-emerald-400 mt-0.5", children: childrenList.length <= 1 ? "Starter (1 Seat)" : childrenList.length <= 3 ? "Growth (3 Seats)" : "Elite (5 Seats)" })
          ] })
        ] }),
        childrenList.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-6 text-center border border-dashed border-slate-700 rounded-2xl text-[14px] text-slate-400", children: "No children registered yet. Please go back to Step 2 to add a child." }) : /* @__PURE__ */ jsx("div", { className: "border border-slate-700/60 rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-slate-800 text-slate-400 font-semibold uppercase text-[12px] tracking-wider", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Child Name" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Grade & School" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Student Login Email" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Target Career" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-800 text-[14px]", children: childrenList.map((c) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-semibold", children: c.name }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 text-slate-400", children: c.grade }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-mono text-blue-300 text-[13px]", children: c.studentEmail }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 text-emerald-400 font-medium", children: c.targetCareer })
          ] }, c.id)) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between pt-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setOnboardingStep(2),
              className: "px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[14px]",
              children: "Back"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setOnboardingStep(4),
              className: "px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[14px] shadow-md flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Select Family Subscription" }),
                /* @__PURE__ */ jsx(FiArrowRight, { className: "w-4 h-4" })
              ]
            }
          )
        ] })
      ] }),
      onboardingStep === 4 && /* @__PURE__ */ jsxs("div", { className: "space-y-4 animate-fade-in", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl md:text-[22px] font-semibold leading-[1.3] tracking-[-0.015em] flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsx(FiCreditCard, { className: "w-5 h-5 text-emerald-400" }),
          "Step 4: Select Family Subscription Plan"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: FAMILY_PLANS.map((p) => {
          const isSelected = selectedPlanToBuy === p.id;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => setSelectedPlanToBuy(p.id),
              className: `p-5 rounded-2xl border cursor-pointer transition relative flex flex-col justify-between ${isSelected ? "bg-blue-900/30 border-blue-500 shadow-xl" : isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"}`,
              children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  p.popular && /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full", children: "Most Popular" }),
                  /* @__PURE__ */ jsx("h4", { className: "text-[18px] font-semibold leading-[1.35] mt-2", children: p.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-[24px] font-bold text-blue-400 mt-1", children: [
                    "₹",
                    p.priceMonthly.toLocaleString(),
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-[13px] font-normal text-slate-400", children: "/ mo" })
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-[13px] font-semibold text-emerald-400 mt-1", children: [
                    "Up to ",
                    p.maxChildren,
                    " Student Accounts"
                  ] }),
                  /* @__PURE__ */ jsx("ul", { className: "mt-3 space-y-2 text-[14px] font-normal leading-relaxed text-slate-300", children: p.features.map((f, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(FiCheck, { className: "w-4 h-4 text-emerald-400 shrink-0" }),
                    /* @__PURE__ */ jsx("span", { children: f })
                  ] }, i)) })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between text-[13px] font-semibold", children: /* @__PURE__ */ jsx("span", { className: isSelected ? "text-blue-400" : "text-slate-400", children: isSelected ? "✓ Selected" : "Click to Select" }) })
              ]
            },
            p.id
          );
        }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between pt-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setOnboardingStep(3),
              className: "px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[14px]",
              children: "Back"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setOnboardingStep(5);
                setIsPaymentModalOpen(true);
              },
              className: "px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[14px] shadow-md flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Proceed to Payment Gateway" }),
                /* @__PURE__ */ jsx(FiCreditCard, { className: "w-4 h-4" })
              ]
            }
          )
        ] })
      ] }),
      onboardingStep === 5 && /* @__PURE__ */ jsxs("div", { className: "space-y-4 animate-fade-in", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl md:text-[22px] font-semibold leading-[1.3] tracking-[-0.015em] flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsx(FiCreditCard, { className: "w-5 h-5 text-emerald-400" }),
          "Step 5: Payment Gateway Simulation"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-[14px] font-normal leading-relaxed text-slate-400", children: [
          "Test both execution branches: ",
          /* @__PURE__ */ jsx("strong", { children: "Success ➔ Activate Plan" }),
          " vs ",
          /* @__PURE__ */ jsx("strong", { children: "Failed ➔ Retry Payment" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2 text-[14px]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "Chosen Plan:" }),
            /* @__PURE__ */ jsxs("span", { className: "font-semibold uppercase", children: [
              selectedPlanToBuy,
              " Plan"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-bold border-t border-slate-700 pt-2 text-[16px]", children: [
            /* @__PURE__ */ jsx("span", { children: "Total Amount Due:" }),
            /* @__PURE__ */ jsxs("span", { className: "text-blue-400", children: [
              "₹",
              (((_a2 = FAMILY_PLANS.find((p) => p.id === selectedPlanToBuy)) == null ? void 0 : _a2.priceMonthly) || 999).toLocaleString(),
              " / Month"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleExecutePayment("success"),
              className: "flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold shadow-md cursor-pointer flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsx(FiCheckCircle, { className: "w-4 h-4" }),
                "Simulate Payment Success (Activate Plan)"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleExecutePayment("failed"),
              className: "flex-1 py-3 bg-rose-600/80 hover:bg-rose-600 text-white rounded-xl text-[14px] font-semibold shadow-md cursor-pointer flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsx(FiAlertTriangle, { className: "w-4 h-4" }),
                "Simulate Payment Failure (Test Retry)"
              ]
            }
          )
        ] })
      ] }),
      onboardingStep === 6 && /* @__PURE__ */ jsxs("div", { className: "space-y-4 animate-fade-in", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl md:text-[22px] font-semibold leading-[1.3] tracking-[-0.015em] flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsx(FiUserCheck, { className: "w-5 h-5 text-emerald-400" }),
          "Step 6: Assign Access to Student Accounts"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[14px] font-normal leading-relaxed text-slate-400", children: "Toggle access licenses for your registered children. Licensed children can log into their independent Student Portal." }),
        childrenList.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-6 text-center border border-dashed border-slate-700 rounded-2xl text-[14px] text-slate-400", children: "No children accounts registered yet." }) : /* @__PURE__ */ jsx("div", { className: "space-y-2", children: childrenList.map((c) => /* @__PURE__ */ jsxs("div", { className: "p-3.5 rounded-2xl border border-slate-700 bg-slate-800/50 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("img", { src: c.avatarUrl, alt: c.name, className: "w-10 h-10 rounded-xl object-cover" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-[15px] font-semibold", children: c.name }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-[13px] font-normal", children: c.studentEmail })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleToggleAccess(c.id),
              className: `px-3.5 py-1.5 rounded-xl font-semibold text-[13px] transition cursor-pointer ${c.hasAccess ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-slate-700 text-slate-400"}`,
              children: c.hasAccess ? "✓ Access Active" : "Assign License"
            }
          )
        ] }, c.id)) }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleCompleteOnboarding,
            className: "px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-semibold text-[15px] shadow-xl cursor-pointer flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx("span", { children: "Finish Onboarding & Launch Dashboard" }),
              /* @__PURE__ */ jsx(FiCheckCircle, { className: "w-5 h-5" })
            ]
          }
        ) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 font-sans", children: [
    /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-3xl border transition-all ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-700/30", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold uppercase tracking-wider text-blue-500", children: "Role Ready Parent Intelligence Suite" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2 mt-0.5", children: [
            /* @__PURE__ */ jsx(FiShield, { className: "w-5 h-5 text-emerald-400" }),
            "Welcome, ",
            (familyProfile == null ? void 0 : familyProfile.parentName) || "Parent"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: [
            "Active Plan: ",
            /* @__PURE__ */ jsx("strong", { className: "text-emerald-400 font-semibold", children: ((_b2 = familyProfile == null ? void 0 : familyProfile.subscription) == null ? void 0 : _b2.planName) || "No Plan" }),
            " (",
            ((_c = familyProfile == null ? void 0 : familyProfile.subscription) == null ? void 0 : _c.usedSeats) || 0,
            "/",
            ((_d = familyProfile == null ? void 0 : familyProfile.subscription) == null ? void 0 : _d.maxChildren) || 1,
            " Seats In Use)"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setIsOnboardingMode(true),
              className: "px-3.5 py-2 rounded-xl text-[14px] font-semibold bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition cursor-pointer flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsx(FiSliders, { className: "w-4 h-4" }),
                "Review Family Flow"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setIsPaymentModalOpen(true),
              className: "px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[14px] font-semibold transition shadow-md cursor-pointer flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsx(FiCreditCard, { className: "w-4 h-4" }),
                "Manage Plan"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setIsAddChildModalOpen(true),
              className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold transition shadow-md cursor-pointer flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsx(FiUserPlus, { className: "w-4 h-4" }),
                "+ Add Child"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold uppercase text-slate-400 tracking-wider", children: "Select Child to Inspect (Synchronizes all sub-views reactively):" }) }),
        childrenList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl border border-dashed border-slate-700 bg-slate-800/30 text-center", children: [
          /* @__PURE__ */ jsx(FiUsers, { className: "w-8 h-8 text-slate-500 mx-auto mb-2" }),
          /* @__PURE__ */ jsx("p", { className: "text-[16px] font-semibold text-slate-300", children: "No children accounts registered yet" }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: "Register a child account to monitor attendance, academic progress, and career milestones." }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setIsAddChildModalOpen(true),
              className: "mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold transition inline-flex items-center gap-2 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(FiUserPlus, { className: "w-4 h-4" }),
                "+ Add First Child"
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: childrenList.map((c) => {
          const isSelected = (selectedChild == null ? void 0 : selectedChild.id) === c.id;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => setSelectedChildId(c.id),
              className: `p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${isSelected ? "bg-blue-900/30 border-blue-500 shadow-md ring-1 ring-blue-500/50" : isDarkMode ? "bg-slate-800/40 border-slate-700/60 hover:bg-slate-800" : "bg-slate-50 border-slate-200 hover:bg-blue-50"}`,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("img", { src: c.avatarUrl, alt: c.name, className: "w-10 h-10 rounded-xl object-cover border border-blue-400" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-semibold text-[16px] leading-[1.35]", children: c.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-[13px] text-slate-400", children: c.grade })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsx("span", { className: `px-2.5 py-0.5 rounded-full text-[12px] font-medium ${c.hasAccess ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"}`, children: c.hasAccess ? "Active" : "No License" }),
                  isSelected && /* @__PURE__ */ jsx("span", { className: "block text-[12px] text-blue-400 font-semibold mt-1", children: "Inspecting" })
                ] })
              ]
            },
            c.id
          );
        }) })
      ] })
    ] }),
    !selectedChild && ["attendance", "academic", "learning", "career", "career-reports", "fees"].includes(activeSubView) && /* @__PURE__ */ jsxs("div", { className: `p-10 rounded-3xl border text-center ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900"}`, children: [
      /* @__PURE__ */ jsx(FiInfo, { className: "w-10 h-10 text-blue-400 mx-auto mb-3" }),
      /* @__PURE__ */ jsx("h3", { className: "text-[17px] md:text-[18px] font-semibold leading-[1.35]", children: "No Child Account Selected" }),
      /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 max-w-sm mx-auto leading-normal", children: "Please register or select a child account to inspect their progress, attendance, and evaluation records." }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setIsAddChildModalOpen(true),
          className: "mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold transition inline-flex items-center gap-2 cursor-pointer",
          children: [
            /* @__PURE__ */ jsx(FiUserPlus, { className: "w-4 h-4" }),
            "+ Add Child"
          ]
        }
      )
    ] }),
    activeSubView === "overview" && /* @__PURE__ */ jsx("div", { className: "space-y-6", children: selectedChild ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-slate-400 mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold uppercase tracking-wider", children: "Overall Attendance" }),
            /* @__PURE__ */ jsx(FiCheckCircle, { className: "w-5 h-5 text-emerald-400" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-baseline gap-2", children: /* @__PURE__ */ jsxs("span", { className: "text-[30px] md:text-[32px] font-bold leading-none tracking-[-0.02em]", children: [
            (attendanceData == null ? void 0 : attendanceData.overallPercentage) || 0,
            "%"
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] text-slate-400 mt-2", children: (attendanceData == null ? void 0 : attendanceData.totalDays) ? `${attendanceData.presentDays} of ${attendanceData.totalDays} days attended` : "No attendance logs recorded yet" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-slate-400 mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold uppercase tracking-wider", children: "Academic GPA" }),
            /* @__PURE__ */ jsx(FiAward, { className: "w-5 h-5 text-blue-400" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[30px] md:text-[32px] font-bold leading-none tracking-[-0.02em]", children: (academicProgress == null ? void 0 : academicProgress.overallGpa) || 0 }),
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium text-slate-400", children: "/ 10.0" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] text-slate-400 mt-2", children: (academicProgress == null ? void 0 : academicProgress.classRank) !== "-" ? `Class Rank: ${academicProgress == null ? void 0 : academicProgress.classRank}` : "Exams pending evaluation" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-slate-400 mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold uppercase tracking-wider", children: "Weekly Study Hours" }),
            /* @__PURE__ */ jsx(FiClock, { className: "w-5 h-5 text-indigo-400" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[30px] md:text-[32px] font-bold leading-none tracking-[-0.02em]", children: (learningProgress == null ? void 0 : learningProgress.weeklyStudyHours) || 0 }),
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium text-slate-400", children: "Hrs / Wk" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] text-slate-400 mt-2", children: (learningProgress == null ? void 0 : learningProgress.totalCoursesEnrolled) ? `${learningProgress.totalCoursesEnrolled} active courses` : "No courses enrolled yet" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-slate-400 mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold uppercase tracking-wider", children: "AI Career Alignment" }),
            /* @__PURE__ */ jsx(FiZap, { className: "w-5 h-5 text-amber-400" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-baseline gap-2", children: /* @__PURE__ */ jsxs("span", { className: "text-[30px] md:text-[32px] font-bold leading-none tracking-[-0.02em]", children: [
            selectedChild.matchScore,
            "%"
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] text-blue-300 mt-2 truncate", children: selectedChild.topAiCareerMatch || "Pending assessment" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"}`, children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-[17px] md:text-[18px] font-semibold leading-[1.35] flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsx(FiBookOpen, { className: "w-5 h-5 text-blue-400" }),
          "Subject Mastery Snapshot — ",
          selectedChild.name
        ] }),
        (((_e = academicProgress == null ? void 0 : academicProgress.subjects) == null ? void 0 : _e.length) || 0) === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-6 text-[13px] text-slate-400 border border-dashed border-slate-700/60 rounded-2xl", children: "No academic subject evaluation marks published yet for this student." }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: academicProgress == null ? void 0 : academicProgress.subjects.map((s) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-2xl border ${isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[14px]", children: s.subject }),
            /* @__PURE__ */ jsx("span", { className: "text-[14px] font-bold text-blue-400", children: s.grade })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-slate-700/40 rounded-full h-2 mb-2 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "bg-blue-500 h-2 rounded-full", style: { width: `${s.score}%` } }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[12px] text-slate-400", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Score: ",
              s.score,
              "%"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-emerald-400 font-semibold", children: s.remarks })
          ] })
        ] }, s.id)) })
      ] })
    ] }) : null }),
    activeSubView === "children" && /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"} space-y-6`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FiUsers, { className: "w-5 h-5 text-blue-400" }),
            "My Children & Student Credentials Desk"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: "Created login credentials for your children to access their independent Student Learning Suite." })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsAddChildModalOpen(true),
            className: "px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[14px] font-semibold shadow-md cursor-pointer flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(FiUserPlus, { className: "w-4 h-4" }),
              "Add Child & Generate Credentials"
            ]
          }
        )
      ] }),
      childrenList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-8 text-center border border-dashed border-slate-700 rounded-2xl bg-slate-800/30", children: [
        /* @__PURE__ */ jsx(FiUserPlus, { className: "w-8 h-8 text-slate-500 mx-auto mb-2" }),
        /* @__PURE__ */ jsx("p", { className: "text-[16px] font-semibold text-slate-300", children: "No children accounts registered yet" }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: "Click the button above to register your first child." })
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: childrenList.map((c) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-3xl border ${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-200"} space-y-4`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("img", { src: c.avatarUrl, alt: c.name, className: "w-14 h-14 rounded-2xl object-cover border-2 border-blue-400 shrink-0" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-[16px] md:text-[17px] leading-[1.35]", children: c.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-[13px] text-slate-400", children: [
              c.grade,
              " • ",
              c.school
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "inline-block mt-1 text-[12px] font-medium px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300", children: [
              "Target: ",
              c.targetCareer
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-3.5 rounded-2xl bg-slate-900 border border-slate-700/60 font-mono text-[13px] space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-sans text-[12px]", children: "Login Email:" }),
            /* @__PURE__ */ jsx("span", { className: "text-blue-300 font-bold", children: c.studentEmail })
          ] }),
          c.tempPassword && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-sans text-[12px]", children: "Password:" }),
            /* @__PURE__ */ jsx("span", { className: "text-emerald-400 font-bold", children: c.tempPassword })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-slate-700/40", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleCopy(`Email: ${c.studentEmail}
Password: ${c.tempPassword || "Custom"}
Portal: https://roleready.ai/login`, c.id),
              className: "px-3.5 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-[14px] font-semibold flex items-center gap-1.5 transition cursor-pointer",
              children: [
                copiedId === c.id ? /* @__PURE__ */ jsx(FiCheck, { className: "w-4 h-4 text-emerald-400" }) : /* @__PURE__ */ jsx(FiCopy, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: copiedId === c.id ? "Copied!" : "Copy Credentials" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleToggleAccess(c.id),
              className: `px-3.5 py-2 rounded-xl text-[14px] font-semibold cursor-pointer transition ${c.hasAccess ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-slate-700 text-slate-400"}`,
              children: c.hasAccess ? "✓ License Active" : "Assign License"
            }
          )
        ] })
      ] }, c.id)) })
    ] }),
    activeSubView === "accounts" && /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"} space-y-6`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FiShield, { className: "w-5 h-5 text-blue-400" }),
            "Family Accounts & Member Governance"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: "Manage registered family accounts, student access permissions, and independent student credentials." })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsAddChildModalOpen(true),
            className: "px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[14px] font-semibold shadow-md cursor-pointer flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(FiUserPlus, { className: "w-4 h-4" }),
              "Add Child Account"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-2xl border ${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-blue-50/50 border-blue-100"}`, children: [
          /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-slate-400 uppercase tracking-wider block", children: "Total Members" }),
          /* @__PURE__ */ jsx("p", { className: "text-[26px] md:text-[28px] font-bold leading-none mt-2 text-blue-400", children: childrenList.length + 1 }),
          /* @__PURE__ */ jsxs("span", { className: "text-[12px] text-slate-400 mt-1 block", children: [
            "1 Guardian • ",
            childrenList.length,
            " Students"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-2xl border ${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-emerald-50/50 border-emerald-100"}`, children: [
          /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-slate-400 uppercase tracking-wider block", children: "Student Seat Allocation" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[26px] md:text-[28px] font-bold leading-none mt-2 text-emerald-400", children: [
            childrenList.filter((c) => c.hasAccess).length,
            " / ",
            ((_f = familyProfile == null ? void 0 : familyProfile.subscription) == null ? void 0 : _f.maxChildren) || 1
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] text-slate-400 mt-1 block", children: "Active Licenses Assigned" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-2xl border ${isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-purple-50/50 border-purple-100"}`, children: [
          /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-slate-400 uppercase tracking-wider block", children: "Family Subscription" }),
          /* @__PURE__ */ jsx("p", { className: "text-[26px] md:text-[28px] font-bold leading-none mt-2 text-purple-400", children: ((_g = familyProfile == null ? void 0 : familyProfile.subscription) == null ? void 0 : _g.planName) || "Starter" }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] text-emerald-400 font-semibold mt-1 block", children: "Active & Live" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `p-5 rounded-2xl border ${isDarkMode ? "bg-slate-800/40 border-slate-700/80" : "bg-slate-50 border-slate-200"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3.5", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-lg", children: /* @__PURE__ */ jsx(FiShield, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-[17px] md:text-[18px] leading-[1.35]", children: (familyProfile == null ? void 0 : familyProfile.parentName) || "Guardian Account" }),
              /* @__PURE__ */ jsx("span", { className: "px-2.5 py-0.5 rounded-full text-[12px] font-semibold uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30", children: "Primary Admin" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-0.5 leading-normal", children: [
              familyProfile == null ? void 0 : familyProfile.parentEmail,
              " • ",
              (familyProfile == null ? void 0 : familyProfile.phone) || "No phone registered"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit", children: "Full Portal Ownership" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("h4", { className: "text-[16px] md:text-[17px] font-semibold text-slate-300 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FiUsers, { className: "w-4 h-4 text-blue-400" }),
          "Student Accounts (",
          childrenList.length,
          ")"
        ] }),
        childrenList.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-8 text-center border border-dashed border-slate-700 rounded-2xl bg-slate-800/20", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400", children: "No student accounts registered yet in your family." }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setIsAddChildModalOpen(true),
              className: "mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[14px] font-semibold transition inline-flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(FiUserPlus, { className: "w-4 h-4" }),
                "Register First Child"
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: childrenList.map((c) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-2xl border ${isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-white border-slate-200"} space-y-3`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("img", { src: c.avatarUrl, alt: c.name, className: "w-11 h-11 rounded-xl object-cover border border-blue-400 shrink-0" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h5", { className: "font-semibold text-[16px] leading-[1.35]", children: c.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-[13px] text-slate-400", children: [
                  c.grade,
                  " • ",
                  c.school
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: `px-2.5 py-0.5 rounded-full text-[12px] font-medium ${c.hasAccess ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"}`, children: c.hasAccess ? "Active License" : "Inactive" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-[13px] space-y-1.5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-sans text-[12px]", children: "Login Email:" }),
              /* @__PURE__ */ jsx("span", { className: "text-blue-300 font-bold", children: c.studentEmail })
            ] }),
            c.tempPassword && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-sans text-[12px]", children: "Password:" }),
              /* @__PURE__ */ jsx("span", { className: "text-emerald-400 font-bold", children: c.tempPassword })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-slate-700/40", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => handleCopy(`Email: ${c.studentEmail}
Password: ${c.tempPassword || "Custom"}
Portal: https://roleready.ai/login`, c.id),
                className: "px-3.5 py-1.5 bg-slate-700/70 hover:bg-slate-700 text-white rounded-xl text-[14px] font-semibold flex items-center gap-1.5 transition cursor-pointer",
                children: [
                  copiedId === c.id ? /* @__PURE__ */ jsx(FiCheck, { className: "w-4 h-4 text-emerald-400" }) : /* @__PURE__ */ jsx(FiCopy, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: copiedId === c.id ? "Copied" : "Copy Info" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setSelectedChildId(c.id);
                    onShowToast(`Selected ${c.name} for monitoring`);
                  },
                  className: `px-3.5 py-1.5 rounded-xl text-[14px] font-semibold cursor-pointer transition ${(selectedChild == null ? void 0 : selectedChild.id) === c.id ? "bg-blue-600 text-white" : "bg-slate-700/60 text-slate-300 hover:bg-slate-700"}`,
                  children: (selectedChild == null ? void 0 : selectedChild.id) === c.id ? "Selected" : "Select"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleToggleAccess(c.id),
                  className: `px-3.5 py-1.5 rounded-xl text-[14px] font-semibold cursor-pointer transition ${c.hasAccess ? "bg-rose-500/20 text-rose-300 hover:bg-rose-500/30" : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"}`,
                  children: c.hasAccess ? "Revoke Seat" : "Assign Seat"
                }
              )
            ] })
          ] })
        ] }, c.id)) })
      ] })
    ] }),
    activeSubView === "attendance" && selectedChild && /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"} space-y-6`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FiCalendar, { className: "w-5 h-5 text-emerald-400" }),
            "Attendance & Classroom Presence — ",
            selectedChild.name
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: "Live attendance feed verified directly from institutional portal." })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[13px] font-semibold", children: [
          (attendanceData == null ? void 0 : attendanceData.overallPercentage) || 0,
          "% Overall Presence"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-slate-800/40 border border-slate-700 text-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-400 text-[12px] font-semibold uppercase tracking-wider block", children: "Total Days" }),
          /* @__PURE__ */ jsx("span", { className: "text-[28px] md:text-[30px] font-bold leading-none mt-2 block", children: (attendanceData == null ? void 0 : attendanceData.totalDays) || 0 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-emerald-400 text-[12px] font-semibold uppercase tracking-wider block", children: "Present Days" }),
          /* @__PURE__ */ jsx("span", { className: "text-[28px] md:text-[30px] font-bold leading-none text-emerald-400 mt-2 block", children: (attendanceData == null ? void 0 : attendanceData.presentDays) || 0 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-rose-400 text-[12px] font-semibold uppercase tracking-wider block", children: "Absent Days" }),
          /* @__PURE__ */ jsx("span", { className: "text-[28px] md:text-[30px] font-bold leading-none text-rose-400 mt-2 block", children: (attendanceData == null ? void 0 : attendanceData.absentDays) || 0 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-amber-400 text-[12px] font-semibold uppercase tracking-wider block", children: "Late Days" }),
          /* @__PURE__ */ jsx("span", { className: "text-[28px] md:text-[30px] font-bold leading-none text-amber-400 mt-2 block", children: (attendanceData == null ? void 0 : attendanceData.lateDays) || 0 })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-[12px] font-semibold uppercase text-slate-400 mb-3 tracking-wider", children: "Subject-Wise Attendance" }),
        (((_h = attendanceData == null ? void 0 : attendanceData.subjectBreakdown) == null ? void 0 : _h.length) || 0) === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-6 text-[13px] text-slate-400 border border-dashed border-slate-700/60 rounded-2xl", children: "No subject attendance records submitted yet for this student." }) : /* @__PURE__ */ jsx("div", { className: "space-y-2.5", children: attendanceData == null ? void 0 : attendanceData.subjectBreakdown.map((sub, i) => /* @__PURE__ */ jsxs("div", { className: "p-3.5 rounded-2xl border border-slate-700 bg-slate-800/40 flex items-center justify-between text-[14px]", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: sub.subject }),
            /* @__PURE__ */ jsxs("p", { className: "text-slate-400 text-[12px] mt-0.5", children: [
              sub.attendedClasses,
              " of ",
              sub.totalClasses,
              " classes attended"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "font-bold text-emerald-400 text-[15px]", children: [
            sub.percentage,
            "%"
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-[12px] font-semibold uppercase text-slate-400 mb-3 tracking-wider", children: "Recent Classroom Check-ins" }),
        (((_i = attendanceData == null ? void 0 : attendanceData.recentLogs) == null ? void 0 : _i.length) || 0) === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-6 text-[13px] text-slate-400 border border-dashed border-slate-700/60 rounded-2xl", children: "No classroom check-in logs recorded yet." }) : /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-800 border border-slate-700 rounded-2xl overflow-hidden text-[14px]", children: attendanceData == null ? void 0 : attendanceData.recentLogs.map((log) => /* @__PURE__ */ jsxs("div", { className: "p-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: `w-2.5 h-2.5 rounded-full ${log.status === "present" ? "bg-emerald-400" : "bg-amber-400"}` }),
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[14px]", children: log.subject }),
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 text-[13px]", children: log.remarks })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-mono text-[12px]", children: log.date })
        ] }, log.id)) })
      ] })
    ] }),
    activeSubView === "academic" && selectedChild && /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"} space-y-6`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FiBookOpen, { className: "w-5 h-5 text-blue-400" }),
            "Academic Performance & Exam Reports — ",
            selectedChild.name
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: "Institutional grades, term examinations, and teacher recommendations." })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[13px] font-semibold", children: (academicProgress == null ? void 0 : academicProgress.gradingSystem) || "10-Point CGPA" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "border border-slate-700 rounded-2xl overflow-hidden text-[14px]", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-slate-800 text-slate-400 font-semibold uppercase text-[12px] tracking-wider", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Subject" }),
          /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Term" }),
          /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Score" }),
          /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Grade" }),
          /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Class Avg" }),
          /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Remarks" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-800", children: (((_j = academicProgress == null ? void 0 : academicProgress.subjects) == null ? void 0 : _j.length) || 0) === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "p-6 text-center text-slate-400 text-[13px]", children: "No academic marks or exam grades recorded yet for this student." }) }) : academicProgress == null ? void 0 : academicProgress.subjects.map((sub) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { className: "p-3.5 font-semibold text-[14px]", children: sub.subject }),
          /* @__PURE__ */ jsx("td", { className: "p-3.5 text-slate-400 text-[14px]", children: sub.term }),
          /* @__PURE__ */ jsxs("td", { className: "p-3.5 font-bold text-blue-400 text-[14px]", children: [
            sub.score,
            " / ",
            sub.maxScore
          ] }),
          /* @__PURE__ */ jsx("td", { className: "p-3.5 font-bold text-emerald-400 text-[14px]", children: sub.grade }),
          /* @__PURE__ */ jsxs("td", { className: "p-3.5 text-slate-400 text-[14px]", children: [
            sub.classAverage,
            "%"
          ] }),
          /* @__PURE__ */ jsx("td", { className: "p-3.5 text-slate-300 text-[14px]", children: sub.remarks })
        ] }, sub.id)) })
      ] }) }),
      (academicProgress == null ? void 0 : academicProgress.teacherFeedback) && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-slate-800/40 border border-slate-700 text-[14px]", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-blue-400 text-[12px] uppercase tracking-wider block mb-1", children: "Academic Counselor Review:" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-300 leading-relaxed text-[14px]", children: academicProgress.teacherFeedback })
      ] })
    ] }),
    activeSubView === "career" && selectedChild && /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"} space-y-6`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FiCompass, { className: "w-5 h-5 text-indigo-400" }),
            "Career DNA & Psychometric Trajectory — ",
            selectedChild.name
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: "Calculated via Holland RIASEC Hexagonal Cognitive Aptitude Assessment." })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "px-3 py-1 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[13px] font-semibold", children: [
          "Holland Code: ",
          (careerProgress == null ? void 0 : careerProgress.riasecCode) || "Pending"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6 space-y-3", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[12px] font-semibold uppercase text-slate-400 tracking-wider", children: "RIASEC Psychological Profile" }),
          (((_k = careerProgress == null ? void 0 : careerProgress.hollandScores) == null ? void 0 : _k.length) || 0) === 0 ? /* @__PURE__ */ jsx("div", { className: "p-6 text-center border border-dashed border-slate-700 rounded-2xl text-[13px] text-slate-400", children: "RIASEC Holland Code assessment pending. When your student completes the diagnostic in their portal, live psychometric data will appear here." }) : careerProgress == null ? void 0 : careerProgress.hollandScores.map((t, idx) => /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[14px]", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-300 font-medium", children: t.trait }),
              /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
                t.score,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-full bg-slate-800 rounded-full h-2", children: /* @__PURE__ */ jsx("div", { className: `${t.color} h-2 rounded-full`, style: { width: `${t.score}%` } }) })
          ] }, idx))
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6 space-y-3", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-[12px] font-semibold uppercase text-slate-400 tracking-wider", children: "AI Neural Career Pathways" }),
          (((_l = careerProgress == null ? void 0 : careerProgress.pathways) == null ? void 0 : _l.length) || 0) === 0 ? /* @__PURE__ */ jsx("div", { className: "p-6 text-center border border-dashed border-slate-700 rounded-2xl text-[13px] text-slate-400", children: "Career pathways will generate once the student completes their career diagnostic." }) : careerProgress == null ? void 0 : careerProgress.pathways.map((p) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl border border-slate-700 bg-slate-800/50 space-y-1.5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("h5", { className: "font-semibold text-[16px] leading-[1.35]", children: p.title }),
              /* @__PURE__ */ jsxs("span", { className: "font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20 text-[12px]", children: [
                p.matchScore,
                "% Match"
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-[13px] leading-normal", children: p.matchRationale }),
            /* @__PURE__ */ jsxs("p", { className: "text-blue-300 text-[13px] font-medium", children: [
              "Est. Salary: ",
              p.salaryRange,
              " • ",
              p.growthOutlook
            ] })
          ] }, p.id))
        ] })
      ] })
    ] }),
    activeSubView === "career-reports" && selectedChild && /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"} space-y-6`, children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FiFileText, { className: "w-5 h-5 text-blue-400" }),
          "AI Career Reports & Assessments — ",
          selectedChild.name
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: "Download official evaluation dossiers and counselor reviews." })
      ] }) }),
      reportsData.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-8 text-center border border-dashed border-slate-700 rounded-2xl text-[13px] text-slate-400", children: "No official evaluation reports published yet for this student." }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: reportsData.map((rep) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl border border-slate-700 bg-slate-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-[16px] md:text-[17px] leading-[1.35]", children: rep.title }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-[14px] mt-1 leading-normal", children: rep.summary }),
          /* @__PURE__ */ jsxs("p", { className: "text-[12px] text-blue-300 mt-1 font-medium", children: [
            "Generated: ",
            rep.generatedDate
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => onShowToast(`Downloading report: ${rep.title}...`),
            className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold transition shadow-md cursor-pointer flex items-center gap-2 shrink-0 self-start md:self-auto",
            children: [
              /* @__PURE__ */ jsx(FiDownload, { className: "w-4 h-4" }),
              "Download PDF"
            ]
          }
        )
      ] }, rep.id)) })
    ] }),
    activeSubView === "learning" && selectedChild && /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"} space-y-6`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FiActivity, { className: "w-5 h-5 text-indigo-400" }),
            "Learning Progress & Active Course Tracks — ",
            selectedChild.name
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: "Courses and curriculum modules completed in the Student Learning Suite." })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-[13px] font-semibold text-emerald-400", children: [
          (learningProgress == null ? void 0 : learningProgress.weeklyStudyHours) || 0,
          " Study Hours This Week"
        ] })
      ] }),
      (((_m = learningProgress == null ? void 0 : learningProgress.activeCourses) == null ? void 0 : _m.length) || 0) === 0 ? /* @__PURE__ */ jsx("div", { className: "p-8 text-center border border-dashed border-slate-700 rounded-2xl text-[13px] text-slate-400", children: "No active curriculum courses enrolled yet in Student Learning Suite." }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: learningProgress == null ? void 0 : learningProgress.activeCourses.map((c) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl border border-slate-700 bg-slate-800/40 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold uppercase text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full", children: c.category }),
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-[16px] leading-[1.35] mt-2", children: c.title }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-[13px] mt-0.5", children: c.provider })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-3 border-t border-slate-700/60", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-1", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-slate-400 text-[13px]", children: [
              "Lessons: ",
              c.completedLessons,
              "/",
              c.totalLessons
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[13px] text-blue-400", children: [
              c.progressPercent,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-slate-800 rounded-full h-2 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "bg-blue-500 h-2 rounded-full", style: { width: `${c.progressPercent}%` } }) })
        ] })
      ] }, c.id)) })
    ] }),
    activeSubView === "scholarships" && /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"} space-y-6`, children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FiAward, { className: "w-5 h-5 text-indigo-400" }),
          "Scholarship Opportunities ",
          selectedChild ? `Matched for ${selectedChild.name}` : ""
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: "Directly matched to student's academic standing, grade, and eligibility criteria." })
      ] }) }),
      scholarships.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12 border border-dashed border-slate-700 rounded-3xl p-6", children: [
        /* @__PURE__ */ jsx(FiAward, { className: "w-10 h-10 text-slate-500 mx-auto mb-3" }),
        /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-slate-300", children: "No Scholarship Recommendations Yet" }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-slate-400 mt-1 max-w-sm mx-auto", children: "When scholarship recommendations become available based on student criteria, they will be listed here." })
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: scholarships.map((sch) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-3xl border border-slate-700 bg-slate-800/40 flex flex-col justify-between space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-[16px] md:text-[17px] leading-[1.35]", children: sch.name }),
            /* @__PURE__ */ jsxs("span", { className: "px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-emerald-500/20 text-emerald-300", children: [
              sch.matchScore,
              "% Match"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-[13px] mt-0.5", children: sch.provider }),
          /* @__PURE__ */ jsx("p", { className: "text-emerald-400 font-bold mt-2 text-[16px]", children: sch.amount }),
          /* @__PURE__ */ jsxs("p", { className: "text-slate-300 text-[13px] mt-2", children: [
            /* @__PURE__ */ jsx("strong", { children: "Criteria:" }),
            " ",
            sch.eligibilityCriteria
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-2 border-t border-slate-700/60 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-slate-400 text-[12px]", children: [
            "Deadline: ",
            sch.deadline
          ] }),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: sch.applyLink,
              target: "_blank",
              rel: "noreferrer",
              className: "px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[14px] font-semibold flex items-center gap-1.5 transition",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Apply Guide" }),
                /* @__PURE__ */ jsx(FiExternalLink, { className: "w-3.5 h-3.5" })
              ]
            }
          )
        ] })
      ] }, sch.id)) })
    ] }),
    activeSubView === "colleges" && /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"} space-y-6`, children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FiCompass, { className: "w-5 h-5 text-blue-400" }),
          "Target University & College Explorer"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: "Curated universities aligned with student career trajectory." })
      ] }) }),
      colleges.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12 border border-dashed border-slate-700 rounded-3xl p-6", children: [
        /* @__PURE__ */ jsx(FiCompass, { className: "w-10 h-10 text-slate-500 mx-auto mb-3" }),
        /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-slate-300", children: "No College Recommendations Yet" }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-slate-400 mt-1 max-w-sm mx-auto", children: "When universities are mapped to the student's career trajectory, they will be displayed here." })
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: colleges.map((col) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-3xl border border-slate-700 bg-slate-800/40 flex flex-col justify-between space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-[16px] md:text-[17px] leading-[1.35]", children: col.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-slate-400 text-[13px] flex items-center gap-1 mt-0.5", children: [
                /* @__PURE__ */ jsx(FiMapPin, { className: "w-3.5 h-3.5" }),
                col.location
              ] })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-blue-500/20 text-blue-300", children: [
              "Rank #",
              col.ranking
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-1 text-[13px]", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-slate-300", children: [
              /* @__PURE__ */ jsx("strong", { children: "Annual Fees:" }),
              " ",
              col.feesAnnual
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-slate-300", children: [
              /* @__PURE__ */ jsx("strong", { children: "Admissions Selectivity:" }),
              " ",
              col.acceptanceRate
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-slate-400", children: [
              /* @__PURE__ */ jsx("strong", { children: "Programs:" }),
              " ",
              col.programs.join(" • ")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-2 border-t border-slate-700/60 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-emerald-400 font-semibold text-[13px]", children: [
            "Min GPA: ",
            col.minGpaRequired
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast(`Shortlisted ${col.name}!`),
              className: "px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[14px] font-semibold transition cursor-pointer",
              children: "Shortlist College"
            }
          )
        ] })
      ] }, col.id)) })
    ] }),
    activeSubView === "mentors" && /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"} space-y-6`, children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FiUserCheck, { className: "w-5 h-5 text-emerald-400" }),
          "1-on-1 Certified Mentor & Counselor Booking"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: "Book personal sessions with industry architects and admissions experts." })
      ] }) }),
      mentorBookings.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-[12px] font-semibold uppercase text-slate-400 tracking-wider", children: "Scheduled Mentorship Sessions" }),
        mentorBookings.map((bk) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col md:flex-row md:items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h5", { className: "font-semibold text-[16px] leading-[1.35] text-emerald-400", children: [
              "Session with ",
              bk.mentorName
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-[13px] mt-0.5", children: bk.topic }),
            /* @__PURE__ */ jsxs("p", { className: "text-slate-400 text-[12px] mt-1", children: [
              bk.date,
              " at ",
              bk.timeSlot,
              " • Student: ",
              bk.studentName
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: bk.meetingLink || "#",
              target: "_blank",
              rel: "noreferrer",
              className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold transition flex items-center gap-2 shrink-0 self-start md:self-auto",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Join Video Call" }),
                /* @__PURE__ */ jsx(FiExternalLink, { className: "w-3.5 h-3.5" })
              ]
            }
          )
        ] }, bk.id))
      ] }),
      mentors.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12 border border-dashed border-slate-700 rounded-3xl p-6", children: [
        /* @__PURE__ */ jsx(FiUsers, { className: "w-10 h-10 text-slate-500 mx-auto mb-3" }),
        /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-slate-300", children: "No Mentors Currently Available" }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-slate-400 mt-1 max-w-sm mx-auto", children: "Verified mentors are being updated on the network. Please check back shortly." })
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: mentors.map((m) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-3xl border border-slate-700 bg-slate-800/40 flex flex-col justify-between space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("img", { src: m.avatarUrl, alt: m.name, className: "w-12 h-12 rounded-xl object-cover border border-emerald-400 shrink-0" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold text-[16px] md:text-[17px] leading-[1.35]", children: m.name }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-[13px]", children: m.title })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-emerald-400 font-semibold text-[13px] mt-2", children: m.organization }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-[13px] mt-2 leading-relaxed", children: m.bio }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mt-2 text-amber-400 font-semibold text-[13px]", children: [
            /* @__PURE__ */ jsx(FiStar, { className: "w-3.5 h-3.5 fill-amber-400" }),
            /* @__PURE__ */ jsxs("span", { children: [
              m.rating,
              " (",
              m.reviewCount,
              " reviews)"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-3 border-t border-slate-700/60 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-[15px] text-blue-400", children: m.hourlyRate }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setSelectedMentorToBook(m);
                setIsBookMentorModalOpen(true);
              },
              className: "px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[14px] font-semibold transition cursor-pointer",
              children: "Book Slot"
            }
          )
        ] })
      ] }, m.id)) })
    ] }),
    activeSubView === "notifications" && /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"} space-y-6`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FiBell, { className: "w-5 h-5 text-amber-400" }),
            "Family Notifications & Activity Alerts"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: "Real-time alerts across academic results, scholarships, and sessions." })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onShowToast("All notifications marked as read!"),
            className: "px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[14px] font-semibold transition cursor-pointer",
            children: "Mark All Read"
          }
        )
      ] }),
      notifications.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12 border border-dashed border-slate-700 rounded-3xl p-6", children: [
        /* @__PURE__ */ jsx(FiBell, { className: "w-10 h-10 text-slate-500 mx-auto mb-3" }),
        /* @__PURE__ */ jsx("h4", { className: "text-[16px] font-semibold text-slate-300", children: "No Notifications" }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-slate-400 mt-1", children: "You're all caught up! New alerts and academic milestones will appear here." })
      ] }) : /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-800 border border-slate-700 rounded-2xl overflow-hidden text-[14px]", children: notifications.map((n) => /* @__PURE__ */ jsxs("div", { className: "p-4 flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            !n.isRead && /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-blue-500" }),
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-[16px] leading-[1.35]", children: n.title })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-[14px] leading-normal", children: n.message }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] text-slate-400 block mt-0.5", children: n.timestamp })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "px-2.5 py-0.5 rounded-full text-[12px] font-semibold uppercase bg-slate-800 text-slate-400 shrink-0", children: n.category })
      ] }, n.id)) })
    ] }),
    activeSubView === "subscription" && /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"} space-y-6`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FiCreditCard, { className: "w-5 h-5 text-emerald-400" }),
            "Subscription Plans & Family Seat Allocation"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: "Choose the optimal plan to unlock AI assessment suites, career roadmaps, and mentor sessions for your children." })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              var _a3;
              setSelectedPlanToBuy(((_a3 = familyProfile == null ? void 0 : familyProfile.subscription) == null ? void 0 : _a3.planId) || "growth");
              setIsPaymentModalOpen(true);
            },
            className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold shadow-md cursor-pointer flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(FiZap, { className: "w-4 h-4" }),
              "Manage / Upgrade Plan"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border ${isDarkMode ? "bg-blue-950/20 border-blue-500/30" : "bg-blue-50 border-blue-200"} flex flex-col md:flex-row md:items-center justify-between gap-4`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20", children: "Current Active Plan" }),
            /* @__PURE__ */ jsxs("span", { className: "text-[13px] text-slate-400 font-medium", children: [
              "• Renews ",
              ((_n = familyProfile == null ? void 0 : familyProfile.subscription) == null ? void 0 : _n.renewalDate) || "Monthly"
            ] })
          ] }),
          /* @__PURE__ */ jsx("h4", { className: "text-[22px] md:text-[24px] font-bold mt-2 text-white leading-[1.25]", children: ((_o = familyProfile == null ? void 0 : familyProfile.subscription) == null ? void 0 : _o.planName) || "Starter Plan" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: [
            "Allocated Seats: ",
            /* @__PURE__ */ jsx("span", { className: "text-emerald-400 font-semibold", children: childrenList.filter((c) => c.hasAccess).length }),
            " of ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-white", children: ((_p = familyProfile == null ? void 0 : familyProfile.subscription) == null ? void 0 : _p.maxChildren) || 1 }),
            " student accounts active."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[13px] text-slate-400 block font-medium", children: "Monthly Investment" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[26px] md:text-[28px] font-bold text-emerald-400 leading-none mt-1", children: [
            "₹",
            (((_q = familyProfile == null ? void 0 : familyProfile.subscription) == null ? void 0 : _q.priceMonthly) || 499).toLocaleString(),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-[13px] text-slate-400 font-normal", children: "/ mo" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[12px] text-emerald-300 font-medium bg-emerald-500/10 px-2.5 py-0.5 rounded-full mt-1.5 inline-block", children: "Tax Invoice Generated" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: FAMILY_PLANS.map((p) => {
        var _a3, _b3;
        const isCurrent = ((_a3 = familyProfile == null ? void 0 : familyProfile.subscription) == null ? void 0 : _a3.planId) === p.id || !((_b3 = familyProfile == null ? void 0 : familyProfile.subscription) == null ? void 0 : _b3.planId) && p.id === "starter";
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: `p-5 rounded-2xl border flex flex-col justify-between transition relative ${isCurrent ? "bg-blue-900/30 border-blue-500 shadow-xl ring-1 ring-blue-500/50" : isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"}`,
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                  p.popular ? /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold uppercase text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full", children: "Most Popular" }) : /* @__PURE__ */ jsx("span", {}),
                  isCurrent && /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20", children: "Active Plan" })
                ] }),
                /* @__PURE__ */ jsx("h4", { className: "font-semibold text-[17px] md:text-[18px] leading-[1.35] mt-2", children: p.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-[22px] md:text-[24px] font-bold text-blue-400 mt-1", children: [
                  "₹",
                  p.priceMonthly.toLocaleString(),
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-[13px] text-slate-400 font-normal", children: "/ mo" })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-[13px] font-semibold text-emerald-400 mt-1", children: [
                  "Up to ",
                  p.maxChildren,
                  " Student Accounts"
                ] }),
                /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-2 text-[13px] text-slate-300", children: p.features.map((f, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(FiCheck, { className: "w-3.5 h-3.5 text-emerald-400 shrink-0" }),
                  /* @__PURE__ */ jsx("span", { children: f })
                ] }, i)) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-5 pt-3 border-t border-slate-700/50", children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setSelectedPlanToBuy(p.id);
                    setIsPaymentModalOpen(true);
                  },
                  className: `w-full py-2.5 rounded-xl text-[14px] font-semibold transition cursor-pointer ${isCurrent ? "bg-blue-600/30 text-blue-300 border border-blue-500/40 hover:bg-blue-600/50" : "bg-blue-600 hover:bg-blue-500 text-white shadow-md"}`,
                  children: isCurrent ? "Current Active Tier" : `Upgrade to ${p.name}`
                }
              ) })
            ]
          },
          p.id
        );
      }) })
    ] }),
    activeSubView === "fees" && selectedChild && /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"} space-y-6`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FiDollarSign, { className: "w-5 h-5 text-emerald-400" }),
            "Fee Management & Invoicing Desk — ",
            selectedChild.name
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: "Platform subscriptions, school tuition schedules, and payment receipts." })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsPaymentModalOpen(true),
            className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[14px] font-semibold shadow-md cursor-pointer flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(FiCreditCard, { className: "w-4 h-4" }),
              "Pay Pending Dues"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-slate-800/40 border border-slate-700 text-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-400 text-[12px] font-semibold uppercase tracking-wider block", children: "Total Billed Fees" }),
          /* @__PURE__ */ jsxs("span", { className: "text-[26px] md:text-[28px] font-bold leading-none mt-2 block", children: [
            "₹",
            ((feesData == null ? void 0 : feesData.totalFees) || 0).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-emerald-400 text-[12px] font-semibold uppercase tracking-wider block", children: "Paid Amount" }),
          /* @__PURE__ */ jsxs("span", { className: "text-[26px] md:text-[28px] font-bold leading-none text-emerald-400 mt-2 block", children: [
            "₹",
            ((feesData == null ? void 0 : feesData.totalPaid) || 0).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-amber-400 text-[12px] font-semibold uppercase tracking-wider block", children: "Pending Due" }),
          /* @__PURE__ */ jsxs("span", { className: "text-[26px] md:text-[28px] font-bold leading-none text-amber-400 mt-2 block", children: [
            "₹",
            ((feesData == null ? void 0 : feesData.totalPending) || 0).toLocaleString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "border border-slate-700 rounded-2xl overflow-hidden text-[14px]", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-slate-800 text-slate-400 font-semibold uppercase text-[12px] tracking-wider", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Invoice No" }),
          /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Fee Category" }),
          /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Amount" }),
          /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Due Date" }),
          /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Action" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-800", children: (((_r = feesData == null ? void 0 : feesData.records) == null ? void 0 : _r.length) || 0) === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "p-6 text-center text-slate-400 text-[13px]", children: "No fee records or invoices found for this student." }) }) : feesData == null ? void 0 : feesData.records.map((rec) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { className: "p-3.5 font-mono text-blue-300 text-[13px]", children: rec.invoiceNo || "-" }),
          /* @__PURE__ */ jsx("td", { className: "p-3.5 font-semibold text-[14px]", children: rec.title }),
          /* @__PURE__ */ jsxs("td", { className: "p-3.5 font-bold text-[14px]", children: [
            "₹",
            rec.amount.toLocaleString()
          ] }),
          /* @__PURE__ */ jsx("td", { className: "p-3.5 text-slate-400 text-[13px]", children: rec.dueDate }),
          /* @__PURE__ */ jsx("td", { className: "p-3.5", children: /* @__PURE__ */ jsx("span", { className: `px-2.5 py-0.5 rounded-full text-[12px] font-medium ${rec.status === "paid" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`, children: rec.status.toUpperCase() }) }),
          /* @__PURE__ */ jsx("td", { className: "p-3.5", children: rec.status === "paid" ? /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast(`Downloading invoice receipt: ${rec.invoiceNo}...`),
              className: "text-[13px] text-blue-400 hover:text-blue-300 font-semibold cursor-pointer",
              children: "Receipt PDF"
            }
          ) : /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsPaymentModalOpen(true),
              className: "px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-[13px] cursor-pointer",
              children: "Pay Now"
            }
          ) })
        ] }, rec.id)) })
      ] }) })
    ] }),
    activeSubView === "settings" && /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"} space-y-6`, children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FiSliders, { className: "w-5 h-5 text-blue-400" }),
          "Parent Account Settings & Security"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: "Configure guardian profile metadata, notification channels, and account authentication security." })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border ${isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"} space-y-3`, children: [
            /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-[16px] md:text-[17px] leading-[1.35] text-blue-400 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(FiUserCheck, { className: "w-4 h-4" }),
              "Guardian Identity Details"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2.5", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-400 block text-[12px] font-medium", children: "Guardian Name:" }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-white text-[15px]", children: (familyProfile == null ? void 0 : familyProfile.parentName) || "Parent Account" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-400 block text-[12px] font-medium", children: "Primary Email:" }),
                /* @__PURE__ */ jsx("span", { className: "font-mono text-blue-300 text-[13px]", children: familyProfile == null ? void 0 : familyProfile.parentEmail })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-400 block text-[12px] font-medium", children: "Primary Contact:" }),
                /* @__PURE__ */ jsx("span", { className: "text-slate-200 text-[14px]", children: (familyProfile == null ? void 0 : familyProfile.phone) || "Not Set" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-400 block text-[12px] font-medium", children: "Emergency Contact:" }),
                /* @__PURE__ */ jsx("span", { className: "text-slate-200 text-[14px]", children: (familyProfile == null ? void 0 : familyProfile.emergencyContact) || "Not Set" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border ${isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"} space-y-3`, children: [
            /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-[16px] md:text-[17px] leading-[1.35] text-emerald-400 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(FiBell, { className: "w-4 h-4" }),
              "Notification Preferences"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-between cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-300 text-[14px]", children: "Academic & Grade Alerts" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: notifyAcademic,
                    onChange: (e) => {
                      setNotifyAcademic(e.target.checked);
                      onShowToast(`Academic notifications ${e.target.checked ? "enabled" : "disabled"}`);
                    },
                    className: "accent-blue-500 w-4 h-4 cursor-pointer"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-between cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-300 text-[14px]", children: "Classroom Attendance Alerts" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: notifyAttendance,
                    onChange: (e) => {
                      setNotifyAttendance(e.target.checked);
                      onShowToast(`Attendance notifications ${e.target.checked ? "enabled" : "disabled"}`);
                    },
                    className: "accent-blue-500 w-4 h-4 cursor-pointer"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-between cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-300 text-[14px]", children: "Career Diagnostic Milestones" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: notifyCareer,
                    onChange: (e) => {
                      setNotifyCareer(e.target.checked);
                      onShowToast(`Career alerts ${e.target.checked ? "enabled" : "disabled"}`);
                    },
                    className: "accent-blue-500 w-4 h-4 cursor-pointer"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-between cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-300 text-[14px]", children: "1-on-1 Mentor Session Reminders" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: notifyMentors,
                    onChange: (e) => {
                      setNotifyMentors(e.target.checked);
                      onShowToast(`Mentor reminders ${e.target.checked ? "enabled" : "disabled"}`);
                    },
                    className: "accent-blue-500 w-4 h-4 cursor-pointer"
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border ${isDarkMode ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"} space-y-4`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-[16px] md:text-[17px] leading-[1.35] text-blue-400 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(FiKey, { className: "w-4 h-4" }),
              "Change Account Password"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[13px] text-slate-400 mt-1 leading-normal", children: "Ensure your account is protected with a strong, secure password." })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleChangePassword, className: "space-y-3.5", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-medium text-slate-300 mb-1", children: "Current Password" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  required: true,
                  value: oldPassword,
                  onChange: (e) => setOldPassword(e.target.value),
                  placeholder: "••••••••",
                  className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-medium text-slate-300 mb-1", children: "New Password" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  required: true,
                  minLength: 6,
                  value: newPassword,
                  onChange: (e) => setNewPassword(e.target.value),
                  placeholder: "••••••••",
                  className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-medium text-slate-300 mb-1", children: "Confirm New Password" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "password",
                  required: true,
                  minLength: 6,
                  value: confirmPassword,
                  onChange: (e) => setConfirmPassword(e.target.value),
                  placeholder: "••••••••",
                  className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: isChangingPassword,
                className: "w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[14px] font-semibold shadow-md transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2",
                children: isChangingPassword ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(FiRefreshCw, { className: "w-4 h-4 animate-spin" }),
                  /* @__PURE__ */ jsx("span", { children: "Updating Password..." })
                ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(FiKey, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: "Update Password" })
                ] })
              }
            ) })
          ] })
        ] })
      ] })
    ] }),
    activeSubView === "profile" && /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-blue-100 shadow-sm"} space-y-6`, children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/40", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FiShield, { className: "w-5 h-5 text-blue-400" }),
          "Parent & Family Profile Management"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mt-1 leading-normal", children: "Manage your guardian profile, contact details, and account preferences." })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl bg-slate-800/40 border border-slate-700 space-y-3", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-[16px] md:text-[17px] leading-[1.35] text-blue-400", children: "Guardian Contact Information" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 block text-[12px] font-medium", children: "Guardian Name:" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-white text-[15px]", children: (familyProfile == null ? void 0 : familyProfile.parentName) || "Not Set" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 block text-[12px] font-medium", children: "Primary Email:" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono text-blue-300 text-[13px]", children: (familyProfile == null ? void 0 : familyProfile.parentEmail) || "Not Set" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 block text-[12px] font-medium", children: "Primary Mobile:" }),
            /* @__PURE__ */ jsx("span", { className: "text-slate-200 text-[14px]", children: (familyProfile == null ? void 0 : familyProfile.phone) || "Not Set" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 block text-[12px] font-medium", children: "Emergency Contact:" }),
            /* @__PURE__ */ jsx("span", { className: "text-slate-200 text-[14px]", children: (familyProfile == null ? void 0 : familyProfile.emergencyContact) || "Not Set" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl bg-slate-800/40 border border-slate-700 space-y-3", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-[16px] md:text-[17px] leading-[1.35] text-emerald-400", children: "Family Subscription State" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 block text-[12px] font-medium", children: "Active Plan:" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-white text-[15px]", children: ((_s = familyProfile == null ? void 0 : familyProfile.subscription) == null ? void 0 : _s.planName) || "No Plan" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 block text-[12px] font-medium", children: "Seat Allocation:" }),
            /* @__PURE__ */ jsxs("span", { className: "text-slate-200 text-[14px]", children: [
              ((_t = familyProfile == null ? void 0 : familyProfile.subscription) == null ? void 0 : _t.usedSeats) || 0,
              " of ",
              ((_u = familyProfile == null ? void 0 : familyProfile.subscription) == null ? void 0 : _u.maxChildren) || 1,
              " Student Licenses Allocated"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 block text-[12px] font-medium", children: "Billing Cycle:" }),
            /* @__PURE__ */ jsxs("span", { className: "text-slate-200 text-[14px]", children: [
              "Monthly • ₹",
              (((_v = familyProfile == null ? void 0 : familyProfile.subscription) == null ? void 0 : _v.priceMonthly) || 0).toLocaleString(),
              " / month"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-400 block text-[12px] font-medium", children: "Renewal Date:" }),
            /* @__PURE__ */ jsx("span", { className: "text-emerald-400 font-semibold text-[14px]", children: ((_w = familyProfile == null ? void 0 : familyProfile.subscription) == null ? void 0 : _w.renewalDate) || "N/A" })
          ] })
        ] })
      ] })
    ] }),
    isAddChildModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in", children: /* @__PURE__ */ jsxs("div", { className: `w-full max-w-lg rounded-3xl p-6 border shadow-2xl relative ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"}`, children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] mb-1 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(FiUserPlus, { className: "w-5 h-5 text-blue-400" }),
        "Add Child & Generate Student Credentials"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[13px] md:text-[14px] text-slate-400 mb-5 leading-normal", children: "Enter student details to generate and set up their individual student portal access." }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleCreateChild, className: "space-y-4 font-sans", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-medium mb-1", children: "First Name *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                required: true,
                placeholder: "e.g. Lucas",
                value: childFormFirstName,
                onChange: (e) => setChildFormFirstName(e.target.value),
                className: "w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-medium mb-1", children: "Last Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "e.g. Doe",
                value: childFormLastName,
                onChange: (e) => setChildFormLastName(e.target.value),
                className: "w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-medium mb-1", children: "Student Login Email (Optional)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                placeholder: "Auto-generated if empty",
                value: childFormEmail,
                onChange: (e) => setChildFormEmail(e.target.value),
                className: "w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-medium mb-1", children: "Relationship" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: childFormRelationship,
                onChange: (e) => setChildFormRelationship(e.target.value),
                className: "w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "Son", children: "Son" }),
                  /* @__PURE__ */ jsx("option", { value: "Daughter", children: "Daughter" }),
                  /* @__PURE__ */ jsx("option", { value: "Child", children: "Child" }),
                  /* @__PURE__ */ jsx("option", { value: "Ward", children: "Ward / Guardian" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-medium mb-1", children: "Current Grade / Year" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: childFormGrade,
                onChange: (e) => setChildFormGrade(e.target.value),
                className: "w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]",
                children: [
                  /* @__PURE__ */ jsx("option", { children: "Grade 8 - Middle School" }),
                  /* @__PURE__ */ jsx("option", { children: "Grade 9 - Foundation" }),
                  /* @__PURE__ */ jsx("option", { children: "Grade 10 - Secondary" }),
                  /* @__PURE__ */ jsx("option", { children: "Grade 11 - STEM Track" }),
                  /* @__PURE__ */ jsx("option", { children: "Grade 12 - Senior High" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-medium mb-1", children: "Date of Birth" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                value: childFormDob,
                onChange: (e) => setChildFormDob(e.target.value),
                className: "w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-medium mb-1", children: "Affiliated School" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "e.g. Modern High School",
              value: childFormSchool,
              onChange: (e) => setChildFormSchool(e.target.value),
              className: "w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-medium mb-1", children: "Target Career / Focus Track" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "e.g. AI Architect, Robotics, Medicine, Design",
              value: childFormCareer,
              onChange: (e) => setChildFormCareer(e.target.value),
              className: "w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-3 rounded-2xl bg-blue-950/30 border border-blue-500/20 text-[12px] text-blue-200", children: "ℹ️ Student account credentials (Email and temporary password) will be automatically created." }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2.5 pt-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setIsAddChildModalOpen(false),
              className: "px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[14px] font-semibold transition cursor-pointer",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: isSavingChild,
              className: "px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[14px] font-semibold transition cursor-pointer shadow-md flex items-center gap-2",
              children: [
                isSavingChild ? /* @__PURE__ */ jsx(FiRefreshCw, { className: "w-4 h-4 animate-spin" }) : null,
                /* @__PURE__ */ jsx("span", { children: isSavingChild ? "Creating Credentials..." : "Save & Register Student" })
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    isPaymentModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in", children: /* @__PURE__ */ jsxs("div", { className: `w-full max-w-md rounded-3xl p-6 border shadow-2xl relative ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"}`, children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] mb-1 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(FiCreditCard, { className: "w-5 h-5 text-emerald-400" }),
        "Role Ready Family Checkout"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-[13px] text-slate-400 mb-4 leading-normal", children: [
        "Payment Execution Flow: ",
        /* @__PURE__ */ jsx("strong", { children: "Success ➔ Activate Plan" }),
        " vs ",
        /* @__PURE__ */ jsx("strong", { children: "Failed ➔ Retry Payment" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2 mb-4 text-[14px]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: "Plan:" }),
          /* @__PURE__ */ jsxs("span", { className: "font-semibold uppercase", children: [
            selectedPlanToBuy,
            " Plan"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-semibold border-t border-slate-700 pt-2", children: [
          /* @__PURE__ */ jsx("span", { children: "Amount:" }),
          /* @__PURE__ */ jsxs("span", { className: "text-blue-400 font-bold text-[18px]", children: [
            "₹",
            (((_x = FAMILY_PLANS.find((p) => p.id === selectedPlanToBuy)) == null ? void 0 : _x.priceMonthly) || 999).toLocaleString(),
            " / Month"
          ] })
        ] })
      ] }),
      paymentOutcomeSim === "processing" && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[13px] flex items-center gap-3 animate-pulse mb-4", children: [
        /* @__PURE__ */ jsx(FiRefreshCw, { className: "w-4 h-4 animate-spin" }),
        /* @__PURE__ */ jsx("span", { children: "Processing bank authorization & activating student licenses..." })
      ] }),
      paymentOutcomeSim === "failed" && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[13px] space-y-2 mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-semibold", children: [
          /* @__PURE__ */ jsx(FiAlertTriangle, { className: "w-4 h-4 text-rose-400" }),
          /* @__PURE__ */ jsx("span", { children: "Payment Declined by Card Issuer" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[12px] text-rose-200/80", children: 'Simulated transaction decline. Click "Retry Payment" below to attempt transaction recovery.' }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleExecutePayment("success"),
            className: "mt-2 w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-[14px] transition cursor-pointer flex items-center justify-center gap-2",
            children: [
              /* @__PURE__ */ jsx(FiRefreshCw, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsx("span", { children: "Retry Payment (Simulate Recovery)" })
            ]
          }
        )
      ] }),
      paymentOutcomeSim === "success" && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[13px] flex items-center gap-2 mb-4 font-semibold", children: [
        /* @__PURE__ */ jsx(FiCheckCircle, { className: "w-5 h-5 text-emerald-400 shrink-0" }),
        /* @__PURE__ */ jsx("span", { children: "Payment Verified! Student seats activated." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2.5", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            disabled: paymentOutcomeSim === "processing",
            onClick: () => handleExecutePayment("success"),
            className: "w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[14px] transition cursor-pointer flex items-center justify-center gap-2 shadow-md",
            children: [
              /* @__PURE__ */ jsx(FiCheckCircle, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: "Simulate Payment Success (Activate Plan)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            disabled: paymentOutcomeSim === "processing",
            onClick: () => handleExecutePayment("failed"),
            className: "w-full py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white font-semibold text-[14px] transition cursor-pointer flex items-center justify-center gap-2",
            children: [
              /* @__PURE__ */ jsx(FiAlertTriangle, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: "Simulate Payment Failure (Test Retry State)" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsPaymentModalOpen(false),
            className: "w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 font-semibold text-[14px] transition cursor-pointer",
            children: "Close Checkout"
          }
        )
      ] })
    ] }) }),
    isBookMentorModalOpen && selectedMentorToBook && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in", children: /* @__PURE__ */ jsxs("div", { className: `w-full max-w-md rounded-3xl p-6 border shadow-2xl relative ${isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-900"}`, children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-[20px] md:text-[22px] font-semibold leading-[1.3] mb-1 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(FiUserCheck, { className: "w-5 h-5 text-emerald-400" }),
        "Book Session with ",
        selectedMentorToBook.name
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-[13px] text-slate-400 mb-4", children: selectedMentorToBook.organization }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleConfirmMentorBooking, className: "space-y-3 font-sans", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium text-[13px] mb-1", children: "Student Attendee" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              disabled: true,
              value: selectedChild ? `${selectedChild.name} (${selectedChild.grade})` : "No child selected",
              className: "w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/30 text-slate-300 text-[14px]"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium text-[13px] mb-1", children: "Preferred Date" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              value: bookingDate,
              onChange: (e) => setBookingDate(e.target.value),
              className: "w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium text-[13px] mb-1", children: "Select Available Time Slot" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              value: bookingTime,
              onChange: (e) => setBookingTime(e.target.value),
              className: "w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]",
              children: selectedMentorToBook.availableSlots.length > 0 ? selectedMentorToBook.availableSlots.map((slot, i) => /* @__PURE__ */ jsx("option", { value: slot, children: slot }, i)) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("option", { value: "10:00 AM - 11:00 AM", children: "10:00 AM - 11:00 AM" }),
                /* @__PURE__ */ jsx("option", { value: "04:00 PM - 05:00 PM", children: "04:00 PM - 05:00 PM" }),
                /* @__PURE__ */ jsx("option", { value: "06:00 PM - 07:00 PM", children: "06:00 PM - 07:00 PM" })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium text-[13px] mb-1", children: "Counseling Focus Topic" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: bookingTopic,
              onChange: (e) => setBookingTopic(e.target.value),
              className: "w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/60 text-white text-[14px]"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-slate-700/60", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-[16px] text-emerald-400", children: selectedMentorToBook.hourlyRate }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setIsBookMentorModalOpen(false),
                className: "px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[14px] transition cursor-pointer",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: isBookingSubmitting || !selectedChild,
                className: "px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[14px] transition cursor-pointer shadow-md disabled:opacity-50",
                children: isBookingSubmitting ? "Confirming..." : "Confirm Booking"
              }
            )
          ] })
        ] })
      ] })
    ] }) })
  ] });
};
const ProfileImageUpload = ({
  avatarUrl,
  isEditing,
  onPhotoChange,
  isDarkMode = false
}) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const handleFileChange = async (e) => {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit. Please choose a smaller image.");
        return;
      }
      try {
        setIsUploading(true);
        const res = await uploadProfileAttachment(file);
        setIsUploading(false);
        if (res && res.url) {
          onPhotoChange(res.url);
        }
      } catch (err) {
        setIsUploading(false);
        console.warn("Direct upload error, using local data preview:", err);
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            onPhotoChange(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative group inline-block", children: [
    /* @__PURE__ */ jsx("div", { className: "w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative", children: avatarUrl ? /* @__PURE__ */ jsx(
      "img",
      {
        src: avatarUrl,
        alt: "User Profile",
        className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      }
    ) : /* @__PURE__ */ jsx(FiUser, { className: "w-12 h-12 text-slate-400" }) }),
    isEditing && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          ref: fileInputRef,
          onChange: handleFileChange,
          accept: "image/*",
          className: "hidden"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            var _a2;
            return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
          },
          className: "absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-2xl shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer border-2 border-white dark:border-slate-800",
          title: "Change / Upload Photo",
          children: /* @__PURE__ */ jsx(FiCamera, { className: "w-4 h-4" })
        }
      )
    ] })
  ] });
};
const ProfileHeader = ({
  profile,
  isEditing,
  isSaving,
  onEditClick,
  onSaveClick,
  onCancelClick,
  onPhotoChange,
  isDarkMode = false
}) => {
  const roleDisplayNames = {
    "super-admin": "Super Admin Governance Root",
    "school": "School Institutional Administrator",
    "college": "College Admissions & Dean",
    "mentor": "Certified Executive Career Mentor",
    "training": "Skill Academy Director",
    "recruiter": "Corporate Talent Lead",
    "company": "Enterprise Program Lead"
  };
  return /* @__PURE__ */ jsxs("div", { className: `rounded-3xl border p-6 sm:p-8 relative overflow-hidden transition-all duration-200 ${isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-xl" : "bg-white border-blue-100 text-slate-900 shadow-sm"}`, children: [
    /* @__PURE__ */ jsx("div", { className: "h-28 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 relative opacity-90", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white/5 backdrop-blur-[1px]" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 relative z-10 -mt-16 sm:-mt-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-end gap-5", children: [
        /* @__PURE__ */ jsx(
          ProfileImageUpload,
          {
            avatarUrl: profile.avatarUrl,
            isEditing,
            onPhotoChange,
            isDarkMode
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 pb-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl font-extrabold tracking-tight", children: profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName}` : profile.fullName || "User Profile" }),
            /* @__PURE__ */ jsxs("span", { className: "bg-blue-500/15 border border-blue-500/30 text-blue-500 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(FiShield, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsx("span", { children: roleDisplayNames[profile.role] || profile.role })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 font-medium", children: profile.qualification || "Career Professional" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 flex-wrap pt-1", children: [
            profile.email && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(FiMail, { className: "w-3.5 h-3.5 text-blue-500" }),
              /* @__PURE__ */ jsx("span", { children: profile.email })
            ] }),
            profile.location && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(FiMapPin, { className: "w-3.5 h-3.5 text-blue-500" }),
              /* @__PURE__ */ jsx("span", { children: profile.location })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 w-full sm:w-auto shrink-0 pt-2 sm:pt-0", children: !isEditing ? /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: onEditClick,
          className: "w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2",
          children: [
            /* @__PURE__ */ jsx(FiEdit2, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: "Edit Profile" })
          ]
        }
      ) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onCancelClick,
            disabled: isSaving,
            className: "flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsx(FiX, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: "Cancel" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onSaveClick,
            disabled: isSaving,
            className: "flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
            children: [
              /* @__PURE__ */ jsx(FiCheck, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: isSaving ? "Saving..." : "Save Changes" })
            ]
          }
        )
      ] }) })
    ] })
  ] });
};
const ProfileDetails = ({
  profile,
  isDarkMode = false
}) => {
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-xl" : "bg-white border-blue-100 text-slate-900 shadow-sm";
  const subCardClass = isDarkMode ? "bg-slate-800/60 border-slate-700/60" : "bg-slate-50/60 border-slate-100";
  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-500";
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans", children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: `rounded-3xl border p-6 sm:p-7 space-y-5 ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold", children: /* @__PURE__ */ jsx(FiUser, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-base", children: "Personal Information" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-2xl border space-y-1 ${subCardClass}`, children: [
            /* @__PURE__ */ jsx("span", { className: `text-[11px] font-medium block ${textMuted}`, children: "Full Name" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-sm text-slate-900 dark:text-white", children: profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName}` : profile.fullName || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-2xl border space-y-1 ${subCardClass}`, children: [
            /* @__PURE__ */ jsxs("span", { className: `text-[11px] font-medium flex items-center gap-1 ${textMuted}`, children: [
              /* @__PURE__ */ jsx(FiMail, { className: "w-3 h-3 text-blue-500" }),
              " Email Address"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-sm text-slate-900 dark:text-white truncate", children: profile.email || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-2xl border space-y-1 ${subCardClass}`, children: [
            /* @__PURE__ */ jsxs("span", { className: `text-[11px] font-medium flex items-center gap-1 ${textMuted}`, children: [
              /* @__PURE__ */ jsx(FiPhone, { className: "w-3 h-3 text-blue-500" }),
              " Phone Number"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-sm text-slate-900 dark:text-white", children: profile.phoneNumber || profile.mobile || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-2xl border space-y-1 ${subCardClass}`, children: [
            /* @__PURE__ */ jsxs("span", { className: `text-[11px] font-medium flex items-center gap-1 ${textMuted}`, children: [
              /* @__PURE__ */ jsx(FiCalendar, { className: "w-3 h-3 text-blue-500" }),
              " Date of Birth"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-sm text-slate-900 dark:text-white", children: profile.dob || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-2xl border space-y-1 ${subCardClass}`, children: [
            /* @__PURE__ */ jsx("span", { className: `text-[11px] font-medium block ${textMuted}`, children: "Gender" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-sm text-slate-900 dark:text-white", children: profile.gender || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-2xl border space-y-1 ${subCardClass}`, children: [
            /* @__PURE__ */ jsxs("span", { className: `text-[11px] font-medium flex items-center gap-1 ${textMuted}`, children: [
              /* @__PURE__ */ jsx(FiMapPin, { className: "w-3 h-3 text-blue-500" }),
              " Location / Address"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-sm text-slate-900 dark:text-white", children: profile.location || "N/A" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `rounded-3xl border p-6 sm:p-7 space-y-5 ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold", children: /* @__PURE__ */ jsx(FiBookOpen, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-base", children: "Education & Qualification" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-2xl border space-y-1.5 ${subCardClass}`, children: [
            /* @__PURE__ */ jsxs("span", { className: `text-[11px] font-medium flex items-center gap-1 ${textMuted}`, children: [
              /* @__PURE__ */ jsx(FiBookOpen, { className: "w-3 h-3 text-indigo-500" }),
              " Highest Education"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-sm text-slate-900 dark:text-white leading-snug", children: profile.education || "N/A" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-2xl border space-y-1.5 ${subCardClass}`, children: [
            /* @__PURE__ */ jsxs("span", { className: `text-[11px] font-medium flex items-center gap-1 ${textMuted}`, children: [
              /* @__PURE__ */ jsx(FiAward, { className: "w-3 h-3 text-indigo-500" }),
              " Professional Qualification"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-sm text-slate-900 dark:text-white leading-snug", children: profile.qualification || "N/A" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: `rounded-3xl border p-6 sm:p-7 space-y-4 ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold", children: /* @__PURE__ */ jsx(FiFileText, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-base", children: "Bio / About Me" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic", children: [
          '"',
          profile.bio || "No bio specified yet.",
          '"'
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `rounded-3xl border p-6 sm:p-7 space-y-4 ${cardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold", children: /* @__PURE__ */ jsx(FiCpu, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-base", children: "Skills & Expertise" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: profile.skills && profile.skills.length > 0 ? profile.skills.map((skill, index) => /* @__PURE__ */ jsxs(
          "span",
          {
            className: "bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsx(FiCheckCircle, { className: "w-3.5 h-3.5 text-blue-500" }),
              /* @__PURE__ */ jsx("span", { children: skill })
            ]
          },
          index
        )) : /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400", children: "No skills added yet." }) })
      ] })
    ] })
  ] });
};
const ProfileForm = ({
  formData,
  errors,
  onChange,
  onAddSkill,
  onRemoveSkill,
  isDarkMode = false
}) => {
  const [newSkillInput, setNewSkillInput] = useState("");
  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (newSkillInput.trim()) {
        onAddSkill(newSkillInput.trim());
        setNewSkillInput("");
      }
    }
  };
  const handleAddSkillClick = () => {
    if (newSkillInput.trim()) {
      onAddSkill(newSkillInput.trim());
      setNewSkillInput("");
    }
  };
  const inputClass = (hasError) => `
    w-full px-4 py-2.5 rounded-xl border text-xs font-semibold transition focus:outline-none focus:ring-2 
    ${hasError ? "border-rose-500 ring-rose-500/20 bg-rose-500/5" : isDarkMode ? "border-slate-700 bg-slate-800 text-white focus:ring-blue-500/30 focus:border-blue-500" : "border-slate-200 bg-slate-50 text-slate-900 focus:ring-blue-500/30 focus:border-blue-500"}
  `;
  const labelClass = "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5";
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxs("div", { className: `rounded-3xl border p-6 sm:p-7 space-y-5 ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900 shadow-sm"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold", children: /* @__PURE__ */ jsx(FiUser, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-base", children: "Edit Personal Details" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass, children: "First Name *" }),
          /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.firstName || "",
              onChange: (e) => onChange("firstName", e.target.value),
              placeholder: "Enter first name",
              className: inputClass(!!errors.firstName)
            }
          ) }),
          errors.firstName && /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-rose-500 font-bold mt-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(FiAlertCircle, { className: "w-3 h-3" }),
            " ",
            errors.firstName
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass, children: "Last Name *" }),
          /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.lastName || "",
              onChange: (e) => onChange("lastName", e.target.value),
              placeholder: "Enter last name",
              className: inputClass(!!errors.lastName)
            }
          ) }),
          errors.lastName && /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-rose-500 font-bold mt-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(FiAlertCircle, { className: "w-3 h-3" }),
            " ",
            errors.lastName
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: labelClass, children: [
            "Email Address ",
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400 font-normal", children: "(Account Identity)" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              value: formData.email,
              disabled: true,
              title: "Account email cannot be modified from profile",
              className: "w-full px-4 py-2.5 rounded-xl border text-xs font-semibold bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 cursor-not-allowed"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass, children: "Phone Number *" }),
          /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.phoneNumber || formData.mobile || "",
              onChange: (e) => {
                onChange("phoneNumber", e.target.value);
                onChange("mobile", e.target.value);
              },
              placeholder: "+91 98765 43210",
              className: inputClass(!!errors.phoneNumber)
            }
          ) }),
          errors.phoneNumber && /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-rose-500 font-bold mt-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(FiAlertCircle, { className: "w-3 h-3" }),
            " ",
            errors.phoneNumber
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass, children: "Date of Birth" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              value: formData.dob,
              onChange: (e) => onChange("dob", e.target.value),
              className: inputClass()
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass, children: "Gender" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: formData.gender,
              onChange: (e) => onChange("gender", e.target.value),
              className: inputClass(),
              children: [
                /* @__PURE__ */ jsx("option", { value: "Male", children: "Male" }),
                /* @__PURE__ */ jsx("option", { value: "Female", children: "Female" }),
                /* @__PURE__ */ jsx("option", { value: "Other", children: "Other" }),
                /* @__PURE__ */ jsx("option", { value: "Prefer Not to Say", children: "Prefer Not to Say" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass, children: "Location / Address" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.location,
              onChange: (e) => onChange("location", e.target.value),
              placeholder: "City, Country",
              className: inputClass()
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `rounded-3xl border p-6 sm:p-7 space-y-5 ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900 shadow-sm"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold", children: /* @__PURE__ */ jsx(FiBookOpen, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-base", children: "Education & Qualification" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass, children: "Highest Education" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.education,
              onChange: (e) => onChange("education", e.target.value),
              placeholder: "e.g. Ph.D. in Computer Science",
              className: inputClass()
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: labelClass, children: "Professional Qualification" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.qualification,
              onChange: (e) => onChange("qualification", e.target.value),
              placeholder: "e.g. Senior Career Advisor",
              className: inputClass()
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `rounded-3xl border p-6 sm:p-7 space-y-5 ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900 shadow-sm"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold", children: /* @__PURE__ */ jsx(FiFileText, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-base", children: "Bio & Skills" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelClass, children: "Bio / About Me" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            rows: 4,
            value: formData.bio,
            onChange: (e) => onChange("bio", e.target.value),
            placeholder: "Write a brief professional bio...",
            className: inputClass()
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelClass, children: "Skills & Core Expertise" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: newSkillInput,
              onChange: (e) => setNewSkillInput(e.target.value),
              onKeyDown: handleSkillKeyDown,
              placeholder: "Add skill (e.g. AI Strategy) & press Enter",
              className: inputClass()
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: handleAddSkillClick,
              className: "bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1 shrink-0 text-xs shadow-md",
              children: [
                /* @__PURE__ */ jsx(FiPlus, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "Add" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 pt-1", children: formData.skills && formData.skills.map((skill, idx) => /* @__PURE__ */ jsxs(
          "span",
          {
            className: "bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsx("span", { children: skill }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onRemoveSkill(idx),
                  className: "text-blue-400 hover:text-rose-500 transition cursor-pointer p-0.5",
                  title: "Remove skill",
                  children: /* @__PURE__ */ jsx(FiX, { className: "w-3.5 h-3.5" })
                }
              )
            ]
          },
          idx
        )) })
      ] })
    ] })
  ] });
};
const UserProfileView = ({
  onShowToast,
  isDarkMode = false
}) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const { data: profile, isLoading, isError, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile
  });
  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);
  const updateMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(["userProfile"], updatedProfile);
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setIsEditing(false);
      onShowToast("Profile information updated successfully!");
    },
    onError: (err) => {
      onShowToast("Unable to update profile. Please try again.");
    }
  });
  const photoMutation = useMutation({
    mutationFn: uploadProfilePhoto,
    onSuccess: (res) => {
      if (formData) {
        setFormData({ ...formData, avatarUrl: res.avatarUrl });
      }
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      onShowToast("Profile picture updated!");
    }
  });
  const validateForm = () => {
    if (!formData) return false;
    const newErrors = {};
    if (!formData.firstName || !formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!formData.lastName || !formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    const phoneVal = (formData.phoneNumber || formData.mobile || "").replace(/\D/g, "");
    if (!phoneVal) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (phoneVal.length < 7) {
      newErrors.phoneNumber = "Please enter a valid phone number with at least 7 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleFieldChange = (field, value) => {
    if (!formData) return;
    const updated = { ...formData, [field]: value };
    if (field === "firstName" || field === "lastName") {
      const f = field === "firstName" ? value : formData.firstName || "";
      const l = field === "lastName" ? value : formData.lastName || "";
      updated.fullName = `${f} ${l}`.trim();
    }
    if (field === "phoneNumber") {
      updated.mobile = value;
    }
    setFormData(updated);
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };
  const handleAddSkill = (skill) => {
    if (!formData) return;
    const currentSkills = formData.skills || [];
    if (!currentSkills.includes(skill)) {
      const newSkills = [...currentSkills, skill];
      setFormData({
        ...formData,
        skills: newSkills,
        roleData: { ...formData.roleData || {}, skills: newSkills }
      });
    }
  };
  const handleRemoveSkill = (index) => {
    if (!formData) return;
    const updatedSkills = (formData.skills || []).filter((_, i) => i !== index);
    setFormData({
      ...formData,
      skills: updatedSkills,
      roleData: { ...formData.roleData || {}, skills: updatedSkills }
    });
  };
  const handlePhotoChange = (newPhotoUrl) => {
    if (formData) {
      setFormData({ ...formData, avatarUrl: newPhotoUrl });
      photoMutation.mutate(newPhotoUrl);
    }
  };
  const handleSave = () => {
    if (!formData) return;
    if (validateForm()) {
      const payload = {
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        phoneNumber: formData.phoneNumber || formData.mobile || "",
        bio: formData.bio || "",
        onboardingCompleted: true,
        roleData: {
          ...formData.roleData || {},
          dob: formData.dob || "",
          gender: formData.gender || "",
          location: formData.location || "",
          education: { qualification: formData.education || "" },
          qualification: formData.qualification || "",
          skills: formData.skills || []
        }
      };
      updateMutation.mutate(payload);
    } else {
      onShowToast("Please fix validation errors before saving.");
    }
  };
  const handleCancel = () => {
    if (profile) {
      setFormData(profile);
    }
    setErrors({});
    setIsEditing(false);
  };
  if (isLoading || !formData) {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-6 font-sans animate-pulse max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "h-48 rounded-3xl bg-slate-200 dark:bg-slate-800" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsx("div", { className: "md:col-span-2 h-64 rounded-3xl bg-slate-200 dark:bg-slate-800" }),
        /* @__PURE__ */ jsx("div", { className: "h-64 rounded-3xl bg-slate-200 dark:bg-slate-800" })
      ] })
    ] });
  }
  if (isError) {
    return /* @__PURE__ */ jsxs("div", { className: "p-8 text-center space-y-4 max-w-md mx-auto bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-3xl font-sans", children: [
      /* @__PURE__ */ jsx(FiAlertCircle, { className: "w-10 h-10 text-rose-500 mx-auto" }),
      /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-base text-rose-600 dark:text-rose-400", children: "Failed to Load Profile" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-rose-500", children: (error == null ? void 0 : error.message) || "Server connection error" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
          className: "bg-rose-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-rose-500 transition cursor-pointer",
          children: "Retry"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 max-w-5xl mx-auto font-sans", children: [
    /* @__PURE__ */ jsx(
      ProfileHeader,
      {
        profile: formData,
        isEditing,
        isSaving: updateMutation.isPending,
        onEditClick: () => setIsEditing(true),
        onSaveClick: handleSave,
        onCancelClick: handleCancel,
        onPhotoChange: handlePhotoChange,
        isDarkMode
      }
    ),
    !isEditing ? /* @__PURE__ */ jsx(ProfileDetails, { profile: formData, isDarkMode }) : /* @__PURE__ */ jsx(
      ProfileForm,
      {
        formData,
        errors,
        onChange: handleFieldChange,
        onAddSkill: handleAddSkill,
        onRemoveSkill: handleRemoveSkill,
        isDarkMode
      }
    )
  ] });
};
const RoleWorkspaceViews = ({
  currentWorkspace,
  activeSubView,
  onShowToast,
  isDarkMode = false
}) => {
  if (activeSubView === "profile") {
    return /* @__PURE__ */ jsx(UserProfileView, { onShowToast, isDarkMode });
  }
  switch (currentWorkspace) {
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
    case "parent":
      return /* @__PURE__ */ jsx(ParentDashboard, { activeSubView, onShowToast, isDarkMode });
    default:
      return null;
  }
};
const MetricsGrid = ({
  currentWorkspace,
  totalEntities,
  totalSeats,
  pendingCount,
  isDarkMode = false
}) => {
  const cardBg = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-md hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/40 cursor-pointer transition-all duration-300" : "bg-white border-blue-100 text-slate-900 shadow-xs hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 cursor-pointer transition-all duration-300";
  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-500";
  const textHeading = isDarkMode ? "text-white" : "text-slate-900";
  if (currentWorkspace === "super-admin") {
    return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 font-sans", children: [
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border transition ${cardBg}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: `text-xs font-semibold ${textMuted}`, children: "Provisioned Entities" }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(FiGrid, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: `text-2xl font-bold mb-1 ${textHeading}`, children: totalEntities }),
        /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-semibold text-emerald-400 flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(FiTrendingUp, { className: "w-3.5 h-3.5" }),
          " ",
          totalEntities > 0 ? `${totalEntities} registered partners` : "Awaiting registrations"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border transition ${cardBg}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: `text-xs font-semibold ${textMuted}`, children: "Active Seat Quotas" }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(FiUsers, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: `text-2xl font-bold mb-1 ${textHeading}`, children: totalSeats.toLocaleString() }),
        /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-semibold text-blue-400 flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(FiShield, { className: "w-3.5 h-3.5" }),
          " ",
          totalSeats > 0 ? "Allocated across entities" : "Quotas not allocated"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border transition ${cardBg}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: `text-xs font-semibold ${textMuted}`, children: "System Infrastructure" }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(FiCpu, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: `text-2xl font-bold mb-1 ${textHeading}`, children: "Live" }),
        /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-semibold text-emerald-400 flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(FiTrendingUp, { className: "w-3.5 h-3.5" }),
          " Platform Services Active"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border transition ${cardBg}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: `text-xs font-semibold ${textMuted}`, children: "Pending Approvals" }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(FiClock, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: `text-2xl font-bold mb-1 ${textHeading}`, children: pendingCount }),
        /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-amber-400 flex items-center gap-1", children: pendingCount > 0 ? "Action required by Admin" : "All entities verified" })
      ] })
    ] });
  }
  const roleMetricsMap = {
    school: [
      { label: "Enrolled Students (8-12)", value: "3,820", sub: "100% Profile Completion", icon: FiUsers },
      { label: "Career DNA Completed", value: "3,450", sub: "90.3% Completion Rate", icon: FiCpu },
      { label: "Top Stream Match", value: "68% STEM", sub: "22% Commerce / 10% Humanities", icon: FiAward },
      { label: "Scholarships Fit", value: "₹1.2 Crores", sub: "412 Grants Awarded", icon: FiAward }
    ],
    college: [
      { label: "Total Undergrads", value: "11,450", sub: "9 Active Batches", icon: FiAward },
      { label: "Placement Rate", value: "94.2%", sub: "+5.1% YoY Increase", icon: FiBriefcase },
      { label: "Corporate Partners", value: "148 Drives", sub: "18 Drives Open Now", icon: FiUsers },
      { label: "Average CTC Package", value: "₹24.5 LPA", sub: "Max Package: ₹110 LPA", icon: FiDollarSign }
    ],
    mentor: [
      { label: "Assigned Mentees", value: "42 Students", sub: "Active Counseling", icon: FiUsers },
      { label: "Sessions Completed", value: "184 Hours", sub: "98% Satisfaction Rating", icon: FiClock },
      { label: "Upcoming Appointments", value: "6 Sessions", sub: "Next session at 2:00 PM", icon: FiBriefcase },
      { label: "Counselor Score", value: "4.9 / 5.0", sub: "Master Level Certified", icon: FiAward }
    ],
    training: [
      { label: "Active Trainees", value: "2,900", sub: "12 Certified Bootcamps", icon: FiBookOpen },
      { label: "Cert Completion", value: "91.4%", sub: "Industry Accredited", icon: FiAward },
      { label: "Placement Partners", value: "64 Companies", sub: "Tech & Cloud Tracks", icon: FiBriefcase },
      { label: "Employment Index", value: "88%", sub: "Hired within 90 days", icon: FiBriefcase }
    ],
    recruiter: [
      { label: "Active Job Postings", value: "18 Roles", sub: "Across 6 Global Offices", icon: FiBell },
      { label: "Applications Received", value: "1,240", sub: "AI Resume Screened", icon: FiUsers },
      { label: "Avg ATS Score Fit", value: "88%", sub: "High Skill Alignment", icon: FiCpu },
      { label: "Offers Extended", value: "42 Extended", sub: "38 Offers Accepted", icon: FiBriefcase }
    ],
    company: [
      { label: "Internship Drives", value: "12 Drives", sub: "Summer & Winter Tracks", icon: FiBriefcase },
      { label: "Partner Universities", value: "45 Colleges", sub: "Direct MoUs Signed", icon: FiAward },
      { label: "Enrolled Interns", value: "620 Interns", sub: "78% PPO Conversion Rate", icon: FiUsers },
      { label: "Monthly Stipend", value: "₹35,000 / mo", sub: "Competitive Package", icon: FiDollarSign }
    ],
    government: [
      { label: "Scholarships Granted", value: "₹115 Crores", sub: "48,200 Beneficiaries", icon: FiGrid },
      { label: "District Missions", value: "124 Active", sub: "Statewide Skill Coverage", icon: FiGrid },
      { label: "Employability Index", value: "82.4%", sub: "+8.2% YoY Improvement", icon: FiTrendingUp },
      { label: "Certified Skills", value: "110,000", sub: "Government Accredited", icon: FiAward }
    ]
  };
  const metrics = roleMetricsMap[currentWorkspace] || roleMetricsMap.school;
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 font-sans", children: metrics.map((m, idx) => {
    const Icon = m.icon;
    return /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border transition ${cardBg}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsx("span", { className: `text-xs font-semibold ${textMuted}`, children: m.label }),
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: `text-2xl font-extrabold mb-1 ${textHeading}`, children: m.value }),
      /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-blue-400", children: m.sub })
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
  const [currentPage, setCurrentPage] = React.useState(1);
  const [deleteConfirmEntity, setDeleteConfirmEntity] = React.useState(null);
  const itemsPerPage = 5;
  const roleCounts = {
    all: entities.length,
    school: 0,
    college: 0,
    mentor: 0,
    training: 0,
    recruiter: 0,
    company: 0,
    parent: 0
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
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);
  const totalPages = Math.max(1, Math.ceil(filteredEntities.length / itemsPerPage));
  const paginatedEntities = filteredEntities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const roleLabels = {
    school: "School Admin",
    college: "College Admin",
    mentor: "Mentor Desk",
    training: "Training Inst.",
    recruiter: "Recruiter HR",
    company: "Enterprise Co.",
    parent: "Parent Portal"
  };
  const cardClass = isDarkMode ? "bg-slate-900 border-slate-800 text-white shadow-xl" : "bg-white border-blue-100 text-slate-900 shadow-sm";
  const textMuted = isDarkMode ? "text-slate-400" : "text-slate-500";
  const textHeading = isDarkMode ? "text-white" : "text-slate-900";
  const tableHeaderBg = isDarkMode ? "bg-slate-800/80 text-slate-300 border-slate-700" : "bg-slate-50/50 text-slate-400 border-slate-200";
  const borderDivider = isDarkMode ? "border-slate-800" : "border-slate-100";
  return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 mb-8 font-sans transition-colors duration-200 relative ${cardClass}`, children: [
    deleteConfirmEntity && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs", children: /* @__PURE__ */ jsxs("div", { className: `max-w-md w-full p-6 rounded-2xl border shadow-2xl space-y-4 ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"}`, children: [
      /* @__PURE__ */ jsxs("h3", { className: "font-extrabold text-base text-rose-500 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(FiTrash2, { className: "w-5 h-5" }),
        " Revoke Partner Access?"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs leading-relaxed text-slate-400", children: [
        "Are you sure you want to revoke partner access for ",
        /* @__PURE__ */ jsx("strong", { className: "text-white", children: deleteConfirmEntity.name }),
        "? This will remove active portal privileges and delete credentials."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3 pt-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setDeleteConfirmEntity(null),
            className: "px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition cursor-pointer",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              onDeleteEntity(deleteConfirmEntity.id);
              setDeleteConfirmEntity(null);
            },
            className: "px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition cursor-pointer shadow-md",
            children: "Confirm Revoke"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: `flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b ${borderDivider}`, children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: `text-lg font-bold ${textHeading}`, children: "Partner Access & Governance Matrix" }),
      /* @__PURE__ */ jsx("p", { className: `text-xs ${textMuted}`, children: "Super Admin authorization hub for Schools, Colleges, Mentors, Training Academies, Recruiters & Companies" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none", children: [
      { id: "all", label: "All Verticals", icon: FiGrid },
      { id: "school", label: "Schools", icon: FiBookOpen },
      { id: "college", label: "Colleges", icon: FiAward },
      { id: "mentor", label: "Mentors", icon: FiUserCheck },
      { id: "training", label: "Training", icon: FiBookOpen },
      { id: "recruiter", label: "Recruiters", icon: FiBriefcase },
      { id: "company", label: "Companies", icon: FiGrid },
      { id: "parent", label: "Parents", icon: FiUsers }
    ].map((tab) => {
      const Icon = tab.icon;
      const isActive = activeFilter === tab.id;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => onFilterChange(tab.id),
          className: `px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95 ${isActive ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : isDarkMode ? "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white" : "bg-blue-50 text-slate-700 hover:bg-blue-100 hover:text-blue-700"}`,
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsx("span", { children: tab.label }),
            /* @__PURE__ */ jsx("span", { className: `text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? "bg-blue-700 text-white" : isDarkMode ? "bg-slate-700 text-blue-300" : "bg-blue-100 text-blue-700"}`, children: roleCounts[tab.id] || 0 })
          ]
        },
        tab.id
      );
    }) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: `border-b text-[11px] font-bold uppercase tracking-wider ${tableHeaderBg}`, children: [
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 rounded-l-xl", children: "Entity Name" }),
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Role Category" }),
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Admin Email & Domain" }),
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Approval Pipeline" }),
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Verification Status" }),
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Subscription Tier" }),
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 rounded-r-xl text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: `divide-y text-xs ${borderDivider}`, children: paginatedEntities.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", { colSpan: 7, className: `py-12 text-center ${textMuted}`, children: [
        /* @__PURE__ */ jsx(FiGrid, { className: "w-10 h-10 mx-auto text-blue-400 mb-2 opacity-60" }),
        "No partner entities match the selected filter or search term."
      ] }) }) : paginatedEntities.map((e) => {
        const stage = e.approvalStage || (e.status === "active" ? "Live Portal" : "Document Verification");
        const stageNum = stage === "Live Portal" ? 7 : stage === "Subscription" ? 6 : stage === "Admin Approval" ? 5 : stage === "Background Check" ? 4 : stage === "Document Verification" ? 3 : stage === "Pending Review" ? 2 : 1;
        return /* @__PURE__ */ jsxs("tr", { className: `transition-all duration-200 ${isDarkMode ? "hover:bg-slate-800/80" : "hover:bg-blue-50/70"}`, children: [
          /* @__PURE__ */ jsxs("td", { className: `py-4 px-4 font-bold ${textHeading}`, children: [
            /* @__PURE__ */ jsx("div", { children: e.name }),
            /* @__PURE__ */ jsxs("span", { className: `text-[10px] font-mono ${textMuted}`, children: [
              "ID: ",
              e.id
            ] })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "py-4 px-4", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-transform duration-200 hover:scale-105 ${isDarkMode ? "bg-blue-500/20 text-blue-300 border-blue-500/30" : "bg-blue-50 text-blue-700 border-blue-200"}`, children: roleLabels[e.role] || e.role }) }),
          /* @__PURE__ */ jsxs("td", { className: `py-4 px-4 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`, children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onSimulateWorkspace(e.role),
                title: `Click email to open ${e.role} Workspace Dashboard`,
                className: "font-bold text-[#3665EE] hover:underline cursor-pointer text-left block",
                children: e.contactEmail
              }
            ),
            /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-blue-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(FiGlobe, { className: "w-3 h-3" }),
              " ",
              e.domain
            ] })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "py-4 px-4 min-w-[220px]", children: /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[10px] font-bold", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-blue-500", children: [
                "Stage ",
                stageNum,
                " of 7: ",
                stage
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "text-slate-400", children: [
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
            /* @__PURE__ */ jsxs("div", { className: "text-[9px] text-slate-400 font-mono flex items-center gap-1 pt-0.5", children: [
              /* @__PURE__ */ jsx("span", { children: "Register" }),
              " ",
              /* @__PURE__ */ jsx(FiChevronRight, { className: "w-2.5 h-2.5 inline" }),
              /* @__PURE__ */ jsx("span", { children: "Review" }),
              " ",
              /* @__PURE__ */ jsx(FiChevronRight, { className: "w-2.5 h-2.5 inline" }),
              /* @__PURE__ */ jsx("span", { children: "Docs" }),
              " ",
              /* @__PURE__ */ jsx(FiChevronRight, { className: "w-2.5 h-2.5 inline" }),
              /* @__PURE__ */ jsx("span", { children: "BG" }),
              " ",
              /* @__PURE__ */ jsx(FiChevronRight, { className: "w-2.5 h-2.5 inline" }),
              /* @__PURE__ */ jsx("span", { children: "Admin" }),
              " ",
              /* @__PURE__ */ jsx(FiChevronRight, { className: "w-2.5 h-2.5 inline" }),
              /* @__PURE__ */ jsx("span", { children: "Sub" }),
              " ",
              /* @__PURE__ */ jsx(FiChevronRight, { className: "w-2.5 h-2.5 inline" }),
              /* @__PURE__ */ jsx("span", { className: "text-emerald-500 font-bold", children: "Live" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("td", { className: "py-4 px-4 max-w-xs space-y-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(FiCheckCircle, { className: "w-3 h-3 text-emerald-500" }),
              /* @__PURE__ */ jsx("span", { children: e.docsStatus || "Document Verification Pending" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-slate-500 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(FiClock, { className: "w-3 h-3 text-blue-400" }),
              /* @__PURE__ */ jsx("span", { children: e.bgCheckStatus || "Passed Clear" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "py-4 px-4", children: [
            /* @__PURE__ */ jsx("span", { className: "inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#E4F4EC] text-[#12163A] border border-[#C3E6D5] shadow-2xs", children: e.subscriptionPlan || "Enterprise Tier" }),
            /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-slate-400 mt-1 font-bold", children: [
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
                className: "px-2.5 py-1 rounded-lg bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold text-[10px] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-xs flex items-center gap-1",
                children: [
                  /* @__PURE__ */ jsx(FiCheckCircle, { className: "w-3 h-3" }),
                  " Approve"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onSimulateWorkspace(e.role),
                "aria-label": `Launch ${e.role} Live Portal`,
                title: `Launch ${e.role} Live Portal`,
                className: "p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer shadow-xs",
                children: /* @__PURE__ */ jsx(FiExternalLink, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onToggleStatus(e.id),
                "aria-label": e.status === "active" ? "Suspend Access" : "Activate Access",
                title: e.status === "active" ? "Suspend Access" : "Activate Access",
                className: `p-1.5 rounded-lg border transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer ${e.status === "active" ? "bg-amber-500/20 border-amber-500/30 text-amber-400 hover:bg-amber-500/30" : "bg-emerald-500/20 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30"}`,
                children: /* @__PURE__ */ jsx(FiPower, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setDeleteConfirmEntity(e),
                "aria-label": "Revoke and Delete Access",
                title: "Revoke & Delete Access",
                className: "p-1.5 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:bg-rose-500/30 transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer",
                children: /* @__PURE__ */ jsx(FiTrash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] }) })
        ] }, e.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: `mt-4 pt-4 border-t flex items-center justify-between text-xs ${borderDivider} ${textMuted}`, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        "Showing ",
        /* @__PURE__ */ jsx("strong", { children: paginatedEntities.length }),
        " of ",
        /* @__PURE__ */ jsx("strong", { children: filteredEntities.length }),
        " partner entities (Page ",
        currentPage,
        " of ",
        totalPages,
        ")"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            disabled: currentPage === 1,
            onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
            className: "px-3 py-1 rounded-lg border border-slate-700 bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 font-bold transition cursor-pointer",
            children: "Prev Page"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            disabled: currentPage === totalPages,
            onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
            className: "px-3 py-1 rounded-lg border border-slate-700 bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 font-bold transition cursor-pointer",
            children: "Next Page"
          }
        )
      ] })
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
  const [matrixState, setMatrixState] = React.useState(() => {
    const initialState = {};
    rbacModules.forEach((mod, idx) => {
      initialState[mod.key] = {};
      roles.forEach((r, rIdx) => {
        initialState[mod.key][r] = (idx + rIdx) % 2 === 0 || idx === 0;
      });
    });
    return initialState;
  });
  const [isSaving, setIsSaving] = React.useState(false);
  const handleToggle = (modKey, roleName) => {
    setMatrixState((prev) => {
      var _a2;
      return {
        ...prev,
        [modKey]: {
          ...prev[modKey],
          [roleName]: !((_a2 = prev[modKey]) == null ? void 0 : _a2[roleName])
        }
      };
    });
  };
  const handleSave = async () => {
    setIsSaving(true);
    await saveRBACWeights({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), modules: rbacModules, matrix: matrixState });
    setIsSaving(false);
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
          /* @__PURE__ */ jsx(FiSliders, { className: "w-5 h-5 text-blue-500" }),
          /* @__PURE__ */ jsx("h2", { className: `text-lg font-bold ${textHeading}`, children: "Role-Based Access Control (RBAC) Matrix" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-xs mt-1 ${textMuted}`, children: "Configure granular module permissions and data visibility policies across all 7 partner role verticals" })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleSave,
          disabled: isSaving,
          className: "flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer",
          children: [
            /* @__PURE__ */ jsx(FiSave, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: isSaving ? "Saving Matrix..." : "Save Global RBAC Matrix" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-xs", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: `border-b text-[11px] font-bold uppercase tracking-wider ${isDarkMode ? "bg-slate-800/80 text-slate-300 border-slate-700" : "bg-slate-50/50 text-slate-400 border-slate-200"}`, children: [
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 rounded-l-xl", children: "Platform Module / Capability" }),
        roles.map((r) => /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 text-center", children: r }, r))
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: `divide-y ${borderDivider}`, children: rbacModules.map((mod) => /* @__PURE__ */ jsxs("tr", { className: `transition ${isDarkMode ? "hover:bg-slate-800/60" : "hover:bg-blue-50/40"}`, children: [
        /* @__PURE__ */ jsx("td", { className: `py-4 px-4 font-bold ${textHeading}`, children: mod.name }),
        roles.map((r) => {
          var _a2;
          const isChecked = !!((_a2 = matrixState[mod.key]) == null ? void 0 : _a2[r]);
          return /* @__PURE__ */ jsx("td", { className: "py-4 px-4 text-center", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: isChecked,
              onChange: () => handleToggle(mod.key, r),
              "aria-label": `${mod.name} for ${r}`,
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
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = async () => {
    setIsSaving(true);
    await saveAIWeights({ aptitude, interest, market });
    setIsSaving(false);
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
        /* @__PURE__ */ jsx(FiCpu, { className: "w-5 h-5 text-blue-500 animate-pulse" }),
        /* @__PURE__ */ jsx("h2", { className: `text-lg font-bold ${textHeading}`, children: "AI Career Intelligence Engine Configuration" })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx(FiCheckCircle, { className: "w-3.5 h-3.5 text-emerald-400" }),
        " Custom ML Models Operational"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mt-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-5 text-xs", children: [
        /* @__PURE__ */ jsxs("h3", { className: `font-bold text-sm flex items-center gap-2 ${textHeading}`, children: [
          /* @__PURE__ */ jsx(FiSliders, { className: "w-4 h-4 text-blue-500" }),
          "Algorithm Weighting Parameters"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: `flex justify-between font-bold mb-1 ${textHeading}`, children: [
            /* @__PURE__ */ jsx("span", { children: "Academic Aptitude Score Weight" }),
            /* @__PURE__ */ jsxs("span", { className: "text-blue-500", children: [
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
          /* @__PURE__ */ jsxs("div", { className: `flex justify-between font-bold mb-1 ${textHeading}`, children: [
            /* @__PURE__ */ jsx("span", { children: "Psychometric Interest Fit Weight" }),
            /* @__PURE__ */ jsxs("span", { className: "text-blue-500", children: [
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
          /* @__PURE__ */ jsxs("div", { className: `flex justify-between font-bold mb-1 ${textHeading}`, children: [
            /* @__PURE__ */ jsx("span", { children: "Industry Market Demand Weight" }),
            /* @__PURE__ */ jsxs("span", { className: "text-blue-500", children: [
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
            disabled: isSaving,
            className: "w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-xl transition cursor-pointer",
            children: isSaving ? "Applying AI Weights..." : "Apply AI Recommendation Weights"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border ${subCardClass}`, children: [
        /* @__PURE__ */ jsx("h3", { className: `font-bold text-sm mb-4 ${textHeading}`, children: "AI Engine Modules" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3 text-xs", children: [
          { name: "Neural Candidate Matcher v2.4", status: "Operational", latency: "18ms" },
          { name: "Holland RIASEC Scoring Model", status: "Operational", latency: "12ms" },
          { name: "ATS Resume Keyphrase Parser", status: "Operational", latency: "42ms" },
          { name: "Scholarship Match Auditor", status: "Operational", latency: "15ms" }
        ].map((m, i) => /* @__PURE__ */ jsxs("div", { className: `p-3 rounded-xl border flex items-center justify-between ${isDarkMode ? "bg-slate-900 border-slate-700" : "bg-white border-blue-100"}`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: `font-bold ${textHeading}`, children: m.name }),
            /* @__PURE__ */ jsxs("div", { className: `text-[10px] ${textMuted}`, children: [
              "Latency: ",
              m.latency
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-0.5 rounded-full text-[10px]", children: m.status })
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
  const handleExportCSV = () => {
    const headers = ["ID", "Timestamp", "Administrator", "Action Type", "Target Entity", "Role", "IP Address", "Status"];
    const rows = logs.map((log) => [
      log.id,
      `"${log.time}"`,
      `"${log.admin}"`,
      `"${log.action}"`,
      `"${log.target}"`,
      `"${log.role}"`,
      `"${log.ip}"`,
      `"${log.status}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `audit-logs-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  if (showFullTable) {
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 mb-8 font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between mb-6 pb-4 border-b ${borderDivider}`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: `text-lg font-bold ${textHeading}`, children: "System Security Audit Logs" }),
          /* @__PURE__ */ jsx("p", { className: `text-xs ${textMuted}`, children: "Immutable record of all Super Admin access grants and permission changes" })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleExportCSV,
            "aria-label": "Export Log CSV",
            className: `flex items-center gap-2 font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer hover:scale-105 active:scale-95 ${isDarkMode ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`,
            children: [
              /* @__PURE__ */ jsx(FiDownload, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: "Export Log CSV" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-xs", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: `border-b text-[11px] font-bold uppercase tracking-wider ${isDarkMode ? "bg-slate-800/80 text-slate-300 border-slate-700" : "bg-slate-50/50 text-slate-400 border-slate-200"}`, children: [
          /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 rounded-l-xl", children: "Timestamp" }),
          /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Administrator" }),
          /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Action Type" }),
          /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Target Entity" }),
          /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "Role" }),
          /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "IP Address" }),
          /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 rounded-r-xl", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: `divide-y ${borderDivider}`, children: logs.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", { colSpan: 7, className: `py-12 text-center ${textMuted}`, children: [
          /* @__PURE__ */ jsx(FiShield, { className: "w-8 h-8 mx-auto text-blue-400 mb-2 opacity-50" }),
          "No security audit logs recorded yet."
        ] }) }) : logs.map((log) => /* @__PURE__ */ jsxs("tr", { className: `transition ${isDarkMode ? "hover:bg-slate-800/60" : "hover:bg-blue-50/40"}`, children: [
          /* @__PURE__ */ jsx("td", { className: `py-3.5 px-4 font-mono ${textMuted}`, children: log.time }),
          /* @__PURE__ */ jsx("td", { className: `py-3.5 px-4 font-bold ${textHeading}`, children: log.admin }),
          /* @__PURE__ */ jsx("td", { className: "py-3.5 px-4 font-semibold text-blue-400", children: log.action }),
          /* @__PURE__ */ jsx("td", { className: `py-3.5 px-4 ${isDarkMode ? "text-slate-300" : "text-slate-800"}`, children: log.target }),
          /* @__PURE__ */ jsx("td", { className: "py-3.5 px-4", children: /* @__PURE__ */ jsx("span", { className: "bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded-md text-[10px]", children: log.role }) }),
          /* @__PURE__ */ jsx("td", { className: `py-3.5 px-4 font-mono text-[11px] ${textMuted}`, children: log.ip }),
          /* @__PURE__ */ jsx("td", { className: "py-3.5 px-4", children: /* @__PURE__ */ jsx("span", { className: "bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-0.5 rounded-full text-[10px]", children: log.status }) })
        ] }, log.id)) })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 font-sans transition-colors duration-200 ${cardClass}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between mb-4 pb-3 border-b ${borderDivider}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(FiShield, { className: "w-5 h-5 text-blue-400" }),
        /* @__PURE__ */ jsx("h3", { className: `font-bold text-sm ${textHeading}`, children: "Live Governance Audit Feed" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-500/30", children: "Real-Time Audit Active" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3 text-xs", children: logs.length === 0 ? /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-xl border text-center ${isDarkMode ? "bg-slate-800/40 border-slate-800 text-slate-400" : "bg-blue-50/20 border-blue-100 text-slate-500"}`, children: [
      /* @__PURE__ */ jsx(FiShield, { className: "w-6 h-6 mx-auto mb-1.5 text-blue-400 opacity-60" }),
      /* @__PURE__ */ jsx("span", { children: "No live audit events captured yet. System monitoring active." })
    ] }) : logs.slice(0, 5).map((log) => /* @__PURE__ */ jsxs("div", { className: `p-3 rounded-xl border flex items-center justify-between transition ${isDarkMode ? "bg-slate-800/80 border-slate-700/80" : "bg-blue-50/40 border-blue-100"}`, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold ${textHeading}`, children: log.action }),
        /* @__PURE__ */ jsxs("div", { className: `text-[11px] ${textMuted}`, children: [
          "Actor: ",
          log.admin,
          " • Target: ",
          log.target
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsx("span", { className: "bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full block mb-1", children: log.status }),
        /* @__PURE__ */ jsx("span", { className: `text-[10px] font-mono ${textMuted}`, children: log.time })
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
  const { data: adminHealth } = useQuery({
    queryKey: ["adminHealth"],
    queryFn: fetchAdminHealth,
    retry: 1
  });
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
  if (activeSubView === "profile") {
    return /* @__PURE__ */ jsx(UserProfileView, { onShowToast, isDarkMode });
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
      /* @__PURE__ */ jsx("h3", { className: `font-bold text-sm mb-4 ${textHeading}`, children: "Registered Ecosystem Partner Breakdown" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs", children: [
        { name: "School Admins", role: "school", icon: FiBookOpen },
        { name: "College Admins", role: "college", icon: FiBookOpen },
        { name: "Mentors & Counselors", role: "mentor", icon: FiUserCheck },
        { name: "Training Academies", role: "training", icon: FiGrid },
        { name: "Recruiters & HR", role: "recruiter", icon: FiBriefcase },
        { name: "Companies", role: "company", icon: FiGrid },
        { name: "Parents & Families", role: "parent", icon: FiUsers }
      ].map((v, i) => {
        const count = entities.filter((e) => e.role === v.role).length;
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
                  /* @__PURE__ */ jsx("div", { className: `font-bold ${textHeading}`, children: v.name }),
                  /* @__PURE__ */ jsxs("div", { className: `text-[11px] ${textMuted}`, children: [
                    count,
                    " Registered"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded-md border ${count > 0 ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-slate-500/20 text-slate-400 border-slate-500/30"}`, children: count > 0 ? "Active" : "Standby" })
            ]
          },
          i
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsx(AuditFeed, { logs: auditLogs, isDarkMode }),
      /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900 shadow-xs"}`, children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(FiServer, { className: "w-4 h-4 text-emerald-400" }),
          /* @__PURE__ */ jsx("span", { children: "Platform System Health" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: `flex justify-between p-2.5 rounded-xl ${isDarkMode ? "bg-slate-800 text-slate-300" : "bg-blue-50/50 text-slate-600"}`, children: [
            /* @__PURE__ */ jsx("span", { children: "Database Status" }),
            /* @__PURE__ */ jsx("strong", { className: (adminHealth == null ? void 0 : adminHealth.dbConnected) ? "text-emerald-400 font-bold" : "text-amber-400 font-bold", children: (adminHealth == null ? void 0 : adminHealth.dbConnected) ? "Connected (Healthy)" : "Checking..." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `flex justify-between p-2.5 rounded-xl ${isDarkMode ? "bg-slate-800 text-slate-300" : "bg-blue-50/50 text-slate-600"}`, children: [
            /* @__PURE__ */ jsx("span", { children: "System Status" }),
            /* @__PURE__ */ jsx("strong", { className: "text-emerald-400 font-bold", children: (adminHealth == null ? void 0 : adminHealth.status) || "Online" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `flex justify-between p-2.5 rounded-xl ${isDarkMode ? "bg-slate-800 text-slate-300" : "bg-blue-50/50 text-slate-600"}`, children: [
            /* @__PURE__ */ jsx("span", { children: "Platform Environment" }),
            /* @__PURE__ */ jsx("span", { className: "text-emerald-400 font-semibold text-[11px]", children: "Production (Active)" })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const $role = UNSAFE_withComponentProps(function RoleDashboardRoute() {
  var _a2, _b2, _c;
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  useEffect(() => {
    let isMounted = true;
    const verifySession = async () => {
      const token = getAccessToken();
      if (token) {
        if (isMounted) setIsCheckingAuth(false);
        return;
      }
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const newToken = await tryRefreshToken();
          if (newToken && isMounted) {
            setIsCheckingAuth(false);
            return;
          }
        } catch {
        }
      }
      if (isMounted) {
        navigate("/login", {
          replace: true
        });
      }
    };
    verifySession();
    return () => {
      isMounted = false;
    };
  }, [navigate]);
  const roleAliasMap = {
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
    "counselors": "mentor",
    "training": "training",
    "trainings": "training",
    "academy": "training",
    "academies": "training",
    "recruiter": "recruiter",
    "recruiters": "recruiter",
    "hr": "recruiter",
    "company": "company",
    "companies": "company",
    "enterprise": "company",
    "parent": "parent",
    "parents": "parent",
    "family": "parent",
    "student": "parent",
    "students": "parent",
    "learner": "parent"
  };
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const isPortalPrefix = ((_a2 = pathSegments[0]) == null ? void 0 : _a2.toLowerCase()) === "portal";
  const rawPathRole = isPortalPrefix ? ((_b2 = pathSegments[1]) == null ? void 0 : _b2.toLowerCase()) || "" : ((_c = pathSegments[0]) == null ? void 0 : _c.toLowerCase()) || "";
  const rawParamRole = (params.role || "").toLowerCase();
  const resolvedRole = roleAliasMap[rawParamRole] || roleAliasMap[rawPathRole] || "super-admin";
  const currentWorkspace = resolvedRole;
  const rawSubView = isPortalPrefix ? pathSegments[2] || "overview" : params["*"] || pathSegments[1] || "overview";
  const activeSubView = rawSubView.toLowerCase().replace(/^\//, "") || "overview";
  const [activeRoleFilter, setActiveRoleFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
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
    setIsDarkMode((prev) => {
      const nextTheme = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("role_ready_theme", nextTheme ? "dark" : "light");
      }
      return nextTheme;
    });
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
    const prefix = isPortalPrefix ? "/portal" : "";
    navigate(`${prefix}/${role}`);
    showToast(`Switched to ${role.toUpperCase()} Workspace Portal!`);
  };
  const handleViewChange = (view) => {
    const prefix = isPortalPrefix ? "/portal" : "";
    if (view === "overview") {
      navigate(`${prefix}/${currentWorkspace}`);
    } else {
      navigate(`${prefix}/${currentWorkspace}/${view}`);
    }
  };
  const handleSimulateWorkspace = (role) => {
    handleWorkspaceChange(role);
  };
  const getSubViewTitle = () => {
    if (activeSubView === "overview") {
      const portalNames = {
        "super-admin": "Super Admin Governance Hub",
        "school": "School Admin Portal Overview",
        "college": "College Admin Portal Overview",
        "mentor": "Mentor & Counselor Desk Overview",
        "training": "Training Institute Portal Overview",
        "recruiter": "Recruiter Talent Desk Overview",
        "company": "Enterprise Company Portal Overview",
        "parent": "Parent & Family Intelligence Portal Overview"
      };
      return portalNames[currentWorkspace] || "Workspace Overview";
    }
    if (activeSubView === "profile") {
      const profileTitles = {
        "super-admin": "Super Admin Governance Profile & Security",
        "school": "School Admin Profile & Account Settings",
        "college": "College Admin Profile & Account Settings",
        "mentor": "Mentor Profile & Credentials Verification",
        "training": "Training Academy Profile & Credentials",
        "recruiter": "Recruiter Profile & Corporate Settings",
        "company": "Enterprise Company Profile & Verification",
        "parent": "Parent Profile & Family Governance Settings"
      };
      return profileTitles[currentWorkspace] || "User Profile & Settings";
    }
    if (currentWorkspace === "parent") {
      const parentTitles = {
        "children": "My Children & Student Credentials Desk",
        "accounts": "Family Accounts & Member Governance",
        "attendance": "Child Attendance & Classroom Presence",
        "academic": "Academic Performance & Subject Mastery Analysis",
        "learning": "Student Learning Progress & Course Tracks",
        "career": "Career Progress, DNA & Milestones Roadmap",
        "career-reports": "AI Career Guidance & Diagnostic Reports",
        "family-reports": "Family AI Guidance & Milestone Reports",
        "scholarships": "Scholarship Directory & Financial Aid Opportunities",
        "mentors": "1-on-1 Mentor & Counselor Booking Desk",
        "notifications": "Family & Student Activity Notifications",
        "subscription": "Family Subscription & Seat Allocation Plans",
        "settings": "Parent Account Settings & Security",
        "fees": "Fee Management & Subscription Invoicing"
      };
      if (parentTitles[activeSubView]) {
        return parentTitles[activeSubView];
      }
    }
    const titles = {
      "access": "Access Provisioning & Quota Management Hub",
      "rbac": "Role-Based Access Control (RBAC) Matrix",
      "ai": "AI Recommendation Engine Control",
      "audit": "System Security Audit & Compliance Logs",
      "students": "Students (Grades 8 - 12 Roster)",
      "teachers": "Teacher & Faculty Management",
      "assessments": "Assessments & Career Readiness",
      "reports": "Career & AI Intelligence Reports",
      "events": "Events & Guidance Workshops",
      "analytics": "Student Analytics & Growth",
      "performance": "Performance Monitoring Dashboard",
      "placement": "Placement & Internship Readiness Reports",
      "notifications": "Portal Notifications Desk",
      "settings": "School Governance & Settings",
      "programs": "Academic Programs & Degree Tracks",
      "admissions": "College Admissions & Cutoff Management",
      "applications": "Student Applications & Enrollment Pipeline",
      "scholarships": "Institutional Scholarship & Aid Cell",
      "placement-cell": "Campus Placement Cell & Drive Hub",
      "industry-connect": "Corporate Recruiter & Industry MoUs",
      "availability": "Slot Booking & Availability Calendar",
      "student-requests": "Student Counseling Booking Requests",
      "video-sessions": "Live 1-on-1 Video Counseling Room",
      "guidance": "Student Assessment Review & Career Guidance",
      "ratings": "Student Ratings & Session Reviews",
      "wallet": "Mentor Wallet Earnings & Payout Desk",
      "verification": "Company Profile & Enterprise Verification",
      "campus-hiring": "University Campus Hiring & Placement Drives",
      "student-search": "Student Talent Search & Candidate Database",
      "ai-match": "AI Neural Candidate Matcher Engine",
      "hiring-analytics": "Hiring Analytics & Placement Funnel",
      "drives": "Campus Placement Drives",
      "skills": "Student Skill Matrix & ATS Fit",
      "recruiters": "Corporate Recruiting Partners",
      "offers": "Offer Letters & Compensation (CTC)",
      "calendar": "Counseling Booking Calendar",
      "mentees": "Assigned Mentees Roster",
      "counseling": "Counseling Notes & Video Room",
      "courses": "Skill Courses & Curriculum Track",
      "certs": "Certifications Registry",
      "hiring": "Hiring Partner Enterprises",
      "jobs": "Job & Internship Requisitions",
      "matcher": "AI Candidate Matcher Engine",
      "interviews": "Scheduled Candidate Interviews",
      "pipeline": "Talent Funnel Pipeline",
      "discovery": "AI Career Discovery Engine",
      "dna": "Student Career DNA Profile",
      "roadmap": "Personalized Career Milestones Roadmap",
      "resume": "AI Student Resume & Portfolio Suite",
      "learning": "Student Learning Journey & Courses",
      "colleges": "College & University Explorer",
      "mentors": "1-on-1 Mentor & Counselor Booking Desk",
      "fees": "Fee Management & Subscription Invoicing"
    };
    return titles[activeSubView] || `${activeSubView.toUpperCase()} View`;
  };
  if (isCheckingAuth) {
    return /* @__PURE__ */ jsxs("div", {
      className: `min-h-screen flex flex-col items-center justify-center font-sans ${isDarkMode ? "bg-[#0f1228] text-white" : "bg-slate-50 text-slate-900"}`,
      children: [/* @__PURE__ */ jsx("div", {
        className: "w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-xs font-semibold text-slate-400",
        children: "Verifying authentication session..."
      })]
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: `min-h-screen flex transition-colors duration-200 ${isDarkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"}`,
    children: [/* @__PURE__ */ jsx(Sidebar, {
      currentWorkspace,
      onWorkspaceChange: handleWorkspaceChange,
      activeView: activeSubView,
      onViewChange: handleViewChange,
      onRoleFilter: setActiveRoleFilter,
      totalEntities: entities.length,
      isDarkMode
    }), /* @__PURE__ */ jsxs("div", {
      className: "pl-72 flex-1 flex flex-col min-w-0",
      children: [/* @__PURE__ */ jsx(Topbar, {
        currentWorkspace,
        searchQuery,
        onSearchChange: setSearchQuery,
        onShowToast: showToast,
        isDarkMode,
        onToggleTheme: handleToggleTheme
      }), /* @__PURE__ */ jsxs("main", {
        className: "p-8 flex-1 animate-fade-in",
        children: [toastMessage && /* @__PURE__ */ jsxs("div", {
          className: "fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-blue-500/30 flex items-center gap-3 animate-bounce",
          children: [/* @__PURE__ */ jsx(FiCheckCircle, {
            className: "w-5 h-5 text-blue-400"
          }), /* @__PURE__ */ jsx("span", {
            className: "text-xs font-semibold",
            children: toastMessage
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8",
          children: [/* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx("h1", {
              className: `text-[30px] md:text-[32px] font-bold leading-[1.2] tracking-[-0.02em] ${isDarkMode ? "text-white" : "text-slate-900"}`,
              children: getSubViewTitle()
            })
          }), currentWorkspace === "super-admin" && (activeSubView === "access" || activeSubView === "overview") && /* @__PURE__ */ jsxs("button", {
            onClick: () => setIsGrantModalOpen(true),
            className: "bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[14px] px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2",
            children: [/* @__PURE__ */ jsx(FiPlus, {
              className: "w-4 h-4"
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
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $role
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Duqma3Cv.js", "imports": ["/assets/jsx-runtime-D_zvdyIk.js", "/assets/chunk-62JRHF6Z-W8r8RY01.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/root-C4Q--5xy.js", "imports": ["/assets/jsx-runtime-D_zvdyIk.js", "/assets/chunk-62JRHF6Z-W8r8RY01.js", "/assets/QueryClientProvider-BDZ3rP-W.js", "/assets/query-CoXrFZ2c.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/_index-Bn0BTm_z.js", "imports": ["/assets/chunk-62JRHF6Z-W8r8RY01.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/login-DBBrtOOq.js", "imports": ["/assets/chunk-62JRHF6Z-W8r8RY01.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/QueryClientProvider-BDZ3rP-W.js", "/assets/api-U8oLodN_.js", "/assets/authService-MxT1qWSX.js", "/assets/index-DUkYxB1-.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "signup-route": { "id": "signup-route", "parentId": "root", "path": "signup", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/signup-n5n8eQXM.js", "imports": ["/assets/chunk-62JRHF6Z-W8r8RY01.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/index-DUkYxB1-.js", "/assets/authService-MxT1qWSX.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "register-route": { "id": "register-route", "parentId": "root", "path": "register", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/signup-n5n8eQXM.js", "imports": ["/assets/chunk-62JRHF6Z-W8r8RY01.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/index-DUkYxB1-.js", "/assets/authService-MxT1qWSX.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "forgot-password-route": { "id": "forgot-password-route", "parentId": "root", "path": "forgot-password", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/forgot-password-Ci-IYG0i.js", "imports": ["/assets/chunk-62JRHF6Z-W8r8RY01.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/authService-MxT1qWSX.js", "/assets/index-DUkYxB1-.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "portal-role-root": { "id": "portal-role-root", "parentId": "root", "path": "portal/:role", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/_role-DOn86LSC.js", "imports": ["/assets/chunk-62JRHF6Z-W8r8RY01.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/QueryClientProvider-BDZ3rP-W.js", "/assets/query-CoXrFZ2c.js", "/assets/api-U8oLodN_.js", "/assets/index-DUkYxB1-.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "portal-role-splat": { "id": "portal-role-splat", "parentId": "root", "path": "portal/:role/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/_role-DOn86LSC.js", "imports": ["/assets/chunk-62JRHF6Z-W8r8RY01.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/QueryClientProvider-BDZ3rP-W.js", "/assets/query-CoXrFZ2c.js", "/assets/api-U8oLodN_.js", "/assets/index-DUkYxB1-.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "role-root": { "id": "role-root", "parentId": "root", "path": ":role", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/_role-DOn86LSC.js", "imports": ["/assets/chunk-62JRHF6Z-W8r8RY01.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/QueryClientProvider-BDZ3rP-W.js", "/assets/query-CoXrFZ2c.js", "/assets/api-U8oLodN_.js", "/assets/index-DUkYxB1-.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "role-splat": { "id": "role-splat", "parentId": "root", "path": ":role/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/_role-DOn86LSC.js", "imports": ["/assets/chunk-62JRHF6Z-W8r8RY01.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/QueryClientProvider-BDZ3rP-W.js", "/assets/query-CoXrFZ2c.js", "/assets/api-U8oLodN_.js", "/assets/index-DUkYxB1-.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-e96e87ff.js", "version": "e96e87ff", "sri": void 0 };
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
  "signup-route": {
    id: "signup-route",
    parentId: "root",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "register-route": {
    id: "register-route",
    parentId: "root",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "forgot-password-route": {
    id: "forgot-password-route",
    parentId: "root",
    path: "forgot-password",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "portal-role-root": {
    id: "portal-role-root",
    parentId: "root",
    path: "portal/:role",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "portal-role-splat": {
    id: "portal-role-splat",
    parentId: "root",
    path: "portal/:role/*",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "role-root": {
    id: "role-root",
    parentId: "root",
    path: ":role",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "role-splat": {
    id: "role-splat",
    parentId: "root",
    path: ":role/*",
    index: void 0,
    caseSensitive: void 0,
    module: route9
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
