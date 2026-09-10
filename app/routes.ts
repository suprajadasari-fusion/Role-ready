import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx", { id: "signup-route" }),
  route("register", "routes/signup.tsx", { id: "register-route" }),
  route("forgot-password", "routes/forgot-password.tsx", { id: "forgot-password-route" }),
  route("portal/:role", "routes/$role.tsx", { id: "portal-role-root" }),
  route("portal/:role/*", "routes/$role.tsx", { id: "portal-role-splat" }),
  route(":role", "routes/$role.tsx", { id: "role-root" }),
  route(":role/*", "routes/$role.tsx", { id: "role-splat" })
] satisfies RouteConfig;
