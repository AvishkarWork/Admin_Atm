import React from "react";
import { Link } from 'react-router-dom';
import {
    HomeOutlined, 
    LogoutOutlined,TransactionOutlined,
    DatabaseFilled,StopOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import "./home.css"
const { Header, Content, Footer, Sider } = Layout;


const Home = () => {

    const {token: { colorBgContainer }} = theme.useToken();
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
                <Link to="/">Logout</Link>
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            textAlign: "center"
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
            style={{
              padding: 24,
              minHeight: 460,
              background: colorBgContainer,
            }}
          >
            content
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
  );
};

export default Home;
