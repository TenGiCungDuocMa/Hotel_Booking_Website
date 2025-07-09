// src/services/statisticsService.js
import axios from "axios";

export const getStatistics = async () => {
    const response = await axios.get("http://localhost:8888/api/statistics");
    return response.data;
};
