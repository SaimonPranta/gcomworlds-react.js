import React from "react";
import "./styles.scss";
import Categories from "./Categories/index";
import Header from "../../Shades/Header/index";
import Footer from "../../Shades/Footer/Footer";
import MobileBottomNav from "../../Shades/MobileBottomNav/index";
import { useLocation } from "react-router-dom";
const footerIgnorePage = ["/"];

const Index = ({ children }) => {
  const { pathname } = useLocation();
  console.log("pathname", pathname);

  return (
    <main>
      <Header />
      <section>
        <Categories />
        <section className="main-page-section" id="page-body">
          {children}
        </section>
      </section>

      {!footerIgnorePage.includes(pathname) && <Footer />}

      <MobileBottomNav />
    </main>
  );
};

export default Index;
