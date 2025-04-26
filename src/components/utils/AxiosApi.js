import axios from "axios";
import Cookies from "js-cookie";

const Api = axios.create({
  baseURL: "https://service.kartikengitech.info/",
});

Api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("Token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signUpApi = (post) => {
  return Api.post("/api/user/sendOTP", post);
};

export const signInApi = (post) => {
  return Api.post("/api/user/login", post);
};

export const verifyOtpApi = (post) => {
  return Api.post("/api/user/verifyOTP", post);
};

export const forgetPassword = (email) => {
  return Api.post("/api/user/sendForgotPasswordOTP", email);
};

export const verifyForgetPasswordOtp = async (post) => {
  return await Api.post("/api/user/verifyForgotPasswordOTP", post);
};

export const resetPassword = (post) => {
  return Api.post("/api/user/resetPassword", post);
};

export const postFaqs = () => {
  return Api.post("/api/faq");
};

export const getFaqs = () => {
  return Api.get("/api/faq/getFaqs");
};

export const UpdateFaqs = (id, data) => {
  return Api.put(`/api/faq/updateFaq/${id}`, data);
};

export const DeleteFaqs = (id) => {
  return Api.delete(`/api/faq/faq/${id}`);
};

export const getAllusers = () => {
  return Api.get("/api/admin/user/allUsers");
};

export const getUserById = (id) => {
  return Api.get(`/api/admin/user/getUserById?id=${id}`);
};


export const updateUserById = (id, userData) =>{
    return Api.put(`/api/admin/user/editProfile/${id}`, userData);
}