import React, { lazy, Suspense, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from "react-toastify";

// Components
import LoadingSpinner from "./Common/LoadingSpinner";
import SkeletonPage from "./Common/Skeltons/SkeletonPage";
import Footer from "./Common/Footer/Footer";
import Header from "./Common/Header/Header";
import TopStrip from "./Common/Header/TopStrip";
import ProtectedRoute from "./Frontend/Routes/ProtectedRoute";
import AdminProtectedRoute from "./Frontend/Routes/AdminProtectedRoute";
import { HideFooterForAdmin } from "./util/commonUtil";

// Themes
import ThemeOne from "./Common/StyledThemes/ThemeOne.json";
import { GlobalStyles } from "./Common/StyledComponents/GlobalStyles";

// CSS
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";

// Add

// Lazy Loading
const PageNotFound = lazy(() => import("./Frontend/Pages/PageNotFound"));
const Home = lazy(() => import("./Frontend/Pages/Home/index"));
const About = lazy(() => import("./Frontend/Pages/About"));
const Contact = lazy(() => import("./Frontend/Pages/Contact"));
const Team = lazy(() => import("./Frontend/Pages/Team"));
const ImagesGallery = lazy(() => import("./Frontend/Pages/ImagesGallery"));

const NewsAndUpdates = lazy(() => import("./Frontend/Pages/NewsAndUpdates"));
const TestimonialsList = lazy(
  () => import("./Frontend/Pages/TestimonialsList")
);

const Login = lazy(() => import("./Admin/Pages/Auth/Login"));
const Registration = lazy(() => import("./Admin/Pages/Auth/Registration"));
const ChangePassword = lazy(() => import("./Admin/Pages/Auth/ChangePassword"));
const ResetPassword = lazy(() => import("./Admin/Pages/Auth/ResetPassword"));
const ResetPasswordConfirmation = lazy(
  () => import("./Admin/Pages/Auth/ResetPasswordConfirmation")
);
const Activation = lazy(() => import("./Admin/Pages/Auth/Activation"));
const ResendActivationEmail = lazy(
  () => import("./Admin/Pages/Auth/ResendActivationEmail")
);

const UserAdmin = lazy(() => import("./Admin/Pages/Auth/UserAdmin"));
const UnauthorizedPage = lazy(
  () => import("./Admin/Pages/Login/UnauthorizedPage")
);
const AuthForm = lazy(() => import("./Admin/Pages/Auth/AuthForm"));

const AdminNews = lazy(() => import("./Admin/Pages/Login/AdminNews"));
const ContactUSAdmin = lazy(() => import("./Admin/Pages/Auth/ContactUSAdmin"));
const PagesConfiguration = lazy(
  () => import("./Admin/Pages/Auth/PagesConfiguration")
);
const UserPagePermission = lazy(
  () => import("./Admin/Pages/Auth/UserPagePermission")
);
const AdminTestimonial = lazy(
  () => import("./Admin/Pages/Login/AdminTestimonial")
);
const ClientsList = lazy(() => import("./Frontend/Pages/ClientsList"));
function App() {
  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.loader);

  const isHideMenu = HideFooterForAdmin();

  // useEffect(() => {
  //   document.addEventListener("contextmenu", handleContextMenu);
  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);
  const handleContextMenu = (e) => {
    e.preventDefault();
    toast.error("Right Click is diabled");
  };
  return (
    <>
      <ThemeProvider theme={ThemeOne}>
        <GlobalStyles />
        <BrowserRouter>
          {isLoading ? <LoadingSpinner /> : ""}
          <TopStrip />
          <Header />
          <Suspense fallback={<SkeletonPage />}>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/change_password" element={<ChangePassword />} />
                <Route path="/contactUSList" element={<ContactUSAdmin />} />
              </Route>

              <Route element={<AdminProtectedRoute />}>
                <Route path="/userAdmin" element={<UserAdmin />} />
                <Route
                  path="/userPermission"
                  element={<UserPagePermission />}
                />
                <Route
                  path="/adminPagesConfigurtion"
                  element={<PagesConfiguration />}
                />
              </Route>
              <Route exact path="*" element={<PageNotFound />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/team" element={<Team />} />
              <Route exact path="/imagegallery" element={<ImagesGallery />} />
              <Route exact path="/news" element={<NewsAndUpdates />} />
              <Route
                exact
                path="/testimonials"
                element={<TestimonialsList />}
              />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Registration />} />
              <Route exact path="/reset_password" element={<ResetPassword />} />
              <Route
                exact
                path="/password/reset/:uid/:token"
                element={<ResetPasswordConfirmation />}
              />
              <Route
                exact
                path="/activate/:uid/:token"
                element={<Activation />}
              />
              <Route
                exact
                path="/resend_activation"
                element={<ResendActivationEmail />}
              />
              <Route
                exact
                path="/unauthorized"
                element={<UnauthorizedPage />}
              />
              <Route exact path="/authForm" element={<AuthForm />} />
              <Route exact path="/adminNews" element={<AdminNews />} />
              <Route exact path="/testimonial" element={<AdminTestimonial />} />
              <Route exact path="/clients" element={<ClientsList />} />
            </Routes>
          </Suspense>
          {!isHideMenu && <Footer />}
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer autoClose={2000} theme="colored" />
    </>
  );
}
export default App;
