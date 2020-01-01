import React from "react";

import "antd/dist/antd.css";
import {
  Layout,
  Menu,
  Icon,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Pagination
} from "antd";
import axios from "axios";
// import "../Components/styles/Home.css";
import "../index.css";
import AddProduct from "../Components/AddProduct";
import Checkout from "../Components/CheckOut";
import swal from "sweetalert";
import EditProduct from "./EditProduct";
import Login from "./Login";
// import jwt_decode from 'jwt-decode'
const { Meta } = Card;
const { Header, Sider, Content } = Layout;

export default class Home extends React.Component {
  state = {
    collapsed: false,
    items: [],
    content: [],
    minValue: 0,
    maxValue: 9,
    searchValue: "",
    tokens:localStorage.getItem('jwt')
  };

  async componentDidMount() {
    await this.handleProduct();
  }
  handleProduct = () => {
    axios.get("http://localhost:5050/product").then(res => {
      this.setState({
        content: res.data.response
      });
    });
  };

  onSearch = () => {
    axios
      .get(`http://localhost:5050/product//filter/product/search/:lemon`)
      .then(res => {
        console.log(res);
      });
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  chooseItem = item => {
    this.setState(prevState => {
      return {
        items: [...prevState.items, item]
      };
    });
  };
  handleChange = value => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 9
      });
    } else {
      this.setState({
        minValue: this.state.maxValue,
        maxValue: value * 9
      });
    }
  };
  handleMinus = index => {
    console.log("index");
    const cartItem = this.state.items;
    const ca = cartItem[index].quantity--;
    this.setState({
      items: cartItem
    });
    console.log("isi", ca);
  };
  handlePlus = index => {
    const cartItem = this.state.items;
    cartItem[index].quantity++;
    this.setState({ items: cartItem });
  };
  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  onchangeSearch = event => {
    const search = event.target.value;
    if (search)
      this.setState({
        searchValue: search
      });
  };
  removeItem(id) {
    this.setState({
      items: this.state.items.filter(item => item.id_product !== id)
    });

  
  }

  handleSearch = event => {
    event.preventDefault();
    if (this.state.searchValue === "") {
      this.handleProduct();
    } else {
      axios
        .get(
          `http://localhost:5050/product//filter/product/search/${this.state.searchValue}`
        )
        .then(
          res =>
            this.setState({
              content: res.data.response
            })
          // console.log(res.data.name)
          // this.setState({
          //   searchPoint:res.data.response
          // })
        );
    }
  };
  handleReload = () => {
    window.location.reload(true);
  };
 
  logout=()=>{
    
    localStorage.removeItem('jwt')
      swal("Logout Succes!", "Thanks fror Using Our Services!", "success")
    
    window.location.reload(true)

  }
  render() {
    console.log(localStorage,'local')
    const { content, items,tokens } = this.state;
    let cartItem = this.state.items;
    let total = cartItem.reduce(
      (prev, next) => prev + next.quantity * next.price,
      0
    );
    let quantities = cartItem.reduce((prev, next) => prev + next.quantity, 0);
    // console.log(total, "total");
    // console.log(this.state.content);
    // console.log(quantities, "quantities");
   console.log(tokens)
   
    return (
      
      <Row>
        <Col span={18}>
          <Layout>
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
              <div className="logo" />

              <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                  <Icon type="shop" style={{ fontSize: 29 }} />
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="video-camera" style={{ fontSize: 29 }} />
                </Menu.Item>
             
               
                <Menu.Item key="3">
                  <AddProduct />
                  <Icon
                    type="plus-square"
                    style={{ color: "green", fontSize: 29 }}
                  />
                </Menu.Item>
               
                  {/* {tokens.length === 0 ?( */}
                <Menu.Item key="4">
              
                <Icon
                onClick={this.logout}
                  type="logout"
                  style={{ color: "red", fontSize: 29, left: 4 }}
                />
              
              </Menu.Item>
                 {/* ):( */}
               
                 <Menu.Item key="5">
                 <Login />
                   <Icon
                     type="user-add"
                     style={{ color: "red", fontSize: 29, left: 4 }}
                   />
                 
                 </Menu.Item>
               {/* )} */}
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: "#fff", padding: 0 }}>
                <Row>
                  <Col span={10}>
                    {" "}
                    <Icon
                      className="trigger"
                      type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                      onClick={this.toggle}
                      style={{ fontSize: 29, marginLeft: 20 }}
                    />
                  </Col>
                  <Col span={8}>
                    <Row>
                      <Col span={8} style={{ marginLeft: -190 }}>
                        <Row>
                          <Col span={12}>
                            {" "}
                            <p> ChocoShop</p>
                          </Col>
                          <Col span={12} style={{ right: -40 }}>
                            <a>
                              <img
                                src="https://image.flaticon.com/icons/svg/1312/1312173.svg"
                                alt="hr"
                                style={{ width: "85%" }}
                                onClick={this.handleReload}
                              />
                            </a>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={14}>
                        <div>
                          <form onSubmit={this.handleSearch}>
                            <div
                              className="input-field"
                              style={{
                                marginLeft: -40,
                                width: "30%",
                                height: 30
                              }}
                            >
                              {/* <Icon type="search" /> */}
                              <input
                                id="search"
                                type="search"
                                onChange={this.onchangeSearch}
                                style={{
                                  color: "black",
                                  marginLeft: 80,
                                  height: 40,
                                  backgroundColor: "white"
                                }}
                              />
                            </div>
                          </form>
                        </div>
                      </Col>
                    </Row>
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
                <Row>
                  {content.length > 0 &&
                    content
                      .slice(this.state.minValue, this.state.maxValue)
                      .map((cont, index) => {
                        return (
                          <Col span={8} key={index}>
                            <Card
                              style={{
                                height: 240,
                                width: "76%",
                                marginTop: 20,
                                borderRadius: 10
                              }}
                              hoverable
                              cover={
                                <img
                                  onClick={() =>
                                    !items.filter(
                                      cart =>
                                        cart.id_product === cont.id_product
                                    ).length > 0 &&
                                    this.chooseItem({ ...cont, quantity: 1 })
                                  }
                                  alt="example"
                                  src={cont.image_url}
                                  style={{
                                    height: 140,
                                    // width: 180,
                                    borderRadius: 10
                                  }}
                                />
                              }
                            >
                              <Meta title={cont.name} />
                              {this.state.items.filter(
                                cart => cont.id_product === cart.id_product
                              ).length > 0 && (
                                <img
                                  style={{
                                    position: "absolute",
                                    bottom: "50%",
                                    left: "25%",
                                    paddingLeft: 10
                                  }}
                                  width="50%"
                                  src="https://image.flaticon.com/icons/svg/179/179372.svg"
                                />
                              )}
                              <p>Rp. {this.formatNumber(cont.price)} </p>
                                 
                              <Row>
                              {this.state.tokens > 0 ? 
                              <div>
                                <Col span={12}>
                                  {" "}
                                  <p>
                                    <EditProduct
                                      count={cont}
                                      id_product={cont.id_product}
                                    />
                                  </p>
                                </Col>
                                <Col span={12}>
                                  {" "}
                                  <p>
                                    <a
                                      onClick={() => {
                                        axios
                                          .delete(
                                            `http://localhost:5050/product/${cont.id_product}`
                                          )
                                          .then(res => {
                                            swal(
                                              "Delete  Succes!",
                                              "Data has been Deleted!",
                                              "success"
                                            ).then(() => {
                                              window.location.reload(true);
                                            });
                                          });
                                      }}
                                    >
                                      Delete
                                    </a>
                                  </p>
                                </Col>
                                </div>
                                 : ""} 
                              </Row>
                              
                            </Card>
                          </Col>
                        );
                      })}
                </Row>
              </Content>
              <div style={{ marginLeft: 330, marginTop: -20 }}>
                <Pagination
                  defaultCurrent={1}
                  defaultPageSize={9}
                  onChange={this.handleChange}
                  total={15}
                />
              </div>
            </Layout>
          </Layout>
        </Col>

        <Col style={{ border: "1px solid black", height: 45 }} span={6}>
          <p style={{ textAlign: "center" }}>
            Cart
            <Badge
              count={this.state.count}
              style={{ backgroundColor: "blue", color: "black" }}
            />
          </p>
        </Col>
        <Col span={6}>
          <Row>
            {this.state.items.length > 0 ? (
              items.map((c, i) => (
                <div style={{ top: 30 }} key={i}>
                  <Col span={9}>
                    <img
                      alt="example"
                      src={c.image_url}
                      style={{ height: "60,5%", width: "88%", borderRadius: 5 }}
                    />
                  </Col>
                  <Col span={10}>
                    <p style={{ left: 100, fontWeight: "bold" }}>{c.name}</p>
                    <Button
                      className="button"
                      style={{ backgroundColor: "#aff589", color: "black" }}
                      onClick={() => {
                        this.handleMinus(i);
                      }}
                    >
                      <Icon type="minus" />
                    </Button>
                    <input
                      type="text"
                      style={{ width: 40, height: 30, textAlign: "center" }}
                      value={c.quantity}
                    ></input>
                    <Button
                      type="primary"
                      style={{ backgroundColor: "#aff589", color: "black" }}
                      onClick={() => {
                        this.handlePlus(i);
                      }}
                    >
                      <Icon type="plus" />
                    </Button>
                    <p style={{ height: 40 }}>Total : {c.price * c.quantity}</p>
                  </Col>
                  <Col span={5} style={{ marginTop: 20 }}>
                    {c.quantity === 0 ? this.removeItem(c.id_product) : ""}
                    <p onClick={() => this.removeItem(c.id_product)}>
                      <a style={{ fontSize: 25 }}>
                        <Icon
                          type="delete"
                          style={{ fontSize: 25 }}
                          style={{ color: "green" }}
                        />
                      </a>
                    </p>
                    <p>Rp. {this.formatNumber(c.price)}</p>
                  </Col>
                </div>
              ))
            ) : (
              <div style={{ paddingTop: "40%" }}>
                <img
                  width="100%"
                  src="https://www.razencustoms.com/includes/img/empty-cart.png"
                  alt="cart"
                />
              </div>
            )}
          </Row>

          <div className="check" style={{ marginLeft: 30, marginTop: 120 }}>
            <p style={{ fontWeight: "bold" }}>
              Total Belanja : Rp.{this.formatNumber(total)}
            </p>
            {/* <Button type="primary" style={{width:280,backgroundColor:'#57CAD5'}}>Checkout</Button> */}
            <Checkout
              quantities={quantities}
              total={total}
              dataCheckout={this.state.items}
            />
            <p></p>
            <Button
              type="primary"
              style={{ left: -10, width: 240, backgroundColor: "#F24F8A" }}
            >
              Cancel
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
}

// ReactDOM.render(<SiderDemo />, mountNode);
