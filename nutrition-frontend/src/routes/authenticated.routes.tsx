import RootLayout from "../components/layouts/RootLayout";
import { Outlet } from "react-router";

const AuthenticatedRoutes = () => {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

export default AuthenticatedRoutes;
