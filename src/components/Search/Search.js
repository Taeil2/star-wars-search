import React from 'react';
import Context from './../Context/Context';

export default class Search extends React.Component {
  state = {
    character: '',
    error: ''
  }

  static contextType = Context;

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.character === '') {
      this.setState({error: 'Enter a character name'})
    } else {
      this.setState({error: ''})
      this.context.runSearch(this.state.character);
    }
  };

  handleChange = (e) => {
    this.setState({character: e.target.value});
  }

  render() {
    return (
      <form id="searchForm" onSubmit={(e) => this.handleSubmit(e)}>
        <label htmlFor="character">Search for a character</label>
        <input id="character" type="text" placeholder="skywalker" onChange={this.handleChange}value={this.state.character}></input>
        <div className="error">{this.state.error}</div>
      </form>
    );
  }
}
