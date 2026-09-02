import {  useEffect, useState } from "react";
import Products from "../../views/front/Products";
import ProductCard from "../productCard";
import { getProductsApi } from "../../api/api";
import {  useNavigate } from "react-router";


function RecommandedProducts() {
    const pageSize = 4;
    const [allProducts, setAllProducts ] =useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
    const fetchRecommanded = async() =>{
        const {products} = await getProductsApi(null,1);
        setAllProducts(products);
    }
    fetchRecommanded();
    },[]);
const visibleProducts  =allProducts.length === 0 
  ? [] 
  : Array.from({ length: pageSize }, (_, idx) =>
      allProducts[(startIndex + idx) % allProducts.length]
    );
const handleNext = () =>
  setStartIndex(i => {const next = i +pageSize; return next>= allProducts.length ? 0 : next;});
const handlePrev = () =>
  setStartIndex(i => { const prev = i - pageSize;
    return prev < 0
      ? Math.max(allProducts.length - pageSize, 0)
      : prev;});

    return (
        <>
 <section className="recommended-products mb-md-16 mb-6">
      <div className="container">
        <div className="d-flex">
       
        <h2 className="home-title mb-md-16 mb-6">推薦商品</h2>
        
        </div>

        <div className="d-flex justify-content-between align-items-center px-4">
       
          <button
            type="button"
            className="d-none d-md-flex products-arrow products-arrow-prev align-items-center  mx-3"
            aria-label="上一頁"  onClick={handlePrev} 
          >
            <img src="src/assets/img/Component 11.svg" alt="上一頁" />
          </button>

          
          <div className="row  g-4">
            {visibleProducts.map(product => (
                <div className="col-6 col-md-3 mb-16" key={product.id}>
                <ProductCard 
                    product={product}
                    showCart={true}
                    onClick={() => navigate(`/product/${product.id}`)} />
                </div>
                ))}
          </div>

          <button
            type="button"
            className="d-none d-md-flex products-arrow products-arrow-next align-items-center px-3"
            aria-label="下一頁"  onClick={handleNext}  
          >
            <img src="src/assets/img/Component 12.svg" alt="下一頁" />
          </button>
        </div>
      </div>
    </section>

        </>

    


)}



export default RecommandedProducts;
