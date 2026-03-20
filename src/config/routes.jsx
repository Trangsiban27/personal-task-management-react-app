import Home from "@/pages/Home";
import { HomeIcon, LayoutDashboard } from "lucide-react";
import { sidebarNavigationConfig } from "./sidebarNavigationConfig";
import { signUpCongfig } from "@/pages/sign-up/routes";

export const routes = [
  {
    layout: "main",
    children: [...sidebarNavigationConfig],
  },
  {
    layout: "auth",
    children: [...signUpCongfig],
  },
];
