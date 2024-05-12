import React, {Component} from 'react';
import './App.css';


const DEFAULT_QUERY = 'react'
const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result:null,
      searchTerm: DEFAULT_QUERY
    }
    this.onDismiss = this.onDismiss.bind(this); 
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);

  }
  
  setSearchTopStories(result) {
    this.setState({result});
  }

  onDismiss(id) {
    function isNotId(item) {
        return item.objectID !== id;
    }
    const updatedList = this.state.result.hits.filter(isNotId); // filtramos la lista para quitar un elemento
    this.setState({result:{...this.state.result, hits: updatedList}}); // actualizamos el estado
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value}); // actualizamos el estado con el valor del input
  }

  componentDidMount() {
    const {searchTerm} = this.state;
    console.log(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`);
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
        .then(response => response.json)
        .then(result => this.setSearchTopStories(result))
        .catch(error => error);

    console.log(this.state);
 }
 

  render() {
    const {result, searchTerm} = this.state; // destructuring
    if (!result) {return null;}
    return(
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>Search</Search>
        </div>
        <Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    )

 }
}

const Search = ({value,onChange,children}) =>
  <form>
      {children}
      <input type="text" value={value} onChange={onChange}/>
  </form>


const Table = ({list,pattern,onDismiss}) =>
    <div>
      {list.filter(isSearched(pattern)).map(item => {
          return <div key={item.objectID} className='table-row'>
              <span style={{width: '40%'}}><a href={item.url}>{item.title}</a></span>
              <span style={{width: '30%'}}>{item.author}</span>
              <span style={{width: '10%'}}>{item.num_comments}</span>
              <span style={{width: '10%'}}>{item.points}</span>
              <span style={{width: '10%'}}>
                <Button className="button-inline" onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
              </span>
          </div>

      })}
    </div>


class Button extends Component {
  render() {
    const {onClick,className='', children} = this.props;
    return <button className={className} onClick={onClick}>{children}</button>;
  }
}



function isSearched(searchTerm) {
  return function(item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase()); // devuelve true si el titulo del item incluye el valor del input
  }
}

export default App;
