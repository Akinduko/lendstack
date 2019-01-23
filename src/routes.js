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

const Settings = Loadable({
  loader: () => import('./views/Settings'),
  loading: Loading,
});

const Loans = Loadable({
  loader: () => import('./views/Loans'),
  loading: Loading,
});

const AddGuarantors = Loadable({
  loader: () => import('./views/Loans/AddGuarantors'),
  loading: Loading,
});

const DeclineLoan = Loadable({
  loader: () => import('./views/Loans/DeclineLoan'),
  loading: Loading,
});
const ApproveLoan= Loadable({
  loader: () => import('./views/Loans/ApproveLoan'),
  loading: Loading,
});

const Products = Loadable({
  loader: () => import('./views/Products'),
  loading: Loading,
});

const EditProducts = Loadable({
  loader: () => import('./views/Products/EditProducts'),
  loading: Loading,
});

const Transactions = Loadable({
  loader: () => import('./views/Transactions'),
  loading: Loading,
});



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  {path: '/', exact: true, name: 'Home', component: DefaultLayout},
  {path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
  {path: '/settings',exact: true, name: 'Settings', component: Settings},
  {path: '/products',exact: true, name: 'Products', component: Products},
  {path: '/loans',exact: true, name: 'Loans', component: Loans},
  {path: '/add-guarantor',exact: true, name: 'AddGuarantors', component: AddGuarantors},
  {path: '/decline-loan',exact: true, name: 'DeclineLoan', component: DeclineLoan},
  {path: '/approve-loan',exact: true, name: 'ApproveLoan', component: ApproveLoan},
  {path: '/edit-product',exact: true, name: 'EditProducts', component: EditProducts},
  {path: '/transactions',exact: true, name: 'Transactions', component: Transactions}
];

export default routes;
