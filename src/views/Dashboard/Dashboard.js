import React, { Component } from 'react';
import { Card, 
  CardBody, 
  CardFooter,
  Input
      } from 'reactstrap';
import Header from './Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions } from '../../state/actions';
import { get_action} from  '../../controllers/requests';
import { Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';



class Dashboard extends Component {


  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      activeTab: '1',
      data:this.props.chart_data?Array.from(this.props.chart_data, x => x.total_loans): []
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

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  renderPage(){
    if(this.props.auth.token){
      return (<div>
        <Header/>
             <div className="dashboard-card-container">
             <Card className="card-1" >
             <div className="card-header"/>
             <div className="card-image">
             <img src={require('../../assets/img/brand/card-icon-1.svg')}/>
             </div>
                 <a>Complete your profile</a>
                 <p>Your everyday tasks feel light. More time with Borrowers.</p>
               <CardFooter className="card-footer">
               <a>COMPLETE PROFILE</a>
               <img src={require('../../assets/Icons/Arrow.svg')}/>
                 </CardFooter>
             </Card>
 
             <Card className="card-2" >
             <div className="card-header"/>
               <CardBody>
               <div className="card-image">
               <img src={require('../../assets/img/brand/card-icon-2.svg')}/>
               </div>
                 <a>Create loan product</a>
                 <p>Your everyday tasks feel light. More time with Borrowers.</p>
               </CardBody>
               <CardFooter className="card-footer">
               <a>CREATE LOAN PRODUCT</a>
               <img src={require('../../assets/Icons/Arrow.svg')}/>
                 </CardFooter>
             </Card>
 
             <Card className="card-3">
             <div className="card-header"/>
               <CardBody>
               <div className="card-image">
               <img src={require('../../assets/img/brand/card-icon-3.svg')}/>
                </div>
                 <a>Start lending</a>
                 <p>Your everyday tasks feel light. More time with Borrowers.</p>
               </CardBody>
               <CardFooter className="card-footer">
               <a>START LENDING</a>
               <img src={require('../../assets/Icons/Arrow.svg')}/>
                 </CardFooter>
             </Card>
             </div>     
     </div>)
    }
    return this.props.history.push('/login')
  }
  addNewLoan(){
    this.props.history.push("/loans")
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
      <div className="w-100  d-flex  h-100 flex-column">
      <div className="dashboard-header w-100 d-flex  h-50 flex-column justify-content-around">
    
        <div className="dashboard-return-header-text d-flex flex-row h-10 justify-content-between w-100">
        <p>Hi, {this.props.auth && this.props.auth.user_name?this.props.auth.user_name.split(' ')[0]:""} - Welcome to your Dashboard</p>
        <div className="add-new-loan">
        <Input  className="submit-button h-100" onClick={()=>{this.addNewLoan()}} type="submit" value="ADD A NEW LOAN"/>
        </div>
        </div>
        <div className="dashboard-return-illustration-text d-flex flex-row ml-5 w-50">
        <p>Your everyday tasks feel light. More time with borrowing clients, less time with paper and spreadsheets. Your Borrowers can even connect and request loans from you online</p>
        </div>
      </div>
      <div className="w-100 d-flex views  h-50 flex-row justify-content-around">
      <div className=" d-flex  h-100 card card-1 flex-column justify-content-around">
      <div className=" d-flex  h-10 w-100 flex-row justify-content-around">
      <div className=" d-flex  h-100 counts flex-column justify-content-start">
      <a className="txt-1">₦ {this.props.lender_dashboard?this.props.lender_dashboard.total_approved_loan_amount:""}</a>
      <a className="txt-2">Total Loan Amount</a>
      </div>
     
      <div className=" d-flex  h-100 counts flex-column justify-content-start">
      <a className="txt-1">{this.props.lender_dashboard&& this.props.lender_dashboard.total_registered_borrowers?this.props.lender_dashboard.total_registered_borrowers:0}</a>
      <a className="txt-2">Total Registered Borrowers</a>
      </div>
     </div>
      <div className="chart-wrapper">
                <Bar data={bar} options={options} />
      </div>
      </div>
      <div className="d-flex h-50 card card-2 flex-column justify-content-around">
      <div className=" d-flex  ml-5 h-40 w-100 flex-column justify-content-start">
      <a className="txt-1">₦ 0</a>
      <a className="txt-2">Amount due this month</a>
      </div>
      <div className=" d-flex ml-5  h-40 w-100 flex-column justify-content-start">
      <a className="txt-1">₦ 0</a>
      <a className="txt-2">Amount past due</a>
      </div>
      </div>
      </div>
      </div>
    )
  }

  render() {
    return (
      <div className="dashboard-body">
        {this.props.new?this.renderPage():this.renderExisting()}
      </div>
    );
  }
}

export default connect(store => {
  return {
    state: store.login.state,
    error: store.login.error,
    auth: store.token.auth,
    lender_dashboard:store.action.lender_dashboard,
    lender_dashboard_state:store.action.lender_dashboard_state,
    profile:store.action.user,
    chart_data:store.action.lender_dashboard?store.action.lender_dashboard.loansByMonth:[]
  };
})(withRouter(Dashboard));
