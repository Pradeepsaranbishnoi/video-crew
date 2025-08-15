import { Outlet } from "react-router-dom";
import Header from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
