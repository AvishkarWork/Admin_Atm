import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  LogoutOutlined,
  TransactionOutlined,
  DatabaseFilled,
  StopOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import "./home.css";
import "./table.css";
import { Table, Input, Button, Select } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;

const Transaction = () => {
  const [tdata, setTData] = useState([]);
  const navigate = useNavigate();
  const token = Cookies.get("jwt");

  const getTransaction = async () => {
    console.log("hello i am here");
    try {
      // setTData([])
      const result = await axios.get(
        "http://localhost:5000/admin/transaction",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
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
  };

  useEffect(() => {
    getTransaction();
  }, []);

  const t_typeEnum = {
    withdrawal: "Withdrawal",
    deposit: "Deposit",
    transfer: "Transfer",

    // Add other enum values and labels as needed
  };

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "t_id",
      key: "t_id",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Id"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => confirm()}
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) =>
        record.t_id.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Date Time",
      dataIndex: "date_time",
      key: "date_time",
      sorter: (a, b) => new Date(a.date_time) - new Date(b.date_time),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Id"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => confirm()}
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) =>
        record.date_time.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Transaction Type",
      dataIndex: "t_type",
      key: "t_type",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Select
            placeholder="Select Type"
            value={selectedKeys[0]}
            onChange={(value) => setSelectedKeys(value ? [value] : [])}
            onSelect={() => confirm()}
            style={{ width: 120, marginBottom: 8, display: "block" }}
          >
            {Object.keys(t_typeEnum).map((key) => (
              <Select.Option key={key} value={key}>
                {t_typeEnum[key]}
              </Select.Option>
            ))}
          </Select>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => confirm()}
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.t_type === value,
    },
    {
      title: "Receiver Account No.",
      dataIndex: "r_acc_no",
      key: "r_acc_no",
    },
    {
      title: "Transaction Status",
      dataIndex: "t_status",
      key: "t_status",
    },
    {
      title: "Transaction Amount",
      dataIndex: "amt",
      key: "amt",
    },
    {
      title: "Card No.",
      dataIndex: "c_no",
      key: "c_no",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Card No."
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => confirm()}
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) =>
        record.c_no.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "ATM ID",
      dataIndex: "atm_id",
      key: "atm_id",
    },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const rowClassName = (record, index) => {
    // Add custom row styles here based on the record data or index
    return index % 2 === 0 ? 'even-row' : 'odd-row';
  };

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
          <h2 className="text-center">Transaction Details</h2>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            minHeight: "79.2vh",
          }}
        >
          <div
          className="cont"
            style={{
              padding: 24,
              background: colorBgContainer,
            }}
          >
            <Table dataSource={tdata} columns={columns} scroll={{ x: true }} rowClassName={rowClassName} />
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

export default Transaction;
