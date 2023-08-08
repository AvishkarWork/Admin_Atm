import React,{useState,useEffect} from "react";
import { Link,useNavigate } from 'react-router-dom';
import {
    HomeOutlined, 
    LogoutOutlined,TransactionOutlined,
    DatabaseFilled,StopOutlined,SearchOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import "./home.css";
import { Table,Input,Button,Select  } from 'antd';
import axios from "axios";
import Cookies from 'js-cookie';
import "./table.css";


const { Header, Content, Footer, Sider } = Layout;

const BlockCard = () => {

    const navigate = useNavigate();

    const [tdata, setTData] = useState([]);

    const token = Cookies.get('jwt');

    const getcards = async()=>{
      console.log("hello i am here");
      try {
        // setTData([])
       const result= await  axios.get("http://localhost:5000/admin/card",{headers:{Authorization:`Bearer ${token}`}});

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
        getcards();
  
    },[]);


    const {token: { colorBgContainer }} = theme.useToken();

    const getTag = (text) => {
        if(text==="active") 
            return "green";
        else if(text==="inactive")
            return "yellow";
        else
            return "red";
    }

    const dataSource = [
        {
          key: '1',
          c_no: '1001',
          c_status: 'active',
          c_name: 'Avishkar Parab',
        },
        {
            key: '2',
            c_no: '1002',
            c_status: 'blocked',
            c_name: 'Abd Shaikh',
        },
        // Add more data objects as needed
      ];

      const [data, setData] = useState(dataSource);


      const handleBlock = async(record) => {
        try {
           const result=await  axios.post("http://localhost:5000/admin/card/change-status",
           {
            card_no:record.c_no,
            status:"blocked"
           },
           {headers:{Authorization:`Bearer ${token}`}});

            if(result.data.status === 200){
                console.log(result.data);
                getcards();

            }else if(result.data.status === 405){
                alert("Expired Token");
            }
            else{
                alert("Something went wrong");   
            }
      
          } catch (error) {
            alert("Something went wrong");
          }
      };
    
      const handleUnblock = async(record) => {
        try {
            const result=await  axios.post("http://localhost:5000/admin/card/change-status",
            {
             card_no:record.c_no,
             status:"active"
            },
            {headers:{Authorization:`Bearer ${token}`}});
 
             if(result.data.status === 200){
                 console.log(result.data);
                 getcards();
             }else{
                 alert("Something went wrong");   
             }
       
           } catch (error) {
             alert("Something went wrong");
           }
      };

      const c_status = {
        blocked: 'Blocked',
        inactive: 'Inactive',
        active: 'Active',
    
        // Add other enum values and labels as needed
      };

    const columns = [
        {
            title: 'Card No.',
            dataIndex: 'c_no',
            key: 'c_no',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                  <Input
                    placeholder="Search Card No."
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
            title: 'Card Status',
            dataIndex: 'c_status',
            key: 'c_status',
            render: (text, record) => (
                <span style={{color:getTag(text),fontSize:"16px"}}> 
                    {text} 
                </span>
            ),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                  <Select
                    placeholder="Select Status"
                    value={selectedKeys[0]}
                    onChange={(value) => setSelectedKeys(value ? [value] : [])}
                    onSelect={() => confirm()}
                    style={{ width: 120, marginBottom: 8, display: 'block' }}
                  >
                    {Object.keys(c_status).map((key) => (
                      <Select.Option key={key} value={key}>
                        {c_status[key]}
                      </Select.Option>
                    ))}
                  </Select>
                  <Button type="primary" icon={<SearchOutlined />} onClick={() => confirm()} style={{ width: 90, marginRight: 8 }}>
                    Search
                  </Button>
                  <Button onClick={() => clearFilters()} style={{ width: 90 }}>Reset</Button>
                </div>
              ),
              onFilter: (value, record) => record.c_status === value,
          },
          {
            title: 'Card Holder Name',
            dataIndex: 'c_name',
            key: 'c_name',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                  <Input
                    placeholder="Search Card Name"
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
              onFilter: (value, record) => record.c_name.toLowerCase().includes(value.toLowerCase()),
          },
          {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                {record.c_status === 'active' ? (
                  <Button type="primary" danger onClick={() => handleBlock(record)}>Block</Button>
                ) : (
                  <Button type="primary" onClick={() => handleUnblock(record)}>Unblock</Button>
                )}
              </span>
            ),
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
            textAlign: "center",
          }}
        >
            <h2 className="text-center"> Card Details</h2>
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
            <Table 
                dataSource={tdata} columns={columns} 
                bordered
                
            />
            
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

export default BlockCard