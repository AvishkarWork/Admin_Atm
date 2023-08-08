import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  LogoutOutlined,
  TransactionOutlined,
  DatabaseFilled,
  StopOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import "./home.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Table,Input,Button } from 'antd';



const { Header, Content, Footer, Sider } = Layout;

const Home = () => {

  const navigate = useNavigate();

  const [tdata, setTData] = useState([]);

  const token = Cookies.get('jwt');

  const getAtm = async()=>{
    console.log("hello i am here");
    try {
      // setTData([])
     const result=await  axios.get("http://localhost:5000/admin/atm",{headers:{Authorization:`Bearer ${token}`}})
     
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
    getAtm();

  },[]);

  const getAtmStatus = (text)=>{
    if(text==="ONLINE")
      return "green"
    else if(text==="OFFLINE")
      return "red"
    else 
      return "yellow"
  }

  const columns = [
    {
      title: 'ATM ID',
      dataIndex: 'atm_id',
      key: 'atm_id',
      render: (text, record) => (
        <Link to={`/atmdetails/:${record.atm_id}`}>
        <span>{String(text).toLocaleUpperCase()}</span>
        </Link>
      ),
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
      onFilter: (value, record) => record.atm_id.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (text, record) => (
        <span>{String(text).toLocaleUpperCase()}</span>
        
      ),
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
      onFilter: (value, record) => record.location.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Branch ID',
      dataIndex: 'branch_id',
      key: 'branch_id',
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
      onFilter: (value, record) => record.branch_id.toLowerCase().includes(value.toLowerCase()),
      
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <span style={{color:getAtmStatus(text)}}>{text}</span>
        
      ),
    },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();


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
            textAlign: "center",
          }}
        >
          <h2 className="text-center">Admin Dashboard</h2>
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


            {/* <div className="dataCont">
              <div className="sstatus">
                <h3 style={{ textAlign: "center" }}>System Status</h3>
                {aData ? (
                  <div className="atm_data">
                    <div className="gen">
                      <h5>ATM ID: {aData.atm_id}</h5>
                      <h5>
                        Status: {aData.status === "on" ? "ONLINE" : "OFFLINE"}
                      </h5>
                      <h5>Location: {String(aData.location).toUpperCase()}</h5>
                      <h5>Branch ID: {String(aData.branch_id).toUpperCase()}</h5>
                    </div>
                    <div className="deno">
                      <h5>100 Notes: {aData.n_100}</h5>
                      <h5>200 Notes: {aData.n_200}</h5>
                      <h5>500 Notes: {aData.n_500}</h5>
                      <h5>2000 Notes: {aData.n_2000}</h5>
                    </div>
                  </div>
                ) : (
                  <div>No data</div>
                )}
              </div>
              <div className="chartCont">
                <Pie data={doData} options={options} />
              </div>
            </div> */}
            
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          All rights reserverd ©2023 Created by ABC bank
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
