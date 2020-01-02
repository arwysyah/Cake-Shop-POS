import React from "react";

import { Layout, Menu, Icon,Row,Col } from "antd";
import swal from "sweetalert";

import Login from "./Login";
import { Link } from "react-router-dom";
import AddProduct from "../Components/AddProduct";

import axios from 'axios'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

const { Header, Sider, Content } = Layout;

export default class History extends React.Component {
  state = {
    collapsed: false,
    tokens: localStorage.getItem("jwt"),
    history:[]
  };

  async componentDidMount(){
    await this.handleHistory()

  }
handleHistory=()=>{
  axios.get('http://localhost:5050/history/').then(res=>{
   
   this.setState({
     history:res.data.response
   })
  })

}

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  handleReload = () => {
    window.location.reload(true);
  };
  logout = () => {
    localStorage.removeItem("jwt");
    swal("Logout Succes!", "Thanks fror Using Our Services!", "success");

    window.location.reload(true);
  };
  

  render() {
    const colomns=[
    //   Header:'id_transaction',
    //   accessor:'id_transaction',

    // },
    {
      Header:'Product Name',
      accessor:'product',
      style:{
        width:"100%",
        maxWidth:100,
        minWidth:100,
        maxHeight:'100%'
      }
      
    },
    {
      Header:'Quantity',
      accessor:'quantities',
      style:{
        width:30,
        textAlign:'center'
      
      }
      
    },
    
    {
      Header:'ID Receipt',
      accessor:'id_receipt',
      
    },
    {
      Header:'Transaction Date',
      accessor:'transaction_at',
      
    },
  ]
  ;
    console.log('hs',this.state.history)
    const { tokens,history } = this.state;
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to={"/"}>
                <Icon type="shop" style={{ fontSize: 29 }} />
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Icon style={{ fontSize: 25 }} type="fund" />
            </Menu.Item>

            <Menu.Item key="3">
              <AddProduct />
              <Icon
                type="plus-square"
                style={{ color: "green", fontSize: 29 }}
              />
            </Menu.Item>

            {tokens != null && tokens.length > 1 ? (
              <Menu.Item key="4">
                <Icon
                  onClick={this.logout}
                  type="logout"
                  style={{ color: "red", fontSize: 29, left: 4 }}
                />
              </Menu.Item>
            ) : (
              <Menu.Item key="5">
                <Login />
                <Icon
                  type="user-add"
                  style={{ color: "green", fontSize: 29, left: 4 }}
                />
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Row>
              <Col span ={8}>  <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
              style={{ fontSize: 29, marginLeft: 20 }}
            /></Col>
              <Col span= {1}>
            < a href="im">
              <img
                src="https://image.flaticon.com/icons/svg/1312/1312173.svg"
                alt="hr"
                style={{ width: "85%", height: "30%" }}
                onClick={this.handleReload}
              />
            </a></Col>
              <Col span={15}>   <p>History</p></Col>
            </Row>
          
         
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: "100vh"
            }}
          >
            <ReactTable 
            columns= {colomns}
            data={this.state.history}
            defaultPageSize={5}/>

          </Content>
        </Layout>
      </Layout>
    );
  }
}
