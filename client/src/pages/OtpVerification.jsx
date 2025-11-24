import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { House, Loader2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { resendOtpThunk, verifyOtpThunk } from "@/store/thunks/user.thunk";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import toast from "react-hot-toast";
import { setUser } from "../store/slices/user.slice";

export default function OtpVerification() {
  const { buttonLoading, userProfile } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verificationCode.trim()) {
      setError(t("errors.otpRequired") || "OTP is required.");
      return;
    } else if (!/^\d{6}$/.test(verificationCode)) {
      setError(t("errors.otpInvalid") || "OTP must be a 6-digit code.");
      return;
    }
    setError("");

    const userId = userProfile._id;

    const data = await dispatch(verifyOtpThunk({ userId, verificationCode }));
    console.log(data);
    if (data?.payload?.success) {
      toast.success(data?.payload?.response?.message || data?.payload?.message);
      dispatch(setUser(data?.payload?.user));
      navigate("/dashboard");
    } else {
      toast.error(data?.payload?.response?.message || data?.payload?.message);
    }
  };

  const handleResendOtp = async () => {
    const userId = userProfile?._id;
    if (!userId) {
      toast.error("Failed to resend OTP.");
      return;
    }
    const data = await dispatch(resendOtpThunk({ userId }));
    if (data?.payload?.success) {
      toast.success(data?.payload?.response?.message || data?.payload?.message);
    } else {
      toast.error(data?.payload?.response?.message || data?.payload?.message);
    }
  };

  const otpSlotClass =
    "bg-input text-2xl font-medium border-2 border-border w-12 h-14 flex items-center justify-center";

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex items-center gap-2 md:gap-4 fixed top-4 left-4">
        <Link to={"/"}>
          <button className="bg-popover cursor-pointer backdrop-blur-xl p-3 rounded-full shadow-lg focus:outline-none">
            <House className="text-primary" />
          </button>
        </Link>
      </div>

      <div className="p-4 w-full md:w-[450px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6"
          noValidate
        >
          <h2 className="text-3xl font-bold text-center mt-2">
            <p className="text-lg text-primary font-semibold mb-2 ">
              {t("brandName")}
            </p>
            {t("verifyOtp") || "Verify OTP"}
          </h2>

          <InputOTP
            maxLength={6}
            value={verificationCode}
            onChange={(value) => setVerificationCode(value)}
            className="mx-auto"
          >
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className={otpSlotClass}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <InputOTPSlot
                index={1}
                className={otpSlotClass}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot
                index={2}
                className={otpSlotClass}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <InputOTPSlot
                index={3}
                className={otpSlotClass}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot
                index={4}
                className={otpSlotClass}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <InputOTPSlot
                index={5}
                className={otpSlotClass}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </InputOTPGroup>
          </InputOTP>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm -mt-4">{error}</p>}

          {/* Verify Button */}
          <Button
            type="submit"
            disabled={verificationCode.length !== 6 || buttonLoading}
            className={`text-lg w-full py-6 rounded-lg font-semibold transition-transform shadow-lg cursor-pointer
              ${
                verificationCode.length === 6 || buttonLoading
                  ? "bg-gradient-to-r from-[#F57517] to-orange-500 text-white hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {buttonLoading ? (
              <Loader2Icon className={"animate-spin"} />
            ) : (
              t("verifyOtp") || "Verify OTP"
            )}
          </Button>

          {/* Resend link */}
          <p className="text-center">
            {t("didntReceiveOtp") || "Didn’t receive the OTP?"} &nbsp;
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-primary hover:underline font-medium"
            >
              {t("resendOtp") || "Resend"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
