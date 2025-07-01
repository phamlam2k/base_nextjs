// import Navbar from '@/components/layouts/navbar';
// import Sidebar from '@/components/layouts/sidebar';
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex">
        {/* <Sidebar /> */}
        <main className="flex-1 p-5">{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
