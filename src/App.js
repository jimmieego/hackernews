import React, { Component } from "react";
import "./App.css";
import Table from "Table.jsx";

const DEFAULT_QUERY = "react";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
// console.log(url);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };
  }

  setSearchTopStories = result => {
    this.setState({ result });
  };

  componentDidMount() {
    const { searchTerm } = this.state;

    //Use the native fetch API
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  onDismiss = id => {
    const isNotId = item => {
      return item.objectID !== id;
    };
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: Object.assign({}, this.state.result, { hits: updatedHits })
    });
  };

  render() {
    const { searchTerm, result } = this.state; //deconstruct the state

    if (!result) {
      return null;
    }

    return (
      <div className='App'>
        <Table list={result.hits} pattern={searchTerm} onDismiss={onDismiss} />
      </div>
    );
  }
}

export default App;
