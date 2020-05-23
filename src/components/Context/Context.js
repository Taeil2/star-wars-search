import React from 'react'

export default React.createContext({
  results: [],
  errors: [],
  searching: false,
  searched: false,
  runSearch: () => {},
});
