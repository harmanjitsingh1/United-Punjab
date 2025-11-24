import "./i18n";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@/components/ThemeProvider";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout.jsx";
import RootLayout from "./RootLayout";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import ContactUsPage from "./pages/ContactUsPage.jsx";
import ScholarshipsPage from "./pages/ScholarshipsPage.jsx";
import SportsClubPage from "./pages/SportsClubPage.jsx";
import BusinessPage from "./pages/BusinessPage.jsx";
import InitiativesPage from "./pages/InitiativesPage.jsx";
import OtpVerification from "./pages/OtpVerification.jsx";
import GurmukhiSeriesPage from "./pages/GurmukhiSeriesPage.jsx";
import LifelinePage from "./pages/Lifeline";
import UserFormWizard from "./pages/Temp.jsx";
import Dashboadrd from "./pages/Dashboadrd";
import Services from "./components/Services.jsx";
import ProtectedRoute from "./context/ProtectedRoute";
import AuthRoute from "./context/AuthRoute";
import ResetPassword from "./pages/ResetPassword";
import UnverifiedRoute from "./context/UnverifiedRoute";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "/about", element: <AboutPage /> },
          { path: "/contact", element: <ContactUsPage /> },
          { path: "/scholarships", element: <ScholarshipsPage /> },
          { path: "/sports-club", element: <SportsClubPage /> },
          { path: "/gurmukhi", element: <GurmukhiSeriesPage /> },
          { path: "/business", element: <BusinessPage /> },
          { path: "/initiatives", element: <InitiativesPage /> },
          { path: "/lifeline", element: <LifelinePage /> },
          {
            path: "/services",
            element: <ServicesPage />,
            children: [
              { index: true, element: <Services /> },
              { path: "web-development", element: <NotFound /> },
              { path: "digital-marketing", element: <NotFound /> },
              { path: "brand-management", element: <NotFound /> },
              { path: "logo-design", element: <NotFound /> },
              { path: "cyber-security", element: <NotFound /> },
              { path: "coding-classes", element: <NotFound /> },
            ],
          },
          {
            element: <ProtectedRoute />,
            children: [{ path: "dashboard", element: <Dashboadrd /> }],
          },
        ],
      },

      {
        path: "/reset-password",
        element: <ResetPassword />,
      },

      {
        element: <UnverifiedRoute />,
        children: [{ path: "/verify-otp", element: <OtpVerification /> }],
      },

      {
        element: <AuthRoute />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/signup", element: <SignupPage /> },
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
