/* eslint-disable no-irregular-whitespace */
import { useState } from "react";
import { Link, Outlet } from "react-router";

function FrontendLayout(){
   const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
        <>
        
        <header>
        <div className="nav-section">
          <div className="container d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="brand-logo mx-8">
                <Link className="nav-link active" aria-current="page" to="/">
                  <img src="/Tick-Tone/img/logo 4.svg" alt="TICK & TONE" height="40" />
                </Link>
              </div>

             
              <ul className="nav d-none d-lg-flex">
                <li className="nav-item">
                  <Link className="nav-link" to="/products">產品列表</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">關於我們</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">品牌專欄</Link>
                </li>
              </ul>
            </div>

            <div className="d-flex justify-content-between align-items-center gap-4">
             
              <form className="nav-search-group d-none d-lg-flex" role="search">
                <input
                  type="search"
                  className="search-input"
                  placeholder="當季商品熱賣中"
                />
              </form>

             
              <Link className="nav-link ml-4 cart-icon" to="/cart">
                <img src="/Tick-Tone/img/shopping_bag.svg" alt="購物車" />
              </Link>

           
              <Link to="/login" className="btn btn-primary login-btn d-none d-lg-inline-flex">
                登入/註冊
              </Link>

             
              <button
                className="btn nav-toggle-btn d-lg-none"
                onClick={() => 
                    { console.log('clicked!', isMenuOpen); 
                        setIsMenuOpen(true)}}
                aria-label="開啟選單"
              >
                <i className="bi bi-list fs-3"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

     
      {isMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="container d-flex flex-column h-100 py-4">
            <div className="d-flex justify-content-end mb-6">
              <button
                className="btn btn-link text-white"
                onClick={() => setIsMenuOpen(false)}
                aria-label="關閉選單"
              >
                <i className="bi bi-x fs-1"></i>
              </button>
            </div>

            <form className="nav-search-group   mb-6" role="search">
              <input
                type="search"
                className="search-input w-100"
                placeholder="當季商品熱賣中"
              />
            </form>

            <ul className="nav flex-column gap-4 mb-20">
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to="/products" onClick={() => setIsMenuOpen(false)}>
                  產品列表
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to="#" onClick={() => setIsMenuOpen(false)}>
                  關於我們
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to="#" onClick={() => setIsMenuOpen(false)}>
                  品牌專欄
                </Link>
              </li>
            </ul>

            <Link to="/login" className="btn btn-primary w-80" onClick={() => setIsMenuOpen(false)}>
              註冊 / 登入
            </Link>
          </div>
        </div>
      )}
        <main>
            <Outlet />
        </main>
        <footer>
            <div className="nav-section ">
                <div className="container">
                <div className="d-flex justify-content-between  mb-8">
                <div className="mt-8" >
                    <h3 className="h5 mb-6">聯絡我們 </h3>
                
                   <div className="footer-info ">
                    <p className="mb-2 ">時聲選物股份有限公司</p>
                   <p className="mb-2">ticktone123@gmail.com​ </p> 
                    </div>
                   
                </div>
                
                <div className="mt-8" >
                    <h3 className="h5 mb-6 ">關於我們</h3>
                
                   <div className="footer-info ">
                    <ul className="footer-list">
                    <li className="mb-2"><Link to="/" className="link">購物及配送須知</Link></li>
                    <li className="mb-2"><Link to="/" className="link">退換貨政策</Link></li>
                    </ul>
                    </div>
                   
                </div>

                  


                <div className="mt-8" >
                    <h3 className="h5 mb-6 ">FOLLOW US</h3>
                
                   <div className="footer-info ">
                    <ul className="footer-list d-flex gap-4">
                    <li className="mb-2"><Link to="/" className="link"><img src="/Tick-Tone/img/Facebook_black.svg" alt="Facebook" /></Link></li>
                    <li className="mb-2"><Link to="/" className="link"><img src="/Tick-Tone/img/Instagram_black.svg" alt="Instagram" /></Link></li>
                    <li className="mb-2"><Link to="/" className="link"><img src="/Tick-Tone/img/Line_black.svg" alt="Line" /></Link></li>
                    </ul>
                    </div>
                   
                </div>

                </div>
                <hr />
               
                <div className="mt-2 d-flex justify-content-center">
                    <p className="copy_right">© Copyright 2025 TICK & TONE 時聲 選物 . All Rights Reserved</p>
                </div>
                 <br />

                </div>
            </div>
        </footer>
        </>
    )
}

export default FrontendLayout;



