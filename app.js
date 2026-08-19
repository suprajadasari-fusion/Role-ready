/**
 * ROLE READY - MULTI-ROLE AI CAREER INTELLIGENCE PLATFORM
 * Governance & 7 Role Workspace Controller Engine
 */

// Initial Seed Data for Ecosystem Entities (All 7 Stakeholder Roles)
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
        onboardedDate: "2026-01-15"
    },
    {
        id: "ent-102",
        name: "Indian Institute of Technology (IIT) Bombay",
        role: "college",
        contactEmail: "placements@iitb.ac.in",
        domain: "iitb.ac.in",
        seats: 12000,
        usedSeats: 11450,
        features: ["AI Discover Engine", "Job & Internship Board", "AI Resume & Interview AI", "Institutional Analytics"],
        status: "active",
        onboardedDate: "2026-01-10"
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
        onboardedDate: "2026-02-01"
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
        onboardedDate: "2026-02-12"
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
        onboardedDate: "2026-02-20"
    },
    {
        id: "ent-106",
        name: "Tata Consultancy Services (TCS) Enterprise",
        role: "company",
        contactEmail: "careers@tcs.com",
        domain: "tcs.com",
        seats: 8000,
        usedSeats: 6200,
        features: ["Job & Internship Board", "AI Resume & Interview AI", "Institutional Analytics"],
        status: "active",
        onboardedDate: "2026-01-05"
    },
    {
        id: "ent-107",
        name: "National Skill Development Mission (NSDC)",
        role: "government",
        contactEmail: "portal@nsdc.gov.in",
        domain: "nsdc.gov.in",
        seats: 50000,
        usedSeats: 41200,
        features: ["AI Discover Engine", "Scholarship Portal", "Job & Internship Board", "Institutional Analytics"],
        status: "active",
        onboardedDate: "2025-12-01"
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
        onboardedDate: "2026-03-01"
    },
    {
        id: "ent-109",
        name: "CodeCraft Technology Institute",
        role: "training",
        contactEmail: "admissions@codecraft.io",
        domain: "codecraft.io",
        seats: 1000,
        usedSeats: 420,
        features: ["Job & Internship Board", "AI Resume & Interview AI"],
        status: "active",
        onboardedDate: "2026-02-28"
    },
    {
        id: "ent-110",
        name: "State Higher Education Council",
        role: "government",
        contactEmail: "directorate@shec.gov.in",
        domain: "shec.gov.in",
        seats: 25000,
        usedSeats: 19800,
        features: ["Scholarship Portal", "Institutional Analytics"],
        status: "active",
        onboardedDate: "2026-01-25"
    }
];

// Module Permissions RBAC Definitions
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

class MultiRolePlatform {
    constructor() {
        this.entities = JSON.parse(localStorage.getItem("rr_entities")) || initialEntities;
        this.auditLogs = JSON.parse(localStorage.getItem("rr_audit_logs")) || [
            { id: "log-1", time: "2026-03-04 10:14:20", admin: "Root Admin", action: "Provisioned Access", target: "St. Xavier's International School", role: "school", ip: "192.168.1.10", status: "Success" },
            { id: "log-2", time: "2026-03-04 09:45:00", admin: "Root Admin", action: "Granted Government Quota", target: "National Skill Development Mission", role: "government", ip: "192.168.1.10", status: "Success" },
            { id: "log-3", time: "2026-03-03 16:22:15", admin: "Root Admin", action: "Activated Recruiter Credentials", target: "Infosys Talent Acquisition", role: "recruiter", ip: "192.168.1.10", status: "Success" }
        ];

        this.currentRoleWorkspace = "super-admin";
        this.activeRoleFilter = "all";
        this.searchQuery = "";
        this.currentView = "overview";

        this.initDOMReferences();
        this.bindEvents();
        this.renderAll();
    }

    initDOMReferences() {
        // Workspace Selector
        this.roleWorkspaceSelector = document.getElementById("role-workspace-selector");
        this.activeWorkspaceBadge = document.getElementById("active-workspace-badge");

        // Header User Info
        this.headerUserName = document.getElementById("header-user-name");
        this.headerUserRole = document.getElementById("header-user-role");

        // Nav Groups
        this.navGroups = document.querySelectorAll(".nav-role-group");
        this.workspaceViews = document.querySelectorAll(".workspace-view");

        // Table & Search
        this.tableBody = document.getElementById("entities-table-body");
        this.tableSearchInput = document.getElementById("table-search");
        this.globalSearchInput = document.getElementById("global-search");

        // Modal Elements
        this.grantModal = document.getElementById("grant-modal");
        this.editModal = document.getElementById("edit-modal");
        this.grantForm = document.getElementById("grant-access-form");

        // Buttons
        this.btnOpenGrantModal = document.getElementById("btn-open-grant-modal");
        this.btnCloseGrantModal = document.getElementById("btn-close-grant-modal");
        this.btnCancelModal = document.getElementById("btn-cancel-modal");
        this.btnCloseEditModal = document.getElementById("btn-close-edit-modal");
        this.btnCancelEdit = document.getElementById("btn-cancel-edit");
        this.btnSaveEdit = document.getElementById("btn-save-edit");

        // Views & Nav
        this.navItems = document.querySelectorAll("#nav-super-admin .nav-item[data-view]");
        this.subNavItems = document.querySelectorAll("#nav-super-admin .nav-item[data-filter]");
        this.subViews = document.querySelectorAll("#workspace-super-admin .content-view");
        this.roleTabs = document.querySelectorAll(".role-tab");

        // KPI Counts
        this.kpiTotalEntities = document.getElementById("kpi-total-entities");
        this.kpiTotalSeats = document.getElementById("kpi-total-seats");
        this.kpiPendingCount = document.getElementById("kpi-pending-count");
        this.totalEntitiesNavCount = document.getElementById("total-entities-count");

        // Containers
        this.auditFeed = document.getElementById("audit-feed");
        this.fullAuditTableBody = document.getElementById("full-audit-table-body");
        this.roleBarsContainer = document.getElementById("role-bars-container");
        this.rbacMatrixBody = document.getElementById("rbac-matrix-body");
        this.toastContainer = document.getElementById("toast-container");
    }

    bindEvents() {
        // Workspace Selector Dropdown Change
        if (this.roleWorkspaceSelector) {
            this.roleWorkspaceSelector.addEventListener("change", (e) => {
                this.switchWorkspace(e.target.value);
            });
        }

        // Sub View Navigation in Super Admin
        this.navItems.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                const viewTarget = item.getAttribute("data-view");
                this.switchSubView(viewTarget);
                this.navItems.forEach(n => n.classList.remove("active"));
                item.classList.add("active");
            });
        });

        // Sub-nav role filters
        this.subNavItems.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                const roleTarget = item.getAttribute("data-filter");
                this.switchSubView("overview");
                this.setRoleFilter(roleTarget);
            });
        });

        // Role Tabs Filter
        this.roleTabs.forEach(tab => {
            tab.addEventListener("click", () => {
                const role = tab.getAttribute("data-role");
                this.setRoleFilter(role);
            });
        });

        // Search Handlers
        if (this.tableSearchInput) {
            this.tableSearchInput.addEventListener("input", (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                this.renderTable();
            });
        }
        if (this.globalSearchInput) {
            this.globalSearchInput.addEventListener("input", (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                this.renderTable();
            });
        }

        // Modal Controls
        this.btnOpenGrantModal.addEventListener("click", () => this.openModal(this.grantModal));
        this.btnCloseGrantModal.addEventListener("click", () => this.closeModal(this.grantModal));
        this.btnCancelModal.addEventListener("click", () => this.closeModal(this.grantModal));

        this.btnCloseEditModal.addEventListener("click", () => this.closeModal(this.editModal));
        this.btnCancelEdit.addEventListener("click", () => this.closeModal(this.editModal));

        // Form Submits
        this.grantForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleGrantAccessSubmit();
        });

        this.btnSaveEdit.addEventListener("click", () => this.handleSaveEdit());

        // AI Sliders
        const sliderAptitude = document.getElementById("slider-aptitude");
        const sliderInterest = document.getElementById("slider-interest");
        const sliderMarket = document.getElementById("slider-market");

        if (sliderAptitude) {
            sliderAptitude.addEventListener("input", (e) => { document.getElementById("val-aptitude").innerText = `${e.target.value}%`; });
            sliderInterest.addEventListener("input", (e) => { document.getElementById("val-interest").innerText = `${e.target.value}%`; });
            sliderMarket.addEventListener("input", (e) => { document.getElementById("val-market").innerText = `${e.target.value}%`; });
            document.getElementById("btn-update-ai").addEventListener("click", () => {
                this.showToast("AI Engine Recommendation weights updated!", "success");
                this.logAuditAction("Updated AI Weights", "Recommendation Engine", "system");
            });
        }

        const btnSaveRBAC = document.getElementById("btn-save-rbac");
        if (btnSaveRBAC) {
            btnSaveRBAC.addEventListener("click", () => {
                this.showToast("Global Role-Based Access Control matrix saved!", "success");
                this.logAuditAction("Updated RBAC Policy", "Global Security Matrix", "system");
            });
        }
    }

    switchWorkspace(workspaceRoleKey) {
        this.currentRoleWorkspace = workspaceRoleKey;

        // Update Nav Groups
        this.navGroups.forEach(nav => {
            nav.classList.add("hidden");
            if (nav.id === `nav-${workspaceRoleKey}`) {
                nav.classList.remove("hidden");
            }
        });

        // Update Workspace Views
        this.workspaceViews.forEach(ws => {
            ws.classList.add("hidden");
            ws.classList.remove("active");
            if (ws.id === `workspace-${workspaceRoleKey}`) {
                ws.classList.remove("hidden");
                ws.classList.add("active");
            }
        });

        // Workspace Metadata Config
        const workspaceConfigs = {
            "super-admin": { name: "Root Admin", role: "Super Administrator", badge: "Super Admin Portal" },
            "school-admin": { name: "DPS Admin Team", role: "School Administrator", badge: "School Portal" },
            "college-admin": { name: "IIT Bombay Dean", role: "College Placement Lead", badge: "College Portal" },
            "mentor": { name: "Dr. Rajesh Sharma", role: "Senior Career Counselor", badge: "Mentor Portal" },
            "training-admin": { name: "Apex Director", role: "Skill Institute Admin", badge: "Training Portal" },
            "recruiter": { name: "Priya Verma", role: "Infosys Lead Recruiter", badge: "Recruiter Portal" },
            "company": { name: "TCS Enterprise HR", role: "Company Program Lead", badge: "Company Portal" },
            "government": { name: "NSDC Director", role: "State Skill Officer", badge: "Government Portal" }
        };

        const cfg = workspaceConfigs[workspaceRoleKey] || workspaceConfigs["super-admin"];
        this.headerUserName.innerText = cfg.name;
        this.headerUserRole.innerText = cfg.role;
        this.activeWorkspaceBadge.innerText = cfg.badge;

        if (this.roleWorkspaceSelector) {
            this.roleWorkspaceSelector.value = workspaceRoleKey;
        }

        this.showToast(`Switched workspace to ${cfg.badge}`, "info");
    }

    switchSubView(viewName) {
        this.currentView = viewName;
        this.subViews.forEach(v => {
            v.classList.remove("active");
            if (v.id === `view-${viewName}`) {
                v.classList.add("active");
            }
        });
    }

    setRoleFilter(role) {
        this.activeRoleFilter = role;
        this.roleTabs.forEach(t => {
            t.classList.remove("active");
            if (t.getAttribute("data-role") === role) {
                t.classList.add("active");
            }
        });
        this.renderTable();
    }

    openModal(modalElement) { modalElement.classList.add("active"); }
    closeModal(modalElement) { modalElement.classList.remove("active"); }

    saveState() {
        localStorage.setItem("rr_entities", JSON.stringify(this.entities));
        localStorage.setItem("rr_audit_logs", JSON.stringify(this.auditLogs));
        this.renderAll();
    }

    handleGrantAccessSubmit() {
        const name = document.getElementById("entity-name").value.trim();
        const role = document.getElementById("role-type").value;
        const email = document.getElementById("admin-email").value.trim();
        const domain = document.getElementById("verified-domain").value.trim() || email.split("@")[1] || "org.domain";
        const seats = parseInt(document.getElementById("seat-quota").value) || 1000;

        const permissionBoxes = document.querySelectorAll("input[name='permissions']:checked");
        const features = Array.from(permissionBoxes).map(cb => cb.value);

        const newEntity = {
            id: `ent-${Date.now().toString().slice(-4)}`,
            name: name,
            role: role,
            contactEmail: email,
            domain: domain,
            seats: seats,
            usedSeats: 0,
            features: features,
            status: "active",
            onboardedDate: new Date().toISOString().split("T")[0]
        };

        this.entities.unshift(newEntity);
        this.logAuditAction("Provisioned Partner Access", name, role);
        this.saveState();
        this.closeModal(this.grantModal);
        this.grantForm.reset();

        this.showToast(`Access granted to ${name}! Credentials issued to ${email}`, "success");
    }

    openEditModal(id) {
        const entity = this.entities.find(e => e.id === id);
        if (!entity) return;

        document.getElementById("edit-entity-id").value = entity.id;
        document.getElementById("edit-modal-title").innerText = `Edit Access: ${entity.name}`;
        document.getElementById("edit-seat-quota").value = entity.seats;
        document.getElementById("edit-status").value = entity.status;

        this.openModal(this.editModal);
    }

    handleSaveEdit() {
        const id = document.getElementById("edit-entity-id").value;
        const seats = parseInt(document.getElementById("edit-seat-quota").value);
        const status = document.getElementById("edit-status").value;

        const entity = this.entities.find(e => e.id === id);
        if (entity) {
            entity.seats = seats;
            entity.status = status;
            this.logAuditAction(`Updated Quota/Status (${status})`, entity.name, entity.role);
            this.saveState();
            this.closeModal(this.editModal);
            this.showToast(`Updated configuration for ${entity.name}`, "info");
        }
    }

    toggleStatus(id) {
        const entity = this.entities.find(e => e.id === id);
        if (entity) {
            entity.status = entity.status === "active" ? "suspended" : "active";
            this.logAuditAction(`Status changed to ${entity.status.toUpperCase()}`, entity.name, entity.role);
            this.saveState();
            this.showToast(`Access status for ${entity.name} is now ${entity.status.toUpperCase()}`, "info");
        }
    }

    deleteEntity(id) {
        const entity = this.entities.find(e => e.id === id);
        if (entity && confirm(`Are you sure you want to revoke access for "${entity.name}"?`)) {
            this.entities = this.entities.filter(e => e.id !== id);
            this.logAuditAction("Revoked Access & Deleted Entity", entity.name, entity.role);
            this.saveState();
            this.showToast(`Access revoked for ${entity.name}`, "info");
        }
    }

    simulateRoleWorkspace(role) {
        const roleWorkspaceMap = {
            school: "school-admin",
            college: "college-admin",
            mentor: "mentor",
            training: "training-admin",
            recruiter: "recruiter",
            company: "company",
            government: "government"
        };
        const target = roleWorkspaceMap[role] || "school-admin";
        this.switchWorkspace(target);
    }

    logAuditAction(action, target, role) {
        const newLog = {
            id: `log-${Date.now().toString().slice(-4)}`,
            time: new Date().toISOString().replace("T", " ").substring(0, 19),
            admin: "Root Admin",
            action: action,
            target: target,
            role: role,
            ip: "192.168.1.10",
            status: "Success"
        };
        this.auditLogs.unshift(newLog);
    }

    showToast(message, type = "success") {
        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-info'}"></i>
            <span>${message}</span>
        `;
        this.toastContainer.appendChild(toast);
        setTimeout(() => { toast.remove(); }, 4000);
    }

    renderAll() {
        this.renderKPIs();
        this.renderRoleBadgeCounts();
        this.renderTable();
        this.renderRoleBars();
        this.renderAuditStream();
        this.renderFullAuditTable();
        this.renderRBACMatrix();
    }

    renderKPIs() {
        const total = this.entities.length;
        const totalSeatsCount = this.entities.reduce((acc, curr) => acc + curr.seats, 0);
        const pendingCount = this.entities.filter(e => e.status === "pending").length;

        if (this.kpiTotalEntities) this.kpiTotalEntities.innerText = total.toLocaleString();
        if (this.kpiTotalSeats) this.kpiTotalSeats.innerText = totalSeatsCount.toLocaleString();
        if (this.kpiPendingCount) this.kpiPendingCount.innerText = pendingCount;
        if (this.totalEntitiesNavCount) this.totalEntitiesNavCount.innerText = total;
    }

    renderRoleBadgeCounts() {
        const counts = { all: this.entities.length, school: 0, college: 0, mentor: 0, training: 0, recruiter: 0, company: 0, government: 0 };
        this.entities.forEach(e => { if (counts[e.role] !== undefined) counts[e.role]++; });
        Object.keys(counts).forEach(role => {
            const badge = document.getElementById(`badge-count-${role}`);
            if (badge) badge.innerText = counts[role];
        });
    }

    renderTable() {
        if (!this.tableBody) return;

        let filtered = this.entities;
        if (this.activeRoleFilter !== "all") {
            filtered = filtered.filter(e => e.role === this.activeRoleFilter);
        }

        if (this.searchQuery) {
            filtered = filtered.filter(e => 
                e.name.toLowerCase().includes(this.searchQuery) ||
                e.contactEmail.toLowerCase().includes(this.searchQuery) ||
                e.domain.toLowerCase().includes(this.searchQuery)
            );
        }

        document.getElementById("showing-count").innerText = filtered.length;
        document.getElementById("total-count").innerText = this.entities.length;

        if (filtered.length === 0) {
            this.tableBody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center" style="padding: 40px; color: var(--text-muted);">
                        <i class="fa-solid fa-folder-open" style="font-size: 32px; color: var(--border-blue); margin-bottom: 10px; display: block;"></i>
                        No partner entities found matching the selected filter/search.
                    </td>
                </tr>
            `;
            return;
        }

        this.tableBody.innerHTML = filtered.map(e => {
            const roleLabels = {
                school: "School Admin", college: "College Admin", mentor: "Mentor",
                training: "Training Inst.", recruiter: "Recruiter", company: "Company", government: "Government"
            };

            const featureTags = e.features.map(f => `<span class="pill" style="font-size: 10px; padding: 2px 6px;">${f}</span>`).join(" ");

            return `
                <tr>
                    <td>
                        <div class="entity-name-cell">
                            <span class="entity-title">${e.name}</span>
                            <span class="entity-sub">ID: ${e.id}</span>
                        </div>
                    </td>
                    <td>
                        <span class="badge-role badge-role-${e.role}">
                            ${roleLabels[e.role] || e.role}
                        </span>
                    </td>
                    <td>
                        <div class="entity-name-cell">
                            <span>${e.contactEmail}</span>
                            <span class="entity-sub"><i class="fa-solid fa-globe"></i> ${e.domain}</span>
                        </div>
                    </td>
                    <td><strong>${e.usedSeats.toLocaleString()}</strong> / ${e.seats.toLocaleString()}</td>
                    <td>
                        <div style="display: flex; gap: 4px; flex-wrap: wrap; max-width: 220px;">${featureTags}</div>
                    </td>
                    <td>
                        <span class="badge-status ${e.status}">
                            <i class="fa-solid ${e.status === 'active' ? 'fa-circle-check' : e.status === 'pending' ? 'fa-clock' : 'fa-ban'}"></i>
                            ${e.status.toUpperCase()}
                        </span>
                    </td>
                    <td>${e.onboardedDate}</td>
                    <td class="text-right">
                        <div class="action-btn-group">
                            <button class="btn btn-sm btn-primary" onclick="platformApp.simulateRoleWorkspace('${e.role}')" title="Open Dedicated Portal View">
                                <i class="fa-solid fa-arrow-right-to-bracket"></i> Open Portal
                            </button>
                            <button class="btn btn-sm btn-outline" onclick="platformApp.openEditModal('${e.id}')" title="Edit Access & Quota">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="btn btn-sm btn-outline" onclick="platformApp.toggleStatus('${e.id}')" title="Toggle Access Status">
                                <i class="fa-solid fa-power-off"></i>
                            </button>
                            <button class="btn btn-sm btn-outline" style="color: #EF4444;" onclick="platformApp.deleteEntity('${e.id}')" title="Revoke Access">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join("");
    }

    renderRoleBars() {
        if (!this.roleBarsContainer) return;

        const roleCounts = { school: 0, college: 0, mentor: 0, training: 0, recruiter: 0, company: 0, government: 0 };
        this.entities.forEach(e => { if (roleCounts[e.role] !== undefined) roleCounts[e.role]++; });

        const total = this.entities.length || 1;
        const roleDisplayNames = {
            school: "School Admins", college: "College Admins", mentor: "Mentors & Counselors",
            training: "Training Institutes", recruiter: "Recruiters & HR Leads", company: "Enterprise Companies", government: "Government Bodies"
        };

        this.roleBarsContainer.innerHTML = Object.keys(roleCounts).map(role => {
            const count = roleCounts[role];
            const pct = Math.round((count / total) * 100);
            return `
                <div class="bar-item">
                    <div class="bar-label-group">
                        <span>${roleDisplayNames[role]}</span>
                        <span>${count} (${pct}%)</span>
                    </div>
                    <div class="bar-bg"><div class="bar-fill" style="width: ${pct}%;"></div></div>
                </div>
            `;
        }).join("");
    }

    renderAuditStream() {
        if (!this.auditFeed) return;
        const recent = this.auditLogs.slice(0, 5);
        this.auditFeed.innerHTML = recent.map(log => `
            <div class="audit-item">
                <div class="audit-icon"><i class="fa-solid fa-user-shield"></i></div>
                <div class="audit-details">
                    <p>${log.action}: <strong>${log.target}</strong></p>
                    <span>${log.time} • By ${log.admin} (${log.ip})</span>
                </div>
            </div>
        `).join("");
    }

    renderFullAuditTable() {
        if (!this.fullAuditTableBody) return;
        this.fullAuditTableBody.innerHTML = this.auditLogs.map(log => `
            <tr>
                <td>${log.time}</td>
                <td><strong>${log.admin}</strong></td>
                <td>${log.action}</td>
                <td>${log.target}</td>
                <td><span class="badge-role badge-role-${log.role || 'school'}">${log.role || 'System'}</span></td>
                <td>${log.ip}</td>
                <td><span class="badge-status active">${log.status}</span></td>
            </tr>
        `).join("");
    }

    renderRBACMatrix() {
        if (!this.rbacMatrixBody) return;
        const roles = ["school", "college", "mentor", "training", "recruiter", "company", "government"];
        this.rbacMatrixBody.innerHTML = rbacModules.map(mod => {
            const cells = roles.map(r => `
                <td class="text-center">
                    <input type="checkbox" checked style="accent-color: var(--primary-blue); transform: scale(1.2);">
                </td>
            `).join("");
            return `<tr><td><strong>${mod.name}</strong></td>${cells}</tr>`;
        }).join("");
    }
}

// Global App Instance
let platformApp;
document.addEventListener("DOMContentLoaded", () => {
    platformApp = new MultiRolePlatform();
});
