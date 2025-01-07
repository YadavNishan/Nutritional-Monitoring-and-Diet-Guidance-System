import axios from "axios";
import { BACKEND_API_URL } from "../config";

export const gettingStarted = async (userId: string, data: {
    gender: string;
    weight: string;
    height: string;
    age: string;
    activityLevel: string;
}) => {
    const response = await axios.put(`${BACKEND_API_URL}/user/update/${userId}`, {
        ...data
    });

    return response.data;
}