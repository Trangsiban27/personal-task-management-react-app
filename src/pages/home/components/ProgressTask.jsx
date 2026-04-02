import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ProgressTask = () => {
  const data = [
    { name: "Illustrations", value: 82, color: "#8b5cf6" },
    { name: "Lending", value: 62, color: "#a78bfa" },
    { name: "Dashboard", value: 33, color: "#22d3ee" },
  ];

  const chartOptions = {
    chart: {
      type: "radialBar",
    },
    colors: data.map((i) => i.color),
    labels: data.map((i) => i.name),
    plotOptions: {
      radialBar: {
        hollow: {
          size: "30%",
        },
        track: {
          margin: 6,
        },
        dataLabels: {
          show: false,
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-start border rounded-lg p-4 h-full">
      <h4 className="font-bold mb-4">Progress Tasks</h4>

      <div className="flex items-center gap-6">
        <div className="flex flex-col gap-3">
          {data?.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item?.color }}
              />
              <span className="text-sm ">{item?.name}</span>
              <span className="text-sm font-semibold ml-auto">
                {item?.value}%
              </span>
            </div>
          ))}
        </div>

        <ReactApexChart
          options={chartOptions}
          series={data.map((i) => i?.value)}
          type="radialBar"
          height={150}
        />
      </div>
    </div>
  );
};

export default ProgressTask;
