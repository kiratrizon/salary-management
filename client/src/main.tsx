import { StrictMode, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App.tsx";
import { fetchData } from "./tools/globalfunctions.ts";
import { Login } from "./User/ui/index.tsx";

interface ProtectedRouteProps {
  children: ReactNode;
  entity?: "user" | "admin"; // or whatever your entity types are
}

const ProtectedRoute = ({ children, entity = "user" }: ProtectedRouteProps) => {
  const [allowed, setAllowed] = useState<boolean>(false);
  const where = entity === "user" ? "/login" : `/${entity}/login`;

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem(`${entity}Token`);
      if (token) {
        const [error, data] = await fetchData({
          url: `/api/${entity}/me`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!error && data?.data) {
          setAllowed(true);
          return;
        }
        localStorage.removeItem(`${entity}Token`);
      }
      setAllowed(false);
    };

    checkAuth();
  }, []);

  if (!allowed) return <Navigate to={where} />;
  return children;
};

const GuestRoute = ({ children, entity = "user" }: ProtectedRouteProps) => {
  const [allowed, setAllowed] = useState<boolean>(false);
  const where = entity === "user" ? "/" : `/${entity}`;
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem(`${entity}Token`);
      if (token) {
        const [error, data] = await fetchData({
          url: `/api/${entity}/me`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!error && data?.data) {
          setAllowed(true);
          return;
        }
        localStorage.removeItem(`${entity}Token`);
      }
      setAllowed(false);
    };

    checkAuth();
  }, []);

  if (allowed) return <Navigate to={where} />;
  return children;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/">
          <Route index element={<ProtectedRoute children={<App />} />} />
          <Route
            path="login"
            element={<GuestRoute children={<Login entity="user" />} />}
          />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
