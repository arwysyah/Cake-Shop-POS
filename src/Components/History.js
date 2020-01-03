import React from "react";

import { Layout, Menu, Icon, Row, Col, Card } from "antd";
import swal from "sweetalert";

import Login from "./Login";
import { Link } from "react-router-dom";
import AddProduct from "../Components/AddProduct";

import axios from "axios";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import dateFormat from "dateformat";
import {BarChart} from 'reaviz'
const { Header, Sider, Content } = Layout;

export default class History extends React.Component {
  state = {
    collapsed: false,
    tokens: localStorage.getItem("jwt"),
    history: [],
    summa: [],
    order: [],
    dataTodayIncome: []
  };

  async componentDidMount() {
  
    await this.handleHistory();
  }
  handleHistory = () => {
    axios.get("http://localhost:5050/history/").then(res => {
      console.log(res.data.response);

      this.setState({
        history: res.data.response
      });
    });
  };

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
  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  dateFormats = date_data => {
    // console.log(date_data);
    let arrDate = String(date_data)
      .slice(0, 10)
      .split('-')
      .reverse();
    switch (Number(arrDate[1])) {
      case 1:
        arrDate[1] = ' January ';
        break;
      case 2:
        arrDate[1] = ' February ';
        break;
      case 3:
        arrDate[1] = ' March ';
        break;
      case 4:
        arrDate[1] = ' April ';
        break;
      case 5:
        arrDate[1] = ' Mei ';
        break;
      case 6:
        arrDate[1] = ' June ';
        break;
      case 7:
        arrDate[1] = ' Jule ';
        break;
      case 8:
        arrDate[1] = ' August ';
        break;
      case 9:
        arrDate[1] = ' September ';
        break;
      case 10:
        arrDate[1] = ' October ';
        break;
      case 11:
        arrDate[1] = ' November ';
        break;
      case 12:
        arrDate[1] = ' December ';
        break;
    }
    // console.log(arrDate);

    return arrDate;
  };
  render() {
    let dateNow = new Date();
    this.state.history.map((h, i) => {
      this.state.summa.push(h.total);
      this.state.order.push(h.quantities);
    //   this.state.dataTodayIncome.push(
    //     dateFormat(h.transaction_at)
    //       .toString()
    //       .substring(0, 8)
    //       .search(dateNow.toString().substring(0, 8)) !== -1
    //   );

    //   return console.log(h.quantities, h.total, h.transaction_at);
    this.state.history.map((d,i)=>{
      if(d.transaction_at==dateNow){
        console.log('yes')
 
      }else{
        console.log('no')
      }
     })
    });
    
    // console.log(today, "dadas");
    // let totalIncomeDay = today.reduce((prev, next) => prev + next.total, 0);
    // console.log(totalIncomeDay, "totalincome");
    // console.log(this.state.order, this.state.summa, "summa");
    // const sumOrder = order.reduce((a, b) => a + b, 0);
  

    // console.log(NewTotal, "Totalsum");
    // console.log(sumOrder, "su,Order");
    const colomns = [
      //   Header:'id_transaction',
      //   accessor:'id_transaction',

      // },
      {
        Header: "Product Name",
        accessor: "product",
        style: {
          width: "100%",
          maxWidth: 100,
          minWidth: 100,
          maxHeight: "100%"
        }
      },
      {
        Header: "Quantity",
        accessor: "quantities",
        style: {
          width: 30,
          textAlign: "center"
        }
      },

      {
        Header: "ID Receipt",
        accessor: "id_receipt"
      },
      {
        Header: "Transaction Date",
        accessor: "transaction_at"
        
      }
    ];
    console.log("hs", this.state.history);
    const { tokens, history, summa, order } = this.state;
    const NewTotal = summa.reduce((a, b) => a + b, 0);
    const SumOrder = order.reduce((a, b) => a + b, 0);
    console.log(typeof NewTotal, "summaaaa");
    console.log(SumOrder, "sum Order");
    console.log(this.state.history.length,'length')
    
    let newArray =[]
    this.state.history.map((d,i)=>{
      let dateToday =this.dateFormats(d.transaction_at)
      // newArray.push(id.tra)
      return(
        console.log(this.dateFormats(d.transaction_at))
      
      //  this.setState({
         
      //  })
      )
      
    })
    console.log(newArray,'resa')

    let AllSale = [];
    this.state.history.map(item => {
      AllSale.push({
        key: item.product,
        data: item.quantities
      });
    });
    // console.log(SaleToday,'sale')
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
              <Col span={8}>
                {" "}
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                  onClick={this.toggle}
                  style={{ fontSize: 29, marginLeft: 20 }}
                />
              </Col>
              <Col span={1}>
                <a >
                  <img
                    src="https://image.flaticon.com/icons/svg/1312/1312173.svg"
                    alt="hr"
                    style={{ width: "85%", height: "30%" }}
                    onClick={this.handleReload}
                  />
                </a>
              </Col>
              <Col span={15}>
                {" "}
                <p>History</p>
              </Col>
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
            <div>
              <Row>
                <Col span={8}>
                  <Card style={{ color: "blue" }} style={{ width: 300 }}>
                    <p>Todays Income</p>
                    <p>Rp. {this.formatNumber(NewTotal)}</p>
                    
                    <p>+2 % yesterday</p>
                  </Card>
                </Col>
                <Col span={8} >
                  {" "}
                  <Card style={{ width: 300 }}>
                    <p>Orders</p>
                    <p style={{fontWeight:'bold'}}> Quantity:{this.formatNumber(SumOrder)} Items</p>
                    <p style={{fontWeight:'bold'}}> Orders:{this.formatNumber(history.length)}</p>
                    
                  </Card>
                </Col>
                <Col span={8}>
                  <Card style={{ width: 300 }}>
                    <p>This Years Income's</p>
                    <p style={{ fontWeight: "bold" }}>
                      Rp. {this.formatNumber(NewTotal)}
                    </p>
                    <p>+10% Last Years</p>
                  </Card>
                </Col>
              </Row>
              <Row style={{marginTop:40}}>
              <Col >
              <p style={{fontWeight:'bold'}}> {"graphic number of items sold".toUpperCase()}</p>
                <div className="container">
                  <BarChart width={500} height={250} data={AllSale} />
                </div>
              
              </Col>
              </Row>
            </div>
            <p style={{fontWeight:'bold'}}> {"Table number of items sold".toUpperCase()}</p>
            <div style={{ marginTop: 60 }}>
              <ReactTable
                columns={colomns}
                data={this.state.history}
                defaultPageSize={5}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
