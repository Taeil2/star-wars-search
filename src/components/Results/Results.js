import React from 'react';
import Result from './../Result/Result';
import Context from './../Context/Context';

export default class Results extends React.Component {
  static contextType = Context;

  render() {
    if (this.context.searching === true) {
      return(<div className='results'><span>Searching...</span></div>)
    }

    if (this.context.results.length === 0 && this.context.searched === true) {
      return(<div className='results'><span>No results</span></div>)
    }

    let results = [];
    results = this.context.results.map((result, i) => {
      return <Result character={result} key={i} />
    })

    return (
      <div className='results'>
        {results}
      </div>
    );
  }
}
