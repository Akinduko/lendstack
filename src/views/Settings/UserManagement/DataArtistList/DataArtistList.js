import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
Input,
Modal
        } from 'reactstrap';
import data from './_data';
import { AppSwitch } from '@coreui/react'

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
            editusermodal: false

          };

    }

     editFormater = (cell, row) => {
        return <div className="edit" onClick={()=>this.toggleModal("editusermodal")}>Edit</div>
      };

      toggleFormater = (cell, row) => {
        return <div className="toggle"><a>active</a><AppSwitch className={'mx-1'} color={'success'} checked /></div>
      };

      profileFormater = (cell, row) => {
        return <div className="profile"><p>Adekeye Temilade</p><a>Loan Officer</a></div>
      };

      emailFormater = (cell, row) => {
        return <div className="email"><a>gbenga@lendstack.ng</a></div>
      };
      numberFormater = (cell, row) => {
        return <div className="number"><a>08032823104</a></div>
      };
      toggleModal(name){
          const action ={}
          action[name]=!this.state[name]
          this.setState(action)
      }
    render() {

        return (
                <div className="full-user-list">
                <Modal isOpen={this.state.editusermodal} className="edit-user-modal">
                    <div className="sub-container">
                    <div className="header"><p>Edit user details</p> <i onClick={()=>this.toggleModal("editusermodal")} className="fa fa-close"></i></div>
                    <div className="divider"/>
                    <div className="first-name"><a>First Name</a><Input/></div>
                    <div className="last-name"><a>Last Name</a><Input/></div>
                    <div className="role"><a>Role</a><Input/></div>
                    <div className="email"><a>Email</a><Input/></div>
                    <div className="phone-number"><a>Phone Number</a><Input/></div>
                    <div className="submit"><button>SAVE CHANGES</button></div>
                    </div>
                </Modal>

                    <div className="table-header">
                    <div className="inputs">
                    <div className="role"><a>Role</a><Input/></div> <div className="status"><a>Status</a><Input/></div>
                    </div>
                    <div className="actions">
                    <div className="space-evenly">
                    <div className="filter"><img src={require('../../../../assets/img/brand/filter-icon.svg')}/><a>Filter</a></div>
                    <div className="sort"><img src={require('../../../../assets/img/brand/sort-icon.svg')}/><a>Sort</a></div>
                    <div className="search"><img src={require('../../../../assets/img/brand/search-icon.svg')}/><a>Search</a></div>                       
                    </div>
                    <div className="clear-filter"><a>CLEAR FILTER</a></div>
                    </div>
                    </div>
                    <BootstrapTable data={ this.table } pagination version="4" bordered={false}   hover={true} role="grid"
                                    options={this.options}>
                        <TableHeaderColumn  dataField="artist-img" width="25%" dataFormat={this.profileFormater}></TableHeaderColumn>
                        <TableHeaderColumn dataField="age" isKey  width="25%" dataFormat={this.emailFormater}></TableHeaderColumn>
                        <TableHeaderColumn dataField="age"  width="20%" dataFormat={this.numberFormater}></TableHeaderColumn>
                        <TableHeaderColumn dataField="age"  width="15%" dataFormat={this.toggleFormater}></TableHeaderColumn>
                        <TableHeaderColumn  dataField="age"  width="15%" dataFormat={this.editFormater} ></TableHeaderColumn>
                    </BootstrapTable>
                </div>
        );
    }
}

export default DataArtistList;
