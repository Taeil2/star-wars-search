import React from 'react';

import Header from './../Header/Header';
import Search from './../Search/Search';
import Results from './../Results/Results';
import Context from './../Context/Context';
import Error from './../Error/Error';

export default class App extends React.Component {
  state = {
    results: [],
    errors: [],
    searching: false,
    searched: false
  }

  runSearch = query => {
    // reset the state
    this.setState({
      results: [],
      errors: [],
      searching: true,
      searched: true
    });
    fetch(`https://swapi.dev/api/people/?search=${query}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          // response failed
          let errors = this.state.errors;
          errors.push(`Error ${res.status}: ${res.statusText}`);
          this.setState({
            errors: errors
          });
        }
      })
      .then(data => {
        if (data.count === 0) {
          // there are no results
          this.setState({searching: false });
        } else {
          this.setState({
            results: data.results
          });
          this.getHomeworlds(data);
        }
      })
      .catch(e => {
        // fetch failed
        let errors = this.state.errors;
        errors.push(`Error: ${e}`);
        this.setState({
          errors: errors
        });
      })
  }

  getHomeworlds(data) {
    let fetches = data.results.map((result) => fetch(result.homeworld));
    Promise.all(fetches)
      .then(res => {
        let data = [];
        res.forEach((res) => {
          if (res.ok) {
            data.push(res.json());
          } else {
            let errors = this.state.errors;
            errors.push(`Error ${res.status}: ${res.statusText}`);
            this.setState({
              errors: errors
            });
          }
        });
        return data;
      })
      .then((data) => {
        Promise.allSettled(data)
          .then((dataResults) => {
            let results = this.state.results;
            for (let i = 0; i < results.length; i++) {
              results[i].homeworldName = dataResults[i].value.name;
            }
            this.setState({ // homeworlds are in.
              results: results,
              searching: false
            });
          })
          .catch(e => {
            // all settled failed
            let errors = this.state.errors;
            errors.push(`Error: ${e}`);
            this.setState({
              errors: errors
            });
          });
      })
      .catch(e => {
        // all homeworlds fetch failed
        let errors = this.state.errors;
        errors.push(`Error: ${e}`);
        this.setState({
          errors: errors
        });
      });

    console.log(data);
  }

  render() {
    const value = {
      results: this.state.results,
      errors: this.state.errors,
      searching: this.state.searching,
      searched: this.state.searched,
      runSearch: this.runSearch
    }

    return (
      <Error>
        <Context.Provider value={value}>
          <main className='App'>
            <Header />
            <Search />
            <Results />
          </main>
        </Context.Provider>
      </Error>
    );
  }

}
