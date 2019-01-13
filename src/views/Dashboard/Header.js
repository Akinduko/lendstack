import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  render() {

    return (
      <div className="dashboard-header">
        <div className="dashboard-header-text">
        <p>Hi, {this.props.auth && this.props.auth.user_name?this.props.auth.user_name.split(' ')[0]:""} - Welcome to Lendstack!</p>
        </div>
        <div className="dashboard-illustration-text">
        <p>Your everyday tasks feel light. More time with borrowing clients, less time with paper and spreadsheets. Your Borrowers can even connect and request loans from you online</p>
        </div>
       </div>
    );
  }
}

export default connect(store => {
  return {
    state: store.login.state,
    error: store.login.error,
    auth: store.action.user
  };
})(withRouter(Header));
