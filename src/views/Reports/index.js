import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions } from '../../state/actions';
import Profitability from './Profitability'

class Reports extends Component {

  constructor(props) {

    super(props);
    this.state = {
      page:"landing"
    };
  }
  handleClick=(value)=>{
    this.setState({page:value})
  }
renderPage=()=>{
  const Landing =()=>{
    return       <div className="d-flex flex-column justify-content-start p-5 w-100 h-100">
    <div className="mt-5 header-color w-100 h-10"><a>Reports</a></div>
    <div className="d-flex justify-content-around flex-row flex-wrap w-100 h-75">
    <div className="card justify-content-around h-25 w-30">
    <div className="d-flex flex-row ml-3 justify-content-start text-grey"><a>Product Profitability</a></div>
    {/*{/*<div className="d-flex flex-row ml-3 justify-content-start text-grey-mute"><a>See </a></div>*/}
    <div onClick={(()=>this.handleClick("profitability"))} className="d-flex flex-row  justify-content-around card-foot"><a>View Product Profitability</a><i className="fa fa-arrow-right"></i></div>
    </div>
    <div className="card justify-content-around h-25 w-30">
    <div className="d-flex flex-row ml-3 justify-content-start text-grey"><a>Outstanding Loans</a></div>
    {/*{/*<div className="d-flex flex-row ml-3 justify-content-start text-grey-mute"><a>See </a></div>*/}
    <div className="d-flex flex-row  justify-content-around card-foot"><a>View Outstanding Loans</a><i className="fa fa-arrow-right"></i></div>
    </div>
    <div className="card justify-content-around h-25 w-30">
    <div className="d-flex flex-row ml-3 justify-content-start text-grey"><a>Default Loans</a></div>
     {/*{/*<div className="d-flex flex-row ml-3 justify-content-start text-grey-mute"><a>See </a></div>*/}
    <div className="d-flex flex-row  justify-content-around card-foot"><a>View Default Loans</a><i className="fa fa-arrow-right"></i></div>
    </div>
    <div className="card justify-content-around h-25 w-40">
    <div className="d-flex flex-row ml-3 justify-content-start text-grey"><a>Loans Due Vs Loans Given</a></div>
    {/*{/*<div className="d-flex flex-row ml-3 justify-content-start text-grey-mute"><a>See </a></div>*/}
    <div className="d-flex flex-row  justify-content-around card-foot"><a>View Loans Due Vs Loans Given</a><i className="fa fa-arrow-right"></i></div>
    </div>
    <div className="card justify-content-around h-25 w-30">
    <div className="d-flex flex-row ml-3 justify-content-start text-grey"><a>Collections Report</a></div>
    {/*{/*<div className="d-flex flex-row ml-3 justify-content-start text-grey-mute"><a>See </a></div>*/}
    <div className="d-flex flex-row  justify-content-around card-foot"><a>View Collections Report</a><i className="fa fa-arrow-right"></i></div>
    </div>
    </div>
    </div>
  }
  const options={
    landing:<Profitability/>
  }
  return options[this.state.page]
}
  render() {
    return (  
      <div className="animated fadeIn  pl-5 pr-5 reports mt-5">
        {this.renderPage()}
      </div>
    );
  }
}


export default connect(store => {
  return {
    state: store.validate.state,
    error: store.validate.error,
    auth:store.validate.auth,
  };
})(withRouter(Reports));
