import React,{useState,useEffect} from "react";
import { Link,useNavigate } from 'react-router-dom';
import {
    HomeOutlined, 
    LogoutOutlined,TransactionOutlined,
    DatabaseFilled,StopOutlined,SearchOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import "./home.css";
import { Table,Input,Button } from 'antd';
import axios from "axios";
import Cookies from 'js-cookie';
import "./table.css";



const { Header, Content, Footer, Sider } = Layout;


const Logs = () => {
  const navigate = useNavigate();

  const [tdata, setTData] = useState([]);

  const token = Cookies.get('jwt');

  const getLogs = async()=>{
    console.log("hello i am here");
    try {
      // setTData([])
     const result=await  axios.get("http://localhost:5000/admin/logs/all",{headers:{Authorization:`Bearer ${token}`}})
     
     if (result.data.status === 200) {
      setTData(result.data.data);
      console.log(result.data);
    } else if (result.data.status === 405) {
      alert("Expired Token")
      navigate("/");
    } else {
      alert("Something went wrong");
      navigate("/");
    }

    } catch (error) {
      console.log(error);
      return null;
    }
  }

 
  useEffect(()=>{
    getLogs();

  },[]);
  





    const {token: { colorBgContainer }} = theme.useToken();

    const columns = [
      {
        title: 'Log ID',
        dataIndex: 'l_id',
        key: 'l_id',
      },
      {
        title: 'Card No.',
        dataIndex: 'c_no',
        key: 'c_no',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search Id"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => confirm()}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button type="primary" icon={<SearchOutlined />} onClick={() => confirm()} style={{ width: 90, marginRight: 8 }}>
              Search
            </Button>
            <Button onClick={() => clearFilters()} style={{ width: 90 }}>Reset</Button>
            
          </div>
        ),
        onFilter: (value, record) => record.c_no.toLowerCase().includes(value.toLowerCase()),
      },
      {
        title: 'Date Time',
        dataIndex: 'date_time',
        key: 'date_time',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search Id"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => confirm()}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button type="primary" icon={<SearchOutlined />} onClick={() => confirm()} style={{ width: 90, marginRight: 8 }}>
              Search
            </Button>
            <Button onClick={() => clearFilters()} style={{ width: 90 }}>Reset</Button>
            
          </div>
        ),
        onFilter: (value, record) => record.date_time.toLowerCase().includes(value.toLowerCase()),
        
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
      },
    ];

    
  return (
    <Layout>
      <Sider
        
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline">
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/home">Home</Link>   
            </Menu.Item>
            <Menu.Item key="transaction" icon={<TransactionOutlined />}>
                <Link to="/transaction">Transaction</Link>
            </Menu.Item>
            <Menu.Item key="logs" icon={<DatabaseFilled />}>
                <Link to="/logs">Logs</Link>
            </Menu.Item>
            <Menu.Item key="block" icon={<StopOutlined />}>
                <Link to="/blockcard">Block/Unblock</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
                <Link to="/logout">Logout</Link>
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
        className="headCont"
          style={{
            padding: 0,
            textAlign: "center"
          }}
        >
            <h2 className="text-center">Loging Details</h2>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
          className="cont"
            style={{
              padding: 24,
              background: colorBgContainer,
            }}
          >
            <Table dataSource={tdata} columns={columns} />
            
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          All rights reserverd  ©2023 Created by ABC bank
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Logs