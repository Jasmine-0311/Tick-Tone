/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import ProductCard from "../../components/productCard";
import { getCategoriesApi, getProductsApi } from "../../api/api";
import Category from "../../components/category";
import Pagination from "../../components/Pagination";

const categoryDescriptions = {
  "全部商品": "探索我們精選的全系列高品質音訊產品，從聲音、穿戴到桌面細節，每一件都是為了讓日常更乾淨、更穩定。",
  "頭戴式/耳罩式耳機": "當你需要長時間專心工作、剪片、寫程式或沉浸音樂時，頭戴式／耳罩式耳機更完整的包覆、更穩定的音場，替你隔開鍵盤聲、談話聲與咖啡機的嘶嘶聲，只留下你想聽見的節奏。",
  "真無線藍牙耳機": "擺脫線材束縛，無論是通勤運動還是商務通話，提供最極致的便攜性與穩定的連線品質。",
  "智慧穿戴與錶款": "時間不只是數字，也是風格的一部分。在科技與外型之間，找到剛好的平衡。",
};

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true); 

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');  
  const pageParam = searchParams.get('page') || 1;
  const navigate = useNavigate();

  const currentDescription = categoryDescriptions[categoryParam] || categoryDescriptions["全部商品"];

  // 2. 第一次進頁面只抓一次分類，避免重複連線
  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesApi();
        if (isMounted) setCategories(data);
      } catch (error) {
        console.error("分類載入錯誤");
      }
    };
    fetchCategories();
    return () => { isMounted = false; };
  }, []);


  useEffect(() => {
    let isMounted = true;
    const fetchProduct = async () => {
      setIsLoading(true); 
      try {
        const res = await getProductsApi(categoryParam, pageParam);
        if (isMounted) {
          setProducts(res.products || []);
          setPagination(res.pagination || {});
        }
      } catch (error) {
        console.error("抓取商品失敗:", error);
      } finally {
        if (isMounted) setIsLoading(false); 
      }
    };

    fetchProduct();
    return () => { isMounted = false; };
  }, [categoryParam, pageParam]);

  const handlePageChange = (page) => {
    const params = { page: page.toString() };
    if (categoryParam) {
      params.category = categoryParam;
    }
    setSearchParams(params);
  };

  return (
    <>
      <section className="product-list-hero mb-md-20 mb-10">
        <div className="container">
          <div className="hero-text">
            <h2>商品列表</h2>
          </div>
        </div>
      </section>

      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb custom-separator">
            <li className="breadcrumb-item">
              <span 
                className="cursor-pointer text-white opacity-50 text-decoration-none mx-2" 
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
              >
                首頁
              </span>
              <i className="bi bi-chevron-right"></i>
            </li>
            <li className="breadcrumb-item active text-white" aria-current="page">
              {categoryParam || "全部商品"}
            </li>
          </ol>
        </nav>

        <div className="row d-flex">
          <div className="col-md-3">
            <Category categories={categories} />
          </div>

          <div className="col-md-9">
            <div className="mb-md-6 mb-4">
              <h2 className="mb-4 h2">{categoryParam || "全部商品"}</h2>
              <p className="mb-6">{currentDescription}</p>
              <p className="mt-4 opacity-50 text-end body3">
                共 {products?.length || 0} 項商品
              </p>
            </div>

            <div className="row g-6">
              
              {isLoading ? (
                <div className="col-12 text-center py-15">
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="body3 text-muted mt-3">商品載入中...</p>
                </div>
              ) : products && products.length > 0 ? (
                products.map((product) => (
                  <div className="col-6 col-md-4 mb-16" key={product.id}>
                    <ProductCard 
                      product={product}
                      showCart={false}
                      onClick={() => navigate(`/product/${product.id}`)} 
                    />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-15">
                  <p className="body3 text-muted">此分類目前沒有商品</p>
                </div>
              )}
            </div>

            <div className="mt-10">
              {pagination?.total_pages > 1 && (
                <Pagination 
                  pagination={pagination} 
                  onChangePage={handlePageChange} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;