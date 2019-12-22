import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    recipes: []
  }

  componentDidMount = () => {
    fetch(`http://localhost:3004/recipes`)
    .then(resp => resp.json())
    .then(resp => {
      this.setState({
        recipes: resp
      })
    })
  }

  render() {
    const recipes = this.state.recipes.map(recipe => {
      return(
        <li key={ Math.random() }>Nazwa: { recipe.title }, wykonanie { recipe.text } </li>
      )
    })

    return(
      
      <div>
        <h1>Przepisy</h1>
        <ul>
          { recipes }
        </ul>
      </div>
    )
  }
}

export default App;
