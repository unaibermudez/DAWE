import React, {Component} from 'react'; 
import './App.css';



class Boton extends Component {
  constructor(props){
    super(props);
    this.gestiorClick = this.gestiorClick.bind(this);
  }
  gestiorClick(event){
    alert(this.props.texto);
  }
  render() {
    const {texto, etiqueta} = this.props;
    return <>{etiqueta} <button type="button" onClick={this.gestiorClick}>{texto}</button></>;
  }
}

/*
class Hora extends Component {
  constructor(props) {
      super(props);
      this.state = {fecha: new Date()}; // creo un estado entre {} que incluye la fecha actual 
      setInterval(
        () => this.setState({fecha: new Date()}),
        1000
    );

  }
  render () {
      return <div>{this.state.fecha.toLocaleTimeString()}</div>; // muestro la hora desde el estado
  }
}
*/

function Hora() { // no hacen falta las props, no las incluimos
  const [fecha, setFecha] = React.useState(new Date());

  setInterval(
      () => setFecha(new Date()),
      1000
  );

  return <div>{fecha.toLocaleTimeString()}</div>;
}

class NameForm extends React.Component {
  constructor(props) {
	super(props);
	this.state = {value: ''};
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { this.setState({value: event.target.value}); }

  handleSubmit(event) { alert('A name was submitted: ' + this.state.value); event.preventDefault();  }

  render() {
	return (<form onSubmit={this.handleSubmit}>
    	<label>Name:<input type="text" value={this.state.value} onChange={this.handleChange} /></label>
    	<input type="submit" value="Submit" /></form>);
  }
}



class App extends Component {
  render() {
      return <NameForm/>;
  }
}



export default App;
