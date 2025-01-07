import axios from "axios";
import { BACKEND_API_URL } from "../config";
import { User } from "../types/user";
import { NutritionResponse } from "../types/nutrients";

export const getProfile = async () => {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(`${BACKEND_API_URL}/user/profile/${userId}`);
    const responseData: User = response.data.payload;
    return responseData;
}

export const userDashboard = async (date: Date) => {
    const today = date.toISOString().split("T")[0];
    const userId = localStorage.getItem("userId");
    const response = await axios.post(`${BACKEND_API_URL}/user/track/daily-intake/${today}`, {
        userId: userId
    });
    const responseData: NutritionResponse = response.data.payload;
    return responseData;
}

export const addFoodIntake = async (foodId: number, quantity: number, date: Date) => {
    const userId = localStorage.getItem("userId");
    const today = date.toISOString().split("T")[0];
    const response = await axios.post(`${BACKEND_API_URL}/user/track`, {
        userId: userId,
        foodId: foodId,
        quantity: quantity,
        date: today
    });
    const responseData = response.data.payload;

    return responseData;
}