import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  render() {

    return (
      <div className="dashboard-header">
        <div className="dashboard-header-text">
        <p>Choose a loan product</p>
        </div>
        <div className="dashboard-illustration-text">
        <p>Your everyday tasks feel light. More time with borrowing clients, less time with paper and spreadsheets.</p>
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
