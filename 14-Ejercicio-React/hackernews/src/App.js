import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import 'moment/locale/es';
import Table from './components/Table'; // Importar el componente Table desde su nuevo archivo
import Button from './components/Button'; // Importar el componente Button desde su nuevo archivo
import Search from './components/Search'; // Importar el componente Search desde su nuevo archivo

moment.locale('es');

const DEFAULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(response => response.json())
      .then(result => {
        const formattedResult = result.hits.map(item => ({
          ...item,
          created_at: moment(item.created_at).toISOString()
        }));
        this.setSearchTopStories({ ...result, hits: formattedResult });
      })
      .catch(error => error);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const updatedList = this.state.result.hits.filter(item => item.objectID !== id);
    this.setState({ result: { ...this.state.result, hits: updatedList } });
  }

  render() {
    const { result, searchTerm } = this.state;
    const page = (result && result.page) || 0;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onSubmit={this.onSearchSubmit} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        {result && <Table list={result.hits} onDismiss={this.onDismiss} />}
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>More</Button>
        </div>
      </div>
    );
  }
}

export default App;
