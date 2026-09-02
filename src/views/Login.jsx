import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router"
const Api_Path = import.meta.env.VITE_API_PATH
const Api_Base = import.meta.env.VITE_API_BASE

function Login() {

const [formData, setformData] = useState({
      "username": "",
      "password": ""
      })

const navigate =useNavigate()
const handleInputChange = (e) => {const {name, value}=e.target;
  // console.log(name, value);
  setformData((preData)=>({...preData,[name]: value}))
};
const onSubmit = async(e) => {
  try {
   e.preventDefault()
    const response = await axios.post(`${Api_Base}/admin/signin`, formData);
    const { token, expired } = response.data;
    // 設定 Cookie
    document.cookie = `jasToken=${token};expires=${new Date(expired)};`;
    axios.defaults.headers.common['Authorization'] = token;
    navigate('/Admin/AdminProducts');
    // getProducts();
    // setIsAuth(true);

  } catch (error) {
    console.log(error.response?.data);
  }

}

return(
 <div className="container login">
      <h1 className="mb-4">請先登入</h1>
      <form className="form-floating" onSubmit={(e)=>onSubmit(e)}>
      <div className="form-floating mb-3">
        <input type="email" className="form-control" name="username" placeholder="name@example.com"
        value={formData.username} onChange={handleInputChange}
        />
        <label htmlFor="username">Email address</label>
      </div>
      <div className="form-floating">
        <input type="password" className="form-control" name="password" placeholder="Password" 
        value={formData.password} onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
  </div>
  <button type="submit" className="btn btn-primary mt-4 w-100">登入</button>
      </form>
    </div>)

}

export default Login