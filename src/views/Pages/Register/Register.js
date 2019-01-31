import React, {Component} from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { post_action } from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import Loader from 'react-loader-spinner';
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Input,
  Container,
  FormFeedback,
  Form,
  Col,
  Card,
  Row,
  FormGroup,
} from 'reactstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import classnames from 'classnames';
const individual_fields=["password_individual","fullname","email_individual"]
const bussiness_fields=["name_bussiness","email_bussiness","password_bussiness"]
const validationSchema = function (values) {
   
  return Yup.object().shape({

    email_individual: Yup.string()
    .email('That email is strange. Please check it again.\n')
    .required('Hey, we need your email.'),
    fullname: Yup.string()
    .min(2, `Name has to be at least 2 characters`)
    .max(30, `Name has to be at most 30 characters`)
    .required("We need to have your name, don't you think so?"),
    password_individual: Yup.string()
    .min(8, `Password has to be at least ${8} characters!`)
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, 'Password must contain: numbers, upper and lower case letters\n')
    .required('Password is required')
  })
}
const _validationSchema = function (values) {
   
  return Yup.object().shape({
    email_bussiness: Yup.string()
    .email('That email is strange. Please check it again.\n')
    .required('Hey, we need your email.'),
    name_bussiness: Yup.string()
    .min(2, `Name has to be at least 2 characters`)
    .max(30, `Name has to be at most 30 characters`)
    .required("We need to have your name, don't you think so?"),
    password_bussiness: Yup.string()
    .min(8, `Password has to be at least ${8} characters!`)
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, 'Password must contain: numbers, upper and lower case letters\n')
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
const _onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2))
    // console.log('User has been successfully saved!', values)
    setSubmitting(false)
  }, 2000)
}



const initialValues = {
  password_individual: "",
  email_individual: "",
  fullname:""
}

const _initialValues = {

  password_bussiness:"",
  email_bussiness:"",
  name_bussiness:""
}

class Register extends Component {

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
      headertext:"",
      activeTab: '1',
      success:false,
      type:"bussiness",
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

    event.preventDefault()

     const _body={
      password_individual: value.password_individual,
      email_individual:value.email_individual,
      fullname:value.fullname,
      password_bussiness:value.password_bussiness,
      email_bussiness:value.email_bussiness,
      name_bussiness:value.name_bussiness
    }
  
    const body = {}
    if(this.state.type==="bussiness"){

      for(let each of bussiness_fields){
        body[each]=_body[each]
      }
      body["password"]=body["password_bussiness"];
      body["confirmPassword"]=body["password_bussiness"];
      body["email"]=body["email_bussiness"];
      body["user_name"]=body["name_bussiness"];
      body["entity_name"]="lender";
      delete body["password_bussiness"];
      delete body["email_bussiness"];
      delete body["name_bussiness"];
      
    }

    if(this.state.type==="individual"){
      for(let each of individual_fields){
        body[each]=_body[each]
      }
      body["password"]=body["password_individual"];
      body["confirmPassword"]=body["password_individual"];
      body["email"]=body["email_individual"];
      body["user_name"]=_body["fullname"]
      body["entity_name"]="lender";
      delete body["email_individual"];
      delete body["password_individual"];
      delete body["fullname"];
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
      await this.props.dispatch(actions("SET_REGISTRATION_AUTH",post_action("",body,"auth/signup","")))
      switch(this.props.state){
        case "success":
        await this.props.dispatch(actions("SET_REGISTERED_EMAIL_FULFILLED",{email:body.email}))
        this.setState({
          headertext: "Account Successfully Created.",
          loader: false,
          response: true,
          success:true,
          registered:true,
          color: "green"
        });
        await this.setTimedNotification(3000)
        break;
        case "failed":
        this.setState({
          headertext: "Signup Failed",
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
          headertext: "Signup in Progress",
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

  toggle(tab) {
    const tabs ={
      1:"bussiness",
      2:"individual"
    }
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        type: tabs[tab]
      });
    }
  }
  redirect(link){
    this.props.history.push(link)
  }

  render() {
    return (
      <Container fluid style={{"overflowX":"hidden"}} className="d-flex flex-row justify-content-around w-100 access-container h-100">
      <Row className="w-100">
      <Col xs="12" md="12" className="h-10 header-row-flex">
       <Row className="w-100 mt-5">
        <Col  xs="6" md="6">
        <div className="w-xs-50 h-xs-50 lend-logo">
        <img src={require('../../../assets/img/brand/logo.svg')}/>
        </div>  
        </Col>
        <Col className="d-flex flex-row pr-0 w-100 justify-content-end" xs="6" md="6">
          <div className="mr-0 socials">
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
      </Row> 
      </Col>
      <Col style={{height:"80%"}} xs="12" sm="12" md="12">
      <Row  className="ml-1 w-100 body-row-flex  h-100">
      <Col  xs="12" sm="6" md="6"  className="left-column-flex w-100 text-center">
                  <div className="page-communication">
                    <p>Software to run your loan business</p>
                    <a>Your everyday tasks feel light. More time with Borrowers, less time with paper and spreadsheets. </a>
                    </div>
                    <div className="page-illustration">
                    <img src={require('../../../assets/img/brand/illustration.svg')}/>
                    </div>
      </Col>
      <Col xs="12" sm="6" md="6" className="h-100 right-column-flex custom-reg justify-content-end flex-row w-100">
      <Card className="register-form w-75 h-75  justify-content-around flex-column" >
        <div className="header d-flex mt-2 h-10 justify-content-center align-items-center flex-column"><p>Join Lendstack !</p></div>
          <div className="d-flex mb-3 flex-row w-100 justify-content-center">
          <div className="divider w-75"/>
        </div>
                    <div style={{height: "84%"}} className="form-content w-100 flex-row justify-content-center">
                      <Row className="h-100">
                      <Col xs="12" sm="12" md="12" style={{height: "80%"}} className="flex-column d-flex justify-content-center">
    
                              <Nav tabs>
                                <NavItem>
                                  <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                  >
                                    Business Lender
                              </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                  >
                                    Individual Lender
                              </NavLink>
                                </NavItem>
                              </Nav>
                              <TabContent activeTab={this.state.activeTab}>
                                <TabPane className="h-100"  tabId="1">
                                <Formik
                                  initialValues={_initialValues}
                                  validate={validate(_validationSchema)}
                                  onSubmit={_onSubmit}
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
                                <Form className="h-100 d-flex flex-column justify-content-around" onSubmit={this.handleSubmit.bind(this,values)}>
                                <div className="d-flex w-100 flex-row justify-content-center bizname">
                                <FormGroup className="w-75">
                                  <Input  
                                    type="text"
                                    maxLength="30"
                                    placeholder="Business Name"
                                    name="name_bussiness"
                                    id="name_bussiness"
                                    autoComplete="Business Name"
                                    valid={!errors.name_bussiness}
                                    invalid={touched.name_bussiness && !!errors.name_bussiness}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name_bussiness} 
                                    />
                                    <FormFeedback>{errors.name_bussiness}</FormFeedback>
                                  </FormGroup>
                                  </div>
                                  <div className="d-flex w-100 flex-row justify-content-center email">
                                  <FormGroup className="w-75">
                                  <Input  
                                    type="email"
                                    maxLength="30"
                                    placeholder="Email"
                                    name="email_bussiness"
                                    id="email_bussiness"
                                    autoComplete="Email"
                                    valid={!errors.email_bussiness}
                                    invalid={touched.email_bussiness && !!errors.email_bussiness}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email_bussiness} 
                                    />
                                    <FormFeedback>{errors.email_bussiness}</FormFeedback>
                                  </FormGroup>
                                  </div>
              
                                  <div className="d-flex w-100 flex-row justify-content-center password">
                                  <FormGroup className="w-75">
                                  <Input  
                                    type="password"
                                    maxLength="30"
                                    placeholder="Password"
                                    name="password_bussiness"
                                    id="password_bussiness"
                                    autoComplete="Password"
                                    valid={!errors.password_bussiness}
                                    invalid={touched.password_bussiness && !!errors.password_bussiness}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password_bussiness} 
                                    />
                                    <FormFeedback>{errors.password_bussiness}</FormFeedback>
                                  </FormGroup>
                                  </div>
                                  { this.state.response?null:this.state.loader ?
                                    <div className="main-loader">
                                    <Loader type="Watch" color="black" height="50" width="60"/>
                                    </div>:<div style={{height: "15%"}} className="d-flex  flex-row justify-content-center w-100"><Input className="w-75 submit" disabled={isSubmitting || !isValid} type="submit"  value="GET STARTED"/></div>}
                                  {this.state.loader ?null :this.state.response ?                       
                                  <div className="text-center loader-text" style={{color:this.state.color,fontSize:"95%"}}>
                                    {this.state.headertext}
                                  </div>:null}
                                  
                                </Form>
                                    )}/>
                                </TabPane>
                                <TabPane className="h-100"  tabId="2">
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
                                <Form className="h-100 d-flex flex-column justify-content-around" onSubmit={this.handleSubmit.bind(this,values)}>
                                  <div className="d-flex w-100 flex-row justify-content-center firstname">
                                  <FormGroup className="w-75">
                                  <Input  
                                    type="text"
                                    maxLength="30"
                                    placeholder="Full Name"
                                    name="fullname"
                                    id="fullname"
                                    autoComplete="Full Name"
                                    valid={!errors.fullname}
                                    invalid={touched.fullname && !!errors.fullname}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fullname} 
                                    />
                                    <FormFeedback>{errors.fullname}</FormFeedback>
                                  </FormGroup>                      
                                  </div>
                                  <div className="d-flex w-100 flex-row justify-content-center email">
                                  <FormGroup className="w-75">
                                  <Input  
                                    type="email"
                                    maxLength="30"
                                    placeholder="Email"
                                    name="email_individual"
                                    id="email_individual"
                                    autoComplete="email"
                                    valid={!errors.email_individual}
                                    invalid={touched.email_individual && !!errors.email_individual}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email_individual} 
                                    />
                                    <FormFeedback>{errors.email_individual}</FormFeedback>
                                  </FormGroup>                      
                                  </div>
                                  <div className="d-flex w-100 flex-row justify-content-center password">
                                  <FormGroup className="w-75">
                                  <Input  
                                    type="password"
                                    maxLength="30"
                                    placeholder="Password"
                                    name="password_individual"
                                    id="password_individual"
                                    autoComplete="password_individual"
                                    valid={!errors.password_individual}
                                    invalid={touched.password_individual && !!errors.password_individual}
                                    required
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password_individual} 
                                    />
                                    <FormFeedback>{errors.password_individual}</FormFeedback>
                                  </FormGroup>
                                  </div>
                                  { this.state.response?null:this.state.loader ?
                                  <div className="main-loader">
                                  <Loader type="Watch" color="black" height="50" width="60"/>
                                  </div>:<div  style={{height: "15%"}} className="d-flex flex-row justify-content-center w-100"><Input className="w-75 submit" disabled={isSubmitting || !isValid} type="submit"  value="GET STARTED"/></div>}
                                {this.state.loader ?null :this.state.response ?                       
                                <div className="text-center loader-text" style={{color:this.state.color,fontSize:"95%"}}>
                                  {this.state.headertext}
                                </div>:null}
                                </Form>
                                )} />   
                                </TabPane>
                              </TabContent>
              
                      </Col>
                      <Col xs="12" sm="12" md="12" className="h-10">
                      <div className="footer-1">
                                  Already have an account? <a onClick={()=>this.redirect("/login")}>Sign in</a>
                                </div>
                                <div className="d-flex flex-row w-100 justify-content-center">
                                  <div className="divider w-75"/>
                                </div>
                                <div className="footer-2">
                                  <a>Terms of Use </a>and<a> Privacy Policy.</a>
                                </div>
                      </Col> 
                      </Row>
                    </div>            
              </Card>                 
              </Col>
      </Row>
      </Col>
      </Row>
      </Container>
    );
  }
}

export default connect(store => {
  return {
    state: store.action.registration_auth_state,
    error: store.action.registration_auth_error,
 
  };
})(withRouter(Register));