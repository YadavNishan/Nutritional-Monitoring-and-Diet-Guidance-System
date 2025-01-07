import React from "react";
import { Radar } from "react-chartjs-2";
import ChartZoom from "chartjs-plugin-zoom";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import { RecommendedIntake, TotalIntake } from "../../types/nutrients";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartZoom,
);

type PFoodVisualization = {
  totalIntake: TotalIntake;
  recommendedIntake: RecommendedIntake;
};

const FoodVisualization: React.FC<PFoodVisualization> = ({
  totalIntake,
  recommendedIntake,
}) => {
  const sharedKeys = Object.keys(totalIntake).filter((key) =>
    Object.prototype.hasOwnProperty.call(recommendedIntake, key),
  );

  console.log(sharedKeys);
  console.log(
    sharedKeys.map((key) => totalIntake[key as keyof TotalIntake] ?? 0),
  );

  console.log(
    sharedKeys.map(
      (key: string) => recommendedIntake[key as keyof RecommendedIntake] ?? 0,
    ),
  );

  const data = {
    labels: sharedKeys,
    datasets: [
      {
        label: "Total Intake",
        data: sharedKeys.map(
          (key) => totalIntake[key as keyof TotalIntake] ?? 0,
        ),
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Recommended Intake",
        data: sharedKeys.map(
          (key: string) =>
            recommendedIntake[key as keyof RecommendedIntake] ?? 0,
        ),
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
    zoom: {
      pan: {
        enabled: true,
        mode: "xy", // Allow panning in both axes (x and y)
      },
      zoom: {
        enabled: true,
        mode: "xy", // Allow zooming in both axes (x and y)
        speed: 0.1, // Adjust the zoom speed
      },
    },
  };

  return (
    <div>
      <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default FoodVisualization;
