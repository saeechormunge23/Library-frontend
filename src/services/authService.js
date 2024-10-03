import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/"; // Update with your backend API URL

const signup = (userData) => {
  return axios.post(`${API_URL}signup`, {
    name: userData.username,
    email: userData.email,
    password: userData.password,
    role: userData.role,
  });
};

const login = (userData) => {
  return axios
    .post(`${API_URL}login`, {
      email: userData.email,
      password: userData.password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
