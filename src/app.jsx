import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ErrorBoundary from "./utils/ErrorBoundary";

import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfLoggedIn from "./utils/RedirectIfLoggedIn";

import { USER_TYPES } from "./data/TextConstants";
import "./App.css";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthProvider";

// eslint-disable-next-line import/first
const Signup = lazy(() => import("./pages/auth/Signup"));
// eslint-disable-next-line import/first
const AfterSuccessfulSignup = lazy(() =>
  import("./pages/auth/AfterSuccessfulSignup")
);
// eslint-disable-next-line import/first
const EmailVerification = lazy(() => import("./pages/auth/EmailVerification"));
// eslint-disable-next-line import/first
const Login = lazy(() => import("./pages/auth/Login"));
// eslint-disable-next-line import/first
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
// eslint-disable-next-line import/first
const ResetPasswordLink = lazy(() => import("./pages/auth/ResetPasswordLink"));
// eslint-disable-next-line import/first
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
// eslint-disable-next-line import/first
const ResetPasswordSuccessful = lazy(() =>
  import("./pages/auth/ResetPasswordSuccessful")
);
// eslint-disable-next-line import/first
const MainLayout = lazy(() => import("./pages/layouts/MainLayout"));
// eslint-disable-next-line import/first
const NotFound = lazy(() => import("./pages/NotFound404"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Profile = lazy(() => import("./pages/Profile"));
import ScrollToTop from './components/ScrollToTop'; // Add this import
const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ErrorBoundary>
              <div>
                <ToastContainer />
                <BrowserRouter>
                <ScrollToTop /> 
                  <Suspense fallback={<div className="flex w-[100%] justify-center items-center" >Loading...</div>}>
                    <div>
                      <Routes>
                        {/* Auth routes */}
                        <Route path="auth/*" element={<RedirectIfLoggedIn />}>
                          <Route path="signup" element={<Signup />} />
                          <Route
                            path="verify-your-email"
                            element={<AfterSuccessfulSignup />}
                          />
                          <Route
                            path="email-verification/:token"
                            element={<EmailVerification />}
                          />
                          <Route path="login" element={<Login />} />
                          <Route
                            path="forgot-password"
                            element={<ForgotPassword />}
                          />
                          <Route
                            path="reset-password-otp"
                            element={<ResetPasswordLink />}
                          />
                          <Route
                            path="reset-password"
                            element={<ResetPassword />}
                          />
                          {/* Added this */}
                          <Route
                            path="reset-password-successful"
                            element={<ResetPasswordSuccessful />}
                          />
                        </Route>
                        <Route path="/checkout" element={<Checkout />} />{" "}
                        {/* <Route path="/profile" element={<Profile />} />{" "} */}
                        {/* Customer Routes */}
                        <Route path="/*" element={<MainLayout />} />
                        {/* display 404 page */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </Suspense>
                </BrowserRouter>
              </div>
            </ErrorBoundary>
          </PersistGate>
        </Provider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
