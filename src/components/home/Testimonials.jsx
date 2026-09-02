import { mockReviews } from "../../data/mockReviews";

export function Testimonials() {
    return(
        <section className="mb-20">
      <h2 className="home-title mb-md-16 mb-6">用戶推薦</h2>
      <div className="d-flex justify-content-between align-items-center px-4 ">
      <div className="d-flex flex-nowrap flex-md-wrap overflow-auto overflow-md-visible gap-6 pb-2">
    {mockReviews.map((review) => (
      <div key={review.id} className="card border-0 flex-shrink-0" style={{ width: '18rem' }}>
        <img src={review.image} alt={review.title} className="textCard-img-top mb-6" />
        <div className="text-card-body d-flex flex-column justify-content-between">
            <div>
          <h3 className="card-title h6 mb-2">{review.title}</h3>
          <p className="card-text card-text-body ">{review.content}</p>

            </div>
        <p className="mb-2 text-author">{review.author}</p>

        </div>
      </div>
      
    ))}

    
    </div>  
      </div>
    </section> 
    )
}