import React, { Component } from 'react';
import DataArtistList from './DataArtistList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class Schedule extends Component {

  constructor(props) {

    super(props);
  }

 
  render() {
    return (
      <div className="schedule-page">
      <div className="add-loan-button"></div>
      <div className="transactions-table-container">
      <DataArtistList/>
      </div>
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
})(withRouter(Schedule));
