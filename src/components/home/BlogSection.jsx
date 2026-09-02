import { Link } from "react-router";
import { mockArticles } from "../../data/ mockArticles";

export function BlogSection() {
    return(
        <section className="mb-20">
      <h2 className="home-title mb-md-16 mb-6">時聲選物專欄</h2>
      <div className="d-flex justify-content-between align-items-center px-4 ">
      <div className="d-flex flex-nowrap flex-md-wrap overflow-auto overflow-md-visible gap-6 pb-2">
   
    
    {mockArticles.map((article) => (
      <div className="card shadow-sm flex-shrink-0" style={{ width: '18rem' }}  key={article.id}>
        <img src={article.image} alt={article.title} className="blogCard-img-top" />
        <div className="card-body-blog  d-flex flex-column justify-content-between align-items-center">
            <div >
          <p className="mb-2 text-data body4">{article.date}</p>
          <h3 className="card-title body2 mb-2">{article.title}</h3>
          <p className="card-text body3 mb-2">{article.excerpt}</p>
            </div>
          <Link to="/" className="btn btn-blog btn-tertiary mt-auto  ">閱讀更多</Link>
        </div>
      </div>
    ))}

    
    </div>
  
      </div>
    </section> 
    )
}