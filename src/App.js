import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import './App.css';

class App extends Component{

  constructor(){
    super();        

    this.state = {
      monsters:[],
      searchField:""
    }

    // For normal functions we have to explicitly bind the contextof this , otherwise it will be undefined
    // this.handleChange = this.handleChange.bind(this);
  }

  
  /* handleChange(e){
    this.setState({searchField:e.target.value})
  } */

  //Arrow functions on the other hand by default binds the context/scope of this to the method
  handleChange = (e) => {
    this.setState({searchField:e.target.value})
  };

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => this.setState({monsters : json}))
  }

  render(){
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster=>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox 
           placeholder="search monsters"
           handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default App;