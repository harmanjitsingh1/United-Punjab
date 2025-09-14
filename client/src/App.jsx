import "./i18n";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ServicesPage from "./Pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./Pages/NotFound";
import LanguageSwitcher from "./Components/LanguageSwitcher";
import ContactUsPage from "./Pages/ContactUsPage";
import ScholarshipsPage from "./Pages/ScholarshipsPage";
import Services from "./Components/Services";
import SportsClubPage from "./Pages/SportsClubPage";
import BusinessPage from "./Pages/BusinessPage";
import InitiativesPage from "./Pages/InitiativesPage";
import Header from "./Components/Header";
import { Toaster } from "react-hot-toast";
import OtpVerification from "./Pages/OtpVerification";
import GurmukhiSeriesPage from "./Pages/GurmukhiSeriesPage";
import UserFormWizard from "./Pages/Temp";
import ProtectedRoute from "./Components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> }, // default child route
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactUsPage /> },
      { path: "scholarships", element: <ScholarshipsPage /> },
      { path: "sports-club", element: <SportsClubPage /> },
      { path: "gurmukhi", element: <GurmukhiSeriesPage /> },
      { path: "business", element: <BusinessPage /> },
      { path: "initiatives", element: <InitiativesPage /> },
      {
        path: "services",
        element: <ServicesPage />, // parent
        children: [
          { index: true, element: <Services /> }, // `/services`
          { path: "web-development", element: <NotFound /> },
          { path: "digital-marketing", element: <NotFound /> },
          { path: "brand-management", element: <NotFound /> },
          { path: "logo-design", element: <NotFound /> },
          { path: "cyber-security", element: <NotFound /> },
          { path: "coding-classes", element: <NotFound /> },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  {
    path: "/verify-otp",
    element: <OtpVerification />,
  },
  { path: "*", element: <NotFound /> },
  // { path: "/temp", element: <UserFormWizard /> },
]);

function App() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <RouterProvider router={router} />
      <LanguageSwitcher />
    </>
  );
}

export default App;
