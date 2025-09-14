import "./i18n";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import ServicesPage from "./Pages/ServicesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFound from "./Pages/NotFound.jsx";
import LanguageSwitcher from "./Components/LanguageSwitcher.jsx";
import ContactUsPage from "./Pages/ContactUsPage.jsx";
import ScholarshipsPage from "./Pages/ScholarshipsPage.jsx";
import Services from "./Components/Services.jsx";
import SportsClubPage from "./Pages/SportsClubPage.jsx";
import BusinessPage from "./Pages/BusinessPage.jsx";
import InitiativesPage from "./Pages/InitiativesPage.jsx";
import Header from "./Components/Header.jsx";
import OtpVerification from "./Pages/OtpVerification.jsx";
import GurmukhiSeriesPage from "./Pages/GurmukhiSeriesPage.jsx";
import UserFormWizard from "./Pages/Temp.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";

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
