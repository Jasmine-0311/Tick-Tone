/* eslint-disable no-irregular-whitespace */
import { Link } from "react-router";

export default function AudioSection() {
  const category = "頭戴式、耳罩式耳機";
  return (
    <section className="mb-20">
      <h2 className="home-title mb-md-16 mb-6">個人音訊設備</h2>
      <div className="row">
      <div className="d-flex flex-column flex-md-row   justify-content-start  gap-md-20 gap-4 align-items-center">
    <div className="col-md-6 mb-md-4 mb-2">
    <img src="src/assets/img/001.svg" alt="Audio Equipment" className="page-photo" />
    </div>
    <div className="col-md-4 mb-md-4 mb-2 text-center text-md-start">
    <div className="text-box">
    <h2 className="h3 mb-4">替​你​的​專注，​設置​一​個​獨立聲場
    </h2>
    <p className="body3">
        時聲​選物​的​個人​音訊​設備，​ 從入​耳式​耳機、​頭戴式​耳機​到​桌上​小​音箱，​ 讓​你​聽見​該聽​的、​關掉​不​需要​的。​    </p>

        </div>
        <Link to={`/products?category=${category}`} className="btn btn-secondary  mt-4">查看更多商品
            <i className="bi bi-arrow-right "></i>
        </Link>

    
    </div>
      </div>
        
      </div>
    </section>
  );
}