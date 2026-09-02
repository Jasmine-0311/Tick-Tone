import { useState } from "react";
import { addCart } from "../api/api";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { creatAsyncMessage } from "../slice/messageSlice";

const ProductCard = ({ product, showCart = false, onClick,  }) => {
     const [loadingCartId] = useState(null);
    // const [loadingPrId, setLoadingPrId] = useState(null);
    const dispatch = useDispatch();
    const handleAddCart =async()=>{
        try {
            
            const response = await addCart(product.id, 1);
            dispatch(creatAsyncMessage({
            success: response.data.success ?? true, // 如果 response.data 沒有 success 欄位，預設為 true
            message: response.data.message || '已加入購物車'
        }));
            // if(response.success){alert('已加入購物車');}
        } catch (error) {
            console.log('加入失敗')
            dispatch(creatAsyncMessage({
            success: false,
            message: error.response?.data?.message || '加入購物車失敗'
        }));
        }
    }
    return (
        <div className="card product-card h-100" onClick={onClick} style={{ cursor: 'pointer' }}>
            <img 
                src={product.imageUrl} 
                className="card-img-top product-card-img mb-3" 
                alt={product.title} 
            />
            <div className={`card-body  
                ${showCart ? 'd-flex justify-content-between align-items-center gap-3' : 'text-center d-flex flex-column ' }`}>
                <div className={showCart?'text-start':''}>
                <h5 className="card-title body2">{product.title}</h5>
                <p className="product-card-text-a card-text body3">
                    ${Number(product.origin_price).toLocaleString()}
                </p>

                </div>
                {showCart && (
                    <button 
                        className="cart-btn  btn-primary btn btn-sm-secondary  "
                        onClick={(e) => {
                            e.stopPropagation(); 
                            handleAddCart();
                        }}
                        disabled={loadingCartId === product.id}
                    >
                        {
                            loadingCartId === product.id ? (
                                <RotatingLines
                                color="grey"
                                width={80}
                                height={16}
                                />
                            ) : ''
                        }
                       <i className="bi bi-cart3 "></i>
                       <span className="d-sm-none ms-2">加入購物車</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
