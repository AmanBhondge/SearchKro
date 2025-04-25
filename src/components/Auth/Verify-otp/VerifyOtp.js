import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtpApi } from '../../utils/AxiosApi'
import Cookies from 'js-cookie';
import img1 from "../../../Assets/Frame.png";


const VerifyOtp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state || "";
    const isForgotPassword = location.pathname.includes("forgot");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [remainingTime, setRemainingTime] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (remainingTime <= 0) {
            setCanResend(true);
            return;
        }
        const timer = setTimeout(() => setRemainingTime(prev => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [remainingTime]);

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (value && !/^\d+$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(0, 1);
        setOtp(newOtp);
        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) {
                prevInput.focus();
                const newOtp = [...otp];
                newOtp[index - 1] = "";
                setOtp(newOtp);
            }
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const otpValue = otp.join("");
        if (otpValue.length !== 4) {
            setErrorMessage("Please enter the complete 4-digit OTP");
            return;
        }
        setIsLoading(true);
        setErrorMessage("");
        try {
            const requestBody = {
                emailPhone: email,
                otp: otpValue,
                fcmToken: "",
                roleId: 2,
                forgot: isForgotPassword
            };
            const response = await verifyOtpApi(requestBody);
            const token = response.data.token

            Cookies.set("Token", token, { expires: 7 });
            setSuccessMessage("OTP verified successfully!");
            setTimeout(() => {
                navigate(isForgotPassword ? "/reset-password" : "/main-dashboard", {
                    state: email
                });
            }, 1500);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Invalid OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = () => {
        setRemainingTime(60);
        setCanResend(false);
        setSuccessMessage("OTP resent successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
            <div className="flex flex-col justify-center px-8 py-12 max-w-md mx-auto">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Verify OTP</h2>
                <p className="text-sm text-gray-600 mb-1">
                    {isForgotPassword
                        ? "Enter the OTP sent to reset your password"
                        : "Enter the OTP sent to your email to verify your account"}
                </p>
                {email && <p className="text-sm font-medium text-blue-600 mb-4">{email}</p>}

                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-md">{errorMessage}</div>
                )}
                {successMessage && (
                    <div className="mb-4 p-3 bg-green-50 text-green-500 text-sm rounded-md">{successMessage}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <label className="block text-sm font-medium text-gray-700">Enter 4-digit OTP</label>
                    <div className="flex justify-center gap-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={e => handleOtpChange(e, index)}
                                onKeyDown={e => handleKeyDown(e, index)}
                                className="w-14 h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between text-sm">
                        {canResend ? (
                            <button type="button" onClick={handleResendOtp} className="text-blue-600 hover:text-blue-500">
                                Resend OTP
                            </button>
                        ) : (
                            <span className="text-gray-500">Resend OTP in {remainingTime}s</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 text-white rounded-md shadow-sm text-sm font-medium transition duration-200 ${isLoading ? "bg-blue-300" : "bg-cyan-500 hover:bg-cyan-600"
                            }`}
                    >
                        {isLoading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Didn't receive the email? Check your spam folder or{' '}
                    <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-500">
                        go back
                    </button>
                </div>
            </div>

            <div className="w-1/2 flex items-center justify-center p-8">
                <img src={img1} alt="Forgot Password Illustration" className="max-w-full max-h-full object-contain" />
            </div>
        </div>
    );
};

export default VerifyOtp;
