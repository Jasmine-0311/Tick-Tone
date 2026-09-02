import { lazy, Suspense } from "react";
import { createHashRouter } from "react-router";

import FrontendLayout from "./layout/FrontendLayout";
import Home from "./views/front/Home";
import Products from "./views/front/Products"; 


const SingleProducts = lazy(() => import("./views/front/SingleProducts"));
const Cart = lazy(() => import("./views/front/Cart"));
const Checkout = lazy(() => import("./views/front/Checkout"));
const Login = lazy(() => import("./views/Login"));
const NotFound = lazy(() => import("./views/front/NotFound"));


const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const AdminOrders = lazy(() => import("./views/Admin/AdminOrders"));
const AdminProducts = lazy(() => import("./views/Admin/AdminProducts"));


const LoadingFallback = () => (
  <div className="text-center py-5">
    <div className="spinner-border text-light" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export const routes = createHashRouter([
  {
    path: '/',
    element: <FrontendLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'product/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SingleProducts />
          </Suspense>
        )
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Cart />
          </Suspense>
        )
      },
      {
        path: 'checkout',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Checkout />
          </Suspense>
        )
      },
      {
        path: 'Login',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Login />
          </Suspense>
        )
      },
    ]
  },
  {
    path: 'Admin',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      {
        path: 'AdminProducts',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AdminProducts />
          </Suspense>
        ),
      },
      {
        path: 'AdminOrders',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AdminOrders />
          </Suspense>
        ),
      }
    ]
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    )
  }
]);