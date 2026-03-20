import React, { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Key, LogOut } from "lucide-react";
import { routes } from "@/config/routes";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { sidebarNavigationConfig } from "@/config/sidebarNavigationConfig";

const Sidebar = () => {
  const [collapse, setCollapse] = useState(false);

  console.log("sidebarNavigationConfig: ", sidebarNavigationConfig);

  return (
    <div
      className={cn(
        "h-full border-r border-gray-200 shadow bg-background flex flex-col transition-all duration-300",
        collapse ? "w-16" : "w-64",
      )}
    >
      <div className="p-2 py-4 flex items-center justify-between">
        {!collapse && (
          <span className="text-3xl font-bold transition-all duration-300">
            Task
          </span>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapse(!collapse)}
        >
          {collapse ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <div className="flex flex-col gap-1 px-2 flex-1">
        {sidebarNavigationConfig?.map((item) => {
          const Icon = item?.icon;

          return (
            <NavLink
              key={item?.path}
              to={item?.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
                  isActive ? "bg-gray-200" : "hover:bg-muted text-foreground",
                )
              }
            >
              <Icon className="w-5 h-5 shrink-0" />

              {!collapse && <span>{item?.label}</span>}
            </NavLink>
          );
        })}
      </div>

      {/* personal info */}
      <div className="w-full justify-end p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-start">
              <span className="font-bold text-sm">Trang Si Ban</span>
              <span className="font-light text-sm w-[80%] truncate">
                trangsiban@gmail.com
              </span>
            </div>
          </div>

          <Button variant="ghost" size="icon" className={"cursor-pointer"}>
            <LogOut />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
