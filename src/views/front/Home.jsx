import AudioSection from "../../components/home/AudioSection";
import { BlogSection } from "../../components/home/BlogSection";
import HeroBanner from "../../components/home/HeroBanner";
import RecommandedProducts from "../../components/home/RecommandedProducts";
import { Testimonials } from "../../components/home/Testimonials";
import WearableSection from "../../components/home/WearableSection";

function Home(){

    return(
        <>
           <HeroBanner />
        <div className="container">
        <RecommandedProducts />
        <AudioSection />
        <WearableSection />
        <Testimonials />
        <BlogSection />
      {/* 
      
      <WearableSection />
      <Testimonials />
      <BlogSection /> */}
    
        
        </div>
        
        </>
    )
}

export default Home;