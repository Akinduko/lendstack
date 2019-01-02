import React from 'react';
import ReactDOM from 'react-dom';
import Devops from './Devops';
import { shallow } from 'enzyme'

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
  Bar: () => null
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Devops />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<Devops />);
});

it('', () => {})
