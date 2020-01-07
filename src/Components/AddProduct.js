import React from "react";
import { Modal, Form, Icon, Input, Button } from "antd";
import axios from "axios";

import swal from "sweetalert";

export default class AddProduct extends React.Component {
  state = {
    loading: false,
    visible: false,
    ProductStore: {},
    name: "",
    price: "",
    image_url: "",
    category: "",
    file: "",
    imagePreviewUrl: ""
  };
  UploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "kenzoymc");

    axios
      .post("https://api.cloudinary.com/v1_1/kenzo/upload", data)
      .then(res => {
        console.log(res);
        this.setState({
          image_url: res.data.url
        });
      });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = async () => {
  

    const formData = new FormData();
    formData.append("name", this.state.ProductStore.name);
    formData.append("price", this.state.ProductStore.price);
    formData.append("image_url", this.state.image_url);
    formData.append("category", this.state.ProductStore.category);

    await this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
    await axios
      .post(`http://localhost:5050/product/`, formData)
      .then(response => {
        console.log(response);
      })
      .then(
        swal(
          "Add Product Successfully!",
          "Your Product has Increased",
          "success"
        )
      )
      .then(() => {
        window.location.reload(true);
      });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleChange = event => {
    // console.log(this.state.name,this.state.price,this.state.image_url)
    // this.setState({
    //   [event.target.name] :event.target.value

    // })
    const { name, value } = event.target;
    this.setState({
      ProductStore: { ...this.state.ProductStore, [name]: value }
    });
    console.log(this.state.ProductStore, "pro");
  };

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (this.setState === false) {
      $imagePreview = <img src={imagePreviewUrl} alt="i"/>;
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }
    const { visible, loading } = this.state;
    return (
      <div>
        <Icon
          onClick={this.showModal}
          type="plus-square"
          style={{ color: "green", fontSize: 29, marginLeft:22,marginTop:-14 }}
        />
        <Modal
          visible={visible}
          title="Add Product"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              Submit
            </Button>
          ]}
        >
          <Form className="login-form" onSubmit={this.addProduct}>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="shop" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Name"
                // value={this.state.name}
                name="name"
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item>
              <div className="previewComponent">
                <form>
                  <input
                    className="image_url"
                    type="file"
                    name="image_url"
                    onChange={this.UploadImage}
                  />
                </form>
                <div className="imgPreview">{$imagePreview}</div>
              </div>
              {/* <Input
                prefix={
                  <Icon
                    type="file-image"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                // value={this.state.image_url}
                placeholder="Image"
                name="image_url"
                onChange={this.handleChange}
              /> */}
            </Form.Item>

            <Form.Item>
              <Input
                prefix={
                  <Icon
                    type="money-collect"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                placeholder="price"
                name="price"
                //  value={this.state.price}
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item>
             
              <div className="input-field col s12">
                <select
                  name="category"
                  id="category"
                  type="text"
                  className="validate"
                  value="category"
                  // value={props.status}
                  onChange={this.handleChange}
                >
                  <option value="category">Category</option>
                  <option value="Food">Food</option>
                  <option value="Drink">Drink</option>
                </select>
                <label htmlFor="category">Category</label>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
