import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAddAuthHeader = () => {
  const { user } = useContext(AuthContext);

  const getAxiosWithToken = async () => {
    if (!user) {
      throw new Error("No user found. You must be logged in.");
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

  return getAxiosWithToken;
};

export default useAddAuthHeader;
