//import node module libraries
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

//import routes files
import AuthenticationLayout from "layouts/AuthenticationLayout";
import RootLayout from "layouts/RootLayout";
import UsersStats from "./pages/stats/UsersStats";
import ProductsStats from "./pages/stats/ProductsStats";
import OrdersStats from "./pages/stats/OrdersStats";
import CouponsStats from "./pages/stats/CouponsStats";
import Dashboard from "pages/dashboard/Index";
import Billing from "pages/dashboard/pages/Billing";
import Pricing from "pages/dashboard/pages/Pricing";
import Settings from "pages/dashboard/pages/Settings";
import Profile from "pages/dashboard/pages/Profile";
import NotFound from "pages/dashboard/pages/NotFound";
import LayoutVertical from "pages/dashboard/LayoutVertical";
import Documentation from "pages/dashboard/Documentation";
import ChangeLog from "pages/dashboard/Changelog";
import ApiDemo from "./pages/dashboard/pages/ApiDemo";

// import bootstrap components
import Accordion from "bootstrap-components/Accordions";
import Alerts from "bootstrap-components/Alerts";
import Badges from "bootstrap-components/Badges";
import Breadcrumbs from "bootstrap-components/Breadcrumbs";
import ButtonGroup from "bootstrap-components/ButtonGroup";
import Buttons from "bootstrap-components/Buttons";
import Cards from "bootstrap-components/Cards";
import Carousels from "bootstrap-components/Carousels";
import CloseButtons from "bootstrap-components/CloseButton";
import Collapses from "bootstrap-components/Collapse";
import Dropdowns from "bootstrap-components/Dropdowns";
import Listgroups from "bootstrap-components/ListGroup";
import Modals from "bootstrap-components/Modals";
import Navbars from "bootstrap-components/Navbars";
import Navs from "bootstrap-components/Navs";
import Offcanvas from "bootstrap-components/Offcanvas";
import Overlays from "bootstrap-components/Overlays";
import Paginations from "bootstrap-components/Paginations";
import Popovers from "bootstrap-components/Popovers";
import Progress from "bootstrap-components/Progress";
import Spinners from "bootstrap-components/Spinners";
import Toasts from "bootstrap-components/Toasts";
import Tooltips from "bootstrap-components/Tooltips";
import Tables from "bootstrap-components/Tables";
import SignIn from "pages/auth/SignIn";
import SignUp from "pages/auth/SignUp";
import ForgetPassword from "pages/auth/ForgetPassword";

const App = () => {
  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Navigate to="/auth/sign-in" replace />,
        },
        {
          id: "dashboard",
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          id: "pages",
          path: "pages",
          children: [
            { path: "profile", element: <Profile /> },
            { path: "settings", element: <Settings /> },
            { path: "billing", element: <Billing /> },
            { path: "pricing", element: <Pricing /> },
            { path: "api-demo", element: <ApiDemo /> },
          ],
        },
        { path: "documentation", element: <Documentation /> },
        { path: "changelog", element: <ChangeLog /> },
        { path: "layout-vertical", element: <LayoutVertical /> },
        {
          id: "components",
          path: "components",
          children: [
            { path: "accordions", element: <Accordion /> },
            { path: "alerts", element: <Alerts /> },
            { path: "badges", element: <Badges /> },
            { path: "breadcrumbs", element: <Breadcrumbs /> },
            { path: "button-group", element: <ButtonGroup /> },
            { path: "buttons", element: <Buttons /> },
            { path: "cards", element: <Cards /> },
            { path: "carousels", element: <Carousels /> },
            { path: "close-button", element: <CloseButtons /> },
            { path: "collapse", element: <Collapses /> },
            { path: "dropdowns", element: <Dropdowns /> },
            { path: "list-group", element: <Listgroups /> },
            { path: "modal", element: <Modals /> },
            { path: "navbar", element: <Navbars /> },
            { path: "navs", element: <Navs /> },
            { path: "offcanvas", element: <Offcanvas /> },
            { path: "overlays", element: <Overlays /> },
            { path: "pagination", element: <Paginations /> },
            { path: "popovers", element: <Popovers /> },
            { path: "progress", element: <Progress /> },
            { path: "spinners", element: <Spinners /> },
            { path: "tables", element: <Tables /> },
            { path: "toasts", element: <Toasts /> },
            { path: "tooltips", element: <Tooltips /> },
          ],
        },
        {
          id: "statistical",
          path: "/stats",
          element: <AuthenticationLayout />,
          children: [
            { path: "users", element: <UsersStats /> },
            { path: "products", element: <ProductsStats /> },
            { path: "orders", element: <OrdersStats /> },
            { path: "coupons", element: <CouponsStats /> },
          ],
        },
      ],
    },
    {
      id: "auth",
      path: "/auth",
      element: <AuthenticationLayout />,
      children: [
        { path: "sign-in", element: <SignIn /> },
        { path: "sign-up", element: <SignUp /> },
        { path: "forget-password", element: <ForgetPassword /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
