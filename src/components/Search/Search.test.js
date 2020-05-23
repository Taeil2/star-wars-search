import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Search from './Search';
import './Search.scss';

// smoke test
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Search />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// snapshot test
it('renders the UI as expected', () => {
  const tree = renderer
    .create(<Search />)
    .toJSON();
  expect(tree).toMatchSnapshot();
  });
