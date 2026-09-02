/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
 

import { addCart } from "../../api/api";
import { getProductSpecs } from "../../data/Productcontentconfig";
import RecommandedProducts from "../../components/home/RecommandedProducts";
import { useParams } from "react-router";

const Api_Path = import.meta.env.VITE_API_PATH;
const Api_Base = import.meta.env.VITE_API_BASE;

const TABS = [
  { key: "description", label: "產品說明" },
  { key: "notice", label: "注意事項" },
  { key: "spec", label: "產品規格" },
];

function SingleProducts() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    let isMounted = true; 
    
    
    setProduct(null);

    const handleView = async (productId) => {
      try {
        const response = await axios.get(
          `${Api_Base}/api/${Api_Path}/product/${productId}`
        );
        if (isMounted) {
          setProduct(response.data.product);
          setActiveImage(0);
          setActiveTab("description");
          setQty(1);
        }
      } catch (error) {
        console.error("取得商品失敗", error);
      }
    };

    handleView(id);

    return () => {
      isMounted = false; // 清除機制
    };
  }, [id]);

  // 1. 規格：讀取 Productcontentconfig.js
  const specs = useMemo(() => getProductSpecs(product), [product]);

 
 const notices = useMemo(() => {
    if (!product?.content) return [];
    if (Array.isArray(product.content)) return product.content;
    return product.content.split("\n").filter((item) => item.trim() !== "");
  }, [product]);

  const handleAddCart = async () => {
    try {
      await addCart(product.id, qty);
    } catch (error) {
      console.error("加入購物車失敗", error);
    }
  };

  const handleQtyChange = (delta) => {
    setQty((prev) => Math.max(1, prev + delta));
  };

  if (!product) return <h2 className="text-center py-5">Loading...</h2>;

  const {
    title,
    price,
    origin_price: originPrice,
    imageUrl,
    imagesUrl = [],
    description,
    content,
    unit,
  } = product;

  const gallery = imagesUrl.length ? imagesUrl : [imageUrl];

  return (
    <div className="container mt-3">
      {/* 麵包屑 */}
      <nav className="product-detail__breadcrumb mb-4">
        <a href="/">首頁</a>
        <span className="mx-1">&gt;</span>
        <a href={`/products?category=${product.category}`}>{product.category}</a>
        <span className="mx-1">&gt;</span>
        <span>{title}</span>
      </nav>

      <div className="row justify-content-start">
        {/* 左側：圖片 */}
        <div className="col-12 col-md-7">
          <div className="product-detail__gallery-main mb-2">
            <img src={gallery[activeImage]} className="w-100" alt={title} />
          </div>
          {gallery.length > 1 && (
            <div className="d-flex justify-content-center gap-3">
              {gallery.slice(0, 3).map((img, i) => (
                <button
                  type="button"
                  key={img + i}
                  className={`product-detail__thumb border-0 p-0 ${
                    activeImage === i ? "is-active" : ""
                  }`}
                  onClick={() => setActiveImage(i)}
                >
                  <img
                    src={img}
                    className="product-card-img"
                    alt={`${title} ${i + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 右側：商品資訊 */}
        <div className="col-12 col-md-4 offset-md-1">
          <h3 className="h3 mb-4">{title}</h3>
          <div className="d-flex mb-4">
            <span className="badge body3 text-bg-secondary me-2">VIP 會員獨享</span>
            <span className="badge body3 text-bg-secondary">周年慶，滿千送百</span>
          </div>
          <div className="product-detail__price h5 mb-4">
            NTD {price?.toLocaleString()}
            {originPrice > price && (
              <span className="ms-3 text-decoration-line-through body3">
                NTD {originPrice?.toLocaleString()}
              </span>
            )}
          </div>

          {/* 數量 */}
          <div className="mb-4">
            <span className="body3 d-block mb-2">數量</span>
            <div className="d-inline-flex align-items-center qty px-3 py-1">
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => handleQtyChange(-1)}
              >
                −
              </button>
              <span>{qty}</span>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => handleQtyChange(1)}
              >
                +
              </button>
              {unit && <span className="body3 ms-2">{unit}</span>}
            </div>
          </div>

          <button
            className="btn btn-secondary mt-2 me-4"
            onClick={(e) => {
              e.stopPropagation();
              handleAddCart();
            }}
          >
            <i className="bi bi-cart3"></i>
            <span className="ms-2">加入購物車</span>
          </button>
          <button className="btn btn-tertiary mt-2">
            <i className="bi bi-bag"></i>
            <span className="ms-2">立即購買</span>
          </button>
        </div>
      </div>

      {/* 頁籤：產品說明 / 注意事項 / 產品規格 */}
      <div className="tab mt-5">
        <div className="d-flex justify-content-center gap-5 tab border-bottom mb-4">
          {TABS.map((tab) => {
            if (tab.key === "description" && !description) return null;
            if (tab.key === "notice" && !content) return null;
            if (tab.key === "spec" && !specs) return null;

            return (
              <button
                type="button"
                key={tab.key}
                className={`btn btn-link tab-content text-decoration-none ${
                  activeTab === tab.key ? "fw-bold" : ""
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mx-12 text-start  tab-content" style={{ maxWidth: 760 }}>
          {activeTab === "description" && (
            <div className="body3 d-flex text-start  style-description">
              {description ? (
                <p style={{ whiteSpace: "pre-line" }}>{description}</p>
              ) : (
                <p className="text-muted">暫無商品說明</p>
              )}
            </div>
          )}

          {activeTab === "notice" && notices.length > 0 && (
            <ol className="body3 ps-4 align-items-center">
              {notices.map((notice, index) => (
                <li key={index} className="mb-2">
                  {notice}
                </li>
              ))}
            </ol>
          )}

          {activeTab === "spec" && specs && (
            <table className="table table-bordered">
              <tbody>
                {Object.entries(specs).map(([label, value]) => (
                  <tr key={label}>
                    <th
                      scope="row"
                      className="bg-light"
                      style={{ width: "30%" }}
                    >
                      {label}
                    </th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <RecommandedProducts category={product.category} currentProductId={product.id} />
    </div>
  );
}

export default SingleProducts;