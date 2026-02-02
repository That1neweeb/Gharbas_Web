import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export const apiRequest = async (method, endpoint, options = {}) => {
  if (!options) options = {}; // fallback in case null is passed
  console.log(options);
  const { data, params, headers } = options;
  const token = localStorage.getItem("token"); 

  console.log(data);
  

  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      params,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
        ...(data instanceof FormData ? {} : {"Content-Type": "application/json"})

      },
    });


    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Something went wrong!");
    } else {
      throw new Error("Server not reachable!");
    }
  }
};
