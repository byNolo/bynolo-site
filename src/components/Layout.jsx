import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-[#050806] text-white">
        <NavBar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
