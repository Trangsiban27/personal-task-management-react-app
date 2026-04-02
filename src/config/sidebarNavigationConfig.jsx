import Home from "@/pages/home/Home";
import { HomeIcon, LayoutDashboard } from "lucide-react";
import { Navigate } from "react-router-dom";

export const sidebarNavigationConfig = [
  {
    path: "/home",
    label: "Home",
    icon: HomeIcon,
    element: <Home />,
  },
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    element: <Home />,
  },
];
