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

      const ingredients = recipe.ingredients.map(ingredient => {
        return(
          <li key={ Math.random() }>
            { ingredient[0] } {ingredient[1]}
          </li>
        )
      })

      const directions = recipe.directions.map(direction => {
        return(
          <li key={ Math.random() }>
            { direction }
          </li>
        )
      })

      const hints = recipe.hints.map(hint => {
        return(
          <li key={ Math.random() }>
            { hint }
          </li>
        )
      })

      return(
        <div key={ Math.random() }>
          <h2>{ recipe.title }</h2>
          <div>
            <h3>Opis: </h3>
            { recipe.description }
          </div>
          <div>
            <h3>Składniki:</h3>
            <ul>
              { ingredients }
            </ul>
          </div>
          <div>
            <h3>Sposób wykonania:</h3>
            <ol>
              { directions }
            </ol>
          </div>
          <div>
            <h3>Wskazówki:</h3>
            <ul>
              { hints }
            </ul>
          </div>
        </div>
      )
    })

    return(
      
      <div>
        <h1>Przepisy</h1>
          { recipes }
      </div>
    )
  }
}

export default App;
