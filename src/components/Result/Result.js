import React from 'react';

export default class Result extends React.Component {
  render() {
    console.log(this.props);

    return (
      <div className='result'>
        <h2>{this.props.character.name}</h2>
        <p>
          Gender: {this.props.character.gender}<br/>
          Born {this.props.character.birth_year}<br/>
          Homeworld: {this.props.character.homeworldName}
        </p>
      </div>
    );
  }
}
