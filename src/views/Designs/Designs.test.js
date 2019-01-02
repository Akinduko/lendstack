import React from 'react';
import ReactDOM from 'react-dom';
import Designs from './Designs';
import { shallow } from 'enzyme'

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
  Bar: () => null
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Designs />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<Designs />);
});

it('', () => {})
