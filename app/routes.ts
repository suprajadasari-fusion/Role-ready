import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("login", "routes/login.tsx"),
  route(":role", "routes/$role.tsx", { id: "role-root" }),
  route(":role/*", "routes/$role.tsx", { id: "role-splat" })
] satisfies RouteConfig;
