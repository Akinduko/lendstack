import React, { Component } from 'react';
import { CardFooter, FormGroup,Badge,Table,FormFeedback,Card, Modal, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Header from './Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions } from '../../state/actions';
import { get_action} from  '../../controllers/requests';
import { Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import * as Yup from 'yup'
import { Formik } from 'formik';
import Loader from 'react-loader-spinner'
import { post_action } from  '../../controllers/requests';



const initialValues = {

}



class Dashboard extends Component {


  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      activeTab: '1',
      data:this.props.chart_data?Array.from(this.props.chart_data, x => x.total_loans): [],
      inviteborrower:false,
      count:1,
      result:false
    };
    this.toggle = this.toggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
  }

async componentDidMount(){
    const profile= this.props.profile;
    const id = profile.lenders?profile.lenders[0].id:""
    await this.props.dispatch(actions("GET_LENDER_DASHBOARD",get_action(this.props.auth.token,`lenders/${id}/dashboard`,"")))
    switch(this.props.lender_dashboard_state){
      case "success":
      // const data=[]
      // console.log(this.props.chart_data)
      // for(let each of this.props.chart_data){
      //   data.push[each.total_loans]
      // }
      // this.setState({data})
      break
    }
}
async componentWillUnmount(){
  this.closeNewUser()
}

validationSchema = function (values) {
  let i=0;
  const len = this.state.count;
  const body ={};
   for(i; i<len;i++){
    body[`email_${i}`]=Yup.string().email('That email is strange. Please check it again.\n')
    .required('Hey, we need your email.')
   }
  return Yup.object().shape(body)
}

 validate = (getValidationSchema) => {
  return (values) => {
    
    const validationSchema = getValidationSchema(values)

    try {
      validationSchema.validateSync(values, { abortEarly: false })
      return {}
    } catch (error) {
      return this.getErrorsFromValidationError(error)
    }
  }
}

 getErrorsFromValidationError = (validationError) => {
  const FIRST_ERROR = 0
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }
  }, {})
}


 onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2))
    // console.log('User has been successfully saved!', values)
    setSubmitting(false)
  }, 2000)
}
async handleSubmit(value,event){
  event.preventDefault()

   const _body=[]
   for(let each in value){
    _body.push(value[each])
   }

  const body =   {
    "emails":_body
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
    const profile= this.props.profile;
    const id = profile.lenders?profile.lenders[0].id:""
    await this.props.dispatch(actions("INVITE_LENDER_BORROWERS",post_action(this.props.auth.token,body,`lenders/${id}/borrowers`,"")))
    switch(this.props.state){
      case "success":
      this.setState({
         result: true,
         loader: false,
         response: true,
         headertext: ""
      });
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
    pre_action()
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

 
 findFirstError (formName, hasError) {
  const form = document.forms[formName]
  for (let i = 0; i < form.length; i++) {
    if (hasError(form[i].name)) {
      form[i].focus()
      break
    }
  }
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


  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  closeNewUser(){
    this.props.dispatch(actions("NEW_USER_STATE_FULFILLED",{state:false}))
  }
  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  renderPage(){
    if(this.props.auth.token){
      return (<div className="w-100 h-100 d-flex flex-column">
      <Row className="h-100">
        <Col className="h-50" md="12">
        <Header/>
        </Col>
        <Col className="h-50" md="12">
        <div className="d-flex flex-row justify-content-around w-100 h-100 dashboard-card-container">
      <Row>
          <Col className="h-100"  xs="12" md="4">
                <Card className="w-100 justify-content-between h-75 card-custom" >
                  <div className="card-header"/>
                  <div className="w-100 flex-row d-flex justify-content-center">
                    <div className="w-25 h-100 flex-row d-flex justify-content-center card-image">
                    <img src={require('../../assets/img/brand/card-icon-1.svg')}/>
                    </div>
                    </div>
                      <a>Complete your profile</a>
                      <p>Your everyday tasks feel light. More time with Borrowers.</p>
                    <CardFooter onClick={()=>this.handleLink('/settings/profile')} className="d-flex w-100 flex-row justify-content-between card-footer">
                    <a>COMPLETE PROFILE</a>
                    <img src={require('../../assets/Icons/Arrow.svg')}/>
                      </CardFooter>
                </Card>
          </Col>
          <Col className="h-100"  xs="12" md="4">
                <Card className="w-100 justify-content-between h-75 card-custom" >
                <div className="card-header"/>
                <div className="w-100 flex-row d-flex justify-content-center">
                <div className="w-25 h-100 flex-row d-flex justify-content-center card-image">
                <img src={require('../../assets/img/brand/card-icon-2.svg')}/>
                </div>
                </div>
                  <a>Create loan product</a>
                  <p>Your everyday tasks feel light. More time with Borrowers.</p>
                <CardFooter onClick={()=>this.handleLink('/products')} className="d-flex w-100 flex-row justify-content-between card-footer">
                <a>CREATE LOAN PRODUCT</a>
                <img src={require('../../assets/Icons/Arrow.svg')}/>
                  </CardFooter>
              </Card>
          </Col>
          <Col className="h-100" xs="12" md="4">
              <Card className="w-100 justify-content-between h-75 card-custom">
                <div className="card-header"/>
                  <div className="w-100 flex-row d-flex justify-content-center">
                  <div className="w-25 h-100 flex-row d-flex justify-content-center card-image">
                  <img src={require('../../assets/img/brand/card-icon-3.svg')}/>
                  </div>
                  </div>
                    <a>Start lending</a>
                    <p>Your everyday tasks feel light. More time with Borrowers.</p>
                  <CardFooter  onClick={()=>this.closeNewUser()} className="d-flex w-100 flex-row justify-content-between card-footer">
                    <a>START LENDING</a>
                    <img src={require('../../assets/Icons/Arrow.svg')}/>
                  </CardFooter>
              </Card>
          </Col>
  </Row>
      </div>     
      </Col>
     </Row>
     </div>)
    }
    return this.props.history.push('/login')
  }
  handleInvite(value){
    if(value !== this.state.inviteborrower){
      this.setState({
        inviteborrower:!this.state.inviteborrower,
        response: false,
        loader:false,
        headertext: "",
        count:1
      })
    }
  }
  handleLink(value){
    this.props.history.push(value) 
  }

  incrementField(){
    if(this.state.count<10){
      this.setState({
        count: this.state.count+1
      })
    }

  }
  decrementtField(){
    this.setState({
      count: this.state.count-1
    })  
  }

  renderMailForms(errors,touched,handleChange,handleBlur,values){
    let i=0;
    const len = this.state.count;
    const body =[];
    if(len==1){
      initialValues[`email_${i}`]=""
      return <Col key ={i} className="h-25" xs="12">
      <FormGroup className="h-100">
        <InputGroup className="p-3 mb-3 h-100">
        <Input  type="email" maxLength="30" className="h-100" placeholder="Email" name={`email_${i}`}
                    id={`email_${i}`} autoComplete="email" valid={!errors[`email_${i}`]} invalid={touched[`email_${i}`]&& !!errors[`email_${i}`]}
                    required onChange={handleChange} onBlur={handleBlur} value={values[`email_${i}`]}/>
          <InputGroupAddon className="button-color" addonType="append">
            <InputGroupText>
              <i onClick={()=>this.incrementField()} className="icon-plus"></i>
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <FormFeedback>{errors[`email_${i}`]}</FormFeedback>
      </FormGroup>   
    </Col>
    }
      for(i; i<len; i++){
        if(i===len-1){
            initialValues[`email_${i}`]=""
            body.push(<Col key ={i} className="h-25" xs="12">
            <FormGroup className="h-100">
              <InputGroup className="p-3 mb-3 h-100">
                <Input  type="email" maxLength="30" className="h-100" placeholder="Email" name={`email_${i}`}
                    id={`email_${i}`} autoComplete="email" valid={!errors[`email_${i}`]} invalid={touched[`email_${i}`]&& !!errors[`email_${i}`]}
                    required onChange={handleChange} onBlur={handleBlur} value={values[`email_${i}`]}/>
                <InputGroupAddon className="button-color" addonType="append">
                  <InputGroupText>
                    <i onClick={()=>this.decrementtField()} className="icon-minus"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupAddon className="button-color" addonType="append">
                  <InputGroupText>
                    <i onClick={()=>this.incrementField()} className="icon-plus"></i>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FormFeedback>{errors[`email_${i}`]}</FormFeedback>
            </FormGroup>   
          </Col>)
     }
     else{
      initialValues[`email_${i}`]=""
      body.push(<Col key ={i} className="h-25" xs="12">
      <FormGroup className="h-100">
        <InputGroup className="p-3 mb-3 h-100">
        <Input  type="email" maxLength="30" className="h-100" placeholder="Email" name={`email_${i}`}
                    id={`email_${i}`} autoComplete="email" valid={!errors[`email_${i}`]} invalid={touched[`email_${i}`]&& !!errors[`email_${i}`]}
                    required onChange={handleChange} onBlur={handleBlur} value={values[`email_${i}`]}/>
        </InputGroup>
        <FormFeedback>{errors[`email_${i}`]}</FormFeedback>
      </FormGroup>   
    </Col>)
     }
    }
    return body 
    }
  
  renderResult(){
      const result = this.props.invite_borrower&&this.props.invite_borrower.response?this.props.invite_borrower.response:[]
      const body =[]
      for (let each of result){
         body.push(<tr>
          <td>
            <div className="small text-muted">{each.email}</div>
          </td>
          <td>
          {each.status?<Badge className="mr-1" color="success">Success</Badge>:<Badge className="mr-1" color="danger">Failed</Badge>}
          </td>
          <td>
            <div className="small text-muted">{each.message}</div>
          </td>
        </tr>)
      }
      return <div className="d-flex flex-row justify-content-center w-100">
      <Table hover responsive className=" w-75 table-outline mb-0 d-none d-sm-table">
      <thead className="thead-light">
      <tr>
        <th className="text-center">Email</th>
        <th className="text-center">Status</th>
        <th className="text-center">Details</th>
      </tr>
      </thead>
      <tbody>
      {body}
      </tbody>
    </Table>
        </div>
    }
  renderExisting(){ 
    const data=this.state.data
    const bar = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',"August","September","October","November","December"],
      datasets: [
        {
          label: 'Loan reports over the last 12 months',
          backgroundColor: 'rgba(33, 63, 125, 1)',
          borderColor: 'rgba(216, 216, 216, 0.35)',
          labelColor: 'rgba(84, 95, 125,0.35)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(33, 63, 125, 0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data,
        },
      ],
    };
    
    const options = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false
    }

    return (
      
      <Row className="w-100 h-auto">
      <Modal isOpen={this.state.inviteborrower} toggle={()=>this.handleInvite(false)} className="invite-borrower">
        <Row className="ml-0 h-100 w-100 row">
          <Col style={{height: "10%"}} md="12">         
            <div className="modal-head">
              <a>INVITE BORROWER</a>
              <i onClick={()=>this.handleInvite(false)} className="fa fa-close"></i>
            </div>
          </Col>
          <Col style={{height: "90%"}} md="12">
          <Formik
              initialValues={initialValues}
              validate={this.validate(this.validationSchema)}
              onSubmit={this.onSubmit}
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
          <Form className="h-100" onSubmit={this.handleSubmit.bind(this,values)}>
          <Row className="h-25">
                  {this.state.result?this.renderResult():this.renderMailForms(errors,touched,handleChange,handleBlur,values)}
          <Col className="h-25" xs="12">
                        {this.state.loader ? null :this.state.response ?                       
                  <div className="text-center login-loader-text" style={{color:this.state.color,fontSize:"95%"}}>
                    {this.state.headertext}
                  </div>:null}     
          { this.state.response?null:this.state.loader ?
                    <div className="d-flex flex-row w-100 justify-content-center">
                    <Loader type="Watch" color="black" height="50" width="60"/>
                    </div>:<div className="d-flex flex-row justify-content-center h-75 w-100"><Input disabled={isSubmitting || !isValid} type="submit" color="primary" className="px-4 h-100 w-50 button-color" value="INVITE"/></div>}
                        </Col>
                      </Row>
                    </Form>
                    )} /> 
          </Col>
        </Row>
      </Modal>
      <Col xs="12" sm="12" md="12"  className="h-50">
      <div  className="h-100 w-100 d-flex flex-row justify-content-center">
        <Row className="dashboard-header w-100 d-flex  h-100 flex-column justify-content-around">
          <Col className="h-50">
          <div className="dashboard-return-header-text d-flex flex-row  pl-0 pr-0 h-100 justify-content-between w-100">
          <p className="h-100">Hi, {this.props.auth && this.props.auth.user_name?this.props.auth.user_name.split(' ')[0]:""} - Welcome to your Dashboard</p>
          <div className="h-25 add-new-loan">
              <Input  className="submit-button h-100" onClick={()=>{this.handleLink('/loans/all')}} type="submit" value="ADD A NEW LOAN"/>
          </div>
          <div className="h-25 add-new-loan">
              <Input  className="submit-button h-100" onClick={()=>{this.handleLink('/products')}} type="submit" value="ADD A NEW PRODUCT"/>
          </div>
          <div className="h-25  add-new-loan">
              <Input  className="submit-button h-100" onClick={()=>{this.handleInvite(true)}} type="submit" value="INVITE BORROWER"/>
          </div>
          </div>
          </Col>
          <Col className="h-50">
          <div className="dashboard-return-illustration-text d-flex flex-row w-50">
              <p>Your everyday tasks feel light. More time with borrowing clients, less time with paper and spreadsheets. Your Borrowers can even connect and request loans from you online</p>
              </div>
       
          </Col>
        </Row>
        </div>
          </Col>
      <Col xs="12" sm="12" md="12" className="h-md-50 h-75">
          <div className="w-100 d-flex views  h-100 flex-row justify-content-around">
          <Row className="w-100 h-100" >
              <Col xs="12" sm="12" md="6" className="h-50 w-100">
                <div className=" d-flex  w-100 h-100 card card-1 flex-column justify-content-around">
                <div className=" d-flex  h-25 w-100 flex-row justify-content-around">
                <div className=" d-flex  h-100 counts flex-column justify-content-start">
                <a className="txt-1">₦ {this.props.lender_dashboard?this.props.lender_dashboard.total_approved_loan_amount:""}</a>
                <a className="txt-2">Total Loan Amount</a>
                </div>   
                <div className=" d-flex  h-100 counts flex-column justify-content-start">
                <a className="txt-1">{this.props.lender_dashboard&& this.props.lender_dashboard.total_registered_borrowers?this.props.lender_dashboard.total_registered_borrowers:0}</a>
                <a className="txt-2">Total Registered Borrowers</a>
                </div>
                </div>
                <div className="h-75 chart-wrapper">
                <Bar data={bar} options={options} />
                </div>
              </div>
              </Col>
              <Col xs="12" sm="12" md="6" className="h-50 w-50">
              <div className="d-flex h-100 w-100 card card-2 flex-column justify-content-around">
                <div className=" d-flex  ml-5 h-50 w-100 flex-column justify-content-start">
                <a className="txt-1">₦ 0</a>
                <a className="txt-2">Amount due this month</a>
                </div>
                <div className=" d-flex ml-5  h-50 w-100 flex-column justify-content-start">
                <a className="txt-1">₦ 0</a>
                <a className="txt-2">Amount past due</a>
                </div>
              </div> 
              </Col>
          </Row>
          </div>
      </Col>
      </Row>
 
    )
  }

  render() {
       
    return (
      <Container className="w-100 h-100 d-flex flex-row justify-content-center dashboard-body" fluid>
        {this.props.new_user && this.props.new_user.state ?this.renderPage():this.renderExisting()}
        {/* {this.renderPage()} */}
      </Container>
    );
  }
}

export default connect(store => {
  return {
    error: store.action.invite_borrower_error,
    auth: store.token.auth,
    lender_dashboard:store.action.lender_dashboard,
    lender_dashboard_state:store.action.lender_dashboard_state,
    profile:store.action.user,
    chart_data:store.action.lender_dashboard?store.action.lender_dashboard.loansByMonth:[],
    new_user:store.action.new_user,
    new_user_state:store.action.new_user_state,
    invite_borrower:store.action.invite_borrower,
    state:store.action.invite_borrower_state
  };
})(withRouter(Dashboard));
