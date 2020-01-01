import React from "react";
import { Modal, Form, Icon, Input, Button } from "antd";
import axios from "axios";

import swal from "sweetalert";

export default class EditProduct extends React.Component {
  state = {
    loading: false,
    visible: false,
    ProductStore: {},
    name: this.props.count.name,
    price: this.props.count.price,
    image_url: this.props.count.image_url,
    category: this.props.category,
    file: "",
    imagePreviewUrl: "",
    count: this.props.count
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
    console.log("okkk");

    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("price", this.state.price);
    formData.append("image_url", this.state.image_url);
    formData.append("category", this.state.category);

    await this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
    const id_product = this.props.id_product;
    await axios
      .put(`http://localhost:5050/product/${id_product}`, formData)
      .then(response => {
        console.log(response);
      })
      .then(
        swal("Edit Product Successfully!", "Your Product has Edited", "success")
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
    
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state.ProductStore, "pro");
  };

  render() {
    // const count = this.props.count
    console.log(this.state.count.id_product, "ccoun");
    const id_product = this.props.id_product;
    console.log(id_product, "id____");
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (this.setState == false) {
      $imagePreview = <img src={imagePreviewUrl} />;
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }
    const { visible, loading, count } = this.state;

    return (
      <div>
        <p onClick={this.showModal}>
          <a>Edit</a>
        </p>
        <Modal
          visible={visible}
          title="Edit Product"
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
                placeholder={count.name}
                value={this.state.name}
                name="name"
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item>
              <div className="previewComponent">
                <form>
                  <img
                    src={this.state.image_url}
                    alt="img"
                    style={{ height: 50, width: 60 }}
                  />
                  <input
                    className="image_url"
                    type="file"
                    name="image_url"
                    placeholder={count.image_url}
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
                placeholder={count.price}
                // value={count.price}
                value={this.state.price}
                name="price"
                //  value={this.state.price}
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item>
              {/* <Input
                prefix={
                  <Icon
                    type="money-collect"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                placeholder="category"
                name="category"
                //  value={this.state.price}
                onChange={this.handleChange}
              /> */}
              <div className="input-field col s12">
                <select
                  name="category"
                  id="category"
                  type="text"
                  className="validate"
                  value={this.state.category}
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
