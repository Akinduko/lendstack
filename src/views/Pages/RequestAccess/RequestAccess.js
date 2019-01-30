import React, {Component} from 'react';
import {
  Input,
  FormFeedback,
  FormGroup,
  Form,
  Container,
  Card
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { post_action } from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import Loader from 'react-loader-spinner';
import * as Yup from 'yup'
import { Formik } from 'formik';

const validField =["email"]

const fields = {
  email: ""
}

const validFields ={
  email: false,
}

const validationSchema = function (values) {
   
  return Yup.object().shape({
    email: Yup.string()
    .email('That email is strange. Please check it again.\n')
    .required('Hey, we need your email.')
  })
}

const initialValues = {
  confirmPassword: "",
  password: ""
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

class RequestAccess extends Component {

  constructor(props) {

    super(props);
   
    this.state = {
      timeout: 0,
      response:false,
      color:"red",
      success:false,
      email: "",
      loader: false,
      code: false,
      errortext: "",
      formErrors: fields,
      validFields:validFields,
      value: '',
      suggestions: [],
      fontSize: "",
      modal: false,
      button:false,
      headertext:"",
      formValid: false,
      token: props.match.params
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleUserValidation = this.handleUserValidation.bind(this);
  }

  handleUserValidation = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    await this.setState(
      { [name]: value },
      () => {
        this.validateField(name, value)
      });
  }

  
  handleUserInput = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    await this.setState({ [name]: value });
  }


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

  async handleSubmit(value,event) {
    event.preventDefault()
    const body = {
      "email":value.email
     }
    
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
      
      await this.props.dispatch(actions("GET_RESET_AUTH",post_action("",body,"auth/password_reset","")))
      switch(this.props.state){
        case "success":
        this.setState({
          headertext: "Request Successful",
          loader: false,
          response: true,
          success:true,
          color: "green"
        });
        await this.setTimedNotification(3000)
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
          headertext: "Verifying your details.",
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
        headertext: "Verifying your details.",
        loader: true,
        response: false,
        success:false,
        color: "#213F7D",
        errortext: ""
      });
      const start = pre_action()
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


  checkEmail = (value) => {
    const pate = /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/
    if (value.length === 0) {
      return "Hey, we need your email."
    }
    if (pate.test(value) === false) {
      return 'That Email is strange. Please check it again.'
    }
    return true
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let fieldValidationState = this.state.validFields;
      if(fieldName.includes("email")){
        switch (fieldName){
          case fieldName:
          const checkemail = this.checkEmail(value)
          fieldValidationState[fieldName] = this.checkEmail(value) === true ? true : false
          fieldValidationErrors[fieldName] = checkemail === true ? null : `${checkemail}`
        }
      }
    this.setState({
      formErrors: fieldValidationErrors,
      validFields:fieldValidationState
    }, this.validateForm);
    
  }

  async validateForm() {
    let state ={}
      for(let each of validField){
        state[each] = this.state.validFields[each]
      }
    const _state = Object.values(state);
    const result = _state.reduce((sum, next) => sum && next, true);
    await this.setState({ formValid: result });
  }

  redirect(link){
    this.props.history.push(link)
  }


  render() {
    return (
      <Container style={{height:"100vh"}} className="d-flex flex-column justify-content-center w-100">
      <div className="d-flex flex-row w-100 justify-content-center validate-page h-100" >
      <div className="d-flex flex-column w-50 justify-content-center mobile-validate-page validate-page h-100" >
      <Card className="h-50 w-100 forgot-card">
      <div className="h-25 w-100 flex-row justify-content-center success-logo">
      <img className="w-50" src={require('../../../assets/img/brand/logo-forgot.svg')}/>
      </div>      
      <div className="text-center form-communication">
          <p>Forgot Your Password?</p>
          <a>Enter the email address you registered with and we'll send you instructions on how to reset it.</a>
      </div>      
      <div className="d-flex flex-row justify-content-center w-100 h-75 success-form">
      <Formik
              initialValues={initialValues}
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
          <Form onSubmit={this.handleSubmit.bind(this,values)} className="d-flex flex-column justify-content-center h-100 w-75">
          <div className="h-25 password">
          <FormGroup className="h-100">

                    <Input  
                      type="email"
                      maxLength="30"
                      placeholder="Email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      valid={!errors.email}
                      invalid={touched.email && !!errors.email}
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="h-75" 
                      />
                      <FormFeedback>{errors.email}</FormFeedback>
                
         </FormGroup> 

          </div>
          <div onClick={()=>this.redirect("/login")} className="forgot mb-3">
            <a>Login</a>
          </div>
          {this.state.loader ?null :this.state.response ?                       
                  <div className="text-center login-loader-text" style={{color:this.state.color,fontSize:"95%"}}>
                    {this.state.headertext}
                  </div>:null}     
          { this.state.response?null:this.state.loader ?
                    <div className="d-flex justify-content-center">
                    <Loader type="Watch" color="black" height="50" width="60"/>
                    </div>:<div className="d-flex h-25 flex-row justify-content-center w-100"><Input className="submit h-75" disabled={isSubmitting || !isValid} type="submit" value="SEND RESET INSTRUCTIONS"/></div>}
         </Form>
                    )} /> 
    </div>
      </Card>
    
      </div>
  </div>
      </Container>
    );
  }
}

export default connect(store => {
  return {
    state: store.action.reset_auth_state,
    error: store.action.reset_auth_error
  };
})(withRouter(RequestAccess));