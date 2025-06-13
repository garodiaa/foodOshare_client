import React from 'react';
import Slider from "react-slick";
import "../App.css";
import img1 from "../assets/banner_1.jpg";
import img2 from "../assets/banner_2.jpg";
import img3 from "../assets/banner_3.jpg";
import img4 from "../assets/banner_4.jpg";


const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        pauseOnHover: true,
        accessibility: true, 
        arrows: false, 
    };



    return (
        <Slider {...settings} className="w-full mx-auto md:mb-20">
            <div className="w-full h-full">
                <img src={img1} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-full">
                <img src={img2} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-full">
                <img src={img3} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-full">
                <img src={img4} alt="" className="w-full h-full object-cover" />
            </div>
        </Slider>
    );
};

export default Banner;