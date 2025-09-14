import { Button } from "@/Components/ui/button";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { House, Loader2Icon } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { signupUserThunk } from "@/store/user.thunk";
import { useDispatch, useSelector } from "react-redux";

function SignupPage() {
  const [step, setStep] = useState(1);
  const state = useSelector((state) => state.userReducer);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    aadhar: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Validation logic
  const validateField = (name, value) => {
    let msg = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) msg = "Name is required.";
        break;
      case "phone":
        if (!/^[6-9]\d{9}$/.test(value)) msg = "Enter a valid phone number.";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          msg = "Enter a valid email.";
        break;
      case "aadhar":
        if (!/^\d{12}$/.test(value)) msg = "Enter a valid 12-digit Aadhar.";
        break;
      case "password":
        if (value.length < 8) msg = "Password must be at least 8 chars.";
        break;
      case "confirmPassword":
        if (value !== formData.password) msg = "Passwords do not match.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: msg }));
    return msg === "";
  };

  const nextStep = () => {
    const fields = ["fullName", "phone", "email", "aadhar", "password"];
    const currentField = fields[step - 1];
    if (validateField(currentField, formData[currentField])) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Run validation for all fields
    Object.entries(formData).forEach(([name, value]) =>
      validateField(name, value)
    );

    // Check if any errors remain
    const hasErrors = Object.values(errors).some((err) => err !== "");
    if (hasErrors) return;

    console.log(formData);
    const data = await dispatch(signupUserThunk(formData));
    
    if (data?.payload?.success) {
        navigate("/verify-otp");
    }
  };

  const isFormValid =
    Object.values(formData).every((val) => val.trim() !== "") &&
    Object.values(errors).every((err) => !err);

  // if (!allValid) return;

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

            {/* Phone */}
            <div className="w-full">
              <Label className="text-md block mb-1">{t("inputs.phone")}</Label>
              <Input
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                name="phone"
                type="phone"
                autoComplete="phone"
                placeholder={`${t("inputs.enterPhone")}`}
                className="bg-input w-full !px-4 !py-5 !text-lg rounded-lg border-2"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
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

            {/* Aadhar */}
            <div className="w-full">
              <Label className="text-md block mb-1">{t("inputs.aadhar")}</Label>
              <Input
                value={formData.aadhar}
                onChange={handleChange}
                onBlur={handleBlur}
                name="aadhar"
                type="aadhar"
                autoComplete="aadhar"
                placeholder={`${t("inputs.enterAadhar")} ` || "Aadhar Number"}
                className="bg-input w-full !px-4 !py-5 !text-lg rounded-lg border-2"
              />
              {errors.aadhar && (
                <p className="text-red-500 text-sm mt-1">{errors.aadhar}</p>
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

// import { Button } from "@/Components/ui/button";
// import { Input } from "@/Components/ui/input";
// import { Label } from "@/Components/ui/label";
// import { House, Loader2 } from "lucide-react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { signupUserThunk } from "@/store/user.thunk";

// export default function SignupWizard() {
//   const state = useSelector((state) => state.userReducer);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     email: "",
//     aadhar: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});

//   // ✅ Validation for each field
//   const validateField = (name, value) => {
//     let msg = "";

//     switch (name) {
//       case "fullName":
//         if (!value.trim()) msg = "Name is required.";
//         break;
//       case "phone":
//         if (!/^[6-9]\d{9}$/.test(value)) msg = "Enter a valid phone number.";
//         break;
//       case "email":
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
//           msg = "Enter a valid email.";
//         break;
//       case "aadhar":
//         if (!/^\d{12}$/.test(value)) msg = "Enter a valid 12-digit Aadhar.";
//         break;
//       case "password":
//         if (value.length < 8) msg = "Password must be at least 8 chars.";
//         break;
//       case "confirmPassword":
//         if (value !== formData.password) msg = "Passwords do not match.";
//         break;
//       default:
//         break;
//     }
//     setErrors((prev) => ({ ...prev, [name]: msg }));
//     return msg === "";
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const nextStep = () => {
//     const fields = ["fullName", "phone", "email", "aadhar", "password"];
//     const currentField = fields[step - 1];

//     if (validateField(currentField, formData[currentField])) {
//       setStep(step + 1);
//     }
//   };

//   const prevStep = () => setStep(step - 1);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const allValid = Object.entries(formData).every(([key, val]) =>
//       validateField(key, val)
//     );
//     if (!allValid) return;

//     const data = await dispatch(signupUserThunk(formData));
//     if (data?.success) {
//       navigate(`/verify-otp?email=${formData.email}`);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen w-full">
//       {/* Top-left nav */}
//       <div className="fixed top-4 left-4">
//         <Link to={"/"}>
//           <button className="bg-popover p-3 rounded-full shadow-lg">
//             <House className="text-primary" />
//           </button>
//         </Link>
//       </div>

//       {/* Card */}
//       <div className="p-6 w-full max-w-md bg-white/80 rounded-xl shadow-xl">
//         <h2 className="text-2xl font-bold text-center text-primary mb-6">
//           Signup Step {step}/5
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Step 1: Name */}
//           {step === 1 && (
//             <div>
//               <Label>Name</Label>
//               <Input
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 placeholder="Enter your full name"
//               />
//               {errors.fullName && (
//                 <p className="text-red-500 text-sm">{errors.fullName}</p>
//               )}
//             </div>
//           )}

//           {/* Step 2: Phone */}
//           {step === 2 && (
//             <div>
//               <Label>Phone Number</Label>
//               <Input
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Enter your phone"
//               />
//               {errors.phone && (
//                 <p className="text-red-500 text-sm">{errors.phone}</p>
//               )}
//             </div>
//           )}

//           {/* Step 3: Email */}
//           {step === 3 && (
//             <div>
//               <Label>Email</Label>
//               <Input
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email}</p>
//               )}
//             </div>
//           )}

//           {/* Step 4: Aadhar */}
//           {step === 4 && (
//             <div>
//               <Label>Aadhar Number</Label>
//               <Input
//                 name="aadhar"
//                 value={formData.aadhar}
//                 onChange={handleChange}
//                 placeholder="Enter 12-digit Aadhar"
//               />
//               {errors.aadhar && (
//                 <p className="text-red-500 text-sm">{errors.aadhar}</p>
//               )}
//             </div>
//           )}

//           {/* Step 5: Passwords */}
//           {step === 5 && (
//             <>
//               <div>
//                 <Label>Password</Label>
//                 <Input
//                   name="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter password"
//                 />
//                 {errors.password && (
//                   <p className="text-red-500 text-sm">{errors.password}</p>
//                 )}
//               </div>
//               <div>
//                 <Label>Confirm Password</Label>
//                 <Input
//                   name="confirmPassword"
//                   type="password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="Confirm password"
//                 />
//                 {errors.confirmPassword && (
//                   <p className="text-red-500 text-sm">
//                     {errors.confirmPassword}
//                   </p>
//                 )}
//               </div>
//             </>
//           )}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between">
//             {step > 1 && (
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={prevStep}
//                 className="px-6"
//               >
//                 Back
//               </Button>
//             )}

//             {step < 5 && (
//               <Button
//                 type="button"
//                 onClick={nextStep}
//                 className="ml-auto bg-primary text-white px-6"
//               >
//                 Next
//               </Button>
//             )}

//             {step === 5 && (
//               <Button
//                 type="submit"
//                 disabled={state.buttonLoading}
//                 className="ml-auto bg-primary text-white px-6"
//               >
//                 {state.buttonLoading ? (
//                   <Loader2 className="animate-spin" />
//                 ) : (
//                   "Submit"
//                 )}
//               </Button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
