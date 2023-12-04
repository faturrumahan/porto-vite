import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/dashboard/Dashboard";
import AddProject from "./pages/dashboard/AddProject";
import UpdateProject from "./pages/dashboard/UpdateProject";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  {
    path: "/admin-dashboard",
    children: [
      { path: "/admin-dashboard", element: <Dashboard /> },
      { path: "/admin-dashboard/add", element: <AddProject /> },
      { path: "/admin-dashboard/:idProject", element: <UpdateProject /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
