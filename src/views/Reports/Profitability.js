import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  ButtonDropdown,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
  CardGroup
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get_action } from  '../../controllers/requests';
import { actions } from '../../state/actions';
const Widget03 = lazy(() => import('./Widgets/Widget03'));
const Widget04 =lazy(()=>import('./Widgets/Widget04'));
const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
  { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
  { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
  { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'New Clients',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Recurring Clients',
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'Pageviews',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Organic',
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: 'CTR',
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: 'Bounce Rate',
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        backgroundColor: 'transparent',
        borderColor: variant ? variant : '#c2cfd6',
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class Profitability extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      default_loans:[],
      loans_due_vs_loans_given:[],
      outstanding_loans:[],
      product_profitability:[]
    };
  }

  async componentDidMount(){
    const paths = [ "reports/default_loans",
                        "reports/loans_due_vs_loans_given",
                        "reports/outstanding_loans",
                        "reports/product_profitability"]
    const profile= this.props.profile;
    const id = profile.companies?profile.companies[0].id:""
    const _paths = paths.map(each=>{return get_action(this.props.token,`${each}`,`?lender_id=${id}`)})
    await this.props.dispatch(actions("GET_ALL_REPORTS",Promise.all(_paths)))
    switch(this.props.report_state){
      case "success":
      this.setState({
        default_loans:this.props.report && this.props.report[0]?this.props.report[0].report:[],
        loans_due_vs_loans_given:this.props.report && this.props.report[1]?this.props.report[1].report:{},
        outstanding_loans:this.props.report && this.props.report[2]?this.props.report[2].report:[],
        product_profitability:this.props.report && this.props.report[3]?this.props.report[3].productProfitability:[]
      })
      break;
      case "failed":

      break;
      case "pending":

      break;
      
      default:
      break;
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
renderProfitabilityTable(){
  const body =[]
  for(let each of this.state.product_profitability){
    body.push(
      <tr>
    <td className="text-center">
      <div>{each.product_name}</div>
    </td>
    <td className="text-center">
      {each.product_id}
    </td>
    <td>
      <div className="text-center">
        {each.loan_volume}
      </div>
    </td>
    <td className="text-center">
       {each.loan_count}
    </td>
    <td className="text-center">
       {each.accrued_principal}
    </td>
    <td className="text-center">
       {each.accrued_interest}
    </td>
    </tr>)
  }
  return body
}
renderDefaultLoansTable(){
  const body =[]
  for(let each of this.state.default_loans){
    body.push(
      <tr>
    <td className="text-center">
      <div>{each.borrower_name}</div>
    </td>
    <td className="text-center">
      {each.days_overdue}
    </td>
    <td>
      <div className="text-center">
        {each.loan_amount}
      </div>
    </td>
    </tr>)
  }  
  return body
}

renderOutstandingLoansTable(){
  const body =[]
  for(let each of this.state.outstanding_loans){
    body.push(
      <tr>
    <td className="text-center">
      <div>{each.borrower_name}</div>
    </td>
    <td className="text-center">
      {each.borrower_id}
    </td>
    <td>
      <div className="text-center">
        {each.loan_status}
      </div>
    </td>
    <td>
      <div className="text-center">
        {each.outstanding_principal_amount}
      </div>
    </td>
    <td>
      <div className="text-center">
        {each.outstanding_interest_amount}
      </div>
    </td>
    </tr>)
  }  
  return body
}
  render() {
    const total_loans_collection=this.state.loans_due_vs_loans_given?this.state.loans_due_vs_loans_given.total_loans_collection:0;
    const total_loans_collection_amount =this.state.loans_due_vs_loans_given?this.state.loans_due_vs_loans_given.total_loans_collection_amount:0;
    const total_loans_collection_interest =this.state.loans_due_vs_loans_given?this.state.loans_due_vs_loans_given.total_loans_collection_interest:0;
    const total_loans_collection_principal =this.state.loans_due_vs_loans_given?this.state.loans_due_vs_loans_given.total_loans_collection_principal:0;
    const total_loans_given=this.state.loans_due_vs_loans_given?this.state.loans_due_vs_loans_given.total_loans_given:0;
    const total_loans_given_amount =this.state.loans_due_vs_loans_given?this.state.loans_due_vs_loans_given.total_loans_given_amount:0;

    return (
      <div>
        <Row>
          <Col>
            <Card>
              <CardHeader className="header-color">
                Total loans collection
              </CardHeader>
              <CardBody>
              <CardGroup className="mb-4">
                <Widget04 icon="icon-pie-chart" color="info" header={`${total_loans_collection?total_loans_collection:0}`} className="table-grey-mute" invert>Total count</Widget04>
                <Widget04 icon="icon-pie-chart"  color="info" header={`₦ ${total_loans_collection_amount?total_loans_collection_amount:0}`} className="table-grey-mute" invert>Total amount</Widget04>
                <Widget04 icon="icon-pie-chart"  className="table-grey-mute" invert color="info" header={`${total_loans_collection_interest?total_loans_collection_interest:0} %`} value={total_loans_collection_interest}>Total interest</Widget04>
                <Widget04 icon="icon-pie-chart" color="info" className="table-grey-mute" invert header={`${total_loans_collection_principal?total_loans_collection_principal:0}`}>Total principal</Widget04>
                <Widget04 icon="icon-pie-chart" color="info" className="table-grey-mute" invert header={`${total_loans_given?total_loans_given:0}`}>Total loans given count</Widget04>
                <Widget04 icon="icon-pie-chart" color="info" className="table-grey-mute" invert  header={`₦ ${total_loans_given_amount?total_loans_given_amount:0}`}>Total loans given amount</Widget04>
              </CardGroup> 
              </CardBody>
            </Card>
            <Card>
              <CardHeader className="header-color">
                Product Profitability
              </CardHeader>
              <CardBody>
              <br />
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="text-grey-mute">
                  <tr>
                    <th className="text-center table-grey-mute">Name</th>
                    <th className="text-center table-grey-mute">Product Id</th>
                    <th className="text-center table-grey-mute">Loan Volume</th>
                    <th className="text-center table-grey-mute">Loan Count</th>
                    <th className="text-center table-grey-mute">Accrued Principal</th>
                    <th className="text-center table-grey-mute">Accrued Interest</th>
                  </tr>
                  </thead>
                  <tbody>
                    {this.renderProfitabilityTable()}
                </tbody>
                </Table>
              </CardBody>
            </Card>   
            <Card>
              <CardHeader className="header-color">
                Default Loans
              </CardHeader>
              <CardBody>
              <br />
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="text-grey-mute">
                  <tr>
                    <th className="text-center table-grey-mute">Borrower{"'"}s Name</th>
                    <th className="text-center table-grey-mute">Days Overdue</th>
                    <th className="text-center table-grey-mute">Loan Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                    {this.renderDefaultLoansTable()}
                </tbody>
                </Table>
              </CardBody>
            </Card>            
            <Card >
              <CardHeader className="header-color">
                Outstanding Loans
              </CardHeader>
              <CardBody>
              <br />
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="text-grey-mute">
                  <tr>
                   <th className="text-center table-grey-mute">Borrower{"'"}s Id</th>
                    <th className="text-center table-grey-mute">Borrower{"'"}s Name</th>
                    <th className="text-center table-grey-mute">Loan Status</th>
                    <th className="text-center table-grey-mute">Outstanding Principal Amount</th>
                    <th className="text-center table-grey-mute">Outstanding Interest Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                    {this.renderOutstandingLoansTable()}
                </tbody>
                </Table>
              </CardBody>
            </Card>            
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(store => {
  return {
    report: store.action.report? store.action.report:[],
    profile:store.action.user,
    token:store.token.auth?store.token.auth.token:"",
    report_state:store.action.report_state
  };
})(withRouter(Profitability));