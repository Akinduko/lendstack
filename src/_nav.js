export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'Loans',

      children: [
        {
          name: 'Loans',
          url: '/loans/all',
          icon: 'icon-note'
        },
        {
          name: 'Pending Loans',
          url: '/loans/pending',
          icon: 'icon-note'
        },
        {
          name: 'Loan Schedule',
          url: '/loans/schedule',
          icon: 'icon-note',
        }
      ]
    },
    {
      name: 'Transactions',
      url: '/transactions',
      icon: 'glyphicon glyphicon-retweet'
    },
    {
      name: 'Products',
      url: '/products'
    },
    {
      name: 'Reports',
      url: '/reports'
    },
    {
      name: 'Settings',

      children: [
        {
          name: 'Profile',
          url: '/settings/profile',
          icon: 'icon-note'
        },
        {
          name: 'Lender Details',
          url: '/settings/lender-details',
          icon: 'icon-note'
        },
        {
          name: 'Bank Account',
          url: '/settings/bank-account',
          icon: 'icon-note',
        },
        {
          name: 'User Management',
          url: '/settings/user-management',
          icon: 'icon-note'
        }
      ]
    },
    {
      name: 'Log Out',
      url: '/login',
      icon: 'icon-logout'
    }
  ]
};
