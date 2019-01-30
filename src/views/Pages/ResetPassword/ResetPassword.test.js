import React from 'react';
import ReactDOM from 'react-dom';
import ValidateAccess from './ValidateAccess';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ValidateAccess />, div);
  ReactDOM.unmountComponentAtNode(div);
});
