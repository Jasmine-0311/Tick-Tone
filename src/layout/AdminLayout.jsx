import { Link, Outlet } from "react-router";

function AdminLayout(){
   

    return(
        <>
        
        <header>
            <div className="nav-section">
            <div className="container d-flex align-items-center justify-content-between">
            <div className="d-flex">
                <div className="brand-logo mx-8 ">
            <Link className="nav-link active " aria-current="page" to="/"> 
            <img src="src/assets/img/logo 4.svg" alt="TICK & TONE" height="40" /></Link>
            </div>
            
            <ul className="nav ">
            
            <li className="nav-item">
                <Link className="nav-link" to="/Admin/AdminProducts">後台產品</Link>
            </li>
            
            <li className="nav-item">
                <Link className="nav-link" to="/Admin/AdminOrders">後台訂單</Link>
            </li>

            </ul>
                </div>  

           

            </div>

            
            </div>
        </header>
        <main>
            <Outlet />
        </main>
        <footer></footer>
        </>
    )
}

export default AdminLayout;