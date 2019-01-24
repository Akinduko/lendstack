import React, {Component} from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { post_action } from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import Loader from 'react-loader-spinner'
import { 
  FormGroup,
  FormFeedback,
  Form, 
  Col, 
  Card,
  Container, 
  Input, 
  Row 
} from 'reactstrap';
import * as Yup from 'yup'
import { Formik } from 'formik';

const validationSchema = function (values) {
   
  return Yup.object().shape({
    email: Yup.string()
    .email('That email is strange. Please check it again.\n')
    .required('Hey, we need your email.'),
    password: Yup.string()
    .min(6, `Password has to be at least ${6} characters!`)
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, 'Password must contain: numbers, uppercase and lowercase letters\n')
    .required('Password is required')
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

class Login extends Component {

  constructor(props) {

    super(props);
    this.state = {
      timeout: 0,
      response:false,
      color:"red",
      success:false,
      email: "",
      password: "",
      loader: false,
      code: false,
      errortext: "",
      value: '',
      suggestions: [],
      fontSize: "",
      modal: false,
      button:false,
      headertext:""
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleUserInput = this.handleUserInput.bind(this);
    // this.handleUserValidation = this.handleUserValidation.bind(this);
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


  // handleUserValidation= async (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   await this.setState(
  //     {[name]: value},
  //                 () => { 
  //                   this.validateField(name, value) 
  //   });
  // }

  // handleUserInput = async (e) => {
  //   const value = e.target.value;
  //   const name = e.target.name;
  //  await this.setState({[name]: value});
  // }

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

  redirect(link){
    this.props.history.push(link)
  }

  async handleSubmit(value,event){
console.log("hello",value)
    event.preventDefault()

     const body={
      password:value.password,
      email:value.email
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
      await this.props.dispatch(actions("GET_AUTH",post_action("",body,"auth/signin","")))
      switch(this.props.state){
        case "success":
        await this.props.dispatch(actions("SET_TOKEN_FULFILLED",this.props.auth))
        this.props.history.push('/')
        break;
        case "failed":
        this.setState({
          headertext: this.props.error.response?this.props.error.response.data.message:"Login failed, Please try again",
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
          headertext: this.props.error.response?this.props.error.response.data.message:"Login failed, Please try again",
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


  render() {
    return (
      <div style={{"overflowX":"hidden"}} className="access-container">
      <Container fluid>
      <Row className="w-100 mt-5">
      <div className="header-row-flex">
        <Col  xs="6" md="6">
        <div className="w-xs-50 h-xs-50 lend-logo">
        <img src={require('../../../assets/img/brand/logo.svg')}/>
        </div>  
        </Col>
        <Col className="d-flex flex-row justify-content-end" xs="6" md="6">
          <div className="socials">
          <a href="https://web.facebook.com/Lendstack/" target="_blank" className="facebook">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/lendstack/" target="_blank" className="facebook">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/company/lendstack/" target="_blank" className="facebook">
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="https://twitter.com/lendstack" target="_blank" className="twitter">
            <i className="fa fa-twitter"></i>
          </a>               
          </div>
      </Col>
      </div>
      </Row>

 <div className="body-row-flex">
 <Row className="ml-1 w-100">
   <Col  xs="12" sm="6" md="6">
   <div className="left-column-flex w-100 text-center">
      <div className="page-communication">
        <p>Software to run your loan business</p>
        <a>Your everyday tasks feel light. More time with Borrowers, less time with paper and spreadsheets. </a>
        </div>
        <div className="page-illustration">
        <img src={require('../../../assets/img/brand/illustration.svg')}/>
        </div>
      </div>
   </Col>
   <Col xs="12" sm="6" md="6">
   <div className="h-100 right-column-flex justify-content-center flex-row w-100">
      <Card className="login-form h-xs-100 h-md-75 justify-content-around flex-column">
        <div className="header d-flex mt-2 h-10 justify-content-center align-items-center flex-column"><p>Login</p></div>
          <div className="d-flex mb-3 flex-row w-100 justify-content-center">
          <div className="divider w-75"/>
          </div>
          <div className="form-content h-75 w-100 flex-row justify-row-center">
          <Row className="h-100">
          <Col xs="12" sm="12" md="12" className="flex-row d-flex justify-content-center h-75">
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
          <Form onSubmit={this.handleSubmit.bind(this,values)} className=" h-100 w-75">
          <div className="email">
          <FormGroup>
                    {/* <Input value={this.state.email} onChange={this.handleUserInput} name="email"
                      type="email"
                      maxLength="30"
                      placeholder="Email"
                      onBlur={this.handleUserValidation}
                      valid={this.state.validFields.email === true}
                      invalid={this.state.validFields.email !== true}
                      required
                    /> */}
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
                      />
                      <FormFeedback>{errors.email}</FormFeedback>
                 {/* {this.state.formErrors.email? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.email}`}</FormFeedback>:null} */}
         </FormGroup>                    
          </div>
          <div className="password">
          <FormGroup>
                    {/* <Input value={this.state.password} onChange={this.handleUserInput} name="password"
                      type="password"
                      maxLength="30"
                      placeholder="Password"
                      onBlur={this.handleUserValidation}
                      valid={this.state.validFields.password === true}
                      invalid={this.state.validFields.password !== true}
                      required
                    /> */}
                             <Input  
                                type="password"
                                maxLength="30"
                                placeholder="Password"
                                name="password"
                                id="password"
                                autoComplete="password"
                                valid={!errors.password}
                                invalid={touched.password && !!errors.password}
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password} 
                                />
                                 
                          <FormFeedback>{errors.password}</FormFeedback>
                 {/* {this.state.formErrors.password? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.password}`}</FormFeedback>:null } */}
                  </FormGroup>
          </div>
          <div onClick={()=>this.redirect("/reset")} className="forgot mb-3">
            <a  >FORGOT PASWORD?</a>
          </div>
          {this.state.loader ?null :this.state.response ?                       
                  <div className="text-center login-loader-text" style={{color:this.state.color,fontSize:"95%"}}>
                    {this.state.headertext}
                  </div>:null}     
          { this.state.response?null:this.state.loader ?
                    <div className="d-flex justify-content-center">
                    <Loader type="Watch" color="black" height="50" width="60"/>
                    {console.log(isValid)}
                    </div>:<div className="d-flex flex-row justify-content-center w-100"><Input className="submit" disabled={isSubmitting || !isValid} type="submit" value="LOG IN"/></div>}
         </Form>
                    )} /> 
          </Col>
          <Col xs="12" sm="12" md="12" className="h-10">
          <div className="footer mt-3 ">
            Don't have an account <a onClick={()=>this.redirect("/register")}> Sign up</a>
          </div> 
          </Col> 
          </Row>
          </div>  
      </Card>
      </div>   
   </Col>
 </Row>
   </div>
      </Container>
      </div>
    );
  }
}

export default connect(store => {
  return {
    state: store.login.state,
    error: store.login.error,
    auth: store.login.auth
  };
})(withRouter(Login));