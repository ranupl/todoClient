import React from "react";
import Register from "./Components/Register";
import LoginPage from "./Components/LoginPage";
import TodoList from "./Components/TodoList";
import TodoEdit from "./Components/TodoEdit";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PublicRoute from "./Routes/PublicRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <TodoList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <TodoEdit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
