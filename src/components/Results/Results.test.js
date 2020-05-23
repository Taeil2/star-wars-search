import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Results from './Results';
import './Results.scss';

// smoke test
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Results />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// snapshot test
it('renders the UI as expected', () => {
  const tree = renderer
    .create(<Results />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
