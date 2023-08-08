import React, { useEffect } from "react";
import "./login.css"
import {useNavigate} from "react-router-dom"
import axios from "axios";
import Cookies from 'js-cookie';


// import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Logout = () =>{

  const navigate = useNavigate();

  const adminlogout = async() => {
    const result = await axios.post("http://localhost:5000/admin/logout",{
      "username": sessionStorage.getItem("username"),
    });

    console.log(result);

    if(result.status === 200){
      // console.log(result.data);
      Cookies.remove("jwt")
      sessionStorage.clear();
      navigate('/')
    }else{
      alert("something went wrong");
      navigate("/")
    }

  };

  useEffect(()=>{
    adminlogout();
  },[])


  return (
    <>
    </>
  )
}

export default Logout
