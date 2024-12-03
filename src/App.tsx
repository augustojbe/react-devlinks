import { createBrowserRouter } from "react-router";
import Home from "./pages/home";
import NetWorks from "./pages/networks";
import Login from "./pages/login";
import Admin from "./pages/admin";
import NotFound from "./pages/notfound";
import Privete from "./routes/Privet";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <Privete>
        <Admin />
      </Privete>
    ),
  },
  {
    path: "/admin/social",
    element: (
      <Privete>
        <NetWorks />
      </Privete>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export { router };
