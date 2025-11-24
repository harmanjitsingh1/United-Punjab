// import "./i18n";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Layout from "./Layout.jsx";
// import HomePage from "./pages/HomePage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import SignupPage from "./pages/SignupPage.jsx";
// import ServicesPage from "./pages/ServicesPage.jsx";
// import AboutPage from "./pages/AboutPage.jsx";
// import NotFound from "./pages/NotFound.jsx";
// import ContactUsPage from "./pages/ContactUsPage.jsx";
// import ScholarshipsPage from "./pages/ScholarshipsPage.jsx";
// import SportsClubPage from "./pages/SportsClubPage.jsx";
// import BusinessPage from "./pages/BusinessPage.jsx";
// import InitiativesPage from "./pages/InitiativesPage.jsx";
// import OtpVerification from "./pages/OtpVerification.jsx";
// import GurmukhiSeriesPage from "./pages/GurmukhiSeriesPage.jsx";
// import UserFormWizard from "./pages/Temp.jsx";
// import Services from "./components/Services.jsx";
// import Header from "./components/Header.jsx";
// import LanguageSwitcher from "./components/LanguageSwitcher.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import { Toaster } from "react-hot-toast";
// import LifelinePage from "./pages/Lifeline";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       { index: true, element: <HomePage /> }, // default child route
//       { path: "about", element: <AboutPage /> },
//       { path: "contact", element: <ContactUsPage /> },
//       { path: "scholarships", element: <ScholarshipsPage /> },
//       { path: "sports-club", element: <SportsClubPage /> },
//       { path: "gurmukhi", element: <GurmukhiSeriesPage /> },
//       { path: "business", element: <BusinessPage /> },
//       { path: "initiatives", element: <InitiativesPage /> },
//       { path: "lifeline", element: <LifelinePage /> },
//       {
//         path: "services",
//         element: <ServicesPage />, // parent
//         children: [
//           { index: true, element: <Services /> }, // `/services`
//           { path: "web-development", element: <NotFound /> },
//           { path: "digital-marketing", element: <NotFound /> },
//           { path: "brand-management", element: <NotFound /> },
//           { path: "logo-design", element: <NotFound /> },
//           { path: "cyber-security", element: <NotFound /> },
//           { path: "coding-classes", element: <NotFound /> },
//         ],
//       },
//     ],
//   },
//   { path: "/login", element: <LoginPage /> },
//   { path: "/signup", element: <SignupPage /> },
//   {
//     path: "/verify-otp",
//     element: <OtpVerification />,
//   },
//   { path: "*", element: <NotFound /> },
//   // { path: "/temp", element: <UserFormWizard /> },
// ]);

// function App() {
//   return (
//     <>
//       <Toaster position="top-right" reverseOrder={false} />
//       <RouterProvider router={router} />
//       <LanguageSwitcher />
//     </>
//   );
// }

// export default App;
