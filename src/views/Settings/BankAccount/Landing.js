import React, { Component } from 'react';
import { AppSwitch } from '@coreui/react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {  get_action} from  '../../../controllers/requests';
import { actions } from '../../../state/actions';

class Landing extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  async componentDidMount(){
    try{
      await this.props.dispatch(actions("GET_USER_BANKS",get_action(this.props.auth.token,"users/me/bank_accounts","")))
      switch(this.props.user_banks_state){
        case "success":
        const _profile = this.props.user_banks
        this.setState({
          account_number: _profile?_profile.email:"",
          bank_name:_profile?_profile.entities[0].id:"",
          user_bvn:{},
          company_name:{},
          currency_symbol:{},
          status:{}

        })
        break
      }
    }
    catch(error){
      console.log("error")
    }
  }

  render() {
    return (
        <div className="account-cards">
        <div className="account-card">
        <div className="card-container">
        <div className="section-1">
        <div className="bank-name">
        <a>Bank</a>
        <p>GTBank</p>
        </div>
        <div className="bank-logo">
        <p>₦</p>
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
        </div>
        <div className="account-card">
        <div className="card-container">
        <div className="section-1">
        <div className="bank-name">
        <a>Bank</a>
        <p>GTBank</p>
        </div>
        <div className="bank-logo">
        <img src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"  alt="akindukooa@gmail.com" />
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
        </div>
        <div className="account-card">
        <div className="card-container">
        <div className="section-1">
        <div className="bank-name">
        <a>Bank</a>
        <p>GTBank</p>
        </div>
        <div className="bank-logo">
        <img src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"  alt="akindukooa@gmail.com" />
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
        </div>
        </div>
      )
  }
}

export default connect(store => {
  return {
    user_banks_state: store.action.user_banks_state,
    auth: store.token.auth,
    user_banks: store.action.user_banks
  };
})(withRouter(Landing));
