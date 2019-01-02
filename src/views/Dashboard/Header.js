import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Header extends Component {
  render() {

    return (
      <div className="dashboard-header">
        <div className="dashboard-header-text">
        <p>Hi, Jubril - Welcome to Lendstack!</p>
        </div>
        <div className="dashboard-illustration-text">
        <p>Your everyday tasks feel light. More time with borrowing clients, less time with paper and spreadsheets. Your Borrowers can even connect and request loans from you online</p>
        </div>
       </div>
    );
  }
}

export default Header;
