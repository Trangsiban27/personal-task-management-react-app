import Home from "@/pages/home/Home";
import { HomeIcon, LayoutDashboard } from "lucide-react";
import { sidebarNavigationConfig } from "./sidebarNavigationConfig";
import { signUpCongfig } from "@/pages/sign-up/routes";
import { signInRouteConfig } from "@/pages/sign-in/routes";
import { homeRouteConfig } from "@/pages/home/homeRouteConfig";

export const routes = [
  {
    layout: "main",
    children: [...sidebarNavigationConfig, ...homeRouteConfig],
  },
  {
    layout: "auth",
    children: [...signUpCongfig, ...signInRouteConfig],
  },
];
