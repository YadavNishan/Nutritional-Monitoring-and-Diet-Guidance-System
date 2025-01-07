import React, { useEffect, useState } from "react";
import { getProfile, userDashboard } from "../../api/user.api";
import { User } from "../../types/user";
import {
  NutritionResponse,
  RecommendedIntake,
  TotalIntake,
} from "../../types/nutrients";
import { FaCalendarAlt } from "react-icons/fa";
import FoodVisualization from "../../components/visulation/FoodVisulation";

const Dashboard: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [profileRes, setProfileRes] = useState<User>();
  const [dashboardRes, setDashboardRes] = useState<NutritionResponse>();

  const recommendedIntake: RecommendedIntake | null =
    dashboardRes?.recommendedIntake || null;
  const totalIntake: TotalIntake | null = dashboardRes?.totalIntake || null;

  useEffect(() => {
    const fetchProfile = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const profileResponse: any = await getProfile();
      setProfileRes(profileResponse);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dashBoardResponse: any = await userDashboard(date);
      setDashboardRes(dashBoardResponse);
    };
    fetchDashboardData();
  }, [date]);

  return (
    <div className="px-3 py-5">
      <div className="flex items-center justify-between">
        {profileRes && (
          <h1 className="font-dm-sans font-semibold capitalize">
            {" "}
            {profileRes.name}
          </h1>
        )}
        <div className="flex items-center justify-end gap-5">
          <label htmlFor="" className="">
            {date.toISOString().split("T")[0]}
          </label>
          <div className="relative">
            <input
              type="date"
              value={date.toISOString()}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="absolute right-0 hidden rounded-lg border-b-2 border-gray-400 bg-white px-4 py-2 focus:outline-primary"
            />
            <FaCalendarAlt
              className="cursor-pointer text-primary"
              onClick={() => {
                const dateInput = document.querySelector(
                  'input[type="date"]',
                ) as HTMLInputElement;

                if (dateInput) {
                  // Add a custom class to the input element
                  dateInput.classList.add("custom-date-input");

                  // Trigger the date picker
                  dateInput.showPicker();
                }
              }}
            />
          </div>
        </div>
      </div>

      {recommendedIntake && totalIntake && (
        <FoodVisualization
          recommendedIntake={recommendedIntake}
          totalIntake={totalIntake}
        />
      )}
    </div>
  );
};

export default Dashboard;
