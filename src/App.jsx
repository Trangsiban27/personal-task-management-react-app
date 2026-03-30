import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Button } from "./components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { routes } from "./config/routes";
import AuthLayout from "./layouts/AuthLayout";
import { useDispatch } from "react-redux";
import { getCurrent } from "./slices/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(getCurrent());
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {routes?.map((group, index) => {
          if (!group.layout) {
            return (
              <Route key={index} path={group.path} element={group.element} />
            );
          }

          const layout =
            group?.layout === "main" ? <MainLayout /> : <AuthLayout />;

          if (group.layout === "main") {
            return (
              <Route element={<ProtectedRoute />} key={index}>
                <Route element={layout}>
                  {group?.children?.map((route) => (
                    <Route
                      key={route?.path}
                      path={route?.path}
                      element={route?.element}
                    />
                  ))}
                </Route>
              </Route>
            );
          }

          return (
            <Route key={index} element={layout}>
              {group?.children?.map((route) => (
                <Route
                  key={route?.path}
                  path={route?.path}
                  element={route?.element}
                />
              ))}
            </Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
