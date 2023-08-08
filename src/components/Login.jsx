import React from "react";
import "./login.css"
import { Form, Input, Button } from "antd";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import Cookies from 'js-cookie';


// import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = () =>{

  const navigate = useNavigate();

  const onFinish = async(values) => {
    console.log('Success:', values);
    const result = await axios.post("http://localhost:5000/admin/login",{
      "username": values.username,
      "password": values.password
    });

    if(result.data.user){
      // console.log(result.data);
      sessionStorage.setItem("username",values.username)
      Cookies.set("jwt",result.data.user.webToken)
      console.log(Cookies.get("jwt"));
      navigate('/home')
    }else{
      var errmsg = document.getElementById('errmsg');
      errmsg.style.display = 'block';
    }

  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


  return (
    <>
     <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src="https://images.pexels.com/photos/6289062/pexels-photo-6289062.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Login"/>
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">ATM ADMIN</p><br/>
          <p id="errmsg" style={{color:"red",display:"none"}}>Invalid username or password</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    </>
  )
}

export default Login
