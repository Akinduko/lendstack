import React from 'react';

import DefaultLayout from './containers/DefaultLayout';


const Reports = React.lazy(() => import('./views/Reports'));
const Transactions = React.lazy(() => import('./views/Transactions'));
const EditProducts = React.lazy(() => import('./views/Products/EditProducts'));
const Products = React.lazy(() => import('./views/Products'));
const ApproveLoan = React.lazy(() => import('./views/Loans/ApproveLoan'));
const DeclineLoan = React.lazy(() => import('./views/Loans/DeclineLoan'));
const AddGuarantors = React.lazy(() => import('./views/Loans/AddGuarantors'));
const Settings = React.lazy(() => import('./views/Settings'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const ActivityLog = React.lazy(() => import('./views/Settings/ActivityLog'));
const BankAccount = React.lazy(() => import('./views/Settings/BankAccount'));
const Profile = React.lazy(() => import('./views/Settings/Profile/'));
const UserManagement = React.lazy(() => import('./views/Settings/UserManagement/'));
const BusinessDetails = React.lazy(() => import('./views/Settings/BusinessDetails/'));
const Loans = React.lazy(() => import('./views/Loans/Loans/'));
const Approval = React.lazy(() => import('./views/Loans/Approval/'));
const Schedule = React.lazy(() => import('./views/Loans/Schedule/'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  {path: '/', exact: true, name: 'Home', component: DefaultLayout},
  {path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
  {path: '/settings/activity-log',exact: true, name: 'ActivityLog', component: ActivityLog},
  {path: '/settings/bank-account',exact: true, name: 'BankAccount', component: BankAccount},
  {path: '/settings/profile',exact: true, name: 'Profile', component: Profile},
  {path: '/settings/user-management',exact: true, name: 'UserManagement', component: UserManagement},
  {path: '/settings/lender-details',exact: true, name: 'BusinessDetails', component: BusinessDetails},
  {path: '/products',exact: true, name: 'Products', component: Products},
  {path: '/loans/all',exact: true, name: 'Loans', component: Loans},
  {path: '/add-guarantor',exact: true, name: 'AddGuarantors', component: AddGuarantors},
  {path: '/decline-loan',exact: true, name: 'DeclineLoan', component: DeclineLoan},
  {path: '/approve-loan',exact: true, name: 'ApproveLoan', component: ApproveLoan},
  {path: '/edit-product',exact: true, name: 'EditProducts', component: EditProducts},
  {path: '/transactions',exact: true, name: 'Transactions', component: Transactions},
  {path: '/reports',exact: true, name: 'Reports', component: Reports},
  {path: '/loans/pending',exact: true, name: 'Approval', component: Approval},
  {path: '/loans/schedule',exact: true, name: 'Schedule', component: Schedule}
];

export default routes;
