import { useEffect, useState } from "react";
import { deleteAllCart, deleteCart, getCart, updateCart } from "../../api/api";
import "axios";
import { Link } from "react-router";

import { RotatingLines } from "react-loader-spinner";

function Cart(){
  const [cart , setCart] =useState([])
  const [loadingCartId, setLoadingCartId] = useState(null);
  
  

    const fetchCart =async ()=>{
            try {
                const data = await getCart();
                setCart(data)
            } catch (error) {
                console.log('fetchCartData 失敗')
            }
        }
    useEffect(()=>{
        fetchCart();
    },[]);

    const handleUpdateCart =async (cartId,productId, qty)=>{
        if(qty <1) return;
        setLoadingCartId(cartId);
        try {
            await updateCart(cartId, productId, qty)
            await fetchCart();
        } catch (error) {
            console.log("詳細錯誤資訊：", error)
        }finally{
          setLoadingCartId(null);
        }
    }

    const handleDeleteCart = async (cartId) => {
         try {
            await deleteCart(cartId)
            await fetchCart();
        } catch (error) {
            console.log("詳細錯誤資訊：", error)
        }
    }

     const handleDeleteAllCart = async (cartId) => {
         try {
            await deleteAllCart(cartId)
            await fetchCart();
        } catch (error) {
            console.log("詳細錯誤資訊：", error)
        }
    }
    

    return(
        <>
        <div className="container">
         <h2 className="h2 mb-10 mt-10">購物車</h2>
         


   <div className="cart-list">
  {cart?.carts?.map((cartItem) => (
    <div key={cartItem.id} className="cart-item">
      
      <div className="cart-item__img-box">
        <img src={cartItem.product.imageUrl} alt={cartItem.product.title} />
      </div>

      <div className="cart-item__info">
        <div className="title">{cartItem.product.title}</div>
      </div>

      {/* 數量*/}
      <div className="cart-item__qty">
        <button 
          onClick={() => handleUpdateCart(cartItem.id, cartItem.product_id, cartItem.qty - 1)}
          disabled={loadingCartId === cartItem.id || cartItem.qty <= 1}
        >
           − </button>
        <input type="text" value={cartItem.qty} readOnly />
        <button 
          onClick={() => handleUpdateCart(cartItem.id, cartItem.product_id, cartItem.qty + 1)}
          disabled={loadingCartId === cartItem.id}
        > + </button>
      </div>

      {/* 小計 */}
      <div className="cart-item__price">
        ${cartItem.final_total?.toLocaleString()}
      </div>

      {/* 刪除按鈕 */}
      <button className="cart-item__del"
        onClick={()=>handleDeleteCart(cartItem.id)}>
        <i className="bi bi-x-lg"></i>
      </button>

    </div>
  ))}
</div>
<div className="d-flex justify-content-between align-items-start mt-8">
<button type="button" className="btn btn-outline-danger mb-8 "
 onClick={() => handleDeleteAllCart()}>
  清空購物車
</button>
<div className="cart-footer">
  <div className="cart-footer__total-box">
    <span className="label">總計:</span>
    <span className="amount">
      $ {Number(cart.final_total || 0).toLocaleString()}
    </span>
  </div>
  {<Link to="/checkout" className="btn btn-payment btn-primary mt-6 px-5 mb-md-6 mb-2">前往結帳</Link> }
  </div>
</div>
</div>


    
        </>
       
    )
  }

export default Cart;



