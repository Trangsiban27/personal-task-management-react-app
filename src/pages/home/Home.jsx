import React from "react";
import ProjectStatistics from "./components/ProjectStatistics";
import ProgressTask from "./components/ProgressTask";
import TaskTable from "./components/task-table/TaskTable";
import TaskDetailPanel from "@/components/task/TaskDetailPanel";

const Home = () => {
  return (
    <div className="flex flex-col gap-y-12">
      <div className="flex flex-col gap-y-4 justify-start w-full">
        <h4 className="font-bold w-full text-left">Active Tasks</h4>

        <div className="flex w-full gap-x-6">
          <div className="h-75">
            <ProjectStatistics />
          </div>

          <div className="h-75">
            <ProgressTask />
          </div>
        </div>
      </div>

      <div className="">
        <TaskTable />
      </div>

      <TaskDetailPanel />
    </div>
  );
};

export default Home;
