import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import * as bootstrap from 'bootstrap'
import ProductModal from "../../components/ProductModal";
import Pagination from "../../components/Pagination";

const Api_Path = import.meta.env.VITE_API_PATH
const Api_Base = import.meta.env.VITE_API_BASE
const INITIAL_TEMPLATE_DATA ={
  id: "",
  title: "",
  category: "",
  origin_price: "",
  price: "",
  unit: "",
  description: "",
  content: "",
  is_enabled: false,
  imageUrl: "",
  imagesUrl: [],
};



function AdminProducts() {
  
   // 登入狀態管理(控制顯示登入或產品頁,預設未登入）
  // const [isAuth, setIsAuth] = useState(false)
  const [products, setProducts] = useState([]);
  const [templateProduct, setTemplateProduct] = useState(INITIAL_TEMPLATE_DATA);
  const [modalType, setModalType] = useState("");
  const [pagination, setPagination] = useState({});

  const productModalRef = useRef(null);

 
const handleModalInputChange = (e) => {
  const { name, value, checked, type } = e.target;
  setTemplateProduct((preData) => 
    ({ ...preData,
      [name]: type === "checkbox" ? checked : value,}));
}

// 更新陣列
const handleModalImageChange = (index, value) => {
  setTemplateProduct((prevData) => {
    const newImages = [...prevData.imagesUrl]; // 複製陣列
    newImages[index] = value; // 更新特定索引
    if(value !== "" && index=== newImages.length-1 && newImages.length < 5){
      newImages.push(""); // 在陣列末尾新增一個空字串
    }
    if(value ==="" && newImages.length > 1 && newImages[newImages.length-1] === ""){
      newImages.pop(); 
    }
    return { ...prevData, imagesUrl: newImages }; // 回傳新狀態
  });
};
// eslint-disable-next-line no-unused-vars
const handleAddImage = (index, value) => {
  setTemplateProduct((prevData) => {
    const newImages = [...prevData.imagesUrl]; // 複製陣列
   newImages.push(""); // 在陣列末尾新增一個空字串
    return { ...prevData, imagesUrl: newImages }; // 回傳新狀態
  });
};
const handleDeleteImage = () => {
  setTemplateProduct((prevData) => {
    const newImages = [...prevData.imagesUrl]; // 複製陣列
   newImages.pop(); // 在陣列末尾新增一個空字串
    return { ...prevData, imagesUrl: newImages }; // 回傳新狀態
  });
}
 // 產品列表


  const getProducts = async(page=1) =>{
    try {
      const response = await axios.get(`${Api_Base}/api/${Api_Path}/admin/products?page=${page}`);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      console.log(error.response);
    }
  }

const updateProduct = async(id) =>{
let url =`${Api_Base}/api/${Api_Path}/admin/product`
let method = "post";

if(modalType === "edit"){
  url =`${Api_Base}/api/${Api_Path}/admin/product/${id}`
  method = "put";
}
const productData = {
  data:{
    ...templateProduct,
    origin_price: Number(templateProduct.origin_price),
    price: Number(templateProduct.price),
    is_enabled: templateProduct.is_enabled? 1 : 0,
    imagesUrl:[...templateProduct.imagesUrl.filter((url)=> url !=="")]
  }
};
try{
// eslint-disable-next-line no-unused-vars
const response = await axios[method](url,productData)
getProducts();
closeModal();
}catch(error)
{console.log(error.response);}

}
const uploadImage = async(e) => {
  const file = e.target.files?.[0]
  if(!file){
    return
  }
  try {
    const formData = new FormData()
    formData.append("file-to-upload", file)

    const response = await axios.post(`${Api_Base}/api/${Api_Path}/admin/upload`, formData)
    setTemplateProduct((preData) => ({...preData, imageUrl: response.data.imageUrl}))

  } catch (error) {
    console.log(error);
    
  }
}

const deleteProduct = async(id) =>{
  try{
    // eslint-disable-next-line no-unused-vars
    const response = await axios.delete(`${Api_Base}/api/${Api_Path}/admin/product/${id}`)
   getProducts();
   closeModal();
  }
  catch(error){
    console.log(error.response);
  }
}



  // 確認登入狀態
 
  useEffect(()=>{
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jasToken="))
      ?.split("=")[1];
      if(token){
      axios.defaults.headers.common['Authorization'] = token;
    }
     const checkLogin = async() => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(`${Api_Base}/api/user/check`);
      // console.log(response.data);
   
    getProducts();
    } catch (error) {
      console.log(error.response?.data.message);
    }
  }
   productModalRef.current = new bootstrap.Modal("#productModal", {
    keyboard: false,
  })
  checkLogin();
  },[]);


 
 
  const openModal = (type, product) => {
    // console.log(product);
    setModalType(type)
    setTemplateProduct((pre) =>({...pre, ...product}));
    productModalRef.current.show()
  };
  const closeModal =() =>{
    productModalRef.current.hide()
  }

  return (<>

        <div className="container">

     
  
            <h2>產品列表</h2>
             <div className="text-end mt-4">
        <button
          type="button"
          className="btn btn-primary" onClick={()=>openModal("create", INITIAL_TEMPLATE_DATA)}>
          建立新的產品
        </button>
      </div>
        <table className="table ">
  <thead>
    <tr className="text-white">
      <th scope="col" className="text-white">分類</th>
      <th scope="col" className="text-white">產品名稱</th>
      <th scope="col" className="text-white">原價</th>
      <th scope="col" className="text-white">售價</th>
      <th scope="col" className="text-white">是否啟用</th>
      <th scope="col" className="text-white">編輯</th>
    </tr>
  </thead>
  <tbody>
  { products.map((product)=> (
     <tr key={product.id} className="text-white">
      <td className="text-white">{product.category}</td>
     <th scope="row" className="text-white">{product.title}</th>
     <td className="text-white">{product.origin_price}</td>
     <td className="text-white">{product.price}</td>
     <td className={`${product.is_enabled && 'text-success'}`}>{product.is_enabled? '啟用' : '不啟用'}</td>
     <td>
      <div className="btn-group" role="group" aria-label="Basic outlined example">
      <button type="button" className="btn btn-outline-primary btn-sm" onClick={()=>openModal('edit',product)}>編輯</button>
      <button type="button" className="btn btn-outline-danger btn-sm"
      onClick={()=>openModal('delete',product)}
      >刪除</button>

      </div>
     </td>
     </tr>
  ))}   
  </tbody>
</table>
       < Pagination 
       pagination={pagination}
       onChangePage={getProducts}
        /> 
        </div> 
 
    <ProductModal
     modalType={modalType}
     productModalRef={productModalRef}
    templateProduct={templateProduct}
    handleModalInputChange={handleModalInputChange}
    handleModalImageChange={handleModalImageChange}
    handleAddImage={handleAddImage}
    handleDeleteImage={handleDeleteImage}
    updateProduct={updateProduct}
    deleteProduct={deleteProduct}
    closeModal={closeModal}
    uploadImage={uploadImage}
    />
  </>

  )
}

export default AdminProducts;
