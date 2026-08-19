var _a;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, Meta, Links, ScrollRestoration, Scripts, redirect, useNavigate, useParams, useLocation } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { FaCircleCheck, FaCompass, FaWandMagicSparkles, FaShieldHalved, FaSchool, FaGraduationCap, FaUserCheck, FaChalkboardUser, FaBriefcase, FaBuilding, FaEnvelope, FaLock, FaEyeSlash, FaEye, FaArrowRight, FaChartPie, FaFileLines, FaMagnifyingGlass, FaBrain, FaCalendarDays, FaAward, FaArrowTrendUp, FaBullhorn, FaSliders, FaHandshake, FaUsers, FaVideo, FaStar, FaWallet, FaBookOpen, FaListCheck, FaRightFromBracket, FaSun, FaMoon, FaBell, FaXmark, FaDownload, FaPlus, FaClock, FaIndianRupeeSign, FaFire, FaUsersGear, FaBuildingUser, FaLandmark } from "react-icons/fa6";
import { UserPlus, X, Key, Edit3, Save, Sparkles, Plus, Building2, School, GraduationCap, UserCheck, BookOpen, Briefcase, Globe, CheckCircle2, Clock, ExternalLink, Power, Trash2, Sliders, Brain, Download, ShieldCheck } from "lucide-react";
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
const stylesheet = "/assets/app-CFW7KWEu.css";
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
  }, {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
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
const login = UNSAFE_withComponentProps(function LoginRoute() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState("super-admin");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const demoAccounts = [{
    role: "super-admin",
    label: "Super Admin",
    email: "admin@roleready.ai",
    password: "Super#Admin2026!",
    icon: FaShieldHalved,
    color: "bg-blue-600"
  }, {
    role: "school",
    label: "School Admin",
    email: "principal@dpsrkp.edu.in",
    password: "School#DPS2026!",
    icon: FaSchool,
    color: "bg-blue-600"
  }, {
    role: "college",
    label: "College Placement",
    email: "placements@iitb.ac.in",
    password: "IITB#College2026!",
    icon: FaGraduationCap,
    color: "bg-blue-600"
  }, {
    role: "mentor",
    label: "Mentor Counselor",
    email: "r.sharma@careerguider.org",
    password: "Mentor#Sharma2026!",
    icon: FaUserCheck,
    color: "bg-blue-600"
  }, {
    role: "training",
    label: "Training Institute",
    email: "director@apexskill.org",
    password: "Apex#Training2026!",
    icon: FaChalkboardUser,
    color: "bg-blue-600"
  }, {
    role: "recruiter",
    label: "Talent Recruiter",
    email: "priya_v@infosys.com",
    password: "Infosys#Recruit2026!",
    icon: FaBriefcase,
    color: "bg-blue-600"
  }, {
    role: "company",
    label: "Enterprise Company",
    email: "careers@tcs.com",
    password: "TCS#Enterprise2026!",
    icon: FaBuilding,
    color: "bg-blue-600"
  }];
  const handleSelectDemo = (acc) => {
    setSelectedRole(acc.role);
    setEmail(acc.email);
    setPassword(acc.password);
    setToastMessage(`Auto-filled unique credentials for ${acc.label}`);
    setTimeout(() => setToastMessage(null), 3e3);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) return;
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
      className: "fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-bounce",
      children: [/* @__PURE__ */ jsx(FaCircleCheck, {
        className: "w-4 h-4 text-emerald-400"
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
              }), " Multi-Role Enterprise Portal"]
            }), /* @__PURE__ */ jsx("h2", {
              className: "text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight text-white",
              children: "Empowering Ecosystem Career Governance"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-blue-100/80 leading-relaxed",
              children: "Unified workspace access for Schools, Universities, Career Counselors, Skill Academies, Recruiters & Government Bodies."
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
              children: "TanStack Query State Sync Operational"
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
                children: "Select a demo role or enter your credentials to proceed"
              })]
            }), /* @__PURE__ */ jsx("span", {
              className: "text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100",
              children: "v2.4 Secure Login"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mb-6",
            children: [/* @__PURE__ */ jsx("label", {
              className: "block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2",
              children: "Quick Demo Role Login"
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
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block font-bold text-slate-700 mb-1.5",
                children: "Official Admin Email Address"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative",
                children: [/* @__PURE__ */ jsx(FaEnvelope, {
                  className: "w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2"
                }), /* @__PURE__ */ jsx("input", {
                  type: "email",
                  required: true,
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  placeholder: "admin@roleready.ai",
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
                    setToastMessage("Password reset link dispatched!");
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
            }), /* @__PURE__ */ jsx("div", {
              className: "flex items-center justify-between pt-1",
              children: /* @__PURE__ */ jsxs("label", {
                className: "flex items-center gap-2 cursor-pointer text-slate-600 font-medium",
                children: [/* @__PURE__ */ jsx("input", {
                  type: "checkbox",
                  checked: rememberMe,
                  onChange: (e) => setRememberMe(e.target.checked),
                  className: "w-4 h-4 accent-blue-600 rounded"
                }), /* @__PURE__ */ jsx("span", {
                  children: "Keep me signed in on this device"
                })]
              })
            }), /* @__PURE__ */ jsx("button", {
              type: "submit",
              disabled: isLoading,
              className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 mt-4",
              children: isLoading ? /* @__PURE__ */ jsx("span", {
                children: "Authenticating..."
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
  isDarkMode
}) => {
  const roleNavItems = {
    "super-admin": [
      { id: "overview", label: "Dashboard Overview", icon: FaChartPie },
      { id: "access", label: "Access Provisioning", icon: FaShieldHalved },
      { id: "rbac", label: "Permission Matrix", icon: FaSliders },
      { id: "ai", label: "AI Engine Control", icon: FaBrain },
      { id: "audit", label: "Audit & Compliance", icon: FaListCheck }
    ],
    "school": [
      { id: "overview", label: "Dashboard", icon: FaChartPie },
      { id: "students", label: "Students", icon: FaUsers },
      { id: "teachers", label: "Teachers", icon: FaChalkboardUser },
      { id: "assessments", label: "Assessments & Career Readiness", icon: FaListCheck },
      { id: "reports", label: "Career Reports", icon: FaFileLines },
      { id: "events", label: "Events", icon: FaCalendarDays },
      { id: "analytics", label: "Student Analytics", icon: FaArrowTrendUp },
      { id: "performance", label: "Performance Dashboard", icon: FaBrain },
      { id: "placement", label: "Placement Reports", icon: FaBriefcase },
      { id: "notifications", label: "Notifications", icon: FaBullhorn },
      { id: "settings", label: "Settings", icon: FaSliders }
    ],
    "college": [
      { id: "overview", label: "Dashboard", icon: FaGraduationCap },
      { id: "programs", label: "Programs", icon: FaBookOpen },
      { id: "admissions", label: "Admissions", icon: FaUserCheck },
      { id: "applications", label: "Applications", icon: FaFileLines },
      { id: "scholarships", label: "Scholarships", icon: FaAward },
      { id: "placement-cell", label: "Placement Cell", icon: FaBriefcase },
      { id: "industry-connect", label: "Industry Connect", icon: FaHandshake },
      { id: "analytics", label: "Analytics", icon: FaArrowTrendUp },
      { id: "notifications", label: "Notifications", icon: FaBullhorn },
      { id: "settings", label: "Settings", icon: FaSliders }
    ],
    "mentor": [
      { id: "overview", label: "Dashboard", icon: FaUserCheck },
      { id: "profile", label: "Profile & Verification", icon: FaUserCheck },
      { id: "skills", label: "Skills & Expertise", icon: FaBrain },
      { id: "availability", label: "Availability & Calendar", icon: FaCalendarDays },
      { id: "student-requests", label: "Student Requests", icon: FaUsers },
      { id: "video-sessions", label: "Video Sessions", icon: FaVideo },
      { id: "guidance", label: "Assessments & Guidance", icon: FaCompass },
      { id: "ratings", label: "Ratings & Reviews", icon: FaStar },
      { id: "wallet", label: "Wallet & Payouts", icon: FaWallet },
      { id: "notifications", label: "Notifications", icon: FaBullhorn },
      { id: "settings", label: "Settings", icon: FaSliders }
    ],
    "training": [
      { id: "overview", label: "Institute Overview", icon: FaChalkboardUser },
      { id: "courses", label: "Skill Courses Track", icon: FaChalkboardUser },
      { id: "certs", label: "Certifications Registry", icon: FaAward },
      { id: "hiring", label: "Hiring Partners", icon: FaHandshake }
    ],
    "recruiter": [
      { id: "overview", label: "Dashboard", icon: FaBriefcase },
      { id: "verification", label: "Company & Verification", icon: FaBuilding },
      { id: "jobs", label: "Job Postings", icon: FaFileLines },
      { id: "campus-hiring", label: "Campus Hiring", icon: FaGraduationCap },
      { id: "student-search", label: "Student Search", icon: FaMagnifyingGlass },
      { id: "ai-match", label: "AI Matcher", icon: FaBrain },
      { id: "interviews", label: "Interviews", icon: FaCalendarDays },
      { id: "offers", label: "Offer Letters", icon: FaAward },
      { id: "hiring-analytics", label: "Hiring Analytics", icon: FaArrowTrendUp },
      { id: "notifications", label: "Notifications", icon: FaBullhorn },
      { id: "settings", label: "Settings", icon: FaSliders }
    ],
    "company": [
      { id: "overview", label: "Company Overview", icon: FaBuilding },
      { id: "internships", label: "Internship Programs", icon: FaBriefcase },
      { id: "partnerships", label: "Campus Partnerships", icon: FaGraduationCap },
      { id: "pipeline", label: "Talent Pipeline", icon: FaChartPie }
    ]
  };
  const navItems = roleNavItems[currentWorkspace] || roleNavItems["super-admin"];
  return /* @__PURE__ */ jsxs("aside", { className: `w-72 min-h-screen flex flex-col fixed top-0 bottom-0 left-0 z-40 shadow-xl border-r font-sans transition-colors duration-200 ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `p-5 flex items-center gap-3.5 border-b ${isDarkMode ? "border-slate-800 bg-slate-950/60" : "border-blue-100 bg-blue-50/40"}`, children: [
      /* @__PURE__ */ jsx("div", { className: "w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20", children: /* @__PURE__ */ jsx(FaCompass, { className: "w-6 h-6 animate-pulse-glow" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: `font-extrabold text-xl tracking-tight font-sans ${isDarkMode ? "text-white" : "text-slate-900"}`, children: "Role Ready" }),
        /* @__PURE__ */ jsx("span", { className: "inline-block text-[11px] font-semibold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-md border border-blue-400/20", children: currentWorkspace === "super-admin" ? "Super Admin Portal" : `${currentWorkspace.toUpperCase()} Workspace` })
      ] })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "flex-1 overflow-y-auto p-4 space-y-6", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: `text-[10px] font-bold tracking-wider uppercase px-2 mb-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`, children: [
        currentWorkspace.toUpperCase(),
        " NAVIGATION"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-1", children: navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => onViewChange(item.id),
            className: `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${isActive ? "bg-[#12163A] text-white shadow-md border border-[#3665EE]/40 scale-[1.01]" : isDarkMode ? "text-slate-300 hover:bg-[#12163A]/60 hover:text-white hover:translate-x-1" : "text-[#4B5563] hover:bg-[#DEE9FF]/60 hover:text-[#12163A] hover:translate-x-1"}`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx(Icon, { className: `w-4 h-4 ${isActive ? "text-[#3665EE]" : "text-[#94A3B8]"}` }),
                /* @__PURE__ */ jsx("span", { children: item.label })
              ] }),
              item.id === "access" && /* @__PURE__ */ jsx("span", { className: "bg-[#3665EE]/20 text-[#3665EE] text-[10px] px-2 py-0.5 rounded-full font-bold", children: totalEntities }),
              item.id === "ai" && /* @__PURE__ */ jsx("span", { className: "bg-[#E4F4EC] text-[#12163A] text-[10px] px-2 py-0.5 rounded-full font-bold", children: "Live" })
            ]
          },
          item.id
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: `p-4 border-t space-y-3 ${isDarkMode ? "border-slate-800 bg-slate-950/60" : "border-blue-100 bg-blue-50/40"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs", children: [
          /* @__PURE__ */ jsx("div", { className: `font-semibold ${isDarkMode ? "text-white" : "text-slate-900"}`, children: "AI Engine v2.4" }),
          /* @__PURE__ */ jsx("div", { className: `text-[10px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`, children: "All Microservices Operational" })
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
          className: `w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer border ${isDarkMode ? "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/50 shadow-xs" : "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 hover:border-rose-300 shadow-xs"}`,
          children: [
            /* @__PURE__ */ jsx(FaRightFromBracket, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsx("span", { children: "Log Out" })
          ]
        }
      )
    ] })
  ] });
};
const Topbar = ({
  currentWorkspace,
  searchQuery,
  onSearchChange,
  onShowToast,
  isDarkMode,
  onToggleTheme
}) => {
  const roleNameMap = {
    "super-admin": "Super Admin (Governance)",
    "school": "School Admin Portal",
    "college": "College Admin Portal",
    "mentor": "Mentor Desk",
    "training": "Training Institute Portal",
    "recruiter": "Recruiter Talent Desk",
    "company": "Enterprise Company Portal"
  };
  return /* @__PURE__ */ jsxs("header", { className: `h-16 border-b px-6 flex items-center justify-between sticky top-0 z-30 font-sans transition-colors duration-200 ${isDarkMode ? "bg-[#12163A] border-slate-800 text-white backdrop-blur-md" : "bg-white/90 border-slate-200 text-[#12163A] backdrop-blur-md shadow-2xs"}`, children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 w-96", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
      /* @__PURE__ */ jsx(FaMagnifyingGlass, { className: `w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDarkMode ? "text-slate-400" : "text-[#3665EE]"}` }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: searchQuery,
          onChange: (e) => onSearchChange(e.target.value),
          placeholder: `Search in ${roleNameMap[currentWorkspace]}...`,
          className: `w-full pl-9 pr-4 py-2 rounded-xl text-xs transition focus:outline-none focus:ring-2 focus:ring-[#3665EE] ${isDarkMode ? "bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400" : "bg-[#DEE9FF]/40 border border-[#C6D9FF] text-[#12163A] placeholder-[#6B7280]"}`
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onToggleTheme,
          title: isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
          className: `flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${isDarkMode ? "bg-slate-800 border-amber-500/40 text-amber-400 hover:bg-slate-700" : "bg-[#DEE9FF] border-[#C6D9FF] text-[#12163A] hover:bg-[#CBDDFF]"}`,
          children: isDarkMode ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(FaSun, { className: "w-3.5 h-3.5 text-amber-400 animate-spin-slow" }),
            /* @__PURE__ */ jsx("span", { children: "Light Mode" })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(FaMoon, { className: "w-3.5 h-3.5 text-[#3665EE]" }),
            /* @__PURE__ */ jsx("span", { children: "Dark Mode" })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => onShowToast("Notifications: 2 pending seat approval requests."),
          className: `relative p-2 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${isDarkMode ? "bg-slate-800 border-slate-700 text-slate-300 hover:text-white" : "bg-[#DEE9FF] border-[#C6D9FF] text-[#12163A] hover:bg-[#CBDDFF]"}`,
          children: [
            /* @__PURE__ */ jsx(FaBell, { className: "w-4 h-4 text-[#3665EE]" }),
            /* @__PURE__ */ jsx("span", { className: "absolute top-1 right-1 w-2 h-2 bg-[#3665EE] rounded-full animate-ping" }),
            /* @__PURE__ */ jsx("span", { className: "absolute top-1 right-1 w-2 h-2 bg-[#3665EE] rounded-full" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: `h-6 w-px ${isDarkMode ? "bg-slate-800" : "bg-slate-200"}` }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 hover:scale-105 transition-transform duration-200 cursor-pointer", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-[#12163A] text-white font-extrabold flex items-center justify-center text-xs shadow-md border border-[#3665EE]/40", children: /* @__PURE__ */ jsx(FaUserCheck, { className: "w-4 h-4 text-[#3665EE]" }) }),
        /* @__PURE__ */ jsxs("div", { className: "hidden sm:block text-left", children: [
          /* @__PURE__ */ jsx("div", { className: `text-xs font-bold leading-tight ${isDarkMode ? "text-white" : "text-[#12163A]"}`, children: "System Administrator" }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold text-[#3665EE]", children: currentWorkspace.toUpperCase() })
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
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white", children: /* @__PURE__ */ jsx(UserPlus, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-base", children: "Grant Ecosystem Partner Access" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-100 font-medium", children: "Provision credentials for Schools, Colleges, Mentors, HR & Academies" })
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
          /* @__PURE__ */ jsxs("h3", { className: "font-extrabold text-sm", children: [
            "Approval Pipeline: ",
            entity.name
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-blue-100", children: "Super Admin authorization & verification pipeline" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "p-1 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer", children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-white" }) })
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
  return /* @__PURE__ */ jsx("div", { className: `fixed inset-[0] z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in font-sans ${isDarkMode ? "bg-slate-950/70" : "bg-slate-900/40"}`, children: /* @__PURE__ */ jsxs("div", { className: `border rounded-3xl max-w-md w-full overflow-hidden relative animate-scale-up ${cardBg}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `p-6 border-b flex items-center justify-between ${headerBg}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-500 border border-blue-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5 text-blue-500" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: `font-extrabold text-base tracking-tight ${titleColor}`, children: title }),
          /* @__PURE__ */ jsx("p", { className: `text-xs ${subtitleColor}`, children: subtitle })
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
            className: "px-5 py-2.5 rounded-xl bg-[#12163A] hover:bg-[#1A2050] text-white font-bold transition shadow-md cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95",
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
  const [searchQuery, setSearchQuery] = useState("");
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
    } else {
      onShowToast(`Action completed: ${actionModalConfig.title}`);
    }
    setIsActionModalOpen(false);
  };
  const renderContent = () => {
    if (activeSubView === "overview") {
      return /* @__PURE__ */ jsxs("div", { className: "space-y-6 font-sans", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#12163A] text-white shadow-md border border-[#12163A] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-slate-300", children: "Total Students (Grades 8-12)" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-white", children: students.length + 3814 }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full inline-block", children: "100% Active Profiles" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#4B5563]", children: "Total Teachers & Mentors" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#12163A]", children: "142" }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-[#12163A]/70", children: "Across 12 Departments" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#4B5563]", children: "Assessment Completion" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#3665EE]", children: "91.4%" }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-[#12163A]", children: "3,490 / 3,820 Tested" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#4B5563]", children: "Avg Career Readiness Score" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#12163A]", children: "88.2 / 100" }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-[#3665EE]", children: "Top 5% Regionally" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm text-[#12163A]", children: "Grade Enrolment & Career DNA Status" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3", children: [
            { grade: "Grade 8", count: 620, readiness: "76% Ready", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
            { grade: "Grade 9", count: 780, readiness: "82% Ready", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
            { grade: "Grade 10", count: 1050, readiness: "89% Ready", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
            { grade: "Grade 11", count: 920, readiness: "93% Ready", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
            { grade: "Grade 12", count: 850, readiness: "96% Ready", bg: "bg-[#12163A]", border: "border-[#12163A]", dark: true }
          ].map((g, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-[20px] border text-center ${g.bg} ${g.border} ${g.dark ? "text-white" : "text-[#12163A]"} hover-card-lift`, children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold block text-xs", children: g.grade }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold my-1", children: g.count }),
            /* @__PURE__ */ jsx("span", { className: `text-[10px] font-bold ${g.dark ? "text-[#E4F4EC]" : "text-[#3665EE]"}`, children: g.readiness })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] border border-[#C6D9FF] shadow-xs space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Learning Progress" }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-[#3665EE]", children: "86.4% Avg" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#4B5563]", children: "Course completion rates across AI, STEM, & Skill tracks" }),
            /* @__PURE__ */ jsx("div", { className: "w-full h-2.5 bg-white/80 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#3665EE] rounded-full", style: { width: "86%" } }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] border border-[#EAD0BC] shadow-xs space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Students Requiring Attention" }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-[#12163A] bg-[#12163A]/10 px-2.5 py-0.5 rounded-full", children: "42 Students" })
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
              /* @__PURE__ */ jsx("span", { className: "font-bold text-[#12163A]", children: "78% Placement Ready" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#4B5563]", children: "Grade 11 & 12 students qualified for internships & admissions" }),
            /* @__PURE__ */ jsx("div", { className: "w-full h-2.5 bg-white/80 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#3665EE] rounded-full", style: { width: "78%" } }) })
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
                /* @__PURE__ */ jsx(FaUsers, { className: "w-5 h-5 text-[#3665EE]" }),
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
                    /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
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
                    /* @__PURE__ */ jsx(FaDownload, { className: "w-3.5 h-3.5" }),
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
              /* @__PURE__ */ jsx(FaMagnifyingGlass, { className: "w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" })
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
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-100", children: filteredStudents.map((s) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-[#DEE9FF]/20 transition-colors", children: [
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
            /* @__PURE__ */ jsx("td", { className: "p-3.5 text-right", children: /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  setSelectedStudent(s);
                  setStudentDetailTab("overview");
                },
                className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-3 py-1.5 rounded-lg text-[10px] transition cursor-pointer flex items-center gap-1.5 ml-auto hover:scale-105 active:scale-95",
                children: [
                  /* @__PURE__ */ jsx(FaEye, { className: "w-3 h-3" }),
                  " View Student"
                ]
              }
            ) })
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
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSelectedStudent(null),
                className: "w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer text-white",
                children: /* @__PURE__ */ jsx(FaXmark, { className: "w-4 h-4" })
              }
            )
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
              /* @__PURE__ */ jsx(FaChalkboardUser, { className: "w-5 h-5 text-[#3665EE]" }),
              " Teacher & Faculty Management"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "142 Registered school teachers & career mentors across departments" })
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
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Add Teacher"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: teachersList.map((t, i) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] transition-all hover:shadow-md", children: [
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
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setSelectedTeacher(t),
              className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-3.5 py-1.5 rounded-xl cursor-pointer transition hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5",
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
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaListCheck, { className: "w-5 h-5 text-[#3665EE]" }),
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
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
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
              /* @__PURE__ */ jsx(FaFileLines, { className: "w-5 h-5 text-[#3665EE]" }),
              " Institutional Career & AI Intelligence Reports"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "School-wide intelligence summaries, skill gap matrices, and AI recommendation distribution" })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => onShowToast("Generated full School Career Intelligence PDF Report"), className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md", children: [
            /* @__PURE__ */ jsx(FaDownload, { className: "w-3.5 h-3.5" }),
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
              /* @__PURE__ */ jsx(FaCalendarDays, { className: "w-5 h-5 text-[#3665EE]" }),
              " Career Events & Guidance Sessions"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Schedule and manage career workshops, college awareness, & parent guidance" })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => openTriggerModal("Schedule Event", "Create a new school guidance workshop", [
            { label: "Event Title", name: "title", type: "text", placeholder: "IIT Admissions Workshop" }
          ]), className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md", children: [
            /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
            " Schedule Event"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          { title: "Global AI & STEM Career Workshop", date: "Tomorrow, 10:00 AM", attendees: "450 Students Enrolled", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
          { title: "Parent Career Guidance Seminar", date: "15th August, 4:00 PM", attendees: "680 Parents Enrolled", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" }
        ].map((ev, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-[20px] border flex items-center justify-between ${ev.bg} ${ev.border} text-[#12163A]`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: ev.title }),
            /* @__PURE__ */ jsxs("span", { className: "text-[#3665EE] font-semibold", children: [
              ev.date,
              " • ",
              ev.attendees
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "bg-[#12163A] text-white font-bold px-3 py-1 rounded-full", children: "Upcoming" })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "analytics") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaArrowTrendUp, { className: "w-5 h-5 text-[#3665EE]" }),
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
            /* @__PURE__ */ jsx(FaBrain, { className: "w-5 h-5 text-[#3665EE]" }),
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
            /* @__PURE__ */ jsx(FaBriefcase, { className: "w-5 h-5 text-[#3665EE]" }),
            " Placement & Internship Readiness Reports"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Higher-ed placement readiness, internship qualifiers, and ATS resume ratings" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563]", children: "Placement Ready" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-[#12163A] mt-1", children: "3,420 Students" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563]", children: "Internship Ready" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-[#3665EE] mt-1", children: "2,980 Students" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563]", children: "Resume ATS Verified" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-[#12163A] mt-1", children: "3,120 Verified" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-rose-50 border border-rose-200 text-rose-800", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-rose-600", children: "Requiring Guidance" }),
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-rose-700 mt-1", children: "180 Students" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "notifications") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaBullhorn, { className: "w-5 h-5 text-[#3665EE]" }),
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
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaSliders, { className: "w-5 h-5 text-[#3665EE]" }),
          " School Governance & System Settings"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Configure school profile, academic year, grade management, and teacher permissions" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "School Profile & Accreditation" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#4B5563]", children: "St. Xavier's International School • Academic Year 2026-2027" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Teacher & Admin Permissions" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#4B5563]", children: "142 Teacher Accounts • Role-Based Access Enabled" })
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
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-[#3665EE] flex items-center justify-center font-bold text-base text-white shadow-md", children: /* @__PURE__ */ jsx(FaChalkboardUser, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-extrabold text-base text-white", children: selectedTeacher.name }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-300", children: selectedTeacher.qualification })
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
                /* @__PURE__ */ jsx(FaDownload, { className: "w-3.5 h-3.5" }),
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
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#12163A] text-white shadow-md border border-[#12163A] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-slate-300", children: "Total Enrolled Undergrads" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-white", children: "11,450" }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full inline-block", children: "9 Active Batches" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#4B5563]", children: "Placement Rate" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#12163A]", children: "94.2%" }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-[#3665EE]", children: "+5.1% YoY Increase" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#4B5563]", children: "Corporate Placement Drives" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#3665EE]", children: "148 Drives" }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-[#12163A]", children: "18 Drives Open Now" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#4B5563]", children: "Average CTC Package" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#12163A]", children: "₹24.5 LPA" }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-[#3665EE]", children: "Max Package: ₹110 LPA" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-[#12163A]", children: "College Registration & Institutional Accreditation" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-[#6B7280]", children: "Verified University Portal • NIRF Rank #1 • NAAC A++ Grade" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "bg-[#E4F4EC] text-[#12163A] font-bold text-xs px-3.5 py-1 rounded-full border border-[#C3E6D5]", children: "✓ Verification Completed" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-1", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563]", children: "Admissions Pipeline" }),
              /* @__PURE__ */ jsx("div", { className: "text-xl font-extrabold text-[#3665EE]", children: "1,470 Seats Filled" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#4B5563]", children: "98.2% Capacity Enrolled" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A] space-y-1", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563]", children: "Scholarships Disbursed" }),
              /* @__PURE__ */ jsx("div", { className: "text-xl font-extrabold text-[#12163A]", children: "₹6.3 Crores" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#4B5563]", children: "890 Merit Recipients" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] bg-[#E4F4EC] border border-[#C3E6D5] text-[#12163A] space-y-1", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563]", children: "Industry MoUs Active" }),
              /* @__PURE__ */ jsx("div", { className: "text-xl font-extrabold text-[#12163A]", children: "42 Active MoUs" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#3665EE]", children: "Top Global Enterprise Partners" })
            ] })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "programs") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaBookOpen, { className: "w-5 h-5 text-[#3665EE]" }),
              " Academic Programs & Degree Tracks"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Manage undergraduate, postgraduate, and doctoral degree programs" })
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
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
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
              /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-[#12163A] text-white px-2 py-0.5 rounded-md font-bold", children: p.code }),
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: p.title })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#4B5563] mt-1", children: [
              p.degree,
              " • Enrolled: ",
              p.enrolled,
              " / ",
              p.seats,
              " Seats"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-[#3665EE] font-extrabold text-sm", children: [
              "Avg CTC: ",
              p.avgCtc
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-white text-[#12163A] border border-slate-200 px-2.5 py-0.5 rounded-full font-bold", children: "Active Track" })
          ] })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "admissions") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaUserCheck, { className: "w-5 h-5 text-[#3665EE]" }),
              " College Admissions & Entrance Cutoff Hub"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Configure admission drives, entrance examination ranks, & seat quotas" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Launch Admission Drive", "Open a new admission cycle for target entrance exams", [
                { label: "Drive Title", name: "title", type: "text", placeholder: "JEE Advanced Engineering Drive 2026" },
                { label: "Target Cutoff Rank", name: "cutoff", type: "text", placeholder: "JEE Adv < 500" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Launch Admission Drive"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          { title: "JEE Advanced Engineering Drive", cutoff: "JEE Adv Rank < 500", seats: "480 Seats", applied: "14,200 Applicants", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
          { title: "BITSAT Merit Admission Drive", cutoff: "BITSAT Score > 320", seats: "360 Seats", applied: "8,900 Applicants", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
          { title: "GATE Post-Graduate Drive", cutoff: "GATE Score > 750", seats: "180 Seats", applied: "4,100 Applicants", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
          { title: "CAT MBA Admission Drive", cutoff: "CAT Percentile > 98.5%", seats: "240 Seats", applied: "6,800 Applicants", bg: "bg-white", border: "border-slate-200" }
        ].map((ad, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border space-y-2 ${ad.bg} ${ad.border} text-[#12163A] hover-card-lift`, children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold", children: ad.cutoff }),
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: ad.title }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs pt-1", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold text-[#3665EE]", children: ad.seats }),
            /* @__PURE__ */ jsx("span", { className: "text-[#4B5563]", children: ad.applied })
          ] })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "applications") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaFileLines, { className: "w-5 h-5 text-[#3665EE]" }),
              " Student Application & Enrollment Pipeline"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Review student application forms, entrance rankings, and document verification" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => onShowToast("Exported Applications Pipeline CSV"),
              className: "px-4 py-2 rounded-xl font-bold border border-slate-200 bg-slate-50 text-[#12163A] hover:bg-slate-100 transition cursor-pointer flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(FaDownload, { className: "w-3.5 h-3.5" }),
                " Export Applications"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "rounded-[24px] border border-slate-200 overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b text-[11px] font-bold uppercase bg-[#DEE9FF]/50 text-[#12163A] border-[#C6D9FF]", children: [
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Application ID" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Student Name" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Program Applied" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Entrance Score" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Document Status" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5", children: "Application Status" }),
            /* @__PURE__ */ jsx("th", { className: "p-3.5 text-right", children: "Action" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-100", children: applicationsList.map((app) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-[#DEE9FF]/20 transition-colors", children: [
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-mono text-[#3665EE] font-bold", children: app.id }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-bold text-[#12163A]", children: app.name }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 text-[#4B5563]", children: app.program }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-semibold text-[#12163A]", children: app.score }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 font-semibold text-emerald-600", children: app.docs }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5", children: /* @__PURE__ */ jsx("span", { className: "bg-[#E4F4EC] text-[#12163A] border border-[#C3E6D5] px-2.5 py-0.5 rounded-full font-bold text-[10px]", children: app.status }) }),
            /* @__PURE__ */ jsx("td", { className: "p-3.5 text-right", children: /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onShowToast(`Reviewed application for ${app.name}`),
                className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-3 py-1.5 rounded-lg text-[10px] transition cursor-pointer",
                children: "Review"
              }
            ) })
          ] }, app.id)) })
        ] }) })
      ] });
    }
    if (activeSubView === "scholarships") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaAward, { className: "w-5 h-5 text-[#3665EE]" }),
              " Institutional Scholarship & Aid Cell"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "₹8.5 Crores in institutional merit aid and corporate scholarship grants" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Create Scholarship Fund", "Establish a new merit or need-based aid fund", [
                { label: "Scholarship Name", name: "title", type: "text", placeholder: "Alumni STEM Merit Aid" },
                { label: "Annual Fund Pool", name: "amount", type: "text", placeholder: "₹1.5 Crores" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Create Scholarship Fund"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          { title: "National STEM Merit Fellowship", pool: "₹3.5 Crores", applicants: "420 Applicants", disbursed: "₹2.8 Crores Disbursed", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
          { title: "Global AI & Innovation Merit Grant", pool: "₹2.5 Crores", applicants: "290 Applicants", disbursed: "₹2.0 Crores Disbursed", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
          { title: "Higher Education Equity Aid", pool: "₹1.5 Crores", applicants: "180 Applicants", disbursed: "₹1.2 Crores Disbursed", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" }
        ].map((sch, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border flex items-center justify-between ${sch.bg} ${sch.border} text-[#12163A] hover-card-lift`, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: sch.title }),
            /* @__PURE__ */ jsxs("span", { className: "text-[#3665EE] font-semibold", children: [
              "Pool: ",
              sch.pool,
              " • ",
              sch.applicants
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("div", { className: "font-extrabold text-sm text-[#12163A]", children: sch.disbursed }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-0.5 rounded-full font-bold", children: "Active Fund" })
          ] })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "placement-cell" || activeSubView === "drives") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaBriefcase, { className: "w-5 h-5 text-[#3665EE]" }),
              " Campus Placement Cell & Recruitment Hub"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Manage corporate placement drives, CTC packages, & interview schedules" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Schedule Placement Drive", "Publish a new corporate recruiting drive", [
                { label: "Company Name", name: "company", type: "text", placeholder: "Microsoft India" },
                { label: "Job Role Title", name: "role", type: "text", placeholder: "Software Development Engineer" },
                { label: "Annual CTC Package", name: "ctc", type: "text", placeholder: "₹24.0 LPA" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Schedule Placement Drive"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: drivesList.map((d, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: d.company }),
            /* @__PURE__ */ jsx("span", { className: "text-[#3665EE] font-semibold", children: d.role }),
            /* @__PURE__ */ jsx("div", { className: "text-[11px] text-[#4B5563]", children: d.applicants })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[#12163A] font-extrabold text-sm", children: d.ctc }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-0.5 rounded-full font-bold", children: d.status })
          ] })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "industry-connect") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaHandshake, { className: "w-5 h-5 text-[#3665EE]" }),
              " Industry Connect & Enterprise MoUs"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Corporate partnerships, R&D labs, and summer/winter internship tracks" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Register Corporate Partner", "Sign a new campus recruiting MoU", [
                { label: "Company Name", name: "company", type: "text", placeholder: "NVIDIA Graphics India" },
                { label: "Internship / MoU Track", name: "track", type: "text", placeholder: "AI Hardware & CUDA Labs" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Register Corporate Partner"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: partnersList.map((pr, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#F6E6D8] border-[#EAD0BC] space-y-2 text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold", children: pr.status }),
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: pr.company }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#3665EE] font-semibold", children: pr.track }),
          /* @__PURE__ */ jsx("div", { className: "text-[11px] text-[#4B5563]", children: pr.mou })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "analytics") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaArrowTrendUp, { className: "w-5 h-5 text-[#3665EE]" }),
            " Institutional Performance & Placement Analytics"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Placement trends, NIRF benchmarks, and corporate compensation distributions" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563]", children: "YoY Placement Growth" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#12163A] mt-1", children: "+5.1% YoY" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563]", children: "Software & AI Hiring Share" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#3665EE] mt-1", children: "62.0%" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#4B5563]", children: "Highest Package Recorded" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#12163A] mt-1", children: "₹110 LPA" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "notifications") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaBullhorn, { className: "w-5 h-5 text-[#3665EE]" }),
              " College Admin Notifications & Announcements"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Placement deadlines, MoU updates, and institutional accreditation alerts" })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => onShowToast("Marked all notifications as read"), className: "text-[#3665EE] font-bold hover:underline cursor-pointer", children: "Mark All as Read" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          { title: "Placement Drive Registrations Closing for Microsoft India", time: "15 mins ago", type: "Placement Alert", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
          { title: "National STEM Scholarship Disbursal Batch Approved", time: "2 hours ago", type: "Scholarship Disbursal", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
          { title: "NIRF Ranking Audit Verification Completed Successfully", time: "5 hours ago", type: "NIRF Audit", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" }
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
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaSliders, { className: "w-5 h-5 text-[#3665EE]" }),
          " College Governance & System Settings"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Configure institutional profile, academic year, campus settings, & user permissions" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "University Profile & NAAC Grade" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#4B5563]", children: "Indian Institute of Technology / University Desk • NIRF Rank #1 • NAAC A++" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Faculty & Placement Cell Permissions" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#4B5563]", children: "85 Placement Officers & Faculty Accounts • RBAC Access Enabled" })
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
  const [walletBalance, setWalletBalance] = useState(48500);
  const [hourlyRate, setHourlyRate] = useState(1500);
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
    } else {
      onShowToast(`Action completed: ${actionModalConfig.title}`);
    }
    setIsActionModalOpen(false);
  };
  const renderContent = () => {
    if (activeSubView === "overview") {
      return /* @__PURE__ */ jsxs("div", { className: "space-y-6 font-sans", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#12163A] text-white shadow-md space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-slate-300", children: "Assigned Mentees" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-white", children: "42 Students" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full inline-block", children: "Active Counseling" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#4B5563]", children: "Completed Sessions" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#3665EE]", children: "184 Hours" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-[#12163A]", children: "98% Rating" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#4B5563]", children: "Upcoming Today" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#12163A]", children: "6 Sessions" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-[#3665EE]", children: "Next at 2:00 PM" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#4B5563]", children: "Counselor Rating" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#12163A]", children: "4.9 / 5.0" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-[#12163A]", children: "Master Counselor" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-white text-[#12163A] shadow-sm border border-slate-200 space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#6B7280]", children: "Wallet Balance" }),
            /* @__PURE__ */ jsxs("div", { className: "text-2xl font-extrabold text-[#3665EE]", children: [
              "₹",
              walletBalance.toLocaleString()
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block", children: "Available" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-[#12163A]", children: "Dr. Rajesh Verma • Senior AI & Career Counselor" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#6B7280]", children: [
                "Ph.D. Computer Science (IIT Bombay) • Ex-Google Senior Tech Lead • Session Rate: ₹",
                hourlyRate,
                "/hr"
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "bg-[#E4F4EC] text-[#12163A] font-bold text-xs px-3.5 py-1 rounded-full border border-[#C3E6D5]", children: "✓ Verified Master Counselor" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] bg-[#DEE9FF] border border-[#C6D9FF] flex items-center justify-between text-[#12163A]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(FaClock, { className: "w-5 h-5 text-[#3665EE]" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Next Video Counseling Session" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-[#4B5563]", children: "Aarav Sharma (Grade 12-A) • AI & Machine Learning Pathway Strategy" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => onShowToast("Joining live video counseling session..."),
                className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md",
                children: [
                  /* @__PURE__ */ jsx(FaVideo, { className: "w-3.5 h-3.5" }),
                  " Start Video Session"
                ]
              }
            )
          ] })
        ] })
      ] });
    }
    if (activeSubView === "profile") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaUserCheck, { className: "w-5 h-5 text-[#3665EE]" }),
              " Mentor Profile & Verification Credentials"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Verified mentor badge, academic degrees, and professional biography" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openTriggerModal("Edit Profile & Rates", "Update mentor bio and session pricing", [
                { label: "Hourly Session Rate (₹)", name: "rate", type: "number", placeholder: "1500" },
                { label: "Bio / Specialization", name: "bio", type: "text", placeholder: "AI Architecture & Career Strategy" }
              ]),
              className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md",
              children: "Edit Profile & Rates"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-3 text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold", children: "Academic Background" }),
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Ph.D. Computer Science & Artificial Intelligence" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#4B5563]", children: "Indian Institute of Technology (IIT Bombay) • Specialization in Deep Learning & Neural Architectures" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] space-y-3 text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold", children: "Verification Status" }),
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "✓ Verified Master Mentor Badge" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#4B5563]", children: "Background Checked • Identity Verified • Approved for 1-on-1 High School & University Counseling" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "skills") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaBrain, { className: "w-5 h-5 text-[#3665EE]" }),
              " Mentorship Skill Matrix & Technical Domains"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Expertise domains for AI-driven student matching" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Add Mentorship Skill", "Add a new domain expertise for student counseling", [
                { label: "Skill / Domain Title", name: "name", type: "text", placeholder: "Cybersecurity Architecture" },
                { label: "Expertise Level", name: "level", type: "text", placeholder: "Expert" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Add Mentorship Skill"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: skillsList.map((s, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: s.name }),
            /* @__PURE__ */ jsx("span", { className: "text-[#3665EE] font-semibold", children: s.mentees })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-bold shadow-2xs", children: s.level })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "availability" || activeSubView === "calendar") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaCalendarDays, { className: "w-5 h-5 text-[#3665EE]" }),
              " Slot Booking & Availability Calendar"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Configure 1-on-1 counseling time slots and manage student bookings" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Add Available Slot", "Create a new time slot for student bookings", [
                { label: "Target Day", name: "day", type: "text", placeholder: "Tomorrow" },
                { label: "Time Slot", name: "time", type: "text", placeholder: "2:00 PM - 3:00 PM" },
                { label: "Counseling Topic", name: "topic", type: "text", placeholder: "1-on-1 Career Strategy" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
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
              /* @__PURE__ */ jsxs("span", { className: "font-bold text-[#3665EE]", children: [
                sl.day,
                " • ",
                sl.time
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-white border border-slate-200 text-[#12163A] px-2 py-0.5 rounded-md font-bold", children: sl.status })
            ] }),
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A] mt-1", children: sl.topic }),
            /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-[#4B5563]", children: [
              "Student: ",
              sl.mentee
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast(`Managed slot for ${sl.time}`),
              className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-3.5 py-1.5 rounded-xl cursor-pointer",
              children: "Manage Slot"
            }
          )
        ] }, sl.id)) })
      ] });
    }
    if (activeSubView === "student-requests" || activeSubView === "mentees") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaUsers, { className: "w-5 h-5 text-[#3665EE]" }),
            " Student Counseling Booking Requests"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Review pending mentorship booking requests and neural alignment scores" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: requestsList.map((req) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#F6E6D8] border-[#EAD0BC] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold", children: req.match }),
              /* @__PURE__ */ jsx("span", { className: "text-[#3665EE] font-bold", children: req.slot })
            ] }),
            /* @__PURE__ */ jsxs("h4", { className: "font-bold text-sm text-[#12163A] mt-1", children: [
              req.name,
              " • Goal: ",
              req.goal
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#4B5563]", children: [
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
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-3.5 py-1.5 rounded-xl cursor-pointer",
              children: "Accept Request"
            }
          ) })
        ] }, req.id)) })
      ] });
    }
    if (activeSubView === "video-sessions" || activeSubView === "counseling") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaVideo, { className: "w-5 h-5 text-[#3665EE]" }),
              " Live 1-on-1 Video Counseling Room"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "HD encrypted video room with live screen share & action plan notes" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Save Session Notes", "Record counseling takeaways and student action items", [
                { label: "Action Items for Student", name: "notes", type: "text", placeholder: "Complete PyTorch tutorial and ATS Resume update" }
              ]),
              className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md",
              children: [
                /* @__PURE__ */ jsx(FaFileLines, { className: "w-3.5 h-3.5" }),
                " Save Session Notes"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 rounded-[24px] bg-[#12163A] text-white text-center space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-[#3665EE] flex items-center justify-center mx-auto shadow-lg", children: /* @__PURE__ */ jsx(FaVideo, { className: "w-8 h-8 text-white" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: "Encrypted Video Counseling Room" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-300 max-w-md mx-auto", children: "Ready to launch 1-on-1 video call with Aarav Sharma (Grade 12-A). Camera and mic ready." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast("Camera & Microphone connected! Launching HD video stream."),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-6 py-2.5 rounded-xl cursor-pointer shadow-md transition hover:scale-105",
              children: "Launch Live Call Now"
            }
          )
        ] })
      ] });
    }
    if (activeSubView === "guidance") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaCompass, { className: "w-5 h-5 text-[#3665EE]" }),
              " Student Assessment Review & Career Guidance"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Review Holland Code DNA passports & issue customized career roadmaps" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Issue Career Action Plan", "Send structured action items to student portal", [
                { label: "Target Student", name: "student", type: "text", placeholder: "Aarav Sharma" },
                { label: "Recommended Milestone", name: "milestone", type: "text", placeholder: "Complete PyTorch Certification" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Issue Career Action Plan"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          { name: "Aarav Sharma", code: "RIE (Realistic, Investigative, Enterprising)", score: "Career Score 92/100", recommendation: "AI & ML Systems Engineering Track" },
          { name: "Ananya Roy", code: "ISA (Investigative, Social, Artistic)", score: "Career Score 88/100", recommendation: "Biotech & Bio-Informatics Track" }
        ].map((gd, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#E4F4EC] border-[#C3E6D5] text-[#12163A] space-y-2 hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: gd.name }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold", children: gd.score })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#3665EE] font-semibold", children: gd.code }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#4B5563]", children: [
            "Custom Strategy: ",
            gd.recommendation
          ] })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "ratings") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaStar, { className: "w-5 h-5 text-amber-500" }),
            " Student Ratings & Counselor Reviews"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Verified student feedback and rating breakdowns (4.9 / 5.0 Average Score)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl font-extrabold text-[#3665EE]", children: "4.9 / 5.0" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-[#12163A] mt-1", children: "Average Star Rating" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#4B5563]", children: "142 Total Reviews" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl font-extrabold text-[#12163A]", children: "98.4%" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-[#12163A] mt-1", children: "Student Satisfaction" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#4B5563]", children: "Top 1% Mentor Badge" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl font-extrabold text-[#12163A]", children: "184 Hrs" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-[#12163A] mt-1", children: "Counseling Experience" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#3665EE]", children: "Certified Master" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "wallet") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaWallet, { className: "w-5 h-5 text-[#3665EE]" }),
              " Mentor Wallet & Bank Payout Desk"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Track session earnings, wallet balance, & request direct bank transfers" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Request Payout Withdrawal", "Transfer earnings from wallet to verified bank account", [
                { label: "Withdrawal Amount (₹)", name: "amount", type: "number", placeholder: "10000" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaIndianRupeeSign, { className: "w-3.5 h-3.5" }),
                " Request Payout Withdrawal"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#12163A] text-white space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-300 font-semibold", children: "Available Wallet Balance" }),
            /* @__PURE__ */ jsxs("div", { className: "text-3xl font-extrabold text-white", children: [
              "₹",
              walletBalance.toLocaleString()
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full inline-block", children: "Ready for Withdrawal" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#4B5563] font-semibold", children: "Pending Escrow Balance" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#3665EE]", children: "₹12,000" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#4B5563]", children: "Releases after session completion" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A] space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#4B5563] font-semibold", children: "Total Lifetime Earnings" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#12163A]", children: "₹2,45,000" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#3665EE]", children: "HDFC Direct Transfer" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "notifications") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaBullhorn, { className: "w-5 h-5 text-[#3665EE]" }),
              " Mentor Notifications & Session Reminders"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Session alerts, booking requests, and payout confirmation receipts" })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => onShowToast("Marked all mentor alerts as read"), className: "text-[#3665EE] font-bold hover:underline cursor-pointer", children: "Mark All as Read" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          { title: "Session Reminder: Video call with Aarav Sharma in 15 mins", time: "10 mins ago", type: "Calendar Alert", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
          { title: "New 1-on-1 Counseling Booking Request from Karan Patel", time: "1 hour ago", type: "Booking Request", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
          { title: "Bank Payout Transfer of ₹18,000 Processed to HDFC Bank", time: "1 day ago", type: "Payout Receipt", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
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
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaSliders, { className: "w-5 h-5 text-[#3665EE]" }),
          " Mentor Settings & Account Preferences"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Configure session rates, camera/mic devices, & withdrawal bank details" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Session Pricing Settings" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[#4B5563]", children: [
            "Current Rate: ₹",
            hourlyRate,
            " / 60 Min Session • Auto-Accept Eligible Requests"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Payout Bank Account Details" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#4B5563]", children: "HDFC Bank • A/C No: •••• 4092 • IFSC: HDFC0001290 • Instant Payout Enabled" })
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
const StudentToolsViews = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  if (activeSubView === "discovery") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaCompass, { className: "w-5 h-5 text-[#3665EE]" }),
            " Career Discovery Engine"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Explore 500+ future-ready career paths curated by AI neural alignment" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search careers, skills, or degrees...",
            className: "px-3.5 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3665EE] bg-slate-50 text-[#12163A]"
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
              /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-bold shadow-2xs whitespace-nowrap", children: c.match }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-[#3665EE]", children: c.growth })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm truncate text-[#12163A]", children: c.title }),
            /* @__PURE__ */ jsx("div", { className: "font-bold text-xs text-[#3665EE]", children: c.salary }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: c.skills.map((sk, idx) => /* @__PURE__ */ jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-md bg-white/80 text-[#12163A] font-semibold", children: sk }, idx)) })
          ]
        },
        i
      )) })
    ] });
  }
  if (activeSubView === "assessment") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaListCheck, { className: "w-5 h-5 text-[#3665EE]" }),
            " Online Aptitude & Skill Assessment"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Timed cognitive & analytical reasoning test (Question 4 of 15)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[#12163A] font-mono font-bold bg-[#DEE9FF] border border-[#C6D9FF] px-3.5 py-1.5 rounded-xl", children: [
          /* @__PURE__ */ jsx(FaClock, { className: "w-3.5 h-3.5 text-[#3665EE]" }),
          " 18:45 Remaining"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[11px]", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold text-[#3665EE]", children: "Category: Logical & Spatial Reasoning" }),
          /* @__PURE__ */ jsx("span", { className: "text-[#4B5563]", children: "Score Weight: 25 Points" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-bold text-sm leading-relaxed text-[#12163A]", children: "If all Engineers are Problem Solvers, and some Problem Solvers use Neural Networks, which of the following statements MUST logically hold true?" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2.5 pt-2", children: [
          "A) All Engineers use Neural Networks",
          "B) Some Engineers are Problem Solvers who utilize computational logic",
          "C) No Problem Solvers are Engineers",
          "D) Neural Networks can only be designed by Engineers"
        ].map((opt, idx) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onShowToast(`Selected Option ${String.fromCharCode(65 + idx)}`),
            className: `w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${idx === 1 ? "bg-[#12163A] border-[#12163A] text-white font-bold" : "bg-white border-slate-200 hover:bg-[#F6E6D8] text-[#12163A]"}`,
            children: opt
          },
          idx
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 flex items-center justify-between border-t border-[#C6D9FF]", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => onShowToast("Navigated to previous question"), className: "px-4 py-2 rounded-xl font-bold border border-slate-300 bg-white text-[#12163A] hover:bg-slate-50 transition cursor-pointer", children: "Previous Question" }),
          /* @__PURE__ */ jsx("button", { onClick: () => onShowToast("Assessment answers submitted! AI Score generated."), className: "px-5 py-2.5 rounded-xl font-bold bg-[#12163A] text-white shadow-md cursor-pointer transition hover:bg-[#1A2050]", children: "Submit Assessment" })
        ] })
      ] })
    ] });
  }
  if (activeSubView === "psychometric") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaBrain, { className: "w-5 h-5 text-[#3665EE]" }),
          " RIASEC Psychometric & Personality Assessment"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Holland Code interest spectrum profiling (Rate your preference for each workplace scenario)" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
        { q: "I enjoy dissecting complex algorithmic code to find logical bottlenecks.", code: "Investigative (I)", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
        { q: "I prefer leading cross-functional teams to pitch new product ideas.", code: "Enterprising (E)", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
        { q: "I like sketching user experience mockups and visual interfaces.", code: "Artistic (A)", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
      ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border space-y-3 ${item.bg} ${item.border} text-[#12163A]`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-xs text-[#12163A]", children: item.q }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-1 rounded-lg font-bold shadow-2xs whitespace-nowrap", children: item.code })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 text-[11px] pt-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#6B7280]", children: "Strongly Disagree" }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: [1, 2, 3, 4, 5].map((val) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast(`Rated ${val} for scenario ${i + 1}`),
              className: `w-7 h-7 rounded-full font-bold transition cursor-pointer ${val === 4 && i === 0 ? "bg-[#12163A] text-white shadow-md" : "bg-white hover:bg-[#3665EE] hover:text-white text-[#12163A] border border-slate-200"}`,
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
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaBrain, { className: "w-5 h-5 text-[#3665EE]" }),
            " Career DNA Genome Profile & Aptitude Tracker"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Holland Code: RIE (Realistic • Investigative • Enterprising)" })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => onShowToast("Downloading official Career DNA Passport PDF"),
            className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 shrink-0",
            children: [
              /* @__PURE__ */ jsx(FaDownload, { className: "w-3.5 h-3.5 text-[#DEE9FF]" }),
              " Download DNA Passport"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-[#12163A] space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#4B5563]", children: "Aptitude Score" }),
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#3665EE] truncate", children: "96th Percentile" }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-[#12163A] bg-white/70 px-2 py-0.5 rounded-full inline-block", children: "Top 4% Nationally" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#12163A] text-white border border-[#12163A] space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold block text-slate-300", children: "Primary Personality" }),
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#E4F4EC] truncate", children: "Investigative" }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] text-slate-300", children: "Problem Solver & Analytical" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#4B5563]", children: "Stream Recommendation" }),
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#3665EE] truncate", children: "Science (PCM + CS)" }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-[#12163A]", children: "98.2% Fit Index" })
        ] })
      ] })
    ] });
  }
  if (activeSubView === "ai-recommendations") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaBrain, { className: "w-5 h-5 text-[#3665EE]" }),
          " AI Neural Recommendation Engine"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Predictive career alignment calculated from aptitude, interest, and industry demand" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
        { role: "Artificial Intelligence Architect", match: "98%", rationale: "High mathematical reasoning + top code proficiency fit.", bg: "bg-white", border: "border-slate-200" },
        { role: "Cloud Infrastructure Engineer", match: "94%", rationale: "Strong system design aptitude + cloud computing interest.", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
        { role: "Fintech Data Scientist", match: "91%", rationale: "Statistical affinity + quantitative problem-solving score.", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
        { role: "Cybersecurity Analyst", match: "89%", rationale: "High spatial logic + SOC framework understanding.", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
      ].map((rec, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${rec.bg} ${rec.border} text-[#12163A] hover-card-lift`, onClick: () => onShowToast(`Viewing detailed AI breakdown for ${rec.role}`), children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: rec.role }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] mt-1 text-[#4B5563]", children: rec.rationale })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-[#3665EE]", children: rec.match }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-[#12163A]", children: "Neural Match" })
        ] })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "scholarships") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaAward, { className: "w-5 h-5 text-[#3665EE]" }),
          " Scholarship & Merit Aid Explorer"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "₹12.5 Crores in active national, state, and corporate scholarships open for application" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
        { title: "National STEM Leadership Grant", provider: "Ministry of Science & Tech", amount: "₹3,50,000 / yr", deadline: "Closes in 12 Days", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
        { title: "Global AI & Innovation Merit Aid", provider: "Role Ready Foundation", amount: "₹2,00,000 / yr", deadline: "Closes in 18 Days", bg: "bg-white", border: "border-slate-200" },
        { title: "State Higher Education Equity Aid", provider: "State Government Desk", amount: "₹1,50,000 / yr", deadline: "Closes in 25 Days", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
      ].map((sch, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border flex items-center justify-between transition-all duration-200 ${sch.bg} ${sch.border} text-[#12163A] hover-card-lift`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: sch.title }),
          /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#3665EE]", children: [
            sch.provider,
            " • ",
            sch.deadline
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "font-extrabold text-sm text-[#12163A]", children: sch.amount }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast(`Submitted application for ${sch.title}!`),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer shadow-xs hover:scale-105 active:scale-95",
              children: "Apply Now"
            }
          )
        ] })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "colleges") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaGraduationCap, { className: "w-5 h-5 text-[#3665EE]" }),
          " University & College Explorer Directory"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Compare NIRF ranks, admission cutoffs, course offerings, and campus placements" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        { name: "Indian Institute of Technology (IIT Bombay)", rank: "NIRF #1", avgCtc: "₹28.5 LPA", cutoff: "JEE Adv < 500", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
        { name: "BITS Pilani (Main Campus)", rank: "NIRF #7", avgCtc: "₹24.0 LPA", cutoff: "BITSAT > 320", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
        { name: "IIIT Hyderabad", rank: "NIRF #12", avgCtc: "₹31.0 LPA", cutoff: "JEE Main < 1200", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" }
      ].map((col, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border space-y-2 cursor-pointer transition-all duration-200 ${col.bg} ${col.border} text-[#12163A] min-w-0 hover-card-lift`, onClick: () => onShowToast(`Added ${col.name} to Target Wishlist`), children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold", children: col.rank }),
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm truncate text-[#12163A]", children: col.name }),
        /* @__PURE__ */ jsxs("div", { className: "font-bold text-[#3665EE]", children: [
          "Avg CTC: ",
          col.avgCtc
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-[#4B5563]", children: [
          "Cutoff: ",
          col.cutoff
        ] })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "roadmap") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaArrowTrendUp, { className: "w-5 h-5 text-[#3665EE]" }),
          " Interactive Career Milestone Roadmap"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Step-by-step guidance from Class 10 to AI Engineering Leader" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
        { step: "Phase 1: Class 10th", desc: "Complete Career DNA test & select PCM + CS stream.", status: "Completed", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
        { step: "Phase 2: Class 12th & Entrances", desc: "Prepare JEE Advanced / BITSAT & achieve 95%+ in boards.", status: "In Progress", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
        { step: "Phase 3: Undergraduate Degree", desc: "B.Tech in Computer Science / AI & build 4 portfolio projects.", status: "Upcoming", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" },
        { step: "Phase 4: Industry Internship", desc: "6-month corporate internship with top tech enterprise.", status: "Upcoming", bg: "bg-white", border: "border-slate-200" }
      ].map((rd, i) => /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-[24px] border flex items-center justify-between ${rd.bg} ${rd.border} text-[#12163A] hover-card-lift`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-[#12163A] text-white flex items-center justify-center font-bold text-xs shrink-0", children: i + 1 }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: rd.step }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-[#4B5563]", children: rd.desc })
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] px-3 py-1 rounded-full font-bold border bg-white border-slate-200 text-[#12163A] shrink-0", children: rd.status })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "resume-ats") {
    return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaFileLines, { className: "w-5 h-5 text-[#3665EE]" }),
            " AI ATS Resume Score & Optimizer Dashboard"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Automated ATS scanner compliance & keyword density optimization" })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => onShowToast("Running AI Resume Optimizer scan..."),
            className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
            children: [
              /* @__PURE__ */ jsx(FaStar, { className: "w-3.5 h-3.5 text-[#DEE9FF]" }),
              " Run AI Resume Scan"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs text-center space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#6B7280]", children: "Overall ATS Score" }),
          /* @__PURE__ */ jsx("div", { className: "text-4xl font-extrabold text-[#3665EE]", children: "88 / 100" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold bg-[#12163A] text-white px-3 py-0.5 rounded-full inline-block", children: "Completion Badge: Navy" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#12163A]", children: "AI Suggestions" }),
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#12163A]", children: "92% Keyword Fit" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#4B5563]", children: "14/15 Target Skills Added" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center space-y-2 min-w-0 hover-card-lift", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#12163A]", children: "Achievements Grade" }),
          /* @__PURE__ */ jsx("div", { className: "text-4xl font-extrabold text-[#12163A]", children: "A+" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#4B5563]", children: "100% Parser Compliant" })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaBookOpen, { className: "w-5 h-5 text-[#3665EE]" }),
          " Skill Mastery & Learning Progress Tracker"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Track active courses, earned certification badges, and daily study streaks" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[#12163A] font-bold bg-[#E4F4EC] border border-[#C3E6D5] px-3.5 py-1.5 rounded-xl", children: [
        /* @__PURE__ */ jsx(FaFire, { className: "w-4 h-4 text-[#3665EE]" }),
        " 14-Day Streak!"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#12163A] text-white space-y-3 cursor-pointer hover-card-lift", onClick: () => onShowToast("Resumed Python AI module"), children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase font-bold text-[#DEE9FF]", children: "Continue Learning" }),
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-white", children: "Python for Data Science & AI" }),
        /* @__PURE__ */ jsx("div", { className: "w-full h-2.5 bg-white/20 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#3665EE] rounded-full", style: { width: "85%" } }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#DEE9FF] block font-bold", children: "85% Completed" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-[#12163A] space-y-3 cursor-pointer hover-card-lift", onClick: () => onShowToast("Opening System Design course"), children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase font-bold text-[#3665EE]", children: "Recommended Course" }),
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-[#12163A]", children: "System Design & Microservices" }),
        /* @__PURE__ */ jsx("div", { className: "w-full h-2.5 bg-white/80 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#3665EE] rounded-full", style: { width: "60%" } }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#4B5563] block font-bold", children: "60% Completed" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-[#12163A] space-y-3 cursor-pointer hover-card-lift", onClick: () => onShowToast("Viewing Cloud Cert badge"), children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase font-bold text-[#12163A]", children: "Achievement Badge" }),
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-[#12163A]", children: "Cloud Architecture (AWS)" }),
        /* @__PURE__ */ jsx("div", { className: "w-full h-2.5 bg-white/80 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#3665EE] rounded-full", style: { width: "45%" } }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#12163A] block font-bold", children: "Foundational Certification Earned" })
      ] })
    ] })
  ] });
};
const TrainingDashboard = ({
  activeSubView,
  onShowToast,
  isDarkMode
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            /* @__PURE__ */ jsx(FaBookOpen, { className: "w-5 h-5 text-blue-500" }),
            " Skill Courses & Curriculum Track Page"
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
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: coursesList.map((c, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border space-y-2 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast(`Opened course details for ${c.title}`), children: [
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
        /* @__PURE__ */ jsx(FaAward, { className: "w-5 h-5 text-blue-500" }),
        " Certifications Registry Page"
      ] }),
      /* @__PURE__ */ jsx("p", { className: textMuted, children: "Industry-accredited digital credentials issued to trainees" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
        { name: "Aarav Sharma", cert: "Certified Full Stack AI Specialist", date: "2026-02-28", id: "CERT-AI-9941" },
        { name: "Riya Sen", cert: "Cloud Infrastructure Specialist", date: "2026-02-25", id: "CERT-CL-8820" }
      ].map((ct, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast(`Verifying certificate ${ct.id}`), children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: `font-bold ${textHeading}`, children: ct.name }),
          /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-semibold", children: ct.cert })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("span", { className: "text-emerald-400 font-mono font-bold", children: ct.id }),
          /* @__PURE__ */ jsx("div", { className: `text-[10px] ${textMuted}`, children: ct.date })
        ] })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "hiring") {
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("h2", { className: `text-lg font-bold flex items-center gap-2 ${textHeading}`, children: [
        /* @__PURE__ */ jsx(FaHandshake, { className: "w-5 h-5 text-blue-500" }),
        " Hiring Partner Enterprises Page"
      ] }),
      /* @__PURE__ */ jsx("p", { className: textMuted, children: "64 Corporate partners recruiting directly from institute bootcamps" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: ["Infosys", "TCS", "Accenture", "Cognizant", "Capgemini", "Wipro", "HCL Tech", "Tech Mahindra"].map((hp, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border font-bold flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast(`Opened MoU details for ${hp}`), children: [
        /* @__PURE__ */ jsx("span", { className: textHeading, children: hp }),
        /* @__PURE__ */ jsx("span", { className: "text-emerald-400 text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30", children: "MoU Signed" })
      ] }, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `pb-4 border-b ${borderDivider}`, children: [
      /* @__PURE__ */ jsxs("h2", { className: `text-lg font-bold flex items-center gap-2 ${textHeading}`, children: [
        /* @__PURE__ */ jsx(FaChalkboardUser, { className: "w-5 h-5 text-blue-500" }),
        " Training Institute Portal Overview"
      ] }),
      /* @__PURE__ */ jsx("p", { className: textMuted, children: "Skill bootcamps, certified trainees, accreditation tracks, and hiring enterprise ties" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Trainee Cohorts"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-semibold block ${textMuted}`, children: "Active Trainees" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-blue-400 mt-1", children: "2,900" }),
        /* @__PURE__ */ jsx("span", { className: `text-[10px] ${textMuted}`, children: "12 Certified Bootcamps" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Certification Rates"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-semibold block ${textMuted}`, children: "Cert Completion" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-emerald-400 mt-1", children: "91.4%" }),
        /* @__PURE__ */ jsx("span", { className: `text-[10px] ${textMuted}`, children: "Industry Accredited" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Hiring Partners"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-semibold block ${textMuted}`, children: "Placement Partners" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-blue-400 mt-1", children: "64 Companies" }),
        /* @__PURE__ */ jsx("span", { className: `text-[10px] ${textMuted}`, children: "Tech & Cloud Tracks" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Employment Index"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-semibold block ${textMuted}`, children: "Employment Index" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-emerald-400 mt-1", children: "88%" }),
        /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-bold", children: [
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
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalConfig, setActionModalConfig] = useState({
    title: "",
    subtitle: "",
    fields: []
  });
  const [jobsList, setJobsList] = useState([
    { id: "JOB-101", title: "Cloud Solutions Engineer", ctc: "₹28.0 LPA", location: "Bengaluru / Remote", applicants: 420, status: "Active Requisition" },
    { id: "JOB-102", title: "AI & MLOps Scientist", ctc: "₹35.0 LPA", location: "Hyderabad", applicants: 180, status: "Shortlisting Phase" },
    { id: "JOB-103", title: "Quant Financial Analyst", ctc: "₹24.0 LPA", location: "Mumbai", applicants: 310, status: "Interview Phase" },
    { id: "JOB-104", title: "Full-Stack Software Engineer", ctc: "₹18.0 LPA", location: "Gurugram", applicants: 330, status: "Active Requisition" }
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
  const handleModalFormSubmit = (data) => {
    if (actionModalConfig.title === "Post New Job Requisition") {
      const newJob = {
        id: `JOB-${Math.floor(100 + Math.random() * 900)}`,
        title: data.title || "Software Engineer",
        ctc: data.ctc || "₹20.0 LPA",
        location: data.location || "Bengaluru",
        applicants: 1,
        status: "Active Requisition"
      };
      setJobsList([newJob, ...jobsList]);
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
  const renderContent = () => {
    if (activeSubView === "overview") {
      return /* @__PURE__ */ jsxs("div", { className: "space-y-6 font-sans", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#12163A] text-white shadow-md border border-[#12163A] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-slate-300", children: "Active Job Postings" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-white", children: "18 Roles" }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-[#E4F4EC] bg-[#E4F4EC]/10 px-2 py-0.5 rounded-full inline-block", children: "Across 6 Global Offices" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] text-[#12163A] shadow-sm border border-[#C6D9FF] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#4B5563]", children: "Applications Received" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#3665EE]", children: "1,240" }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-[#12163A]", children: "AI Resume Screened" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] text-[#12163A] shadow-sm border border-[#EAD0BC] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#4B5563]", children: "Avg ATS Score Fit" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#12163A]", children: "88%" }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-[#3665EE]", children: "High Skill Alignment" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] text-[#12163A] shadow-sm border border-[#C3E6D5] space-y-2 hover-card-lift", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold block text-[#4B5563]", children: "Offers Extended" }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-[#12163A]", children: "42 Extended" }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-[#12163A]", children: "38 Offers Accepted" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-white border border-slate-200 shadow-xs space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-base text-[#12163A]", children: "Google Cloud India • Enterprise Corporate Hiring Desk" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-[#6B7280]", children: "CIN: U72200MH2020PTC123456 • Verified Campus Hiring Partner" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "bg-[#E4F4EC] text-[#12163A] font-bold text-xs px-3.5 py-1 rounded-full border border-[#C3E6D5]", children: "✓ Verified Corporate Employer" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] bg-[#DEE9FF] border border-[#C6D9FF] flex items-center justify-between text-[#12163A]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(FaCalendarDays, { className: "w-5 h-5 text-[#3665EE]" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Upcoming Campus Placement Drive" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-[#4B5563]", children: "IIT Bombay • 12th August 2026 • 480 Registered Candidates" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onShowToast("Navigated to IIT Bombay Campus Hiring Control"),
                className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer shadow-md",
                children: "Manage Drive"
              }
            )
          ] })
        ] })
      ] });
    }
    if (activeSubView === "verification") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaBuilding, { className: "w-5 h-5 text-[#3665EE]" }),
              " Company Profile & Enterprise Verification"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Verified employer badge, corporate registration, & campus hiring agreements" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openTriggerModal("Edit Corporate Profile", "Update company description and logo", [
                { label: "Company Name", name: "name", type: "text", placeholder: "Google Cloud India" },
                { label: "Headquarters", name: "location", type: "text", placeholder: "Bengaluru, India" }
              ]),
              className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md",
              children: "Edit Corporate Profile"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-3 text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold", children: "Corporate Identity" }),
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Google Cloud India Pvt Ltd" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#4B5563]", children: "CIN: U72200MH2020PTC123456 • Tax ID Verified • NAAC Campus MoU Approved" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] space-y-3 text-[#12163A]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold", children: "Verification Status" }),
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "✓ Verified Corporate Employer" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#4B5563]", children: "Verified Employer • Direct Campus Placement Rights • AI Resume Access Enabled" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "jobs") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaFileLines, { className: "w-5 h-5 text-[#3665EE]" }),
              " Job & Internship Requisitions Hub"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Manage active job descriptions, CTC packages, & applicant pipelines" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Post New Job Requisition", "Publish a new job opening to university students", [
                { label: "Job Role Title", name: "title", type: "text", placeholder: "Cloud Solutions Engineer" },
                { label: "Annual CTC Package", name: "ctc", type: "text", placeholder: "₹28.0 LPA" },
                { label: "Office Location", name: "location", type: "text", placeholder: "Bengaluru / Remote" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Post New Job Requisition"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: jobsList.map((j) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-[#12163A] text-white px-2 py-0.5 rounded-md font-bold", children: j.id }),
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: j.title })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#4B5563] mt-1", children: [
              j.location,
              " • ",
              j.applicants,
              " Candidates Applied"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[#3665EE] font-extrabold text-sm", children: j.ctc }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-0.5 rounded-full font-bold", children: j.status })
          ] })
        ] }, j.id)) })
      ] });
    }
    if (activeSubView === "campus-hiring") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaGraduationCap, { className: "w-5 h-5 text-[#3665EE]" }),
              " University Campus Placement Drives"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Partner universities, campus drive schedules, & candidate rosters" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Register Campus Drive", "Schedule a new placement drive at a partner university", [
                { label: "University Name", name: "university", type: "text", placeholder: "IIT Bombay" },
                { label: "Drive Date", name: "date", type: "text", placeholder: "12th August 2026" },
                { label: "Hiring Roles", name: "roles", type: "text", placeholder: "AI & Cloud Engineers" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Register Campus Drive"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: campusList.map((c, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#F6E6D8] border-[#EAD0BC] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: c.university }),
            /* @__PURE__ */ jsx("span", { className: "text-[#3665EE] font-semibold", children: c.roles }),
            /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-[#4B5563]", children: [
              "Drive Date: ",
              c.driveDate,
              " • ",
              c.students
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-white border border-slate-200 text-[#12163A] px-2.5 py-0.5 rounded-full font-bold", children: c.status })
        ] }, i)) })
      ] });
    }
    if (activeSubView === "student-search") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaMagnifyingGlass, { className: "w-5 h-5 text-[#3665EE]" }),
            " Global Student Talent Search Engine"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Search 50,000+ verified student resumes by skills, ATS fit, and degree" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search candidates by skill e.g. Python, PyTorch, C++...",
              className: "flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-[#12163A] focus:outline-none focus:ring-2 focus:ring-[#3665EE]"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast("Executed Neural Talent Search across 50,000+ candidate profiles!"),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-6 py-2.5 rounded-xl transition cursor-pointer shadow-md",
              children: "Search Talent Database"
            }
          )
        ] }) })
      ] });
    }
    if (activeSubView === "ai-match" || activeSubView === "matcher") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaBrain, { className: "w-5 h-5 text-[#3665EE]" }),
            " AI Neural Candidate Matcher Engine"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Screen candidates using AI ATS fit algorithms and skill alignment" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          { name: "Aarav Sharma", college: "IIT Bombay", match: "98% Neural Match", role: "AI & MLOps Scientist", skills: ["Python", "PyTorch", "MLOps"], score: "ATS Score 96/100" },
          { name: "Ananya Roy", college: "BITS Pilani", match: "94% Neural Match", role: "Cloud Solutions Engineer", skills: ["AWS", "Docker", "Go"], score: "ATS Score 91/100" }
        ].map((cand, i) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#E4F4EC] border-[#C3E6D5] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold", children: cand.match }),
              /* @__PURE__ */ jsx("span", { className: "text-[#3665EE] font-bold", children: cand.score })
            ] }),
            /* @__PURE__ */ jsxs("h4", { className: "font-bold text-sm text-[#12163A] mt-1", children: [
              cand.name,
              " • ",
              cand.college
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#4B5563]", children: [
              "Target Role: ",
              cand.role
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onShowToast(`Shortlisted ${cand.name} for technical interview!`),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer shadow-md",
              children: "Shortlist Candidate"
            }
          )
        ] }, i)) })
      ] });
    }
    if (activeSubView === "interviews") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaCalendarDays, { className: "w-5 h-5 text-[#3665EE]" }),
              " Scheduled Candidate Interviews"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Interview panel schedules, evaluation rubrics, & video interview links" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Schedule Candidate Interview", "Set up a technical or HR interview round", [
                { label: "Candidate Name", name: "candidate", type: "text", placeholder: "Aarav Sharma" },
                { label: "Job Role", name: "role", type: "text", placeholder: "AI & MLOps Scientist" },
                { label: "Date & Time", name: "time", type: "text", placeholder: "Tomorrow, 3:00 PM" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Schedule Candidate Interview"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: interviewsList.map((int) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-[20px] border bg-[#DEE9FF] border-[#C6D9FF] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold text-[#3665EE]", children: int.time }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-white border border-slate-200 text-[#12163A] px-2 py-0.5 rounded-md font-bold", children: int.status })
            ] }),
            /* @__PURE__ */ jsxs("h4", { className: "font-bold text-sm text-[#12163A] mt-1", children: [
              int.candidate,
              " • Role: ",
              int.role
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-[#4B5563]", children: [
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
              className: "bg-[#12163A] hover:bg-[#1A2050] text-white font-bold px-3.5 py-1.5 rounded-xl cursor-pointer",
              children: "Join Video Call"
            }
          )
        ] }, int.id)) })
      ] });
    }
    if (activeSubView === "offers") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaAward, { className: "w-5 h-5 text-[#3665EE]" }),
              " Offer Letters & Compensation (CTC) Desk"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Manage offer rollouts, CTC packages, & candidate acceptance tracking" })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openTriggerModal("Issue Offer Letter", "Send official offer letter to selected candidate", [
                { label: "Candidate Name", name: "candidate", type: "text", placeholder: "Aarav Sharma" },
                { label: "Offered Role", name: "role", type: "text", placeholder: "AI & MLOps Scientist" },
                { label: "Annual CTC Package", name: "ctc", type: "text", placeholder: "₹35.0 LPA" }
              ]),
              className: "bg-[#3665EE] hover:bg-[#2A54D5] text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-md hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(FaPlus, { className: "w-3.5 h-3.5" }),
                " Issue Offer Letter"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: offersList.map((off) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] border bg-[#E4F4EC] border-[#C3E6D5] flex items-center justify-between text-[#12163A] hover-card-lift", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: off.candidate }),
            /* @__PURE__ */ jsxs("span", { className: "text-[#3665EE] font-semibold", children: [
              off.role,
              " • CTC: ",
              off.ctc
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-[#12163A] text-white px-2.5 py-0.5 rounded-full font-bold", children: off.status })
        ] }, off.id)) })
      ] });
    }
    if (activeSubView === "hiring-analytics") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
            /* @__PURE__ */ jsx(FaArrowTrendUp, { className: "w-5 h-5 text-[#3665EE]" }),
            " Enterprise Hiring Analytics & Talent Funnel"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Recruitment efficiency, time-to-hire metrics, & campus conversion rates" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl font-extrabold text-[#3665EE]", children: "14 Days" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-[#12163A] mt-1", children: "Average Time-to-Hire" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#4B5563]", children: "50% Faster than Industry" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#E4F4EC] border border-[#C3E6D5] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl font-extrabold text-[#12163A]", children: "90.4%" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-[#12163A] mt-1", children: "Offer Acceptance Rate" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#4B5563]", children: "38 Accepted / 42 Extended" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] text-center text-[#12163A]", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl font-extrabold text-[#12163A]", children: "42.0%" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-[#12163A] mt-1", children: "Diversity Hiring Ratio" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-[#3665EE]", children: "Verified DEI Metric" })
          ] })
        ] })
      ] });
    }
    if (activeSubView === "notifications") {
      return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white border border-slate-200 p-6 space-y-6 text-xs font-sans shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
              /* @__PURE__ */ jsx(FaBullhorn, { className: "w-5 h-5 text-[#3665EE]" }),
              " Recruiter Notifications & Hiring Alerts"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Candidate applications, interview confirmations, and offer acceptance receipts" })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => onShowToast("Marked all recruiter alerts as read"), className: "text-[#3665EE] font-bold hover:underline cursor-pointer", children: "Mark All as Read" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
          { title: "Aarav Sharma Accepted & Signed Offer Letter for ₹35.0 LPA!", time: "15 mins ago", type: "Offer Accepted", bg: "bg-[#E4F4EC]", border: "border-[#C3E6D5]" },
          { title: "IIT Bombay Placement Drive Registration Approved", time: "2 hours ago", type: "Campus Drive", bg: "bg-[#DEE9FF]", border: "border-[#C6D9FF]" },
          { title: "New Candidate Application Received for AI Scientist Role", time: "4 hours ago", type: "Applicant Alert", bg: "bg-[#F6E6D8]", border: "border-[#EAD0BC]" }
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
      /* @__PURE__ */ jsxs("div", { className: "pb-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold flex items-center gap-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx(FaSliders, { className: "w-5 h-5 text-[#3665EE]" }),
          " Recruiter Governance & System Settings"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[#6B7280]", children: "Configure enterprise team permissions, ATS integrations, & interviewer panels" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#DEE9FF] border border-[#C6D9FF] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "ATS Integration & API Keys" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#4B5563]", children: "Role Ready AI Neural Matcher v2.4 Connected • Real-time Sync Active" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-[24px] bg-[#F6E6D8] border border-[#EAD0BC] space-y-2 text-[#12163A]", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm text-[#12163A]", children: "Interviewer Panel Access Control" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#4B5563]", children: "24 Enterprise Interviewer Accounts • RBAC Access Enabled" })
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
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between pb-4 border-b ${borderDivider}`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: `text-lg font-bold flex items-center gap-2 ${textHeading}`, children: [
            /* @__PURE__ */ jsx(FaBriefcase, { className: "w-5 h-5 text-blue-500" }),
            " Corporate Internship Programs Page"
          ] }),
          /* @__PURE__ */ jsx("p", { className: textMuted, children: "Summer & Winter internship cohorts for university engineering students" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsModalOpen(true),
            className: "bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-500/20",
            children: "+ Launch Internship Drive"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: internshipsList.map((inProg, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 ${subCardClass}`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: `font-bold text-sm ${textHeading}`, children: inProg.cohort }),
          /* @__PURE__ */ jsxs("span", { className: "text-blue-400 font-semibold", children: [
            inProg.duration,
            " • Stipend: ",
            inProg.stipend
          ] }),
          /* @__PURE__ */ jsx("div", { className: `text-[11px] ${textMuted}`, children: inProg.interns })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 font-bold", children: inProg.ppo })
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
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("h2", { className: `text-lg font-bold flex items-center gap-2 ${textHeading}`, children: [
        /* @__PURE__ */ jsx(FaGraduationCap, { className: "w-5 h-5 text-blue-500" }),
        " Campus University MoUs Page"
      ] }),
      /* @__PURE__ */ jsx("p", { className: textMuted, children: "45 Partner universities with signed corporate recruitment MoUs" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: ["IIT Bombay MoU", "IIT Delhi MoU", "BITS Pilani MoU", "NIT Trichy MoU", "DTU Delhi MoU"].map((mou, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border font-bold flex items-center justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast(`Opened MoU record for ${mou}`), children: [
        /* @__PURE__ */ jsx("span", { className: textHeading, children: mou }),
        /* @__PURE__ */ jsx("span", { className: "text-emerald-400 text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30", children: "Active MoU" })
      ] }, i)) })
    ] });
  }
  if (activeSubView === "pipeline") {
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("h2", { className: `text-lg font-bold flex items-center gap-2 ${textHeading}`, children: [
        /* @__PURE__ */ jsx(FaUsersGear, { className: "w-5 h-5 text-blue-500" }),
        " Talent Funnel Pipeline Page"
      ] }),
      /* @__PURE__ */ jsx("p", { className: textMuted, children: "Pipeline stage metrics from campus sourcing to PPO conversion" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
        { stage: "Sourced Candidates", count: "4,200", sub: "Top 45 Universities" },
        { stage: "Shortlisted for Test", count: "1,450", sub: "Coding & Aptitude Round" },
        { stage: "Interview Cleared", count: "620", sub: "Technical + HR Cleared" },
        { stage: "PPO Offered", count: "480", sub: "Full Time Pre-Placement" }
      ].map((pip, i) => /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border space-y-1 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast(`Viewing stage pipeline for ${pip.stage}`), children: [
        /* @__PURE__ */ jsx("span", { className: `font-semibold block ${textMuted}`, children: pip.stage }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-blue-400", children: pip.count }),
        /* @__PURE__ */ jsx("span", { className: `text-[11px] ${textMuted}`, children: pip.sub })
      ] }, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 space-y-6 text-xs font-sans transition-colors duration-200 ${cardClass}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `pb-4 border-b ${borderDivider}`, children: [
      /* @__PURE__ */ jsxs("h2", { className: `text-lg font-bold flex items-center gap-2 ${textHeading}`, children: [
        /* @__PURE__ */ jsx(FaBuilding, { className: "w-5 h-5 text-blue-500" }),
        " Enterprise Company Portal Overview"
      ] }),
      /* @__PURE__ */ jsx("p", { className: textMuted, children: "Corporate internship drives, university MoUs, intern enrollment, and PPO conversions" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Internship Drives"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-semibold block ${textMuted}`, children: "Internship Drives" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-blue-400 mt-1", children: "12 Drives" }),
        /* @__PURE__ */ jsx("span", { className: `text-[10px] ${textMuted}`, children: "Summer & Winter Tracks" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Campus MoUs"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-semibold block ${textMuted}`, children: "Partner Universities" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-blue-400 mt-1", children: "45 Colleges" }),
        /* @__PURE__ */ jsx("span", { className: `text-[10px] ${textMuted}`, children: "Direct MoUs Signed" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Enrolled Interns"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-semibold block ${textMuted}`, children: "Enrolled Interns" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-emerald-400 mt-1", children: "620 Interns" }),
        /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-bold", children: [
          /* @__PURE__ */ jsx(FaArrowTrendUp, { className: "w-3 h-3" }),
          " 78% PPO Conversion Rate"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 ${subCardClass}`, onClick: () => onShowToast("Viewing Monthly Stipends"), children: [
        /* @__PURE__ */ jsx("span", { className: `font-semibold block ${textMuted}`, children: "Monthly Stipend" }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-extrabold text-emerald-400 mt-1", children: "₹35,000 / mo" }),
        /* @__PURE__ */ jsx("span", { className: `text-[10px] ${textMuted}`, children: "Competitive Package" })
      ] })
    ] })
  ] });
};
const RoleWorkspaceViews = ({
  currentWorkspace,
  activeSubView,
  onShowToast,
  isDarkMode = false
}) => {
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
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(FaBuildingUser, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: `text-2xl font-extrabold mb-1 ${textHeading}`, children: totalEntities }),
        /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-semibold text-emerald-400 flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(FaArrowTrendUp, { className: "w-3.5 h-3.5" }),
          " +14.2% active growth"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border transition ${cardBg}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: `text-xs font-semibold ${textMuted}`, children: "Active Seat Quotas" }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(FaUsersGear, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: `text-2xl font-extrabold mb-1 ${textHeading}`, children: totalSeats.toLocaleString() }),
        /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-semibold text-blue-400 flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(FaShieldHalved, { className: "w-3.5 h-3.5" }),
          " 84.6% allocated"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border transition ${cardBg}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: `text-xs font-semibold ${textMuted}`, children: "AI Career DNA Runs" }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(FaBrain, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: `text-2xl font-extrabold mb-1 ${textHeading}`, children: "2.8M" }),
        /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-semibold text-emerald-400 flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(FaArrowTrendUp, { className: "w-3.5 h-3.5" }),
          " 99.4% Latency <450ms"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border transition ${cardBg}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: `text-xs font-semibold ${textMuted}`, children: "Pending Approvals" }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(FaClock, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: `text-2xl font-extrabold mb-1 ${textHeading}`, children: pendingCount }),
        /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold text-amber-400 flex items-center gap-1", children: "Action required by Admin" })
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
      /* @__PURE__ */ jsx("h2", { className: `text-lg font-bold ${textHeading}`, children: "Partner Access & Ecosystem Governance" }),
      /* @__PURE__ */ jsx("p", { className: `text-xs ${textMuted}`, children: "Super Admin authorization hub for Schools, Colleges, Mentors, Training Academies, Recruiters & Companies" })
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
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "APPROVAL WORKFLOW PIPELINE" }),
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "DOCUMENT & BG VERIFICATION" }),
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4", children: "SUBSCRIPTION TIER" }),
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 rounded-r-xl text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: `divide-y text-xs ${borderDivider}`, children: filteredEntities.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", { colSpan: 7, className: `py-12 text-center ${textMuted}`, children: [
        /* @__PURE__ */ jsx(Building2, { className: "w-10 h-10 mx-auto text-blue-400 mb-2 opacity-60" }),
        "No partner entities match the selected filter or search term."
      ] }) }) : filteredEntities.map((e) => {
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
                title: `Click email to open ${e.role.toUpperCase()} Workspace Dashboard`,
                className: "font-bold text-[#3665EE] hover:underline cursor-pointer text-left block",
                children: e.contactEmail
              }
            ),
            /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-blue-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Globe, { className: "w-3 h-3" }),
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
            /* @__PURE__ */ jsxs("div", { className: "text-[9px] text-slate-400 font-mono flex flex-wrap gap-1 pt-0.5", children: [
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
              /* @__PURE__ */ jsx("span", { className: "text-emerald-500 font-bold", children: "7. Live" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("td", { className: "py-4 px-4 max-w-xs space-y-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3 h-3 text-emerald-500" }),
              /* @__PURE__ */ jsx("span", { children: e.docsStatus || "Document Verification Pending" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-slate-500 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3 text-blue-400" }),
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
      /* @__PURE__ */ jsx("div", { className: "font-semibold text-blue-400", children: "All entity state managed via TanStack Query" })
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
          /* @__PURE__ */ jsx("h2", { className: `text-lg font-bold ${textHeading}`, children: "Role-Based Access Control (RBAC) Matrix" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-xs mt-1 ${textMuted}`, children: "Configure granular module permissions and data visibility policies across all 7 partner role verticals" })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleSave,
          className: "flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer",
          children: [
            /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: "Save Global RBAC Matrix" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse text-xs", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: `border-b text-[11px] font-bold uppercase tracking-wider ${isDarkMode ? "bg-slate-800/80 text-slate-300 border-slate-700" : "bg-slate-50/50 text-slate-400 border-slate-200"}`, children: [
        /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 rounded-l-xl", children: "Platform Module / Capability" }),
        roles.map((r) => /* @__PURE__ */ jsx("th", { className: "py-3.5 px-4 text-center", children: r }, r))
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: `divide-y ${borderDivider}`, children: rbacModules.map((mod, idx) => /* @__PURE__ */ jsxs("tr", { className: `transition ${isDarkMode ? "hover:bg-slate-800/60" : "hover:bg-blue-50/40"}`, children: [
        /* @__PURE__ */ jsx("td", { className: `py-4 px-4 font-bold ${textHeading}`, children: mod.name }),
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
        /* @__PURE__ */ jsx("h2", { className: `text-lg font-bold ${textHeading}`, children: "AI Career Intelligence Engine Configuration" })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-400" }),
        " Custom ML Models Operational"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mt-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-5 text-xs", children: [
        /* @__PURE__ */ jsxs("h3", { className: `font-bold text-sm flex items-center gap-2 ${textHeading}`, children: [
          /* @__PURE__ */ jsx(Sliders, { className: "w-4 h-4 text-blue-500" }),
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
            className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition cursor-pointer",
            children: "Apply AI Recommendation Weights"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `p-5 rounded-2xl border ${subCardClass}`, children: [
        /* @__PURE__ */ jsx("h3", { className: `font-bold text-sm mb-4 ${textHeading}`, children: "AI Microservice Telemetry" }),
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
  if (showFullTable) {
    return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 mb-8 font-sans transition-colors duration-200 ${cardClass}`, children: [
      /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between mb-6 pb-4 border-b ${borderDivider}`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: `text-lg font-bold ${textHeading}`, children: "System Security Audit Logs" }),
          /* @__PURE__ */ jsx("p", { className: `text-xs ${textMuted}`, children: "Immutable record of all Super Admin access grants and permission changes" })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: `flex items-center gap-2 font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer ${isDarkMode ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`, children: [
          /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: "Export Log CSV" })
        ] })
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
        /* @__PURE__ */ jsx("tbody", { className: `divide-y ${borderDivider}`, children: logs.map((log) => /* @__PURE__ */ jsxs("tr", { className: `transition ${isDarkMode ? "hover:bg-slate-800/60" : "hover:bg-blue-50/40"}`, children: [
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
        /* @__PURE__ */ jsx(ShieldCheck, { className: "w-5 h-5 text-blue-400" }),
        /* @__PURE__ */ jsx("h3", { className: `font-bold text-sm ${textHeading}`, children: "Live Governance Audit Feed" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-500/30", children: "Real-Time Audit Active" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3 text-xs", children: logs.slice(0, 5).map((log) => /* @__PURE__ */ jsxs("div", { className: `p-3 rounded-xl border flex items-center justify-between transition ${isDarkMode ? "bg-slate-800/80 border-slate-700/80" : "bg-blue-50/40 border-blue-100"}`, children: [
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
      /* @__PURE__ */ jsx("h3", { className: `font-bold text-sm mb-4 ${textHeading}`, children: "Registered Ecosystem Partner Breakdown" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs", children: [
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
                  /* @__PURE__ */ jsx("div", { className: `font-bold ${textHeading}`, children: v.name }),
                  /* @__PURE__ */ jsx("div", { className: `text-[11px] ${textMuted}`, children: v.count })
                ] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/30", children: "Active" })
            ]
          },
          i
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsx(AuditFeed, { logs: auditLogs, isDarkMode }),
      /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-6 ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-blue-100 text-slate-900 shadow-xs"}`, children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm mb-3", children: "TanStack Query Cache Telemetry" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: `flex justify-between p-2.5 rounded-xl ${isDarkMode ? "bg-slate-800 text-slate-300" : "bg-blue-50/50 text-slate-600"}`, children: [
            /* @__PURE__ */ jsx("span", { children: "Entities Cached Records" }),
            /* @__PURE__ */ jsxs("strong", { className: "text-blue-400", children: [
              entities.length,
              " items"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `flex justify-between p-2.5 rounded-xl ${isDarkMode ? "bg-slate-800 text-slate-300" : "bg-blue-50/50 text-slate-600"}`, children: [
            /* @__PURE__ */ jsx("span", { children: "Audit Stream Cached Records" }),
            /* @__PURE__ */ jsxs("strong", { className: "text-blue-400", children: [
              auditLogs.length,
              " logs"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `flex justify-between p-2.5 rounded-xl ${isDarkMode ? "bg-slate-800 text-slate-300" : "bg-blue-50/50 text-slate-600"}`, children: [
            /* @__PURE__ */ jsx("span", { children: "Active Workspace" }),
            /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-mono font-bold", children: "SUPER-ADMIN" })
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
    "enterprise": "company"
  };
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const rawPathRole = ((_a2 = pathSegments[0]) == null ? void 0 : _a2.toLowerCase()) || "";
  const rawParamRole = (params.role || "").toLowerCase();
  const resolvedRole = roleAliasMap[rawParamRole] || roleAliasMap[rawPathRole] || "super-admin";
  const currentWorkspace = resolvedRole;
  const activeSubView = (params["*"] || pathSegments[1] || "overview").toLowerCase().replace(/^\//, "") || "overview";
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
      "notifications": "School Admin Notifications",
      "settings": "School Governance & Settings",
      "programs": "Academic Programs & Degree Tracks",
      "admissions": "College Admissions & Cutoff Management",
      "applications": "Student Applications & Enrollment Pipeline",
      "scholarships": "Institutional Scholarship & Aid Cell",
      "placement-cell": "Campus Placement Cell & Drive Hub",
      "industry-connect": "Corporate Recruiter & Industry MoUs",
      "profile": "Mentor Profile & Credentials Verification",
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
      "internships": "Corporate Internship Programs",
      "partnerships": "Campus University MoUs",
      "pipeline": "Talent Funnel Pipeline"
    };
    return titles[activeSubView] || `${activeSubView.toUpperCase()} View`;
  };
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
          children: [/* @__PURE__ */ jsx(FaCircleCheck, {
            className: "w-5 h-5 text-blue-400"
          }), /* @__PURE__ */ jsx("span", {
            className: "text-xs font-semibold",
            children: toastMessage
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8",
          children: [/* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx("h1", {
              className: `text-2xl font-extrabold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`,
              children: getSubViewTitle()
            })
          }), currentWorkspace === "super-admin" && (activeSubView === "access" || activeSubView === "overview") && /* @__PURE__ */ jsxs("button", {
            onClick: () => setIsGrantModalOpen(true),
            className: "bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2",
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
const serverManifest = { "entry": { "module": "/assets/entry.client-Duqma3Cv.js", "imports": ["/assets/jsx-runtime-D_zvdyIk.js", "/assets/chunk-62JRHF6Z-W8r8RY01.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/root-B-7DB9hW.js", "imports": ["/assets/jsx-runtime-D_zvdyIk.js", "/assets/chunk-62JRHF6Z-W8r8RY01.js", "/assets/QueryClientProvider-qZvqm_ZT.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/_index-Bn0BTm_z.js", "imports": ["/assets/chunk-62JRHF6Z-W8r8RY01.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/login-no6Xuy-d.js", "imports": ["/assets/chunk-62JRHF6Z-W8r8RY01.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/index-BYRvC7Kc.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "role-root": { "id": "role-root", "parentId": "root", "path": ":role", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/_role-BWbMYXRF.js", "imports": ["/assets/chunk-62JRHF6Z-W8r8RY01.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/QueryClientProvider-qZvqm_ZT.js", "/assets/index-BYRvC7Kc.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "role-splat": { "id": "role-splat", "parentId": "root", "path": ":role/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/_role-BWbMYXRF.js", "imports": ["/assets/chunk-62JRHF6Z-W8r8RY01.js", "/assets/jsx-runtime-D_zvdyIk.js", "/assets/QueryClientProvider-qZvqm_ZT.js", "/assets/index-BYRvC7Kc.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-635715da.js", "version": "635715da", "sri": void 0 };
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
