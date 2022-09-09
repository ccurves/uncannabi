import React from "react";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import HomeNavbar from "../components/HomeNavbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <HomeNavbar />
      <Slider />
      <Categories />
      <Products page="home" />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
