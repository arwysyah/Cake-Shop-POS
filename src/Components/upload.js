import React from 'react'
import Axios from 'axios';
import { Upload } from 'antd';
export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: '',loading:false};
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
   const files = e
  }

  UploadImage=async e =>{
    const files = e.target.files
    const data = new FormData()
    data.append('file',files[0])
    data.append('upload_preset','kenzoymc')
    this.setState({
        loading:false
    })
   

    Axios.post('https://api.cloudinary.com/v1_1/kenzo/upload',data).then(res=>{
      console.log(res)
    })
    
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (this.setState==false) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            name='file'
            onChange={this.UploadImage} />
          <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}
  
