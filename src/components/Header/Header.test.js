import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Header from './Header';
import './Header.scss';

// smoke test
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
  ReactDOM.unmountComponentAtNode(div);
});
