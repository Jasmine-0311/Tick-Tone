import { useRef } from "react";
import { useEffect } from "react";
import Swiper from "swiper";
import { Navigation,  Autoplay} from "swiper/modules";
import 'swiper/css';
import { Link } from "react-router";

export default function HeroBanner() {

    const swiperRef =useRef(null);

    useEffect(() => {
        const swiper = new Swiper(swiperRef.current, {
      // Optional parameters
      modules: [Navigation, Autoplay],
      direction: 'horizontal',
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      
    });
    return ()=> {
      swiper.destroy(true, true); 
    };
    }, [])

  return (
    <section className="hero-banner position-relative mb-md-20">

      <div className="swiper" ref={swiperRef}>
  <div className="swiper-wrapper">

    <div className="swiper-slide">
        <div className="hero-bg">
        <img src="src/assets/img/banner-1.svg" alt="banner-1" className="hero-img" />
      </div>
         
        <div className="container position-relative ">
        <div className="d-flex flex-column justify-content-center align-items-start align-items-md-start text-md-start ">
          <h1 className="h1 mb-6">
            少一點喧囂，<br className="d-md-none d-inline" />
            多一點沉靜
          </h1>
         <Link to="/products" className="btn btn-primary">
            立即選購 <span className="ms-1">→</span>
            </Link>
        </div>
        </div>
      </div>
    <div className="swiper-slide"><div className="hero-bg">
        <img src="src/assets/img/banner-2.svg" alt="banner-2" className="hero-img" />
      </div>
         
        <div className="container position-relative ">
        <div className="d-flex flex-column justify-content-center align-items-start align-items-md-start text-md-start ">
          <h1 className="h1 mb-6">
            少一點雜訊，<br className="d-md-none d-inline" />
            多一點專注
          </h1>
          <Link to="/products" className="btn btn-primary">
            立即選購 <span className="ms-1">→</span>
          </Link>
        </div>
        </div></div>
    <div className="swiper-slide"><div className="hero-bg">
        <img src="src/assets/img/banner-3.svg" alt="banner-3" className="hero-img" />
      </div>
         
        <div className="container position-relative ">
        <div className="d-flex flex-column justify-content-center align-items-start align-items-md-start text-md-start ">
          <h1 className="h1 mb-6">
            少一點干擾，<br className="d-md-none d-inline" />
            多一點節奏
          </h1>
          <Link to="/products" className="btn btn-primary">
            立即選購 <span className="ms-1">→</span>
          </Link>
        </div>
        </div></div>
    
  </div>
 

  <div className="swiper-button-prev mx-6">
        <img src="src/assets/img/Component 11.svg" alt="icon-prev" />

  </div>
  <div className="swiper-button-next mx-6">
        <img src="src/assets/img/Component 12.svg" alt="icon-next" />

  </div>



</div>



  

    </section>
  );
}