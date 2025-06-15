import axios from "axios";

export const getSecureAxios = async (user) => {
  if (!user) {
    throw new Error("User not found.");
  }

  const token = await user.getIdToken();

  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
