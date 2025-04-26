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
    return await Api.post('/api/user/verifyForgotPasswordOTP', post);
  };

export const resetPassword = (post) => {
    return Api.post("/api/user/resetPassword", post);
};