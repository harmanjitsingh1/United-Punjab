import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUserThunk } from "@/store/user.thunk";
import { House, Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function LoginPage() {
  const state = useSelector((state) => state.userReducer);
  // console.log(state);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // simple validators
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (pwd) => pwd && pwd.length >= 8;

  // explicit handlers (more reliable with custom Input components)
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData((p) => ({ ...p, email: value }));

    // live clear if valid
    if (value === "" || isValidEmail(value)) {
      setErrors((p) => ({ ...p, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData((p) => ({ ...p, password: value }));

    if (value === "" || isValidPassword(value)) {
      setErrors((p) => ({ ...p, password: "" }));
    }
  };

  // onBlur validators for UX
  const handleEmailBlur = () => {
    if (!formData.email) {
      setErrors((p) => ({ ...p, email: "Email is required" }));
    } else if (!isValidEmail(formData.email)) {
      setErrors((p) => ({ ...p, email: "Please enter a valid email address" }));
    } else {
      setErrors((p) => ({ ...p, email: "" }));
    }
  };

  const handlePasswordBlur = () => {
    if (!formData.password) {
      setErrors((p) => ({ ...p, password: "Password is required" }));
    } else if (!isValidPassword(formData.password)) {
      setErrors((p) => ({
        ...p,
        password: "Password must be at least 8 characters",
      }));
    } else {
      setErrors((p) => ({ ...p, password: "" }));
    }
  };

  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "email":
        if (!value.trim()) {
          message = "Email is required.";
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          message = "Please enter a valid email address.";
        }
        break;

      case "password":
        if (!value.trim()) {
          message = "Password is required.";
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(value)
        ) {
          message =
            "Password must be 8+ characters and include uppercase, lowercase, number, and special character.";
        }
        break;

      default:
        break;
    }

    return message;
  };

  const isFormValid =
    formData.email && formData.password && !errors.email && !errors.password;

  const handleLogin = async (e) => {
    e.preventDefault();

    Object.entries(formData).forEach(([name, value]) =>
      validateField(name, value)
    );

    // Check if any errors remain
    const hasErrors = Object.values(errors).some((err) => err !== "");
    if (hasErrors) return;

    // dispatch login thunk
    const data = await dispatch(loginUserThunk(formData));
    if (data?.payload?.success){
      navigate("/")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full ">
      <div className="flex items-center gap-2 md:gap-4 fixed top-4 left-4">
        <Link to={"/"}>
          <button className="bg-popover cursor-pointer backdrop-blur-xl p-3 rounded-full shadow-lg focus:outline-none ">
            <House className="text-primary" />
          </button>
        </Link>
      </div>

      <div className="p-4 w-full md:w-[450px]">
        <div>
          <h2 className="text-3xl font-bold text-center mt-2 mb-6 text-primary">
            <p className="text-lg text-foreground font-semibold">
              {t("nav.login")}
            </p>
            {t("brandName")}
          </h2>

          <form
            className="space-y-4 w-full"
            onSubmit={handleLogin}
            noValidate
            autoComplete="on"
          >
            {/* Email */}
            <div className="w-full">
              <Label className="text-md block mb-1">{t("inputs.email")}</Label>
              <Input
                value={formData.email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                name="email"
                type="email"
                autoComplete="username"
                placeholder={`${t("inputs.enterEmail")}`}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                className={`bg-input w-full !px-4 !py-5 !text-lg rounded-lg border-2 ${
                  errors.email ? "border-red-500" : "border-transparent"
                } focus:border-2 !focus-visible:outline-none focus-visible:ring-0`}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="w-full rounded-lg flex items-center relative">
              <div className="w-full">
                <Label className="text-md block mb-1">
                  {t("inputs.password")}
                </Label>
                <Input
                  value={formData.password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  name="password"
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={`${t("inputs.enterPassword")}`}
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                  className={`bg-input w-full !px-4 !py-5 !text-lg rounded-lg border-2 ${
                    errors.password ? "border-red-500" : "border-transparent"
                  } focus:border-2 !focus-visible:outline-none focus-visible:ring-0`}
                />
                {errors.password && (
                  <p id="password-error" className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {formData.password ? (
                <span
                  className="absolute right-3 font-semibold cursor-pointer select-none"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              ) : null}
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
                t("nav.login")
              )}
            </Button>
          </form>

          <p className="text-center mt-6">
            {t("dontHaveAccount")} &nbsp;
            <Link to={"/signup"} className="text-primary hover:underline">
              {t("nav.signup")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
