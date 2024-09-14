// import * as React from "react";
// import * as ReactDOM from "react-dom/client";
// import AuthProvider from "./context/AuthProvider.tsx";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";
// import App from "./App.tsx";
// import Login from "./components/Login.tsx";
// import Signup from "./components/Signup.tsx";
// import ProtectedRoute from "./components/ProtectedRoute.tsx"; 

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,

//     children: [
//       {
//         path: "/dashboard",
//         element: (
//           <ProtectedRoute>
//             {/* Add more nested protected routes here if needed */}
//           </ProtectedRoute>
//         ),
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Signup />,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <RouterProvider router={router} />
//     </AuthProvider>
//   </React.StrictMode>
// );
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import AuthProvider from "./context/AuthProvider.tsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Dashboard from "./components/Dashboard.tsx";
import Logout from "./components/Logout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },{
    path: "dashboard", // No leading slash
    element: <ProtectedRoute />,
    children: [
      {
        path: "me", // No leading slash
        element: <Dashboard />, // The component you want to render for this route
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
