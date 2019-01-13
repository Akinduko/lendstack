import React, { Component } from 'react';
import { AppSwitch } from '@coreui/react'
import Wizard from './Wizard';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {  get_action} from  '../../../controllers/requests';
import { actions } from '../../../state/actions';


class Accounts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addaccount: false,
      banks:[],
      all_banks:[]
    };
  }

  toggle(name){
    const action ={}
    action[name]=!this.state[name]
    this.setState(action)
}


    async componentDidMount(){

      try{
      await this.props.dispatch(actions("GET_USER_BANKS",get_action(this.props.auth.token,"users/me/bank_accounts","")))
      switch(this.props.user_banks_state){
        case "success":
        const _profile = this.props.user_banks
        this.setState({
          banks: _profile,
        })
        break
      }
    }
    catch(error){
      console.log("error")
    }
    try{
      await this.props.dispatch(actions("GET_ALL_BANKS",get_action(this.props.auth.token,"codes/fetch/bank","")))
      switch(this.props.all_banks_state){
        case "success":
        const profile = this.props.all_banks
        this.setState({
          all_banks: profile,
        })
        break
      }
    }
    catch(error){
      console.log("error")
    }
  }
  renderCards(){
    const banks = this.state.banks
    const body =[]
    for(let each of banks ){
      body.push(<div className="account-card">
                    <div className="card-container">
                    <div className="section-1">
                    <div className="bank-name">
                    <a>Bank</a>
                    <p>GTBank</p>
                    </div>
                    <div className="bank-logo">
                    <img src={each.avatar}  alt="" />
                    </div>
                    </div>
                    <div className="section-2"> 
                    <div className="bank-number">
                    <a>Account Number</a>
                    <p>0123456789</p>
                    </div>
                    <div className="bank-bvn">
                    <a>BVN</a>
                    <p>0123456789</p>
                    </div>
                    </div>
                    <div className="divider"/>
                    <div className="business-name">
                    <a>Pay Finance Limited</a>
                    </div>
                    </div>
                      <div className="card-footer">
                    <div className="currency">
                     <p>₦</p>
                    <a>Naira</a>
                    </div>
                    <div className="toggle"><a>active</a><AppSwitch className={'mx-1'} color={'success'} checked /></div>
                    </div>
                    </div>)
    }
    return body
  }
renderPage(){
  const Landing=()=>{

return (
  <div className="account-cards">
  {this.renderCards()}
  </div>
)
  
}

  if(this.state.addaccount){
    return <Wizard/>
  }
  return <Landing/>
}
  render() {
    return (
      <div className="bank-account-page">
      <div className="add-account"><button onClick={()=>this.toggle("addaccount")} >ADD BANK ACCOUNT</button></div>
      <div className="account-content">
        {this.renderPage()}
      </div>
      </div>
    );
  }
}

export default connect(store => {
  return {
    user_banks_state: store.action.user_banks_state,
    auth: store.token.auth,
    user_banks: store.action.user_banks?store.action.user_banks.bankAccounts:""
  };
})(withRouter(Accounts));
