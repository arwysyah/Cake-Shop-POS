import { Modal, Button,Icon,Form ,Input} from 'antd';
import React from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import { Redirect } from 'react-router';

export default class Login extends React.Component {
  state = {
    loading: false,
    visible: false,
    email:'',
    password:'',
    loginKey:false
  };

  showModal = () => {
     
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
      let form={
          email:this.state.email,
          password:this.state.password
      }
    Axios.post('http://localhost:5050/user/login',form).then(res=>{
        console.log(res)
        if(res.data.succes === 1){
            localStorage.setItem('jwt', res.data.token)
            this.setState({
              loginKey : true
            })
      
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Success to Login',
              showConfirmButton: false,
              timer: 500
            })
          }else{
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Data Not Found',
                showConfirmButton: false,
                timer: 500
              })
          }
    })
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleChange = event => {
    
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state.password)
   
  };

  render() {
    if(this.state.loginKey){
        return (
          
        <Redirect to ="/" />
        )
    }
  
       
    const { visible, loading } = this.state;
    return (
      <div>
        <Icon
        onClick={this.showModal}
                    type="user-add"
                    style={{ color: "red", fontSize: 29, left: 4 }}
                  />
        <Modal
          visible={visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
        <Form>
        <Form.Item>
              <Input
                prefix={
                  <Icon
                    type="user"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                placeholder="email"
                name="email"
                //  value={this.state.price}
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon
                    type="lock"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                placeholder="password"
                name="password"
                //  value={this.state.price}
                onChange={this.handleChange}
              />
            </Form.Item>
        </Form>
        </Modal>
      </div>
    );
  }
}

