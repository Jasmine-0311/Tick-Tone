import axios from "axios";

const Api_Path = import.meta.env.VITE_API_PATH;
const Api_Base = import.meta.env.VITE_API_BASE;

/// 產品相關

export const getCategoriesApi = async () => {
    try {
        const response = await axios.get(`${Api_Base}/api/${Api_Path}/products/all`);
        const allProducts = response.data.products || [];
        const categories = [...new Set(allProducts.map(item => item.category))];
        return categories; 
    } catch (error) {
        console.error('取得分類失敗', error);
        throw error;
    }
};

export const getProductsApi = async (category = '', page = 1) => {
    try {
        const params = { page };
        if (category && category !== "全部商品") {
            params.category = category;
        }

        const response = await axios.get(`${Api_Base}/api/${Api_Path}/products`, { params });
        return response.data;
    } catch (error) {
        console.error('取得商品列表失敗', error);
        throw error;
    }
};

/// 購物車相關
export const addCart = async (id, qty = 1) => {
    try {
        const response = await axios.post(`${Api_Base}/api/${Api_Path}/cart`, {
            data: { product_id: id, qty }
        });
        return response.data;
    } catch (error) {
        console.error('加入購物車失敗', error);
        throw error;
    }
};

export const getCart = async () => {
    try {
        const res = await axios.get(`${Api_Base}/api/${Api_Path}/cart`);
        return res.data.data;
    } catch (error) {
        console.error('取得購物車失敗', error);
        throw error;
    }
};

export const updateCart = async (cartId, productId, qty = 1) => {
    try {
        const res = await axios.put(`${Api_Base}/api/${Api_Path}/cart/${cartId}`, {
            data: { product_id: productId, qty }
        });
        return res.data;
    } catch (error) {
        console.error('更新購物車失敗', error);
        throw error;
    }
};

export const deleteCart = async (cartId) => {
    try {
        const res = await axios.delete(`${Api_Base}/api/${Api_Path}/cart/${cartId}`);
        return res.data;
    } catch (error) {
        console.error('刪除購物車品項失敗', error);
        throw error;
    }
};

export const deleteAllCart = async () => {
    try {
        const res = await axios.delete(`${Api_Base}/api/${Api_Path}/carts`);
        return res.data;
    } catch (error) {
        console.error('清空購物車失敗', error);
        throw error;
    }
};

// 結帳相關
export const checkout = async (userInfo, message) => {
    try {
        const res = await axios.post(`${Api_Base}/api/${Api_Path}/order`, {
            data: {
                user: {
                    name: userInfo.name,
                    email: userInfo.email,
                    tel: userInfo.tel,
                    address: userInfo.address,
                },
                message: message,
            },
        });
        return res.data;
    } catch (error) {
        console.error('訂單提交失敗：', error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};