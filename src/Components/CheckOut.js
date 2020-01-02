import React from "react";
import { Modal, Button } from "antd";
import Axios from "axios";
import swal from "sweetalert";
import jsPDF from 'jspdf'

class CheckOut extends React.Component {
  state = {
    loading: false,
    visible: false,
    myData: [],
    form: [],
    id: new Date().valueOf()
  };
  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = async () => {
    let myData = [];

    let dataCheckout = this.props.dataCheckout;
    dataCheckout.map((data, index) => {
      myData.push(data.name);

      return (
        console.log(data.name, "data.name")
      );
    });

    let myDatan = myData.toString();

    let id_receipt=this.state.id
    let total = this.props.total;
    let ppn = total * 0.1;
    let sumTotal = total + ppn;
    let quantity = this.props.quantities;
    let formData = {
      // total : total,
      total: sumTotal,
      product: myDatan,
      quantities: quantity,
      id_receipt: this.state.id
    };

    await Axios.post(`http://localhost:5050/history/`, formData)
      .then(res => {
        console.log(res, "res");
      })
      .then(
        swal(
          "Transaction Succes!",
          "Thanks fror Using Our Services!",
          "success"
        )
      )
      .then(()=>{
        document.location.href = "/";
        var doc = new jsPDF();
        let space = 10;
        doc.text(`CHocoShop`, 10, (space += 10));
        doc.text(` ID Receipt: ${id_receipt}`, 10, (space += 10));
        doc.text(`CHocoShop`, 10, (space += 10));
        
        // doc.text(`Cashier ${cashier}`, 10, (space += 10));
        // doc.text(`Cashier ${cashier}`, 10, 30);
        // if (checkout.length > 0) {
        dataCheckout.map(data => {
          // doc.text(`${items.name} ${items.count}x Rp. ${this.formatNumber(items)}`, 10, 10);
          doc.text(
            `${data.name} ${data.quantity}x Rp. ${this.formatNumber(
              data.price
            )}`,
            10,
            (space += 10)
          );
        });
        // }
        doc.text(
          `Total Rp. ${this.formatNumber(total)}`,
          10,
          (space += 10)
        );
        doc.text(`Total Quantities ${quantity}`)
        doc.text(`Payment Cash`, 10, (space += 10));
        doc.save(`${id_receipt}.pdf`);
      })
      .then(() => {
        // window.location.reload(true);
      });

    // console.log(dataCheckout[0].name,'checkout')
    console.log(formData, "form");
    // console.log(myData,'mydata')
    // console.log('name',this.data.name)

    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
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
  jsPdfGenerator=()=>{
    var doc = new jsPDF('p','pt')
    //add some text of the pdf
    doc.text(20,20,'this is')
    //set the font for pdf
    doc.setFontType('courier')
    doc.setFontType('normal')
    doc.text(20,30,'this is text with courier font')
    //save the document
    doc.save('generated.pdf')
  }
  render() {
    let dataCheckout = this.props.dataCheckout;
    let total = this.props.total;
    let ppn = total * 0.1;
    let sumTotal = total + ppn;
    let quantities = this.props.quantities;
    // console.log("data", dataCheckout);
    // console.log("total", total);
    const { visible, loading } = this.state;
    return (
      <div>
        <Button
          type="primary"
          style={{ left: -10, width: 240, backgroundColor: "#57CAD5" }}
          onClick={() => this.showModal()}
        >
          Checkout
        </Button>
        <Modal
          visible={visible}
          title="Your Cart"
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
          <div style={{ marginLeft: -80 }}>
            <p style={{ marginLeft: 150, marginTop: -20 }}>
              {" "}
              No ID RECEIPT : {this.state.id}
            </p>
            <table style={{ width: "100%" }}>
              <tr style={{ textAlign: "center" }}>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
              {dataCheckout.map((items, i) => {
                return (
                  <tr style={{ textAlign: "center" }} key={i}>
                    <td>{items.name}</td>
                    <td> {this.formatNumber(items.quantity)}</td>
                    <td>
                      Rp. {this.formatNumber(items.price * items.quantity)}
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
          <div style={{ marginTop: 20 }}>
            <table style={{ width: "100%" }}>
              <tr style={{ fontWeight: "bold" }}>
                <td>PPN 10 % </td>
                <td>:</td>
                <td style={{ marginLeft: 140 }}>
                  Rp. {this.formatNumber(ppn)}
                </td>
              </tr>

              <tr style={{ fontWeight: "bold" }}>
                <td>Total</td>
                <td>:</td>
                <td>Rp. {this.formatNumber(sumTotal)}</td>
                <td>Total Quantity</td>
                <td>:</td>
                <td> {this.formatNumber(quantities)}</td>
              </tr>
            </table>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CheckOut;
