import "axios";
import { useForm } from "react-hook-form";
import { checkout, getCart } from "../../api/api";
import { useEffect, useState } from "react";



function Checkout() {
    const [cart, setCart] = useState({});
    const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    }= useForm({mode: "onChange"});

    const getCartList = async () => {
    const data = await getCart();
    console.log("當前購物車內容：", data);
    setCart(data);
    };

    useEffect(() => {
        getCartList();
    }, []);

    const onSubmit = async(formData) => {
    
            const userInfo = {
            name: formData.name,
            email: formData.email,
            tel: formData.tel,
            address: formData.address,
        };
       const message = formData.message || "";
  try {
    const res = await checkout(userInfo, message);
    if (res.success) {
      alert("🎉 訂單已成功建立！");
      reset();        
      getCartList();  
    }
    console.log("訂單提交結果：", res);
        } catch (error) {
            console.log("訂單提交失敗：", error.response?.data || error.message);
        }
    }


  return (
    <div className="container">
      <h1 className="h2 mt-10">結帳</h1>
     
<div className="my-5 row justify-content-center">
  <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
   
    <div className="mb-3">
      <label htmlFor="name" className="form-label">
        訂購人姓名
      </label>
      <input
        id="name"
        name="name"
        type="text"
        className="form-control"
        placeholder="請輸入姓名"
        {...register("name", { required: "姓名為必填", 
        //    minLength:{
        //     value:2,
        //     message: "姓名至少要兩個字"
        // }  
        })}
      />
      {errors.name && <p className="text-danger">{errors.name.message}</p>}
    </div>

    <div className="mb-3">
      <label htmlFor="tel" className="form-label">
        訂購人電話
      </label>
      <input
        id="tel"
        name="tel"
        type="tel"
        className="form-control"
        placeholder="請輸入電話"
        {...register("tel", { required: "電話為必填" ,
            required: "請輸入電話",
            pattern: {
                value: /^09\d{8}$/,
                message: "電話格式不正確，需為09開頭的10位數字",
            },
            minLength: {
                value: 8,
                message: "需為09開頭的10位數字",
        }
        })}
      />
      {errors.tel && <p className="text-danger">{errors.tel.message}</p>}
    </div>

    <div className="mb-3">
      <label htmlFor="address" className="form-label">
        收件人地址
      </label>
      <input
        id="address"
        name="address"
        type="text"
        className="form-control"
        placeholder="請輸入地址"
        {...register("address", { required: "地址為必填" })}
      />
      {errors.address && <p className="text-danger">{errors.address.message}</p>}
    </div>

     <div className="mb-3">
      <label htmlFor="email" className="form-label">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        className="form-control"
        placeholder="請輸入 Email"
         {...register("email", {
    required: "請輸入 Email",
    pattern: {
        value: /^\S+@\S+$/i,
        message: "Email 格式不正確",
    },
    })}
      />
      {errors.email && <p className="text-danger">{errors.email.message}</p>}
    </div>

    <div className="mb-3">
      <label htmlFor="message" className="form-label">
        留言
      </label>
      <textarea
        id="message"
        className="form-control"
        cols="30"
        rows="10"
        {...register("message")}
      ></textarea>
    </div>
    <div className="text-end">
      <button type="submit" className="btn btn-primary">
        送出訂單
      </button>
    </div>
  </form>
</div>
    </div>
  );
}

export default Checkout;