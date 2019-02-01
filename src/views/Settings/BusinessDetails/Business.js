import React, {Component} from 'react';
import {
  Input,
  FormFeedback,
  FormGroup,
  Form,
  Label,
  Row,
  Col
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { put_action ,get_action,uploads} from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import Loader from 'react-loader-spinner'
import FileUploader from 'react-firebase-file-uploader';
import * as Yup from 'yup'
import { Formik } from 'formik';

const validationSchema = function (values) {
   
  return Yup.object().shape({
    business_name: Yup.string()
    .max(30, `Name has to be at most 30 characters`),
    company_registration_number: Yup.string()
    .max(14, `Phone number has to be at most ${14} characters!`)
    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 
    'That number is strange. Please check it again.\n')
  })
}

const validate = (getValidationSchema) => {
  return (values) => {
    
    const validationSchema = getValidationSchema(values)

    try {
      validationSchema.validateSync(values, { abortEarly: false })
      return {}
    } catch (error) {
      return getErrorsFromValidationError(error)
    }
  }
}

const getErrorsFromValidationError = (validationError) => {
  const FIRST_ERROR = 0
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }
  }, {})
}


const onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2))
    // console.log('User has been successfully saved!', values)
    setSubmitting(false)
  }, 2000)
}



const initialValues = {
  email: "",
  password: ""
}

class Business extends Component {

  constructor(props) {

    super(props);
    this.state = {
      imagename: 'Add image',
      imageurl: '',
      isUploading: false,
      progress: 0,
      coi:{},
      tin:{},
      files:{},
    };
  }


  findFirstError (formName, hasError) {
    const form = document.forms[formName]
    for (let i = 0; i < form.length; i++) {
      if (hasError(form[i].name)) {
        form[i].focus()
        break
      }
    }
  }

  validateForm (errors) {
    this.findFirstError('simpleForm', (fieldName) => {
      return Boolean(errors[fieldName])
    })
  }

  touchAll(setTouched, errors) {
    setTouched({
        firstName: true,
        lastName: true,
        userName: true,
        email: true,
        password: true,
        confirmPassword: true,
        accept: true
      }
    )
    this.validateForm(errors)
  }

  postImageOnChangeHandler = async (name, files) => {
    if (files && files[0]) {
      const path = URL.createObjectURL(files[0])
      await this.setState({[`url_${name}`]: path,[`name_${name}`]: files[0].name});
    }
  };

  imageOnChangeHandler = async (event) => {
    const files = event.target.files
    const name = event.target.name;
    await this.setState(
      {[name]: files},
                  () => { 
                    this.postImageOnChangeHandler(name, files) 
    });
    }; 
    setTimedNotification(time) {
      const operation = async () => {
        return this.setState({
          response: false,
          loader:false,
          headertext: "",
        })
      }
      return setTimeout(async () => {
        await operation()
      }, time);
    }
    imageUploadStart =async (content) => {
    this.setState({
     isUploading: true, 
     })
     const profile= this.props.profile;
     const id = profile.companies?profile.companies[0].id:""
     return await uploads(this.props.auth.token,content.name,id,content.file); 
    };

    async handleSubmit(value,event){
      event.preventDefault() 
       const body={
        business_name:value.business_name,
        company_registration_number:value.company_registration_number
        }
      const files = [];
      const content = ["coi","tin","logo"];
      for(let each of content){
        if(this.state[each]){
          files.push({name:each,file:this.state[each][0]})
        }
      }
      const promise =[]
      for(let each of files){
        promise.push(this.imageUploadStart(each))
      }
     const result = await Promise.all(promise)
      const pre_action = async () =>{
        try{
        this.setState({
          headertext: "Verifying your details.",
          loader: true,
          response: false,
          success:false,
          color: "#213F7D",
          errortext: ""
        });
        const profile= this.props.profile;
        const id = profile.companies?profile.companies[0].id:""
        await this.props.dispatch(actions("UPDATE_USER_DETAILS",put_action(this.props.auth.token,body,`lenders/${id}`,"")))
        switch(this.props.state){
          case "success":
          break;
          case "failed":
          this.setState({
            headertext: this.props.error.response?this.props.error.response.data.message:"Request failed, Please try again",
            loader: false,
            response: true,
            success:false,
            color: "red"
          });
          await this.setTimedNotification(3000)
          break;
          case "pending":
          this.setState({
            response: false,
            loader: true,
            color: "#213F7D",
            headertext: "Submitting your details",
          });
          break;
          default:
  
          break;
        }
      }
        catch (error) {
          this.setState({
            headertext: this.props.error.response?this.props.error.response.data.message:"Request failed, Please try again",
            loader: false,
            response: true,
            success:false,
            color: "red"
          });
          await this.setTimedNotification(5000)
        }
      }
      try{
        this.setState({
          headertext: "Submitting your details.",
          loader: true,
          response: false,
          success:false,
          color: "#213F7D",
          errortext: ""
        });
        pre_action()
        console.log(result)
      }
      catch(error){
        this.setState({
          headertext: "Ooops!! Something went wrong.",
          loader: false,
          response: true,
          success:false,
          color: "red"
        }); 
        await this.setTimedNotification(5000)    
      }
      
    }  
 
  render() {
    return (
        <div className="parent h-100 d-flex flex-column justify-content-center">
        <Formik initialValues={initialValues}
                    validate={validate(validationSchema)}
                    onSubmit={onSubmit}
                    render={
                      ({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        isSubmitting,
                        isValid,
                      }) => (
          <Form onSubmit={this.handleSubmit.bind(this,values)} className=" d-flex flex-column mobile-form justify-content-around h-100 w-100">
          <Row>
            <Col md="12">
            <div className="h-100 w-100 p-text-2 h-10 mb-5">Business Details</div>
            </Col>
            <Col md="12">
            <div className="h-100 w-100 d-flex flex-row justify-content-start ">
                  <div className="d-flex flex-column justify-content-center w-25">
                  <p className="p-text-3">Business Logo</p>
                  <a className="p-text-4">Upload  a logo for your business</a>
                  </div>
                  <div className="d-flex label-icon ml-10">
                  <Label for="logo">
                        <div className="d-flex flex-column text-center justify-content-right">
                        {this.state.url_logo?<img className="h-25 w-25 img-avatar" src={this.state.url_logo}/>:<img className="img-avatar" src={require("../../../assets/img/brand/logo-upload-icon.svg")}/>}
                        </div>
                  </Label>
                  <FileUploader
                        key="123"
                        id="logo"
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
            </Col>
            <Col md="12">
            <div className="h-100 w-100 d-flex flex-row justify-content-between">
              <div className="d-flex flex-column w-25 justify-content-center">
              <p className="p-text-3">Business Name</p>
              <a className="p-text-4">Your Registered Business name & RC Number</a>
              </div>
              <div className="d-flex flex-row ml-10 w-75 justify-content-between">
              <div className="d-flex flex-column w-45 justify-content-center" >
              <a className="p-text-4">Business Name</a>
              <FormGroup className="h-100">
                <Input  
                    type="text"
                    maxLength="30"
                    placeholder="Business Name"
                    name="business_name"
                    id="business_name"
                    autoComplete="Business Name"
                    valid={!errors.business_name}
                    invalid={touched.business_name && !!errors.business_name}
                    className="h-100 w-100"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.business_name} 
                    />
                <FormFeedback>{errors.business_name}</FormFeedback>
              </FormGroup>
              </div>
              <div className="d-flex flex-column w-45 justify-content-center" >
              <a className="p-text-4">RC Number</a>
              <FormGroup className="h-100 w-100">
                <Input  
                    type="number"
                    maxLength="30"
                    placeholder="Company registration number"
                    name="company_registration_number"
                    id="company_registration_number"
                    autoComplete="Company registration number"
                    valid={!errors.company_registration_number}
                    invalid={touched.company_registration_number && !!errors.company_registration_number}
                    className="h-100 w-100"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.company_registration_number} 
                    />
                <FormFeedback>{errors.company_registration_number}</FormFeedback>
              </FormGroup>
              </div>
              </div>
            </div>            
            </Col>
            <Col md="12">
            <div className="h-100 w-100 d-flex flex-row justify-content-between">
            <div className="d-flex flex-column w-25 justify-content-center">
            <p className="p-text-3">Upload Documents</p>
            <a className="p-text-4">Upload Certificate of incorporation & TIN</a>
            </div>
            <div className="d-flex flex-row ml-10 w-75">
            <div className="d-flex flex-column  upload-container" >
            <div className="d-flex flex-column pt-10 pb-10 pl-10 pr-10 h-100 justify-content-around" >
            <div className="d-flex flex-column mt-2 justify-content-center">
            <img className="img-responsive" src={require('../../../assets/img/brand/upload-icon.svg')}/>
            </div>
            <div className="d-flex flex-row mt-2 justify-content-center">
          <a className="p-text-4 text-center">Certificate of incorporation image</a>
          </div>
            <div className="d-flex flex-row mt-2 justify-content-center">
            <a className="p-text-4 text-center">{this.state.name_coi}</a>
            </div>
          <div className="d-flex flex-row  mt-2 justify-content-center">
            <Label for="coi">
              <a className="select-text text-center">BROWSE FOLDER</a>
            </Label>
            <FileUploader
                  key="12"
                  id="coi"
                  style={{
                    width: 0.1,
                    height: 0.1,
                    opacity: 0,
                    overflow: 'hidden',
                    position: 'absolute'
                  }}
                  accept="application/pdf,image/*"
                  name="coi"
                  onChange={this.imageOnChangeHandler.bind(this)} 
                  ref={(instance) => { this.fileUploader = instance; } }
                />
          </div>
                    
            </div>
            </div>
            <div className="d-flex flex-column upload-container ml-10" >
            <div className="d-flex flex-column pt-10 pb-10 pl-10 pr-10 h-100 justify-content-around">
                <div className="d-flex flex-column  mt-2 justify-content-center">
                  <img className="img-responsive" src={require('../../../assets/img/brand/upload-icon.svg')}/>
                </div>
                <div className="d-flex flex-row mt-2 justify-content-center">
                <a className="p-text-4 text-center">Upload TIN image</a>
                </div>
                <div className="d-flex flex-row mt-2 justify-content-center">
                  <a className="p-text-4 text-center">{this.state.name_tin}</a>
                  </div>            
                <div className="d-flex flex-row mt-2 justify-content-center">
                <Label for="tin">
                  <a className="select-text text-center">BROWSE FOLDER</a>
                </Label>
                <FileUploader
                      key="1"
                      id="tin"
                      style={{
                        width: 0.1,
                        height: 0.1,
                        opacity: 0,
                        overflow: 'hidden',
                        position: 'absolute'
                      }}
                      accept="application/pdf,image/*"
                      name="tin"
                      onChange={this.imageOnChangeHandler.bind(this)} 
                      ref={(instance) => { this.fileUploader = instance; } }
                    />
                </div>
                          
            </div>
            </div>
        </div>
            </div>  
            </Col>
            <Col md="12" className="h-25 d-flex flex-column justify-content-center">
              <div className="w-100 h-50 d-flex flex-row justify-content-center">
                {this.state.loader ?null :this.state.response ?                       
                                <div className="text-center login-loader-text" style={{color:this.state.color,fontSize:"95%"}}>
                                  {this.state.headertext}
                                </div>:null}     
                        { this.state.response?null:this.state.loader ?
                                  <div className="d-flex justify-content-center">
                                  <Loader type="Watch" color="black" height="50" width="60"/>
                                  </div>:<Input type="submit" className="submit w-25 h-100" value="Save Changes"/>}
                </div>
            </Col>
          </Row>
</Form>)} /> 
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
    user_state:store.action.user_state,
    current_company:store.action.current_company,
    profile:store.action.user,
    auth: store.token.auth,
    update_user:store.action.update_user,
    state:store.action.update_user_state,
    error:store.action.update_user_error
  };
})(withRouter(Business));
