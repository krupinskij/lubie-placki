import React from 'react'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import history from '../helpers/history'

class Recipe extends React.Component {

    handleDelete = event => {
        fetch("http://localhost:3004/recipes/"+this.props.recipe.id,{
            method: 'DELETE',
          })
          .then(() => {
              history.push("/");
              window.location.reload(false);
          });
    }

    render() {
        const recipe = this.props.recipe;

        const ingredients = recipe.ingredients.map(ingredient => {
            return (
                <li key={ingredient.id}>{ingredient.name} - {ingredient.quantity}{ingredient.unit}</li>
            )
        })

        const directions = recipe.directions.map(direction => {
            return (
                <li key={direction.id}>{direction.text}</li>
            )
        })

        const hints = recipe.hints.map(hint => {
            return (
                <li key={hint.id}>{hint.text}</li>
            )
        })
        return (
            <div className="recipe component">
                <h2 className="recipe__header">
                    <Link className="recipe__title" to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                </h2>
                <div className="recipe__author">
                    Dodano {recipe.add_date} przez: <Link className="recipe__user" to={`/user/${recipe.user.id}`}>{recipe.user.username} </Link>
                    {
                        this.props.user!==null && this.props.user.id===recipe.user.id &&
                        <>
                            <button className="recipe__delete" onClick={ this.handleDelete }>Usuń</button>
                            <button className="recipe__edit">Edytuj</button>
                        </>
                    }
                </div>

                <img className="recipe__photo" src={`http://localhost:3004/recipes/recipephotos/${recipe.id}`} alt={recipe.title} />
                
                <div className="recipe__section">
                    <h3>Opis: </h3>
                    {recipe.description}
                </div>

                <div className="recipe__section">
                    <h3>Składniki:</h3>
                    <ul>
                        {ingredients}
                    </ul>
                </div>

                <div className="recipe__section">
                    <h3>Sposób wykonania:</h3>
                    <ol>
                        {directions}
                    </ol>
                </div>

                <div className="recipe__section">
                    <h3>Wskazówki:</h3>
                    <ul>
                        {hints}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
	
	return {
	  user: state.user,
	}
  }
  
  export default connect(
	mapStateToProps
  )(Recipe)