import React from 'react';
import { StepWizard, Step } from 'react-step-wizard';
import Second from './Steps/Second';
import First from './Steps/First'


/**
 * A basic demonstration of how to use the step wizard
 */
class Wizard extends React.Component {
  componentDidMount() {
    this.renderPage();
  }
  renderPage = () => {
    const result = (
      <StepWizard>
        <Step>
          <First />
        </Step>
       <Step>
          <Second />
        </Step>
        {/* <Step>
          <StepThree />
        </Step>
        <Step>
          <Success />
        </Step> */}
      </StepWizard>
    );
    return result;
  };
  render() {
    return this.renderPage();
  }
}

/**
 * Stats Component - to illustrate the possible functions
 * Could be used for nav buttons or overview
 */

/** Steps */
// export default connect(store => {
//   return {
//     search: store.cpProfile.cpprofile
//   };
// })(Wizard);

export default Wizard