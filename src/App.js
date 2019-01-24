import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.scss';

// // Styles
// // CoreUI Icons Set
// import '@coreui/icons/css/coreui-icons.min.css';
// // Import Flag Icons Set
// import 'flag-icon-css/css/flag-icon.min.css';
// // Import Font Awesome Icons Set
// import 'font-awesome/css/font-awesome.min.css';
// // Import Simple Line Icons Set
// import 'simple-line-icons/css/simple-line-icons.css';
// // Import Main styles for this application
// import './scss/style.css'

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const RequestAccess = Loadable({
  loader: () => import('./views/Pages/RequestAccess'),
  loading
});

const ValidateAccess = Loadable({
  loader: () => import('./views/Pages/ValidateAccess'),
  loading
});

const Success = Loadable({
  loader: () => import('./views/Pages/Success'),
  loading
});


class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/success" name="Success Page" component={Success} />
          <Route  exact path="/reset" name="Reset Password" component={RequestAccess} />
          <Route  path="/validate/:id" name="Validate Page" component={ValidateAccess} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
