import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const Register = Loadable({
  loader: () => import('./views/Register'),
  loading: Loading,
});

const Designs = Loadable({
  loader: () => import('./views/Designs'),
  loading: Loading,
});

const Profile = Loadable({
  loader: () => import('./views/Profile'),
  loading: Loading,
});

const Frontend = Loadable({
  loader: () => import('./views/Frontend'),
  loading: Loading,
});

const Devops = Loadable({
  loader: () => import('./views/Devops'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import('./views/Login'),
  loading: Loading,
});


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  {path: '/', exact: true, name: 'Home', component: DefaultLayout},
  {path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
  {path: '/login', exact: true, name: 'Login', component: Login},
  {path: '/register', exact: true, name: 'Register', component: Register},
  {path: '/front', exact: true, name: 'Frontend', component: Frontend},
  {path: '/profile',exact: true,  name: 'Profile', component: Profile},
  {path: '/devops',exact: true, name: 'Devops', component: Devops},
  {path: '/designs',exact: true, name: 'Designs', component: Designs}

];

export default routes;
