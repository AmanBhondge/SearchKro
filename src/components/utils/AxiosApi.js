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

const UploadApi = axios.create({
  baseURL: "https://service.kartikengitech.info/",
  headers: {
    Authorization: `Bearer ${Cookies.get("Token")}`,
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

//Authentication end points
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

//Dashboard end points

export const categroryInsights = () => {
  return Api.get("/api/category/insights");
};

export const dailyAnalytics = () => {
  return Api.get("api/admin/user/userAnalytics");
};

//FAQ end points
export const postFaqs = (data) => {
  return Api.post("/api/faq", data);
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

//Users end points
export const getAllusers = () => {
  return Api.get("/api/admin/user/allUsers");
};

export const getUserById = (id) => {
  return Api.get(`/api/admin/user/getUserById?id=${id}`);
};

export const updateProfile = (post) => {
  return Api.put(`/api/user/updateProfile`, post);
};

export const updateUserById = (id, userData) => {
  return Api.put(`/api/admin/user/editProfile/${id}`, userData);
};

//Categories end points
export const getCategories = () => {
  return Api.get("/api/category/getCategory");
};

export const createCategory = (categoryData) => {
  return Api.post("/api/category/createCategory", categoryData);
};

export const updateCategory = (categoryData) => {
  return Api.put("/api/category/updateCategory", categoryData);
};

export const deleteCategory = (index) => {
  const encodedIndex = encodeURIComponent(index);
  return Api.delete(`/api/category/deleteCategory?index=${encodedIndex}`);
};
export const UploadImg = (formData) => {
  UploadApi.post("/api/user/uploadImage", formData);
};

//Banner endpoints
export const getAllBanners = () => {
  return Api.get("/api/admin/banner/getAllBanners");
};

export const editBanner = (id, post) => {
  return Api.put(`/api/admin/banner/updateBanner/${id}`, post);
};

export const postBanner = (post) => {
  return Api.post("/api/user/uploadImage", post);
};
