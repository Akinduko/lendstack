import React from 'react';
import ReactDOM from 'react-dom';
import RequestAccess from './RequestAccess';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RequestAccess />, div);
  ReactDOM.unmountComponentAtNode(div);
});
