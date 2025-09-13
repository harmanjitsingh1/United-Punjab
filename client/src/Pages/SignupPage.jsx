import { Button } from "@/Components/ui/button";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { House } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { signupUserThunk } from "@/store/user.thunk";
import { useDispatch, useSelector } from "react-redux";

function SignupPage() {
  const state = useSelector((state) => state.userReducer);
  console.log(state);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ Validation logic
  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) message = "Name is required.";
        else if (value.trim().length < 3)
          message = "Name must be at least 2 characters.";
        else if (value.trim().length > 50)
          message = "Name cannot exceed 50 characters.";
        break;

      case "email":
        if (!value.trim()) message = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          message = "Please enter a valid email address.";
        break;

      case "password":
        if (!value.trim()) message = "Password is required.";
        else if (value.trim().length < 8)
          message = "Password must be 8 characters long.";
        // else if (
        //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(value)
        // )
        //   message =
        //     "Password must be 8 characters long, include uppercase, lowercase, number, and special character";
        break;

      case "confirmPassword":
        if (!value.trim()) message = "Confirm Password is required.";
        else if (value !== formData.password)
          message = "Passwords do not match.";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation (optional)
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Run validation for all fields
    Object.entries(formData).forEach(([name, value]) =>
      validateField(name, value)
    );

    // Check if any errors remain
    const hasErrors = Object.values(errors).some((err) => err !== "");
    if (hasErrors) return;

    const data = dispatch(signupUserThunk(formData));
    console.log(data);

    if (data.succuss) {
      navigate(`/verify-otp?${formData.email}`);
    }
  };

  const isFormValid =
    formData.fullName &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    !errors.fullName &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword;

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      {/* Top-left nav */}
      <div className="flex items-center gap-2 md:gap-4 fixed top-4 left-4">
        <Link to={"/"}>
          <button className="bg-popover cursor-pointer backdrop-blur-xl p-3 rounded-full shadow-lg focus:outline-none">
            <House className="text-primary" />
          </button>
        </Link>
      </div>

      {/* Main form */}
      <div className="p-4 w-full md:w-[450px]">
        <div>
          <h2 className="text-3xl font-bold text-center mt-2 mb-6 text-primary">
            <p className="text-lg text-foreground font-semibold">
              {t("nav.signup")}
            </p>
            {t("brandName")}
          </h2>

          <form
            className="space-y-4 w-full"
            onSubmit={handleSignup}
            noValidate
            autoComplete="on"
          >
            {/* Name */}
            <div className="w-full">
              <Label className="text-md block mb-1">{t("inputs.name")}</Label>
              <Input
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder={`${t("inputs.enterName")}`}
                className="bg-input w-full !px-4 !py-5 !text-lg rounded-lg border-2"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="w-full">
              <Label className="text-md block mb-1">{t("inputs.email")}</Label>
              <Input
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                type="email"
                autoComplete="email"
                placeholder={`${t("inputs.enterEmail")}`}
                className="bg-input w-full !px-4 !py-5 !text-lg rounded-lg border-2"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="w-full">
              <Label className="text-md block mb-1">
                {t("inputs.password")}
              </Label>
              <Input
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder={`${t("inputs.enterPassword")}`}
                className="bg-input w-full !px-4 !py-5 !text-lg rounded-lg border-2"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="w-full">
              <Label className="text-md block mb-1">
                {t("inputs.confirmPassword")}
              </Label>
              <Input
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder={`${t("inputs.confirmPassword")}`}
                className="bg-input w-full !px-4 !py-5 !text-lg rounded-lg border-2"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || state.buttonLoading}
              className={`text-lg w-full py-6 rounded-lg font-semibold transition-transform shadow-lg cursor-pointer 
                ${
                  isFormValid || state.buttonLoading
                    ? "bg-gradient-to-r from-[#F57517] to-orange-500 text-white hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {state.buttonLoading ? (
                <Loader2Icon className={"animate-spin"} />
              ) : (
                t("nav.signup")
              )}
            </Button>
          </form>

          <p className="text-center mt-6">
            {t("haveAccount")} &nbsp;
            <Link to={"/login"} className="text-primary hover:underline">
              {t("nav.login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
