import * as React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import EditorPage from "./pages/editor";
import HomePage from "./pages/home";
import SettingsPage from "./pages/settings";
import { Di } from "./services/di";
import { RecentFilesService } from "./services/recent-files/recent-files.service";
import { LocalRecentFilesStrorage } from "./services/recent-files/storage/local.storage";
import "./styles.css";
import "../index.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const di = Di.instance;
di.register(
  "recent-files",
  new RecentFilesService(new LocalRecentFilesStrorage())
);

const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/editor",
    element: <EditorPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);

const root = createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
