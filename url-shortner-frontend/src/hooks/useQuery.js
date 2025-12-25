import { useQuery } from "@tanstack/react-query";
import api from "../api/api.js";

export const useFetchTotalClicks = (token, onError) => {
  return useQuery({
    queryKey: ["totalClicks", token],
    queryFn: async () => {
      const response = await api.get(
        "/api/urls/totalClicks?startDate=2024-01-01&endDate=2025-12-31",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      return response.data;
    },
    select: (data) => {
      return Object.keys(data).map((key) => ({
        clickDate: key,
        count: data[key],
      }));
    },
    onError,
    staleTime: 5000,
    enabled: token !== null,
  })
};