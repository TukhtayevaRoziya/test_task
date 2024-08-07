import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import PrivateRoute from "./utility/PrivateRoute";
import authToken from "./utility/authToken";
import store from "./redux/store";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  useEffect(() => {
    if (localStorage.token) {
      authToken(localStorage.token);
    }

    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: "LOGOUT" });
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route
          path="dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;