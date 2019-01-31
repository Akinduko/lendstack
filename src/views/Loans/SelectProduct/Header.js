import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  render() {

    return (
             <div className="dashboard-header w-100 h-100">
             <div className="justify-content-end d-flex flex-column h-25 w-100 text-center dashboard-header-text">
             <p className="w-100 h-50">Choose a loan product</p>
             </div>
             <div className="justify-content-end d-flex flex-column h-25 w-100 text-center dashboard-illustration-text">
             <p className="h-50">Your everyday tasks feel light. More time with borrowing clients, less time with paper and spreadsheets. Your Borrowers can even connect and request loans from you online</p>
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
