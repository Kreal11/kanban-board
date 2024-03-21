import { Outlet } from "react-router";
import Header from "../header/Header";
import { Suspense } from "react";

const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
