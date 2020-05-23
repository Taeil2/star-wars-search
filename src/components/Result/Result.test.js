import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Result from './Result';
import './Result.scss';

// smoke test
it('renders without crashing', () => {
  let result = {
    name: 'Luke Skywalker',
    gender: 'male',
    birth_year: '19BBY',
    homeworldName: 'Tattoine'
  };
  const div = document.createElement('div');
  ReactDOM.render(<Result character={result} key={0} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// snapshot test
it('renders the UI as expected', () => {
  let result = {
    name: 'Luke Skywalker',
    gender: 'male',
    birth_year: '19BBY',
    homeworldName: 'Tattoine'
  };
  const tree = renderer
    .create(<Result character={result} key={0} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
