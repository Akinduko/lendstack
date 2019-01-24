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
      <div className="mt-5 schedule-page">
      <div className="d-flex flex-row justify-content-between w-100"> 
      <div className="ml-5 w-100 mt-5 side-header">Loans Schedule</div>
      </div>
      <div className="mt-5 transactions-table-container">
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
