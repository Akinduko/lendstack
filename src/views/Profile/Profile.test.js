import React from 'react';
import ReactDOM from 'react-dom';
import Backend from './Backend';
import { shallow } from 'enzyme'

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
  Bar: () => null
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Backend />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<Backend />);
});

it('', () => {})
