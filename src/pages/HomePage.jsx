import React, { useEffect } from "react";
import MenuPage from "./MenuPage";
// import axios from "axios";
import { useAuth } from "../auth/AuthProvider";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "./swipe.css";
import FruitPage from "./FruitPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { user } = useAuth();
  // const navigate = useNavigate();

  // const handleLearnMore = () => {
  //   navigate("/menu"); // Specify the path to MenuPage
  // };

  console.log(user);
  return (
    <>
      <Header />
      <section
        className="bg-home w-full flex justify-center items-center px-5 h-screen bg-white "
        id="home"
      >
        <div>
          <h2 className="text-white text-center font-bold max-sm:text-3xl text-5xl">
            THE SWEET WARMTH OF HOME IN EVERY BITE, <br /> PREMIUM JAM FOR YOUR
            SPECIAL MOMENTS.
          </h2>

          {/* <button
            className="btn btn-outline mt-10 max-sm:mt-5 btn-success"
            onClick={handleLearnMore}
          >
            learn more
          </button> */}
        </div>

        {/* <div className="w-full h-full px-5 flex justify-center items-center relative">
          <Swiper
            navigation={true}
            modules={[Autoplay, Pagination]}
            className="mySwiper h-80 rounded-xl shadow-2xl"
            spaceBetween={30}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
          >
            <SwiperSlide>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8pMEJU9ATBIwSFIr6RlwTLJlyK7xleHhsg9ki1KxlQ2euRhG7H0zKJchCrYPkta6GfVM&usqp=CAU"
                alt="gambar rusak"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://img.pikbest.com/ai/illus_our/20230426/26c3111680bd3d9bdd5592253064c545.jpg!w700wp"
                alt="gambar rusak"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://www.astronauts.id/blog/wp-content/uploads/2023/06/Cara-Membuat-Selai-Buah-Homemade-yang-Gampang-dan-Enak-1024x683.jpg"
                alt="gambar rusak"
              />
            </SwiperSlide>
          </Swiper>

          
        </div> */}
      </section>
      <FruitPage />
      <MenuPage />
      <Footer />
    </>
  );
};

export default HomePage;
