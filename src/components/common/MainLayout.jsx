import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-background-light-gray min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[160px] lg:pt-[200px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
