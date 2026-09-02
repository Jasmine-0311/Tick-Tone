/* eslint-disable no-irregular-whitespace */
import { Link } from "react-router";

export default function WearableSection() {
     const category = "智慧穿戴與錶款";
  return (
    <section className="mb-20">
      <h2 className="home-title mb-md-16 mb-6">智慧穿戴與錶款</h2>
      <div className="row">
      <div className="d-flex flex-column-reverse flex-md-row justify-content-end gap-md-20 gap-4 align-items-center">
   
    <div className="col-md-4 mb-md-4 mb-2 text-center text-md-start">
    <div className="text-box">
    <h2 className="h3 mb-4">
    讓時間，不只存在螢幕角落
    </h2>
    <p className="body3">
       時聲​選物​精選​的​智慧​錶與簡約​錶款，​ 讓​你​抬手​就​能​看見​今天​的​節奏。​ ​把​重要​的​訊息​搬​到​手腕，​讓​你​少​看​一​次​手機、​多​保留​一​次​專心。​ ​無論​是​全功​能​智​慧錶，​或是​極簡​指針錶，​ 我​們​都​希望​它​們成為​你​掌握​工作​與​生活​步調​的​小型​控制台。​  </p>

        </div>
        <Link to={`/products?category=${category}`} className="btn btn-secondary  mt-4">查看更多商品
            <i className="bi bi-arrow-right "></i>
        </Link>

    
    </div>
     <div className="col-md-6 mb-md-4 mb-2">
    <img src="src/assets/img/002.svg" alt="Wearable Equipment" className="page-photo" />
    </div>
      </div>
        
      </div>
    </section>
  );
}