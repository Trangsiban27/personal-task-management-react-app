import Home from "@/pages/home/Home";
import { HomeIcon, LayoutDashboard } from "lucide-react";
import { sidebarNavigationConfig } from "./sidebarNavigationConfig";
import { signUpCongfig } from "@/pages/sign-up/routes";
import { signInRouteConfig } from "@/pages/sign-in/routes";

export const routes = [
  {
    layout: "main",
    children: [...sidebarNavigationConfig],
  },
  {
    layout: "auth",
    children: [...signUpCongfig, ...signInRouteConfig],
  },
];
