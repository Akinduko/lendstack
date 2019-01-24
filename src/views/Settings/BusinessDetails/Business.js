import React, {Component} from 'react';
import {
  Input,
  FormFeedback,
  FormGroup,
  Form,
  Label
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { post_action ,get_action,uploads} from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import Loader from 'react-loader-spinner'
import FileUploader from 'react-firebase-file-uploader';

class Business extends Component {

  constructor(props) {

    super(props);
    this.state = {
      imagename: 'Add image',
      imageurl: '',
      isUploading: false,
      progress: 0,
      files:{},
    };
  }

  async componentDidMount(){
    await this.props.dispatch(actions("GET_USER_PROFILE",get_action(this.props.auth.token,"users/me/profile","")))
    switch(this.props.user_state){
      case "success":

      break
    }
  }

  imageOnChangeHandler = (event) => {
    const files = event.target.files
    const id = this.props.uid
    if (files && files[0]) {
    this.imageUploadStart(files[0],id)
    }
    }; 
  
    imageUploadStart =async (file,id) => {
    this.setState({
     isUploading: true, 
     })
    
     const result = await uploads('users',id,file)
     if(result.id){
      this.setState({
      isUploading: false,
      userartwork: result?result.avatar:''  
     })
       
     }
    };


  render() {
    return (
        <div className="parent d-flex flex-column justify-content-center">
        <div className="p-text-2 mb-5">Business Details</div>
        <div className="d-flex flex-row justify-content-start ">
        <div className="d-flex flex-column justify-content-center w-25">
        <p className="p-text-3">Business Logo</p>
        <a className="p-text-4">Upload  a logo for your business</a>
        </div>
        <div className="d-flex label-icon ml-10">
        <Label for="img">
              <div className="d-flex flex-column text-center justify-content-right">
              <img className="img-responsive" src={require("../../../assets/img/brand/logo-upload-icon.svg")}/>
              </div>
        </Label>
        <FileUploader
              key="123"
              id="img"
              style={{
                width: 0.1,
                height: 0.1,
                opacity: 0,
                overflow: 'hidden',
                position: 'absolute'
              }}
              accept="image/*"
              name="logo"
              onChange={this.imageOnChangeHandler.bind(this)} 
              ref={(instance) => { this.fileUploader = instance; } }
            />
        </div>
        </div>
        <div className="d-flex flex-row justify-content-between mt-5">
        <div className="d-flex flex-column w-25 justify-content-center">
        <p className="p-text-3">Business Name</p>
        <a className="p-text-4">Your Registered Business name & RC Number</a>
        </div>
        <div className="d-flex flex-row ml-10 w-75 justify-content-between">
        <div className="d-flex flex-column w-45 justify-content-center" >
        <a className="p-text-4">Business Name</a>
        <Input className=" h-75 form-control"/>
        </div>
        <div className="d-flex flex-column w-45 justify-content-center" >
        <a className="p-text-4">RC Number</a>
        <Input className="h-75  form-control"/>
        </div>
        </div>
        </div>
        
        <div className="d-flex flex-row justify-content-between mt-5">
        <div className="d-flex flex-column w-25 justify-content-center">
        <p className="p-text-3">Upload Documents</p>
        <a className="p-text-4">Uplaod Certificate of incorporation & TIN</a>
        </div>
        <div className="d-flex flex-row ml-10 w-75">
        <div className="d-flex flex-column  upload-container" >
        <div className="d-flex flex-column pt-10 pb-10 pl-10 pr-10 h-100 justify-content-around" >
        <div className="d-flex flex-column mt-2 justify-content-center">
        <img className="img-responsive" src={require('../../../assets/img/brand/upload-icon.svg')}/>
      </div>
      <div className="d-flex flex-column mt-2 justify-content-center">
      <a className="p-text-4 text-center">Drop Certificate of incorporation image</a>
      </div>
      <div className="d-flex flex-column mt-2 justify-content-center">
      <a className="select-text text-center">BROWSE FOLDER</a>
      </div>
                 
        </div>
        </div>
        <div className="d-flex flex-column upload-container ml-10" >
        <div className="d-flex flex-column pt-10 pb-10 pl-10 pr-10 h-100 justify-content-around">
            <div className="d-flex flex-column  mt-2 justify-content-center">
              <img className="img-responsive" src={require('../../../assets/img/brand/upload-icon.svg')}/>
            </div>
            <div className="d-flex flex-row mt-2 justify-content-center">
            <a className="p-text-4 text-center">Drop TIN image</a>
            </div>
            <div className="d-flex flex-row mt-2 justify-content-center">
            <a className="select-text text-center">BROWSE FOLDER</a>
            </div>
                      
        </div>
        </div>
     </div>
        </div>  
        <div className="save-business">
          <Input className="submit" disabled={!this.state.formValid} type="submit" value="Save Changes"/>
        </div>
        </div>
    );
  }
}


export default connect(store => {
  return {
    auth_state: store.action.auth_state,
    user_error: store.action.user_error,
    auth_error: store.action.auth_error,
    auth: store.token.auth,
    user_profile:store.action.user,
    user_state:store.action.user_state
  };
})(withRouter(Business));
