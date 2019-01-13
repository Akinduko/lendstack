import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
    Input,
    Modal,
    Row,
    Col,
    Nav,
    NavItem, 
    NavLink,
    TabContent,
    TabPane
            } from 'reactstrap';
import classnames from 'classnames';
import Parameters from './Parameters';
import Required from "./Required";
import data from './_data';
import { AppSwitch } from '@coreui/react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class DataArtistList extends Component {
    constructor(props) {
        super(props);
        this.table = data.rows;
        this.options = {
            sortIndicator: true,
            hideSizePerPage: true,
            paginationSize: 5,
            hidePageListOnlyOnePage: true,
            clearSearch: true,
            alwaysShowAllBtns: false,
            withFirstAndLast: false
        }
        this.state = {
            viewusermodal: false,
            activeTab: '1'
          };

    }
    viewFormater = (cell, row) => {
        return <div className="edit" onClick={()=>this.toggleModal("viewusermodal")}>VIEW</div>
      };

     editFormater = (cell, row) => {
        return <div className="edit" onClick={()=>this.toggleModal("editusermodal")}>EDIT</div>
      };

      toggleFormater = (cell, row) => {
        return <div className="toggle"><a>active</a><AppSwitch className={'mx-1'} color={'success'} checked /></div>
      };

      profileFormater = (cell, row) => {
        return <div className="profile"><p>Payday Plus</p></div>
      };

      emailFormater = (cell, row) => {
        return <div className="email"><a>1 - 3 months</a></div>
      };
      numberFormater = (cell, row) => {
        return <div className="number"><a>#10,000,00-#450,000,000</a></div>
      };

      toggleModal(name){
          const action ={}
          action[name]=!this.state[name]
          this.setState(action)
      }
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab,
          });
        }
      }
      redirect(link){
        this.props.history.push(link)
      }
    
    render() {

        return (
                <div className="full-user-list">
       <Modal isOpen={this.state.viewusermodal} className="view-product-modal">
         <div className="sub-container">
         <div className="modal-head">
            <a>Product details</a>
        </div>
          <Row>
          <Col className="main-container">
            <Nav tabs>
            <div className="block-group">
            <div className="divider-top"/>
            <div className="actual-tabs">
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Parameters
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Required Fields
                </NavLink>
              </NavItem>
              </div>
              <div className="divider-bottom"/>
            </div>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Parameters/>
            </TabPane>
            <TabPane tabId="2">
               <Required/>
            </TabPane>
        </TabContent>
        </Col>
        </Row>
        <div className="modal-footer">
          <Input className="return" onClick={()=>this.toggleModal("viewusermodal")} type="submit" value="RETURN"/>
        </div>
     </div>
                </Modal>

                    <div className="table-header">
                    <div className="inputs">
                    <div className="role"><a>Role</a><Input/></div> <div className="status"><a>Status</a><Input/></div>
                    </div>
                    <div className="actions">
                    <div className="space-evenly">
                    <div className="filter"><a>Export</a></div>
                    <div className="filter"><img src={require('../../../assets/img/brand/filter-icon.svg')}/><a>Filter</a></div>
                    <div className="sort"><img src={require('../../../assets/img/brand/sort-icon.svg')}/><a>Sort</a></div>
                    <div className="search"><img src={require('../../../assets/img/brand/search-icon.svg')}/><a>Search</a></div>                       
                    </div>
                    <div className="clear-filter"><a>CLEAR FILTER</a></div>
                    </div>
                    </div>
                    <BootstrapTable data={ this.table } pagination version="4" bordered={false}   hover={true} role="grid"
                                    options={this.options}>
                        <TableHeaderColumn  dataField="artist-img" width="25%" dataFormat={this.profileFormater}>NAME</TableHeaderColumn>
                        <TableHeaderColumn dataField="age" isKey  width="25%" dataFormat={this.emailFormater}>TENOR</TableHeaderColumn>
                        <TableHeaderColumn dataField="age"  width="20%" dataFormat={this.numberFormater}>AMOUNT</TableHeaderColumn>
                        <TableHeaderColumn dataField="age"  width="15%" dataFormat={this.toggleFormater}></TableHeaderColumn>
                        <TableHeaderColumn  dataField="age"  width="15%" dataFormat={this.editFormater} ></TableHeaderColumn>
                        <TableHeaderColumn  dataField="age"  width="15%" dataFormat={this.viewFormater} ></TableHeaderColumn>
                    </BootstrapTable>
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
  })(withRouter(DataArtistList));
