import { createBrowserRouter } from "react-router-dom";
import { Error, AddonsManage, Setting } from "@/components/MainContent/index";
import RootLayout from "@/RootLayout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    path: "/",
    children: [
      {
        path: "addonsManage",
        element: <AddonsManage />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "error",
        element: <Error />,
      },
    ],
  },
]);
