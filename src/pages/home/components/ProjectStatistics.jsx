import { BookCheck, FolderKanban, PenLine, Plus } from "lucide-react";
import React from "react";

const ProjectStatistics = () => {
  return (
    <div className="flex flex-col items-start border rounded-lg p-4 h-full">
      <h4 className="font-bold mb-12">Project Statistics</h4>

      <div className="flex flex-col gap-y-8">
        <div className="flex gap-x-16 justify-start w-full">
          <div className="flex gap-x-2 w-1/2">
            <FolderKanban />

            <div className="flex flex-col items-start justify-start">
              <span className="text-sm">34 Tasks</span>
              <span className="text-sm text-gray-500">In the last 7 days</span>
            </div>
          </div>

          <div className="flex gap-x-2 w-1/2">
            <BookCheck />

            <div className="flex flex-col items-start justify-start">
              <span className="text-sm">34 Tasks Done</span>
              <span className="text-sm text-gray-500">In the last 7 days</span>
            </div>
          </div>
        </div>

        <div className="flex gap-x-16 justify-start w-full">
          <div className="flex gap-x-2 w-1/2">
            <PenLine />

            <div className="flex flex-col items-start justify-start">
              <span className="text-sm">34 Update</span>
              <span className="text-sm text-gray-500">In the last 7 days</span>
            </div>
          </div>

          <div className="flex gap-x-2 w-1/2">
            <Plus />

            <div className="flex flex-col items-start justify-start">
              <span className="text-sm">34 New</span>
              <span className="text-sm text-gray-500">In the last 7 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatistics;
